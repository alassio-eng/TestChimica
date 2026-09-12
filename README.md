# Banco domande · semestre filtro

PWA statica per esercitarsi sui programmi del semestre filtro di Medicina.
Gestisce tre materie — chimica, fisica e biologia — ciascuna col proprio
banco in riempimento. Materie, unità didattiche e formato dei test stanno
nei dati e non nel codice: aggiungere una materia significa aggiungere una
cartella sotto `questions/`. Nessun backend, nessuna libreria esterna,
nessuna traccia lasciata fuori dal dispositivo: tutto lo storico vive nel
`localStorage` del browser e si sposta da un dispositivo all'altro tramite
esportazione e importazione di un file JSON.

## Cosa fa

- **Scelta della materia** in cima alla schermata iniziale; la scelta resta
  salvata, e ogni materia ha il proprio storico, i propri errori e le proprie
  statistiche. Un pallino sulla materia segnala i ripassi in scadenza lì.
- **Due formati fissi**, entrambi con le domande a risposta multipla prima e
  quelle a completamento dopo, come nell'appello:
  - **tutto il programma** — 31 domande, 15 a risposta multipla e 16 a
    completamento, ripartite fra le unità secondo la proporzione ufficiale
    U1 8 · U2 2 · U3 2 · U4 5 · U5 4 · U6 1 · U7 9 (metodo dei resti maggiori
    per la ripartizione dei tipi dentro le quote);
  - **singola unità** (U1…U7) — 15 domande, 8 a risposta multipla e 7 a
    completamento.

  Se un'unità non ha abbastanza domande di un tipo, la differenza viene coperta
  con l'altro tipo della stessa unità e il fatto viene dichiarato prima di
  iniziare.
- **Estrae solo domande mai somministrate su questo dispositivo.** Quando
  l'unità è esaurita lo dice esplicitamente, prima di iniziare, e chiede
  conferma; nel ripescaggio dà la precedenza alle domande sbagliate (più errori
  e più recenti per prime).
- **Durante il test**: cronometro in salita, nessun limite di tempo, nessuna
  spiegazione. Navigazione libera fra le domande, mappa delle risposte date,
  scorciatoie da tastiera (`A`–`E`, frecce).
- **Alla consegna**: punteggio, resa per unità didattica, e per ogni domanda la
  risposta data, quella corretta e la spiegazione completa.
- **Sfoglia le domande**: ripasso libero sull'intero banco della materia, una
  domanda per volta, con filtri per unità, tipo e stato (mai somministrate, già
  viste, sbagliate) e ricerca nel testo, nell'argomento e nella spiegazione. Si
  può provare a rispondere e vedere subito correzione e spiegazione, oppure
  scoprire direttamente la risposta. **Non tocca lo storico**: nulla viene
  marcato come somministrato, nessun errore entra nel ripasso, il serbatoio
  delle inedite resta intatto e un'unità si può rileggere quante volte si vuole.
- **I miei errori**: elenco delle sbagliate ordinate per scadenza di ripasso,
  pulsante per generare un test di soli errori.
- **Ripescaggio automatico a 3 e a 10 giorni** dall'errore. La schermata
  iniziale segnala quante domande sono in scadenza e le raccoglie in un test
  dedicato. Risposta esatta al ripasso dei 3 giorni → la domanda torna a 10
  giorni; esatta anche lì → esce dagli errori aperti e passa fra le «superate».
  Risposta di nuovo sbagliata → il conteggio riparte da zero.
- **Tema chiaro, scuro o automatico**, dal pulsante in alto a destra; la scelta
  resta salvata sul dispositivo. La pagina dichiara `color-scheme`, così i
  browser non sovrappongono il proprio auto-dark ai colori del tema. Tutte le
  combinazioni testo/sfondo stanno sopra 6:1 in entrambi i temi (WCAG AA chiede
  4,5:1); `test-contrast.js` nella cronologia di sviluppo le misura.
- **Offline** dopo la prima apertura: manifest, service worker, icone.
  Installabile su iOS e Android come applicazione a sé.
- **Esporta / importa i progressi** in JSON, in modalità «unisci» o
  «sostituisci», per passare da un dispositivo all'altro.

## Struttura

```
index.html              guscio e schermate
style.css               tema chiaro e scuro
app.js                  tutta la logica
manifest.webmanifest    installazione come app
sw.js                   cache offline
icons/                  icone 180 · 192 · 512 · maskable
questions/
  index.json            manifest delle materie
  chimica/
    index.json          unità, quote, formato, elenco dei lotti
    chimica-u1-01.json …  un file per unità, col prefisso della materia
  fisica/
    index.json
    fisica-u1-01.json …
  biologia/
    index.json
    biologia-u1-01.json …
tools/valida.py         validatore da eseguire prima di pubblicare
tools/prossimo.py       prossimo lotto e primo id libero, per unità
SPEC-NUOVA-MATERIA.md   specifica per chi genera le domande di una materia
ISTRUZIONI-PROGETTO.md  cosa scrivere nelle istruzioni dei progetti Claude
```

Il codice non dà per scontato quante domande ci siano né che tutte le unità
siano piene: unità vuote appaiono disattivate, quote non riempibili vengono
ridistribuite e segnalate.

Le `quota` dichiarate negli indici delle tre materie sono ricavate da appelli
ufficiali, non stimate: il campo `fonteQuote` di ogni indice lo registra. Non
vanno ritoccate a cuor leggero — sono ciò che determina la composizione del
test «tutto il programma», e cambiarle rende i test già svolti non
confrontabili con quelli successivi.

## Aggiungere una materia

1. Creare `questions/<materia>/index.json` dichiarando unità, quote e formato:
   il modello sta in `SPEC-NUOVA-MATERIA.md`.
