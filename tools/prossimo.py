#!/usr/bin/env python3
"""Stampa, per ogni unità di ogni materia, il piano dei file che mancano
all'obiettivo e il testo con cui aprire la chat che li genererà.

Serve ad aprire una chat di generazione senza rischiare la collisione degli
id, che è l'unico errore irreversibile del banco: un id riusato sovrascrive
la storia di errori e ripassi di una domanda diversa.

    python3 tools/prossimo.py                  tutte le materie
    python3 tools/prossimo.py fisica           una sola
    python3 tools/prossimo.py biologia u3      una sola unità, con il testo
                                               da incollare nella chat
    python3 tools/prossimo.py --tutti          tutti i testi, in markdown
"""
import json
import os
import re
import sys

BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "questions")


def stato(mid, cartella):
    d = os.path.join(BASE, cartella)
    idx = json.load(open(os.path.join(d, "index.json"), encoding="utf-8"))
    per_unita = {}
    for f in idx.get("lotti") or []:
        dati = json.load(open(os.path.join(d, f), encoding="utf-8"))
        for q in dati.get("domande") or []:
            u = per_unita.setdefault(q["unita"], {"n": 0, "max_id": 0, "prog": 0})
            u["n"] += 1
            try:
                u["max_id"] = max(u["max_id"], int(q["id"].split("-")[1]))
            except (IndexError, ValueError):
                pass
        m = re.search(r"-(u\d+)-(\d{2})\.json$", f)
        if m:
            u = per_unita.setdefault(m.group(1), {"n": 0, "max_id": 0, "prog": 0})
            u["prog"] = max(u["prog"], int(m.group(2)))
    righe = []
    for u in idx.get("unita") or []:
        s = per_unita.get(u["id"], {"n": 0, "max_id": 0, "prog": 0})
        righe.append({
            "unita": u["id"],
            "nome": u["nome"],
            "quota": u.get("quota"),
            "obiettivo": u.get("obiettivo", 0),
            "presenti": s["n"],
            "file": f"{mid}-{u['id']}-{s['prog'] + 1:02d}.json",
            "primo_id": f"{u['id']}-{s['max_id'] + 1:04d}",
        })
    return idx, righe


def piano(mid, r, per_lotto=50):
    """I file che servono a portare l'unità all'obiettivo, con i loro id."""
    mancano = max(0, r["obiettivo"] - r["presenti"])
    prog = int(r["file"].rsplit("-", 1)[1][:2])
    primo = int(r["primo_id"].split("-")[1])
    passi, restano = [], mancano
    while restano > 0:
        n = min(per_lotto, restano)
        passi.append({
            "file": f"{mid}-{r['unita']}-{prog:02d}.json",
            "n": n,
            "multipla": n // 2,
            "completamento": n - n // 2,
            "da": f"{r['unita']}-{primo:04d}",
            "a": f"{r['unita']}-{primo + n - 1:04d}",
        })
        prog += 1
        primo += n
        restano -= n
    return mancano, passi


def blocco_chat(mid, nome_materia, r):
    mancano, passi = piano(mid, r)
    ultimo = int(r["primo_id"].split("-")[1]) - 1
    if r["presenti"] == 0:
        stato_txt = ("Nel banco non c'è ancora nessuna domanda di questa unità: "
                     "parti da zero.")
    else:
        stato_txt = (f"Nel banco ci sono già {r['presenti']} domande di questa unità, "
                     f"con id fino a {r['unita']}-{ultimo:04d}. Non riscriverle, non "
                     f"rigenerare i file che le contengono e non riusare quegli id: "
                     f"sono agganciati allo storico delle mie risposte sul dispositivo.")

    righe = "\n".join(
        f"{i + 1}. {p['file']} — {p['n']} domande "
        f"({p['multipla']} a risposta multipla e {p['completamento']} a completamento), "
        f"id da {p['da']} a {p['a']}"
        for i, p in enumerate(passi))

    return f"""Sei la chat che si occupa di una sola unità del banco domande di {nome_materia}: la {r['unita'].upper()}. Il tuo compito è portarla all'obiettivo per intero, non produrre un singolo lotto.

UNITÀ
{r['unita'].upper()} — {r['nome']}
Obiettivo: {r['obiettivo']} domande in totale. {stato_txt}
Mancano {mancano} domande, che consegnerai in {len(passi)} {'file' if len(passi) == 1 else 'file successivi'}.

PIANO DEI FILE — già calcolato, seguilo alla lettera
{righe}

Ogni file è un JSON completo e valido con questa forma:
{{ "lotto": "<nome del file senza .json>", "unita": "{r['unita']}", "domande": [ … ] }}
Gli id sono progressivi e senza buchi, e proseguono da un file al successivo: non ricominciano da capo.

PRIMA DI SCRIVERE
Ricava dal syllabus l'elenco degli argomenti dell'unità e proponimi una ripartizione delle {mancano} domande fra quegli argomenti, proporzionale al peso che hanno nel programma. Fermati lì e aspetta che la approvi: è il modo per non ritrovarsi il primo file pieno dei concetti facili e l'ultimo pieno di ripetizioni. Tieni quella ripartizione come tracciato e spunta gli argomenti man mano.

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
Non toccare index.json e non rigenerarlo: alla registrazione dei file ci penso io. Non dichiarare mai che una domanda è «nuova» o «non ancora somministrata»: non hai modo di saperlo. Italiano, tono asciutto, niente incoraggiamenti di circostanza."""


