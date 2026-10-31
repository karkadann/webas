// Service worker of the hosted page: it also loads WITHOUT internet (no coverage), the link to the
// app being local anyway. Cache first: the page shows at once, even on a weak network (network first
// made it wait up to 3 s), then its files are fetched again in the background for the next opening —
// a published version thus shows up one opening later.
// ⚠️ Caches nothing from GitHub: the browser rechecks this file by itself on every online opening.
const CACHE = 'webas-1';
const FILES = ['./', 'index.html', 'config.js', 'certs.js', 'favicon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  // ⛔ Key = the request's PATH (query ignored), so each page keeps its identity: another page is
  // not served in place of index.html.
  const key = url.pathname;
  e.respondWith(caches.open(CACHE).then(async (c) => {
    // `no-cache`: revalidated with GitHub (ETag), not taken from its 10-min HTTP cache.
    const fresh = fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then((r) => {
      if (r.ok) return c.put(key, r.clone()).then(() => r);
      return r;
    }).catch(() => null);
    const kept = await c.match(key, { ignoreSearch: true });
    if (kept) {
      e.waitUntil(fresh);
      return kept;
    }
    return (await fresh) || new Response('offline', { status: 504 });
  }));
});
