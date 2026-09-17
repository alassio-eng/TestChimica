#!/usr/bin/env python3
"""Stampa in markdown che cosa il banco copre, unità per unità: quante
domande, come sono ripartite fra i due tipi, e l'elenco degli argomenti
toccati con quante domande ciascuno.

Serve a due cose: capire a colpo d'occhio dove il banco è ancora scoperto,
e passare a una chat di generazione l'elenco di ciò che è già stato fatto,
così non lo rifà.

    python3 tools/copertura.py > COPERTURA.md
    python3 tools/copertura.py chimica
"""
import collections
import json
import os
import sys

BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "questions")


def main():
    solo = sys.argv[1] if len(sys.argv) > 1 else None
    man = json.load(open(os.path.join(BASE, "index.json"), encoding="utf-8"))
    print("# Copertura del banco domande\n")
    print("Che cosa c'è, unità per unità. Rigenerabile con "
          "`python3 tools/copertura.py > COPERTURA.md`.\n")

    gran_tot = gran_ob = 0
    sezioni = []
    for voce in man["materie"]:
        mid = voce["id"]
        if solo and mid != solo:
            continue
        d = os.path.join(BASE, voce.get("cartella") or mid)
        idx = json.load(open(os.path.join(d, "index.json"), encoding="utf-8"))
        dati = collections.OrderedDict(
            (u["id"], {"nome": u["nome"], "quota": u.get("quota"),
                       "ob": u.get("obiettivo", 0), "n": 0, "mu": 0, "co": 0,
                       "arg": collections.Counter(), "file": []})
            for u in idx.get("unita") or [])
        for f in idx.get("lotti") or []:
            for q in json.load(open(os.path.join(d, f), encoding="utf-8"))["domande"]:
                t = dati[q["unita"]]
                if f not in t["file"]:
                    t["file"].append(f)
                t["n"] += 1
                t["mu"] += q["tipo"] == "multipla"
                t["co"] += q["tipo"] == "completamento"
                t["arg"][q.get("argomento") or "—"] += 1
        sezioni.append((idx.get("nome", mid), dati))
        gran_tot += sum(t["n"] for t in dati.values())
        gran_ob += sum(t["ob"] for t in dati.values())

    print(f"**{gran_tot} domande su {gran_ob}** a regime.\n")

    for nome, dati in sezioni:
        tot = sum(t["n"] for t in dati.values())
        ob = sum(t["ob"] for t in dati.values())
        print(f"\n---\n\n## {nome} — {tot}/{ob}\n")
        print("| | unità | domande | tipi | argomenti | quota d'esame |")
        print("|---|---|---|---|---|---|")
        for uid, t in dati.items():
            print(f"| {uid.upper()} | {t['nome']} | {t['n']}/{t['ob']} | "
                  f"{t['mu']}M + {t['co']}C | {len(t['arg'])} | {t['quota']} |")
        for uid, t in dati.items():
            if not t["n"]:
                continue
            print(f"\n### {uid.upper()} — {t['nome']}\n")
            print(f"{t['n']} domande su {t['ob']} · {t['mu']} a risposta multipla e "
                  f"{t['co']} a completamento · {len(t['arg'])} argomenti distinti · "
                  f"file: {', '.join(t['file'])}\n")
            for a, n in sorted(t["arg"].items(), key=lambda kv: (-kv[1], kv[0])):
                print(f"- {a}" + (f" ({n} domande)" if n > 1 else ""))
        vuote = [uid.upper() for uid, t in dati.items() if not t["n"]]
        if vuote:
            print(f"\n### Ancora vuote\n\n{', '.join(vuote)}.\n")


if __name__ == "__main__":
    main()
