// Tuki server – Cloudflare Worker
// 1. AI למורה, לתיקון כתיבה ועוד (Gemini) – המפתח נשאר כאן בסוד.
// 2. כיתות ולוח מורה – נשמרים ב-Cloudflare KV.
//
// הגדרות ב-Cloudflare (Settings → Variables and Secrets):
//   GEMINI_KEY      (Secret)  – המפתח מ-aistudio.google.com/apikey
//   ALLOWED_ORIGIN  (Text)    – https://ctcvyf8fbp-maker.github.io
//                               (אפשר כמה כתובות מופרדות בפסיק. כתובות האפליקציה מתווספות אוטומטית)
//   MODEL           (Text, לא חובה) – ברירת מחדל: gemini-flash-latest
// Bindings:
//   TUKI_KV         (KV namespace) – בשביל כיתות ולוח מורה
//   AI              (Workers AI)   – בשביל הקול האנושי (הקראה)

// הכתובות שמהן האפליקציה (Capacitor) רצה – באייפון ובאנדרואיד
const APP_ORIGINS = ['capacitor://localhost', 'https://localhost', 'http://localhost'];

export default {
  async fetch(req, env, ctx) {
    const origin = req.headers.get('Origin') || '';
    const site = (env.ALLOWED_ORIGIN || '*').split(',').map(x => x.trim()).filter(Boolean);
    const openToAll = site.includes('*');
    const okOrigin = openToAll || site.includes(origin) || APP_ORIGINS.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': openToAll ? '*' : (okOrigin ? origin : site[0]),
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
      'Vary': 'Origin',
    };
    const json = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, 'content-type': 'application/json' } });

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(req.url);
    if (req.method === 'GET' && url.pathname === '/tts') {
      if (!okOrigin) return json({ error: 'origin' }, 403);
      return tts(url, env, ctx, cors, json);
    }
    if (req.method !== 'POST') return json({ ok: true, name: 'Tuki AI', version: 2, classes: !!env.TUKI_KV, voice: !!env.AI });
    if (!okOrigin) return json({ error: 'origin' }, 403);

    let body;
    try { body = await req.json(); } catch { return json({ error: 'bad_json' }, 400); }

    const path = url.pathname;
    if (path.startsWith('/class')) return classApi(path, body || {}, env, json);
    if (path.startsWith('/room')) return roomApi(path, body || {}, env, json);

    // ---- AI ----
    const prompt = body && body.prompt;
    if (typeof prompt !== 'string' || !prompt || prompt.length > 12000) return json({ error: 'bad_prompt' }, 400);
    const model = env.MODEL || 'gemini-flash-latest';
    // תמונה (למצלמה ← מילה) – לא חובה
    const img = body.image;
    const hasImg = !!(img && typeof img.data === 'string' && img.data.length > 0);
    if (hasImg && (img.data.length > 2_000_000 || !/^image\/(jpeg|png|webp)$/.test(img.mime || ''))) return json({ error: 'bad_image' }, 400);
    const parts = [{ text: prompt }];
    if (hasImg) parts.push({ inline_data: { mime_type: img.mime, data: img.data } });
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_KEY },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: { responseMimeType: 'application/json', temperature: hasImg ? 0.4 : 0.7 },
      }),
    });
    if (!r.ok) return json({ error: 'upstream', status: r.status }, r.status === 429 ? 429 : 502);
    const j = await r.json();
    const text = (j.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('');
    return json({ text, img: hasImg });
  },
};

