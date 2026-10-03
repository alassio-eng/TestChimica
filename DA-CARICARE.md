# Da caricare su GitHub — 2026-10-03

Contiene **solo** i file cambiati rispetto a quanto è pubblicato adesso su
`alassio-eng/TestChimica`. Scompatta mantenendo i percorsi e sovrascrivi.
Il delta precedente (unità 3) risulta già caricato.

## Unità 7 completata in tutte e tre le materie

| file | domande | id |
|---|---|---|
| `questions/chimica/chimica-u7-02.json` | 50 | `u7-0003` … `u7-0052` |
| `questions/chimica/chimica-u7-03.json` | 50 | `u7-0053` … `u7-0102` |
| `questions/chimica/chimica-u7-04.json` | 48 | `u7-0103` … `u7-0150` |
| `questions/fisica/fisica-u7-01.json` | 50 | `u7-0001` … `u7-0050` |
| `questions/fisica/fisica-u7-02.json` | 30 | `u7-0051` … `u7-0080` |
| `questions/biologia/biologia-u7-01.json` | 50 | `u7-0001` … `u7-0050` |
| `questions/biologia/biologia-u7-02.json` | 40 | `u7-0051` … `u7-0090` |

**Con questo caricamento chimica è completa: 700 domande su 700.**

Due correzioni rispetto ai file ricevuti:

- `fisica-u7-01`: la posizione della risposta corretta avanzava ciclicamente
  per 6 quesiti di fila (B, C, D, E, A, B). Opzioni permutate e lettere delle
  spiegazioni rimappate; id, testi e risposte corrette invariati.
- `chimica-u7-03`, quesito `u7-0076`: tolta dalle risposte accettate la voce
  «di maillard», equivalente a «maillard» dopo la normalizzazione.

## Stato del banco dopo il caricamento

| materia | domande | obiettivo | copertura |
|---|---|---|---|
| Chimica | 700 | 700 | **100%** |
| Fisica | 640 | 680 | 93% |
| Biologia | 720 | 820 | 88% |
| **Totale** | **2060** | **2200** | 94% |

Restano 150 domande in tre file, tutti buchi di id:
`fisica-u3-01` (`u3-0001` … `u3-0050`),
`biologia-u3-01` (`u3-0001` … `u3-0050`),
`biologia-u3-02` (`u3-0051` … `u3-0100`).

Nessun file del guscio è cambiato: `VERSIONE` in `sw.js` resta `v10`.

## File elencati

- `APERTURA-CHAT.md`
- `COPERTURA.md`
- `questions/biologia/biologia-u7-01.json`  *(nuovo)*
- `questions/biologia/biologia-u7-02.json`  *(nuovo)*
- `questions/biologia/index.json`
- `questions/chimica/chimica-u7-02.json`  *(nuovo)*
- `questions/chimica/chimica-u7-03.json`  *(nuovo)*
- `questions/chimica/chimica-u7-04.json`  *(nuovo)*
- `questions/chimica/index.json`
- `questions/fisica/fisica-u7-01.json`  *(nuovo)*
- `questions/fisica/fisica-u7-02.json`  *(nuovo)*
- `questions/fisica/index.json`
