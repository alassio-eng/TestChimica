# Testi di apertura delle chat di generazione

Uno per unità. Ogni chat possiede la sua unità e la porta all'obiettivo un lotto alla volta.

Rigenerabile con `python3 tools/prossimo.py --tutti`: i nomi dei file e i primi id liberi sono calcolati sui dati del repository, non scritti a mano.


---

# Chimica e propedeutica biochimica

## U1 — Atomo, legami, stati della materia, termodinamica

Obiettivo raggiunto (150/150): nessuna chat da aprire.

## U2 — Miscele, soluzioni, proprietà colligative

Obiettivo raggiunto (70/70): nessuna chat da aprire.

## U3 — Cinetica ed equilibrio chimico

`chimica-u3-02.json` · da `u3-0002` · 1/70 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U3. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U3 — Cinetica ed equilibrio chimico
Obiettivo: 70 domande in totale. Nel banco ci sono già 1 domande di questa unità, con id fino a u3-0001. Non riscriverle, non rigenerare i file esistenti e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.

QUESTO LOTTO
- file da produrre: chimica-u3-02.json
- dentro il file: campo "lotto" = "chimica-u3-02", campo "unita" = "u3"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u3-0002 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U4 — Acidi, basi, tamponi, redox ed elettrochimica

`chimica-u4-02.json` · da `u4-0003` · 2/100 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U4. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U4 — Acidi, basi, tamponi, redox ed elettrochimica
Obiettivo: 100 domande in totale. Nel banco ci sono già 2 domande di questa unità, con id fino a u4-0002. Non riscriverle, non rigenerare i file esistenti e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.

QUESTO LOTTO
- file da produrre: chimica-u4-02.json
- dentro il file: campo "lotto" = "chimica-u4-02", campo "unita" = "u4"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u4-0003 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U5 — Carbonio, idrocarburi, aromatici

`chimica-u5-02.json` · da `u5-0002` · 1/90 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U5. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U5 — Carbonio, idrocarburi, aromatici
Obiettivo: 90 domande in totale. Nel banco ci sono già 1 domande di questa unità, con id fino a u5-0001. Non riscriverle, non rigenerare i file esistenti e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.

QUESTO LOTTO
- file da produrre: chimica-u5-02.json
- dentro il file: campo "lotto" = "chimica-u5-02", campo "unita" = "u5"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u5-0002 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U6 — Gruppi funzionali e isomerie

`chimica-u6-02.json` · da `u6-0002` · 1/70 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U6. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U6 — Gruppi funzionali e isomerie
Obiettivo: 70 domande in totale. Nel banco ci sono già 1 domande di questa unità, con id fino a u6-0001. Non riscriverle, non rigenerare i file esistenti e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.

QUESTO LOTTO
- file da produrre: chimica-u6-02.json
- dentro il file: campo "lotto" = "chimica-u6-02", campo "unita" = "u6"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u6-0002 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U7 — Amminoacidi, carboidrati, lipidi, acidi nucleici

`chimica-u7-02.json` · da `u7-0003` · 2/150 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Chimica e propedeutica biochimica: la U7. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U7 — Amminoacidi, carboidrati, lipidi, acidi nucleici
Obiettivo: 150 domande in totale. Nel banco ci sono già 2 domande di questa unità, con id fino a u7-0002. Non riscriverle, non rigenerare i file esistenti e non riusare quegli id: sono agganciati allo storico delle mie risposte sul dispositivo.

QUESTO LOTTO
- file da produrre: chimica-u7-02.json
- dentro il file: campo "lotto" = "chimica-u7-02", campo "unita" = "u7"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u7-0003 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```


---

# Fisica

## U1 — Introduzione ai metodi della fisica

Obiettivo raggiunto (80/70): nessuna chat da aprire.

## U2 — Meccanica

Obiettivo raggiunto (130/130): nessuna chat da aprire.

## U3 — Meccanica dei fluidi

`fisica-u3-01.json` · da `u3-0001` · 0/110 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U3. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U3 — Meccanica dei fluidi
Obiettivo: 110 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: fisica-u3-01.json
- dentro il file: campo "lotto" = "fisica-u3-01", campo "unita" = "u3"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u3-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U4 — Onde meccaniche

`fisica-u4-01.json` · da `u4-0001` · 0/70 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U4. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U4 — Onde meccaniche
Obiettivo: 70 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: fisica-u4-01.json
- dentro il file: campo "lotto" = "fisica-u4-01", campo "unita" = "u4"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u4-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U5 — Termodinamica

`fisica-u5-01.json` · da `u5-0001` · 0/100 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U5. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U5 — Termodinamica
Obiettivo: 100 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: fisica-u5-01.json
- dentro il file: campo "lotto" = "fisica-u5-01", campo "unita" = "u5"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u5-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U6 — Elettricità e magnetismo

`fisica-u6-01.json` · da `u6-0001` · 0/120 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U6. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U6 — Elettricità e magnetismo
Obiettivo: 120 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: fisica-u6-01.json
- dentro il file: campo "lotto" = "fisica-u6-01", campo "unita" = "u6"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u6-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U7 — Fisica delle radiazioni

`fisica-u7-01.json` · da `u7-0001` · 0/80 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Fisica: la U7. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U7 — Fisica delle radiazioni
Obiettivo: 80 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: fisica-u7-01.json
- dentro il file: campo "lotto" = "fisica-u7-01", campo "unita" = "u7"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u7-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```


