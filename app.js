/* ===========================================================
   Banco domande · Chimica e propedeutica biochimica
   Applicazione statica, nessuna dipendenza esterna.
   =========================================================== */

'use strict';

/* ----------------------------------------------------------
   1. Costanti
   ---------------------------------------------------------- */

const UNITS = [
  { key: 'u1', nome: 'Atomo, legami, stati della materia, termodinamica', quota: 8 },
  { key: 'u2', nome: 'Miscele, soluzioni, proprietà colligative',          quota: 2 },
  { key: 'u3', nome: 'Cinetica ed equilibrio chimico',                     quota: 2 },
  { key: 'u4', nome: 'Acidi, basi, tamponi, redox ed elettrochimica',      quota: 5 },
  { key: 'u5', nome: 'Carbonio, idrocarburi, aromatici',                   quota: 4 },
  { key: 'u6', nome: 'Gruppi funzionali e isomerie',                       quota: 1 },
  { key: 'u7', nome: 'Amminoacidi, carboidrati, lipidi, acidi nucleici',   quota: 9 }
];

const UNIT_BY_KEY = Object.fromEntries(UNITS.map(u => [u.key, u]));
const TEST_UFFICIALE = 31;               // 15 a risposta multipla + 16 a completamento
const QUOTA_MULTIPLA = 15;
const GIORNO = 86400000;
const RIPASSO_1 = 3 * GIORNO;
const RIPASSO_2 = 10 * GIORNO;
const STORE_KEY = 'bancoChimica.v1';

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
  const d = new Date(iso);
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
  if (q.tipo === 'multipla') {
    return `${String.fromCharCode(65 + q.corretta)}) ${q.opzioni[q.corretta]}`;
  }
  return (q.accettate || []).join('  ·  ');
}

/* ----------------------------------------------------------
   3. Stato persistente
   ---------------------------------------------------------- */

const statoVuoto = () => ({
  schema: 1,
  creato: new Date().toISOString(),
  viste: {},     // id -> { n, ultima, ultimaEsatta }
  errori: {},    // id -> { n, ultimoErrore, stage, scadenza, risolto }
  sessioni: []   // { id, data, ambito, durata, punteggio, totale, perUnita, voci }
});

let stato = statoVuoto();

function caricaStato() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      stato = Object.assign(statoVuoto(), s);
      stato.viste = stato.viste || {};
      stato.errori = stato.errori || {};
      stato.sessioni = stato.sessioni || [];
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

function registraRisposta(q, esatta, quando) {
  const ora = quando || new Date().toISOString();
  const v = stato.viste[q.id] || { n: 0, ultima: null, ultimaEsatta: null };
  v.n += 1;
  v.ultima = ora;
  v.ultimaEsatta = esatta;
  stato.viste[q.id] = v;

  const e = stato.errori[q.id];
  if (!esatta) {
    const n = (e ? e.n : 0) + 1;
    stato.errori[q.id] = {
      n,
      ultimoErrore: ora,
      stage: 0,
      scadenza: new Date(Date.parse(ora) + RIPASSO_1).toISOString(),
      risolto: null
    };
  } else if (e && !e.risolto) {
    if (e.stage === 0) {
      const teorica = Date.parse(e.ultimoErrore) + RIPASSO_2;
      const scad = Math.max(teorica, Date.parse(ora) + (RIPASSO_2 - RIPASSO_1));
      e.stage = 1;
      e.scadenza = new Date(scad).toISOString();
    } else {
      e.stage = 2;
      e.scadenza = null;
      e.risolto = ora;
    }
    stato.errori[q.id] = e;
  }
}

function erroriAperti() {
  return Object.entries(stato.errori)
    .filter(([, e]) => !e.risolto)
    .map(([id, e]) => ({ id, ...e }));
}

function ripassiInScadenza() {
  const ora = Date.now();
  return erroriAperti().filter(e => e.scadenza && Date.parse(e.scadenza) <= ora);
}

/* ----------------------------------------------------------
   4. Banco domande
   ---------------------------------------------------------- */

const banco = { domande: [], perId: {}, perUnita: {}, lotti: [], errori: [] };

