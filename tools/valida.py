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
    # sequenza delle posizioni corrette, file per file: serve a scoprire i lotti
    # in cui la corretta avanza ciclicamente A, B, C, D, E. Una distribuzione
    # uniforme non basta a escluderlo, e un ciclo rende il lotto indovinabile
    # senza sapere la materia esattamente come lo renderebbe uno sbilanciamento.
    sequenze = {}

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
        sequenze[file] = []

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
                sequenze[file].append(c)
                if len(opz[c]) == max(len(o) for o in opz):
                    piu_lunga += 1
                sp = q.get("spiegazione", "")
                # una citazione di distrattore apre un capoverso o segue uno
                # spazio: pretenderlo evita i falsi positivi di «V_B)» e
                # «(circa 60 °C)», dove la lettera fa parte di un simbolo.
                citate = set(re.findall(r"(?:^|(?<=[\s«\"'(\[]))([A-E])\)", sp))
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

    appelli = valida_appelli(mid, dirname, idx, ammesse, visti, errori, avvisi)

    return {
        "id": mid, "nome": idx.get("nome", mid), "unita": unita,
        "per_unita": per_unita, "per_tipo": per_tipo, "lotti": len(lotti),
        "posizioni": posizioni, "piu_lunga": piu_lunga, "multiple": multiple,
        "sequenze": sequenze, "appelli": appelli,
    }


def valida_appelli(mid, dirname, idx, ammesse, visti, errori, avvisi):
    """Controlla gli appelli ufficiali dichiarati nell'indice della materia.

    Sono prove reali riprodotte per intero: testo, ordine e chiavi restano
    quelli ufficiali, quindi qui non si misurano posizione e lunghezza della
    risposta corretta, che non sono state scelte da noi. Si controllano
    invece struttura, unicità degli id (anche rispetto al banco), unità,
    formato 15 + 16 e numerazione originale."""
    voci = idx.get("appelli") or []
    cartella = os.path.join(dirname, "appelli")
    dichiarati = {v.get("file") for v in voci}
    if os.path.isdir(cartella):
        for n in sorted(os.listdir(cartella)):
            if n.endswith(".json") and "appelli/" + n not in dichiarati:
                avvisi.append(f"{mid}: appelli/{n} è sul disco ma non è elencato nell'indice")
    riepilogo = []
    for v in voci:
        etich = f"{mid}/{v.get('file')}"
        if not v.get("id") or not v.get("file"):
            errori.append(f"{mid}: voce di appello senza id o senza file")
            continue
        p = os.path.join(dirname, v["file"])
        if not os.path.exists(p):
            errori.append(f"{mid}: l'indice elenca l'appello {v['file']}, che non esiste")
            continue
        dati = leggi(p, errori, etich)
        if dati is None:
            continue
        domande = dati.get("domande") or []
        tipi = [q.get("tipo") for q in domande]
        if tipi != ["multipla"] * 15 + ["completamento"] * 16:
            errori.append(f"{etich}: un appello ha 31 quesiti, 15 a risposta multipla seguiti da 16 a completamento")
        if [q.get("numero") for q in domande] != list(range(1, len(domande) + 1)):
            errori.append(f"{etich}: la numerazione originale dei quesiti non è 1…{len(domande)}")
        for q in domande:
            qid = q.get("id")
            dove = f"{mid} · {qid} (appello {v['id']})"
            if not qid:
                errori.append(f"{etich}: quesito senza id")
                continue
            if qid in visti:
                errori.append(f"{dove}: id duplicato (già in {visti[qid]})")
                continue
            visti[qid] = v["file"]
            if q.get("unita") not in ammesse:
                errori.append(f"{dove}: unità «{q.get('unita')}» non dichiarata")
            for campo in ("testo", "spiegazione", "argomento"):
                if not q.get(campo):
                    errori.append(f"{dove}: manca il campo «{campo}»")
            if q.get("tipo") == "multipla":
                opz = q.get("opzioni") or []
                c = q.get("corretta")
                giuste = q.get("corrette") or [c]
                if len(opz) != 5:
                    errori.append(f"{dove}: {len(opz)} opzioni invece di 5")
                if not all(isinstance(i, int) and not isinstance(i, bool) and 0 <= i < len(opz) for i in giuste):
                    errori.append(f"{dove}: indice della risposta corretta non valido")
                    continue
                if c not in giuste:
                    errori.append(f"{dove}: «corretta» deve comparire fra le «corrette»")
                # due opzioni identiche sono ammesse solo se il testo ufficiale le
                # contiene e il quesito le dichiara entrambe corrette
                uguali = len({" ".join(o.split()).lower() for o in opz}) != len(opz)
                if uguali and len(giuste) < 2:
                    errori.append(f"{dove}: due opzioni identiche senza «corrette»")
                sp = q.get("spiegazione", "")
                citate = set(re.findall(r"(?:^|(?<=[\s«\"'(\[]))([A-E])\)", sp))
                lett = {LETTERE[i] for i in giuste}
                if citate & lett:
                    errori.append(f"{dove}: la spiegazione cita la lettera di una risposta corretta")
                if len(set(LETTERE[:len(opz)]) - lett - citate) > 0:
                    avvisi.append(f"{dove}: la spiegazione non analizza {sorted(set(LETTERE[:len(opz)]) - lett - citate)}")
            elif q.get("tipo") == "completamento":
                acc = q.get("accettate")
                if not isinstance(acc, list) or not acc or any(norm(a) == "" for a in acc):
                    errori.append(f"{dove}: «accettate» mancante o con voci vuote")
                elif len({norm(a) for a in acc}) != len(acc):
                    avvisi.append(f"{dove}: risposte accettate equivalenti dopo la normalizzazione")
            else:
                errori.append(f"{dove}: tipo sconosciuto «{q.get('tipo')}»")
        riepilogo.append((v["id"], len(domande)))
    return riepilogo