// ---------------- Natural voice (Workers AI, cached) ----------------
async function tts(url, env, ctx, cors, json) {
  if (!env.AI) return json({ error: 'no_ai' }, 500);
  const text = (url.searchParams.get('t') || '').slice(0, 1200).trim();
  if (!text) return json({ error: 'no_text' }, 400);
  const model = env.TTS_MODEL || '@cf/deepgram/aura-1';
  const VOICES = ['luna', 'asteria', 'stella', 'athena', 'hera', 'orion', 'arcas', 'perseus', 'orpheus', 'helios', 'zeus', 'angus'];
  const speaker = VOICES.includes(url.searchParams.get('v')) ? url.searchParams.get('v') : 'luna';
  const cache = caches.default;
  const key = new Request('https://tuki-tts.cache/' + encodeURIComponent(model) + '/' + speaker + '/' + encodeURIComponent(text));
  const hdr = ct => ({ ...cors, 'content-type': ct || 'audio/mpeg', 'cache-control': 'public, max-age=2592000' });
  const hit = await cache.match(key);
  if (hit) return new Response(hit.body, { headers: hdr(hit.headers.get('content-type')) });
  let audio, ct = 'audio/mpeg';
  try {
    const r = await env.AI.run(model, { text, speaker }, { returnRawResponse: true });
    if (r instanceof Response) {
      if (!r.ok) return json({ error: 'tts' }, 502);
      ct = r.headers.get('content-type') || ct;
      audio = await r.arrayBuffer();
    } else if (r && r.audio) {
      audio = Uint8Array.from(atob(r.audio), c => c.charCodeAt(0)).buffer;
    } else {
      audio = await new Response(r).arrayBuffer();
    }
  } catch (e) {
    return json({ error: 'tts', detail: String(e).slice(0, 200) }, 502);
  }
  ctx.waitUntil(cache.put(key, new Response(audio, { headers: { 'content-type': ct, 'cache-control': 'public, max-age=2592000' } })));
  return new Response(audio, { headers: hdr(ct) });
}

// ---------------- Classes ----------------
const CODE_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ID_ABC = 'abcdefghijkmnpqrstuvwxyz23456789';
function rnd(n, abc) {
  const a = crypto.getRandomValues(new Uint8Array(n));
  return [...a].map(x => abc[x % abc.length]).join('');
}
const clean = (s, n) => String(s ?? '').slice(0, n).trim();
const num = v => Math.max(0, Math.min(1e9, Math.round(+v || 0)));

async function classApi(path, b, env, json) {
  const KV = env.TUKI_KV;
  if (!KV) return json({ error: 'no_kv' }, 500);

  if (path === '/class/create') {
    const name = clean(b.name, 60) || 'My class';
    let code = '';
    for (let i = 0; i < 6; i++) { code = rnd(6, CODE_ABC); if (!(await KV.get('class:' + code))) break; }
    const key = rnd(24, ID_ABC);
    await KV.put('class:' + code, JSON.stringify({ name, key, message: '', created: Date.now() }));
    return json({ code, key, name });
  }

  const code = clean(b.code, 10).toUpperCase();
  const raw = code && (await KV.get('class:' + code));
  if (!raw) return json({ error: 'no_class' }, 404);
  const cls = JSON.parse(raw);

  if (path === '/class/join') {
    const name = clean(b.name, 40);
    if (!name) return json({ error: 'no_name' }, 400);
    const id = rnd(12, ID_ABC);
    await KV.put(`s:${code}:${id}`, '1', { metadata: { name, joined: Date.now(), last: Date.now() } });
    return json({ id, className: cls.name, message: cls.message || '' });
  }

  if (path === '/class/progress') {
    const id = clean(b.id, 20);
    const k = `s:${code}:${id}`;
    const cur = await KV.getWithMetadata(k);
    if (!cur || cur.value === null) return json({ error: 'no_student' }, 404);
    const d = b.data || {};
    const m = cur.metadata || {};
    await KV.put(k, '1', { metadata: {
      name: m.name || '?', joined: m.joined || Date.now(), last: Date.now(),
      lvl: clean(d.lvl, 3), xp: num(d.xp), streak: num(d.streak), words: num(d.words),
      lessons: num(d.lessons), acc: Math.min(100, num(d.acc)), week: num(d.week),
    } });
    return json({ ok: true, className: cls.name, message: cls.message || '' });
  }

  // טבלת מובילים לתלמידים בכיתה – רק שם ונקודות
  if (path === '/class/board') {
    const students = [];
    let cursor;
    do {
      const list = await KV.list({ prefix: `s:${code}:`, cursor });
      for (const k of list.keys) {
        const m = k.metadata || {};
        students.push({ id: k.name.split(':')[2], name: m.name || '?', week: m.week || 0, streak: m.streak || 0, lvl: m.lvl || '' });
      }
      cursor = list.list_complete ? null : list.cursor;
    } while (cursor);
    students.sort((a, b) => b.week - a.week);
    return json({ name: cls.name, students: students.slice(0, 50) });
  }

  // ---- teacher only ----
  if (cls.key !== clean(b.key, 40)) return json({ error: 'bad_key' }, 403);

  if (path === '/class/view') {
    const students = [];
    let cursor;
    do {
      const list = await KV.list({ prefix: `s:${code}:`, cursor });
      for (const k of list.keys) students.push({ id: k.name.split(':')[2], ...(k.metadata || {}) });
      cursor = list.list_complete ? null : list.cursor;
    } while (cursor);
    return json({ name: cls.name, message: cls.message || '', students });
  }
  if (path === '/class/message') {
    cls.message = clean(b.message, 300);
    await KV.put('class:' + code, JSON.stringify(cls));
    return json({ ok: true });
  }
  if (path === '/class/remove') {
    await KV.delete(`s:${code}:${clean(b.id, 20)}`);
    return json({ ok: true });
  }
  return json({ error: 'not_found' }, 404);
}