async function caricaBanco(forzaRete) {
  const opt = forzaRete ? { cache: 'reload' } : {};
  const indice = await fetch('questions/index.json', opt).then(r => {
    if (!r.ok) throw new Error('indice non raggiungibile (' + r.status + ')');
    return r.json();
  });
  const lotti = Array.isArray(indice.lotti) ? indice.lotti : [];
  const domande = [];
  const problemi = [];

  for (const file of lotti) {
    try {
      const dati = await fetch('questions/' + file, opt).then(r => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      });
      const lista = Array.isArray(dati) ? dati : (dati.domande || []);
      lista.forEach((q, i) => {
        const err = validaDomanda(q, file, i);
        if (err) { problemi.push(err); return; }
        domande.push(q);
      });
    } catch (e) {
      problemi.push(`Lotto ${file} non caricato: ${e.message}`);
    }
  }

  banco.perId = {};
  banco.domande = [];
  for (const q of domande) {
    if (banco.perId[q.id]) { problemi.push(`Id duplicato ignorato: ${q.id}`); continue; }
    banco.perId[q.id] = q;
    banco.domande.push(q);
  }
  banco.perUnita = {};
  for (const u of UNITS) banco.perUnita[u.key] = [];
  for (const q of banco.domande) banco.perUnita[q.unita].push(q);
  banco.lotti = lotti;
  banco.errori = problemi;
  banco.aggiornato = indice.aggiornato || null;
  if (problemi.length) console.warn('Problemi nel banco domande:', problemi);
}

function validaDomanda(q, file, i) {
  const dove = `${file}[${i}]`;
  if (!q || typeof q !== 'object') return `${dove}: voce non valida`;
  if (!q.id) return `${dove}: manca l'id`;
  if (!UNIT_BY_KEY[q.unita]) return `${q.id}: unità sconosciuta «${q.unita}»`;
  if (!q.testo) return `${q.id}: manca il testo`;
  if (q.tipo === 'multipla') {
    if (!Array.isArray(q.opzioni) || q.opzioni.length < 2) return `${q.id}: opzioni mancanti`;
    if (!Number.isInteger(q.corretta) || q.corretta < 0 || q.corretta >= q.opzioni.length) {
      return `${q.id}: indice della risposta corretta non valido`;
    }
  } else if (q.tipo === 'completamento') {
    if (!Array.isArray(q.accettate) || !q.accettate.length) return `${q.id}: risposte accettate mancanti`;
  } else {
    return `${q.id}: tipo sconosciuto «${q.tipo}»`;
  }
  return null;
}

/* ----------------------------------------------------------
   5. Composizione del test
   ---------------------------------------------------------- */

/* Ripartisce `totale` domande fra le unità secondo le quote
   ufficiali, con il metodo dei resti maggiori. */
function ripartisci(totale) {
  const somma = UNITS.reduce((s, u) => s + u.quota, 0);
  const grezzi = UNITS.map(u => ({ key: u.key, val: totale * u.quota / somma }));
  const out = {};
  let assegnate = 0;
  for (const g of grezzi) { out[g.key] = Math.floor(g.val); assegnate += out[g.key]; }
  const resti = grezzi
    .map(g => ({ key: g.key, r: g.val - Math.floor(g.val) }))
    .sort((a, b) => b.r - a.r);
  let i = 0;
  while (assegnate < totale && resti.length) {
    out[resti[i % resti.length].key] += 1;
    assegnate += 1;
    i += 1;
  }
  return out;
}

function prioritaRipescaggio(a, b) {
  // prima le sbagliate (più errori, errore più recente), poi le più vecchie
  const ea = stato.errori[a.id], eb = stato.errori[b.id];
  const aperta = e => e && !e.risolto;
  if (aperta(ea) !== aperta(eb)) return aperta(ea) ? -1 : 1;
  if (aperta(ea) && aperta(eb)) {
    if (eb.n !== ea.n) return eb.n - ea.n;
    return Date.parse(eb.ultimoErrore) - Date.parse(ea.ultimoErrore);
  }
  const va = stato.viste[a.id], vb = stato.viste[b.id];
  return Date.parse((va && va.ultima) || 0) - Date.parse((vb && vb.ultima) || 0);
}

/* Sceglie `n` domande da `cands` (già ordinate per priorità),
   cercando di rispettare il fabbisogno residuo per tipo. */
