/* ENGINE-START
   Dough O'Clock — deterministic dough scheduler for maida (80%) + fine chakki atta (20%),
   Saf-Instant yeast, CasaKoa gas oven (floor 380–420°C). Pure functions, no DOM.
   Model (from the research synthesis in research/):
   - Fermentation progress EQ = ∫ r(T) dt in 25°C-equivalent hours; r from TXCraig1's chart (cold /
     direct dough) and a Q10≈2.3 curve for the warm stages of a poolish-leavened dough.
   - Dough core temperature follows Newton cooling (τ 1.5 h for a 280 g ball) toward its surroundings;
     room stages use the night temperature between 22:00 and 07:00.
   - "Ready" = EQ_READY, calibrated once from the validated 3.25 h ball proof at 28°C.
   - Weak-flour degradation clock D = ∫ 2^((T−25)/10) dt; comfort 10, hard limit 14.
   - Plans: E emergency direct dough, S same-day poolish, RT overnight fridge poolish + same-day balls
     (default), COLD overnight poolish + cold-held balls (long leads / hot kitchens).
   ============================================================ */
const ENGINE = (() => {
  const HR = 3600e3, DT = 5 / 60;
  const K = {
    scrap: 1.02, pff: 0.25, oil: 0.03, honey: 0.02, saltDefault: 0.035,
    rCold: [[0,.020],[2,.030],[3,.037],[4,.045],[5,.055],[6,.065],[7,.077],[8,.090],[10,.120],[12,.160],[14,.215],[15,.250],[16,.290],[18,.400],[20,.500],[22,.680],[24,.880],[25,1],[26,1.13],[27,1.24],[28,1.35],[29,1.48],[30,1.60],[31,1.68],[32,1.75],[34,1.83],[35,1.85],[36,1.83],[38,1.60],[40,1.20],[42,0.60]],
    tauBall: 1.5, tauBulk: 4.5, D_COMFORT: 10, D_HARD: 14,
    mixH: 0.6, restBallH: 0.6, stretchH: 0.25, restE: 0.35, ovenH: 35 / 60,
    FF: 17, craigA: 0.944, craigB: 0.695,
    yeastFactor: { idy: 1, ady: 1.33, fresh: 3 },
    minLead: 2.35,
  };
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const r5 = x => Math.round(x / 5) * 5, r1 = x => Math.round(x), rh = x => Math.round(x * 2) / 2, r01 = x => Math.round(x * 10) / 10, f01 = x => Math.floor(x * 10 + 1e-9) / 10, f005 = x => Math.floor(x * 20 + 1e-9) / 20;
  const add = (d, h) => new Date(d.getTime() + h * HR);
  const hoursBetween = (a, b) => (b - a) / HR;

  // ---------- rate curves ----------
  function rCold(T) {
    if (T < 0) return 0; if (T >= 45) return 0;
    const t = K.rCold; if (T >= 42) return 0.6 * (45 - T) / 3;
    for (let i = 1; i < t.length; i++) if (T <= t[i][0]) { const [x0, y0] = t[i - 1], [x1, y1] = t[i]; return Math.exp(Math.log(y0) + (Math.log(y1) - Math.log(y0)) * (T - x0) / (x1 - x0)); }
    return t[t.length - 1][1];
  }
  function rPd(T) {
    if (T <= 10) return rCold(T);
    if (T >= 18) return Math.pow(2.3, (Math.min(T, 34) - 25) / 10);
    const a = Math.log(0.120), b = Math.log(Math.pow(2.3, (18 - 25) / 10));
    return Math.exp(a + (b - a) * (T - 10) / 8);
  }
  const dRate = T => Math.pow(2, (T - 25) / 10);

  // ---------- integrator ----------
  // stage: {start: Date, hours, env: number|fn(ms)->T, tau: number|null, rate: 'pd'|'cold'|'zero', label}
  function simulate(stages, T0) {
    let T = T0, EQ = 0, D = 0; const marks = [];
    for (const s of stages) {
      if (s.hours <= 0) continue;
      const n = Math.max(1, Math.round(s.hours / DT)), dt = s.hours / n;
      for (let i = 0; i < n; i++) {
        const t = s.start.getTime() + (i + 0.5) * dt * HR;
        const Te = typeof s.env === 'function' ? s.env(t) : s.env;
        T = s.tau == null ? Te : Te + (T - Te) * Math.exp(-dt / s.tau);
        const r = s.rate === 'zero' ? 0 : s.rate === 'cold' ? rCold(T) : rPd(T);
        EQ += r * dt; if (s.rate !== 'zero') D += dRate(T) * dt;
        marks.push([t, EQ]);
      }
    }
    return { EQ, D, T, marks };
  }
  const timeAtEQ = (marks, target) => { for (const [t, e] of marks) if (e >= target) return new Date(t); return null; };
  function bisect(fn, lo, hi, it = 40) { // fn increasing; find x with fn(x)=0
    let flo = fn(lo); if (flo >= 0) return lo; if (fn(hi) <= 0) return hi;
    for (let i = 0; i < it; i++) { const m = (lo + hi) / 2; if (fn(m) < 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }

  // ---------- calibration: EQ_READY from the validated anchor ----------
  const EQ_ANCHOR = (() => {
    const t0 = new Date(2026, 0, 1, 12, 0);
    const st = [
      { start: t0, hours: K.mixH, env: 23, tau: null, rate: 'pd' },
      { start: add(t0, K.mixH), hours: K.restBallH, env: 28, tau: K.tauBall, rate: 'pd' },
      { start: add(t0, K.mixH + K.restBallH), hours: 3.25, env: 28, tau: K.tauBall, rate: 'pd' },
    ];
    return simulate(st, 23).EQ; // ≈ 4.70 (3.5 % salt anchor)
  })();
  const eqReady = salt => EQ_ANCHOR * (1 + 0.06 * (salt * 100 - 3.5));
  const eqReadyDirect = y => K.craigA * Math.pow(y, -K.craigB);
  const yForEQ = EQ => Math.pow(K.craigA / EQ, 1 / K.craigB);

  // ---------- presets ----------
  function poolishPreset(T, sameDay) {
    if (!sameDay) {
      if (T <= 18) return { g: 5, water: 25, warm: 2.5 };
      if (T <= 22) return { g: 5, water: 'room', warm: 2.0 };
      if (T <= 24) return { g: 5, water: 9, warm: 1.75 };
      if (T <= 26) return { g: 4, water: 9, warm: 1.75 };
      if (T <= 29) return { g: 4, water: 9, warm: 1.5 };
      if (T <= 32) return { g: 3, water: 5, warm: 1.5 };
      return { g: 3, water: 5, warm: 1.25 };
    }
    if (T <= 18) return { g: 7, water: 25, warm: 3.5 };
    if (T <= 20) return { g: 7, water: 'room', warm: 3.5 };
    if (T <= 22) return { g: 7, water: 'room', warm: 3.0 };
    if (T <= 24) return { g: 7, water: 9, warm: 3.0 };
    if (T <= 27) return { g: 5, water: 9, warm: 2.5 };
    if (T <= 29) return { g: 5, water: 9, warm: 2.25 };
    if (T <= 32) return { g: 4, water: 5, warm: 2.0 };
    return { g: 4, water: 5, warm: 1.75 };
  }
  const fridgeCaps = Tf => Tf <= 5 ? { Hp: 24, Hb: 30 } : Tf <= 7 ? { Hp: 16, Hb: 24 } : { Hp: 12, Hb: 16 };
  const rewarmH = T => T <= 27 ? 0.5 : T <= 30 ? 0.25 : 0;
  const headStartH = T => T >= 28 ? 0.5 : T >= 22 ? 0.75 : 1.5;
  const tbpCap = T => T <= 18 ? 7 : T <= 20 ? 6 : T <= 24 ? 5 : T <= 29 ? 4 : 3;
  const tEmax = T => T <= 24 ? 4 : T <= 29 ? 3 : 2.25;
  const windowRoomH = T => T <= 27 ? 2 : T <= 30 ? 1.5 : 1;

  // ---------- recipe ----------
  function recipe(inp, plan) {
    const n = inp.pizzas, W = inp.ball, h = inp.hydration / 100, s = inp.salt, o = K.oil;
    const dough = n * W * K.scrap;
    const F = r5(dough / (1 + h + s + o));
    let Fp = plan === 'E' ? 0 : r5(K.pff * F);
    if (plan !== 'E' && Fp < 100) Fp = Math.min(100, r5(0.30 * F));
    return {
      totalDough: dough, totalFlour: F, pff: Fp / F,
      poolish: { flour: Fp, water: Fp, honey: (plan === 'RT' || plan === 'COLD') ? r1(K.honey * Fp) : 0 },
      final: { maida: r5(0.80 * F - Fp), atta: r5(0.20 * F), water: r5(h * F - Fp), salt: rh(s * F), oil: r1(o * F) },
      diameterCm: Math.round(2 * Math.sqrt(W / (0.37 * Math.PI))),
    };
  }
  // main poolish water: cool on purpose in warm kitchens (validated 8–10 °C; Rosada 16 °C) to hold the counter phase
  // back. Safe for the yeast only because the yeast is suspended in 30 g of warm water first (Lehmann: once
  // hydrated it may meet cold water). Lukewarm in cold kitchens so the poolish gets going.
  function poolishWaterTemp(T) {
    return T >= 30 ? 8 : T >= 27 ? 12 : T >= 25 ? 14 : T >= 23 ? 16 : T >= 19 ? Math.round(T) : 25;
  }
  function waterTemp(plan, T, Tf, rewarm, sameDay) {
    const DDT = plan === 'COLD' ? 20 : plan === 'E' ? 26 : (T <= 20 ? 25 : 23);
    let Tpool = sameDay ? T : (rewarm >= 0.5 ? Tf + 7 : rewarm > 0 ? Tf + 4 : Tf + 1);
    const raw = plan === 'E' ? 3 * DDT - T - T - K.FF : 4 * DDT - T - T - Tpool - K.FF;
    const wt = clamp(raw, 1, 40);
    const notes = [];
    if (raw < 1) notes.push(`The maths wants water below freezing: replace 20% of it (by weight) with crushed ice added with the first water, and chill the flour and the bowl 30 min in the fridge. Cold flour drinks slower, so expect the first mix to take a few minutes longer.${plan === 'E' ? ' Suspend the yeast warm first; only then may it meet ice.' : ' Ice is safe here: the yeast is already alive and hydrated in the poolish.'}`);
    if (wt < 8) notes.push('Ice water: melt ice into the water, remove the ice before weighing. Measure the dough after mixing; if it lands more than 2°C off target, the friction factor in the maths is not your mixer\'s and the next batch needs colder or warmer water by that difference.');
    else if (wt > 30) notes.push('Lukewarm water (never above 40°C).');
    return { DDT, wt: Math.round(wt), notes };
  }

  // ---------- environment ----------
  function makeEnv(inp) {
    const T = inp.temp, Tn = inp.nightTemp != null ? inp.nightTemp : (T >= 24 ? Math.max(12, T - 4) : T);
    const isNight = ms => { const h = new Date(ms).getHours(); return h >= 22 || h < 7; };
    const flat = ms => (isNight(ms) ? Tn : T);
    // optional hourly indoor-temperature series [{t: ms, T}] from a weather forecast; interpolated, flat fallback outside its span
    const H = Array.isArray(inp.hourly) && inp.hourly.length > 1 ? inp.hourly : null;
    const room = !H ? flat : (ms) => {
      if (ms <= H[0].t || ms >= H[H.length - 1].t) return flat(ms);
      let lo = 0, hi = H.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (H[m].t <= ms) lo = m; else hi = m; }
      const a = H[lo], b = H[hi]; return a.T + (b.T - a.T) * (ms - a.t) / (b.t - a.t);
    };
    return { T, Tn, room, Tf: inp.fridge, forecast: !!H };
  }
  function inSleep(d, inp) {
    const m = d.getHours() * 60 + d.getMinutes(), a = inp.sleepFrom, b = inp.wakeAt;
    return a > b ? (m >= a || m < b) : (m >= a && m < b);
  }

  // ---------- step factory ----------
  const S = (t, icon, kind, title, dur, detail, look) => ({ t, icon, kind, title, dur: dur || 0, detail: detail || '', look: look || '' });

  // ================= PLAN BUILDERS =================
  function build(inp) {
    const now = inp.now, bake = inp.bake;
    const L = hoursBetween(now, bake);
    const env = makeEnv(inp); const T = env.T, Tf = env.Tf;
    const warnings = [];
    if (L < K.minLead) return { ok: false, lead: L, warnings: [{ level: 'danger', text: `Only ${fmtH(Math.max(0, L))} until pizza time. Even an emergency dough needs ${fmtH(K.minLead)} from flour to oven. Pick a later time, or make it a flatbread night and plan tomorrow's pizza properly.` }] };
    if (T > 34) warnings.push({ level: 'danger', text: `${T}°C is too hot for any dough to sit out. Use an AC room and enter that temperature, or do every hands-on step after 22:00 / before 07:00 (night temperature is used for night waits). Maths is clamped at 34°C.` });
    const Tm = Math.min(T, 34);
    const salt = inp.salt;
    const EQR = eqReady(salt);
    const caps = fridgeCaps(Tf);
    const ready = add(bake, -K.stretchH);
    const room = env.room;

    // ----- estimate proof at constant room temp (for plan selection) -----
    const estProof = (plan) => solveProof({ inp, env, EQR, plan, ready, sameDay: plan === 'S' }).tbp;

    // ----- feasibility lengths -----
    const pre = poolishPreset(Tm, false), preS = poolishPreset(Tm, true);
    const trw = rewarmH(Tm), hhs = headStartH(Tm);
    const tbpEst = estProof('RT');
    const L_S = preS.warm + K.mixH + K.restBallH + tbpEst + K.stretchH;
    const L_P3 = pre.warm + 3 + trw + K.mixH + K.restBallH + tbpEst + K.stretchH;
    const L_P24 = pre.warm + caps.Hp + trw + K.mixH + K.restBallH + tbpEst + K.stretchH;
    const ttEst = solveTemper({ inp, env, EQR, Hb: 10, fridgeInFixed: null, ready }).tt;
    const L_Cmin = pre.warm + 12 + trw + K.mixH + K.restBallH + hhs + 10 + ttEst + K.stretchH;

    let plan;
    if (L >= L_Cmin && (inp.preferCold || L > L_P24 || Tm >= 31)) plan = 'COLD';
    else if (L >= L_P3) plan = 'RT';
    else if (L >= L_S) plan = 'S';
    else plan = 'E';

    let out;
    if (plan === 'COLD') out = planCold({ inp, env, EQR, L, ready, caps, pre, trw, hhs, warnings });
    if (plan === 'RT') { out = planRT({ inp, env, EQR, L, ready, caps, pre, trw, warnings });
      // if a hands-on step lands in the sleep window, try cold-held balls (any hold length) to move it
      if (out.sleepViolations) { const alt = planCold({ inp, env, EQR, L, ready, caps, pre, trw, hhs, warnings: [], minHb: 3, minHp: 3, relaxed: true }); if (alt && alt.plan === 'COLD' && !alt.sleepViolations) { out = alt; plan = 'COLD'; } }
    }
    if (plan === 'S') out = planS({ inp, env, EQR, L, ready, preS, warnings });
    if (plan === 'E') out = planE({ inp, env, L, ready, warnings });
    plan = out.plan || plan; // builders may fall through to a simpler plan

    // ----- recipe & yeast -----
    const rec = recipe(inp, plan);
    const yf = K.yeastFactor[inp.yeastType] || 1;
    const yeast = { poolishG: 0, finalG: 0 };
    if (plan !== 'E') yeast.poolishG = r01(out.presetG * rec.poolish.flour / 250);
    yeast.finalG = out.finalYeastG || 0;
    yeast.poolishShown = r01(yeast.poolishG * yf); yeast.finalShown = r01(yeast.finalG * yf);
    if (plan === 'E') yeast.finalShown = Math.round(yeast.finalG * yf * 20) / 20;
    const wtr = waterTemp(plan, Tm, Tf, plan === 'S' ? 0 : trw, plan === 'S');
    rec.waterTemp = wtr; rec.poolishWaterTemp = plan === 'E' ? null : poolishWaterTemp(Tm);

    // ----- leftovers -----
    const left = inp.pizzas - inp.eatNow;
    let leftovers = null;
    if (left > 0) leftovers = planLeftovers({ inp, env, EQR, out, plan, left, warnings, caps, hhs, ready });

    // ----- generic warnings -----
    if (plan === 'E') warnings.push({ level: 'warn', text: `Emergency straight dough: plainer flavour and the narrowest window. A poolish needs at least ${fmtH(L_S)} of lead time — bake later if you can.` });
    if (Tm >= 31) warnings.push({ level: 'danger', text: `Hot kitchen (${T}°C): the ready window is only ~30 min. If an AC room at 24–27°C exists, enter that temperature instead. Ice water, hydration ≤ 65%, and bake in waves of 4.` });
    else if (Tm >= 28) warnings.push({ level: 'warn', text: `Warm kitchen (${T}°C): the ready window is about 40–45 min. Start poke-testing at the scheduled time and bake at the early side.` });
    if (Tf >= 7) warnings.push({ level: 'warn', text: `Fridge at ${Tf}°C ferments dough about twice as fast as 4°C. Fridge holds are capped shorter (poolish ≤ ${caps.Hp} h, balls ≤ ${caps.Hb} h). Put a thermometer on the dough shelf; the back of the middle shelf is coldest.` });
    if (inp.hydration >= 80) warnings.push({ level: 'danger', text: `${inp.hydration}% is pan-pizza territory for this flour. A Neapolitan round at 500°C will tear on the peel and stay wet in the middle. Choose 70% or below unless you are making pizza in teglia.` });
    else if (inp.hydration >= 72) warnings.push({ level: 'warn', text: `${inp.hydration}% is beyond what maida holds on its own: keep at least a quarter of the water back for the second addition, expect a sticky dough and a wetter centre, and finish with slap-and-folds.` });
    else if (inp.hydration > 66) warnings.push({ level: 'warn', text: `${inp.hydration}% is sticky with maida and risks a wet centre in a 60–90 s bake. Handle with oiled hands; 62–65% is the sweet spot for this flour.` });
    if (inp.hydration <= 55) warnings.push({ level: 'info', text: `${inp.hydration}% is a stiff dough: dense crumb and hard to open to a full round. Maida is happiest at 60–65%.` });
    if (Tm >= 31 && inp.hydration > 65) warnings.push({ level: 'warn', text: 'Keep hydration at 65% or below in this heat.' });
    if (rec.totalFlour > 1500) warnings.push({ level: 'info', text: `${rec.totalFlour} g of flour: split into two mixer batches and two poolish bowls (never above speed 2, bowl half full).` });
    if (Tm >= 30 && inp.eatNow >= 5) warnings.push({ level: 'info', text: `Wave rule: at ${T}°C proof ${Math.min(4, inp.eatNow)} balls for the first launch and keep the rest in the fridge; pull them 15 min after the first pizza goes in. The ready window is too short for ${inp.eatNow} balls at once.` });
    if (T <= 18) warnings.push({ level: 'info', text: `Cool kitchen (${T}°C): proofs are long. Proofing in a switched-off oven with the light on (~27°C) is faster — if you do that, enter 27 as the room temperature.` });
    if (out.sleepViolations) {
      const bad = out.steps.find(s => s.kind !== 'wait' && inSleep(s.t, inp));
      let shift = '';
      if (bad) { const w = new Date(bad.t); w.setHours(Math.floor(inp.wakeAt / 60), inp.wakeAt % 60, 0, 0); if (w <= bad.t) w.setDate(w.getDate() + 1); shift = ` "${bad.title}" lands at ${fmtT(bad.t)}. Bake about ${fmtH(hoursBetween(bad.t, w))} later and it moves to after you wake up`; }
      warnings.push({ level: 'warn', text: `A hands-on step falls inside your sleep hours and the fridge can't absorb it at ${T}°C.${shift}${T <= 20 ? ', or proof the balls somewhere warmer (oven with the light on ≈ 27°C) and enter that temperature' : ''}. Or extend your awake window in Advanced.` });
    }
    if (out.delayH > 0.5) { const first = out.steps.find(s => s.kind !== 'wait') || out.steps[0]; warnings.push({ level: 'info', text: `You have more time than the dough needs. Nothing to do until ${fmtDT(first.t)} — starting earlier would only add warm hours the flour can't take.` }); }

    const steps = out.steps.concat([
      S(add(bake, -K.ovenH), '🔥', 'oven', 'Light the CasaKoa', K.ovenH, 'Full gas. Launch only when the floor at the launch spot reads 380–420°C on the IR gun (aim for 400). Dome 450–500°C.'),
      S(bake, '🍕', 'oven', `Stretch, top, bake — ${inp.eatNow} pizza${inp.eatNow > 1 ? 's' : ''}`, 0, `Sooji+maida dust. Stretch to ${rec.diameterCm} cm, centre 2–3 mm. 60–90 s: turn at 30–40 s, dome the last 10–15 s. Full flame between pizzas until the floor is back to 380°C (2–4 min), medium-low during the bake. First pizza is the calibration pizza.`),
    ]).sort((a, b) => a.t - b.t);

    return { ok: true, plan, planName: PLAN_NAMES[plan], why: out.why, lead: L, recipe: rec, yeast, steps, leftovers, warnings, T, Tf, Tn: env.Tn, forecast: env.forecast, inputs: inp, model: out.model, EQR };
  }

  const PLAN_NAMES = { E: 'Emergency straight dough', S: 'Same-day poolish', RT: 'Overnight poolish, same-day balls', COLD: 'Overnight poolish + cold-fermented balls' };

  // ----- proof solver for RT / S: proof ends at `ready`; returns tbp and the schedule -----
  function solveProof({ inp, env, EQR, plan, ready, sameDay, DDT }) {
    const T = Math.min(env.T, 34); const ddt = DDT != null ? DDT : (T <= 20 ? 25 : 23);
    const sched = (tbp) => {
      const proofStart = add(ready, -tbp), mixStart = add(proofStart, -(K.restBallH + K.mixH));
      const stages = [
        { start: mixStart, hours: K.mixH, env: ddt, tau: null, rate: 'pd' },
        { start: add(mixStart, K.mixH), hours: K.restBallH, env: env.room, tau: K.tauBall, rate: 'pd' },
        { start: proofStart, hours: tbp, env: env.room, tau: K.tauBall, rate: 'pd' },
      ];
      return { stages, mixStart, proofStart };
    };
    const tbp = bisect(x => simulate(sched(x).stages, ddt).EQ - EQR, 0.5, 9);
    const s = sched(tbp); const sim = simulate(s.stages, ddt);
    return { tbp, ...s, sim, ddt };
  }
  // ----- temper solver for COLD / fridge leftovers: fridge-out = ready − tt; fridge-in fixed (or = out − Hb) -----
  function solveTemper({ inp, env, EQR, Hb, fridgeInFixed, ready, target }) {
    const T = Math.min(env.T, 34), Tf = env.Tf, hhs = headStartH(T), tgt = target || EQR;
    const sched = (tt) => {
      const fridgeOut = add(ready, -tt);
      const fridgeIn = fridgeInFixed || add(fridgeOut, -Hb);
      const ballEnd = add(fridgeIn, -hhs), mixStart = add(ballEnd, -(K.restBallH + K.mixH));
      const stages = [
        { start: mixStart, hours: K.mixH, env: 20, tau: null, rate: 'pd' },
        { start: add(mixStart, K.mixH), hours: K.restBallH, env: env.room, tau: K.tauBall, rate: 'pd' },
        { start: ballEnd, hours: hhs, env: env.room, tau: K.tauBall, rate: 'pd' },
        { start: fridgeIn, hours: hoursBetween(fridgeIn, fridgeOut), env: Tf, tau: K.tauBall, rate: 'pd' },
        { start: fridgeOut, hours: tt, env: env.room, tau: K.tauBall, rate: 'pd' },
      ];
      return { stages, mixStart, ballEnd, fridgeIn, fridgeOut };
    };
    const f = x => simulate(sched(x).stages, 20).EQ - tgt;
    const ttMax = T <= 20 ? 9 : 6;
    let tt = bisect(f, 0.75, ttMax); let capped = false;
    if (f(ttMax) < 0) { tt = ttMax; capped = true; }
    const s = sched(tt); const sim = simulate(s.stages, 20);
    return { tt, capped, ...s, sim };
  }

  // ----- plan RT -----
  function planRT({ inp, env, EQR, L, ready, caps, pre, trw, warnings }) {
    const T = Math.min(env.T, 34), Tf = env.Tf, now = inp.now;
    const pr = solveProof({ inp, env, EQR, plan: 'RT', ready, sameDay: false });
    let tbp = pr.tbp, finalYeastG = 0, model = {};
    const cap = tbpCap(T);
    if (tbp > cap) { // cold kitchen: top up yeast so the proof fits the cap
      const prc = solveProofFixed(env, ready, cap);
      const yAdd = Math.max(0, yForEQ(prc.EQ) - 0.104);
      const F = recipe(inp, 'RT').totalFlour; let g = f01(yAdd * F / 100);
      if (g >= 0.3) { finalYeastG = Math.min(g, f01(0.003 * F)); tbp = cap; } else tbp = Math.min(tbp, cap + 1.5);
      model.topUp = { yAdd, cap };
    }
    const proofStart = add(ready, -tbp), mixStart = add(proofStart, -(K.restBallH + K.mixH)), poolOut = add(mixStart, -trw);
    // choose poolish hold Hp (3..caps.Hp) — prefer long, avoid sleep hours for the two hands-on poolish steps
    let best = null;
    for (let Hp = caps.Hp; Hp >= 3; Hp -= 0.25) {
      const poolFridge = add(poolOut, -Hp), poolStart = add(poolFridge, -pre.warm);
      const delay = hoursBetween(now, poolStart);
      if (delay < -1 / 60) continue; // would need to have started already
      const viol = (inSleep(poolStart, inp) ? 1 : 0) + (inSleep(poolFridge, inp) ? 1 : 0);
      const score = viol * 100 + Math.max(0, 12 - Hp) * 1.0 + delay * 0.05;
      if (!best || score < best.score) best = { Hp, poolFridge, poolStart, delay, viol, score };
    }
    if (!best) { // hold would be < 3 h: fall through to same-day poolish
      return planS({ inp, env, EQR, L, ready, preS: poolishPreset(T, true), warnings });
    }
    const sim = simulate(pr.stages, pr.ddt); const marks = sim.marks;
    const extra = simulate(pr.stages.concat([{ start: ready, hours: 3, env: env.room, tau: K.tauBall, rate: 'pd' }]), pr.ddt);
    const pokeAt = timeAtEQ(marks, 0.8 * EQR) || add(ready, -0.75), overAt = timeAtEQ(extra.marks, 1.2 * EQR) || add(ready, 1);
    const mixInSleep = inSleep(mixStart, inp);
    const steps = [];
    if (best.delay > 0.5) steps.push(S(now, '⏳', 'wait', 'Nothing to do yet', best.delay, `Relax. The poolish starts at ${fmtDT(best.poolStart)}.`));
    steps.push(S(best.poolStart, '🥣', 'active', 'Make the poolish', 0.1, `Yeast first: in a small cup, 30 g of the water at 38°C (finger-warm, never hot), sprinkle the yeast over it, stir after a minute so nothing floats dry, and leave it 10 min. Water only. Then the rest of the water at about ${poolishWaterTemp(T)}°C${poolishWaterTemp(T) <= 16 ? ' (cold on purpose: it holds the poolish back in this heat, and hydrated yeast is only slowed by cold, never harmed)' : ''}, the honey, the yeast slurry, then the maida; mix to a thick batter. Never dry yeast straight into cold water: it leaks and stalls. Loose cover on the counter for ${fmtH(pre.warm)}.`, 'Small bubbles by 45 min; by the end: domed, bubbling all over, centre just starting to flatten. If that happens early, go to the fridge early.'));
    steps.push(S(add(best.poolStart, 0.1), '🫧', 'wait', `Poolish wakes up on the counter (${T}°C)`, pre.warm - 0.1));
    steps.push(S(best.poolFridge, '🧊', 'fridge', 'Seal the poolish and refrigerate', best.Hp, `Cling film tight, no holes. It builds flavour slowly at ${Tf}°C for ${fmtH(best.Hp)}.`, 'When it comes out: bubbly, domed or just sinking in the centre, sweet-yeasty with a faint tang. Sunk well below a ring on the bowl and boozy → discard and remake.'));
    if (trw > 0) steps.push(S(poolOut, '🌡️', 'active', 'Poolish out of the fridge', trw, `Let it stand ${Math.round(trw * 60)} min while you weigh everything else.`));
    steps.push(S(mixStart, '🥣', 'active', `Mix the final dough (target dough temp ${pr.ddt}°C)`, K.mixH, `${finalYeastG >= 0.3 ? 'The extra yeast in the recipe: suspend it in 30 g of the water at 38°C for 10 min first, never straight into cold water. ' : ''}Water first: half of the water into the bowl (dissolve the salt in the other half and set it aside), then all the poolish, then the flours. Lowest speed for 2–3 min until no dry flour is left: a rough, tight ball. Cover and rest 15–20 min so the maida drinks. Then your kneading speed (on this mixer 5–6; the lowest setting where the hook drags the dough round the bowl) for 6–8 min until it gathers on the hook and pulls clean from the bowl. Second water: the salty half in 3–4 small additions at the same speed, waiting until each has vanished and the dough gathers again (8–10 min). Oil last, 2 min. Stop when smooth and satiny even if it fails the windowpane: fermentation finishes the gluten.`, 'Kneading speed is a behaviour, not a number: the lowest setting where the hook pushes the dough round the bowl and it gathers within a minute (a KitchenAid does this on 2; this mixer needs 5–6). Below it the hook only stirs and the dough stays soup. Soup that never gathers even at kneading speed means too much water too early or too little dough for the bowl: hold the second water back, scrape down, give it 5 more min. Strandy or tearing? Stop, cover 15 min, then 3 min at kneading speed. Dough above 27°C? Finish with three sets of stretch-and-folds instead. Never add flour.'));
    steps.push(S(add(mixStart, K.mixH), '🥟', 'active', `Rest ${T >= 31 ? 15 : T >= 28 ? 20 : 30} min, then ball at ${inp.ball} g`, K.restBallH, 'Oiled hands and counter, never flour. Smooth top, seam underneath. Oiled tray, 5 cm apart, oiled cling film with no holes.'));
    steps.push(S(proofStart, '⏳', 'wait', `Balls proof at room temperature (${T}°C)`, tbp, `About ${fmtH(tbp)}. The oven goes on ${Math.round(K.ovenH * 60)} min before pizza.`));
    steps.push(S(pokeAt, '👉', 'active', 'Start poke-testing', 0, `Press a floured finger 1 cm in for 2 s. Springs back fast → wait, re-test in ${T >= 28 ? '20' : '30–45'} min. Comes back slowly and only halfway → ready. Ready window: ${fmtT(ready)}–${fmtT(overAt)}.`, 'Ready: ~1.75× volume, balls touching, light and airy. Over-proofed: dent stays, big translucent blisters, boozy smell → stretch now gently, or re-ball once and rest 60 min.'));
    return { plan: 'RT', steps, presetG: pre.g, poolishWater: pre.water, finalYeastG, delayH: best.delay, sleepViolations: best.viol + (mixInSleep ? 1 : 0), mixInSleep,
      why: `${best.Hp >= 8 ? `${fmtH(L)} of lead time is the sweet spot.` : `${fmtH(L)} allows a short fridge poolish.`} The poolish ferments ${fmtH(pre.warm)} on the counter, then ${fmtH(best.Hp)} in the fridge doing the flavour work while you do nothing. The dough itself only spends about ${fmtH(K.restBallH + tbp)} warm at ${T}°C — which is all this flour tolerates — so the balls proof at room temperature and go straight into the oven at their peak.`,
      model: { ...model, tbp, Hp: best.Hp, EQ: sim.EQ, D: sim.D, pokeAt, overAt }, ballEnd: proofStart, fridgeIn: null };
  }
  function solveProofFixed(env, ready, tbp) {
    const T = Math.min(env.T, 34), ddt = T <= 20 ? 25 : 23;
    const proofStart = add(ready, -tbp), mixStart = add(proofStart, -(K.restBallH + K.mixH));
    const st = [
      { start: mixStart, hours: K.mixH, env: ddt, tau: null, rate: 'pd' },
      { start: add(mixStart, K.mixH), hours: K.restBallH, env: env.room, tau: K.tauBall, rate: 'pd' },
      { start: proofStart, hours: tbp, env: env.room, tau: K.tauBall, rate: 'pd' },
    ];
    return simulate(st, ddt);
  }

  // ----- plan S (same-day poolish) -----
  function planS({ inp, env, EQR, L, ready, preS, warnings }) {
    const T = Math.min(env.T, 34), now = inp.now;
    const pr = solveProof({ inp, env, EQR, plan: 'S', ready, sameDay: true });
    const tbp = Math.min(pr.tbp, tbpCap(T) + 1.5);
    const proofStart = add(ready, -tbp), mixStart = add(proofStart, -(K.restBallH + K.mixH));
    const poolStart = add(mixStart, -preS.warm);
    const delay = hoursBetween(now, poolStart);
    const late = delay < -1 / 60;
    const start = late ? now : poolStart;
    if (late) warnings.push({ level: 'warn', text: `Start the poolish right now — it will be slightly young at mixing time. Use it as soon as it's domed and bubbling, and expect the balls to run ${fmtH(-delay)} late; poke-test decides.` });
    const sim = simulate(pr.stages, pr.ddt);
    const extra = simulate(pr.stages.concat([{ start: ready, hours: 3, env: env.room, tau: K.tauBall, rate: 'pd' }]), pr.ddt);
    const pokeAt = timeAtEQ(sim.marks, 0.8 * EQR) || add(ready, -0.75), overAt = timeAtEQ(extra.marks, 1.2 * EQR) || add(ready, 1);
    const viol = (inSleep(start, inp) ? 1 : 0) + (inSleep(mixStart, inp) ? 1 : 0);
    const steps = [];
    if (delay > 0.5) steps.push(S(now, '⏳', 'wait', 'Nothing to do yet', delay, `The poolish starts at ${fmtDT(poolStart)}.`));
    steps.push(S(start, '🥣', 'active', 'Make the same-day poolish', 0.1, `Yeast first: in a small cup, 30 g of the water at 38°C (finger-warm, never hot), sprinkle the yeast over it, stir after a minute so nothing floats dry, and leave it 10 min. Water only. Then the rest of the water at about ${poolishWaterTemp(T)}°C${poolishWaterTemp(T) <= 16 ? ' (cold on purpose: it holds the poolish back in this heat, and hydrated yeast is only slowed by cold, never harmed)' : ''}, the yeast slurry, then the maida; mix to a thick batter. No honey today. Loose cover on the counter for ${fmtH(preS.warm)}.`, 'Use it when it has at least doubled, is bubbling all over and the dome is just starting to flatten. If it gets there early, mix early.'));
    steps.push(S(add(start, 0.1), '🫧', 'wait', `Poolish ripens on the counter (${T}°C)`, preS.warm - 0.1));
    steps.push(S(mixStart, '🥣', 'active', `Mix the final dough (target dough temp ${pr.ddt}°C)`, K.mixH, `Water first: half of the water into the bowl (dissolve the salt in the other half and set it aside), then all the poolish, then the flours. Lowest speed for 2–3 min until no dry flour is left: a rough, tight ball. Cover and rest 15–20 min so the maida drinks. Then your kneading speed (on this mixer 5–6; the lowest setting where the hook drags the dough round the bowl) for 6–8 min until it gathers on the hook and pulls clean from the bowl. Second water: the salty half in 3–4 small additions at the same speed, waiting until each has vanished and the dough gathers again (8–10 min). Oil last, 2 min. Stop when smooth and satiny even if it fails the windowpane: fermentation finishes the gluten.`, 'Kneading speed is a behaviour, not a number: the lowest setting where the hook pushes the dough round the bowl and it gathers within a minute (a KitchenAid does this on 2; this mixer needs 5–6). Below it the hook only stirs and the dough stays soup. Soup that never gathers even at kneading speed means too much water too early or too little dough for the bowl: hold the second water back, scrape down, give it 5 more min. Strandy or tearing? Stop, cover 15 min, then 3 min at kneading speed. Dough above 27°C? Finish with three sets of stretch-and-folds instead. Never add flour.'));
    steps.push(S(add(mixStart, K.mixH), '🥟', 'active', `Rest ${T >= 31 ? 15 : T >= 28 ? 20 : 30} min, then ball at ${inp.ball} g`, K.restBallH, 'Oiled hands and counter. Smooth top, seam underneath. Oiled tray, 5 cm apart, oiled cling film.'));
    steps.push(S(proofStart, '⏳', 'wait', `Balls proof at room temperature (${T}°C)`, tbp, `About ${fmtH(tbp)}.`));
    steps.push(S(pokeAt, '👉', 'active', 'Start poke-testing', 0, `Press 1 cm for 2 s. Fast spring-back → wait, re-test in ${T >= 28 ? '20' : '30–45'} min. Slow half return → ready. Ready window: ${fmtT(ready)}–${fmtT(overAt)}.`, 'Over-proofed: dent stays, big blisters, boozy smell → stretch now gently, or re-ball once and rest 60 min.'));
    return { plan: 'S', steps, presetG: preS.g, poolishWater: preS.water, finalYeastG: 0, delayH: Math.max(0, delay), sleepViolations: viol, mixInSleep: inSleep(mixStart, inp),
      why: `${fmtH(L)} is enough for a same-day poolish (a bigger yeast dose, ${fmtH(preS.warm)} on the counter) but not for the overnight fridge version. Everything happens today at ${T}°C: poolish → dough → balls → oven. For the best flavour, next time start the fridge poolish the evening before.`,
      model: { tbp, EQ: sim.EQ, D: sim.D, pokeAt, overAt }, ballEnd: proofStart, fridgeIn: null };
  }

  // ----- plan E (emergency direct dough) -----
  function planE({ inp, env, L, ready, warnings }) {
    const T = Math.min(env.T, 34), now = inp.now;
    const tE = clamp(L - K.mixH - K.restE - K.stretchH, 1.5, tEmax(T));
    const proofStart = add(ready, -tE), mixStart = add(proofStart, -(K.restE + K.mixH));
    const delay = Math.max(0, hoursBetween(now, mixStart));
    const stages = [
      { start: add(mixStart, K.mixH), hours: K.restE, env: env.room, tau: null, rate: 'cold' },
      { start: proofStart, hours: tE, env: env.room, tau: null, rate: 'cold' },
    ];
    const sim = simulate(stages, T);
    const yPct = clamp(1.2 * yForEQ(sim.EQ), 0.10, 0.70);
    const F = recipe(inp, 'E').totalFlour;
    const finalYeastG = f005(yPct * F / 100);
    const steps = [];
    if (delay > 0.5) steps.push(S(now, '⏳', 'wait', 'Nothing to do yet', delay, `Mix at ${fmtDT(mixStart)} — longer than ${fmtH(tE)} warm would over-proof this flour.`));
    steps.push(S(mixStart, '🥣', 'active', 'Mix the dough now — no poolish (target dough temp 26°C)', K.mixH, `In a small cup, sprinkle the yeast over 50 g of the water at 38°C, stir after a minute, leave 10 min (water only) first. Water first: 80% of the water (salt dissolved in the rest, set aside), the yeast water, then the flours. Lowest speed for 2–3 min to a rough ball, rest 10 min, then your kneading speed (on this mixer 5–6) for 6–8 min until it gathers on the hook. Add the salty water in 2–3 small additions at the same speed, waiting for each to vanish (5 min). Oil last, 2 min. Hydration capped at 65%.`, 'Kneading speed is a behaviour, not a number: the lowest setting where the hook pushes the dough round the bowl and it gathers within a minute (a KitchenAid does this on 2; this mixer needs 5–6). Below it the hook only stirs and the dough stays soup. Soup that never gathers even at kneading speed means too much water too early or too little dough for the bowl: hold the second water back, scrape down, give it 5 more min. Strandy or tearing? Stop, cover 15 min, then 3 min at kneading speed. Dough above 27°C? Finish with three sets of stretch-and-folds instead. Never add flour.'));
    steps.push(S(add(mixStart, K.mixH), '🥟', 'active', `Rest 15 min, then ball at ${inp.ball} g`, K.restE, 'Oiled hands, smooth top, seam under. Oiled tray, oiled cling film.'));
    steps.push(S(proofStart, '⏳', 'wait', `Balls proof at room temperature (${T}°C)`, tE, `About ${fmtH(tE)}. Poke-test from ${fmtT(add(ready, -0.2 * tE))}.`, 'Slow half return of the dent = ready. This dough has a short window — bake at the early side.'));
    return { plan: 'E', steps, presetG: 0, poolishWater: null, finalYeastG, delayH: delay, sleepViolations: inSleep(mixStart, inp) ? 1 : 0, mixInSleep: inSleep(mixStart, inp),
      why: `Under ${fmtH(L + 0.01)} there is no time for a poolish to ripen and still leave a proof. This is a straight dough with the yeast computed for exactly ${fmtH(tE)} at ${T}°C. It will be decent, not great.`,
      model: { tE, yPct, EQ: sim.EQ, D: sim.D }, ballEnd: proofStart, fridgeIn: null };
  }

  // ----- plan COLD -----
  function planCold({ inp, env, EQR, L, ready, caps, pre, trw, hhs, warnings, minHb = 8, minHp = 6, relaxed = false }) {
    const T = Math.min(env.T, 34), Tf = env.Tf, now = inp.now;
    // grid over ball hold Hb and poolish hold Hp; temper tt solved per Hb
    let best = null;
    for (let Hb = minHb; Hb <= caps.Hb; Hb += 1) {
      const tp = solveTemper({ inp, env, EQR, Hb, fridgeInFixed: null, ready });
      if (tp.capped) continue;
      for (let Hp = caps.Hp; Hp >= minHp; Hp -= 0.5) {
        const poolOut = add(tp.mixStart, -trw), poolFridge = add(poolOut, -Hp), poolStart = add(poolFridge, -pre.warm);
        const delay = hoursBetween(now, poolStart);
        if (delay < -1 / 60) continue;
        const viol = [poolStart, poolFridge, tp.mixStart, tp.fridgeIn, tp.fridgeOut].filter(d => inSleep(d, inp)).length;
        const D = tp.sim.D;
        if (D > K.D_HARD) continue;
        const score = viol * 100 + Math.max(0, D - K.D_COMFORT) * 5 + Math.abs(Hb - 20) * 0.1 + Math.max(0, 16 - Hp) * 0.3 + Math.max(0, 10 - Hb) * 0.4 + delay * 0.02;
        if (!best || score < best.score) best = { Hb, Hp, tp, poolOut, poolFridge, poolStart, delay, viol, D, score };
      }
    }
    if (!best) return relaxed ? { plan: 'none', sleepViolations: 1 } : planRT({ inp, env, EQR, L, ready, caps, pre, trw, warnings });
    const { tp } = best;
    const extra = simulate(tp.stages.concat([{ start: ready, hours: 3, env: env.room, tau: K.tauBall, rate: 'pd' }]), 20);
    const overAt = timeAtEQ(extra.marks, 1.2 * EQR) || add(ready, 1);
    const pokeAt = add(tp.fridgeOut, Math.max(0.5, tp.tt - 0.75));
    if (best.D > K.D_COMFORT) warnings.push({ level: 'warn', text: 'The balls sit near this flour\'s limit: expect a softer, more extensible ball — stretch to 28–30 cm and handle gently.' });
    const steps = [];
    if (best.delay > 0.5) steps.push(S(now, '⏳', 'wait', 'Nothing to do yet', best.delay, `The poolish starts at ${fmtDT(best.poolStart)}. Starting earlier would only add warm hours.`));
    steps.push(S(best.poolStart, '🥣', 'active', 'Make the poolish', 0.1, `Yeast first: in a small cup, 30 g of the water at 38°C (finger-warm, never hot), sprinkle the yeast over it, stir after a minute so nothing floats dry, and leave it 10 min. Water only. Then the rest of the water at about ${poolishWaterTemp(T)}°C${poolishWaterTemp(T) <= 16 ? ' (cold on purpose: it holds the poolish back in this heat, and hydrated yeast is only slowed by cold, never harmed)' : ''}, the honey, the yeast slurry, then the maida; mix to a thick batter. Never dry yeast straight into cold water: it leaks and stalls. Loose cover on the counter for ${fmtH(pre.warm)}.`, 'By the end: domed, bubbling all over, centre just starting to flatten. Early? Fridge early.'));
    steps.push(S(add(best.poolStart, 0.1), '🫧', 'wait', `Poolish wakes up on the counter (${T}°C)`, pre.warm - 0.1));
    steps.push(S(best.poolFridge, '🧊', 'fridge', 'Seal the poolish and refrigerate', best.Hp, `Cling film tight. ${fmtH(best.Hp)} at ${Tf}°C.`, 'Out of the fridge: bubbly, domed or just sinking, sweet-yeasty with a faint tang. Boozy and collapsed → remake.'));
    if (trw > 0) steps.push(S(best.poolOut, '🌡️', 'active', 'Poolish out of the fridge', trw, `${Math.round(trw * 60)} min on the counter while you weigh everything.`));
    steps.push(S(tp.mixStart, '🥣', 'active', 'Mix the final dough (target dough temp 20°C — it\'s going to the fridge)', K.mixH, `Water first: half of the cold water into the bowl (dissolve the salt in the other half and set it aside), then all the poolish, then the flours. Lowest speed for 2–3 min until no dry flour is left: a rough, tight ball. Cover and rest 15–20 min so the maida drinks. Then your kneading speed (on this mixer 5–6; the lowest setting where the hook drags the dough round the bowl) for 6–8 min until it gathers on the hook and pulls clean from the bowl. Second water: the salty half in 3–4 small additions at the same speed, waiting until each has vanished and the dough gathers again (8–10 min). Oil last, 2 min. Stop when smooth and satiny even if it fails the windowpane: fermentation finishes the gluten.`, 'Kneading speed is a behaviour, not a number: the lowest setting where the hook pushes the dough round the bowl and it gathers within a minute (a KitchenAid does this on 2; this mixer needs 5–6). Below it the hook only stirs and the dough stays soup. Soup that never gathers even at kneading speed means too much water too early or too little dough for the bowl: hold the second water back, scrape down, give it 5 more min. Strandy or tearing? Stop, cover 15 min, then 3 min at kneading speed. Dough above 27°C? Finish with three sets of stretch-and-folds instead. Never add flour.'));
    steps.push(S(add(tp.mixStart, K.mixH), '🥟', 'active', `Rest ${T >= 31 ? 15 : T >= 28 ? 20 : 30} min, then ball at ${inp.ball} g`, K.restBallH, 'Oiled hands, smooth top, seam under. Oiled tray or one ball per 1 L lidded box, oil the tops.'));
    steps.push(S(tp.ballEnd, '⏳', 'wait', 'Balls get a head start on the counter', hhs, `${fmtH(hhs)} at ${T}°C so the yeast is awake before the cold.`));
    steps.push(S(tp.fridgeIn, '🧊', 'fridge', 'Balls into the fridge', best.Hb, `Lid or film ajar for the first 60–90 min (condensation), then sealed. ${fmtH(best.Hb)} at ${Tf}°C.`, 'They slowly puff to ~1.5×. Flattened balls and big surface bubbles after a day are normal. Liquid on the tray or a vinegar smell → the fridge ran warm: bake within 30 min or re-ball.'));
    steps.push(S(tp.fridgeOut, '🌡️', 'wait', `Balls out to finish proofing at ${T}°C`, tp.tt, `About ${fmtH(tp.tt)}: they must both finish rising and warm up inside (cold dough tears and blisters at 500°C). ${inp.eatNow > 6 && T >= 28 ? 'Pull in two waves 30 min apart.' : ''}`));
    steps.push(S(pokeAt, '👉', 'active', 'Start poke-testing', 0, `Press 1 cm for 2 s. Fast spring-back → wait, re-test in ${T >= 28 ? '20' : '30'} min. Slow half return → ready. Ready window: ${fmtT(ready)}–${fmtT(overAt)}.`, 'Tight and dense straight from the fridge is normal. Ready: ~1.75×, soft, relaxed, room-temperature to the touch.'));
    return { plan: 'COLD', steps, presetG: pre.g, poolishWater: pre.water, finalYeastG: 0, delayH: best.delay, sleepViolations: best.viol, mixInSleep: false,
      why: (relaxed ? `The room-temperature version would have you mixing in the middle of the night, so the balls go into the fridge instead. ` : T >= 31 ? `At ${T}°C a room-temperature proof would be ready for only ~30 minutes. ` : `With ${fmtH(L)} in hand there is time for the best version. `) + `The balls spend ${fmtH(best.Hb)} in the fridge: yeast slows about 20×, flavour keeps building, and the weak flour isn't sitting warm and softening. The poolish does its ${fmtH(best.Hp)} in the fridge first. Balls come out ${fmtH(tp.tt)} before pizza to finish rising and warm through.`,
      model: { tt: tp.tt, Hb: best.Hb, Hp: best.Hp, EQ: tp.sim.EQ, D: best.D, pokeAt, overAt }, ballEnd: tp.ballEnd, fridgeIn: tp.fridgeIn };
  }

  // ----- leftovers -----
  function planLeftovers({ inp, env, EQR, out, plan, left, warnings, caps, hhs, ready }) {
    const T = Math.min(env.T, 34), Tf = env.Tf, bake = inp.bake, t2 = inp.rest;
    const n = left, s = n > 1 ? 's' : '';
    if (!t2) {
      warnings.push({ level: 'warn', text: `${n} spare ball${s} but no second-sitting time. Tell me when you'll eat ${n > 1 ? 'them' : 'it'} and I'll schedule the fridge or freezer.` });
      return { mode: 'unknown', count: n, note: `Until you set a time: put the ${n} spare ball${s} in the fridge 30 min after balling (sealed, oiled tops). Within 30 h, take them out ~${fmtH(out.model.tbp || out.model.tt || 3)} before baking. Beyond 30 h, freeze them right after balling instead.`, steps: [] };
    }
    if (t2 <= bake) { warnings.push({ level: 'warn', text: 'The second sitting is before the first bake — swapped? Leftover plan skipped.' }); return null; }
    const gapBake = hoursBetween(bake, t2), ready2 = add(t2, -K.stretchH);
    if (gapBake <= windowRoomH(T)) {
      return { mode: 'room', count: n, note: `Only ${fmtH(gapBake)} later — all ${inp.pizzas} balls proof together. Keep the ${n} spare ball${s} covered on the tray${T >= 28 ? ', in the fridge if big bubbles appear, out 15 min before stretching' : ''}.`, steps: [S(t2, '🍕', 'oven', `Bake the ${n} leftover pizza${s}`, 0, 'Same oven routine.')] };
    }
    // fridge branch: un-proofed balls, head start then fridge until out, temper solved
    const fridgeIn = out.fridgeIn || add(out.ballEnd, plan === 'COLD' ? 0 : headStartH(T));
    const tp = solveTemper({ inp, env, EQR, Hb: null, fridgeInFixed: fridgeIn, ready: ready2 });
    const H2 = hoursBetween(fridgeIn, tp.fridgeOut);
    if (!tp.capped && H2 >= 1 && H2 <= caps.Hb && tp.sim.D <= K.D_HARD) {
      const steps = [];
      if (!out.fridgeIn) steps.push(S(fridgeIn, '🧊', 'fridge', `${n} spare ball${s} into the fridge`, H2, `${fmtH(headStartH(T))} after balling, before ${n > 1 ? 'they have' : 'it has'} risen. Oiled tops, one ball per 1 L lidded box or 5 cm apart, film ajar 60–90 min then sealed. ${fmtH(H2)} at ${Tf}°C.`, 'Flattened balls and big surface bubbles after a day are normal.'));
      else steps.push(S(fridgeIn, '🧊', 'fridge', `${n} spare ball${s} stay in the fridge`, H2, `Same tray as the others — just don't take ${n > 1 ? 'them' : 'it'} out with the first batch. ${fmtH(H2)} total at ${Tf}°C.`));
      steps.push(S(tp.fridgeOut, '🌡️', 'wait', `Take the ${n} ball${s} out to proof at ${T}°C`, tp.tt, `About ${fmtH(tp.tt)}. Poke-test from ${fmtT(add(tp.fridgeOut, Math.max(0.5, tp.tt - 0.75)))}.${H2 > 24 ? ' Expect a softer, more extensible ball — stretch to 28–30 cm and handle gently.' : ''}`, 'Slow half return of the dent = ready.'));
      steps.push(S(add(t2, -K.ovenH), '🔥', 'oven', 'Light the oven', K.ovenH, 'Floor 380–420°C.'));
      steps.push(S(t2, '🍕', 'oven', `Bake the ${n} leftover pizza${s}`, 0, 'Cold-fermented balls have more flavour and a slightly more open crumb.'));
      const note = `${n} ball${s} go into the fridge un-proofed and come out ${fmtH(tp.tt)} before the second sitting (${fmtH(H2)} cold). ${tp.sim.D > K.D_COMFORT ? 'That is near this flour\'s limit — fine, but handle gently.' : 'Well inside what this flour tolerates.'}`;
      return { mode: 'fridge', count: n, note, steps, model: { H2, tt: tp.tt, D: tp.sim.D } };
    }
    // freezer branch
    const days = gapBake / 24;
    const coldNeeded = Math.max(0, hoursBetween(fridgeIn, ready2) - 2);
    const whyFreeze = tp.capped || H2 < 1 ? `${fmtH(gapBake)} is too short for a fridge hold` : `the spare ball${s} would sit about ${fmtH(coldNeeded)} in the fridge, beyond this flour's ${caps.Hb} h limit`;
    if (days > 90) { warnings.push({ level: 'danger', text: `The second sitting is ${Math.round(days)} days away — too long even for the freezer. Make ${n} fewer ball${s} now.` }); return null; }
    if (days > 30) warnings.push({ level: 'warn', text: `Frozen balls beyond 30 days rise noticeably less. Best within 14 days.` });
    const freezeAt = add(out.ballEnd, 0.25);
    let toFridge = add(t2, -16); if (toFridge.getHours() < 7) { toFridge = new Date(toFridge); toFridge.setDate(toFridge.getDate() - 1); toFridge.setHours(22, 0, 0, 0); }
    if (toFridge < add(freezeAt, 6)) toFridge = add(freezeAt, 6);
    const thaw = (tth) => {
      const takeOut = add(ready2, -tth);
      const st = [
        { start: toFridge, hours: Math.min(8, hoursBetween(toFridge, takeOut)), env: 0, tau: null, rate: 'zero' },
        { start: add(toFridge, 8), hours: Math.max(0, hoursBetween(add(toFridge, 8), takeOut)), env: Tf, tau: K.tauBall, rate: 'pd' },
        { start: takeOut, hours: tth, env: env.room, tau: K.tauBall, rate: 'pd' },
      ];
      return { st, takeOut };
    };
    const preEQ = 0.6 * rPd(T) * 0.8; // rest+ball warm time before freezing (approx.)
    const tth = bisect(x => preEQ + simulate(thaw(x).st, Tf).EQ - 1.12 * EQR, 1, 10);
    const th = thaw(tth);
    const steps = [
      S(freezeAt, '❄️', 'fridge', `Freeze ${n} ball${s} right after balling`, 0.2, 'Flatten each to a ≤3 cm puck, oil, uncovered on a tray in the freezer 2–3 h, then skin-tight cling film + zip bag, coldest shelf away from the door. Label the date.'),
      S(toFridge, '🧊', 'fridge', 'Freezer → fridge to thaw', hoursBetween(toFridge, th.takeOut), 'Still wrapped, on a semolina-dusted covered tray.'),
      S(th.takeOut, '🌡️', 'wait', `Out of the fridge to proof at ${T}°C`, tth, `About ${fmtH(tth)} until doubled (frozen yeast is a little weaker). Poke-test from ${fmtT(add(th.takeOut, Math.max(0.5, tth - 1)))}. Never refreeze; bake the same day.`, 'Slow half return of the dent = ready.'),
      S(add(t2, -K.ovenH), '🔥', 'oven', 'Light the oven', K.ovenH, 'Floor 380–420°C.'),
      S(t2, '🍕', 'oven', `Bake the ${n} leftover pizza${s}`, 0, 'Thawed dough is slightly less lively — stretch gently, dome it a little longer.'),
    ];
    return { mode: 'freezer', count: n, note: `Freezer: ${whyFreeze}, so ${n} ball${s} get frozen un-proofed right after balling (freezing stops the clock). Overnight in the fridge to thaw, then ${fmtH(tth)} at room temperature.`, steps, model: { tth } };
  }

  // ---------- formatting ----------
  function fmtH(h) { if (h < 0) h = 0; if (h < 1) return `${Math.round(h * 60)} min`; const hh = Math.floor(h), mm = Math.round((h - hh) * 60); if (mm === 60) return `${hh + 1} h`; return mm ? `${hh} h ${mm} min` : `${hh} h`; }
  const fmtT = d => d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const fmtDT = d => d.toLocaleString(undefined, { weekday: 'short', hour: '2-digit', minute: '2-digit' });

  return { K, rCold, rPd, dRate, simulate, eqReady, EQ_ANCHOR, yForEQ, poolishPreset, recipe, waterTemp, build, fmtH, fmtT, fmtDT, PLAN_NAMES };
})();
/* ENGINE-END */
if (typeof module !== 'undefined') module.exports = ENGINE;
