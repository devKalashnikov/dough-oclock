# Flour strength & fermentation tolerance for Pakistani maida — research notes
Dimension: flour-strength-maida. Researched 2026-09-04 for Dawood (Islamabad; CasaKoa gas oven, floor 380–400 °C, 60–90 s bake; Sunridge-type maida + 20 % fine chakki atta; Vito-style poolish; Saf-Instant IDY).
Raw scrapes are in `research/raw/` (unity.txt = Sunridge/Unity brochure text, avpn2024.txt = AVPN disciplinare text, p_pm12605.txt, p_lehmann_*.txt, t_vito_ferment.txt, e_*.txt Exa dumps, s_*.txt search dumps).

---
## 1. Sources consulted

### Primary (spec sheets, regulations, millers, creator's own words, peer-reviewed)
| # | URL | What it is | Credibility |
|---|---|---|---|
| P1 | https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf | AVPN International Regulations 2024 — flour table (W, P/L, absorption, stability, FN, dry gluten, protein), doses per litre, overall fermentation min 12–max 24 h, ball 200–280 g, oven 430–480 °C, 60–90 s | Primary (standard) |
| P2 | https://unityfoods.pk/assets/pdfs/Unity%20Product%20Brochure%20Mobile-withoutFrozen%2005-03-2026.pdf | Unity Foods / **Sunridge** product brochure dated 05-03-2026 with TECHNICAL PARAMETERS for Super Fine Atta, Super White Atta, Fortified Chakki Atta, Classic Chakki Atta, Fiber-Fit Atta (protein, dry/wet gluten, gluten index, water absorption, ash, moisture) | Primary (manufacturer spec) — the only Pakistani retail flour spec sheet found |
| P3 | https://www.dallagiovanna.it/farine-speciali-far-pizza | Molino Dallagiovanna pizza-flour page: W, P/L and **recommended hours at room temp vs fridge for each flour** | Primary (miller) |
| P4 | https://farinapetra.it/pg23/?bn=farinapetra&codice=10555&ct=card&dfbg=catalogopetra&mt=no&nmm=1&nosh=1&permalink=petra-5063&urlplk=farine-pizzeria | Petra (Molino Quaglia) 5063 spec: W 260–280, P/L 0.55–0.65, protein 12.5–13 %, absorption up to 70 %, "20 °C up to 12 h or +4 °C up to 48 h" | Primary (miller) |
| P5 | https://www.mulinocaputo.it/en/products/pizzeria/ and https://www.mulinocaputo.it/en/categoria-prodotto/farina-per-pizza/ | Caputo Pizzeria: W 260/280, P/L 0.50/0.60, protein 12.5 %; FAQ "ideal for leavening of 8-12 hours"; Nuvola W 260-280 "24 hours or more" | Primary (miller) |
| P6 | https://pmc.ncbi.nlm.nih.gov/articles/PMC4108650/ | Tehseen et al. 2012, J Food Sci Technol — Pizza-Hut-Pakistan-funded study of 11 Pakistani spring wheat varieties milled to flour: protein, wet/dry gluten, SDS, Pelshenke, farinograph, mixograph, pizza sensory | Peer-reviewed |
| P7 | http://v2.pjsir.org/index.php/biological-sciences/article/download/1207/647/1442 | PJSIR — 5 commercial Sindh wheat varieties: protein 11.9–15.5 %, wet gluten 23–39.7 %, gluten index 36.6–85.8 %, farinograph WA 69–73 % (whole-meal), stability 2–11 min | Peer-reviewed |
| P8 | https://jaragri.com/jar/index.php/jar/article/download/569/476 | J Agric Res (Pak) — Inqalab-91 vs AS-2002: wet gluten 30.3 vs 27.0 %, dry gluten 10.3 vs 9.3 %, SDS 30.3 vs 27.3 mL, WA 56 % | Peer-reviewed |
| P9 | http://eprints.hec.gov.pk/3423/1/147S.htm | HEC thesis: 16 Pakistani wheats, SDS, Pelshenke, falling number in straight-grade flour | Thesis |
| P10 | https://doi.org/10.1007/s13197-016-2337-2 | Barrera et al. 2016 — damaged starch 8.9–15 % flours, FN > 400, darker crusts, firmer crumb | Peer-reviewed |
| P11 | https://nuft.edu.ua/doi/doc/ufj/2019/3/8.pdf | Ukrainian Food J 2019 — starch damage 3.15 → 6.13 % raises farinograph WA 60.7 → 63.8 % | Peer-reviewed |
| P12 | https://pizzatoday.com/news/working-with-lower-protein-content-flour/127374/ | Tom Lehmann (Dough Doctor): lower-protein flour — "don't keep more than two days in the cooler", absorption −2–3 %, VWG rule (÷0.60, +1 % water per 1 % VWG) | Expert primary |
| P13 | https://pizzatoday.com/news/how-sugar-affects-dough/130575/ | Lehmann: no sugar for high-temperature bakes; ~1 % only for multi-day cooler storage; honey grades | Expert primary |
| P14 | https://pizzatoday.com/flour-protein/ | Lehmann: protein quantity ≠ quality; 11–11.8 % flours give tender crust; high protein needed only for uncontrolled RT fermentation | Expert primary |
| P15 | https://www.pizzamaking.com/forum/index.php/topic,54971.0.html | pizzamaking.com — Lehmann on unknown/low-protein flours: soft-wheat flour → "18 to 24-hour (CF) range at best", high starch-damage flour → "will not tolerate more than about 60 to 90-minutes of total fermentation" | Expert forum |
| P16 | https://www.pizzamaking.com/forum/index.php/topic,12605.0.html | pizzamaking.com — Pete-zza: protease weakens gluten over time; **more salt slows protease**; re-knead + rest recovers strength; "in the biz … 72 h max" | Expert forum |
| P17 | https://www.pizzamaking.com/forum/index.php/topic,29636.0.html | Pete-zza: autolyse for pizza 10–15 min (Calvel 13–30 min); over-elastic vs over-extensible causes | Expert forum |
| P18 | https://www.pmq.com/flour-protein-dough-fermentation-time/ | Leo Spizzirri (PMQ/North American Pizza & Culinary Academy): protein % vs maturation-time table; weak flour → white crust + gummy crumb | Expert (school) |
| P19 | https://youtubetotranscript.com/transcript?v=4nZ3xXBmHEI | Vito Iacopelli "How to manage the fermentation process" transcript — poolish 300/300/5/5, 1–2 h RT then 16–24 h fridge; at ~27 °C ("80 F") balls ready in 1–2 h, "after two hours it's gonna overproof", 15–20 min rest then fridge in hot weather | Creator primary |
| P20 | https://www.youtube.com/watch?v=u7Hd6ZzKgBM | Vito "Next level pizza dough" description: poolish 300 ml/300 g/5 g yeast/5 g honey; dough +400 ml water, 700 g flour, 30 g salt, 10 g oil (= 70 % hydration, 3 % salt, 1 % oil on 1000 g) | Creator primary |

