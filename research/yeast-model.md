# Yeast model research — IDY% vs hours vs dough temperature (direct dough)

Research date: 2026-09-04. Dimension: **yeast-model**. Audience: deterministic dough scheduler for Dawood (Islamabad; CasaKoa oven; weak maida + 20% fine chakki atta; Saf-Instant red IDY; established Vito-style poolish method — see context-handoff.md).

Raw scrapes and the reconstructed data grid are in `research/raw/` (notably `craig_grid_beananimal.csv`).

---

## 1. Sources consulted

| # | URL | What it is | Credibility |
|---|-----|------------|-------------|
| 1 | https://www.pizzamaking.com/forum/index.php/topic,26831.0.html | TXCraig1, "Baker's yeast quantity prediction model" (Aug 2013 → 2026). Original post with model basis (Gänzle growth model, 25 °C baseline, Tmax 45 °C, a/b/c parameters), usage rules ("fermentation time in the charts is total bulk + balls", "ready to bake" = end point, "0.05% IDY at 70F will take 12 hours"). Chart itself is an image (attachments 130131 beta1; msg393271 = latest; msg355933 = 3-decimal; msg511590 = expanded; msg511818 = 48 h; msg529996 = extended to 95 °F). | PRIMARY (expert forum, the chart author) |
| 2 | https://www.pizzamaking.com/forum/index.php/topic,26831.400.html | Same thread p.21: 48-h chart post, 0.6% CY @37 °F = 80 h / @36 °F = 90 h, "at refrigerator temperatures the margins of error get huge", Craig's 0.2% ADY 24 h RT comment. | PRIMARY |
| 3 | https://www.pizzamaking.com/forum/index.php/topic,26831.480.html | Same thread p.25: "The table wasn't intended to apply to indirect (poolish, biga) doughs… try 1/3 of the total yeast in the preferment and 2/3 in the final dough"; "At <5C, 0.5% is fairly common"; chart reading "8 hours at 16.7 °C → 0.224% IDY". | PRIMARY |
| 4 | https://www.pizzamaking.com/forum/index.php/topic,83618.0.html | Jan 2024: Craig: "The chart wasn't designed to work for preferments (poolish, biga, etc)… none of the data the chart is built on is preferment." Nanometric: it worked for a 100%-hydration poolish at 67–79 °F. HansB: 0.40% IDY for 24 h at 38 °F straight dough. | PRIMARY (Craig quote) |
| 5 | https://www.pizzamaking.com/forum/index.php/topic,85986.0.html | "How accurate is PizzApp" (Jul 2024): Yuval (PizzaBlab): "PizzApp never gave me good results. Craig's chart is far superior"; chart reading "72 hours @ 2.8C gives 0.224% IDY"; users report PizzApp under-doses cold ferments (+30% fix). Lehmann-method/ball-vs-bulk discussion. | expert-forum |
| 6 | https://www.pizzamaking.com/forum/index.php?topic=79284.0 | "Help with yeast prediction calculation" (2023): Craig's multi-stage worked example (4 h @68.5 °F + 53 h @38 °F → "about 0.1% IDY or 0.14% ADY"; "I typically use 0.2% IDY for a straight 48 hours in the fridge"); scott r: 0.05% IDY overnight RT; kori: 0.07–0.09% ADY RT @65 °F; report that the Ooni app matches Craig's chart "to 1 decimal place" and PizzApp does not. | expert-forum (Craig quotes) |
| 7 | https://www.pizzamaking.com/forum/index.php?topic=70059.0 (+ .20) | Numerator's tool built on Craig's model; contains Craig's Sept-2015 multi-stage worked example (64 °F 24 h + 36 °F 120 h → 0.025% IDY); tool covers 35–100 °F only. | expert-forum |
| 8 | https://beananimal.com/tools/dough-fermentation-calculator/ | Dough Rise Calculator explicitly curve-fitted to Craig's chart ("charted each temperature and concentration relationship… fitted an equation to each curve"). I drove the live form to extract a 75-point IDY grid (38–85 °F). Conversion factors in its code: CY = 3.1949 × IDY; ADY = 2.398 × CY⁻¹… (ADY = 1.333 × IDY). | calculator (derived from primary) |
| 9 | https://www.pizzablab.com/calculators/pizza-dough-calculator-guide/ | PizzaBlab (Yuval Weinberg) calculator "uses a predictive model of yeast activity developed by TXCraig1… refined through trial and error"; CF yeast assumes Lehmann method (ball immediately, fridge at 4 °C/39 °F); preferment yeast handled separately. | calculator/blog (expert) |
| 10 | https://www.pizzablab.com/learning-and-resources/fermentation/factors-affecting-fermentation-rate/ | "a 10 °C increase doubles the enzymatic activity… a 10 °C decrease reduces it by half or more"; FDT 23–27 °C; salt slows, sugar >5% slows; illustrative 20 °C table (2 h 5 g, 5 h 1 g, 8 h 0.5 g, 12 h 0.1 g — explicitly "not actual values"). | blog (expert) |
| 11 | https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/ | Lehmann CF method: FDT 15–20 °C, fridge within 20 min of kneading, balls immediately, 1–5 °C, 24–72 h, temper to ≥10 °C (30 min–3 h). "The lower the fermentation temperature, the more yeast is needed." | blog (expert) |
| 12 | https://www.pizzablab.com/learning-and-resources/mixing-kneading/final-dough-temperature/ | FDT targets: RT ferment 23–27 °C; CF 18–23 °C; emergency up to 32 °C; below 18 °C "sluggish". | blog (expert) |
| 13 | https://pizzatoday.com/news/2010-november-dough-doctor/130064/ (via exa highlights) | Tom Lehmann: "Most pizza doughs perform best when the yeast level is at or near 1 percent compressed yeast — equates to .5 percent ADY, or 0.375 percent IDY"; FDT 80–85 °F walk-in / 70–75 °F reach-in; dough must go to cooler promptly; reducing yeast when dough "blows" is wrong. | PRIMARY (Lehmann, trade press) |
| 14 | https://www.pmq.com/in-lehmanns-terms-the-secrets-of-instant-dry-yeast/ | Lehmann: IDY "typically used at 0.375% of total flour weight"; IDY = 37.5% of CY weight; add dry on flour; store at RT. | PRIMARY (Lehmann) |
| 15 | https://pizzatoday.com/news/dough-doctor-back-basics/131347/ | Lehmann formulas: ADY 0.5% / IDY 0.4% / CY 1%. | PRIMARY (Lehmann) |
| 16 | https://www.pmq.com/dont-underestimate-the-importance-of-temperature-control-in-pizza-dough-fermentation/ | Lehmann: ~20-min lag phase; heat of fermentation ≈ +1 °F per hour of active fermentation; cooler within 20 min. | PRIMARY (Lehmann) |
| 17 | https://www.pmq.com/how-to-make-emergency-pizza-dough/ | Lehmann emergency dough: double the yeast but ≤2% of flour; FDT 90–95 °F; halve sugar; 2 h RT proof. | PRIMARY (Lehmann) |
| 18 | https://github.com/hendricius/pizza-dough (calculator/app/services/dough.rb) | The-Bread-Code calculator source: `DEFAULT_DRY_YEAST = 0.0005` (0.05%), `FRESH_YEAST_MODIFIER = 3`; "good if room temperature is around 22 °C… if colder use more"; README: 0.05% IDY / 0.15% fresh for ~24 h, double yeast below 20 °C. No temperature/time model. | PRIMARY source code |
| 19 | https://pizza-calculator.the-bread-code.io/developers | API params (pizzas, style, weight, hydration, dough_type…) — no time/temperature input at all. | calculator docs |
| 20 | https://jordospizzacalculator.com/reference/ and /guides/fermentation-timing | Jordo's tables (instant yeast per 500 g flour): 20 °C RT 4 h 3 g / 8 h 1.5 g / 12 h 0.7 g; 4 °C 24 h 1 g / 48 h 0.5 g / 72 h 0.2 g (timing guide says 0.3 g). "Calibrated grid covering 8 temperatures and 9 time points" (not published). Fresh = 3× instant; ADY ≈ instant (reference) / ≈ 1.7–2× (timing guide). | calculator/blog (secondary) |
| 21 | https://khymos.org/2020/11/15/how-much-yeast/ | Martin Lersch: PizzApp+ data — 1 kg flour needs 0.48 g IDY for 20 h at 20 °C (direct dough). | blog (scientist) quoting PizzApp |
| 22 | https://www.housegardenhobby.com/pizzapp-guide-pizza-dough/ | PizzApp+ worked example: 8×250 g, 65% hyd, 3% salt, IDY, 6 h RT @20.5 °C + 32 h CT @3.5 °C → flour 1249 g, yeast 1.64 g (=0.131%); defaults: waste 5%, "yeast buffer +20%"; biga definition (1:0.45, 1% fresh yeast, 24 h @18 °C or 48 h @13–14 °C, W>350); poolish 1:1 at 18–20 °C; biga mode ignores temperature. | blog (secondary) |
| 23 | https://www.outdoorpizzachef.com/how-to-use-pizzapp-best-dough-calculator/ | PizzApp author: Nasuti Francesco Paolo; poolish 18–20 °C. | blog |
| 24 | https://github.com/Rafbor42/RafCalc (README) + https://github.com/martin-damien/pizza-dough-calculator (src/yeast.pas) | The Italian "Japi" fresh-yeast formulas (La Confraternita della Pizza): Japi2: LB = f·2250·(1+s/200)·(1+o/300) / ((−80+4.2i−0.0305i²)·g^2.5·t^1.2); "1 h fridge = 0.1 h room temp"; dry = fresh/3 (2–3). martin-damien adds ×1.8 (6–24 h) and ×2.2 (>24 h) because Japi2 is "really optimistic". | PRIMARY source code (formula) |
| 25 | https://github.com/csschef/Neapolitan-pizza-dough-calculator (EN yaml) | Home-Assistant calculator; fresh-yeast (Kronjäst) lookup table at 5/19/21/23/25 °C (reproduced below). | source code (hobbyist table, provenance unstated) |
| 26 | https://pizzaplan.app/en/room-temperature-fermentation/ and /en/ and /en/neapolitan-dough/ and /en/biga-poolish/ | PizzaPlan: uses "Craig's yeast model" for pure warm proofing (cap 24 h) and "Hamelman's method (fermentation speed triples per 9 °C)" for CF; fresh-yeast table 18–24 °C; dry-yeast g/kg table (4–6 h 1–1.5; 8–12 h 0.3–0.5; 24 h cold 0.1–0.2; 48–72 h cold 0.03–0.08); poolish 0.1–0.3% fresh of preferment flour, 8–16 h at 20–22 °C; final-dough "yeast booster" 0.05–0.2% dropped above ~70% preferment share. | calculator/blog (secondary, but cites its models) |
| 27 | https://www.kitchenlabnotes.com/tools/bulk-fermentation-calculator/ | Q10 calculator: time = t_ref × Q10^((T_ref − T)/10), default Q10 = 2.4 "across 18–30 °C", range "2 to 3". | calculator (secondary) |
| 28 | https://www.weekendbakery.com/posts/the-temperature-equation-timing-your-fermentation/ | "Fermentation activity roughly doubles for every 5 °C increase" (sourdough bulk tables 18–30 °C). | blog (bakery) |
| 29 | https://www.crustkingdom.com/how-much-yeast-in-pizza-dough/ | IDY% table: RT(21 °C) 2 h 0.5%, 5 h 0.2%, 8 h 0.1%, 18 h 0.03%; fridge(4 °C) 24 h 0.3%, 48 h 0.1%, 72 h 0.05%; fresh = 3× IDY; yeast peaks ~35 °C, dies ~50 °C. | blog (content) |
| 30 | https://jayarr.pizza/blog/maturation-vs-fermentation-pizza-dough/ | "At 4 °C yeast drops to roughly 10% of its normal activity", enzymes ~40–50%; yeast optimum 28–35 °C; AVPN 0.17% fresh (3 g per 1.7–1.8 kg). | blog (secondary; cites Myhrvold/Forkish) |
| 31 | https://www.pizzanapoletana.org/en/ricetta_pizza_napoletana | AVPN disciplinare: per 1 L water 1.6–1.8 kg flour, 40–60 g salt, fresh yeast 0.1–3 g (dry = 1/3 of fresh), balls 8–24 h (+4 h). | PRIMARY |
| 32 | https://www.wpr.org/food/recipe-overnight-straight-pizza-dough-ken-forkish ; https://www.searching4zen.com/recipes/24-to-48-hour-pizza-dough/ ; https://www.saucemagazine.com/…same-day-straight-pizza-dough… | Forkish (Elements of Pizza) reprints: overnight 1000 g/0.8 g IDY, 12 h @25–26 °C then ≥6 h fridge; 24–48 h: 500 g/1.5 g IDY (0.3%), 2 h @21–23 °C then 16–48 h fridge; same-day 1000 g/2 g IDY (0.2%), ~6 h. | book recipes (primary-ish) |
| 33 | https://modernistcuisine.com/mp/cold-proofing-pizza-dough/ ; https://fond.kitchen/guides/pizza-dough/cold-fermentation-pizza/ | Modernist Pizza: cold proof 24–96 h, fridge ~4 °C, temper to 13 °C; fond.kitchen 48 h reference 0.1% IDY. | book/blog |
| 34 | https://www.stadlermade.com/pizza/techniques/cold-fermentation/ ; /yeast-calculator/ | Stadler Made: calculator is a JS app (numbers not published); cold article: 4–5 °C, 0.5–1% yeast "won't be much difference", 8–72 h, temper to ≥18 °C 2–4 h. (Company is closing down; calculator behind Maker Club.) | blog/calculator (not reproducible) |
| 35 | https://dough.school/ | "Pizza AI" scheduler; JS app; FAQ: 24 h cold at 4 °C ≈ 0.1% IDY (0.6 g/600 g); same-day 4–6 h 0.5–1% yeast. No model published. | calculator (marketing-grade numbers) |
| 36 | https://www.pizzamaking.com/forum/index.php?topic=52903.0 | 24 h CF thread: chart "shows about .64% for 24 hours at 39–40 °F"; user success with 0.5% IDY 27 h @40–41 °F; Yael: 0.3–0.4% IDY for 24 h @2–4 °C with 23–24 °C FDT; another: 0.25% for 24/48/72 h CF. | expert-forum |
| 37 | https://ojs.library.ubc.ca/index.php/expedition/article/download/188348/186126 ; https://www.cerealsgrains.org/…chem62_413.pdf ; https://pmc.ncbi.nlm.nih.gov/articles/PMC11722544/ | Science: CO₂ per cell 1.66/2.31/3.02 ×10⁻⁹ mL at 25/30/35 °C (Q10≈1.8); baker's yeast performance 30 vs 41 °C; 15 °C dough reaches max volume at ~24–38 h for various strains. | papers (context only) |

