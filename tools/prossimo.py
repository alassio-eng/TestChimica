#!/usr/bin/env python3
"""Stampa, per ogni unità di ogni materia, il nome del prossimo lotto e il
primo id libero.

Serve ad aprire una chat di generazione senza rischiare la collisione degli
id, che è l'unico errore irreversibile del banco: un id riusato sovrascrive
la storia di errori e ripassi di una domanda diversa.

    python3 tools/prossimo.py                  tutte le materie
    python3 tools/prossimo.py fisica           una sola
    python3 tools/prossimo.py biologia u3      una sola unità, con il testo
                                               da incollare nella chat
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


def blocco_chat(mid, nome_materia, r):
    mancano = max(0, r["obiettivo"] - r["presenti"])
    lotto = min(50, mancano) or 50
    ultimo = int(r["primo_id"].split("-")[1]) - 1
    if r["presenti"] == 0:
        stato_txt = ("Nel banco non c'è ancora nessuna domanda di questa unità: "
                     "questo è il primo lotto.")
    else:
        stato_txt = (f"Nel banco ci sono già {r['presenti']} domande di questa unità, "
                     f"con id fino a {r['unita']}-{ultimo:04d}. Non riscriverle, non "
                     f"rigenerare i file esistenti e non riusare quegli id: sono "
                     f"agganciati allo storico delle mie risposte sul dispositivo.")
    m = lotto // 2
    c = lotto - m
    return f"""Sei la chat che si occupa di una sola unità del banco domande di {nome_materia}: la {r['unita'].upper()}. Resterai su questa unità fino a portarla all'obiettivo, un lotto alla volta.

UNITÀ
{r['unita'].upper()} — {r['nome']}
Obiettivo: {r['obiettivo']} domande in totale. {stato_txt}

QUESTO LOTTO
- file da produrre: {r['file']}
- dentro il file: campo "lotto" = "{r['file'][:-5]}", campo "unita" = "{r['unita']}"
- {lotto} domande: {m} a risposta multipla e {c} a completamento
- id progressivi da {r['primo_id']} in avanti, senza salti e senza buchi
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
asciutto, italiano, niente incoraggiamenti di circostanza."""


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
              "all'obiettivo un lotto alla volta.\n")
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
                print(f"`{r['file']}` · da `{r['primo_id']}` · "
                      f"{r['presenti']}/{r['obiettivo']} nel banco\n")
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
