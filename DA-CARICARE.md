# Da caricare su GitHub — 2026-10-03

Contiene **solo** i file cambiati rispetto a quanto è pubblicato adesso su
`alassio-eng/TestChimica`. Scompatta mantenendo i percorsi e sovrascrivi.
Risulta non caricato anche il delta dell'unità 5: questo pacchetto lo ingloba,
quindi basta caricare questo.

## 1. Unità 4 completata in tutte e tre le materie

| file | domande | id |
|---|---|---|
| `questions/chimica/chimica-u4-03.json` | 48 (24 multipla + 24 completamento) | `u4-0053` … `u4-0100` |
| `questions/fisica/fisica-u4-01.json` | 50 (25 + 25) | `u4-0001` … `u4-0050` |
| `questions/biologia/biologia-u4-02.json` | 50 (25 + 25) | `u4-0051` … `u4-0100` |
| `questions/biologia/biologia-u4-03.json` | 10 (5 + 5) | `u4-0101` … `u4-0110` |

`fisica-u4-01` riempie il buco di id lasciato dal file mai consegnato.

## 2. Unità 5 (dal delta precedente, non ancora caricato)

`chimica-u5-03.json`, `fisica-u5-02.json`, `biologia-u5-02/03/04.json`.

## 3. Correzione di un difetto di qualità su dieci lotti

In dieci lotti la posizione della risposta corretta avanzava ciclicamente
A, B, C, D, E, A, B… Il banco superava il controllo di uniformità (cinque
risposte per lettera) ma era **indovinabile senza sapere la materia**:
bastava notare il ciclo. L'app non rimescola le opzioni, quindi il difetto
era visibile allo studente.

In ciascun quesito le opzioni sono state permutate e le lettere citate nelle
spiegazioni rimappate di conseguenza. **Gli id non sono stati toccati**, i
testi delle domande e delle spiegazioni sono invariati, la risposta corretta
è sempre la stessa: cambia solo la posizione in cui compare.

Lotti già pubblicati che sono stati corretti:

- `questions/fisica/fisica-u1-02.json` (ciclo di 10 → 2)
- `questions/fisica/fisica-u2-01.json` (14 → 3)
- `questions/fisica/fisica-u2-02.json` (14 → 3)
- `questions/fisica/fisica-u2-03.json` (11 → 2)
- `questions/fisica/fisica-u3-02.json` (25 su 25, ciclo perfetto → 3)
- `questions/biologia/biologia-u1-02.json` (15 → 2)

`tools/valida.py`: aggiunto il controllo che intercetta questo schema. Da
ora un lotto in cui la corretta avanza ciclicamente per sei o più quesiti di
fila genera un avviso esplicito.

## File elencati

- `APERTURA-CHAT.md`
- `COPERTURA.md`
- `questions/biologia/biologia-u1-02.json`
- `questions/biologia/biologia-u4-02.json`  *(nuovo)*
- `questions/biologia/biologia-u4-03.json`  *(nuovo)*
- `questions/biologia/biologia-u5-02.json`  *(nuovo)*
- `questions/biologia/biologia-u5-03.json`  *(nuovo)*
- `questions/biologia/biologia-u5-04.json`  *(nuovo)*
- `questions/biologia/index.json`
- `questions/chimica/chimica-u4-03.json`  *(nuovo)*
- `questions/chimica/chimica-u5-03.json`  *(nuovo)*
- `questions/chimica/index.json`
- `questions/fisica/fisica-u1-02.json`
- `questions/fisica/fisica-u2-01.json`
- `questions/fisica/fisica-u2-02.json`
- `questions/fisica/fisica-u2-03.json`
- `questions/fisica/fisica-u3-02.json`
- `questions/fisica/fisica-u4-01.json`  *(nuovo)*
- `questions/fisica/fisica-u5-02.json`  *(nuovo)*
- `questions/fisica/index.json`
- `questions/index.json`
- `tools/valida.py`

## Dopo il caricamento

Banco a 1712 domande: chimica 552, fisica 560, biologia 600.
Nessun file del guscio è cambiato: `VERSIONE` in `sw.js` resta `v10`.
