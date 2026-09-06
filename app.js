/* ===========================================================
   Banco domande · semestre filtro
   Applicazione statica multi-materia, nessuna dipendenza esterna.

   Le materie, le loro unità didattiche e il formato dei test non
   sono scritti nel codice: stanno in questions/index.json e in
   questions/<materia>/index.json. Aggiungere una materia significa
   aggiungere una cartella, non modificare questo file.
   =========================================================== */

'use strict';

/* ----------------------------------------------------------
   1. Costanti
   ---------------------------------------------------------- */

const MAX_RIPASSO = 31;                  // tetto per i test di errori e ripasso
const GIORNO = 86400000;
const RIPASSO_1 = 3 * GIORNO;
const RIPASSO_2 = 10 * GIORNO;
const STORE_KEY = 'bancoChimica.v1';     // slot storico: il contenuto è migrato, non la chiave
const MATERIA_KEY = 'bancoChimica.materia';
const SCHEMA_STATO = 2;

/* Formato di riserva, usato solo se una materia non lo dichiara. */
const FORMATO_DEFAULT = {
  unita:    { totale: 15, multipla: 8,  completamento: 7  },
  completo: { totale: 31, multipla: 15, completamento: 16 }
};

/* ----------------------------------------------------------
   2. Utilità
   ---------------------------------------------------------- */

const $ = sel => document.querySelector(sel);
const el = (tag, cls, txt) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (txt != null) n.textContent = txt;
  return n;
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const p = n => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${p(m)}:${p(r)}` : `${p(m)}:${p(r)}`;
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function plur(n, uno, molti) { return n === 1 ? uno : molti; }

let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3600);
}

/* Normalizzazione delle risposte a completamento:
   minuscole, accenti rimossi, punteggiatura via, articoli iniziali via. */
function normalizza(s) {
  return String(s == null ? '' : s)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['’`]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(il|lo|la|i|gli|le|un|uno|una|del|della|dei|delle|di|d)\s+/, '')
    .trim();
}

const NUMERI = {
  zero: '0', uno: '1', una: '1', due: '2', tre: '3', quattro: '4', cinque: '5',
  sei: '6', sette: '7', otto: '8', nove: '9', dieci: '10', undici: '11',
  dodici: '12', tredici: '13', quattordici: '14', quindici: '15', sedici: '16',
  diciassette: '17', diciotto: '18', diciannove: '19', venti: '20'
};

function chiaviRisposta(s) {
  const n = normalizza(s);
  const set = new Set([n]);
  if (NUMERI[n]) set.add(NUMERI[n]);
  for (const [parola, cifra] of Object.entries(NUMERI)) if (cifra === n) set.add(parola);
  return set;
}

function rispostaCorretta(q, data) {
  if (q.tipo === 'multipla') return Number(data) === Number(q.corretta);
  if (!data) return false;
  const date = chiaviRisposta(data);
  if (!date.size || [...date][0] === '') return false;
  return (q.accettate || []).some(acc => {
    const ok = chiaviRisposta(acc);
    for (const d of date) if (ok.has(d)) return true;
    return false;
  });
}

function testoCorretto(q) {
  if (q.tipo === 'multipla') return `${String.fromCharCode(65 + q.corretta)}) ${q.opzioni[q.corretta]}`;
  return (q.accettate || []).join('  ·  ');
}

/* ----------------------------------------------------------
   3. Stato persistente
   ---------------------------------------------------------- */

const statoVuoto = () => ({
  schema: SCHEMA_STATO,
  creato: new Date().toISOString(),
  viste: {},     // "materia/id" -> { n, ultima, ultimaEsatta }
  errori: {},    // "materia/id" -> { n, ultimoErrore, stage, scadenza, risolto }
  sessioni: []   // { id, data, materia, ambito, durata, punteggio, totale, perUnita, voci }
});

let stato = statoVuoto();

/* Prima della versione multi-materia le chiavi erano il solo id della
   domanda e tutto apparteneva alla chimica: qui vengono qualificate,
   così lo storico sopravvive all'aggiornamento. */
function migra(s) {
  if ((s.schema || 1) >= SCHEMA_STATO) return s;
  const pfx = o => Object.fromEntries(Object.entries(o || {})
    .map(([k, v]) => [k.includes('/') ? k : 'chimica/' + k, v]));
  s.viste = pfx(s.viste);
  s.errori = pfx(s.errori);
  (s.sessioni || []).forEach(ss => {
    ss.materia = ss.materia || 'chimica';
    (ss.voci || []).forEach(v => { if (!v.id.includes('/')) v.id = 'chimica/' + v.id; });
  });
  s.schema = SCHEMA_STATO;
  s.migratoIl = new Date().toISOString();
  return s;
}

function caricaStato() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const letto = JSON.parse(raw);
      const daMigrare = (letto.schema || 1) < SCHEMA_STATO;
      stato = Object.assign(statoVuoto(), migra(letto));
      stato.viste = stato.viste || {};
      stato.errori = stato.errori || {};
      stato.sessioni = stato.sessioni || [];
      // la migrazione viene riscritta subito: così su disco e in memoria
      // c'è la stessa cosa, e non va rifatta a ogni apertura
      if (daMigrare) salvaStato();
    }
  } catch (e) {
    console.warn('Stato illeggibile, riparto da zero.', e);
    stato = statoVuoto();
  }
}

function salvaStato() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(stato));
  } catch (e) {
    toast('Impossibile salvare i progressi su questo dispositivo.');
    console.error(e);
  }
}

/* chiave di storico: la materia qualifica l'id, così due materie
   possono usare gli stessi codici di unità senza collidere */
const chiave = (materiaId, qid) => materiaId + '/' + qid;
const vistaDi = q => stato.viste[chiave(q.materia, q.id)];
const erroreDi = q => stato.errori[chiave(q.materia, q.id)];