Could not be read: Craig's chart images themselves (Cloudflare blocks non-browser fetches and the browser hit an interactive verification I am not permitted to complete); the Ooni app (mobile only); PizzApp+ internals (closed source); Stadler/dough.school internals (JS-only).

---

## 2. Findings with numbers

### 2.1 Craig's model — what it is and how to use it (primary quotes)
- Basis: Salvatore Di Matteo's brewer's-yeast table (topic 26602) converted to yeast % at 60% hydration, 25 °C baseline, extrapolated with the Gänzle growth model: rate(T) = a·x^b·e^(c·x), x = Tmax − T, Tmax = 45 °C, a = 0.02645608, b = 2.037020784, c = −0.198964236 (beta1, Aug 2013; later versions were re-tuned by hand and Craig says the table "is a bit more complex than the SD table. I'm not sure it can be distilled down into a single formula").
- Evaluating that beta1 curve gives relative speed vs 25 °C: 4 °C 0.066 (15× slower), 10 °C 0.16, 15 °C 0.31, 20 °C 0.58, 28 °C 1.31, 30 °C 1.51, 35 °C 1.78 (peak ≈ 34–35 °C), 40 °C 1.17. Implied Q10: 4→14 °C 4.1; 10→20 °C 3.7; 15→25 °C 3.2; 20→30 °C 2.6; 25→35 °C 1.8.
- "The fermentation time in the charts is total bulk + balls." End point = "ready to bake". Target formulation: "65% ±10% HR, 2% ±2% sugar, 2% ±2% oil, 2% ±1% salt… yeast ≤1 year old".
- "0.05% (0.048% column) IDY fermented at 70F will take 12 hours."
- "At refrigerator temperatures, the margins of error get huge. Even relatively large changes in time can result in small changes in total fermentation."
- Preferments: "The chart wasn't designed to work for preferments (poolish, biga, etc)… none of the data the chart is built on is preferment." Suggested starting point: "1/3 of the total yeast in the preferment and add the final 2/3 of the yeast in the final dough."
- Craig's own practice: RT doughs with IDY at 76–77 °F; "I typically use 0.2% IDY for a straight 48 hours in the fridge"; "At <5C, 0.5% is fairly common, but the range people use is gigantic."
- Multi-stage method (Craig, Sept 2015): convert each stage to a fraction of the fermentation completed at that temperature, sum to 1, read the yeast column. Worked examples: 64 °F 24 h + 36 °F 120 h → 0.025% IDY; 68.5 °F 4 h + 38 °F 53 h → ~0.1% IDY / 0.14% ADY.
- Direct chart readings quoted in threads: 72 h @2.8 °C (37 °F) → 0.224% IDY; 24 h @39–40 °F → ~0.64% IDY; 8 h @16.7 °C → 0.224% IDY; 0.6% CY → 80 h @37 °F, 90 h @36 °F; 0.1% CY @62 °F → 29 h; 0.15% CY @62 °F → 20 h.