### Secondary (well-researched blogs, calculators, guides)
| # | URL | What it is | Credibility |
|---|---|---|---|
| S1 | https://www.pizzablab.com/learning-and-resources/flour/ultimate-guide-to-pizza-flour/ | Protein-vs-fermentation-tolerance tables (RT and cold), style table, FN vs oven temp, "1 % VWG → +0.6 % protein", whole-grain ≤ 20 % | Strong secondary |
| S2 | https://www.pizzablab.com/learning-and-resources/fermentation/under-and-over-fermentation/ | Over-fermentation = protease; irreversible; stronger flour = more buffer | Strong secondary |
| S3 | https://www.pizzablab.com/learning-and-resources/fermentation/protease-enzymes-in-pizza-dough/ | Protease mechanics | Strong secondary |
| S4 | https://www.pizzablab.com/learning-and-resources/fermentation/pizza-dough-fermentation-basics/ | Peak windows: 24–72 h cold, 6–10 h RT | Strong secondary |
| S5 | https://www.pizzablab.com/learning-and-resources/flour/damaged-starch-in-flour/ | Damaged starch 4–12 % ideal; >12 % → slack/sticky over time, excessive browning | Strong secondary |
| S6 | https://www.pizzablab.com/learning-and-resources/flour/enzymatic-activity-in-flour/ | Falling-number table; Italian flours 300–400 FN; >350 °C ovens want high FN | Strong secondary |
| S7 | https://www.pizzablab.com/learning-and-resources/ingredients/sugar-in-pizza-dough/ | No sugar above 350 °C; 1–3 % for home ovens; honey ≈ 82 % sugar | Strong secondary |
| S8 | https://pizzaplan.app/en/flour-brands/ | W-range table + 100 brands (Caputo, Dallagiovanna, Polselli, Le 5 Stagioni) | Secondary |
| S9 | https://www.housegardenhobby.com/pizza-flour-guide/ ; https://www.housegardenhobby.com/glossary/falling-number/ | W-vs-hours list; "AP + 70 % hydration = always sticky"; FN zones | Secondary |
| S10 | https://thepizzacraft.com/dough-and-fermentation/neapolitan-pizza-flour/ | W bands; AP at 62–63 % hydration with long cold ferment | Secondary |
| S11 | https://plainpaper.blog/all-purpose-flour-vs-bread-flour-pizza | AP vs bread flour limits table (RT 4–6 h; cold 24–36 h) | Secondary (blog) |
| S12 | https://blog.giallozafferano.it/gaetanacakemania/quanto-tempo-devono-lievitare-i-vari-tipi-di-farina/ | Italian W → optimal maturation hours list; W240 → 60–65 % max hydration, W300 → 70 %+ | Secondary (Italian home blog) |
| S13 | https://www.pizzanapoletanadoc.it/forza-farina-w-impasto-guida-completa/ | Davide Esposito: W bands vs hours | Secondary (pizzaiolo) |
| S14 | https://www.misya.info/guide/come-calcolare-i-tempi-di-lievitazione | W bands vs maturation hours; fridge ≈ double | Secondary |
| S15 | https://pandough.app/en/blog/why-neapolitan-recipes-fail | W bands (180–220 quick; 240–280 ~24 h; 300+ 48–72 h) | Secondary (calculator vendor) |
| S16 | https://www.bapibagelspizza.de/pizzadough/neapolitan-pizza-dough-explained | Weak flour handles well early, "fails in the oven" on long timelines | Secondary |
| S17 | https://www.kpmanalytics.com/blog/water-absorption-capacity-of-flour | Gluten ≈ 2× its weight in water; damaged starch 0.3 → 3×; pentosans up to 15× | Instrument-maker blog |
| S18 | https://revivalmill.com/bran-whole-wheat-baking-guide/ | Bran absorbs 2–3× its weight; coarse bran severs gluten; 1–1½ tsp VWG per cup WW | Secondary |
| S19 | https://bakingsteel.com/blogs/recipes/blogs-recipes-pizza-dough-hydration | Whole-wheat/high-extraction: bump hydration ~3–5 % | Secondary |
| S20 | https://dawghousebakery.com/2020/08/03/upping-the-protein-percentage-of-your-dough/ | Pearson-square VWG formula, VWG 77 % protein, worked example | Secondary |
| S21 | https://foodgeek.io/en/vital-wheat-gluten-calculator/ (+ search snippet) | "1 tsp (~3 g) per cup raises protein ~0.5 %" | Calculator |
| S22 | https://forum.breadtopia.com/t/adding-vital-wheat-gluten-to-bread-flour-how-much/13403 | 1 tbsp VWG per cup flour rule | Forum |
| S23 | https://rvs.umn.edu/Uploads/EducationalMaterials/66b3b6b6-f6d0-4684-a9cc-69f6772f5e13.pdf | U. Minnesota: FN interpretation; pizza target FN 240–270 (malted, US ovens) | University extension |
| S24 | https://dev.bakerpedia.com/ingredients/maida-flour/ | Maida typical composition: protein 10.62 %, "low in protein (gluten)", high extensibility | Industry reference |
| S25 | https://jayarr.pizza/blog/starch-gelatinization-pizza/ | Hard wheat 8–12 % damaged starch; soft <4 %; damaged starch absorbs 2–4× | Secondary |
| S26 | https://www.tandfonline.com/doi/full/10.1080/10942912.2013.772198 (via search) | Gluten Index classes: weak < 30 %, normal 30–80 %, strong > 80 % | Peer-reviewed (quoted via search) |

