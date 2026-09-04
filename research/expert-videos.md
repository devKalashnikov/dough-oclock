# Expert-videos research notes — other top pizza-dough educators (transcripts + their published recipes)

Dimension: **expert-videos**. Written 2026-09-04 for the Islamabad / CasaKoa / maida+atta deterministic dough-scheduler project.
Raw transcripts and page dumps are in `research/raw/` (files `expert-<VIDEO_ID>.md`, `ooni-*.md`, `pm-charlie.md`, `exa-*.txt`).

Context this is judged against (from `context-handoff.md`): weak maida (9–10.5 % protein, no W rating) + 20 % fine chakki atta; Saf-Instant IDY; Vito-style poolish (250 g flour / 250 g water / 5 g IDY / 5 g honey, 1–2 h RT then 16–24 h fridge); final dough 65–70 % hydration, 3.5 % salt, ~5 % oil; 280 g balls; September kitchen 28–34 °C day, 24–27 °C night; winter kitchen 12–18 °C; home fridge 3–6 °C drifting to 7–8 °C.

---

## 1. Sources consulted

Legend: **P** = primary (creator's own transcript/recipe page/official brand page/AVPN), **E** = expert forum/book-derived, **C** = calculator or aggregator, **B** = blog (secondary). Credibility 1–5.

### Video transcripts obtained (via youtubetotranscript.com; saved as `raw/expert-<ID>.md`)
| # | Creator / video | ID | Kind | Cred |
|---|---|---|---|---|
| T1 | Charlie Anderson — "This Will Change The Way You Make Dough Forever" (his pizzeria Good Pizza, 3-day process) | `_un_Wqj2_Vs` | P | 5 |
| T2 | Julian Sisofo — "How to Make Contemporary Neapolitan Pizza / Full Dough Tutorial" (100 % biga, 72 h fridge) | `7zm2xtlckrc` | P | 4 |
| T3 | Julian Sisofo — "The Easiest Poolish Pizza Dough (Made by hand!)" (overnight poolish, same-day dough) | `0ga1gVyeBpU` | P | 4 |
| T4 | Brian Lagerstrom — "How To Make Your Best Homemade Pizza Yet" (Neapolitan for Gozney Dome, 0.7 g IDY overnight) | `7CM2VU0e1ks` | P | 5 |
| T5 | Adam Ragusea — "New York-style pizza at home, v2.0" | `SDpCzJw2xm4` | P | 3 (home oven NY style; fridge logistics only) |
| T6 | Ooni official — "How to Make Neapolitan-style Pizza / Making Pizza At Home" (Kirsty, Ooni HQ) | `joGKYTGbVw8` | P | 4 |
| T7 | Massimo Nocerino — "Excellent Neapolitan pizza with dry yeast" (2 h RT paste + 18 h fridge + 4–5 h balls) | `fwcmv0N67p8` | P | 4 |
| T8 | Massimo Nocerino — "How to make Poolish for pizza and bread" (0.1 % IDY, 24 h at 16–18 °C) | `WYVJj-xvHuI` | P | 4 |
| T9 | Charlie Anderson — "How I Made the Perfect NYC Pizza (Full Documentary)" (0.5 % IDY, 2–3 d fridge) | `TQYApZ_-P24` | P | 5 |
| T10 | Brian Lagerstrom — "The Easiest Actually Good Pizza Dough — No Mixer" (fridge 4–5 d, freeze, 60 min / 1.5 h warm-up) | `VJu3YCykO_0` | P | 4 |
| T11 | Julian Sisofo — "My Favorite Pizza Dough Recipe" (poolish+biga, 24 h cold bulk, 24–36 h cold balls, 2.5 h warm-up before balling) | `sJNLdNkjAG0` | P | 4 |
| T12 | Tony Gemignani — Hollywood+ TV segment (no dough numbers; see §6.2b) | `npLsJBm3YWc` | P | 2 |
| T13 | Davide Civitiello — Italia Squisita "Pizza napoletana fatta in casa" (6–8 h ball proof, 250 g balls; see §6.3f) | `Cq90lUQUCUo` | P | 4 |
| T14 | Ojo's Pizza — "Cold vs Room Temp PIZZA Dough — I Tested 24, 48 & 72 Hours" (bulk vs ball × RT 19 °C vs fridge; §6.5) | `ZUVG9Cf5yfA` | P | 4 |
| T15 | Vito Iacopelli — "I Fermented Pizza Dough To The Limit" (24 h vs 7 d vs 30 d; full poolish recipe; §6.6) | `q_eMwU14DWo` | P | 5 |
| T16 | Julian Sisofo — "Is Cold Fermentation Better for Pizza?" (3 h direct vs 4-day cold; §6.7) | `AtIiSq6u3DA` | P | 3 |
| T17 | Ooni — "How To Make Pizza Dough At Home" 2017 (1.5 % fresh yeast, 2 h; §6.12) | `u48x2Agg0Ms` | P | 4 |
| T18 | Vito Iacopelli — "Next Level / Double Fermentation Pizza Dough with Poolish" (split method; §6.8) | `u7Hd6ZzKgBM` | P | 5 |
| T19 | What's Good Dough — day with Charlie Anderson at Good Pizza (2–4 h RT head start after balling; §6.9) | `1vGNXOr-k-8` | P | 4 |
| T20 | Charlie Anderson — "I Proofed Pizza Dough for 30 Days" (yeast ladder 0.01–0.5 %; §6.10) | `ZzzAufgflCg` | P | 5 |
| T21 | Städler Made — "How to cold ferment your pizza dough" (4–7 °C 1–3 d bulk, 4 h balls at 19–22 °C; §6.11) | `VqyveaUIOhQ` | P | 3 |
| T22 | Santa Barbara Baker 24 h Ooni Koda (`pYQDDfGfU-o`); KasraCooks 48 h (`e6aqFqRML0w`, no speech) | — | P | 2 |
| — | NOT obtained (YouTube blocked the transcript proxy at every retry): Gozney "Overnight Pizza Dough" `sJCWZFj8rgI` (numbers taken from its recipe page R13 instead) and Julian Sisofo "Does Longer Fermentation Make Better Pizza?" (5-day fridge) `jQTrKBC_i-4`. Re-run `raw/fetch_transcripts2.sh` to retry. | | | |

Note: youtubetotranscript.com is randomly blocked by YouTube and firecrawl is capped at ~10 req/min, so transcripts were fetched serially with retries; where a transcript did not arrive, the creator's own recipe page (below) was used instead and is marked as such. Where a video description carried the recipe, the description text on videodb.org was used (Nocerino).

### Creator recipe pages / official brand pages (P)
| # | Source | URL | Notes | Cred |
|---|---|---|---|---|
| R1 | Julian Sisofo — Puffy Poolish Pizza (clock-time schedule) | https://juliansisofo.com/blog/poolishpizza | 0.5 g yeast / 150 g water / 150 g flour poolish; 8 am→7:40 pm timeline | 4 |
| R2 | Julian Sisofo — Ultimate Neapolitan (biga+poolish, 6×286 g) | https://juliansisofo.com/blog/Utlimateneapolitanpizzadough | 8–12 h RT preferments, 8–12 h cold bulk, 24–48 h cold balls | 4 |
| R3 | Julian Sisofo — Contemporary (biga+poolish, 276 g balls) | https://juliansisofo.com/blog/Contemporarypizza | 7 h RT + 12–24 h fridge preferments; dough 21–27 °C; 1 h to warm | 4 |
| R4 | Julian Sisofo — Canotto (100 % biga, 24 h fridge, final dough 20 °C) | https://juliansisofo.com/blog/canottopizza | ice in mix; 5 g ADY per 480 g flour biga | 4 |
| R5 | Julian Sisofo — Whole-wheat Neapolitan (biga with 59 % whole wheat) | https://juliansisofo.com/blog/whole-wheat-pizza | relevant to atta blend | 3 |
| R6 | Brian Lagerstrom — Neapolitan Pizza for a Home Pizza Oven (recipe page) | https://brianlagerstrom.com/recipes/neapolitan-pizza-for-a-home-pizza-oven/ | 665 g 00, 450 g water 22–23 °C, 0.7–0.8 g IDY, 18 g salt; 8–10 h bulk at ≥22 °C; balls 2 h–3 d fridge; 60 min out | 5 |
| R7 | Charlie Anderson — Authentic New York-Style Pizza | https://charlieandersoncooking.com/recipes/authentic-new-york-style-pizza | 0.5 % IDY, 65 % water, 3 % salt, 1.5 % sugar; bulk 1–3 h RT to 2–3×; fridge 2–3 d | 5 |
| R8 | Ooni — Cold-Proof Pizza Dough | https://ooni.com/blogs/recipes/cold-prove-pizza-dough | 607 g 00 / 368 g water / 18 g salt / 1.4 g IDY; fridge 24–72 h bulk; balls 5 h on counter | 5 |
| R9 | Ooni — Classic Pizza Dough (current) | https://ooni.com/blogs/recipes/classic-pizza-dough | 613 g / 368 g / 2.7 g IDY / 18 g salt; 2 h bulk, 30–60 min balls; freeze after balling | 5 |
| R10 | Ooni — Neapolitan-style dough (Halo Pro, 1.2 kg flour) | https://ooni.com/blogs/recipes/ooni-neapolitan-style-pizza-dough | 18–20 h bulk at 16–20 °C; balls 5–6 h, 2–3 h if warm; dough temp targets by season | 5 |
| R11 | Ooni — How to freeze and defrost pizza dough | https://ooni.com/blogs/ooni-insights/how-to-freeze-pizza-dough-and-how-to-defrost-it-correctly | freeze after first proof + balling; ≤3 months; fridge overnight then ≥6 h out; counter thaw ~3.5 h | 5 |
| R12 | Ooni — How to make your first Ooni pizza | https://ooni.com/blogs/ooni-insights/how-to-make-your-first-ooni-pizza | "about four hours outside the fridge" for cold-proofed dough | 4 |
| R13 | Gozney — Overnight Pizza Dough (page for T7) | https://us.gozney.com/blogs/recipes/overnight-pizza-dough | 1000 g 00 W310+, 600 g water, 30 g salt, 0.5 g fresh / 0.2 g IDY; ≤16 h bulk at 22 °C; balls 8 h RT or fridge 1–2 d; out ≥6 h before | 5 |
| R14 | Gozney — 24 Hour Neapolitan Pizza | https://www.gozney.com/blogs/recipes/24-hour-neapolitan-pizza-recipe | 500 g / 310 g / 13 g salt / 0.1 g dry yeast; 16 h RT bulk; balls fridge 4–10 h; out 3–5 h | 5 |
| R15 | Gozney — Neapolitan Pizza (Jack Morrison-style, preferment option) | https://www.gozney.com/blogs/recipes/neapolitan-pizza | 1071 g / 655 g / 36 g salt / 2.4 g IDY; balls fridge 24–48 h; out ≥3 h | 4 |
| R16 | Gozney — Neapolitan dough by Mike Fitzick (The Pizza Jew) | https://www.gozney.com/blogs/recipes/neapolitan-pizza-dough-by-the-pizza-jew | 1.5 kg / 1 L / 30 g / 4 g fresh; overnight bulk; balls 2–3 h RT or fridge 2–3 d | 4 |
| R17 | Gozney Academy — How to proof pizza dough | https://us.gozney.com/blogs/academy/how-to-proof-pizza-dough | poke test; 24 h min cold, 2–3 d optimum | 4 |
| R18 | Gozney Academy — How to fix over-proofed pizza dough | https://us.gozney.com/blogs/academy/how-to-fix-over-proofed-pizza-dough | knock back & re-ball | 4 |
| R19 | Alex (French Guy Cooking) — My Super Legit Pizza Dough + calculator | https://www.frenchguycooking.com/recipe/my-super-legit-pizza-dough ; https://www.frenchguycooking.com/pizzadough | 520 g / 365 g / 16 g / 1 g fresh (0.5 g IDY); 2 h bulk + 6 h balls RT | 4 |
| R20 | Vincenzo's Plate — Johnny Di Francesco (world champion) Neapolitan dough + Vincenzo's comment replies | https://www.vincenzosplate.com/neapolitan-pizza-dough/ | 1 kg / 600 ml / 30 g / 1–2 g fresh; 2 h bulk; balls 24 h at 16–18 °C; warm-room advice | 4 |
| R21 | Massimo Nocerino — dry-yeast Neapolitan (video description) | https://videodb.org/how-to-make-an-excellent-neapolitan-pizza-with-dry-yeast-with-massimo-nocerino/fwcmv0N67p8 | 1 kg / 650 ml / 2 g dry yeast / 20 g salt; 2 h RT paste; 18 h fridge; 2 h out; 220 g balls 4–5 h | 4 |
| R22 | Massimo Nocerino — poolish (video description) | https://videodb.org/how-to-make-poolish-for-pizza-and-bread-with-massimo-nocerino/WYVJj-xvHuI | 500/500/1 g fresh (0.5 g dry) 24 h at 16–18 °C; then +200 g flour, 18 g salt; 6 h balls | 4 |
| R23 | Tony Gemignani — Talks at Google (transcript via rosetta.to) | https://rosetta.to/u/talksatgoogle/making-dough-from-scratch-tony-gemignani-talks-at-google | 24 h good / 36 better / 48 best; poolish 18 h; 12.5–14.6 % protein | 4 |
| R24 | Tony Gemignani — Respecting the Craft: dough recipes | https://tonygemignani.com/respecting-the-craft-dough-recipes/ | classic Italian: 1 L water, 1.8 kg flour, 50 g salt, 50 g oil, 3 g malt, 2–10 g yeast | 4 |
| R25 | Pizza Bible Master Dough (book excerpt reproduced on tfrecipes / scribd) | https://www.tfrecipes.com/pizza-bible-master-dough/ ; https://de.scribd.com/document/256940731/Tony-Gemignani-s-master-dough-with-starter | 453 g flour, 210 g ice water, 2.2 g ADY, 10 g salt, 10 g malt, 90 g poolish/tiga; fridge 24–48 h; warm to 60–65 °F | 3 (secondary copy of book) |
| R26 | Tony Gemignani Pizza Napoletana (Wine Enthusiast, from The Pizza Bible) | https://www.wineenthusiast.com/recipe/tony-gemignanis-pizza-napoletana/ | poolish 18 h RT; dough fridge 48 h; ball out 30 min | 3 |
| R27 | Ethan Chlebowski — 2-hour weeknight pizza | https://www.ethanchlebowski.com/cooking-techniques-recipes/how-to-make-2-hour-weeknight-pizza | 400 g / 320 g (40 °C) / 8 g IDY / 8 g salt; 40 min bulk + 30 min proof | 3 |
| R28 | Ethan Chlebowski — Detroit pan pizza (Cookwell) | https://www.cookwell.com/recipe/detroit-style-pan-pizza | 300 g / 210 g / 3 g yeast; RT 1–2 h or fridge up to 4 d; out 1–2 h | 3 |
| R29 | AVPN — official recipe / regulation page | https://www.pizzanapoletana.org/en/ricetta_pizza_napoletana | 1 L water, 40–60 g salt, 1.6–1.8 kg flour, 0.1–3 g fresh yeast (dry = 1/3), 200–280 g balls, 8–24 h rise | 5 |

### Calculators / aggregators / forums (C, E, B)
| # | Source | URL | Notes | Cred |
|---|---|---|---|---|
| C1 | dough.school yeast calculator (IDY % tables by temp & hours) | https://www.dough.school/guides/yeast-calculator | table reproduced §2.9 | 3 |
| C2 | Jordo's Pizza Calculator — cold fermentation guide + timing guide | https://jordospizzacalculator.com/guides/cold-fermentation ; https://jordospizzacalculator.com/guides/fermentation-timing | IDY % tables, 2–5 °C fridge, 60–90 min out | 3 |
| C3 | Fond.kitchen fermentation guide | https://fond.kitchen/guides/pizza-dough/pizza-dough-fermentation/ | yeast % by schedule; Q10-ish rule | 3 |
| C4 | The Pizza Craft — Ooni recipe, 4 schedules incl. poolish | https://thepizzacraft.com/dough-and-fermentation/ooni-pizza-dough-recipe/ | 1.8 g / 0.9 g yeast schedules; poolish 100/100/0.1 g 14–18 h | 3 |
| E1 | PizzaBlab — room temp vs cold fermentation | https://www.pizzablab.com/learning-and-resources/fermentation/pizza-dough-fermentation-methods/ | 4–8× speed ratio; 0.77 % IDY 24 h cold example | 4 |
| E2 | PizzaBlab — room-temperature fermentation guide | https://www.pizzablab.com/learning-and-resources/fermentation/guide-to-room-temperature-fermentation/ | FDT 23–27 °C; 0.2 g dry yeast per 500 g dough @25 °C 6 h | 4 |
| E3 | PizzaBlab — how to use yeast | https://www.pizzablab.com/learning-and-resources/ingredients/how-to-use-yeast/ | never put dry yeast in water < 20 °C; rehydrate 37–43 °C | 4 |
| E4 | pizzamaking.com — Charlie Anderson NY series thread | https://www.pizzamaking.com/forum/index.php/topic,78797.0.html | confirms Charlie posts there; salt+yeast after 20 min autolyse | 3 |
| B1 | Baking Steel 72 h / 48 h no-knead doughs | https://bakingsteel.com/blogs/recipes/72-hour-pizza-dough-recipe ; https://bakingsteel.com/blogs/recipes/48-hour-pizza-dough-what-happens-when-you-almost-planned-ahead | 1 g yeast/500 g; 24 h RT + 48 h fridge; 3–4 h balls; freeze advice | 3 |
| B2 | Home Cooking Collective 72 h dough | https://homecookingcollective.com/cold-fermented-pizza-dough-recipe/ | 0.12 % IDY; overproof after 96 h; balls 3–5 h | 2 |
| B3 | My Pizza Corner — cold proof / proof signs | https://mypizzacorner.com/pizza-recipes/cold-proof-pizza-dough/ ; https://mypizzacorner.com/pizza-tips/how-to-tell-when-pizza-dough-is-proofed/ | 8–10× yeast for cold vs RT 24 h; out 6–8 h; poke test | 2 |
| B4 | My House of Pizza — Ooni dough improved | https://www.myhouseofpizza.com/ooni-pizza-dough-recipe-improved/ | 1.2 g IDY/300 g; 2–3 h RT + 24–72 h fridge; balls 4–6 h | 2 |
| B5 | Pala Pizza 24 h cold-fermented Neapolitan | https://palapizza.com/recipe/neapolitan-pizza-dough-recipe/ | 1.5 g IDY/500 g; 2 h RT; balls fridge overnight; 3 h out | 2 |

---

## 2. Findings with numbers (by creator)

### 2.1 Charlie Anderson (T1 transcript + R7 recipe + E4)
Transcript T1 (Good Pizza, Cleveland; NY-ish 18-inch pies; commercial but the schedule is the point):
- "Our dough is basically a three-day process." Day 0: poolish = "equal parts flour and water along with just a little bit of yeast", flour = high-gluten white + a small portion of fresh-milled sifted whole wheat; "throw this in the cooler for 24 hours". Water for tomorrow is also measured and put in the cooler so it "come[s] out of the cooler at the same temperature every single day … helps to keep our dough temperature down, which is going to … prevent the dough from over fermenting."
- Day 1: poolish "rising for about 24 hours … sweet complex, little bit of alcohol smell, but nothing too intense" — no additional yeast added to the final dough (all leavening from the poolish). Hydration "about 73 to 74 %". Adds diastatic malt. Mix 8 min low → 20 min autolyse → **salt added after autolyse** ("salt sort of tightens the gluten and kind of slows down the whole fermentation process") → 16 min high speed. Dough split into 4 bins "to cool down quicker … otherwise the middle is a lot hotter than the outsides … fermenting unevenly" → cooler 24 h.
- Day 2: ball, cooler another 24 h → "a total of about a 72-hour fermentation". Stone window 600–675 °F for his deck oven (not applicable to CasaKoa).
- No explicit yeast grams in this video (restaurant scale). Home numbers from R7: **0.5 % IDY, 65 % water, 3 % salt, 1.5 % sugar, 90 % high-gluten + 10 % sifted spelt/rye; bulk at RT "until at least doubled (and up to tripled) … about 1–3 hours"; then fridge 2–3 days; same-day alternative: leave at RT "ready to bake in 2–3 more hours"**. Balls 253 g. The ytrecipe copy adds: "Remove the dough balls from the fridge and let them sit uncovered for 30 minutes" (that is for a 550 °F home-oven NY pie, not Neapolitan).
- WhatsGoodDough podcast chapter titles (not transcribed): "Poolish vs straight dough: 73 % hydration", "Controlling dough temperature for consistent fermentation", "Two-stage dough balling technique", "Why long fermentation doesn't always mean better pizza", "How to identify over-proofed pizza dough". (https://www.whatsgooddough.com/charlie-anderson-of-good-pizza/)

### 2.2 Julian Sisofo (T2, T3 transcripts + R1–R5)
T3 (Easiest Poolish, by hand — closest analogue to Dawood's method):
- Poolish: 150 g water + ADY (0.5 g per R1) + 150 g 00/bread flour, "ferment on the counter at room temperature, which is anywhere between 60 to 80° F … this is what you'll get after 10 to 12 hours."
- Final dough (same day, "about 4 hours until you actually bake"): 190 g RT water + all poolish + 343 g 00 + 13.72 g salt (≈ 2.8 % of 493 g flour; hydration ≈ 69 %). Mix, rest 30 min, slap-and-fold, rest 30 min ("my room temperature is around 73° F"), ball the mass tight, bulk 1 h, divide into 3 × 273 g balls, "ferment until doubled in size … anywhere between 1 to 2 hours and then we're ready to bake." Pop thin translucent bubbles before stretching. No sugar, no oil.
- R1 clock version (same recipe, refrigerated balls): 8:00 mix poolish → 16:00 mix dough → folds 16:30/17:00 → forms 17:30/18:00 → 19:00 divide → 19:10 rest RT → **19:40 refrigerate overnight**.
T2 (Contemporary, 100 % biga): biga RT "8 to 12 hours"; final dough with ≥50 % iced water "until the dough reaches about 72° F"; bulk 1 h RT; 3 × 276 g balls; 30 min RT then **fridge 24–72 h**; out of fridge "at least a half an hour before baking" (optional). "When you use yeast, you do not want to use too much or you actually taste it."
R2 (Ultimate Neapolitan): biga 0.65 g ADY/130 g water/260 g flour and poolish 0.5 g ADY/150 g/150 g, each 8–12 h RT; final 410 g water + 582 g flour + 24 g salt (6 × 286 g); cold bulk 8–12 h; 2 h to warm; ball; **fridge 24–48 h**; warm before baking.
R3 (Contemporary page): preferments 7 h RT then 12–24 h fridge; dough mixed to **70–80 °F (21–27 °C)**; bulk either double at RT or 24 h fridge; cold dough "usually takes about 1 hour" to come to temperature; 276 g balls double at RT or fridge 24 h then 1–2 h RT "until fluffy".
R4 (Canotto): biga 5 g ADY per 480 g flour with 4 °C water, mixed to 78 °F, fridge 24 h; final dough with 100 g crushed ice to finish at **68 °F (20 °C)**; balls fridge 24 h (or double at RT same day).
R5 (Whole-wheat): biga 3 g ADY / 130 g water / 153 g whole wheat + 107 g bread flour, 8–12 h RT; dough 100 g ice + 145 g water + 240 g 00 + 12 g salt; bulk 1 h; 3 × 290 g; rest 1 h; bake. (Whole wheat share ≈ 31 % of total flour — evidence that a 20 % atta blend is well within what a pro uses.)

### 2.3 Brian Lagerstrom (T4 transcript + R6)
- 450 g water at **73–76 °F (23–24 °C)** — "Water temperature essentially determines dough temperature, which more or less determines how quickly a dough ferments … if your water … is way colder … your dough's basically going to be dead after the 8 to 10 hours of fermentation."
- **0.7 g IDY per 665 g 00 flour (0.105 %)**, 18 g salt (2.7 %), hydration "68 % to 69 %" ("In Italy … somewhere between 58 % and 62 %"). Designed so you "mix … 10 p.m. … next morning … it will have bulk fermented properly … divide it, then throw it in the fridge." Recipe page: bulk **8–10 h at ≥72 °F (22 °C)**; "at around 76 °F (25 °C), the bulk ferment may be done in about 8 hours"; avoid rooms below 70 °F. No 0.1 g scale: ¼ tsp minus ~25 %.
- Folds at 30 and 60 min. 4 × ~275 g balls (283 g if divided exactly). Balls into fridge **lid off 5–10 min** so trapped warm air does not over-proof them, then lid on. "Good in the refrigerator for about 3 days, but … best on the day that you divide and shape it." Pull **1 hour before** baking (8 h fridge in the video). Degas slightly, pop big bubbles. Bake 90 s at 850–1000 °F.

### 2.4 Adam Ragusea (T5)
- NY style, home oven. Balls straight into fridge without RT rise ("I think that makes almost no difference"); "after at least 24 hours cold rise these are ready"; "these basically get better as they age in the fridge up to a week"; earlier video: 48 h preferred, "sometimes I age it a whole week. It almost tastes like sourdough." Uses dough **straight from the fridge, no warm-up** ("this is a very wet dough and the cold helps keep it workably stiff") — valid for a 6–7 min home-oven bake, NOT for a 60–90 s Neapolitan bake (cold, dense balls give a gummy, pale cornicione). Oil-coated balls in individual containers keep a week.

### 2.5 Ooni official (T6 transcript + R8–R12)
T6 (Kirsty, Ooni HQ, cookbook recipe): 300 g water, 10 g salt, **7 g fresh or 3 g active dried yeast, 500 g 00**; water = ⅔ cold + ⅓ boiling ("perfect temperature for activating yeast"); mix 5–10 min; bulk "in a warm place … one to two hours … doubled in size"; 5 × 160 g balls (12-inch) — note tiny balls; balls rest **20 minutes** then stretch; oven 500 °C, "shouldn't be cooked below 400 °C". This is Ooni's *same-day* ~2–3 h dough.
R9 (current Classic): 613 g 00, 368 g lukewarm water (60 %), **2.7 g IDY** (3.5 g ADY / 8.5 g fresh), 18 g salt; rest **2 h "or until doubled"**; divide 3 × 330 g or 4 × 250 g; balls **30–60 min in a warm place "or until doubled"**; "If you're freezing dough balls for later use, pop them in individual bags and freeze them at this point" (i.e., right after balling, before the final rise). Old recipe: 7 g IDY / 607 g / 364 g / 18 g, 3–4 h total.
R8 (Cold-Proof): 607 g 00, 368 g cold water, 18 g salt, **1.4 g IDY** (1.6 g ADY / 4.1 g fresh) — "similar to our Classic … with the quantity of yeast adjusted"; ⅔ cold + ⅓ boiled water → 35–38 °C (fresh) / 40–46 °C (dry); knead; **fridge in bulk 24–72 h "when the dough has roughly doubled in size, remove"**; divide and ball; **"leave to rise for 5 hours on your kitchen counter so they can come up to room temperature and double in size"**; "24 to 96 hours" possible; "three to five days is generally the longest".
R10 (Neapolitan-style, Halo Pro): 1200 g flour, 780 g water (65 %), 36 g salt, yeast listed as 7 g (type not stated — likely fresh given 18–20 h bulk); **bulk 18–20 h at 16–20 °C**; balls **5–6 h "or until they double in size … as soon as 2 to 3 hours in a warm environment"**; "If your plans change … refrigerating it overnight to use the following day. Before using, you may need to re-ball the dough and let it come to room temperature until it doubles in size." Target dough temp **cooler months 23–26 °C, warmer months 21–23 °C**; "In the summer, chill your water in the fridge for up to 2 hours before use."
R11 (freezing): freeze "up to the point where you're told to let it rest until it doubles in size (the first proof)", divided and balled; keeps **up to 3 months**; defrost in fridge the day before then "remove … at least 6 hours before you want to cook"; or counter until "doubled in size — which can take 3.5 hours or so"; quick thaws (30 min water bath / 15 min microwave) give sticky/tearing or springy dough.
R12: cold-proofed dough — "give it about four hours outside the fridge before you try to stretch it".

### 2.6 Gozney official (R13–R18; T7 transcript pending)
- R13 Overnight dough: **1000 g 00 (W310+), 600 g water, 30 g salt, 0.5 g fresh / 0.2 g IDY (0.02 %)**; knead 10 min; bulk "overnight for a maximum of 16 hours at 22 °C"; 6 × 250 g balls; **8 h RT (22 °C)** or fridge "an extra 1–2 days"; "Remove the dough balls from the fridge at least 6 hours before you want to bake". 450 °C, 90 s.
- R14 24-hour Neapolitan: 500 g 00 or strong bread flour, 310 g water (62 %), 13 g salt, **0.1 g dry yeast (0.02 %)**; **16 h RT bulk**; 3 × 270 g balls **fridge min 4 h, max 10 h**; **remove 3–5 h before baking**; 495 °C 60–90 s.
- R15 Neapolitan (with preferment option): 1071 g flour, 655 g water, 36 g salt, **2.4 g IDY** (or 4 g without preferment on 1191 g); mix → fridge 1 h → 250 g balls → **fridge 24–48 h → out ≥3 h before**.
- R16 Fitzick: 1.5 kg 00, 1 L water (67 %), 30 g salt, 4 g fresh (0.27 %); overnight RT bulk; ~270 g balls "2–3 hours before using or keep in the fridge for 2–3 days".
- R17 proofing: optimum quick-proof temp "20C – 38C"; cold "24 hours is a good minimum … around 2–3 days is the optimum before it starts deteriorating"; balls RT "1 to 24 hours or even more", cold "24 to 72 hours"; "Most doughs usually double in volume when proofed"; poke: "springs back right away, it needs more proofing … springs back slowly and leaves a small indent, it's ready". Warm + long = "floppy and sour".
- R18 over-proofed: >2× size, large bubbles, lost shape, poke dent permanent; fix by knocking back and re-balling (no wait time given; Ooni R10 says re-ball then RT "until it doubles in size").

Additional Gozney/Ooni official pages (P, cred 5):
- Gozney Classic Pizza Dough (https://us.gozney.com/blogs/recipes/classic-pizza-dough): 1000 g flour, 600 g cold water, **2 g dry yeast (0.2 %)**, 25 g salt, 25 g oil; **bulk 1 h RT**; balls 250/350 g; **fridge 24–48 h**; **"3–6 hours" at RT before baking**; same-day alternative "proofed at room temperature for 8–10 hours".
- Gozney NY-style (https://us.gozney.com/blogs/recipes/new-york-style-pizza-dough-recipe): 1000 g bread flour, 590 g cold water, **150 g poolish + 2 g dry yeast**, 25 g salt, 40 g oil; "leave at room temperature for 1–2 hours, then place in the fridge … 24–48 hours … let the dough balls sit at room temperature for 3–6 hours before baking"; same-day 8–10 h RT.
- Ooni Neapolitan-style (EU page, https://eu.ooni.com/blogs/recipes/ooni-neapolitan-style-pizza-dough): **"In warm environments above 28 ºC / 82 ºF, reduce the yeast by 50 % to prevent over-proofing."** Target finished-dough temperature "21–26 ºC (70–79 ºF)". This is the only official brand rule found that quantifies a hot-kitchen yeast cut.

### 2.7 Italian pizzaioli with English text
- **Johnny Di Francesco** (R20): 1 kg Le 5 Stagioni Napoletana 00 (W 280–330 required), 600 ml RT water (60 %), 30 g salt (dissolved first), **1–2 g fresh yeast** ("approximately 0.3–0.7 g active dry"); knead → ≥2 h RT rest → 250 g balls (220–250 g) → **24 h at 16–18 °C**. Vincenzo's reply to a 24 °C-kitchen reader: "reduce the yeast slightly or letting the dough proof in the fridge for part of the fermentation … bring the dough back to room temperature for 3–4 hours before stretching"; "Try using cooler water, especially in warmer weather"; frozen: "Thaw in the fridge overnight, then leave at room temperature for 3–4 hours".
- **Massimo Nocerino** (R21): 1 kg 00, 650 ml water (65 %), **2 g dry yeast (0.2 %)**, 20 g salt; yeast dissolved, flour absorbed gradually into a paste, **2 h RT uncovered**; add rest of flour + salt; **fridge 18 h**; **2 h at RT**; ~220 g balls; **final proof 4–5 h "depending on temperature" until doubled**. Poolish (R22): 500 g 00 + 500 ml cold water + **1 g fresh (0.5 g dry) — 24 h at 16–18 °C**; then +200 g flour +18 g salt (≈ 71 % hydration), 30 min rest, shape, **6 h before baking**.
- **Tony Gemignani** (R23–R26): "make dough today and eat it today" is "one of the worst things you could do"; "24 hours that's good … 36 hours that's better … 48 hours … even way better"; poolish "equal parts flour and water … about 18 hours"; Pizza Bible master dough: 453 g flour, 210 g ice water (+70 g warm 80–85 °F to bloom 2.2 g ADY), 10 g salt, 10 g malt, 5 g oil, 90 g poolish/tiga; rest RT 15–20 min; **fridge 24–48 h**; "leave wrapped at room temperature until the dough warms to 60 to 65 °F" (for a home oven); Napoletana variant: dough fridge 48 h, ball out 30 min. Classic Italian formula: 1 L water : 1.8 kg flour : 50 g salt : 50 g oil : 3 g malt : 2–10 g yeast; "every recipe has to be altered" for heat, humidity, etc. Water: "80 % cold water 20 % warm", "don't use hot water". Flour for his American styles 12.5–14.6 % protein.
- **Davide Civitiello** (Italia Squisita "Pizza napoletana fatta in casa", `Cq90lUQUCUo`; recipe reproduced at https://www.ristorazioneitalianamagazine.it/pizza-napoletana-fatta-in-casa-davide-civitiello/ and https://www.lucianopignataro.it/a/pizza-della-settimana-napoletana-fatta-in-casa-di-davide-civitiello-abbinata-al-badius-irpinia-aglianico-antonio-molettieri/237155/, cred 4): "1600 g farina 00, 1 lt acqua, 50 g sale, 2 g lievito, 20 g zucchero, 50 g olio Evo" (62.5 % water, 3.1 % salt, **2 g fresh yeast = 0.125 %**, 1.25 % sugar, 3.1 % oil); salt dissolved in the water, yeast crumbled into the flour, "facendo attenzione a non far venire in contatto il sale con il lievito"; knead 15–20 min; rest 20–40 min; divide into 8–10 balls (≈ 280–290 g); **"lasciati lievitare dalle 6 alle 8 ore … raddoppiato di volume"** under a damp cloth at ambient (Naples) temperature; wood oven ~90 s. Half-size version: 800 g flour, 500 g water, 25 g salt, 2 g yeast, 8 g sugar, 25 g oil (0.25 % fresh) with the same 6–8 h ball proof. Note: this is a direct-dough, ball-immediately, 6–8 h RT schedule with salt+oil+sugar at almost exactly Dawood's salt and oil levels — the closest Italian analogue to schedule A without a poolish.
- **AVPN** (R29): per 1 L water: 40–60 g salt, 1.6–1.8 kg flour, **fresh yeast 0.1–3 g (dry = ⅓ of fresh)**, balls 200–280 g, "Recommended levitation time Min 8 – max 24 hours".

### 2.8 Alex (French Guy Cooking) — R19
- 520 g 00, 365 g water (70 %), 16 g salt (3.1 %), **1 g fresh or 0.5 g instant (0.1 %)**; knead ~20 min; **bulk 2 h RT; 3 balls; 6 h in airtight container at RT** → bake. Calculator default 57 % hydration; "I know this last number [yeast] sounds very low, but it just works." Commenter: "for instant yeast you need to use ¼ of the quantity of fresh yeast" (Alex's own page uses ½).

### 2.9 Ethan Chlebowski — R27/R28 (no dedicated Neapolitan video found)
- 2-hour weeknight: 400 g flour, 320 g water at ~105 °F (40 °C), **8 g IDY (2 %)**, 8 g salt; rise 40 min; proof 30 min — an emergency dough.
- Detroit: 300 g / 210 g / 3 g yeast (1 %): RT 1–2 h to double **or** "cold ferment for up to 4 days … set the dough on the counter at room temp for 1–2 hours in advance". Pinsa page: fridge "24 to 120 hours (1 to 5 days)".

### 2.10 Yeast-vs-time-vs-temperature tables (calculators)
dough.school (C1), IDY % of flour, room temperature:
| Time | 20 °C | 25 °C | 30 °C |
|---|---|---|---|
| 4 h | 1.50 % | 1.00 % | 0.70 % |
| 6 h | 0.80 % | 0.50 % | 0.35 % |
| 8 h | 0.50 % | 0.30 % | 0.20 % |
| 12 h | 0.25 % | 0.15 % | 0.10 % |
| 24 h | 0.10 % | 0.05 % | 0.03 % |
| 48 h | 0.04 % | 0.02 % | — |
Cold (2 h RT + fridge): 24 h 0.15 %; 48 h 0.08 %; 72 h 0.05 %. "At 25 °C, yeast works nearly twice as fast as at 20 °C."

Jordo's (C2), cold ferment (2–5 °C fridge; "Above 7 °C, fermentation is too unpredictable"):
| Time | IDY | Fresh | ADY |
|---|---|---|---|
| 24 h | 0.10–0.15 % | 0.30–0.45 % | 0.12–0.18 % |
| 48 h | 0.05–0.10 % | 0.15–0.30 % | 0.06–0.12 % |
| 72 h | 0.03–0.05 % | 0.09–0.15 % | 0.04–0.06 % |
Timing guide: same-day 7 h = 3 g IDY per 500 g (0.6 %); 24 h cold 1 g IDY/500 g; 48 h 0.5 g; 72 h 0.3 g; "Pull your dough from the fridge 60–90 minutes before you plan to stretch it" (note: this is for a bulk-cold, ball-warm workflow).

Fond (C3): same-day 6–8 h IDY 0.3–0.5 %; overnight 12–18 h 0.15–0.3 %; 2–3 d cold 0.1–0.15 %; 4–5 d cold 0.03–0.06 %; RT 20–26 °C 4–8 h; "Roughly 8–10 °C warmer, about twice as fast"; zones: 29–38 °C "too fast — yeast runs ahead of flavor"; 21–26 °C same-day 4–8 h; 18–20 °C 8–18 h overnight; 3–6 °C 24–72 h; 0–3 °C near-dormant.

PizzaBlab (E1/E2): RT ferments "4–8 times faster" than 4 °C ("1 hour at 20 °C ≈ 6 hours at 4 °C"); RT examples "4 hours at 30 °C, 6 hours at 25 °C, 12 hours at 20 °C"; commercial 0.2–0.7 % yeast for 24–72 h usability; examples 0.77 % IDY for 24 h at 4 °C, 0.31 % IDY for 48 h at 4 °C (these are much higher than the calculators — PizzaBlab models a *fully cold* ferment with no warm phase); FDT target 23–27 °C; 0.2 g dry yeast per 500 g dough for 6 h at 25 °C (≈ 0.07 %). E3: never add dry yeast to water below 20 °C; rehydrate at 37–43 °C (relevant to the "cold water poolish" idea — dissolve IDY in a little tepid water first, then add cold).

The Pizza Craft (C4) Ooni-style schedules (600 g flour, 360 g water, 15 g salt): same-day 3–4 h 1.8 g yeast (0.3 %); overnight/24–48 h cold 0.9 g (0.15 %), bulk 30 min, ball, fridge, **warm 2–4 h**; poolish schedule: 100 g flour + 100 g water + **0.1 g yeast, 14–18 h RT**, then + 500 g flour, 260 g water, 15 g salt, **0.5 g yeast**, bulk 30 min, balls 2–3 h. Claims "past 72 hours … slack, tearing dough with sour flavors" and "sweet spot is 36 [h]".

### 2.11 Proof-state signals (all sources agree)
- Ready: about doubled (Ooni/Gozney/Sisofo/Nocerino/mypizzacorner: "doubled … maybe a little less"), relaxed/soft, small bubbles, poke ½ inch → "slowly returns halfway".
- Under: springs back fast, no bubbles, still ball-shaped.
- Over: >2× (3–4×), large irregular bubbles/craters, spread flat or merged, poke dent permanent, strong alcohol/sour smell, tears; Lagerstrom: huge thin-walled bubbles "will turn black" in the oven. Fix: knock back, re-ball, re-proof to double (Gozney/Ooni); mypizzacorner: dough loses strength.
- Lagerstrom's practical over-proof preventer: put freshly balled dough in the fridge **uncovered for 5–10 min** before lidding.

### 2.12 Freezing (Ooni R11, Ooni R9, Baking Steel B1, Vincenzo R20)
- Freeze right after balling (Ooni R9: "at this point" after dividing, before the final rise; R11: after the first proof and balling; Baking Steel: after the full 72 h ferment, "oil lightly, and freeze airtight"). Up to 3 months.
- Thaw: fridge overnight, then RT — Ooni ≥6 h; Baking Steel / Vincenzo 3–4 h; counter-only thaw "3.5 hours or so … depending on the temperature of your kitchen" until doubled. Quick thaws harm texture.

---

## 3. Contradictions between sources and how to resolve them

1. **How long balls need out of the fridge before stretching.** Lagerstrom 60 min (balls only 8 h in fridge, 68 % hydration, Gozney Dome); Sisofo 30–60 min ("optional") to 1–2 h; Charlie (NY, home oven) 30 min; Jordo's 60–90 min; Gemignani "until 60–65 °F" (~30–60 min); Pala 3 h; Gozney 3–5 h (R14), ≥3 h (R15), ≥6 h (R13); Ooni 4 h (R12) to 5 h (R8) "double in size"; Vincenzo 3–4 h; My Pizza Corner 4–6 h.
   *Resolution:* the number depends on whether the ball was **already fully proofed when it went cold** (then it only needs to lose its chill: 30–90 min) or whether the fridge stage is doing the *rising* (Ooni/Gozney style: balled young, must double at RT: 3–6 h at ~22 °C, 2–3 h at 28 °C+). Ragusea's "straight from fridge" is home-oven NY only. For Dawood's plan (ball → RT proof to double → optional fridge hold), a fridge-held *already-risen* ball needs 45–90 min at 28–34 °C; a ball that went into the fridge within ~30 min of balling needs to double: ~2–3 h at 28–30 °C, 3–4 h at 24 °C, 5–6 h at 18 °C (Ooni R10 numbers).

2. **Yeast for cold fermentation.** Calculators (C1–C3): 0.05–0.15 % IDY for 24–72 h. Ooni R8: 1.4 g/607 g = 0.23 % for 24–72 h fully cold. PizzaBlab E1: 0.77 % IDY for 24 h and 0.31 % for 48 h fully cold at 4 °C. Gozney R13: 0.02 % IDY but with a 16 h RT bulk at 22 °C.
   *Resolution:* these are different workflows. Warm-bulk-then-cold (calculators, Gozney) needs 3–10× less yeast than mix-and-straight-to-fridge (Ooni, PizzaBlab), because most of the rise happens warm. For the engine: pick the model by workflow, not by averaging. With a poolish supplying most of the yeast (Charlie adds none; Sisofo adds none in T3/R1), the extra IDY in the final dough is 0 to ~0.1 %.

3. **Maximum useful cold time.** Ooni "3 to 5 days is generally the longest"; Ragusea "up to a week"; Charlie 72 h total; Lagerstrom "about 3 days … best on the day you divide"; Gozney "2–3 days optimum before it starts deteriorating"; Pizza Craft "not past 48 h"; Home Cooking Collective overproof after 96 h; Jordo's/My Pizza Corner: 72 h needs strong flour (Caputo).
   *Resolution:* all those are 12.5–14 % protein / W 280–330 flours. For weak maida (9–10.5 %) with 20 % atta (bran enzymes and sharp particles accelerate gluten breakdown), cap the *cold ball hold* at **48 h** and the total fermentation at **~60 h**, with 24–36 h as the sweet spot; do not offer 72 h+ in the app.

4. **Poolish fermentation temperature/time.** Vito: 5 g IDY/250 g (2 %), 1–2 h RT + 16–24 h fridge. Sisofo: 0.5 g ADY/150 g (0.33 %), 10–12 h at 16–27 °C RT. Nocerino: 0.5 g dry/500 g (0.1 %), 24 h at 16–18 °C. Pizza Craft: 0.1 g/100 g (0.1 %), 14–18 h RT. Charlie: "a little bit" yeast, 24 h in the cooler. Gemignani: 18 h RT.
   *Resolution:* two families — (a) high-yeast, mostly-cold poolish (Vito: yeast is 1–2 % of poolish flour, fridge does the holding) and (b) low-yeast, all-RT poolish (0.1–0.35 %). In a 28–34 °C kitchen family (b) at 0.1 % would peak in ~6–8 h and collapse by 12 h, so family (a) (Dawood's current) is the right choice for hot months; family (b) is viable in winter (12–18 °C) at ~0.3 % for 12–16 h. Never leave a 2 % IDY poolish at 30 °C beyond ~1 h.

5. **Dough temperature targets.** Ooni: 21–23 °C in warm months, 23–26 °C in cool months; PizzaBlab FDT 23–27 °C; Sisofo 20–22 °C for cold-fermented biga doughs (uses ice); Lagerstrom 23–24 °C water for an 8–10 h overnight bulk.
   *Resolution:* for a same-day RT ball proof in a 28–34 °C room, target FDT ≤ 24 °C and use fridge-cold/iced water (Sisofo/Ooni summer advice); for winter (kitchen 12–18 °C) target 25–27 °C with lukewarm water and proof in the warmest spot.

6. **Warm-room compensation: less yeast or more fridge?** Vincenzo: "reduce the yeast slightly or … fridge for part of the fermentation"; Gozney Academy: temperature control is primary; Lagerstrom: water temperature is the lever; Charlie: pre-chilled water + split bulk into small bins.
   *Resolution:* the engine should use temperature-aware *time* (and fridge insertion) as the main lever and only modestly scale yeast, because with maida the tolerance window at 30 °C+ is short either way.

7. **Bulk vs ball fermentation.** Ooni/Gozney/Di Francesco/Nocerino/Lagerstrom: long bulk (8–20 h) then short-to-medium ball proof (2–8 h). Charlie/Sisofo (contemporary): bulk cold 24 h then balls cold 24 h. Ooni cold-proof: bulk cold 24–72 h then balls 5 h RT. Vito/Dawood: no separate bulk; ball right after mixing and proof balls 3–3.5 h at 28 °C.
   *Resolution:* every source that balls immediately relies on a preferment for flavour (poolish/biga) — consistent with Dawood's method. Keep "ball immediately" as the default for same-day and Vito-standard schedules; use "cold bulk then ball cold" only in the split-method schedule, and when balling cold, allow the Ooni/Gozney-style long RT ball proof.

8. **Ooni Halo recipe yeast "7 g" for 1.2 kg and 18–20 h at 16–20 °C** conflicts with every other low-yeast overnight recipe unless it is fresh yeast (0.58 % fresh ≈ 0.2 % IDY). Treat as fresh; do not copy as IDY.

9. **Hydration.** Lagerstrom 68–69 %, Charlie 73–74 % (spiral mixer, high-gluten), Sisofo 69 % (T3) up to 75 %+ (contemporary), Ooni 60–65 %, Gozney 60–62 %, Di Francesco 60 %, Nocerino 65 %, AVPN implied 55–62 %. For weak maida the low end (60–65 %) is what the Italians use with W 280–330 flour at 60 %; the handoff's 65 % is already on the high side for a 9–10 % flour; 70 % should be flagged "advanced/sticky" in the app.

---

## 4. Recommendations for the deterministic engine

Numbers below are for the established recipe (1 kg total flour = 250 g in poolish + 550 g maida + 200 g fine atta; 35 g salt; ~50 g oil; 280 g balls; Saf-Instant IDY). "RT" = the room temperature the user enters.

### 4.1 Workflow selection (poolish vs no poolish, cold vs warm)
- Always use the poolish when the lead time ≥ 8 h (Sisofo T3/R1, Charlie T1, Gemignani, Vito all put the flavour in the preferment so the balls can be proofed same-day). Offer "no poolish, direct dough" only for lead time < 6 h (emergency) — same-day direct dough at 28–30 °C with 0.5–0.7 % IDY (dough.school 6 h @30 °C = 0.35 %; Jordo's 0.6 %; Ooni classic 0.44 % for ~3 h in a warm place). Direct dough is markedly worse (Gemignani: "one of the worst things"; Pizza Craft: same-day is "the worst of the four").
- Lead time 8–14 h: poolish at RT (family b, §3.4): 250 g + 250 g + IDY per table below, no fridge; final dough when the poolish has domed and just starts to dimple; ball immediately; ball proof to double.
- Lead time 14–36 h: Vito poolish (5 g IDY, RT 1–1.5 h then fridge until 30–60 min before mixing); final dough → ball immediately → RT proof to double → bake (schedule B). This is the recommended default (matches handoff).
- Lead time 36–60 h: Vito poolish (3 g IDY, cold water, 1 h RT, fridge ≤ 24 h) → mix → 30 min rest → ball → 30 min RT → fridge (cold ball hold) → out to double → bake. Cap cold ball hold at 48 h for maida (§3.3).
- Lead time > 60 h: tell the user to start later (schedule the poolish start clock-time), not to extend fermentation.

### 4.2 Poolish IDY as a function of RT and time to mixing
Poolish is 250 g flour + 250 g water + 5 g honey. Hold at RT for `t_rt` then fridge.
| Poolish RT hold at | IDY if the poolish then goes to fridge for 12–24 h | IDY if poolish stays at RT the whole time (no fridge) |
|---|---|---|
| ≤ 18 °C (winter) | 5 g, RT 2 h (Vito) | 0.8 g for 12–16 h (0.3 %, Sisofo-style at 16–20 °C) |
| 19–24 °C | 5 g, RT 1.5 h | 0.5 g for 10–12 h (Sisofo 0.33 % at 16–27 °C) |
| 25–29 °C | 4 g, RT 1 h | 0.3 g for 8–10 h |
| 30–34 °C | 3 g with fridge-cold water, RT 45–60 min (handoff "long/hot" row; Vito's own hot-water warning) | 0.25 g for 6–8 h, or refuse and force the fridge route |
Rule: dissolve IDY in ~50 ml of the water at 30–35 °C first (PizzaBlab E3: dry yeast should not meet water < 20 °C), then add the rest of the cold water. Poolish readiness display: "domed, heavily bubbled, just starting to dip in the centre" (Sisofo/Vito/Charlie all describe this).

### 4.3 Final-dough IDY
- With the 5 g-IDY Vito poolish (25 % of flour prefermented at 2 % IDY ⇒ 0.5 % of total flour is already in), add **0 g** extra IDY for same-day ball proofs at RT ≥ 24 °C, and **0.5 g (0.05 %)** when RT ≤ 20 °C or when the ball proof must finish in < 3 h. Charlie and Sisofo add none; Pizza Craft adds 0.5 g per 600 g with a 0.1 g poolish.
- For the 48 h cold-ball schedule with the 3 g poolish, add **0 g**; the cold hold rises slowly anyway (Jordo's 48 h cold = 0.05–0.1 % IDY total; the poolish alone already supplies ≈ 0.3 %).

### 4.4 Ball proof duration (fresh balls, straight after mixing, proof to ~double) — for a 65–68 % maida dough with the 5 g poolish
| RT | Hours to "doubled / slow half-springback" | Start poke-testing at |
|---|---|---|
| 12–15 °C | 6–8 h (Ooni: 5–6 h at 16–20 °C with 0.6 % fresh; Alex 6 h at ~20 °C with 0.1 % IDY) | 5 h |
| 16–19 °C | 5–6 h (Ooni R10) | 4 h |
| 20–23 °C | 4–5 h (handoff "cooler weather"; Gozney 8 h at 22 °C but with 0.02 % IDY) | 3.5 h |
| 24–27 °C | 3.5–4 h | 3 h |
| 28–30 °C | 3–3.5 h (handoff, validated) | 2.5 h |
| 31–34 °C | 2–2.5 h (Ooni "as soon as 2 to 3 hours in a warm environment"; PizzaBlab 4 h at 30 °C for a full ferment) | 1.5 h |
Use a Q10-style factor of ×2 per ~8–10 °C (Fond C3; dough.school "nearly twice as fast at 25 vs 20"). Weak maida: warn "check early; over-proof window is short" above 28 °C, and set the app's default bake window to the *earlier* half of the range.

### 4.5 Ball out-of-fridge lead time (cold-held balls)
- Ball that had already doubled before going in the fridge (i.e. leftover balls from a same-day batch): out **60 min** at 28–34 °C, **90 min** at 22–27 °C, **2 h** at ≤ 20 °C (Lagerstrom 60 min; Sisofo 30–60 min; Jordo's 60–90 min; Gemignani "until 60–65 °F").
- Ball that went cold within 30–60 min of balling (48 h schedule): needs to double after coming out: **2–3 h at 28–34 °C, 3–4 h at 22–27 °C, 5–6 h at 16–20 °C** (Ooni R8 "5 hours" at UK RT; Gozney 3–5 h / ≥ 6 h; Vincenzo 3–4 h). If the fridge runs 7–8 °C, halve these (the dough will have risen in the fridge — Jordo's "above 7 °C, fermentation is too unpredictable").

- Cold ball hold, deterministic pair (from T19 Charlie/Good Pizza, T14 Ojo's, T21 Städler, T20 Charlie 30-day): **ball → RT head start → fridge → out → bake.** Head start: 2–4 h at ~20 °C (Charlie), scaled to **1–1.5 h at 28–34 °C, 2 h at 22–27 °C, 3 h at ≤ 20 °C**; out-of-fridge: **3 h at ~20 °C (Charlie "within 3 hours once it gets up to room temperature"), 4 h at 19–22 °C (Städler/Ooni), so 2–2.5 h at 28–34 °C, 3 h at 22–27 °C, 4–5 h at ≤ 20 °C.** Skipping the head start (Ojo's 48 h fridge-balled + 4 h) gives a flat, flavourful pizza; skipping the warm-up gives tight, pale, tearing dough.
- Bulk-then-cold-ball yeast ladder on strong flour (T20): 3 days 0.5 % IDY after a full double at RT; 7 days 0.25 % after a 50 % rise; 30 days 0.01–0.05 % (structure fails anyway). For maida: use the 3-day figures for a **≤ 48 h** hold only, and prefer holding leftover dough as *bulk* rather than balls when the hold exceeds ~36 h (Charlie: "I would do a longer bulk fermentation instead of a longer ball fermentation"; Vito: re-ball "one time only").

### 4.6 Leftover-ball logic (the "eaten later" input)
- Remainder eaten within **≤ 48 h** of balling: fridge, sealed, oil-misted; for balls already proofed, put them in the fridge **uncovered 5–10 min then lid** (Lagerstrom) as soon as the first sitting's pizzas are stretched; next day out per §4.5 row 1. Quality is "best on the day you divide" (Lagerstrom), still good to 48 h; flavour improves (Gozney 2–3 d optimum) but maida strength drops — 48 h cap.
- Remainder eaten **> 48 h** later: freeze **immediately after balling** (Ooni R9/R11 "at this point"), i.e. divide the batch at balling time: X balls proof now, Y balls go straight to the freezer in oiled bags. Thaw: move to fridge the night before (≈ 12 h), then RT until doubled — Ooni "at least 6 hours" (UK ~20 °C) ⇒ **3–4 h at 24–27 °C, 2–3 h at 28–34 °C, 5–6 h at ≤ 18 °C** (Vincenzo / Baking Steel 3–4 h). Freezer keeps 3 months. Do not water-bath or microwave (Ooni).
- Emit clock times: "Now: freeze balls 5–8", "Day-before 21:00: move frozen balls to fridge", "Bake day 13:00: take balls out".

### 4.7 Temperature levers (what the app tells the user to do, by RT)
- RT ≥ 28 °C: fridge-cold water for the dough (and ice for up to half the water at ≥ 31 °C — Sisofo T2/R4); Ooni "chill your water up to 2 hours"; target FDT 21–23 °C (Ooni warm-months). Split a big batch across two containers before any fridge step (Charlie).
- RT 20–27 °C: room-temperature water (23–24 °C per Lagerstrom); FDT 23–26 °C.
- RT ≤ 19 °C: lukewarm water (30–35 °C), FDT 25–27 °C; proof balls in the warmest spot; add the 0.5 g extra IDY (§4.3).

- Official hot-kitchen yeast rule to encode: Ooni "In warm environments above 28 °C / 82 °F, reduce the yeast by 50 % to prevent over-proofing" (EU Neapolitan-style page). Apply it to the *final-dough* IDY (and to the all-RT poolish family) — not to the Vito fridge-poolish, which is already time-capped by the 1 h RT hold.
- Cold-bulk warm-up before balling (split method): 1–2.5 h at RT until the mass is ~14–16 °C and pliable (Sisofo 2.5 h; Nocerino 1–2 h; Vito 1–2 h; Ooni R10 re-ball then "until it doubles"). At 30 °C+ use the short end (1 h).

### 4.8 Hydration input handling
Allow 60–70 %; default 65 %; show "70 % = sticky/advanced with maida" (Lagerstrom's 68–69 % is on 00 flour; Italians use 60–62 % on W 280–330). Do not change yeast with hydration (no source does).

### 4.9 Proof-state feedback text (deterministic strings)
Use the poke test exactly as Gozney/mypizzacorner phrase it (press ~1 cm, 2 s; fast springback = wait; slow half return = bake; permanent dent = over). Over-proofed fix string: knock back, re-ball tightly, wait until re-doubled (≈ 40–60 % of the original proof time at the same RT — my extrapolation; no source gives a number; flag as open question).

---

## 5. Open questions
1. No source gives ball-proof hours *for weak 9–10 % flour*; all numbers above are for W 280+ / 12.5 %+ flour. The handoff's validated 3–3.5 h at 28 °C is the only maida-specific datapoint; the table in §4.4 extrapolates from it with a ×2 per 8–10 °C rule.
2. The explicit A/B fermentation-length experiments were not transcribed: Julian Sisofo's "Does Longer Fermentation Make Better Pizza?" (`jQTrKBC_i-4`, 5-day fridge) and "Cold vs Room Temp — I Tested 24, 48 & 72 Hours" (`ZUVG9Cf5yfA`, channel unconfirmed) were blocked by YouTube at the transcript proxy; Charlie Anderson's own conclusion from his testing is in §6.4 ("2 to 3 days … sweet spot", longer = "weaker dough structure"). Retry with `raw/fetch_transcripts2.sh`.
3. Re-proof time after knocking back an over-proofed ball: no source quantifies it.
4. Whether the Ooni Halo recipe's "7 g yeast" is fresh or dry (affects nothing in the engine, noted for the record).
5. Vito Iacopelli's own hot-weather guidance beyond "cold water, 1 h then fridge" was not found as a dedicated video; aggregator pages quote 1–2 h out of fridge then 2–4 h ball proof — unverified.
6. Ethan Chlebowski has no Neapolitan fermentation-temperature video that could be located; his content is Detroit/NY/weeknight.

---

## 6. Addendum — transcripts that arrived after the first draft

### 6.1 Massimo Nocerino — "How to make an excellent Neapolitan pizza with dry yeast" (`fwcmv0N67p8`, transcript, P)
- "1 kilo type zero flour, 650 ml water, 2 g of dry yeast and 20 g of sea salt" (65 %, IDY 0.2 %, salt 2 %). Fresh yeast equivalent "probably around 3 g".
- Yeast shaken into the water until it foams; then "pretty much half of the flour" stirred in to a creamy paste — "it's not a poolish … something maybe similar" — **rest 2 hours at room temperature without cover**; then remaining flour + salt, 20 min rest, a couple of folds, cling film, **fridge 18 hours**.
- Next day: "I'm going to make the balls after an hour [out of the fridge]" — in practice "2 hours room temperature … the dough now is doubled" then balls ~220 g (a 270 g one is trimmed); "I need to wait at least [until] doubled … the weather is quite cold now [London market, outdoors] so probably need between 4–5 hours". Bake at lunchtime; 65 % hydration.
- Take-away for the engine: an Italian pro's *cold-bulk* schedule is 2 h RT + 18 h fridge + 1–2 h RT + ball + 4–5 h RT (cold day). This is the "split method" (schedule C) with an explicit warm-up and a long ball proof; total ≈ 27 h with 0.2 % IDY on strong flour.

### 6.2 Massimo Nocerino — "How to make Poolish for pizza and bread" (`WYVJj-xvHuI`, transcript, P)
- "500 [g] double zero flour W350, 500 ml of cold water and one gram of fresh yeast … or you can use dry yeast as well, half gram" (0.1 % IDY on poolish flour). Yeast rubbed into the flour first, then water, mixed to a cream, cling-filmed.
- "rest for at least 24 hours; you can even leave around 16 hours when it starts to bubbling … room temperature like that around 16 degrees to 18 degrees".
- Day 2: + 200 g flour + 18 g salt (total flour 700 g ⇒ 71 % hydration, 2.6 % salt, 71 % of flour prefermented); mechanical folds; **rest 30 min; cut and ball 220–250 g; rest "another six hours"**; bake (canotto-style puff).
- Vito Iacopelli reference point (aggregator copy of his double-fermentation video, https://cooked.wiki/saved/a3e4cceb-c3f4-45d5-a1b3-123b2c84dd1a, cred 2): poolish 300 ml + 300 g + 5 g yeast + 5 g honey, "1 hour at room temperature, then refrigerate for 16–24 hours"; dough 400 ml water + 700 g flour + 30 g salt + 10 g oil, "refrigerate for 16–24 hours"; "Take the dough out of the fridge and let it rest for 1–2 hours"; balls "rest for 2–4 hours at room temperature". That is the split method (schedule C) as Vito himself times it: 1–2 h bulk warm-up + 2–4 h ball proof.
- Take-away: a 0.1 % IDY poolish needs 16–24 h at 16–18 °C.

### 6.3 Ooni official — "Our Best Poolish Dough" (Modernist Pizza-derived; https://ooni.com/blogs/recipes/our-best-poolish-dough, P, cred 5; raw in `raw/ooni-poolish.md`)
- Poolish: **350 g 00 flour + 350 g water + 2 g instant dried yeast (or 3 g ADY / 5 g fresh)** — 0.57 % IDY on poolish flour; "let it proof for 12 hours" in an airtight container (page text: "typically needs 6 to 12 hours").
- Dough: all poolish + 700 g 00 + 30 g salt + 280 g water (total 1050 g flour, 60 % hydration, 2.9 % salt, **33 % of flour prefermented**, no extra yeast).
- **"Let the dough rest for 2 hours"** (bulk) → divide into **six 260 g balls** → **"store them overnight in the fridge. If you want to make pizza that same day, let the dough balls rest at room temperature for 4 to 6 hours or until the dough has doubled in size."**
- Comparison to Vito/Dawood: Ooni uses 0.57 % IDY vs Vito 2 % on the poolish flour, but all-RT for 12 h vs Vito's 1 h RT + 16–24 h fridge. Same-day ball proof is 4–6 h (UK ~20 °C) — consistent with 3–3.5 h at 28 °C.

### 6.2b Tony Gemignani — Hollywood+ TV segment (`npLsJBm3YWc`, transcript, P)
- Transcript obtained (14 KB) but it is a National Pizza Day TV interview: only "make your dough at home … not using frozen" and Caputo flour recommendations; **no fermentation numbers**. His numbers in §2.7 come from the Talks at Google transcript and Pizza Bible excerpts instead.

### 6.3b Other poolish schedules found (secondary, for triangulating the Vito-style "1 h warm + fridge" poolish)
- Salt. Butter. Smoke. "3 Day Poolish Pizza Dough" (YouTube creator; https://saltbuttersmoke.com/3-day-poolish-pizza-dough/, cred 2): poolish 200 g + 200 g water at 25.5 °C + **0.8 g ADY (0.4 %)**, **1 h RT then 18–24 h fridge**; dough +600 g flour, 300 g water, 20 g oil, 20 g salt (62.5 %); poolish out 1 h; bulk 1 h; 5 × 260 g; **cold ball hold 36–48 h**, "wouldn't go any longer than" 72 h; **temper 1½–2 h** before baking; "for warmer kitchens, fermentation may proceed faster".
- Pala Pizza poolish guide (https://palapizza.com/recipe/poolish-pizza-dough/, cred 2): **1 g IDY per 175 g flour (0.57 %)**, 2 h RT then 18–24 h fridge; poolish ≤ 50 % of total dough (≈ ⅓ typical); ready = "spongy and wet, with a domed surface covered with small air bubbles"; balls 1–2 h RT or overnight fridge.
- Convergence: every "warm-then-fridge" poolish in the set uses 0.4–2 % yeast on poolish flour and 1–2 h RT before the fridge; every "all-RT" poolish uses 0.1–0.6 % for 8–24 h. Vito's 2 % + 1 h is the highest-yeast/shortest-warm variant — safest in a hot kitchen, provided the 1 h RT hold is not exceeded above ~30 °C.

### 6.3c Biga schedules from official/pro pages (for the "cold ball hold" and warm-up numbers)
- Ooni 100 % biga (Halo Pro; https://uk.ooni.com/blogs/recipes/ooni-100-biga-dough-using-halo-pro, P, cred 5): biga 500 g flour + 340 g water + **0.5 g yeast**, **2 h RT then 18–20 h fridge**; final dough 68 %, target 21–26 °C (cooler months 23–26, warmer 21–23); balls 250 g: **use after 2 h at RT, or fridge 6–36 h and take out 2 h before baking**; hot-weather: chill water up to 2 h "or substitute 25 % to 50 % water with ice cubes".
- Vincenzo's Plate biga (https://www.vincenzosplate.com/neapolitan-pizza-dough-with-biga/, cred 3): biga 1 g dry yeast / 500 g flour / 250 ml water, "14 h (4 °C)" or 18 °C RT; dough 500 g biga + 500 g flour + 400 ml water + 30 g salt (+ optional 0.5 g dry yeast); 250 g balls **8 h at RT, or fridge 12–24 h at 4–6 °C then 2 h at RT** before stretching.
- Modernist Cuisine / Modernist Pizza (https://modernistcuisine.com/mc/understanding-neapolitan-pizza/, cred 4): Neapolitan direct dough with IDY, 62.3 % hydration, "bulk fermenting the dough at room temperature for 20–24 hours, then balling and proofing it for another 3 hours".

### 6.3d Brian Lagerstrom — "The Easiest Actually Good Pizza Dough — No Mixer" (`VJu3YCykO_0`, transcript, P; recipe page https://brianlagerstrom.com/recipes/the-easiest-pizza-dough/) and NY-style page
- 90-minute emergency dough: 400 g warm (30 °C) water, 20 g oil, **7 g IDY (1 %)**, 15 g salt, 20 g sugar, 680 g AP flour (59 %); 30 min rest → folds → 60 min → "about doubled" → 4 × 280 g balls → 15–20 min rest → stretch. (Home oven 550 °F.)
- Leftover logistics (verbatim intent): "if you wanted to make this dough the day before … at this point [right after balling] I would cover and refrigerate the dough until **60 minutes** before you want to roll it into pizza; it'll stay good in the fridge for **4 to 5 days**; but what if I don't want to eat all four pizzas? Well, I would **freeze two of them and then pull them out of the freezer 1½ hours before** it's pizza time, making sure to keep them covered with a damp cloth so they don't dry out." (Counter-thaw straight from frozen; 1 % IDY dough, home oven — with Neapolitan-style low-yeast balls the Ooni/Vincenzo 3–6 h figures are safer.)
- NY-style page (https://brianlagerstrom.com/recipes/new-york-style-pizza/): 900 g flour, 575 g water at 68 °F (20 °C), 10 g IDY, 25 g oil, 25 g sugar, 20 g salt; folds over ~1 h; 4 × 385 g balls; **"Refrigerate 24 hrs" … "Remove dough from fridge 45–60 min before baking."**

### 6.3e Julian Sisofo — "My Favorite Pizza Dough Recipe" (poolish + biga, `sJNLdNkjAG0`, transcript, P)
- Preferments mixed with **80 °F (27 °C) water**; "leaving both pre-ferments at room temperature for about 3 hours … then airtight … straight into the refrigerator for **12 to 24-hour** fermentation". The biga "only barely doubles in size" in the fridge.
- Final dough: preferments rehydrated with cold water "around 40 °F (4 °C)"; mixed to **67 °F then finished at only 70 °F (21 °C)** "to avoid overworking the gluten … whenever you're doing longer and cold fermentations, you need to be more careful with your gluten development" (over-mixing → gluten too tight or breaks down over time).
- **Cold bulk "around 24 hours in the fridge"**; then "resting at room temperature for around 2½ hours. It's at a temperature of 58–60 °F [14–16 °C] … you do not want to ball up your dough straight from the fridge" (cold gluten will not form a tight ball). Divide without folding; pre-shape; rest ≥10 min uncovered; final tight shape.
- Balls into oiled containers → **fridge "another 24 to 36 hours"**; "before baking, take the dough at least **1 hour** out of the fridge". Total "around 4 days" in his week, but "you can easily have this process done start to finish within 2 days". Search snippet for the same recipe: 70 % hydration, "could potentially be dropped to 65 % if you're not confident".
- Engine take-aways: (a) when balling a cold-bulked dough, warm the bulk 1–2.5 h first (Sisofo 2.5 h to 14–16 °C; Nocerino 1–2 h; Vito 1–2 h); (b) already-risen cold balls need ≥1 h out (Sisofo, Lagerstrom, Vincenzo's 2 h for biga balls); (c) for long cold schedules mix to a *lower* FDT (20–21 °C) and under-develop gluten slightly — doubly important for weak maida, which the handoff already notes tears if over-kneaded.

### 6.3f Davide Civitiello — Italia Squisita "Pizza napoletana fatta in casa" (`Cq90lUQUCUo`, English-subtitle transcript, P, cred 4)
- "We're using a classic Caputo flour with a medium protein content allowing a leavening from **6 to 8 hours** at home"; "one liter [water] absorbs around 1 to 1.6 kg flour … 1.6 to 1.7 kg"; salt dissolved in the water first, yeast "should always be in contact with flour … flour is always at a temperature 18 to 22 °C and … contains sugars"; "salt should never contact the yeast".
- Home-oven additions: oil "to obtain a crisper pizza, as the cooking time is much longer" and sugar "helps us with the browning without affecting the leavening"; "for the oven at home use a dough that is very hydrated, suitable for long cookings" (i.e., his 62.5 % is for a 5–6 min home bake; in a 90 s wood oven he implies less water).
- Knead 15–20 min; after 20 min rest, cut and round 250 g balls (28–32 cm pizzas; "make them smaller at home"); "Once we cover it, we're letting it raise for 6 to 8 hours … the dough has doubled its volume"; then stretch, "work it as little as you can".
- Yeast quantity is in the published recipe, not the transcript: 2 g (fresh) per 1.6 kg flour = 0.125 %.
- Engine relevance: confirms an Italian pro's *direct-dough, ball-immediately, 6–8 h at Naples room temperature (~20–25 °C), 0.125 % fresh yeast* schedule; scaled with the ×2 per 8–10 °C rule that is ~3–4 h at 30 °C, and with IDY at ⅓ of fresh (AVPN) ≈ 0.04 % IDY — i.e., far less yeast than the 0.5–0.7 % IDY "emergency" direct doughs in §4.1 use for a 3–4 h proof.

### 6.5 Ojo's Pizza (UK pizzeria operator) — "Cold vs Room Temp PIZZA Dough — I Tested 24, 48 & 72 Hours" (`ZUVG9Cf5yfA`, transcript, P, cred 4; the only side-by-side bulk-vs-ball × RT-vs-fridge test in the set)
Setup: one batch of his weekly Neapolitan dough (Grandi Molini "Pizza Verace" flour ≈ Caputo), split four ways: RT proving box at **19 °C** (bulk, and balled immediately) and fridge for 72 h (bulk, and balled immediately). Ooni Volt on full for every bake; identical 2 oz sauce.
- **RT bulk 15 h → ball → 10 h (≈ 24–25 h at 19 °C) = his control**: "good airy structure … good flavor and solid results".
- **RT balled immediately, ~24 h at 19 °C**: "relaxed … over proved … not springing back at all … the structure is a lot more closed, almost collapsed … struggling to find that flavor". Verdict: "Don't bulk proof [sic — he means ball-and-leave] room temperature dough because it over proofs too fast"; "If I re-ball that dough now and proved it for another few hours, I think it would come up fine."
- **Fridge, balled immediately, 48 h + 4 h at RT**: "a bit flat … very easy to shape … not over proved, good strength, good elasticity"; baked: "amazing color, but not much oven spring … no crisp … but what it does have is flavor … tangy"; "reminds me of a pizza that I'd get in a restaurant".
- **Fridge bulk 44 h → ball → 4 h RT**: "just springing back, whatever I do … feels like silicone"; shrank in the oven, "really pale", dense, "just like bread". (Cold dough re-balled and used after only 4 h.)
- **Fridge bulk 72 h → ball in the morning → RT (same day)**: "the best one out of the fridge dough so far … a much deeper, more complex flavor … almost saltier … tang … nice open crumb"; still "would like a little bit more puff".
- **Fridge balled immediately, 72 h + RT**: "looks fantastic … real nice leoparding … crispy crust … good air in the crust — not as much as the room temperature dough"; flavor "more complex … tangy". Dough was "speckly" (bran soaking up water) but "doesn't smell too acidic, which is a sign of over-proven dough".
- His conclusions: fridge dough → **ball straight away**, and it needs more RT time afterwards to get puff ("maybe if it was left out at room temperature for a bit longer"); a 2-day re-balled cold bulk is too tight unless given far longer to relax; 72 h cold in the fridge on strong flour was not over-proofed.
- Engine relevance: (1) supports "ball immediately" for cold holds (Vito/Dawood schedule); (2) supports a **≥4 h RT** warm-up target for cold-held young balls at ~19–20 °C, and explains why the "60–90 min" numbers give flat pizzas when balls were not proofed before chilling; (3) a re-balled cold bulk needs a long relax (Sisofo: 2.5 h warm-up *before* balling + full ball proof; Nocerino 4–5 h ball proof) — do not schedule "ball cold, bake in 4 h"; (4) RT ball-immediately 24 h at 19 °C over-proofs on strong flour ⇒ on maida at 28–34 °C the RT ball window is only a few hours (handoff's 3–3.5 h).

### 6.6 Vito Iacopelli — "I Fermented Pizza Dough To The Limit" (24 h vs 7 days vs 30 days; `q_eMwU14DWo`, transcript, P, cred 5 — this is the method Dawood uses, in Vito's own words)
- Full recipe as spoken: poolish "16 to 24 hours before with **300 g of water, 300 g of flour, 5 g of dry yeast and 5 g of honey** … leave it 1 hour at room temperature and then in the fridge overnight." Dough: dissolve poolish in **500 ml water**, **20 g sea salt**, **950 g flour**, mix until it holds together, then add "the remaining water … little by little … about 10 to 15 minutes" (total water ≈ 1000 g on 1250 g flour ⇒ ~80 % on the video's numbers; other Vito videos use 700 g flour + 400 ml). Olive oil on hands/bench and container.
- "**1 hour at room temperature** … to start the leavening process" (bulk) → degas, ball → "**about 1 hour to 2 hours at room temperature** because already we created the fermentation … thanks to the poolish" → "this is the dough after 2 hours at room temperature … the perfect pizza dough … let's say 24 hours because we made the poolish".
- 7-day fridge balls: "still have some air inside … the gluten structure still really nice and strong" but "feels like I'm stretching gluten-free … super easy to make holes"; result "really heavy, it's not light … I don't recommend it for seven days … it starts to get acid"; "I believe personally 7 days is the max". 30 days: "white", "liquid", "acid … the gluten structure is dead … black dots … the yeast is totally completely dead".
- "**You can re-ball the dough one time only**, after that the gluten will start to become more weak."
- Note the RT and flour are Californian (~20–22 °C kitchen, strong 00): in Islamabad's 28–34 °C the same 1 h bulk + 1–2 h ball is *shorter*, which is why the handoff's 3–3.5 h ball proof (no separate bulk) is already the hot-climate equivalent. Vito's 7-day "max" is on strong flour; §3.3's 48 h cap for maida stands.

### 6.7 Julian Sisofo — "Is Cold Fermentation Better for Pizza?" (3 h same-day direct vs 4-day cold direct; `AtIiSq6u3DA`, transcript, P, cred 3)
- Same flour (Molino Marino), both direct doughs, both by hand; baked 780–840 °F. 4-day cold: "nice outer crunch … empty crumb, very hollow … way more complex [flavor] … sturdier crust … chewy". 3-hour RT: "supple", "more structured and even crumb", "lacks that outer crunch … more soft and tender", "flavor is inferior". "In the end I don't see a huge difference here."
- Relevance: the flavour gap between a 3 h direct dough and a multi-day cold dough is real but modest even for him; the poolish route (§2.2, T3) is his stated way to get the flavour without multi-day holds — consistent with keeping Dawood on the poolish + same-day proof default.

### 6.8 Vito Iacopelli — "Next Level Pizza Dough / Double Fermentation with Poolish" (`u7Hd6ZzKgBM`, transcript, P, cred 5 — the split method, schedule C, in Vito's words)
- Poolish: "300 [ml] of water, 5 [g] of honey, **6 grams of fresh yeast; if … using dry yeast simply just put five grams**, … 300 grams of zero zero flour … let it rest **one hour at room temperature** and then … in the fridge for **16 to 24 hours**"; "this hour at room temperature will activate the leavening … after six hours the fermentation process will start." After 16 h fridge it looks "a little bit flat … all normal"; "you can use it directly from the fridge … the best is to wait about **30 minutes** that the poolish gets back to temperature."
- Dough for 1 kg flour: poolish + **400 ml water + 700 g 00 flour + 25 g sea salt + 10 g olive oil** ("this is 70 percent hydration"); salt dissolved in the poolish-water first; oil after the dough comes together; knead 10–15 min; rest closed **15–20 min**; one stretch-fold to smooth; oiled sealed container **straight into the fridge for 16 to 24 hours** ("the double fermentation starts now").
- Next morning: "**keep the dough out from the fridge for about 30 minutes to one hour** just to bring the dough at room temperature" — balling straight from the fridge "damages the outside part of the dough"; balls "around 250 grams", keep the smooth top on top to "make a balloon". (Ball proof after this: 2–4 h RT per the aggregator copy in §6.2 and 1–2 h in §6.6 at ~20–22 °C.)

### 6.9 What's Good Dough — "This Guy Changed the Way I Make Pizza Dough Forever" (day with Charlie Anderson at Good Pizza; `1vGNXOr-k-8`, transcript, cred 4)
- Charlie: before the poolish "we even went up to like a **7-day** fermentation … balling it and letting it sit in there for 7 days and I just couldn't get the flavor and texture out of it that I could get with like a poolish with even a **two-day dough**." Host: "you can smell the fermentation in there and this was only mixed 2 hours ago."
- Schedule: day 1 poolish; 24 h; mix; **bulk 24 h in the cooler**; ball; **"let it rest at room temperature for like 2 to 4 hours … to give it a little bit of a head start … if we throw it straight into the cooler after balling it, it kind of just sits there and does nothing … when we pull it out the next day, within 3 hours once it gets up to room temperature, it's pretty much good to go."**
- Water pre-chilled 24 h because tap water is "40 °F in winter … 75 °F in summer"; "longer fermentation, more flavor" is a framework he abandoned — "his poolish recipe combined with 24 hours of bulk combined with 24 hours of ball fermentation solves all of that."
- Engine relevance: quantifies the *cold ball hold* recipe: **2–4 h RT head start after balling (at ~20 °C; use 1–1.5 h at 28–34 °C) → fridge → next day 3 h at RT → bake.** Matches Ojo's finding that cold balls need real RT time, and gives the app a deterministic "ball → rest X h → fridge → out Y h" pair.

### 6.10 Charlie Anderson — "I Proofed Pizza Dough for 30 Days (and ate it)" (`ZzzAufgflCg`, transcript, P, cred 5 — the yeast-vs-days experiment)
- "Usually 2 or 3 days is a sweet spot"; long fermentation "creates more complex flavors and weakens the structure of the dough".
- Set-up: 70 % hydration, King Arthur bread flour, 2.5 % salt, ice water in the mixer, dough temp "right about at room temperature". Yeast by target: **30-day 0.01 % IDY (0.04 g) and backup 0.05 % (0.2 g)** — both left at RT overnight first, the 0.05 % "close to doubled", the 0.01 % "didn't show much sign of activity"; **7-day 0.25 % (1 g)** — "rise at room temperature for about 3 to 4 hours … grew in size by about 50 %" then balled and fridged; **3-day 0.5 %** — "let it double in size during bulk fermentation" then fridge; plus a same-day dough. Balls 380 g (14-inch) in individual tins, walk-in cooler.
- 24 h out: 30-day balls "didn't really rise much at all, they pretty much just flattened out like pancakes … don't have a lot of structure left" → **re-balled** and left at RT for the last ~24 h; "if I were to do this again I would do a **longer bulk fermentation instead of a longer ball fermentation** just to prevent this issue". 7-day "flattened out significantly more than the 3-day … I don't think … I need to reball it". 3-day: "this is what I usually do"; both fast doughs "straight in the fridge … take them out tomorrow morning maybe **3 to 4 hours before** I plan to bake".
- Engine relevance: (a) a clean, creator-tested yeast ladder for bulk-then-cold-ball on strong 12.7 % flour: 3 d → 0.5 % IDY with a full double at RT first; 7 d → 0.25 % with a 50 % rise; ≥30 d → 0.01–0.05 % (fails structurally); (b) balls flatten as they age — re-ball, or hold cold in *bulk* when the hold will be long; (c) cold balls come out 3–4 h before baking (his ~20 °C kitchen).

### 6.11 Städler Made (pizzadoughcalculator.com) — "How to cold ferment your pizza dough" (`VqyveaUIOhQ`, transcript, cred 3)
- Method: mix, knead 5 min, airtight, **fridge at 4–7 °C for 1, 2 or 3 days in bulk**; then divide and ball; **rest ~4 hours at room temperature (19–22 °C)** — "very very important … the gluten is very tense from the cold … give them at least four hours to eat [the enzyme-made sugars] … one last rise." Rationale: cold "almost" stops yeast while amylase keeps converting starch (more sugar → char, flavour); "some pizza bakers go for 24 hours and say everything above 24 hours is just for showing off, while others swear by 72 hours".
- Contrast with Ojo's (§6.5): Städler balls *cold* from a cold bulk and then gives 4 h — Ojo found 44 h cold bulk + ball + 4 h too tight; Sisofo warms the bulk 2.5 h before balling. The safest deterministic rule is therefore: cold bulk → **warm 1–2 h → ball → 3–4 h at ~20 °C (2–2.5 h at 28–34 °C)**.

### 6.12 Minor transcripts (low value, recorded for completeness)
- KasraCooks "This 48 Hour Cold Ferment Pizza Dough Is Worth Every Minute" (`e6aqFqRML0w`): music-only auto-captions, no usable speech.
- Santa Barbara Baker "24 Hour Cold Fermented Dough in the Ooni Koda 16" (`pYQDDfGfU-o`, cred 2): bulk → ball → "kept one ball out … same day bake, put three balls in the fridge … pulled this one out after 24 hours"; repeated advice "always … temper your dough, bring it up to room temperature before you stretch it … super cold … not good for these ovens" (no hours given; sourdough recipe on his site).
- Ooni 2017 "How To Make Pizza Dough At Home" (`u48x2Agg0Ms`, P, cred 4): 1 kg 00, 600 g water (⅓ boiled + ⅔ cold tap "if I'm making the dough to make pizzas within a few hours"), **15 g fresh yeast (1.5 %)**, 20 g salt, ~30 g oil; mixer 10 min; "leave in a warm place for around 2 hours" — Ooni's old fast recipe (their current cold-proof recipe cut yeast to 0.23 % IDY, §2.5).

### 6.4 Charlie Anderson — "How I Made the Perfect NYC Pizza (Full Documentary)" (`TQYApZ_-P24`, transcript, P) — fermentation quotes
- Yeast: "I like to err on the lower side, just about a half percent because the slower the dough rises, the more opportunity it has to develop those nice fermenty bready flavors" (0.5 g IDY per 100 g flour).
- "As dough ferments, the sugars and proteins in the wheat break down … a longer fermentation means more flavor, but it also means a weaker dough structure … I found about 2 to 3 days [in the fridge] to be the sweet spot … without the need for a pre-ferment." He tried a biga/poolish in episode 1 and found it "a little bit too much of a fermenty flavor for a New York style pizza".
- Bulk: "let each dough rise in an oiled container for 1 to 2 hours until about doubled" (early tests); final recipe "double or triple in size … 1 to 3 hours, depending on the temperature of your environment", then "fridge … another 2 to 3 days"; bake day: "take my dough out of the fridge to let it come up to room temperature and to rise just a bit more" while the oven preheats 60–90 min.
- Over-proof admission: "my doughs were definitely overproofed and therefore the pizzas ended up flatter than I would have liked" (during longer fermentation tests) — flat pizza = over-proof symptom.
- Whole-wheat: replaced 10 → 15 % of flour with whole wheat, and "since I am using 15 % whole wheat flour, which absorbs much more water than bread flour, I'm going to bump [hydration] up" by 1 point (60 → 61 %). Relevant to the 20 % atta blend: +1–2 points of water per 15–20 % whole grain is the pro adjustment, not more.
- Salt 3 %, sugar 1.5 %, oil 3 % (home oven NY). Container must be closed or a skin/gas bubble forms. Scaling with the Fond/PizzaBlab ×2 per 8–10 °C rule, the same poolish would peak in ~8–10 h at 26 °C and ~5–6 h at 32 °C — confirming §3.4 that the all-RT low-yeast poolish is a winter-only option in Islamabad.