def main():
    argv = sys.argv[1:]
    tutti = "--tutti" in argv
    argv = [a for a in argv if a != "--tutti"]
    solo_materia = argv[0] if argv else None
    solo_unita = argv[1] if len(argv) > 1 else None
    man = json.load(open(os.path.join(BASE, "index.json"), encoding="utf-8"))

    if tutti:
        print("# Testi di apertura delle chat di generazione\n")
        print("Uno per unità. Ogni chat possiede la sua unità e la porta "
              "all'obiettivo per intero, consegnando un file per volta secondo "
              "un piano già calcolato: nomi dei file, numero di domande e "
              "intervalli di id sono scritti nel testo, così non resta niente "
              "da decidere a memoria.\n")
        print("Rigenerabile con `python3 tools/prossimo.py --tutti`: i nomi dei "
              "file e i primi id liberi sono calcolati sui dati del repository, "
              "non scritti a mano.\n")
        for voce in man["materie"]:
            mid = voce["id"]
            if solo_materia and mid != solo_materia:
                continue
            idx, righe = stato(mid, voce.get("cartella") or mid)
            nome = idx.get("nome", mid)
            print(f"\n---\n\n# {nome}\n")
            for r in righe:
                if r["presenti"] >= r["obiettivo"]:
                    print(f"## {r['unita'].upper()} — {r['nome']}\n")
                    print(f"Obiettivo raggiunto ({r['presenti']}/{r['obiettivo']}): "
                          f"nessuna chat da aprire.\n")
                    continue
                print(f"## {r['unita'].upper()} — {r['nome']}\n")
                mancano, passi = piano(mid, r)
                print(f"{r['presenti']}/{r['obiettivo']} nel banco · mancano "
                      f"{mancano} domande in {len(passi)} file: "
                      f"`{passi[0]['file']}` … `{passi[-1]['file']}`, "
                      f"id da `{passi[0]['da']}` a `{passi[-1]['a']}`\n")
                print("```text")
                print(blocco_chat(mid, nome, r))
                print("```\n")
        return
    for voce in man["materie"]:
        mid = voce["id"]
        if solo_materia and mid != solo_materia:
            continue
        idx, righe = stato(mid, voce.get("cartella") or mid)
        nome = idx.get("nome", mid)
        if solo_unita:
            for r in righe:
                if r["unita"] == solo_unita:
                    print(blocco_chat(mid, nome, r))
                    return
            sys.exit(f"unità {solo_unita} non dichiarata in {mid}")
        print(f"\n=== {nome} ({mid}) ===")
        print(f"  {'':3}  {'unità':44} {'presenti':>9}  {'prossimo file':24} {'primo id':>9}")
        for r in righe:
            print(f"  {r['unita'].upper():3}  {r['nome'][:44]:44} "
                  f"{r['presenti']:4}/{r['obiettivo']:4}  {r['file']:24} {r['primo_id']:>9}")
    print("\nPer il testo da incollare in una chat:  "
          "python3 tools/prossimo.py <materia> <unità>")


if __name__ == "__main__":
    main()
