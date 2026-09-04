# Research notes — dimension: hydration-and-oven

Context: Dawood, Islamabad. CasaKoa dual-fuel brick-floor oven (~500 °C max). Flour = Pakistani maida (~10–11 % protein, weak gluten, unmalted, no W rating) + 20 % fine chakki atta. Current method = Vito-style poolish, 65–70 % hydration, 3.5 % salt, ~5 % olive oil, 280 g balls. Goal = numeric rules for a deterministic dough/timing engine.

Raw scrapes are in `research/raw/` (avpn2024.txt = full text of the 2024 AVPN Disciplinare PDF; pm_36577.md, pm_26831.md = pizzamaking threads; pt_oil.md, pt_ball.md, ooni_classic.md, qascf.txt etc.).

---

## 1. Sources consulted

| # | URL | What it is | Credibility |
|---|---|---|---|
| S1 | https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf | AVPN International Regulations 2024 (English PDF, full text extracted, 37 kB) | PRIMARY (standards body) |
| S2 | https://www.pizzanapoletana.org/en/ricetta_pizza_napoletana | AVPN web summary of the regulation | PRIMARY |
| S3 | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32010R0097 | Commission Regulation (EU) 97/2010 — Pizza Napoletana TSG legal spec | PRIMARY (law) |
| S4 | https://ooni.com/blogs/ooni-insights/pizza-dough-hydration-explained | Ooni "Pizza Dough Hydration Explained" | Manufacturer guidance (high) |
| S5 | https://eu.ooni.com/en-it/blogs/recipes/classic-pizza-dough | Ooni Classic Pizza Dough (old + new formula, gram amounts) | Manufacturer recipe (high) |
| S6 | https://ooni.com/pages/getting-started-cook/ooni-koda-16 | Ooni Koda 16 getting-started: stone 380–450 °C, recover before relaunch | Manufacturer manual (high) |
| S7 | https://cdn.brandfolder.io/54G1NFTL/as/qch124-e23yzc-gu9nn/Ooni_Koda_16_Essentials_Guide-Digital.pdf | Ooni Koda 16 Essentials Guide: aim ≥400 °C stone, "keep around 400 °C" | Manufacturer manual (high) |
| S8 | https://s7d2.scene7.com/is/content/academy/20824056 | Ooni FAQ PDF: ideal stone 420–450 °C mid-stone | Manufacturer FAQ (high) |
| S9 | https://us.gozney.com/blogs/news/pizza-dough-hydration-explained | Gozney hydration guide: Neapolitan 58–65 % at 800 °F/90 s; high hydration sticks to peel | Manufacturer guidance (high) |
| S10 | https://modernistcuisine.com/recipes/neapolitan-pizza-dough-recipe-2/ | Modernist Pizza Neapolitan dough: 62.3 % hydration, IDY, 20–24 h RT bulk + 3 h proof | Book/lab (high) |
| S11 | https://modernistcuisine.com/recipes/neapolitan-pizza-dough-recipe/ | Modernist Cuisine at Home Neapolitan dough: AP flour may need up to +10 % water; 0.5 % vital gluten | Book (high) |
| S12 | https://www.pizzamaking.com/forum/index.php/topic,36577.0.html | pizzamaking "Neapolitan hydration level for all purpose flour?" — TXCraig1 + Pete-zza replies | Expert forum (high for these two posters) |
| S13 | https://www.pizzamaking.com/forum/index.php/topic,26831.0.html | TXCraig1 "Baker's yeast quantity prediction model" thread (assumptions: 60 % HR, 25 °C baseline; scott123 on salt 1.75 % vs 3 %) | Expert forum (high) |
| S14 | https://www.pizzamaking.com/forum/index.php/topic,60583.0.html | Dough Clinic "Diastatic malt vs sugar" — Tom Lehmann: 700 °F floor "too hot for sugar in the crust" | Expert forum (Lehmann = industry authority) |
| S15 | https://www.pizzamaking.com/forum/index.php/topic,6327.0.html | "Napoletana Dough and Oil" — Pete-zza on oil, AP flour rated absorption ~61 % | Expert forum (high) |
| S16 | https://pizzatoday.com/news/2009-february-dough-doctor/127117/ | Lehmann, Pizza Today Feb 2009: sugar omitted from high-temp doughs; sugar doughs brown fast but can be raw inside | Industry expert column (high) |
| S17 | https://pizzatoday.com/news/oil-n-dough/128591/ | Lehmann, Pizza Today Dec 2009: oil 2–5 %, most 2–3 %; oil softens like water; add after 2 min mixing | Industry expert column (high) |
| S18 | https://www.pmq.com/tom-the-dough-doctor-lehmann-explains-how-salt-sugar-and-oil-affect-your-pizza-dough/ | Lehmann PMQ: salt/sugar/oil functional effects (no %s) | Industry expert (high) |
| S19 | https://pizzatoday.com/news/dough-doctor-back-basics/131347/ | Lehmann "Back to basics" NY formula: salt 1.75 %, IDY 0.4 %, oil 2 %, sugar 2 % optional, 62 % water | Industry expert (high) — NY style, not NP |
| S20 | https://www.pizzablab.com/learning-and-resources/ingredients/the-role-of-salt-in-dough/ | PizzaBlab salt: 2–3 %, Neapolitan 3 % "to compensate for the flour's lack of strength" | Well-researched blog (medium-high) |
| S21 | https://www.pizzablab.com/learning-and-resources/ingredients/oil-and-fat-in-dough-explained/ | PizzaBlab oil: 1–2 % typical; oil does not promote crispness; 0–3 % can improve oven spring | Blog (medium-high) |
| S22 | https://www.pizzablab.com/learning-and-resources/baking/the-ultimate-guide-to-dough-hydration/ | PizzaBlab hydration: classic Neapolitan 58–62 % at >400 °C/≤90 s; modern NP 75 %+ at ~350 °C/2–3 min; gummy crumb if wet dough at high heat | Blog (medium-high) |
| S23 | https://www.pizzablab.com/learning-and-resources/ingredients/malt-powder/ | PizzaBlab diastatic malt: 0.1–2 %, start 0.5 %; most useful below 290 °C | Blog (medium) |
| S24 | https://fond.kitchen/glossary/dough-ball/ | Ball weight → diameter table (Neapolitan ~65 % hydr.) | Calculator/glossary (medium) |
| S25 | https://pizza-calculator.the-bread-code.io/dough-ball-size | Ball weight table; rule 0.4 g/cm² thin, 0.6 g/cm² thick | Calculator (medium) |
| S26 | https://pizzatoday.com/news/the-perfect-pizza-dough-ball-weight-knead-to-know/614869/ | Pizza Today: AVPN 200 g→22–24 cm, 280 g→28–35 cm; area formula | Industry magazine (medium-high) |
| S27 | https://repository.uobaghdad.edu.iq/articles/jmracpc-175 | Univ. Baghdad study: leavening at 0/1/2 % salt = 20.0/19.7/15.7 (best yeast), 10.5/10.3/8.8 (worst) | Peer-reviewed (small study, medium) |
| S28 | https://doi.org/10.1002/jsfa.4575 | Beck, Jekle, Becker 2012 J Sci Food Agric: NaCl 5→40 g/kg flour; loaf volume −55 % at 40 g/kg vs 5 g/kg; total CO2 rises as NaCl falls | Peer-reviewed (high; abstract/intro only via Exa) |
| S29 | https://www.mdpi.com/2076-3417/10/11/4039 | MDPI 2020 rheofermentometer: H'm, VT, VR decrease significantly with NaCl; gas retention (CR) increases | Peer-reviewed (high) |
| S30 | https://www.millingjournal.com/article/1058182/meeting-flour-specifications | Milling Journal: protein absorbs ~1.8× its weight in water; damaged starch 4×; pentosans 10×; protein explains only ~20–41 % of absorption variance | Industry technical (high) |
| S31 | https://qascf.com/index.php/qas/article/download/111/101/200 | QAS Crops & Foods 2017 9(4):369–381 (Indian T. aestivum): straight-grade flour absorption 53.7–56.8 %, dry gluten 7.0–9.3 %; cites Pakistani cultivars 11.99–13.80 % protein (Anjum & Walker 2000), white flour 10.06–11.89 % (Butt 2001) | Peer-reviewed (high; South-Asian wheat) |
| S32 | https://www.pizzanapoletanadoc.it/forza-della-farina-w/ | Italian W-strength table: protein 9–10.5 % ≈ W 90–130; 10–11 % ≈ W 130–200; ≤170 W absorbs ~50 %; 180–260 W absorbs 55–65 % | Italian pizzaiolo site (medium) |
| S33 | https://alshahbazflourmills.com/maida/ | Pakistani mill spec sheet: maida protein 10–11 g/100 g | Manufacturer (medium) |
| S34 | https://casakoa.com/products/little-fireball (Leo), /the-black-dragon (Enzo), /king-godzilla (Marco), /collections/all, /pages/brick-pizza-ovens | KOA (CasaKoa) product pages: max 500 °C, 30 mm floor, ceramic-fibre + calcium-silicate insulation, dimensions, prices | PRIMARY (manufacturer) but thin |
| S35 | https://linkedin.com/company/casakoa ; https://www.facebook.com/koacasa/ ; https://www.instagram.com/koa.casa/ | KOA company info: Dubai HQ, Lahore office, founded 2020; "Blaze" 16-inch stone, "90 seconds"; IG "cook pizza in 60 seconds" | Social/marketing (low-medium) |
| S36 | https://pizzaovenreview.com/journal/why-is-my-pizza-burnt-on-the-bottom ; https://pizzaovenreview.com/journal/cooking-multiple-pizzas-back-to-back | Floor/dome diagnostics; quotes Ooni/Gozney/AVPN/EU; gas: full flame between pies, lower during bake | Review site (medium; quotes primary docs) |
| S37 | https://thepizzacraft.com/dough-and-fermentation/ooni-pizza-dough-recipe/ | Blog: 60 % for Ooni; claims Modernist Pizza lands at 58–62 % (not verified in primary) | Content blog (low-medium) |
| S38 | https://jayarr.pizza/blog/pizza-crust-not-browning/ | Quotes Tony Gemignani rule: add malt below 650 °F, omit above (burns) | Blog quoting a book (medium) |
| S39 | https://jordospizzacalculator.com/guides/neapolitan-pizza-dough | Calculator guide: 60–65 %, salt 2.5–3 %, IDY 0.05–0.15 % for 24–48 h fridge | Calculator (medium) |
| S40 | https://www.pizzeriaatarantella.it/en/correct-wood-fired-oven-temperature-for-neapolitan-pizza/ | Naples pizzeria: oven 430–480 °C, 60–90 s | Practitioner (medium) |
| S41 | https://ooni.com/blogs/ooni-insights/salt-in-pizza-dough-explained | Ooni salt: 2.5–3 % for Neapolitan; "too much salt will slow fermentation" | Manufacturer (high) |
| S42 | https://www.zetanews.it/idratazione-pizza-napoletana-percentuali-disciplinare-tecnica/ | Italian article: traditional range 60–65 % | News (low-medium) |