---

# Biologia

## U1 — Le basi dell'organizzazione biologica e molecolare della vita

Obiettivo raggiunto (80/80): nessuna chat da aprire.

## U2 — I meccanismi cellulari di trasmissione e controllo dell'informazione genetica e epigenetica

Obiettivo raggiunto (60/60): nessuna chat da aprire.

## U3 — Il flusso dell'informazione

`biologia-u3-01.json` · da `u3-0001` · 0/180 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U3. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U3 — Il flusso dell'informazione
Obiettivo: 180 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: biologia-u3-01.json
- dentro il file: campo "lotto" = "biologia-u3-01", campo "unita" = "u3"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u3-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U4 — I meccanismi cellulari di trasmissione e controllo dei caratteri selvatici e mutati

`biologia-u4-01.json` · da `u4-0001` · 0/110 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U4. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U4 — I meccanismi cellulari di trasmissione e controllo dei caratteri selvatici e mutati
Obiettivo: 110 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: biologia-u4-01.json
- dentro il file: campo "lotto" = "biologia-u4-01", campo "unita" = "u4"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u4-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U5 — Le strutture cellulari: biogenesi, morfologia e funzioni

`biologia-u5-01.json` · da `u5-0001` · 0/200 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U5. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U5 — Le strutture cellulari: biogenesi, morfologia e funzioni
Obiettivo: 200 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: biologia-u5-01.json
- dentro il file: campo "lotto" = "biologia-u5-01", campo "unita" = "u5"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u5-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U6 — La cellula e l'ambiente, la segnalazione cellulare e la trasduzione del segnale

`biologia-u6-01.json` · da `u6-0001` · 0/100 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U6. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U6 — La cellula e l'ambiente, la segnalazione cellulare e la trasduzione del segnale
Obiettivo: 100 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: biologia-u6-01.json
- dentro il file: campo "lotto" = "biologia-u6-01", campo "unita" = "u6"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u6-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

## U7 — Il controllo della proliferazione e della sopravvivenza cellulare

`biologia-u7-01.json` · da `u7-0001` · 0/90 nel banco

```text
Sei la chat che si occupa di una sola unità del banco domande di Biologia: la U7. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
U7 — Il controllo della proliferazione e della sopravvivenza cellulare
Obiettivo: 90 domande in totale. Nel banco non c'è ancora nessuna domanda di questa unità: questo è il primo lotto.

QUESTO LOTTO
- file da produrre: biologia-u7-01.json
- dentro il file: campo "lotto" = "biologia-u7-01", campo "unita" = "u7"
- 50 domande: 25 a risposta multipla e 25 a completamento
- id progressivi da u7-0001 in avanti, senza salti e senza buchi
- formato JSON, regole di qualità e normalizzazione delle risposte accettate:
  seguili da SPEC-NUOVA-MATERIA.md, che trovi nella knowledge del progetto
- il perimetro è il syllabus dell'insegnamento: niente che stia oltre il programma

COME DEVONO ESSERE LE DOMANDE
- Distrattori che corrispondono a errori che uno studente commette davvero, non
  opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito ti risulta
  ambiguo, riscrivilo invece di consegnarlo.
- Nei completamenti si chiede il termine esatto: sono quesiti di terminologia.
  Elenca in "accettate" tutte le forme legittime (singolare e plurale, sinonimi
  ammessi, sigla ed esteso).
- Ogni spiegazione dice perché la corretta è corretta E perché le altre non lo
  sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A ed
  E, e la corretta non deve essere sistematicamente l'opzione più lunga: sono i
  due modi con cui un banco diventa indovinabile senza sapere la materia.
- Precisione prima di tutto: se non sei certo di un dato, dimmelo invece di
  arrotondare. Un errore in una tua spiegazione me lo porto all'esame.

PROCEDURA
1. Prima di scrivere, elencami gli argomenti del syllabus che questo lotto
   coprirà, e tienine traccia: ai lotti successivi ripartirai da lì, senza
   ripetere i concetti già coperti.
2. Poi produci il file, come JSON completo, valido e scaricabile — solo il
   file, senza commento intorno.
3. Non toccare index.json e non rigenerarlo: all'inserimento del nome del file
   nell'array "lotti" ci penso io.
4. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
   non hai modo di saperlo.

Quando ti chiederò il lotto successivo ti ricorderò l'ultimo id usato. Tono
asciutto, italiano, niente incoraggiamenti di circostanza.
```

