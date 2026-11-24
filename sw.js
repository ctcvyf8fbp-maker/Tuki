// Tuki – מאפשר לפתוח את האתר גם בלי אינטרנט (התרגול עם המילים עובד, AI וקול טבעי צריכים חיבור)
const CACHE_NAME = 'tuki-v2';
const FILES = ['./', './index.html', './extras.js?v=2', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
// קודם מהאינטרנט (כדי לקבל תמיד את הגרסה החדשה), ואם אין חיבור – מהעותק השמור
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // שרת ה-AI, גוגל פונטים וכו' – לא נוגעים
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