Not reachable this session: pizzamaking topic 26831 via WebFetch (403; scraped via firecrawl instead), Stadler Made (TLS error), Wiley full text (403), Instagram/Facebook bodies (blocked). Reddit blocked.

---

## 2. Findings with numbers

### 2.1 AVPN Disciplinare 2024 (S1) — verbatim extracts

Flour (type 00, or type 0; type 1 may be blended at 5–20 %):
```
W                          250-320
P/L                        0,50-0,70 (Ideal 0,6)
Absorption                 55-62%
Stability                  4-12
Value index - Caduta E10:  250-400   max 60 Falling
Dry gluten                 9,5-11,5 g%
Protein                    11,5-13,5 g%
Ashes                      < 0,55
```
"These values are typical of a medium strength flour, balanced and compatible with the right requirements for bread making."

Ingredients "based on 1 liter (1000ml) of water":
```
Water     1 lt
Salt      da 40 a 60 g
Yeast     Fresh brewer's yeast 0.1-3 g (based on temperature, humidity and timing)
          Dry brewer's yeast: ratio 1/3 compared to the fresh one (1 g dry = 3 g fresh)
          Sourdough < 10% on the quantity of flour
Flour     1,600/1,800 (depending on the degree of absorption)
```
Essential rules: "Direct dough making method. Start with water when preparing the dough. **Never add any fat or sugar to the dough.**"

