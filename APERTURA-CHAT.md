# Testi di apertura delle chat di generazione

Uno per unità. Ogni chat possiede la sua unità e la porta all'obiettivo per intero, consegnando un file per volta secondo un piano già calcolato: nomi dei file, numero di domande e intervalli di id sono scritti nel testo, così non resta niente da decidere a memoria.

Rigenerabile con `python3 tools/prossimo.py --tutti`: i nomi dei file e i primi id liberi sono calcolati sui dati del repository, non scritti a mano.


---

# Chimica e propedeutica biochimica

## U1 — Atomo, legami, stati della materia, termodinamica

Obiettivo raggiunto (150/150): nessuna chat da aprire.

## U2 — Miscele, soluzioni, proprietà colligative

Obiettivo raggiunto (70/70): nessuna chat da aprire.

## U3 — Cinetica ed equilibrio chimico

Obiettivo raggiunto (70/70): nessuna chat da aprire.

## U4 — Acidi, basi, tamponi, redox ed elettrochimica

Obiettivo raggiunto (100/100): nessuna chat da aprire.

## U5 — Carbonio, idrocarburi, aromatici

Obiettivo raggiunto (90/90): nessuna chat da aprire.

## U6 — Gruppi funzionali e isomerie

Obiettivo raggiunto (70/70): nessuna chat da aprire.

## U7 — Amminoacidi, carboidrati, lipidi, acidi nucleici

2/150 nel banco · mancano 148 domande in 3 file: `chimica-u7-02.json` … `chimica-u7-04.json`, id da `u7-0003` a `u7-0150`

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U7. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U7 — Amminoacidi, carboidrati, lipidi, acidi nucleici
Obiettivo: 150 domande in totale. Nel banco ci sono già 2 domande di questa unità, con id da u7-0001 a u7-0002. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.
Mancano 148 domande, che consegnerai in 3 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. chimica-u7-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u7-0003 a u7-0052
2. chimica-u7-03.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u7-0053 a u7-0102
3. chimica-u7-04.json — 48 domande (24 a risposta multipla e 24 a completamento), id da u7-0103 a u7-0150

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u7", "domande": [ … ] }
Dentro ogni file gli id sono progressivi e senza buchi, esattamente nell'intervallo indicato per quel file: né uno in più né uno in meno.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 148 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

POI, UN FILE PER VOLTA
Consegni il file, io lo valido e ti dico «prossimo». Non anticipare il file successivo e non riaprire quelli già consegnati. Se ti accorgi di un errore in un file già consegnato, dimmelo invece di rigenerarlo: correggere il testo di una domanda è innocuo, cambiarne l'id no.

COME DEVONO ESSERE LE DOMANDE
- Formato JSON, campi obbligatori e normalizzazione delle risposte accettate: SPEC-NUOVA-MATERIA.md, nella knowledge del progetto. Leggila per intero prima di cominciare.
- Il perimetro è il syllabus: niente che stia oltre il programma.
- Distrattori che corrispondono a errori che uno studente commette davvero, non opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia. In "accettate" elenca tutte le forme legittime — singolare e plurale, sinonimi ammessi, sigla ed esteso.
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i due modi con cui un banco diventa indovinabile senza sapere la materia. Controllali tu prima di consegnare ogni file.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

