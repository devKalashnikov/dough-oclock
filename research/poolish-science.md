# Poolish science — research notes for the deterministic pizza-dough engine

Dimension: **poolish-science**. Prepared 2026-09-04 for Dawood (Islamabad; CasaKoa oven; maida + 20% fine chakki atta; Saf-Instant IDY; September kitchens 28–34 °C day / 24–27 °C night; winter 12–18 °C; fridge 3–6 °C, drifting to 7–8 °C).

All yeast percentages below are **baker's % of the flour IN THE POOLISH** unless explicitly stated as "% of total flour". Conversions used by the sources: **IDY = fresh × 0.33 (Hamelman, Weekend Bakery) or × 0.40 (Rosada via Pete-zza); ADY = fresh × 0.4–0.5**. Raw page dumps are in `research/raw/`.

---

## 1. Sources consulted

| # | URL | What it is | Credibility |
|---|-----|------------|-------------|
| 1 | https://catalogimages.wiley.com/images/db/pdf/0471168572.excerpt.pdf | Jeffrey Hamelman, *Bread* (Wiley), Chapter 4 "Breads made with yeasted pre-ferments" — official publisher excerpt (text extracted with pdftotext, file `raw/hamelman_ch4.txt`) | **Primary (book)** |
| 2 | https://www.pizzamaking.com/forum/index.php/topic,8910.0.html | Pete-zza quoting Didier Rosada (ex-SFBI) poolish yeast/time profiles; break-point guidance | **Expert forum (Pete-zza)** |
| 3 | https://modernistbread.com/are-biga-poolish-and-sponge-interchangeable/ | Modernist Bread team experiment on preferment hydration; yeast/time equivalence statement | **Primary (Modernist Cuisine)** |
| 4 | https://www.thefreshloaf.com/node/68489/poolish-yeast-percentage-and-duration-harvest-bread-poolish-forkish | Quotes FWSY poolish formula verbatim (500 g flour, 500 g water @80 °F, 0.4 g IDY, 12–14 h at 65–70 °F, "about tripled") + 3 bakers' observed timings | Book quote via expert forum |
| 5 | https://jayarr.pizza/blog/poolish-biga-preferments-pizza/ | Reproduces Forkish poolish, an IDY-vs-hours table, a straight-dough→poolish conversion table, Gemignani note | Blog (pizza-specific, sourced) |
| 6 | https://youtubetotranscript.com/transcript?v=u7Hd6ZzKgBM | Vito Iacopelli "Next level pizza dough — double fermented + poolish" transcript | **Primary (creator's own words)** |
| 7 | https://youtubetotranscript.com/transcript?v=lAFKQoSMbxI | Vito Iacopelli "How to make poolish for beginners" transcript | **Primary (creator)** |
| 8 | https://www.napo.pizza/en/recipes/en-vito-48-poolish | Vito's 48 h poolish recipe written out (300/300/5/5; no yeast in final dough) | Recipe site (Vito-attributed) |
| 9 | https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2010:034:0007:0016:En:PDF | EU Regulation 97/2010 — Pizza Napoletana TSG (direct dough: 1 L water, 50–55 g salt, 3 g fresh yeast, 1.8 kg W220–380 flour; 2 h bulk + 4–6 h balls at 25 °C) — file `raw/eu_stg_pizza.txt` | **Primary (legal spec)** |
| 10 | https://www.kingarthurbaking.com/pro/reference/preferment | King Arthur Baking professional reference on preferments (yeast "as little as 0.1%"; 8 h vs 14–16 h; 65 °F vs 75 °F; ripeness signs) | **Primary-ish (KA pro reference)** |
| 11 | https://www.weekendbakery.com/posts/more-artisan-bread-baking-tips-poolish-biga/ | Weekend Bakery IDY-in-poolish table (8/12/16 h), sugar advice, over-ripening warning | Respected bakers' blog |
| 12 | https://asbe.org/article/poolish/ | American Society of Baking — poolish inoculation table (compressed yeast vs hours) | Industry body |
| 13 | https://www.bakingwiththeory.com/theory/poolish/ | Fresh-yeast vs hours table (1–2 h … 15–18 h) | Blog (professional baker) |
| 14 | https://www.pizzamaking.com/forum/index.php/topic,83618.0.html | "How much yeast for poolish at 24 h in a regular fridge" — TXCraig1: "the chart wasn't designed to work for preferments"; parallei 0.40% IDY straight dough | **Expert forum (TXCraig1)** |
| 15 | https://www.pizzamaking.com/forum/index.php/topic,69355.0.html | "Adjusting yeast percentage when using a pre-ferment" — HansB, American Pie, Gemignani 0.25% | Expert forum |
| 16 | https://www.pizzamaking.com/forum/index.php/topic,78883.0.html | "Neapolitan style with poolish" — TXCraig1 (poolish rare/not allowed for NP), Scott (≤25% of flour, contemporary vs classic NP) | **Expert forum (TXCraig1)** |
| 17 | https://www.pizzamaking.com/forum/index.php?topic=85360.0 | "Why did my poolish fail?" — Vito-style 6 g/300 g fridge poolish failures; fix = 1.5–2 h at RT until rising aggressively before fridge | Forum (practical failure data) |
| 18 | https://www.pizzamaking.com/forum/index.php?topic=10237.0 | TXCraig1 "Reverse engineering UPN dough" — over-fermented preferment "dissolved the gluten in the final dough into a useless wet sloppy mass"; preferment 2.4–2.5× rise | **Expert forum (TXCraig1)** |
| 19 | https://www.pizzamaking.com/forum/index.php/topic,48828.0.html | Tom Lehmann + Pete-zza on sweeteners; sugar >~5% exerts osmotic pressure on yeast | **Expert forum (Lehmann)** |
| 20 | https://www.thefreshloaf.com/node/68346/pizza-poolish-looking-right-amount-yeast | Long thread dissecting Vito's "5 g regardless of scale"; 0.1%/12 h rule; worked example; 6-dimensional yeast/time/temp discussion | Expert-ish forum |
| 21 | https://www.thefreshloaf.com/node/1345/how-long-will-poolish-keep-refigerator | Reinhart BBA "good for three days in the fridge"; 3-day-old poolish used successfully | Forum |
| 22 | https://www.thefreshloaf.com/node/11964/poolish-fridge-or-counter | Warm-climate baker: poolish collapses after doubling; advice = refrigerate once doubled, re-warm to ~24 °C before use | Forum |
| 23 | https://www.thefreshloaf.com/node/18605/too-hot-rising-bread-doubling-20-minutes | 30 °C kitchen: use 1/3–1/4 the yeast, preferably in a preferment; fridge overnight; DDT water-temp formula | Forum |
| 24 | https://www.thefreshloaf.com/node/26492/slowing-down-poolish | Tricks to slow a poolish (chilled flour/water, salt, cooler spot); "cross" marks on surface = break point | Forum |
| 25 | https://www.thefreshloaf.com/node/27341/proofing-yeast-longer-increase-yield | Debate on whether yeast multiplies in a poolish (yes, but slowly; needs hours not minutes) | Forum |
| 26 | https://fond.kitchen/glossary/poolish/ | Ripeness timeline table (0 → 20+ h), yeast table (0.3/0.1/0.05 g per 100 g at 20–22 °C), fridge hold ≤24 h, PFF% table | Blog (well organized) |
| 27 | https://thedoughformula.com/fundamentals/preferments-101/ | Timing table, 27 °C poolish peaks in 5–6 h, refrigerated poolish "usable within 12 hours of falling", keep PFF 20–30% if timing unreliable, poolish 0.5% / final 0.2–0.3% baguette example | Blog |
| 28 | https://pizzalogic.app/blog/how-to-make-poolish-pizza-dough/ | Worked pizza example (188/188/0.15 g + final 0.50 g), poolish yeast = 10–20% of total, fridge trick 8–12 h, usable window 1–2 h, AP flour → shorten poolish 1–2 h | Calculator blog |
| 29 | https://jordospizzacalculator.com/guides/poolish-pizza-dough | Temperature-banded table (18–20 / 20–24 / 24–28 °C), PFF impact table, hot-weather rule | Calculator blog |
| 30 | https://www.pizzablab.com/the-encyclopizza/poolish-preferment/ | 0.1% IDY / 0.3% fresh at ~20 °C for 8–16 h; do NOT ferment poolish in fridge; collapsed poolish → don't use | Blog (pizza-science oriented) |
| 31 | https://bakecalcs.uk/bread-and-dough/poolish-calculator/ | Restates Weekend Bakery/King Arthur schedule; grams-per-kg conversions | Calculator |
| 32 | https://bakersmath.co/poolish-calculator | 18 °C/14 h ≈ 24 °C/8–9 h equivalence; fridge-retard poolish 8–16 h at 3–6 °C "use a bit more yeast" | Calculator |
| 33 | https://milkandpop.com/baking-with-poolish/ | Rosada-style table (3 h 3 g / 6–8 h 1.4 g / 12–15 h 0.2 g IDY per 200 g) at 27–29 °C with 16 °C water; ≤50% PFF | Blog |
| 34 | https://mypizzacorner.com/pizza-dough/easy-poolish-pizza-dough-recipe-neapolitan-poolish-pizza/ | 0.2% IDY ≈ 10 h at 20 °C; colder → 0.3%, warmer → 0.1%; no yeast in final dough; 8–10 h ball proof | Blog |
| 35 | https://www.weekendbakery.com/posts/pizza-dough-with-a-poolish/ | Pizza with poolish: 100/100/0.3 g (8 h) or 0.2 g (12 h) or 0.1 g (16 h); final dough +5 g IDY per 250 g flour | Bakers' blog |
| 36 | https://www.chainbaker.com/preferment-conversion/ | Conversion rule: preferment 10–20% of flour in bread; poolish 0.08–0.1% yeast; subtract from final | Blog (ChainBaker) |
| 37 | https://www.panary.co.uk/poolish/ | Paul Merry: poolish flour 15–50% of total; 0.1% fresh for 8–10 h+ in a warm bakery | Professional baker |
| 38 | https://www.seriouseats.com/pizza-protips-pre-ferments-breadmaking-tips | Serious Eats pre-ferment primer: more yeast is usually added at final mix "but not always" | Magazine |
| 39 | https://www.bakeinfo.co.nz/facts/bread/bread-ingredients/yeast-in-breadmaking-and-baking/ | NZ Baking Industry Research Trust: yeast can bud every ~90 min under ideal conditions; oxygen limited in dough | Industry education |
| 40 | https://onlinelibrary.wiley.com/doi/10.1111/jtxs.12124 | Angioloni & Collar, *J. Texture Studies* — biga-type vs poolish-type vs direct dough rheology | **Peer-reviewed** |
| 41 | https://pubmed.ncbi.nlm.nih.gov/24387860/ | Rezaei et al. 2014 — yeast harvested in exponential phase has LOWER fermentation capacity than stationary phase | **Peer-reviewed** |
| 42 | https://khymos.org/2020/11/15/how-much-yeast/ | Khymos (Martin Lersch): direct dough 1 kg flour needs 0.48 g IDY for 20 h at 20 °C (PizzApp+) | Science blog (direct dough only) |
| 43 | https://cooking.stackexchange.com/questions/99283/poolish-deflated-after-refrigeration | Poolish that had risen 10 h at RT deflated in fridge — "exhausted its food; fridge accomplished nothing" | Q&A |
| 44 | https://www.hayzedmagazine.com/food-and-drink/vito-iacopelli-honey-poolish-recipe/ | Content-farm article on Vito's honey (claims 20–30% faster) | **Low credibility — content farm; quoted only to flag** |