// ---------------- Duels & class quiz (rooms) ----------------
const ROOM_TTL = 60 * 60 * 24 * 3; // 3 ימים
async function roomApi(path, b, env, json) {
  const KV = env.TUKI_KV;
  if (!KV) return json({ error: 'no_kv' }, 500);
  const LV = ['A1', 'A2', 'B1', 'B2', 'C1'];

  if (path === '/room/create') {
    const kind = b.kind === 'quiz' ? 'quiz' : 'duel';
    const lvl = LV.includes(b.lvl) ? b.lvl : 'A2';
    const n = [10, 15, 20].includes(+b.n) ? +b.n : 10;
    let code = '';
    for (let i = 0; i < 6; i++) { code = rnd(5, CODE_ABC); if (!(await KV.get('room:' + code))) break; }
    const room = { kind, lvl, n, seed: crypto.getRandomValues(new Uint32Array(1))[0], name: clean(b.name, 60), created: Date.now() };
    await KV.put('room:' + code, JSON.stringify(room), { expirationTtl: ROOM_TTL });
    return json({ code, room });
  }

  const code = clean(b.code, 10).toUpperCase();
  const raw = code && (await KV.get('room:' + code));
  if (!raw) return json({ error: 'no_room' }, 404);
  const room = JSON.parse(raw);

  if (path === '/room/join') {
    const name = clean(b.name, 40);
    if (!name) return json({ error: 'no_name' }, 400);
    const id = rnd(10, ID_ABC);
    await KV.put(`rp:${code}:${id}`, '1', { expirationTtl: ROOM_TTL, metadata: { name, score: 0, correct: 0, done: false, t: Date.now() } });
    return json({ id, room });
  }
  if (path === '/room/submit') {
    const id = clean(b.id, 20);
    const k = `rp:${code}:${id}`;
    const cur = await KV.getWithMetadata(k);
    if (!cur || cur.value === null) return json({ error: 'no_player' }, 404);
    const m = cur.metadata || {};
    if (m.done) return json({ ok: true });
    await KV.put(k, '1', { expirationTtl: ROOM_TTL, metadata: { name: m.name || '?', score: Math.min(num(b.score), 5000), correct: Math.min(num(b.correct), 50), done: true, t: Date.now() } });
    return json({ ok: true });
  }
  if (path === '/room/get') {
    const players = [];
    let cursor;
    do {
      const list = await KV.list({ prefix: `rp:${code}:`, cursor });
      for (const k of list.keys) players.push({ id: k.name.split(':')[2], ...(k.metadata || {}) });
      cursor = list.list_complete ? null : list.cursor;
    } while (cursor);
    return json({ room: { kind: room.kind, lvl: room.lvl, n: room.n, name: room.name }, players });
  }
  return json({ error: 'not_found' }, 404);
}
