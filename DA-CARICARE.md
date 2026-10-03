# Da caricare su GitHub — 2026-10-03

Contiene **solo** i file cambiati rispetto a quanto è pubblicato adesso su
`alassio-eng/TestChimica`. Scompatta mantenendo i percorsi e sovrascrivi.
Il delta precedente risulta caricato: qui non c'è nulla che lo ripeta.

## Dei cinque file che mi hai passato ne ho integrati tre

| file | esito |
|---|---|
| `biologia-u3-04.json` | **nuovo**, integrato: 30 domande, id `u3-0151` … `u3-0180` |
| `chimica-u3-02.json` | **sostituito**: la nuova versione corregge un difetto vero |
| `chimica-u3-03.json` | **sostituito**: stessa correzione |
| `fisica-u3-03.json` | identico a quello già nel banco, scartato |
| `fisica-u3-02.json` | **scartato**: è la versione precedente alla correzione del ciclo |

### Perché ho sostituito i due file di chimica

Nelle versioni finora pubblicate tutte e 34 le spiegazioni dei quesiti a
risposta multipla commentavano i distrattori con formule posizionali del tipo
«la prima opzione…» invece di citarli per lettera. Era un difetto noto, che
il validatore segnalava da sempre con 34 avvisi: non l'avevo corretto perché
le formulazioni erano troppo irregolari per una conversione meccanica sicura.
Le versioni nuove lo risolvono: tutte le spiegazioni ora citano `A)`, `B)` e
così via. Gli id, i testi dei quesiti, le opzioni e le risposte corrette sono
rimasti identici; cambiano solo le spiegazioni e qualche voce delle risposte
accettate.

### Perché ho scartato fisica-u3-02

La versione che mi hai passato è quella **precedente** alla correzione fatta
ieri: in essa la posizione della risposta corretta avanza ciclicamente
A, B, C, D, E per tutti e 25 i quesiti, il che rende il lotto indovinabile
senza sapere la materia. Caricarla avrebbe annullato la correzione. Il
contenuto è per il resto identico: stessi id, stesse domande, stesse risposte
corrette, cambia solo l'ordine in cui le opzioni compaiono.

## Stato dopo il caricamento

Banco a 1742 domande: chimica 552, fisica 560, biologia 630.
Biologia U3 passa da 50 a 80 su 180.
Nessun file del guscio è cambiato: `VERSIONE` in `sw.js` resta `v10`.

## File elencati

- `APERTURA-CHAT.md`
- `COPERTURA.md`
- `questions/biologia/biologia-u3-04.json`  *(nuovo)*
- `questions/biologia/index.json`
- `questions/chimica/chimica-u3-02.json`
- `questions/chimica/chimica-u3-03.json`
