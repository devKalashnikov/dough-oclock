# Dough O'Clock — the model behind the app (as implemented in `engine.js`)

Written 2026-09-04 from the 12 research notes in this folder (≈450 sources, 45 video transcripts) and the three
architect specs (`spec-robust.md`, `spec-flavor.md`, `spec-kinetic.md`). Where the three disagreed, the choice and
the reason are stated. Everything below is deterministic arithmetic; there is no AI at runtime.

## 1. The one thing that was measured on this flour

Every timing is anchored on the single validated data point from the old session: a 25 % poolish dough of
maida + 20 % fine atta at 3.5 % salt, 280 g balls, mixed with cold water, proofed **3–3.5 h at 28 °C**.
The engine simulates exactly that schedule once at start-up and calls the fermentation it accumulates
"ready" (`EQ_READY ≈ 4.7` 25 °C-equivalent hours). Every other kitchen temperature, fridge hold and lead time is
derived from that anchor with the temperature curves below. (`spec-flavor` §4.2, `spec-robust` §4.1)

## 2. Temperature model

* **Fermentation rate `r(T)`**, 25 °C = 1.00. Fridge range from TXCraig1's yeast chart (pizzamaking.com topic
  26831, digitised in `raw/craig_table.json`): 4 °C 0.045, 5 °C 0.055, 7 °C 0.077, 8 °C 0.090 — a fridge that
  drifts from 4 to 8 °C ferments twice as fast. Warm stages of the poolish dough use Q10 = 2.3
  (rate × 2.3 per +10 °C: 20 °C 0.66, 24 °C 0.92, 28 °C 1.28, 30 °C 1.52, 32 °C 1.79, capped at 34 °C).
  Direct (no-poolish) dough uses the Craig curve throughout. Why two curves: Craig's chart is a time-to-ready
  model for low-yeast doughs where growth compounds (effective Q10 3–4); a dough carrying a ripe 2 % poolish is
  at high inoculum from minute one and follows the metabolic rate. Three researchers independently derived
  Q10 ≈ 2.3 for this dough and the old session's own pair (3–3.5 h at 28 °C vs 4–5 h "cooler") fits it.
  Textbook Q10 = 2 was rejected: it under-predicts a 30 °C kitchen and over-predicts fridge activity.
  (`temperature-kinetics.md`, `yeast-model.md`, `cold-ferment-logistics.md`)