Converted to baker's %: hydration 1000/1800 = **55.6 %** to 1000/1600 = **62.5 %**. Salt 40–60 g per 1600–1800 g flour = **2.2 – 3.75 %** of flour (centre ≈ 2.9 %). Fresh yeast 0.1–3 g/L → **0.006 – 0.19 %** of flour; IDY equivalent 0.03–1 g/L → **0.002 – 0.06 %** of flour (this is for 12–24 h at 18–22 °C, direct method — far below the 0.5 % IDY in a Vito poolish).

Salt: "makes sure that direct contact between salt and yeast does not occur for more than 5 minutes, otherwise the salt will damage the yeast cells." Mixing: add flour gradually "(takes about 10 minutes)… then kneaded for a maximum of a further 20 minutes." "The final dough must feel moist, non-sticky, soft and plastic."

Balls & size: "the dough balls must weigh between 200 and 280 g, to obtain a pizza with a diameter between 22 - 35 cm"; example "200 g portion (pizza diameter 22-24 cm) – 280 g portion (pizza diameter 28-35 cm)".

Fermentation: "min 12 - max 24 hours (according to the type of flour used and taking into account temperature, humidity and time of use)"; proofing chamber "ideal parameters 18/20 °C temperature and 60/70% humidity". Water "Operating temperature: 16°-22°C optimum".

Geometry after bake: "The center should be 0.25 cm in height (+/- 10%) and the crust should be 1-2cm in height" (elsewhere "approximately 0.25-0.30 cm thick after cooking"). Max diameter 35 cm.

Cooking (verbatim):
```
• Base cooking temperature  approximately 380 - 430 °C
• Dome's temperature        approximately 485 °C
• Cooking time              60-90 seconds
```
"Traditionally, cooking used to take place only in wood-fired ovens; currently, more sustainable alternatives such as gas or electric ovens are possible."

Olive oil on the pizza (not in dough): Margherita 80–100 g EVOO per… (topping list) — the disciplinare only allows oil as a topping.

### 2.2 EU Regulation 97/2010 — Pizza Napoletana TSG (S3)

Flour: W 220–380, P/L 0.50–0.70, absorption 55–62 %, protein 11–12.5 %. Per litre water: salt **50–55 g**, brewer's yeast **3 g**, flour **1.8 kg** (→ 55.6 % hydration, salt 2.8–3.1 %, fresh yeast 0.17 % ≈ IDY 0.055 %). First rise 2 h under damp cloth; balls **180–250 g**; second rise 4–6 h at room temperature. Diameter ≤35 cm; centre **0.4 cm** (±10 %); rim 1–2 cm. Oven: **floor ≈485 °C, dome ≈430 °C**, 60–90 s. Hand-shaping only.

→ Note the two authorities transpose floor/dome (AVPN 380–430 floor / 485 dome vs EU 485 floor / 430 dome) and differ on ball weight (200–280 vs 180–250) and centre thickness (0.25–0.30 vs 0.4 cm). S36 also flags this and refuses to average them.

### 2.3 Manufacturer guidance (Ooni / Gozney) on hydration for 60–90 s ovens

Ooni (S4), verbatim characteristics:
- 60 %: "Easier to handle", "Firmer dough so it holds its shape", "Not sticky", "Requires more work when stretching your base", "Crispier crust when baked".
- 65 %: "Relatively firm and dry dough", "Requires more kneading", "Tighter crumb structure".
- 70 %: "Sticky and loose, making it trickier to shape and handle for beginners", baked "Much lighter and softer", "Open crumb structure", "Crispy base".
- "Neapolitan-style generally sits at around the 60 to 65% mark." For 75 %+: "stretching and baking in a pan for a less complicated launch."

Ooni Classic Pizza Dough (S5): OLD formula 607 g 00 flour / 364 g water / 18 g salt / 7 g IDY (or 9.2 g ADY, 20 g fresh) = **60 % hydration, 3.0 % salt, 1.15 % IDY** (2 h warm rise, same-day). NEW formula 613 g flour / 368 g water / 18 g salt / 2.7 g IDY (3.5 g ADY, 8.5 g fresh) = **60 %, 2.9 % salt, 0.44 % IDY**. Yields 4 × 250 g balls for 12-inch (30 cm) or 3 × 330 g for 16-inch (40 cm). No oil, no sugar.

Gozney (S9): "Neapolitan style… cooks for only 90 seconds in a Gozney Dome or Roccbox at 800°F and needs **58-65% hydration**." NY ≈65 %, Detroit ≈65 % ("longer baking time"). "it can be challenging to move high hydration, sticky dough from your working surface to the oven because it easily sticks to the peel"; higher hydration is "harder to open and form the pizza."

