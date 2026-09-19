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

52/100 nel banco · mancano 48 domande in 1 file: `chimica-u4-03.json` … `chimica-u4-03.json`, id da `u4-0053` a `u4-0100`

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U4. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U4 — Acidi, basi, tamponi, redox ed elettrochimica
Obiettivo: 100 domande in totale. Nel banco ci sono già 52 domande di questa unità, con id fino a u4-0052. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.
Mancano 48 domande, che consegnerai in 1 file.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. chimica-u4-03.json — 48 domande (24 a risposta multipla e 24 a completamento), id da u4-0053 a u4-0100

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u4", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 48 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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

## U5 — Carbonio, idrocarburi, aromatici

1/90 nel banco · mancano 89 domande in 2 file: `chimica-u5-02.json` … `chimica-u5-03.json`, id da `u5-0002` a `u5-0090`

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U5. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U5 — Carbonio, idrocarburi, aromatici
Obiettivo: 90 domande in totale. Nel banco ci sono già 1 domande di questa unità, con id fino a u5-0001. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.
Mancano 89 domande, che consegnerai in 2 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. chimica-u5-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u5-0002 a u5-0051
2. chimica-u5-03.json — 39 domande (19 a risposta multipla e 20 a completamento), id da u5-0052 a u5-0090

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u5", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 89 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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

## U6 — Gruppi funzionali e isomerie

1/70 nel banco · mancano 69 domande in 2 file: `chimica-u6-02.json` … `chimica-u6-03.json`, id da `u6-0002` a `u6-0070`

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U6. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U6 — Gruppi funzionali e isomerie
Obiettivo: 70 domande in totale. Nel banco ci sono già 1 domande di questa unità, con id fino a u6-0001. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.
Mancano 69 domande, che consegnerai in 2 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. chimica-u6-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u6-0002 a u6-0051
2. chimica-u6-03.json — 19 domande (9 a risposta multipla e 10 a completamento), id da u6-0052 a u6-0070

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u6", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 69 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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

## U7 — Amminoacidi, carboidrati, lipidi, acidi nucleici

2/150 nel banco · mancano 148 domande in 3 file: `chimica-u7-02.json` … `chimica-u7-04.json`, id da `u7-0003` a `u7-0150`

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U7. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U7 — Amminoacidi, carboidrati, lipidi, acidi nucleici
Obiettivo: 150 domande in totale. Nel banco ci sono già 2 domande di questa unità, con id fino a u7-0002. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.
Mancano 148 domande, che consegnerai in 3 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. chimica-u7-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u7-0003 a u7-0052
2. chimica-u7-03.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u7-0053 a u7-0102
3. chimica-u7-04.json — 48 domande (24 a risposta multipla e 24 a completamento), id da u7-0103 a u7-0150

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u7", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

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

60/110 nel banco · mancano 50 domande in 1 file: `fisica-u3-04.json` … `fisica-u3-04.json`, id da `u3-0111` a `u3-0160`

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U3. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U3 — Meccanica dei fluidi
Obiettivo: 110 domande in totale. Nel banco ci sono già 60 domande di questa unità, con id fino a u3-0110. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.
Mancano 50 domande, che consegnerai in 1 file.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. fisica-u3-04.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u3-0111 a u3-0160

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u3", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

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

0/70 nel banco · mancano 70 domande in 2 file: `fisica-u4-01.json` … `fisica-u4-02.json`, id da `u4-0001` a `u4-0070`

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U4. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U4 — Onde meccaniche
Obiettivo: 70 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 70 domande, che consegnerai in 2 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. fisica-u4-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u4-0001 a u4-0050
2. fisica-u4-02.json — 20 domande (10 a risposta multipla e 10 a completamento), id da u4-0051 a u4-0070

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u4", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 70 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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

## U5 — Termodinamica

