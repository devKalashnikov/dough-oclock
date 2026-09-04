# spec-kinetic — a fermentation-kinetics dough scheduler for maida in Islamabad

Version 1.0, 2026-09-04. Angle: **model-first**. One temperature trajectory per dough body, two integrals on it (yeast progress and gluten degradation), a poolish sub-model with a ripeness/exhaustion state, and every gram and clock time derived from those. Calibrated against TXCraig1's chart, the PizzApp hybrid example and the one ground-truth datapoint for this flour (3–3.5 h ball proof at 28 °C after the handoff's poolish). Simplified only where the research is genuinely uncertain (flour strength, poolish yeast credit), and those two constants are exposed as calibration knobs.

Reference implementation (pure Python, no dependencies, produced every number below): `C:/Users/dawoo/AppData/Local/Temp/claude/C--Users-dawoo-OneDrive-Desktop-pizza-chef/96386b25-29f0-4a06-9265-cec67961a692/scratchpad/research/kinetic_engine.py` (run output: `run5.txt` next to it). Port it 1:1 to JavaScript; §13 lists the unit tests.

Conventions: temperatures °C, times hours (h) unless a clock time; "IDY" = Saf-Instant red; "% of flour" = baker's percent of the **total** flour (poolish flour included) unless stated "% of poolish flour"; `T_day` = the room temperature the user enters; `T_night` = night temperature (see §1); `T_f` = fridge temperature.

---

## 0. The model in one page