ALTRO
Non toccare index.json e non rigenerarlo: alla registrazione dei file ci penso io. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»: non hai modo di saperlo. Italiano, tono asciutto, niente incoraggiamenti di circostanza.
```


---

# Fisica

## U1 — Introduzione ai metodi della fisica

Obiettivo raggiunto (80/70): nessuna chat da aprire.

## U2 — Meccanica

Obiettivo raggiunto (130/130): nessuna chat da aprire.

## U3 — Meccanica dei fluidi

60/110 nel banco · mancano 50 domande in 1 file: `fisica-u3-01.json` … `fisica-u3-01.json`, id da `u3-0001` a `u3-0050`

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U3. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U3 — Meccanica dei fluidi
Obiettivo: 110 domande in totale. Nel banco ci sono già 60 domande di questa unità, con id da u3-0051 a u3-0110. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo. Resta però libero un intervallo di id, lasciato da un file mai consegnato: il piano qui sotto lo copre per primo.
Mancano 50 domande, che consegnerai in 1 file.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. fisica-u3-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u3-0001 a u3-0050

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u3", "domande": [ … ] }
Dentro ogni file gli id sono progressivi e senza buchi, esattamente nell'intervallo indicato per quel file: né uno in più né uno in meno.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 50 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

POI, UN FILE PER VOLTA
Consegni il file, io lo valido e ti dico «prossimo». Non anticipare il file successivo e non riaprire quelli già consegnati. Se ti accorgi di un errore in un file già consegnato, dimmelo invece di rigenerarlo: correggere il testo di una domanda è innocuo, cambiarne l'id no.

COME DEVONO ESSERE LE DOMANDE
- Formato JSON, campi obbligatori e normalizzazione delle risposte accettate: SPEC-NUOVA-MATERIA.md, nella knowledge del progetto. Leggila per intero prima di cominciare.
- Il perimetro è il syllabus: niente che stia oltre il programma.
- Distrattori che corrispondono a errori che uno studente commette davvero, non opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia. In "accettate" elenca tutte le forme legittime — singolare e plurale, sinonimi ammessi, sigla ed esteso.
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i due modi con cui un banco diventa indovinabile senza sapere la materia. Controllali tu prima di consegnare ogni file.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

ALTRO
Non toccare index.json e non rigenerarlo: alla registrazione dei file ci penso io. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»: non hai modo di saperlo. Italiano, tono asciutto, niente incoraggiamenti di circostanza.
```

## U4 — Onde meccaniche

Obiettivo raggiunto (70/70): nessuna chat da aprire.

## U5 — Termodinamica

Obiettivo raggiunto (100/100): nessuna chat da aprire.

## U6 — Elettricità e magnetismo

Obiettivo raggiunto (120/120): nessuna chat da aprire.

## U7 — Fisica delle radiazioni

0/80 nel banco · mancano 80 domande in 2 file: `fisica-u7-01.json` … `fisica-u7-02.json`, id da `u7-0001` a `u7-0080`

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U7. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U7 — Fisica delle radiazioni
Obiettivo: 80 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 80 domande, che consegnerai in 2 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. fisica-u7-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u7-0001 a u7-0050
2. fisica-u7-02.json — 30 domande (15 a risposta multipla e 15 a completamento), id da u7-0051 a u7-0080

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u7", "domande": [ … ] }
Dentro ogni file gli id sono progressivi e senza buchi, esattamente nell'intervallo indicato per quel file: né uno in più né uno in meno.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 80 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

POI, UN FILE PER VOLTA
Consegni il file, io lo valido e ti dico «prossimo». Non anticipare il file successivo e non riaprire quelli già consegnati. Se ti accorgi di un errore in un file già consegnato, dimmelo invece di rigenerarlo: correggere il testo di una domanda è innocuo, cambiarne l'id no.

COME DEVONO ESSERE LE DOMANDE
- Formato JSON, campi obbligatori e normalizzazione delle risposte accettate: SPEC-NUOVA-MATERIA.md, nella knowledge del progetto. Leggila per intero prima di cominciare.
- Il perimetro è il syllabus: niente che stia oltre il programma.
- Distrattori che corrispondono a errori che uno studente commette davvero, non opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia. In "accettate" elenca tutte le forme legittime — singolare e plurale, sinonimi ammessi, sigla ed esteso.
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i due modi con cui un banco diventa indovinabile senza sapere la materia. Controllali tu prima di consegnare ogni file.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

