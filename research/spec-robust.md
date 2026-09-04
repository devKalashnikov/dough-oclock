# spec-robust — ROBUSTNESS-FIRST deterministic dough scheduler (maida + 20 % fine atta, Islamabad, CasaKoa)

Version 1.0 — 2026-09-04. Reference implementation: `engine_robust.py` (same folder). Every table and every worked-example number in this document was produced by that script; the JavaScript port must reproduce them to within rounding (see §11 test vectors).

**Design angle.** Minimise the probability of over- or under-proofed dough with a weak flour in a hot kitchen. That means: (1) yeast is never "solved" where a validated preset exists — the validated 5 g / 3 g / 7 g poolish presets are ground truth and the engine moves *time* (mainly fridge time) instead of yeast; (2) every prediction is biased so that a wrong prediction produces *under*-proofed dough (recoverable by waiting and a poke test), never over-proofed dough (unrecoverable except by a single re-ball); (3) the fridge is the primary control lever above 30 °C and for any lead time over 36 h; (4) a maturation (gluten-tolerance) budget for the flour is tracked separately from yeast progress and hard-refuses plans that exceed it; (5) leftover balls are decided *at balling time*, never by re-chilling a fully proofed ball.

Notation: °C throughout; hours as decimal (0.5 = 30 min); clock times local (Asia/Karachi, no DST). "RT" = room temperature stage. "IDY" = Saf-Instant red instant dry yeast. "g/kg" = grams per kg of total flour. `F_t` = total flour (poolish flour included). Percentages of ingredients are baker's percentages of `F_t` unless stated.

---

## 0. Model in one paragraph (for the developer)