* **Thermal lag.** Dough core temperature follows Newton cooling toward its surroundings with τ = 1.5 h for a
  280 g ball (PizzaBlab: balls are at 4 °C for 20 of 24 h; Lehmann's measured warm-up). Progress is integrated
  every 5 minutes along that trajectory, so the hour a ball spends cooling in the fridge and the hours it spends
  warming on the counter both count for what they really are. A 1.6 kg bulk (τ 4.5 h) would burn ~2 eq-h before
  it is cold, which is why the app always balls before any fridge stage and never cold-bulks.
* **Night temperature.** Room stages between 22:00 and 07:00 use the night temperature
  (default = day − 4 °C when the day is ≥ 24 °C).
* **Degradation clock `D`** for weak flour: `∫ 2^((T−25)/10) dt` (enzyme Q10 = 2, so the fridge slows the
  yeast ~20× but the proteases only ~4×). Comfort limit 10, hard limit 14. 48 h of balls at 4 °C alone ≈ 11,
  so cold holds are capped at 30 h (≤ 5 °C fridge), 24 h (6–7 °C), 16 h (≥ 8 °C).
  (`flour-strength-maida.md`: Pakistani maida is ~10 % protein, W ≈ 160–220; `spec-flavor` §4.5)

## 3. Recipe

`dough = pizzas × ball × 1.02`; `flour = dough / (1 + hydration + salt + oil)`; poolish = 25 % of the flour at
100 % hydration (honey 2 % of poolish flour only when it is fridge-held ≥ 3 h; none in a same-day poolish and
never in the final dough at a 380–420 °C floor); atta = 20 % of total flour, all in the final dough; salt 3.5 %
(3.0 % option) — salt also brakes the proteases; oil 3 %. Hydration 60–70 % offered, 65 % validated,
warnings above 66 % and above 65 % in a ≥ 31 °C kitchen. Ball 280 g → stretch to 31 cm (0.37 g/cm²).
Water temperature from the desired-dough-temperature rule with a 17 °C mixer friction factor (speed-2 knead of about 15 running minutes; King Arthur measured 12–13 °C for 7 min, PizzaBlab gives 8–16 °C for stand mixers)
(King Arthur / PizzaBlab): DDT 23 °C for a room-proofed dough (25 °C below 20 °C rooms), 20 °C when the balls are
going to the fridge, 26 °C for the emergency dough; ice and chilled-flour instructions appear when the formula
demands water below 1 °C. (`hydration-and-oven.md`, `avpn-and-classic.md`)

## 4. Poolish yeast — the one real disagreement

Published poolish tables want 0.03–0.3 % yeast for 8–16 h on the counter, which is an unweighable speck in a
28–34 °C kitchen; Vito's class (1–2.8 % on the poolish flour, 1–2 h warm, then the fridge) is the only class that
is safe in this heat and the one the old session validated. The kinetic spec solved the dose down to ~1 g per
250 g; the robust spec kept the fixed 5/3/7 g presets; the flavor spec used temperature-banded presets.
**Chosen: the banded presets** (per 250 g poolish flour, scaled to the batch):

| kitchen | fridge-held poolish | counter time before the fridge | same-day poolish | counter time |
|---|---|---|---|---|
| ≤ 18 °C | 5 g, lukewarm water | 2.5 h | 7 g | 3.5 h |
| 19–22 °C | 5 g, room water | 2 h | 7 g | 3–3.5 h |
| 23–24 °C | 5 g, fridge water | 1.75 h | 7 g | 3 h |
| 25–26 °C | 4 g, fridge water | 1.75 h | 5 g | 2.5 h |
| 27–29 °C | 4 g, fridge water | 1.5 h | 5 g | 2.25–2.5 h |
| 30–32 °C | 3 g, ice water | 1.5 h | 4 g | 2 h |
| ≥ 33 °C | 3 g, ice water | 1.25 h | 4 g | 1.75 h |

The visual cue always overrides the clock: to the fridge (or into the mix) when it is domed, bubbling all over
and the centre has just started to flatten. Fridge hold 3–24 h at ≤ 5 °C (16 h at 6–7 °C, 12 h at ≥ 8 °C);
a poolish that sank below its high-water line and smells boozy is discarded — weak maida cannot absorb it.
No extra yeast goes into the final dough except in cold kitchens where the proof would exceed the cap
(7 h ≤ 18 °C … 3 h ≥ 30 °C) and the top-up is at least 0.3 g. (`poolish-science.md`, `vito-videos.md`,
`hot-climate-dough.md`, `expert-videos.md`)

## 5. Plans (chosen by lead time and temperature)

| plan | when | shape |
|---|---|---|
| Emergency direct | < ~5–6 h | mix → 15 min rest → ball → proof; yeast solved from Craig's chart ×1.2 safety (0.10–0.70 %) |
| Same-day poolish | ~5–9 h | poolish on the counter until ripe → mix → 30 min rest → ball → room proof |
| Overnight poolish + same-day balls (default) | ~9–30 h | poolish warm → fridge 3–24 h → mix → rest → ball → room proof (3.2 h at 28 °C, 2.6 h at 32 °C, 5 h at 20 °C, 8 h at 16 °C) |
| Overnight poolish + cold balls | chosen by the app, never by hand: lead beyond what the poolish can absorb (≥ ~30 h), or any lead in a ≥ 31 °C kitchen, or when the room plan would put a step in the sleep window | as above but balls get a 30–90 min head start, then 8–30 h in the fridge, then come out 2.5–4 h before baking to finish rising **and** warm through (cold dough tears and blisters at 500 °C) |

The room proof is solved by bisection so that fermentation hits `EQ_READY` 15 minutes before the first launch;
poke-testing starts at 80 % and the ready window ends at 120 % (≈ 45 min at 28 °C, 30 min at 32 °C).
Above 30 °C with 5+ pizzas the app tells you to proof in waves. Extra lead time is never spent warm: the start
is delayed ("nothing to do yet") and the fridge absorbs the rest.

**Sleep hours.** No hands-on step is scheduled inside the asleep→awake window when the fridge can absorb the
shift (poolish hold and ball hold are searched on a grid). When it cannot — a 16 °C kitchen and an early bake —
the app says by how much to move the bake, or to proof in a warmer spot.

## 6. Leftovers (decided at balling time, never by re-chilling a proofed ball)

* Second sitting ≤ 1–2 h after the first: all balls proof together.
* Otherwise the spare balls go into the fridge un-proofed 30–90 min after balling and come out 2.5–4 h before
  the second sitting (solved the same way as the cold plan), as long as their total cold time stays under the
  30/24/16 h cap and `D ≤ 14`.
* Beyond that: freeze right after balling as ≤ 3 cm pucks (Vito 2022 / Lehmann / King Arthur), move to the
  fridge ~16 h before (shifted to 22:00 the evening before if that lands at night), then 3.5–6.5 h at room
  temperature with a 12 % larger budget because freezing kills some yeast. Best within 14 days, warn beyond 30,
  refuse beyond 90. (`freezing-and-leftovers.md`)

## 7. What is still an estimate (worth one kitchen test each)

1. The fridge's real temperature on the dough shelf (3 vs 7 °C doubles every cold rate) — put a thermometer in.
2. Whether 3 g of yeast in a 30 °C poolish ripens fully in 16–24 h at your fridge temperature (watch its height at
   12, 18, 24 h).
3. The 30 h cold cap for balls — pull one ball every 12 h from 12 to 48 h once, and compare.
4. The mixer friction factor (17 °C assumed): measure the dough temperature after one knead and adjust.


## Mixing method (revised 2026-09-07)

A batch mixed "speed 1–2, poolish + 80 % of the water from the start" stayed liquid and never gathered on the
hook. The method the app now teaches (sources in `mixing-and-kneading.md`):

* **Kneading speed is defined by behaviour, not by the dial.** It is the lowest setting where the hook drags the
  dough round the bowl and it gathers within a minute: speed 2 on a KitchenAid (whose maker caps dough there for the
  gearbox, and whose speed 1 already exceeds a spiral mixer's second speed), **speed 5–6 on Dawood's mixer**
  (observed 2026-09-07: speed 2 only stirred and the dough stayed soup). Every "high speed in
  the middle" method (Vito, Lehmann's planetary advice, the WPC Hobart recipe) is a spiral or commercial mixer;
  on a KitchenAid the equivalent is speed 2 for 6–10 min. Low speed only needs 17–25 min to reach smooth (Lehmann).
* **Weak flour needs a stiff first mix.** Start with the poolish + half the final water (≈ 45–50 % total hydration),
  speed 1 for 2–3 min to a rough ball, rest 15–20 min, then speed 2 until it clings to the hook. Only then the
  second water (bassinage) in 3–4 small additions, each absorbed before the next (Wordloaf, PizzaBlab, The Fresh
  Loaf "weak and moist flours need about 40–50 % hydration in the first step"). Adding all the water early dilutes
  the gluten strands so they never link and the hook spins in vain — exactly the failure observed.
* **Salt** dissolved in the held-back water and added with the second water: delayed enough to let the first gluten
  form (the validated practice), dissolved so it distributes (PizzaBlab). Oil after all the water is absorbed.
* **Stop at smooth and satiny.** For overnight/cold-fermented dough a full windowpane is unnecessary and intensive
  mixing is harmful; fermentation finishes the gluten (PizzaBlab, Lehmann "about 50 % of full development").
* **Friction factor 17 °C** and the mix step is 36 min in the timeline. Ice: when the water temperature comes out
  below 0 °C, 20 % of the water goes in as crushed ice with the first water and the flour/bowl are chilled; if the
  dough still finishes above 27 °C, finish with stretch-and-folds rather than more mixer time.


## Yeast and water temperature (revised 2026-09-07)

A poolish made by whisking instant yeast and honey into ~5 °C water sat 10 h without fermenting. The earlier presets
(5–9 °C poolish water in warm kitchens) put dry yeast into cold water, which the manufacturer forbids. Sources in
`yeast-and-temperature.md`.

* **Cold does not kill yeast; cold rehydration does damage dry yeast.** Baker's yeast slows below ~10 °C, idles in the
  fridge and survives freezing (Saf-instant may be stored frozen). Dry yeast, however, must rehydrate at 37–43 °C:
  below 20 °C membrane recovery is slow, up to half the soluble cell contents leak (glutathione → slack dough),
  cells are killed or crippled (Lallemand via PizzaBlab; Lesaffre pack: "no direct contact with ice or iced water";
  Lehmann: suspend IDY at 95 °F, ADY at 100–105 °F for 10 min, afterwards it may go over ice).
* **Poolish water keeps the designed cool temperatures** (8 °C at ≥ 30 °C room, 12 °C at 27–29, 14 °C at 25–26,
  16 °C at 23–24, room water at 19–22, 25 °C below 19): in warm kitchens the cold water holds the counter phase back
  (poolish-science R6; validated 8–10 °C). What changed is the yeast's first contact: it is suspended in 30 g of the
  water at 38 °C, water only, for 10 min, then added with the cold water and the honey (Lehmann: hydrated yeast may
  meet ice). The warm slurry raises a 330 g poolish by ≈ 4 °C: 18 °C start in a 31 °C kitchen versus 15 °C with
  all-cold water and 12 °C for the old whisk-it-in-cold method. Fresh yeast needs none of this.
* **Final-dough water** stays ice-cold in hot kitchens (friction, DDT); it is safe because the yeast is already
  alive in the poolish. The emergency direct dough suspends its yeast at 38 °C first; extra final-dough yeast in cold
  kitchens is suspended the same way.
* Heat limits: fermentation stops near 50 °C (Lesaffre), cells die above ~55 °C; never put yeast in water above 43 °C.