function scegli(cands, n, fabbisogno, bilancia) {
  const scelte = [], scarti = [];
  for (const q of cands) {
    if (scelte.length >= n) break;
    if (!bilancia || (fabbisogno[q.tipo] || 0) > 0) {
      scelte.push(q);
      fabbisogno[q.tipo] = (fabbisogno[q.tipo] || 0) - 1;
    } else scarti.push(q);
  }
  for (const q of scarti) {
    if (scelte.length >= n) break;
    scelte.push(q);
    fabbisogno[q.tipo] = (fabbisogno[q.tipo] || 0) - 1;
  }
  return scelte;
}

/**
 * Compone un test.
 * @param ambito  'all' | 'u1'..'u7'
 * @param totale  numero di domande richiesto (0 = tutte le disponibili)
 * @returns { domande, avvisi, quote }
 */
function componiTest(ambito, totale) {
  const tuttoIlProgramma = ambito === 'all';
  const disponibili = tuttoIlProgramma ? banco.domande : (banco.perUnita[ambito] || []);
  if (!disponibili.length) return { domande: [], avvisi: [], quote: {} };

  let n = totale > 0 ? Math.min(totale, disponibili.length) : disponibili.length;
  const quote = tuttoIlProgramma ? ripartisci(n) : { [ambito]: n };

  const fabbisogno = tuttoIlProgramma
    ? { multipla: Math.round(n * QUOTA_MULTIPLA / TEST_UFFICIALE), completamento: 0 }
    : { multipla: Math.round(n / 2), completamento: 0 };
  fabbisogno.completamento = n - fabbisogno.multipla;

  const avvisi = [];
  const prese = new Set();
  const scelte = [];

  const chiavi = tuttoIlProgramma ? UNITS.map(u => u.key) : [ambito];

  // passata 1 — solo domande mai somministrate
  for (const k of chiavi) {
    const quota = quote[k] || 0;
    if (!quota) continue;
    const pool = banco.perUnita[k] || [];
    const inedite = shuffle(pool.filter(q => !stato.viste[q.id]));
    const prese1 = scegli(inedite, quota, fabbisogno, true);
    prese1.forEach(q => { prese.add(q.id); scelte.push(q); });
    quote[k + '_inedite'] = prese1.length;
  }

  // passata 2 — ripescaggio nella stessa unità
  for (const k of chiavi) {
    const quota = quote[k] || 0;
    const mancano = quota - (quote[k + '_inedite'] || 0);
    if (mancano <= 0) continue;
    const pool = (banco.perUnita[k] || []).filter(q => !prese.has(q.id));
    const viste = pool.filter(q => stato.viste[q.id]).sort(prioritaRipescaggio);
    const prese2 = scegli(viste, mancano, fabbisogno, false);
    prese2.forEach(q => { prese.add(q.id); scelte.push(q); });
    const nome = UNIT_BY_KEY[k].key.toUpperCase();
    if (prese2.length) {
      avvisi.push(`${nome}: le domande mai somministrate sono esaurite. ${prese2.length} ${plur(prese2.length, 'domanda già vista è stata ripescata', 'domande già viste sono state ripescate')}, dando la precedenza a quelle sbagliate.`);
    } else if (mancano > 0) {
      avvisi.push(`${nome}: nel banco non ci sono abbastanza domande per riempire la quota (${quota} ${plur(quota, 'richiesta', 'richieste')}).`);
    }
  }

  // passata 3 — riequilibrio fra unità, solo per il test su tutto il programma
  if (tuttoIlProgramma && scelte.length < n) {
    const resto = banco.domande.filter(q => !prese.has(q.id));
    const inedite = shuffle(resto.filter(q => !stato.viste[q.id]));
    const viste = resto.filter(q => stato.viste[q.id]).sort(prioritaRipescaggio);
    for (const q of inedite.concat(viste)) {
      if (scelte.length >= n) break;
      prese.add(q.id);
      scelte.push(q);
    }
    if (scelte.length < n) {
      avvisi.push(`Il banco contiene solo ${scelte.length} domande: il test è più corto delle ${n} richieste.`);
    } else {
      avvisi.push('Alcune unità non avevano abbastanza domande: le quote sono state ridistribuite sulle altre.');
    }
  }

  // ordine finale: prima le a risposta multipla, come nell'appello ufficiale
  scelte.sort((a, b) => (a.tipo === b.tipo) ? 0 : (a.tipo === 'multipla' ? -1 : 1));
  return { domande: scelte, avvisi, quote };
}

