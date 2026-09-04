# Temperature Kinetics of Yeast Fermentation — research notes for the deterministic dough engine

Dimension: **temperature-kinetics**. Purpose: give the engine a defensible way to convert "N hours at T °C" into
**equivalent hours at a reference temperature**, plus DDT (dough temperature control) and thermal-lag constants
(cooling in the fridge, warm-up on the counter).

Context this must serve: Islamabad, Sept kitchen 28–34 °C day / 24–27 °C night, winter 12–18 °C; home fridge 3–6 °C
(drifting to 7–8 °C); **weak maida + 20 % fine chakki atta** (est. 9–10.5 % protein, no W rating); Saf-Instant IDY;
Vito-style poolish (250 g + 250 g + honey), final dough 65–70 % hydration, 3.5 % salt, ~5 % oil, 280 g balls.

---

## 1. Sources consulted

### Primary / near-primary (model parameters, book/standard text, official regulation, measured lab data)

| # | URL | What it is | Credibility |
|---|---|---|---|
| P1 | https://www.pizzamaking.com/forum/index.php/topic,26831.0.html (Reply #4) | **TXCraig1's Baker's Yeast Quantity Prediction Model** — the source model behind PizzaBlab, dough.school and BeanAnimal. Reply #4 states the growth model form and **the actual fitted constants**. | Highest available for pizza-specific kinetics. Author is the forum's most rigorous modeller; he states openly the model is a fit, not measurement. |
| P2 | https://web.archive.org/web/2018id_/http://www.theartisan.net/dough_fermentation_and_temperature.htm | "Yeast Treatise — Dough Fermentation & Temperature", reproducing **Pyler, *Baking Science & Technology*** Tables 4 & 5: gas-production rate (mmol CO₂/hr/g dry yeast solids) at 29–42 °C. Cited approvingly by Pete-zza and Tom Lehmann on pizzamaking.com. Live site is now a parked domain — use the Wayback copy. | High (textbook data, secondhand transcription). |
| P3 | https://www.pizzamaking.com/forum/index.php/topic,26095.0.html | **Tom Lehmann ("The Dough Doctor")** on finished dough temperature, cooling targets, and the *heat of metabolism* term. Verbatim expert statements. | High (industry authority, AIB). |
| P4 | https://journals.asm.org/doi/10.1128/AEM.01861-10 (Salvadó et al. 2011, *Appl. Environ. Microbiol.* 77(7):2292–2302) | Cardinal temperature model with inflection (CTMI) fitted to 27 yeast strains; **S. cerevisiae mean T_opt 32.3 °C, T_max 45.4 °C**. One of the two papers TXCraig1 used. | Peer-reviewed. |
| P5 | https://doi.org/10.1128/aem.64.7.2616-2623.1998 (Gänzle, Ehmann, Hammes 1998) | The growth-rate-vs-temperature model form TXCraig1 adopted (`rate = a·xᵇ·e^(c·x)`, x = T_max − T). | Peer-reviewed. |
| P6 | https://ojs.library.ubc.ca/index.php/expedition/article/view/188348 | Student-lab respirometry: CO₂ per cell for *S. cerevisiae* at 25/30/35 °C. | Peer-reviewed-ish (undergrad journal) — directionally useful only. |
| P7 | https://www.pizzanapoletana.org/public/pdf/Disciplinare-2024-ENG.pdf | **AVPN 2024 disciplinare** (English). Yeast dose, total fermentation window, proofing-chamber parameters, ball weights, oven temps. | Primary regulation. |
| P8 | https://web.archive.org/web/2019id_/https://www.kingarthurflour.com/blog/2018/05/29/desired-dough-temperature and .../2018/08/27/determining-the-friction-factor-in-baking | King Arthur Baking: the DDT formula and **measured friction factors for a 7-qt KitchenAid** and for hand kneading; also quotes Hamelman's FF. | High for DDT/FF. |

### Expert forums / practitioner-calibrated calculators

| # | URL | What it is | Credibility |
|---|---|---|---|
| S1 | https://beananimal.com/tools/dough-fermentation-calculator/ | Multi-stage dough rise calculator, explicitly **equations fitted to TXCraig1's published chart**. I sampled it programmatically to recover the chart's implied rate-vs-temperature curve (see §2.3). | Medium-high — faithful re-implementation, equations not published. |
| S2 | https://www.pizzablab.com/learning-and-resources/fermentation/factors-affecting-fermentation-rate/ | Yuval / PizzaBlab. States the enzymatic Q10 rule, FDT targets, salt/sugar modifiers. Calculator is server-side (formula not extractable) and is stated to be the TXCraig1 model, refined. | Medium-high. |
| S3 | https://www.pizzablab.com/learning-and-resources/fermentation/how-to-cold-ferment-pizza-dough/ | The best quantitative statement I found on **cooling lag: Lehmann-method balls are at 4 °C for 20 of 24 h; bulk mass only 5 of 24 h**. | Medium-high. |
| S4 | https://www.pizzablab.com/learning-and-resources/fermentation/guide-to-room-temperature-fermentation/ and .../the-encyclopizza/final-dough-temperature/ | RT fermentation window 15–30 °C; FDT targets by method; **water-temperature formula**. | Medium-high. |
| S5 | https://www.thefreshloaf.com/node/25926/fermenting-and-proofing-max-temps%E2%80%A6why | TFL thread; contains the widely-quoted **"doubles for every 18 °F / 10 °C"** claim and the counter-arguments; SFBI newsletter quote. | Medium (forum). |
| S6 | https://www.thefreshloaf.com/node/8299/effects-dough-temperature | TFL: protease/gluten-degradation-at-higher-temperature mechanism (SteveB of breadcetera), plus Hamelman p.382–385 quotes. | Medium. |
| S7 | https://www.pizzamaking.com/forum/index.php/topic,26831.260.html | TXCraig1's worked example of **how to chain two temperature stages** with his chart (the exact "equivalent hours" algorithm), plus his statement of where the model is validated (60–76 °F, 24–48 h). | High. |
| S8 | https://www.pizzamaking.com/forum/index.php/topic,12247.0.html | Pete-zza + Lehmann on cold-proofing temps: commercial coolers 36–40 °F target 38 °F; home fridges warmer and more variable. | High. |
| S9 | https://www.pmq.com/the-dough-doctor-makes-a-house-call/ , https://www.pmq.com/dough-boxes-for-pizzerias/ , https://www.pmq.com/check-your-doughs-temperature-before-opening-it-into-skins/ | Lehmann in PMQ: cross-stacking, 50–55 °F internal target, "warm to 50 °F before opening", 2.5–3 h usable window. | High. |

### Secondary (books-via-blog, calculators, well-written aggregators)

