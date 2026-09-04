# Calculators audit — how existing pizza dough calculators compute yeast vs time/temperature

Dimension: calculators-audit. Date: 2026-09-04. Raw scrapes/source files: `research/raw/` (hendricius-dough.rb, jonaswitt-dough.ts, jonaswitt-flour.ts, rafcalc-Calc.cs, zacalc-CalculatorData.swift, craig_table.json, pizzablab-guide.md, pizzablab-factors.md, pm-*.md, scen.py, scen2.py).

Context this was judged against: weak Pakistani maida + 20% fine chakki atta, Saf-Instant IDY, CasaKoa 60–90 s bake, Islamabad kitchens 28–34 °C (Sept), 12–18 °C (winter), home fridge 3–8 °C, established Vito-style poolish (250 g flour + 250 g water + 5 g IDY + 5 g honey; 1–2 h RT then 16–24 h fridge), final dough 65–70 % hydration, 3.5 % salt, ~5 % oil, 280 g balls, 3–3.5 h ball proof at 28 °C.

---

## 1. Sources consulted

| # | URL | What it is | Credibility |
|---|---|---|---|
| S1 | https://github.com/hendricius/pizza-dough (calculator/app/services/dough.rb, raw file read) | the-bread-code.io calculator source (Ruby) | PRIMARY (source code) |
| S2 | https://pizza-calculator.the-bread-code.io/ | Live calculator page text | primary (page) |
| S3 | https://github.com/Rafbor42/RafCalc (Calc.cs read in full) | RafCalc (Rafael/"Rafbor") C# source: Japi1/Japi2 formulas, fridge rule, poolish curve | PRIMARY (source code) |
| S4 | https://www.laverace.com/viewtopic.php?t=4011 | RafCalc release thread on LA VERACE (Italian forum), formulas + coefficients stated by the author | PRIMARY (author's post) |
| S5 | https://github.com/jonaswitt/pizza-calculator (src/data/dough.ts, flour.ts) + https://pizza-calculator.jonaswitt.com/ | Independent JS implementation of Japi2 + a W/protein-vs-hours table | PRIMARY (source code) |
| S6 | https://github.com/stevehollx/zaCalc (CalculatorData.swift) | zaCalc2 iOS app, open source; contains TXCraig1's baker's-yeast chart digitised as a 61×27 matrix (ADY %, °F 35–95, hours) + Craig's sourdough multi-stage polynomial | PRIMARY (source code; the only machine-readable copy of Craig's chart found) |
| S7 | https://www.pizzamaking.com/forum/index.php?topic=26831.0 (p1) and https://www.pizzamaking.com/forum/index.php/topic,26831.380.html (p20, Reply 399 "Fermentation-Table---Extended") | TXCraig1 "Baker's yeast quantity prediction model" thread | PRIMARY (expert, the model's author; chart itself is an image) |
| S8 | https://www.pizzamaking.com/forum/index.php/topic,22649.msg230690.html | TXCraig1 sourdough model thread: how to combine multiple time/temperature stages with the chart; Mitch's spreadsheet; Gänzle growth model constants | PRIMARY (expert) |
| S9 | https://www.pizzablab.com/calculators/pizza-dough-calculator-guide/ and https://www.pizzablab.com/calculators/pizza-dough-calculator/ | PizzaBlab calculator (Yuval Weinberg): guide, dropdown option lists, preferment logic | primary (calculator author's documentation) |
| S10 | https://www.pizzablab.com/learning-and-resources/fermentation/factors-affecting-fermentation-rate/ | PizzaBlab article with author's comments giving actual calculator outputs (4 h at 23/24/25 °C) | primary-ish (author) |
| S11 | https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/ | PizzaBlab Lehmann vs hybrid cold-ferment article | expert blog |
| S12 | https://www.pizzamaking.com/forum/index.php/topic,85986.0.html | "How accurate is PizzApp for yeast percentage?" (Yuval/pizzablab, HansB, others) | expert forum |
| S13 | https://www.pizzamaking.com/forum/index.php/topic,58104.0.html ; …/topic,70913.0.html ; …/topic,70512.0.html | PizzApp threads: CT setting, examples, opinions | forum |
| S14 | https://www.housegardenhobby.com/pizzapp-guide-pizza-dough/ | PizzApp+ v1.9 walkthrough with a fully specified worked example | blog (but gives exact numbers) |
| S15 | https://www.outdoorpizzachef.com/how-to-use-pizzapp-best-dough-calculator/ | PizzApp walkthrough | blog |
| S16 | https://jordospizzacalculator.com/ and https://jordospizzacalculator.com/guides/fermentation-timing.html | Jordo's calculator + its timing guide | calculator (closed source) |
| S17 | https://www.dough.school/ | "Pizza AI" calculator landing page (scraped) | calculator (closed) |
| S18 | https://www.stadlermade.com/pizza-calculator/ , /yeast-calculator/ | Stadler Made calculator (paywalled "Maker Club") | calculator (closed) |
| S19 | https://www.youtube.com/watch?v=Cvl6Nvnb_yM (transcript via youtubetotranscript.com) ; Google Play / App Store listings | Ooni app dough calculator | primary (Ooni's own video) but no formula disclosed |
| S20 | https://pizzalogic.app/ | PizzaLogic calculator; states its temperature rule | calculator (closed) |
| S21 | https://bakersmath.co/pizza-dough-calculator | BakersMath; states Q10 rule and calibrated range | calculator (closed) |
| S22 | https://pizzaplan.app/en/ (and /it/) | PizzaPlan app; states Hamelman ×3 per 9 °C rule and Craig model for RT | calculator (closed) |
| S23 | https://mypizzacorner.com/pizza-dough-calculator/ | My Pizza Corner calculator | calculator (closed) |
| S24 | https://chefsbinge.com/pizza-dough-calculator/ | Chefs Binge calculator (yeast conversions) | calculator (closed) |
| S25 | https://calcoi.com/calculator/pizza-dough-calculator/ | "Modenese 1990" fresh-yeast table (Italian) | blog/calculator, unverified provenance |
| S26 | https://diavolapro.com/it/blog/calcolatore-pizza-professionale-diavola-pro.html | Simple Italian formula (farina×23)/(ore×idratazione×temp) | blog |
| S27 | https://www.pizzamaking.com/preferment-calculator.html (exa text) ; https://www.pizzamaking.com/dough-calculator.html (blocked, 403) ; https://pizzadoughcalculator.vercel.app/calculator (JS app, no SSR) | pizzamaking.com Lehmann & Preferment calculators (Mike "Boy Hits Car" + Pete-zza) | primary (page description) |
| S28 | https://beananimal.com/tools/dough-fermentation-calculator/ | Curve-fit of Craig's chart (equations not published) | secondary |
| S29 | https://www.pizzamaking.com/forum/index.php/topic,70059.20.html ; https://www.mightypizzastone.com/2017/02/04/pizza-and-bread-dough-recipe-creator/ (cert expired) | Other tools built on Craig's chart | secondary |
| S30 | https://pandough.app/en/blog/best-pizza-dough-calculators | 10-app comparison (no numbers) | blog |

