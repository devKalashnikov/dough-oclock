# SPEC "flavor" — deterministic dough scheduler, quality-first (poolish + cold fermentation within what weak maida tolerates)

Author angle: maximise flavour and texture (25 % poolish, cold-fermented balls whenever the lead time allows) using the expert/creator practice and AVPN/Forkish-style benchmarks, then make every branch safe for a 28–34 °C Islamabad kitchen and a home fridge that drifts. Every constant below carries a one-line justification and a source URL taken from the research notes in this folder. Where the research disagreed I say which side I took and why.

Reference implementation used to compute every number in §9: `../flavor_head.py` + `../flavor_plan.py` (Python, 5-minute integration steps). A developer can port those two files to plain JavaScript line by line.

---

## 0. Design stance (read first)

1. **One dough family, one calibration point.** The engine is anchored on the ONE thing that has been measured on this flour: Dawood's 25 % poolish dough, 280 g balls, cold water, 3.5 % salt, ~5 % oil, proofed **3–3.5 h at 28 °C** (context-handoff.md §3). Every other warm-stage duration is derived from that anchor by a temperature curve; every cold-stage duration from TXCraig1's chart. Nothing in the app extrapolates further from the anchor than the research supports.
2. **Poolish is the flavour engine, the fridge is the safety engine.** The poolish (Vito-class, refrigerated after a short warm phase) gives flavour and extensibility without extending the final dough's warm time; extra lead time is always put into a *cold* stage (poolish hold, then cold-held balls), never into more warm hours. This is the unanimous recommendation of temperature-kinetics §4.5, flour-strength-maida §4.2, avpn-and-classic §4C, calculators-audit §4.
3. **Two clocks.** A *yeast clock* (progress to "ready", 25 °C-equivalent hours) decides when a ball is ready; a *degradation clock* (protease, Q10 = 2) decides how much total age the weak flour can take. RT time is limited by the yeast clock (the dough over-proofs), total age by the degradation clock (the gluten dissolves). Sources: temperature-kinetics §2.8, flour-strength-maida §2.3/§4.2, cold-ferment-logistics §4.3.
4. **Time before yeast.** With this flour the app changes *when* things happen (warm phase length, fridge holds, start delay) and keeps yeast doses in a narrow validated band; it only adds final-dough yeast in cold kitchens and only when the addition is weighable (≥ 0.3 g). Rationale: hot-climate-dough §3.10 and yeast-model §4.9 (under-dose rather than over-dose; weak maida's failure mode is over-fermentation).
5. **Deterministic solver, not a table of hours.** Each plan is a list of stages (duration, environment temperature, thermal time-constant). The engine integrates the rate curve over the dough's temperature trajectory and *solves* the last warm stage so that progress hits 1.00 at bake time. Tables in this spec are outputs of that solver (for tests), not inputs.

Symbols and units: temperatures in °C, times in hours (h) unless "min", masses in grams, percentages as fractions in formulas (0.65) and as % in text. `T_room` = kitchen temperature where dough sits by day; `T_night` = 22:00–07:00 temperature; `T_f` = fridge shelf temperature; `L` = lead time = bake − now (h); `n` = pizzas; `n1` = pizzas in first sitting; `t2` = second-sitting bake time; `F` = total flour; `Fp` = poolish flour.

---

## 1. INPUTS (with defaults and valid ranges)

| Input | Symbol | Default | Range / validation | Notes |
|---|---|---|---|---|
| Now | `now` | device clock | — | rounded down to 5 min |
| Bake time (first pizza) | `bake` | — | `bake − now` ≥ 2.35 h else REFUSE (§8) | |
| Pizzas total | `n` | 4 | 1–12 integer | > 9 at 280 g → warning W7 (split batches) |
| Pizzas in first sitting | `n1` | `n` | 1–`n` | leftovers `n2 = n − n1` |
| Second-sitting bake time | `t2` | none | `t2 > bake` if given | optional; if `n1 < n` and `t2` missing, §7.6 default text |
| Hydration | `h` | 0.65 | 0.60–0.68; hard cap 0.68; at `T_room ≥ 31` cap 0.65 | 0.66–0.68 → warning W5 |
| Room temperature (daytime, where dough proofs) | `T_room` | 28 | 12–38; > 34 → warning W2 and clamp to 34 for maths | if an AC room is available the user enters that temperature |
| Night temperature (22:00–07:00) | `T_night` | `max(12, T_room − 4)` | 8–38 | Sept nights 24–27 °C vs 28–34 °C days (context-handoff) |
| Fridge temperature | `T_f` | 5 | 2–9; ≥ 7 → warning W4 | measured on the dough shelf if possible |
| Ball weight | `W` | 280 | 200–300 | prints "stretch to 31–32 cm, centre 2–3 mm" at 280 g |
| Flour blend | fixed | 80 % maida + 20 % fine chakki atta | — | constant; profile "weak, W≈180" |
| Salt | `s` | 0.030 | 0.025–0.035 | 0.035 = handoff's "Toss-style" saltier crumb (×1.03 time) |
| Oil | `o` | 0.030 | 0–0.05 | 3 % default: between hydration-and-oven's 2 % and the handoff's 5 % |
| Yeast type | `yeast` | IDY (Saf-Instant red) | IDY / fresh khameer (compressed block only) | fresh = 3 × IDY grams, timings unchanged |
| Prefer cold-fermented balls (advanced) | `force_cold` | false | — | forces plan P-COLD whenever feasible |
| Oven | fixed | CasaKoa gas, floor 380–420 °C, dome 450–500 °C, 60–90 s | — | |

Yeast conversion: fresh (true compressed khameer) = IDY × 3 (AVPN 2024 "1 g dry = 3 g fresh", https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf; Hamelman/Weekend Bakery ×3). If the "khameer" is a naan-bakery sticky starter, do not convert — show "unknown strength, not supported" (hot-climate-dough §2.7).

---

## 2. RECIPE MATH (baker's percentages)

All rounding: flour and water to 5 g; salt to 0.5 g; oil to 1 g; honey to 1 g; IDY to 0.1 g (poolish) and DOWN to 0.05 g (final dough top-up, emergency dough).

```
dough_total = n × W × 1.02                      # 2 % scrap allowance (hydration-and-oven §4.2)
F  = round5( dough_total / (1 + h + s + o) )    # total flour; the ~0.1–0.5 % yeast is ignored in the divisor
Fp = round5( 0.25 × F ); if Fp < 100: Fp = min(100, round5(0.30 × F))   # poolish flour, 25 % PFF, hard cap 30 %
Wp = Fp                                         # poolish water: always 100 % hydration
honey = round1( 0.02 × Fp )   for fridge-held poolish; = 0 for same-day poolish and for direct dough
maida_final = round5( 0.80 × F − Fp )
atta        = round5( 0.20 × F )
water_final = round5( h × F − Wp )              # cold water; see §2.2 for its temperature
salt = round0.5( s × F )
oil  = round1( o × F )
```

Checks: `maida_final ≥ 0` (always true at PFF ≤ 30 % since maida is 80 %); `F ≤ 1500` else W7.

Justifications and sources:
- Pre-fermented flour 25 %, cap 30 %: Scott on pizzamaking "over 25 % isn't the safest" (https://www.pizzamaking.com/forum/index.php/topic,78883.0.html); Dough Formula "keep 20–30 % if timing is unreliable" (https://thedoughformula.com/fundamentals/preferments-101/); poolish-science §4 R1; flour-strength-maida §3.10 (poolish flour counts as spent).
- Poolish 100 % hydration, no salt: Hamelman *Bread* ch. 4 (https://catalogimages.wiley.com/images/db/pdf/0471168572.excerpt.pdf); Vito 300/300 (https://www.youtube.com/watch?v=u7Hd6ZzKgBM).
- Honey 2 % of poolish flour (5 g per 250 g) only in a poolish that is ≥ 8 h old at mixing; none in a same-day poolish or in the final dough at a 380–420 °C floor: Lehmann "too hot for sugar" (https://www.pizzamaking.com/forum/index.php/topic,60583.0.html), flour-strength-maida §4.5, hydration-and-oven §4.5.
- Hydration band 0.60–0.68, default 0.65: Gozney 58–65 % (https://us.gozney.com/blogs/news/pizza-dough-hydration-explained), Ooni 60–65 % (https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained), Modernist 62.3 % (https://modernistcuisine.com/recipes/neapolitan-pizza-dough-recipe-2/), handoff-validated 65 % on this blend; hydration-and-oven wanted 62 % default — I keep 65 % because it was validated and the 20 % atta raises absorption 3–5 points (Baking Steel, https://bakingsteel.com/blogs/recipes/blogs-recipes-pizza-dough-hydration).
- Salt 2.5–3.5 %, default 3.0 %: AVPN 40–60 g/L (2.2–3.75 %); PizzaBlab "Neapolitan 3 % to compensate for the flour's lack of strength" (https://www.pizzablab.com/learning-and-resources/ingredients/the-role-of-salt-in-dough/); Pete-zza "more salt slows protease" (https://www.pizzamaking.com/forum/index.php/topic,12605.0.html).
- Oil 0–5 %, default 3 %: Lehmann 2–5 % (https://pizzatoday.com/news/oil-n-dough/128591/); flour-strength-maida §4.3 "prefer 3 % over 5 % if slack".
- Ball 280 g → 31–32 cm at 0.35–0.40 g/cm²: AVPN 280 g → 28–35 cm (Disciplinare 2024), Fond table (https://fond.kitchen/glossary/dough-ball/), handoff "280 g balls came out thick at 8–9 in".

### 2.1 Worked recipe, 6 × 280 g at 65 % / 3 % / 3 %
dough 1714 → F 1000: poolish 250 g maida + 250 g water + 5 g honey + IDY (§4.1); final 550 g maida + 200 g atta + 400 g cold water + 30 g salt + 30 g oil. Total ≈ 1718 g.

### 2.2 Water temperature (DDT rule)
```
DDT (desired dough temperature):  P-RT / S plans: 23 (25 if T_room ≤ 20);  P-COLD: 20;  E (emergency): 26
FF = 15                                      # friction factor, KitchenAid speed 1–2, ~12 min knead; user-calibratable
T_flour = T_room (unless the user chilled the flour: then 8)
T_pool  = T_f + 1 if the poolish is used cold; T_f + 7 after a 30 min rewarm; T_room for a same-day poolish
with poolish:    T_water = 4 × DDT − T_flour − T_room − T_pool − FF
without poolish: T_water = 3 × DDT − T_flour − T_room − FF
clamp 1 ≤ T_water ≤ 40
if T_water < 8  → print "ice water: melt ice into the water, remove the ice before weighing"
if the unclamped value < 1 → also print "chill the flour and the mixer bowl 30 min; replace 20 % of the water with ice by weight"
if T_water > 30 → print "lukewarm water (never above 40 °C)"
```
Sources: King Arthur DDT formula and measured KitchenAid FF 12–13 °C for 7 min (https://web.archive.org/web/2019id_/https://www.kingarthurflour.com/blog/2018/05/29/desired-dough-temperature); +1 °C per extra 2 min knead → 15 °C for a 12-min knead (temperature-kinetics §4.3); DDT targets 23 °C warm-room RT ferment / 18–23 °C for cold ferment (PizzaBlab, https://www.pizzablab.com/learning-and-resources/mixing-kneading/final-dough-temperature/); Ooni "warm months 21–23 °C" (https://eu.ooni.com/blogs/recipes/ooni-neapolitan-style-pizza-dough). One-time calibration: `FF = 4 × measured_FDT − T_flour − T_room − T_pool − T_water_used`.

Mixing procedure text (fixed, from context-handoff §3, flour-strength-maida §4.3): flours + poolish + 80 % of the water, speed 1, 3–4 min → rest 10–20 min (never > 30) → salt, 1 min → remaining water in a stream, 2 min → knead speed 1–2, 8–10 min → oil, 3–4 min → total mixer time ≤ 20 min. If strandy: stop, damp cloth 15–20 min, knead 3–5 min, ≤ 3 cycles; never add flour.

---

## 3. TEMPERATURE MODEL

### 3.1 Rate curves (relative fermentation rate, 25 °C = 1.00)

**`r_cold(T)` — yeast-growth curve (TXCraig1 chart blend).** Used for (a) the direct/emergency dough at every temperature, (b) every stage of every dough while the dough is ≤ 10 °C (fridge), (c) the frozen-thaw stage.

| T °C | 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 12 | 14 | 15 | 16 | 18 | 20 | 22 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 34 | 35 | 36 | 38 | 40 | 42 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| r | 0.020 | 0.030 | 0.037 | 0.045 | 0.055 | 0.065 | 0.077 | 0.090 | 0.120 | 0.160 | 0.215 | 0.250 | 0.290 | 0.400 | 0.500 | 0.680 | 0.880 | 1.000 | 1.130 | 1.240 | 1.350 | 1.480 | 1.600 | 1.680 | 1.750 | 1.830 | 1.850 | 1.830 | 1.600 | 1.200 | 0.600 |

Interpolate linearly in `ln r` between rows; clamp T to [0, 42]. Source: temperature-kinetics §4.1 table (blend of TXCraig1's published chart recovered via BeanAnimal and his Gänzle-fit parameters a = 0.02645608, b = 2.037020784, c = −0.198964236, Tmax 45 °C, https://www.pizzamaking.com/forum/index.php/topic,26831.0.html; peak from Pyler via https://web.archive.org/web/2018id_/http://www.theartisan.net/dough_fermentation_and_temperature.htm). Fridge values 0.045 at 4 °C / 0.090 at 8 °C are the reason a drifting fridge doubles fermentation (yeast-model §2.3, cold-ferment-logistics §2.7).

**`r_pd(T)` — poolish-leavened ("high-inoculum") dough curve.** Used for every warm stage of the poolish dough (final dough after mixing, ball proof, temper) and for the poolish warm phase.
```
T ≤ 10:   r_pd = r_cold(T)
T ≥ 18:   r_pd = 2.3^((min(T,34) − 25)/10)          # Q10 = 2.3
10<T<18:  log-linear bridge between r_cold(10)=0.120 and r_pd(18)=0.558
```
Values: 12 → 0.176, 14 → 0.259, 16 → 0.380, 18 → 0.558, 20 → 0.659, 22 → 0.779, 24 → 0.920, 25 → 1.000, 26 → 1.087, 28 → 1.284, 30 → 1.517, 32 → 1.791, 34 → 2.116 (capped).

Why two curves (the one place I depart from a single-curve design): Craig's chart is a *time-to-ready* model for low-inoculum doughs, where yeast *growth* compounds (effective Q10 3.2–4, temperature-kinetics §2.3). A dough carrying a ripe 2 %-IDY poolish is at high inoculum from minute one; its warm-stage timing follows the metabolic rate (Q10 ≈ 2–2.3). Three researchers independently derived Q10 2.3 for this dough's ball proof (cold-ferment-logistics §4.1, hot-climate-dough §4.4 "×1.5 per 5 °C", expert-videos §4.4 "×2 per 8–10 °C"), and the handoff's own pair (3–3.5 h at 28 °C vs 4–5 h "cooler") implies Q10 ≈ 1.9–2.3. In the fridge both regimes converge on Craig's values (Lehmann-type doughs are high-inoculum too), so the same cold numbers are used.

**`d(T)` — degradation (protease/glutathione) clock, Q10 = 2:** `d(T) = 2^((T − 25)/10)`; 4 °C → 0.23, 7 °C → 0.29, 16 °C → 0.54, 22 °C → 0.81, 28 °C → 1.23, 32 °C → 1.62. Source: enzyme Q10 ≈ 2 (PizzaBlab https://www.pizzablab.com/learning-and-resources/fermentation/factors-affecting-fermentation-rate/; JayArr "enzymes retain 40–50 % at 4 °C" https://jayarr.pizza/blog/maturation-vs-fermentation-pizza-dough/; proofit "above 28–30 °C protease outruns fermentation" https://proofit-app.com/en/blog/bulk-fermentation-temperature).

### 3.2 Stage integration
A stage = (`hours`, `T_env`, `tau`, optional `T_dough_start`). Dough temperature follows Newton cooling toward `T_env`: `T(t+Δ) = T_env + (T(t) − T_env) · e^(−Δ/tau)`; `tau = null` means the dough is instantly at `T_env`. Step Δ = 5 min. Accumulate:
```
EQ += rate(T) × Δ        (rate = r_pd for the poolish dough, r_cold for direct dough / frozen thaw)
D  += d(T) × Δ
```
Thermal time constants (temperature-kinetics §4.4, cold-ferment-logistics §2.3, PizzaBlab "balls at 4 °C for 20 of 24 h, bulk only 5 of 24 h" https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/):

| Body | tau |
|---|---|
| 250–300 g ball, spaced on an oiled tray, film loosely on, in or out of the fridge | **1.5 h** |
| Same balls in a sealed stacked box | 2.75 h (not used by default; warning text tells the user to leave the lid ajar 60–90 min) |
| 1.3–2 kg bulk mass | 4.5 h (the app never schedules a cold bulk — see §5.4) |
| Poolish 250–500 g in a bowl | 2.0 h (informational only; poolish timings are tabled) |
| Mixing stage | tau = null, dough at DDT |

Environment temperature by clock: fridge stages `T_env = T_f`; room stages `T_env = T_room` between 07:00 and 22:00, `T_night` otherwise (evaluated per 5-min step from the wall clock).

Precomputed sanity values (unit tests): 280 g ball at 26 °C into a 5 °C fridge accrues **0.91 eq-h** in its first 4 h (`r_cold`); a 1.6 kg bulk **1.94 eq-h**; a ball out of a 5 °C fridge into a 30 °C room accrues **1.97 eq-h** in 3 h (`r_pd`). These reproduce temperature-kinetics §2.12 (1.1 / 2.2 / 1.94) within its stated tolerance.

Ignored on purpose: dough self-heating (+0.5 °C/h, Lehmann) — below model noise; hydration and oil effects on rate (calculators-audit §4 "ignore"); salt handled as a 3 % factor in §4.3.

---

## 4. YEAST MODEL

### 4.1 Poolish presets (fixed doses, temperature-banded)
The poolish is a Vito-class *sponge* (1.2–2.8 % IDY of poolish flour), not a classical 0.1 % overnight poolish: only this class is safe in a 28–34 °C kitchen (expert-videos §3.4, poolish-science §2g), and it is the class the handoff validated. Within the class the yeast population is set by sugar exhaustion at the peak, not by the inoculum (idaveindy in https://www.thefreshloaf.com/node/68346/pizza-poolish-looking-right-amount-yeast; poolish-science §2d), so the dose is chosen for **warm-window safety** (less yeast when hotter), and the final dough's timing does not change with it (§4.2).

Doses are per 250 g poolish flour; scale linearly: `g = band_g × Fp / 250`, round to 0.1 g.

| `T_room` | Fridge-held poolish (plans P-RT, P-COLD): IDY / water T / warm phase `t_pw` | Same-day poolish (plan S, no fridge, used at peak): IDY / water T / warm phase `t_pw_same` |
|---|---|---|
| ≤ 18 | 5.0 g / 25 °C lukewarm / **2.5 h** | 7.0 g / 25 °C / **3.5 h** |
| 19–22 | 5.0 g / room / **2.0 h** | 7.0 g / room / 3.5 h (≤ 20) or **3.0 h** (21–24) |
| 23–24 | 5.0 g / fridge water 9 °C / **1.75 h** | 7.0 g / 9 °C / 3.0 h |
| 25–26 | 4.0 g / 9 °C / 1.75 h | 5.0 g / 9 °C / **2.5 h** |
| 27–29 | 4.0 g / 9 °C / **1.5 h** | 5.0 g / 9 °C / 2.5 h (27) or **2.25 h** (28–29) |
| 30–32 | 3.0 g / ice water 5 °C / 1.5 h | 4.0 g / 5 °C / **2.0 h** |
| ≥ 33 | 3.0 g / 5 °C / **1.25 h** | 4.0 g / 5 °C / **1.75 h** |

Rules attached to the table:
- The warm phase ends on the **visual cue, not the clock**: "to the fridge (or into the mix) when the surface is domed and covered in bubbles and the centre has *just* started to flatten; if that happens 20 min early, go early". Print predicted time ± 20 min (± 30 min at ≥ 30 °C).
- Never leave a poolish on the counter past `t_pw + 0.5 h` at ≥ 28 °C; a poolish that sank below a visible high-water line and smells sharp/boozy is discarded and remade (weak maida: TXCraig1 "dissolved the gluten", https://www.pizzamaking.com/forum/index.php?topic=10237.0; Pizzablab https://www.pizzablab.com/the-encyclopizza/poolish-preferment/).
- Fridge hold `H_p` for a fridge-held poolish: **3 h ≤ H_p ≤ 24 h** at `T_f ≤ 5`; ≤ 16 h at 6–7 °C; ≤ 12 h at ≥ 8 °C. Below 3 h use the same-day preset instead. Sealed, no holes.
- Rewarm after the fridge `t_rw`: 30 min at ≤ 27 °C; 15 min at 28–30 °C; 0 (use cold) at ≥ 31 °C.
- Poolish age at mixing (warm + fridge) hard cap 30 h → else "remake the poolish".

Sources: handoff table (5 g / 1.5–2 h at 28 °C validated; 7 g same-day 2–3 h; 3 g + cold water hot overnight), Vito 3 g/300 g poolish-for-beginners (https://www.youtube.com/watch?v=lAFKQoSMbxI), Vito "1–2 h depends on room temperature" (https://www.youtube.com/watch?v=4nZ3xXBmHEI), 5/4/3 g bands from hot-climate-dough §4.2 and vito-videos §4.2, "minimum 1.5 h warm at ≥ 28 °C so it is visibly rising before the fridge" (pizzamaking failures https://www.pizzamaking.com/forum/index.php?topic=85360.0), fridge hold ≤ 24 h (Vito "past 24 h it gets acid"; Fond/JayArr 24 h; poolish-science R8), same-day warm hours scaled from the validated 2.75 h at 25 °C with Q10 2.3 and capped. Decision: poolish-science's 1 g proposal was not adopted because it is unvalidated on maida and would make the final dough depend on a maturity factor nobody has measured; it is listed as a calibration experiment in §13.

### 4.2 Readiness budget of the poolish dough (the calibration constant)
```
EQ_READY_PD(s) = 4.56 × (1 + 0.06 × (s×100 − 3.0))     # 25 °C-equivalent hours from the START of mixing to "ready"
                 = 4.70 at 3.5 % salt, 4.56 at 3.0 %, 4.42 at 2.5 %
```
Derivation (must be reproduced by the developer's integrator as a unit test): stages [mix 0.5 h at DDT 23, tau null] + [rest+ball 0.6 h, env 28, tau 1.5] + [proof 3.25 h, env 28, tau 1.5], `r_pd` → 4.70 eq-h at 3.5 % salt (the handoff's validated 3–3.5 h). Salt factor ×1.03 per +0.5 % from hydration-and-oven §4.3 (Baghdad/Beck gas studies). This constant applies to **every poolish preset in §4.1** (same peak population; see §4.1 rationale) and to PFF 25 % (Fp fixed by §2). Effective Craig-equivalent IDY of this dough: `(0.944/4.56)^1.439 = 0.104 %` — used only in §4.4.

Progress `P(t) = EQ(t)/EQ_READY_PD`. **Ready** = 1.00; **poke-test from** 0.80; **over-proofed** ≥ 1.20 (window text §6.4). Weak-maida window 0.9–1.1 is enforced by the wave rule (§6.3) and by the "bake at the early side" text.

### 4.3 Direct dough (plan E only) — TXCraig1 model
```
EQ_ready_direct(y) = 0.944 × y^(−0.695)         # y = IDY % of total flour; 25 °C-equivalent hours
y_needed = (0.944 / EQ_sched)^1.439              # EQ_sched integrated with r_cold, dough at T_room (Craig's convention, no ramps)
y_E = clamp( 1.2 × y_needed , 0.10 %, 0.70 % )
grams = floor_to_0.05( y_E × F / 100 )
```
Sources: fit through Craig's chart points 0.201 % → 3 h, 0.05 % → 7 h, 0.01 % → 24 h at 25 °C (temperature-kinetics §4.2); ×1.2 safety = Craig "a bit more than it tells me" + PizzApp +20 % (calculators-audit §4); clamps: ≥ 0.10 % so the dose is weighable and the chart's 1–2 h floor is respected, ≤ 0.70 % (yeast-model §4.7, Lehmann emergency ≤ 2 %). Unit tests: 0.05 % at 25 °C → 8 h (chart 7), 0.05 % at 5 °C → 138 h (139), 0.201 % at 25 °C → 3 h, 0.224 % at 2.8 °C → 75 h (72), 0.1 % at 4 °C → 104 h (99). Output table (proof after 0.5 h mix + 0.35 h rest): 3.15 h at 22 °C → 0.26 %; 4 h at 22 °C → 0.20 %; 3 h at 25 °C → 0.16 %; 3 h at 28 °C → 0.10 %; 2.25 h at 30–32 °C → 0.10–0.11 %; 4 h at 20 °C → 0.31 %; 4 h at 16 °C → 0.68 %.

### 4.4 Final-dough yeast top-up (cold kitchens only)
No extra IDY is added to the final dough by default (Vito, Charlie Anderson, Sisofo add none; expert-videos §4.3). Only when the solved RT ball proof `t_bp` exceeds the cap `t_bp_max(T_room)` (§5.2) does the engine compute:
```
EQ_sched = EQ integrated over [mix, rest+ball, proof at t_bp_max]   (r_pd)
y_add    = max(0, (0.944/EQ_sched)^1.439 − 0.104 %)        # Craig dose-response applied to the effective dough
g_add    = floor_to_0.1( y_add × F / 100 );  if g_add < 0.3 → g_add = 0 and keep the solved t_bp (≤ cap + 1.5 h)
```
Add it dry with the flour. Cap `g_add ≤ 0.30 % × F`. Rationale: yeast-model §4.5 (0.6 × direct value ≈ 1.5 g/kg for 5 h at 20 °C), poolish-science R9 (total-yeast accounting). In practice this fires only below ~18 °C; the warm-spot warning W9 is the preferred fix.

### 4.5 Degradation cap (flour-strength guard)
`D` is integrated from the start of mixing to bake over the same temperature trajectory (`d(T)`, §3.1). Limits for maida + 20 % fine atta at PFF 25 %:
```
D_COMFORT = 10      # "best" zone; the P-COLD solver shortens the cold hold (and delays the start) to stay ≤ 10
D_HARD    = 14      # never exceeded; plans/leftover holds above it are refused → freeze or delay
```
Calibration: 48 h at 4 °C alone = 11 (the cold-ferment-logistics §4.3 hard limit for cold-balled maida; expert-videos §3.3 "48 h cap"); P-RT at 28 °C = 4.5; 8 h all-RT at 28 °C = 9.8 (warn) and 18 h at 22 °C = 14.6 (refuse) — matching avpn-and-classic §4C "refuse all-RT > 8 h at ≥ 27 °C" and flour-strength-maida's RT caps; 24 h hold at 7 °C = 11 (warn) reproducing "31 h hard at 7 °C". flour-strength-maida's stricter 24 h cold cap was not adopted: three of four researchers and the handoff's own "balls hold another 18–24 h" support 48 h. Poolish age is not counted in D (its flour is "spent" by construction; cap in §4.1).

Hard RT caps in addition to D (plain-language guards, calculators-audit §4): no single unrefrigerated stage of the final dough longer than `t_bp_max(T)` (§5.2); never schedule an unrefrigerated stage at > 34 °C.

---

## 5. PLAN SELECTION

### 5.1 Plans
| Code | Name | Shape | Flavour rank |
|---|---|---|---|
| **P-COLD** | Overnight poolish + cold-fermented balls (default for long lead) | poolish warm `t_pw` → fridge `H_p` 12–24 h → rewarm → mix (DDT 20) → rest 30 min → ball → head start `h_hs` → fridge `H_b` 10–30 h → temper `t_t` (solved) → bake | 1 (best) |
| **P-RT** | Overnight poolish + same-day ball proof (validated default) | poolish warm → fridge `H_p` 3–24 h → rewarm → mix (DDT 23) → rest 30 min → ball → RT proof `t_bp` (solved) → bake | 2 |
| **S** | Same-day poolish | poolish warm `t_pw_same` (used at peak, no honey) → mix → rest → ball → RT proof `t_bp` → bake | 3 |
| **E** | Emergency direct dough (no poolish) | mix (DDT 26) → rest 15 min → ball → proof `t_E` → bake; IDY from §4.3 | 4 ("worst option", Gemignani) |
| REFUSE | — | `L < 2.35 h` | — |

Fixed sub-durations: mix 0.5 h; rest+ball 0.6 h (rest 30 min, balling ~6 min; rest 20 min at 28–30 °C and 15 min at ≥ 31 °C are printed but the 0.6 h slot is kept for arithmetic); E rest 0.35 h; head start `h_hs` = 30 min at ≥ 28 °C, 45 min at 22–27 °C, 90 min at ≤ 21 °C (Charlie Anderson 2–4 h at ~20 °C scaled, expert-videos §4.5; Vito "15–20 min then fridge when it's hot", https://www.youtube.com/watch?v=4nZ3xXBmHEI). Oven: light at `bake − 35 min` in parallel.

### 5.2 Solved durations
- `t_bp` (P-RT, S): solve the proof stage [env `T_room`, tau 1.5] so that `P = 1.00` at its end, after [mix 0.5 h at DDT, tau null] + [rest+ball 0.6 h, env `T_room`, tau 1.5]. Bisection on 0.5–9 h. Cap `t_bp_max(T_room)`: 7.0 h (≤ 18 °C), 6.0 (19–20), 5.0 (21–24), 4.0 (25–29), 3.0 (≥ 30) — if exceeded see §4.4. Reference outputs (3.0 % salt):

| `T_room` | 16 | 18 | 20 | 22 | 24 | 25 | 26 | 28 | 30 | 32 | 34 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `t_bp` (h) | 7.6 | 5.7 | 4.9 | 4.6 | 4.0 | 3.8 | 3.5 | **3.1** | 2.8 | 2.5 | 2.3 |
| poke from (h) | 6.1 | 4.6 | 3.9 | 3.7 | 3.2 | 3.0 | 2.8 | 2.5 | 2.2 | 2.0 | 1.8 |
| window after ready (min) | 144 | 98 | 83 | 70 | 59 | 55 | 50 | 43 | 36 | 31 | 26 |
| D | 5.5 | 4.8 | 4.8 | 4.7 | 4.6 | 4.6 | 4.6 | 4.5 | 4.5 | 4.5 | 4.3 |

(At 3.5 % salt multiply `t_bp` by ≈ 1.03 → 3.25 h at 28 °C, the anchor.) Window = `0.2 × EQ_READY_PD / r_pd(T_room)`.

- `t_t` (P-COLD temper): solve the temper stage [env `T_room`, tau 1.5] after [mix 0.5 h at DDT 20] + [rest+ball 0.6, `T_room`, 1.5] + [head start `h_hs`, `T_room`, 1.5] + [fridge `H_b`, `T_f`, 1.5]; bisection 0.75–5 h; if `P(5 h) < 1` → warning W9 and cap 5 h. Reference outputs (3.0 % salt):

| room / fridge | `H_b` = 10 h | 14 h | 18 h | 24 h | 30 h |
|---|---|---|---|---|---|
| 20 °C / 5 °C | 4.6 h (D 7.3) | 4.2 (8.0) | 3.9 (8.8) | 3.3 (9.9) | 2.7 (11.0) |
| 24 °C / 5 °C | 4.0 (6.9) | 3.7 (7.8) | 3.5 (8.6) | 3.0 (9.7) | 2.5 (10.9) |
| 28 °C / 4 °C | 3.5 (6.8) | 3.4 (7.6) | 3.2 (8.4) | 2.9 (9.4) | 2.6 (10.5) |
| 28 °C / 5 °C | 3.4 (6.9) | 3.1 (7.6) | 2.9 (8.4) | 2.5 (9.6) | 2.2 (10.8) |
| 28 °C / 7 °C | 3.0 (6.9) | 2.6 (7.7) | 2.3 (8.5) | 1.7 (9.7) | 1.0 (11.0) |
| 32 °C / 5 °C | 2.7 (6.7) | 2.5 (7.6) | 2.3 (8.2) | 2.0 (9.4) | 1.6 (10.5) |

These reproduce Regime B of cold-ferment-logistics §4.4 (3–3.5 h at 28 °C, 4.5 h at 24 °C, 6 h at 20 °C for young cold balls) and the handoff's "cold balls need 2 h minimum, realistically 3–4 h".

- `t_E` (E): `t_E = min(L − 0.85, t_E_max)` with `t_E_max` = 4.0 h (≤ 24 °C), 3.0 (25–29), 2.25 (≥ 30); minimum 1.5 h; any slack becomes a start delay.

### 5.3 Decision tree (evaluate in order)
```
Hp_max, Hb_max = (24, 30) if T_f ≤ 5; (16, 24) if T_f 6–7; (12, 16) if T_f ≥ 8
L_S     = t_pw_same + 1.1 + t_bp                          # same-day poolish, no slack
L_P3    = t_pw + 3 + t_rw + 1.1 + t_bp                    # overnight poolish, 3 h hold
L_P24   = t_pw + Hp_max + t_rw + 1.1 + t_bp
L_C_min = t_pw + 12 + t_rw + 1.1 + h_hs + 10 + t_t(H_b=10)   # cold balls need ≥ 10 h in the fridge

1. L < 2.35 h                                → REFUSE ("not enough time; order in / bake flatbread")
2. L ≥ L_C_min and (force_cold or L > L_P24 or T_room ≥ 31)   → P-COLD
       H_p = clamp(L − L_cold(H_p=0, H_b=10), 12, Hp_max); then H_b solved so total = L, clamped 10..Hb_max;
       while D(H_b) > D_COMFORT and H_b > 10: H_b −= 0.5 h;  delay = L − total  ("do nothing until <start>")
3. L ≥ L_P3                                  → P-RT
       H_p = L − (t_pw + t_rw + 1.1 + t_bp); if H_p > Hp_max: delay = H_p − Hp_max, H_p = Hp_max
4. L ≥ L_S                                   → S ; delay = L − L_S
5. else                                       → E ; delay = L − 0.85 − t_E
```
Explanations the app shows (plain words):
- *Why cold-ferment the balls?* "With more than about a day in hand, the balls spend it in the fridge: yeast slows 20×, flavour keeps building, and the weak flour is not sitting warm and softening. You get more flavour and a more forgiving bake day." (Charlie Anderson 2–3-day sweet spot, https://www.youtube.com/watch?v=ZzzAufgflCg; Kenji 3–5 days on strong flour, https://www.seriouseats.com/the-pizza-lab-how-long-should-i-let-my-dough-cold-ferment; capped at 30 h here for maida.)
- *Why room-ferment the balls?* "With 9–30 hours in hand, the poolish does the flavour work overnight in the fridge and the balls need only ~3 hours warm; this is the schedule you have already proven."
- *Why the poolish at all?* "It buys flavour and extensibility without stretching the final dough's warm time — the one thing maida cannot tolerate."
- *Why an emergency dough?* "Under ~6 hours a poolish cannot ripen and be used; a direct dough with more yeast is the only option and will taste plainer."
- *Why delay the start?* "More time would only be spent warm or beyond the flour's limit; waiting costs nothing."

### 5.4 Things the engine never schedules
No cold *bulk* (a 1.5 kg mass burns ~2 eq-h uncontrolled while cooling, temperature-kinetics §2.12; handoff Method C "higher overproofing risk"); no all-room-temperature overnight poolish above 20 °C (dose unweighable, poolish-science §2g); no all-RT schedule > 8 h at ≥ 27 °C (avpn-and-classic §4B); no re-ball more than once (Vito https://www.youtube.com/watch?v=q_eMwU14DWo); no ready ball left > 1 h at ≥ 28 °C.

Optional winter variant (off by default, `T_room ≤ 20` only): all-RT poolish with IDY % of poolish flour = 0.30 % (8 h), 0.18 % (10 h), 0.12 % (12 h), 0.06 % (16 h) at 22 °C-equivalent hours `E22 = hours × r_pd(T)/0.779`, used at peak — poolish-science R3 table. Not used in any example.

---

## 6. TIMELINE GENERATION

### 6.1 Assembly
Start time `t0 = now + delay`. Walk the plan's stage list, emitting a step at each boundary (clock rounded down to 5 min). Independent steps (oven, leftovers) are merged by time. Every step carries: clock time, action, duration, what-to-look-for.

**P-COLD step list**
1. `t0` — Make poolish: `Fp` g maida + `Wp` g water at `T_water_pool` + `g_pool` g IDY + `honey` g honey. Whisk to a batter, loose cover. *Look for:* small bubbles by 45 min.
2. `t0 + t_pw` — Poolish to fridge, sealed, no holes. *Cue:* "domed, bubbling all over, centre just starting to flatten". Hold `H_p` h.
3. `+ H_p` — Poolish out; rewarm `t_rw` (or use cold at ≥ 31 °C). *Look for:* bubbles when tapped; brown specks are normal; sharp vinegar smell → remake.
4. `+ t_rw` — Mix (§2.2 water temperature, DDT 20). 30 min.
5. `+ 0.5` — Rest 30 min covered; ball at `W` g with oiled hands; oiled tray, 5 cm spacing, oiled film on top.
6. `+ 0.6` — Balls rest at room temperature `h_hs` (head start).
7. `+ h_hs` — Balls to fridge, lid/film ajar 60–90 min, then seal (condensation rule, Lehmann https://www.pmq.com/effective-dough-management/). Cold hold `H_b` h.
8. `+ H_b` — Take balls out (all first-sitting balls; leftovers per §7). Temper/finish proof `t_t` h at room temperature.
9. `bake − 35 min` — Light oven, full gas.
10. `out + max(0.5, t_t − 0.75)` — Start poke test (§6.4).
11. `bake` — Floor 380–420 °C by IR: stretch and bake; pizza k at `bake + 3.5 × (k−1)` min.

**P-RT**: steps 1–5 as above (DDT 23; `H_p` from §5.3; extra IDY `g_add` at step 4 if any); then 6′ ball proof at room temperature `t_bp` h; poke test from `0.8 × t_bp`; oven; bake.
**S**: step 1 with the same-day preset (no honey), no fridge steps; then 4–6′ as P-RT.
**E**: step 4 with the direct recipe (`g_E` IDY, DDT 26); rest 15 min; ball; proof `t_E`; poke from `0.8 × t_E`; oven; bake.

### 6.2 Rewarm/temper labels
Regime B (cold balls that never proofed: P-COLD, cold-held leftovers): the temper IS the proof — use `t_t` from the solver. Regime A (balls already proofed before chilling: same-day leftovers, re-balled leftovers): warm-only time `t_A(T_room) = clamp(1.5 × ln((T_room − T_f)/(T_room − T_target)), 0.75, 3.0)` with `T_target = min(17, T_room − 4)`: 16 °C → 90 min, 20 → 120, 24 → 90, 28 → 65, 32 → 55, 34 → 50 (cold-ferment-logistics §4.4-A: Lehmann/veloboy/Forno Bravo bounds; PizzaBlab "Neapolitan needs ~20 °C core", https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/).

### 6.3 Wave rule (hot kitchens)
If `T_room ≥ 30` and `n1 ≥ 5`: balls 1–4 proof for `bake`; balls 5..n1 go to the fridge 30 min after balling (≈ 1.25×) and come out at `(bake + 4 × 3.5 min) − t_bp` (P-RT/S) or are simply taken out of the cold hold 15 min later than wave 1 (P-COLD). Print: "the window at this temperature is only ~30–40 min; two waves keep the last pizzas from over-proofing" (Vito V4 fridge-at-1.25× rule; cold-ferment-logistics §4.7; hot-climate-dough §4.5 staggered pulls).

### 6.4 Readiness checks (deterministic strings)
- Poolish ready: "at least doubled, surface fully covered with small bubbles, centre dome just starting to flatten, sweet-yeasty with a faint tang. Use now or refrigerate now. Sunk well below a high-water mark and smelling boozy/sharp: discard and remake."
- Ball poke test (press ~1 cm for 2 s): "springs back fast → wait, re-test in 20–30 min (≥ 28 °C) or 45 min (cooler); returns slowly and only halfway → bake now; dent stays, ball spread flat, large translucent blisters, boozy smell → over-proofed: see rescue (§7.5)."
- Cold-held balls on pull: "tight and dense is normal; large surface bubbles after the fridge are normal; wet/shiny/slack with liquid on the tray → the fridge ran warm or the box was sealed warm — bake within 30 min or re-ball."
- Failure: "flat, wet, shiny, no gas after the planned time → yeast failure, not under-timing: re-mix with 10 g IDY per litre of water and +2 % salt, 4 h at room temperature, or bake as thin flatbread" (Vito https://www.youtube.com/watch?v=A368Rx1IlbA).

### 6.5 Oven line (fixed)
Light at `bake − 35 min` on full gas; launch only when the floor at the launch spot reads 380–420 °C by IR (default 400); dome 450–500 °C; between pizzas full flame until the spot reads ≥ 380 °C (2–4 min), then medium-low for the 60–90 s bake, turn at ~30 s, dome the last 10–15 s. Diagnostics: burnt base/pale top → flame down, let the floor fall; charred top/doughy base → preheat longer. Sources: AVPN floor 380–430/dome 485 (Disciplinare 2024), Ooni "keep around 400 °C" (https://cdn.brandfolder.io/54G1NFTL/as/qch124-e23yzc-gu9nn/Ooni_Koda_16_Essentials_Guide-Digital.pdf), handoff §1.

---

## 7. LEFTOVERS (n2 = n − n1 balls, decided at planning time)

`gap_bake = t2 − bake`; `gap_ball = t2 − t_ball` (t_ball = end of the balling step).

### 7.1 Decision
```
if t2 missing → §7.6 default text
elif gap_bake ≤ 1.0 h            → RT: all balls proof together; leftovers wait covered; bake within the window
else:
   solve the cold-hold plan for the leftover balls:
      stages [mix, rest+ball, head start h_hs2 (30/45/90 min by T_room), fridge H2 at T_f, temper t_t2 (solved)]
      find H2 such that h_hs2 + H2 + t_t2 = gap_ball
   if 1 ≤ H2 ≤ Hb_max and D ≤ D_HARD  → FRIDGE (cold-held un-proofed balls; warn if D > D_COMFORT)
   else                                → FREEZE (at balling)
```
Rationale: the second sitting's best quality comes from balls that were *never* proofed warm — the same physics as P-COLD (expert-videos §4.6 "divide the batch at balling time"; handoff "ball everything, keep some out, put the rest in the fridge"; Ojo's test https://www.youtube.com/watch?v=ZUVG9Cf5yfA). Re-balling proofed dough is the fallback (§7.4), not the plan.

### 7.2 FRIDGE branch steps
- `t_ball + h_hs2` — "Leftover balls (n2) to the fridge: oiled tray or one ball per ≥ 1 L lidded box, oil the tops, film ajar 60–90 min then seal."
- `t2 − t_t2` — "Take the n2 balls out; temper/finish proof `t_t2` h." Poke test from `t_t2 − 0.75 h`. Oven at `t2 − 35 min`.
- If `H2 > 24 h`: add "expect a softer, more extensible ball — stretch to 28–30 cm and handle gently".
- Same-evening gaps (2–8 h) fall out of the same solver (short `H2`, `t_t2` ≈ `t_bp`), reproducing Vito's "fridge at 1.25×, out ~2.5 h before".

### 7.3 FREEZE branch steps (planning mode = freeze un-proofed, Lehmann/Pizzablab "before fermentation")
- `t_ball` — "Freeze the n2 balls now: flatten each to a ≤ 3 cm puck, oil, on a tray uncovered in the freezer 2–3 h, then skin-tight cling + bag, coldest shelf away from the door, label the date."
- `t2 − 16 h` (window 12–24 h) — "Move the frozen pucks to the fridge on a semolina-dusted, covered tray."
- `t2 − t_thaw` — "Take out; proof at room temperature `t_thaw` h until doubled." `t_thaw` = solved temper after stages [mix, rest+ball 0.6 h warm, fridge-thaw 8 h at `T_f` (first 8 h frozen count 0)] with `EQ_READY_PD × 1.12` (15 % yeast loss): **16 °C 8.0 h, 20 °C 6.7 h, 24 °C 5.1 h, 28 °C 4.1 h, 32 °C 3.5 h**. Poke test from `t_thaw − 1 h`.
- Limits printed: best ≤ 14 days, acceptable ≤ 30, warn > 30, refuse > 90; load-shedding freeze–thaw cycles shorten these; never refreeze; thawed balls must be baked that day.
- Sources: Lehmann "The Big Freeze" (https://www.pmq.com/in-lehmanns-terms-the-big-freeze/) and pizzamaking 46616; Pizzablab freezing guide (https://www.pizzablab.com/learning-and-resources/general-articles/pizza-dough-freezing/); King Arthur 6–10 h fridge thaw, ≤ 1 month (https://www.kingarthurbaking.com/blog/2024/03/22/freeze-pizza-dough); Ooni "at least 6 h out" at ~20 °C (https://ooni.com/blogs/ooni-insights/how-to-freeze-pizza-dough-and-how-to-defrost-it-correctly); Vito freeze-un-proofed method (https://www.youtube.com/watch?v=rfEuvksO0wc). No yeast bump is applied (it cannot be applied to only part of one mix); +1.12 on the budget instead (freezing-and-leftovers §4.1).
- No freezer / > 30 days: par-bake fallback — stretch, half the sauce, 30–45 s at 380–400 °C floor until set but pale, cool on a rack, bag; ≤ 4 h room temp, ≤ 2 days fridge, or freeze; finish 40–60 s. Label "crisper, not true Neapolitan" (Lehmann, https://www.pizzamaking.com/forum/index.php/topic,60632.0.html; Ooni https://ooni.com/blogs/ooni-insights/throwing-a-pizza-party-try-parbaking-your-crusts).

### 7.4 Balls that were already proofed and are left over unexpectedly (no plan)
- `gap ≤ 1 h` at ≥ 28 °C (≤ 1.5 h cooler): keep covered, bake.
- 1 h < gap ≤ 24 h: degas and re-ball gently, oil, seal, fridge at the moment the first pizzas are stretched; pull at `t2 − (t_A(T_room) + 45 min)`: 28 °C → ~1.8 h, 24 °C → 2.25 h, 20 °C → 2.75 h; poke at pull + 1 h; if very slack at pull, re-ball once more and rest 1.5–2 h at ≥ 25 °C (freezing-and-leftovers §4.3; pizzamaking 70393 outcome).
- 24–36 h: fridge allowed with "reduced spring" warning; > 36 h or `T_f ≥ 7`: freeze as a re-balled puck (frozen-after-proof: use within 14 days, thaw in fridge 12–24 h, then `t_A + 30 min`).

### 7.5 Over-proof rescue (once only)
≥ 2 h before baking: degas, re-ball tight with oiled hands, cover; rest 60 min at ≥ 26 °C / 90 min at 22–25 °C / 2 h at ≤ 20 °C (never > 2.5 h); < 45 min before: stretch now, expect a flatter rim; not needed for ≥ 6 h: re-ball, fridge, pull with `t_A + 30 min`. Sources: Vito re-ball once (https://www.youtube.com/watch?v=q_eMwU14DWo); Gozney (https://us.gozney.com/blogs/academy/how-to-fix-over-proofed-pizza-dough); cold-ferment-logistics §4.6.

### 7.6 Default text when `t2` is not given and `n1 < n`
"Put the n2 spare balls in the fridge 30 min after balling (sealed, oiled). Within 30 h: take out `t_t2`(≈ `t_bp`, table §5.2) hours before baking. Beyond 30 h: freeze them now instead (§7.3)."

---

## 8. WARNINGS / VALIDATION (codes, condition, text)

| Code | Condition | Text (short) |
|---|---|---|
| W1 | `L < 2.35 h` | REFUSE: not enough time for any dough. |
| W2 | `T_room > 34` | Kitchen too hot for any warm stage: use the AC room temperature, or mix after 22:00 / before 07:00 (night temperature used for night stages). Maths clamped at 34 °C. |
| W3 | `T_room ≥ 31` | Hot kitchen: windows are ~30 min; cold-fermented balls chosen when possible; two-wave rule on; hydration capped at 65 %; ice water. |
| W4 | `T_f ≥ 7` | Warm fridge: poolish hold ≤ 16 h (12 h at ≥ 8), ball hold ≤ 24 h (16 h); a fridge at 8 °C ferments 2× faster than at 4 °C — put a thermometer on the dough shelf. |
| W5 | `h > 0.66` | Sticky, harder to launch, wet-centre risk in a 60–90 s bake with this flour. |
| W6 | plan E chosen | Emergency direct dough: plainer flavour; a poolish needs ≥ `L_S` h. |
| W7 | `F > 1500 g` (n > 9 at 280 g) | Split into two mixes (mixer capacity, cooling); two poolish bowls. |
| W8 | `L > max plan length` | Start later: nothing to do until `t0`. |
| W9 | `T_room ≤ 18` (winter) or temper solver hits 5 h | Proof the balls in a switched-off oven with the light on (~27 °C) and re-enter 27 as the room temperature; otherwise expect the printed long proof. |
| W10 | leftover `D > D_COMFORT` | Beyond the best zone: softer ball, stretch smaller. |
| W11 | leftover branch FREEZE, `t2 − now > 30 days` | Freezer quality warning; > 90 days refused. |
| W12 | poolish age at mixing > 30 h (after a delay/edit) | Remake the poolish. |
| W13 | `s < 0.025` or `s > 0.035` | Below 2.5 %: weaker dough with maida; above 3.5 %: salty. |
| W14 | fresh-yeast toggle with "bakery khameer" | Unknown strength; not supported. |
| W15 | `T_night` warm stage crosses midnight | Night temperature used; if the kitchen stays hot at night, enter it. |

---

## 9. WORKED EXAMPLES (all numbers from the reference implementation; clock times rounded down to 5 min; defaults `T_f` 5 °C, salt 3 %, oil 3 %, 280 g balls, FF 15)

### A — now Fri 18:00, bake Sat 20:00 (L 26 h), 6 pizzas, eat 4, rest Sun 20:00, 65 %, 30 °C (night 26)
Recipe: F 1000 → poolish 250 g maida + 250 g water at 5 °C (ice water) + **3.0 g IDY** (30 °C band) + 5 g honey; final 550 g maida + 200 g atta + 400 g water at **11 °C** (4×23 − 30 − 30 − 6 − 15) + 30 g salt + 30 g oil. No extra yeast.
Thresholds: `t_pw` 1.5 h, `t_rw` 0.25 h, `t_bp` 2.79 h (window 36 min, poke from 2.2 h), L_S 5.9, L_P3 8.6, L_P24 29.6, L_C_min 28.3 → **P-RT**, `H_p = 26 − (1.5 + 0.25 + 1.1 + 2.79) = 20.4 h`, no delay. D = 4.5.
```
Fri 18:00  Make poolish (3.0 g IDY, ice water). Counter 90 min — until domed and bubbling.
Fri 19:30  Poolish to fridge, sealed. Hold 20.4 h.
Sat 15:50  Poolish out; rewarm 15 min.
Sat 16:05  Mix final dough (DDT 23, water 11 °C). 30 min.
Sat 16:35  Rest 30 min, then ball 6 × 280 g; oil tops.
Sat 17:10  Balls 1–4: proof at room temp 2.8 h.   Balls 5–6: see leftovers.
Sat 17:40  Balls 5–6 to the fridge (30 min head start), film ajar 60–90 min then seal.
Sat 19:25  Light oven. Start poke test on balls 1–4.
Sat 20:00  Floor 400 °C: pizzas at 20:00, 20:03, 20:07, 20:10.
Sun 18:05  Take balls 5–6 out (cold hold 24.4 h); finish proof 1.9 h.   D = 9.5 (best zone).
Sun 19:25  Light oven; poke test.
Sun 20:00  Bake.
```
### B — now 10:00, bake 19:00 same day (L 9 h), 3 pizzas, all eaten, 65 %, 32 °C (night 28)
Recipe: F 500 → poolish 125 g + 125 g water at 5 °C + **1.5 g IDY** + 2.5 g honey; final 275 g maida + 100 g atta + 200 g water at **7 °C** (ice water) + 15 g salt + 15 g oil.
`t_pw` 1.5 h, `t_rw` 0 (use cold), `t_bp` 2.54 h (window 31 min, poke from 2.0 h); L_S 5.6, L_P3 8.1 → **P-RT** with `H_p` 3.9 h (a ≥ 3 h fridge hold beats a same-day poolish because the poolish is used chilled — Vito's heat control). Hot-kitchen warning W3; n1 = 3 → single wave; hydration cap 65 % satisfied.
```
10:00  Make poolish (1.5 g IDY, ice water). Counter 90 min.
11:30  Poolish to fridge, sealed. Hold 3.9 h.
15:20  Poolish out — use cold. Mix (DDT 23, water 7 °C). 30 min.
15:50  Rest 20 min (hot kitchen), ball 3 × 280 g; oil tops; keep the tray in the coolest spot.
16:25  Ball proof at room temp 2.5 h.
18:25  Light oven. Start poke test — expect ready 19:00, over-proofed by ~19:30.
19:00  Bake.
```
### C — now Mon 09:00, bake Wed 20:00 (L 59 h), 8 pizzas, eat 5, rest Sat 14:00, 62 %, 26 °C (night 22)
Recipe: dough 2285 → F 1360; poolish 340 g maida + 340 g water at 9 °C + **5.4 g IDY** (4 g × 340/250) + 7 g honey; final 750 g maida + 270 g atta + 505 g water at **3 °C** (4×20 − 26 − 26 − 10 − 15; ice water, ice removed) + 41 g salt + 41 g oil.
`t_pw` 1.75 h, `t_rw` 0.5 h, `h_hs` 0.75 h, `t_bp` 3.54 h; L_P24 30.9 < 59 → **P-COLD**: `H_p = 24 h` (max), `H_b` solved 26.1 h so that D = 9.98 ≤ 10 (the comfort cap trims it), `t_t = 2.46 h`; start delay 2.33 h. W8 "nothing to do until Mon 11:20".
```
Mon 11:20  Make poolish (5.4 g IDY, fridge water). Counter 105 min.
Mon 13:05  Poolish to fridge. Hold 24 h.
Tue 13:05  Poolish out; rewarm 30 min.
Tue 13:35  Mix (DDT 20, water 3 °C). 30 min.
Tue 14:05  Rest 30 min; ball 8 × 280 g; oil tops.
Tue 14:40  Balls 1–5: 45 min head start on the counter.  Balls 6–8: FREEZE now (pucks ≤ 3 cm, oiled, tray uncovered 2–3 h, then bag).
Tue 15:25  Balls 1–5 to the fridge, film ajar 60–90 min then seal. Cold hold 26.1 h.
Wed 17:30  Balls 1–5 out; temper/finish proof 2.5 h.
Wed 19:15  Start poke test.   Wed 19:25 light oven.
Wed 20:00  Bake 5 pizzas (20:00 … 20:14).
Fri 22:00  Move the 3 frozen pucks to the fridge (16 h before).
Sat 09:20  Take them out; proof 4.6 h at 26 °C until doubled; poke test from 13:00.
Sat 13:25  Light oven.   Sat 14:00 bake.
```
Leftover check: gap from balling 95 h → a fridge hold would need 80 h (D 22.7 > 14) → FREEZE (§7.1).

### D — now 12:00, bake 16:00 same day (L 4 h), 2 pizzas, 65 %, 22 °C (emergency)
L_S = 8.7 h (same-day poolish 3 h + dough 5.7 h) > 4 → **E**. Recipe: F 335 → 270 g maida + 65 g atta + 220 g water at **19 °C** (3×26 − 22 − 22 − 15) + 10 g salt + 10 g oil + **0.85 g IDY** (`t_E` = 4 − 0.85 = 3.15 h ≤ cap 4; EQ = (0.5 + 0.35 + 3.15) × 0.68 = 2.72 → y = 0.218 % × 1.2 = 0.262 % → 0.877 g → floor 0.85 g). No honey. D = 3.3. W6 shown.
```
12:00  Mix direct dough (0.85 g IDY, water 19 °C, DDT 26). 30 min.
12:30  Rest 15 min; ball 2 × 280 g; oil tops.
12:50  Ball proof 3.15 h at 22 °C.
15:20  Start poke test.   15:25 light oven.
16:00  Bake.
```
### E — winter: now Sat 15:00, bake Sun 14:00 (L 23 h), 4 pizzas, 65 %, 16 °C (night 14)
Recipe: F 670 → poolish 165 g + 165 g water at **25 °C lukewarm** + **3.3 g IDY** (5 × 165/250) + 3 g honey; final 370 g maida + 135 g atta + 270 g water at **40 °C** (formula gives 41 → capped 40) + 20 g salt + 20 g oil.
`t_pw` 2.5 h, `t_rw` 0.5, `t_bp` solved 7.62 h > cap 7.0 → top-up would be 0.05 g < 0.3 g → no extra yeast, proof kept at 7.6 h (window 144 min, poke from 6.1 h). L_P3 14.7 ≤ 23 ≤ L_P24 35.7 → **P-RT**, `H_p` 11.3 h. D = 5.4. W9 shown.
```
Sat 15:00  Make poolish (3.3 g IDY, lukewarm water). Counter 2.5 h (it will finish ripening in the fridge).
Sat 17:30  Poolish to fridge. Hold 11.3 h.
Sun 04:45  Poolish out; rewarm 30 min.
Sun 05:15  Mix (DDT 25, water 40 °C). 30 min.
Sun 05:45  Rest 30 min; ball 4 × 280 g; oil tops; warmest spot in the house.
Sun 06:20  Ball proof 7.6 h at 16 °C.
Sun 12:25  Start poke test.   Sun 13:25 light oven.
Sun 14:00  Bake.
```
Alternative the app offers (W9, user re-enters 27 °C for the proofing spot = oven with light): poolish 2.6 g (4 g band) with 9 °C water, counter 90 min, hold 16.6 h (Sat 16:30 → Sun 09:05), mix Sun 09:35 (DDT 23, water 13 °C), ball 10:40, proof 3.3 h, bake 14:00.

---

## 10. CONSTANTS (one-line justification and source)

| Constant | Value | Justification / source |
|---|---|---|
| PFF | 25 % (cap 30 %) | Scott/Dough Formula/poolish-science R1; handoff 250 g per 1 kg |
| Poolish hydration | 100 % | Hamelman ch. 4; Vito |
| Honey | 2 % of Fp, fridge-held only | Vito 5 g/300 g; Lehmann no sugar > 370 °C floor (pizzamaking 60583) |
| Poolish IDY bands | 5/4/3 g per 250 g (fridge-held); 7/5/4 g (same-day) | handoff validated 5 g/7 g/3 g; Vito 3 g video; hot-climate §4.2; vito-videos §4.2 |
| Poolish warm phase | table §4.1 | handoff 1.5–2 h at 28 °C; pizzamaking 85360 "≥ 1.5 h until rising"; Q10 2.3 scaling; caps |
| Poolish fridge hold | 3–24 h (≤ 5 °C), 16 h (6–7), 12 h (≥ 8); age cap 30 h | Vito "past 24 h acid"; Fond/JayArr 24 h; poolish-science R8; flour-strength §4.2 |
| Rewarm | 30/15/0 min | Vito 30 min (u7Hd6ZzKgBM); use cold when hot (4nZ3xXBmHEI) |
| `r_cold` table | §3.1 | TXCraig1 26831 + BeanAnimal fit + Pyler peak (temperature-kinetics §4.1) |
| `r_pd` Q10 | 2.3 above 18 °C | cold-ferment-logistics §4.1; hot-climate ×1.5/5 °C; handoff ratio |
| `d(T)` Q10 | 2.0 | enzyme Q10 (PizzaBlab factors page; JayArr 40–50 % at 4 °C) |
| tau ball / bulk / poolish | 1.5 / 4.5 / 2.0 h | PizzaBlab 20-of-24 h vs 5-of-24 h; Sourdough Journey 12 h bulk; temperature-kinetics §4.4 |
| EQ_READY_PD | 4.56 (3.0 % salt) | calibrated on handoff 3.25 h at 28 °C with DDT 23 |
| Salt factor | ×1.03 per +0.5 % | hydration-and-oven §4.3 (Baghdad, Beck 2012) |
| Craig dose-response | EQ = 0.944 y^−0.695 | fit to chart 3 h/7 h/24 h at 25 °C (temperature-kinetics §4.2) |
| E safety | ×1.2, clamp 0.10–0.70 % | Craig "a bit more"; PizzApp +20 %; Lehmann emergency ≤ 2 % |
| Top-up threshold | ≥ 0.3 g; cap 0.30 % | weighability (0.1 g scale) — yeast-model §4.9 |
| D_COMFORT / D_HARD | 10 / 14 | 48 h at 4 °C hard (cold-ferment §4.3, expert-videos §3.3); refuse 18 h all-RT at 22 °C (avpn §4B) |
| `t_bp_max` | 7/6/5/4/3 h | flour-strength §4.2 caps; yeast-model cap 3.5 h at 28–30 °C; hot-climate 3 h at 30 °C |
| Head start | 30/45/90 min | Charlie 2–4 h at 20 °C (1vGNXOr-k-8) scaled; Vito 15–20 min hot |
| Cold ball hold | 10–30 h (≤ 5 °C), 24 (6–7), 16 (≥ 8) | cold-ferment §4.3 (earliest 10–12 h, best 16–30, hard 42–48); D cap |
| Regime A warm-up | Newton, target min(17, T−4) | Lehmann 1.5–2.5 h at 20 °C; veloboy 1.5 h → 16.7 °C; Forno Bravo 15–45 min summer |
| Freeze | pucks ≤ 3 cm; fridge 16 h (12–24); +12 % budget; 14/30/90 days | Lehmann Big Freeze; Pizzablab; King Arthur; Ooni; Isache 2026 (−30 % activity by 56 days) |
| Hydration band | 60–68 %, default 65, cap 65 at ≥ 31 °C | Gozney/Ooni/Modernist; handoff validated; hot-climate §4.3 |
| DDT / FF | 23 (25 winter) / 20 cold / 26 E; FF 15 | King Arthur DDT + KA FF 12–13 °C + 1 °C per 2 min; PizzaBlab targets |
| Oven | light −35 min; floor 380–420; 3.5 min/pizza | AVPN 2024; Ooni Koda guide; handoff |
| Wave rule | ≥ 30 °C and n1 ≥ 5 | Vito V4; cold-ferment §4.7; hot-climate §4.5 |
| Fresh yeast | ×3 | AVPN 2024 |

---

## 11. RULES (each one testable)

R1. `F = round5(n × W × 1.02 / (1 + h + s + o))`; `Fp = round5(0.25 F)` (min 100 g, never > 0.30 F); poolish water = Fp; honey = round(0.02 Fp) only for a fridge-held poolish, else 0; final water = round5(h F − Fp); maida_final = round5(0.8 F − Fp); atta = round5(0.2 F).
R2. Inputs are clamped: h ∈ [0.60, 0.68] (≤ 0.65 when T_room ≥ 31); T_room ∈ [12, 34] (W2 above 34); T_f ∈ [2, 9]; W ∈ [200, 300]; s ∈ [0.025, 0.035]; o ∈ [0, 0.05]; n ∈ [1, 12].
R3. Rate curve `r_cold` is the §3.1 table with log-linear interpolation; `r_pd = r_cold` for T ≤ 10, `2.3^((T−25)/10)` for T ≥ 18 (T capped at 34), log-linear bridge between; `d = 2^((T−25)/10)`.
R4. Dough temperature in a stage follows `T_env + (T0 − T_env) e^(−t/1.5 h)` for balls (tau null during mixing, dough at DDT); integration step 5 min; EQ and D are the sums of `rate(T)·Δ` and `d(T)·Δ`.
R5. `EQ_READY_PD = 4.56 × (1 + 0.06 (s% − 3))`; the stage list [mix 0.5 h at 23 | rest+ball 0.6 h at 28 | proof 3.25 h at 28] integrated with `r_pd` must return 4.70 ± 0.05 at s = 3.5 %.
R6. Ready = progress 1.00; poke test from 0.80; over-proofed at 1.20; usable window after ready = `0.2 × EQ_READY_PD / r_pd(T_room)` (43 min at 28 °C, 31 min at 32 °C).
R7. Poolish IDY per 250 g flour: fridge-held 5.0 g (≤ 24 °C), 4.0 g (25–29), 3.0 g (≥ 30); same-day 7.0 / 5.0 / 4.0 g on the same bands; scaled by Fp/250, rounded to 0.1 g.
R8. Poolish water: 25 °C (≤ 18 °C room), room (19–22), 9 °C (23–29), 5 °C (≥ 30).
R9. Poolish warm phase (fridge-held): 2.5 h (≤ 18), 2.0 (19–22), 1.75 (23–26), 1.5 (27–32), 1.25 (≥ 33); same-day: 3.5 (≤ 20), 3.0 (21–24), 2.5 (25–27), 2.25 (28–29), 2.0 (30–32), 1.75 (≥ 33). Printed ± 20 min (± 30 at ≥ 30 °C) and overridden by the visual cue.
R10. Poolish fridge hold H_p ∈ [3, 24] h at T_f ≤ 5; ≤ 16 h at 6–7 °C; ≤ 12 h at ≥ 8 °C; total poolish age at mixing ≤ 30 h else W12; rewarm 30 min (≤ 27 °C), 15 min (28–30), 0 (≥ 31).
R11. No IDY is added to the final dough of any poolish plan unless the solved RT proof exceeds `t_bp_max(T_room)` = 7.0 (≤ 18 °C), 6.0 (19–20), 5.0 (21–24), 4.0 (25–29), 3.0 (≥ 30) h; then `g_add = floor0.1((0.944/EQ_sched)^1.439 − 0.00104) × F)` capped at 0.003 F and dropped (proof kept) if < 0.3 g.
R12. Emergency dough IDY `y_E = clamp(1.2 × (0.944/EQ_sched)^1.439, 0.10 %, 0.70 %)` with `EQ_sched = (0.5 + 0.35 + t_E) × r_cold(T_room)`; grams floored to 0.05 g; `t_E = min(L − 0.85, 4.0 | 3.0 | 2.25 h by band ≤ 24 | 25–29 | ≥ 30)`, minimum 1.5 h.
R13. DDT = 23 (25 if T_room ≤ 20) for P-RT/S, 20 for P-COLD, 26 for E; FF = 15; `T_water = 4·DDT − T_flour − T_room − T_pool − FF` (3·DDT − … without poolish), clamped 1–40 °C; < 8 °C prints "ice water"; unclamped < 1 prints the ice/chilled-flour instruction.
R14. Plan order: REFUSE if L < 2.35 h; P-COLD if L ≥ L_C_min and (force_cold or L > L_P24 or T_room ≥ 31); else P-RT if L ≥ L_P3; else S if L ≥ L_S; else E — with L_S, L_P3, L_P24, L_C_min as defined in §5.3.
R15. P-COLD: H_p = clamp(L − L_cold(0,10), 12, Hp_max); H_b solved so the plan length equals L, clamped to [10, Hb_max] with Hb_max = 30 (T_f ≤ 5) / 24 (6–7) / 16 (≥ 8); H_b reduced in 0.5 h steps while D > 10; remaining time is a start delay.
R16. P-RT: H_p = L − (t_pw + t_rw + 1.1 + t_bp); if H_p > Hp_max the excess is a start delay. S: delay = L − L_S. E: delay = L − 0.85 − t_E.
R17. The last warm stage of every plan (t_bp, t_t, t_E) is solved by bisection so that progress = 1.00 at bake; the temper solve range is 0.75–5 h (W9 if 5 h is not enough).
R18. Head start before a cold hold: 30 min (≥ 28 °C), 45 min (22–27), 90 min (≤ 21); balls go in with the film ajar 60–90 min, then sealed.
R19. D over the final dough must be ≤ 14 for any generated plan or leftover hold; the P-COLD solver targets ≤ 10; leftover holds with 10 < D ≤ 14 carry W10.
R20. Reference outputs (3.0 % salt, DDT 23): t_bp = 4.9 h at 20 °C, 4.0 at 24, 3.1 at 28, 2.8 at 30, 2.5 at 32 (± 0.1 h); cold-ball temper at 28 °C room / 5 °C fridge: 3.4 h after 10 h, 2.9 after 18 h, 2.5 after 24 h, 2.2 after 30 h (± 0.1 h).
R21. Wave rule: if T_room ≥ 30 and n1 ≥ 5, balls 5..n1 go to the fridge 30 min after balling and come out at `bake + 14 min − t_bp` (P-RT/S) or 15 min after wave 1 (P-COLD).
R22. Oven steps: "light oven" at bake − 35 min; launch condition floor 380–420 °C; pizza k at bake + 3.5 (k−1) min; full flame between pizzas until ≥ 380 °C.
R23. Leftovers with t2: if t2 − bake ≤ 1 h keep at RT; else solve H2 so that h_hs2 + H2 + t_t2 = t2 − t_ball; FRIDGE if 1 ≤ H2 ≤ Hb_max and D ≤ 14, else FREEZE at balling.
R24. FRIDGE leftovers: to the fridge at t_ball + h_hs2, out at t2 − t_t2, poke from t2 − t_t2 + (t_t2 − 0.75 h), oven at t2 − 35 min; H2 > 24 h adds the "stretch smaller" note.
R25. FREEZE leftovers: freeze at t_ball as ≤ 3 cm pucks (2–3 h uncovered then bagged); move to the fridge at t2 − 16 h; out at t2 − t_thaw with t_thaw solved on [rest+ball 0.6 h warm | fridge-thaw 8 h at T_f] against 1.12 × EQ_READY_PD (8.0 / 6.7 / 5.1 / 4.1 / 3.5 h at 16 / 20 / 24 / 28 / 32 °C); refuse if t2 − now > 90 days, warn > 30.
R26. Already-proofed leftovers (no plan): re-ball, fridge, pull at t2 − (t_A + 45 min) with `t_A = clamp(1.5 ln((T_room − T_f)/(T_room − min(17, T_room − 4))), 0.75, 3) h` (65 min at 28 °C, 90 at 24, 120 at 20); fridge ≤ 24 h (36 h with warning); > 36 h or T_f ≥ 7 → freeze.
R27. Over-proof rescue: re-ball once only; rest 60 / 90 / 120 min at ≥ 26 / 22–25 / ≤ 20 °C, never > 2.5 h; < 45 min before baking stretch as is.
R28. Never generated: cold bulk, all-RT poolish above 20 °C, any unrefrigerated final-dough stage > t_bp_max, any stage at > 34 °C, re-ball twice, a ready ball waiting > 1 h at ≥ 28 °C.
R29. Fresh compressed yeast = 3 × IDY grams, identical timings; bakery starter "khameer" → W14, no conversion.
R30. Night stages (22:00–07:00) use T_night = max(12, T_room − 4) unless entered; fridge stages use T_f regardless of clock.
R31. Warm-phase and proof predictions are shown with the poke/visual cue text of §6.4, and the app never asks the user to judge a collapsed poolish: it shortens the warm phase instead (R9) and says "discard and remake" if collapsed.
R32. Mixing text is fixed (§2.2): 80 % water, 3–4 min, rest 10–20 min, salt, remaining water, knead ≤ 12 min, oil last, ≤ 20 min total; strandy → rest-and-knead ≤ 3 cycles; never add flour.

---

## 12. TEST ASSERTIONS
1. Recipe: n = 6, W = 280, h = 0.65, s = 0.03, o = 0.03 → F 1000, Fp 250, maida_final 550, atta 200, water_final 400, salt 30, oil 30, honey 5.
2. `r_cold(4) = 0.045`, `r_cold(25) = 1.0`, `r_cold(35) = 1.85`; `r_pd(16) = 0.380 ± 0.005`, `r_pd(28) = 1.284 ± 0.005`, `r_pd(34) = 2.116 ± 0.005`; `d(4) = 0.233`.
3. Craig: 0.05 % at 25 °C → 8 h; 0.05 % at 5 °C → 138 h; 0.201 % at 25 °C → 3 h; 0.224 % at 2.8 °C → 75 h; 0.1 % at 4 °C → 104 h (all ± 5 %).
4. Calibration: [mix 0.5 h @23 | rest 0.6 h env 28 | proof 3.25 h env 28] → EQ 4.70 ± 0.05 (r_pd).
5. Ball proof solve at 28 °C (3.0 % salt) = 3.13 ± 0.05 h; at 20 °C = 4.88 ± 0.1; at 32 °C = 2.54 ± 0.05.
6. Cold-ball temper at room 28 / fridge 5 / H_b 24 = 2.54 ± 0.1 h, D = 9.6 ± 0.3; at room 28 / fridge 7 / H_b 24 = 1.71 ± 0.1 h.
7. Example A → P-RT, H_p 20.4 ± 0.1 h, poolish 3.0 g, proof 2.79 ± 0.05 h; leftovers FRIDGE, H2 24.4 ± 0.2 h, temper 1.87 ± 0.1 h, D 9.5 ± 0.3.
8. Example B → P-RT, H_p 3.9 ± 0.1 h, poolish 1.5 g, proof 2.54 ± 0.05 h, window 31 ± 2 min.
9. Example C → P-COLD, H_p 24, H_b 26.1 ± 0.5, t_t 2.46 ± 0.1, D ≤ 10.0, delay 2.3 ± 0.2 h; leftovers FREEZE, t_thaw 4.6 ± 0.2 h.
10. Example D → E, t_E 3.15, IDY 0.262 % → 0.85 g, water 19 °C.
11. Example E → P-RT, proof 7.6 ± 0.1 h, no added yeast, H_p 11.3 ± 0.2 h, water 40 °C (capped).
12. Ball cool-down 4 h (26 → 5 °C, r_cold) = 0.91 ± 0.05 eq-h; ball warm-up 3 h (5 → 30 °C, r_pd) = 1.97 ± 0.05 eq-h.
13. L = 2 h → REFUSE; T_f = 8 → Hp_max 12, Hb_max 16; T_room = 36 → W2 and maths at 34.

---

## 13. OPEN QUESTIONS / CALIBRATION KNOBS (surface in an "advanced" panel)
1. Poolish dose: 3–5 g (this spec) vs ~1 g (poolish-science R4). One side-by-side (5 g vs 1.2 g vs 0.4 g on 250 g maida, same schedule) decides it; the engine's EQ_READY_PD would then need re-calibration for the low dose.
2. `EQ_READY_PD` is one number from one flour; log the poke-test time of every batch and refit (a ± 10 % change moves every proof by ± 10 %).
3. The Q10 = 2.3 warm curve vs Craig's steeper curve: two logged batches at 22 °C and 32 °C settle it.
4. D_COMFORT/D_HARD (10/14) come from the W ladder, not from maida data; a six-ball test pulled every 12 h from 12–60 h in the fridge pins them.
5. Fridge shelf temperature (single biggest error source) and freezer freeze–thaw cycling under load-shedding.
6. Friction factor FF for a 12–17 min KitchenAid knead of 1.7 kg — one measurement.
7. Whether the 20 % chakki atta shortens cold tolerance (assumed inside D limits).