2. Registrare la materia nell'array `materie` di `questions/index.json`.
3. Aggiungere i lotti come qui sotto. Il codice non va toccato.

## Aggiungere domande

I file seguono la convenzione `<materia>-<unità>-<progressivo>.json`: un file
contiene domande di una sola unità, e il validatore lo verifica.

0. Chiedere al repository come si chiama il prossimo lotto e da quale id
   ripartire — a occhio è l'errore facile, e un id riusato è irreversibile:

   ```bash
   python3 tools/prossimo.py                  # quadro di tutte le materie
   python3 tools/prossimo.py biologia u3      # testo da dare alla chat
   ```
1. Scrivere `questions/<materia>/<materia>-uN-NN.json` seguendo
   `SPEC-NUOVA-MATERIA.md`. I file già pubblicati non si toccano: per
   aggiungere domande a un'unità si crea il progressivo successivo.
2. Aggiungere il nome del file all'array `lotti` di
   `questions/<materia>/index.json` e aggiornare il campo `aggiornato`.
3. Validare:

   ```bash
   python3 tools/valida.py                    # tutte le materie
   python3 tools/valida.py --materia fisica   # una sola
   ```

   Il validatore stampa anche la copertura per unità rispetto all'obiettivo
   dichiarato nell'indice della materia, la distribuzione delle posizioni
   della risposta corretta e la quota di quesiti in cui la corretta è
   l'opzione più lunga: sono i due modi con cui un banco diventa indovinabile
   senza saperlo.
4. Commit e push. Sui dispositivi già installati il nuovo lotto arriva alla
   prima apertura online; «Dati e backup → Cerca nuove domande» lo forza subito.

Se cambia qualcosa in `index.html`, `app.js`, `style.css` o `sw.js`, alzare la
costante `VERSIONE` in `sw.js`: è ciò che invalida la cache offline.

### Come arriva un aggiornamento sui dispositivi

Tre accorgimenti, tutti e tre necessari, e ciascuno è stato una volta un bug:

- i file delle domande si chiedono con `cache: 'no-cache'`, non con la
  richiesta normale: GitHub Pages manda `max-age=600` e senza rivalidazione un
  lotto appena pubblicato resta invisibile finché la cache HTTP non scade;
- il guscio si mette in cache con `cache: 'reload'` file per file invece che
  con `cache.addAll()`, che pescherebbe dalla stessa cache HTTP e congelerebbe
  nella cache nuova i file della versione precedente;
- `self.skipWaiting()` è la **prima** istruzione dell'evento `install`: chiamata
  in fondo a una catena di `await`, Chromium la ignora e il service worker nuovo
  resta in attesa, così la versione appena pubblicata entra in funzione solo
  alla chiusura successiva dell'app.

`test-lotto-nuovo.js` nella cronologia di sviluppo riproduce il caso completo:
server con `max-age=600`, app già installata, lotto pubblicato dopo.

## Pubblicazione su GitHub Pages

Repository → **Settings → Pages → Build and deployment**, source
**Deploy from a branch**, branch `main`, cartella `/ (root)`. Il file
`.nojekyll` evita che Jekyll interferisca. Il service worker richiede HTTPS:
`github.io` lo fornisce.

## Prova in locale

```bash
python3 -m http.server 8000
```

e aprire `http://localhost:8000`. `file://` non funziona: il service worker e
il caricamento dei lotti richiedono un server.

## Dati sul dispositivo

Chiave `localStorage`: `bancoChimica.v1`. Le chiavi delle domande sono
qualificate dalla materia, così due materie possono usare gli stessi codici di
unità senza collidere.

```jsonc
{
  "schema": 2,
  "viste":    { "chimica/u1-0001": { "n": 2, "ultima": "…", "ultimaEsatta": false } },
  "errori":   { "chimica/u1-0001": { "n": 1, "ultimoErrore": "…", "stage": 0,
                                     "scadenza": "…", "risolto": null } },
  "sessioni": [ { "id": "…", "data": "…", "materia": "chimica", "ambito": "all",
                  "durata": 0, "punteggio": 0, "totale": 31,
                  "perUnita": {}, "voci": [] } ]
}
```

Lo storico creato dalla versione a materia singola viene migrato alla prima
apertura: le chiavi vengono qualificate con `chimica/` e riscritte, senza
perdita.

### Cosa sopravvive a un aggiornamento

Pubblicare una nuova versione **non** tocca i progressi: il codice sta sul
server, lo storico nel `localStorage` del browser, e sono due spazi separati.
Sopravvivono quindi a qualunque deploy le domande già somministrate, gli
errori con le loro scadenze di ripasso, lo storico dei test e la preferenza di
tema. Verificato: `test-aggiornamento.js` nella cronologia di sviluppo simula
un deploy completo (codice nuovo, service worker nuovo, lotto di domande
aggiunto) e confronta lo stato prima e dopo.

L'aggancio fra storico e domande è il campo `id`. Perciò un id **non si
rinumera e non si riusa mai**: cambiarlo fa tornare quella domanda «mai
somministrata» e ne perde lo storico di errori. Modificare testo, opzioni,
ordine delle opzioni o spiegazione di una domanda esistente è invece
innocuo.

I progressi si perdono soltanto se: si svuotano i dati del sito nel browser,
si usa una finestra anonima, si cambia browser o dispositivo (ogni browser ha
il suo `localStorage`), oppure — su iPhone — non si apre l'app per diverse
settimane e Safari libera lo spazio. Installarla sulla schermata Home rende
quest'ultimo caso molto meno probabile. In ogni caso l'esportazione in JSON è
il backup: conviene farla ogni tanto.