PizzaBlab (S22): "a classic Neapolitan pizza is baked at temperatures above 350°C. Its dough typically has a hydration level of **58-62%**, and is baked at over 400°C (750°F) for no more than 90 seconds"; "modern Neapolitan pizza, with a dough hydration of 75% or more, is typically baked at a lower temperature (around 350°C) for 2-3 minutes"; "Baking high-hydration modern Neapolitan pizza at the same high temperature as the classic version would trap too much moisture inside, resulting in an undercooked crumb." Style table: NY 57–62, New Haven 65–70, Classic NP 58–62, Modern NP 70–80, Detroit 65–70, Chicago DD 45–50.

Modernist Cuisine (S10): Modernist Pizza Neapolitan dough = **62.3 %** hydration, IDY, "bulk ferment at room temperature for 20–24 hours, then proof for another 3 hours", baked 840–900 °F, 60–90 s. (S11, older recipe: "You can use all-purpose flour, but you may need to include up to 10% more water" — i.e. AP flour is thirstier than Caputo 00.)

Blog S37 (low credibility) also states 60 % for Ooni and "58 to 62 percent for wood-fired and gas-fired home ovens" attributed to Modernist Pizza — the 62.3 % on the Modernist site is consistent.

Expert forum (S12), TXCraig1 verbatim: "There is no 'right' hydration for Neapolitan ('NP') - at least not a range 2 points wide. I know people making beautiful NP with hydrations under 60% and others well into the 70s." and "people bake Neapolitan-style pizza (flour, water, salt, and yeast only) with hydration ratios from less than 55% to more than 75% all at temperatures at or about 900F." Pete-zza: "at 65% hydration there is the risk that the pizza will not be completely baked, and especially so if the crust is on the thick side and/or with a lot of toppings. In general, a lower protein flour can also yield a crust that is softer and less chewy than using a higher protein flour." Also: "Oil or other fats … and/or sugar in the dough act as tenderizers, as will a shorter bake at a higher temperature." TXCraig1 on chewiness causes: "overworking the dough, cold fermentation with SD, autolyse, and baking cold dough."

### 2.4 Low-protein / weak flour absorption

- AVPN's own flour spec assumes **55–62 % absorption** at 11.5–13.5 % protein (S1); EU spec 55–62 % at 11–12.5 % (S3).
- Italian W table (S32): protein 9–10.5 % ⇒ W 90–130; 10–11 % ⇒ W 130–200; 10.5–11.5 % ⇒ W 170–220. "Fino a 170 W – Farine Deboli… capacità di assorbimento pari circa al 50%"; "Da 180 ai 260 W … Assorbono circa il 55%-65%". Diavolapro: "W 180-220: Farina debole, adatta per… lievitazioni brevi (es. pizza napoletana)".
- South-Asian wheat (S31): straight-grade white flours from Indian bread-wheat cultivars had farinograph water absorption **53.7–56.8 %**, dry gluten 7.0–9.3 %; cites Pakistani cultivars at 11.99–13.80 % whole-grain protein (Anjum & Walker 2000) and **10.06–11.89 % protein in white flour** (Butt et al. 2001). (A contrary citation in the same paper: "60-76 % … in Indo-Pakistan wheat varieties (Sila, 2010)" — likely whole-meal/atta or high-damaged-starch chakki flour.)
- Pakistani mill spec (S33): Alshahbaz maida "Protein 10-11g" per 100 g. Sunridge whole-wheat "super white atta" 10.4 g/100 g.
- Milling Journal (S30): "protein absorbs approximately 1.8 times its weight in water, damaged starch absorbs four times its weight in water (native starch only 0.4 times), and pentosans approximately 10 times their weight"; protein content explains only 20–41 % of absorption variance. → Stone-milled (chakki) atta has higher damaged starch + bran pentosans, so the 20 % atta raises the blend's absorption noticeably even though maida alone is low-absorbing.
- Pete-zza (S15): "the rated absorption for all-purpose flour is around 61%"; Reinhart's 69 % dough "will give most people problems from a dough handling standpoint, and more so if all-purpose flour is used"; oil at ~10 % "is a level that one is more likely to see in a dough for a deep-dish pizza."
- PizzaBlab (S20): Neapolitan "incorporates a relatively high salt content of 3% to compensate for the flour's lack of strength/elasticity" — salt is the standard lever for weak flour.

### 2.5 Ball weight → diameter

AVPN (S1/S26): 200 g → 22–24 cm; 280 g → 28–35 cm; range 200–280 g ↔ 22–35 cm. EU TSG: 180–250 g, ≤35 cm.

Fond.kitchen (S24), "Neapolitan-style at approximately 65% hydration":
| Diameter | Ball |
|---|---|
| 10 in / 25 cm | ~200 g |
| 11 in / 28 cm | ~230 g |
| 12 in / 30 cm | ~250 g |
| 13 in / 33 cm | ~280 g |
| 14 in / 35 cm | ~300 g |
| 16 in / 40 cm | ~350 g |
Rule: "About 50g more dough buys you 3–4cm (roughly an inch and a half) of diameter."

bread-code calculator (S25):
| Size | Neapolitan (thin) | New York |
|---|---|---|
| 10" / 25 cm | 230 g | 250 g |
| 11" / 28 cm | 260 g | 290 g |
| 12" / 30 cm | 290 g | 330 g |
| 13" / 33 cm | 340 g | 380 g |
| 14" / 36 cm | 380 g | 430 g |
Rule: "roughly 0.4g of dough per cm² for a thin crust and up to 0.6g per cm² for a thicker base. Multiply by the area (π × radius²)."

