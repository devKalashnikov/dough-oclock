// Dough O'Clock service worker: the app shell works offline in the kitchen.
// Pages and same-origin files are network-first (so a deploy shows up immediately) with a cache fallback;
// Google Fonts are cache-first. The API and the weather service are never cached.
const V = 'dough-oclock-v1';
const SHELL = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL).catch(() => {})));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.pathname.startsWith('/api/') || u.hostname.includes('open-meteo.com')) return;
  const same = u.origin === self.location.origin;
  const fonts = u.hostname.endsWith('fonts.googleapis.com') || u.hostname.endsWith('fonts.gstatic.com');
  if (!same && !fonts) return;
  if (fonts) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(V).then(c => c.put(req, copy)); return res; })));
    return;
  }
  e.respondWith(
    fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req).then(hit => hit || (req.mode === 'navigate' ? caches.match('/') : undefined)))
  );
});