---

## 2. Findings with numbers

### 2a. Pre-fermented-flour percentage (PFF) and its effects

| Source | Recommendation | Stated effect |
|---|---|---|
| Hamelman *Bread* (all poolish formulas in ch. 4) | Baguettes with Poolish: 3.3 kg of 10 kg flour = **33%** prefermented | "increased extensibility… increased loaf volume"; protease activity high in loose poolish |
| Rosada via Pete-zza (pizzamaking 8910) | Poolish = **20–80% of formula water** | "more acids… crust color, flavor, aroma… at the expense of a more elastic gluten mesh (stronger dough) and a higher risk of sugar depletion" → may need 0.5–1% sugar/malt in final mix for browning |
| Forkish FWSY / Elements of Pizza | **50%** (500 g of 1000 g) | "buttery" flavour; several bakers report very slack/"liquidy" dough with AP flour at 75% hydration (TFL comments) |
| Vito Iacopelli | 300 g of 1000 g = **30%** | (no stated rationale) |
| Scott (pizzamaking 78883) | "going over **25%** of the recipe flour in the poolish isn't the safest idea… nice flavor boost from less" | Neapolitan context |
| TXCraig1 (78883) | Poolish for Neapolitan "extremely uncommon… not even allowed" (EU TSG is direct dough) | opinion of the forum's leading NP practitioner |
| Panary (Paul Merry) | **15–50%** | |
| ChainBaker | **10–20%** for bread | |
| Dough Formula | 20–40% typical; **keep 20–30% if you cannot time the peak reliably** ("margin for error is wider") | large past-peak preferment → "significant negative impact" |
| Jordo's / Pizzalogic | 20% subtle · **30% recommended** · 40% strong · 50% "sourdough-like tang"; >50% "too acidic and weak / hard to handle" | |
| Fond | 15–20% subtle · 25–35% "poolish pizza" · 40–50% highly extensible (Roman) | |
| Weekend Bakery | over-ripening "will kill the gluten… especially… up to 50%"; chewiness increases with PFF up to ~50% | for pizza they recommend **20–30%** |
| Angioloni & Collar (J. Texture Studies) | poolish-type dough vs biga vs direct: fermentation increases resistance to extension and decreases extensibility over time; biga stiffest/lowest volume | peer-reviewed, qualitative for our purposes |

