# Come generare le domande di una nuova materia

Documento da consegnare, insieme al syllabus della materia, alla chat che
genererà le domande. Descrive **tutto** ciò che serve perché i file prodotti
funzionino nella PWA senza modificarne il codice.

L'app è già pubblicata e gestisce tre materie: chimica (banco in corso di
riempimento), fisica e biologia (cartelle predisposte e vuote). Non c'è nulla
da programmare: la materia si aggiunge scrivendo file JSON.

---

## 1. Che cosa devi produrre

Due cose, in quest'ordine.

**a) L'indice della materia** — `questions/<materia>/index.json`, da compilare
una volta sola con le unità didattiche ricavate dal syllabus ufficiale.

**b) I file di domande** — uno per unità didattica, con progressivo:

```
questions/fisica/fisica-u1-01.json
questions/fisica/fisica-u1-02.json
questions/fisica/fisica-u2-01.json
```

La convenzione è **`<materia>-<unità>-<progressivo a 2 cifre>.json`** e vale
due regole insieme:

- **un file contiene domande di una sola unità**, quella scritta nel nome. Il
  validatore lo verifica ed è un errore bloccante, non un avviso.
- **un file già pubblicato non si riscrive mai.** Quando servono altre domande
  di U2, non si allarga `fisica-u2-01.json`: si crea `fisica-u2-02.json` e lo
  si registra nell'array `lotti`. È la garanzia contro il caso in cui una chat,
  invece di accodare, rigeneri il file e faccia sparire domande già pubblicate.

Ogni file contiene fino a circa 50 domande. Il prefisso della materia serve
perché i file vengono scambiati anche fuori dalla loro cartella — allegati a
una chat, scaricati — e tre `u1-01.json` non si distinguerebbero.

---

## 2. L'indice della materia

```json
{
  "schema": 2,
  "materia": "fisica",
  "nome": "Fisica",
  "aggiornato": "2026-09-12",
  "formato": {
    "unita":    { "totale": 15, "multipla": 8,  "completamento": 7  },
    "completo": { "totale": 31, "multipla": 15, "completamento": 16 }
  },
  "unita": [
    { "id": "u1", "nome": "Grandezze, misure e vettori", "quota": 5, "obiettivo": 100 },
    { "id": "u2", "nome": "Cinematica e dinamica",       "quota": 8, "obiettivo": 150 }
  ],
  "lotti": ["fisica-u1-01.json", "fisica-u2-01.json"]
}
```

| campo | regola |
|---|---|
| `materia` | uguale al nome della cartella e all'`id` nel manifest `questions/index.json` |
| `formato` | lascialo così: 15 domande per unità (8 + 7), 31 per il test completo (15 + 16) |
| `unita[].id` | `u1`, `u2`, … in ordine, come le unità del syllabus |
| `unita[].nome` | nome esteso dell'unità, quello che compare nell'elenco a schermo |
| `unita[].quota` | quante domande di quell'unità entrano nel test completo. **La somma delle quote deve fare esattamente 31**: si ricava dai pesi reali di un appello ufficiale, non a occhio |
| `unita[].obiettivo` | quante domande vuoi in quell'unità a regime; guida la barra di copertura del validatore |
| `lotti` | i file dei lotti, in ordine di pubblicazione |

Se non hai la ripartizione di un appello reale, dichiaralo esplicitamente
invece di inventarla: meglio quote provvisorie annunciate che quote sbagliate
date per buone.

---

## 3. Il formato delle domande

Ogni lotto è un file con questa struttura:

```json
{
  "lotto": "fisica-u1-01",
  "unita": "u1",
  "generato": "2026-09-12",
  "domande": [ /* … */ ]
}
```

Il campo `lotto` ripete il nome del file senza estensione e `unita` ripete
l'unità: sono ridondanti rispetto al nome del file e al campo `unita` di ogni
domanda, ma rendono il file leggibile da solo.

### Domanda a risposta multipla

```json
{
  "id": "u1-0001",
  "unita": "u1",
  "tipo": "multipla",
  "argomento": "Grandezze fondamentali del Sistema Internazionale",
  "testo": "Quale fra le seguenti NON è una grandezza fondamentale del SI?",
  "opzioni": ["…", "…", "…", "…", "…"],
  "corretta": 2,
  "spiegazione": "Perché la corretta è corretta.\n\nA) perché è sbagliata.\nB) …\nD) …\nE) …"
}
```

### Domanda a completamento