| # | URL | What it is | Credibility |
|---|---|---|---|
| B1 | https://sourdoughhydration.com/temperature and /guide/temperature-and-time | Publishes a **fermentation-multiplier table attributed to Myhrvold et al., *Modernist Bread* vol. 3** (36–40 °F = 10×, 76 °F = 1.0×, 90 °F = 0.42×). I could not verify against the book itself. | Medium — attribution unverified. |
| B2 | https://www.weekendbakery.com/posts/the-temperature-equation-timing-your-fermentation/ | "Fermentation activity roughly **doubles for every 5 °C** increase", with a bulk-time table 18/24/30 °C. | Medium. |
| B3 | https://bakersmath.co/fermentation-calculator | Explicit **Q10 = 2** implementation, "reliable between 4 °C and 32 °C", cold ferment "10–15× slower". | Medium. |
| B4 | https://proofit-app.com/en/blog/bulk-fermentation-temperature | Q10 rule + bulk table 20–28 °C + the **"above 28–30 °C protease weakens gluten faster than fermentation compensates"** claim. | Medium. |
| B5 | https://thesourdoughjourney.com/the-mystery-of-percentage-rise-in-bulk-fermentation/ and the linked PDF | Measured-ish **fridge cooling curve for a shaped bulk dough** (80 °F → 37 °F over ~12 h, stage by stage) and "8–10 h to reach fridge temperature". | Medium-high (own experiments, logged). |
| B6 | https://app.ckbk.com/section/howb92676c11s005ss001/factors-affecting-yeast-fermentation | **Figoni, *How Baking Works*** — dormancy at 0–1 °C, active from ~10 °C, optimum 25–28 °C, fast-but-flawed at 30–38 °C. | High for a textbook, accessed via ckbk. |
| B7 | https://app.ckbk.com/section/brea32715b01s005/desired-dough-temperature | **Hamelman, *Bread*** — DDT zone 75–78 °F and the reasoning (gas from yeast + flavour from lactobacilli). | High. |
| B8 | https://starreveld.com/blog/pages/baking/dough-calculator/friction-factor/ | Claims **KitchenAid FF ≈ 40 °F**, Hobart ≈ 20 °F. | Medium (contradicts King Arthur — see §4). |
| B9 | https://flourwise.com/blog/ddt-calculator-guide/ | FF table: hand 3–4 °C, **KitchenAid 7-qt 12–13 °C (22–24 °F)**, spiral ~8 °C, commercial 17 °C; DDT by bread type incl. pizza 24–26 °C. | Medium (matches King Arthur). |
| B10 | https://thedoughformula.com/fundamentals/desired-dough-temperature/ | FF: hand 0–1 °C, stand mixer stiff dough 3–4 °C, higher-hydration 2–3 °C. | Low-medium (outlier, see §4). |
| B11 | https://newsletter.wordloaf.org/class-time-desired-dough-temperature/ | Andrew Janjigian: FF 5 (hand), **25 (stand mixer, medium speed)**, 30 (food processor); DDT 75 °F yeasted / 78 °F sourdough. | Medium-high. |
| B12 | https://scienceinsights.org/what-temperature-kills-yeast-in-dough-vs-activates-it/ | "At 41 °F the growth rate is roughly **50× slower** than at its peak near 88 °F"; peak 30–31 °C. No citations. | Low (uncited) — quoted as an outlier. |
| B13 | https://jayarr.pizza/blog/how-long-to-proof-pizza-dough/ | "a 1 °C increase (20–35 °C) accelerates fermentation **8–12 %**"; "at 4 °C yeast drops to roughly **10 %** of room-temperature activity, but enzymes retain 40–50 %". | Low-medium (uncited but internally consistent). |
| B14 | https://pmc.ncbi.nlm.nih.gov/articles/PMC7919833/ | Review, yeast fermentation at low temperatures: optimum 25–30 °C; "fermentation rate was **2.5× faster at 28 °C**" than at 15 °C (wine). | Peer-reviewed review. |
| B15 | https://bmcsystbiol.biomedcentral.com/articles/10.1186/1752-0509-6-151 | Glycolytic flux in *S. cerevisiae* was **six-fold lower at 12 °C than at 30 °C**; notes typical activation energies 42–125 kJ/mol imply ~2× per 10 °C. | Peer-reviewed. |
| B16 | https://www.e3s-conferences.org/articles/e3sconf/pdf/2020/40/e3sconf_te-re-rd2020_03012.pdf | CO₂ released by bread dough during proving, measured 30–40 °C at 1 °C steps; differences of ≤6 ppm within 3 °C bands → **rate is nearly flat between 30 and 36 °C**. | Peer-reviewed conference paper. |

---

## 2. Findings with numbers

### 2.1 The TXCraig1 / Gänzle model — the single most usable equation (P1)

TXCraig1, Reply #4 of the yeast-model thread, verbatim:

> "I had a very hard time finding any good data on growth rate at temperature for strains of *S. cerevisiae* used in
> baking, so I used the model proposed by Ganzle et al. (1998) … I started with Salvadó et al. … and Serra et al. …
> and then hand adjusted the curves and let Excel Solver fit them to the Ganzle model until I hit or was reasonably
> close to data I feel good about at several points around the chart"
>
> Ganzle model:
> `growth rate at temperature T = a ∙ x^b ∙ e^-c∙x`
> `x = Tmax - T`; Tmax is the maximum temperature at which the yeast will grow.
> In the model right now, **Tmax = 45C, a = 0.02645608, b = 2.037020784, c = -0.198964236**

He also says the baseline is 25 °C:

> "Converted it to yeast % based on 60%HR and decided to use **25C as my baseline model**."

**Note on sign.** Taken literally (`e^(−c·x)` with c negative) the curve runs backwards. The physically correct
reading is `rate(T) = a·x^b·e^(c·x)` with c = −0.198964236 — i.e. `e^(−0.198964·x)`. With that reading the curve
peaks at **T = 45 − b/|c| = 34.76 °C** and goes to zero at 45 °C, which matches Salvadó's *S. cerevisiae* cardinals
(T_opt 32.3 °C, T_max 45.4 °C) and matches every practical source. Computed, normalised to 25 °C = 1.00:

| T (°C) | rate (model units) | relative to 25 °C |
|---|---|---|
| 0 | 0.00798 | 0.036 |
| 2 | 0.01082 | 0.049 |
| 4 | 0.01462 | 0.066 |
| 5 | 0.01697 | 0.077 |
| 6 | 0.01966 | 0.089 |
| 8 | 0.02629 | 0.119 |
| 10 | 0.03495 | 0.158 |
| 12 | 0.04616 | 0.209 |
| 15 | 0.06905 | 0.312 |
| 18 | 0.10120 | 0.458 |
| 20 | 0.12880 | 0.583 |
| 22 | 0.16180 | 0.732 |
| 24 | 0.20014 | 0.905 |
| **25** | 0.22109 | **1.000** |
| 26 | 0.24300 | 1.099 |
| 28 | 0.28842 | 1.305 |
| 30 | 0.33275 | 1.505 |
| 32 | 0.37011 | 1.674 |
| 34 | 0.39207 | 1.773 |
| 35 | 0.39396 | 1.782 (peak ≈ 34.8 °C) |
| 36 | 0.38784 | 1.754 |
| 38 | 0.34605 | 1.565 |
| 40 | 0.25960 | 1.174 |
| 42 | 0.13652 | 0.617 |
| 44 | 0.02168 | 0.098 |
| 45 | 0 | 0 |

Implied Q10 from this curve (ratio of rates 10 °C apart): 10→20 °C **3.68**, 15→25 °C **3.20**, 20→30 °C **2.58**,
25→35 °C **1.78**, 30→40 °C **0.78**. Implied doubling interval: **+5.6 °C at 15 °C, +6.6 °C at 20 °C**; above ~25 °C
the rate never doubles again before the peak.