### Marketplace / price listings (availability as of 2026-09-04)
| # | URL | What |
|---|---|---|
| M1 | https://www.daraz.pk/tag/flour-pizza/ ; https://www.daraz.pk/tag/00-flour-pizza/ ; https://www.daraz.pk/tag/pizza-flour-mix/ | Daraz PK tag pages: Nourcery Italian Style 00 1 kg Rs 1,099; King Arthur 00 Pizza Flour 1 kg Rs 1,275 (product card Rs 1,700); Raw Himalayas 00 1 kg Rs 1,099; Josef Marc 00 150 g Rs 612; Maida 1 kg Rs 209 |
| M2 | https://www.daraz.pk/products/nourcery-italian-style-00-pizza-flour-1kg-doppio-zero-flour-i670314816.html | Nourcery 00 1 kg Rs 1,088, "No Brand", no protein spec on page |
| M3 | https://www.daraz.pk/products/raw-himalayas-00-pizza-flour-1-kg-unbleached-neapolitan-new-york-style-pizza-fritta-sicilian-thin-crust-high-protein-himalayan-flour-i693810227.html | Raw Himalayas 00 on Daraz PK, Rs 1,099 (page body did not render; price from tag page) |
| M4 | https://rawhimalayas.com/products/00pizzaflour ; https://naturessoulshop.com/products/pizza-flour-for-all-kind-pizza-crusts-12-4-protein-unbleached-italian-style-natural-zero-added-preservatives-raw-himalayas-1000gm ; https://www.indiamart.com/proddetail/raw-himalayas-italian-style-00-pizza-flour-2851055160255.html | Raw Himalayas (Bhuntar, Himachal, India): 12.4–12.49 % protein, ₹289/kg retail, ₹85/kg 20 kg bag — Indian product; Daraz listing is a cross-border/import price |
| M5 | https://www.webstaurantstore.com/king-arthur-00-pizza-flour-50-lb/104KAPIZZA.html (via search) | King Arthur 00 Pizza Flour spec: protein 11 % ± 0.4 (KA site says 11.5 %), ash 0.54 %, hard red + soft wheat blend |
| M6 | https://www.daraz.pk/tag/wheat-vital-gluten/ ; https://www.daraz.pk/tag/vital-wheat-gluten-powder/ ; https://www.daraz.pk/tag/vital-wheat-gluten-flour/ ; https://www.daraz.pk/tag/seitan-wheat-gluten/ | VWG on Daraz: NKD Living 1 kg Rs 400; Bob's Red Mill 22 oz Rs 850; "Organic VWG" 1 kg Rs 799; PURIMA 1 kg Rs 350 (25 sold); 400 g Rs 419; MyShape 250 g Rs 319; PURAMIO 300 g Rs 409. HWTC Lahore sells 25 kg bags (Facebook snippet) |
| M7 | https://www.bakeparlorflours.com/product-page/maida-1kg | Bake Parlor (Rasul Flour Mills) Maida 1 kg Rs 274 — no spec published |
| M8 | https://faisal-industries.com/product/313-maida/ | "313 Maida (baking flour No.1)" 50 kg bakery grade; label 13 g protein per 125 g ≈ 10.4 % |
| M9 | https://alshahbazflourmills.com/maida-price-per-kg-pakistan-2026/ | Maida PKR 5,000–7,000 per 50 kg (≈ Rs 100–140/kg), "bakery grade", no spec |
| M10 | https://www.pakistantoday.com.pk/2026/05/16/karachi-raises-official-flour-prices-as-consumers-continue-to-pay-above-notified-rates | May 2026: fine flour ~Rs 140/kg, chakki Rs 150–160/kg |
| M11 | https://www.unityfoods.pk/product-sunridge.html | Sunridge Maida marketing page ("coarsely ground durum wheat" — marketing copy, not a spec) |
| M12 | https://www.metro-online.pk/search/flour ; https://alfatah.pk/collections/flour-price-in-pakistan ; https://www.carrefour.pk/mafpak/en/c/FPAK1701360 | Metro / Al-Fatah / Carrefour flour categories — pages did not render product lists; no "bread flour", "00" or "high protein" product surfaced in search snippets (Carrefour "Flour & Bread Mixes" PKR 149–2,349) |