Ooni (S5): 250 g → 12 in/30 cm; 330 g → 16 in/40 cm. Pizza Today (S26): dough scales with area; compute g/cm² from one liked pizza and reuse.

Derived g/cm² (my arithmetic): AVPN 200 g @ 22–24 cm = 0.44–0.53 g/cm²; 280 g @ 28–35 cm = 0.29–0.45 g/cm²; Fond 250 g @ 30 cm = 0.35 g/cm²; bread-code 0.40 g/cm²; Ooni 250 g @ 30 cm = 0.35. A 12-inch (30 cm) Neapolitan therefore spans **250 g (0.35) – 290 g (0.41)**; 10-inch spans 200–230 g.

Handoff note: Dawood's 280 g balls came out thick at 8–9 inch; at 0.35–0.40 g/cm² a 280 g ball should be stretched to **30–32 cm (12–12.5 in)**.

### 2.6 Salt

- AVPN: 40–60 g/L water (2.2–3.75 % of flour); EU: 50–55 g/L (2.8–3.1 %). Ooni (S41): "For Neapolitan-style pizza, Lewis recommends around 2.5 to 3% salt"; "Using less salt means more active yeast and a weaker dough. Using too much salt will slow fermentation." PizzaBlab (S20): "typical salt range is between 2-3%… Neapolitan pizza is at the upper end of this range (3%)… if the salt content exceeds 3%, the dough may taste too salty"; acrobatic dough 4–5 %. Lehmann NY baseline 1.75 % (S19). scott123 (S13): "1.75% salt is 'normal' for NY and 3% salt is 'normal' for NP. Do you really feel that a difference in 1.25% isn't going impact yeast growth perceptibly?" TXCraig1's yeast model (S13) baseline: "Converted it to yeast % based on 60%HR and… 25C as my baseline"; his "normal" envelope "65% +/- 10%HR, 2% +/- 2% sugar, 2% +/- 2% oil, 2% +/- 1% salt".
- Quantification of the fermentation slow-down:
  - Baghdad study (S27): dough leavening (volume units) at **0 % / 1 % / 2 % salt = 20.0 / 19.7 / 15.7** for the strongest yeast and 10.5 / 10.3 / 8.8 for the weakest → 1 % salt ≈ −2 %, **2 % salt ≈ −16 to −21 %** vs unsalted (2-h proof). Non-linear: most of the effect appears between 1 and 2 %.
  - Beck et al. 2012 (S28): loaf volume "increased significantly (P ≤ 0.01) by approximately 55% from 3.6 cm³ g⁻¹ … to 5.6 cm³ g⁻¹" when NaCl fell from 40 to 5 g/kg flour; "Less difference … between NaCl levels of >20 and 5 g NaCl kg⁻¹"; "total volume of CO2 (VT) increased significantly (P ≤ 0.05) with the reduction of NaCl from 40 …". Also cites Oda & Tonomura reporting *higher* leavening with 30 g/kg NaCl than none (yeast strain-dependent, controversial).
  - MDPI 2020 (S29): "maximum height of gaseous production (H'm), total CO2 volume production (VT) and volume of the gas retained (VR) significantly decreased (p < 0.01) with an increase in KCl and NaCl levels… The retention coefficient value (CR) increased" — i.e. salt cuts gas *production* but improves gas *retention* by strengthening gluten (the effect Dawood wants for maida).
  - Practical rule of thumb used by pizzamaking modellers: going from ~2 % to ~3 % salt needs roughly the same order of correction as a 1–2 °C drop in temperature; nobody publishes a clean "% per % salt" number. Engine should treat 3.5 % vs 3.0 % as ≈ +5–10 % time (see §4).
- Gluten: BAKERpedia "Salt tightens the gluten structure… The higher the level of salt, the harder the dough becomes"; AVPN: "the salt acts on the gluten network, strengthening it". Lehmann (S18): "Too much salt… slows the rate of fermentation and creates a tightness that makes it harder to open the dough into a pizza skin."
- Timing of addition: AVPN dissolves salt in water first, then 10 % flour, then yeast (salt–yeast contact <5 min). PizzaBlab: "best to add salt at the beginning of mixing." Handoff method (salt after 3–4 min) is a Vito habit — fine, both work.

### 2.7 Oil

- AVPN/EU: forbidden in dough ("Never add any fat or sugar to the dough").
- Lehmann (S17): "The average oil level in pizza dough will be from 2 to 5 percent of the flour weight, with most of us using between 2 and 3 percent. Oil, being a liquid, will soften the dough in the same manner as water will, so… if you were to add 1-pound of additional oil, you would decrease the water by 1-pound"; "mix your flour and other ingredients together with the water for two minutes before adding the oil"; oil "helps to impede the migration of moisture from the sauce and toppings into the dough… resulting in a potentially crispier crust"; ≥3 % needed as lubricant for pressed dough.
- Lehmann PMQ (S18): "Fats and oils provide tenderness, mouth feel and flavor to the finished crust. They also help enhance the volume of the dough and inhibit moisture penetration from the toppings… prevent gum line formation"; olive oil "lends a pronounced and distinctive flavor".
- PizzaBlab (S21): "1-2% (in baker's percentages)" for most styles; 5–10 % cracker styles; fat is a "dough softener… softer, more tender, 'melt-in-your-mouth' texture… reducing chewiness"; oil "doesn't promote crispiness"; 0–3 % "can improve oven spring and increase volume" via extensibility.
- Pete-zza (S12/S15): oil and sugar are tenderizers and, in a home oven, "both can definitely be your friend… they can increase the rate of cooking and browning" (TXCraig1); Peter: "it may even be necessary to add oil to the dough to keep the crust from becoming a cracker" in a home oven — implying it is *not* needed at 450–500 °C.
- Nobody gives a fermentation-rate effect for oil at ≤3 %; TXCraig1's model treats 0–3 % oil as noise.
- Handoff: 4 tbsp (~54 g) per 1 kg = **~5.4 %**, at the top of Lehmann's range; the handoff also notes 4 tbsp + 3.5 % salt were chosen deliberately to chase Toss's "buttery, salty" crumb. Effective hydration: Lehmann's water-equivalence rule means 70 % water + 5.4 % oil handles like ~75 % — consistent with the reported stickiness.

