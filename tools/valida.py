#!/usr/bin/env python3
"""Validatore del banco domande.

Uso:  python3 tools/valida.py [cartella]

Controlla: sintassi JSON, presenza dei campi obbligatori, unità ammesse,
indice della risposta corretta entro l'intervallo, id duplicati, lotti
presenti sul disco ma non registrati in index.json (e viceversa).
Esce con codice 1 se trova almeno un errore.
"""

import json
import os
import sys
from collections import Counter

UNITA = {"u1", "u2", "u3", "u4", "u5", "u6", "u7"}
OBIETTIVO = {"u1": 150, "u2": 70, "u3": 70, "u4": 100, "u5": 90, "u6": 70, "u7": 150}


def main() -> int:
    base = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", "questions")
    base = os.path.abspath(base)

    errori, avvisi = [], []

    indice_path = os.path.join(base, "index.json")
    try:
        with open(indice_path, encoding="utf-8") as f:
            indice = json.load(f)
    except Exception as e:                                   # noqa: BLE001
        print(f"ERRORE  index.json illeggibile: {e}")
        return 1

    lotti = indice.get("lotti", [])
    su_disco = sorted(n for n in os.listdir(base)
                      if n.endswith(".json") and n != "index.json")
    for n in su_disco:
        if n not in lotti:
            avvisi.append(f"{n} è sul disco ma non è elencato in index.json")
    for n in lotti:
        if not os.path.exists(os.path.join(base, n)):
            errori.append(f"index.json elenca {n}, che non esiste")

    visti = {}
    per_unita = Counter()
    per_tipo = Counter()
    totale = 0

    for file in lotti:
        percorso = os.path.join(base, file)
        if not os.path.exists(percorso):
            continue
        try:
            with open(percorso, encoding="utf-8") as f:
                dati = json.load(f)
        except Exception as e:                               # noqa: BLE001
            errori.append(f"{file}: JSON non valido — {e}")
            continue

        domande = dati if isinstance(dati, list) else dati.get("domande", [])
        if not domande:
            avvisi.append(f"{file}: nessuna domanda")

        for i, q in enumerate(domande):
            dove = f"{file}[{i}]"
            qid = q.get("id")
            if not qid:
                errori.append(f"{dove}: manca l'id")
                continue
            dove = f"{file} · {qid}"
            if qid in visti:
                errori.append(f"{dove}: id duplicato (già in {visti[qid]})")
                continue
            visti[qid] = file

            unita = q.get("unita")
            if unita not in UNITA:
                errori.append(f"{dove}: unità sconosciuta «{unita}»")
                continue
            if not q.get("testo"):
                errori.append(f"{dove}: manca il testo")
            if not q.get("spiegazione"):
                errori.append(f"{dove}: manca la spiegazione")
            if not q.get("argomento"):
                avvisi.append(f"{dove}: manca l'argomento")

            tipo = q.get("tipo")
            if tipo == "multipla":
                opz = q.get("opzioni")
                if not isinstance(opz, list) or len(opz) < 2:
                    errori.append(f"{dove}: opzioni mancanti o insufficienti")
                else:
                    if len(opz) != 5:
                        avvisi.append(f"{dove}: {len(opz)} opzioni invece di 5")
                    if len(set(map(str.strip, map(str, opz)))) != len(opz):
                        errori.append(f"{dove}: opzioni duplicate")
                    c = q.get("corretta")
                    if not isinstance(c, int) or isinstance(c, bool) or not 0 <= c < len(opz):
                        errori.append(f"{dove}: «corretta» non è un indice valido ({c!r})")
                if "accettate" in q:
                    avvisi.append(f"{dove}: «accettate» è ignorato nelle domande a risposta multipla")
            elif tipo == "completamento":
                acc = q.get("accettate")
                if not isinstance(acc, list) or not acc:
                    errori.append(f"{dove}: «accettate» mancante o vuoto")
                if "……" not in q.get("testo", "") and "…" not in q.get("testo", ""):
                    avvisi.append(f"{dove}: il testo non contiene la lacuna «……»")
            else:
                errori.append(f"{dove}: tipo sconosciuto «{tipo}»")
                continue

            per_unita[unita] += 1
            per_tipo[tipo] += 1
            totale += 1

    print(f"Lotti registrati: {len(lotti)}   Domande valide: {totale}")
    print(f"Tipi: multipla {per_tipo['multipla']} · completamento {per_tipo['completamento']}")
    print("Copertura per unità (attuale / obiettivo):")
    for u in sorted(UNITA):
        n = per_unita[u]
        obiettivo = OBIETTIVO[u]
        barra = "█" * round(20 * min(1, n / obiettivo))
        print(f"  {u.upper()}  {n:4d} / {obiettivo:3d}  {barra}")

    for a in avvisi:
        print(f"AVVISO  {a}")
    for e in errori:
        print(f"ERRORE  {e}")

    if errori:
        print(f"\n{len(errori)} errori: il banco NON è pubblicabile così.")
        return 1
    print("\nNessun errore.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
