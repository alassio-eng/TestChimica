# Banco domande · Chimica e propedeutica biochimica

PWA statica per esercitarsi sul programma di Chimica e propedeutica biochimica
del semestre filtro di Medicina. Nessun backend, nessuna libreria esterna,
nessuna traccia lasciata fuori dal dispositivo: tutto lo storico vive nel
`localStorage` del browser e si sposta da un dispositivo all'altro tramite
esportazione e importazione di un file JSON.

## Cosa fa

- **Scelta dell'unità** (U1…U7) oppure **tutto il programma**, che compone il
  test con la proporzione dell'appello ufficiale: U1 8 · U2 2 · U3 2 · U4 5 ·
  U5 4 · U6 1 · U7 9 (31 domande). Lunghezze diverse mantengono le stesse
  proporzioni, ricalcolate con il metodo dei resti maggiori.
- **Estrae solo domande mai somministrate su questo dispositivo.** Quando
  l'unità è esaurita lo dice esplicitamente, prima di iniziare, e chiede
  conferma; nel ripescaggio dà la precedenza alle domande sbagliate (più errori
  e più recenti per prime).
- **Durante il test**: cronometro in salita, nessun limite di tempo, nessuna
  spiegazione. Navigazione libera fra le domande, mappa delle risposte date,
  scorciatoie da tastiera (`A`–`E`, frecce).
- **Alla consegna**: punteggio, resa per unità didattica, e per ogni domanda la
  risposta data, quella corretta e la spiegazione completa.
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
  index.json            elenco dei lotti
  batch-01.json         primo lotto
  SCHEMA.md             formato delle domande
tools/valida.py         validatore da eseguire prima di pubblicare
```

Il codice non dà per scontato quante domande ci siano né che tutte le unità
siano piene: unità vuote appaiono disattivate, quote non riempibili vengono
ridistribuite e segnalate.

## Aggiungere un lotto di domande

1. Scrivere `questions/batch-NN.json` seguendo `questions/SCHEMA.md`.
   I lotti già pubblicati non si toccano.
2. Aggiungere il nome del file all'array `lotti` di `questions/index.json` e
   aggiornare il campo `aggiornato`.
3. Validare:

   ```bash
   python3 tools/valida.py
   ```

   Il validatore stampa anche la copertura per unità rispetto all'obiettivo a
   regime (U1 150 · U2 70 · U3 70 · U4 100 · U5 90 · U6 70 · U7 150).
4. Commit e push. Sui dispositivi già installati il nuovo lotto arriva alla
   prima apertura online; «Dati e backup → Cerca nuove domande» lo forza subito.

Se cambia qualcosa in `index.html`, `app.js`, `style.css` o `sw.js`, alzare la
costante `VERSIONE` in `sw.js`: è ciò che invalida la cache offline.

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

Chiave `localStorage`: `bancoChimica.v1`.

```jsonc
{
  "viste":    { "u1-0001": { "n": 2, "ultima": "…", "ultimaEsatta": false } },
  "errori":   { "u1-0001": { "n": 1, "ultimoErrore": "…", "stage": 0,
                             "scadenza": "…", "risolto": null } },
  "sessioni": [ { "id": "…", "data": "…", "ambito": "all", "durata": 0,
                  "punteggio": 0, "totale": 31, "perUnita": {}, "voci": [] } ]
}
```

Svuotare i dati del sito nel browser cancella lo storico: prima di farlo,
esportare.