The engine simulates the dough as a lumped body whose core temperature follows Newton cooling toward the environment (`τ` = 1.5 h for a 280 g ball, 4.5 h for a bulk mass), integrates two quantities in 5-minute steps — **fermentation progress** `EQ = ∫ r(T) dt` (hours-equivalent at 25 °C, using the rate table `r(T)`) and a **maturation score** `M = ∫ dt / cap(T)` (fraction of the flour's gluten-tolerance budget consumed, using the cap table `cap(T)`) — and finds, by bisection, the duration of the *last warm stage* at which `EQ` reaches a target. For the poolish plans the target is a constant `EQ_B = 4.56 eq-h`, calibrated once from the only validated data point (Dawood: 280 g balls ready after 30 min rest + 3.25 h at 28 °C with a 5 g poolish, dough mixed to 23 °C). For the no-poolish emergency plan the yeast is solved from `EQ_ready(y) = 0.944·y^-0.695` (TXCraig1 chart at 25 °C). Plans are chosen by lead time and room temperature (§5); all step times are laid out backwards from the bake time; `M > 1.0` refuses a plan, `M > 0.85` warns.

---

## 1. INPUTS

| Symbol | Meaning | Type / unit | Default | Valid range | Validation message |
|---|---|---|---|---|---|
| `now` | current date-time | datetime | device clock | — | — |
| `t_bake` | first pizza goes into the oven | datetime | — | `now + 3 h … now + 14 d` | `< 3 h`: "Not enough time (minimum 3 h)". `> 14 d`: "Plan closer to the date". |
| `n` | pizzas total | integer | 6 | 1–20 | `> 12`: warning "split into two containers / two mixer batches". `> 20`: refuse. |
| `n_first` | pizzas eaten in the first sitting | integer | `n` | 1–`n` | clamp to `n` |
| `t_bake2` | when the remainder is baked | datetime, optional | none | `> t_bake`, `≤ t_bake + 30 d` | `≤ t_bake`: ignore + warn. `> 30 d`: "too far to freeze — make fewer balls". Missing while `n_first < n`: assume `t_bake + 24 h` and warn. |
| `H` | hydration (water ÷ `F_t`, poolish water included) | fraction | 0.65 | 0.60–0.70 | `> 0.66`: warning "sticky with maida, wet-centre risk in a 60–90 s bake". `T ≥ 31` and `H > 0.65`: warning. Outside 0.60–0.70: clamp + warn. |
| `T` | current kitchen (day) temperature | °C | 28 | 10–40 | `≥ 31`: HOT band warnings (§8). `≥ 35`: VERY HOT. `> 40`: refuse ("no unrefrigerated stage is possible"). |
| `T_night` | kitchen temperature 22:00–07:00 | °C | `T − 4` if `T ≥ 24`, else `T` | 5–40 | used by the clock-aware integrator (§3.4) |
| `T_fridge` | fridge temperature at the dough shelf | °C | 5 | 1–10 | `≥ 7`: warning "warm fridge — cold holds shortened; put a thermometer on the shelf". `> 10`: refuse fridge plans. |
| `ball_g` | ball weight | g | 280 | 200–320 | print the target diameter `D = 2·√(ball_g / (0.37·π))` cm (280 g → 31 cm; 250 g → 29 cm; 220 g → 28 cm) |
| `flour` | blend | fixed | 80 % maida + 20 % fine (safaid) chakki atta, all atta in the final dough | — | — |
| `yeast_type` | IDY (default) / fresh khameer | enum | IDY | — | fresh grams = IDY grams × 3 (only for a true compressed block; a bakery starter is not convertible — refuse) |
| `oven` | fixed | — | CasaKoa gas, floor target 400 °C (380–420), dome 450–500 °C, 60–90 s | — | — |
| `salt_pct` | salt | fraction of `F_t` | 0.035 (0.030 for plan E) | 0.030–0.035 | — |
| `oil_pct` | olive oil | fraction of `F_t` | 0.03 | 0.00–0.05 | `> 0.03`: note "softer, stickier, less crisp" |
| `FF` | mixer friction factor (advanced) | °C | 15 | 5–25 | one-time calibration: `FF = 4·FDT_measured − T_flour − T_room − T_poolish − T_water` |

Derived: lead time `L = (t_bake − now)` in hours; second-sitting gap `gap = t_bake2 − t_bake` in hours; `t_ready = t_bake − 0.25 h` (the dough is scheduled to hit 100 % progress 15 min before the first launch).

---

## 2. RECIPE MATH (baker's percentages)

All plans except E use a 100 %-hydration poolish that pre-ferments exactly 25 % of the total flour, made of maida only.

```
dough_total  = n × ball_g × 1.02                       (2 % scrap)
F_t          = round5( dough_total / (1 + H + salt_pct + oil_pct) )      round5 = nearest 5 g
F_p          = round5( 0.25 × F_t )                    poolish flour (0 for plan E)
W_p          = F_p                                     poolish water (100 % hydration)
honey        = round( 0.02 × F_p )   plans B, C        (5 g per 250 g); 0 for plans A and E
atta         = round5( 0.20 × F_t )                    fine chakki atta, final dough
maida_final  = F_t − F_p − atta
water_final  = round5( H × F_t − W_p )                 cold water added at mixing
salt         = round( salt_pct × F_t )
oil          = round( oil_pct × F_t )
IDY_poolish  = round0.1( dose_g_per_250 × F_p / 250 )  dose from §4.2
IDY_final    = plan-dependent (§4.3, §4.4); round DOWN to 0.1 g (plans A/B/C), round UP to 0.05 g (plan E)
```

Worked default, 6 × 280 g at 65 %, 3.5 % salt, 3 % oil: `dough_total = 1714 g`, `F_t = 1000 g`, poolish 250 g maida + 250 g water + 5 g honey, final 550 g maida + 200 g atta + 400 g water + 35 g salt + 30 g oil.

Rounding rules: flour and water to 5 g; salt, oil, honey to 1 g; yeast to 0.1 g (0.05 g below 1 g in plan E). Print "use a 0.1 g scale; a level ¼ tsp ≈ 0.9 g IDY" whenever yeast < 2 g. Batches above 2 kg flour are two mixer batches (warn at `n > 12`).

**Effective hydration** for handling warnings = `H + oil_pct`; warn if > 0.70.

**Water temperature (DDT rule).** With the poolish: `T_water = 4·DDT − T_flour − T_room − T_poolish − FF`; without: `T_water = 3·DDT − T_flour − T_room − FF`. `T_flour = T_room` unless chilled. `T_poolish = T_fridge + 4` when the poolish rested 20 min out of the fridge, `T_fridge` when used cold, `T_room` for the same-day poolish (plan A).
DDT targets: plan A/B 23 °C (`T ≥ 28`), 24 °C (21–27 °C), 25 °C (`T ≤ 20`); plan C 20 °C (dough is going to the fridge); plan E 26 °C (`T ≤ 27`) / 24 °C (`T ≥ 28`).
Clamps and instructions: if `T_water > 40` → use 40 °C (warn "dough starts slightly cool"). If `T_water < 1` → "ice water, ice removed (1 °C)" **and** "chill the flour 1 h in the fridge (≈ 8 °C)"; recompute the estimated dough temperature `FDT_est`; if still `> DDT + 1.5` → "replace 20 % of the water weight with crushed ice (≈ −4 °C)"; if still above → "mix in the coolest hour; bowl and hook 20 min in the freezer". The integrator starts the dough at `max(DDT, FDT_est)`.

---

## 3. TEMPERATURE MODEL

### 3.1 Relative fermentation rate `r(T)` (25 °C = 1.00), linear interpolation between rows

| T °C | 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 12 | 14 | 15 | 16 | 18 | 20 | 22 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 38 | 40 | 42 | 45 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| r | .025 | .040 | .047 | .055 | .065 | .077 | .090 | .105 | .15 | .22 | .33 | .40 | .46 | .58 | .70 | .82 | .93 | 1.00 | 1.09 | 1.21 | 1.35 | 1.47 | 1.60 | 1.68 | 1.75 | 1.80 | 1.83 | 1.85 | 1.83 | 1.60 | 1.20 | 0.60 | 0 |

Below 0 °C (freezer) `r = 0`. Above 45 °C `r = 0`.

How the table was chosen (robustness bias — every value sits at or above the median literature estimate so that predicted ready times are early, never late):
- 25–35 °C: temperature-kinetics blend of TXCraig1's chart (BeanAnimal fit: 1.40 at 27.8 °C, 1.75 at 30 °C) and Pyler's plateau (peak 1.85 at 35 °C) — https://www.pizzamaking.com/forum/index.php/topic,26831.0.html ; https://beananimal.com/tools/dough-fermentation-calculator/ ; https://web.archive.org/web/2018id_/http://www.theartisan.net/dough_fermentation_and_temperature.htm
- 15–25 °C: Q10 ≈ 2.3–2.5 (0.40 at 15, 0.70 at 20). Craig's chart is steeper here (0.23 at 15 °C) but the poolish dough is gas-production-limited, not growth-limited, and Dawood's own ratio (3–3.5 h at 28 °C vs 4–5 h "cooler weather") fits Q10 ≈ 2. Choosing the *faster* rate at 15–24 °C is the safe direction (cold-ferment-logistics §4.1 recommends Q10 = 2.3 here; UBC CO₂ data ×2 per 10 °C: https://ojs.library.ubc.ca/index.php/expedition/article/view/188348).
- 0–10 °C: Craig's raw Gänzle fit gives 0.066 at 4 °C, his published chart 0.045–0.05, Modernist Bread 0.10; 0.055 is the upper-middle. Fridge-rate error is asymmetric: under-estimating it over-proofs balls in the fridge, so we do not use the lowest estimate. Sources: temperature-kinetics §2.5; https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/
- Closed-form check for the developer (not used at runtime): `r(T) ≈ 2^((T−25)/6)` reproduces 8–30 °C within ±10 %.

### 3.2 Maturation cap `cap(T)` — hours the FINAL dough may spend at T before the maida gluten fails; log-linear interpolation between rows

| T °C | 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32 | 34 | 36 | 40 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cap h | 140 | 120 | 105 | 90 | 75 | 63 | 53 | 45 | 33 | 24 | 18 | 13.5 | 11 | 9.2 | 7.6 | 6.3 | 5.3 | 4.4 | 3.7 | 3.1 | 2.6 | 2.2 | 1.6 |

`M = Σ Δt / cap(T_core)` accumulated from the end of mixing to the first launch (freezer time counts 0). Interpretation: `M ≤ 0.85` comfortable; `0.85 < M ≤ 1.0` warning "near the flour limit — bake at the early side of the window"; `M > 1.0` **refuse the plan** (choose another plan or delay the start). Anchors: warm side = flour-strength §4.2 (`6 × 2^((22−T)/8)` at 22 °C = 6 h comfortable → 7.6 h hard; 28 °C: 4.4 h hard so the validated 30 min + 3.25 h plan sits at M ≈ 0.77; Dallagiovanna W200 3 h RT, AVPN 8 h ↔ W250–280, Pepe 6 h on W170: https://www.dallagiovanna.it/farine-speciali-far-pizza ; https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf ; https://www.pizzaontheroad.eu/lezioni-di-pizza-2/). Cold side re-anchored so that un-proofed balls at 4–5 °C score ≈ 0.80 after 24 h, ≈ 0.85–0.88 after 36 h and fail (via §4.5 `P_min`) at 48 h — the cold-ferment-logistics ladder "earliest 12 h, best 18–30 h, hard 48 h at 4 °C; 42 h at 5 °C; 31 h at 7 °C" (https://jayarr.pizza/blog/pizza-dough-cold-fermentation/ (Masi: weak flour 8–12 h cold vs 24–48 h for W250+); https://pizzatoday.com/news/working-with-lower-protein-content-flour/127374/ (Lehmann: low-protein flour ≤ 2 days in the cooler)).

### 3.3 Thermal lag (Newton cooling), dough self-heating, integration step

```
T_core(t+Δt) = T_env + (T_core(t) − T_env) · exp(−Δt/τ)
τ = 1.5 h   280 g ball on a tray, loosely covered (fridge or counter)
τ = 4.5 h   bulk mass 1–2 kg in a bowl (only used for the 15–30 min bench rest)
τ = 2.0 h   500 g poolish (not integrated at runtime; poolish uses presets)
τ = 2.75 h  frozen puck thawing in the fridge
self-heat: while a warm stage is active and T_core > 20 °C add +0.5 °C/h to the effective temperature, capped at +2 °C;
           decays at 0.5 °C/h in cold stages.
Δt = 5 min; freezer stage: T_core := −18 °C, r = 0, M += 0.
```
Sources: PizzaBlab "balls at 4 °C for 20 of 24 h, bulk for 5 of 24 h" (https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/), Lehmann 1.5–2 h at 20 °C to reach 10–13 °C core (https://www.pizzamaking.com/forum/index.php/topic,17851.0.html), Lehmann "≈1 °F per hour" heat of metabolism (https://www.pizzamaking.com/forum/index.php/topic,26095.0.html), temperature-kinetics §2.12.

Pre-computed lag values (unit tests): 280 g ball from 20 °C into a 5 °C fridge accrues 0.79 eq-h in the first 4 h, 1.33 by 12 h, 2.11 by 24 h (≈ 46 % of `EQ_B`); at 7 °C: 0.94 / 1.68 / 2.76 (60 %). Ball from a 5 °C fridge into a 28 °C room: 0.25 eq-h after 1 h (core 16.2 °C), 0.93 after 2 h (21.9 °C), 1.88 after 3 h (24.9 °C); at 32 °C: 0.31 / 1.15 / 2.45.

### 3.4 Room temperature by clock
`T_env(t) = T` for 07:00 ≤ clock < 22:00, else `T_night` (default `T − 4` when `T ≥ 24`, else `T`). Stages that span midnight therefore ferment slower — this matters for plan C balls resting on the counter overnight in winter and for the poolish, which is not integrated (presets), so it does not matter there.

### 3.5 Minimum temper time `P_min` (core must reach 18 °C, or 20 °C when `T ≥ 26`)
`P_min = max(0.75, 1.5 · ln((T − T_fridge)/(T − T_target)))`; if `T ≤ T_target + 1` use `T_target = T − 2`. At `T_fridge = 5`: 16 °C 2.56 h; 20 °C 3.0 h; 24 °C 1.73 h; 28 °C 1.58 h; 32 °C 1.22 h; 34 °C 1.09 h. Rationale: Lehmann/PizzaBlab "Neapolitan at 430 °C+ needs ~20 °C core to avoid burnt blisters" (https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/), handoff "cold dough tears, minimum 2 h".

---

## 4. YEAST MODEL

### 4.1 Progress target and the calibration constant
```
EQ_ready(y) = 0.944 · y^(−0.695)         y = IDY % of total flour, direct dough, "ready to bake"
y(EQ)       = (0.944 / EQ)^(1/0.695)     inverse
EQ_B        = 4.56 eq-h                  poolish-dough target (calibrated, see below)
y_eff       = y(EQ_B) = 0.104 %          the poolish dough behaves like a 0.10 % IDY direct dough
```
`EQ_ready` is the least-squares fit to TXCraig1's chart at 25 °C (0.201 % → 3 h, 0.05 % → 7 h, 0.01 % → 24 h; https://www.pizzamaking.com/forum/index.php/topic,26831.0.html, via BeanAnimal). Cross-check with the yeast-model `h_ref` table: 0.1 % IDY → 4.67 eq-h vs Craig 4.8 h at 25 °C, 104 h vs 99 h at 4 °C, 3.46 vs 3.5 h at 28 °C.

**Calibration (once, constant in code):** simulate the validated plan — dough at 23 °C, 0.5 h bench rest in a bulk mass (τ 4.5) at 28 °C, then 3.25 h as balls (τ 1.5) at 28 °C, self-heating on → `EQ_B = 4.562`, `M_B = 0.774`. Source: context-handoff §3 ("3–3.5 h ball proof at 28 °C, start checking at 2.5 h", validated repeatedly with the 5 g poolish). The same target is used for plans B and C (5 g or 3 g poolish; the 3 g preset was validated with the same 3–3.5 h proof) and, scaled, for plan A.

Why a fixed target instead of solving the poolish yeast: the poolish carries 0.5 % IDY of total flour — 5–15× what every published model says a 25 % poolish needs — and works only because it is refrigerated after 1–2 h (poolish-science §3.1, calculators-audit §2.12: chart says 0.035 % for the whole schedule vs 0.5 % used). No model reproduces it; the handoff timelines are the only calibrated data for this flour. Solving would replace validated ground truth with an unvalidated extrapolation, the opposite of robust.

### 4.2 Poolish presets (IDY grams per 250 g poolish flour; scale linearly with `F_p`)

| Plan | Condition | IDY /250 g | Water | Honey /250 g | Counter time before fridge `c` | Fridge hold |
|---|---|---|---|---|---|---|
| B/C "standard" | `T ≤ 27`, or `T` 28–30 with hold ≤ 18 h | **5 g** | room-temp (≤ 22 °C) or fridge-cold 8–12 °C (23–30 °C) | 5 g | `T ≤ 22`: 120 min; 23–27: 90; 28–30: 60 | 10–24 h (12–24 h is the validated band); ≤ 16 h if `T_fridge ≥ 7` |
| B/C "long / hot" | `T ≥ 31`, or `T` 28–30 with hold > 18 h | **3 g** | ice-cold ≈ 5 °C | 5 g | 28–30: 75 min; 31–34: 45; ≥ 35: 25 | as above |
| A "same-day" | any `T ≤ 30` | **7 g** | fridge-cold at `T ≥ 28`, else room-temp | 0 | on the counter until ripe: `T ≤ 20`: 3.5 h; 21–24: 3.0; 25–27: 2.5; 28–30: 2.0 | none |
| A "same-day, hot" | `T ≥ 31` | **5 g** | fridge-cold | 0 | 1.5 h | none |

Visual override printed with every poolish step: "If it has already doubled and is bubbling all over before the clock, refrigerate now." Ripeness at mix time: bubbly, domed or just flattened in the centre, sweet-yeasty with a faint tang. "Collapsed below a high-water line, boozy/sour" → discard and switch to plan E (weak maida cannot absorb an over-ripe preferment: https://www.pizzamaking.com/forum/index.php?topic=10237.0 TXCraig1; https://www.pizzablab.com/the-encyclopizza/poolish-preferment/). Poolish is used cold at `T ≥ 28` (Vito's heat control, https://www.youtube.com/watch?v=4nZ3xXBmHEI) and rested 20 min at `T ≤ 27` (handoff).
Sources for the presets: context-handoff §3 (7 g / 5 g / 3 g rows, validated); hot-climate §4.2 (5→3 g by band, counter 70→25 min); vito-videos §4.2 (3 g / 300 g in the beginners video, 1 h at ~22 °C; 10 g / 300 g for 1–2 h same-day); pizzamaking 85360 (poolish failures when < 1.5 h warm before a cold fridge — hence the visual rule "actively rising before it goes in"). Never emit a dose outside {3, 5, 7} g/250 g.

### 4.3 Final-dough IDY with a poolish
```
plan B/C:  IDY_final = 0            when the solved proof P ≤ 5.0 h  (all normal Islamabad cases)
           otherwise (cold kitchen) add y_add so that P = 4.5 h:
              EQ_target' = 0.944 · (y_eff + y_add)^(−0.695);  solve y_add by bisection in [0, 0.20 %];
              round y_add DOWN to 0.1 g; re-solve P with the rounded value; if P > 5.5 h also print
              "proof in the warmest room or a switched-off oven with the light on (26–28 °C)".
plan A:    IDY_final = 0;  EQ_target_A = EQ_B · (5/7)^0.695 = 3.62 eq-h  (7 g poolish dough ferments faster)
           (5 g same-day poolish at T ≥ 31: EQ_target = EQ_B)
```
Table of `y_add` (g per kg total flour) from the reference run: 12 °C 1.18; 14 °C 0.75; 16 °C 0.45; 18 °C 0.20; ≥ 20 °C 0. Sources: expert-videos §4.3 (0.5 g / kg at `T ≤ 20`), yeast-model rec. 5 (0.6 × direct-dough value only for colder/longer plans), Ooni "above 28 °C reduce yeast 50 %" is honoured implicitly because no yeast is ever added above 20 °C (https://eu.ooni.com/blogs/recipes/ooni-neapolitan-style-pizza-dough).

### 4.4 Plan E (no poolish, emergency) — the only plan that solves yeast
```
stages: mix 0.5 h (dough at DDT) → rest 0.25 h (τ 4.5) → ball → proof P_E = L − 0.5 − 0.25 − 0.17 − 0.25
EQ_E = ∫ r dt over rest + P_E (self-heat on);   y = y(EQ_E / 1.05)      (3.0 % salt slows ≈ 5 % vs the chart's 2 %)
y = min(y, 1.0 %);   IDY_final = ceil(y · F_t / 100 to 0.05 g)        (round UP: under-proof is unrecoverable in < 6 h)
```
Reference values (IDY % of flour, DDT 26 °C at ≤ 27 °C / 24 °C at ≥ 28 °C):

| T \ P_E | 1.5 h | 2 h | 2.5 h | 3 h | 4 h | 5 h |
|---|---|---|---|---|---|---|
| 16 °C | 0.54 | 0.40 | 0.32 | 0.27 | 0.20 | 0.16 |
| 20 °C | 0.47 | 0.34 | 0.26 | 0.21 | 0.14 | 0.11 |
| 22 °C | 0.44 | 0.31 | 0.24 | 0.19 | 0.13 | 0.10 |
| 24 °C | 0.40 | 0.28 | 0.21 | 0.17 | 0.11 | 0.08 |
| 28 °C | 0.39 | 0.25 | 0.18 | 0.13 | 0.08 | 0.06 |
| 32 °C | 0.31 | 0.20 | 0.14 | 0.10 | 0.07 | 0.05 |

Cross-checks: Craig 3 h @ 22 °C ≈ 0.32 % (chart, higher because it assumes the dough is at room temperature from t = 0; ours starts at 26 °C); Forkish "I Slept In" 0.10 % for 4–6 h at 21–23 °C with DDT 28 °C (https://ooni.com/blogs/recipes/ken-forkishs-i-slept-in-but-i-want-pizza-tonight-dough); Ooni classic 0.44 % for ~2 h warm (https://ooni.com/blogs/recipes/classic-pizza-dough). Fixed E formula: hydration 0.62, salt 3.0 %, oil 3 %, no honey, dissolve the IDY in 50 ml of the water at 32 °C before adding the cold water (never IDY into < 20 °C water: https://www.pizzablab.com/learning-and-resources/ingredients/how-to-use-yeast/).

### 4.5 Floors, ceilings, and the flour-strength cap in action
- Yeast floors/ceilings: poolish presets only (3/5/7 g per 250 g); plan E 0.05 % ≤ y ≤ 1.0 %; `y_add` ≤ 0.20 %. Minimum printed quantity 0.2 g (below that print "dilute 1 g IDY in 100 g water and use N g of the liquid").
- Progress window for maida: usable from `F = EQ/EQ_target = 0.90` to `1.10` (strong flour would be 0.85–1.15; yeast-model rec. 6). The engine prints the clock times of `F = 0.90` and `1.10` as the sitting's "window". At 28 °C it is ≈ 43 min wide, at 32 °C 30 min, at 20 °C 68 min, at 16 °C 103 min.
- Maturation cap: `M > 1.0` refuses; `M > 0.85` warns. Plan C additionally requires `M ≤ 0.90` at selection time and the solved temper `P ≥ P_min` (§3.5) — `P < P_min` means the balls were already ready inside the fridge, i.e. over-held → shorten the hold (mix later) or freeze.
- When the user's lead time exceeds what a plan can absorb, the engine **delays the start** (first step = "Nothing to do yet — poolish at …"); it never stretches a stage beyond its band and never raises yeast to compensate.
- Warm-stage caps that the solver enforces implicitly via `cap(T)`: at 28 °C the final dough may not exceed ≈ 4.4 h mix-to-oven; at 32 °C 3.1 h; at 22 °C 7.6 h; cold balls ≤ 30 h at 4 °C, ≤ 25 h at 5 °C, ≤ 18 h at 7 °C (`H_cap = 30 · r(4)/r(T_fridge)`).

---

## 5. PLAN SELECTION (decision tree)

Compute the estimated proof `P_est(T) = min(3.25 · r(28)/r(T), 4.75)` h, the bench rest `R(T)` = 30 min (`T ≤ 27`), 20 min (28–30), 15 min (≥ 31), `BALL` = 10 min, `MIX` = 30 min, `OUT` = 20 min at `T ≤ 27` else 0 (poolish rest), `c_B` = standard-preset counter time, `c_A` = same-day poolish time, head start `h0` = 20 min (≤ 30 °C) / 15 min (≥ 31). Then:

```
D_A    = c_A + MIX + R + BALL + P_est + 0.25                      same-day poolish, everything today
D_Bmin = c_B + 10  + OUT + MIX + R + BALL + P_est + 0.25            fridge poolish, shortest hold
D_Bmax = c_B + 24  + OUT + MIX + R + BALL + P_est + 0.25            fridge poolish, longest hold
D_Cmin = c_B + 10  + OUT + MIX + R + BALL + h0 + 6 + 2.5 + 0.25     cold balls, shortest hold
```
At 28 °C: `D_A = 6.5`, `D_Bmin = 15.5`, `D_Bmax = 29.5`, `D_Cmin = 21.1` h. At 32 °C: 5.2 / 14.4 / 28.4 / 20.7. At 16 °C: 9.7 / 18.5 / 32.5 / 22.6.

```
if L < 3                         → REFUSE ("minimum 3 h")
elif L < D_A                     → plan E  (emergency direct dough; warn "least flavour, least tolerant")
elif L < D_Bmin                  → plan A  (same-day 7 g poolish; start delayed to t_bake − D_A if L > D_A)
elif T ≥ 20 and ((T ≥ 31 and L ≥ D_Cmin) or L ≥ 36)
                                 → plan C  (fridge poolish + cold-fermented balls)
else                             → plan B  (fridge poolish + same-day dough; poolish start delayed so the hold ≤ 24 h)
fallbacks: B with hold < 10 h → A;  C with no feasible hold → B;  E with L < 3 → refuse.
```

Plain-language explanation the app shows for each choice:
- **Plan B (default, 15–36 h lead, any temperature):** "Poolish tonight, dough tomorrow. The fridge holds the poolish; the dough itself ferments only ~4 h at room temperature, which is all this flour tolerates." Room ferment is used because the total warm time (rest + ball proof ≈ 3–5 h) is inside the flour's budget and it is the validated method.
- **Plan C (≥ 36 h lead, or ≥ 31 °C with ≥ 21 h lead; kitchen ≥ 20 °C):** "Dough made the day before; balls sleep in the fridge; they come out 2–3.5 h before baking. Used because (a) with more than 36 h you would otherwise wait idle, and the fridge adds flavour at almost no gluten cost (at 5 °C a ball uses its gluten budget 17× slower than at 28 °C), or (b) above 30 °C a room proof has a usable window of only ~30 minutes, whereas cold balls can be pulled in waves and the dough never sits at 32 °C for 3 h." Cold ferment is never used below 20 °C (the post-fridge proof would exceed 5 h) — winter uses plan B with a pinch of yeast in the final dough.
- **Plan A (6–15 h lead):** "Same-day poolish (7 g). It gives most of the poolish flavour in 2–3 h; the schedule is the validated same-day timeline." If it would start between 22:45 and 07:00 the app says so and suggests baking later or starting a fridge poolish the evening before next time.
- **Plan E (3–6 h):** "No poolish; yeast computed for the hours available. Worst flavour, narrowest window. Consider baking later."
- **Too long:** never refused — the start is delayed ("Nothing to do yet — first step at …"). Only the second sitting can be "too long" (> 30 days: reduce `n`).

Hot band (`T ≥ 31`) extras for every plan: ask for an AC-room temperature (if 24–27 °C is available, use it as `T`); hydration ≤ 65 %; ice water + chilled flour; poke tests start at 65 % of the proof; waves of ≤ 4 balls; balls kept in the kitchen, never beside the oven. Very hot (`≥ 35`): only plans C/B with the 3 g poolish, mixing in the coolest hour, chilled flour.

---

## 6. TIMELINE GENERATION

All times are laid out backwards from `t_ready = t_bake − 15 min`, then checked forward against `now`. Durations:

| Step | Duration / rule | Depends on |
|---|---|---|
| Nothing to do yet | printed at `now` when the first step is > 1 h away | — |
| Make poolish | 5 min; counter `c` (§4.2) | `T`, dose |
| Poolish to fridge | at `t_poolish_start + c`; hold 10–24 h (≤ 16 h if `T_fridge ≥ 7`); sociable-hours shift: if the start falls 22:45–07:00, move it to 07:00 (if hold ≥ 10 h) else to 22:30 the evening before (if hold ≤ 1.06 × cap), else warn | `t_mix` |
| Poolish out | `t_mix − OUT` (20 min at ≤ 27 °C; used cold at ≥ 28 °C) | `T` |
| Mix | 30 min (hydrate 3–4 min low speed with 80 % water → salt → rest of water → knead ≤ 10–12 min → oil last 3 min; strandy: stop, rest 15–20 min, knead 5 min, ≤ 3 cycles; never add flour) | — |
| Bench rest | `R(T)` (plan C: ≤ 20 min); plan E 15 min | `T` |
| Ball | 10 min; 280 g, oiled hands, seam under, oiled tray 5 cm apart, oiled cling film with no holes | — |
| Head start (plan C, leftovers) | `h0` = 20 min (≤ 30 °C), 15 min (≥ 31) at room temperature after balling | `T` |
| Fridge (plan C) | hold `H` chosen by the selector (§5, §7); lid ajar / film loose for the first 60–90 min then sealed | `T_fridge` |
| Take out (plan C) | at `t_ready − P`; `P` solved so that `EQ(t_ready) = EQ_B` (bisection over P ∈ [0, 14] h) with `P ≥ P_min`; waves: `T ≤ 24` all at once; 25–30 °C six at a time; ≥ 31 four at a time, next wave 30 min later | `T`, `T_fridge`, `H` |
| Ball proof (A/B) | `P` solved identically (no fridge stage) | `T` |
| Poke tests | start at 75 % of `P` (65 % at ≥ 31 °C; 70 % after a fridge stage; 60 % after a freezer) and every 20 min | — |
| Light oven | `t_bake − 35 min`, full gas, IR gun on the floor; launch only when the launch spot reads 380–420 °C | — |
| Bake | pizza k at `t_bake + 3.5·(k−1)` min; 60–90 s; turn at 30 s; dome the last 10–15 s; full flame between pizzas, medium-low during the bake | — |
| Park rule | balls that will not be baked within the usable window (2 h at ≤ 27 °C, 1.5 h at 28–30, 1 h at ≥ 31) go into the fridge at ready time and come out 15 min before stretching | `T` |

Reference table — plan B proof `P` (fresh balls after the bench rest, DDT per §2), the 0.90–1.10 window width, and the winter `y_add`:

| T °C | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32 | 34 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P (h), no added yeast | 11.8 | 8.2 | 6.5 | 5.3 | 4.5 | 4.3 | 3.8 | 3.4 | 3.2 | 3.0 | 2.8 | 2.7 |
| `y_add` g/kg → P | 1.18→4.5 | 0.75→4.5 | 0.45→4.5 | 0.20→4.5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| window (min) | 213 | 142 | 103 | 87 | 68 | 59 | 50 | 46 | 43 | 31 | 30 | 30 |
| M at ready | .89 | .80 | .76 | .74 | .76 | .78 | .79 | .77 | .75 | .79 | .80 | .86 |

Cross-checks: handoff 3–3.5 h at 28 °C, 4–5 h "cooler"; hot-climate table 4–4.5 h at 25, 2.5–3 at 30, 2.25–2.5 at 32; expert-videos 5–6 h at 16–19 °C (ours 6.5 → 4.5 with 0.45 g/kg).

Reference table — plan C temper/proof `P` after a cold hold `H` (rest 20 min + head start 20 min at DDT 20 °C, then fridge, then room), with `M` at ready; `*` = below `P_min` (over-held):

| Room / fridge | H = 6 | 12 | 18 | 24 | 30 | 36 | 48 |
|---|---|---|---|---|---|---|---|
| 20 °C / 4 °C | 6.3 h (M .75) | 5.8 (.75) | 5.3 (.78) | 4.8 (.79) | 4.3 (.80) | 3.8 (.83) | 2.6 (.84)* |
| 24 °C / 4 °C | 4.8 (.77) | 4.5 (.78) | 4.1 (.78) | 3.7 (.79) | 3.4 (.80) | 3.0 (.82) | 2.0 (.85) |
| 24 °C / 5 °C | 4.6 (.77) | 4.2 (.76) | 3.8 (.79) | 3.4 (.80) | 2.9 (.82) | 2.4 (.83) | 1.0 (.88)* |
| 24 °C / 7 °C | 4.3 (.76) | 3.7 (.79) | 3.0 (.81) | 2.4 (.83) | 1.6 (.86) | 0.1 (.89)* | 0 (1.11)* |
| 28 °C / 4 °C | 4.0 (.77) | 3.7 (.80) | 3.4 (.78) | 3.1 (.80) | 2.8 (.82) | 2.5 (.82) | 1.6 (.84)* |
| 28 °C / 5 °C | 3.8 (.78) | 3.5 (.77) | 3.1 (.78) | 2.8 (.82) | 2.4 (.82) | 2.0 (.85) | 0.6 (.88)* |
| 28 °C / 7 °C | 3.5 (.79) | 3.0 (.80) | 2.5 (.81) | 2.0 (.84) | 1.2 (.86)* | 0 (.90)* | 0 (1.13)* |
| 32 °C / 5 °C | 3.3 (.76) | 3.0 (.80) | 2.8 (.81) | 2.5 (.81) | 2.2 (.82) | 1.8 (.84) | 0.8 (.87)* |

Cross-checks: expert-videos "balls chilled young need 2–3 h at 28–34 °C, 3–4 h at 22–27, 5–6 h at 16–20"; cold-ferment logistics Regime B 3–3.5 h at 28 °C; Charlie Anderson "out 3 h at ~20 °C after a 2–4 h head start" (https://www.youtube.com/watch?v=1vGNXOr-k-8).

Readiness texts (verbatim strings):
- Poolish ripe: "Bubbly all over, domed or just starting to flatten in the centre, smells sweet-yeasty with a faint tang. Use now or keep refrigerated. Sunk below a ring on the bowl and smells sharp/boozy: discard."
- Ball poke test: "Press a floured finger 1 cm in for 2 s. Springs back fast → wait 20–30 min. Comes back slowly, only halfway → ready. Dent stays / many big bubbles / smells of alcohol → over-proofed: stretch now gently, or re-ball once and rest 60 min (≥ 26 °C), 90 min (22–25), 2 h (≤ 20)."
- Cold balls: "Flattened balls after a day in the fridge are normal. Large surface bubbles are normal. Liquid on the tray, vinegar smell, tearing → over-held: re-ball once and give 60 min, expect a flatter rim."
- Yeast failure: "Flat, wet, shiny ball with no gas after the planned time = dead yeast, not under-timing. Re-mix with 10 g IDY per litre of water and 2 % more salt; 4 h at room temperature; or bake thin."

---

## 7. LEFTOVERS (remainder = `n − n_first` balls)

Decided at balling time; the remainder never gets a full room proof before storage.

```
gap = t_bake2 − t_bake   (h);   t_ready2 = t_bake2 − 15 min
W_room(T) = 2.0 h (T ≤ 27), 1.5 h (28–30), 1.0 h (≥ 31)      usable window at room temperature

(1) gap ≤ W_room(T)          → keep covered at room temp with the first sitting; park in the fridge if big bubbles appear; pull 15 min before stretching.
(2) else try FRIDGE (un-proofed balls, "Regime B"):
      simulate: ball at T0 → h0 at room → fridge (T_fridge) from t_ball + h0 until t_out2 → room proof P2 ending at t_ready2
      solve P2 (bisection) so EQ = EQ_target;   H2 = t_out2 − (t_ball + h0)
      accept if  P2 ≥ P_min  and  M2 ≤ 1.0  and  H2 ≤ 30 · r(4)/r(T_fridge)   (≈ 25 h at 5 °C, 18 h at 7 °C, 30 h at 4 °C)
      steps: "after h0 min put the N balls in the fridge, oiled tops, one per 1 L lidded box or 5 cm apart, lid ajar 60–90 min then seal";
             "take out at t_out2; proof P2 h; poke test from 70 % of P2; bake t_bake2".
(3) else FREEZER (frozen right after balling, un-proofed):
      gap > 30 d → refuse ("make fewer balls now"); 14 d < gap ≤ 30 d → warn "reduced rise".
      t_to_fridge = max(t_ready2 − 24 h, t_ball + 6 h)   (thaw in the fridge 18–30 h)
      simulate: 15 min at room → freezer (r = 0) → fridge thaw: first 8 h at 0 °C (τ 2.75, latent heat), then T_fridge → room proof P3 ending at t_ready2
      solve P3 so EQ = 1.15 · EQ_target   (freezing kills ~15 % of the yeast)
      steps: "flatten to 3 cm pucks, oil, freeze uncovered 2–3 h then skin-tight cling + bag, coldest shelf, label";
             "move to the fridge at t_to_fridge"; "out at t_ready2 − P3, re-round gently, proof P3 h, poke test from 60 % of P3; never refreeze; bake the same day".
```
Reference outputs: 24 h fridge hold at 5 °C then 2.6 h proof at 30 °C (M 0.80); 2.7 h fridge then 3.9 h at 28 °C for a 4 h gap; frozen puck → 24 h fridge thaw → 5.5 h at 26 °C / 4.4 h at 30 °C / 5.0 h at 28 °C.
Rescue rules (unplanned leftovers, i.e. balls that were fully proofed): re-ball immediately, oil, seal, fridge ≤ 24 h (hard 36 h); out 2 h before at 25–28 °C, 1.5 h at ≥ 29, 2.5 h at 21–24, 3 h at 16–20; if slack/flat at pull time re-ball gently and rest 1.5–2 h at ≥ 25 °C; beyond 24 h → freeze the puck, thaw 24 h in the fridge, 1.5–2 h at room temp; re-ball at most once in a ball's life.
Sources: freezing-and-leftovers §4.1–4.4 (fridge ≤ 24 h / hard 36 h for proofed maida balls; freezer best ≤ 14 d, acceptable ≤ 30 d; puck 3 cm; +15–50 % yeast damage; https://www.pmq.com/in-lehmanns-terms-the-big-freeze/ ; https://www.kingarthurbaking.com/blog/2024/03/22/freeze-pizza-dough ; https://www.pizzablab.com/learning-and-resources/general-articles/pizza-dough-freezing/), Vito V17 "freeze un-proofed right after balling" (https://www.youtube.com/watch?v=rfEuvksO0wc), Ooni thaw "fridge overnight then ≥ 6 h at ~20 °C" (https://ooni.com/blogs/ooni-insights/how-to-freeze-pizza-dough-and-how-to-defrost-it-correctly), Vito 15–20 min then fridge in hot weather (https://www.youtube.com/watch?v=4nZ3xXBmHEI).

---

## 8. WARNINGS / VALIDATION (exact conditions)

| Condition | Severity | Text |
|---|---|---|
| `L < 3 h` | refuse | Not enough time: minimum 3 h (emergency dough). |
| plan E chosen | warn | Emergency direct dough: least flavour, narrowest window; 62 % hydration, 3.0 % salt. Bake later if you can. |
| `T ≥ 31` | warn | Hot kitchen: if an AC room at 24–27 °C is available enter that temperature; waves of 4; ice water. |
| `T ≥ 35` | warn | Very hot: mix in the coolest hour, chilled flour, fridge-based plan only. |
| `T > 40` | refuse | No unrefrigerated stage is possible. |
| `T_fridge ≥ 7` | warn | Warm fridge: holds shortened (poolish ≤ 16 h, balls ≤ 18 h); put a thermometer on the dough shelf. |
| `T_fridge > 10` | refuse fridge plans | — |
| `H > 0.66` | warn | Sticky with maida; wet centre risk in a 60–90 s bake. |
| `T ≥ 31 and H > 0.65` | warn | Keep ≤ 65 % in this heat. |
| `H` outside 0.60–0.70 | clamp + warn | — |
| `n > 12` | warn | Two mixer batches; split into two containers before any fridge step. |
| `n > 20` | refuse | — |
| `n_first > n` | clamp | — |
| `t_bake2 ≤ t_bake` | ignore + warn | — |
| `n_first < n` and no `t_bake2` | warn | Assumed the remainder is baked 24 h later. |
| `gap > 30 d` | refuse remainder | Make fewer balls now. |
| `14 d < gap ≤ 30 d` | warn | Frozen balls beyond 14 days rise less. |
| `M > 1.0` | refuse plan | Too long at this temperature for this flour. |
| `0.85 < M ≤ 1.0` | warn | Near the flour limit — bake at the early side of the window. |
| solved `P < P_min` (plan C / fridge leftovers) | reject candidate → shorter hold or freezer | — |
| poolish start or mix between 22:45 and 07:00 | warn | Night step unavoidable with this bake time; bake later or (≥ 20 °C) use cold balls. |
| same-day poolish would start before `now` | warn | Start now; use it when domed; predicted late. |
| `T_water < 1` | instruct | Ice water, chilled flour, ice substitution (§2). |
| `T_water > 40` | clamp + note | — |
| `T ≥ 28` and `n_first > 6` | warn | Bake in waves of 6 (≥ 31 °C: 4); park later balls in the fridge at ready time. |
| fresh yeast selected and source is a bakery starter | refuse conversion | Unknown strength; test a small batch. |
| monsoon toggle (RH > 75 %) | instruct | Hold back 10–15 g water per kg flour; add only if stiff. |

---

## 9. WORKED EXAMPLES (all numbers from `engine_robust.py`)

### A — Fri 4 Sep 18:00 → bake Sat 5 Sep 20:00; 6 pizzas, 4 eaten, rest Sun 6 Sep 20:00; 65 %; 30 °C; fridge 5 °C
`L = 26 h`; `D_A 6.0, D_Bmin 15.0, D_Bmax 29.0, D_Cmin 21.1` → **plan B** (T < 31, L < 36). Recipe: dough 1714 g, `F_t` 1000 g; poolish 250 g maida + 250 g ice-cold water + **3.0 g IDY** (hold > 18 h at 30 °C → "long/hot" preset) + 5 g honey; final 550 g maida + 200 g fine atta + 400 g water at **12 °C** + 35 g salt + 30 g oil; no yeast in the final dough. Solved proof `P = 2.96 h`, `M = 0.79`, window 19:31–20:02.

| Clock | Step |
|---|---|
| Fri 18:00 | Poolish (above), loose cover on the counter 75 min; fridge earlier if already doubled and bubbling |
| Fri 19:15 | Seal, refrigerate (hold 21.0 h) |
| Sat 16:17 | Poolish straight from the fridge (used cold); check ripeness |
| Sat 16:17 | Mix (target dough temp 23 °C); salt after 3–4 min; oil last |
| Sat 16:47 | Rest 20 min |
| Sat 17:07 | Ball 6 × 280 g; 4 first-sitting balls proof at 30 °C |
| Sat 17:27 | Leftovers: 2 balls into the fridge after 20 min (lid ajar 60–90 min then seal); cold hold 23.7 h |
| Sat 19:20 | Poke tests every 20 min |
| Sat 19:25 | Light the CasaKoa |
| Sat 20:00 | Ready (predicted 19:45; window 19:31–20:02); stretch to 31 cm; balls not baked within 90 min → fridge-park |
| Sun 17:07 | Leftovers out; proof 2.6 h at 30 °C; poke from 18:57; bake 20:00 (M 0.80) |

Sensitivity (engine run with `T_fridge = 7`): poolish preset switches to 5 g with a 16 h hold (start Fri 22:30), and the 2 leftover balls are **frozen** instead (a 24 h hold at 7 °C would exceed `H_cap` = 18 h): move to fridge Sat 23:07, out Sun 15:22, proof 4.4 h.

### B — 10:00 → bake 19:00 same day; 3 pizzas, all eaten; 65 %; 32 °C
`L = 9 h`; `D_A 5.2, D_Bmin 14.4` → **plan A** (start delayed). Recipe: dough 857 g, `F_t` 500 g; same-day poolish 125 g maida + 125 g fridge-cold water + **2.5 g IDY** (5 g/250 g hot preset), no honey; final 275 g maida + 100 g atta + 200 g water at **1 °C, flour chilled 1 h** (est. dough 22 °C) + 18 g salt + 15 g oil. `EQ_target = 4.56` (5 g poolish), `P = 2.79 h`, `M = 0.80`, window 18:32–19:02 (30 min).

| Clock | Step |
|---|---|
| 10:00 | Nothing to do yet (first step 14:02) |
| 14:02 | Same-day poolish; ready in ~1.5 h (domed, bubbling); use at once when it looks ripe |
| 15:32 | Mix; 16:02 rest 15 min; 16:17 ball 3 × 280 g, proof at 32 °C |
| 18:06 | Poke tests (65 % of P) |
| 18:25 | Light oven; 19:00 bake (predicted ready 18:45) |
Warnings: HOT band — use an AC room if available; window only 30 min.

### C — Mon 7 Sep 09:00 → bake Wed 9 Sep 20:00; 8 pizzas, 5 eaten, rest Sat 12 Sep 14:00; 62 %; 26 °C
`L = 59 h` ≥ 36 → **plan C**. Recipe: dough 2285 g, `F_t` 1355 g; poolish 340 g maida + 340 g fridge-cold water + **6.8 g IDY** (5 g/250 g) + 7 g honey; final 745 g maida + 270 g atta + 500 g water at **4 °C** + 47 g salt + 41 g oil (DDT 20 °C). Selector: candidates `H` from 25 h (cap at 5 °C) down; highest score (H 25, poolish 24 h, sociable mix) → `H = 25 h`, `P = 2.96 h`, `M = 0.81`, `P_min = 1.88 h`.

| Clock | Step |
|---|---|
| Mon 09:00 | Nothing to do yet (first step 13:07) |
| Mon 13:07 | Poolish; counter 90 min → Mon 14:37 fridge (hold 24 h) |
| Tue 14:37 | Poolish out, rest 20 min; 14:57 mix (dough 20 °C); 15:27 rest 20 min; 15:47 ball 8 × 280 g, 20 min head start |
| Tue 16:02 | Leftovers: 3 balls flattened to 3 cm pucks, oiled, frozen (gap 66 h > fridge cap) |
| Tue 16:17 | 5 balls into the fridge, lid ajar 60–90 min then seal; hold 25 h |
| Wed 16:47 | Take out all 5 (≤ 6 at 26 °C = one wave); proof 3.0 h at 26 °C; poke from 18:51 |
| Wed 19:25 | Light oven; 20:00 bake (window 19:17–20:17) |
| Fri 13:45 | Move the 3 pucks to the fridge (24 h thaw) |
| Sat 08:12 | Out; re-round; proof 5.5 h at 26 °C; poke from 11:32; bake 14:00 (M 0.90 — warn) |

### D — 12:00 → bake 16:00 same day; 2 pizzas; 65 % requested; 22 °C (emergency)
`L = 4 h < D_A 9.2` → **plan E** (hydration forced to 62 %, salt 3.0 %). Recipe: dough 571 g, `F_t` 340 g: 270 g maida + 70 g atta + 210 g water at **19 °C** (DDT 26) + 10 g salt + 10 g oil + **0.7 g IDY** (`y = 0.202 %` from `EQ_E = 3.01 eq-h`, 2.83 h proof; rounded up from 0.687 g). `M = 0.52`.

| Clock | Step |
|---|---|
| 12:00 | Mix now (dissolve the 0.7 g IDY in 50 ml water at 32 °C first) |
| 12:30 | Rest 15 min; 12:45 ball 2 × 280 g |
| 14:35 | Poke tests (65 %) |
| 15:25 | Light oven; 16:00 bake |
Warning: emergency dough — least flavour, narrowest window.

### E — winter: Sat 12 Dec 15:00 → bake Sun 13 Dec 14:00; 4 pizzas; 65 %; 16 °C
`L = 23 h`; `D_Bmin 18.5` (with `P_est` capped at 4.75 h) → **plan B**. Recipe: dough 1142 g, `F_t` 665 g; poolish 165 g maida + 165 g room-temp water + **3.3 g IDY** (5 g/250 g) + 3 g honey; final 365 g maida + 135 g atta + 265 g water at **40 °C** (capped; est. dough 24 °C, target 25) + 23 g salt + 20 g oil + **0.2 g IDY on the flour** (`y_add` solved on the clock-aware schedule = 0.035 % of flour = 0.23 g, rounded down to 0.2 g; the generic table value at a constant 16 °C is 0.45 g/kg). With the rounded dose `P = 5.04 h`, `M = 0.61`, window 12:58–14:27 (89 min).

| Clock | Step |
|---|---|
| Sat 15:00 | Poolish; counter 120 min → Sat 17:00 fridge (hold 14.7 h) |
| Sun 07:42 | Poolish out, rest 20 min; 08:02 mix (40 °C water + 0.2 g IDY); 08:32 rest 30 min; 09:02 ball 4 × 280 g, proof at 16 °C |
| Sun 12:49 | Poke tests |
| Sun 13:25 | Light oven; 14:00 bake (predicted ready 13:45) |

Additional engine checks (not required by the brief, useful as tests): 34 °C, L 30 h, 8 pizzas → plan C, poolish 3 g/250 g with 45 min counter, 15.5 h ball hold, 2.7 h temper in waves of 4; 12 °C, L 48 h → plan B (C blocked below 20 °C) with 0.7 g IDY added, mix at 04:12 flagged as a night step; 28 °C with a 4 h second sitting → leftovers 2.7 h fridge + 3.9 h proof; 28 °C with a 3-day second sitting → freezer, 5.0 h post-thaw proof.

---

## 10. CONSTANTS WITH JUSTIFICATION AND SOURCES

| Constant | Value | One-line justification | Source |
|---|---|---|---|
| `r(T)` table | §3.1 | Craig chart/Gänzle fit on the warm side, Q10 ≈ 2.3–2.5 in 15–25 °C (gas-limited poolish dough, handoff ratio), upper-middle fridge rates | https://www.pizzamaking.com/forum/index.php/topic,26831.0.html ; https://beananimal.com/tools/dough-fermentation-calculator/ ; https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/ ; https://ojs.library.ubc.ca/index.php/expedition/article/view/188348 |
| Peak/plateau 30–38 °C | 1.60–1.85 | Pyler and the 2020 dough-CO₂ paper show a flat peak; nothing to gain above 30 °C | https://web.archive.org/web/2018id_/http://www.theartisan.net/dough_fermentation_and_temperature.htm ; https://www.e3s-conferences.org/articles/e3sconf/pdf/2020/40/e3sconf_te-re-rd2020_03012.pdf |
| `cap(T)` table | §3.2 | W≈180 flour: 3–4 h at 20–22 °C (Italian W tables), Pepe 6 h on W170, AVPN 8 h ↔ W250; cold ladder 12/18–30/48 h at 4 °C | https://www.dallagiovanna.it/farine-speciali-far-pizza ; https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf ; https://www.pizzaontheroad.eu/lezioni-di-pizza-2/ ; https://jayarr.pizza/blog/pizza-dough-cold-fermentation/ ; https://pizzatoday.com/news/working-with-lower-protein-content-flour/127374/ |
| Flour profile | protein 10.2 %, GI 40–55, W_est 180 | Sunridge/Unity spec (protein 10 %, wet gluten 24 %, GI 40, absorption 50 %) + 20 % atta | https://unityfoods.pk/assets/pdfs/Unity%20Product%20Brochure%20Mobile-withoutFrozen%2005-03-2026.pdf |
| `EQ_ready = 0.944·y^-0.695` | — | fit to Craig chart at 25 °C (0.201 % → 3 h, 0.05 % → 7 h, 0.01 % → 24 h) | https://www.pizzamaking.com/forum/index.php/topic,26831.0.html (via BeanAnimal) |
| `EQ_B = 4.56` | calibrated | validated 30 min + 3.25 h at 28 °C, dough at 23 °C, 5 g poolish | context-handoff.md §3 |
| Poolish presets 7 / 5 / 3 g per 250 g | fixed | validated rows of the handoff table; Vito 5 g/300 g (1 h RT + 16–24 h fridge) and 3 g/300 g beginners; 10 g/300 g same-day | context-handoff.md ; https://www.youtube.com/watch?v=u7Hd6ZzKgBM ; https://www.youtube.com/watch?v=lAFKQoSMbxI ; https://www.youtube.com/watch?v=SZflCxA1-a0 |
| Counter time 120/90/60/75/45/25 min | by band | Vito 1–2 h "depends on room temperature"; handoff 1.5–2 h at 28 °C; hot-climate scaling ÷1.7 per +5 °C; pizzamaking 85360 failures below 1 h warm | https://www.youtube.com/watch?v=4nZ3xXBmHEI ; https://www.pizzamaking.com/forum/index.php?topic=85360.0 |
| Poolish hold 10–24 h, ≤ 16 h at ≥ 7 °C | — | Vito "past 24 h it gets acid"; Fond/JayArr ≤ 24 h; Dough Formula ≤ 12 h after falling; handoff 16–24 h | https://www.youtube.com/watch?v=lAFKQoSMbxI ; https://fond.kitchen/glossary/poolish/ ; https://thedoughformula.com/fundamentals/preferments-101/ |
| Honey 2 % of poolish flour, none in A/E or final dough | — | Lehmann "too hot for sugar" ≥ 370 °C floor; AVPN forbids sugar; ≤ 0.5 % of total inside a ≥ 12 h poolish is consumed | https://www.pizzamaking.com/forum/index.php/topic,60583.0.html ; https://pizzatoday.com/news/2009-february-dough-doctor/127117/ |
| PFF 25 % | fixed | Scott (pizzamaking) ≤ 25 % for Neapolitan; Dough Formula 20–30 % for timing safety; Pizzalogic shorten for AP flour | https://www.pizzamaking.com/forum/index.php/topic,78883.0.html ; https://pizzalogic.app/blog/how-to-make-poolish-pizza-dough/ |
| Hydration 0.60–0.70, default 0.65, warn > 0.66 | — | handoff 65 % validated; Gozney 58–65, Ooni 60–65, PizzaBlab 58–62 for 60–90 s bakes; AP/maida absorbs 53–58 % | https://us.gozney.com/blogs/news/pizza-dough-hydration-explained ; https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained ; https://www.pizzablab.com/learning-and-resources/baking/the-ultimate-guide-to-dough-hydration/ |
| Salt 3.5 % (3.0 % plan E); ×1.05 time factor | — | salt slows protease on weak flour (Pete-zza), AVPN 40–60 g/L ≈ 2.2–3.75 %; Beck 2012 gas reduction | https://www.pizzamaking.com/forum/index.php/topic,12605.0.html ; https://doi.org/10.1002/jsfa.4575 |
| Oil 3 % default, 0–5 % | — | Lehmann 2–5 %, most 2–3 %; > 3 % adds stickiness; handoff wanted Toss-style richness | https://pizzatoday.com/news/oil-n-dough/128591/ |
| Ball 280 g → 31 cm at 0.37 g/cm² | — | AVPN 200–280 g ↔ 22–35 cm; handoff: 280 g balls were under-stretched | https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf ; https://pizzatoday.com/news/the-perfect-pizza-dough-ball-weight-knead-to-know/614869/ |
| τ ball 1.5 h, bulk 4.5 h, poolish 2.0 h, thaw 2.75 h | — | PizzaBlab 4 h vs 19 h at fridge temperature; Lehmann lab warm-up 2–2.5 h to 10 °C; Sourdough Journey ~12 h bulk | https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/ ; https://www.pizzamaking.com/forum/index.php/topic,17851.0.html ; https://thesourdoughjourney.com/the-mystery-of-percentage-rise-in-bulk-fermentation/ |
| Self-heat +0.5 °C/h, cap +2 °C | — | Lehmann "about 1 °F per hour" | https://www.pizzamaking.com/forum/index.php/topic,26095.0.html |
| DDT 23/24/25 °C (RT plans), 20 °C (fridge), 26 °C (E); FF 15 °C; water cap 40 °C; ice rule −4 °C per 20 % ice | — | PizzaBlab FDT 23–27 RT / 18–23 CF; Ooni warm months 21–23 °C; King Arthur measured FF 12–13 °C for a 7-min KitchenAid mix, +1 °C per extra 2 min | https://www.pizzablab.com/learning-and-resources/mixing-kneading/final-dough-temperature/ ; https://eu.ooni.com/blogs/recipes/ooni-neapolitan-style-pizza-dough ; https://web.archive.org/web/2019id_/https://www.kingarthurflour.com/blog/2018/08/27/determining-the-friction-factor-in-baking |
| `P_min` core 18/20 °C | — | Lehmann 50 °F minimum, Neapolitan ovens need ~20 °C core; handoff "minimum 2 h" | https://www.pmq.com/check-your-doughs-temperature-before-opening-it-into-skins/ |
| Ready window 0.90–1.10 | — | maida narrowed from 0.85–1.15 (yeast-model rec. 6); pizzalogic "perfect at 3 h, past prime at 4.5 h at 24 °C" | https://pizzalogic.app/blog/how-to-proof-pizza-dough/ |
| M warn 0.85 / refuse 1.0; plan C target ≤ 0.90 | — | flour-strength "refuse score > 1.0"; robustness margin | flour-strength-maida.md §4.2 |
| Head start 20/15 min; lid ajar 60–90 min | — | Vito "15–20 min then fridge when hot"; Lehmann cross-stack until core 10–13 °C | https://www.youtube.com/watch?v=4nZ3xXBmHEI ; https://www.pmq.com/effective-dough-management/ |
| Cold-ball hold cap 30 h × r(4)/r(T_fridge) | 30/25/18 h at 4/5/7 °C | cold-ferment-logistics ladder (best 18–30 h at 4 °C, 16–26 at 5, 12–20 at 7) | cold-ferment-logistics.md §4.3 ; https://www.seriouseats.com/the-pizza-lab-how-long-should-i-let-my-dough-cold-ferment (strong-flour ceiling halved twice) |
| Plan thresholds: E < D_A, A < D_Bmin, C ≥ 36 h or hot ≥ D_Cmin, C only ≥ 20 °C | — | expert-videos §4.1 gates (< 6 h emergency, 14–36 h Vito poolish, 36–60 h cold balls); hot-climate "switch to fridge-proofing at ≥ 31 °C" | expert-videos.md §4.1 ; hot-climate-dough.md §4.1/4.5 |
| Waves 6 (25–30 °C) / 4 (≥ 31); park rule 2/1.5/1 h | — | cold-ferment logistics party staging; Lehmann 2.5–3 h window at ≤ 27 °C, shorter above | https://www.pizzamaking.com/forum/index.php/topic,66269.msg648467.html#msg648467 |
| Freezer: puck 3 cm, best ≤ 14 d, ≤ 30 d, ×1.15 EQ, 24 h fridge thaw | — | Lehmann 10–15 d static freezer; Pizzablab 2 weeks peak; King Arthur ≤ 1 month; yeast viability −15…−45 % | https://www.pmq.com/in-lehmanns-terms-the-big-freeze/ ; https://www.pizzablab.com/learning-and-resources/general-articles/pizza-dough-freezing/ ; https://www.kingarthurbaking.com/blog/2024/03/22/freeze-pizza-dough |
| Oven: light at −35 min, floor 380–420 °C, 3.5 min per pizza | — | Ooni Koda "≥ 380–450 °C before launching", handoff 25–30 min preheat, 2–3 min recovery | https://ooni.com/pages/getting-started-cook/ooni-koda-16 ; context-handoff.md §1 |
| Fresh yeast ×3; ADY ×1.33 | — | AVPN "1 g dry = 3 g fresh"; Lesaffre | https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf |

Where the research disagreed and what was chosen: (1) poolish dose 0.35 g (chart) vs 1 g (poolish-science) vs 5 g (validated) → validated presets, because no model explains the working method and a sluggish poolish is a documented failure; (2) Q10 ≈ 3.5–4 (Craig) vs ≈ 2 (handoff ratio, UBC) in 15–25 °C → the faster rate (Q10 2.3–2.5), because a prediction that is early is recoverable and one that is late is not; (3) fridge rate 0.045 (chart) vs 0.066 (raw fit) vs 0.10 (Modernist) → 0.055, the same asymmetry applied to over-holding in the fridge; (4) cold hold for maida 24 h hard (flour-strength) vs 48 h hard (cold-ferment logistics, freezing) → best ≤ 25–30 h, hard 48 h via `cap(T)`, because the 24 h figure is for the *whole* dough clock and the handoff observed 18–24 h holds working; (5) temper 60–90 min (Forkish/Lehmann) vs 3–5 h (Ooni/Gozney) → solved per ball history (fully proofed balls are never re-chilled in the plan; un-proofed cold balls get the full solved proof); (6) bulk vs ball → ball before any cold stage (Lehmann/PizzaBlab: 2–3 uncontrolled eq-h saved), bulk rest limited to 15–30 min.

---

## 11. TEST VECTORS FOR THE JAVASCRIPT PORT

1. `r(4) = 0.055`, `r(20) = 0.70`, `r(28) = 1.35`, `r(32) = 1.75`; `cap(28) = 4.4`, `cap(5) = 75`.
2. `EQ_ready(0.1) = 4.67`; `y(4.56) = 0.104 %`.
3. Calibration: dough 23 °C, 0.5 h τ 4.5 at 28 °C then 3.25 h τ 1.5 at 28 °C, self-heat on → `EQ = 4.56 ± 0.02`, `M = 0.77 ± 0.01`.
4. Plan B proof at 24 °C = 3.8 h; at 32 °C = 2.8 h; at 16 °C = 6.5 h (0 added) and 4.5 h with 0.45 g/kg.
5. Plan C at 28 °C / 5 °C: H 24 h → P 2.8 h, M 0.82; H 48 h → rejected (`P < P_min`). At 24 °C / 7 °C H 36 h → rejected.
6. Plan E at 22 °C with 2.83 h proof → y = 0.202 % (0.7 g on 340 g).
7. Example A leftover: fridge 23.7 h at 5 °C then 2.6 h at 30 °C, M 0.80. Example C leftover: freezer, 5.5 h at 26 °C after a 24 h fridge thaw.
8. 280 g ball 20 → 5 °C fridge: 0.79 eq-h in 4 h; 5 °C → 28 °C room: 1.88 eq-h in 3 h.
9. Selection: L 9 h at 32 °C → A; L 26 h at 30 °C → B; L 59 h at 26 °C → C; L 4 h at 22 °C → E; L 23 h at 16 °C → B; L 48 h at 12 °C → B; L 30 h at 34 °C → C.

---

## 12. RULE LIST (single testable statements)

R1 Progress `EQ = Σ r(T_core)·Δt` with `Δt = 5 min`, `r` from the §3.1 table; freezer counts 0.
R2 Maturation `M = Σ Δt / cap(T_core)` from end of mixing to first launch; `M > 1.0` refuses the plan, `M > 0.85` warns; plan C only selects holds with `M ≤ 0.90`.
R3 Core temperature follows `T_env + (T_core − T_env)·e^(−Δt/τ)` with τ = 1.5 h (ball), 4.5 h (bulk rest), 2.75 h (thawing puck); +0.5 °C/h self-heating above 20 °C in warm stages, capped at +2 °C.
R4 Room temperature is `T` from 07:00 to 22:00 and `T_night` (default `T − 4` when `T ≥ 24`) otherwise.
R5 The poolish-dough target is the constant `EQ_B = 4.56 eq-h` (calibrated from 30 min + 3.25 h at 28 °C, dough 23 °C); plan A with the 7 g poolish uses `4.56 × (5/7)^0.695 = 3.62`.
R6 Direct-dough yeast: `y % = (0.944 / EQ)^(1/0.695)`; plan E divides `EQ` by 1.05 for 3.0 % salt, caps `y` at 1.0 %, rounds UP to 0.05 g.
R7 Poolish flour = 25 % of total flour, 100 % hydration, maida only; honey 2 % of poolish flour in plans B/C, none in A/E; 20 % of total flour is fine atta, all in the final dough.
R8 Poolish IDY per 250 g flour: 5 g standard; 3 g when `T ≥ 31` or (`T` 28–30 and hold > 18 h); 7 g same-day (5 g same-day when `T ≥ 31`); scale linearly with poolish flour; never any other value.
R9 Poolish counter time before the fridge: 120 min (`T ≤ 22`), 90 (23–27), 60 (28–30, 5 g) / 75 (28–30, 3 g), 45 (31–34), 25 (≥ 35); refrigerate earlier if it has doubled and is bubbling all over.
R10 Poolish fridge hold 10–24 h (≤ 16 h if `T_fridge ≥ 7`); below 10 h plan B is replaced by plan A; the start is delayed rather than the hold extended; the start is moved to 07:00 or 22:30 when it would fall at night and the band allows.
R11 Poolish is used cold at `T ≥ 28` and rested 20 min at `T ≤ 27`; a collapsed, sour poolish is discarded and the plan switches to E.
R12 Final-dough IDY is 0 g whenever the solved proof is ≤ 5.0 h; otherwise add the smallest `y_add ≤ 0.20 %` (rounded down to 0.1 g) that brings the proof to 4.5 h (reference: 0.45 g/kg at 16 °C, 1.18 g/kg at 12 °C).
R13 DDT = 23 °C (`T ≥ 28`), 24 °C (21–27), 25 °C (`T ≤ 20`) for room-proof plans; 20 °C for plan C; 26/24 °C for plan E; water = 4·DDT − T_flour − T_room − T_poolish − 15 (3·DDT − … without poolish); clamp 1–40 °C; below 1 °C instruct chilled flour, then 20 % ice (−4 °C).
R14 Bench rest 30 min (`T ≤ 27`), 20 (28–30), 15 (≥ 31); plan C ≤ 20 min; plan E 15 min; ball right after the rest.
R15 Plan selection: refuse `L < 3 h`; E if `L < D_A`; A if `L < D_Bmin`; C if `T ≥ 20` and (`L ≥ 36` or (`T ≥ 31` and `L ≥ D_Cmin`)); else B; with `D_A = c_A + 0.5 + R + 0.17 + P_est + 0.25`, `D_Bmin = c_B + 10 + OUT + 0.5 + R + 0.17 + P_est + 0.25`, `D_Cmin = c_B + 10 + OUT + 0.5 + R + 0.17 + h0 + 6 + 2.5 + 0.25`, `P_est = min(3.25·r(28)/r(T), 4.75)`.
R16 The final warm proof `P` is found by bisection on [0, 14] h so that `EQ(t_ready) = EQ_target`, with all earlier stages laid out backwards from `t_ready = t_bake − 15 min`.
R17 Plan C chooses the cold hold `H` (6 h to `min(30, 30·r(4)/r(T_fridge))` in 0.5 h steps) maximising `1.5·min(H,25)/25 + min(poolish_hold,16)/16 + 0.5·[mix between 06:00 and 24:00]` among candidates with `P_min ≤ P ≤ 5 h`, `M ≤ 0.90` and a poolish hold ≥ 10 h; balls get a 20 min (15 min at ≥ 31 °C) head start before the fridge.
R18 `P_min = max(0.75, 1.5·ln((T − T_fridge)/(T − T_target)))`, `T_target = 20 °C` if `T ≥ 26` else 18 °C (or `T − 2` if `T ≤ T_target + 1`); any cold stage whose solved proof is below `P_min` is rejected.
R19 Poke tests start at 75 % of the proof (65 % at `T ≥ 31`, 70 % after a fridge stage, 60 % after a freezer) and repeat every 20 min; the poke test overrides the clock.
R20 The printed sitting window runs from `F = 0.90` to `F = 1.10`; balls not baked within 2 h (`T ≤ 27`) / 1.5 h (28–30) / 1 h (≥ 31) of ready are refrigerated at ready time and pulled 15 min before stretching; waves of 6 (25–30 °C) or 4 (≥ 31 °C) with 30 min spacing.
R21 Leftovers: gap ≤ window → room; else fridge from balling (after the head start) if the solved `P2 ≥ P_min`, `M2 ≤ 1.0` and hold ≤ `30·r(4)/r(T_fridge)`; else freezer as 3 cm pucks right after balling, thaw 24 h in the fridge (18–30), then proof to `1.15·EQ_target`; gap > 30 d refuses; 14–30 d warns.
R22 Unplanned proofed leftovers: re-ball at once, fridge ≤ 24 h (hard 36), pull 2 h before at 25–28 °C (1.5 h ≥ 29, 2.5 h 21–24, 3 h 16–20); beyond 24 h freeze; a ball is re-balled at most once.
R23 Oven: light at `t_bake − 35 min`; launch only at a floor reading of 380–420 °C; pizza k at `t_bake + 3.5·(k−1)` min; 60–90 s, turn at 30 s.
R24 Hard input limits: `n ≤ 20` (warn > 12), `T ≤ 40`, `T_fridge ≤ 10` for fridge plans, `H` 0.60–0.70 (warn > 0.66; warn > 0.65 at `T ≥ 31`), `t_bake2 > t_bake`, second sitting ≤ 30 d.
R25 Fresh compressed yeast = 3 × IDY grams; a bakery starter is not converted.