**Weak-flour adjustment (maida):** Pizzalogic explicitly says with lower-protein AP flour "reduce the poolish fermentation time by an hour or two to limit gluten breakdown"; Weekend Bakery and TXCraig1 both describe over-ripe preferments destroying gluten. Vito himself says (beginners video) "the more long is the fermentation the stronger needs to be the flour" and uses W280 for a 16–24 h poolish. → For 9–10.5% maida keep PFF at **20–25%** (Dawood's 250 g/1 kg = 25% is at the top of the safe band), never 30%+, and never use a collapsed poolish.

### 2b. Yeast dose in the poolish vs hours and temperature — every table found

**Hamelman, *Bread* p. 96 (fresh yeast, room 70–75 °F = 21–24 °C, % of poolish flour):**

| LENGTH OF RIPENING | % YEAST (fresh) | → IDY (×0.33) |
|---|---|---|
| Up to 8 hours | .7 to 1% | 0.23–0.33% |
| Up to 12 hours | .3 to .6% | 0.10–0.20% |
| Up to 16 hours | .1 to .25% | 0.033–0.083% |

Hamelman temperature note, verbatim: "The amount of yeast necessary for a poolish to ripen in 16 hours at 80°F might be .08 percent of the poolish flour weight, but the same poolish might need .25 percent yeast at 65°F." (fresh yeast; 80 °F = 26.7 °C, 65 °F = 18.3 °C → **3.1× yeast for 8.4 °C cooler**). Also: yeast in poolish/biga "generally in the .08 to 1 percent range"; all his formulas use **0.2% fresh** in the preferment (≈0.067% IDY) for 12–16 h; instant = fresh × 0.33; ADY = fresh × 0.4. Home-scale advice: "Use a speck of instant yeast… If the pre-ferment ripens in 10 hours and you had hoped it would need 16 hours, use a smaller speck or a cooler ripening temperature next time."

**Didier Rosada (SFBI) via Pete-zza, pizzamaking 8910 (fresh yeast, % of poolish flour, room 80–85 °F = 27–29 °C, water 60 °F = 16 °C):**

| Prefermentation | Fresh yeast | → IDY (Pete-zza: ×0.40) |
|---|---|---|
| 3 hours | 1.5% | 0.60% |
| 7–8 hours | 0.7% | 0.28% |
| 12–15 hours | 0.1% | 0.04% |

(Milk & Pop reproduces the same profile as grams IDY per 200 g flour: 3 h → 3 g (1.5%!), 6–8 h → 1.4 g (0.7%), 12–15 h → 0.2 g (0.1%) — they appear to have relabelled Rosada's fresh-yeast numbers as IDY; treat Milk & Pop's short-time values as ~2.5× too high.)

**American Society of Baking (compressed yeast, % of poolish flour):**

| Compressed yeast | Fermentation time (h) |
|---|---|
| 3 | 1–2 |
| 1.5 | 3–4 |
| 0.8 | 7–8 |
| 0.25 | 12–15 |

ASB example formula: sponge/poolish 30% flour, 100% hydration, **instant yeast 0.7%** (short sponge), dough side 1.0% instant.

**Baking With Theory (fresh yeast, % of poolish flour):** 1–2 h → 2.5–3%; 4–5 h → 1.5%; 7–8 h → 0.5%; 10–12 h → 0.2%; 15–18 h → 0.1%.

**Weekend Bakery (IDY, % of poolish flour; "summer/warm" = low end, "winter" = high end):**

| Poolish made … in advance | IDY |
|---|---|
| up to 8 h | 0.23–0.33% |
| up to 12 h | 0.10–0.20% |
| up to 16 h | 0.03–0.08% |

Worked example: 200 g flour, 12 h, summer → 0.1% → **0.2 g IDY**. 1 tsp IDY = 3.1 g; ¼ tsp = 0.78 g. "for fresh yeast multiply the amount by 3". (BakeCalcs attributes the same schedule to King Arthur Baking and adds: 4 h ≈ 0.6%, 8 h ≈ 0.25%, 12 h ≈ 0.15%, 16 h ≈ 0.05%.)

**Weekend Bakery pizza-with-poolish:** 100 g flour + 100 g water + 0.3 g IDY for 8 h, 0.2 g for 12 h, 0.1 g for 16 h; final dough adds **5 g IDY per 250 g flour** (a fast same-day dough, 1 h ball rest).

**Forkish FWSY / Elements of Pizza:** 500 g flour, 500 g water at **80 °F (27 °C)**, **0.4 g IDY = 0.08%**, "overnight temperature between 65 °F and 70 °F (18–21 °C)… When fully mature, 12 to 14 hours later, the poolish should be bubbly and about tripled in volume." Observed by TFL bakers: at 21–23 °C it doubled in 11 h; at 19–21 °C doubled by 13 h and plateaued (called done at 17.5 h); one baker's 0.1% IDY poolish at 21 °C is ripe at ~14 h (doubled, not tripled); another saw 3.5 cups → 8–9 cups in 12 h.

**JayArr (IDY, % of poolish flour, ~room temp):** 3–4 h → 0.4–0.5%; 6–8 h → 0.2–0.33%; 12–16 h → 0.05–0.2%; 16–18 h → 0.01–0.09%.

**Fond (IDY per 100 g flour at 20–22 °C):** 8 h → 0.3 g (0.3%); 12 h → 0.1 g (0.1%); 16 h → 0.05 g (0.05%).

**Jordo's (IDY % of poolish flour by room temperature):**

| Room temp | IDY | Ferment time |
|---|---|---|
| 18–20 °C | 0.1% | 12–16 h |
| 20–24 °C | 0.1% | 8–12 h |
| 24–28 °C | **0.05%** | **6–8 h** |

**Pizzablab:** 0.1% IDY / 0.3% fresh for 8–16 h at ~20 °C; "if your kitchen is significantly warmer than 20 °C… reduce the yeast further or shorten the fermentation time."

**My Pizza Corner:** 300/300/0.6 g IDY = **0.2% ≈ 10 h at 20 °C**; colder room → 0.9 g (0.3%); warmer → 0.3 g (0.1%).

**Dough Formula:** 200/200 with 0.2–0.5 g IDY (0.1–0.25%) for 8–14 h at 20–22 °C; at 18 °C may need 14–16 h; **at 27 °C "may peak in 5 to 6 hours"**.

**Modernist Bread:** "With a 100% hydration poolish, you can expect similar results from a 3-hour preferment containing 0.45% yeast to one made with 0.25% yeast but fermented for 8 hours."

**BakersMath:** "A poolish fermented at 65 °F (18 °C) for 14 hours will reach the same ripeness as one fermented at 75 °F (24 °C) for 8–9 hours." Poolish yeast 0.05–0.2%; fridge-retarded poolish 8–16 h at 3–6 °C: "use a bit more yeast".

**Panary:** commercial bakery, 8–10 h+: **0.1% fresh** (1 g/kg); home bakers "a little more"; overnight = "green pea" of fresh yeast, cold or <8 h = "marrow-fat pea"; dried yeast "1/8 or 1/10 teaspoon".

**Vito Iacopelli (transcripts):** (a) "Next level" video: 300 ml water + 5 g honey + **6 g fresh OR 5 g dry yeast** + 300 g 00 flour → **1 h room temp → fridge 16–24 h** → poolish "a little bit flat… this is all normal" → wait ~30 min → final dough 700 g flour + 400 ml water + 25 g salt + 10 g oil, **no extra yeast** → bulk in fridge 16–24 h → 250 g balls → 2 h RT ("if it's hot it may take also only one hour"). (b) Beginners video: **300 ml cold water + 3 g dry yeast + 3 g honey + 300 g W280 flour**; 1 h RT then fridge 16–24 h; "if the poolish past the 24 hours starts to get acid, it's not good anymore"; "the more long is the fermentation the stronger needs to be the flour". Napo.pizza writes the same recipe with 5 g fresh yeast and no yeast in the final dough. → **Vito's poolish carries 1.0–1.7% IDY of poolish flour = 0.3–0.5% IDY of TOTAL flour**, i.e. 10–30× the classical overnight poolish dose. By the ASB/Baking-With-Theory tables that inoculation peaks in **1–2 h at room temperature** — which is exactly why he refrigerates after 1 h and why it arrives "flat".

**Dawood's current doses** (context-handoff): 5 g IDY / 250 g = **2.0%** (16–24 h Vito schedule), 7 g = **2.8%** (same-day), 3 g = **1.2%** (hot-weather long). All are sponge-class inoculations, not poolish-class.

### 2c. What a poolish looks like at peak vs collapsed; holding in the fridge

- **Hamelman:** ripe = "surface covered with small bubbles… bubbles breaking through to the surface"; "If there is evidence that the poolish has risen and then collapsed (you may see a 'high-water' mark on the sides of the bowl), then the poolish is past its prime." Stiff biga/pâte fermentée ripe when "domed and just beginning to recede in the center".
- **King Arthur pro reference:** "fully risen and just beginning to recede in the center… In [a poolish] ripeness is indicated when the surface… is covered with small fermentation bubbles… a pleasing aroma that has a perceptible tang… A sluggish and undeveloped preferment, or one that has gone beyond ripeness, will yield bread that lacks luster, and suffers a deficiency in volume and flavor."
- **Rosada/Pete-zza:** wait for "the break point (the point at which the top of the poolish collapses into itself and then recedes), or a short period thereafter". (TFL 26492: break point shows as "cross indentations" on the surface, at >3× volume for 100% hydration.)
- **Fond ripeness timeline (at 20–22 °C, 0.1% IDY):** just mixed → thick paste; 4–6 h small bubbles, rising; **8–12 h very bubbly, domed, 2–3×, fruity/sweet = ripe**; 14–16+ h surface flattening/caving, stronger tang + alcohol = past peak but usable; 20+ h collapsed, watery, concave, harsh alcohol = discard.
- **Pizzablab:** ready when "at least doubled… a 'dome' with small air bubbles"; over-fermented = "significant collapse… residual marks on the sides… very sour/alcoholic smell… best not to use it… excessive gluten breakdown, resulting in weak and sticky dough." **"Poolish has a narrow usability window."**
- **Pizzalogic:** "usable window of roughly 1–2 hours around peak"; "high, active dome = still going; completely collapsed, concave = past peak".
- **TXCraig1 (10237):** preferment allowed to over-ferment overnight at 15–18 °C → "The enzymes and acids… dissolved the gluten in the final dough into a useless wet sloppy mass." Ripe preferment rose 2.4–2.5×.
- **Forkish:** "about tripled".
- **Fridge holding after peak:** Fond & JayArr "up to 24 hours"; Pizzalogic "buys an additional 8–12 hours"; Dough Formula "usable within 12 hours of falling"; Gemignani (via JayArr) "store up to 8 hours refrigerated"; Reinhart BBA (via TFL 1345) "good for three days"; a TFL baker used a 3-day-old fridge poolish successfully; Vito "past 24 hours starts to get acid"; Hamelman (pâte fermentée, fully yeasted) "if not used within about 6 hours, it must be refrigerated… it will completely lose its vigor". Stack Exchange: a poolish that had already risen 10 h at RT "probably exhausted all of its food… the fridge did not accomplish much." Pizzablab: fermenting the poolish IN the fridge "is not recommended" (flavour development suppressed) — contradicts Vito/BakersMath.

### 2d. Yeast in the final dough when the poolish already carries yeast; yeast growth in a poolish

- **Hamelman Baguettes with Poolish:** total yeast **1.1% fresh of total flour**, of which the poolish gets 0.2% of its own (33%) flour ≈ 0.07% of total; i.e. the final dough still receives ~1% fresh (0.34% IDY) and bulk-ferments 2 h + proofs 1–1.5 h at 24 °C. **The poolish does not replace the final-dough yeast in his system.**
- **ASB:** sponge 0.7% instant + dough 1.0% instant.
- **Weekend Bakery pizza:** 0.1–0.3 g IDY in a 100 g-flour poolish + **5 g IDY** in the 250 g-flour final dough (2%!, 1 h proof).
- **JayArr conversion:** straight dough 1.5 g IDY/500 g → with a 20% poolish (0.15 g IDY in poolish, 12–18 h) the final dough gets **0.8 g** — "reduced by 40–50% due to the active starter culture".
- **Pizzalogic:** poolish 188 g flour/0.15 g IDY (0.08%, 14 h @21 °C) + final 0.50 g IDY on 440 g flour → total 0.65 g on 628 g = 0.10% of total flour; "poolish yeast… typically around 10–20% of the total"; total yeast "ends up close to what a direct dough would use for the same fermentation schedule".
- **Dough Formula:** "The final dough either gets no additional commercial yeast or a much smaller amount than a same-day formula needs… A typical baguette with poolish uses around 0.5% commercial yeast in the poolish and 0.2 to 0.3% in the final dough."
- **HansB (pizzamaking 69355):** "only .1%, or less in the poolish, then your normal amount in the final dough. I don't take the yeast in the poolish into account… as it's pretty much used up in my 24 hour RT poolish." American Pie: NP 48 h CF at 4 °C = 0.3% yeast; poolish addition 0.1%, biga 0.2%, no adjustment. Gemignani Pizza Bible poolish 0.25%, 18 h RT.
- **Vito / Napo / My Pizza Corner:** **zero yeast in the final dough**; the poolish is the entire leavening (Vito: 0.3–0.5% IDY of total flour; MPC: 0.6 g on 630 g total = 0.1% of total flour with an 8–10 h ball proof at 20 °C).
- **TFL 68346 worked example (bread baker):** for 2 pizzas 24–48 h fridge: poolish 200/200/0.2 g (12 h) + final 200 g flour with 1 g IDY (0.5%). Another baker: 225 g poolish flour/0.3 g IDY 12 h @20 °C + main 450 g/0.35 g IDY → balled after 1 h, 9 h at 20 °C: "0.6 g IDY [total on 675 g = 0.09%] is pretty much spot on".
- **Serious Eats:** "More yeast is usually added to this when it is mixed with flour to make the final dough, but not always."
- **Yeast growth:** Bakeinfo: yeast "can duplicate itself every 90 minutes by… budding" under ideal (aerobic) conditions; in dough oxygen is limited → alcoholic fermentation dominates. TFL 27341/63083: yeast does keep multiplying anaerobically but "much slower"; a sponge needs hours, not 15–30 min, to build population. Rezaei et al. 2014 (peer-reviewed): yeast in exponential growth phase has *lower* fermentation capacity per cell than stationary-phase cells. **No source gives a measured fold-increase for a poolish.** Derived from the yeast tables themselves (Hamelman/Weekend Bakery/Rosada): the required inoculum falls roughly **2× for every extra ~3–4.5 h at 21–24 °C** in the 8–16 h range (e.g. WB 0.28%→0.15%→0.055% for 8→12→16 h), i.e. the poolish's *leavening capacity* grows with an effective doubling time of ~3.5 h while food lasts, then plateaus/declines at peak. Modernist Bread's 3 h/0.45% ≡ 8 h/0.25% implies a slower ~6 h doubling at short times (lag phase). Treat "yeast population grows ×2–4 in a 12–16 h poolish" as an inference, not a measurement.

### 2e. Honey/sugar in the poolish

- **Vito (beginners transcript):** honey "because [it] is the more organic and more natural sugar" — the only rationale he gives; 3–5 g per 300 g flour (1–1.7% of poolish flour, 0.3–0.5% of total flour).
- **Weekend Bakery:** "absolutely no need to add sugar. In general it is not customary to add sugar to a preferment… High concentrations of sugar can even inhibit the growth of yeast. But if you add just a little bit… nothing will go wrong"; "adding sugar would make the yeast more active, but… you are not looking to speed things up during this phase."
- **Hamelman, KA, ASB, Rosada, Forkish, Gemignani:** no sugar in poolish.
- **Tom Lehmann / Pete-zza (pizzamaking 48828):** sugar above ~5% of flour exerts osmotic pressure on yeast (theartisan.net yeast treatise); honey ≈ 18% water. At Vito's 1–2% there is no osmotic penalty; the effect is a small head-start of directly fermentable sugars (glucose/fructose) before flour amylases release maltose. Rosada (via Pete-zza) notes large/long poolishes risk **sugar depletion** in the final dough → poorer browning; 0.5–1% sugar/malt in the final mix fixes that — a stronger argument for sugar in the *final dough* than in the poolish.
- **pizzamaking 85360 (David):** speculates Vito refrigerates *because* of the honey + heavy yeast.
- **Hayzed (content farm, not credible):** "reduces fermentation time by 20–30%", "1–2% of flour weight" — unverified; do not cite as fact.

### 2f. How much a 25% poolish shortens the final-dough fermentation (equivalence with direct-dough tables)

- TXCraig1: his direct-dough yeast/time/temperature chart "wasn't designed to work for preferments… none of the data the chart is built on is preferment"; nanometric reports it nonetheless worked for him with a 100%-hydration poolish at 19–26 °C. (pizzamaking 83618)
- Pizzalogic: total yeast (poolish + final) ≈ the direct-dough dose for the same final schedule, with 10–20% of it in the poolish.
- JayArr: with a 20% ripe poolish, cut final-dough yeast 40–50%.
- Hamelman: final dough with a 33% poolish still gets essentially the full straight-dough yeast dose and a normal 2 h bulk / 1–1.5 h proof — the poolish's job is flavour/extensibility, not speed.
- Vito: 0.3–0.5% IDY of total flour entirely in the poolish, then 16–24 h fridge bulk + 2 h (1 h if hot) balls; his dough is thus a **0.3–0.5% IDY cold-fermented dough** in direct-dough terms (compare Forkish EoP 0.3% IDY for 24–48 h fridge; parallei 0.40% IDY for 24 h at 3 °C; American Pie 0.3% for 48 h at 4 °C).
- My Pizza Corner: 0.1% IDY of total flour all in the poolish → 8–10 h RT ball proof at 20 °C.
- **No source quantifies "hours saved"**; the consistent rule is: **size the TOTAL yeast for the final-dough schedule as if it were a direct dough, multiply the poolish's yeast by a maturity factor (≈1 if the poolish is used young/cold, ≈2–3 if ripened 12–16 h), and add the remainder to the final mix.**

### 2g. Hot-weather (27–34 °C) poolish adaptations

- Hamelman: 16 h at 26.7 °C → 0.08% fresh (≈0.027% IDY) — impractically small at home scale ("a speck").
- Rosada: at 27–29 °C with 16 °C water: 3 h/1.5% fresh, 7–8 h/0.7%, 12–15 h/0.1%.
- Jordo's: at 24–28 °C use **0.05% IDY and 6–8 h**; Dough Formula: 27 °C poolish peaks in 5–6 h (with 0.1–0.25%).
- TFL 18605 (30 °C flat): use ¼–⅓ of normal yeast, "possibly in a preferment"; proof in the fridge overnight; wrap a damp cloth around the container; DDT formula: water °C = 3×DDT − room − flour − 3 (mixer friction).
- TFL 11964 (warm climate): poolish collapses after doubling → refrigerate once doubled, re-warm to ~24 °C before use. TFL 26492: chilled flour + fridge water + cooler spot to slow a poolish.
- pizzamaking 85360 (Vito-style 2% IDY, 1 h RT + 16 h fridge): several failures where the poolish "came out of the fridge inactive"/"gloopy" — fix was **1.5–2 h at RT "until I see it rise aggressively", then fridge**; "the high amount of yeast… makes sure it rises like crazy at room temperature".
- Vito's own hot-weather cue: balls need "only one hour" instead of two if it is hot.
- Temperature scaling seen across sources: Hamelman 3.1× yeast per 8.4 °C (Q10 ≈ 3.9); BakersMath 18 °C/14 h ≡ 24 °C/8.5 h (Q10 ≈ 2.3); Dough Formula 21 °C/~11 h ≡ 27 °C/5.5 h (Q10 ≈ 3.2); general fermentation rule of thumb Q10 ≈ 2 (search summaries). → Q10 ≈ 2.5–3 between 15 and 30 °C is the defensible middle.

### 2h. Poolish overnight in the fridge — when does it exhaust itself?

- Vito: fine 16–24 h; "past the 24 hours starts to get acid, it's not good anymore".
- Fond/JayArr: ripe poolish holds ≤24 h refrigerated. Dough Formula: ≤12 h after falling. Gemignani: ≤8 h. Reinhart: 3 days (bread, low-yeast poolish). Pizzalogic: +8–12 h.
- Stack Exchange 99283: a poolish that had ALREADY peaked at RT (10 h) exhausted its sugars; refrigeration afterwards "did not accomplish much" and it deflated.
- BakersMath: cold-retarding a poolish 8–16 h at 3–6 °C works but "use a bit more yeast".
- pizzamaking 85360: with a cold fridge and only 1 h RT, a 2%-IDY poolish may never rise (yeast chilled before it got going).
- Hamelman: a fully-yeasted preferment loses "its vigor" at room temperature within ~6 h; must be chilled quickly.
→ Synthesis: exhaustion is driven by **how much fermentation has already happened**, not by clock hours. A poolish that peaks at the end of its warm phase and is chilled immediately at 3–5 °C keeps for ~16–24 h (Vito's window); at 7–8 °C it keeps fermenting at roughly double the 4 °C rate and should be used within ~12 h; a poolish that peaked and was left warm is finished within 1–2 h (Pizzalogic window; Pizzablab "narrow").

---

## 3. Contradictions between sources and how to resolve them

1. **Poolish yeast dose: 0.03–0.2% (Hamelman, KA, Weekend Bakery, Forkish, Pizzablab, Rosada) vs 1.0–1.7% (Vito) vs 2.0–2.8% (Dawood's current).** Not actually contradictory once time/temperature are included: the classical numbers are for 8–16 h at room temperature; Vito's dose is a 1–2 h sponge (ASB/Baking-With-Theory tables) that is then parked in the fridge. Resolution: the engine should compute the dose from the *warm-phase* hours at the *actual* room temperature, treating fridge hours as ~1/8–1/10 warm-hours; never copy either number blindly.
2. **Use at break point/just after collapse (Rosada/Pete-zza) vs before any collapse (Hamelman, Pizzablab, KA).** Both agree the peak is the target; Rosada tolerates "a short period thereafter", Pizzablab says a *significant* collapse ruins the dough. For weak maida, adopt the strict version (dome just flattening, no high-water mark) — the context-handoff's "slightly collapsed = peak flavour" is acceptable only if it is minutes past peak, not hours.
3. **Refrigerating a poolish: "not recommended" (Pizzablab) vs Vito/BakersMath/Fond/JayArr (fine, ≤24 h).** Pizzablab's objection is flavour (bacterial activity suppressed); the others are about logistics. In a 30 °C kitchen there is no third option, so the engine should refrigerate but keep the warm phase long enough to reach near-peak first (pizzamaking 85360 evidence).
4. **Add yeast to the final dough: full normal dose (Hamelman, HansB, Weekend Bakery) vs reduce 40–50% (JayArr) vs none (Vito, My Pizza Corner).** Resolved by total-yeast accounting (section 4): if the poolish already carries ≥ the direct-dough requirement for the final schedule, add none; otherwise top up. Vito's poolish carries 0.3–0.5% of total flour, which *is* a full cold-ferment dose — so "no added yeast" is consistent with the others, not an exception.
5. **How long a peaked poolish keeps in the fridge: 8 h (Gemignani) → 12 h after falling (Dough Formula) → 24 h (Fond, JayArr, Vito) → 3 days (Reinhart).** The low-yeast bread poolishes tolerate longer; heavily-yeasted, honey-fed, or already-collapsed poolishes tolerate less. Engine: cap at 24 h for the Vito-type poolish, 12 h if the fridge reads >7 °C, and 0 h if it was already collapsed when it went in.
6. **PFF: 50% (Forkish) vs ≤25% (Scott, pizzamaking) vs 30% (Vito, most calculators).** Forkish's 50% is for strong US flour and long cold bulk; the pizza experts warn about gluten weakening. With maida, side with Scott/Dough Formula: 20–25%.
7. **Temperature sensitivity: Q10 ≈ 2 (generic rule) vs ≈ 3.9 (Hamelman's example).** Hamelman's example is anecdotal; calculators cluster at 2.3–3.2. Use 2.7 and let the direct-dough agent's calibrated table override where it exists.
8. **Honey: "helps the yeast" (Vito, copycat sites) vs "no need, can inhibit" (Weekend Bakery).** Both true at different doses; at 1–2% of poolish flour it is harmless and gives a modest head start; the meaningful browning benefit comes from sugar in the *final* dough (Rosada's sugar-depletion point), not in the poolish.

---

## 4. Recommendations for the deterministic engine

All numbers are IDY (Saf-Instant). `F_p` = poolish flour (g); `F_t` = total flour (g). Poolish is always 100% hydration, no salt.

**R1. Pre-fermented flour.** `F_p = 0.25 × F_t` by default for maida (band 0.20–0.25). Never exceed 0.30. If the user selects "no poolish", route to the direct-dough tables from the other research dimension.

**R2. Effective warm-equivalent hours.** For each phase i with duration h_i at temperature T_i (°C), rate r(T) = 2.7^((T − 22)/10) for 12 ≤ T ≤ 34 (Q10 = 2.7; Hamelman/BakersMath/Dough Formula cluster). For fridge phases use r = 0.10 at 3–5 °C, r = 0.15 at 6 °C, r = 0.22 at 7–8 °C (extrapolation of the same Q10 gives 0.14–0.25; the lower 4 °C figure reflects near-dormancy reported across pizza sources — override with the direct-dough agent's cold-ferment table if it provides one). Effective hours `E = Σ h_i × r(T_i)`.

**R3. Poolish IDY as % of F_p, targeted so the poolish PEAKS at the end of the warm phase (E measured at the end of the warm phase; any fridge time after the peak is holding, not ripening):**
```
E (warm-equivalent hours at 22 °C) → IDY % of poolish flour
  ≤ 1.5 h  : 1.0 %   (sponge; Vito-class — only if the user insists on a "make it now" poolish)
  2 h      : 0.7 %
  3 h      : 0.5 %   (JayArr 0.4–0.5; Modernist 0.45; Rosada 1.5% fresh)
  4 h      : 0.4 %
  6 h      : 0.30 %
  8 h      : 0.25 %  (Hamelman 0.7–1% fresh → 0.23–0.33; WB 0.23–0.33)
  10 h     : 0.18 %
  12 h     : 0.12 %  (Hamelman 0.3–0.6% fresh → 0.10–0.20; WB 0.10–0.20; Pizzablab 0.1)
  14 h     : 0.09 %  (Forkish 0.08 at 18–21 °C)
  16 h     : 0.06 %  (Hamelman 0.1–0.25% fresh → 0.03–0.08; WB 0.03–0.08; Fond 0.05)
  20 h     : 0.03 %
  ≥ 24 h   : 0.02 %  (floor; below this weigh-ability fails — use a smaller warm phase instead)
```
Interpolate log-linearly between rows (≈ doubling per 3.5 h from 8 h outward). Round the gram result to 0.1 g; if the result is < 0.3 g, the engine should instead lengthen the warm phase or tell the user to make a 1:10 yeast-in-water dilution (e.g. 1 g IDY in 100 g water, use 30 g of it = 0.3 g) — Hamelman's "speck" problem.

**R4. Worked defaults for Dawood (F_p = 250 g):**
- *September, 30 °C kitchen, Vito-type schedule (warm 2 h then fridge 3–5 °C for 18 h, 30 min re-warm):* r(30) = 2.7^0.8 = 2.2 → E_warm = 4.4 h → **0.38% → 1.0 g IDY** (not 5 g). Fridge phase adds 18 × 0.10 = 1.8 warm-hours of slow drift, acceptable since the poolish is already ripe. If the user wants extra safety margin against a cold fridge (pizzamaking 85360 failures), the engine may raise to 0.5% (1.25 g) but must then make the warm phase end at "visibly domed and bubbling", not at a clock time.
- *Same-day poolish, 30 °C, 3 h warm, no fridge:* E = 6.6 h → **0.28% → 0.7 g**. (The current 7 g/2.8% will peak in ~1 h and be collapsed by 3 h — this is the single biggest deviation from every source found.)
- *Night poolish at 25 °C for 8 h (Sept nights 24–27 °C):* r(25) = 1.35 → E = 10.8 → **0.15% → 0.4 g**; then use immediately or fridge ≤ 12 h.
- *Winter kitchen 15 °C, 16 h overnight on the counter:* r(15) = 0.5 → E = 8 h → 0.25% → **0.6 g**. Room-temperature overnight poolish becomes practical only below ~20 °C; above that the engine should force the warm-then-fridge pattern.

**R5. Honey.** Keep 2% of F_p (5 g per 250 g) as an optional flag ("Vito-style"); no change to yeast math (effect < the table's rounding). Never > 5% (osmotic, Lehmann). Suggest the engine put 0.5–1% of F_t sugar/honey in the *final dough* only for the long-poolish variants where browning may suffer (Rosada) — not needed at 25% PFF in a 450 °C oven.

**R6. Water temperature for the poolish:** at room ≥ 27 °C use fridge-cold water (10–16 °C; Rosada 16 °C, Vito "cold water", Dawood's 8–10 °C) — it delays the start by ~30–45 min and keeps the warm phase from overshooting; the engine can model it as the first 0.5 h at (T_room − 8 °C).

**R7. Peak/collapse detection text for the step list.** "Ready when: at least doubled (2–3×), surface fully covered with small bubbles, centre dome just starting to flatten, sweet-yeasty smell with a faint tang. Use it now or refrigerate immediately. If it has sunk below a visible high-water line on the bowl and smells sharp/boozy: for maida, discard and remake — do not use." Give a ±1 h window around the predicted peak; at ≥ 30 °C say ±30 min.

**R8. Fridge holding rules for a ripe poolish:** ≤ 24 h at 3–5 °C; ≤ 12 h if fridge is 6–8 °C; 0 h if it had already collapsed. Re-warm 30 min (Vito) to 60 min (Fond/Dough Formula) before mixing; in a ≥ 30 °C kitchen 20–30 min is enough. If the user's bake time slips beyond the hold limit, the engine should say "remake the poolish" rather than stretch.

**R9. Final-dough yeast accounting (replaces guessing).**
```
Y_direct  = direct-dough IDY % of F_t required for the planned final schedule
            (from the direct-dough/cold-ferment tables of the other dimension;
             e.g. 0.3–0.4% for 24 h at 4 °C + 2 h at RT; ~0.5% for 3.5 h at 28 °C)
M         = poolish maturity factor: 1.0 if E_warm ≤ 2 h (young/Vito-style),
            1.5 for E_warm 3–6 h, 2.5 for E_warm 8–16 h (ripe overnight poolish)
Y_carried = (poolish IDY g × M) / F_t × 100
Y_final   = max(0, Y_direct − Y_carried)   → grams = Y_final × F_t / 100
```
With R4's 1.0 g poolish (M = 1.5 → 1.5 g-equivalent = 0.15% of 1 kg) and a same-day 3.5 h ball proof at 28 °C needing ≈0.5%, the engine adds ≈3.5 g IDY to the final dough. With Vito's original 5 g (M = 1.0 → 0.5% of total) nothing is added — which reproduces his recipe exactly. Add the final-dough yeast dry with the flour (it is instant); salt after 3–4 min as already established.

**R10. Bulk vs ball with a poolish (from the sources' schedules, to be reconciled with the fermentation dimension):** the poolish contributes acidity/extensibility, not time savings; keep the final-dough schedule the direct-dough tables give for the *total* yeast in R9. Hamelman: 2 h bulk + proof; Pizzalogic: 3 h bulk RT then 24 h balls in fridge; Vito: 16–24 h fridge bulk + 2 h balls (1 h if hot). For weak maida prefer *balling immediately* (short bulk ≤ 30 min) so the balls, not a slack bulk mass, take the fermentation — the context-handoff already found bulk-then-ball riskier for overproofing.

**R11. Guardrails specific to maida (weak flour):** cap E_warm at 12 h (never a 16–18 h room-temperature poolish); cap poolish fridge hold at 24 h; if any phase temperature ≥ 32 °C, shorten the predicted peak by a further 15% (protease and lag effects are non-linear; Pizzalogic's "shorten by 1–2 h for AP flour"); PFF ≤ 25%; final hydration 65% (not 70%) whenever E_warm ≥ 8 h, because a ripe poolish softens the dough (Forkish bakers' "liquidy" complaints, Angioloni extensibility loss).

**R12. Fresh "khameer" option:** grams fresh = IDY × 3 (Hamelman/WB) — offer as a toggle; timings unchanged.

---

## 5. Open questions

1. No source measures the actual yeast-cell fold-increase in a 12–16 h poolish; the maturity factor M in R9 is inferred from the slope of the yeast/time tables (≈ doubling of leavening capacity per 3.5 h at 22 °C) and from Rezaei et al.'s finding that exponential-phase cells ferment *less* per cell. Needs a home test: same final dough with (a) 1 g-IDY ripe poolish and (b) 1 g IDY direct — compare time to 1.7× volume.
2. Cold-end rate factors (0.10 at 4 °C) are extrapolated; the direct-dough research dimension (Craig's chart, pizzamaking topic 26831) should supply calibrated 3–8 °C values and they should replace R2's fridge constants.
3. Honey's real acceleration in a poolish is unquantified (only a content-farm claims 20–30%). Cheap test: two 100 g poolishes, ±2 g honey, same yeast, time to 2× at 30 °C.
4. Maida's amylase/protease profile is unknown (no falling number on the bag); the R11 caps are precautionary. If a mill brand with a falling number (300–400 like the TSG spec) is found, the caps could relax.
5. Whether Dawood's fridge really holds 3–5 °C (the pizzamaking 85360 failures were cold-fridge failures; his earlier notes mention drift to 7–8 °C). An in-fridge thermometer decides which R8 branch applies.
6. Vito's "5 g yeast for any batch size" claim (TFL 68346) is dimensionally wrong; the engine should always scale yeast with F_p. Every other source scales by flour weight.