ALTRO
Non toccare index.json e non rigenerarlo: alla registrazione dei file ci penso io. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»: non hai modo di saperlo. Italiano, tono asciutto, niente incoraggiamenti di circostanza.
```


---

# Biologia

## U1 — Le basi dell'organizzazione biologica e molecolare della vita

Obiettivo raggiunto (80/80): nessuna chat da aprire.

## U2 — I meccanismi cellulari di trasmissione e controllo dell'informazione genetica e epigenetica

Obiettivo raggiunto (60/60): nessuna chat da aprire.

## U3 — Il flusso dell'informazione

50/180 nel banco · mancano 130 domande in 3 file: `biologia-u3-01.json` … `biologia-u3-04.json`, id da `u3-0001` a `u3-0180`

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U3. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U3 — Il flusso dell'informazione
Obiettivo: 180 domande in totale. Nel banco ci sono già 50 domande di questa unità, con id da u3-0101 a u3-0150. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo. Resta però libero un intervallo di id, lasciato da un file mai consegnato: il piano qui sotto lo copre per primo.
Mancano 130 domande, che consegnerai in 3 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. biologia-u3-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u3-0001 a u3-0050
2. biologia-u3-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u3-0051 a u3-0100
3. biologia-u3-04.json — 30 domande (15 a risposta multipla e 15 a completamento), id da u3-0151 a u3-0180

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u3", "domande": [ … ] }
Dentro ogni file gli id sono progressivi e senza buchi, esattamente nell'intervallo indicato per quel file: né uno in più né uno in meno.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 130 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

POI, UN FILE PER VOLTA
Consegni il file, io lo valido e ti dico «prossimo». Non anticipare il file successivo e non riaprire quelli già consegnati. Se ti accorgi di un errore in un file già consegnato, dimmelo invece di rigenerarlo: correggere il testo di una domanda è innocuo, cambiarne l'id no.

COME DEVONO ESSERE LE DOMANDE
- Formato JSON, campi obbligatori e normalizzazione delle risposte accettate: SPEC-NUOVA-MATERIA.md, nella knowledge del progetto. Leggila per intero prima di cominciare.
- Il perimetro è il syllabus: niente che stia oltre il programma.
- Distrattori che corrispondono a errori che uno studente commette davvero, non opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia. In "accettate" elenca tutte le forme legittime — singolare e plurale, sinonimi ammessi, sigla ed esteso.
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i due modi con cui un banco diventa indovinabile senza sapere la materia. Controllali tu prima di consegnare ogni file.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

ALTRO
Non toccare index.json e non rigenerarlo: alla registrazione dei file ci penso io. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»: non hai modo di saperlo. Italiano, tono asciutto, niente incoraggiamenti di circostanza.
```

## U4 — I meccanismi cellulari di trasmissione e controllo dei caratteri selvatici e mutati

Obiettivo raggiunto (110/110): nessuna chat da aprire.

## U5 — Le strutture cellulari: biogenesi, morfologia e funzioni

Obiettivo raggiunto (200/200): nessuna chat da aprire.

## U6 — La cellula e l'ambiente, la segnalazione cellulare e la trasduzione del segnale

Obiettivo raggiunto (100/100): nessuna chat da aprire.

## U7 — Il controllo della proliferazione e della sopravvivenza cellulare

0/90 nel banco · mancano 90 domande in 2 file: `biologia-u7-01.json` … `biologia-u7-02.json`, id da `u7-0001` a `u7-0090`

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U7. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U7 — Il controllo della proliferazione e della sopravvivenza cellulare
Obiettivo: 90 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 90 domande, che consegnerai in 2 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. biologia-u7-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u7-0001 a u7-0050
2. biologia-u7-02.json — 40 domande (20 a risposta multipla e 20 a completamento), id da u7-0051 a u7-0090

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u7", "domande": [ … ] }
Dentro ogni file gli id sono progressivi e senza buchi, esattamente nell'intervallo indicato per quel file: né uno in più né uno in meno.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 90 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

POI, UN FILE PER VOLTA
Consegni il file, io lo valido e ti dico «prossimo». Non anticipare il file successivo e non riaprire quelli già consegnati. Se ti accorgi di un errore in un file già consegnato, dimmelo invece di rigenerarlo: correggere il testo di una domanda è innocuo, cambiarne l'id no.

COME DEVONO ESSERE LE DOMANDE
- Formato JSON, campi obbligatori e normalizzazione delle risposte accettate: SPEC-NUOVA-MATERIA.md, nella knowledge del progetto. Leggila per intero prima di cominciare.
- Il perimetro è il syllabus: niente che stia oltre il programma.
- Distrattori che corrispondono a errori che uno studente commette davvero, non opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia. In "accettate" elenca tutte le forme legittime — singolare e plurale, sinonimi ammessi, sigla ed esteso.
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i due modi con cui un banco diventa indovinabile senza sapere la materia. Controllali tu prima di consegnare ogni file.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

ALTRO
Non toccare index.json e non rigenerarlo: alla registrazione dei file ci penso io. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»: non hai modo di saperlo. Italiano, tono asciutto, niente incoraggiamenti di circostanza.
```