### Low-credibility snippets (recorded, not relied on)
* Facebook Indian export maida spec: "Water Absorption 58-60 %, Dry Gluten 10-11.5 %, Wet Gluten 26-30 %, SV 19" (https://www.facebook.com/groups/314929823686406/posts/460583105787743/).
* nutriscan.app / 10on10foods: maida 9–10 g protein/100 g (generic nutrition sites).
* Sunridge marketing: "made from coarsely ground durum wheat" — contradicts the brochure; ignore.

---
## 2. Findings with numbers

### 2.1 AVPN reference spec (P1, verbatim from Disciplinare 2024 ENG, §2.1.1–2.1.4)
```
Tipo 00 flour ("optimal values … for long rising times"):
W                          250-320
P/L                        0,50-0,70 (Ideal 0,6)
Absorption                 55-62%
Stability                  4-12
Value index - Caduta E10:  250-400   [falling number, s]
max 60 Falling             [sic — layout artefact of "Falling number"]
Dry gluten                 9,5-11,5 g%
Protein                    11,5-13,5 g%
Ashes                      < 0,55
Tipo 0: W 250-320, P/L 0,55-0,70, Absorption 55-62%, Stability 8-14, FN >250, Dry gluten 9,5-11,5, Protein 11-13,5, Ashes <0,65
"These values are typical of a medium strength flour"
Doses per 1 litre water: salt 40–60 g; fresh yeast 0.1–3 g (dry = 1/3 of fresh); flour 1,600/1,800 g (→ 62.5 % / 55.6 % hydration)
"Never add any fat or sugar to the dough." Water temp 16–22 °C optimum.
Overall fermentation times: "min 12 - max 24 hours (according to the type of flour used and taking into account temperature, humidity and time of use)"; proofing chamber ideal 18/20 °C, 60/70 % RH
Ball 200 g (22–24 cm) – 280 g (28–35 cm); oven 430–480 °C; bake 60–90 s
Mixing: add flour over ~10 min to "dough point", then knead max further 20 min; "Excessive processing … leads to the 'stringing' of the dough".
Salt/yeast direct contact ≤ 5 min.
```

### 2.2 W-index → fermentation-time tables (all verbatim)

**Molino Dallagiovanna (P3, miller table — room temp vs fridge):**
| Product | Type | W | P/L | Room temp (h) | Fridge (h) |
|---|---|---|---|---|---|
| FR Rosa | 0 & 00 | 200 | 0.55 | 3 | 8 |
| E Rosa | 00 | 250 | 0.55 | 6–7 | 12 |
| N Blu | 00 | 290 | 0.55 | 10 | 24 |
| R Verde | 00 | 340 | 0.60 | 12 | 48 |
| S Rossa | 00 | 390 | 0.60 | 16 | 72 |
| laNapoletana | 00 | 310 | 0.60 | — | — |
| Nobilgrano E Rosa | 0 & 1 | 210 | 0.55 | 6–7 | 12 |

**Petra 5063 (P4):** W 260–280, P/L 0.55–0.65, protein 12.5–13.0 %, absorption "fino a 70%", "gestione a temperatura ambiente (20°C) fino a 12 ore, oppure con controllo refrigerato a +4°C fino a 48 ore".

**Caputo (P5 + S8/LAPA table):** Pizzeria W 260–280, P/L 0.50–0.60, protein 12.5 %, hydration 58–65 %, leavening 8–24 h ("ideal for leavening of 8-12 hours" per Caputo FAQ); Cuoco W 300–320, protein 13 %, 65–75 %, 24–72 h; Nuvola W 260–280, 12.25 %, "24 hours or more"; Nuvola Super W 300–320, 13.5 %, 70–80 %, 16–48 h.

**giallozafferano (S12, Italian home-baker table; "maturazione ottimale", fridge prolongs):**
```
W 160 → 2 h | W 180 → 3 h | W 210 → 4 h | W 240 → 6 h | W 280 → 12 h | W 300 → 15 h | W 320 → 24 h | W 380 → 48 h | W 400 → 72 h
Hydration: W 240 → 60/65 % max; W 300 → over 70 %
```
**pizzanapoletanadoc.it (S13):** Up to 4 h → W 180–220; 8–12 h → W 240–280; 24–48 h → W 280–320; >72 h → W 320+. Weak <180, Medium 180–260, Strong 260–350. "A flour too weak in long maturation = collapsed dough".
**misya.info (S14):** W 150–200 → 3–4 h; W 200–250 → 4–8 h; W 250–300 → 8–12 h; W 300–400 → 12–24 h (ambient 20–30 °C; fridge ≈ double).
**pizzaplan.app (S8):** 180–240 weak (biscuits); 240–280 medium "Neapolitan, short ferment (8–24 h)"; 280–320 "Poolish, 24–48 h"; 320–380 "48–96 h"; 380–420 Manitoba. "Weak flour breaks down after just a few hours."
**housegardenhobby (S9):** W 180–240 same-day (2–12 h); 250–280 8–24 h; 280–320 24–48 h; 320+ up to 72 h. "All-purpose flour + 70% hydration: … sticky and impossible to handle."
**pandough (S15):** Weak W 180–220 quick doughs; Medium 240–280 ~24 h; Strong 300+ 48–72 h.
**thepizzacraft (S10):** W 150–220 "OK for very short ferments"; 220–300 pizza; AP (10–11 %) usable with 24–48 h cold ferment at 62–63 % hydration, "85 % of the result of Caputo" in a 900 °F oven.

### 2.3 Protein % → fermentation-time tables
**PMQ / Leo Spizzirri (P18):** 12 h → 10.5–11 % protein; 12–24 h → 11.5–12.5 %; 24–48 h → 12.5–13 %; 48–72 h → 13–14 %; ≥72 h → 14 %+. "Using a flour that is too weak for the process will show signs of gumminess in the crumb and look white on the exterior."
**pizzablab (S1):**
| Protein | Strength | RT window | Cold window |
|---|---|---|---|
| < 10.5 % | Weak (not recommended) | 2–5 h | up to 24 h |
| 10.5–11.5 % | Medium | 2–12 h | ~72 h |
| 11.5–13.5 % | Strong | 4–24 h | 72 h+ |
| 13.5 %+ | Very strong | 4–48 h | 72 h+ |
Neapolitan recommended protein 10.7–12.5 %. FN: >350 °C ovens → low activity, FN > 300.
**plainpaper.blog (S11):** Room temp: bread flour 8–10 h, AP 4–6 h; Cold: bread 72–96 h, AP 24–36 h; "Structure begins to liquefy after the 48-hour mark with lower protein flours"; AP loses ~20 % more volume on stretch.
**Tom Lehmann (P12, P15):** 11 % bread flour replacing 13 %: ball immediately, cooler at once, "don't try to keep the dough for more than two days"; reduce absorption 2–3 % if soft. Unknown soft-wheat flour: "fermentation will need to be kept on the short side … 18 to 24-hour (CF) range at best, and maybe bump up the dough weight slightly". High starch-damage low-protein flour: "will not tolerate more than about 60 to 90-minutes of total fermentation time, after that the dough rapidly turns to soup".
**pizzablab fermentation basics (S4):** peak 24–72 h cold or 6–10 h RT, then diminishing returns / degradation. Lower-protein flour needs *less* protease time to reach ripeness.
**Pete-zza (P16):** protease sensitive to salt — more salt slows gluten weakening; strength "can be recovered by re-kneading … then letting the dough rest again"; professionals push cold proof to 72 h max (strong US flour).

### 2.4 Pakistani flour — measured values
**Sunridge / Unity brochure (P2, TECHNICAL PARAMETERS, verbatim numbers; Exa snippet shows they are stated as "≥"):**
| Product | Water absorption | Protein | Dry gluten | Wet gluten | Gluten index | Ash | Moisture | Intended usage |
|---|---|---|---|---|---|---|---|---|
| Super Fine Atta ("Fine flour with 20% extraction of bran") | 50 % | 10 % | 9.0 % | 24 % | 40 % | 0.8 ± 0.1 % | 12 ± 1 % | Tortilla, crispy paratha, kachori, puri, bread |
| Super White Atta ("long extraction", "easy to knead") | 50 % | 10 % | 9.0 % | 24 % | 40 % | 0.8 ± 0.1 % | 12 ± 1 % | Tortilla, paratha, puri, white bread |
| Fortified Chakki Atta (whole wheat, PESA mill) | 75 % | 11 % | 9.0 % | 24 % | 40 % | 1.4 ± 0.2 % | 9 ± 1 % | Tortillas, breads, roti, cookies, biscotti, **pizza dough** |
| Classic Chakki Atta | 75 % | 11 % | 9.0 % | 24 % | 40 % | 1.4 ± 0.2 % | 9 ± 1 % | same |
| Fiber-Fit Atta | 75 % | 11 % | 9.0 % | 24 % | 40 % | 1.8 % | 8 ± 1 % | high-fibre roti, brown bread, pizza dough |
Notes: no entry for "Sunridge Maida" in the brochure; the ash 0.8 % of the "white/fine atta" products is above maida-grade (AVPN 00 < 0.55, 0 < 0.65), i.e. these are ~85 % extraction flours. The gluten figures look like a single mill-wide floor spec. Gluten index 40 % vs literature classes (weak < 30, normal 30–80, strong > 80, S26) = low-normal. Wet gluten 24 % is below AVPN's dry-gluten floor of 9.5 % (≈ 28–30 % wet). Farinograph WA 50 % vs AVPN 55–62 %.

**Pakistani wheat varieties milled to flour (P6, Tehseen 2012, Table 1 verbatim):**
| Variety | Protein % | Wet gluten % | Dry gluten % | Pelshenke min | SDS mL |
|---|---|---|---|---|---|
| Anmool | 13.9 | 35.8 | 11.5 | 273 | 29.0 |
| Abadgar | 12.8 | 29.8 | 11.7 | 311.6 | 31.2 |
| Imdad | 11.9 | 35.2 | 12.4 | 273 | 31.8 |
| SKD-1 | 13.7 | 38.0 | 11.6 | 287 | 22.6 |
| Shafaq | 12.6 | 31.9 | 10.4 | 360.6 | 38.0 |
| Moomal | 11.5 | 27.2 | 9.1 | 389.2 | 24.6 |
| Sahar | 11.2 | 31.3 | 11.2 | 274 | 28.3 |
| Auqab | 11.2 | 33.9 | 11.0 | 307.6 | 23.1 |
| TD-1 | 10.9 | 30.8 | 9.3 | 157.6 | 15.0 |
| TJ-83 | 11.7 | 34.9 | 10.9 | 306 | 23.4 |
| Kiran | 9.4 | 26.6 | 8.8 | 197 | 18.4 |
Farinograph: DDT 2.3–6.5 min, stability 3.9–18.5 min, MTI 20–80 BU, softening 40–120 BU; Shafaq/Anmool/Auqab/TJ-83 stability > 11 min ("strong gluten group"). Conclusion: Anmool, Abadgar, SKD-1 (Sindh) and Shafaq (Punjab) recommended for pizza.
**Sindh commercial varieties (P7):** protein 11.9–15.5 % (mean 13.6), wet gluten 23–39.7 % (mean 31.3), dry gluten 7–12 %, gluten index 36.6–85.8 % (mean 59.5), farinograph WA 69.1–73.3 % (whole-meal), DDT 2–4.5 min, stability 2–11 min (mean 5.2), softening 30–100 BU.
**Inqalab-91 vs AS-2002 (P8):** wet gluten 30.3 vs 27.0 %; dry 10.3 vs 9.3 %; SDS 30.3 vs 27.3 mL; WA 56 %; AS-2002 "weak gluten … suitable for cookies, cakes".
**Other Pakistani maida indicators:** Faisal Industries 313 bakery maida ≈ 10.4 % protein (label); Bake Parlor no spec; BAKERpedia maida 10.62 % protein (S24); Facebook export spec dry gluten 10–11.5 % (low credibility).
**Interpretation:** Pakistani *wheat* spans weak-to-medium-strong; commercial maida is a straight-grade/patent blend milled for chapati/bakery, landing at ~10–10.5 % protein, wet gluten ~24–28 %, GI ~40–60, farinograph absorption ~50–56 %. Estimated W ≈ 160–220 (no published Chopin data; inferred from protein 10 %, GI 40, WA 50 vs Dallagiovanna W200 and AVPN W250 floors).

### 2.5 Hydration vs strength
* AVPN: absorption 55–62 % for W 250–320 (P1). Caputo Pizzeria 58–65 % (S8/LAPA). Petra 5063 up to 70 % (P4).
* giallozafferano: W240 → max 60–65 %; W300 → 70 %+ (S12). housegardenhobby: AP at 70 % "always sticky" (S9). thepizzacraft: AP 62–63 % (S10). Lehmann: −2–3 % absorption when dropping to lower-protein flour (P12).
* Sunridge fine/white atta farinograph WA 50 %; chakki atta 75 % (P2). Blend 80/20 → nominal 55 %. (Farinograph 500 BU absorption is a stiff-dough reference; pizza doughs run ~5–10 points above it.)
* Whole wheat: bump 3–5 % (S19); bran absorbs 2–3× its weight and coarse bran severs gluten (S18); pentosans up to 15× (S17); whole-grain blends limited to ≤ 20 % (S1).
* KPM: gluten ≈ 2× its weight water; damaged starch 0.3 → 3× (S17).

### 2.6 Vital wheat gluten
* Lehmann rule (P12): (target % − flour %) ÷ 0.60 = % VWG on flour; add +1 % water per 1 % VWG; blend VWG dry into flour. Example 11 % → 13 %: 3.33 % VWG.
* pizzablab: 1 % VWG → +0.6 % protein (S1). Dawg House: Pearson square with VWG 77 % protein; 9.6 % → 14 % needs 65 g VWG per 935 g flour (S20). Foodgeek: 1 tsp (3 g)/cup ≈ +0.5 % (S21). Breadtopia: 1 tbsp/cup (S22). Revival Mill: 1–1½ tsp per cup whole wheat (S18).
* Caveat (P14, P15): protein quantity ≠ quality; VWG restores quantity and tolerance but not extensibility; Lehmann: "a 15 % protein content flour can demonstrate weak gluten".
* Daraz prices (M6): Rs 350–850 per kg → at 3 % (30 g/kg flour) ≈ Rs 10–25 per 1 kg-flour batch.

### 2.7 Damaged starch, falling number, browning, sugar
* Damaged starch ideal 4–12 % (S5); regular flours 5–13 % (P10); hard wheat 8–12 %, soft < 4 % (S25). DS 3.15 → 6.13 % raised farinograph WA 60.7 → 63.8 % (P11). High DS: dough firm at first then goes slack/sticky as amylase frees the water; dextrins → gummy crumb; excessive browning (S5); darker crusts, firmer crumb (P10). Lehmann's diagnostic: soup within 60–90 min = high starch damage (P15).
* Falling number (S6): 150↓ very high activity; 150–220 high; 220–280 ideal general; 280+ low → "ideal for high-temperature baking (350 °C+)"; Italian 00 typically 300–400 FN, unmalted. AVPN FN 250–400 (P1). UMN: pizza 240–270 for US ovens (S23). housegardenhobby: FN > 350 pale crust in home ovens; fix 0.2–0.5 % diastatic malt (S9).
* Sugar: AVPN "never add any fat or sugar" (P1); pizzablab: avoid above 350 °C, 1–3 % for 250–300 °C ovens; up to 5 % speeds yeast; honey ≈ 82 % sugar (S7); Lehmann: high-temp doughs made without sugar; ~1 % only as yeast food for multi-day cooler storage, mostly consumed (P13). Vito's 5 g honey per 300 g poolish flour = 0.5 % of a 1 kg batch, consumed during the 16–24 h poolish (P19, P20).

### 2.8 Vito's own numbers (P19, P20)
Poolish 300 ml water / 300 g flour / 5 g dry yeast / 5 g honey; 1–2 h RT then fridge 16–24 h; yeast stays 5 g "zero to five liters". Final: +400 ml water, 700 g flour, 30 g salt, 10 g oil (70 % hydration overall; 30 % of flour pre-fermented). Poolish can go straight from fridge into the mix. Cold water; 15–20 min rests ×2 then ball; at "80 F … really hot" balls ready in 1–2 h; "after two hours it's gonna overproof … re-ball it"; if using tonight, 15–20 min after balling put in fridge, take out 20 min–1 h before. 100 % poolish dough rises in ~1 h; 50 % poolish 1.5–2 h; 30 % poolish ~2 h (hot day).

### 2.9 Pizza-grade flour and VWG available in Pakistan (checked 2026-09-04)
| Product | Where | Price | Protein | Notes |
|---|---|---|---|---|
| King Arthur '00' Pizza Flour, 1 kg | Daraz PK | Rs 1,275 (tag page) / Rs 1,700 (card) | 11.0–11.5 % (KA spec, ash 0.54) | KA sells 3 lb bags; a "1 kg" SKU implies repacking — verify seal/date. W not published; behaves like ~W 240–260 |
| Raw Himalayas 00 Pizza Flour 1 kg | Daraz PK (import listing) | Rs 1,099 | 12.4–12.49 % | Indian (Bhuntar, HP); ₹289/kg in India, ₹85/kg bulk — Daraz price is ~4× ; availability erratic |
| Nourcery "Italian Style 00 Pizza Flour" 1 kg | Daraz PK | Rs 1,088–1,099 | not stated | "No Brand"; origin/spec unknown — treat as unknown until protein on bag is read |
| Josef Marc 00 150 g | Daraz | Rs 612 | n/a | sample size only |
| Manny's Choice Italian type 0 1 kg | Daraz | n/a | n/a | listing only |
| Jazee "Napolian pizza flour/dough recipe mix" 1 kg | Daraz | n/a | n/a | a mix (contains leavening) — avoid |
| Vital wheat gluten 1 kg | Daraz | Rs 350–800 | ~75–80 % | NKD Living Rs 400, PURIMA Rs 350, "Organic" Rs 799, Bob's Red Mill 22 oz Rs 850; HWTC Lahore 25 kg B2B |
| Bake Parlor Maida 1 kg | bakeparlorflours.com (Karachi delivery) | Rs 274 | n/a | Rasul Flour Mills |
| Loose/bagged maida | mills/retail | Rs 100–140/kg (50 kg Rs 5,000–7,000) | ~10 % | Al Shahbaz, Pakistan Today May-2026 |
| Metro / Al-Fatah / Carrefour | online | — | — | no bread/00/high-protein flour surfaced; category pages did not render. Open question. |

---
## 3. Contradictions between sources and how to resolve them
1. **How long can a ~10 % flour ferment cold?** pizzablab says 10.5–11.5 % flour tolerates ~72 h cold; plainpaper says AP 24–36 h and "liquefies after 48 h"; Lehmann says 2 days max for 11 % under immediate refrigeration and "18–24 h at best" for soft-wheat flour; Dallagiovanna's W200 flour is rated 8 h fridge / 3 h RT. Resolution: the miller table and Lehmann are the authoritative, conservative ends; pizzablab's 72 h applies to a real 11–11.5 % flour with GI > 60. Maida (10 %, GI 40, wet gluten 24 %) sits *below* pizzablab's "<10.5 % → 2–5 h RT / ≤ 24 h cold" row. Adopt ≤ 24 h cold as the hard cap, 8–18 h as the comfortable window.
2. **Room-temp hours.** Italian tables (3–4 h for W 150–200) assume ~20 °C; misya says 20–30 °C; Petra states 20 °C explicitly; AVPN's 12–24 h assumes 18–20 °C chambers. Islamabad kitchens are 28–34 °C, so the same table hours must be shortened. Vito at ~27 °C: balls ready in 1–2 h and overproofed after ~2 h (30 % poolish, 70 % hydration, strong 00 flour). Dawood's validated 3–3.5 h at 28 °C for 25 % poolish at 65–70 % is consistent once his lower yeast/cold water is considered. Resolution: cap the *final dough* at 4–5 h total at 28 °C (mix → oven), 6 h at 22 °C, 8 h at 16–18 °C; express in the engine as temperature-scaled hours (see §4).
3. **Hydration ceiling.** Vito uses 70 %; giallozafferano allows 60–65 % for W240 and 70 % only for W300; housegardenhobby says AP at 70 % is always sticky; thepizzacraft 62–63 % for AP; Lehmann −2–3 %; Sunridge farinograph WA is only 50 % (fine atta) / 75 % (chakki). Resolution: for 100 % maida 58–63 %; with 20 % fine chakki atta add +3–5 (Baking Steel) → 62–66 %; treat 66 % as the ceiling for the blend and 70 % as out-of-band (allowed only with ≥ 2 % VWG). The handoff's 65 % option is inside the band; 70 % is not.
4. **Does 20 % chakki atta help or hurt strength?** Sunridge chakki spec: protein 11 % vs 10 %, same gluten numbers, WA 75 %; Revival Mill: coarse bran severs gluten; pizzablab caps whole-grain at 20 %; BreadStalker: whole wheat ferments faster (more enzymes). Resolution: +1 % protein and more enzymes/sugars (better browning, faster fermentation) but bran cuts gluten — net neutral-to-slightly-negative for tolerance, positive for absorption and colour. Keep at 20 % only with the *fine* atta, and count it as reducing tolerance by ~10 % of hours, not adding.
5. **Sugar/honey.** AVPN forbids sugar; Lehmann/pizzablab: none above ~350 °C; but Vito's poolish uses 5 g honey. Resolution: honey at 0.5 % of total flour inside a 16–24 h poolish is consumed and is not a browning agent; keep ≤ 5 g per 1 kg flour, never in the final dough, and drop it in same-day (short) poolish variants where it would survive to the oven and darken a starch-rich maida crust.
6. **VWG dosing units.** "1 tsp/cup ≈ +0.5 %" (Foodgeek) vs "1 tbsp/cup" (Breadtopia) vs Lehmann ÷0.60 vs pizzablab 1 % → +0.6 %. Resolution: Lehmann/pizzablab agree numerically (0.6 % protein per 1 % VWG); Breadtopia's 1 tbsp/cup ≈ 7 % VWG is a bread-loaf over-dose. Use 0.6 factor.
7. **Gluten-index classes.** Literature: weak < 30, normal 30–80, strong > 80 (S26); other sources use 60–90 "optimal for bread". Sunridge GI ≥ 40 is "normal-low" in both.
8. **AVPN falling number.** 2024 text prints "250-400 / max 60 Falling" (layout artefact); older discussions quote 300–350. Use 250–400 as printed.
9. **AVPN overall fermentation.** An earlier summary of the same document said "min 8 – max 24 h"; the 2024 text itself (§2.1.2 table) says "min 12 - max 24 hours". Use 12–24 h as the 2024 wording; both assume W 250–320 flour at 18–20 °C.
10. **Poolish and weak flour.** Some blogs claim poolish "adds strength" because 70–75 % of the flour is fresh; others (S16, thepizzaheaven) note pre-fermented gluten is already degraded and higher poolish % = softer dough. Resolution: poolish flour counts as *already spent*; the final-dough tolerance clock starts at mixing and should be measured on the fresh-flour fraction; keep pre-fermented flour ≤ 25 % (Dawood's 25 % is the ceiling; Vito's 30 % uses strong flour).

---
## 4. Recommendations for the deterministic engine (numeric, conditional)

### 4.1 Flour model constants (for "maida + 20 % fine chakki atta", no VWG)
* protein_est = 10.2 % (0.8×10 + 0.2×11); wet gluten ≈ 24–26 %; GI ≈ 40–55; W_est = 180 (range 160–220). Treat as **"weak/medium-weak, W ≈ 180"**.
* Farinograph absorption est. 55 % (0.8×50 + 0.2×75). Pizza working hydration band = **62–66 %**, default **64 %**; 100 % maida: 58–63 %, default 61 %; if user selects > 66 % show a warning and require VWG ≥ 2 % or accept "sticky, low-spring" flag; 70 % only with VWG 3 %.
* If the user picks a 00 pizza flour from Daraz (King Arthur 11.5 % or Raw Himalayas 12.4 %) switch the profile to W ≈ 240–260: RT cap ×1.6, cold cap 48 h, hydration 60–65 %, no atta needed.

### 4.2 Fermentation-tolerance CAP for this flour (final dough, clock starts when poolish meets fresh flour)
Base cap defined at 22 °C = **6 h room-temperature-equivalent** (Dallagiovanna W200: 3 h; W250: 6–7 h; pizzablab <10.5 %: 2–5 h; misya W150–200: 3–4 h at 20–30 °C; Dawood's validated 3–3.5 h ball proof at 28 °C after ~1 h mixing/rest = ~4.5 h wall-clock ≈ 7 h @22 °C-equivalent — right at the cap).
Temperature scaling (Q10 ≈ 2, i.e. rate doubles per ~8–10 °C; a derived rule — see open questions): `hours_cap(T) = 6 × 2^((22 − T)/8)`:
| Kitchen temp | Max hours mix→oven (no fridge) | Suggested ball-proof (poke-test window) |
|---|---|---|
| 16 °C | 10 h | 5–7 h |
| 20 °C | 7 h | 4–5 h |
| 24 °C | 5 h | 3–4 h |
| 28 °C | 3.6 h → round to **4 h** | 2.5–3.5 h |
| 32 °C | 2.5 h | 1.5–2.5 h |
| 34 °C | 2.1 h | 1.5–2 h (or ball and refrigerate for 30–60 min mid-proof) |
Cold hours (fridge 3–5 °C): **comfortable 8–18 h, hard cap 24 h** (Dallagiovanna W200 = 8 h; W250 = 12 h; pizzablab ≤ 24 h; Lehmann 18–24 h CF for soft-wheat flour). If fridge reads 6–8 °C, cap 16 h. Any cold period must be followed by a room-temp ball proof, and that proof counts against the RT cap at ~60 %: `RT_used = 0.6 × hours_after_fridge` (dough leaves the fridge at ~5 °C and warms over the first hour).
Absolute ceilings the engine must refuse: RT-equivalent > 8 h @22 °C; cold > 30 h; cold + RT combined "maturation score" > 1.0 where score = RT_hours/hours_cap(T) + cold_hours/24.
Poolish itself (250 g flour/250 g water/5 g IDY/5 g honey): 1–1.5 h at ≤ 28 °C (Vito 1–2 h at ~25 °C; Dawood 1.5 h at 28 °C), then 16–24 h fridge; hard cap 30 h fridge (a collapsed, grey, alcoholic poolish beyond that adds protease/acid load to weak flour — cut it). Pre-fermented flour ≤ 25 % of total.
Bulk vs ball: with this flour, bulk rest ≤ 30–45 min at room temp then ball (balls ferment slower and are the only stage that tolerates the fridge well: 18–24 h on an oiled tray, per handoff, within the 24 h cold cap).
Leftover balls: fridge balls that have already used ≥ 12 h cold → bake within 12 h more; beyond the cap → freeze (freezing stops the protease clock; thaw 8–10 h in fridge then 2–3 h RT, counts as 0.6 × RT).
Salt: keep 3–3.5 % (35 g/kg) — Pete-zza: salt slows protease; AVPN 40–60 g per litre water ≈ 2.5–3.7 % of flour. Do not go below 3 % on this flour.

### 4.3 Mixing rules (weak flour)
1. Cold water (8–12 °C); target final dough temp 22–24 °C in summer (Vito: never warm water; pizzablab FDT drives over-fermentation).
2. Hydrate flour + poolish + 80 % of water 3–4 min on speed 1 → **rest 10–20 min** (Pete-zza: pizza autolyse 10–15 min; Calvel 13–30 min; do not exceed 30 min — long autolyse activates protease on an already weak gluten) → salt → remaining water slowly → knead low speed ≤ 10–12 min; AVPN: max 20 min after dough point; stop at "punto di corda"; over-mixing "strings" the dough.
3. If strandy/tearing: stop, damp towel 15–20 min, knead 3–5 min, repeat ≤ 3 cycles (handoff method; matches Pete-zza's "re-knead and rest" recovery). Never add flour.
4. Oil 3–5 % (30–50 g/kg) after gluten forms; oil softens — with a weak flour prefer 3 % over 5 % if the dough is slack.
5. Ball with oiled hands, seam under, tight surface; balls 250–280 g; if rims are weak, Lehmann: "bump up the dough weight slightly" → use 280 g for 30 cm, not 240 g.

### 4.4 Vital wheat gluten (optional module in the engine)
* Default off. If on: VWG % = (target − 10.2) ÷ 0.6, capped at 3 % of flour. Target 11.5 % → 2.2 % VWG (22 g/kg flour); target 12 % → 3 % (30 g/kg). Add 1 g water per 1 g VWG (Lehmann). Blend VWG into the dry flour before adding poolish/water. Expected effect: RT cap ×1.3, cold cap 36 h, hydration band +2 points. Cost ≈ Rs 8–25 per kg flour (Daraz Rs 350–850/kg).
* Rationale: this is a quantity fix; it will make the dough chewier and more elastic, not "silkier". Use it for event batches that must hold longer, not as a flavour tool.

### 4.5 Browning / sugar module
* At floor 380–400 °C, dome 450–500 °C, 60–90 s: **no sugar in the final dough** (AVPN; Lehmann; pizzablab ≥ 350 °C). Honey only inside a ≥ 12 h poolish, ≤ 5 g per kg total flour; for a same-day poolish (< 4 h) set honey = 0 (unconsumed honey + maida's residual sugars → rim chars before the base sets).
* Maida FN is unknown; Pakistani harvests are dry-season, so sprout damage (low FN) is unlikely; a pale crust at 60–90 s is therefore a fermentation/oven-balance issue, not a sugar deficit. The 20 % chakki atta already adds enzymes/sugars and colour. If the rim stays white with gummy crumb → under-mature or flour too weak for the schedule (Spizzirri) → shorten hydration, not lengthen time.
* Diagnostic in-app: if a batch turns soupy within 60–90 min of mixing → flour has high starch damage (Lehmann) → change brand/mill; if slack after 4 h at 28 °C → normal weak-flour over-fermentation → cap enforced.

### 4.6 Timeline templates (consistent with the caps)
* **A. Same-day (28 °C):** poolish 7 g IDY 2.5–3 h RT (no honey) → mix → 30 min rest → ball → 2.5–3 h proof → bake. Total final-dough clock ≈ 3.5–4 h ≤ cap.
* **B. Recommended:** poolish 5 g, 1–1.5 h RT + 16–24 h fridge → mix → 30 min → ball → 3–3.5 h at 28 °C (2.5–3 h if ≥ 30 °C) → bake.
* **C. Cold-ball (for splitting pizzas over two days):** as B, but ball right after the 30 min rest, 30 min at RT, then fridge ≤ 24 h (cap), out 2.5–3 h before bake at 28 °C. Do *not* combine an overnight bulk cold ferment **and** a long ball proof on this flour without VWG (score would exceed 1.0).

---
## 5. Open questions
1. No published Chopin alveograph (W, P/L) for any Pakistani retail flour; W ≈ 180 is inferred from protein 10 %, GI 40, wet gluten 24 %, farinograph WA 50 %. A single alveograph test at a Faisalabad/NIAB or PCSIR food lab would fix the engine constant.
2. Sunridge "Maida" specifically is absent from the Unity brochure (only Super Fine/Super White Atta are specified); whether their maida is a lower-ash cut of the same mill stream (likely, same gluten floor) is unconfirmed.
3. Falling number / damaged starch of local maida — not published; the 60–90 min "soup" diagnostic is the only field test found.
4. Which mill/brand Toss (F-11) uses — not answerable online.
5. Whether the Daraz "King Arthur 00 1 kg" and "Nourcery 00" listings are genuine/repacked, and their real protein; Raw Himalayas cross-border availability.
6. Metro / Al-Fatah / Carrefour catalogues did not render — an in-store check for "bread flour" or imported 00 (Esajee's, Al-Fatah imported aisle) is still worth doing.
7. The temperature scaling (Q10 ≈ 2, 8 °C doubling) is a derived rule; the yeast/temperature research dimension (TXCraig1 tables, pizzablab yeast calculator) should supply the authoritative curve and the engine should use one shared curve for both yeast dosing and the tolerance cap.
8. Effect of 3.5 % salt on the *rate* (not just protease) — salt at 3.5 % slows yeast vs 2.5 %; needs the yeast dimension to confirm.