function registraRisposta(q, esatta, quando) {
  const k = chiave(q.materia, q.id);
  const ora = quando || new Date().toISOString();
  const v = stato.viste[k] || { n: 0, ultima: null, ultimaEsatta: null };
  v.n += 1; v.ultima = ora; v.ultimaEsatta = esatta;
  stato.viste[k] = v;

  const e = stato.errori[k];
  if (!esatta) {
    stato.errori[k] = {
      n: (e ? e.n : 0) + 1,
      ultimoErrore: ora,
      stage: 0,
      scadenza: new Date(Date.parse(ora) + RIPASSO_1).toISOString(),
      risolto: null
    };
  } else if (e && !e.risolto) {
    if (e.stage === 0) {
      const teorica = Date.parse(e.ultimoErrore) + RIPASSO_2;
      e.stage = 1;
      e.scadenza = new Date(Math.max(teorica, Date.parse(ora) + (RIPASSO_2 - RIPASSO_1))).toISOString();
    } else {
      e.stage = 2; e.scadenza = null; e.risolto = ora;
    }
    stato.errori[k] = e;
  }
}

/* Errori aperti, per materia (o per tutte se materiaId è null) */
function erroriAperti(materiaId) {
  return Object.entries(stato.errori)
    .filter(([k, e]) => !e.risolto && (!materiaId || k.startsWith(materiaId + '/')))
    .map(([k, e]) => ({ chiave: k, qid: k.slice(k.indexOf('/') + 1), materia: k.slice(0, k.indexOf('/')), ...e }));
}

function ripassiInScadenza(materiaId) {
  const ora = Date.now();
  return erroriAperti(materiaId).filter(e => e.scadenza && Date.parse(e.scadenza) <= ora);
}

/* ----------------------------------------------------------
   4. Banco domande
   ---------------------------------------------------------- */

const banco = { materie: [], perId: {}, errori: [] };
let materiaCorrente = null;

const M = () => materiaCorrente;
const unitaDi = m => (m && m.unita) || [];
const unitaPerId = (m, id) => unitaDi(m).find(u => u.id === id);

async function caricaBanco(forzaRete) {
  const opt = forzaRete ? { cache: 'reload' } : {};
  const leggi = async (url) => {
    const r = await fetch(url, opt);
    if (!r.ok) throw new Error(url + ' → ' + r.status);
    return r.json();
  };

  const manifest = await leggi('questions/index.json');
  const problemi = [];
  const materie = [];

  for (const voce of (manifest.materie || [])) {
    const dir = 'questions/' + (voce.cartella || voce.id) + '/';
    const m = {
      id: voce.id,
      nome: voce.nome || voce.id,
      abbrev: voce.abbrev || voce.id.slice(0, 3).toUpperCase(),
      dir,
      formato: FORMATO_DEFAULT,
      unita: [], lotti: [], domande: [], perUnita: {}
    };
    try {
      const idx = await leggi(dir + 'index.json');
      m.nome = idx.nome || m.nome;
      m.formato = Object.assign({}, FORMATO_DEFAULT, idx.formato || {});
      m.unita = (idx.unita || []).map(u => Object.assign({ quota: 0, obiettivo: 0 }, u));
      m.lotti = idx.lotti || [];
      m.aggiornato = idx.aggiornato || null;
    } catch (e) {
      problemi.push(`Materia ${voce.id}: indice non caricato (${e.message})`);
    }

    for (const file of m.lotti) {
      try {
        const dati = await leggi(dir + file);
        const lista = Array.isArray(dati) ? dati : (dati.domande || []);
        lista.forEach((q, i) => {
          const err = validaDomanda(q, m, file, i);
          if (err) { problemi.push(err); return; }
          q.materia = m.id;
          const k = chiave(m.id, q.id);
          if (banco.perId[k]) { problemi.push(`Id duplicato ignorato: ${k}`); return; }
          banco.perId[k] = q;
          m.domande.push(q);
        });
      } catch (e) {
        problemi.push(`Lotto ${m.id}/${file} non caricato: ${e.message}`);
      }
    }

    m.perUnita = {};
    for (const u of m.unita) m.perUnita[u.id] = [];
    for (const q of m.domande) (m.perUnita[q.unita] = m.perUnita[q.unita] || []).push(q);
    materie.push(m);
  }

  banco.materie = materie;
  banco.errori = problemi;
  banco.aggiornato = manifest.aggiornato || null;
  if (problemi.length) console.warn('Problemi nel banco domande:', problemi);

  // materia selezionata: quella salvata, altrimenti la prima con domande
  let scelto = null;
  try { scelto = localStorage.getItem(MATERIA_KEY); } catch (e) { /* niente */ }
  materiaCorrente = materie.find(m => m.id === scelto)
    || materie.find(m => m.domande.length)
    || materie[0] || null;
}

function validaDomanda(q, m, file, i) {
  const dove = `${m.id}/${file}[${i}]`;
  if (!q || typeof q !== 'object') return `${dove}: voce non valida`;
  if (!q.id) return `${dove}: manca l'id`;
  if (!unitaPerId(m, q.unita)) return `${m.id}/${q.id}: unità sconosciuta «${q.unita}»`;
  if (!q.testo) return `${m.id}/${q.id}: manca il testo`;
  if (q.tipo === 'multipla') {
    if (!Array.isArray(q.opzioni) || q.opzioni.length < 2) return `${m.id}/${q.id}: opzioni mancanti`;
    if (!Number.isInteger(q.corretta) || q.corretta < 0 || q.corretta >= q.opzioni.length) {
      return `${m.id}/${q.id}: indice della risposta corretta non valido`;
    }
  } else if (q.tipo === 'completamento') {
    if (!Array.isArray(q.accettate) || !q.accettate.length) return `${m.id}/${q.id}: risposte accettate mancanti`;
  } else {
    return `${m.id}/${q.id}: tipo sconosciuto «${q.tipo}»`;
  }
  return null;
}

/* ----------------------------------------------------------
   5. Composizione del test
   ---------------------------------------------------------- */

/* Ripartisce `totale` domande fra le unità secondo le quote
   dichiarate dalla materia, con il metodo dei resti maggiori. */
function ripartisci(m, totale) {
  const unita = unitaDi(m);
  const somma = unita.reduce((s, u) => s + (u.quota || 0), 0) || unita.length || 1;
  const grezzi = unita.map(u => ({ key: u.id, val: totale * (u.quota || 0) / somma }));
  const out = {};
  let assegnate = 0;
  for (const g of grezzi) { out[g.key] = Math.floor(g.val); assegnate += out[g.key]; }
  const resti = grezzi.map(g => ({ key: g.key, r: g.val - Math.floor(g.val) })).sort((a, b) => b.r - a.r);
  let i = 0;
  while (assegnate < totale && resti.length) {
    out[resti[i % resti.length].key] += 1; assegnate += 1; i += 1;
  }
  return out;
}

