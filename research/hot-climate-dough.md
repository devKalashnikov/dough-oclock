# Hot-climate dough management — research notes (dimension: hot-climate-dough)

Written 2026-09-04 for Dawood (Islamabad). Context: Vito-style poolish (250 g maida + 250 g water + 5 g Saf-Instant red + 5 g honey; 1–2 h counter then fridge 16–24 h), final dough 65–70 % hydration, 3.5 % salt, ~5 % oil, 280 g balls, flour = weak maida (9–10.5 % protein) + 20 % fine chakki atta. Kitchen 28–34 °C by day in September, 24–27 °C at night; winter 12–18 °C; fridge 3–6 °C (drifts to 7–8 °C).

Raw scrapes live in `research/raw/` (files named in each source line).

---

## 1. Sources consulted

Legend: **P** = primary (standard, book, creator's own words, paper, calculator author), **E** = expert forum (pizzamaking.com moderators/veterans, professional pizzaioli), **B** = blog/content site, **V** = video transcript.

| # | Source | What it contributed | Cred. |
|---|---|---|---|
| 1 | AVPN, "L'impasto e la lievitazione nel Disciplinare AVPN" — https://www.pizzanapoletana.org/es/archivio_news/593-limpasto_e_la_lievitazione_nel_disciplinare_avpn (raw: avpn593.txt) | Official recipe: 1 L water, 50–55 g salt, **3 g yeast**, 1.7–1.8 kg 00/0 flour; **min 8 h from balling at ~25 °C** | P |
| 2 | AVPN 2024 Disciplinare (English PDF, raw: avpn2024.txt, scraped by a sibling agent) | Fresh yeast **0.1–3 g** "based on temperature…"; **dry yeast = 1/3 of fresh**; total leavening **12–24 h**; proofing chamber ideal **18–20 °C, 60–70 % RH**; flour W 250–320 | P |
| 3 | AVPN interview with president Antonio Pace, "Ma tu vulive 'a pizza?" — https://www.pizzanapoletana.org/it/archivio_news/274-ma_tu_vulive_a_pizza (raw: avpn274.txt) | Yeast "2–3 per mille"; 2 h bulk + 5–6 h balls, ≥8 h total at **24–25 °C**; adds 10–15 % durum flour, **up to 20 % "se fa molto caldo"** (if very hot) to strengthen dough | P |
| 4 | TXCraig1, "Baker's yeast quantity prediction model" thread, pizzamaking.com — https://www.pizzamaking.com/forum/index.php/topic,26831.0.html and Reply 261 page (raw: txcraig.txt, txcraig261.txt) | Model basis (Ganzle 1998 growth model, 25 °C baseline); anchor: **0.048 % IDY at 70 °F ≈ 12 h**; "fermentation time = bulk + balls"; 0.2 % IDY is "a lot" for 24 h RT. The chart itself is an image behind a JS challenge (not retrievable here) | E/P |
| 5 | Pete-zza & scott r, "Steps to take so your dough is not overfermented", pizzamaking.com — https://www.pizzamaking.com/forum/index.php/topic,3626.0.html (raw: pm_3626.txt) | **Rate doubles per +15 °F (8.3 °C)** of finished dough temp; FDT targets 75–80 °F for home fridge, 80–85 °F commercial; emergency dough FDT 90–100 °F; cooling tricks (metal container, flatten, 15–30 min freezer, back of fridge) | E |
| 6 | PizzaBlab, "Room Temperature Fermentation: A Practical Guide" — https://www.pizzablab.com/learning-and-resources/fermentation/guide-to-room-temperature-fermentation/ (raw: pizzablab_rt.txt) | RT = 15–30 °C; calculator (TXCraig-based) examples: **500 g dough @25 °C 6 h → 0.2 g IDY**; **3 h @24 °C ≈ 0.2 % IDY, 5 h ≈ 0.1 %**; FDT target **23–27 °C**; equivalences: 10 h@16 °C ≈ 4 h@25 °C; 30 h@20 °C or 12 h@26 °C needs strong flour; emergency dough up to ~35 °C | P (calculator author) |
| 7 | PizzaBlab, "Factors affecting fermentation rate" + comment thread — https://www.pizzablab.com/learning-and-resources/fermentation/factors-affecting-fermentation-rate/ (raw: s11.txt) | Author's own calculator outputs for **4 h IDY: 23 °C 0.189 %, 24 °C 0.176 %, 25 °C 0.128 %** | P |
| 8 | PizzaBlab, "Final Dough Temperature" — https://www.pizzablab.com/learning-and-resources/mixing-kneading/final-dough-temperature/ (WebFetch) | FDT **23–27 °C** for RT ferment, **18–23 °C** for cold ferment, 10–15 °C for freezing; WT = 3·FDT − FT − RT − FF (4·FDT … − PT with preferment); summer: use fridge-cold flour | P |
| 9 | PizzaBlab, "Poolish preferment guide" — https://www.pizzablab.com/the-encyclopizza/poolish-preferment/ (raw: e15.txt) | Poolish RT 6–14 h; ripe = doubled + domed; **collapsed with smear marks → discard**; not recommended to ferment poolish in fridge | P |
| 10 | PizzaBlab, "Yeast conversion chart" — https://www.pizzablab.com/learning-and-resources/ingredients/yeast-conversion-chart/ | fresh→IDY ×0.33; fresh→ADY ×0.4; ADY→IDY ×0.75 | B (consistent with Lesaffre) |
| 11 | PizzaBlab, "Dough surface dried out" — https://www.pizzablab.com/pizza-making-troubleshooting/fermentation-problems/dough-surface-dried-out/ (raw: e6.txt) | Skin = air exposure; airtight container; re-moisten lightly if skinned | B |
| 12 | Lesaffre / SAF-Instant Red technical data sheet (Yumpu mirror) — https://www.yumpu.com/en/document/view/33784713/lesaffre-yeast-corporation-the-webstaurant-store (raw: e10.txt) | IDY replaces ADY at **¾**; IDY replaces compressed yeast at **33–40 %**; add water ≈2× yeast weight when converting from fresh; shelf life 24 mo < 80 °F | P |
| 13 | Lesaffre AU/UK product pages — https://lesaffre.com.au/trends/different-types-of-lesaffre-yeast , https://www.lesaffre.uk/product/saf-instant-yeast/ (raw: e4.txt) | **Saf-Instant Red: 0–5 % sugar doughs (pizza)**; **Gold: osmotolerant, 5–20 % sugar** | P |
| 14 | King Arthur Baking Pro reference "Yeast" — https://www.kingarthurbaking.com/pro/reference/yeast (raw: e4.txt) | fresh×0.33 = IDY; fresh×0.4 = ADY; IDY sensitive to ice-cold water → mix 1–2 min before adding | P |
| 15 | Hamelman, *Bread* ch. 4 (raw: hamelman_ch4.txt, sibling scrape) | Poolish yeast **0.08 % fresh at 80 °F/16 h vs 0.25 % at 65 °F**; at 70–75 °F: ≤8 h 0.7–1 %, ≤12 h 0.3–0.6 %, ≤16 h 0.1–0.25 % fresh (of preferment flour) | P (book) |
| 16 | Vito Iacopelli, YouTube short "Tips to Make Pizza Dough when is Hot Day 104F – 65% NO FRIDGE" — https://www.youtube.com/shorts/MlXeMBvwYkA (raw: vito_hot_short.txt) | Hot day, no fridge: **60–65 % hydration**, "everything cold", ~1 h bulk, ball, **2 h ball proof** at 104 °F | V/P |
| 17 | Vito Iacopelli, "Pizza dough for the house 2021" — https://www.youtube.com/watch?v=G-jPoROGHGE (raw: exa-vito-G-jPoROGHGE.txt, vito_house2021.txt) | Poolish 300 ml water / 300 g flour / 5 g dry yeast / 5 g honey; final 700 ml water, 1250 g flour, 40 g salt; poolish 1 h RT then fridge | V/P |
| 18 | Vito Iacopelli, other transcript (raw: exa-vito-Qbw5DUDK7Fs.txt) | "See how cold is the water… this is important when it's hot"; rest **1–2 h at RT depending on room temperature** | V/P |
| 19 | Vito Iacopelli, Facebook post "Tips to Make Pizza Dough when is Hot Day!" — https://www.facebook.com/maestrovitoiacopell/posts/tips-to-make-pizza-dough-when-is-hot-day/1772843087379525/ | Snippet only (Facebook blocked): "make different batches of dough and change and adapt the recipe based on your needs, length of event, and temperature" | V (snippet) |
| 20 | Vito 48 h poolish recipe on Napo — https://www.napo.pizza/en/recipes/en-vito-48-poolish (raw: e5.txt) | 5 g yeast + 5 g honey in 300 ml **cold** water; 1 h RT then fridge 16–24 h; poolish rests 30 min after fridge | B (transcribing Vito) |
| 21 | Massimo Nocerino (London pizzaiolo), "How Do I Manage to keep My Pizza Dough On Heat Wave" — https://www.youtube.com/watch?v=dhyf4vW08Ic (raw: vito_heatwave2.txt) | At **32 °C**, no fridge for balls: W 300–400 flour, **60 % hydration**, ~**1 g yeast per kg flour**, bulk **in fridge 8–10 h**, then 2 h RT, ball **6 h (6–8 h) before service**; "at 30 °C keeping at room temp will over-brew" | V/E |
| 22 | PizzaStunde, "Pizza at 35 °C" — https://www.pizzastunde.com/en/pizza-at-35c-how-to-master-dough-and-toppings-in-the-summer-heat/ (WebFetch) | Cold ferment; **1–2 g fresh/kg → 1 g/kg in summer**; ice water; FDT < 23–24 °C; **hydration 65–66 % instead of 70–72 %**; balls **30–60 min at RT (35 °C) is enough**; stretch straight from the cool box; overproofed dough tears | B (practitioner, mobile pizza) |
| 23 | Ooni UK, "Neapolitan-style dough (Halo Pro)" — https://uk.ooni.com/blogs/recipes/ooni-neapolitan-style-pizza-dough (raw: e12.txt) | FDT target 21–26 °C; **warm months 21–23 °C**, cool months 23–26 °C; **above 28 °C reduce yeast by 50 %**; summer: chill water in fridge ≥2 h | P (manufacturer) |
| 24 | Pizza Equipment & Supplies Ltd, "How to prepare pizza dough in hot weather" — https://pizzaequipment.co.uk/how-to-prepare-pizza-dough-in-hot-weather/ (raw: e2.txt) | Above 30 °C chilled water alone may not suffice; crushed ice, not cubes; mix 4 min / rest 5 min; **reduce yeast rather than shorten schedule**; gap-stack boxes first 1–2 h; mix early morning; keep lidded to avoid skinning | B (trade) |
| 25 | Ristorazione Italiana Magazine, "Impasto pizza estate" — https://www.ristorazioneitalianamagazine.it/impasto-pizza-estate-temperatura/ (raw: e7.txt) | Fermentation **~doubles per +10 °C**; 24 h dough in Jan → 10–12 h in Aug; TDI 23–25 °C; water = 3·TDI − flour − room − friction (spiral +2–3 °C); at 30 °C lab/28 °C flour → **water 4–6 °C**; don't shock 28 °C dough into 4 °C — bring to 20–22 °C first; **start reducing yeast above 22 °C**; lievitazione ≠ maturazione; weak flours become unmanageable in heat | B (trade, Italian) |
| 26 | PizzaPlan, "Room temperature fermentation" — https://pizzaplan.app/en/room-temperature-fermentation/ (raw: pizzaplan.txt) | Q10: **doubles per 8–10 °C**; table: 18 °C 12–16 h / 0.18–0.24 % fresh; 20 °C 8–12 h / 0.18–0.27 %; 22 °C 6–9 h / 0.16–0.24 %; 24 °C 4–6 h / 0.18 %; **summer mode from 26 °C**; RT cap 24 h; Hamelman factor ≈3 per 9 °C for fridge schedules; Craig model for RT | P (calculator author) |
| 27 | Calcoi "Formule lievito (Modenese 1990)" — https://calcoi.com/calculator/pizza-dough-calculator/ (raw: e3.txt) | Fresh yeast per 1 kg flour: **2 h@25 °C 30 g; 4 h@22 °C 10 g; 8 h@22 °C 5 g; 12 h@22 °C 2.5 g; 24 h@22 °C 1 g; 24 h@18 °C 0.5 g; 48 h fridge 0.3 g; 72 h 0.15 g**; dry = fresh/3 | B (Italian, cites "Modenese 1990") |
| 28 | Misya.info, "Lieviti e lievitazione" — https://www.misya.info/guide/lieviti-e-lievitazione (raw: misya.txt) and Pescenudo — https://www.pescenudo.it/2020/tempi-di-lievitazione-degli-impasti-con-lievito-di-birra (raw: pescenudo.txt) | Italian home table (fresh yeast per 1 kg 00): 22–25 g → 2 h RT; 18–20 g → 4 h; 14–16 g → 6 h; 10–12 g → 8 h; 6–8 g → 10 h; 1–4 g → 12 h; "optimum 28–30 °C"; below 8–10 °C yeast metabolism inhibited; 25 g fresh ≈ 7 g dry | B (Italian home) |
| 29 | Sfida Pizza, "Impasto per pizza napoletana DOC" — https://sfidapizza.it/impasto-per-pizza-napoletana-doc/ (WebFetch) | 570 g flour, 335 g water (59 %), **1/3 g fresh yeast**, 17 g salt; ~20 h RT (24 h winter); **"in estate… mai sotto le 8 ore"** (2 h bulk + 6 h balls) | B (Italian practitioner) |
| 30 | Erik (professional pizzaiolo) in "Napolitana Ooni Fyra Dough Advice", pizzamaking.com — https://www.pizzamaking.com/forum/index.php/topic,83512.0.html (raw: pm_83512.txt) | Weak flour (W150–180): **hydration 57–62 %, fermentation 10–12 h, drop preferment and oil**; base recipe 1 L water / 1.5–1.6 kg strong 00 / 43 g salt / **0.5 g fresh** → 14 h bulk at **26 °C** + 4–6 h balls; "if the weather is too hot, reduce the yeast" | E |
| 31 | PapaJawnz et al., "Help with proofing/proof time", pizzamaking.com — https://www.pizzamaking.com/forum/index.php/topic,83545.0.html (raw: pm_83545.txt) | From TXCraig chart: **96 h @36 °F → 0.16–0.19 %**; **8–12 h @25 °C ≈ 0.04 % ADY**; 0.46 % ADY at 25 °C → ~1 h; cold-proofed balls out 2 h before bake | E |
| 32 | Tom Lehmann, "Dough Doctor: Get Wet", Pizza Today — https://pizzatoday.com/news/dough-doctor-get-wet/130903/ (raw: lehmann_getwet.txt) | Water temp = 3·FDT − (room + flour + friction); friction factor = 3·actual dough T − (room + flour + water); worked example FF 57 (°F) → water 45 °F for FDT 80 °F | P (Lehmann) |
| 33 | Tom Lehmann, "Effective dough management", PMQ — https://www.pmq.com/effective-dough-management/ (raw: lehmann_pmq.txt) | Ball, oil tops, into cooler within 20 min; **cross-stack until dough core 50–55 °F**; open balls at 50–55 °F → ~3 h useful life; reach-in cooler: FDT 5–10 °F lower | P (Lehmann) |
| 34 | Lehmann / PMQ, "Wet, sticky dough" — https://www.pmq.com/wet-sticky-pizza-dough/ and Pizza Today 2015 (raw: e11.txt) | Condensation from sealing warm dough; **cross-stack ≥90 min for ≤12 oz balls**; oil tops to prevent skin; reach-in: FDT ≤75 °F +30 min | P (Lehmann) |
| 35 | Janssens et al., UBC, "Effect of varying temperature on CO2 production in baker's yeast" (raw: ubc_co2.txt) — https://ojs.library.ubc.ca/index.php/expedition/article/view/188348/186126 | Avg CO2/cell: **1.66e-9 (25 °C), 2.31e-9 (30 °C), 3.02e-9 (35 °C)** mL; exponential-phase rates 0.77 / 1.14 / 1.54 e-10 mL/cell/min → **×2.0 from 25→35 °C**; lag shorter at higher T; highest cell growth at 30 °C, highest gas at 35 °C | P (student paper, undergrad journal) |
| 36 | Bakemag "The science of fermentation" (via WebSearch summary) — https://www.bakemag.com/articles/836-the-science-of-fermentation | "1 °C rise ≈ +10 % yeast activity"; optimum gas production continues up to ~38–41 °C | B (trade) |
| 37 | Jordo's Pizza Calculator, "Fermentation timing" — https://jordospizzacalculator.com/guides/fermentation-timing (WebFetch) | Kitchens **>25 °C: fermentation 30–50 % faster**; cold water "buys 1–2 h"; pull cold balls **60–90 min** before stretching (20–22 °C room) | B (calculator) |
| 38 | Gozney Academy, "How to proof pizza dough" — https://us.gozney.com/blogs/academy/how-to-proof-pizza-dough (raw: gozney.txt) | Quick proof "optimum 20–38 °C", balls 1–2 h; cold proof 24–72 h, return to RT 2 h; over-proofed = floppy, sour | B (manufacturer) |
| 39 | pizzalogic, "How to proof pizza dough" — https://pizzalogic.app/blog/how-to-proof-pizza-dough/ (raw: e6.txt, e8.txt) | At 75 °F perfect at 3 h, past prime by 4.5 h; at 68 °F ~5 h; fridge yeast ≈5–10 % of RT rate; balls from fridge temper 1–2 h; damp towels bad (porous, evaporative cooling); 20 min uncovered can skin; oil the surface | B |
| 40 | TWF Flours (India), "Overcoming humidity… Indian climates" — https://dough.twfflours.com/overcoming-humidity-perfect-neapolitan-pizza-dough-in-indian-climates/ (raw: e8.txt) | Humid air → flour holds more moisture → start slightly lower water; ferment in AC room or fridge; cold mixing water | B (Indian flour brand) |
| 41 | Newsfolo (India) pizza dough basics — https://www.newsfolo.com/food/recipes/pizza-dough-recipe-from-scratch-continental-basics/165076/ (raw: e8.txt) | Indian July kitchen: **45–60 min to double** with a standard-yeast home recipe | B |
| 42 | The Fresh Loaf threads (raw: exa_hot3.txt): "Too hot… doubling in 20 minutes" https://www.thefreshloaf.com/node/18605/…, "Fermentation Temperature" (room 30–40 °C) https://www.thefreshloaf.com/node/55871/…, "Proofing… warm weather" (Lima, 86 °F, 80–90 % RH) | At 30 °C indoors bread doubled in 20 min; advice: **1/3–1/4 of usual yeast**, evaporative cooling (damp cloth around container, clay-pot cooler), cooler box with ice bricks, ice water; halve times and watch the dough | B (community) |
| 43 | Real Fake Pizza, "24H room temp dough in summer" — https://www.youtube.com/watch?v=Xm29J6o16Uw (raw: rt24_summer.txt) | Planned 24 h @25 °C with app-calculated fresh yeast; flat ran hotter than 25 °C → balls visibly overproofed but still baked acceptably | V |
| 44 | My House of Pizza, poolish & temperature — https://www.myhouseofpizza.com/temperature-effect-poolish-fermentation/ | Table: 27–32 °C "fast, watch for over-fermentation"; >35 °C "not recommended" | B (low) |
| 45 | JayArr / Gemignani freezing method — https://jayarr.pizza/blog/how-to-freeze-pizza-dough/ (raw: e13.txt) | Freeze **after balling + 24 h cold ferment**; thaw fridge 8–12 h then 1–2 h RT, or 27 °C water 15 min + 1.5–2 h RT; core 60–65 °F to shape; ≤2 months | B (cites Gemignani) |
| 46 | Khameer sources — https://khoraakfoods.com/product/baking-yeast-50g-pakistan/ , https://spicedivine.com/products/desi-instant-yeast-khameer , Dawn on Lahore naan bakers (WebSearch) | "Khameer" in Pakistan is used both for commercial instant yeast powder (Khoraak 50 g) and for bakery-made starters (naan shops "make their khameer themselves") | B |

| 47 | Baking With Theory, "Poolish" — https://www.bakingwiththeory.com/theory/poolish/ (raw: bwt_poolish.txt) | Poolish fresh-yeast % of poolish flour by ripening time (room temp unspecified): **1–2 h 2.5–3 %; 4–5 h 1.5 %; 7–8 h 0.5 %; 10–12 h 0.2 %; 15–18 h 0.1 %** | B |
| 48 | PizzaBlab calculator guide — https://www.pizzablab.com/calculators/pizza-dough-calculator-guide/ (raw: pizzablab_calcguide.txt) | Calculator yeast is for the "Lehmann method" (ball and refrigerate immediately); timing tweaks matter mainly when fermentation is "very short and hot (e.g., **3–4 hours at 30 °C**)" and pizzas are baked across a 2–3 h window | P |
| 49 | pizzamaking.com thread 70059, fermentation tool based on TXCraig1 — https://www.pizzamaking.com/forum/index.php?topic=70059.0 (raw: pm_70059.txt) | Multi-stage (up to 4 stages of hours/temp) implementation of Craig's model; equations not published | E |

Not retrievable (blocked/rate-limited): Facebook post text (#19), TXCraig1 chart image, pizzamaking "Overproofed?" thread 63824 (403), Confraternita della Pizza "Impasto estate con TA 30°" (JS shell only), Cereal Chemistry 1985 PDF, King Arthur dough-temperature page (403).

---

## 2. Findings with numbers

### 2.1 How fast does fermentation speed up with temperature? (the core scaling law)

| Source | Statement | Implied factor per +10 °C | Implied factor per +5 °C |
|---|---|---|---|
| Pete-zza (#5) | rate doubles per +15 °F (8.3 °C) finished-dough temp | ×2.3 | ×1.52 |
| PizzaPlan (#26) | "for every 8 to 10 °C more, speed roughly doubles" | ×2.0–2.4 | ×1.41–1.55 |
| Ristorazione Italiana (#25) | "raddoppia approssimativamente ogni 10 gradi"; 24 h dough in January → 10–12 h in August | ×2.0 | ×1.41 |
| Bakemag (#36) | +1 °C ≈ +10 % activity | ×2.6 | ×1.61 |
| UBC paper (#35) | exponential CO2 rate 0.77→1.14→1.54 (25→30→35 °C) | ×2.0 | ×1.48 (25→30), ×1.35 (30→35) |
| Hamelman poolish (#15) | 0.25 % fresh at 65 °F vs 0.08 % at 80 °F for same 16 h | ×3.9 (per 8.3 °C → ×5.1/10 °C) | ×2.2 |
| Ooni (#23) | above 28 °C cut yeast 50 % | (step function) | — |
| Jordo (#37) | >25 °C, 30–50 % faster | — | ~×1.3–1.5 |
| PizzaBlab calc outputs (#7) | 4 h: 23 °C 0.189 %, 24 °C 0.176 %, 25 °C 0.128 % | noisy; 23→25 °C ×1.48 over 2 °C (short-ferment artefact) | — |
| PizzaPlan fridge schedules (#26) | Hamelman factor ≈ 3 per 9 °C | ×3.4 | ×1.84 |

Consensus band for 20–35 °C: **×1.4–1.6 per +5 °C** (Q10 ≈ 2–2.5). Hamelman's poolish numbers are the outlier (×2.2 per 5 °C) — a liquid preferment with high yeast is more temperature-sensitive than a dough. Gas production keeps rising to ~38–41 °C (Bakemag, UBC), so there is **no "self-limiting" relief at 35 °C** — it simply gets faster.

### 2.2 Yeast-quantity anchor points (direct dough, IDY unless stated)

| Temp | Hours | Yeast | Source |
|---|---|---|---|
| 21 °C (70 °F) | 12 h | 0.048 % IDY | TXCraig1 model (#4) |
| 24 °C | 3 h | ≈0.2 % IDY | PizzaBlab calc (#6) |
| 24 °C | 5 h | ≈0.1 % IDY | PizzaBlab calc (#6) |
| 23 / 24 / 25 °C | 4 h | 0.189 / 0.176 / 0.128 % IDY | PizzaBlab calc (#7) |
| 25 °C | 6 h | 0.2 g IDY per 500 g dough (≈0.065 % of ~300 g flour) | PizzaBlab (#6) |
| 25 °C | 8–12 h | ≈0.04 % ADY (≈0.03 % IDY) | PapaJawnz from TXCraig chart (#31) |
| 25 °C | ~1 h | 0.46 % ADY "too fast" | #31 |
| 26 °C | 14 h bulk + 4–6 h balls | 0.5 g fresh per 1.5–1.6 kg flour (≈0.03 % fresh ≈ 0.01 % IDY) | Erik (#30) |
| ~25 °C | ≥8 h (2 + 6) | 3 g fresh per 1.7–1.8 kg flour (0.17 % fresh ≈ 0.06 % IDY) | AVPN (#1) |
| 24–25 °C | 8–10 h | 0.2–0.3 % fresh | Antonio Pace (#3) |
| 2 °C (36 °F) | 96 h | 0.16–0.19 % IDY | TXCraig chart via #31 |
| 20 °C | 20 h | 0.48 g IDY per kg flour (0.048 %) | Khymos/PizzApp (WebFetch) |

Italian fresh-yeast tables (fresh yeast per 1 kg flour):

Modenese (#27):
| Time / temp | Fresh yeast | ≈ IDY (÷3) |
|---|---|---|
| 2 h @ 25 °C | 30 g (3 %) | 10 g (1 %) |
| 4 h @ 22 °C | 10 g | 3.3 g |
| 8 h @ 22 °C | 5 g | 1.7 g |
| 12 h @ 22 °C | 2.5 g | 0.83 g |
| 24 h @ 22 °C | 1 g | 0.33 g |
| 24 h @ 18 °C | 0.5 g | 0.17 g |
| 48 h fridge 4 °C | 0.3 g | 0.1 g |
| 72 h fridge 4 °C | 0.15 g | 0.05 g |

Misya/Pescenudo (#28), 1 kg 00 flour, "room temperature" unspecified:
| Fresh yeast | RT | Fridge |
|---|---|---|
| 22–25 g | 2 (1.5–3) h | 4 (2.5–5) h |
| 18–20 g | 4 (2.5–5) h | 6 (4–8) h |
| 14–16 g | 6 (4–8) h | 9 (6–12) h |
| 10–12 g | 8 (5–10) h | 12 (10–15) h |
| 6–8 g | 10 (6–12) h | 15 (12–18) h |
| 1–4 g | 12 (8–15) h | 20 (18–24) h |

PizzaPlan (#26), direct dough, fresh yeast % of flour:
| Room temp | Total ferment | Fresh yeast |
|---|---|---|
| 18 °C | 12–16 h | 0.18–0.24 % |
| 20 °C | 8–12 h | 0.18–0.27 % |
| 22 °C | 6–9 h | 0.16–0.24 % |
| 24 °C | 4–6 h | 0.18 % (at 6 h) |

Note the systematic gap: Italian home tables run **2–5× more yeast** than TXCraig/PizzaBlab-derived numbers for the same time/temperature (e.g., 12 h @22 °C: Modenese 0.083 % IDY-equivalent vs TXCraig ~0.045 %). Professional Neapolitan numbers (AVPN, Erik, Pace) sit at the low end.

### 2.3 Hot-climate practitioner protocols (what people actually do at 30–40 °C)

| Practitioner / T | Flour | Hydration | Yeast | Schedule | Key notes |
|---|---|---|---|---|---|
| Vito Iacopelli, 104 °F/40 °C, no fridge (#16) | 00 | **60–65 %** | (not stated; his standard poolish) | ~1 h bulk → ball → **2 h** ball proof | "everything cold"; lower hydration is the lever without a fridge |
| Vito, general (#18, #17, #20) | 00 | 70 % (poolish 100 %) | 5 g IDY / 300 g poolish flour | poolish **1 h RT** then fridge 16–24 h; dough rest "1–2 h depending on room temp" | cold water "when it's hot" |
| Massimo Nocerino, London 32 °C (#21) | W 300–400 | **60 %** | ~1 g/kg (fresh or dry "pretty much the same") or 300 g starter/14 kg | mix → **bulk in fridge 8–10 h** → 2 h RT → ball → 6–8 h at RT to service | "at 30 °C at room temp it will over-brew, it's gonna be messy" |
| PizzaStunde, 35 °C outdoor events (#22) | — | **65–66 %** (down from 70–72) | 1 g fresh/kg (from 1–2) | cold ferment; balls in thermobox with ice packs; **30–60 min at 35 °C** is enough before stretching | FDT < 23–24 °C; stretch straight from cool box |
| Erik, 26 °C (#30) | strong 00 | 60–64 % | 0.5 g fresh / 1.5–1.6 kg | 14 h bulk RT + 4–6 h balls | weak flour: 57–62 %, 10–12 h, no preferment, no oil |
| AVPN summer norm (#1–3) | W 250–320 | 55–62 % | 0.1–3 g fresh per L water "based on temperature" | ≥8 h (2 + 6) at 24–25 °C; chambers 18–20 °C / 60–70 % RH | Pace adds up to 20 % durum in heat |
| Ooni UK (#23) | — | — | **−50 % above 28 °C** | 18–20 h at 16–20 °C standard | FDT 21–23 °C in warm months |
| Sfida Pizza (#29) | medium | 59 % | 1/3 g fresh / 570 g | ~20 h RT; summer "much shorter but never < 8 h" | — |

### 2.4 Finished-dough-temperature control (all sources agree this is the primary lever)

- Target FDT: 23–27 °C for RT ferment; 18–23 °C for cold ferment (PizzaBlab #8); 21–23 °C warm months (Ooni #23); 23–25 °C (Ristorazione #25); 75–80 °F = 24–27 °C for home-fridge cold ferment (Pete-zza #5); < 23–24 °C at 35 °C events (#22).
- Formula (Lehmann #32, PizzaBlab #8, Ristorazione #25): **Water T = 3·FDT − (room T + flour T + friction)**; with a preferment: 4·FDT − (room + flour + friction + preferment T). Friction: spiral +2–3 °C (#25); KitchenAid-type stand mixer ≈ +3 °C (Fresh Loaf #42); Lehmann's example FF = 57 °F-units for a commercial mixer.
- Worked hot case (#25): lab 30 °C, flour 28 °C, spiral → **water 4–6 °C**. For Dawood's stand mixer on speed 1–2 for ~15 min at 32 °C room / 32 °C flour, FDT 24 °C → water ≈ 3×24 − (32 + 32 + 3) = **5 °C** (ice water, ice removed). At 28 °C room → water ≈ 13 °C. At 35 °C → water < 0 → use fridge-cold flour as well (#8).
- Ice: use crushed ice pre-melted in water, not cubes in the mixer; if > 30 °C, mix 4 min, rest 5 min, resume (#24). IDY should not go straight into ice water — mix 1–2 min first or dissolve in a little 40 °C water for 10 min (KAB #14, PizzaBlab #6). Don't shock 28 °C dough into a 4 °C fridge; bring to 20–22 °C first (#25). Cross-stack/gap-stack warm dough boxes 1–2 h before sealing (#24, #33, #34).

### 2.5 Poolish in heat

- Vito's poolish is very high in yeast: 5 g IDY on 250–300 g flour = **1.7–2 %** — designed for ~1 h RT then 16–24 h at fridge temp. Hamelman's guideline at 70–75 °F is 0.1–0.25 % *fresh* for a 16 h RT poolish, 0.7–1 % for ≤8 h; at 80 °F only 0.08 % for 16 h (#15). PizzaBlab: poolish RT 6–14 h, ripe = doubled with dome, collapse = discard (#9). Anecdotal: at ≥30 °C a poolish "peaks and starts to fall" quickly (Fresh Loaf/anova via WebSearch); breadflavors: above 30 °C a normal poolish completes in 8–10 h.
- Scaling Vito's 1 h counter step (he films at ~20–24 °C) with ×1.5 per 5 °C: 20 °C 60–70 min; 25 °C 45–60 min; 28 °C 40 min; 30 °C 35 min; 32 °C 30 min; 35 °C 20–25 min — or make it with fridge-cold water and skip the counter step entirely above 32 °C (Napo transcription of Vito: "cold water", #20).
- Fridge drift: at 7–8 °C the yeast is clearly active (Misya: inhibition begins below 8–10 °C; Facebook snippet: "yeast doesn't switch off at 8 °C"). Cap the poolish fridge time at ~16 h when the fridge reads ≥7 °C.

### 2.6 Ball proof / tempering-time anchors

| Situation | Time | Source |
|---|---|---|
| Vito, 65 %, no fridge, 40 °C | 2 h balls | #16 |
| Dawood's validated, 28 °C, Vito poolish dough | 3–3.5 h (start checking 2.5 h) | context-handoff |
| Dawood's validated, cooler (~20–22 °C) | 4–5 h | context-handoff |
| AVPN / Pace, 24–25 °C, 0.17–0.3 % fresh | 5–6 h balls | #1, #3 |
| Nocerino, 32 °C, ~0.1 % yeast, cold bulk | 6–8 h balls | #21 |
| Cold-proofed balls out of fridge: 20–22 °C | 60–90 min (#37), 1–2 h (#39), 2 h (#31, #38) | |
| Cold-proofed balls out of thermobox at 35 °C | 30–60 min | #22 |
| Lehmann: open at core 10–13 °C, ~3 h usable life | | #33 |
| Indian July kitchen, standard home recipe | doubles in 45–60 min | #41 |
| 30 °C apartment, normal bread yeast | doubled in 20 min | #42 |

### 2.7 Yeast forms (for the "khameer" question)

- Fresh (compressed) → IDY: ×0.33 (Lesaffre 33–40 %, KAB 0.33, AVPN 1/3, PizzaBlab 0.33). Fresh → ADY ×0.4. ADY → IDY ×0.75. IDY → fresh ×3. When replacing fresh with dry, add water ≈ 2× the yeast weight (Lesaffre #12). 25 g fresh ≈ 7 g dry (Pescenudo — a 3.6:1 ratio, i.e. slightly more conservative).
- Saf-Instant **Red** is the right product for pizza (0–5 % sugar; the poolish honey is 2 % of poolish flour, 0.5 % of total). **Gold** is osmotolerant for 5–20 % sugar doughs and "works almost twice as fast" only in sweet doughs; it prefers slightly warmer proofing — no reason to switch.
- "Khameer" in Pakistan is ambiguous: retail "desi instant khameer" (e.g., Khoraak 50 g) is instant dry yeast; naan bakeries often make their own khameer (old-dough/wild starter — Dawn on Lahore naan shops). A bakery starter has unknown cell count — treat it as sourdough (AVPN: natural yeast 30–40 % of flour, times doubled per Calcoi), not as compressed yeast. Only true compressed cake yeast (grey-yellow block, 25–500 g packs per AVPN 2024) converts at 3:1.

### 2.8 Humidity, condensation, skin

- Skin forms from air exposure; 20 min uncovered in dry air can start a skin; damp towels are porous and cool by evaporation (bad); airtight lids or oiled cling film pressed to the surface are best; oil the ball tops (#11, #39, #33).
- Wet/sticky ball surfaces after the fridge = condensation from sealing *warm* dough in a box; cross-stack/leave lids ajar ≥90 min (≤12 oz balls) until the core reaches 10–13 °C, then seal (#33, #34). For a home reach-in fridge, drop FDT ≤24 °C and add 30 min.
- Monsoon humidity: flour picks up moisture → dough runs wetter; start 1–2 % lower water (TWF #40). AVPN's reference chamber is 60–70 % RH at 18–20 °C (#2), i.e., humid air per se is fine; it is temperature that matters.
- Evaporative cooling hacks that work without AC: damp cloth wrapped around the container, container inside a water-soaked unglazed clay pot, cooler box with ice bricks (#42).

---

## 3. Contradictions between sources and how to resolve them

1. **Q10 magnitude.** Dough sources cluster at ×2–2.5 per 10 °C (Pete-zza, PizzaPlan, Ristorazione, UBC); Hamelman's poolish numbers imply ×5 per 10 °C; Bakemag ×2.6. Resolution: use **×1.5 per +5 °C** for dough phases (ball proof, bulk) and **×1.7–2.0 per +5 °C** for the liquid poolish counter step, which is yeast-dense and temperature-sensitive. Above 35 °C do not extrapolate — move the phase into the fridge.
2. **Absolute yeast levels.** Italian home tables (Modenese, Misya) are 2–5× higher than TXCraig/PizzaBlab/AVPN/Erik. Resolution: Dawood's poolish method is already yeast-heavy (5 g IDY per kg total flour = 0.5 % IDY ≈ 1.5 % fresh) and is validated by his own 3–3.5 h @28 °C ball proof; do not import the Italian direct-dough tables. Use the low, professional numbers only if the engine ever offers a no-poolish direct dough.
3. **Collapsed poolish: use or discard?** PizzaBlab: discard if collapsed with smear marks; handoff/Vito: slightly collapsed = peak flavour. Resolution: *slight* central dip after a cold ferment is fine (yeast activity is low in the fridge, protease damage limited); a poolish that collapsed **on the counter at 30 °C+** (sour/alcoholic smell) is the dangerous case with weak maida — the engine should shorten counter time so this never happens rather than ask the user to judge.
4. **Poolish in the fridge at all?** PizzaBlab says don't; Vito's whole method depends on it and Dawood has validated it. Resolution: keep Vito's method (it is a retarded poolish, closer to a sponge); the fridge cap is 24 h at ≤6 °C, 16 h at ≥7 °C.
5. **Optimum proofing temperature.** Gozney "20–38 °C optimum", Misya "28–30 °C optimum", vs everyone who manages dough professionally (FDT 21–27 °C; AVPN chambers 18–20 °C). Resolution: 28–38 °C is optimum for *yeast speed*, not for *dough quality* — with weak maida, gluten breaks down before flavour develops (Ristorazione: "gonfiato ma non maturato"). Treat ≥30 °C as an emergency/no-choice range.
6. **Tempering time for cold balls.** 30–60 min (35 °C events) vs 1–2 h (20–22 °C) vs Lehmann's core-temperature rule (10–13 °C core, ~3 h window). Resolution: it is a temperature-dependent ramp: use the table in §4.5.
7. **Hydration in heat.** Vito (60–65 % no-fridge), PizzaStunde (65–66 %), Nocerino (60 %), Erik (57–62 % for weak flour) vs Dawood's current 65–70 %. Resolution: at ≥30 °C default the engine to 65 % and warn that 70 % + weak maida + heat is the highest-risk combination.
8. **Ooni "−50 % yeast above 28 °C"** vs continuous scaling. The step is a coarse version of ×1.5 per 5 °C applied from ~23 °C (1.5² ≈ 2.25 over 10 °C). Use the continuous rule; Ooni's step is a sanity check.
9. **Massimo Nocerino's 6–8 h ball proof at 32 °C** looks like it contradicts "2–2.5 h at 32 °C". It doesn't: he uses ~0.1 % yeast and strong W300–400 flour; Dawood uses ~5× the yeast and weak flour. Ball-proof time is a function of yeast × temperature × flour strength, not temperature alone.
10. **"Reduce yeast, keep the schedule" (Pizza Equipment, Ristorazione) vs "keep yeast, shorten the schedule" (Vito, Dawood's current practice).** Both are valid; for an *event* the schedule is fixed by the clock, so the engine should scale **yeast** to hit the chosen clock time, and only fall back to shortening RT phases when the yeast would drop below a weighable minimum (0.3 g on a kitchen scale without a 0.01 g scale).

---

## 4. Recommendations for the deterministic engine

All rules assume Dawood's poolish method and weak maida + 20 % fine atta. T = the user-entered current room temperature (°C). Use the daytime temperature for daytime phases; if a phase spans night, allow the user to enter a night temperature or assume T − 4 °C for 22:00–07:00 in Islamabad (context-handoff: 28–34 °C day, 24–27 °C night).

### 4.1 Temperature regime bands (decision thresholds)

| Band | T | Regime |
|---|---|---|
| Cool | ≤ 22 °C | Standard Vito timings; can extend RT phases; water at room temp or slightly cool |
| Normal | 23–27 °C | Standard timings; cold water (fridge, ~8–10 °C) |
| Warm | 28–30 °C | Ice water (≈5 °C), poolish counter ≤40 min, ball proof ≤3.5 h, warn "watch from 2.5 h" |
| Hot | 31–34 °C | **Switch to fridge-proofing**: balls go into the fridge after balling; pull 45–60 min before bake. Hydration default 65 %. Poolish counter ≤30 min or skip (cold water straight to fridge) |
| Very hot | ≥ 35 °C | As Hot, plus fridge-cold flour, poolish counter skipped, balls out only 30–45 min before bake, mix in the coolest hour (early morning / late night). If AC available, treat the AC room temperature as T |

Threshold justification: PizzaPlan summer mode from 26 °C; Ooni −50 % yeast from 28 °C; Ristorazione: reduce yeast from 22 °C, weak flours "impossible above certain degrees"; Nocerino: at 30 °C RT balls over-brew; PizzaStunde 35 °C: 30–60 min only.

### 4.2 Poolish (250 g flour / 250 g water / 5 g honey)

- Yeast (IDY) for the Vito-standard 16–24 h fridge poolish: **5 g at T ≤ 27 °C; 4 g at 28–30 °C; 3 g at ≥ 31 °C** (handoff already uses 3 g + cold water for hot overnight; Hamelman's ×3 for +8 °C supports a stronger cut for a liquid preferment).
- Water temperature: room temp at ≤22 °C; fridge water (8–10 °C) at 23–30 °C; ice water (≈5 °C) at ≥31 °C.
- Counter time before the fridge (Vito's "1 h" at ~22 °C, scaled ×1.7 per +5 °C for the liquid poolish): **20 °C: 70 min; 25 °C: 50 min; 28 °C: 40 min; 30 °C: 35 min; 32 °C: 25–30 min; ≥35 °C: 0 min** (straight to fridge with ice water; it will still be well-risen after 16 h).
- Fridge time: 16–24 h at ≤6 °C; **cap 16 h if the fridge reads ≥7 °C**; minimum 12 h. Rest 20–30 min at room temp after the fridge (Vito/Napo) — shorten to 10–15 min at ≥31 °C.
- Same-day poolish (no fridge, handoff option A: 7 g IDY, 2–3 h): scale the 2.5 h @25 °C anchor by ×1.5 per 5 °C → 20 °C: 3.5–4 h; 25 °C: 2.5 h; 28 °C: 2 h; 30 °C: 1.7 h; 32 °C: 1.5 h; 35 °C: 1.2 h. Above 32 °C prefer the fridge poolish.

### 4.3 Final dough

- Hydration default: 70 % allowed at ≤27 °C; **65 % default at ≥28 °C** (Vito hot-day 60–65 %, PizzaStunde 65–66 %, Erik 57–62 % for weak flour). Never above 65 % at ≥31 °C with maida.
- Additional IDY in the final dough: none (all yeast in poolish) — keep as is. If the user picks a schedule where balls must wait > 5 h at RT at ≥28 °C, the engine should refuse and propose fridge-proofing instead of cutting yeast (the poolish already sets the yeast level).
- Water temperature (stand mixer, FDT target 24 °C at RT ferment / 21 °C if going to the fridge; friction +3 °C; flour ≈ room T): **Twater = 3·FDT − 2·T − 3**. Examples for FDT 24: T 20 → 29 °C (room temp); T 25 → 19 °C; T 28 → 13 °C; T 30 → 9 °C; T 32 → 5 °C; T 35 → −1 °C → use ice water + fridge-cold flour (flour at 8 °C makes it 26 °C water needed → any cold water is fine). Display "ice water, ice removed" whenever Twater < 8 °C.
- Salt 3.5 % and oil ~4–5 % stay (salt slows fermentation, useful in heat; Erik's "drop oil" is for weak flour without a poolish — Dawood's oil is validated).
- Bulk rest after kneading: 30 min at ≤27 °C; 20 min at 28–30 °C; 15 min at ≥31 °C (Vito "1–2 h depending on the room"; handoff 30 min).

### 4.4 Ball proof (280 g balls, Vito-poolish dough)

Anchor: 3–3.5 h at 28 °C (validated), 4–5 h at ~21 °C (validated). Scale ×1.5 per 5 °C:

| T (°C) | RT ball proof to "ready" | Start poke-testing at | Usable window after ready |
|---|---|---|---|
| 20 | 5.5–6 h | 4.5 h | ~2 h |
| 25 | 4–4.5 h | 3.5 h | ~1.5 h |
| 28 | 3–3.5 h | 2.5 h | ~1 h |
| 30 | 2.5–3 h | 2.25 h | ~45 min |
| 32 | 2.25–2.5 h | 2 h | ~30 min — engine should default to fridge-proof |
| 35 | 1.75–2 h | 1.5 h | ≤20 min — fridge-proof only |

(Vito's 2 h at 40 °C outdoor with 65 % dough is consistent with the bottom rows; pizzalogic's "perfect at 3 h, past prime at 4.5 h at 24 °C" gives the window shape.)

### 4.5 Fridge-proofing of balls (Hot/Very hot bands, or whenever the bake is > 5 h after balling)

- Ball immediately after the 15–30 min bulk rest, oil tops, tray in fridge **with the cover ajar for the first 60–90 min** (cross-stack rule; ≤12 oz balls), then seal.
- Minimum fridge time before use: 4 h (balls need to cool and relax); typical 6–24 h; at fridge ≥7 °C cap at 12 h for the poolish dough.
- Pull-out (temper) time before baking, by room temperature: **20 °C: 120 min; 25 °C: 90 min; 28 °C: 60–75 min; 30 °C: 60 min; 32 °C: 45 min; 35 °C: 30–45 min** (Jordo 60–90 min at 20–22 °C; pizzalogic 1–2 h; PizzaStunde 30–60 min at 35 °C; Lehmann: shape when core ≈ 10–13 °C). Pull staggered: half the balls first, the rest 30 min later, so the last pizzas are not overproofed (Vito FB: "different batches").
- Never let pulled balls sit in the sun/near the oven (PizzaStunde); the CasaKoa area will be hotter than the kitchen — use the kitchen temperature for tempering and carry balls out one at a time.

### 4.6 Leftover balls (second sitting)

- Same day / next day (≤ 30 h): fridge immediately after the first sitting, sealed; treat as fridge-proofed balls (pull per §4.5). Total dough age from mixing should stay ≤ 36 h for maida (Erik: weak flour 10–12 h at RT; Modenese 48 h in fridge is for stronger flour; handoff: fridge >7 °C = overproof risk).
- Later than ~30 h: **freeze** balls that have had ≥ 4 h in the fridge (Gemignani via #45: freeze after balling + cold ferment; ≤ 2 months). Thaw: fridge 8–12 h then temper per §4.5 (+30 min), or 27 °C water bath 15 min then 1.5–2 h at RT (scale by §4.5 in heat). Do not thaw in a warm oven (Ooni).

### 4.7 Yeast scaling rules the engine can expose

- Keep-schedule rule (when the clock is fixed): multiply IDY by **0.67 per +5 °C** above the recipe's reference temperature (equivalently ÷1.5), floor at 0.3 g for kitchen-scale weighability; Ooni's coarse version: halve yeast above 28 °C.
- Keep-yeast rule (when the clock is flexible): divide every RT phase duration by **1.5 per +5 °C**; poolish counter step by 1.7 per +5 °C.
- Fridge phases: rate ≈ 5–10 % of 25 °C rate (pizzalogic), i.e., 1 h at 25 °C ≈ 10–20 h at 4 °C; for 7–8 °C fridge use ~15 % (Hamelman's factor 3 per 9 °C → 4 °C ≈ 1/12 of 25 °C, 8 °C ≈ 1/5).
- Fresh yeast (true compressed khameer) = IDY × 3; ADY = IDY × 1.33; if the yeast is a bakery starter, do not offer a conversion — flag "unknown strength, test with a small batch".

### 4.8 Humidity / handling rules

- Always: airtight lid or oiled cling film touching the surface; oil ball tops; no damp towels; no holes in the wrap (handoff + #39).
- Monsoon (user toggle or RH > 75 %): subtract 10–15 g water per kg flour and let the mixer add it back only if the dough is stiff.
- After the fridge, wipe condensation and let the surface dry 5 min before stretching; if balls are wet and slack, the fridge was loaded warm — next time cross-stack longer.

---

## 5. Open questions

1. The exact TXCraig1 chart values for 28–35 °C were not retrievable (image behind a JS challenge; BeanAnimal and PizzaBlab keep their fitted equations private). The engine's ×1.5/5 °C rule is a consensus fit, not Craig's exact curve; a 0.01 g scale plus two logged batches at 25 °C and 32 °C would calibrate it.
2. Vito's Facebook "Hot Day" post text was not retrievable (Facebook blocked); the YouTube short gives the method but no yeast grams.
3. No source quantifies fermentation tolerance of weak (W < 200) flour in hours at a given temperature; Erik's "10–12 h at 26 °C" and Ristorazione's qualitative warning are the only anchors. Maida-specific overproof window at 32 °C is unknown — assume ≤30 min after "ready".
4. Whether Islamabad "khameer" from naan bakeries is compressed yeast or a wild starter needs a physical check (grey-yellow crumbly block with a beery smell = compressed; sticky dough-like mass = starter).
5. Fridge temperature drift (3–8 °C) changes poolish and ball timings by ~2×; the app should ask for or default to a measured fridge temperature.
6. AC usage: if Dawood can hold a room at 24–26 °C, the whole hot-band logic collapses to the Normal band — the app should ask "AC room available?" before applying heat rules.