### 2.8 Sugar / honey / diastatic malt at 450–500 °C

- AVPN/EU: no sugar in dough.
- Lehmann 2009 (S16): "dough destined to be baked at high temperatures is made without any added sugar, while those that will be baked at lower temperatures (425 to 450 F) will contain at least some sugar… Doughs that contain sugar will brown quite quickly when baked at high temperatures… While nice and brown on the outside, it may be soft and moist on the inside."
- Lehmann (S14): user with 1 % sugar, 3-day ferment, ~700 °F (370 °C) stone → "too much burning"; Lehmann: "Yes, omit the sugar" … "Too hot for sugar in the crust!"; another member: "NO need for sugar at anything above 500 [°F]". Lehmann: "With short fermentation time the sucrose wins with longer fermentation time the diastatic malt powder wins"; "A malted flour will always provide more crust color development"; protein contributes to browning but "significantly less than… malted v/s non-malted flour, or inclusion of sugar."
- Gemignani via S38: "add diastatic malt to any dough baked below 650F. Omit it if you are baking in a portable oven or wood-fired oven above that temperature — at those temps, it can cause the crust to darken too aggressively." Flour has "only about 0.5% free sugars naturally"; 24–48 h fermentation raises free sugars/amino acids (browning).
- PizzaBlab malt (S23): 0.1–2 %, start 0.5 %; "most effective for pizzas baked at home oven temperatures (below 550°F/290°C)". homemadepizzapro: "when baking at higher temperatures as is required for Neapolitan pizza, the usage of diastatic malt is not recommended… the crust will burn."
- Honey in the poolish: 5 g per 1 kg total flour = **0.5 %**, and it is added to a 16–24 h preferment where yeast consumes most of it. No source objects to ≤0.5 % in a preferment; every source objects to 1–2 % sugar in a same-day dough at ≥370 °C floor. Maida is unmalted and high-starch; the handoff observed fast bottom browning — do not add malt, sugar or extra honey.

### 2.9 Oven: CasaKoa specs and gas-floor management

CasaKoa / KOA (S34, S35): company "KOA" (casakoa.com), founded 2020, HQ Dubai with an office in Lahore; 96 % of web traffic from Pakistan. Models Leo / Enzo / Marco: all "Reaches a maximum temperature of 500 °C", "Cooking Floor Thickness 30mm", "Ceramic fibre insulation wrap and underfloor calcium silicate insulation", "Wood Fired" or "Wood & Gas" (built-in gas burner). Leo: external 533 H × 762 L × 711 W mm, chamber 254 H × 610 L × 458 W mm, 75 kg, listed AED 120,000. Enzo: chamber 400 H × 915 L × 711 W mm, 200 kg, AED 250,000. Marco: chamber 500 H × 1066 L × 915 W mm, AED 350,000. Newer portable models on social media: "Blaze" ("16-inch pizza stone… perfectly crisp pizzas in just 90 [seconds]"), "Pulse"; IG copy: "Cook pizza in just 60 seconds". **No published preheat time, floor temperature curve, or independent user reports were found** (Instagram/Facebook bodies not fetchable; no reviews on OLX/Daraz/Reddit reachable). The handoff's 25–30 min preheat and 2–3 min recovery are unverified house numbers; a 30 mm floor is thin relative to AVPN commercial ovens, so recovery will be faster but the floor will also drop more per pizza.

Manufacturer floor targets for 60–90 s gas ovens:
- Ooni Koda 16 (S6): "make sure the stone gets back up to 715°F-850°F (380°C-450°C) before launching" (same window as preheat). Essentials guide (S7): "Although we designed Koda 16 to be able to safely run up to 950°F / 500°C, we suggest you keep it around 750°F / 400°C for the ideal cook"; "We aim for at least 750°F (400°C)"; rotate every 20–30 s. Ooni FAQ (S8): "ideal temperature… between 420°C and 450°C (788°F to 852°F) in the middle of the stone."
- Gozney (via S36): Neapolitan floor 800–900 °F (427–482 °C); Arc manual flags >900 °F as over-temperature.
- AVPN (S1): floor 380–430 °C, dome 485 °C. EU TSG: floor 485 °C, dome 430 °C. Tarantella (S40): oven 430–480 °C.
- Diagnostics (S36): burnt base + pale/wet top → flame DOWN, wait minutes for the stone to shed heat, re-measure; charred top + doughy base → do NOT lower flame, preheat stone longer, keep the door shut. Gas rhythm: "turn the flame up between pies and back down for the bake… Full flame is a recovery tool, not a cooking setting." Recovery is verified by IR reading of the launch spot, not by a timer; "Pizzas three and four are the worst because the deficit compounds." No source quantifies °C lost per pizza; general stone guidance (savoringtales/tyrolit) says wait ≥5 min if not measuring.
- Handoff figures (floor 380–400 °C, dome 450–500 °C, 25–30 min preheat, 2–3 min recovery, turn at 30–40 s) sit inside AVPN's 380–430 °C floor and below Ooni's 420–450 °C ideal — sensible for a high-starch maida that browns fast.

---

## 3. Contradictions between sources and how to resolve them

