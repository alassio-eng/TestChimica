/* Service worker — funzionamento offline dopo la prima apertura.
   Guscio dell'applicazione in cache-first, domande in network-first
   così un lotto nuovo viene raccolto appena il dispositivo è online. */

const VERSIONE = 'v4';
const CACHE_SHELL = 'banco-chimica-shell-' + VERSIONE;
const CACHE_DATI = 'banco-chimica-dati-' + VERSIONE;

const SHELL = [
  './',
  'index.html',
  'style.css',
  'app.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/icon-180.png'
];

async function cacheDomande() {
  const cache = await caches.open(CACHE_DATI);
  const risposta = await fetch('questions/index.json', { cache: 'reload' });
  if (!risposta.ok) throw new Error('indice non disponibile');
  await cache.put('questions/index.json', risposta.clone());
  const indice = await risposta.json();
  const lotti = Array.isArray(indice.lotti) ? indice.lotti : [];
  await Promise.all(lotti.map(async file => {
    try {
      const r = await fetch('questions/' + file, { cache: 'reload' });
      if (r.ok) await cache.put('questions/' + file, r.clone());
    } catch (e) { /* lotto non raggiungibile: resta quello in cache */ }
  }));
}

self.addEventListener('install', ev => {
  ev.waitUntil((async () => {
    const cache = await caches.open(CACHE_SHELL);
    await cache.addAll(SHELL);
    try { await cacheDomande(); } catch (e) { /* offline al primo avvio */ }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', ev => {
  ev.waitUntil((async () => {
    const nomi = await caches.keys();
    await Promise.all(nomi
      .filter(n => n.startsWith('banco-chimica-') && n !== CACHE_SHELL && n !== CACHE_DATI)
      .map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', ev => {
  if (ev.data && ev.data.tipo === 'aggiorna-banco') {
    ev.waitUntil(cacheDomande().catch(() => {}));
  }
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // navigazione: serve sempre il guscio
  if (req.mode === 'navigate') {
    ev.respondWith((async () => {
      try {
        return await fetch(req);
      } catch (e) {
        const cache = await caches.open(CACHE_SHELL);
        return (await cache.match('index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  // domande: rete se possibile, altrimenti cache
  if (url.pathname.includes('/questions/')) {
    ev.respondWith((async () => {
      const cache = await caches.open(CACHE_DATI);
      try {
        const r = await fetch(req);
        if (r.ok) cache.put(req, r.clone());
        return r;
      } catch (e) {
        const c = await cache.match(req, { ignoreSearch: true });
        if (c) return c;
        throw e;
      }
    })());
    return;
  }

  // resto: cache prima, con aggiornamento in sottofondo
  ev.respondWith((async () => {
    const cache = await caches.open(CACHE_SHELL);
    const c = await cache.match(req, { ignoreSearch: true });
    const rete = fetch(req).then(r => {
      if (r.ok) cache.put(req, r.clone());
      return r;
    }).catch(() => null);
    return c || (await rete) || Response.error();
  })());
});
