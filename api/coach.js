// Dough coach — Vercel serverless function.
// GET  /api/coach  -> { enabled: boolean }
// POST /api/coach  { messages: [{role, content}], plan: string } -> streamed plain-text reply
// Requires ANTHROPIC_API_KEY in the Vercel project's environment variables. Optional: COACH_MODEL.
const Anthropic = require('@anthropic-ai/sdk');
const CONTEXT = require('./_context.js');

const MODEL = process.env.COACH_MODEL || 'claude-opus-5';
const MAX_TURNS = 12, MAX_CHARS = 2000;

const STATIC_SYSTEM = `You are the "dough coach" inside Dough O'Clock, a deterministic pizza-dough scheduler built for one home baker in Islamabad, Pakistan.
Their setup: CasaKoa gas pizza oven (floor 380–420°C, 60–90 s bakes), local maida (weak ~10% protein flour) blended with 20% fine chakki atta, Saf-Instant yeast, a hot kitchen in summer (28–34°C), a home fridge that may drift to 7°C.
The app already computed their schedule and recipe (given below as "CURRENT PLAN"). Your job is troubleshooting and judgement calls the arithmetic cannot make: reading what they describe or photograph (a poolish that looks flat, a ball that tears, a boozy smell, a fridge that ran warm, a delay in the bake time), telling them what it means, and what to do right now.
Rules:
- Ground every answer in the model document and the field notes below; they encode the research and this baker's own validated results. Do not invent new yeast numbers; when a schedule must change, reason from the plan's own times and temperatures.
- Be concrete and short: what it means, what to do now, what to watch for. Use minutes and grams. Plain words, no lecture.
- The poke test and the poolish's look override the clock; say so when relevant.
- If they describe something dangerous (mould, sour-milk smell), say discard.
- Never claim to see a photo you were not given.

=== MODEL DOCUMENT (how the app decides) ===
${CONTEXT.MODEL_DOC}

=== FIELD NOTES FROM THE BAKER'S PREVIOUS SESSIONS (validated in their kitchen) ===
${CONTEXT.FIELD_NOTES}`;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const enabled = !!process.env.ANTHROPIC_API_KEY;
  if (req.method === 'GET') { res.status(200).json({ enabled, model: enabled ? MODEL : null }); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'method not allowed' }); return; }
  if (!enabled) { res.status(503).json({ error: 'Coach is not configured: add ANTHROPIC_API_KEY to the Vercel project.' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  const turns = Array.isArray(body && body.messages) ? body.messages : null;
  if (!turns || !turns.length) { res.status(400).json({ error: 'messages required' }); return; }
  const messages = turns.slice(-MAX_TURNS).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, MAX_CHARS),
  })).filter(m => m.content.trim());
  if (!messages.length || messages[messages.length - 1].role !== 'user') { res.status(400).json({ error: 'last message must be from the user' }); return; }
  const plan = String((body && body.plan) || '').slice(0, 6000);

  const client = new Anthropic();
  res.status(200);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('X-Accel-Buffering', 'no');
  try {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 4000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'medium' },
      system: [
        { type: 'text', text: STATIC_SYSTEM, cache_control: { type: 'ephemeral' } },
        { type: 'text', text: plan ? `=== CURRENT PLAN (from the app, local times) ===\n${plan}` : '(The user has not generated a plan yet.)' },
      ],
      messages,
    });
    stream.on('text', (delta) => { res.write(delta); });
    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal') res.write('\n\n(I can\'t help with that one.)');
    else if (final.stop_reason === 'max_tokens') res.write('\n\n(…cut short — ask me to continue.)');
  } catch (error) {
    let msg = 'Something went wrong talking to the coach.';
    if (error instanceof Anthropic.AuthenticationError) msg = 'The API key in Vercel is invalid.';
    else if (error instanceof Anthropic.RateLimitError) msg = 'Rate limited — try again in a minute.';
    else if (error instanceof Anthropic.APIError) msg = `API error ${error.status}: ${error.message}`;
    res.write(`\n\n(${msg})`);
  }
  res.end();
};
module.exports.config = { maxDuration: 60 };
