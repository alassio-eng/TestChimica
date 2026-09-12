/* Service worker — funzionamento offline dopo la prima apertura.
   Guscio dell'applicazione in cache-first, domande in network-first
   così un lotto nuovo viene raccolto appena il dispositivo è online.

   Il banco è multi-materia: si parte dal manifest questions/index.json,
   si leggono gli indici delle singole materie e da lì i loro lotti. */

const VERSIONE = 'v10';
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

async function metti(cache, url) {
  const r = await fetch(url, { cache: 'reload' });
  if (!r.ok) throw new Error(url + ' → ' + r.status);
  await cache.put(url, r.clone());
  return r.json();
}

async function cacheDomande() {
  const cache = await caches.open(CACHE_DATI);
  const manifest = await metti(cache, 'questions/index.json');
  const materie = manifest.materie || [];
  await Promise.all(materie.map(async voce => {
    const dir = 'questions/' + (voce.cartella || voce.id) + '/';
    try {
      const idx = await metti(cache, dir + 'index.json');
      await Promise.all((idx.lotti || []).map(f => metti(cache, dir + f).catch(() => null)));
    } catch (e) { /* materia non ancora pubblicata: si prosegue con le altre */ }
  }));
}

self.addEventListener('install', ev => {
  // sincrono e per primo: chiamato in fondo a una catena di await, Chromium
  // lascia il nuovo service worker in attesa e la versione appena pubblicata
  // entra in funzione solo alla chiusura successiva dell'app.
  self.skipWaiting();
  ev.waitUntil((async () => {
    const cache = await caches.open(CACHE_SHELL);
    // cache.addAll() userebbe la cache HTTP del browser e potrebbe congelare
    // nel guscio nuovo i file della versione precedente: 'reload' garantisce
    // che a essere messo in cache sia davvero ciò che il server ha adesso.
    await Promise.all(SHELL.map(async url => {
      const r = await fetch(url, { cache: 'reload' });
      if (!r.ok) throw new Error(url + ' → ' + r.status);
      await cache.put(url, r);
    }));
    try { await cacheDomande(); } catch (e) { /* offline al primo avvio */ }
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
        // 'no-cache' rivalida col server invece di accontentarsi della cache
        // HTTP: è ciò che fa comparire un lotto nuovo alla prima apertura.
        const r = await fetch(req.url, { cache: 'no-cache' });
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