0/100 nel banco · mancano 100 domande in 2 file: `fisica-u5-01.json` … `fisica-u5-02.json`, id da `u5-0001` a `u5-0100`

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U5. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U5 — Termodinamica
Obiettivo: 100 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 100 domande, che consegnerai in 2 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. fisica-u5-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u5-0001 a u5-0050
2. fisica-u5-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u5-0051 a u5-0100

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u5", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 100 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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

## U6 — Elettricità e magnetismo

0/120 nel banco · mancano 120 domande in 3 file: `fisica-u6-01.json` … `fisica-u6-03.json`, id da `u6-0001` a `u6-0120`

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U6. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U6 — Elettricità e magnetismo
Obiettivo: 120 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 120 domande, che consegnerai in 3 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. fisica-u6-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u6-0001 a u6-0050
2. fisica-u6-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u6-0051 a u6-0100
3. fisica-u6-03.json — 20 domande (10 a risposta multipla e 10 a completamento), id da u6-0101 a u6-0120

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u6", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 120 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

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

50/180 nel banco · mancano 130 domande in 3 file: `biologia-u3-04.json` … `biologia-u3-06.json`, id da `u3-0151` a `u3-0280`

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U3. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U3 — Il flusso dell'informazione
Obiettivo: 180 domande in totale. Nel banco ci sono già 50 domande di questa unità, con id fino a u3-0150. Non riscriverle, non rigenerare i file che le contengono e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.
Mancano 130 domande, che consegnerai in 3 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. biologia-u3-04.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u3-0151 a u3-0200
2. biologia-u3-05.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u3-0201 a u3-0250
3. biologia-u3-06.json — 30 domande (15 a risposta multipla e 15 a completamento), id da u3-0251 a u3-0280

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u3", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

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

0/110 nel banco · mancano 110 domande in 3 file: `biologia-u4-01.json` … `biologia-u4-03.json`, id da `u4-0001` a `u4-0110`

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U4. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U4 — I meccanismi cellulari di trasmissione e controllo dei caratteri selvatici e mutati
Obiettivo: 110 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 110 domande, che consegnerai in 3 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. biologia-u4-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u4-0001 a u4-0050
2. biologia-u4-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u4-0051 a u4-0100
3. biologia-u4-03.json — 10 domande (5 a risposta multipla e 5 a completamento), id da u4-0101 a u4-0110

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u4", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 110 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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

## U5 — Le strutture cellulari: biogenesi, morfologia e funzioni

0/200 nel banco · mancano 200 domande in 4 file: `biologia-u5-01.json` … `biologia-u5-04.json`, id da `u5-0001` a `u5-0200`

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U5. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U5 — Le strutture cellulari: biogenesi, morfologia e funzioni
Obiettivo: 200 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 200 domande, che consegnerai in 4 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. biologia-u5-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u5-0001 a u5-0050
2. biologia-u5-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u5-0051 a u5-0100
3. biologia-u5-03.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u5-0101 a u5-0150
4. biologia-u5-04.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u5-0151 a u5-0200

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u5", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 200 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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

## U6 — La cellula e l'ambiente, la segnalazione cellulare e la trasduzione del segnale

0/100 nel banco · mancano 100 domande in 2 file: `biologia-u6-01.json` … `biologia-u6-02.json`, id da `u6-0001` a `u6-0100`

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U6. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
U6 — La cellula e l'ambiente, la segnalazione cellulare e la trasduzione del segnale
Obiettivo: 100 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: parti da zero.
Mancano 100 domande, che consegnerai in 2 file successivi.

PIANO DEI FILE — già calcolato, seguilo alla lettera
1. biologia-u6-01.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u6-0001 a u6-0050
2. biologia-u6-02.json — 50 domande (25 a risposta multipla e 25 a completamento), id da u6-0051 a u6-0100

Ogni file è un JSON completo e valido con questa forma:
{ "lotto": "<nome del file senza .json>", "unita": "u6", "domande": [ … ] }
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle 100 domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

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

