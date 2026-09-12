# Dove sta cosa, e cosa scrivere nelle istruzioni del progetto Claude

Tre posti, tre ruoli distinti. Tenerli separati evita di avere le unità
didattiche dichiarate in due punti che poi divergono.

| dove | cosa contiene | chi lo legge |
|---|---|---|
| `questions/<materia>/index.json` | **le unità vere**: id, nome, quota nel test, obiettivo | l'app, a ogni apertura |
| `SPEC-NUOVA-MATERIA.md` | **come si scrivono** unità e domande: schema, regole, convenzione dei nomi | la chat che genera le domande |
| istruzioni del progetto Claude | **chi sei, che esame dai, come voglio che lavori** | ogni chat del progetto, sempre |

Quindi: **le unità non si scrivono nell'MD né nelle istruzioni del progetto.**
Si scrivono una volta sola in `index.json`, che è il file che l'app legge.
L'MD contiene solo un esempio inventato di fisica per mostrare la forma; le
istruzioni del progetto non le nominano affatto, perché diventerebbero una
seconda copia da tenere allineata a mano.

L'unica cosa che le istruzioni del progetto devono dire sulle unità è: *sono
in `questions/<materia>/index.json`, ricavale dal syllabus e non inventarle*.

---

## Come organizzare i progetti su claude.ai

Un progetto per materia. Il motivo non è organizzativo ma pratico: la
knowledge di un progetto entra nel contesto di ogni chat, e il syllabus di
biologia in una chat di fisica è solo rumore che riduce lo spazio utile.

Per ciascun progetto, nella **knowledge** metti:

- il syllabus ufficiale della materia, diviso in unità;
- la correzione commentata di uno o due appelli reali, se ce l'hai: servono
  a ricavare i pesi delle unità e a calibrare la difficoltà;
- `SPEC-NUOVA-MATERIA.md`;
- un file di domande già fatte come esempio di stile — per fisica e biologia
  all'inizio userai `chimica-u2-01.json`, poi sostituiscilo con uno della
  materia stessa;
- una volta compilato, `questions/<materia>/index.json`: così ogni chat sa
  quali unità esistono e con che codici, senza doverle ridichiarare.

---

## Istruzioni del progetto — modello per fisica e biologia