/* Ripartisce le domande a risposta multipla fra le unità, in proporzione
   alla quota di ciascuna. */
function ripartisciTipi(m, quote, fmt) {
  const unita = unitaDi(m);
  const grezzi = unita.map(u => ({ key: u.id, val: (quote[u.id] || 0) * fmt.multipla / fmt.totale }));
  const mult = {};
  let assegnate = 0;
  for (const g of grezzi) { mult[g.key] = Math.floor(g.val); assegnate += mult[g.key]; }
  const resti = grezzi.map(g => ({ key: g.key, r: g.val - Math.floor(g.val) })).sort((a, b) => b.r - a.r);
  let i = 0;
  while (assegnate < fmt.multipla && i < resti.length * 4) {
    const k = resti[i % resti.length].key;
    if (mult[k] < (quote[k] || 0)) { mult[k] += 1; assegnate += 1; }
    i += 1;
  }
  const out = {};
  for (const u of unita) out[u.id] = { multipla: mult[u.id], completamento: (quote[u.id] || 0) - mult[u.id] };
  return out;
}

function prioritaRipescaggio(a, b) {
  // prima le sbagliate (più errori, errore più recente), poi le più vecchie
  const ea = erroreDi(a), eb = erroreDi(b);
  const aperta = e => e && !e.risolto;
  if (aperta(ea) !== aperta(eb)) return aperta(ea) ? -1 : 1;
  if (aperta(ea) && aperta(eb)) {
    if (eb.n !== ea.n) return eb.n - ea.n;
    return Date.parse(eb.ultimoErrore) - Date.parse(ea.ultimoErrore);
  }
  const va = vistaDi(a), vb = vistaDi(b);
  return Date.parse((va && va.ultima) || 0) - Date.parse((vb && vb.ultima) || 0);
}

/* Estrae `n` domande di un dato tipo da una unità: prima quelle mai
   somministrate, poi le già viste con la precedenza a quelle sbagliate. */
function estrai(m, k, tipo, n, prese) {
  if (n <= 0) return { presi: [], ripescate: 0, mancano: 0 };
  const pool = (m.perUnita[k] || []).filter(q => q.tipo === tipo && !prese.has(q.id));
  const presi = shuffle(pool.filter(q => !vistaDi(q))).slice(0, n);
  let ripescate = 0;
  if (presi.length < n) {
    const extra = pool.filter(q => vistaDi(q)).sort(prioritaRipescaggio).slice(0, n - presi.length);
    presi.push(...extra);
    ripescate = extra.length;
  }
  presi.forEach(q => prese.add(q.id));
  return { presi, ripescate, mancano: n - presi.length };
}

/**
 * Compone un test per la materia corrente.
 * @param ambito 'all' oppure l'id di una unità della materia
 */
function componiTest(ambito) {
  const m = M();
  if (!m) return { domande: [], avvisi: [] };
  const tutto = ambito === 'all';
  const fmt = tutto ? m.formato.completo : m.formato.unita;
  const disponibili = tutto ? m.domande : (m.perUnita[ambito] || []);
  if (!disponibili.length) return { domande: [], avvisi: [] };

  const richieste = tutto
    ? ripartisciTipi(m, ripartisci(m, fmt.totale), fmt)
    : { [ambito]: { multipla: fmt.multipla, completamento: fmt.completamento } };

  const chiavi = tutto ? unitaDi(m).map(u => u.id) : [ambito];
  const avvisi = [];
  const prese = new Set();
  const scelte = [];

  for (const k of chiavi) {
    const req = richieste[k];
    if (!req || (req.multipla + req.completamento) === 0) continue;
    let ripescate = 0;
    const mancanti = { multipla: 0, completamento: 0 };

    for (const tipo of ['multipla', 'completamento']) {
      const r = estrai(m, k, tipo, req[tipo], prese);
      scelte.push(...r.presi);
      ripescate += r.ripescate;
      mancanti[tipo] = r.mancano;
    }

    // un tipo esaurito viene compensato con l'altro, nella stessa unità
    for (const [tipo, altro] of [['multipla', 'completamento'], ['completamento', 'multipla']]) {
      if (mancanti[tipo] <= 0) continue;
      const r = estrai(m, k, altro, mancanti[tipo], prese);
      scelte.push(...r.presi);
      ripescate += r.ripescate;
      if (r.presi.length) {
        avvisi.push(`${k.toUpperCase()}: nel banco non ci sono abbastanza domande a ${tipo === 'multipla' ? 'risposta multipla' : 'completamento'}. Il test ne contiene ${req[tipo] - mancanti[tipo]} invece di ${req[tipo]}, e la differenza è coperta con domande dell'altro tipo.`);
      }
      mancanti[tipo] = r.mancano;
    }

    if (ripescate) {
      avvisi.push(`${k.toUpperCase()}: le domande mai somministrate sono esaurite. ${ripescate} ${plur(ripescate, 'domanda già vista è stata ripescata', 'domande già viste sono state ripescate')}, dando la precedenza a quelle sbagliate.`);
    }
  }

  if (tutto && scelte.length < fmt.totale) {
    const mancaTipo = {
      multipla: fmt.multipla - scelte.filter(q => q.tipo === 'multipla').length,
      completamento: fmt.completamento - scelte.filter(q => q.tipo === 'completamento').length
    };
    const resto = m.domande.filter(q => !prese.has(q.id));
    const coda = shuffle(resto.filter(q => !vistaDi(q)))
      .concat(resto.filter(q => vistaDi(q)).sort(prioritaRipescaggio));
    for (const passata of [1, 2]) {
      for (const q of coda) {
        if (scelte.length >= fmt.totale) break;
        if (prese.has(q.id)) continue;
        if (passata === 1 && mancaTipo[q.tipo] <= 0) continue;
        mancaTipo[q.tipo] -= 1;
        prese.add(q.id);
        scelte.push(q);
      }
    }
    avvisi.push(scelte.length < fmt.totale
      ? `Il banco di ${m.nome} contiene solo ${scelte.length} domande utilizzabili: il test ne ha ${scelte.length} invece di ${fmt.totale}.`
      : 'Alcune unità non avevano abbastanza domande: le quote sono state ridistribuite sulle altre.');
  }

  if (!tutto && scelte.length < fmt.totale) {
    avvisi.push(`${ambito.toUpperCase()}: il banco contiene solo ${scelte.length} domande di questa unità, invece delle ${fmt.totale} previste.`);
  }

  ordinaComeAppello(scelte);
  return { domande: scelte, avvisi };
}