1. **Rate curve.** Yeast fermentation speed relative to 25 °C, `r(T)`, from TXCraig1's published pizza-dough chart (0.055 at 5 °C, 0.50 at 20 °C, 1.35 at 28 °C, 1.60 at 30 °C, peak 1.85 at 35 °C, zero at 45 °C). Not Q10 = 2. §3.1.
2. **Equivalent hours.** Every dough body (poolish, bulk, ball) has a core temperature `T(t)` that relaxes toward its surroundings with a Newton time constant τ (ball 1.5 h, bulk 4.5 h, poolish 2.0 h) plus +0.5 °C/h self-heating when warm. Fermentation progress is `EQ = ∫ r(T(t)) dt` (25 °C-equivalent hours), stepped every 5 min. §3.2–3.4.
3. **Ready.** A direct dough with `y` % IDY is ready to bake when `EQ = 0.944 · y^(-0.695) · S_salt` (fit to Craig's chart; `S_salt` = 1.08 at 3.5 % salt). Inverse: `y = (0.944·S_salt / EQ)^1.439`. §4.1.
4. **Maturation cap (weak flour).** A second integral on the same trajectory, `D = ∫ d(T) dt / 7.8`, with `d(T) = 2^((T−22)/7)`. `D = 1` is the tolerance limit of maida + 20 % fine atta at 3.5 % salt (7.8 h at 22 °C, 4.3 h at 28 °C, 42 h at 5 °C). Plans must end with `D ≤ 1.0`; leftovers may reach 1.6 after a re-ball. §4.3.
5. **Poolish.** A 100 %-hydration honey-fed poolish with `y_p` % IDY of its flour peaks at `EQ_peak = 0.6 + 2.3 · y_p^(-0.5)`; its state is `ρ = EQ/EQ_peak` (1.0 = peak). The engine sizes `y_p` so that `ρ = 1.1` when the poolish is mixed into the dough (≈ 0.3–1.5 g per 250 g flour in this climate). Its yeast counts toward the final dough as `y_p · PFF · M(ρ)`, `M = 1` up to the peak and `exp(−1.8(ρ−1))` after it (floor 0.15). §4.2.
6. **Plans.** E emergency direct (< 4.5 h), A same-day poolish (4.5–12.5 h), B overnight fridge poolish + same-day warm-proofed balls (≥ 12.5 h, default), C = B with cold-held balls (≥ 31 °C kitchens, or long leads by choice). Selection §6; timelines §7; leftovers §8.

---

## 1. Inputs

| Symbol | Input | Default | Valid range | Notes |
|---|---|---|---|---|
| `now` | current date-time | device clock | — | minutes resolution |
| `t_bake` | first pizza launch date-time | — | `now + 2.5 h` … `now + 14 d` | later than `now + 72 h` is fine: the plan starts later ("wait until …") |
| `n` | pizzas total | 6 | 1–16 | > 12 forces two poolish containers and two dough containers (§2.5) |
| `n1` | pizzas eaten at the first sitting | `n` | 1–`n` | |
| `t_bake2` | second-sitting date-time | none | `t_bake` + 1 h … + 30 d | required if `n1 < n` |
| `H` | hydration (water ÷ total flour) | 0.65 | 0.60–0.68 | warn > 0.66 "sticky, wet centre at 60–90 s"; plan E and any plan at `T_day ≥ 31` clamp to ≤ 0.65 (§2.2) |
| `T_day` | current room (kitchen) temperature | 28 | 10–38 | ≥ 35: refuse room-temperature stages, offer AC room input; the model clamps `r(T)` at 35 °C |
| `T_night` | night kitchen temperature (22:00–07:00) | `T_day − 4` if `T_day ≥ 24`, else `T_day − 2` | 5–35 | optional field |
| `T_f` | fridge temperature at the dough shelf | 5 | 2–9 | presets 3 / 5 / 7; show sensitivity (§10.2) |
| `W_ball` | ball weight g | 280 | 200–320 | print target diameter: 280 g → 31–32 cm, 250 g → 30 cm, 200 g → 25 cm (0.37 g/cm²) |
| `salt` | salt, % of flour | 0.035 | 0.028–0.035 | never < 0.028 on maida (protease brake) |
| `oil` | olive oil, % of flour | 0.03 | 0–0.05 | non-AVPN; ≥ 0.04 flagged "softer, stickier" |
| `yeast_type` | IDY / fresh (khameer) / ADY | IDY | | grams shown for the chosen type: fresh = IDY × 3, ADY = IDY × 1.33; timings unchanged |
| `flour` | fixed: 80 % maida + 20 % fine chakki atta | — | — | constant profile W≈180 (§4.3) |
| `oven` | CasaKoa gas, floor 380–400 °C, dome 450–500 °C | — | — | fixed; §7.6 |
| `prefer_cold_balls` | user toggle "cold-hold the balls (more flavour, more steps)" | false | | selects plan C when lead ≥ 12.5 h |
| `sealed_box` | balls go into a sealed stacked box instead of a spaced tray | false | | switches τ_ball 1.5 → 2.75 h (§3.3) |

Derived: `L = t_bake − now` (h); `T_env(clock)` = `T_night` for 22:00 ≤ clock < 07:00, else `T_day`; fridge stages use `T_f`; freezer −18 °C.

---

## 2. Recipe math (baker's percentages)

### 2.1 Quantities
```
dough_total = n × W_ball × 1.02                     (2 % scrap)
F_t  = dough_total / (1 + H + salt + oil)            total flour, g
F_p  = PFF × F_t                                     poolish flour (PFF = 0.25 default; 0.20 / 0.15 fallbacks §6.3; 0 in plan E)
W_p  = F_p                                           poolish water (100 % hydration, no salt)
honey = 0.02 × F_p   (plans B, C)   |  0.01 × F_p (plan A)   |  0 (plan E)
maida_final = 0.80 × F_t − F_p
atta        = 0.20 × F_t
water_final = H × F_t − W_p
salt_g = salt × F_t ;  oil_g = oil × F_t
IDY_poolish = y_p / 100 × F_p ;  IDY_final = y_add / 100 × F_t          (y_p, y_add from §5)
```
Rounding: flours and water to 5 g; salt, oil, honey to 1 g (honey to 0.5 g below 5 g); yeast **down** to 0.05 g below 1 g and to 0.1 g at or above 1 g (under-dose, never over-dose: over-proofing is the unrecoverable failure on maida). If a yeast amount rounds below 0.20 g, print the dilution rule: "dissolve 1.0 g IDY in 100 g water, use `10 × grams` g of that liquid and subtract it from the water".

Worked default (6 × 280 g, H 0.65, salt 0.035, oil 0.03): dough 1714 g → F_t 999 g → poolish 250 g maida + 250 g water + 5 g honey; final 550 g maida + 200 g atta + 400 g water + 35 g salt + 30 g oil. (H 0.62: water_final 370 g.)

### 2.2 Hydration guards
Band 0.60–0.68 for this blend at 380–430 °C floor (AVPN 55.6–62.5 %, Gozney 58–65, Ooni 60–65, minus the maida's lower absorption ≈ 55–60 %; source hydration-and-oven §4.1). Effective hydration `H + oil` > 0.70 → warning "will handle like 70 %+". Plan E and `T_day ≥ 31` clamp `H ≤ 0.65` (Vito hot-day 60–65 %, PizzaStunde 65–66 %, Erik 57–62 % for weak flour).

### 2.3 Salt and oil
Salt 3.0–3.5 % is the Neapolitan/weak-flour norm (AVPN 40–60 g/L ≈ 2.2–3.75 %; PizzaBlab "3 % to compensate for lack of strength"; Pete-zza: salt slows protease). Fermentation slowdown `S_salt` = 1.00 at 2.5 %, 1.03 at 3.0 %, 1.08 at 3.5 % (interpolated from Baghdad/Beck gas-production data, hydration-and-oven §2.6). Oil 0–5 %: no fermentation correction at ≤ 5 % (Craig's chart envelope 2 ± 2 %). Add salt after 3–4 min of mixing, oil after gluten forms; salt–yeast direct contact ≤ 5 min (AVPN).

### 2.4 Sugar
Zero sugar/malt in the final dough at ≥ 350 °C floor (Lehmann "too hot for sugar" at ~370 °C; Gemignani cut-off 343 °C; AVPN forbids). Honey only inside the poolish, 2 % of poolish flour (0.5 % of total flour); halve it for the short plan-A poolish (some survives to the oven on a high-starch flour) — flour-strength-maida §4.5.

### 2.5 Batch limits
`F_p > 600 g` → two poolish containers (τ_poolish assumes ≤ 600 g). `dough_total > 2.0 kg` → split the bench rest into two containers (τ_bulk 4.5 h assumes ≤ 2 kg). `n > 16` → refuse ("make two batches").

### 2.6 Water temperature (DDT)
```
WT = 4·DDT − T_flour − T_day − T_poolish − FF     (with poolish; King Arthur / PizzaBlab 4-factor form)
WT = 3·DDT − T_flour − T_day − FF                 (plan E)
T_flour = T_day (flour stored in the kitchen); T_poolish = poolish core at use (≈ T_f + 1–3 °C from the model; ≈ T_day in plan A)
FF = 15 °C  (KitchenAid speed 1–2, 12–17 min: KA measured 12–13 °C at 7 min + 1 °C per extra 2 min)
```
DDT targets: plan A/B warm proof **23 °C** at `T_day ≥ 28`, **24 °C** at 21–27, **25.5 °C** at ≤ 20; plan C balls to the fridge **20 °C** (22 °C for holds < 6 h); plan E **25 °C** (≥ 26 °C room) / 26.5 °C. Never above 26 °C on this flour.
Clamp `WT` to 2–40 °C. If `WT_needed < 2`: shortfall (°C of DDT) = `(2 − WT_needed)/4`; if shortfall > 6 °C chill the flour to 8 °C (worth `(T_flour − 8)/4`); then replace fraction `f = shortfall/20` of the final water (≤ 0.5) by crushed ice (20 % ice ≈ −4 °C DDT). If `WT_needed > 40`: use 40 °C water, accept the lower start temperature, print "proof in the warmest spot". Dissolve any added IDY in ~50 g of the water at 30–35 °C before adding the cold water (PizzaBlab: never IDY into water < 20 °C). Calibration field: `FF = 4·measured_FDT − T_flour − T_day − T_poolish − WT_used` — store and reuse.

---

## 3. Temperature model

### 3.1 Relative fermentation rate r(T), 25 °C = 1.00 (linear interpolation between rows; 0 below 0 °C)
| T | r | T | r | T | r |
|---|---|---|---|---|---|
| 0 | 0.020 | 15 | 0.250 | 27 | 1.240 |
| 2 | 0.030 | 16 | 0.290 | 28 | 1.350 |
| 3 | 0.037 | 18 | 0.400 | 29 | 1.480 |
| 4 | 0.045 | 20 | 0.500 | 30 | 1.600 |
| 5 | 0.055 | 22 | 0.680 | 31 | 1.680 |
| 6 | 0.065 | 24 | 0.880 | 32 | 1.750 |
| 7 | 0.077 | 25 | 1.000 | 34 | 1.830 |
| 8 | 0.090 | 26 | 1.130 | 35 | 1.850 (peak) |
| 10 | 0.120 | | | 36 | 1.830 |
| 12 | 0.160 | | | 38 | 1.600 |
| 14 | 0.215 | | | 40 | 1.200 |
| | | | | 42 | 0.600 |
| | | | | 45 | 0.000 |

Justification: reproduces TXCraig1's published chart (hours at 0.096 % IDY: 5 °C 88 vs model 87.5; 10 °C 39/40; 15.6 °C 18/17.6; 21.1 °C 8/8.0; 25 °C 5/4.8; 30 °C 3/3.0) — https://www.pizzamaking.com/forum/index.php/topic,26831.0.html digitised in stevehollx/zaCalc (`raw/craig_table.json`); peak position from Pyler (theartisan.net, Wayback) and Salvadó 2011 (AEM 77:2292). Effective Q10 ≈ 4 at the cold end, 3.2 at 15–25 °C, 2.6 at 20–30 °C. A textbook Q10 = 2 under-predicts a 30 °C kitchen and over-predicts fridge activity by ~2×; do not substitute it. Planning stages above 32 °C are not scheduled (§9); the table above 32 °C is only used to evaluate what the user's kitchen does to the dough.

### 3.2 Equivalent hours
`EQ(t0→t1) = Σ r(T_eff(t)) · Δt`, Δt = 5 min, `T_eff = T_core + heat`, integrated per dough body from its mixing moment. Freezer: `r = 0`, `d = 0`. This is TXCraig1's additive "fraction of readiness" chaining (reply #273 of the thread) made continuous.

### 3.3 Thermal lag (Newton cooling)
`T_core(t+Δt) = T_env + (T_core − T_env) · exp(−Δt/τ)`

| Body | τ (h) | Source |
|---|---|---|
| 250–300 g ball on an oiled tray, oiled film, spaced ≥ 5 cm | **1.5** | PizzaBlab "balls at 4 °C for 20 of 24 h"; veloboy 1.5 h → 16.7 °C at 21 °C (cold-ferment-logistics §2.3) |
| same balls in a sealed stacked box (`sealed_box`) | 2.75 | Lehmann cross-stack rationale |
| bulk mass 1.5–2 kg in a covered bowl (bench rest) | 4.5 | PizzaBlab "bulk at 4 °C for only 5 of 24 h"; Sourdough Journey ~12 h |
| flattened slab ≤ 3 cm (not used by default plans) | 2.5 | cold-ferment §4.2 |
| poolish ≤ 600 g in a bowl | 2.0 | temperature-kinetics §4.4 |

Self-heating: `heat += 0.5 °C/h` while `T_core > 20` in warm stages, capped +2 °C; decays at the same rate in cold stages (Lehmann "about 1 °F per hour", pizzamaking topic 26095). The same τ applies to warm-up on the counter. Consequences the engine must show (all computed): a 280 g ball from 26 °C into a 5 °C fridge accrues 0.91 eq-h in its first 4 h (a 1.6 kg bulk: 1.95 eq-h) — why plans ball before any fridge stage; a ball from 5 °C into a 30 °C room accrues 1.83 eq-h in 3 h (1.04 at 24 °C) — why tempering time is never ignored here.

### 3.4 Initial temperatures
Poolish at mixing: `(T_water + 0.45·T_flour)/1.45`. Final dough at end of mixing: the achieved DDT from §2.6. Poolish water: 20 °C (fridge-cool) at `T_day ≥ 28`; room temperature 19–27; 28 °C lukewarm at ≤ 18 (research: cold water in heat — Vito/Rosada; but not ice: the model shows an ice-cold 1 h poolish cannot ripen at a sane dose, the pizzamaking 85360 failure).

---

## 4. Yeast model

### 4.1 Direct-dough readiness
```
EQ_ready(y) = 0.944 · y^(−0.695)         y = IDY % of total flour, EQ in 25 °C-equivalent hours
target(y)   = EQ_ready(y) · S_salt(salt)
ready when  EQ ≥ target;   F = EQ / target  ("fermentation fraction")
inverse     y = (0.944·S_salt / EQ)^1.439
```
Fit to BeanAnimal's rendering of Craig's chart (0.201 % → 3 h, 0.05 % → 7 h, 0.01 % → 24 h at 25 °C; https://beananimal.com/tools/dough-fermentation-calculator/). Checks (run5): 7 h @25 → 0.056 %; 24 h @4 → 0.82 % (chart 0.73–0.82); 48 h @4 → 0.30 % (chart 0.285); 72 h @2.8 → 0.238 % (chart 0.224); 24 h @20 → 0.026 % (chart 0.029); 6 h @20.5 + 32 h @3.5 → 0.103 % (Craig fraction-sum 0.104 %, PizzApp 0.109 % before its +20 % buffer). Hours scale as `y^−0.72`: doubling yeast cuts time only 39 %. Clamp `y` to 0.01–1.5 %.
Usable window for maida: **F = 0.90 … 1.10** ("ready at" = F 1.0; "start poke-testing" = F 0.9; "over-proofed by" = F 1.2). Yeast-model §4.6; narrower than the 85–115 % of strong flour.

### 4.2 Poolish sub-model
Poolish = `F_p` flour + `F_p` water + honey 2 % + `y_p` % IDY of poolish flour; no salt. It is a separate body (§3.3 τ 2.0).
```
EQ_peak(y_p) = 0.6 + 2.3 · y_p^(−0.5)        (25 °C-eq hours from mixing to peak: 2–3× volume, dome just flattening)
ρ(t) = EQ_poolish(t) / EQ_peak(y_p)          ripeness: 1.0 = peak
```
Calibration: lag 0.6 eq-h (Lehmann ~20 min lag) + power law through Hamelman/Weekend Bakery (0.28 % → 8 h, 0.15 % → 12 h, 0.055 % → 16 h at 22 °C), Rosada (0.6 % → 3 h at 28 °C), Pizzablab (0.1 % 8–16 h at 20 °C), Vito's 10 g/300 g → 1–2 h at 24 °C, and — decisively — the handoff's 5 g/250 g (2 %) which the model puts at ρ = 0.90 after 1.75 h at 28 °C with room-temperature water: exactly the "peaked, just starting to collapse" the handoff describes. Model hours to peak: 2 % @28 1.6 h; 2.8 % @25 2.0 h; 0.28 % @22 7.3 h; 0.055 % @22 15.3 h; 0.57 % @20 7.3 h (Ooni "6–12 h").
State rules: `ρ_in` (at fridge-in) must be 0.35–0.90 = "visibly rising, small bubbles all over, not yet domed-and-cracking" (pizzamaking 85360: refrigerate only once it rises aggressively). `ρ` at mixing designed = **1.1** (dome just flattening; poolish-science R7). `ρ > 1.6` at mixing → warning "over-ripe, sharp/boozy — use only if it still smells sweet-yeasty"; `ρ > 2.5` → "discard and remake" (weak maida; TXCraig1 topic 10237 dissolved gluten). Fridge hold of a ripe poolish ≤ 24 h (Vito), 12 h if `T_f ≥ 7`.

Yeast credit toward the final dough:
```
M(ρ) = 1.0                       ρ ≤ 1.0
     = max(0.15, e^(−1.8·(ρ−1)))  ρ > 1.0
y_pool_eff = y_p × PFF × M(ρ_at_mix)         (% of total flour)
y_eff = y_pool_eff + y_add
```
`M` is the model's single flour-specific calibration: with M_K = 1.8 the handoff replay (2 % poolish, 1.75 h at 28 °C, 18 h at 5 °C, 20 min out, DDT 21 °C, 30 min rest, balls at 28 °C) gives ρ_mix 1.83, M 0.22, y_eff 0.112 %, **ball proof 3.12 h** (ground truth 3–3.5 h). The physics behind the decline (sugar exhaustion, ethanol/acid, anaerobic stationary phase; Rezaei 2014; HansB "pretty much used up"; Craig "1/3 in the preferment") is qualitative in every source — hence one exposed constant. The same constant reproduces Vito's 20 % poolish at 24 °C (ρ ≈ 0.8, M = 1 → ready at ~3.4 h vs his 3 h) because his poolish is younger.

### 4.3 Flour-strength cap (maturation integral)
```
d(T) = 2^((T − 22)/7)                    relative gluten-degradation rate (enzyme-like, doubles every 7 °C)
D = Σ d(T_eff) · Δt / CAP22,  CAP22 = 7.8 h  (final dough, from end of mixing to launch; the poolish's own D is not counted — its flour is treated as already spent, PFF ≤ 25 %)
```
| T | 3 | 4 | 5 | 6 | 7 | 8 | 12 | 16 | 20 | 22 | 24 | 26 | 28 | 30 | 32 | 34 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cap(T) h | 51 | 46 | 42 | 38 | 34 | 31 | 21 | 14.1 | 9.5 | 7.8 | 6.4 | 5.2 | 4.3 | 3.5 | 2.9 | 2.4 |

Thresholds: `D ≤ 0.85` fine; 0.85–1.0 "narrow window — poke-test early"; > 1.0 plan refused (move time into the fridge, shorten, or freeze); leftovers (re-balled) allowed to 1.6 with warnings (§8). Anchors: validated plan B at 28 °C sits at D ≈ 0.75–0.85 ("high risk, watch closely" in the handoff); the handoff's split method (20 h cold + 3 h at 28 °C) computes to D ≈ 0.95 ("works, higher overproofing risk"); 48 h cold-balled at 4 °C + 2.5 h warm → 1.46 (refused: consistent with Masi 8–12 h weak-flour caution, Pizzablab W180 ≈ 12 h cold, Lehmann "2 days max" for 11 % flour, cold-ferment §4.3 hard limit 48 h being for a stronger blend). The slower cold-end decay of `d` relative to `r` (at 5 °C `d` = 0.19 of 22 °C while `r` = 0.055 of 25 °C) encodes "in the fridge yeast nearly stops but enzymes keep working" (JayArr; PizzaBlab). Source: flour-strength-maida §4.2 (hours_cap 6 h at 22 °C with an 8 °C doubling) raised to 7.8 h for the 3.5 % salt brake and the validated 3.75 h at 28 °C.
Flour profile constant: 80 % maida + 20 % fine chakki atta, protein ≈ 10.2 %, W_est 180 (160–220), absorption ≈ 55 % (Unity/Sunridge brochure: protein 10 %, GI 40, absorption 50 %; https://unityfoods.pk/assets/pdfs/...). If a Daraz 00 flour (King Arthur 11.5 % / Raw Himalayas 12.4 %) is ever selected: CAP22 × 1.6, hydration 0.60–0.65, no atta.

### 4.4 Floors and ceilings
Poolish `y_p` 0.10–3.5 % of poolish flour (plan A cap 1.5 %: never a sponge-class dose that collapses on the counter). Added `y_add` ≥ 0; total `y_eff` 0.01–1.5 %. Any all-room-temperature schedule may not exceed 0.30 % total (AVPN/Forkish evidence, avpn-and-classic §4B). Minimum weighable 0.20 g (dilution rule otherwise). Freezing: viable yeast × 0.85 after one home freeze (peer-reviewed 10–20 % loss at 2 weeks; freezing-and-leftovers §2.2).

---

## 5. Solvers (all bisection, deterministic)

* `solve_yp(target_ρ, trajectory)`: bisection on `ln y_p` in [ln 0.10, ln 3.5] so that ρ at use = target. Returns status `poolish_time_too_short` (clamped 3.5 %) or `too_long` (0.10 %).
* `solve_P(body0, fixed_stages, y_eff)`: bisection on the last warm-stage duration P in [0, 8 h] so that `EQ = target(y_eff)`; `frac` = 0.9 / 1.2 give the poke-test start and over-proof times. Status `already_ready` (P = 0) or `too_slow`.
* `solve_yadd(body0, all_stages, y_pool_eff)`: run the fixed schedule, `y_needed = (0.944·S_salt/EQ)^1.439`, `y_add = max(0, y_needed − y_pool_eff)`.
* Plan B joint search (§6.3): iterate poolish counter time `t_c` upward in 0.5 h steps from the default (§7.1) to 4 h; for each, `solve_yp(1.1)`, compute `M`, `y_pool_eff`, then `solve_P`; accept the first `t_c` with `ρ_in ∈ [0.35, 0.90]` and `P ≥ 0.9·P_target`; if none, take the largest `t_c`; if `P < 0.7·P_target` still, retry with PFF 0.20 then 0.15 (Vito: "hot day → less poolish"); if `P > P_target`, top up with `solve_yadd`.
* Plan A joint search: iterate `t_p` 1.5 → 6 h; the dose to ripen must be ≤ 1.5 %; accept the first with `P ≥ 0.7·P_target`; else last candidate with status `poolish_used_young`.

---

## 6. Plan selection

### 6.1 Decision tree (evaluate in order)
```
L < 2.5 h                        → REFUSE: "earliest possible bake is now + 2.5 h"
cold = (T_day ≥ 31) or prefer_cold_balls
L < 4.5 h                        → PLAN E  (emergency direct dough; warn "worst-quality option")
4.5 ≤ L < 12.5 h                 → PLAN A  (same-day poolish); cold → A-cold (3.5 h fridge hold of the balls)
L ≥ 12.5 h and cold              → PLAN C  (fridge poolish + cold-held balls)
L ≥ 12.5 h                       → PLAN B  (fridge poolish + warm-proofed balls) with PFF fallback 0.25→0.20→0.15
any plan whose first step is later than now → prepend "Nothing to do until <start>"
```
Why these: below 4.5 h no poolish can ripen (lag 0.6 eq-h + minimum 1.5 h) and still leave a ≥ 2 h proof. Between 4.5 and 12.5 h a fridge poolish cannot get its ≥ 8 h hold plus ≥ 1.5 h counter plus a ≥ 2 h proof. From 12.5 h the overnight fridge poolish is always possible and is the validated default (handoff plan B; Gemignani/Charlie/Sisofo: put the flavour in the preferment, proof balls the same day). Cold-held balls become the default at ≥ 31 °C because the warm usable window shrinks to ≤ 30 min (cap 2.9 h at 32 °C; PizzaStunde/Nocerino practice) and the fridge removes the most uncontrolled hours.

### 6.2 Room ferment vs cold ferment — the plain-language rule the app shows
"Yeast slows ~20× in a 5 °C fridge but the enzymes that weaken this flour slow only ~5×, so cold time buys flavour cheaply in yeast but not for free in dough strength. Balls tolerate about 4 h at 28 °C or about 40 h at 5 °C from mixing. Warm proofing is simplest and validated up to 30 °C; above 31 °C the warm window is under half an hour, so the balls go into the fridge and come out 1.3–3 h before baking. Never bulk-ferment a round mass in the fridge: it stays warm inside for 12 h."

### 6.3 Structural constants
`MIX_H` 0.42 h (mixing incl. rest-and-knead cycles), bench rest 0.5 h (≤ 27 °C) / 0.33 h (28–30) / 0.25 h (≥ 31), balling 0.17 h, pre-fridge rest 0.33 h (lid ajar), stretch-and-launch 0.25 h before `t_bake`. Poolish fridge hold 8–20 h (plan B), poolish counter default 1.5 h (≥ 28 °C), 2 h (22–27), 3 h (16–21), 4 h (≤ 15). Ball proof target `P_target(T) = clamp(0.75·cap(T), 2.0, 5.5)` (plan B) / clamp(…, 1.5, 4.0) (plan A): 24 °C 4.8 h, 26 °C 3.9, 28 °C 3.2, 30 °C 2.65, ≤ 20 °C 5.5. Cold ball hold (plan C) 3–24 h, 12–20 h preferred; poolish rest out of the fridge 20 min at ≤ 27 °C, 0 min above (Vito: use cold in heat).

---

## 7. Timeline generation

Every plan emits an ordered step list; each step = clock time + action + readiness text. Times are computed backwards from `t_bake` (mix = bake − stretch − P − balling − rest − mixing), then the poolish backwards from mix. If the first step precedes `now`, the plan is infeasible → the selector falls through (B → A → E). If the first step is after `now`, emit the wait step.

### 7.1 Plan B (default)
1. `poolish_start = poolish_out − t_c − hold` — "Make the poolish: `F_p` g maida + `W_p` g water at `T_water_p` °C + `honey` g + `IDY_poolish` g. Dissolve honey and yeast in the water, add flour, mix to a thick batter, cover loosely."
2. `poolish_fridge = poolish_start + t_c` — "It should be visibly rising with small bubbles all over (not yet domed and cracking). Seal and refrigerate." (`ρ_in` printed as "about x % of the way to its peak".)
3. `poolish_out` = mix − 20 min (≤ 27 °C) or = mix (≥ 28 °C) — "Take the poolish out: 2–3× volume, bubbles everywhere, dome just flattening, sweet-yeasty with a faint tang. Sunken below a high-water line and sharp/boozy → discard and remake."
4. `mix` — water at `WT` (ice/chill instructions from §2.6), flours + poolish + 80 % water 3–4 min speed 1, rest 10–20 min, salt, remaining water slowly, knead ≤ 10–12 min speed 1–2, oil last; if strandy stop and rest 15–20 min under a damp towel, knead 3–5 min, ≤ 3 cycles; never add flour. Target dough temperature printed.
5. `rest` — bench rest, covered.
6. `ball` — divide at `W_ball` with oiled hands, seam under, oiled tray ≥ 5 cm apart, oiled cling film no holes.
7. `ready90 = ball + 0.17 + P90` — "Start poke-testing: press 1 cm for 2 s; springs back fast → wait, re-test every 20 min (30 min below 24 °C)."
8. `ready = ball + 0.17 + P` — "Ready: ~1.75× volume, balls touching, light, slow half-return of the dent. Usable until `over`."
9. `t_bake − 35 min` — light the CasaKoa on full gas; launch only when the floor reads 380–420 °C by IR (target 400 °C); dome 450–500 °C.
10. `t_bake` — stretch to `D_target` cm, centre 2–3 mm; pizza k launches at `t_bake + 3.5·(k−1)` min (bake 60–90 s, turn at 30–40 s, dome the last 10–15 s, 2–3 min floor recovery on full flame; flame to medium-low during the bake).
11. `over = ball + 0.17 + P120` — "Over-proofed after this: large bubbles, dent stays. Rescue: degas, re-ball tightly once only, rest 60 min at ≥ 26 °C / 90 min at 22–25 / 2 h at ≤ 20 °C (never > 2.5 h); if < 45 min remain, stretch now and expect a flatter rim."

### 7.2 Plan C
Steps 1–6 as B, with DDT 20 °C (22 °C if hold < 6 h) and default `t_c`; then 6a `fridge_in = ball + 0.17 + 0.33` — "20 min uncovered on the counter, then into the fridge with the lid ajar 60–90 min, then seal (condensation rule)"; 6b `out = fridge_in + hold` — "Take the balls out `P` h before baking (`P = max(P_ferment, t_core)`: they must both finish rising and reach a core ≥ 18–21 °C for a 450–500 °C oven; for > 6 balls pull in two waves 30 min apart at ≥ 28 °C)"; poke-test at `out + 0.75·P`; oven and bake steps as B. `F_out` (fraction of readiness at fridge-out, typically 0.5–0.8) is printed so the user understands why the balls still need 2–4 h.

### 7.3 Plan A
1. `poolish_start` — same-day poolish, honey 1 % (room water rule §3.4). 2. `mix = poolish_start + t_p` — "Use when 2–3× and domed; if it collapses before this time, mix immediately." 3–11 as B with `P_target` from §6.3 (plan A range 1.5–4 h). A-cold inserts a 3.5 h fridge hold after a 20 min pre-fridge rest and pulls the balls `max(P_ferment, t_core)` ≈ 1.2–1.4 h before baking.

### 7.4 Plan E
Mix now; DDT 25–26.5 °C (warm water in winter); 15 min rest; ball; proof `P` = window; IDY from `solve_yadd` on the whole window; H ≤ 0.65; honey 0. Warn: "direct same-day dough — least flavour; the poke test decides".

### 7.5 Readiness and failure strings (deterministic)
Poolish ready / over-ripe as in 7.1-3. Balls: under = dense, instant spring-back, few bubbles; ready = slow half return, ~1.75×, touching; over = > 2×, large translucent blisters, dent stays, liquid on the tray, vinegar/boozy smell, tears when stretched. Yeast failure = flat, wet, shiny, no gas after the planned time (Vito V18): rescue by re-mixing with 10 g IDY per litre of water + 2 % more salt and 4 h at room temperature, or bake thin. Sour-milk smell or mould → discard.

### 7.6 Oven line
CasaKoa: preheat 25–40 min full gas; floor 380–420 °C at the launch spot (IR), dome 450–500 °C; AVPN 380–430 / 485 °C, 60–90 s (https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf). Diagnostics: burnt base/pale top → flame down, let the floor fall; charred top/doughy base → preheat longer, keep flame.

---

## 8. Leftovers (balls not baked at the first sitting)

Let `Δ = t_bake2 − t_bake`, `T_2 = T_env(t_bake2)`, `D_1` = D at the first bake.
```
Δ ≤ 2 h (T_2 ≤ 28) / 1.5 h (T_2 > 28)          → ROOM: keep covered; bake within that window
2 h < Δ ≤ 24 h and T_f ≤ 6.5:
    X = clamp(1.5·ln((T_2 − (T_f+1)) / (T_2 − core_target(T_2))), 0.75, 3.0)     take-out lead (regime A: warm only)
    D_2 = D_1 + Δ/cap(T_f) + X·d(T_2 − 6)/7.8
    D_2 ≤ 1.6                                    → FRIDGE: refrigerate the spare balls the moment the first balls pass the poke test
                                                   (t_bake − 15 min), oiled, sealed, spaced; warn if Δ > 18 h or D_2 > 1.15;
                                                   if D_2 > 1.2: "degas and re-ball gently before refrigerating"; take out at t_bake2 − X;
                                                   stretch smaller (26–28 cm) and gently; poke test at take-out
otherwise                                        → FREEZER (planning mode): split the batch at balling — the n−n1 balls go straight to the
                                                   freezer un-proofed 15 min after balling (Vito 2022 / Ooni / Lehmann), flattened to
                                                   ≤ 3 cm pucks, oiled, uncovered on a tray 2–3 h, then skin-tight cling + bag, coldest shelf.
                                                   Move to the fridge at t_bake2 − 16 h (shifted to 22:00 the evening before if that falls
                                                   between 00:00 and 07:00; window 12–24 h). Take out at t_bake2 − P_thaw, where P_thaw =
                                                   max(solve_P(from fridge state, yeast × 0.85), t_core): typically 4.3 h at 30 °C, 6.4 h at 26 °C,
                                                   ~6 h at 20 °C (Ooni "at least 6 h"). Use the same day; never refreeze; best ≤ 14 days,
                                                   acceptable ≤ 30, refuse > 90; warn that load-shedding freeze–thaw cycles shorten this.
```
`core_target(T)` = 18 °C at 22 °C, +0.25 °C per °C above 22 (max 21 °C); `min(18, T − 4)` below 22 °C — Lehmann's 10 °C minimum raised to ~18–20 °C for a 60–90 s bake (PizzaBlab Neapolitan note; cold-ferment §4.4). Regime-A lead times from a 5 °C fridge: 15 °C 1.2 h, 18 °C 1.65, 20 °C 1.9, 22 °C 2.1, 24 °C 1.8, 26 °C 1.6, 28 °C 1.4, 30 °C 1.3, 32 °C 1.2, 34 °C 1.15 h.
Emergency counter thaw (no fridge step): hours ≈ 90 / T_room for a 3 cm puck (4.5 h at 20 °C, 3 h at 30 °C), ×1.4 for an un-flattened ball, then the regime-A lead. Never water-bath unwrapped, never microwave.
Unplanned leftovers (all balls proofed, user did not plan): same fridge rule; if Δ > 24 h freeze the proofed balls anyway (quality "good enough", flatter rim), thaw fridge 12–16 h, out X + 30 min. Par-bake fallback (no freezer): 30–45 s at 380–400 °C floor with half the sauce, cool on a rack, bag; finish 40–60 s.

---

## 9. Warnings and validation

| Condition | Message / action |
|---|---|
| `L < 2.5 h` | refuse; "earliest bake now + 2.5 h" |
| `T_day ≥ 35` | refuse warm stages; "enter the AC-room temperature or use plan C/A-cold with ice water and chilled flour" |
| `T_day ≥ 31` | plan C / A-cold forced; "warm proofing window would be under 30 min" |
| `28 ≤ T_day ≤ 30` | "watch closely — poke-test from `ready90`; usable window ≈ 30–45 min" |
| `T_f ≥ 7` | "fridge warm: cold stages run 1.4–1.8× faster; poolish hold capped 12 h, ball hold capped 12 h; put a thermometer on the dough shelf" |
| `T_f ≤ 3` | "very cold fridge: poolish may under-ripen; counter time extended automatically" |
| plan `D > 1.0` | refuse/re-plan (shorter hold or later mix); 0.85–1.0 amber |
| `y_p` at 3.5 % clamp (`poolish_time_too_short`) | "poolish cannot ripen in that time — the plan uses it young (M = 1) and tops up yeast in the dough" |
| `y_p` at 0.10 % clamp | "poolish held too long — schedule shortened to 20 h fridge" |
| `ρ_mix > 1.6` | over-ripe warning; `> 2.5` discard |
| `H > 0.66` | sticky/wet-centre warning; `T_day ≥ 31` or plan E: clamp 0.65 |
| `WT_needed < 2` | ice/chilled-flour instruction (§2.6); `> 40` cap + "warmest spot" |
| `n > 12` | two poolish bowls, two dough tubs; `n > 16` refuse |
| any warm stage > 5 h at ≥ 28 °C requested by the user | refuse: "use the fridge instead of waiting" |
| all-RT schedule needing > 0.30 % IDY or > 8 h at ≥ 27 °C | not generated (structure prevents it) |
| second sitting > 30 days | refuse freezer; offer par-bake |
| monsoon toggle (RH > 75 %) | hold back 10–15 g water/kg flour; wipe condensation after the fridge |

---

## 10. Validation tables (all from `kinetic_engine.py`, 6 × 280 g, H 0.65, salt 3.5 %, oil 3 %, T_f 5 °C, bake 26 h ahead)

### 10.1 Plan B by kitchen temperature
| T_day | PFF | counter t_c | poolish IDY | ρ_in | added IDY | ball proof P | poke from (P90) | over (P120) | D | water |
|---|---|---|---|---|---|---|---|---|---|---|
| 12 | 0.25 | 4.0 h | 5.1 g (2.0 %) | 0.62 | 0.40 g | 5.5 h | 4.5 | 7.5 | 0.40 | 40 °C (capped) |
| 16 | 0.25 | 3.5 h | 2.7 g (1.1 %) | 0.65 | 0 | 5.5 h | 4.6 | 7.2 | 0.56 | 40 °C |
| 18 | 0.25 | 3.5 h | 2.0 g | 0.68 | 0 | 5.2 h | 4.4 | 6.8 | 0.65 | 40 °C |
| 20 | 0.15 | 4.0 h | 1.3 g | 0.65 | 0 | 4.9 h | 4.3 | 6.1 | 0.79 | 40 °C |
| 22 | 0.25 | 4.0 h | 1.2 g | 0.69 | 0 | 4.5 h | 4.0 | 5.5 | 0.80 | 29 °C |
| 24 | 0.25 | 3.5 h | 0.9 g | 0.69 | 0 | 4.7 h | 4.2 | 5.6 | 0.96 | 25 °C |
| 26 | 0.25 | 2.5 h | 0.9 g | 0.64 | 0 | 4.0 h | 3.6 | 4.9 | 0.93 | 21 °C |
| **28** | 0.25 | 2.5 h | **1.0 g (0.40 %)** | 0.59 | 0.10 g | **3.4 h** | 3.0 | 4.0 | 0.84 | 16 °C |
| 30 | 0.25 | 2.0 h | 1.1 g | 0.54 | 0.20 g | 2.7 h | 2.5 | 3.2 | 0.75 | 12 °C |
| 32 | → plan C | 1.5 h | 2.2 g | — | 0 | hold 12.6 h + 2.4 h | | | 0.75 | ice |
| 34 | → plan C | 1.5 h | 1.7 g | — | 0 | hold 12.6 h + 2.5 h | | | 0.83 | ice |

The 28 °C row is the validated regime (3–3.5 h). Note the D column: 24–26 °C plans run near the cap because the target proof is long; the poke test governs.

### 10.2 Fridge-temperature sensitivity (28 °C, plan B)
Designed dose barely moves (1.0–1.3 g) because the solver re-fits; but if the 5 °C dose (1.0 g) is held in a different fridge: 3 °C ρ 0.98 → proof 3.1 h; 5 °C 1.07 → 3.5 h; 7 °C 1.19 (M 0.71) → 4.0 h; 8 °C 1.25 (M 0.64) → 4.3 h. Cold stages: 24 h at 8 °C ≈ 2× the fermentation of 24 h at 4 °C (r 0.090 vs 0.045).

### 10.3 Plan C (cold balls), 48 h lead
| T_day | T_f | hold | poolish | F_out | P after fridge | over | D_out | D_bake |
|---|---|---|---|---|---|---|---|---|
| 24 | 5 | 12 h | 2.5 g | 0.55 | 3.3 h | 4.0 | 0.47 | 0.74 |
| 24 | 5 | 20 h | 1.7 g | 0.60 | 3.5 h | 4.5 | 0.68 | 1.00 |
| 28 | 4 | 20 h | 2.5 g | 0.70 | 2.2 h | 2.9 | 0.63 | 0.81 |
| 28 | 5 | 20 h | 2.1 g | 0.69 | 2.4 h | 3.0 | 0.68 | 0.88 |
| 28 | 7 | 20 h | 1.5 g | 0.67 | 2.6 h | 3.3 | 0.79 | 1.04 (warn) |
| 32 | 5 | 12 h | 1.8 g | 0.48 | 2.7 h | 3.1 | 0.48 | 0.83 |
| 32 | 5 | 20 h | 1.4 g | 0.53 | 2.8 h | 3.3 | 0.69 | 1.06 (warn) |
| 32 | 7 | 20 h | 1.0 g | 0.52 | 3.0 h | 3.6 | 0.79 | 1.24 (refuse → hold 12 h) |

### 10.4 Plan A (8 h lead, 3 pizzas): 28 °C → poolish 0.65 g on 125 g, counter 3.5 h, no added yeast, proof 2.8 h (D 0.66); 30 °C → 0.75 g, 3 h, proof 2.3 h; ≤ 24 °C → the poolish cannot ripen in ≤ 2.5 h at ≤ 1.5 % and is used young (1.8 g), proof 1.4–2.3 h — plan A is a compromise in cool kitchens; the app says "for better results start plan B the evening before".

### 10.5 Plan E (2 pizzas, 333 g flour): 22 °C 4 h → 0.55 g (0.165 %), proof 3.0 h, D 0.58; 28 °C 4 h → 0.35 g, D 0.77; 28 °C 3 h → 0.65 g; 32 °C 4 h → 0.25 g, D 1.08 (warn: shorten to 3 h → 0.50 g, D 0.62); 16 °C 4 h → 1.0 g (0.30 %), water 32 °C.

### 10.6 Handoff presets evaluated by the model
5 g/250 g, 1.75 h at 28 °C + 18 h at 5 °C: ρ_in 0.90, ρ_mix 1.82, M 0.23, credit 0.114 % → proof 3.1 h (validated 3–3.5 h). 7 g same-day 2.75 h at 25 °C: ρ 1.39 at mixing (past peak — poolish-science: collapsed by 3 h), M 0.49, credit 0.35 % → proof ≈ 1.2 h, not the 3–3.5 h the handoff lists: this preset is de-recommended. 3 g + 9 °C water, 1.5 h + 22 h at 5 °C: ρ_in 0.26 (below the 0.35 activity floor → 85360 failure risk in a cold fridge), ρ_mix 0.93 fine, credit 0.30 % → proof ≈ 1.5 h.

---

## 11. Worked examples (from `run5.txt`)

### A. now Fri 18:00, bake Sat 20:00 (L 26 h), 6 pizzas, eat 4, rest Sun 20:00, H 0.65, 30 °C (night 26), fridge 5 °C → PLAN B
Recipe: dough 1714 g, flour 999 g. Poolish 250 g maida + 250 g water at 20 °C + 5 g honey + **1.10 g IDY** (0.44 %). Final: 550 g maida + 200 g fine atta + 400 g water at 12 °C + 35 g salt + 30 g oil + **0.20 g IDY** (dissolved in 50 g of the water at 32 °C).
Timeline: Fri 18:10 make poolish → Fri 20:10 (2 h counter, ρ_in 0.54, "rising, bubbly") seal and refrigerate → Sat 16:10 poolish out, used cold (ρ 1.08, M 0.87) and mix immediately, DDT 23 °C → 16:35 bench rest 20 min → 16:55 ball 6 × 280 g (2 balls straight to the fridge, see leftovers) → 19:35 start poke-testing → **19:48 ready** (P 2.71 h; y_eff 0.115 %; EQ 4.3 eq-h; D 0.75 of cap 3.5 h) → 19:25 light oven → 20:00 first launch, pizzas at 20:00/20:03/20:07/20:10 → over-proofed after 20:18.
Leftovers (Δ 24 h): fridge allowed (D_2 1.52 ≤ 1.6, warn + re-ball): at Sat 19:45, when the first balls pass the poke test, degas and re-ball the 2 spare balls gently, oil, seal, fridge; Sun 18:41 take out (X 1.3 h at 30 °C); poke-test at take-out; stretch to 26–28 cm. Alternative offered: freeze 2 balls un-proofed at Sat 17:10, fridge Sat 22:00 (window rule), out Sun 15:40 (P 4.3 h).

### B. now Sat 10:00, bake 19:00 (L 9 h), 3 pizzas, all eaten, H 0.65, 32 °C (night 28) → PLAN A-cold (T ≥ 31)
Recipe: dough 857 g, flour 500 g. Poolish 125 g + 125 g water at 20 °C + 1.2 g honey + **0.95 g IDY** (0.76 %). Final: 275 g maida + 100 g atta + 200 g water + 17 g salt + 15 g oil + **0.90 g IDY**.
Timeline: 10:19 make poolish (2.5 h counter) → 12:49 poolish at peak (ρ 0.99), mix with ice water (2 °C) and 28 % of the final water as crushed ice, DDT 22 °C → 13:04 rest 15 min → 13:30 ball → 13:50 (20 min on the counter) → 14:00 fridge, lid ajar 1 h → 17:30 take out (F_out 0.79, core 7 °C) → 18:47 ready (1.3 h: ferment-limited 1.29 h, core-limited 1.17 h) → 18:25 light oven → 19:00 launch; over-proofed by 19:12 (keep the third ball in the fridge until 18:00). D 0.42 of cap 2.9 h.
Warm alternative (not chosen): plan A warm, poolish 0.95 g at 13:14, mix 15:44, ball 16:24, ready 18:27, over by 18:47 — a 20-min window, which is why the engine chooses cold balls at 32 °C.

### C. now Mon 09:00, bake Wed 20:00 (L 59 h), 8 pizzas, eat 5, rest Sat 14:00, H 0.62, 26 °C (night 22) → PLAN B (starts later)
Recipe: dough 2285 g, flour 1356 g. Poolish 340 g maida + 340 g water at 26 °C + 7 g honey + **1.10 g IDY** (0.32 %). Final: 745 g maida + 270 g atta + 500 g water at 21 °C + 47 g salt + 41 g oil + **0.10 g IDY**.
Timeline: nothing to do until Tue 15:53 make poolish → Tue 18:23 (2.5 h, ρ_in 0.61) refrigerate → Wed 14:23 out, 20 min rest → 14:43 mix DDT 24 °C → 15:08 rest 30 min → 15:38 ball 8 × 280 g (3 to the freezer at 15:53) → 19:10 poke-test from → 19:46 ready (P 3.96 h; D 0.93 — amber "poke-test early") → 20:00 launch; over after 20:36.
Leftovers (Δ 66 h): FREEZER planning mode: 3 balls frozen un-proofed at Wed 15:53 (3 cm pucks, oiled, tray 2–3 h then wrap); move to the fridge Fri 22:00; Sat 07:37 take out (P_thaw 6.4 h at 26 °C with yeast × 0.85); Sat 14:00 bake; over by 14:55.
Alternative plan C for the same inputs (if `prefer_cold_balls`): poolish Mon 17:30 (1.5 g), mix Tue 15:49 DDT 20 °C water 5 °C, ball 16:45, fridge Tue 17:15 (lid ajar 1 h), out Wed 17:15 (hold 24 h, F_out 0.51), ready 21:17 — later than the 20:00 bake and D 1.23 → the engine would shorten the hold to 20 h and pull at 16:00; shown here to illustrate why B is the default at 26 °C.

### D. now Sat 12:00, bake 16:00 (L 4 h), 2 pizzas, 22 °C → PLAN E (emergency)
Recipe: dough 571 g, flour 333 g: 265 g maida + 65 g atta + 215 g water at 20 °C + 12 g salt + 10 g oil + **0.55 g IDY** (0.165 %), DDT 26.5 °C. 12:00 mix → 12:25 rest 15 min → 12:40 ball → 14:45 poke-test from → 15:47 ready (P 2.96 h, D 0.58) → 15:25 light oven → 16:00 launch; over by 16:32. Warning: "direct same-day dough, least flavour".

### E. winter: now Sat 15:00, bake Sun 14:00 (L 23 h), 4 pizzas, 16 °C (night 14), H 0.65 → PLAN B
Recipe: dough 1142 g, flour 666 g. Poolish 165 g maida + 165 g water at 28 °C (lukewarm) + 3.5 g honey + **1.80 g IDY** (1.08 %). Final: 365 g maida + 135 g atta + 265 g water at 40 °C (capped; dough starts at 23 °C) + 23 g salt + 20 g oil, no added yeast.
Timeline: Sat 15:00 make poolish → Sat 19:00 (4 h counter, ρ_in 0.71) refrigerate → Sun 06:49 out, rest 20 min → 07:09 mix → 07:34 rest 30 min → 08:04 ball → proof in the warmest room / oven with the light on (28–30 °C) if available → 12:40 poke-test from → 13:37 ready (P 5.4 h; D 0.55) → 13:25 light oven → 14:00 launch; over after 15:22 (wide window — cold kitchens forgive).

---

## 12. Design choices where the research disagrees (and why)
1. **Rate curve = Craig's chart (Q10 ≈ 3–4), not Q10 = 2** (BakersMath, PizzaLogic): only the chart is fitted to pizza-dough readiness; Q10 = 2 tools overstate yeast 3–6× for 28–34 °C kitchens (calculators-audit §2.12).
2. **Cold stages are integrated with the ramp, not a flat "fridge = 1/10"** (RafCalc) or a single cold-ferment percentage (Jordo/dough.school 0.1 % vs Craig 0.73 % for 24 h at 4 °C): the disagreement is entirely about hidden warm hours, which the ramp makes explicit.
3. **Poolish dose ≈ 1–2 g, not the handoff's 5–7 g**: every credible source puts a poolish at 0.03–0.6 % of its flour; the model shows the 5 g dose "works" by over-ripening (ρ 1.8, M 0.23) and that the same leavening is obtained with 1 g at ρ 1.1 — with less protease/acid load on weak gluten and a poolish that cannot collapse on the counter. The handoff's 3–3.5 h proof is reproduced either way.
4. **Ball before any fridge stage** (Lehmann/PizzaBlab) rather than cold bulk (Forkish/Ooni/Vito): the bulk's ~2 uncontrolled eq-h and 12 h warm core are the handoff's "higher overproofing risk"; a cold bulk is not offered.
5. **Warm proof at 28–30 °C, cold balls at ≥ 31 °C**: hot-climate sources (Ooni −50 % yeast above 28 °C, PizzaStunde, Nocerino) versus the handoff's validated 3–3.5 h at 28 °C — the cap integral draws the line at 31 °C where the window drops below 30 min.
6. **Maida hold limits from the maturation integral** (≈ 40 h cold from mixing, ≈ 24 h for proofed leftovers) sit between flour-strength's 24 h and cold-ferment's 48 h and match the handoff's "another 18–24 h".
7. **Salt 3.5 % kept** (handoff, protease brake) with the ×1.08 slowdown; oil default cut from ~5 % to 3 % (500 °C oven; hydration-and-oven), user-adjustable to 5 %.
8. **Freeze un-proofed at balling (planning mode)** over Vito's 2020 "freeze at readiness": preserves gas retention on weak flour (Ooni/Lehmann/Pizzablab; Vito 2022 himself).

---

## 13. Unit tests (assert in code)
1. `r(5)=0.055, r(20)=0.50, r(28)=1.35, r(35)=1.85, r(45)=0, r(-18)=0`.
2. `eq_ready(0.096)/r(T)` ≈ 88 h (5 °C), 40 (10), 17.6 (15.6), 8.0 (21.1), 4.8 (25), 3.0 (30) ± 5 %.
3. Single-stage yeast: 7 h @25 → 0.056 %; 4 h @25 → 0.125 %; 24 h @4 → 0.82 %; 48 h @4 → 0.30 %; 72 h @2.8 → 0.24 %; 24 h @20 → 0.026 %; 8 h @16.7 → 0.23 %.
4. Multi-stage 6 h @20.5 + 32 h @3.5 → 0.103 % (±3 %).
5. Poolish: hours to peak 2 % @28 = 1.6; 0.28 % @22 = 7.3; 0.055 % @22 = 15.3; 0.57 % @20 = 7.3.
6. `cap(22)=7.8, cap(28)=4.3, cap(5)=42`.
7. Thermal: ball 26 → 5 °C fridge 4 h = 0.91 eq-h, T 6.5 °C; bulk = 1.95 eq-h; ball 5 → 30 °C room 3 h = 1.83 eq-h.
8. Handoff replay → P = 3.1 h (3.0–3.5 accepted), D ≈ 0.73.
9. Plan B at 28 °C, 6 pizzas, T_f 5, L 26 h → poolish 1.0 g, P 3.2–3.5 h, D < 0.9.
10. Example B selects A-cold; example D selects E; example C starts Tue 15:53 (wait step present).
11. Leftover Δ 24 h at 30 °C → fridge with re-ball warning; Δ 66 h → freezer with fridge move at 22:00.
12. Rounding: 1.74 g → 1.7; 0.67 → 0.65; 0.19 → dilution rule.

---

## 14. Rules (single testable statements)
R1 `r(T)` is the §3.1 table, linearly interpolated, 0 below 0 °C; never a Q10 = 2 rule.
R2 Fermentation progress `EQ = Σ r(T_core + heat)·Δt` with Δt = 5 min; stages are never counted as raw hours.
R3 Core temperature follows Newton cooling with τ = 1.5 h (tray balls), 2.75 (sealed box), 4.5 (bulk ≤ 2 kg), 2.0 (poolish ≤ 600 g); self-heating +0.5 °C/h above 20 °C, cap +2 °C.
R4 Direct-dough ready when `EQ ≥ 0.944·y^−0.695·S_salt`, `S_salt` = 1.00/1.03/1.08 at 2.5/3.0/3.5 % salt; usable window F 0.90–1.10; over-proofed at F 1.2.
R5 Maturation `D = Σ 2^((T−22)/7)·Δt / 7.8` from end of mixing; plans require D ≤ 1.0 at launch (amber 0.85–1.0); re-balled leftovers ≤ 1.6.
R6 Poolish peaks at `EQ = 0.6 + 2.3·y_p^−0.5`; designed ρ = 1.1 at mixing; ρ_in 0.35–0.90 at fridge-in; ρ > 1.6 warn, > 2.5 discard.
R7 Poolish yeast credit `y_p·PFF·M(ρ)`, `M = 1` for ρ ≤ 1, `max(0.15, e^(−1.8(ρ−1)))` above; M_K = 1.8 is the flour calibration constant (handoff replay → 3.1 h).
R8 Poolish IDY 0.10–3.5 % of poolish flour (plan A ≤ 1.5 %); all yeast grams rounded down to 0.05 g (< 1 g) or 0.1 g (≥ 1 g); < 0.20 g → 1:10 dilution instruction; fresh = 3 × IDY, ADY = 1.33 × IDY.
R9 Recipe: dough = n·W_ball·1.02; F_t = dough/(1+H+salt+oil); PFF 0.25 (fallback 0.20, 0.15); poolish 100 % hydration; honey 2 % of poolish flour (1 % plan A, 0 plan E); water_final = H·F_t − F_p; flours/water to 5 g, salt/oil to 1 g.
R10 Hydration 0.60–0.68, default 0.65, warn > 0.66; clamp ≤ 0.65 in plan E and at T_day ≥ 31; salt 2.8–3.5 % default 3.5; oil 0–5 % default 3; sugar in the final dough = 0.
R11 Water temperature `WT = 4·DDT − T_flour − T_day − T_poolish − 15` (3-factor without poolish); DDT 23/24/25.5 °C by room band (≥ 28 / 21–27 / ≤ 20), 20 °C for cold-held balls (22 for holds < 6 h), 25–26.5 °C plan E; WT clamped 2–40 °C with ice fraction = DDT-shortfall/20 (≤ 0.5) and flour chilled to 8 °C when shortfall > 6 °C.
R12 Plan selection: L < 2.5 h refuse; < 4.5 h plan E; < 12.5 h plan A (A-cold if T_day ≥ 31 or preferred); ≥ 12.5 h plan C if T_day ≥ 31 or preferred, else plan B; first step later than now → "wait until" step.
R13 Plan B: poolish counter time searched 1.5/2/3/4 h (by band) up to 4 h so that the ball proof ≥ 0.9·P_target; poolish fridge hold 8–20 h; poolish out 20 min before mixing at ≤ 27 °C, used cold at ≥ 28 °C; `P_target = clamp(0.75·cap(T), 2.0, 5.5)`; added IDY only if the poolish credit leaves P > P_target.
R14 Plan C: DDT 20 °C, ball → 20 min counter → fridge lid ajar 60–90 min → hold 3–24 h (≤ 12 h if T_f ≥ 7) → out `max(P_ferment, t_core)` before baking; two pull waves 30 min apart above 28 °C for > 6 balls.
R15 Plan A: poolish counter 1.5–6 h at ρ = 1.0 with dose ≤ 1.5 %; P_target clamp(0.75·cap, 1.5, 4.0); A-cold adds a 3.5 h fridge hold and a ≈ 1.2–1.4 h warm-up.
R16 Plan E: no poolish, H ≤ 0.65, DDT 25–26.5 °C, 15 min rest, IDY from solve_yadd over the whole window; refuse if D > 1.0.
R17 Structural times: mixing 25 min, bench rest 30/20/15 min (≤ 27 / 28–30 / ≥ 31 °C), balling 10 min, stretch 15 min before launch, oven lit 35 min before launch, pizza k at +3.5·(k−1) min.
R18 Readiness: poke-test start at F 0.9; ready at F 1.0 and ~1.75× volume; over-proof rescue = re-ball once, rest 60/90/120 min by band, never > 2.5 h.
R19 Leftovers: Δ ≤ 2 h (1.5 h > 28 °C) room; Δ ≤ 24 h and T_f ≤ 6.5 and D_2 ≤ 1.6 → fridge at the first poke-test pass, re-ball if D_2 > 1.2, take out at `t_bake2 − clamp(1.5·ln((T_2−T_f−1)/(T_2−core_target)),0.75,3)`; otherwise freeze un-proofed at balling, fridge at t_bake2 − 16 h (shifted to 22:00 if 00:00–07:00), out at t_bake2 − max(P_ferment with yeast × 0.85, t_core); best ≤ 14 d, ≤ 30 d acceptable, > 90 d refused; never refreeze.
R20 Core target for a 450–500 °C oven: 18 °C at 22 °C room rising 0.25 °C per °C to 21 °C; `min(18, T_room − 4)` below 22 °C.
R21 Warnings per §9 table; fridge ≥ 7 °C halves cold hold caps and prints the thermometer advice; T_day ≥ 35 refuses warm stages.
R22 Batch: F_p > 600 g → two poolish bowls; dough > 2 kg → two rest containers; n > 16 refused.
R23 Poolish water 20 °C at ≥ 28 °C room, room temperature at 19–27, 28 °C at ≤ 18; never ice water in the poolish.
R24 Calibration knobs exposed in settings (with defaults): M_K 1.8, CAP22 7.8 h, FF 15 °C, τ_ball 1.5 h; the app logs poke-test outcomes (early/on-time/late) to adjust M_K and CAP22.

## 15. Open calibration items
1. M_K (poolish credit decay) rests on one datapoint; two logged plan-B batches (1.0 g poolish vs the old 5 g) at 28 °C settle it.
2. CAP22 = 7.8 h and the 7 °C doubling are inferred (flour-strength, Masi, Lehmann); a six-ball fridge test pulled at 12/24/36/48 h pins the cold cap.
3. FF for a 12–17 min knead is unmeasured — one thermometer reading at end of mixing fixes it.
4. τ_ball = 1.5 h on the user's own tray — one evening with a probe.
5. Fridge stratification (3–8 °C) is the largest single error source — a Rs 500 fridge thermometer on the dough shelf.
6. Plan A in cool kitchens (≤ 24 °C, < 12 h lead) uses a young poolish; validate or route users to plan B.