1. **Floor vs dome (AVPN 380–430/485 vs EU 485/430).** Do not average. For a gas oven with a strong top flame and a thin 30 mm floor, and a fast-browning maida, follow AVPN: floor 380–430 °C, dome hotter. Engine default floor target 400 °C (range 380–420), consistent with Ooni's "keep around 400 °C".
2. **Hydration for Neapolitan: 55.6–62.5 % (AVPN by formula), 58–62 % (PizzaBlab), 58–65 % (Gozney), 60–65 % (Ooni, Italian press), 62.3 % (Modernist), "no right range, <55 to >75 all at 900 °F" (TXCraig1).** Resolution: the standards and manufacturers cluster at 58–65 % for 60–90 s bakes; TXCraig1's point is that flour and skill move the number, not that any number works for a beginner. Dawood's flour is weaker and lower-absorbing than the 55–62 %-absorption 00 spec, so his band should sit at the *low* end of the cluster.
3. **Weak/AP flour absorbs more (Modernist: +10 % water; Pete-zza: AP rated 61 %) vs Italian W tables (W ≤170 absorbs ~50 %, W 180–260 absorbs 55–65 %) and South-Asian straight-grade flours at 53.7–56.8 %.** Resolution: US "all-purpose" is a 10.5–11.7 % protein malted flour milled from harder wheat — not the same as maida. Absorption is driven by damaged starch and pentosans as much as protein (S30). Maida (soft, low-protein, roller-milled, fine) behaves like Italian W 130–200 flour → absorption ~52–58 %. The 20 % chakki atta (stone-milled, damaged starch + bran) pushes the blend up a few points. Net: **blend absorption ≈ 55–60 %**; anything above ~63 % is "excess" water that shows up as stickiness and a wet centre in a 60–90 s bake.
4. **Ball weight for 30 cm: 250 g (Ooni, Fond, AVPN upper) vs 290 g (bread-code).** Resolution: Neapolitan target 0.35–0.40 g/cm². Use 250 g for a thin 30 cm pizza, 280 g when stretching to 32 cm or when a slightly more substantial base (Toss-like) is wanted. AVPN's own 200 g → 22–24 cm implies a thicker 0.44–0.53 g/cm² for small pizzas.
5. **Salt 1.75 % (Lehmann NY) vs 2.5–3 % (Ooni, PizzaBlab, AVPN centre) vs 3.5 % (handoff).** Resolution: 3 % is the Neapolitan norm and is explicitly justified for weak flour (PizzaBlab, AVPN "strengthening"). 3.5 % is above the "may taste too salty" threshold (PizzaBlab) but within AVPN's upper bound (60 g/L ÷ 1600 g = 3.75 %). Keep 3.0–3.5 % as user range, default 3.0 %, and slow the fermentation clock slightly at 3.5 %.
6. **Salt's effect on yeast: Oda & Tonomura (30 g/kg increased leavening) vs Baghdad/Beck/MDPI (salt reduces CO2).** Resolution: the mainstream data show a reduction that is small at ≤1 % and material at 2–4 % (−16 to −21 % gas at 2 % in a 2-h test; loaf volume −55 % at 4 % vs 0.5 %). Treat salt as a monotonic brake above 2 %.
7. **Oil: forbidden (AVPN) vs 1–2 % (PizzaBlab) vs 2–3 % typical, up to 5 % (Lehmann) vs 5.4 % (handoff).** Resolution: at 450–500 °C oil is not needed for browning or to prevent a cracker crust; its only jobs here are tenderness/flavour (Toss target) and moisture barrier. Offer 0–3 % as the engine's range, default 2 %, and count oil as ~1:1 water-equivalent when computing "effective hydration" for handling warnings.
8. **Sugar/honey: banned (AVPN); "too hot for sugar" ≥370 °C floor (Lehmann); Vito's 5 g honey in poolish.** Resolution: allow honey only inside the poolish at ≤0.5 % of total flour (it is largely consumed in 16–24 h); zero sugar/malt in the final dough at these temperatures.
9. **Fermentation time: AVPN 12–24 h (at 18–22 °C, direct, tiny yeast) vs handoff 3–3.5 h ball proof at 28 °C after a poolish.** Not contradictory — different yeast levels; the poolish path uses ~100× AVPN's yeast. Belongs to the fermentation dimension, but the engine must not import AVPN's 8–24 h as a ball-proof time at 28 °C.

---

## 4. Recommendations for the deterministic engine

### 4.1 Hydration (final dough, water ÷ total flour incl. poolish flour)
- Flour model: maida 10–11 % protein, est. W 130–200, absorption ≈ 52–58 %; +20 % fine chakki atta ⇒ blend absorption ≈ 55–60 %.
- **Allowed band for maida+20 % atta at 450–500 °C: 58–65 %. Default 62 %.** ("Beginner/handling" preset 60 %; "Softer/lighter" preset 65 %; hard cap 68 % with a red warning "will be sticky, harder to launch, risk of wet centre in a 60–90 s bake".) Justification: AVPN 55.6–62.5 %, PizzaBlab 58–62 %, Gozney 58–65 %, Ooni 60–65 %, Modernist 62.3 %, minus 2–3 points for lower flour absorption; Toss (same oven, plain maida) is judged by the handoff to be at 60–65 %.
- Display "effective hydration" = water % + oil % (Lehmann water-equivalence); warn if effective > 70 %.
- Oven-temperature coupling (from PizzaBlab/Ooni logic): if the user sets floor < 350 °C (e.g. long bake), allow up to 70 %; if floor ≥ 400 °C keep ≤ 65 %.
- Poolish accounting: poolish is 100 % hydration; final water = H × F_total − 250 g (for the 250/250 poolish). Example F_total = 1000 g: 62 % ⇒ 620 − 250 = **370 g** added water (65 % ⇒ 400 g; 60 % ⇒ 350 g).
- Kneading rule for the timeline: add water in two stages (80 % then 20 %), oil last after ≥2 min of mixing (Lehmann), rest-and-knead cycles if strandy (handoff).