---

## 2. Findings with numbers

### 2.1 TXCraig1 "Baker's yeast quantity prediction model" (pizzamaking.com) — the de-facto standard

- The chart (S7) gives **hours to "ready to bake"** for a given yeast % (three columns IDY / ADY / CY per cell) at a given **room temperature** (35–95 °F). Craig: "The target temp is the room temp – not the dough. For very large batches in bulk, the mass effect may need to be considered." (S7 p20 #385)
- Craig on reliability: "The chart is a big average. I fit a set of equations to a sample of data comprised of many different formulas and workflows… For me, I find that if I go just a bit more than it tells me – not even a full column to the right – it almost always works perfectly." (S7 #383). HansB: "I use two to three times the percentage of IDY shown on the chart for doughs fermented for 24 hours or less." (S7 #382)
- Craig on cold: "The reason it's harder to model cold fermentation scenarios is because at refrigerator temperatures, the margins of error get huge." (S7 p21). Chart "assumes 100% of the fermentation takes place at the given temperature. It does not take into account the time it takes the dough to get to that temperature." (S8)
- **Yeast-type ratio used in the chart columns** (from zaCalc's digitisation, S6): ADY 0.126 % ↔ IDY 0.096 % ↔ CY 0.300 %, i.e. **IDY = 0.762 × ADY; CY = 2.381 × ADY; CY = 3.125 × IDY**. Reply 399 title confirms "table pushed out to 1% IDY / 3% CY".
- **Digitised chart** (S6, `craig_table.json`): 61 temperatures (35…95 °F in 1 °F steps = 1.67…35 °C), 27 yeast columns (ADY 0.004…1.26 %). Excerpt, converted to **IDY % columns** (hours to ready):

| °C (°F) | 0.003 | 0.006 | 0.010 | 0.016 | 0.024 | 0.032 | 0.040 | 0.048 | 0.056 | 0.064 | 0.096 | 0.128 | 0.160 | 0.192 | 0.224 | 0.256 | 0.320 | 0.384 | 0.448 | 0.512 | 0.576 | 0.640 | 0.704 | 0.768 | 0.832 | 0.896 | 0.960 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1.7 (35) | - | - | - | - | - | - | - | - | - | - | 167 | 136 | 115 | 101 | 90 | 82 | 70 | 61 | 54 | 49 | 45 | 42 | 39 | 37 | 35 | 33 | 31 |
| 2.8 (37) | - | - | - | - | - | - | - | - | - | - | 133 | 108 | 92 | 80 | 72 | 65 | 55 | 49 | 43 | 39 | 36 | 33 | 31 | 29 | 28 | 26 | 25 |
| 3.9 (39) | - | - | - | - | - | - | - | - | 159 | 145 | 108 | 87 | 74 | 65 | 58 | 53 | 45 | 39 | 35 | 32 | 29 | 27 | 25 | 24 | 22 | 21 | 20 |
| 5.0 (41) | - | - | - | - | - | - | 165 | 145 | 130 | 118 | 88 | 71 | 61 | 53 | 47 | 43 | 37 | 32 | 29 | 26 | 24 | 22 | 21 | 19 | 18 | 17 | 16 |
| 7.2 (45) | - | - | - | - | 165 | 134 | 114 | 100 | 89 | 81 | 60 | 49 | 41 | 36 | 32 | 29 | 25 | 22 | 20 | 18 | 16 | 15 | 14 | 13 | 12 | 12 | 11 |
| 10.0 (50) | - | - | - | 143 | 107 | 86 | 74 | 64 | 58 | 52 | 39 | 32 | 27 | 23 | 21 | 19 | 16 | 14 | 13 | 11 | 11 | 10 | 9 | 9 | 8 | 8 | 7 |
| 12.8 (55) | - | - | 139 | 96 | 71 | 58 | 49 | 43 | 39 | 35 | 26 | 21 | 18 | 16 | 14 | 13 | 11 | 9 | 8 | 8 | 7 | 7 | 6 | 6 | 5 | 5 | 5 |
| 15.6 (60) | - | 129 | 96 | 66 | 49 | 40 | 34 | 30 | 27 | 24 | 18 | 15 | 12 | 11 | 10 | 9 | 7 | 7 | 6 | 5 | 5 | 5 | 4 | 4 | 4 | 4 | 3 |
| 18.3 (65) | 152 | 92 | 68 | 47 | 35 | 28 | 24 | 21 | 19 | 17 | 13 | 10 | 9 | 8 | 7 | 6 | 5 | 5 | 4 | 4 | 3 | 3 | 3 | 3 | 3 | 3 | 2 |
| 21.1 (70) | 99 | 60 | 45 | 31 | 23 | 19 | 16 | 14 | 12 | 11 | 8 | 7 | 6 | 5 | 4 | 4 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| 23.9 (75) | 65 | 39 | 29 | 20 | 15 | 12 | 10 | 9 | 8 | 7 | 5 | 4 | 4 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 25.0 (77) | 56 | 34 | 25 | 17 | 13 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 26.7 (80) | 45 | 27 | 20 | 14 | 10 | 8 | 7 | 6 | 6 | 5 | 4 | 3 | 3 | 2 | 2 | 2 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 28.3 (83) | 38 | 23 | 17 | 12 | 9 | 7 | 6 | 5 | 5 | 4 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | - | - | - | - | - | - | - | - | - | - |
| 30.0 (86) | 32 | 19 | 14 | 10 | 7 | 6 | 5 | 4 | 4 | 4 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | - | - | - | - | - | - | - | - | - | - |
| 32.2 (90) | 27 | 16 | 12 | 8 | 6 | 5 | 4 | 4 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | - | - | - | - | - | - | - | - | - | - |
| 35.0 (95) | 22 | 13 | 10 | 7 | 5 | 4 | 4 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | - | - | - | - | - | - | - | - | - | - |

(Hours are integers in the source; ≥28 °C rows are truncated at 0.32 % IDY / "2 h" floor — the chart's practical floor is ~1–2 h.)

- **Verification that this matrix IS the current Craig chart**: PizzaBlab quotes "72 hours @ 2.8C gives 0.224% IDY" (S12) → matrix row 2.78 °C, column ADY 0.294 (=IDY 0.224) → 72 h. Exact match. PizzaBlab's stated 4 h outputs (S10 author comment): 23 °C → 0.189 % IDY, 24 °C → 0.176 %, 25 °C → 0.128 %; matrix gives 0.128 % at 25 °C (exact) and 0.160 % at 23–24 °C (PizzaBlab slightly refined/higher).
- **Implied temperature sensitivity of Craig's chart** (computed at 0.126 % ADY): 4.4→10 °C ×2.5; 10→15.6 °C ×2.2; 15.6→21.1 °C ×2.2; 21.1→26.7 °C ×2.0; 26.7→32.2 °C ×2.0. I.e. **rate roughly doubles every 5.5 °C ≈ Q10 ≈ 3.5–4** (not the textbook Q10 = 2). 4 °C vs 25 °C: ×21 slower. 4 °C vs 22 °C at 0.2 % IDY: ×14.5.
- **Multi-stage combination rule (Craig, S8)**: walk the chart — every cell in a yeast column is a time/temp combination that finishes the dough; after spending t₁ at T₁ you have consumed t₁/H(y,T₁) of the fermentation, and the remainder must be finished at the next temperature. Craig's worked example: 1.5 % starter, 36 h at 60 °F (of 69 h needed) → remaining 33 h at 60 °F ≡ 9 h at 80 °F. Mitch's spreadsheet formalises this as: find y such that **Σ tᵢ / H(y, Tᵢ) = 1**, and reports "how much of the fermentation is occurring at each stage… the percent of flora activity not the percent of time." Craig's caveat: "dough doesn't instantly go from 60F to 80F… the shorter the window of time at a temperature, the more important the adjustment becomes."
- Craig's sourdough temperature model (for reference, S8): Gänzle C. milleri: relative growth = 0.0124·(36−T)^2.981·exp(−0.3355·(36−T)); LAB: 0.1267·(41−T)^1.5404·exp(−0.1931·(41−T)); T in °C; LAB weighted 50 %. zaCalc implements the sourdough multi-stage as starter% = 89.4 / 2^(Σ tᵢ/f(Tᵢ)) with a quartic-polynomial f(T in °F) (S6 lines 383–421). This is a "sum of doublings" model — same structure as the fraction-sum rule.

### 2.2 PizzaBlab dough calculator (S9, S10, S12)

- "utilizes a predictive model of yeast activity developed by TXCraig1 from pizzamaking.com, and has been refined through extensive trial and error."
- Inputs: ball weight or thickness factor; # balls; water 56–62 % (suggested); salt 2–3 %; yeast type IDY/ADY/CY; fermentation method **Cold** or **Room temperature**; temperature dropdown RT **14–30 °C in 0.5 °C steps (57–86 °F)**; cold **4 °C or lower, 5, 6, 7, 8, 9 °C**; duration dropdown (both methods): **12, 16, 24, 30, 36, 42, 48, 60, 72, 84, 96 h** (the RT list scraped shows the same values; the author's comments show 2–8 h RT outputs exist, so the live RT list includes short durations too — see open questions); preferment flour 10–30 % recommended, hydration 100 % poolish / 45 % biga; preferment temp RT only (14–30 °C), duration 1–28, 32, 36 h.
- Fermentation duration = "from the END OF KNEADING until the pizza is baked." With a preferment, duration = final dough only.
- Cold numbers are for the **Lehmann method** (ball immediately, fridge within ~20 min): "the calculator provides an amount of yeast that may appear higher than what you are accustomed to." Hybrid (RT then fridge then RT) is explicitly NOT modelled: "you're essentially using hybrid fermentation, so it's impossible to provide an accurate answer… I'd start with the amount of yeast the calculator suggests [for room temperature fermentation], do some test batches."
- **Preferment logic**: (1) yeast for the preferment from its own time/temp on preferment flour; (2) total yeast for the final-dough profile on total flour; (3) final-dough yeast = total − preferment yeast; if ≤ 0 show "-" (no extra yeast).
- Sugar > 5 %: multiply yeast ×1.5–2. Usability window: "with a 2 hour fermentation, an extra 30 minutes represents a 25% increase… for a 6 hour fermentation… only 8%."
- Cold-ferment article (S11): hybrid methods "typically use between 0.1–0.3% instant dry yeast"; balls from fridge need "30 minutes to 3 hours" to reach ~10 °C core, "1–2 hours" at 20 °C ambient.

### 2.3 RafCalc / Japi formulas (S3, S4, S5) — the Italian classic

Verbatim from Calc.cs and the LA VERACE thread:
```
Japi1: LB = f*c*(1+s/200)*(1+o/300) / ((-80+4.2*i-0.0305*i^2) * (g*t)^1.2)        c = 57.5
Japi2: LB = f*c*(1+s/200)*(1+o/300) / ((-80+4.2*i-0.0305*i^2) * g^2.5 * t^1.2)     c = 2250 (RafCalc default; CalcolaPizza original 2820, "riduzione di circa 20%")
LB = grams FRESH yeast; f = flour g; i = hydration % (water/flour*100); g = °C; t = hours; s = salt g per litre water; o = fat g per litre water
```
- RafCalc validates **15 ≤ T ≤ 35 °C** ("TempEntre15_35"), coefficient 10–100 (Japi1) / 100–6000 (Japi2). Japi2 is "for elevated temperatures" (selectable "CalculChaleur").
- **Temperature averaging**: `Temperatura = PuntataTemp*PuntataOre/total + ApprettoTemp*ApprettoOre/total` (time-weighted mean of bulk and ball temps).
- **Fridge rule (GetDurata)**: "on considère une efficacité de /10 pour les heures frigo" → `effective_hours = (Puntata+Appretto) − FrigoOre + FrigoOre/10`. Fridge hours count **one tenth**; constraint total − fridge ≥ 1 h. No fridge temperature input.
- **Poolish yeast (CalcolaLievitoPoolish)**, % fresh yeast on poolish flour as function of poolish hours h: `h ≤ 3: 0.045 − 0.01h`; `h > 3: 1.964e-8h⁶ − 1.373841e-6h⁵ + 3.856769e-5h⁴ − 5.5632627e-4h³ + 4.428364621e-3h² − 1.982851654e-2h + 0.046814567303`. Evaluated: 2 h → 2.5 % fresh (0.83 % IDY); 4 h → 1.13 % (0.38 % IDY); 8 h → 0.49 % (0.16 %); 12 h → 0.18 % (0.06 %); 16 h → 0.10 % (0.03 %); 18 h → 0.09 %. **Diverges above ~18 h** (20 h → 0.25 %, 24 h → 4.07 %) — polynomial only valid 1–18 h at RT (RafCalc default PreimpTemperatura = 18 °C).
- Fresh:dry ratio in RafCalc: `RapportoLievFS` (user-set, default 3).
- Japi2 evaluated (1 kg flour, 65 %, salt 50 g/L, oil 40 g/L): 6 h@30 °C → 1.17 g fresh (0.039 % IDY at 3:1); 8 h@25 → 1.31 g (0.044 %); 12 h@25 → 0.81 g (0.027 %); 24 h@20 → 0.61 g (0.020 %); 24 h@18 → 0.80 g (0.027 %); 48 h@18 → 0.35 g (0.012 %); 4 h@30 → 1.91 g (0.064 %); 3 h@28 → 3.21 g (0.107 %).
- jonaswitt (S5) "Suggested flour strength" table `[W, protein %, max rising hours]`: [80,9.1,1.0] [110,9.6,1.5] [140,10.2,2.0] [150,10.4,2.5] [170,10.7,3.0] [180,10.9,3.5] [190,11.1,4.0] [200,11.3,4.5] [210,11.5,5.0] [220,11.6,5.5] [230,11.8,6.5] [240,12,7.5] [250,12.2,8.5] [260,12.4,9.5] [270,12.6,10.5] [280,12.8,12] [290,12.9,13.5] [300,13.1,15.5] [310,13.3,17.5] [320,13.5,20] [330,13.7,22.5] [340,13.9,25.5] [350,14,29] [360,14.2,33] [370,14.4,38] [380,14.6,43]. **For maida at 9–10.5 % protein this table says W≈80–150 → 1–2.5 h of (room-temperature) rising tolerance.** This is the RafCalc/Confraternita "flour strength vs maturation hours" heuristic (Italian forum lore; not peer-reviewed), and it is the single most important "weak flour" number in this audit.

### 2.4 the-bread-code (hendricius) calculator (S1, S2) — no time/temperature model

- `DEFAULT_HYDRATION = 0.6; DEFAULT_WEIGHT = 250; DEFAULT_DRY_YEAST = 0.0005 (0.05 %); FRESH_YEAST_MODIFIER = 3; DEFAULT_SOURDOUGH = 0.05; DEFAULT_SALT = 0.02`. Flour = weight/(1+hydration+salt+yeast)×pizzas.
- Only guidance text: "This amount is good if your room temperature is around 22°C (70°F). If it is warmer use slightly less. If it is colder use more." Page presets 2 h/8 h/24 h/48 h, "fridge around 6°C (43°F): at 4°C (39°F) or below it's too cold, the yeast goes dormant." Yeast % is user-editable; **no formula**.

### 2.5 PizzApp+ (NFP Software / "fisico") — closed formula, behaviour reverse-engineered from examples

- Inputs (S14, S15): balls, ball weight, water %, salt %, RT hours, RT °C, optional CT hours + CT °C (enable in Settings), yeast type CY/ADY/IDY/FSD/LSD, waste (default 5 %), **"Yeast +20 %" buffer default** (newer versions show a "yeast %" setting defaulting 50 %, S13), Biga mode (yeast fixed by biga-flour %, "1% fresh yeast, 24 h at 18 °C or 48 h at 13–14 °C, W > 350"; temperature does NOT change biga yeast).
- Worked example (S14): 8×250 g, 65 %, 3 % salt, IDY, **6 h RT @20.5 °C + 32 h CT @3.5 °C → Flour 1249 g, Water 812 g, Salt 37 g, Yeast 1.64 g = 0.131 % IDY** (includes +20 % → base ≈ 0.109 %). Craig multi-stage fraction-sum for the same profile = **0.104 %** → PizzApp ≈ Craig for hybrid profiles.
- S12: for ~72 h cold + a few hours RT PizzApp gives "about 0.1 %"; Craig fraction-sum for 4 h@20 + 72 h@3 + 2 h@20 = 0.079 %. S13 (58104): 12 h RT → 0.56 g; same with CT enabled → 1.54 g (flour not stated). Community verdicts: "underestimates yeast when a cold ferment is involved, one person… increase by 30%" (S12); Yuval: "PizzApp never gave me good results. Craig's chart is far superior"; others: "24 hour rt dough. Works great" (S13 70512); "amounts of yeast it recommends to be high" (70512 OP). The +20 % buffer and the "hours you enter are the hours it models — warm-up time not accounted for" (HansB) explain most disagreements.

### 2.6 Jordo's pizza calculator (S16) — fixed lookup, not a model

- Example recipe: 1000 g 00 flour, 650 g water, 25 g salt, **0.9 g instant yeast** (4×268 g balls). Guide table (per 500 g flour, IDY): RT 4–6 h → 3 g (0.6 %); 8–10 h → 1.5 g (0.3 %); 12–14 h → 0.5 g (0.1 %); cold 24 h → 1 g (0.2 %); 48 h → 0.5 g (0.1 %); 72 h → 0.3 g (0.06 %). Temperature compensation is a heuristic: at 25 °C+ "everything moves 30–50 % faster"; 16–18 °C slower by similar margin; cold water "extra 1–2 hours". Timeline: bulk 60–90 min RT, ball, fridge; pull 60–90 min before stretching. Poolish/biga toggle splits flour/water; "Vito" style = "double fermentation" (no numbers).

### 2.7 dough.school "Pizza AI" (S17)

- Input = date/time you want to eat; outputs strategy ("51h available — Strategy Cold Fermented, ~47h cold + warm-up, Yeast (est.) ~0.1–0.3g (minimal)"). FAQ: "24-hour cold ferment at 4°C, use about 0.1% instant dry yeast (approximately 0.6g for 600g flour). For same-day dough (4–6 hours at room temperature), use 0.5–1% yeast." No formula; marketing says "0.01 g accuracy". Not AI in any disclosed sense.

### 2.8 Stadler Made (S18)

- Paywalled Maker Club: "Adjust time & temperature", "Yeast measuring tool", biga calculator "coming soon"; page shows 65 % hydration default; ideal dough temp "20–26 °C". No formula or outputs visible without login.

### 2.9 Ooni app (S19)

- Ooni's own video: inputs = number of pizzas, ball size (e.g. 360 g for 16"), hydration ("sixty percent is a great starting point"), salt, oil, "duration and temperature you wish to prove your dough… make dough in the morning for use the same evening or even the next day". Store listing: temperature, hydration, yeast type, proofing time. No formula disclosed; help-centre page is empty. Third-party "Ooni-style" table (handychefdom, not Ooni): per 500 g flour IDY — RT 2–4 h 1.5–2 g; cold 24 h 0.7–1 g; 48 h 0.3–0.5 g; 72 h 0.2–0.3 g.

### 2.10 pizzamaking.com Lehmann & Preferment calculators (S27)

- Tools by Mike (Boy Hits Car) with Pete-zza. Inputs: thickness factor or dough weight, shape, hydration, salt, oil, sugar, **yeast type + yeast % (user-entered)**, bowl residue %; preferment as % of flour/water/dough weight + preferment hydration; optional commercial yeast in final mix. **No time/temperature logic at all** — they are baker's-percentage scalers. The classic page now 403s; the forum links to a JS rewrite at pizzadoughcalculator.vercel.app.

### 2.11 Other stated temperature rules

| Tool | Rule | Source |
|---|---|---|
| PizzaPlan.app | Hamelman (Bread 2nd ed. p.89): "fermentation speed triples per 9 °C"; for pure RT uses Craig's model, capped at 24 h; ≥26 °C: "Biga switches to a two-stage fridge process, poolish goes straight to cold" | S22 |
| BakersMath | Q10: "roughly doubles for every 10 °C"; calibrated 12–34 °C; "at 4 °C doesn't follow the Q10 curve as cleanly"; 24 h RT Neapolitan 0.05–0.15 % IDY; 2 h at 24 °C 0.3–0.5 % | S21 |
| PizzaLogic | "Yeast activity roughly doubles every 15 °F (8 °C). Cold fermentation (40 °F) slows activity to ~5 % of room-temperature speed"; example 679 g flour, 0.85 g IDY (0.125 %) for 4 h RT | S20 |
| PizzaBlab article | "a 10 °C increase doubles the enzymatic activity" (enzymes, not yeast) | S10 |
| "Modenese 1990" table (fresh yeast per 1 kg flour, 65 %) | 2 h@25 °C 30 g; 4 h@22 10 g; 8 h@22 5 g; 12 h@22 2.5 g; 24 h@22 1 g; 24 h@18 0.5 g; 48 h fridge 4 °C 0.3 g; 72 h fridge 0.15 g; dry = fresh/3 | S25 (unverified) |
| Diavola Pro | fresh g = (flour g × 23)/(hours × hydration % × °C); e.g. 1000 g, 70 %, 24 h, 21 °C → 0.65 g | S26 |
| Chefs Binge / zaCalc conversions | ADY ≈ 40 % of fresh weight, IDY ≈ 1/3 fresh; zaCalc IDY = 0.762 ADY, CY = 2.381 ADY | S24, S6 |
| My Pizza Corner | proof 1–48 h; cold 4–7 °C, RT 13–33 °C; "3 or 4 hours… around 10 times as much yeast [as] a 24 hour prove"; 36 h profile = ~30 h cold + ~6 h RT | S23 |

### 2.12 Scenario comparison (IDY % of total flour; g per 1 kg in brackets)

Models: **Craig-FS** = Craig chart with fraction-sum multi-stage (Σ tᵢ/H(y,Tᵢ)=1, log-log interpolation; `scen.py`); **Japi2/RafCalc** = Japi2 (c=2250, 65 %, salt 50 g/L, oil 40 g/L) with fridge hours ÷10 and time-weighted RT temperature, fresh→IDY ÷3; **Hamelman**, **Q10=2**, **PizzaLogic ×2/8 °C** all anchored to 0.10 % IDY for 24 h at 20 °C (the anchor is arbitrary — these rows show *shape* only).

| Scenario | Craig-FS | Japi2/RafCalc | Hamelman ×3/9 °C | Q10=2 | ×2/8 °C | PizzApp / others |
|---|---|---|---|---|---|---|
| (a) 6 h @ 30 °C | **0.032 % (0.32 g)** | 0.039 % | 0.118 % | 0.200 % | 0.168 % | Jordo 4–6 h RT 0.6 %; dough.school "0.5–1 %" |
| (b) 8 h @ 25 °C | **0.048 % (0.48 g)** | 0.044 % | 0.163 % | 0.212 % | 0.195 % | Jordo 8–10 h 0.3 % |
| (c) 2 h@25 + 20 h@4 + 3 h@28 | **0.055 % (0.55 g)**; stage shares 28 % / 13 % / 59 % | 0.043 % | 0.166 % | 0.164 % | 0.170 % | PizzApp-like (6 h@20.5+32 h@3.5) 0.109 % base |
| (d) 24 h@4 + 2 h@30 | **0.105 % (1.05 g)**; shares 24 % / 76 % | 0.057 % | 0.236 % | 0.201 % | 0.223 % | PizzaBlab/Lehmann 24 h@4 (ball straight to fridge, no RT stage) 0.734 %; dough.school 0.1 % |
| (e) 48 h@4 + 2 h@22 | **0.148 % (1.48 g)**; shares 62 % / 38 % | 0.073 % | 0.256 % | 0.132 % | 0.167 % | Lehmann 48 h@4 → 0.285 %; Jordo 48 h cold 0.1 %; Modenese 0.3 g fresh ≈ 0.01 % |

Single-stage Craig reads for reference: 24 h@4 °C 0.734 %; 48 h@4 0.285 %; 72 h@4 0.162 %; 72 h@3 0.211 %; 24 h@20 0.029 %; 12 h@25 0.026 %; 3 h@28 0.128 %; 3.5 h@28 0.083 %; 3.5 h@32 0.052 %; 4 h@25 0.128 %; 4 h@30 0.048 %; 5 h@15 0.576 %; 8 h@15 0.320 %.

Sensitivity (Craig-FS): (d) with fridge at 6 °C → 0.097 %, at 8 °C → 0.082 %; room 32 instead of 30 °C → 0.077 %; 3 h instead of 2 h at 30 °C → 0.072 %. (e) at 6 °C → 0.107 %, 8 °C → 0.076 %. **A 2 °C fridge error changes the answer ~10 %; one extra hour at 30 °C changes it ~30 %.** Warm stages dominate.

Dawood's current workflow, evaluated as one continuous ferment on total flour with Craig-FS (poolish 2 h@28 + 20 h@4, then 0.5 h rest + 3.5 h balls @28): **0.035 % IDY total** vs the 0.5 % he actually uses (5 g in the poolish). Poolish alone (2 h@28 + 20 h@4) as a "ready" ferment: 0.137 % of poolish flour (0.34 g on 250 g) vs 5 g used (2 %). Ball proof alone 3.5 h@28: 0.083 %.

---

## 3. Contradictions between sources and how to resolve them

1. **Cold-ferment yeast: Lehmann-style (Craig/PizzaBlab) vs hybrid/rule-of-thumb.** Craig/PizzaBlab say 24 h@4 °C needs 0.73 % IDY and 72 h@3 °C 0.21 % (dough balled cold and never warmed); Jordo/dough.school/Modenese say 0.06–0.2 %. Both are right for different processes: the low numbers assume 1–3 h warm bulk before and 1–3 h warm proof after, which (per the fraction-sum) does 40–75 % of the work. **Resolution: never use a single "fridge" number; always model the warm stages explicitly with the fraction-sum. Do not offer a "cold only" path that ends with cold balls — Dawood's own handoff says cold balls cannot be baked without a 2–4 h warm proof anyway.**
2. **Temperature sensitivity: Q10 = 2 (BakersMath, PizzaBlab enzymes, PizzaLogic ×2/8 °C) vs Hamelman ×3/9 °C vs Craig's chart (≈×2 per 5.5 °C, Q10 ≈ 3.5–4 in 4–32 °C).** Craig's chart is the only one fitted to pizza-dough data and PizzApp's hybrid output matches it; Hamelman is the closest simple rule. **Resolution: use the chart (or a fit to it); if a closed-form is wanted, use ×2 per 5.5 °C, not Q10 = 2.** The Q10 = 2 tools overstate yeast for hot Islamabad kitchens by 3–6× (scenario a: 0.20 % vs 0.03 %).
3. **RafCalc's "fridge hours count 1/10" vs Craig's chart (4 °C is ~1/14–1/34 the speed of 22–28 °C depending on yeast level).** Japi2 outputs are within ~20 % of Craig for RT cases (a, b) but ~half of Craig for fridge-heavy cases (d, e). Resolution: the ÷10 rule is a crude constant; the chart handles fridge temperature explicitly. Use the chart; keep Japi2 only as a cross-check for RT-only schedules.
4. **PizzApp accuracy**: "underestimates for cold" (some users, +30 %) vs "too high" (others) vs "works great for 24 h RT". Explained by (i) +20 % default buffer, (ii) users not entering warm-up time, (iii) waste %. PizzApp's hybrid result equals Craig-FS within 5 % once the buffer is removed. Resolution: treat PizzApp as Craig-FS + 20 %.
5. **Poolish yeast**: Vito/Dawood 2 % IDY on poolish flour (5 g/250 g) for 1–2 h RT + 16–24 h fridge; RafCalc poolish curve gives 0.83 % IDY for a 2 h poolish and 0.03 % for 16–18 h at 18 °C; PizzaBlab computes it from Craig for RT only (1–36 h, 14–30 °C); Craig-FS gives 0.137 % for 2 h@28 + 20 h@4. The Vito number is 15× the chart. Resolution: Vito's poolish is deliberately over-yeasted so it peaks in 1–2 h at RT and then survives the fridge as a *ripe* poolish; the fraction-sum treats the poolish as "ready" at the end of the cold stage, which is a different target. For the engine: (a) compute the poolish yeast for the **RT leg only** (target "peaked" at the end of RT time, i.e. Craig-FS on (RT hours, RT temp)), then send it to the fridge as storage (fridge hours capped, see recommendations); (b) subtract poolish yeast from the final-dough total per PizzaBlab; (c) sanity-cap the poolish at ≤1 % IDY of poolish flour (RafCalc's 2 h value 0.83 %; Vito 2 %). Whether 0.35 g or 5 g on 250 g is "right" for a fridge poolish is an open question (see §5) — the audit only shows that no calculator reproduces Vito's 2 %.
6. **Flour strength vs fermentation length**: jonaswitt/RafCalc table says W 80–150 (9–10.5 % protein) tolerates only 1–2.5 h of rising; PizzApp biga needs W > 350; AVPN-style 8–24 h RT assumes W 250–320. For maida this is the strongest reason to (a) keep RT ball proofs ≤3.5 h at 28 °C, (b) do long time in the fridge, not at RT, (c) prefer higher yeast/shorter proof over low yeast/long proof, and (d) treat any Craig-FS schedule with >10 h of RT time as invalid for this flour.
7. **Where fermentation "starts"**: PizzaBlab = end of kneading; PizzApp = hours you type (warm-up not included); Craig = room temperature, dough assumed at that temp. Resolution: engine clock starts at end of mixing; every step's temperature is the *room* temperature where the dough sits; add a 1 h "transition" stage at the mean of the two temperatures whenever dough moves fridge→room or room→fridge (Craig's own adjustment advice).

---

## 4. Recommendations for the deterministic engine

**Core model — implement Craig's chart with the fraction-sum (Mitch/Craig) multi-stage rule.**
- Data: `research/raw/craig_table.json` (61 temps 1.67–35 °C × 27 ADY columns × hours). Convert columns to IDY with ×0.762 (CY ×2.381 if fresh khameer). Interpolate log(hours) vs log(yeast) within a row and log(hours) linearly between adjacent temperatures (`scen.py: hours_at`). Clamp temperature to 1.7–35 °C.
- Solve y such that Σ tᵢ / H(y, Tᵢ) = 1 by bisection on log y (0.0005–5 % ADY). Report per-stage shares so the UI can say "76 % of the fermentation happens in the last 2 h at 30 °C".
- Yeast grams = y/100 × flour g (total flour, including poolish flour).
- Add **transition stages**: when the dough moves between environments differing by >10 °C, replace the first 1 h of the new stage by 1 h at the mean temperature (balls of 280 g); for bulk >1.5 kg use 2 h. (Craig: "dough doesn't instantly go from 60F to 80F.")
- Add a **weak-flour safety factor**: after computing y, multiply by 1.15 (Craig: "a bit more than it tells me – not even a full column"; PizzApp default +20 %; HansB 2–3× for ≤24 h). Do NOT go to 2× — with maida and 28–34 °C, over-fermentation is the dominant failure.
- **Hard limits from the flour-strength table**: total *room-temperature* time (all RT stages, excluding fridge) ≤ 4 h in summer (28–34 °C) and ≤ 6 h in winter (12–18 °C); if the user's schedule needs more, the engine must insert fridge time rather than lower yeast. Show a warning at >4 h RT: "maida at ~10 % protein tolerates ~2–4 h of active rising."
- **Fridge**: use the user's fridge temperature (default 5 °C; UI hint "set 6–7 °C if your fridge is old/opened often"). Cold stage counts via the chart (≈1/14–1/30 of RT speed) — never a flat ÷10.
- **Ball proof after fridge (mandatory)**: minimum 2 h, default 3 h at current room temp (Dawood's validated 3–3.5 h at 28 °C; PizzaBlab 1–2 h at 20 °C just to warm). The engine schedules this stage explicitly and includes it in the fraction-sum.

**Poolish handling (PizzaBlab structure + Craig math):**
- Poolish flour = 25 % of total flour (Dawood's ratio), 100 % hydration, +2 % honey on poolish flour.
- Poolish yeast = Craig-FS on the poolish's RT leg only [(RT hours, RT temp)], target "peaked"; then cap: 0.1 % ≤ y_poolish ≤ 1.0 % IDY of poolish flour. Same-day poolish (no fridge): 2.5–3 h at 28 °C → chart gives ~0.13–0.16 %; Dawood's proven 7 g (2.8 %) is 20× that — see open question 1; ship with a user-adjustable "poolish yeast multiplier" defaulting to the chart value ×3 (≈0.4–0.5 %, i.e. ~1–1.2 g on 250 g) and log outcomes.
- Poolish fridge hold: allowed 12–24 h at ≤6 °C after a 1–2 h RT leg; the engine treats fridge time as storage, not as a fermentation stage of the poolish (the poolish is already ripe), but DOES count the poolish's flour and yeast in the final-dough fraction-sum as pre-fermented mass.
- Final dough: compute total yeast for the final-dough profile (mix → bulk rest 0.5 h → balls → [fridge] → ball proof) on **total** flour; subtract yeast already in the poolish; if ≤ 0, add none (PizzaBlab rule). Because the poolish carries far more yeast than the chart needs, the engine will nearly always output "no extra yeast" for the final dough — this matches Vito's method and Dawood's practice.

**No-poolish (direct) path:** same fraction-sum on the whole schedule; recommend it when total lead time < 5 h (poolish adds nothing) or when the user wants the simplest schedule. Yeast for (a) 6 h@30 = 0.32 g/kg ×1.15 ≈ 0.37 g; for (b) 8 h@25 ≈ 0.55 g; for (d) 24 h@4 + 3 h@28 ≈ 0.85 g; for (e) 48 h@4 + 3 h@28 ≈ 1.2 g (recompute at runtime).

**Leftover balls:** balls already proofed (ready) go to the fridge: chart says at 0.1 % IDY balls need ~100 h at 4 °C / 70 h at 6 °C / 50 h at 8 °C to *finish* from scratch, so a ready ball keeps ~12–24 h at ≤5 °C before over-proofing (Dawood's handoff: 18–24 h). Rule: eaten within 24 h → fridge, take out 1.5–2 h before baking (already proofed, only warming); later than 24–36 h → freeze right after balling (or after 1 h proof), thaw 8–12 h in fridge, then 2–3 h at RT. Never leave ready balls at 28 °C+ for more than 1 h.

**Hydration:** none of the calculators change yeast with hydration except Japi (−80+4.2i−0.0305i² term: 60→70 % raises yeast ~9 %); PizzaBlab says hydration above ~58 % has only a marginal effect. Ignore hydration in the yeast model; use it only for gram math (flour = total dough / (1 + h + salt + oil + yeast)). Default 65 % for maida blend; allow 60–70 %.

**Yeast conversions:** IDY 1 : ADY 1.31 : fresh 3.1 (Craig/zaCalc); Saf-Instant red is IDY. Round yeast to 0.05 g and tell the user to use a 0.01 g scale or the "level ¼ tsp ≈ 0.8–0.9 g IDY" fallback.

**Salt/oil/sugar:** 3.5 % salt slows yeast slightly (Japi ×1.03 vs 2.5 %; PizzaBlab "2% ferments faster than 2.5%") — ignore or apply ×1.05. Honey 2 % of poolish flour (<5 % rule) accelerates; ignore. Oil 5 %: Japi ×1.13; ignore (within noise).

**Validation cases to assert in code:** 72 h@2.8 °C → 0.224 % IDY; 4 h@25 °C → 0.128 %; PizzApp profile 6 h@20.5 + 32 h@3.5 → 0.10–0.11 %; 24 h@20 → ~0.03 %.

---

## 5. Open questions

1. Why does Vito/Dawood's 2 % IDY poolish work when every model says 0.1–0.8 %? Hypothesis: the poolish is *meant* to peak/collapse within 1–2 h and then be held cold as a ripe preferment; the chart's "ready" target is not the right target for a preferment. Needs a side-by-side test (5 g vs 1.2 g vs 0.4 g on 250 g maida) — the deterministic engine should expose the multiplier until this is settled.
2. Does maida (weak, high-starch, slow-hydrating) ferment *faster* or *slower* than 00 at equal yeast/temperature? Craig's chart is "a big average" of mostly US/Italian flours. No source gives a flour-strength correction to yeast quantity; the only flour-strength data is tolerance hours (jonaswitt table). Dawood's own observation (3–3.5 h at 28 °C for balls with ~0.5 % total IDY from the poolish) is consistent with the chart being roughly right or maida being slightly slower.
3. PizzaBlab's exact RT duration list (author comments show 2–8 h outputs, scrape showed only 12–96 h) and whether its "refinement" of Craig's chart is a continuous fit — the 23 °C/24 °C values (0.189/0.176 %) are ~15 % above the raw chart.
4. Ooni app and Stadler Made formulas are undisclosed (no numbers obtainable without installing/subscribing). Ooni's inputs are the same six as everyone else's; no evidence it models two-stage (RT+cold) profiles.
5. dough.school claims "0.01 g accuracy" and a strategy chooser, but only quotes 0.1 % IDY for 24 h@4 °C and 0.5–1 % for 4–6 h RT (both far from Craig: 0.73 % and 0.03–0.05 %). Its logic is unknown; treat as marketing.
6. Craig's chart has never been validated above 30 °C with weak flour; the ≥28 °C rows bottom out at "2 h" and the chart floor is 1–2 h. For 32–34 °C kitchens the engine should prefer chilling (cold water, fridge bulk) rather than trusting the 35 °C row.
7. The classic pizzamaking.com Lehmann calculator page returned 403 to all fetchers; its logic (yeast % is a user input; no time/temp) is documented from the preferment-calculator page and forum descriptions, not the page itself.