function componiTestDaElenco(ids, limite) {
  const q = ids.map(id => banco.perId[id]).filter(Boolean);
  const ordinate = q.sort(prioritaRipescaggio);
  const tagliate = limite > 0 ? ordinate.slice(0, limite) : ordinate;
  tagliate.sort((a, b) => (a.tipo === b.tipo) ? 0 : (a.tipo === 'multipla' ? -1 : 1));
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
  $('#topbar-title').textContent = titolo || 'Banco domande · Chimica';
  $('#btn-home').hidden = (vista === 'home');
  $('#timer').hidden = (vista !== 'test');
  window.scrollTo(0, 0);
}

/* ----------------------------------------------------------
   7. Schermata iniziale
   ---------------------------------------------------------- */

function renderHome() {
  const tot = banco.domande.length;
  const inedite = banco.domande.filter(q => !stato.viste[q.id]).length;
  const st = $('#bank-status');
  st.innerHTML = '';
  if (!tot) {
    st.appendChild(el('p', null, 'Il banco domande è vuoto: aggiungi un lotto in questions/ e registralo in questions/index.json.'));
  } else {
    st.appendChild(el('p', null,
      `${tot} ${plur(tot, 'domanda', 'domande')} nel banco · ${inedite} mai ${plur(inedite, 'somministrata', 'somministrate')} su questo dispositivo.`));
  }
  if (banco.errori.length) {
    const p = el('p', null, `${banco.errori.length} ${plur(banco.errori.length, 'voce scartata', 'voci scartate')} per errori di formato (dettagli in console).`);
    st.appendChild(p);
  }

  // ripassi in scadenza
  const dovuti = ripassiInScadenza();
  $('#review-due').hidden = dovuti.length === 0;
  if (dovuti.length) {
    $('#review-due-count').textContent = dovuti.length;
    $('#review-due-text').textContent =
      `${plur(dovuti.length, 'domanda sbagliata è', 'domande sbagliate sono')} in scadenza di ripasso (ripescaggio automatico a 3 e a 10 giorni dall'errore).`;
  }

  // elenco unità
  const lista = $('#unit-list');
  lista.innerHTML = '';

  const btnAll = el('button', 'unit full');
  btnAll.type = 'button';
  const tagAll = el('div', 'unit-tag', '★');
  const bodyAll = el('div', 'unit-body');
  bodyAll.appendChild(el('div', 'unit-name', 'Tutto il programma'));
  const metaAll = el('div', 'unit-meta');
  metaAll.textContent = `proporzione ufficiale U1 8 · U2 2 · U3 2 · U4 5 · U5 4 · U6 1 · U7 9 — ${inedite} inedite disponibili`;
  bodyAll.appendChild(metaAll);
  btnAll.append(tagAll, bodyAll);
  btnAll.disabled = tot === 0;
  btnAll.addEventListener('click', () => avviaTest('all'));
  lista.appendChild(btnAll);

  for (const u of UNITS) {
    const pool = banco.perUnita[u.key] || [];
    const ined = pool.filter(q => !stato.viste[q.id]).length;
    const b = el('button', 'unit');
    b.type = 'button';
    b.append(el('div', 'unit-tag', u.key.toUpperCase()));
    const body = el('div', 'unit-body');
    body.appendChild(el('div', 'unit-name', u.nome));
    const meta = el('div', 'unit-meta');
    if (!pool.length) {
      meta.textContent = 'nessuna domanda nel banco';
    } else if (ined === 0) {
      meta.appendChild(el('span', 'exhausted', 'inedite esaurite'));
      meta.append(` · ${pool.length} in totale, si ripescano le già viste`);
    } else {
      meta.textContent = `${ined} inedite su ${pool.length}`;
    }
    body.appendChild(meta);
    b.appendChild(body);
    b.disabled = pool.length === 0;
    b.addEventListener('click', () => avviaTest(u.key));
    lista.appendChild(b);
  }
}

/* ----------------------------------------------------------
   8. Svolgimento del test
   ---------------------------------------------------------- */

let sessione = null;   // { domande, risposte, indice, inizio, ambito, timer }

function avviaTest(ambito) {
  const lenSel = Number($('#len-select').value);
  const { domande, avvisi } = componiTest(ambito, lenSel);
  if (!domande.length) { toast('Nessuna domanda disponibile per questa scelta.'); return; }
  if (avvisi.length) {
    const ok = confirm(avvisi.join('\n\n') + '\n\nProcedo comunque?');
    if (!ok) return;
  }
  partenza(domande, ambito);
}