/* Come nell'appello: prima le domande a risposta multipla. */
function ordinaComeAppello(lista) {
  lista.sort((a, b) => (a.tipo === b.tipo) ? 0 : (a.tipo === 'multipla' ? -1 : 1));
}

function componiTestDaElenco(chiavi, limite) {
  const q = chiavi.map(k => banco.perId[k]).filter(Boolean).sort(prioritaRipescaggio);
  const tagliate = limite > 0 ? q.slice(0, limite) : q;
  ordinaComeAppello(tagliate);
  return tagliate;
}

/* ----------------------------------------------------------
   6. Navigazione fra le schermate
   ---------------------------------------------------------- */

const VIEWS = ['home', 'test', 'results', 'errors', 'stats', 'data'];
let vistaCorrente = 'home';

function mostra(vista, titolo) {
  vistaCorrente = vista;
  VIEWS.forEach(v => { $('#view-' + v).hidden = (v !== vista); });
  $('#topbar-title').textContent = titolo || ('Banco domande · ' + (M() ? M().nome : 'semestre filtro'));
  $('#btn-home').hidden = (vista === 'home');
  $('#timer').hidden = (vista !== 'test');
  window.scrollTo(0, 0);
}

/* ----------------------------------------------------------
   6-bis. Tema chiaro / scuro
   ---------------------------------------------------------- */

const TEMA_KEY = 'bancoChimica.tema';
const TEMI = ['auto', 'light', 'dark'];
const TEMA_ETICHETTA = { auto: 'Tema: automatico', light: 'Tema: chiaro', dark: 'Tema: scuro' };

/* Icone disegnate a mano: i glifi Unicode di sole e luna non sono
   disponibili ovunque e in certi ambienti scadono nel carattere mancante. */
const SVG = (d) => '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" ' +
  'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
  'stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
const TEMA_ICONA = {
  auto:  SVG('<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16z" fill="currentColor" stroke="none"/>'),
  light: SVG('<circle cx="12" cy="12" r="4.4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/>'),
  dark:  SVG('<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z"/>')
};

function temaSalvato() {
  try {
    const t = localStorage.getItem(TEMA_KEY);
    return TEMI.includes(t) ? t : 'auto';
  } catch (e) { return 'auto'; }
}

