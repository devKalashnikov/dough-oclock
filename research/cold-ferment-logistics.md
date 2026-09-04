# Cold-ferment logistics for pizza dough balls — research notes

Dimension: **cold-ferment-logistics**. Written 2026-09-04 for Dawood (Islamabad; CasaKoa gas oven, floor 380–400 °C, 60–90 s bake; maida + 20 % fine chakki atta, ~9–10.5 % protein, no W rating; Saf-Instant IDY; Vito-style poolish; 280 g balls; kitchen 28–34 °C now, 12–18 °C in winter; home fridge 3–6 °C drifting to 7–8 °C).

Raw scrapes live in `scratchpad/research/raw/` (files named `pm_<topic>.md`, `pizzablab_*.md`, `pmq_*.md`, `avpn.md`, `vito_*_tx.md`, etc.).

Everything below that is a number carries its URL. Where numbers were published for strong flour (Caputo 00, US bread/high-gluten flour) the "maida adjustment" is stated explicitly.

---

## 1. Sources consulted

| # | Source | What it contributed | Kind / credibility |
|---|---|---|---|
| 1 | https://www.pizzamaking.com/forum/index.php?topic=43833.msg438770 — Tom Lehmann's Dough Management Procedure (posted by Pete-zza, 2016) | Full 16-step pizzeria procedure: FDT 80–85 °F, ball within 20 min, cross-stack 2 h, ready at 16 h, temper 60–90 min, 3 h usable window, keeps 3 days in cooler | **Primary** (AIB food scientist, "The Dough Doctor") |
| 2 | https://www.pizzamaking.com/forum/index.php/topic,66269.msg648467.html#msg648467 — Lehmann 2020 update to the procedure | Cross-stack until INTERNAL 10 °C; warm to 10 °C internal, "DO NOT ALLOW DOUGH BALLS TO WARM TO ROOM TEMPERATURE"; 2.5–3 h window at 21–27 °C, shorter above 27 °C; never return unused balls to the cooler; pre-opened skins on screens in the cooler; leftover dough ≤15 % of new dough | **Primary** |
| 3 | https://www.pmq.com/check-your-doughs-temperature-before-opening-it-into-skins/ — Lehmann, PMQ 2019 | Measure internal temp; open at 50 °F → 2.5–3 h window; pre-open skins and refrigerate, 15 min temper | **Primary** (trade press, author = Lehmann) |
| 4 | https://www.pizzamaking.com/forum/index.php/topic,17851.0.html — "How long out of refrigerator before cooking?" (2012) | Lehmann's measured numbers: 1.5–2 h out → dough at 50–55 °F; at 68–70 °F room, 2–2.5 h for balls ≤12 oz, 3.5 h for 13–22 oz; yeast heat of metabolism ≈1 °F/h; TXCraig1 on granite/towel physics | Expert forum (Lehmann + TXCraig1 posts) |
| 5 | https://www.pizzamaking.com/forum/index.php/topic,35262.0.html and …/topic,35262.20.html — "How long out of the fridge before you bake?" (2014) | Lehmann: 50 °F is the researched minimum, 3 h window; Pete-zza prefers 65–70 °F; members: 1–2 h at 68–72 °F, 1.5 h → 62 °F measured, <1 h in a 75 °F+ summer house; commercial coolers legally 34–40 °F; home fridges warmer and variable; Domino's/PJ ship at 35 °F | Expert forum |
| 6 | https://www.pizzamaking.com/forum/index.php?topic=28204.0 — "Preferred temp of Dough Ball to push out" (2013) | Lehmann: AIB "magic number" 50 °F, upper end 60 °F; Papa John's spec 54 °F; a Neapolitan pizzeria owner uses 70–75 °F | Expert forum |
| 7 | https://www.pizzamaking.com/forum/index.php?topic=43168.msg432148 — Lehmann on cooler temps (2016) | Commercial cooler legal 34–40 °F; home fridges rarely that cold; goal is CONSISTENT cooling, not fastest; FDT critical | **Primary** |
| 8 | https://www.pizzamaking.com/forum/index.php/topic,12247.0.html — Pete-zza "Ideal temperature for cold proofing" (2010) | Commercial 36–40 °F target 38 °F; home fridge several degrees warmer; FDT 80–85 °F commercial vs 75–80 °F home; small balls cool faster → longer window; don't adjust yeast unless fridge differs >5 °F | Expert forum |
| 9 | https://www.pizzamaking.com/forum/index.php/topic,26831.0.html (+ Reply 261 msg393271, Reply 268 msg394399) — TXCraig1 "Baker's yeast quantity prediction model" (2013–2015) | Model structure and published Ganzle-fit parameters (Tmax 45 °C, a=0.02645608, b=2.037020784, c=−0.198964236); chart is total bulk+ball time to "ready to bake"; reballs need extra time; Pete-zza's cold-ferment data points (0.14 % IDY 120 h fridge + 1 h temper at 80 °F; 0.28 % 52 h + 1.5 h at 78 °F; 0.40 % 24 h + 1.5 h at 80 °F) | **Primary** (model author) |
| 10 | https://www.pizzamaking.com/forum/index.php/topic,79618.0.html — "How much IDY for 72 h CF" (2023) | Fridge logs swing 30–40 °F; "a fridge set at 0 °C can yield a 6–8 °C dough"; yeast slows to near-nothing under 4 °C but doesn't stop until 0 °C; heat of fermentation hampers cooling with FDT in the 80s °F; 0.10–0.16 % IDY for 72 h | Expert forum |
| 11 | https://www.pizzamaking.com/forum/index.php/topic,70393.0.html — "Overproofed dough balls" (2021) | Balls doubled after 24 h at 38 °F with 0.5 % ADY → reballed, back in fridge overnight, pulled 3 h before stretching → "favorite so far"; freezing reballed dough works in bags; "even dough sitting in your fridge for over a week can have life after the reball"; Lehmann did not advocate bulk rest before balling | Forum (experienced members + Pete-zza) |
| 12 | https://www.pizzamaking.com/forum/index.php?topic=36684.msg365066 — fazzari "My fellow reballers!" (2015) | Cold bulk 24–72 h; cut & ball the night before; out 4 h before bake ("egg-shell" crust); timing of the ball matters more than hydration | Forum (veteran member) |
| 13 | https://www.pizzamaking.com/forum/index.php?topic=85894.0 — "What counts as room-temp ferment?" (2024) | PizzApp's emailed rule: RT time = all time from mixing to fridge PLUS the warm-up after the fridge; CT time = fridge hours only; "the app considers the time needed to cool the dough … and reheat it" | Forum + calculator vendor statement |
| 14 | https://www.pizzamaking.com/forum/index.php/topic,64435.0.html — "Cold fermentation 3 days" (2020) | Failure: 0.15 % IDY, 60 h bulk + 8 h ball at 2 °C + 4 h at 18–20 °C → flat balls, no spring. Fix that worked: 0.3 % IDY, 24 h bulk + 20 h ball at 2 °C + 5 h at 20–22 °C | Forum data point |
| 15 | https://www.pizzamaking.com/forum/index.php/topic,69136.0.html — "8 Day Cold Ferment" (2021) | Strong US flour + 1 % malt, 0.18 % IDY: bulk RT to 1.5× (~4 h), balls at 4.4 °C "good for at least 8 days" | Forum data point (strong flour — NOT applicable to maida) |
| 16 | https://www.pizzamaking.com/forum/index.php/topic,63062.0.html — "Dough ball temp before CF" (2020) | Cross-stack/55 °F is for warm dough; balls formed from cold bulk can be lidded immediately; warm-up target 55–65 °F | Forum |
| 17 | https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/ — Yuval Weinberg (2024) | Lehmann method vs hybrid; worked example: immediately-balled dough is at 4 °C for 20 of 24 h, a bulk after 1 h RT is at 4 °C for only 5 of 24 h; bulk core can take 12 h+ to reach fridge temp; flatten bulk to ≤2–3 cm; FDT 15–20 °C; yeast heat ≈0.5 °C/h; warm-up to ≥10 °C takes 30 min–3 h; Neapolitan in 430 °C+ ovens: warm to ~20 °C; fridge spots vary 1–7 °C; leave lid ajar until core ≤10 °C (1–2 h) to avoid condensation | Expert blog (calculator author; model based on TXCraig1) |
| 18 | https://www.pizzablab.com/learning-and-resources/fermentation/bulk-vs-ball-fermentation/ — Weinberg (2026) | Bulk vs ball effects on elasticity; start at 50/50 bulk/ball split; reballing "resets" time in balls; Italian low-protein extensible flours should NOT spend the whole ferment in balls (they flatten); bulk in fridge stays warmer longer; example photo series: 70 % dough at 29 °C, reballed ball caught up in ~2 h | Expert blog |
| 19 | https://www.seriouseats.com/the-pizza-lab-how-long-should-i-let-my-dough-cold-ferment — Kenji López-Alt (Pizza Lab) | 10-day test at 38 °F: 6 oz piece balled daily, proofed 2 h at 70 °F; big improvement day 3, best 3–5 days, quality loss from day 6, day 10 barely rises and tastes sour | **Primary experiment** (bread-flour / strong flour) |
| 20 | https://modernistcuisine.com/mp/cold-proofing-pizza-dough/ — Modernist Pizza team | Cold-proof 24–96 h; set fridge to ~4 °C; Neapolitan/NY/artisan: 48 h; temper 2 h or until 13 °C / 55 °F; add diastatic malt for long ferments with unmalted flour | **Primary** (book authors' site) |
| 21 | https://ooni.com/blogs/recipes/cold-prove-pizza-dough — Ooni | Bulk in fridge 24–72 h (up to 96), "three to five days is the longest"; ball after the fridge and leave 5 h on the counter to double | Manufacturer guide |
| 22 | https://uk.ooni.com/pages/getting-started-prepare/ooni-pro — Ooni UK | Make up to 3 days ahead; "come up to room temperature for 5 hours before stretching" | Manufacturer guide |
| 23 | https://thepizzacraft.com/dough-and-fermentation/ooni-pizza-dough-recipe/ | 0.9 g IDY/… schedules; pull 2–4 h before (4 h cold kitchen, 2 h warm); 24–48 h window, sweet spot 36 h, past 72 h "slack, tearing, sour" | Blog (secondary) |
| 24 | https://us.gozney.com/blogs/recipes/24-hour-neapolitan-pizza-recipe — Gozney | 16 h RT bulk → ball → fridge 4–10 h → out 3–5 h before bake | Manufacturer recipe |
| 25 | https://us.gozney.com/blogs/academy/how-to-stretch-pizza-dough and https://us.gozney.com/blogs/academy/how-to-proof-pizza-dough — Gozney | Out of fridge: "around 2–4 hours but can be as long as 8 in a cooler environment"; 24 h minimum, 2–3 days optimum before deterioration; cold bulk then ball then 2 h RT | Manufacturer guide |
| 26 | https://schoonover-farm.com/wp-content/uploads/2023/09/Disciplinare_AVPN_2022_en.pdf — AVPN Disciplinare 2022 (EN) | Fermentation 23 °C; balls 200–280 g; total leavening min 8 / max 24 h; table: 8 h at 23 °C with 1.5 g fresh yeast/L and W 250–280; 24 h at 23 °C with 0.3 g and W 290–310; consume within 10–20 min of baking | **Primary** (standard) |
| 27 | https://jayarr.pizza/blog/pizza-dough-cold-fermentation/ (+ /how-long-pizza-dough-in-fridge/, /over-proofed-pizza-dough-rescue/) — JayArr | Aggregates Masi (weak flour W 160–200: 8–12 h vs W 250+: 24–48 h; 72 h with weak flour "risks complete structural collapse"), Gemignani (24+24 method; temper to 60–65 °F, 1–2 h), Forkish (2 h bulk, ball, 16–48 h fridge, 60–90 min out), Iacopelli (1.25× rise ready signal; reball + 1 h rescue; 7-day test "fragile, very wet"); yeast table by duration | Secondary aggregator of books (medium credibility; numbers cross-checked where possible) |
| 28 | https://pizzalogic.app/blog/how-long-does-pizza-dough-last-in-the-fridge/ | 1–5 days; AP flour 24–48 h, 96–120 h needs W280+; 38–42 °F ideal; yeast roughly doubles per 15 °F; below 36 °F near-dormant; 2 kg bulk core takes 12 h+; spoilage signs (vinegar smell = at/past peak; hooch = exhausted) | Calculator blog |
| 29 | https://bakersmath.co/fermentation-calculator and https://dough-lab.com/methodology | Q10 ≈ 2 (rate doubles per 10 °C); 4 °C ≈ 10–15 % of 24 °C yeast activity; LAB 30–40 %; temperature table (24 °C 2–3 h, 28 °C 1.5–2 h for 1 % IDY lean dough) | Calculator methodology pages |
| 30 | https://youtubetotranscript.com/transcript?v=PCQ0maTaTMA — Vito Iacopelli "How to properly freeze the pizza dough" | Freeze at the exact point of readiness, sealed flat; 2–4 months; thaw overnight in fridge, then 1 h at RT; leftover thawed balls back in the fridge "for one day it's good" | **Primary** (creator transcript) |
| 31 | https://youtubetotranscript.com/transcript?v=kdFkc51rL3g — Vito "No More Waste of Pizza Dough" | Leftover balls keep 2–3 days in the fridge (2-day-old "overproof leftover" still usable but gluten weaker/harder); refresh: 1 kg old dough + 200 ml water + 220 g flour + 5 g salt, no yeast, rest 10–15 min, ball, ready in 1.5–2 h | **Primary** (creator transcript) |
| 32 | https://community.fornobravo.com/forum/pizza-quest-with-peter-reinhart/pizza/11023-dough-ball-refrigeration-question | Caputo, multi-day CF: "about 45 minutes at room temperature, but in summer heat I cut that to about 15"; yeast balls given ≤20 min RT before fridge or they blow containers | Forum |
| 33 | https://www.thefreshloaf.com/node/60631/what-difference-between-retarding-bulk-or-balls | Divide/shape immediately out of the fridge; ready when it has lost ~half its elasticity — usually 2 h after removal, holds until ~4 h | Forum (sourdough) |
| 34 | https://thepizzaheaven.com/cold-fermented-pizza-dough/ | 3–5 days fridge with ~W300 flour; bulk ferments warmer/longer than balls; freeze balls cold straight from the fridge | Blog |
| 35 | https://www.pmq.com/how-to-cross-stack-and-downstack-your-pizza-dough-trays-and-why-it-matters/ — PMQ 2025 | Cross-stack until internal 50–55 °F (pick one target, e.g. 53 °F); temper to 50 °F; ~2.5 h good at RT | Trade press |
| 36 | https://pizzapreptable.com/blogs/pizza/how-to-keep-pizza-dough-fresh | Pull only 30–60 min of service at a time; 30–60 min temper; 72 h peak at 38–40 °F, some push 5 days | Trade blog |
| 37 | Italian W tables: https://www.omniabuk.com/guida-alle-farine-per-pizza-come-scegliere-in-base-a-forza-proteine-e-tempi-di-lievitazione/ ; https://blog.giallozafferano.it/gaetanacakemania/quanto-tempo-devono-lievitare-i-vari-tipi-di-farina/ ; https://www.pizzanapoletanadoc.it/forza-della-farina-w/ | W 180–200 → 2–4 h; W 220–240 → 5–8 h; W 260–280 → 8–12 h; W 300–320 → 12–24 h; W 350–400 → 24–48 h (all at ~20–22 °C room temperature) | Secondary (Italian pizzaiolo blogs, consistent across three) |
| 38 | https://www.kingarthurbaking.com/recipes/pizza-crust-recipe | 45 min RT rise, fridge 4–24 h; remove 2–3 h before serving; refrigerated dough needs 2–2.5 h vs 90 min un-refrigerated | Recipe (KAB) |
| 39 | Context handoff (this project) — C:/…/scratchpad/research/context-handoff.md | Established method; 3–3.5 h ball proof at 28 °C; balls hold 18–24 h more in fridge; fridge-temp effect table | Project's own validated experience |