### 2.2 Craig's IDY chart reconstructed (hours to "ready to bake", direct dough, bulk+balls)
Obtained by driving BeanAnimal's curve-fit of Craig's chart (values rounded to whole hours by that tool; 90 °F returned 0 = out of its fitted range). Full CSV: `research/raw/craig_grid_beananimal.csv`.

| °F (°C) | 0.005% | 0.01% | 0.025% | 0.05% | 0.1% | 0.2% | 0.4% | 0.8% | 1.5% |
|---|---|---|---|---|---|---|---|---|---|
| 38 (3.3) | – | – | – | 189 | 114 | 69 | 42 | 25 | 16 |
| 41 (5.0) | – | – | – | – | 84 | 51 | 31 | 18 | – |
| 43 (6.1) | – | – | – | – | 69 | 42 | 25 | – | – |
| 45 (7.2) | – | – | 158 | 95 | 57 | 35 | 21 | 13 | – |
| 50 (10.0) | – | – | 102 | 62 | 37 | 23 | 14 | 8 | – |
| 55 (12.8) | – | – | 68 | 41 | 25 | 15 | 9 | 5 | – |
| 60 (15.6) | – | 92 | 47 | 29 | 17 | 10 | 6 | 4 | – |
| 65 (18.3) | – | 65 | 33 | 20 | 12 | 7 | 4 | 3 | – |
| 70 (21.1) | – | 42 | 22 | 13 | 8 | 5 | 3 | 2 | – |
| 75 (23.9) | – | 28 | 14 | 8 | 5 | 3 | 2 | 1 | – |
| 80 (26.7) | 30 | 19 | 10 | 6 | 4 | 2 | – | – | – |
| 85 (29.4) | 20 | 13 | 7 | 5 | 3 | 2 | – | – | – |