def ciclo_massimo(seq):
    """Lunghezza della più lunga progressione in cui la posizione della
    risposta corretta avanza di uno modulo cinque."""
    massimo = corrente = 1 if seq else 0
    for a, b in zip(seq, seq[1:]):
        corrente = corrente + 1 if b == (a + 1) % 5 else 1
        massimo = max(massimo, corrente)
    return massimo


def periodo_massimo(seq):
    """Lunghezza del più lungo tratto in cui la sequenza delle posizioni
    corrette si ripete con periodo da 2 a 5 (per esempio B E C A D B E C A D):
    un ciclo A B C D E è solo un caso particolare, e uno schema fisso ripetuto
    rende il lotto indovinabile allo stesso modo. Restituisce (lunghezza, periodo)."""
    migliore = (0, 0)
    for p in range(2, 6):
        corsa = 0
        for i in range(p, len(seq)):
            corsa = corsa + 1 if seq[i] == seq[i - p] else 0
            if corsa and corsa + p > migliore[0]:
                migliore = (corsa + p, p)
    return migliore


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
        if r["appelli"]:
            print("  appelli ufficiali (fuori dal banco): " +
                  " · ".join(f"{a} {n} quesiti" for a, n in r["appelli"]))
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
            for file, seq in r["sequenze"].items():
                n = ciclo_massimo(seq)
                if n >= 6:
                    avvisi.append(f"{r['id']}/{file}: la posizione della risposta "
                                  f"corretta avanza ciclicamente per {n} quesiti "
                                  f"di fila: il lotto è indovinabile")
                lung, p = periodo_massimo(seq)
                if lung >= 10:
                    avvisi.append(f"{r['id']}/{file}: le posizioni della risposta "
                                  f"corretta ripetono uno schema fisso di {p} "
                                  f"per {lung} quesiti di fila: il lotto è indovinabile")

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