---

## 2. Findings with numbers

### 2.1 Bulk cold ferment vs balled cold ferment — and when to ball

**Two camps, both legitimate:**

*Ball-first (Lehmann / PizzaBlab / PizzaLogic / most pizzerias).* Lehmann's procedure, verbatim steps 8–16 (source 1):

> 8. Take the dough directly to the bench for scaling and rounding/balling.
> 9. The dough should be cut and balled within a 20-minute time period.
> 10. As soon as the dough is formed into balls, place in plastic dough boxes and wipe the top of the dough balls with salad oil.
> 11. Immediately take the dough boxes to the cooler and cross stack them.
> 12. Allow the dough boxes to remain cross stacked in the cooler for 2 hours, then down stack and nest the dough boxes.
> 13. The dough will be ready to use after 16 hours in the cooler.
> 14. To use the dough, remove about a 3-hour supply of dough from the cooler, leave it in the covered dough boxes and allow it to temper AT room temperature for 60 to 90-minutes, then begin shaping the dough into pizza skins for immediate use.
> 15. The dough will remain good to use for up to 3 hours after you first begin using it.
> 16. Any dough remaining in the cooler will keep for up to 3 days.

2020 update (source 2): cross-stack until the INTERNAL ball temperature reaches 10 °C (time depends on ball weight — measure once per ball size); warm balls only to 10 °C internal, "DO NOT ALLOW DOUGH BALLS TO WARM TO ROOM TEMPERATURE"; usable 2.5–3 h at a 21–27 °C shop, less above 27 °C.

