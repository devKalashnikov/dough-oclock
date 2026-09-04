# Research notes — dimension: avpn-and-classic
Benchmark recipes (AVPN disciplinare + canonical books + Italian masters + "direct method") with exact numbers, normalised to baker's % and IDY%, for checking the deterministic dough engine.

Context: Dawood, Islamabad. CasaKoa gas oven (floor 380–400 °C, dome 450–500 °C, 60–90 s bake). Flour = weak Pakistani maida (est. 9–10.5 % protein, no W rating) + 20 % fine chakki atta. Yeast = Saf-Instant IDY. Established method = Vito-style poolish (250 g flour + 250 g water + 5 g IDY + 5 g honey; 1–2 h RT then 16–24 h fridge), final dough 65–70 % hydration, 3.5 % salt, ~5 % oil, 280 g balls, ball proof ~3–3.5 h at 28 °C. September kitchen 28–34 °C day / 24–27 °C night; winter 12–18 °C; fridge 3–6 °C (drifts to 7–8 °C).

Conversion conventions used below
- Fresh yeast (CY) → IDY: ÷3 (AVPN's own stated ratio, "1 g dry = 3 g fresh"). Many bakers use ÷2.5–÷3; ÷3 is the AVPN number and is used throughout.
- ADY → IDY: ×0.75 (common rule; Gemignani's ADY numbers are marked as ADY).
- "IDY %" = IDY grams / total flour grams × 100 (preferment flour included in total flour).
- Raw scrapes are in `research/raw/` (avpn2024.txt, avpn_bakeovn.txt, avpn_lpcv.txt, caputo_official.md, caputo_us.md, reinhart_fornobravo.md, modernist_neap_table.jpg, forkish_banquet.md, gz_1g.md, pm_54929_gemignani.md, exa_*.txt, fc_*.txt).

---

## 1. Sources consulted

| # | Source | What it is | Credibility |
|---|---|---|---|
| S1 | https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf | AVPN International Regulation, 2024 edition, English (extracted with pdftotext) | PRIMARY (the standard itself) |
| S2 | https://www.pizzanapoletana.org/en/ricetta_pizza_napoletana | AVPN web summary of the regulation (still shows "min 8 – max 24 h", "Mother yeast 5–20 %") | PRIMARY (AVPN's own site, older wording) |
| S3 | https://www.bakeovn.no/wp-content/uploads/2019/09/Vera-Pizza-Napoletana.pdf | Older (c. 2016–2019) English edition of the disciplinare, incl. the worked yeast/time/W example table | PRIMARY (older edition) |
| S4 | https://www.lapizzachevorrei.it/pluginAppObj/pluginAppObj_35_14/download.php?action=download | Same older edition, Italian original ("Il Disciplinare") | PRIMARY (older edition, Italian) |
| S5 | https://www.pizzanapoletana.org/es/archivio_news/593-limpasto_e_la_lievitazione_nel_disciplinare_avpn | AVPN 2016 news article: "L'impasto e la lievitazione nel Disciplinare" (1 L / 50–55 g salt / 3 g yeast / 1.7–1.8 kg; min 8 h from staglio at ~25 °C) | PRIMARY (AVPN editorial) |
| S6 | https://www.mulinocaputo.it/ricette/la-pizza-napoletana/ (EN: /en/ricette/la-pizza-napoletana/) | Molino Caputo official site: Gino Sorbillo's Neapolitan recipe with Caputo Pizzeria | PRIMARY (mill's official recipe) |
| S7 | https://www.mulinocaputo.it/en/product-category/pizza-flour/ | Caputo Pizzeria technical: W 260–280, P/L 0.50–0.60, "8–12 h leavening" | PRIMARY (mill spec) |
| S8 | https://caputoflour.com/blogs/recipes/neapolitan-pizza | Caputo USA (Orlando Foods) official Neapolitan recipe: 1 kg / 640 g / 30 g / 3 g IDY, 24 h fridge | PRIMARY (importer's official recipe) |
| S9 | https://ooni.com/blogs/recipes/ken-forkishs-i-slept-in-but-i-want-pizza-tonight-dough | Forkish "I Slept In" as republished by Ooni (hydration lowered to 64 %) | Secondary, authorised reprint |
| S10 | https://www.anendlessbanquet.com/blog/tag/pizza | Blog reproducing Forkish "I Slept In" original numbers (350 g water @100 °F, 10 g salt, 0.5 g IDY, 500 g flour) with times | Secondary (faithful reproduction, "based very, very closely") |
| S11 | https://www.searching4zen.com/recipes/24-to-48-hour-pizza-dough/ | Forkish "24- to 48-Hour Pizza Dough" (EoP) full numbers | Secondary (verbatim reproduction) |
| S12 | https://www.searching4zen.com/recipes/enzos-pizza-dough/ | Forkish "Enzo's Pizza Dough" (EoP; Enzo Coccia-inspired 10 h RT ball ferment) | Secondary (verbatim reproduction) |
| S13 | https://www.thechoppingblock.com/blog/the-best-homemade-pizza-ive-ever-made | Forkish "48- to 72-Hour Biga Pizza Dough" numbers | Secondary |
| S14 | https://www.wpr.org/food/recipe-overnight-straight-pizza-dough-ken-forkish | Forkish FWSY "Overnight Straight Pizza Dough" (1000/700/20/0.8 g) | Secondary (media reprint) |
| S15 | https://www.saucemagazine.com/places-2/by-the-book-ken-forkishs-same-day-straight-pizza-dough-17334146/ | Forkish FWSY "Same-Day Straight Pizza Dough" (1000/700/20/2 g) | Secondary (media reprint) |
| S16 | https://recipes.oregonlive.com/recipes/saturday-pizza-dough | Forkish "Saturday Pizza Dough" (search snippet only: 350 g water, 15 g salt, 0.3 g IDY, 8 h 20 min) | Secondary; page blocked, snippet only → LOW confidence |
| S17 | https://www.epicurious.com/recipes/food/views/master-dough-with-starter-51255340 | Gemignani "Master Dough with Starter" reprinted from The Pizza Bible | PRIMARY-ish (publisher-authorised excerpt) |
| S18 | https://jayarr.pizza/blog/recipe-gemignani-master-dough/ | Full baker's-% breakdown of Gemignani master dough, tiga, poolish, with/without starter | Secondary (detailed, consistent with S17) |
| S19 | https://www.wineenthusiast.com/recipe/tony-gemignanis-pizza-napoletana/ | Gemignani "Pizza Napoletana" (Pizza Bible) — imperial units only | Secondary, LOW confidence on grams |
| S20 | https://www.pizzamaking.com/forum/index.php/topic,54929.0.html | pizzamaking.com thread on Gemignani Neapolitan dough; HansB and Icelandr RT formulas; TXCraig1 formula quoted | Expert forum |
| S21 | https://www.pizzamaking.com/forum/index.php/topic,26831.0.html | TXCraig1 "Baker's yeast quantity prediction model" (IDY % vs temp vs hours) | Expert forum, PRIMARY for the model |
| S22 | https://www.seriouseats.com/basic-neapolitan-pizza-dough-recipe | Kenji López-Alt "Basic Neapolitan Pizza Dough" (numbers via Exa highlights; site blocks fetch) | PRIMARY (author's recipe) |
| S23 | https://www.seriouseats.com/the-pizza-lab-how-long-should-i-let-my-dough-cold-ferment | Kenji: 10-day cold-ferment experiment, 3–5 days ideal at 38 °F | PRIMARY (author's experiment) |
| S24 | https://www.seriouseats.com/the-pizza-lab-three-doughs-to-know | Kenji: no-knead + ≥3-day cold ferment for Neapolitan | PRIMARY |
| S25 | https://www.seriouseats.com/ask-the-food-lab-whats-the-best-way-to-freeze-pizza-dough | Kenji on freezing dough balls after bulk/cold ferment | PRIMARY |
| S26 | https://modernistcuisine.com/recipes/neapolitan-pizza-dough-recipe-2/ (+ image https://modernistcuisine.com/wp-content/uploads/Neapolitan-pizza-dough-scaled.jpg) | Modernist Pizza "Master Recipe: Neapolitan Pizza Dough" — full table read from the recipe image | PRIMARY (publisher) |
| S27 | https://modernistcuisine.com/mc/understanding-neapolitan-pizza/ | Modernist Cuisine essay: Naples ferments 2–24 h, optional 5–10 h bulk; their 62.3 % / 20–24 h / 3 h method | PRIMARY |
| S28 | https://www.fornobravo.com/pizzaquest/recipe-neapolitan-pizza-dough/ | Peter Reinhart's own post of his American Pie Neapolitan dough (638/425/12.5/3 g IDY) + fridge/freezer rules | PRIMARY (author) |
| S29 | https://www.identitagolose.it/sito/it/167/31134/ricette-dautore/lestate-a-tavola-lisola-di-arturo-di-enzo-coccia.html | Enzo Coccia (La Notizia) direct dough: 1 L / 50 g / 3 g CY / 1.7 kg; 6 h bulk + 6 h balls at 22–25 °C | PRIMARY (chef-supplied recipe) |
| S30 | https://www.identitagolose.it/sito/it/167/27222/ricette-dautore/pizza-margherita-la-ricetta-del-delivery-di-enzo-coccia.html | Coccia delivery variant: 5 g CY + 5 g sugar + 2 cl oil, 10–12 h at 22–25 °C, water 8–12 °C | PRIMARY (chef-supplied) |
| S31 | https://italiasquisita.net/it/posts/pizza-napoletana-la-ricetta-di-enzo-coccia | Coccia video recipe: 0.5 L / 25 g salt / 2.5 g CY; 250 g balls; 12–14 h RT (12–25 °C by season) | Secondary (video summary) |
| S32 | https://farina.tv/it/video/limpasto-base-per-la-pizza-napoletana-di-enzo-coccia | Coccia base dough: 1 L / 50 g salt / 1 g CY | Secondary (video page) |
| S33 | https://www.pizzaontheroad.eu/lezioni-di-pizza-2/ | Franco Pepe interview + recipe: 0.5 L / 800 g type 0 / 22 g / 5 g CY; 4 h bulk + 2 h balls; prefers WEAK W170 flour | Secondary (interview, chef quoted) |
| S34 | https://www.ricetteintv.com/geo-impasto-per-pizza-di-franco-pepe/ | Pepe on RAI Geo: 750 g / 500 ml / 20 g / 4 g CY; ≥8 h at 20–25 °C | Secondary (TV recipe) |
| S35 | https://www.foodandwineitalia.com/impasto-per-pizza-di-franco-pepe/ | Pepe home version: 400 g / 250 ml / 10 g / 3 g dry yeast; 6 h 20 total | Secondary |
| S36 | https://www.ricetteintv.com/impasto-pizza-bonci/ | Bonci (La prova del cuoco): 1 kg / 800 ml / 20 g / 40 g oil / 7 g dry; 18–24 h fridge | Secondary (TV recipe) |
| S37 | https://www.elle.com/it/cucina/primi/a42988555/ricette-pizze-bonci/ | Bonci: 1 kg type 0 W270–330 / 750 ml / 20 g / 20 ml oil / 3 g dry; ~24 h | Secondary |
| S38 | https://blog.giallozafferano.it/ricettechepassione/impasto-pizza-napoletana/ | Home "1 g of yeast" Caputo Pizzeria direct method: 1 kg / 650 g / 25 g / 1 g CY; RT + 12 h fridge + RT; 24–30 h | Secondary (blog, but complete schedule) |
| S39 | https://calcoi.com/calculator/pizza-dough-calculator/ | Calculator page quoting a "Modenese 1990" CY table (2 h@25 °C 30 g … 72 h fridge 0.15 g per kg) | LOW credibility (unverified provenance) — cross-check only |
| S40 | https://www.youtube.com/watch?v=ebPf2BIZWI0 | "Pizza Napoletana tradizionale – seguo il DISCIPLINARE di AVPN" (description: Caputo Pizzeria, 50 g salt, 2 g CY, bulk 6 h at 18 °C, 270 g balls) | Secondary (video description; transcript fetch rate-limited) |
| S41 | https://www.pizzablab.com/the-encyclopizza/poolish-preferment/ | Pizzablab poolish guide: 0.1 % IDY / 0.3 % CY of poolish flour for 8–16 h at ~20 °C | Secondary (well-referenced site) |
| S42 | https://www.pizzablab.com/learning-and-resources/general-articles/pizza-dough-freezing/ | Pizzablab freezing: 1.5–2× yeast, freeze right after kneading; thaw to 15 °C core | Secondary (well-referenced) |
| S43 | https://jayarr.pizza/blog/how-to-freeze-pizza-dough/ | Gemignani's freezing protocol: ball → 24 h cold ferment → freeze ≤2 months; 80 °F water thaw 15 min + 1.5–2 h temper | Secondary |
| S44 | https://www.thepizzacraft.com/dough-and-fermentation/neapolitan-pizza-dough/ | Content site; useful only for its hydration-vs-oven table (60–62 % for 480 °C ovens; 65–70 % for home ovens) | LOW (content farm) |

Facebook/Reddit snippets seen in search results (not opened): "1 kg Caputo Pizzeria, 670 g water, 2 g CY summer / 3 g winter, 26 g salt, 16–20 h" (lievitamente group); "Is 1.5 g IDY a typo in Forkish's 24–48 h recipe?" (Gozney group) — confirms the 1.5 g figure is what the book prints.

---

## 2. Findings with numbers

### 2.1 AVPN International Regulation — 2024 edition (S1), verbatim where possible

Flour (00) "optimal values for long rising times":
```
W                          250-320
P/L                        0,50-0,70 (Ideal 0,6)
Absorption                 55-62%
Stability                  4-12
Falling number             250-400 (max 60)
Dry gluten                 9,5-11,5 g%
Protein                    11,5-13,5 g%
Ashes                      < 0,55
```
Type 0 allowed with W 250–320, P/L 0.55–0.70, absorption 55–62 %, protein 11–13.5 %. "a small amount of wheat flour type '1' is allowed to be added, providing the percentage ranges from 5 to 20%."
Water: "Operating temperature: 16°-22°C optimum", pH 6–7, moderately hard.
Yeast: fresh compressed; "Dry yeast from Saccharomices cerevisiae in the proportion of 1/3 compared to fresh"; natural sourdough allowed; no chemical/improver yeasts.

"2.1.2 Ingredients and recommended amounts — Essential rules: Direct dough making method. Start with water. Never add any fat or sugar to the dough."
Doses per 1 litre water (2024 table, reconstructed from the two-column PDF):
| Item | 2024 value |
|---|---|
| Water | 1 lt |
| Salt | 40 to 60 g |
| Yeast (based on temperature, humidity and timing) | Fresh brewer's yeast 0.1–3 g; dry yeast 1/3 of fresh (1 g dry = 3 g fresh); Sourdough < 10 % on the quantity of flour |
| Flour | 1,600/1,800 g (depending on absorption) |
| Kneading time | add flour until "dough point", per mixer |
| First fermentation | "Let the dough rest to trigger the first fermentation" (no hours given) |
| Staglio | 200 g portion (22–24 cm) – 280 g portion (28–35 cm) |
| Second fermentation and maturation | in proofing box, "room temperature or proofing chamber at controlled temperature and humidity" |
| Overall fermentation times | **min 12 – max 24 hours** (according to flour type, temperature, humidity, time of use) |
"the use of proofing chambers with controlled temperature and humidity level is permitted (ideal parameters 18/20 °C temperature and 60/70% humidity)."
Mixing: start from water; salt and yeast must not be in direct contact > 5 minutes; "The final dough must feel moist, non-sticky, soft and plastic".
Oven: "Base cooking temperature approximately 380–430 °C; Dome's temperature approximately 485 °C"; cooking 60–90 s (older ed. states it explicitly).
Storage: the baked pizza "cannot be frozen or deep-frozen or vacuum-packed"; the regulation says nothing about freezing dough (it assumes continuous same-premises production).

Normalised (using 1,700 g flour per litre = 58.8 % hydration; range 55.6–62.5 %):
- Salt 40–60 g/L → 2.2–3.75 % of flour (at 1.7 kg: 2.35–3.5 %).
- Fresh yeast 0.1–3 g/L → 0.006–0.18 % CY of flour → **0.002–0.06 % IDY**.

### 2.2 AVPN older edition (S3 English / S4 Italian) — the worked example table
```
Recommended levitation time     Min 8 – max 24 hours  (with additional hours of kneading – 4 hours)
Example:
Levitation time (h)   T (°C)   Fresh yeast (g per 1 L water)   Salt (g)   W (flour)
        8               23              1,5                       50       250-280
       24               23              0,3                     50-55      290-310
```
"Fermentation temperature: 23 °C" (dough characteristic, ±10 % tolerance). "Recommended temperature for production: 16–22 °C."
Also: "the amount of yeast used decreases as the amount of water and flour used increases. For example, if 1L of water is used 0.30 g of yeast, of 5 L of water will not use 1.5 g of yeast but about 1 g."
Older doses: salt 40–60 g, CY 0.1–3 g, mother yeast 5–20 % of flour (2024 lowers to <10 %), flour 1.6–1.8 kg; total fermentation min 8 – max 24 h (2024 raises minimum to 12 h).
Normalised: 8 h @ 23 °C → 1.5 g CY / ~1.7 kg = 0.088 % CY ≈ **0.03 % IDY**; 24 h @ 23 °C → 0.3 g CY = 0.018 % CY ≈ **0.006 % IDY**. Note the pairing: longer ferment ⇒ stronger flour (W 290–310 for 24 h vs W 250–280 for 8 h).

AVPN 2016 article (S5): "acqua 1 litro, sale 50–55 gr, lievito 3 gr, farina 1,7–1,8 kg"; fermentation "minimo 8 ore dallo staglio dei panetti a temperatura ambiente (circa 25 °C)" — i.e. at least 8 h *in balls* at ~25 °C, preceded by a first rise on the bench. Normalised: 3 g CY / 1.75 kg = 0.17 % CY ≈ 0.057 % IDY; salt ~3 %.

### 2.3 Molino Caputo — official (S6, S7, S8)
Sorbillo on mulinocaputo.it (S6): "1,55 kg Pizzeria Caputo, 45 g sale, 1 L acqua, 1,5 g lievito" (procedure text says "1 g di lievito naturale"). Bulk ~1 h covered, divide 280 g, bake ~55 s wood oven. Ball-proof hours not stated.
- Normalised: hydration 64.5 %, salt 2.9 %, CY 0.1 % (≈ 0.03 % IDY) [or 0.065 % CY if 1 g].
Caputo Pizzeria spec (S7): "W 260–280, P/L 0,50–0,60 … Perfect for medium-duration leavening (8–12 hours)"; Nuvola for "24 hours or more".
Caputo USA (S8): 1 kg Pizzeria, 640 g water, 30 g salt, 3 g IDY; mix yeast+flour 2 min, +water 5 min, +salt 10–12 min; rest 30 min; six 270 g balls; 1 h RT; fridge 24 h; remove 3–4 h before use; bake 90–120 s at ≥480 °C.
- Normalised: 64 % / 3 % salt / **0.3 % IDY**; total ≈ 0.5 + 1 + 24 + 3.5 ≈ 29 h, of which ~5 h at RT.

### 2.4 Ken Forkish — The Elements of Pizza (EoP) and Flour Water Salt Yeast (FWSY)
All EoP doughs: 500 g flour, 350 g water (70 %), kitchen assumed 70–74 °F (21–23 °C); Forkish controls temperature with WATER temperature and a target dough temperature (DDT), and ends bulk by volume, not clock.

| Recipe | Flour | Water (temp) | Salt | IDY | IDY % | Schedule (stated) | Total |
|---|---|---|---|---|---|---|---|
| "I Slept In But I Want Pizza Tonight" (S10; S9 modified) | 500 g (00) | 350 g @ 100 °F/38 °C (Ooni version: 320 g; 64 %) | 10 g (2 %) | 0.5 g | **0.10 %** | DDT 82 °F/28 °C; rest 20 min; bulk 1.5 h RT; 3 balls (≈287 g; Ooni: 277 g); ball proof 4–6 h RT; fridge if delaying, ≤2 days, 1 h RT after | 6–8 h (Ooni: mix 11:30, ball 13:00, pizza 17:00–19:00) |
| "Saturday Pizza Dough" (S16, snippet only) | 500 g | 350 g | 15 g (3 %) | 0.3 g? | 0.06 %? | 8 h 20 min total | LOW confidence |
| "Enzo's Pizza Dough" (S12) | 500 g (00) | 350 g @ 90–95 °F | 13 g (2.6 %) | 0.1 g | **0.02 %** | DDT 80 °F/27 °C; rest 15 min; knead 2–3 min; bulk 20 min; 3 balls (~275 g; "Enzo's at La Notizia 210–220 g"); **10 h RT in balls**; usable next 3–4 h | ~10.5–14 h, all RT |
| "24- to 48-Hour Pizza Dough" (S11) | 500 g (00) | 350 g @ 90–95 °F | 13 g (2.6 %) | 1.5 g | **0.30 %** | DDT 80 °F; rest 20 min; bulk **2 h at 70–74 °F**; 3 (or 5) balls; **fridge 16–48 h**; out 60–90 min before baking | mix 19:00, ball 21:00, bake next evening (optimal) or day after |
| "48- to 72-Hour Biga Pizza Dough" (S13) | biga: 250 g 00 + 165 g @ 90–95 °F + 0.2 g IDY, 12–14 h RT; final: +250 g 00, +185 g @ 95–100 °F, 13 g salt | total 350 g (70 %) | 13 g (2.6 %) | 0.2 g | **0.04 %** (0.08 % of biga flour) | bulk 45 min RT; fridge 36–60 h | 48–72 h |
| FWSY "Same-Day Straight Pizza Dough" (S15) | 1000 g | 700 g @ 90–95 °F | 20 g (2 %) | 2 g | **0.20 %** | DDT 77–78 °F; autolyse 20–30 min; 1 fold; **bulk ~6 h RT (double)**; five 340 g balls; rest 30–60 min RT; fridge ≥30 min (better overnight) | ~7–8 h |
| FWSY "Overnight Straight Pizza Dough" (S14) | 1000 g | 700 g @ 90–95 °F | 20 g (2 %) | 0.8 g | **0.08 %** | DDT 77–78 °F; 1–2 folds; **bulk ~12 h RT until 2–3× volume** (mix 19:00, divide 07:00); five 340 g balls; fridge ≥6 h; use that evening or within 2 days | ~18–24 h |

Forkish's temperature handling (from these reprints): water at 90–100 °F to hit DDT 77–82 °F; times quoted for ~70–74 °F kitchens; bulk endpoints defined by volume (double / 2–3×). No explicit "per-°C" rule was found in the reprints (open question 1). The blog reproducing "I Slept In" (S10) notes Forkish insists on RT for both rises, and that the author reverted to refrigerating balls because their kitchen was not "room temperature".

### 2.5 Tony Gemignani — The Pizza Bible (S17, S18, S19, S20)
Master Dough with Starter (S17/S18), baker's %:
| Ingredient | g | % |
|---|---|---|
| Flour 13–14 % protein | 453 | 100 |
| Ice water 38–40 °F | 210 | 46.4 |
| Warm water 80–85 °F (for yeast) | 70 | 15.5 |
| Total water | 280 | 61.8 (≈65 % incl. tiga water) |
| Tiga (55 g flour + 39 g water + 0.14 g ADY, 18 h RT, then 30 min fridge) | 90 | 19.9 |
| Diastatic malt | 10 | 2.2 |
| Fine sea salt | 10 | 2.2 |
| EVOO | 5 | 1.1 |
| Active dry yeast | 2.2 | 0.49 (≈0.37 % IDY-equiv.) |
Without starter: ADY 4.5 g (≈1 %; ≈0.75 % IDY-equiv.), water 295 g (65 %). Poolish alternative: 47 g flour + 47 g water + 0.12 g ADY (0.26 % of poolish flour), 18 h RT. Mix; rest 20 min; two 370 g balls; **fridge 24–48 h** (degas & reball at 24 h); temper 1–2 h (S18) / 30 min (S19); tiga keeps ≤8 h in fridge after its 18 h. Gemignani's rule: "one of the worst things you could do … is to make dough today and eat it today"; 24 h good, 36 h better, 48 h best (Talks at Google transcript). He deliberately uses ADY, not IDY, "to keep the proofing process as slow as possible".
Pizza Napoletana (S19, imperial only): poolish "½ tsp ADY, ¼ cup 00 flour, 3 Tbsp cold water, 18 h RT, fridge 30 min"; dough "¾ tsp ADY (≈2.2 g), 3¾ cups 00 flour (≈480–500 g), 1 Tbsp diastatic malt (optional), 3 oz (85 g) poolish, 2 tsp fine sea salt (≈10 g), 10 Tbsp + 2 Tbsp ice water (≈175 g)"; rest 20 min; 3 balls; **fridge 48 h**; 30 min out. (Gram conversion is mine; the 12 Tbsp water looks low for a Neapolitan dough — treat as LOW confidence.)
Freezing (S43): ball → 24 h cold ferment → wrap → freeze ≤2 months; thaw in 80 °F/27 °C water 15 min, temper 1.5–2 h; or fridge overnight 8–12 h + 1–2 h RT.

### 2.6 J. Kenji López-Alt — Serious Eats (S22–S25)
Basic Neapolitan Pizza Dough (S22): "20 ounces bread flour, preferably Italian-style 00; 0.4 ounces kosher salt; 0.3 ounces instant yeast (SAF); 13 ounces water." No-knead: whisk dry, add water, cover, "rise at room temperature for 8 to 12 hours"; divide into 4 balls; deli containers; "refrigerator … at least 2 more days, and up to 4"; remove, re-shape into balls, "rest at room temperature for at least 2 hours before baking".
- Normalised: 567 g flour, 369 g water = **65 %**, 11.3 g salt = 2.0 %, 8.5 g IDY = **1.5 %** (!), balls ≈ 237 g. Total = 8–12 h RT + 48–96 h fridge + 2 h RT. A commenter on the page objects that 1.5 % is far above the ~0.2 % typical of long ferments; Kenji's own cold-ferment article suggests the high yeast is tolerated only because of the fridge.
Cold-ferment experiment (S23): fridge ≈38 °F (3.3 °C); each day a 6 oz piece balled, proofed 2 h at 70 °F, baked; "three to five days of cold fermentation is your best bet"; "loss of quality started to occur around day 6 … By day 10 … barely any rise … off-putting sour flavor". Three Doughs (S24): Neapolitan = no-knead + cold ferment "at least three days and up to five".
Freezing (S25): freeze after bulk (and cold ferment if any), balled, on a sheet, then bag; to use, proof as normal "tacking on an extra couple hours" to defrost.

### 2.7 Modernist Pizza — Master Recipe: Neapolitan Pizza Dough (S26 image, S27)
```
INGREDIENTS                                   WEIGHT    VOLUME     %
Water, 21 °C / 70 °F                          380 g     1 2/3 cups 62.3
Instant dry yeast                             0.24 g    1/8 tsp    0.04
Bread flour 11.5–12.5 % protein, or 00 flour* 610 g     4 1/2 cups 100
Adolph's meat tenderizer (optional)           0.06 g    **         0.01
Fine salt                                     12.15 g   2 1/8 tsp  1.99
Yield ~1 kg; four 30 cm pizzas; Active 15–20 min / Inactive 27 h
*Le 5 Stagioni Pizza Napoletana, Caputo Pizzeria, or Polselli Classica
MIX: water+yeast, add flour (+tenderizer) low speed to shaggy; add salt; medium speed to FULL gluten development (windowpane); DDT 27 °C / 80 °F
BULK FERMENT: 20–24 h at 21 °C / 70 °F; cover well
DIVIDE: 250 g   PRESHAPE: ball, mist, cover
PROOF: 3 h at 21 °C / 70 °F, covered
BAKE (wood/gas pizza oven): preheat 455 °C / 850 °F, 1–1½ min, start rotating when leoparding begins
```
S27 adds: in Naples "doughs proofing anywhere from 2 to 24 hours", some use a bulk of 5–10 h; Modernist chose IDY for reliability; the book also has an "AVPN-style" dough and poolish/cold-proof variants (not published online).

### 2.8 Peter Reinhart — American Pie Neapolitan (S28, author's own post)
"5 cups unbleached all purpose or 00 flour (638 g); 1¾ tsp table salt (12.5 g); 1 tsp instant yeast (3 g); 1¾ cups + 2 Tbsp cool water, 65 °F (425 g)". Mix 1 min, rest 5 min, mix 2–4 min; hand knead 1 min; rest 30 min; ball (227 g or 170 g); oiled pan, cover; "refrigerator to slowly ferment overnight (if making pizza on the same day, allow at least 6 to 8 hours in the fridge). They will keep in the refrigerator for up to three days"; can bulk-retard and ball next day 2 h before; "Remove the dough balls from the refrigerator 2 hours before"; freeze balls in oiled zip bags "up to three months … Move them to the refrigerator the day before … then treat them as refrigerated dough".
- Normalised: **66.6 %** hydration, 2.0 % salt, **0.47 % IDY**; 0.5 h RT + 6–72 h fridge + 2 h RT.
- Reinhart on 00: "gluten content is closer to 9.5 % to 10 % … any recipe can only give an approximation of the water content" — the closest published statement to Dawood's maida situation.

### 2.9 Italian masters
Enzo Coccia (La Notizia, Naples; S29/S30/S31/S32) — all direct, all room temperature, water 8–12 °C:
| Version | Water | Salt | CY | Flour | Hydr. | Salt % | CY % (IDY-eq.) | Schedule |
|---|---|---|---|---|---|---|---|---|
| Traditional direct (S29) | 1 L | 50 g | 3 g | 1.7 kg | 58.8 % | 2.9 % | 0.18 % (0.06 %) | knead 20 min; **bulk ~6 h**, ten 230–250 g balls, **6 h more at 22–25 °C** (12 h) |
| Delivery (S30) | 1 L | 55 g | 5 g + 5 g sugar + 20 ml oil | 1.7–1.8 kg | ~57 % | 3.1 % | 0.29 % (0.10 %) | 10–12 h at 22–25 °C |
| Video 2013 (S31) | 0.5 L | 25 g | 2.5 g | q.b. | – | – | (5 g/L) | 250 g balls; 12–14 h RT, "12–25 °C depending on season" |
| farina.tv (S32) | 1 L | 50 g | 1 g | q.b. | – | – | (1 g/L) | – |

Franco Pepe (Pepe in Grani; S33/S34/S35): S33 "Acqua 0,5 lt, Farina tipo 0 (o 00) 800 gr, Sale 22 gr, Lievito di birra 5 gr" → 62.5 %, 2.75 % salt, 0.63 % CY (≈0.21 % IDY); knead 15–20 min; **bulk 4 h**, balls 100–200 g, **2 h in balls** (6 h total). Pepe: "La farina … dovrebbe essere 0 e debole, cioè con una forza sui 170W" (a WEAK W170 type-0 flour, for a "fragrant" dough), water at room temperature, salt strengthens the gluten. S34 (RAI Geo): 750 g / 500 ml / 20 g / 4 g CY → 66.7 %, 2.7 %, 0.53 % CY (0.18 % IDY), "almeno otto ore" at 20–25 °C. S35 (home, dry yeast): 400 g / 250 ml / 10 g / 3 g dry → 62.5 %, 2.5 %, 0.75 % dry, 6 h 20 total.
Gabriele Bonci (Rome, pan pizza — contrast only; S36/S37): 1 kg type 0 (W 270–330), 750–800 g water (75–80 %), 20 g salt (2 %), 20–40 g oil, dry yeast 7 g (0.7 %, S36) or 3 g (0.3 %, S37); fridge 18–24 h; out 1 h before. Not Neapolitan; shows that even at 0.3–0.7 % dry yeast a 24 h ferment works only because it is refrigerated.

### 2.10 "Direct method" benchmarks: 24 h at RT vs same-day
| Source | Flour | Hydr. | Salt | Yeast | IDY-eq. % | Temp | Bulk | Balls | Total |
|---|---|---|---|---|---|---|---|---|---|
| AVPN older example, 8 h (S3/S4) | W250–280 | ~59 % | ~2.9 % | 1.5 g CY/L | 0.03 % | 23 °C | n/s | n/s | 8 h |
| AVPN older example, 24 h (S3/S4) | W290–310 | ~59 % | ~3 % | 0.3 g CY/L | 0.006 % | 23 °C | n/s | n/s | 24 h |
| AVPN 2016 article (S5) | 00/0 | ~57 % | ~3 % | 3 g CY/L | 0.057 % | ~25 °C | short | ≥8 h | ≥8 h |
| Coccia traditional (S29) | 00 | 58.8 % | 2.9 % | 3 g CY/L | 0.06 % | 22–25 °C | 6 h | 6 h | 12 h |
| Pepe (S33) | 0, W170 | 62.5 % | 2.75 % | 0.63 % CY | 0.21 % | ~20–25 °C | 4 h | 2 h | 6 h |
| Sorbillo/Caputo (S6) | Pizzeria W260–280 | 64.5 % | 2.9 % | 1.5 g CY/L | 0.03 % | n/s | ~1 h | n/s | n/s (Caputo says 8–12 h for Pizzeria) |
| YouTube AVPN-follower (S40) | Caputo Pizzeria | n/s | 50 g/L | 2 g CY/L | 0.04 % | 18 °C bulk | 6 h | 270 g, n/s | n/s |
| GialloZafferano "1 g" (S38) | Caputo Pizzeria | 65 % | 2.5 % | 0.1 % CY | 0.033 % | RT + fridge | 3 folds, 2–3 h RT, 12 h fridge, several h RT | 2–3 h | 24–30 h |
| Facebook lievitamente (snippet) | Caputo Pizzeria | 67 % | 2.6 % | 0.2 % CY summer / 0.3 % winter | 0.07–0.10 % | RT | – | – | 16–20 h |
| Modernist (S26) | 00/bread | 62.3 % | 2 % | 0.04 % IDY | 0.04 % | 21 °C | 20–24 h | 3 h | 23–27 h |
| Forkish Enzo's (S12) | 00 | 70 % | 2.6 % | 0.02 % IDY | 0.02 % | 21–23 °C | 20 min | 10 h (+3–4 h window) | ~11–14 h |
| Forkish Overnight (S14) | white | 70 % | 2 % | 0.08 % IDY | 0.08 % | ~21–23 °C, DDT 25–26 °C | 12 h | fridge ≥6 h | 18–24 h |
| Forkish I Slept In (S10) | 00 | 70 % | 2 % | 0.10 % IDY | 0.10 % | ~21–23 °C, DDT 28 °C | 1.5 h | 4–6 h | 6–8 h |
| Forkish Same-Day (S15) | white | 70 % | 2 % | 0.20 % IDY | 0.20 % | ~21–23 °C, DDT 25–26 °C | 6 h | 0.5–1 h + fridge | 7–8 h |
| HansB, pizzamaking (S20) | 00 | 60 % | 2.8 % | 0.04 % IDY | 0.04 % | 65 °F/18 °C | 24 h | 8 h | 32 h |
| Icelandr, pizzamaking (S20) | Caputo 00 | 64 % | 2.9 % | 0.02 % IDY | 0.02 % | 20–21 °C | 18 h | 6 h | 24 h |
| TXCraig1 model anchor (S21) | – | – | – | 0.05 % IDY | 0.05 % | 70 °F/21 °C | – | – | 12 h |

"Modenese" CY table (S39, LOW credibility) per kg flour at 65 %: 2 h@25 °C 30 g; 4 h@22 °C 10 g; 8 h@22 °C 5 g; 12 h@22 °C 2.5 g; 24 h@22 °C 1 g; 24 h@18 °C 0.5 g; 48 h fridge 4 °C 0.3 g; 72 h fridge 0.15 g → IDY-eq. 1.0 / 0.33 / 0.17 / 0.083 / 0.033 / 0.017 / 0.01 / 0.005 %. Its 12–24 h rows agree with Coccia/Modernist/pizzamaking; its short rows are 2–3× higher than Forkish/Pepe (it targets fully-risen dough in fewer hours).

Poolish yeast benchmarks (for the user's Vito poolish): Pizzablab (S41) 0.1 % IDY of poolish flour for 8–16 h at ~20 °C; Gemignani poolish/tiga 0.25–0.26 % ADY for 18 h RT with COLD water; Forkish biga 0.08 % IDY for 12–14 h RT; JayArr table (secondary) 3–4 h 0.4–0.5 %; 6–8 h 0.2–0.33 %; 12–16 h 0.05–0.2 %; 16–18 h 0.01–0.09 %. Vito's 5 g IDY in 250 g flour = **2.0 %** — 10–20× these, which is only workable because his poolish goes to the fridge after 1–2 h; at 28–34 °C it peaks in ~1 h.

---

## 3. Contradictions between sources and how to resolve them

1. **AVPN minimum time: 8 h (older editions, website, 2016 article) vs 12 h (2024 PDF).** Resolution: the 2024 text is the current standard; for the engine treat 12–24 h as the "AVPN-classic" total window and 8 h as the historical/legal floor. Both editions say max 24 h. For weak maida, the *older* pairing (8 h ↔ W250–280; 24 h ↔ W290–310) is the more useful signal: shorter total time for weaker flour.
2. **Yeast dosage span is enormous: 0.002–0.06 % IDY (AVPN), 0.02–0.04 % (Modernist, Enzo's, pizzamaking RT ferments), 0.08–0.3 % (Forkish overnight/24–48 h, Caputo USA), 0.47–0.75 % (Reinhart, Gemignani ADY-equiv.), 1.5 % (Kenji).** These are not contradictions once you index by *hours at temperature*: RT ferments of 12–24 h sit at 0.02–0.06 % IDY at 18–23 °C; same-day 6–8 h RT sits at 0.1–0.2 % (Forkish, Pepe); anything ≥0.3 % is only used with a fridge (Caputo USA 24 h, Gemignani 24–48 h, Reinhart 6–72 h, Kenji 2–4 days). Rule: yeast% × hours-at-temp is the invariant; the engine must never emit ≥0.3 % IDY for a room-temperature-only schedule.
3. **Hydration: AVPN absorption 55–62 % (2024), Coccia 57–59 %, Modernist 62.3 %, Pepe 62.5 %, Sorbillo 64.5 %, Caputo USA 64 %, Kenji 65 %, Reinhart 66.6 %, Forkish 70 %.** Forkish's 70 % is designed for home ovens / a soft crust with strong-ish flour; Ooni cut it to 64 % for their ovens; S44 (low cred.) generalises: 60–62 % for 480 °C ovens, 65–70 % for home ovens. Resolution for a 480 °C CasaKoa with weak maida: the classic Neapolitan band 60–65 % is the safe default; 70 % is an upper option only if the maida handles it (the handoff shows it does at 65–70 % with oil and 3.5 % salt).
4. **Bulk vs ball split.** AVPN: short bench rest then everything in balls (2016 article: ≥8 h in balls). Coccia: 6 h + 6 h. Modernist: 20–24 h bulk + 3 h balls. HansB: 24 + 8. Icelandr: 18 + 6. Forkish 24–48: 2 h bulk + fridge in balls. Vito/handoff: ball immediately after mixing, 3–3.5 h at 28 °C. Resolution: for ≤12 h RT schedules put ≥50 % of the time in balls (Neapolitan practice); for 20–24 h RT schedules do a long bulk and a 3–8 h ball proof (Modernist/pizzamaking). For weak flour, a long bulk is safer than a long ball proof because weak gluten in a ball slackens/spreads; the poke-test endpoint stays the same.
5. **Sourdough limit 5–20 % (older) vs <10 % (2024).** Irrelevant to this IDY-based engine; noted for completeness.
6. **Cold-ferment length: Kenji 3–5 days ideal, Reinhart ≤3 days, Gemignani 24–48 h, Caputo USA 24 h, Forkish 16–48 h, AVPN max 24 h total (RT).** Resolution: the cold-ferment optimum scales with yeast% and fridge temperature; with a warm home fridge (5–8 °C) and a poolish dough, 16–36 h is the defensible window; ≥3 days requires ≤4 °C and a low-yeast straight dough.
7. **Dry-yeast conversion 1/3 (AVPN) vs 1/2 (nikodouniko et al.).** Use 1/3 for IDY (AVPN, and consistent with Saf's own guidance elsewhere); 1/2.5 for ADY.
8. **Kenji 1.5 % IDY vs everyone else.** Outlier tied to his no-knead + 2–4-day fridge design; do not use as a benchmark for RT steps.
9. **Freezing: AVPN forbids freezing the *pizza* (dough not addressed); Kenji/Gemignani/Reinhart/Baking Steel say freeze balled, fermented dough; Pizzablab says best is freezing immediately after kneading with 1.5–2× yeast.** Resolution for leftover balls (the app's use-case): freeze balled dough *after* its fridge ferment (Gemignani: after 24 h cold), wrapped tight, ≤1–2 months; thaw in fridge 8–24 h, then 1.5–4 h RT (Gemignani 1.5–2 h with 27 °C water bath; Reinhart 2 h; Baking Steel 3–4 h) — at 28 °C kitchens use the short end.

---

## 4. Recommendations for the deterministic engine (numeric, conditional)

A. Fixed formula bands (benchmark-consistent)
- Hydration default **65 %** (range 62–70 %); at 70 % require the poolish/oil variant. Weak maida + 20 % fine atta: absorbs slowly — keep 5 % of the water back and add late (already in the handoff method). Never below 60 % (AVPN floor 55 % is for strong 00).
- Salt **2.8–3.5 %** of total flour (AVPN 2.2–3.75 %; Neapolitans 2.9–3.1 %; Forkish 2–2.6 %). Keep 3.5 % for maida (gluten tightening); if the user chooses ≤6 h same-day schedules drop to 3.0 % (salt slows yeast).
- Oil 0–5 % (AVPN: none; Gemignani 1.1 %; Bonci 2–4 %). Keep the handoff's ~5 % (4 Tbsp/kg ≈ 5.4 %) as a maida-specific softener; label it "not AVPN".
- Ball weight **250–280 g** for 30–33 cm (AVPN 200–280 g; Modernist 250 g; Caputo 270–280 g; Coccia 230–250 g).

B. Yeast as a function of hours and temperature (straight-dough equivalents, IDY % of total flour). Anchors from the benchmarks:
| Schedule (total at stated temp) | IDY % | Benchmarks |
|---|---|---|
| 6 h @ 21–23 °C (same-day) | 0.10–0.20 % | Forkish I Slept In 0.10 % (DDT 28 °C), Same-Day 0.20 %; Pepe 0.21 % CY-eq. |
| 8 h @ 23 °C | ~0.03–0.06 % | AVPN example 0.03 % (pizzeria scale); AVPN 2016 0.057 % |
| 12 h @ 21–25 °C | 0.02–0.06 % | Coccia 0.06 %; Forkish Enzo's 0.02 % (10 h in balls); Craig model 0.05 % @ 21 °C = 12 h |
| 24 h @ 18–23 °C | 0.006–0.04 % | AVPN 24 h 0.006 %; Icelandr 0.02 % @ 20–21 °C; Modernist 0.04 % @ 21 °C; HansB 0.04 % @ 18 °C for 32 h |
| 2 h RT + 16–48 h fridge | 0.30 % | Forkish 24–48 h; Caputo USA (1 h RT + 24 h fridge, 3–4 h out) |
| 0.5 h RT + 6–72 h fridge + 2 h RT | 0.47 % | Reinhart |
| 8–12 h RT + 2–4 d fridge | 1.5 % | Kenji (outlier; do not emulate) |

Temperature scaling to apply between anchors: yeast requirement roughly halves per +5–6 °C (Craig's model and the "Modenese" table both imply ×~0.5 from 18→22–25 °C for the same hours). At Dawood's 28–34 °C, a 12 h all-RT schedule would need ≈0.01 % IDY (0.1 g per kg) — below practical weighing accuracy and with weak flour it will over-ferment anyway ⇒ **the engine should refuse all-RT schedules longer than ~8 h when room temp ≥ 27 °C and route the extra time into the fridge.** Below 20 °C (winter kitchens 12–18 °C) 24 h all-RT is legitimate (HansB 0.04 % @ 18 °C, 32 h) and is the "classic direct method".

C. Weak-flour (maida) corrections to the 00-based benchmarks
- AVPN pairs 8 h with W250–280 and 24 h with W290–310 (S3/S4); Caputo says Pizzeria (W260–280) is for 8–12 h. Maida is almost certainly < W200 (Pepe deliberately uses W170 and ferments only 6 h total; Reinhart notes 00 at 9.5–10 % gluten). ⇒ Cap *effective warm-hours* (hours above ~20 °C after mixing) at ~8 h for the handoff blend, and cap total elapsed time at 24 h; prefer fridge time for flavour instead of longer RT time.
- Prefer bulk-then-ball for anything beyond 6 h; ball only for the last 2–4 h at RT (Pepe 2 h, Coccia 6 h at 22–25 °C on strong flour; the handoff's proven 3–3.5 h at 28 °C).
- With 20 % chakki atta and 3.5 % salt the handoff dough already tolerates 65–70 %; do not raise hydration further for "Forkish 70 %" reasons — that recipe assumes strong flour and a home oven.

D. Poolish policy (the user's confusion #1)
- Keep the poolish (25 % of flour prefermented) as the default flavour engine because it lets the *final* dough stay short and cool — the pattern Gemignani (tiga, 20 % flour, 18 h cold-water RT) and Forkish (biga, 50 % flour, 12–14 h RT) use before a fridge rest. Benchmark yeast for the poolish: 0.1 % IDY of poolish flour for 8–16 h at 20 °C (S41), 0.25 % ADY for 18 h with cold water (Gemignani), 0.08 % for 12–14 h (Forkish biga). The handoff's 5 g in 250 g (2 %) is a Vito-specific "1–2 h RT then fridge" dose; the engine should compute the poolish yeast from the planned RT hours at the stated room temperature: ≈2 % if it goes to the fridge within 1 h at 28–34 °C; 0.4–0.5 % for 3–4 h RT; 0.2–0.33 % for 6–8 h; 0.05–0.2 % for 12–16 h (JayArr/Pizzablab, secondary, consistent with Gemignani/Forkish anchors).
- "No-poolish" branch: use the AVPN/Coccia direct numbers when the user wants same-day (6–8 h) at ≤25 °C (0.1–0.2 % IDY, 3 % salt, 62–65 %), or the Forkish 24–48 h numbers (0.3 % IDY, 2 h bulk, 16–48 h fridge, 60–90 min out) when the user has a fridge day — these are the two best-documented straight-dough schedules.

E. Clock-step benchmarks the engine's output can be checked against
1. Same-day, kitchen 21–23 °C: mix 11:30 → ball 13:00 → bake 17:00–19:00 (Forkish I Slept In, 0.10 % IDY, DDT 28 °C). At 28–34 °C the same dough is ready ~2 h sooner — the handoff's "poolish 7 g, 2.5–3 h + 3–3.5 h" schedule is consistent with this.
2. Overnight fridge: mix 19:00 → 2 h bulk → ball → fridge 16–48 h → out 60–90 min (21–23 °C) or 3–4 h (Caputo USA) before bake (Forkish 24–48 h / Caputo USA). At 28 °C kitchens, 60–90 min out is enough (dough warms fast); at 15 °C use 3–4 h.
3. Classic direct 12 h RT at 22–25 °C: mix → 6 h bulk → 230–250 g balls → 6 h (Coccia, 0.06 % IDY-eq.). Only allow when room temp ≤ 25 °C and flour caveat C applies (cap at 8 h for maida, or use 0.03 % and 8 h as the AVPN example).
4. 24 h RT at 18–21 °C: mix → 18–24 h bulk → 3–8 h balls (Modernist 0.04 % @ 21 °C; Icelandr 0.02 %). Winter-only branch for Islamabad.
5. Leftover balls: fridge ≤ 2–3 days (Forkish 2 d; Reinhart 3 d; Kenji up to 4 d at 3 °C) — pull out 1–2 h before (28 °C) / 2–4 h (≤20 °C). Freezer: wrap after the first 24 h cold, ≤ 2 months (Gemignani), thaw in fridge the day before (Reinhart) then treat as refrigerated dough; expect weaker rise; do not refreeze.
6. Oven line for the app: floor 380–430 °C, dome ~485 °C, 60–90 s (AVPN); Modernist 455 °C 1–1.5 min; Caputo USA 90–120 s at ≥480 °C.

F. Sanity assertions for tests
- 0.002 % ≤ IDY ≤ 0.06 % for any all-RT schedule of 12–24 h at 18–25 °C; 0.1–0.2 % for 6–8 h at 21–25 °C; 0.3–0.5 % only with ≥16 h fridge.
- Hydration 60–70 %; salt 2.5–3.5 %; ball 230–280 g; total elapsed ≤ 24 h RT-equivalent for maida; fridge segment ≤ 72 h; poolish flour 20–30 % of total.
- Yeast scales "less than proportionally" with batch size at pizzeria scale (AVPN: 0.3 g/L → ~1 g for 5 L); for home batches ≤2 kg flour, linear scaling is fine.

---

## 5. Open questions
1. Forkish's explicit kitchen-temperature adjustment text (EoP "Making dough in a warm/cool kitchen") was not retrievable from legal reprints; only his water-temperature/DDT practice (90–100 °F water → DDT 77–82 °F) and volume endpoints were confirmed. If someone has the book, quote the rule verbatim.
2. Forkish "Saturday Pizza Dough" numbers (oregonlive snippet: 350 g water, 15 g salt, 0.3 g IDY, 8 h 20 min) are unverified — the page could not be opened.
3. Gemignani's Pizza Bible "Napoletana" dough exact grams (fresh-yeast/poolish version reported on Facebook as 4.5 g or 7 g) — only an imperial reprint (S19) was found.
4. Modernist Pizza's "AVPN-style" and poolish/cold-proof Neapolitan variants are book-only; their published master recipe (0.04 % IDY, 20–24 h @ 21 °C) is the benchmark used.
5. The AVPN "example" yeast table (8 h 1.5 g/L; 24 h 0.3 g/L at 23 °C) is per litre at pizzeria scale and AVPN itself warns yeast scales less than proportionally; it has not been validated for 1–2 kg home batches — treat as a lower bound.
6. The actual W / P/L of Dawood's maida is unknown; AVPN's 8 h↔W250–280 pairing is the only published time↔strength anchor found. A falling-number/W test of the local maida would let the engine set the warm-hours cap precisely instead of the assumed ~8 h.
7. YouTube S40 transcript (AVPN-follower: 2 g CY/L, 6 h bulk at 18 °C, 270 g) could not be fetched due to rate limits; the ball-proof hours in that video are unknown.