### 2.2 How TXCraig1 chains two temperatures — the exact "equivalent hours" algorithm (S7)

Verbatim from Reply #273 (worked example: 64 °F for 24 h, then 36 °F for 120 h):

> "Theoretically, for a particular dough, every time-temperature combination in any column is at the same state of
> readiness. Therefore, a dough that takes 120 hours at 36F to be ready will also be ready in 11 hours at 64F."
> … "if we make a dough that will be ready in 35 hours at 64F, with 11 hours remaining, we can move it to the fridge
> at 36F for the last 120 hours and get to the same place (theoretically)."

and on tempering:

> "I am ignoring the tempering time as not much is going to happen during the two hours to room temp after 120 hours
> in the fridge."

and on validated range (Reply #275):

> "From 60-76F, and from 24-48 hours, it's been spot on for me. The further from that you get the less I can attest to it."

This is exactly the additive-equivalent-hours scheme the engine needs: **fermentation progress is additive in
"fraction of the way to ready", and the exchange rate between temperatures is the rate ratio.**

### 2.3 The published TXCraig1 chart, recovered numerically (S1)

BeanAnimal's calculator fits equations to Craig's published chart. I drove it programmatically (IDY, single stage,
solve for hours to full rise) and recovered total hours-to-ready at fixed yeast:

| Temp | 0.201 % IDY | 0.05 % IDY | 0.01 % IDY |
|---|---|---|---|
| 36 °F / 2.2 °C | 85 h | 232 h | — |
| 41 °F / 5 °C | 50 h | 139 h | — |
| 45 °F / 7.2 °C | — | 95 h | — |
| 50 °F / 10 °C | 22 h | 62 h | — |
| 55 °F / 12.8 °C | — | 41 h | — |
| 59 °F / 15 °C | 11 h | 30 h | — |
| 64 °F / 17.8 °C | — | 21 h | 69 h |
| 68 °F / 20 °C | 6 h | 16 h | 52 h |
| 72 °F / 22.2 °C | — | 11 h | 36 h |
| 77 °F / 25 °C | 3 h | 7 h | 24 h |
| 82 °F / 27.8 °C | — | 5 h | 16 h |
| 86 °F / 30 °C | 2 h | 4 h | 12 h |
| 90 °F / 32 °C | model returns nonsense | nonsense | — |

Relative rate (= 1/hours, normalised at 25 °C), 0.05 % column: 2.2 °C **0.030**, 5 °C **0.050**, 7.2 °C 0.074,
10 °C **0.113**, 12.8 °C 0.171, 15 °C **0.233**, 17.8 °C 0.333, 20 °C **0.438**, 22.2 °C 0.64, 25 °C 1.00,
27.8 °C 1.40, 30 °C **1.75**. The 0.01 % column agrees (20 °C 0.46, 30 °C 2.0).
**The published chart is steeper than the raw parameters in §2.1** — effective Q10 ≈ 4 (doubling every ~5 °C) across
10–30 °C, and only ~5 % of 25 °C rate at 5 °C rather than 7.7 %. The calculator/chart also **stops working above
~88 °F (31 °C)** — a hard modelling limit worth respecting.

### 2.4 Textbook gas-production data at the hot end — Pyler via P2

> Table 5 … "Maximum Gas Production Rate: In Millimoles CO₂/hr/g/Dry Yeast Solids" (liquid ferments)
>
> | °C | °F | max gas rate | time to max rate (min) |
> |---|---|---|---|
> | 29 | 84 | 20 | 150 |
> | 31 | 88 | 23 | 135 |
> | 33 | 91 | 24.5 | 135 |
> | 36 | 96 | 25 | 120 |
> | 38 | 100 | 26 | 90 |
> | 40 | 104 | 22.5 | 75 |
> | 42 | 108 | 20 | 30 |

and Table 4:

> | −20 °C (−4 °F) | Loss of Fermentation Capacity |
> | < 20 °C (68 °F) > 40 °C (104 °F) | Growth Rate Significantly Reduced |
> | 20–27 °C (68–81 °F) | Most Favorable Range For Yeast to Multiply |
> | 26 °C (79 °F) | Optimum multiplication of Yeast Achieved |
> | 27–38 °C (81–100 °F) | Optimum Fermentation Range |
> | 35 °C (95 °F) | Optimum Fermentation Temperature |
> | > 60 °C (140 °F) | Yeast cells Die |

> "the fermentation rate increases with a rise in temperature up to a maximum of perhaps 100 to 105 F (38 to 41 C)…
> Once the dough or ferment temperature exceeds about 105 °F (41 C), the fermentation rate declines."

Key structural point: **the peak is broad and flat.** Pyler's rate only rises 20 → 26 mmol (+30 %) between 29 and
38 °C. B16 measures the same flatness in dough: between 30 and 33 °C the end-of-fermentation CO₂ differs by ≤6 ppm.
So **there is essentially nothing to gain from fermenting above ~30 °C, and much to lose.**

### 2.5 The cold end — how slow is a fridge, really? (biggest disagreement in the literature)

| Source | Claim | Implied rate at ~4 °C vs 25 °C |
|---|---|---|
| §2.1 model (P1) | computed | **6.6 %** |
| §2.3 published chart (S1) | 139 h @5 °C vs 7 h @25 °C | **5 %** |
| B1 (Modernist Bread multipliers) | 36–40 °F = 10× the 76 °F time | **10 %** |
| B3 (bakersmath) | "roughly 10–15× slower than room temperature" | 7–10 % |
| B13 (JayArr) | "at 4C/39F, yeast drops to roughly 10 % of its room-temperature activity. But enzymes … retain 40–50 %" | 10 % |
| B12 (scienceinsights, uncited) | "At 41 °F the growth rate is roughly 50× slower than at its peak near 88 °F" | **2 %** |
| B6 (Figoni) | "Yeast is dormant at 32–34 °F (0–1 °C)"; "begins to be quite active starting at about 50 °F (10 °C)" | qualitative |
| S3 (PizzaBlab) | "At standard refrigeration temperatures (1–5 °C / 34–40 °F), yeast and enzyme activity slows down significantly but **does not stop**" | qualitative |
| P3 (Lehmann) | "keep the dough at a temperature slightly below 45F, but do not allow it to drop to freezing (32F)"; "Typically this temperature is about 40F +/- 2F" | qualitative |

**Nobody credible says yeast stops at 4 °C.** The practical spread is 3–10 % of 25 °C rate; the pizza-specific
sources cluster at **5 %**. Note the strong temperature sensitivity *within* the fridge range: the model gives
0.049 at 2 °C, 0.066 at 4 °C, 0.089 at 6 °C, 0.119 at 8 °C — i.e. **a fridge drifting from 4 °C to 7–8 °C nearly
doubles the fermentation rate**, which is exactly the failure mode the handoff notes as "Above 7–8 °C … overproofing risk."

### 2.6 The competing rules of thumb (a genuine 2× disagreement)

| Rule | Source | Doubling interval | Implied Q10 |
|---|---|---|---|
| "Between 33 F and 100 F, commercial yeast activity will double in speed for every increase in temperature of 18 degrees F (or 10 degrees C)" | S5 (TFL, Maverick), echoed everywhere | 10 °C | 2.0 |
| "biological processes roughly double in rate for every 10 °C increase (the Q10 rule)"; "reliable between 4 °C and 32 °C" | B3 | 10 °C | 2.0 |
| "Yeast activity roughly doubles with every 10 °C increase in temperature (the Q10 rule)." | B4 | 10 °C | 2.0 |
| "a 10°C increase doubles the enzymatic activity in the dough, while a 10°C decrease reduces it by half or more" | S2 (this is about **enzymes**, not yeast) | 10 °C | 2.0 |
| "Fermentation activity roughly doubles for every **5 °C** increase" | B2 | 5 °C | 4.0 |
| "a 1C increase in temperature (in the 20-35C range) accelerates fermentation speed by 8-12%" | B13 | 6–9 °C | 2.6–3.9 |
| TXCraig1 published chart (§2.3) | S1 | ~5 °C in 10–30 °C | ~4 |
| TXCraig1 raw parameters (§2.1) | P1 | 5.6 °C at 15 °C, 6.6 °C at 20 °C | 2.6–3.7 |
| Chemical-kinetics baseline: Ea 42–125 kJ/mol → "reaction rates change by two fold for every 10°C" | B15 | 10 °C | 2.0 |
| Glycolytic flux 6× lower at 12 °C than 30 °C | B15 | ~7 °C | ~3.1 |
| Wine fermentation 2.5× faster at 28 °C than 15 °C | B14 | ~9.8 °C | ~2.05 |

Also frequently repeated and **wrong for our purposes**: "yeast activity doubles for every 18 °F increase … the
fastest fermentation rate is between 90 and 100 F" (S5). Pyler (P2) and the CTMI cardinals put the true peak at
**35–38 °C, and dough-quality collapse well before that.**

I could not find any primary Tom Lehmann statement of a "doubles every 15–17 °F" rule despite multiple targeted
searches (PMQ, Pizza Today, pizzamaking); treat that specific attribution as **unverified**. What Lehmann *does*
say quantitatively is about the **heat of metabolism**:

> "If the dough is too warm it will continue to ferment and also the heat of metabolism will enter into the picture to
> further increase the dough temperature **at a rate of about 1F per hour**" — Lehmann, P3

### 2.7 Optimum for gas ≠ optimum for flavour and dough quality

- **Gas optimum:** 35 °C (Pyler, P2); 34.8 °C (model peak, §2.1); 32.3 °C mean T_opt for *S. cerevisiae* growth
  (Salvadó, P4); "carbon dioxide production rate maxes out at around 90 °F [32 °C]" (Serious Eats/Kenji, via search snippet).
- **Flavour/dough-quality optimum:** 24–26 °C.
  - Hamelman (B7): "the temperature zone that works best, particularly for wheat-based breads, is **75° to 78°F**"
    … "a temperature that encourages good gas production from the yeast (for loaf volume), and at the same time good
    flavor development from the *lactobacilli*."
  - King Arthur (P8): "For wheat-based yeast breads, professionals have determined that the ideal dough temperature
    range is **75-78°F**."
  - PizzaBlab (S4): "Ideally, we aim for an FDT between **23-27°C / 75-80°F**"; for cold fermentation
    "**18–23°C (65–75°F)**"; and RT fermentation window "**15–30°C (59–86°F)**", emergency dough up to "about 35°C/95°F".
  - Figoni (B6): "Optimum fermentation is often given as **78°–82°F (25°–28°C)**"; "At higher temperatures than
    optimal (85°–100°F/30°–38°C), fermentation is fast" (with quality penalty).
  - AVPN (P7): proofing chambers "ideal parameters **18/20 °C temperature and 60/70% humidity**"; total fermentation
    "min 12 - max 24 hours"; yeast "Fresh brewer's yeast **0.1-3 g**" per litre of water (i.e. 0.006–0.19 % of flour
    fresh ⇒ ~0.002–0.06 % IDY), "based on temperature, humidity and timing"; ball weight 200 g (22–24 cm) to 280 g (28–35 cm).

### 2.8 What actually goes wrong above ~30 °C

1. **Protease/gluten degradation outruns gas production.** SteveB (breadcetera) in S6: "temperature has a direct
   effect on enzyme (amylase, protease, etc.) activity. That's one of the reasons why firm starters tend to become
   'gloppy' quicker at higher temperatures; **the increased protease activity degrades the gluten faster**."
   B4 states it numerically: "**Above 28–30 °C (82–86 °F), protease activity increases rapidly enough to start
   weakening gluten faster than fermentation can compensate**." S4: "Higher fermentation temperature → higher
   protease activity → more gluten breakdown."
2. **Yeast glutathione weakens the gluten chemically.** Search-surfaced literature (Verheyen/Jekle/Becker line of
   work; pubmed 25466019): reduced glutathione released by yeast cleaves disulfide bonds; "during 3h fermentation the
   weakening coefficient increased from 0.3% to 20.4%" at yeast-equivalent GSH levels.
3. **Off-flavours.** Kenji (Serious Eats, via snippet): "Though yeast produces carbon dioxide rapidly at high
   temperatures, it also produces undesirable flavors." Andy in S5: "the dough will begin to develop a quite
   unpleasant flavour profile if subjected to these high temperatures during any phase of proof"; and "this is not
   possible if the temperature gets much beyond 30 °C" (structure development). King Arthur's own experiment (P8):
   the 94 °F dough loaf "has a **bitter, acidic flavor**" and collapsed/wrinkled.
4. **Acid degrades browning and dough strength.** Lehmann, P3: "excessive acid production by the yeast which can then
   **degrade the flour proteins (gluten)** during the refrigerated holding period resulting in anything from less than
   stellar dough performance, to collapse or difficulty developing the desired finished crust color due to the acidity
   of the dough blocking the browning reaction."
5. **Practitioner confirmation of slack/sticky at heat**, S5: at 90 °F+ house temperature "dough would proof
   incredibly fast. This would cause a **loose, moist dough that didn't always hold its shape**."
6. Flavour chemistry direction: warmer favours **lactic** (mild, creamy), cooler favours **acetic** (sharp) — B4 and
   the Hamelman-thread consensus. Note this is the *opposite* of the folk claim that hot dough tastes "vinegary";
   the sour off-note from hot dough is mostly ethanol/boozy plus over-acidified, not acetic dominance.

### 2.9 DDT and friction factor

**Formula (King Arthur, P8):**

> "multiply the DDT by 3 (the number of variable temperatures other than water temperature … room, flour, friction)…
> Note: If you bake with an overnight starter or pre-ferment, multiply your DDT by 4 instead of 3, and include the
> temperature of the pre-ferment as another factor to subtract."
>
> Worked: 78 × 3 = 234; 234 − 72 (room) − 71 (flour) − 22 (FF) = **69 °F water**.

PizzaBlab states the same in symbols (S4): `WT = (FDT × 3) − FT − RT − FF`, and with preferment
`WT = (FDT × 4) − FT − RT − FF − PT`.

**Friction factor — sources disagree by a factor of 5:**

| Source | Mixer | FF |
|---|---|---|
| King Arthur (P8) — *measured* | 7-qt KitchenAid, dough hook, "stir" 3 min + speed 2 for 4 min | **22–24 °F (12–13 °C)** |
| Hamelman via King Arthur (P8) | "most mixers" (3 min speed 1 + 4 min speed 2) | 24–28 °F (13–16 °C) |
| KA bakery baker (P8) | first-time mixes | 20–25 °F |
| King Arthur (P8) | hand kneading, 8 min | 6–8 °F (3–4 °C); "many bakers go with 0–4 °F" |
| Flourwise (B9) | KitchenAid 7-qt | 22–24 °F (12–13 °C); spiral ~14 °F; commercial ≥30 °F |
| Wordloaf (B11) | stand mixer, medium speed | 25 °F; hand 5 °F; food processor 30 °F |
| Starreveld (B8) | "a typical KitchenAid stand mixer" | **40 °F (22 °C)** — big outlier |
| The Dough Formula (B10) | stand mixer stiff lean dough | **6–8 °F (3–4 °C)** — big outlier the other way |

Resolution: the 22–25 °F (12–14 °C) cluster comes from people who actually measured; **use ~12–13 °C as the default
for a KitchenAid at low speed for ~7 min, and scale up for longer kneads** (Dawood kneads 12–17 min on speed 1–2 →
expect more, and this must be calibrated empirically — see §4).

**DDT targets:** King Arthur/Hamelman 75–78 °F (24–26 °C); PizzaBlab 23–27 °C for RT ferment, **18–23 °C when the
dough goes to the fridge**, 10–15 °C if freezing; Flourwise "Pizza Dough 24–26 °C"; Lehmann for home cold-ferment
(P3): "**70 to 75F** for just a couple of dough balls or **65 to 70F** if there will be more than three dough balls
or the dough balls weigh 16-ounces or more."

### 2.10 Thermal lag — cooling into the fridge

Measured/asserted data:

- **The Sourdough Journey (B5)** — staged cooling of a shaped ~1 kg dough entering the fridge at 80 °F/27 °C:
  80→70 °F "about 60 minutes"; 70→50 °F "approximately 3 hours"; 50→42 °F "approximately 3 hours"; 42→37 °F
  "another 6-8 hours". **Total ≈ 12 h to 37 °F/3 °C**; and "it takes about **8-10 hours** for your dough temperature
  to reach refrigerator temperature. Once it reaches your refrigerator temperature, the fermentation process
  dramatically slows down."
- **PizzaBlab (S3)** — the cleanest bulk-vs-ball comparison, 24 h total at 4 °C:
  > "The dough fermented using the Lehmann method is immediately placed in the fridge after kneading and dividing into
  > balls. Out of the 24 hours in the fridge, **each ball will have an internal temperature of 4C/40F for 20 hours**."
  > "The dough fermented using the hybrid method goes into the fridge as a single mass (bulk) after one hour of
  > fermentation at room temperature. Out of the 24 hours in the fridge, **the internal temperature of the dough will be
  > 4C/40F for only 5 hours**. During the remaining 14 hours, it will actually ferment at a higher temperature."
  ⇒ **~4 h for a ~250–300 g ball; ~19 h for a ~1.5–2 kg bulk mass.**
  Also: "When a large mass of dough is placed in the fridge, it can take **up to 12 hours or more** for the interior to
  reach the fridge's actual temperature"; and "allow the dough to cool down in the fridge until it reaches an internal
  temperature of at least **10 °C/50 °F before closing or sealing the container** … approximately **one to two hours**."
- **Lehmann (P3)**: "The idea is to try to get the dough temperature **down to 50F in 2.5-hours** for up to 3-days
  refrigerated storage time or **45F for up to 5 to 7-days** storage time." And commercial practice (S9): dough boxes
  cross-stacked "until the internal dough ball temperature reaches **50°F to 55°F**"; ≤16 oz balls "at least two hours",
  17–24 oz "at least 2½ hours".
- Contradiction worth noting: Lehmann says balls should hit 50 °F in 2.5 h in a *commercial* cooler with cross-stacked
  air flow; a home fridge stacked in a covered container will be slower.

### 2.11 Thermal lag — warm-up out of the fridge

- **Lehmann (S9)**: "measure the internal temperature of the dough as soon as you remove it from the cooler—it will
  usually be at **40°F or lower**. I recommend allowing the dough balls to warm to an internal temperature of **50°F**
  before opening them into skins; this will give you a **usable window of 2.5 to 3 hours**." He explicitly refuses to
  give a time and tells you to measure it once for your own shop.
- **PizzaBlab (S3)**: "Let the balls rest at room temperature until their internal temperature reaches at least
  10°C / 50°F. This usually takes **30 minutes to 3 hours**." Elsewhere: usable window "1–3 hours" after removal.
- **Low-credibility but specific** (lifetips/alibaba rewrite of the Pizza Lab): "typically **1.5–2 hours for a 250 g
  ball at 72 °F room temp**" to reach 50 °F core; and "Dough entering the fridge at 78°F requires **~8 hours** to
  equilibrate to 38°F." Treat as indicative only — that page also contains an obviously fabricated claim
  ("Every 2°F increase above 38°F doubles yeast metabolic rate per Arrhenius equation") that is wrong by a factor of ~5.
- **Handoff / prior session** for Islamabad: cold balls need a **minimum 2 h, realistically 3–4 h** at room temperature
  before shaping. That is consistent with the physics: at 28–30 °C room, a 280 g ball needs ~1 h to reach ~17 °C but
  ~3 h to reach ~26 °C.

### 2.12 Newton-cooling model and the equivalent-hours cost of the lag (my computation)

Lumped-capacitance: `T(t) = T_env + (T₀ − T_env)·e^(−t/τ)`. Fitting τ to the data above:

| Body | τ (time constant) | Time to be "at fridge temp" (≈3τ) | Source anchor |
|---|---|---|---|
| 250–300 g ball, spaced on an oiled tray, loosely covered, domestic fridge | **≈ 1.3–1.5 h** | ~4–4.5 h | S3 ("4 °C for 20 of 24 h") |
| 250–300 g balls, in a sealed stacked plastic box | ≈ 2.5–3 h | ~8 h | S3 + Lehmann cross-stack rationale |
| 1.5–1.8 kg bulk mass in a covered bowl | **≈ 4.5–5 h** | ~14–15 h | S3 ("4 °C for only 5 of 24 h"), B5 (~12 h) |
| 280 g ball warming on the counter | ≈ 1.5 h (same body, air-side limited) | — | S3, Lehmann |

Integrating the §2.1 rate curve over that cooling trajectory (τ = 1.5 h, dough in at 26 °C, fridge 5 °C) gives the
**25 °C-equivalent hours accumulated during the lag**:

| Elapsed in fridge | 280 g ball (τ=1.5 h) | if it were instantly cold | 1.6 kg bulk (τ=4.5 h) |
|---|---|---|---|
| 1 h | 0.63 eq-h | 0.08 | — |
| 2 h | 0.87 | 0.15 | 1.48 |
| 4 h | 1.12 | 0.31 | 2.21 |
| 8 h | 1.45 | 0.61 | 2.91 |
| 12 h | 1.75 | 0.92 | 3.34 |
| 16 h | — | — | 3.70 |

**Read this as: putting a 26 °C dough into the fridge "costs" about 1 extra 25 °C-equivalent hour for balls and about
2.5–3 extra equivalent hours for a bulk mass, entirely in the first few hours.** For a 24 h cold ferment at 5 °C the
"cold" part contributes only ~1.2 eq-h, so **the lag can be the majority of the total fermentation** — this is the
single most important thing the engine must model, and it is exactly why Dawood's split/bulk-cold-ferment schedule
(handoff arrangement C) overproofs more than expected.

Warm-up equivalent hours (ball out of a 5 °C fridge):

| Time out | core T at 30 °C room | eq-h accrued | core T at 24 °C room | eq-h accrued |
|---|---|---|---|---|
| 1 h | 17.2 °C | 0.22 | 14.2 °C | 0.17 |
| 2 h | 23.4 °C | 0.86 | 19.0 °C | 0.57 |
| 3 h | 26.6 °C | 1.94 | 21.4 °C | 1.22 |
| 4 h | 28.3 °C | 3.20 | 22.7 °C | 1.96 |

Craig's "ignore the 2-hour temper" is defensible at 24 °C (0.57 eq-h) but **not in an Islamabad summer**: 3–3.5 h of
counter proof at 30 °C is 2–2.6 equivalent hours, i.e. a third of a whole same-day schedule.

### 2.13 How the well-known calculators model temperature

- **PizzaBlab** (S2, guide page): "PizzaBlab's pizza dough calculator utilizes **a predictive model of yeast activity
  developed by TXCraig1** from pizzamaking.com, and has been refined through extensive trial and error." Formula is
  server-side (I confirmed: the page POSTs the form to the server; no client-side equation). Default fridge choice
  "opt for 4C/39F". Explicitly declines to model hybrid RT+fridge schedules: "you're essentially using hybrid
  fermentation, so **it's impossible to provide an accurate answer** … start with the amount of yeast the calculator
  suggests [for room temperature fermentation], do some test batches."
- **dough.school "Pizza AI"**: same lineage claim (TXCraig1 model, refined). Publishes only examples: "for a 24-hour
  cold ferment at 4 °C, use about **0.1 % instant dry yeast**"; "for same-day dough (4-6 hours at room temperature),
  use **0.5-1 % yeast**". No formula.
- **BeanAnimal** (S1): "I took the Baker's Yeast Quantity Prediction Model chart that Craig published and charted each
  temperature and concentration relationship (time in hours). I then accurately fitted an equation to each curve …
  Please don't ask, they are not available or for sale." Multi-stage chaining "using the same logic that Craig describes".
- **PizzApp+**: closed; marketing says "based on scientific fermentation curves — converted into formulas".
- **BakersMath** (B3): the only calculator that publishes its model — **plain Q10 = 2**, "reliable between 4 °C and
  32 °C", with dough-type K-constants (lean/enriched/pizza/sourdough) and "enriched ferments ~20–30 % slower".
- **sourdoughhydration** (B1): publishes a **lookup table of multipliers** attributed to *Modernist Bread* vol. 3,
  baseline 76 °F = 1.0: 36–40 °F **10.0×**, 58–62 °F 2.5×, 63–67 °F 1.5×, 68–72 °F 1.2×, 73–77 °F 1.0×,
  78–82 °F 0.75×, 83–87 °F 0.55×, 88–95 °F 0.42×, with "every 10 °F drop roughly doubles fermentation time".
  Converted to relative rate at 24.4 °C = 1.0: 3.3 °C 0.10, 16.7 °C 0.40, 20 °C 0.67, 21.7 °C 0.83, 27.8 °C 1.33,
  30.6 °C 1.82, 33.9 °C 2.38. **This table is flatter at the cold end and steeper at the hot end than TXCraig1's**,
  and its 88–95 °F value (2.4× at ~34 °C) is the most aggressive high-temperature claim of any source here.

---

## 3. Contradictions between sources and how to resolve them

1. **Q10 = 2 (doubling per 10 °C) vs doubling per 5–6 °C.**
   The Q10 = 2 rule is a *chemistry* rule of thumb (B15: activation energies 42–125 kJ/mol) and is what the
   general-purpose bread sources repeat. The pizza-specific, dough-calibrated sources (TXCraig1 chart, Weekend Bakery,
   JayArr's 8–12 %/°C) all land near **doubling per 5–7 °C in the 10–30 °C band**. Both can be true: yeast *growth*
   in the exponential phase compounds, so time-to-a-given-dough-state falls faster than the instantaneous metabolic
   rate rises. Since the engine predicts **time to dough readiness**, not instantaneous CO₂ flux, the steeper curve is
   the correct one. **Resolution: use the empirical dough-readiness curve (Q10 ≈ 3–4 in the working band), not Q10 = 2.**
   Flag: below ~10 °C and above ~30 °C the two families converge again.

2. **Where is the peak — 30 °C, 35 °C, or 38 °C?**
   Salvadó (P4) T_opt 32.3 °C for growth; Pyler (P2) max gas at 38 °C in liquid ferment, "optimum fermentation
   temperature 35 °C"; TXCraig1's parameters peak at 34.8 °C; Modernist multipliers still accelerating at 34 °C;
   Kenji says CO₂ maxes at 32 °C. **Resolution: put the peak at 34–35 °C but treat 30–38 °C as a flat plateau
   (P2 and B16 both show ≤30 % variation across it). The engine should never recommend fermenting there anyway**
   (§2.8), so precision there is unimportant — clamp instead.

3. **Fridge rate: 2 %, 5 %, or 10 % of 25 °C?**
   The 2 % figure (B12) is uncited and inconsistent with everything else; the 10 % figures (B1, B3, B13) are
   round-number rules; the two independent TXCraig1 renderings give 5–6.6 %. **Resolution: 5 % at 4 °C, with a
   fridge-temperature-sensitive curve** (not a single constant), because 4 °C vs 7 °C is a factor ~1.8 and Dawood's
   fridge drifts.

4. **Friction factor for a KitchenAid: 3–4 °C, 12–13 °C, or 22 °C?**
   King Arthur *measured* 22–24 °F on a 7-qt KitchenAid with a defined 7-minute programme, and Hamelman independently
   gives 24–28 °F for the same programme. Starreveld's 40 °F and The Dough Formula's 6–8 °F have no stated method.
   **Resolution: default 12–13 °C (22–24 °F) for a ~7-minute low-speed knead, and make FF a user-calibrated field**;
   the whole point of the DDT formula collapses if FF is wrong, and Dawood's knead is roughly twice as long.

5. **Does the tempering/warm-up period matter?**
   TXCraig1 says ignore it (at ~21–24 °C rooms). PizzaBlab says the working window is 1–3 h and doesn't count it.
   Lehmann says the dough is usable for 2.5–3 h after reaching 50 °F. At Islamabad's 28–34 °C, §2.12 shows it is worth
   2–3 equivalent hours. **Resolution: the engine must integrate the warm-up, not ignore it — this is a genuine
   climate-specific correction the published calculators get wrong for Pakistan.**

6. **Cooling lag: 4 h, 8 h, or 12 h?**
   All three are right for different masses. Balls ≈ 4 h, sealed stacked balls ≈ 8 h, bulk ≈ 12–19 h.
   **Resolution: make lag a function of the dough geometry the user chose (bulk vs balls) — this is the biggest
   single lever in the app and the reason "ball first, then fridge" (Lehmann method) is far more predictable than
   "bulk in the fridge".**

7. **Optimum flavour temperature 24–26 °C vs AVPN's proofing chambers at 18–20 °C.**
   Not really a contradiction: AVPN's 18–20 °C is a *storage/second-fermentation* temperature chosen to stretch a
   12–24 h window in a working pizzeria, whereas 24–26 °C is a *mixing/bulk* target. Both are far below the gas optimum.

8. **"Yeast activity doubles for every 15–17 °F" attributed to Tom Lehmann.**
   Could not verify in any Lehmann source (PMQ, Pizza Today, pizzamaking). The verifiable 18 °F/10 °C version comes
   from a TFL forum post (S5). **Do not cite Lehmann for this.**

---

## 4. Recommendations for the deterministic engine

### 4.1 The rate curve to ship (normalised to 25 °C = 1.00)

Best-supported blend of the TXCraig1 published chart (§2.3, weighted highest — it is calibrated on real pizza dough
and is what PizzaBlab/dough.school ship) and the raw model parameters (§2.1), with the peak from Pyler/Salvadó:

| T (°C) | relative rate `r(T)` | T (°C) | relative rate `r(T)` |
|---|---|---|---|
| ≤0 | 0.02 | 24 | 0.88 |
| 2 | 0.030 | **25** | **1.00** |
| 3 | 0.037 | 26 | 1.13 |
| **4** | **0.045** | 27 | 1.24 |
| 5 | 0.055 | 28 | 1.35 |
| 6 | 0.065 | 29 | 1.48 |
| 7 | 0.077 | 30 | 1.60 |
| 8 | 0.090 | 31 | 1.68 |
| 10 | 0.120 | 32 | 1.75 |
| 12 | 0.160 | 34 | 1.83 |
| 14 | 0.215 | 35 | 1.85 (peak) |
| 15 | 0.250 | 36 | 1.83 |
| 16 | 0.29 | 38 | 1.60 |
| 18 | 0.40 | 40 | 1.20 |
| 20 | 0.50 | 42 | 0.60 |
| 22 | 0.68 | 45 | 0 |

Implementation options, in order of preference:
1. **Ship this table and interpolate linearly** (or monotone-cubic) between rows. Simple, auditable, no surprises.
2. Equivalent closed form for 0–32 °C: `r(T) = 2^((T − 25)/6.0)` reproduces the table to within ±8 % between 8 °C
   and 30 °C (i.e. **Q10 ≈ 3.2, doubling every 6 °C**) — but it diverges badly below 6 °C and above 32 °C, so clamp:
   use the table below 8 °C and above 30 °C.
3. Do **not** ship plain Q10 = 2; it will under-predict how fast a 30 °C Islamabad kitchen ferments and over-predict
   fridge activity.

### 4.2 The equivalent-hours algorithm

```
EQ(t0→t1) = ∫ r(T(t)) dt          integrate in 5–10 minute steps
```
- Define one target `EQ_ready` (25 °C-equivalent hours to "ready") per yeast dose; TXCraig1's chart says
  **0.05 % IDY ≈ 7 eq-h, 0.201 % IDY ≈ 3 eq-h, 0.01 % IDY ≈ 24 eq-h** at 25 °C (§2.3). Least-squares fit of
  log(eq-h) on log(yeast %) through those three points gives **`EQ_ready ≈ 0.944 · (IDY%)^(−0.695)`**
  (reproduces 3 / 7 / 24 h as 2.88 / 7.57 / 23.15 — within 8 %).
  Invert to solve for yeast given the schedule: **`IDY% = (0.944 / EQ_total)^(1/0.695) = (0.944 / EQ_total)^1.439`**.
  Worked check: EQ_total 4 eq-h → 0.125 % IDY; 7 eq-h → 0.053 % IDY; 12 eq-h → 0.026 % IDY; 30 eq-h → 0.0069 % IDY.
- Sum stages additively (Craig's own method, §2.2). Never model a stage as "hours" alone.
- **Always** include the cooling ramp and the warm-up ramp as stages (§4.4), not as instant temperature steps.
- Clamp T into [0 °C, 32 °C] for prediction purposes and warn above 30 °C; the underlying models are unvalidated
  above ~31 °C (BeanAnimal literally returns garbage above 88 °F).

### 4.3 DDT / water temperature

- Formula with the poolish (4 factors): **`WaterT = 4 × DDT − FlourT − RoomT − PoolishT − FF`**
  Without a preferment: `WaterT = 3 × DDT − FlourT − RoomT − FF`.
- **DDT targets for this project:**
  - Same-day room-temperature schedule: **DDT 23–24 °C** (below the 24–26 °C standard, because the room is 28–34 °C
    and the dough will only get warmer — Lehmann's heat of metabolism adds ~0.5 °C/h, P3).
  - Anything going to the fridge: **DDT 18–20 °C** (PizzaBlab S4: 18–23 °C for cold fermentation; lower = faster
    cooling = less uncontrolled lag fermentation).
  - Never let FDT exceed 26 °C with this weak flour.
- **Friction factor default: 13 °C (23 °F)** for the KitchenAid at speed 1–2 for ~7 min; **add ~1 °C per extra
  2 minutes of kneading** → for Dawood's 12–17 min total, start at **15–17 °C** and calibrate.
  Provide a one-time calibration flow: `FF = 4 × measuredFDT − FlourT − RoomT − PoolishT − WaterT_used`.
- In Islamabad summer the formula will often demand water below 0 °C. Handle it: cap water at 1 °C and tell the user to
  (a) chill the flour, (b) freeze the bowl and hook 20 min, (c) substitute ice for part of the water by weight
  (≈ 1 g ice per 1 g water replaces ~80 cal/g of cooling — as a practical rule, replacing 20 % of the water with ice
  drops FDT by roughly 4 °C), (d) shorten the knead and use the rest-and-fold cycles from the handoff instead.
- Warn when `RoomT > 30 °C`: hitting DDT is not achievable by water alone.

### 4.4 Thermal-lag constants to hard-code

| Situation | Model | τ | Notes |
|---|---|---|---|
| 250–300 g balls, spaced, oiled tray, loosely covered, into fridge | `T(t)=T_fridge+(FDT−T_fridge)e^(−t/τ)` | **1.5 h** | reaches within 1 °C of fridge in ~4.5 h; matches S3's "4 °C for 20 of 24 h" |
| Same balls but in a sealed, stacked container | | **2.75 h** | ~8 h to fridge temp |
| 1.5–1.8 kg bulk mass in a covered bowl | | **4.5 h** | ~14 h to fridge temp; matches B5 (~12 h) and S3 ("only 5 of 24 h at 4 °C") |
| Poolish, 500 g in a bowl | | **2.0 h** | thin, high water content, large surface |
| Ball warming on the counter | `T(t)=T_room+(T_fridge−T_room)e^(−t/τ)` | **1.5 h** | at 30 °C room: 17 °C @1 h, 23 °C @2 h, 27 °C @3 h |
| Heat of metabolism (dough self-heating, warm dough only) | +0.5 °C/h above 20 °C, cap +2 °C | — | Lehmann's "about 1F per hour" (P3) |

Precomputed equivalent hours for the standard cases (§2.12) — useful as sanity checks / unit tests:
- 280 g ball at 26 °C into a 5 °C fridge: **≈1.1 eq-h in the first 4 h**, ≈1.75 eq-h over 12 h.
- 1.6 kg bulk at 26 °C into a 5 °C fridge: **≈2.2 eq-h in the first 4 h**, ≈3.3 eq-h over 12 h.
- 280 g ball out of a 5 °C fridge into a 30 °C kitchen: 0.22 eq-h @1 h, 0.86 @2 h, **1.94 @3 h**, 3.20 @4 h.
- Same into a 24 °C kitchen: 0.17 / 0.57 / 1.22 / 1.96 eq-h.

### 4.5 Guardrails the engine should enforce (climate + weak-flour specific)

- **Hard cap the planned fermentation temperature at 30 °C**, and show a warning above 28 °C: protease + glutathione
  weaken gluten faster than fermentation compensates (B4, S6, pubmed 25466019). With maida this is worse, not better.
- **Weak-flour correction.** Every number above was derived on strong bread/00 flour. For 80 % maida + 20 % fine atta
  (est. 9–10.5 % protein, no W): the *rate* curve is unchanged (it is yeast biology), but the **tolerance window is
  narrower**. Concretely:
  - Target **10–20 % fewer total equivalent hours** than a 00-flour recipe would use for the same schedule shape;
    i.e. aim for the *early* side of "ready" (Craig's 1¼″ seed rise, a doubling, not a tripling).
  - Weight the schedule toward the **cold** part: at ≤6 °C, protease and glutathione damage accumulate far more
    slowly than the gas does, so cold hours buy flavour with less structural cost. Prefer 16–24 h at 4–5 °C over
    the equivalent 5–6 h at 30 °C.
  - Above 28 °C, apply an explicit **degradation penalty** rather than just counting eq-hours: subtract ~10 % from the
    usable window per °C above 28 °C, or simply refuse to schedule more than ~3 h of ball proof above 30 °C.
  - The 20 % chakki atta adds bran (mechanical gluten disruption) and extra enzyme activity; treat the blend as ~5 %
    faster-degrading than pure maida at the same temperature.
- **Fridge temperature must be an input, not an assumption.** 4 °C → 0.045; 6 °C → 0.065; 8 °C → 0.090.
  A 24 h retard at 8 °C is ~2× the fermentation of one at 4 °C. Ask the user, default 5 °C, and warn that Pakistani
  home fridges drift to 7–8 °C in summer and near the door.
- **Ball, don't bulk, before the fridge** when the schedule has any cold stage: it removes ~2–3 uncontrolled
  equivalent hours (§4.4) and is why the Lehmann method is more repeatable (S3). This directly answers the handoff's
  open question "bulk ferment vs ball ferment".
- **Leftover dough balls** (from the brief): once the balls are cold and the core is at fridge temperature, they
  accumulate only ~0.045 eq-h per hour at 4 °C — so a 24 h extension costs ~1.1 eq-h, roughly one-seventh of a
  0.05 %-IDY schedule. That is why the handoff's "balled dough holds another 18–24 h in the fridge" is right. Beyond
  ~48 h with weak maida, switch to the freezer: freezing at −18 °C stops fermentation (rate 0) but kills 10–20 % of
  yeast viability per freeze; the engine should add ~15 % yeast for any dough intended to be frozen, and schedule
  thawing as **overnight in the fridge (adds ~0.5 eq-h) followed by 3–4 h at room temperature.**
- **The poolish stage uses the same curve**, but note it is 100 % hydration, unsalted, and honey-fed: it ferments
  markedly faster than the final dough at the same temperature. Empirical anchor from the handoff (works in practice):
  5 g IDY / 250 g flour, 1.5–2 h at ~28 °C then 16–20 h at 4–5 °C = ripe. Rather than modelling the poolish with the
  dough curve and a fudge factor, use a **separate "poolish-ready" target of ~2.5–3.0 eq-h** and the same r(T) curve;
  that reproduces the handoff's three validated poolish timings (7 g / 2–3 h at 25 °C; 5 g / 1.5–2 h RT + 16–20 h
  fridge; 3 g / 1.5 h + 20–24 h fridge) within about ±20 %.
- Show the user the **peak-and-decline** shape somewhere: it is the single most counter-intuitive fact (hotter is not
  always faster, and 40 °C is *slower* than 30 °C).

### 4.6 Sanity-check anchors (use as unit tests)

| Scenario | Expected | Source |
|---|---|---|
| 0.1 % IDY, 24 h at 4 °C, cold ferment | "about right" | dough.school |
| 0.5–1 % IDY, 4–6 h at room temperature (~22–24 °C) | "about right" | dough.school |
| 0.2 % IDY, 3 h at 24 °C | "about right" | PizzaBlab S4 |
| 0.1 % IDY, 5 h at 24 °C | "about right" | PizzaBlab S4 |
| 0.05 % IDY, 7 h at 25 °C = full rise | model baseline | S1/P1 |
| 0.05 % IDY, 139 h at 5 °C = full rise | model baseline | S1 |
| 280 g balls, 3–3.5 h at 28 °C after a 25 %-poolish build | proofed (Dawood's own validated result) | handoff |

---

## 5. Open questions

1. **The exact published TXCraig1 chart values** (Reply #261/#399/#406) are images I could not OCR; I recovered the
   curve indirectly through BeanAnimal's fit. Worth one more attempt (the chart also encodes the yeast-% axis, which
   would replace my `EQ_ready ≈ 0.944·(IDY%)^−0.695` fit with the real thing).
2. **Is there a published FF for a KitchenAid kneading 12–17 minutes at speed 1–2 with 1.7 kg of dough?** Every
   published FF I found is for ~7-minute mixes with ~1 kg. Dawood must calibrate this himself; one measurement gives
   the app a permanent constant.
3. **Weak-flour fermentation tolerance is entirely qualitative in the literature.** No source quantifies "how many
   fewer hours" a 9–10 % protein flour tolerates versus a 12.5 % W300 flour. My 10–20 % reduction is an inference from
   the protease/glutathione mechanism, not a measurement. Dawood could settle it with one side-by-side (same dough,
   pulled at 100 % and at 130 % of predicted eq-hours).
4. **Fridge mapping.** No data on Pakistani domestic fridge stratification. A cheap probe left on each shelf for 24 h
   would turn the single biggest error source (assumed 4 °C vs actual 7 °C) into a known constant.
5. **Poolish kinetics with honey.** Honey (≈2 % of the poolish flour) provides immediately fermentable sugar; none of
   the models account for it. The "separate poolish target" workaround is a fit to three data points, not a model.
6. **Does the 20 % chakki atta measurably accelerate fermentation?** Whole-grain flours carry more enzymes, ash and
   microflora and usually ferment faster; not quantified anywhere I found for a 20 % blend.
7. **Modernist Bread's actual table** — I only have it secondhand via sourdoughhydration (B1). If Dawood has access to
   vol. 3, verifying the multiplier table would either confirm or unseat the hot-end shape of my recommended curve.
8. **The Lesaffre Saf-instant Red technical data sheet contains no temperature/gassing-power figures** (I extracted the
   full text): only "do not place Saf-instant in direct contact with ice or iced water" and storage rules. If a
   gassing-power spec exists it is in a distributor document I could not reach.