Why ball first (PizzaBlab, source 17, worked example at 4 °C fridge, 24 h): immediately-balled dough → "each ball will have an internal temperature of 4C/40F for 20 hours" out of 24. Bulk mass after 1 h at RT → "internal temperature of the dough will be 4C/40F for only 5 hours. During the remaining 14 hours, it will actually ferment at a higher temperature (a temperature that cannot be accurately predicted)." "Depending on the size/weight of the dough, it can take more than 12 hours for its core to reach the fridge temperature." (source 18). PizzaLogic (28): "the center of a 2kg batch can take 12 hours or more to reach fridge temperature."

*Bulk-first (Forkish / Gemignani / Ooni / Gozney / Vito / fazzari).*
- Forkish 24–48 h dough (27, 38's sister page https://www.searching4zen.com/recipes/24-to-48-hour-pizza-dough/): 2 h bulk at RT → ball → fridge 16–48 h ("next evening ideal, day after still good") → remove 60–90 min before making pizza.
- Gemignani 24+24 (27): 1 h RT → 24 h bulk in fridge (expect only 25–50 % rise) → degas, ball → 24 h fridge → temper 1–2 h to 60–65 °F. Claimed "lighter, crispier, more flavorful, with a stronger structure" than 48 h straight in balls.
- Ooni cold-prove (21): whole dough in fridge 24–72 h until roughly doubled → divide/ball → "leave to rise for 5 hours on your kitchen counter so they can come up to room temperature and double in size".
- Gozney proof guide (25): 1 h RT → bulk in fridge overnight (24–48 h better) → degas, ball → 2 h RT.
- fazzari (12): keep the bulk in the fridge for days, cut & ball the night before, ball spends the night in the fridge, out 4 h before bake.
- Handoff Method C (39): bulk overnight in fridge → ball while cold → 3–3.5 h RT at 28 °C.

**Effect on handling (PizzaBlab, 18):** "too little time in balls will result in overly elastic and resistant dough… too much time in balls may lead to an overly stretchy and sticky dough… More time in balls = more extensible dough." Default recommendation: "always begin with a 50/50 split between bulk and ball fermentation." Crucially for weak flour: "When it comes to Italian flours, it is generally recommended not to allow them to ferment in balls for the entire fermentation duration… due to their relatively low protein content and the very extensible nature of their gluten, which causes them to flatten and lose their shape relatively quickly." TXCraig1's advice to a member whose balls went flat on glass (source 9, reply 265): "Try more time in bulk and less time in balls."

**Cooling physics (why bulk ferments faster than the fridge temperature suggests):** yeast heat of metabolism ≈ 1 °F/h (Lehmann, source 4) / ≈ 0.5 °C/h (PizzaBlab, 17); CO2 in a risen bulk insulates the core (17); a fridge set to 0 °C "can yield a 6–8 °C dough" (10). Mitigations (17): divide into balls, or flatten bulk to ≤ 2–3 cm in the container, or lower FDT to 15–20 °C, split into several containers.

**Timer conventions:** TXCraig1's chart "fermentation time … is total bulk + balls" and reballing/punching down "will not work with this model — or at least you would have to allow for extra time" (9). PizzApp (13): "RT time … is from step 1 to step 5 plus time from step 6 to step 7 (total RT time from kneading to baking), while CT time is from step 5 to step 6. The app considers the time needed to cool the dough in step 5 and reheat it in step 6."

### 2.2 How long balled dough holds in a 3–5 °C fridge (by flour strength)

| Flour class | Hold window as balls at ~3–5 °C | Visible signs at the limit | Sources |
|---|---|---|---|
| Strong US bread / high-gluten (12.5–14 %) or W 350+ | Ready 16–48 h; peak 3–5 days at 38 °F (3.3 °C); quality loss from day 6; day 10 "barely any rise… off-putting sour"; enthusiasts run 5–8 days with 0.18 % IDY + malt | Kenji day 10: no rise, sour. | 19, 15, 1 (Lehmann: 3 days for commercial NY-type dough with 0.375 % IDY) |
| Caputo Pizzeria-class 00 (W 260–310, 12.5 %) | 24–72 h; Modernist 48 h; Gozney 2–3 days; TPC 24–48 h, sweet spot 36 h, ">72 h slack, tearing, sour"; The Pizza Heaven up to a week at W 300 | Balls "relax and spread out pretty flat when left for 3 days, but should not be flat as a pancake" (34) | 20, 25, 23, 34, 14 |
| All-purpose (10.5–11.5 %) | 24–48 h; "all-purpose flour usually can't" do 96–120 h — "gluten network starts falling apart, and the dough turns slack and sticky" | slack, sticky, tears | 28, WebSearch summary of fond.kitchen/jordospizzacalculator |
| Weak (W 160–220; **maida 9–10.5 %**) | Masi via JayArr: 8–12 h for weak flours vs 24–48 h for W 250+; "Using a weak flour (W 160–200) with a 72-hour cold ferment risks complete structural collapse." Italian RT tables: W 180–200 → 2–4 h, W 220–240 → 5–8 h at 20–22 °C. Project experience: balls hold "another 18–24 hours" after balling (39). | ball spreads to a pancake, surface liquid, boozy/vinegar smell, tears when stretched | 27, 37, 39 |

AVPN (26) gives the same relationship at room temperature: 8 h total at 23 °C needs W 250–280; 24 h at 23 °C needs W 290–310 (yeast 1.5 g vs 0.3 g fresh per litre of water).

**Maida adjustment.** Every "3–5 days" figure above is for ≥12.5 % protein / W ≥ 280 flour. Scaling by the W tables (weak W 180–220 tolerates roughly ⅓–½ the leavening time of W 300 at the same temperature) and by the user's own observed 18–24 h ball hold, the working numbers for maida+20 % atta with 25 % poolish are: **ready from ~12 h, best 18–30 h, hard limit 48 h from balling** (see §4). Poolish counts against this: 25 % of the flour is already ~20 h old at mix time (JayArr/Modernist: high fermented-flour share shortens the safe window and demands malt/sugar for browning).

**Signs of over-ferment (all sources agree):** balls doubled-plus and flattening; large translucent blisters; poke leaves a dent that never recovers; alcohol/vinegar smell (PizzaLogic: "sharp vinegar smell means the dough is very mature — at or just past its peak"); pooled liquid ("hooch") = exhausted; dough tears on stretching; sour-milk/rancid smell = bacterial, discard. **Under-ferment:** dense, springs back instantly, few bubbles, tight/elastic ("fights you").

### 2.3 Re-tempering: how long balls need out of the fridge

Two different targets exist in the literature — be explicit about which one the engine uses.

**(a) "Handling temperature" target (NY/US style, hand-tossed, 250–300 °C ovens):** open at 10 °C internal.
- Lehmann (4): "we normally advocate leaving the dough out of the cooler for 1.5 to 2-hours… the dough is typically at 50 to 55F" ; "Our labs typically run between 68 and 70F and this takes about 2 to 2.5-hours for dough balls weighing in at 12-ounces or less, and about 3.5-hours for those weighing in at 13 to 22-ounces."
- Lehmann (6): 50 °F is the "magic number" (minimum: below it the dough is hard to open and bubbles); 60 °F is the upper end because with many balls "things can start to get out of control pretty quickly."
- Window after reaching 10 °C: 2.5–3 h at 21–27 °C room; shorter above 27 °C (2, 3).
- Pete-zza (5): "the temper time is in inverse proportion to the room temperature"; he personally likes 65–70 °F dough.
- Member data (5): at 68–72 °F room, 1.5 h → 62 °F (16.7 °C) measured with a probe; "can be less than an hour in summer when its 85 outside and over 75 in the house".
- Forno Bravo (32), Caputo balls after days of CF: "about 45 minutes at room temperature, but in summer heat, I cut that down to about 15."
- Modernist (20): "tempering cold-proofed dough for 2 hours (or however long it takes for the dough to come up to 13 °C / 55 °F)".
- Gemignani (27): 1–2 h to 60–65 °F (16–18 °C), check with an instant-read thermometer.
- PizzaBlab (17): warm to ≥ 10 °C, "This usually takes 30 minutes to 3 hours… this rest is for physical handling, not to allow for additional fermentation" — **except** "Neapolitan Pizza: For high-heat environments (430 °C+ / 800 °F+), it is recommended to let the dough reach a higher internal temperature, around 20 °C / 68 °F. Baking cold dough at these extreme temperatures can cause aggressive 'leoparding'" (burnt bubbles).
- A Neapolitan pizzeria owner (6): "my personal number is 70 to 75 degrees. remember you are cooking at 800 plus degrees and under two minutes."

**(b) "Finish the proof" target (hybrid method: low yeast, balls under-risen in the fridge — this is the user's poolish/Method-C situation):** the ball must both warm AND rise to ~1.25–2×.
- Ooni (21, 22): 5 h on the counter to double (balls formed from cold bulk).
- Gozney (24): 3–5 h; Gozney (25): "around 2–4 hours but can be as long as 8 in a cooler environment"; poke test — springs back instantly = too tight.
- fazzari (12): 4 h for balls balled the previous night from cold bulk.
- Fresh Loaf (33): ready when it has lost ~half its elasticity — "usually takes 2 hours after removing from the fridge, but stays that way until nearly 4 hours."
- Kenji's test protocol (19): balled from cold bulk, 2 h at 70 °F, then stretched.
- pm 64435 (14): 4 h at 18–20 °C was NOT enough for 0.15 % IDY balls from a 2 °C fridge → flat; 5 h at 20–22 °C with 0.3 % IDY worked.
- Forkish (27): 60–90 min (his balls were balled warm after 2 h RT bulk and are already partly risen).
- Handoff (39): balls balled cold need "3–3.5 h at 28 °C… Minimum 2 hours, realistically 3–4."

**Underlying reason** (all): cold gluten is stiff/elastic and tears; CO2 and alcohol are more soluble in cold dough so the ball looks under-risen; gas expands as it warms; fully fermented dough needs only warming (10–13 °C), under-fermented dough needs time at RT to actually rise. Yeast metabolism adds ≈ 1 °F/h (4) / 0.5 °C/h (17) of self-heating.

**Measured warm-up points (core temperature), for fitting a curve:**
| Ball | Room | Elapsed | Core | Source |
|---|---|---|---|---|
| ≤340 g in a closed dough box | 20–21 °C | 2–2.5 h | 10 °C (from ~3–4 °C) | 4 (Lehmann, AIB lab) |
| 370–620 g in a closed dough box | 20–21 °C | 3.5 h | 10 °C | 4 |
| pizzeria balls in covered boxes | 21–27 °C | 1.5–2 h | 10–13 °C | 4 |
| single home ball in a container | 20–22 °C | 1.5 h | 16.7 °C | 5 (veloboy) |
| home ball | 21 °C | 2 h | ~18 °C ("around 65F") | 5 (mkevenson) |
| Modernist | RT | 2 h | 13 °C | 20 |

Fitting Newton cooling T(t)=T_room−(T_room−T_fridge)·e^(−t/τ): the boxed-stack pizzeria data imply τ ≈ 4–5 h (slow — nested boxes insulate), the single-ball-in-a-container data imply τ ≈ 1.0–1.3 h. For a 280 g ball on an open tray under loose oiled cling film at home, τ ≈ 1.5 h is a defensible middle value (see §4 for the table).

### 2.4 Cooling lag of a bulk mass vs balls

- Lehmann (1, 2): balls at 27–29 °C FDT need ~2 h cross-stacked in a 1–4 °C walk-in to reach 10–13 °C internal; this time "will change with the size/weight of the dough ball."
- PizzaBlab (17): balls straight in at FDT 15–20 °C: at fridge temp for 20 of 24 h (≈ 4 h lag). Bulk after 1 h RT: at fridge temp for only 5 of 24 h (≈ 19 h lag). "It can take up to 12 hours or more for the interior [of a large mass] to reach the fridge's actual temperature."
- PizzaLogic (28): 2 kg bulk core 12 h+.
- Lehmann (5, reply 17): "if you do not cross stack (ventilate/leave the lid off) the dough containers for at least a couple of hours after putting it in the fridge, the dough will continue to ferment rather vigorously."
- Lehmann (7): "our goal is NOT to cool the dough as fast as possible, but instead to cool it at a CONSISTENT rate."
- How calculators account for it: PizzApp counts cool-down inside the CT hours and the warm-up inside RT hours (13); PizzaBlab's calculator only supports the immediate-ball (Lehmann) method because hybrid cooling "cannot be accurately predicted" (17); TXCraig1's chart is total time and assumes no reball (9).

Derived equivalents (using the rate curve in §2.7, τ_ball ≈ 1.5 h, τ_bulk(1.5–2 kg) ≈ 7 h, dough entering at 24 °C into a 4 °C fridge): the first 3 h of a 280 g ball ≈ 0.6–0.7 h of fermentation at 25 °C; the first 12 h of a 1.5–2 kg bulk ≈ 3 h at 25 °C. This is the quantitative reason Method C in the handoff carries "higher overproofing risk".

### 2.5 Rescuing over-proofed balls by reballing

- Iacopelli via JayArr (27): "gently re-ball the dough and let it rest for approximately 1 hour — it can recover." Catch it early (slack, saggy, poke stays).
- pm 70393 (11): balls doubled after 24 h in a 38 °F fridge → reballed → fridge overnight → out 3 h before stretching → "quite possibly my favorite so far… skinned effortlessly". texmex: "Even dough that is sitting in your fridge for over a week can have life after the reball"; reballed-then-frozen balls used months later.
- PizzaBlab (18): reballing "resets" time-in-balls; if there isn't enough time afterwards the ball is "overly elastic and resistant." In their 29 °C photo series a reballed 70 % ball relaxed again within ~2 h.
- thatpizzakitchen (via exa; https://thatpizzakitchen.com/how-to-fix-over-proofed-pizza-dough/): degas, reball tight, rest 10–15 min, optional 30–60 min second proof; skipping the second proof gives a "slightly flatter, denser crust".
- TXCraig1 (9): reballs add time the chart doesn't include.
- Lehmann (5 p.2): over-reducing yeast to tame overproofing costs flavor/crispness and gives soft centers — fix management (cross-stack, FDT) first.

### 2.6 How pizzerias stage balls during service

- Lehmann (1, 2, 3): pull a 3-hour supply; temper 60–90 min (to 10 °C internal); open for 2.5–3 h; above 27 °C the window shrinks; balls nearing expiry are pre-opened onto screens and put back in the cooler (uncovered 30 min, then bagged), then need only ~15 min out before touch-up and use; unused balls are NOT returned to the cooler ("consistency is the name of the game") — they become breadsticks/garlic knots or ≤ 15 % of the next batch.
- pizzapreptable (36): pull "enough from the cooler for the next 30–60 minutes of service", 30–60 min temper; FIFO labelling; 72 h peak at 38–40 °F.
- Business Dojo (exa snippet, https://dojobusiness.com/blogs/news/pizza-restaurant-daily-prep): cold ferment 16–72 h; ball 3–4 h before service; pull one box per hour.
- Vito's father's pizzeria (31): daily "pasta di riporto" — yesterday's balls (2–3 days in the fridge) are refreshed into today's dough (1 kg old dough + 200 ml water + 220 g flour + 5 g salt, no added yeast; balls ready 1.5–2 h later).
- AVPN (26): balls consumed within the second rise's window; product eaten within 10–20 min of baking.

### 2.7 Fridge temperature effect on fermentation rate

Commercial coolers: legally 34–40 °F (1–4.4 °C), target 38 °F (3.3 °C) (5, 7, 8). Home fridges: "several degrees warmer", door opened ~50×/day (5, 8); positions inside one fridge vary 1–7 °C (17); a fridge "set at 0 °C can yield a 6–8 °C dough" because of self-heating (10). Modernist: set to ~4 °C (20). PizzaLogic: ideal 3–5 °C; below ~2 °C near-dormant; "yeast activity roughly doubles with every 15°F increase" (28). Kenji ran 38 °F (19). Yeast keeps working down to 0 °C (10). Don't re-dose yeast for a fridge difference under ~5 °F/3 °C (8).

**Relative rate table computed from TXCraig1's published Ganzle-fit parameters** (source 9, reply 4: rate = a·x^b·e^(c·x), x = 45 − T °C, a = 0.02645608, b = 2.037020784, c = −0.198964236; these are the 2013 beta parameters — his final chart, Reply 261, is an image that was later refined, so treat as ±20 %):

| T (°C) | rate / rate(25 °C) | rate / rate(4 °C) | "hours multiplier" vs 25 °C |
|---|---|---|---|
| 0 | 0.036 | 0.55 | ×27.7 |
| 2 | 0.049 | 0.74 | ×20.4 |
| 3 | 0.057 | 0.86 | ×17.6 |
| 4 | 0.066 | 1.00 | ×15.1 |
| 5 | 0.077 | 1.16 | ×13.0 |
| 6 | 0.089 | 1.34 | ×11.2 |
| 7 | 0.103 | 1.56 | ×9.7 |
| 8 | 0.119 | 1.80 | ×8.4 |
| 10 | 0.158 | 2.39 | ×6.3 |
| 12 | 0.209 | 3.16 | ×4.8 |
| 15 | 0.312 | 4.72 | ×3.2 |
| 18 | 0.458 | 6.92 | ×2.2 |
| 20 | 0.583 | 8.81 | ×1.7 |
| 22 | 0.732 | 11.1 | ×1.4 |
| 24 | 0.905 | 13.7 | ×1.1 |
| 25 | 1.000 | 15.1 | ×1.0 |
| 28 | 1.305 | 19.7 | ×0.77 |
| 30 | 1.505 | 22.8 | ×0.66 |
| 32 | 1.674 | 25.3 | ×0.60 |
| 34 | 1.773 | 26.8 | ×0.56 |

Cross-checks: BakersMath/Doughlab say 4 °C ≈ 10–15 % of 24 °C activity (this table: 7.3 %, i.e. slightly more conservative); Q10 = 2 gives 20→28 °C = ×1.74 whereas this model gives ×2.24 (Q10 ≈ 2.7). The user's own observation (3–3.5 h at 28 °C vs 4–5 h "cooler weather" for the ball proof) fits Q10 ≈ 2–2.3 better than 2.7 for the 20–30 °C range. **Engine recommendation:** use this table for the fridge range (0–10 °C) and Q10 = 2.3 for 15–34 °C (see §4).

Practical consequence: 48 h at 4 °C ≈ 41 h at 5 °C ≈ 31 h at 7 °C ≈ 27 h at 8 °C ≈ 65 h at 2 °C. A home fridge drifting from 4 to 7 °C shortens a safe 36 h window to ~23 h.

### 2.8 Proofed balls refrigerated for a second sitting

- Lehmann (2): pizzerias don't return balls to the cooler — but that is a consistency rule for volume operations, not a quality prohibition. His sanctioned alternative: pre-open the skins, refrigerate on screens (uncovered 30 min then bagged), 15 min temper before use (2, 3).
- Yael (pizzamaking, 2): returning leftover balls to cold storage: "yes if your dough is still usable."
- JayArr/Forkish same-day recipes (27; https://jayarr.pizza/blog/recipe-same-day-dough/): "Leftover dough balls: Wrap tightly and refrigerate. They'll continue fermenting slowly and can be used the next day with even better flavor… Use within 24–48 hours."
- Vito (31): leftover balls "can keep the dough in the fridge for about two three days"; his 2-day-old leftovers were "still so nice and fermented" but the gluten was "harder… gets weaker and weaker" — refresh if older. Vito (30): thawed balls not used today go back in the fridge "for one day it's good".
- Freezer (30): freeze at the exact ready point, sealed, flat; thaw in the fridge overnight, then 1 h at RT; 2–4 months. Gemignani (27): freeze after balling + 24 h CF; thaw 15 min in 27 °C water then 1.5–2 h at RT. pm 70393: freeze in plastic bags; thaw/rise in fridge from the morning, then ~3 h RT.
- Handoff (39): "Once balled, they hold in the fridge another 18–24 hours without overproofing."
- Fridge-return warming: Vito thawed balls "not really really cold" after 1 h out; Forno Bravo 15–45 min for already-fermented Caputo balls; Lehmann's 15 min for pre-opened skins.

---

## 3. Contradictions between sources and how to resolve them

1. **Ball before the fridge (Lehmann, PizzaBlab, PizzaLogic) vs bulk first (Forkish, Gemignani, Ooni, Gozney, Vito, fazzari).** Lehmann optimises predictability for a warm-mixed, moderately yeasted dough; the bulk-first camp optimises flavour/structure and fridge space and accepts the cooling lag by using much less yeast. PizzaBlab explicitly refuses to calculate yeast for hybrid schedules. *Resolution for the engine:* keep the user's poolish method (a hybrid by definition) but (a) never cold-bulk a round mass — flatten to ≤ 3 cm in a wide oiled container (PizzaBlab) so it cools like balls; (b) for ≤ 1.3 kg of dough prefer ball-then-fridge; (c) count the first 12 h of a thick bulk as ≈ 3 h at 25 °C when budgeting.

2. **Temper to 10–13 °C (Lehmann/Modernist/PizzaBlab) vs 16–20 °C (Pete-zza, Gemignani, PizzaBlab-Neapolitan, pizzeria owner 21–24 °C).** Not a real conflict: 10 °C is the *minimum* for a fully-fermented dough baked at ≤ 300 °C where a long usable window matters; a 60–90 s bake at 450–500 °C needs ~18–20 °C to avoid burnt blisters, and a hybrid/low-yeast ball must additionally finish rising. *Resolution:* for this oven, target core ≥ 18 °C AND visible ~1.5× rise / slow-return poke; cap at 24 °C.

3. **"60–90 min out" (Forkish, Lehmann) vs "3–5 h" (Ooni, Gozney) vs "15–45 min" (Forno Bravo).** The short times are for balls that were already risen before refrigeration or dough fully fermented in the cold; the long times are for balls cut from cold bulk with tiny yeast doses that must double at RT; the very short times are hot-weather Caputo balls after days of CF. *Resolution:* the engine must branch on the ball's state going into the fridge (see §4 regimes A/B).

4. **3–5 days ideal (Kenji, Ooni, The Pizza Heaven) vs 24–48 h (Modernist, Gozney, TPC, PizzaLogic-AP) vs 8–12 h for weak flour (Masi).** All are flour-strength statements. *Resolution:* apply the W ladder; maida sits at the weak end; the 3–5-day numbers must be roughly halved twice.

5. **Craig's model (Q10 ≈ 2.7 at 20–30 °C) vs Q10 = 2 calculators vs the user's observed ratios (≈ 2–2.3).** *Resolution:* fridge range from Craig's curve, room range from Q10 = 2.3, and always subordinate to the poke test.

6. **Never return balls to the fridge (Lehmann) vs it's fine (Yael, Forkish, Vito).** Lehmann's rule is about batch consistency in a pizzeria. *Resolution:* at home, refrigerate at the ready point, hard limit 24 h for maida, and prefer the freezer beyond 48 h.

7. **Lehmann "cross-stack/lid off 1–2 h" vs Reinhart-forum "≤ 20 min RT for IDY balls or they blow containers".** Different yeast levels (0.375 % vs ~0.1 %). *Resolution:* with the user's poolish (equivalent to a well-yeasted dough) treat balls as Lehmann does: lid ajar 1–2 h in the fridge, then seal.

---

## 4. Recommendations for the deterministic engine

All temperatures are dough/room °C; t is hours. Inputs already in the app: bake time, pizza count, first-sitting count, second-sitting time, hydration, room temperature. **Add inputs:** fridge temperature (default 5 °C; options 3/5/7), ball weight (default 280 g), and whether a thermometer is available.

### 4.1 Rate model
- Fridge range (0–10 °C): use the Craig-curve multipliers in §2.7 (rel. to 4 °C: 2 °C 0.74, 3 °C 0.86, 4 °C 1.00, 5 °C 1.16, 6 °C 1.34, 7 °C 1.56, 8 °C 1.80).
- Room range (15–34 °C): rate(T) = rate(28) · 2.3^((T−28)/10). Multipliers vs 28 °C: 15 °C ×0.34, 18 °C ×0.43, 20 °C ×0.51, 22 °C ×0.61, 24 °C ×0.72, 26 °C ×0.85, 28 °C ×1.00, 30 °C ×1.18, 32 °C ×1.40, 34 °C ×1.65.
- 4 °C ≈ 1/15 of 25 °C (≈ 1/20 of 28 °C).

### 4.2 Where to ball (bulk vs ball) — rule
- If dough is going to the fridge within 1 h of mixing: **ball first**, tray, oil the tops, lid ajar 1–2 h, then seal (Lehmann; PizzaBlab). Balls cool to fridge temperature in ~3–4 h.
- If the user insists on a cold bulk (Method C): flatten to ≤ 3 cm slab in an oiled wide container, lid ajar 1–2 h; treat its first 12 h as 3 h at 25 °C of extra fermentation; ball COLD straight from the fridge (Fresh Loaf, fazzari, Ooni) and never let a round bulk sit >1 h at RT before the fridge.
- Weak flour → ball later rather than earlier: bulk share ≥ 50 % of total fermentation time (PizzaBlab Italian-flour rule; TXCraig1 "more time in bulk, less in balls" for flattening balls).

### 4.3 Fridge hold window for balls (this flour, this poolish)
| Fridge | Earliest use | Best | Hard limit |
|---|---|---|---|
| 3 °C | 14 h | 20–36 h | 56 h |
| 4 °C | 12 h | 18–30 h | 48 h |
| 5 °C | 10 h | 16–26 h | 42 h |
| 7 °C | 8 h | 12–20 h | 31 h |
(48 h at 4 °C is the anchor: the AP-flour limit from PizzaLogic/TPC, halved-then-some from the 3–5-day strong-flour data, consistent with Masi's weak-flour caution and the user's observed 18–24 h; scaled by §2.7 multipliers. Balls that were fully proofed at RT before refrigeration get **half** these numbers, 24 h max at 4 °C.)
- If bake time − now > hard limit → schedule the poolish/dough later, or freeze.
- Signs to show the user at the limit: pancake-flat ball, big translucent blisters, liquid on the tray, vinegar/booze smell, tearing.

### 4.4 Take-out lead time (re-tempering) — two regimes
Core-temperature model for a 280 g ball on a tray under oiled film, τ = 1.5 h: t_to_target = 1.5 · ln((T_room − T_fridge)/(T_room − T_target)). Target core = 18 °C (min) for a 450–500 °C oven; 20 °C preferred when room ≥ 26 °C.

**Regime A — balls that were already proofed at RT (~1.5× risen, poke-ready) before going into the fridge (second-sitting balls, or balls balled warm after a 2–3 h RT ball proof):** warm only, no further proof needed.
| Room °C | Lead time before first stretch | Usable window after that |
|---|---|---|
| 15–18 | 2.5–3 h (core reaches ~13–15 °C; accept) | 3 h+ |
| 20–22 | 1.75–2.25 h | 3 h |
| 24–26 | 1.25–1.5 h | 2.5 h |
| 28–30 | 60–75 min | 1.5–2 h |
| 32–34 | 45–60 min | ≤ 1.5 h |
(Bounds: Lehmann 1.5–2 h at 20 °C to 10–13 °C; veloboy 1.5 h → 16.7 °C at 21 °C; Forno Bravo 45 min normal / 15 min summer for Caputo; Vito 1 h; Modernist 2 h to 13 °C.)

**Regime B — balls that went into the fridge cold/un-risen (balled from cold bulk, or balled and refrigerated within ~30 min of mixing, i.e. the hybrid Method C):** full RT ball proof; use the established 3.25 h at 28 °C scaled by §4.1:
| Room °C | Lead time (finish proof + warm) | Start poke-testing at |
|---|---|---|
| 15 | 9–10 h (impractical → move to a warm spot ~24 °C, or switch to Regime A) | — |
| 18 | 7–7.5 h | 5.5 h |
| 20 | 6–6.5 h | 4.5 h |
| 22 | 5–5.5 h | 4 h |
| 24 | 4.5 h | 3.5 h |
| 26 | 3.75 h | 3 h |
| 28 | 3–3.5 h | 2.5 h |
| 30 | 2.75 h | 2 h |
| 32 | 2.25–2.5 h | 1.75 h |
| 34 | 2 h | 1.5 h |
(Bounds: Ooni 5 h and Gozney 3–5 h at ~20 °C; fazzari 4 h; Kenji 2 h at 21 °C for a 170 g piece; pm 64435: 4 h at 19 °C too short, 5 h at 21 °C OK; handoff 3–3.5 h at 28 °C, 4–5 h cooler.) Winter kitchens (12–18 °C): tell the user to proof in the warmest room or a switched-off oven with the light on (TXCraig1) — an 85 °F/29 °C oven-light box turns a 7 h wait into 3 h.

**Poke test (always overrides the clock):** finger dent returns slowly and only partway = go; returns instantly = wait 30 min and re-test; stays = stretch now, gently, and start the next ball immediately (or reball, §4.6).

### 4.5 Cooling lag (for yeast budgeting)
- 280 g balls from 24 °C dough into a 4–5 °C fridge: count the first 3 h as 0.65 h at 25 °C (≈ 0.5 h at 28 °C) of extra fermentation; after that use the fridge rate. Lid ajar the first 1–2 h.
- 1.3–2 kg round bulk: count the first 12 h as 3 h at 25 °C (≈ 2.3 h at 28 °C). Flattened ≤ 3 cm slab: count the first 4 h as 0.8 h at 25 °C.
- Warm-up after the fridge counts as RT time (PizzApp convention); Regime B's lead time IS the ball proof, so do not double count.
- Poolish: the 1–2 h counter time plus its first 3 h in the fridge ≈ 2.5 h at 28 °C-equivalent — consistent with the handoff's yeast ladder (7 g / 5 g / 3 g).

### 4.6 Over-proofed balls — rescue rule
- If detected ≥ 2 h before baking: degas, reball tightly (oiled hands), cover; rest 60 min at ≥ 26 °C, 90 min at 22–25 °C, 2 h at ≤ 20 °C before stretching (Iacopelli 1 h; PizzaBlab ~2 h at 29 °C for 70 % dough; scaled). Reballed weak-flour dough relaxes fast — do not exceed 2.5 h.
- If detected < 45 min before baking: stretch now, expect a flatter cornicione (thatpizzakitchen: rest 10–15 min minimum after a reball).
- If the balls are not needed for ≥ 6 h: reball → fridge → Regime A lead time +30 min (pm 70393: overnight in fridge, 3 h out at ~24 °C).
- Balls more than ~1.5 days past their limit with weak flour: use as Vito's "pasta di riporto" (≤ 15 % of a new batch per Lehmann; Vito uses 1 kg old + 220 g flour + 200 ml water + 5 g salt) or bake as breadsticks.

### 4.7 Staging for a party (many pizzas, hot kitchen)
- Room ≤ 24 °C: one wave; balls are usable 2.5–3 h after they hit the target (Lehmann).
- Room 26–30 °C: two waves — wave 1 = pizzas baked in the first 90 min, wave 2 taken out 60–75 min before its first pizza.
- Room ≥ 32 °C: waves of ≤ 4 balls, 45–60 min lead, and keep waiting balls covered on the coolest surface (a marble/granite slab helps — TXCraig1).
- Alternative for hot rooms (Lehmann's PMQ trick): pre-stretch skins onto semolina-dusted trays, cover, refrigerate; 15 min out, touch up, top, bake. Skins hold ~6–8 h.
- Oven cadence: the CasaKoa needs 2–3 min recovery per pizza; 8 pizzas ≈ 40–50 min of baking, so a wave of 8 balls fits inside one 1.5 h window at 28 °C.

### 4.8 Remainder balls (second sitting) — decision tree
- Second sitting within 8 h, same day: put the leftover balls in the fridge the moment the first sitting's balls pass the poke test (they are then "Regime A" balls). Take out per §4.4-A (60–75 min at 28 °C). Or pre-stretch and refrigerate (15 min out).
- Second sitting 8–36 h later (≤ 24 h ideal): fridge, sealed, oiled tray with 5 cm spacing; take out per Regime A; expect a more extensible, slightly weaker ball — stretch smaller (24–26 cm) and handle gently. Show the §4.3 warning at > 24 h.
- Second sitting > 36 h later: **freeze** at the ready point (Vito): individual balls, oiled, wrapped tight or bagged, flat; move to the fridge the night before (≥ 12 h), then 60–90 min at RT before stretching (Vito 1 h; Gemignani 1.5–2 h). Good 2–3 months (Vito up to 4). Thawed-but-unused balls get one more day in the fridge.
- Never let balls proof a second time at RT for more than ~1 h once they've already been ready once — weak flour will not survive a second full rise.

### 4.9 Fridge-temperature UI
- Ask "how cold is your fridge?" with 3 / 5 / 7 °C presets; multiply all fridge durations by 0.86 / 1.16 / 1.56 (relative to 4 °C) — i.e. divide the hold windows. Recommend a Rs. 500 fridge thermometer placed on the dough shelf; note that the door and top shelf differ by up to 4–6 °C (PizzaBlab), so use the back of the middle/bottom shelf. Do not change yeast dose for a < 3 °C difference (Pete-zza), only the timeline.

---

## 5. Open questions

1. No source gives a measured hold limit for 9–10.5 % protein South-Asian maida specifically; the 48 h at 4 °C cap is an extrapolation (W ladder + AP-flour data + the user's 18–24 h experience). A one-off test (ball 6 balls, pull one every 12 h from 12–72 h, photograph and poke) would pin it down in a week.
2. TXCraig1's final chart (Reply 261) is an image; the parameters used here are his 2013 beta fit. If someone can transcribe the 2015 chart's 4–8 °C column, replace the §2.7 multipliers.
3. The ball warm-up time constant (τ ≈ 1.5 h) is inferred from two very different setups (nested pizzeria boxes τ ≈ 4–5 h; single ball τ ≈ 1.1 h). One evening with a probe thermometer in a 280 g ball on the user's actual tray at 28 °C would calibrate it.
4. How much the 25 % poolish shortens the safe fridge window for weak flour is asserted (JayArr/Modernist) but not quantified anywhere found; the engine currently assumes the poolish is already "in the clock" via the yeast ladder.
5. Whether 3.5 % salt materially extends the maida hold window (PizzaLogic says salt slows proteases) — no numbers found.
6. Humidity effects (monsoon season) on surface skinning and on fridge condensation were only qualitatively covered (Masi 70–80 % RH for proofing).
