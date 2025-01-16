from fastapi import FastAPI, HTTPException
import json
import os
from typing import List
from datetime import datetime

app = FastAPI()


base_dir = os.path.dirname(__file__)
json_file_path = os.path.join(base_dir, "meteodaten_2023_daily.json")


try:
    with open(json_file_path, encoding="utf-8") as f:
        daten = json.load(f)
except FileNotFoundError:
    raise FileNotFoundError(f"Die Datei {json_file_path} wurde nicht gefunden.")


@app.get("/api/py/meteodaten", response_model=List[dict])
def lese_alle_daten():
    if not daten:
        raise HTTPException(status_code=404, detail="Keine Daten verfügbar.")
    return daten


@app.get("/api/py/meteodaten/standort/{standort}", response_model=List[dict])
def lese_daten_fuer_standort(standort: str):
    result = [
        {
            "Datum": datetime.fromtimestamp(datensatz["Datum"] / 1000).strftime("%Y-%m-%d"),
            "Standort": datensatz["Standort"],
            "T": datensatz["T"],
            "RainDur": datensatz["RainDur"],
        }
        for datensatz in daten
        if standort.lower() == datensatz.get("Standort", "").lower()
    ]

    if not result:
        raise HTTPException(status_code=404, detail="Keine Daten für den angegebenen Standort gefunden.")
    return result