```json
{
  "id": "u1-0002",
  "unita": "u1",
  "tipo": "completamento",
  "argomento": "Unità di misura della forza",
  "testo": "Nel Sistema Internazionale l'unità di misura della forza è il ……",
  "accettate": ["newton", "n"],
  "spiegazione": "…"
}
```

| campo | obbligatorio | regola |
|---|---|---|
| `id` | sì | `u<n>-<progressivo a 4 cifre>`, univoco dentro la materia. Materie diverse possono usare gli stessi codici: l'app li qualifica internamente |
| `unita` | sì | uno degli `id` dichiarati nell'indice, altrimenti la domanda viene scartata |
| `tipo` | sì | `multipla` oppure `completamento` |
| `argomento` | sì in pratica | argomento specifico, mostrato nella correzione e in «I miei errori» |
| `testo` | sì | nei completamenti la lacuna si segna con `……` (due caratteri `…`) |
| `opzioni` | solo `multipla` | esattamente 5 voci |
| `corretta` | solo `multipla` | indice **a base zero** dentro `opzioni` |
| `accettate` | solo `completamento` | tutte le forme accettabili |
| `spiegazione` | sì | `\n` per andare a capo |

### Gli `id` non si toccano mai

Lo storico delle risposte sul dispositivo dello studente è indicizzato per
`id`. Rinumerare un id fa tornare quella domanda «mai somministrata» e ne
cancella la storia di errori e di ripassi. **Non riusare e non rinumerare mai
un id già pubblicato.** Correggere testo, opzioni, ordine delle opzioni o
spiegazione di una domanda esistente è invece innocuo.

---

## 4. Come devono essere le domande

Sono le regole con cui è stato costruito il banco di chimica. Rispettale: sono
la differenza fra un banco che allena e uno che si può indovinare.

**Livello.** Al livello del syllabus, mai oltre. Se un argomento non è nel
syllabus, non entra nel banco.

**Distrattori.** Devono corrispondere a errori che uno studente commette
davvero — una formula applicata al contrario, un fattore dimenticato, due
concetti vicini confusi — non a opzioni assurde da scartare a colpo d'occhio.
Ogni distrattore deve essere difendibile da chi ha studiato male.

**Una sola risposta inequivocabilmente corretta.** Se il quesito risulta
ambiguo, riscrivilo invece di pubblicarlo. Attenzione alle opzioni «vere ma
incomplete»: sono ambiguità mascherate.

**Completamenti.** Chiedono un termine preciso: sono quesiti di terminologia,
non di ragionamento. La frase deve ammettere una sola parola sensata.

**Spiegazioni.** Devono dire perché la risposta giusta è giusta **e** perché
ciascuna delle altre non lo è, riga per riga, nella forma `A) …`, `B) …`, in
ordine alfabetico e senza mai citare la lettera della risposta corretta.

**Tono.** Italiano, asciutto, niente incoraggiamenti. La precisione viene prima
di tutto: se un dato non è certo, dillo invece di arrotondare.

### Due trappole da evitare, che il validatore misura

1. **Posizione della risposta corretta.** Deve essere distribuita in modo
   uniforme fra A, B, C, D ed E. Nel primo banco di chimica finiva in B nel
   62% dei casi: bastava tirare a indovinare per prendere venti risposte su
   trenta. Se generi le domande scrivendo la corretta sempre per prima o
   sempre per seconda, rimescola le opzioni **prima** di pubblicare, ricordando
   di rimappare di conseguenza le lettere citate nella spiegazione.
2. **Lunghezza della risposta corretta.** Non deve essere sistematicamente
   l'opzione più lunga. Se la corretta ha bisogno di una motivazione, dalla
   anche ai distrattori. Obiettivo: sotto il 60% dei quesiti, con uno scarto
   medio di pochi caratteri.

---

## 5. Come vengono confrontate le risposte a completamento

Prima del confronto, sia la risposta scritta dallo studente sia ogni voce di
`accettate` vengono normalizzate così:

- tutto in minuscolo;
- accenti rimossi (`molarità` → `molarita`);
- apostrofi e punteggiatura sostituiti da spazi, spazi multipli compattati;
- **tutto ciò che non è una lettera a-z, una cifra o un trattino viene tolto**;
- l'articolo o la preposizione iniziale viene rimosso (`il`, `lo`, `la`, `i`,
  `gli`, `le`, `un`, `uno`, `una`, `del`, `della`, `dei`, `delle`, `di`, `d`);
- i numeri da zero a venti sono equivalenti alla cifra (`due` = `2`).

Conseguenze pratiche:

- non serve elencare varianti che differiscono solo per accento o articolo:
  `molarità` e `molarita` sono la stessa cosa;
