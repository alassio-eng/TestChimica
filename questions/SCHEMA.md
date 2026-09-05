# Formato del banco domande

Il codice non conosce il contenuto del banco: legge `questions/index.json`,
carica i lotti elencati e li unisce. Aggiungere domande significa scrivere un
nuovo file e aggiungere una riga all'indice. I lotti già pubblicati non si
riscrivono mai.

## `questions/index.json`

```json
{
  "schema": 1,
  "aggiornato": "2026-09-05",
  "lotti": ["batch-01.json", "batch-02.json"]
}
```

L'ordine dei lotti è irrilevante. Un `id` duplicato viene scartato: vince la
prima occorrenza e la seconda finisce fra gli avvisi in console.

## `questions/batch-NN.json`

```json
{
  "lotto": "batch-02",
  "generato": "2026-09-12",
  "domande": [ /* … */ ]
}
```

### Domanda a risposta multipla

```json
{
  "id": "u1-0011",
  "unita": "u1",
  "tipo": "multipla",
  "argomento": "Configurazione elettronica e regola di Hund",
  "testo": "…",
  "opzioni": ["…", "…", "…", "…", "…"],
  "corretta": 2,
  "spiegazione": "Perché la corretta è corretta.\n\nA) perché è sbagliata.\nB) …"
}
```

### Domanda a completamento

```json
{
  "id": "u2-0007",
  "unita": "u2",
  "tipo": "completamento",
  "argomento": "Legge di Henry",
  "testo": "La solubilità di un gas in un liquido è direttamente proporzionale alla sua …… parziale.",
  "accettate": ["pressione"],
  "spiegazione": "…"
}
```

## Campi

| campo | obbligatorio | note |
|---|---|---|
| `id` | sì | univoco su tutto il banco. Convenzione: `u<n>-<progressivo a 4 cifre>` |
| `unita` | sì | `u1` … `u7`; un valore diverso fa scartare la domanda |
| `tipo` | sì | `multipla` oppure `completamento` |
| `argomento` | consigliato | mostrato nella correzione e in «I miei errori» |
| `testo` | sì | nei completamenti la lacuna si segna con `……` |
| `opzioni` | solo `multipla` | array, di norma 5 voci (A–E) |
| `corretta` | solo `multipla` | indice a base zero dentro `opzioni` |
| `accettate` | solo `completamento` | tutte le forme accettabili |
| `spiegazione` | sì | perché la giusta è giusta **e** perché le altre no; `\n` per andare a capo |

## Come vengono confrontate le risposte a completamento

Prima del confronto la risposta scritta e ogni voce di `accettate` vengono
normalizzate: minuscole, accenti rimossi, apostrofi e punteggiatura tolti,
spazi compattati, articolo iniziale rimosso (`il`, `lo`, `la`, `un`, `di`, …).
I numeri da zero a venti sono equivalenti alla cifra corrispondente (`uno` = `1`).

Conviene comunque elencare in `accettate` le varianti reali di un termine
(`fosfodiestere`, `fosfodiestereo`, `fosfodiesterico`), perché la
normalizzazione non conosce i sinonimi.

## Dimensione a regime

| unità | obiettivo |
|---|---|
| U1 | 150 |
| U2 | 70 |
| U3 | 70 |
| U4 | 100 |
| U5 | 90 |
| U6 | 70 |
| U7 | 150 |

Generazione a lotti da circa 50 domande.

## Validazione di un lotto prima di pubblicarlo

```bash
python3 tools/valida.py
```

Controlla sintassi JSON, campi obbligatori, indici fuori intervallo, id
duplicati fra tutti i lotti e coerenza con `index.json`.
