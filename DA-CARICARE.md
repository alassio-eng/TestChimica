# Da caricare su GitHub — 2026-10-02

Contiene **solo** i file cambiati rispetto a quanto è pubblicato adesso su
`alassio-eng/TestChimica`. Scompatta mantenendo i percorsi e sovrascrivi.

Questo pacchetto **sostituisce e ingloba** il delta precedente: sul repository
online i lotti `-u6-01` non risultavano ancora caricati, quindi ci sono anche
quelli. Caricare solo questo è sufficiente.

## Cosa cambia

L'unità 6 è completa in tutte e tre le materie.

| file | domande | id |
|---|---|---|
| `questions/chimica/chimica-u6-02.json` | 50 | `u6-0002` … `u6-0051` |
| `questions/chimica/chimica-u6-03.json` | 19 | `u6-0052` … `u6-0070` |
| `questions/fisica/fisica-u6-01.json` | 50 | `u6-0001` … `u6-0050` |
| `questions/fisica/fisica-u6-02.json` | 50 | `u6-0051` … `u6-0100` |
| `questions/fisica/fisica-u6-03.json` | 20 | `u6-0101` … `u6-0120` |
| `questions/biologia/biologia-u6-01.json` | 50 | `u6-0001` … `u6-0050` |
| `questions/biologia/biologia-u6-02.json` | 50 | `u6-0051` … `u6-0100` |

Chimica U6 70/70, fisica U6 120/120, biologia U6 100/100. Banco a 1315 domande.

I tre `index.json` di materia registrano i lotti nuovi e aggiornano la data;
`questions/index.json` aggiorna solo la data.

`tools/valida.py`: corretta l'espressione regolare che riconosce le citazioni
dei distrattori nelle spiegazioni. Prima scambiava per citazioni le lettere
dentro `V_B)` e `(circa 60 °C)`, segnalando come errori due domande corrette.

`COPERTURA.md` e `APERTURA-CHAT.md` sono rigenerati dai dati.

## File elencati

- `APERTURA-CHAT.md`
- `COPERTURA.md`
- `questions/biologia/biologia-u6-01.json`  *(nuovo)*
- `questions/biologia/biologia-u6-02.json`  *(nuovo)*
- `questions/biologia/index.json`
- `questions/chimica/chimica-u6-02.json`  *(nuovo)*
- `questions/chimica/chimica-u6-03.json`  *(nuovo)*
- `questions/chimica/index.json`
- `questions/fisica/fisica-u6-01.json`  *(nuovo)*
- `questions/fisica/fisica-u6-02.json`  *(nuovo)*
- `questions/fisica/fisica-u6-03.json`  *(nuovo)*
- `questions/fisica/index.json`
- `questions/index.json`
- `tools/valida.py`

## Dopo il caricamento

Nessun file del guscio è cambiato: `VERSIONE` in `sw.js` resta `v10` e i lotti
nuovi compaiono alla prima apertura dell'app.