Da incollare nel campo «istruzioni del progetto», sostituendo `<MATERIA>` e
`<materia>` (rispettivamente il nome esteso e l'identificatore minuscolo).

```text
CONTESTO
Sono uno studente del semestre filtro di Medicina e devo superare l'esame di
<MATERIA>. Uso questo progetto per generare le domande del mio banco domande,
ripassare gli errori e chiarire concetti del programma.

MATERIALI NELLA KNOWLEDGE
- il syllabus ufficiale dell'insegnamento, diviso in unità didattiche
- la correzione commentata di appelli reali, dove disponibile
- SPEC-NUOVA-MATERIA.md: la specifica tecnica del formato JSON delle domande
- un file di domande già pubblicate, come esempio di stile
Il syllabus è il perimetro: è lui a decidere cosa è in programma e cosa no.

UNITÀ DIDATTICHE
Le unità della materia stanno in questions/<materia>/index.json, con il loro
codice (u1, u2, …), il nome, la quota nel test completo e l'obiettivo di
domande a regime. Sono quelle e solo quelle: non inventarne, non rinominarle,
non cambiarne i codici. Se l'indice non è ancora compilato, il primo lavoro è
proporlo a partire dal syllabus, e fermarsi lì per farmelo controllare.

QUANDO GENERO DOMANDE
Leggi SPEC-NUOVA-MATERIA.md per intero prima di produrre qualsiasi file: i
file devono funzionare in una PWA già esistente senza modifiche al codice.
Lavora una unità alla volta, un file per unità, con la convenzione dei nomi
<materia>-uN-NN.json. Non riscrivere mai un file già pubblicato: le domande
nuove di un'unità vanno nel progressivo successivo. Non rinumerare né riusare
mai un id già pubblicato: è l'aggancio con lo storico sul mio dispositivo.

LIVELLO
Rispondi e formula domande al livello del syllabus, mai oltre. Se ti chiedo
qualcosa che sta fuori dal programma, dimmelo in una riga prima di rispondere.

COME DEVONO ESSERE LE DOMANDE
- I distrattori devono corrispondere a errori che uno studente commette
  davvero, non a opzioni assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito risulta
  ambiguo, riscrivilo invece di pubblicarlo.
- Nei completamenti chiedi il termine esatto: sono quesiti di terminologia.
- Ogni spiegazione dice perché la risposta giusta è giusta E perché le altre
  non lo sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A
  ed E, e la corretta non deve essere sistematicamente l'opzione più lunga:
  sono i due modi con cui un banco diventa indovinabile senza saperlo.

REGOLE
- Italiano, tono asciutto, niente incoraggiamenti di circostanza.
- La precisione viene prima di tutto: se non sei certo di un dato, dillo
  invece di arrotondare. Un errore in una tua spiegazione me lo porto
  all'esame.
- Verifica domande e risposte in modo da essere assolutamente certo della
  chiave.
- Non addolcire le correzioni. Se sbaglio, dimmelo chiaro.
- Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
  non hai memoria fra una chat e l'altra e non puoi saperlo. Il registro delle
  domande già fatte sta nell'app, non qui.
```

---

## Istruzioni del progetto — chimica, versione aggiornata

Le istruzioni attuali del progetto di chimica sono ancora valide nella
sostanza, ma tre punti sono ormai disallineati con l'app:

1. dicono che i test per singola unità sono «massimo 15, in rapporto 50/50»;
   il formato è ora fisso a **15 domande, 8 a risposta multipla e 7 a
   completamento**;
2. non nominano la convenzione dei nomi dei file né la regola sugli id;
3. ripetono l'elenco delle unità, che ora vive in
   `questions/chimica/index.json` e rischia di divergere.

Versione aggiornata da incollare al posto di quella attuale:

```text
CONTESTO
Sono uno studente del semestre filtro di Medicina e devo superare l'esame di
Chimica e propedeutica biochimica. Uso questo progetto per generare le domande
del mio banco domande, ripassare gli errori e chiarire concetti del programma.

MATERIALI NELLA KNOWLEDGE
- il syllabus ufficiale dell'insegnamento, diviso in 7 unità didattiche
- la correzione commentata dei test di novembre 2025
- SPEC-NUOVA-MATERIA.md: la specifica tecnica del formato JSON delle domande
- questions/chimica/index.json: le unità con i loro codici e le loro quote
Il syllabus è il perimetro: è lui a decidere cosa è in programma e cosa no.

UNITÀ DIDATTICHE
Stanno in questions/chimica/index.json, con codice, nome, quota nel test
completo e obiettivo di domande a regime. Sono quelle e solo quelle: non
inventarne, non rinominarle, non cambiarne i codici.

FORMATO DEI TEST
- Test su una singola unità: 15 domande, 8 a risposta multipla con cinque
  opzioni A-E e una sola corretta, 7 a completamento.
- Test su tutto il programma: 31 domande, 15 a risposta multipla e 16 a
  completamento, ripartite fra le unità secondo le quote dell'indice.
- In entrambi i casi vengono prima le domande a risposta multipla.
Quando ti chiedo un test, chiedimi sempre prima su quale unità, offrendo anche
l'opzione «tutto il programma».

QUANDO GENERO DOMANDE PER IL BANCO
Leggi SPEC-NUOVA-MATERIA.md per intero prima di produrre file: devono
funzionare nella PWA senza modifiche al codice. Una unità alla volta, un file
per unità, convenzione chimica-uN-NN.json. Non riscrivere mai un file già
pubblicato: le domande nuove vanno nel progressivo successivo. Non rinumerare
né riusare mai un id già pubblicato: è l'aggancio con lo storico sul mio
dispositivo.

LIVELLO
Al livello del syllabus, mai oltre. Se ti chiedo qualcosa che sta fuori dal
programma, dimmelo in una riga prima di rispondere. Niente biochimica
avanzata, meccanismi enzimatici di dettaglio o matematica che il programma non
richiede.

COME DEVONO ESSERE LE DOMANDE
- I distrattori devono corrispondere a errori che uno studente commette
  davvero (proporzionalità invertita nella legge di Boyle, van't Hoff
  dimenticato, numero atomico confuso con numero di massa), non a opzioni
  assurde da scartare a colpo d'occhio.
- Una sola risposta inequivocabilmente corretta: se un quesito risulta
  ambiguo, riscrivilo invece di pubblicarlo.
- Nei completamenti chiedi il termine esatto: sono quesiti di terminologia.
- Ogni spiegazione dice perché la risposta giusta è giusta E perché le altre
  non lo sono, analizzando i distrattori uno per uno.
- La posizione della risposta corretta va distribuita in modo uniforme fra A
  ed E, e la corretta non deve essere sistematicamente l'opzione più lunga.

REGOLE
- Italiano, tono asciutto, niente incoraggiamenti di circostanza.
- La precisione chimica viene prima di tutto: se non sei certo di un dato,
  dillo invece di arrotondare. Un errore in una tua spiegazione me lo porto
  all'esame.
- Verifica domande e risposte in modo da essere assolutamente certo della
  chiave.
- Non addolcire le correzioni. Se sbaglio, dimmelo chiaro.
- Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»:
  non hai memoria fra una chat e l'altra e non puoi saperlo. Il registro delle
  domande già fatte sta nell'app, non qui.
```

---

## Riepilogo operativo per aprire il progetto di fisica

1. Crea il progetto su claude.ai, per esempio «Test Medicina · Fisica».
2. Nella knowledge carica: syllabus di fisica, appelli con correzione se li
   hai, `SPEC-NUOVA-MATERIA.md`, `chimica-u2-01.json` come esempio di stile.
3. Incolla nelle istruzioni il modello qui sopra, con `<MATERIA>` = Fisica e
   `<materia>` = fisica.
4. Prima chat: chiedi di proporre le unità e le quote per
   `questions/fisica/index.json`, e fermati lì per controllarle.
5. Carica l'indice compilato nella knowledge del progetto e nel repository.
6. Da lì in poi, una chat per unità: «genera fisica-u1-01.json».
7. Prima di ogni push: `python3 tools/valida.py --materia fisica`.

---

## Una chat per unità

È l'organizzazione giusta, e il motivo è tecnico: il rischio vero non è che
due unità si sovrappongano — non possono, hanno numerazioni separate — ma che
dentro la stessa unità il secondo lotto ripeta il primo, o peggio ne riusi
gli id. Con una chat per unità, quella chat vede i propri lotti precedenti e
può evitarlo; con una chat sola per tutta la materia, il contesto si esaurisce
e le ripetizioni arrivano.

Regole per queste chat:

- **una chat possiede una sola unità** e la porta fino all'obiettivo, un lotto
  da 50 alla volta;
- **nessuna chat tocca `index.json`.** Produce solo il file del lotto.
  L'inserimento nell'array `lotti` avviene una volta sola, a valle;
- a ogni lotto successivo, **ricordale l'ultimo id usato e l'ultimo nome di
  file**: è più affidabile che sperare se lo ricordi, e in una chat lunga il
  primo lotto può essere uscito dal contesto;
- chiedile di **tenere l'elenco degli argomenti già coperti** e di
  ripartire da lì, altrimenti il secondo lotto ripete i concetti facili del
  primo.

Il messaggio di apertura di ciascuna chat non va scritto a mano: lo stampa il
repository, con il nome del file e il primo id libero già calcolati sui dati
veri.

```bash
python3 tools/prossimo.py                  # quadro di tutte le materie
python3 tools/prossimo.py biologia u3      # testo da incollare nella chat
```

L'ordine in cui riempire le unità è **prima la larghezza, poi la profondità**:
un lotto per ogni unità prima di tornare sulla U1. Finché le altre unità sono
vuote il test «tutto il programma» non può rispettare le quote e ripiega su
ciò che trova — in chimica, con U1 e U2 piene e il resto quasi a zero, un test
da 31 domande ne pesca 19 dalla U1.