function applicaTema(t) {
  if (t === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  const b = $('#btn-theme');
  if (b) {
    b.innerHTML = TEMA_ICONA[t];
    b.title = TEMA_ETICHETTA[t];
    b.setAttribute('aria-label', TEMA_ETICHETTA[t] + ' — tocca per cambiare');
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const c = getComputedStyle(document.documentElement).getPropertyValue('--topbar-bg').trim();
    if (c) meta.setAttribute('content', c);
  }
}

function ciclaTema() {
  const t = TEMI[(TEMI.indexOf(temaSalvato()) + 1) % TEMI.length];
  try { localStorage.setItem(TEMA_KEY, t); } catch (e) { /* niente da fare */ }
  applicaTema(t);
  toast(TEMA_ETICHETTA[t]);
}

/* ----------------------------------------------------------
   7. Schermata iniziale
   ---------------------------------------------------------- */

function cambiaMateria(id) {
  const m = banco.materie.find(x => x.id === id);
  if (!m) return;
  materiaCorrente = m;
  try { localStorage.setItem(MATERIA_KEY, id); } catch (e) { /* niente */ }
  renderHome();
  mostra('home');
}

function renderMaterie() {
  const cont = $('#subject-list');
  cont.innerHTML = '';
  if (banco.materie.length < 2) { cont.hidden = true; return; }
  cont.hidden = false;
  for (const m of banco.materie) {
    const b = el('button', 'subject' + (M() && m.id === M().id ? ' active' : ''));
    b.type = 'button';
    b.appendChild(el('span', 'subject-name', m.nome.split(' e ')[0].split(',')[0]));
    const dovuti = ripassiInScadenza(m.id).length;
    const meta = el('span', 'subject-meta');
    meta.textContent = m.domande.length ? `${m.domande.length} domande` : 'da riempire';
    b.appendChild(meta);
    if (dovuti) b.appendChild(el('span', 'badge', String(dovuti)));
    b.disabled = false;
    b.addEventListener('click', () => cambiaMateria(m.id));
    cont.appendChild(b);
  }
}

function renderFormato() {
  const m = M();
  const box = $('#format-info');
  box.innerHTML = '';
  if (!m) return;
  const f = m.formato;
  const quote = unitaDi(m).map(u => `${u.id.toUpperCase()} ${u.quota}`).join(' · ');
  const p1 = el('p', 'hint');
  p1.appendChild(el('strong', null, 'Tutto il programma'));
  p1.append(` — ${f.completo.totale} domande: ${f.completo.multipla} a risposta multipla e ${f.completo.completamento} a completamento`
    + (quote ? `, ripartite fra le unità secondo la proporzione ${quote}.` : '.'));
  const p2 = el('p', 'hint');
  p2.appendChild(el('strong', null, 'Singola unità'));
  p2.append(` — ${f.unita.totale} domande: ${f.unita.multipla} a risposta multipla e ${f.unita.completamento} a completamento.`);
  box.append(p1, p2, el('p', 'hint', 'In entrambi i casi vengono prima le domande a risposta multipla, poi quelle a completamento.'));
}

function renderHome() {
  const m = M();
  renderMaterie();
  renderFormato();

  const tot = m ? m.domande.length : 0;
  const inedite = m ? m.domande.filter(q => !vistaDi(q)).length : 0;
  const st = $('#bank-status');
  st.innerHTML = '';
  if (!m) {
    st.appendChild(el('p', null, 'Nessuna materia configurata in questions/index.json.'));
  } else if (!tot) {
    st.appendChild(el('p', null, `Il banco di ${m.nome} è vuoto: aggiungi un lotto in ${m.dir} e registralo nel suo index.json.`));
  } else {
    st.appendChild(el('p', null,
      `${m.nome}: ${tot} ${plur(tot, 'domanda', 'domande')} nel banco · ${inedite} mai ${plur(inedite, 'somministrata', 'somministrate')} su questo dispositivo.`));
  }
  if (banco.errori.length) {
    st.appendChild(el('p', null, `${banco.errori.length} ${plur(banco.errori.length, 'voce scartata', 'voci scartate')} per errori di formato (dettagli in console).`));
  }

  const dovuti = ripassiInScadenza(m && m.id).length;
  $('#review-due').hidden = dovuti === 0;
  if (dovuti) {
    $('#review-due-count').textContent = dovuti;
    $('#review-due-text').textContent =
      `${plur(dovuti, 'domanda sbagliata è', 'domande sbagliate sono')} in scadenza di ripasso (ripescaggio automatico a 3 e a 10 giorni dall'errore).`;
  }

  const lista = $('#unit-list');
  lista.innerHTML = '';
  if (!m || !unitaDi(m).length) {
    lista.appendChild(el('div', 'empty', m
      ? `Per ${m.nome} non è ancora definita nessuna unità didattica: vanno dichiarate in ${m.dir}index.json.`
      : ''));
    return;
  }

  const btnAll = el('button', 'unit full');
  btnAll.type = 'button';
  btnAll.append(el('div', 'unit-tag', '★'));
  const bodyAll = el('div', 'unit-body');
  bodyAll.appendChild(el('div', 'unit-name', 'Tutto il programma'));
  bodyAll.appendChild(el('div', 'unit-meta',
    `${m.formato.completo.totale} domande · ${m.formato.completo.multipla} a risposta multipla e ${m.formato.completo.completamento} a completamento · quote ufficiali per unità — ${inedite} inedite disponibili`));
  btnAll.appendChild(bodyAll);
  btnAll.disabled = tot === 0;
  btnAll.addEventListener('click', () => avviaTest('all'));
  lista.appendChild(btnAll);

  for (const u of unitaDi(m)) {
    const pool = m.perUnita[u.id] || [];
    const ined = pool.filter(q => !vistaDi(q)).length;
    const nm = pool.filter(q => q.tipo === 'multipla').length;
    const nc = pool.length - nm;
    const b = el('button', 'unit');
    b.type = 'button';
    b.append(el('div', 'unit-tag', u.id.toUpperCase()));
    const body = el('div', 'unit-body');
    body.appendChild(el('div', 'unit-name', u.nome));
    const meta = el('div', 'unit-meta');
    if (!pool.length) {
      meta.textContent = 'nessuna domanda nel banco';
    } else if (nm < m.formato.unita.multipla || nc < m.formato.unita.completamento) {
      meta.appendChild(el('span', 'exhausted', 'banco incompleto'));
      meta.append(` · ${nm} a risposta multipla e ${nc} a completamento, servono ${m.formato.unita.multipla} e ${m.formato.unita.completamento}`);
    } else if (ined === 0) {
      meta.appendChild(el('span', 'exhausted', 'inedite esaurite'));
      meta.append(` · ${pool.length} in totale, si ripescano le già viste`);
    } else {
      meta.textContent = `${m.formato.unita.totale} domande · ${ined} inedite su ${pool.length}`;
    }
    body.appendChild(meta);
    b.appendChild(body);
    b.disabled = pool.length === 0;
    b.addEventListener('click', () => avviaTest(u.id));
    lista.appendChild(b);
  }
}

/* ----------------------------------------------------------
   8. Svolgimento del test
   ---------------------------------------------------------- */

let sessione = null;   // { domande, risposte, indice, inizio, ambito, materia, timer }

function avviaTest(ambito) {
  const { domande, avvisi } = componiTest(ambito);
  if (!domande.length) { toast('Nessuna domanda disponibile per questa scelta.'); return; }
  if (avvisi.length && !confirm(avvisi.join('\n\n') + '\n\nProcedo comunque?')) return;
  partenza(domande, ambito);
}

function avviaTestDaElenco(chiavi, etichetta) {
  const domande = componiTestDaElenco(chiavi, MAX_RIPASSO);
  if (!domande.length) { toast('Nessuna domanda da ripassare.'); return; }
  if (chiavi.length > MAX_RIPASSO) {
    toast(`${chiavi.length} domande da ripassare: il test ne contiene le ${MAX_RIPASSO} più urgenti.`);
  }
  partenza(domande, etichetta);
}

function partenza(domande, ambito) {
  sessione = {
    domande,
    risposte: new Array(domande.length).fill(null),
    indice: 0,
    inizio: Date.now(),
    ambito,
    materia: M() ? M().id : null
  };
  sessione.timer = setInterval(() => {
    $('#timer').textContent = fmtTime(Date.now() - sessione.inizio);
  }, 1000);
  $('#timer').textContent = '00:00';
  mostra('test', etichettaAmbito(ambito));
  renderDomanda();
}

function etichettaAmbito(a) {
  const m = M();
  if (a === 'all') return (m ? m.abbrev + ' · ' : '') + 'Tutto il programma';
  if (a === 'errori') return 'Test di soli errori';
  if (a === 'ripasso') return 'Ripasso in scadenza';
  const u = unitaPerId(m, a);
  return u ? a.toUpperCase() + ' · ' + u.nome : a;
}

function renderDomanda() {
  const s = sessione;
  const q = s.domande[s.indice];
  const box = $('#test-question');
  box.innerHTML = '';

  box.appendChild(el('div', 'qtype',
    (q.tipo === 'multipla' ? 'Risposta multipla' : 'Completamento') + ' · ' + q.unita.toUpperCase()));
  box.appendChild(el('div', 'qtext', q.testo));

  if (q.tipo === 'multipla') {
    const wrap = el('div', 'options');
    q.opzioni.forEach((opt, i) => {
      const b = el('button', 'option' + (s.risposte[s.indice] === i ? ' selected' : ''));
      b.type = 'button';
      b.append(el('span', 'letter', String.fromCharCode(65 + i) + ')'), el('span', null, opt));
      b.addEventListener('click', () => { s.risposte[s.indice] = i; renderDomanda(); });
      wrap.appendChild(b);
    });
    box.appendChild(wrap);
  } else {
    const wrap = el('div', 'fill-wrap');
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.autocomplete = 'off';
    inp.autocapitalize = 'off';
    inp.spellcheck = false;
    inp.placeholder = 'la parola mancante';
    inp.value = s.risposte[s.indice] || '';
    inp.addEventListener('input', () => { s.risposte[s.indice] = inp.value; renderMappa(); });
    inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') vaiA(s.indice + 1); });
    wrap.appendChild(inp);
    box.appendChild(wrap);
    setTimeout(() => inp.focus(), 30);
  }

  $('#test-counter').textContent = `Domanda ${s.indice + 1} di ${s.domande.length}`;
  $('#test-progress-bar').style.width = ((s.indice + 1) / s.domande.length * 100) + '%';
  $('#btn-prev').disabled = s.indice === 0;
  $('#btn-next').disabled = s.indice === s.domande.length - 1;
  renderMappa();
}

function renderMappa() {
  const s = sessione;
  const m = $('#test-map');
  m.innerHTML = '';
  s.domande.forEach((q, i) => {
    const r = s.risposte[i];
    const data = (r !== null && r !== '' && !(typeof r === 'string' && !r.trim()));
    const b = el('button', (data ? 'answered ' : '') + (i === s.indice ? 'current' : ''), String(i + 1));
    b.type = 'button';
    b.addEventListener('click', () => vaiA(i));
    m.appendChild(b);
  });
}

function vaiA(i) {
  if (!sessione || i < 0 || i >= sessione.domande.length) return;
  sessione.indice = i;
  renderDomanda();
}

function consegna() {
  const s = sessione;
  const senza = s.risposte.filter(r => r === null || (typeof r === 'string' && !r.trim())).length;
  if (senza && !confirm(`${senza} ${plur(senza, 'domanda è rimasta senza risposta', 'domande sono rimaste senza risposta')}. Consegno lo stesso?`)) return;

  clearInterval(s.timer);
  const durata = Date.now() - s.inizio;
  const ora = new Date().toISOString();
  const voci = [];
  const perUnita = {};
  let giuste = 0;

  s.domande.forEach((q, i) => {
    const data = s.risposte[i];
    const esatta = rispostaCorretta(q, data);
    if (esatta) giuste += 1;
    registraRisposta(q, esatta, ora);
    voci.push({ id: chiave(q.materia, q.id), data, esatta });
    const pu = perUnita[q.unita] || (perUnita[q.unita] = { giuste: 0, totale: 0 });
    pu.totale += 1;
    if (esatta) pu.giuste += 1;
  });

  stato.sessioni.push({
    id: 's' + Date.now(), data: ora,
    materia: s.materia, ambito: s.ambito,
    durata, punteggio: giuste, totale: s.domande.length, perUnita, voci
  });
  if (stato.sessioni.length > 200) stato.sessioni = stato.sessioni.slice(-200);
  salvaStato();

  renderRisultati(s, giuste, durata, perUnita);
  mostra('results', 'Esito · ' + etichettaAmbito(s.ambito));
}

/* ----------------------------------------------------------
   9. Risultati
   ---------------------------------------------------------- */

function barreUnita(cont, dati) {
  const m = M();
  const bars = el('div', 'bars');
  unitaDi(m).forEach(u => {
    const d = dati[u.id];
    if (!d) return;
    const row = el('div', 'bar-row');
    row.appendChild(el('div', null, u.id.toUpperCase()));
    const track = el('div', 'bar-track');
    const fill = el('div', 'bar-fill');
    fill.style.width = (d.totale ? d.giuste / d.totale * 100 : 0) + '%';
    track.appendChild(fill);
    row.appendChild(track);
    row.appendChild(el('div', 'bar-val', `${d.giuste}/${d.totale}`));
    bars.appendChild(row);
  });
  cont.appendChild(bars);
  return bars;
}

function renderRisultati(s, giuste, durata, perUnita) {
  const tot = s.domande.length;
  const sc = $('#score');
  sc.innerHTML = '';
  sc.appendChild(el('div', 'big', `${giuste} / ${tot}`));
  sc.appendChild(el('div', 'sub', `${tot ? Math.round(giuste / tot * 100) : 0}% corrette · tempo impiegato ${fmtTime(durata)}`));

  const pu = $('#per-unit');
  pu.innerHTML = '';
  pu.appendChild(el('h2', null, 'Resa per unità didattica'));
  barreUnita(pu, perUnita);

  const cor = $('#corrections');
  cor.innerHTML = '';
  s.domande.forEach((q, i) => {
    const data = s.risposte[i];
    const esatta = rispostaCorretta(q, data);
    const box = el('div', 'corr ' + (esatta ? 'ok' : 'ko'));
    const head = el('div', 'head');
    head.appendChild(el('span', 'verdict', `${i + 1}. ${esatta ? 'Corretta' : 'Sbagliata'}`));
    head.appendChild(el('span', 'topic', `${q.unita.toUpperCase()} · ${q.argomento || ''}`));
    box.appendChild(head);
    box.appendChild(el('div', 'qtext', q.testo));

    if (!esatta) {
      const testoData = q.tipo === 'multipla'
        ? (data === null || data === undefined ? 'nessuna risposta' : `${String.fromCharCode(65 + data)}) ${q.opzioni[data]}`)
        : ((data && data.trim()) ? data : 'nessuna risposta');
      box.appendChild(el('div', 'given', 'La tua risposta: ' + testoData));
    }
    box.appendChild(el('div', 'right', 'Corretta: ' + testoCorretto(q)));
    box.appendChild(el('div', 'expl', q.spiegazione || '—'));
    cor.appendChild(box);
  });
}

/* ----------------------------------------------------------
   10. I miei errori
   ---------------------------------------------------------- */

function renderErrori() {
  const m = M();
  const cont = $('#errors-list');
  cont.innerHTML = '';
  const aperti = erroriAperti(m && m.id)
    .filter(e => banco.perId[e.chiave])
    .sort((a, b) => {
      const sa = a.scadenza ? Date.parse(a.scadenza) : Infinity;
      const sb = b.scadenza ? Date.parse(b.scadenza) : Infinity;
      return sa !== sb ? sa - sb : b.n - a.n;
    });
  const risolti = Object.entries(stato.errori)
    .filter(([k, e]) => e.risolto && banco.perId[k] && (!m || k.startsWith(m.id + '/')))
    .map(([k, e]) => ({ chiave: k, ...e }))
    .sort((a, b) => Date.parse(b.risolto) - Date.parse(a.risolto));

  $('#btn-error-test').disabled = aperti.length === 0;

  if (!aperti.length && !risolti.length) {
    cont.appendChild(el('div', 'empty', `Nessun errore registrato per ${m ? m.nome : 'questa materia'} su questo dispositivo.`));
    return;
  }
  if (aperti.length) {
    cont.appendChild(el('h2', null, `Da recuperare (${aperti.length})`));
    aperti.forEach(e => cont.appendChild(vociErrore(e, false)));
  }
  if (risolti.length) {
    cont.appendChild(el('h2', null, `Superate (${risolti.length})`));
    risolti.forEach(e => cont.appendChild(vociErrore(e, true)));
  }
}

function vociErrore(e, superata) {
  const q = banco.perId[e.chiave];
  const box = el('div', 'err-item');
  const meta = el('div', 'meta');
  meta.appendChild(el('span', null, `${q.unita.toUpperCase()} · ${q.argomento || 'senza argomento'}`));
  meta.appendChild(el('span', null, `sbagliata ${e.n} ${plur(e.n, 'volta', 'volte')}`));
  meta.appendChild(el('span', null, `ultimo errore ${fmtDate(e.ultimoErrore)}`));
  if (superata) {
    meta.appendChild(el('span', null, `superata il ${fmtDate(e.risolto)}`));
  } else if (e.scadenza) {
    const scaduto = Date.parse(e.scadenza) <= Date.now();
    meta.appendChild(el('span', scaduto ? 'due' : null, scaduto
      ? `ripasso in scadenza (${e.stage === 0 ? '3 giorni' : '10 giorni'})`
      : `prossimo ripasso ${fmtDate(e.scadenza)}`));
  }
  box.appendChild(meta);
  box.appendChild(el('div', 'qtext', q.testo));

  const det = document.createElement('details');
  det.appendChild(el('summary', null, 'Risposta e spiegazione'));
  det.appendChild(el('div', 'right', 'Corretta: ' + testoCorretto(q)));
  det.appendChild(el('div', 'expl', q.spiegazione || '—'));
  box.appendChild(det);
  return box;
}

/* ----------------------------------------------------------
   11. Statistiche
   ---------------------------------------------------------- */

function renderStats() {
  const m = M();
  const b = $('#stats-body');
  b.innerHTML = '';
  const sessioni = stato.sessioni.filter(s => !m || s.materia === m.id);

  const gen = el('div', 'card');
  gen.appendChild(el('h2', null, 'Quadro generale'));
  const viste = Object.keys(stato.viste).filter(k => !m || k.startsWith(m.id + '/')).length;
  const aperti = erroriAperti(m && m.id).length;
  gen.appendChild(el('p', 'hint',
    `${m ? m.nome + ': ' : ''}${sessioni.length} ${plur(sessioni.length, 'test svolto', 'test svolti')} · ${viste} ${plur(viste, 'domanda somministrata', 'domande somministrate')} · ${aperti} ${plur(aperti, 'errore aperto', 'errori aperti')}.`));
  b.appendChild(gen);

  const perU = el('div', 'card');
  perU.appendChild(el('h2', null, 'Resa complessiva per unità'));
  const agg = {};
  sessioni.forEach(s => Object.entries(s.perUnita || {}).forEach(([k, v]) => {
    const a = agg[k] || (agg[k] = { giuste: 0, totale: 0 });
    a.giuste += v.giuste; a.totale += v.totale;
  }));
  if (!Object.keys(agg).length) perU.appendChild(el('p', 'hint', 'Nessun test ancora svolto.'));
  else barreUnita(perU, agg);
  b.appendChild(perU);

  const st = el('div', 'card');
  st.appendChild(el('h2', null, 'Ultimi test'));
  const recenti = sessioni.slice().reverse().slice(0, 15);
  if (!recenti.length) st.appendChild(el('p', 'hint', 'Nessun test ancora svolto.'));
  else recenti.forEach(s => st.appendChild(el('p', 'hint',
    `${fmtDate(s.data)} · ${etichettaAmbito(s.ambito)} · ${s.punteggio}/${s.totale} · ${fmtTime(s.durata)}`)));
  b.appendChild(st);
}

/* ----------------------------------------------------------
   12. Dati: esportazione e importazione
   ---------------------------------------------------------- */

function esporta() {
  const pacchetto = { app: 'banco-chimica', schema: SCHEMA_STATO, esportato: new Date().toISOString(), stato };
  const blob = new Blob([JSON.stringify(pacchetto, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `banco-domande-progressi-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast('Progressi esportati.');
}

function fondiStato(base, altro) {
  const out = JSON.parse(JSON.stringify(base));
  Object.entries(altro.viste || {}).forEach(([id, v]) => {
    const cur = out.viste[id];
    if (!cur) { out.viste[id] = v; return; }
    const recente = Date.parse(v.ultima || 0) > Date.parse(cur.ultima || 0) ? v : cur;
    out.viste[id] = { n: (cur.n || 0) + (v.n || 0), ultima: recente.ultima, ultimaEsatta: recente.ultimaEsatta };
  });
  Object.entries(altro.errori || {}).forEach(([id, e]) => {
    const cur = out.errori[id];
    if (!cur) { out.errori[id] = e; return; }
    const vincitore = Date.parse(e.ultimoErrore || 0) > Date.parse(cur.ultimoErrore || 0) ? e : cur;
    out.errori[id] = Object.assign({}, vincitore, { n: Math.max(cur.n || 0, e.n || 0) });
    if (!cur.risolto || !e.risolto) {
      const aperto = !cur.risolto ? cur : e;
      out.errori[id] = Object.assign({}, aperto, { n: Math.max(cur.n || 0, e.n || 0) });
    }
  });
  const visti = new Set(out.sessioni.map(s => s.id));
  (altro.sessioni || []).forEach(s => { if (!visti.has(s.id)) { out.sessioni.push(s); visti.add(s.id); } });
  out.sessioni.sort((x, y) => Date.parse(x.data) - Date.parse(y.data));
  if (out.sessioni.length > 200) out.sessioni = out.sessioni.slice(-200);
  return out;
}

function importa(file) {
  const modo = document.querySelector('input[name="import-mode"]:checked').value;
  const fr = new FileReader();
  fr.onload = () => {
    try {
      const dati = JSON.parse(fr.result);
      const s = migra(dati && dati.stato ? dati.stato : dati);
      if (!s || typeof s !== 'object' || (!s.viste && !s.errori)) {
        throw new Error('il file non contiene progressi riconoscibili');
      }
      stato = (modo === 'replace') ? Object.assign(statoVuoto(), s) : fondiStato(stato, s);
      salvaStato();
      $('#import-result').textContent =
        `Importazione riuscita (${modo === 'replace' ? 'sostituzione' : 'unione'}): ${Object.keys(stato.viste).length} domande somministrate, ${erroriAperti(null).length} errori aperti in tutte le materie.`;
      renderHome();
      toast('Progressi importati.');
    } catch (e) {
      $('#import-result').textContent = 'Importazione fallita: ' + e.message;
    }
    $('#file-import').value = '';
  };
  fr.onerror = () => { $('#import-result').textContent = 'Impossibile leggere il file.'; };
  fr.readAsText(file);
}

function renderDati() {
  const info = $('#data-bank-info');
  info.innerHTML = '';
  for (const m of banco.materie) {
    const dett = unitaDi(m).length
      ? unitaDi(m).map(u => `${u.id.toUpperCase()} ${(m.perUnita[u.id] || []).length}`).join(' · ')
      : 'nessuna unità definita';
    info.appendChild(el('p', null,
      `${m.nome}: ${m.domande.length} domande da ${m.lotti.length} ${plur(m.lotti.length, 'lotto', 'lotti')} — ${dett}`));
  }
  $('#import-result').textContent = '';
}

/* ----------------------------------------------------------
   13. Avvio
   ---------------------------------------------------------- */

function collega() {
  $('#btn-theme').addEventListener('click', ciclaTema);
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => { if (temaSalvato() === 'auto') applicaTema('auto'); });
  }

  $('#btn-home').addEventListener('click', () => {
    if (vistaCorrente === 'test') {
      if (!confirm('Uscire dal test? Le risposte date andranno perse.')) return;
      clearInterval(sessione.timer);
      sessione = null;
    }
    renderHome();
    mostra('home');
  });

  $('#btn-prev').addEventListener('click', () => vaiA(sessione.indice - 1));
  $('#btn-next').addEventListener('click', () => vaiA(sessione.indice + 1));
  $('#btn-submit').addEventListener('click', consegna);
  $('#btn-results-home').addEventListener('click', () => { renderHome(); mostra('home'); });

  $('#btn-errors').addEventListener('click', () => { renderErrori(); mostra('errors', 'I miei errori'); });
  $('#btn-stats').addEventListener('click', () => { renderStats(); mostra('stats', 'Statistiche'); });
  $('#btn-data').addEventListener('click', () => { renderDati(); mostra('data', 'Dati e backup'); });

  $('#btn-error-test').addEventListener('click', () => {
    avviaTestDaElenco(erroriAperti(M() && M().id).map(e => e.chiave), 'errori');
  });
  $('#btn-review-due').addEventListener('click', () => {
    avviaTestDaElenco(ripassiInScadenza(M() && M().id).map(e => e.chiave), 'ripasso');
  });

  $('#btn-export').addEventListener('click', esporta);
  $('#file-import').addEventListener('change', ev => {
    if (ev.target.files && ev.target.files[0]) importa(ev.target.files[0]);
  });
  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Cancellare tutti i progressi di tutte le materie su questo dispositivo? L\'operazione non è reversibile.')) return;
    stato = statoVuoto();
    salvaStato();
    renderHome();
    renderDati();
    toast('Progressi azzerati.');
  });
  $('#btn-refresh').addEventListener('click', async () => {
    try {
      banco.perId = {};
      await caricaBanco(true);
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ tipo: 'aggiorna-banco' });
      }
      renderHome();
      renderDati();
      toast(`Banco aggiornato: ${banco.materie.reduce((s, m) => s + m.domande.length, 0)} domande.`);
    } catch (e) {
      toast('Aggiornamento non riuscito: sei offline?');
    }
  });

  document.addEventListener('keydown', ev => {
    if (vistaCorrente !== 'test' || !sessione) return;
    if (ev.target.tagName === 'INPUT') return;
    if (ev.key === 'ArrowRight') vaiA(sessione.indice + 1);
    if (ev.key === 'ArrowLeft') vaiA(sessione.indice - 1);
    const q = sessione.domande[sessione.indice];
    if (q.tipo === 'multipla' && /^[a-eA-E]$/.test(ev.key)) {
      const i = ev.key.toLowerCase().charCodeAt(0) - 97;
      if (i < q.opzioni.length) { sessione.risposte[sessione.indice] = i; renderDomanda(); }
    }
  });

  window.addEventListener('beforeunload', ev => {
    if (vistaCorrente === 'test' && sessione) { ev.preventDefault(); ev.returnValue = ''; }
  });
}

function registraServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  const reg = () => navigator.serviceWorker.register('sw.js')
    .catch(e => console.warn('Service worker non registrato', e));
  if (document.readyState === 'complete') reg();
  else window.addEventListener('load', reg, { once: true });
}

async function avvio() {
  caricaStato();
  collega();
  applicaTema(temaSalvato());
  try {
    await caricaBanco(false);
  } catch (e) {
    $('#bank-status').textContent = 'Banco domande non caricato: ' + e.message;
    console.error(e);
  }
  renderHome();
  mostra('home');
  registraServiceWorker();
}

avvio();