### 4.2 Ball weight and count
- Ball weight = g_per_cm² × π × (D/2)². Neapolitan factor 0.35 g/cm² (thin) … 0.40 (standard); default **0.37**.
- Defaults: 10 in / 25 cm → 180–200 g (AVPN floor 200 g); 11 in / 28 cm → 220–240 g; **12 in / 30 cm → 250–280 g (default 260 g)**; 13 in / 33 cm → 300–320 g. Keep balls within AVPN 200–280 g unless user chooses "large".
- Given Dawood's thick 8–9 in results with 280 g: engine should print the target diameter next to the ball weight ("280 g → stretch to 31–32 cm; centre 2–3 mm").
- Dough yield: total dough = Σ balls × 1.02 (scrap allowance). Total flour = total dough ÷ (1 + H + salt% + oil%).

### 4.3 Salt
- Range 2.5–3.5 % of total flour; **default 3.0 %** (30 g/kg). Add to the fermentation clock: ×1.00 at 2.5 %, ×1.03 at 3.0 %, ×1.08 at 3.5 % (approximation from the Baghdad/Beck curves: gas output falls ~15–20 % between 1 % and 2 % and keeps falling towards 4 %; the 2.5→3.5 % step is the shallower part of that curve). Flag: >3 % "may taste salty" (PizzaBlab), ≤2.5 % "weaker dough with maida".
- Method: dissolve salt in the water first (AVPN) or add after 3–4 min (handoff) — either; never let salt sit directly on yeast >5 min (AVPN).

### 4.4 Oil
- Range 0–3 %; **default 2 %** (20 g/kg ≈ 1.5 tbsp). Show note: "AVPN dough has none; 2–3 % gives the softer, richer Toss-style crumb; above 3 % adds stickiness and lowers crispness." Count oil in effective hydration. No fermentation-time correction at ≤3 %.

### 4.5 Sugar / honey / malt
- Honey: only in the poolish, fixed 5 g per 250 g poolish flour (0.5 % of a 1 kg batch); do not scale above 0.5 % of total flour.
- Final dough: sugar = 0, diastatic malt = 0 whenever floor ≥ 350 °C (Lehmann "too hot for sugar" at ~370 °C; Gemignani cut-off 343 °C). If the engine ever supports a home-oven mode (<300 °C), allow 0.5 % malt.

### 4.6 Yeast reference points from this dimension (for cross-check with the fermentation dimension)
- AVPN direct method: IDY 0.002–0.06 % of flour for 12–24 h at 18–22 °C.
- Ooni same-day (2 h at warm RT): IDY 1.15 % (old) / 0.44 % (new).
- Modernist: IDY, 20–24 h RT bulk + 3 h proof at 62.3 %.
- jordospizzacalculator: IDY 0.05–0.15 % for 24–48 h fridge.
- TXCraig1 model baseline: 60 % hydration, 25 °C.
- Vito poolish 5 g IDY in 250 g flour = 2 % of poolish flour = 0.5 % of total flour — this is the dominant yeast source; ball proof at 28 °C ≈ 3–3.5 h (handoff).

### 4.7 Oven step list (CasaKoa, gas)
- Preheat on full gas until the **floor** reads 400 °C at the launch spot (IR gun); expect 25–40 min (Ooni's real-world 25–40 min for a much lighter oven; CasaKoa has a 30 mm brick floor + calcium-silicate underfloor insulation). Engine: schedule "light oven" at T−35 min for the first pizza, and print "launch only when floor ≥ 380 °C".
- Between pizzas: flame to full, wait until the launch spot reads ≥380 °C (typically 2–4 min on a 30 mm floor); drop flame to medium-low during the bake. Bake 60–90 s, turn at ~30 s, dome the last 10–15 s.
- If bottom chars before the top: lower flame, let floor fall to 380 °C. If top chars before base sets: raise floor (longer preheat), keep flame steady.
- Schedule buffer for n pizzas: first pizza at T0, then 3.5 min per pizza (bake 1.5 + recovery 2) — print as "pizza k at T0 + 3.5·(k−1) min".

### 4.8 Worked default (1 kg total flour, 62 %, 3 % salt, 2 % oil)
Poolish: 250 g maida + 250 g water + 5 g IDY + 5 g honey. Final: 550 g maida + 200 g fine atta + 370 g cold water + 30 g salt + 20 g EVOO. Total dough ≈ 1680 g → 6 × 280 g (31–32 cm) or 6 × 260 g + spare, or 8 × 210 g (25 cm).

---

## 5. Open questions

1. CasaKoa preheat curve and per-pizza floor drop are unmeasured; needs Dawood's IR readings (floor at 10/20/30/40 min; floor immediately after pulling a pizza; seconds to return to 380 °C). No user reports found online.
2. Actual protein/absorption of the specific maida brand (Sunridge/Golden Harvest/loose) — a 1-page farinograph or even a "how much water until tacky" test would let the engine set hydration per brand. Literature only gives 10–11.9 % protein and ~54–57 % absorption for South-Asian straight-grade flours.
3. Whether Toss's 24 h maida dough is closer to 60 % or 65 % (handoff guesses 60–65 %); a direct ask would anchor the default.
4. No source gives a clean "% slower per +1 % salt"; the ×1.03/×1.08 multipliers are my interpolation from two studies with different geometries. Fermentation dimension should validate against TXCraig1's chart (which is built at ~2–3 % salt, 60 % HR).
5. Effect of 5 % oil vs 2 % on fermentation rate is undocumented (assumed nil).
6. Whether 20 % chakki atta measurably raises absorption (damaged starch/pentosans) enough to justify +2 points — currently folded into the 58–65 % band rather than modelled separately.