function avviaTestDaElenco(ids, etichetta) {
  const lenSel = Number($('#len-select').value);
  const domande = componiTestDaElenco(ids, lenSel);
  if (!domande.length) { toast('Nessuna domanda da ripassare.'); return; }
  partenza(domande, etichetta);
}

function partenza(domande, ambito) {
  sessione = {
    domande,
    risposte: new Array(domande.length).fill(null),
    indice: 0,
    inizio: Date.now(),
    ambito
  };
  sessione.timer = setInterval(() => {
    $('#timer').textContent = fmtTime(Date.now() - sessione.inizio);
  }, 1000);
  $('#timer').textContent = '00:00';
  mostra('test', etichettaAmbito(ambito));
  renderDomanda();
}

function etichettaAmbito(a) {
  if (a === 'all') return 'Tutto il programma';
  if (a === 'errori') return 'Test di soli errori';
  if (a === 'ripasso') return 'Ripasso in scadenza';
  return UNIT_BY_KEY[a] ? a.toUpperCase() + ' · ' + UNIT_BY_KEY[a].nome : a;
}

function renderDomanda() {
  const s = sessione;
  const q = s.domande[s.indice];
  const box = $('#test-question');
  box.innerHTML = '';

  box.appendChild(el('div', 'qtype',
    (q.tipo === 'multipla' ? 'Risposta multipla' : 'Completamento') +
    ' · ' + q.unita.toUpperCase()));
  box.appendChild(el('div', 'qtext', q.testo));

  if (q.tipo === 'multipla') {
    const wrap = el('div', 'options');
    q.opzioni.forEach((opt, i) => {
      const b = el('button', 'option' + (s.risposte[s.indice] === i ? ' selected' : ''));
      b.type = 'button';
      b.append(el('span', 'letter', String.fromCharCode(65 + i) + ')'), el('span', null, opt));
      b.addEventListener('click', () => {
        s.risposte[s.indice] = i;
        renderDomanda();
        renderMappa();
      });
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
    voci.push({ id: q.id, data: data, esatta });
    const pu = perUnita[q.unita] || (perUnita[q.unita] = { giuste: 0, totale: 0 });
    pu.totale += 1;
    if (esatta) pu.giuste += 1;
  });

  stato.sessioni.push({
    id: 's' + Date.now(),
    data: ora,
    ambito: s.ambito,
    durata,
    punteggio: giuste,
    totale: s.domande.length,
    perUnita,
    voci
  });
  if (stato.sessioni.length > 200) stato.sessioni = stato.sessioni.slice(-200);
  salvaStato();

  renderRisultati(s, giuste, durata, perUnita);
  mostra('results', 'Esito · ' + etichettaAmbito(s.ambito));
}

/* ----------------------------------------------------------
   9. Risultati
   ---------------------------------------------------------- */

function renderRisultati(s, giuste, durata, perUnita) {
  const tot = s.domande.length;
  const pct = tot ? Math.round(giuste / tot * 100) : 0;
  const sc = $('#score');
  sc.innerHTML = '';
  sc.appendChild(el('div', 'big', `${giuste} / ${tot}`));
  sc.appendChild(el('div', 'sub', `${pct}% corrette · tempo impiegato ${fmtTime(durata)}`));

  const pu = $('#per-unit');
  pu.innerHTML = '';
  pu.appendChild(el('h2', null, 'Resa per unità didattica'));
  const bars = el('div', 'bars');
  UNITS.forEach(u => {
    const d = perUnita[u.key];
    if (!d) return;
    const row = el('div', 'bar-row');
    row.appendChild(el('div', null, u.key.toUpperCase()));
    const track = el('div', 'bar-track');
    const fill = el('div', 'bar-fill');
    fill.style.width = (d.totale ? d.giuste / d.totale * 100 : 0) + '%';
    track.appendChild(fill);
    row.appendChild(track);
    row.appendChild(el('div', 'bar-val', `${d.giuste}/${d.totale}`));
    bars.appendChild(row);
  });
  pu.appendChild(bars);

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
      let testoData;
      if (q.tipo === 'multipla') {
        testoData = (data === null || data === undefined)
          ? 'nessuna risposta'
          : `${String.fromCharCode(65 + data)}) ${q.opzioni[data]}`;
      } else {
        testoData = (data && data.trim()) ? data : 'nessuna risposta';
      }
      box.appendChild(el('div', 'given', 'La tua risposta: ' + testoData));
      box.appendChild(el('div', 'right', 'Corretta: ' + testoCorretto(q)));
    } else {
      box.appendChild(el('div', 'right', 'Corretta: ' + testoCorretto(q)));
    }

    box.appendChild(el('div', 'expl', q.spiegazione || '—'));
    cor.appendChild(box);
  });
}