- **serve** elencare le varianti lessicali vere: `fosfodiestere`,
  `fosfodiestereo`, `fosfodiesterico`; oppure `newton` e `n`;
- attenzione ai simboli: `π`, `Ω`, `°`, i pedici e gli apici spariscono nella
  normalizzazione. Una risposta accettata composta solo da simboli diventa una
  stringa vuota e accetterebbe qualunque cosa: **non metterla mai**. Se la
  risposta è un simbolo, accetta il nome per esteso (`ohm`, `pi greco`);
- una risposta che dopo la normalizzazione resta di un solo carattere è
  fragile: usala solo come alternativa a una forma estesa.

---

## 6. Procedura

1. Compila `questions/<materia>/index.json` con le unità del syllabus.
2. Scrivi le domande **una unità alla volta**, un file per unità:
   `<materia>-u1-01.json`, `<materia>-u2-01.json`, … fino a circa 50 domande
   per file. Dentro ciascuna unità, metà a risposta multipla e metà a
   completamento.
3. Aggiungi i nomi dei file all'array `lotti` e aggiorna `aggiornato`.
4. Valida:

   ```bash
   python3 tools/valida.py --materia <materia>
   ```

   Il validatore controlla sintassi, campi obbligatori, unità ammesse, id
   duplicati, somma delle quote, coerenza fra indice e file sul disco, e
   riporta la distribuzione delle posizioni della risposta corretta e la quota
   di quesiti in cui la corretta è l'opzione più lunga. Deve chiudersi con
   «Nessun errore».
5. Commit e push. Sui dispositivi già installati il nuovo lotto arriva alla
   prima apertura online, senza toccare i progressi salvati.

Il codice dell'app **non va modificato**: se hai bisogno di cambiarlo, vuol
dire che stai uscendo dal formato.

---

## 7. Prompt pronto per l'altra chat

> Devo riempire il banco domande di **<materia>** per l'esame del semestre
> filtro di Medicina. Ti allego il syllabus ufficiale e la specifica tecnica
> `SPEC-NUOVA-MATERIA.md` del formato JSON: leggila per intero prima di
> generare qualsiasi cosa, perché i file devono funzionare in una PWA già
> esistente senza modifiche al codice.
>
> Procedi in due passi, fermandoti dopo il primo perché io lo controlli.
>
> **Passo 1.** Ricava dal syllabus le unità didattiche e propone il contenuto
> di `questions/<materia>/index.json`: id, nome esteso, quota nel test completo
> (la somma deve fare 31) e obiettivo di domande a regime per ciascuna unità.
> Se non hai i pesi reali di un appello, dichiaralo e proponi una ripartizione
> motivata invece di spacciarla per ufficiale.
>
> **Passo 2.** Dopo la mia conferma, genera le domande **una unità alla
> volta**, un file per unità, seguendo la convenzione dei nomi
> `<materia>-u1-01.json`, `<materia>-u2-01.json`, … con al massimo una
> cinquantina di domande per file e una sola unità dentro ciascuno. Per ogni
> unità: metà a risposta multipla con cinque opzioni e una sola corretta, metà
> a completamento.
> Rispetta le regole di qualità della specifica, in particolare: distrattori
> costruiti su errori reali, posizione della risposta corretta distribuita in
> modo uniforme fra A ed E, risposta corretta non sistematicamente più lunga
> dei distrattori, spiegazioni che analizzano ogni distrattore in ordine
> alfabetico senza citare la lettera della risposta giusta.
>
> Il livello è quello del syllabus, mai oltre. La precisione viene prima di
> tutto: se un dato non è certo, dimmelo invece di arrotondare — un errore in
> una spiegazione me lo porto all'esame.

---

## 8. Dove stanno le domande di chimica

Sono già in JSON, nello stesso formato descritto qui, ma divise in lotti e non
in un file unico:

```
questions/
  index.json                      manifest delle tre materie
  chimica/
    index.json                    unità, quote, formato, elenco dei file
    chimica-u1-01.json … -u1-03   150 domande di U1
    chimica-u2-01.json … -u2-02    70 domande di U2
    chimica-u3-01.json … -u7-01     le unità ancora da riempire
  fisica/
    index.json                    predisposto, unità da compilare
  biologia/
    index.json                    predisposto, unità da compilare
```

Se all'altra chat serve un esempio concreto, il file più utile da allegare è
`questions/chimica/chimica-u2-01.json`: 50 domande complete di entrambi i
tipi, con spiegazioni scritte secondo le regole di questo documento.
