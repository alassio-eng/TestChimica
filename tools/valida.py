#!/usr/bin/env python3
"""Validatore del banco domande multi-materia.

Uso:  python3 tools/valida.py [cartella-questions] [--materia chimica]

Controlla, per ogni materia dichiarata in questions/index.json:
sintassi JSON, campi obbligatori, unità ammesse, indice della risposta
corretta entro l'intervallo, id duplicati, lotti sul disco non registrati
nell'indice (e viceversa), somma delle quote per unità, e i due segnali di
qualità che rendono le domande indovinabili senza saperle: la posizione
della risposta corretta e la sua lunghezza rispetto ai distrattori.

Esce con codice 1 se trova almeno un errore.
"""

import json
import os
import re
import sys
import unicodedata
from collections import Counter

LETTERE = "ABCDE"


def norm(s):
    s = unicodedata.normalize("NFD", str(s).lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"['’`]", " ", s)
    s = re.sub(r"[^a-z0-9\s-]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return re.sub(r"^(il|lo|la|i|gli|le|un|uno|una|del|della|dei|delle|di|d)\s+", "", s).strip()


def leggi(path, errori, etichetta):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:                                     # noqa: BLE001
        errori.append(f"{etichetta}: JSON non leggibile — {e}")
        return None


def valida_materia(base, voce, errori, avvisi):
    mid = voce.get("id")
    dirname = os.path.join(base, voce.get("cartella") or mid)
    idx = leggi(os.path.join(dirname, "index.json"), errori, f"{mid}/index.json")
    if idx is None:
        return None

    unita = idx.get("unita") or []
    ammesse = {u["id"] for u in unita if "id" in u}
    if not unita:
        avvisi.append(f"{mid}: nessuna unità didattica definita, la materia non è ancora usabile")
    somma = sum(u.get("quota", 0) for u in unita)
    completo = (idx.get("formato") or {}).get("completo", {}).get("totale")
    if unita and completo and somma != completo:
        errori.append(f"{mid}: la somma delle quote per unità è {somma}, il test completo è di {completo} domande")

    lotti = idx.get("lotti") or []
    su_disco = sorted(n for n in os.listdir(dirname) if n.endswith(".json") and n != "index.json")
    for n in su_disco:
        if n not in lotti:
            avvisi.append(f"{mid}: {n} è sul disco ma non è elencato nell'indice")
    # convenzione dei nomi: <materia>-<unita>-<progressivo>.json
    attesa = {}
    for n in lotti:
        if not os.path.exists(os.path.join(dirname, n)):
            errori.append(f"{mid}: l'indice elenca {n}, che non esiste")
        m = re.fullmatch(re.escape(mid) + r"-(u\d+)-(\d{2})\.json", n)
        if not m:
            errori.append(f"{mid}: il nome {n} non segue la convenzione "
                          f"{mid}-uN-NN.json")
        else:
            attesa[n] = m.group(1)

    visti, per_unita, per_tipo = {}, Counter(), Counter()
    posizioni, piu_lunga, multiple = Counter(), 0, 0

    for file in lotti:
        p = os.path.join(dirname, file)
        if not os.path.exists(p):
            continue
        dati = leggi(p, errori, f"{mid}/{file}")
        if dati is None:
            continue
        domande = dati if isinstance(dati, list) else dati.get("domande", [])
        if not domande:
            avvisi.append(f"{mid}/{file}: nessuna domanda")

        for i, q in enumerate(domande):
            dove = f"{mid}/{file}[{i}]"
            qid = q.get("id")
            if not qid:
                errori.append(f"{dove}: manca l'id")
                continue
            dove = f"{mid} · {qid}"
            if qid in visti:
                errori.append(f"{dove}: id duplicato (già in {visti[qid]})")
                continue
            visti[qid] = file

            u = q.get("unita")
            if u not in ammesse:
                errori.append(f"{dove}: unità «{u}» non dichiarata nell'indice della materia")
                continue
            if file in attesa and u != attesa[file]:
                errori.append(f"{dove}: è di {u.upper()} ma sta in {file}, "
                              f"che per convenzione contiene solo {attesa[file].upper()}")
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
                    continue
                if len(opz) != 5:
                    avvisi.append(f"{dove}: {len(opz)} opzioni invece di 5")
                # confronto letterale: la normalizzazione delle risposte toglie
                # apici, segni e pedici, e farebbe collidere «+2» con «−2»
                if len({" ".join(o.split()).lower() for o in opz}) != len(opz):
                    errori.append(f"{dove}: due opzioni sono identiche")
                c = q.get("corretta")
                if not isinstance(c, int) or isinstance(c, bool) or not 0 <= c < len(opz):
                    errori.append(f"{dove}: «corretta» non è un indice valido ({c!r})")
                    continue
                if "accettate" in q:
                    avvisi.append(f"{dove}: «accettate» è ignorato nelle domande a risposta multipla")
                multiple += 1
                posizioni[c] += 1
                if len(opz[c]) == max(len(o) for o in opz):
                    piu_lunga += 1
                sp = q.get("spiegazione", "")
                citate = set(re.findall(r"(?<![A-Za-z0-9(\[])([A-E])\)", sp))
                distr = {LETTERE[k] for k in range(len(opz))} - {LETTERE[c]}
                if LETTERE[c] in citate:
                    errori.append(f"{dove}: la spiegazione cita la lettera della risposta corretta")
                if not citate <= distr:
                    errori.append(f"{dove}: la spiegazione cita lettere fuori intervallo")
                if len(distr - citate) > 1:
                    avvisi.append(f"{dove}: la spiegazione non analizza {sorted(distr - citate)}")
            elif tipo == "completamento":
                acc = q.get("accettate")
                if not isinstance(acc, list) or not acc:
                    errori.append(f"{dove}: «accettate» mancante o vuoto")
                else:
                    ns = [norm(a) for a in acc]
                    if any(n == "" for n in ns):
                        errori.append(f"{dove}: una risposta accettata è vuota dopo la normalizzazione")
                    if len(set(ns)) != len(ns):
                        avvisi.append(f"{dove}: risposte accettate equivalenti dopo la normalizzazione")
                if "……" not in q.get("testo", "") and "…" not in q.get("testo", ""):
                    avvisi.append(f"{dove}: il testo non contiene la lacuna «……»")
            else:
                errori.append(f"{dove}: tipo sconosciuto «{tipo}»")
                continue

            per_unita[u] += 1
            per_tipo[tipo] += 1

    return {
        "id": mid, "nome": idx.get("nome", mid), "unita": unita,
        "per_unita": per_unita, "per_tipo": per_tipo, "lotti": len(lotti),
        "posizioni": posizioni, "piu_lunga": piu_lunga, "multiple": multiple,
    }


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    solo = None
    if "--materia" in sys.argv:
        solo = sys.argv[sys.argv.index("--materia") + 1]

    base = args[0] if args else os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", "questions")
    base = os.path.abspath(base)

    errori, avvisi = [], []
    manifest = leggi(os.path.join(base, "index.json"), errori, "index.json")
    if manifest is None:
        print("ERRORE  manifest delle materie illeggibile")
        return 1

    totale = 0
    for voce in manifest.get("materie", []):
        if solo and voce.get("id") != solo:
            continue
        r = valida_materia(base, voce, errori, avvisi)
        if not r:
            continue
        n = sum(r["per_unita"].values())
        totale += n
        print(f"\n=== {r['nome']} ({r['id']}) ===")
        print(f"  {r['lotti']} lotti · {n} domande valide · "
              f"multipla {r['per_tipo']['multipla']} / completamento {r['per_tipo']['completamento']}")
        if r["unita"]:
            print("  copertura per unità (attuale / obiettivo):")
            for u in r["unita"]:
                att, ob = r["per_unita"][u["id"]], u.get("obiettivo", 0)
                barra = "█" * round(20 * min(1, att / ob)) if ob else ""
                print(f"    {u['id'].upper()}  {att:4d} / {ob:4d}  {barra}")
        if r["multiple"]:
            pos = " ".join(f"{LETTERE[i]}:{r['posizioni'][i]}" for i in range(5))
            quota = 100 * r["piu_lunga"] / r["multiple"]
            print(f"  posizione della risposta corretta  {pos}")
            print(f"  la corretta è l'opzione più lunga nel {quota:.0f}% dei quesiti")
            atteso = r["multiple"] / 5
            if any(abs(r["posizioni"][i] - atteso) > max(3, atteso * 0.6) for i in range(5)):
                avvisi.append(f"{r['id']}: la posizione della risposta corretta è sbilanciata")
            if quota > 70:
                avvisi.append(f"{r['id']}: la risposta corretta è quasi sempre l'opzione più lunga")

    print(f"\nTotale: {totale} domande in tutte le materie.")
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