Cross-checks against direct chart quotes: 70 °F/0.05% → 13 h (Craig: 12 h); 38 °F/0.2% → 69 h (chart: 72 h @37 °F at 0.224%); 40 °F/24 h → interpolates to ~0.65% (thread: ~0.64%). Yeast-type factors used by the same fit: CY = 3.195 × IDY; ADY = 1.333 × IDY (Lehmann: CY 1% = ADY 0.5% = IDY 0.375%, i.e. CY = 2.67 × IDY, ADY = 1.33 × IDY).

### 2.3 Structure of the chart (derived)
- At every temperature, hours ∝ IDY%^(−k) with k ≈ 0.72 (38 °F 0.727, 45 °F 0.722, 50 °F 0.728, 55 °F 0.747, 60 °F 0.727, 65 °F 0.722, 70 °F 0.714, 75 °F 0.746). I.e. **doubling the yeast cuts time by only ~39%, not 50%**; halving time needs 2.6× yeast. The "hours × yeast%" product is therefore NOT constant: at 38 °F it runs 9.5 (0.05%) → 24 (1.5%); at 70 °F 0.42 (0.01%) → 1.0 (0.2%).
- hours at 0.1% IDY by temperature (per-temperature fits): 3.3 °C 114; 5 °C 85; 6.1 °C 69; 7.2 °C 58; 10 °C 37; 12.8 °C 25; 15.6 °C 17; 18.3 °C 12; 21.1 °C 8.1; 23.9 °C 5.0; 26.7 °C 3.9; 29.4 °C 3.1.
- Implied Q10 of Craig's chart (much steeper than the textbook 2–2.5 at the cold end): 4→14 °C ≈ 4.7; 10→20 °C ≈ 4.2; 15→25 °C ≈ 3.7; 20→30 °C ≈ 3.2; 25→35 °C ≈ 2.7 (cubic smoothing); raw adjacent 5 °F steps range 2.4 (75→85 °F) to ~6 (38→43 °F). Fridge speed relative to 25 °C: 4 °C ≈ 1/18, 6 °C ≈ 1/13, 8 °C ≈ 1/10 — so a fridge drifting from 4 to 8 °C nearly doubles fermentation speed.
- Global closed form fitted to the grid (points ≥3 h; median error 1.2%, worst 14%): ln h = 3.5838 − 0.16606·T + 0.000728·T² − 0.7167·ln(IDY%), T in °C. Overstates speed above ~30 °C; prefer the table below there.