/* ----------------------------------------------------------
   10. I miei errori
   ---------------------------------------------------------- */

function renderErrori() {
  const cont = $('#errors-list');
  cont.innerHTML = '';
  const aperti = erroriAperti()
    .filter(e => banco.perId[e.id])
    .sort((a, b) => {
      const sa = a.scadenza ? Date.parse(a.scadenza) : Infinity;
      const sb = b.scadenza ? Date.parse(b.scadenza) : Infinity;
      if (sa !== sb) return sa - sb;
      return b.n - a.n;
    });
  const risolti = Object.entries(stato.errori)
    .filter(([id, e]) => e.risolto && banco.perId[id])
    .map(([id, e]) => ({ id, ...e }))
    .sort((a, b) => Date.parse(b.risolto) - Date.parse(a.risolto));

  $('#btn-error-test').disabled = aperti.length === 0;

  if (!aperti.length && !risolti.length) {
    cont.appendChild(el('div', 'empty', 'Nessun errore registrato su questo dispositivo.'));
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
  const q = banco.perId[e.id];
  const box = el('div', 'err-item');
  const meta = el('div', 'meta');
  meta.appendChild(el('span', null, `${q.unita.toUpperCase()} · ${q.argomento || 'senza argomento'}`));
  meta.appendChild(el('span', null, `sbagliata ${e.n} ${plur(e.n, 'volta', 'volte')}`));
  meta.appendChild(el('span', null, `ultimo errore ${fmtDate(e.ultimoErrore)}`));
  if (superata) {
    meta.appendChild(el('span', null, `superata il ${fmtDate(e.risolto)}`));
  } else if (e.scadenza) {
    const scaduto = Date.parse(e.scadenza) <= Date.now();
    const etichetta = scaduto
      ? `ripasso in scadenza (${e.stage === 0 ? '3 giorni' : '10 giorni'})`
      : `prossimo ripasso ${fmtDate(e.scadenza)}`;
    meta.appendChild(el('span', scaduto ? 'due' : null, etichetta));
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
  const b = $('#stats-body');
  b.innerHTML = '';
  const sess = stato.sessioni.slice().reverse();

  const gen = el('div', 'card');
  gen.appendChild(el('h2', null, 'Quadro generale'));
  const viste = Object.keys(stato.viste).length;
  const aperti = erroriAperti().length;
  gen.appendChild(el('p', 'hint',
    `${sess.length} ${plur(sess.length, 'test svolto', 'test svolti')} · ${viste} ${plur(viste, 'domanda somministrata', 'domande somministrate')} · ${aperti} ${plur(aperti, 'errore aperto', 'errori aperti')}.`));
  b.appendChild(gen);

  const perU = el('div', 'card');
  perU.appendChild(el('h2', null, 'Resa complessiva per unità'));
  const agg = {};
  stato.sessioni.forEach(s => {
    Object.entries(s.perUnita || {}).forEach(([k, v]) => {
      const a = agg[k] || (agg[k] = { giuste: 0, totale: 0 });
      a.giuste += v.giuste; a.totale += v.totale;
    });
  });
  if (!Object.keys(agg).length) {
    perU.appendChild(el('p', 'hint', 'Nessun test ancora svolto.'));
  } else {
    const bars = el('div', 'bars');
    UNITS.forEach(u => {
      const d = agg[u.key];
      if (!d) return;
      const row = el('div', 'bar-row');
      row.appendChild(el('div', null, u.key.toUpperCase()));
      const track = el('div', 'bar-track');
      const fill = el('div', 'bar-fill');
      fill.style.width = (d.totale ? d.giuste / d.totale * 100 : 0) + '%';
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el('div', 'bar-val', `${Math.round(d.giuste / d.totale * 100)}%`));
      bars.appendChild(row);
    });
    perU.appendChild(bars);
  }
  b.appendChild(perU);

  const st = el('div', 'card');
  st.appendChild(el('h2', null, 'Ultimi test'));
  if (!sess.length) {
    st.appendChild(el('p', 'hint', 'Nessun test ancora svolto.'));
  } else {
    sess.slice(0, 15).forEach(s => {
      const p = el('p', 'hint',
        `${fmtDate(s.data)} · ${etichettaAmbito(s.ambito)} · ${s.punteggio}/${s.totale} · ${fmtTime(s.durata)}`);
      st.appendChild(p);
    });
  }
  b.appendChild(st);
}

/* ----------------------------------------------------------
   12. Dati: esportazione e importazione
   ---------------------------------------------------------- */

function esporta() {
  const pacchetto = {
    app: 'banco-chimica',
    schema: 1,
    esportato: new Date().toISOString(),
    stato
  };
  const blob = new Blob([JSON.stringify(pacchetto, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const oggi = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `banco-chimica-progressi-${oggi}.json`;
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
    const piuRecente = Date.parse(v.ultima || 0) > Date.parse(cur.ultima || 0) ? v : cur;
    out.viste[id] = {
      n: (cur.n || 0) + (v.n || 0),
      ultima: piuRecente.ultima,
      ultimaEsatta: piuRecente.ultimaEsatta
    };
  });

  Object.entries(altro.errori || {}).forEach(([id, e]) => {
    const cur = out.errori[id];
    if (!cur) { out.errori[id] = e; return; }
    const a = Date.parse(cur.ultimoErrore || 0);
    const b = Date.parse(e.ultimoErrore || 0);
    const vincitore = b > a ? e : cur;
    out.errori[id] = Object.assign({}, vincitore, { n: Math.max(cur.n || 0, e.n || 0) });
    // se uno dei due è ancora aperto, l'errore resta aperto
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
      const s = dati && dati.stato ? dati.stato : dati;
      if (!s || typeof s !== 'object' || (!s.viste && !s.errori)) {
        throw new Error('il file non contiene progressi riconoscibili');
      }
      stato = (modo === 'replace')
        ? Object.assign(statoVuoto(), s)
        : fondiStato(stato, s);
      salvaStato();
      const nv = Object.keys(stato.viste).length;
      const ne = erroriAperti().length;
      $('#import-result').textContent =
        `Importazione riuscita (${modo === 'replace' ? 'sostituzione' : 'unione'}): ${nv} domande somministrate, ${ne} errori aperti.`;
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
  info.appendChild(el('p', null,
    `${banco.domande.length} domande da ${banco.lotti.length} ${plur(banco.lotti.length, 'lotto', 'lotti')}${banco.aggiornato ? ' · indice aggiornato al ' + banco.aggiornato : ''}.`));
  const dett = UNITS.map(u => `${u.key.toUpperCase()} ${(banco.perUnita[u.key] || []).length}`).join(' · ');
  info.appendChild(el('p', null, dett));
  $('#import-result').textContent = '';
}

/* ----------------------------------------------------------
   13. Avvio
   ---------------------------------------------------------- */

function collega() {
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
    avviaTestDaElenco(erroriAperti().map(e => e.id), 'errori');
  });
  $('#btn-review-due').addEventListener('click', () => {
    avviaTestDaElenco(ripassiInScadenza().map(e => e.id), 'ripasso');
  });

  $('#btn-export').addEventListener('click', esporta);
  $('#file-import').addEventListener('change', ev => {
    if (ev.target.files && ev.target.files[0]) importa(ev.target.files[0]);
  });
  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Cancellare tutti i progressi su questo dispositivo? L\'operazione non è reversibile.')) return;
    stato = statoVuoto();
    salvaStato();
    renderHome();
    renderDati();
    toast('Progressi azzerati.');
  });
  $('#btn-refresh').addEventListener('click', async () => {
    try {
      await caricaBanco(true);
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ tipo: 'aggiorna-banco' });
      }
      renderHome();
      renderDati();
      toast(`Banco aggiornato: ${banco.domande.length} domande.`);
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

async function avvio() {
  caricaStato();
  collega();
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

function registraServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  const reg = () => navigator.serviceWorker.register('sw.js')
    .catch(e => console.warn('Service worker non registrato', e));
  if (document.readyState === 'complete') reg();
  else window.addEventListener('load', reg, { once: true });
}

avvio();
