// Runs benchmark scenarios against engine.js (source of truth; build.mjs inlines it into index.html)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ENGINE = require('../engine.js');
const D = (s) => new Date(s);
const base = { fridge: 5, ball: 280, yeastType: 'idy', nightTemp: null, salt: 0.035, sleepFrom: 23.5 * 60, wakeAt: 7.5 * 60, preferCold: false };
const scenarios = [
  { name: 'A  Fri 18:00 → Sat 20:00, 6 pizzas eat 4, rest Sun 20:00, 65%, 30°C', now: D('2026-09-04T18:00'), bake: D('2026-09-05T20:00'), pizzas: 6, eatNow: 4, rest: D('2026-09-06T20:00'), hydration: 65, temp: 30 },
  { name: 'B  10:00 → 19:00 same day, 3 pizzas, 65%, 32°C', now: D('2026-09-05T10:00'), bake: D('2026-09-05T19:00'), pizzas: 3, eatNow: 3, rest: null, hydration: 65, temp: 32 },
  { name: 'C  Mon 09:00 → Wed 20:00, 8 pizzas eat 5, rest Sat 14:00, 62%, 26°C', now: D('2026-09-07T09:00'), bake: D('2026-09-09T20:00'), pizzas: 8, eatNow: 5, rest: D('2026-09-12T14:00'), hydration: 62, temp: 26 },
  { name: 'D  12:00 → 16:00 same day, 2 pizzas, 22°C (emergency)', now: D('2026-09-05T12:00'), bake: D('2026-09-05T16:00'), pizzas: 2, eatNow: 2, rest: null, hydration: 65, temp: 22 },
  { name: 'E  winter Sat 15:00 → Sun 14:00, 4 pizzas, 16°C', now: D('2026-12-05T15:00'), bake: D('2026-12-06T14:00'), pizzas: 4, eatNow: 4, rest: null, hydration: 65, temp: 16 },
  { name: 'F  Fri 20:00 → Sun 20:00 (48h), 4 pizzas, 30°C', now: D('2026-09-04T20:00'), bake: D('2026-09-06T20:00'), pizzas: 4, eatNow: 4, rest: null, hydration: 65, temp: 30 },
  { name: 'G  Mon 09:00 → Sun 20:00 (155h), 4 eat 2, rest +8 days, 28°C', now: D('2026-09-07T09:00'), bake: D('2026-09-13T20:00'), pizzas: 4, eatNow: 2, rest: D('2026-09-21T20:00'), hydration: 65, temp: 28 },
  { name: 'H  6h lead 35°C, 10 pizzas eat 6, rest 3 days', now: D('2026-09-05T13:00'), bake: D('2026-09-05T19:00'), pizzas: 10, eatNow: 6, rest: D('2026-09-08T19:00'), hydration: 65, temp: 35 },
  { name: 'I  Sat 00:30 → Sat 20:00 (19.5h) 4 pizzas 28°C — sleep test', now: D('2026-09-05T00:30'), bake: D('2026-09-05T20:00'), pizzas: 4, eatNow: 4, rest: null, hydration: 65, temp: 28 },
  { name: 'J  Fri 21:00 → Sun 13:00 (40h) 6 eat 3, rest Sun 20:00, 24°C', now: D('2026-09-04T21:00'), bake: D('2026-09-06T13:00'), pizzas: 6, eatNow: 3, rest: D('2026-09-06T20:00'), hydration: 65, temp: 24 },
  { name: 'K  2h lead (refuse)', now: D('2026-09-05T12:00'), bake: D('2026-09-05T14:00'), pizzas: 2, eatNow: 2, rest: null, hydration: 65, temp: 25 },
  { name: 'L  26h lead, 20°C, 4 pizzas, night 14°C', now: D('2026-11-10T18:00'), bake: D('2026-11-11T20:00'), pizzas: 4, eatNow: 4, rest: null, hydration: 65, temp: 20, nightTemp: 14 },
];
const fmt = d => d.toLocaleString('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
const only = process.argv[2];
console.log('EQ_ANCHOR =', ENGINE.EQ_ANCHOR.toFixed(3), '| rPd(28)=', ENGINE.rPd(28).toFixed(3), 'rCold(4)=', ENGINE.rCold(4).toFixed(3), 'rPd(20)=', ENGINE.rPd(20).toFixed(3));
for (const s of scenarios) {
  if (only && !s.name.startsWith(only)) continue;
  const inp = { ...base, ...s };
  const r = ENGINE.build(inp);
  console.log('\n=== ' + s.name + ' ===');
  if (!r.ok) { console.log('NOT OK:', r.warnings.map(w => w.text).join(' | ')); continue; }
  const rec = r.recipe, y = r.yeast, m = r.model || {};
  console.log(`plan: ${r.plan} | lead ${ENGINE.fmtH(r.lead)} | EQ ${m.EQ?.toFixed(2)} / target ${r.EQR.toFixed(2)} | D ${m.D?.toFixed(1)} | ${Object.entries(m).filter(([k]) => ['tbp','tt','Hb','Hp','tE','yPct'].includes(k)).map(([k,v]) => k + '=' + (typeof v === 'number' ? v.toFixed(2) : v)).join(' ')}`);
  console.log('why:', r.why);
  console.log(`flour ${rec.totalFlour} g (${rec.diameterCm} cm pizzas) | poolish ${rec.poolish.flour}f/${rec.poolish.water}w @${rec.poolishWaterTemp}°C yeast ${y.poolishShown} g honey ${rec.poolish.honey} | final: maida ${rec.final.maida} atta ${rec.final.atta} water ${rec.final.water} @${rec.waterTemp.wt}°C (DDT ${rec.waterTemp.DDT}) salt ${rec.final.salt} oil ${rec.final.oil} yeast ${y.finalShown} g ${rec.waterTemp.notes.join(' / ')}`);
  for (const st of r.steps) console.log(`  ${fmt(st.t)}  ${st.icon} ${st.title}${st.dur ? ' (' + ENGINE.fmtH(st.dur) + ')' : ''}`);
  if (r.leftovers) { console.log('  -- leftovers:', r.leftovers.mode, '-', r.leftovers.note); for (const st of r.leftovers.steps || []) console.log(`     ${fmt(st.t)}  ${st.icon} ${st.title}${st.dur ? ' (' + ENGINE.fmtH(st.dur) + ')' : ''}`); }
  for (const w of r.warnings) console.log('  !', w.level, w.text.slice(0, 160));
  for (let i = 1; i < r.steps.length; i++) if (r.steps[i].t < r.steps[i - 1].t) console.log('  XX non-monotonic at', i);
  if (r.steps[0].t < inp.now - 60e3) console.log('  XX first step before now by', ENGINE.fmtH((inp.now - r.steps[0].t) / 3600e3));
}