### 2.4 Engine reference table (smoothed, cubic in T of ln h at 0.1% IDY)
h_ref(T) = hours to ready at 0.1% IDY, direct dough, Craig model: 2 °C 137; 3 °C 117; 4 °C 99; 5 °C 84; 6 °C 72; 7 °C 61; 8 °C 52; 10 °C 38; 12 °C 28; 14 °C 21; 16 °C 15.6; 18 °C 11.8; 20 °C 9.0; 22 °C 7.0; 24 °C 5.4; 26 °C 4.3; 28 °C 3.5; 30 °C 2.8; 32 °C 2.3; 34 °C 2.0 (30–34 °C are extrapolations beyond the fitted 85 °F; Craig's extended chart to 95 °F exists but could not be read — treat as ±25%).
Then IDY% = 0.1 × (h_ref(T) / hours)^(1/0.72) = 0.1 × (h_ref/h)^1.39.

Lookup produced from the closed form (IDY %, direct dough):

| °C \ h | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 36 | 48 | 72 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 4 | – | – | – | – | 3.28 | 2.40 | 1.86 | 1.25 | 0.91 | 0.71 | 0.40 | 0.27 | 0.15 |
| 6 | – | – | – | 3.15 | 2.11 | 1.54 | 1.20 | 0.80 | 0.59 | 0.46 | 0.26 | 0.17 | 0.10 |
| 8 | – | – | 3.59 | 2.04 | 1.36 | 1.00 | 0.78 | 0.52 | 0.38 | 0.29 | 0.17 | 0.11 | 0.064 |
| 10 | – | 3.50 | 2.34 | 1.33 | 0.89 | 0.65 | 0.51 | 0.34 | 0.25 | 0.19 | 0.11 | 0.073 | 0.041 |
| 12 | – | 2.30 | 1.54 | 0.88 | 0.59 | 0.43 | 0.33 | 0.22 | 0.16 | 0.13 | 0.072 | 0.048 | 0.027 |
| 15 | 2.20 | 1.25 | 0.84 | 0.47 | 0.32 | 0.23 | 0.18 | 0.12 | 0.088 | 0.069 | 0.039 | 0.026 | 0.015 |
| 18 | 1.21 | 0.69 | 0.46 | 0.26 | 0.18 | 0.13 | 0.099 | 0.067 | 0.049 | 0.038 | 0.021 | 0.014 | 0.008 |
| 20 | 0.82 | 0.47 | 0.31 | 0.18 | 0.12 | 0.087 | 0.068 | 0.045 | 0.033 | 0.026 | 0.015 | 0.010 | 0.006 |
| 22 | 0.56 | 0.32 | 0.22 | 0.12 | 0.082 | 0.060 | 0.046 | 0.031 | 0.023 | 0.018 | 0.010 | 0.007 | 0.004 |
| 24 | 0.39 | 0.22 | 0.15 | 0.084 | 0.056 | 0.041 | 0.032 | 0.021 | 0.016 | 0.012 | 0.007 | 0.005 | 0.003 |
| 26 | 0.27 | 0.15 | 0.10 | 0.059 | 0.039 | 0.029 | 0.022 | 0.015 | 0.011 | 0.008 | 0.005 | 0.003 | 0.002 |
| 28 | 0.19 | 0.11 | 0.072 | 0.041 | 0.028 | 0.020 | 0.016 | 0.010 | 0.008 | 0.006 | 0.003 | 0.002 | 0.001 |
| 30 | 0.14 | 0.077 | 0.051 | 0.029 | 0.020 | 0.014 | 0.011 | 0.007 | 0.005 | 0.004 | – | – | – |
| 32 | 0.096 | 0.055 | 0.037 | 0.021 | 0.014 | 0.010 | 0.008 | 0.005 | 0.004 | 0.003 | – | – | – |
| 34 | 0.069 | 0.039 | 0.026 | 0.015 | 0.010 | 0.007 | 0.006 | 0.004 | 0.003 | 0.002 | – | – | – |

(Values above ~1% and below ~0.01% are outside anything the chart's data supports; cells left blank where Craig's chart would not go.)

Scenario answers from this model (direct dough): 6 h @24 °C 0.084%; 8 h @28 °C 0.028%; 24 h @4 °C 0.71%; 48 h @4 °C 0.27%; 24 h @20 °C 0.026%; 12 h @25 °C 0.027%; 3.5 h @28 °C 0.087%; 4 h @30 °C 0.051%; 72 h @3 °C ~0.19%. Multi-stage (sum of fractions): 6 h @20.5 °C + 32 h @3.5 °C → 0.099%; 4 h @20.3 + 53 h @3.3 → 0.108% (Craig: ~0.1%); 24 h @17.8 + 120 h @2.2 → 0.023% (Craig: 0.025%).

### 2.5 Tom Lehmann (Dough Doctor)
- Standard: CY 1% = ADY 0.5% = IDY 0.375% (elsewhere IDY 0.4%) — for a 1–3-day refrigerated dough-management program, dough balled and into the cooler within 20 min, FDT 80–85 °F (walk-in) or 70–75 °F (reach-in). In Craig's model 0.375% IDY straight into a 4 °C fridge ≈ 38 h to ready (52 h at 2 °C, 28 h at 6 °C) — matching Lehmann's "use from day 2, best day 2–3, ok to day 3–4" cooler window given the ~1 °F/h self-heating and slow cool-down.
- Yeast has a ~20-min lag phase; active dough self-heats ≈1 °F per hour; gassy dough insulates and cools badly (why bulk-before-fridge is unpredictable).
- Emergency dough: double the yeast (cap 2%), FDT 90–95 °F, halve sugar, 2 h RT proof, use within 90 min.
- "Reducing yeast when the dough blows in the cooler is the wrong fix" — fix FDT/handling instead.
- PizzaBlab's Lehmann-method interpretation: FDT 15–20 °C for CF, fridge 1–5 °C, 24–72 h, temper to ≥10 °C (30 min–3 h).

### 2.6 Calculator outputs / published tables (for cross-comparison)
| Source | 4–6 h @~20–24 °C | 8 h | 12 h RT | 24 h RT (~20 °C) | 24 h @4 °C | 48 h @4 °C | 72 h @4 °C |
|---|---|---|---|---|---|---|---|
| Craig model (this work) | 0.15% (4 h @22) / 0.084% (6 h @24) | 0.12% @20 / 0.056% @24 | 0.068% @20 / 0.032% @24 | 0.026% | 0.71% | 0.27% | 0.15% |
| PizzApp+ (Nasuti) | – | – | – | 0.048% @20 °C/20 h | ~0.1% (users) | – | ~0.1% (user) |
| PizzApp+ hybrid | 6 h @20.5 + 32 h @3.5 °C → 0.131% (Craig: 0.099%) | | | | | | |
| Jordo's (per 500 g) | 4 h 0.6% | 0.3% | 0.14% | – | 0.2% | 0.1% | 0.04–0.06% |
| Crust Kingdom | 2 h 0.5%, 5 h 0.2% | 0.1% | – | 18 h 0.03% | 0.3% | 0.1% | 0.05% |
| PizzaPlan (dry g/kg) | 4–6 h 0.10–0.15% | 8–12 h 0.03–0.05% | | | 0.01–0.02% (!) | 0.003–0.008% (!) | |
| csschef HA table (fresh) | 25 °C: 6 h 0.175% CY, 8.5 h 0.1%, 12 h 0.04%, 18 h 0.015%; 19 °C: 12 h 0.175%, 17 h 0.1%, 23 h 0.04%, 33.5 h 0.015%; 5 °C: 130 h 0.175%, 166 h 0.125% CY | | | | | | |
| Forkish (book) | same-day 0.2% IDY ~6 h | | overnight 0.08% 12 h @25–26 °C | | 24–48 h: 0.3% IDY, 2 h RT + 16–48 h fridge | | |
| The-Bread-Code | 0.05% IDY ~24 h @22 °C (×2 below 20 °C) | | | | | | |
| dough.school FAQ | 0.5–1% for 4–6 h | | | | 0.1% | | |
| Japi2/RafCalc (fresh, 65% hyd, 3% salt) | 6 h @24 °C 0.18% fresh (0.06% IDY) | 8 h @28 °C 0.09% fresh raw | 12 h @25 °C 0.07% fresh raw | 24 h @20 °C 0.053% fresh raw | formula collapses (4^2.5): 3–5% fresh — uses "1 h fridge = 0.1 h RT" instead | | |
| Lehmann | – | – | – | – | 0.375% IDY, cooler 1–3 days | | |
| AVPN | 0.1–3 g fresh / L water (≈0.006–0.17% CY on flour), 8–24 h RT | | | | | | |

Poolish/preferment yeast (for the app's existing method): PizzaPlan poolish 0.1–0.3% fresh on preferment flour (≈0.03–0.1% IDY) for 8–16 h @20–22 °C; PizzApp poolish at 18–20 °C; pizzamaking users 0.1% IDY (W330) or "a pinch"; Tony Gemignani 0.25%; Craig "1/3 of total yeast in the preferment". Vito's 5 g IDY in 250 g poolish flour = 2% IDY on poolish flour (0.5% on total 1 kg flour) — 20–60× the amounts above; it only works because it peaks in 1–2 h and is then parked at fridge temperature where Craig's model says the rest of the 16–24 h adds only ~0.15–0.25 "ferment-equivalents".

### 2.7 Temperature-rate rules in circulation (contradictory)
- Craig chart implied Q10 ≈ 4–5 at 4–15 °C, 3.5 at 15–25 °C, 2.5–3 at 25–30 °C.
- Hamelman (via PizzaPlan): rate ×3 per 9 °C (Q10 ≈ 3.4); "yeast doubles every 17 °F/8 °C" (TFL paraphrase, Q10 ≈ 2.4).
- KitchenLabNotes: Q10 2.4 (18–30 °C), range 2–3. PizzaBlab: ×2 per 10 °C up, "half or more" per 10 °C down. Weekend Bakery: doubles per 5 °C (Q10 = 4). Japi2: rate ∝ T^2.5 (°C) — Q10 from 20→30 °C = 2.8, from 4→14 °C = 23 (absurd; hence their "1 fridge hour = 0.1 RT hour" rule, i.e. fridge ≈ 1/10 speed, ≈ Craig's 8 °C value).
- Yeast optimum 27–35 °C (peak ~34 °C in Craig's beta model; sources say 28–35 °C); LAB optimum 32–33 °C; FDT ≥32 °C only for emergency dough.

---

## 3. Contradictions between sources and how to resolve them

1. **Cold-ferment yeast: 0.15–0.7% (Craig/Lehmann/forum practice) vs 0.03–0.1% (PizzApp, Jordo, Crust Kingdom, dough.school, PizzaPlan).** The low numbers all assume a warm bulk before the fridge or a long temper after it (hybrid), and most blogs copy each other. Craig's data and Lehmann's 0.375% are for dough balled and refrigerated immediately. PizzaBlab (Yuval) and pizzamaking veterans explicitly report PizzApp under-doses cold ferments (users add +30%). **Resolution:** the engine must model the actual temperature history (stage fractions), never a flat "cold-ferment %". With the handoff's own timelines (poolish + warm ball-proof), the final dough's yeast requirement is dominated by the warm hours, which is why the low blog numbers "work" for hybrids.
2. **Q10 = 2–2.5 (textbook, KitchenLabNotes, PizzaBlab) vs ≈4 below 15 °C (Craig, Weekend Bakery).** Yeast growth is not Arrhenius over 4–30 °C; the Gänzle-type model bends steeply near the minimum growth temperature. Every empirically-derived pizza table (Craig, csschef, Forkish's recipes) shows the steep cold-end behaviour. **Resolution:** use Craig's h_ref(T) table (piecewise Q10 ≈ 4.7/4.2/3.7/3.2/2.7) rather than a single Q10; flag the fridge-drift risk (4→8 °C = ~1.9× faster).
3. **Yeast-time exponent: "double yeast = half time" (Lehmann emergency dough, most blogs) vs k = 0.72 (Craig's chart).** Craig's chart (and csschef's fresh-yeast table: 25 °C 0.175%→6 h vs 0.04%→12 h, k ≈ 0.47) says time scales as yeast^−0.5…−0.75. **Resolution:** use k = 0.72 with Craig's anchors; treat the 2× rule as an approximation valid only for short ranges.
4. **Fresh:IDY ratio 3:1 (AVPN, Bread-Code, Jordo, Crust Kingdom, Craig's tool 3.19) vs 2.67:1 (Lehmann 1%:0.375%) vs 2.5:1 (Forkish/Japi "2–3").** Small compared with other uncertainty. **Resolution:** IDY = CY/3 for khameer conversion; ADY = 1.33 × IDY.
5. **Bulk vs ball time.** Craig: chart hours = bulk + balls total; Lehmann/PizzaBlab: 100% in balls straight to fridge; Craig: "try more time in bulk and less in balls" if balls flatten; Yuval: Italian (extensible) flours need bulk/re-ball, American flours tolerate 100% balls. Maida is weak/extensible like 00. **Resolution:** total fermentation hours drive yeast; the split is a handling decision — keep balls' warm time to the 2.5–3.5 h the handoff already validated and put any extra time into bulk/fridge.
6. **Craig's chart vs preferments.** Craig: not designed for poolish/biga; one user: it worked for a 100% poolish at 67–79 °F; Craig's fallback: 1/3 yeast in preferment. **Resolution:** apply the model to the *final dough* using total yeast (poolish yeast + added yeast) only as a ranking/sanity tool; calibrate with the handoff's validated poolish timelines (which are the ground truth for this flour).
7. **PizzApp vs Craig on hybrids** (0.131% vs 0.099% for 6 h @20.5 + 32 h @3.5 °C; but "PizzApp under-doses cold ferments" per users). The PizzApp number includes its default +20% yeast buffer, so the underlying models agree within ~10% for this hybrid; the disagreement is at pure-cold and pure-warm extremes. **Resolution:** Craig model + explicit safety margin choice.
8. **Weak maida vs strong 00/bread flour.** Craig's data: North-American bread/high-gluten and 00 doughs at ~65% hydration, 2% salt, 0–4% sugar/oil. Effects for Dawood: (a) 3.5% salt (vs 2%) slows yeast ~10–20% (PizzaBlab; Japi2's (1+s/200) term gives +8% yeast for 53 g/L vs 31 g/L); (b) 5% honey/oil ≈ neutral (sugar ≤5% speeds slightly, oil slows slightly); (c) maida's low protein/high damaged-starch gives more free sugar → slightly faster gassing but far lower gas *retention*, so "ready" arrives earlier and over-proof tolerance is narrower. No source quantifies flour strength in the yeast equation (Craig: "probably not specifically for that… testing and tweaking"). **Resolution:** keep Craig's yeast numbers, but define "ready" earlier: cap warm ball-proof at ≤3.5 h at 28 °C and ≤4.5 h at 24 °C (validated in handoff), forbid schedules that put weak dough above ~85% predicted fermentation in the fridge for >24 h, and bias yeast 10% lower (not higher) when in doubt so the window is reached by *time*, not overshot.

---

## 4. Recommendations for the deterministic engine

1. **Core function (direct-dough yeast):** `IDY% = 0.10 × (h_ref(T)/hours)^1.39`, with h_ref(T) from the smoothed table (§2.4; interpolate ln h_ref linearly in T). Equivalent inverse: `hours = h_ref(T) × (0.10/IDY%)^0.72`. Valid 3–30 °C, 2–150 h, 0.01–1.5% IDY; clamp outside. CY (khameer) = 3 × IDY; ADY = 1.33 × IDY.
2. **Multi-stage schedules:** progress = Σ stage_hours / hours(T_stage, IDY); choose IDY so Σ = 1.0 at bake time (bisection). Include: mixing-to-fridge time at room temp, fridge stage(s), temper/ball-proof stage at the entered room temperature, and treat the last 30 min before baking as fermenting. Ignore freezer time (0 progress). Count the first hour after refrigeration at (room T + fridge T)/2 for balls (cool-down; Lehmann: dough self-heats ~0.5 °C/h and gassy dough insulates).
3. **Temperatures to assume when not measured:** fridge 5 °C (Islamabad home fridges drift 3–8 °C — show the user the sensitivity: at 0.3% IDY, 4 °C → 48 h, 6 °C → 33 h, 8 °C → 23 h). Kitchen: the user's entered current temperature for daytime, −4 °C for overnight hours in Sept, winter default 15 °C. FDT ≈ room temperature +2 °C after mixer kneading (use ice water rule from the handoff to keep FDT ≤ 26 °C).
4. **Poolish (existing validated method) — keep as calibrated rules, not from the direct-dough model:** 250 g maida + 250 g water + honey 5 g; IDY 5 g for 1.5–2 h counter (24–28 °C) then 16–24 h fridge; 7 g for same-day 2.5–3 h counter at ~25 °C; 3 g with cold water for 20–24 h fridge in hot weather. These are 1.2–2.8% on poolish flour — an order of magnitude above literature poolish (0.03–0.1% IDY on preferment flour for 8–16 h at 20 °C) and only sane because they are short warm ferments parked cold. Convert them to model-consistent alternatives only as an "advanced" option: for a poolish ripening over H hours at room T with no fridge, use IDY_poolish% ≈ 1.6 × direct-dough IDY(H, T) (100% hydration ferments faster; PizzaPlan/Japi treat poolish as ~8–16 h at 20 °C with 0.03–0.1% IDY).
5. **Final dough yeast with a poolish:** the 5 g in a 1 kg-flour batch is already 0.5% IDY of total flour — enough for 3–3.5 h ball proof at 28 °C (model: 3.5 h @28 °C needs ~0.09% for a direct dough; the poolish's yeast is partly spent but its cell count is 5×). Rule: **add no extra IDY** when total room-temp time after mixing ≤ 4 h at ≥24 °C; add IDY = 0.6 × direct-dough model value only when the plan calls for a final dough held colder or longer than the validated window (e.g., 5 h at 20 °C in winter → 0.6 × 0.24% ≈ 0.15% IDY = 1.5 g/kg). Keep Craig's "1/3 yeast in the preferment, 2/3 in the dough" as the alternative when the user selects a low-yeast (0.1%-on-poolish-flour, 12–16 h room-temp) poolish.
6. **Ready-window and weak flour:** define ready = 100% progress; usable window = 85–115% for strong flour, narrow to 90–110% for maida; if the plan's warm ball-proof exceeds 4.5 h (24 °C) or 3.5 h (28–30 °C), move time to the fridge instead of adding yeast; never schedule an unrefrigerated stage above 32 °C (yeast optimum ~34 °C but the dough collapses; Lehmann emergency FDT 32–35 °C is a 2 h protocol).
7. **Fridge vs room ferment decision:** if bake is ≥ 16 h away → cold-ferment the balls (Lehmann style) with IDY from the multi-stage solver (typically 0.2–0.35% IDY for 24 h at 4–6 °C plus 2–3 h temper at 28 °C; 0.12–0.2% for 48 h); if 6–16 h away → room ferment with 0.03–0.12% (Sept nights 24–27 °C: 10 h needs ~0.045%; winter 15 °C: 10 h needs ~0.23%); if < 6 h → same-day 7 g poolish route or direct dough at 0.15–0.35% IDY with warm (28–30 °C) water.
8. **Leftover balls:** fridge only if remaining progress < 1 (i.e., balls not yet fully proofed at chilling time); at 5 °C a fully-proofed ball over-ferments in ~6–10 h (model: 0.5% IDY equivalent 30 h at 5 °C, but a ball already at 100% has no window) → for next-day use re-ball and chill immediately after dividing; for >1 day, freeze right after balling (freezer = 0 progress), thaw 8–10 h in the fridge then 2–3 h at room temperature (counts as ~0.4–0.6 of a proof at 28 °C in the model).
9. **Safety margin:** under-dose rather than over-dose: output the model value rounded down to 0.05 g precision for < 1 g and 0.1 g above, plus the poke-test text. Show predicted "ready at" and "over-proofed by" times (100% and 120% progress).
10. **Do not** use PizzApp-style flat cold-ferment tables, Japi2's T^2.5 form below 15 °C, or a single Q10; do not use the-bread-code/dough.school constants (no temperature model).

---

## 5. Open questions
- Exact digits of Craig's latest chart (msg393271) and the extended 95 °F chart could not be read (image behind Cloudflare); values here are BeanAnimal's curve fit (integer-hour rounding; ≤ ±10% at ≥5 h, worse at 1–3 h).
- Chart behaviour above 30 °C (Islamabad afternoons 32–34 °C): beta1 Gänzle model peaks ~34 °C and falls, BeanAnimal's fit stops at 29 °C; extrapolated table values at 30–34 °C carry ±25%.
- No source quantifies flour strength or 3.5% salt/5% oil in the yeast equation; the maida adjustments in §3.8 are judgement calls (needs the user's own poke-test log to calibrate — one or two batches).
- PizzApp+'s formula remains closed; only three data points (20 h/20 °C → 0.048%; 6 h/20.5 + 32 h/3.5 °C → 0.131% incl. +20% buffer; 44 h/37 °F + 1 h/72 °F → 3.84 g on an unknown flour mass) were recoverable. Ooni app reportedly equals Craig's chart to one decimal.
- Whether Saf-Instant red at 2% on poolish flour in a 1–2 h warm start then 16–24 h fridge behaves like "1/3 of the yeast pre-fermented" (Craig's rule) — the handoff's validated timelines are the only ground truth for this flour; they should be encoded as fixed presets and the model used only for schedule variants.
