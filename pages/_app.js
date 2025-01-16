import { useState } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import dynamic from "next/dynamic";
import Diagram from "./diagramm.js";
import DataTable from "./datentabelle.js";
import renderTable from "./table.js";
import "../styles/style.css";

const Map = dynamic(() => import("./map"), { ssr: false });

export default function App() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);

  const weatherStations = {
    Zch_Schimmelstrasse: { lat: 47.3769, lng: 8.5417 },
    Zch_Rosengartenstrasse: { lat: 47.3856, lng: 8.5337 },
    Zch_Stampfenbachstrasse: { lat: 47.3793, lng: 8.548 },
  };

  const handleFilter = async () => {
    if (!location || !startDate || !endDate) {
      alert("Bitte Standort und beide Datumsfelder ausfüllen.");
      return;
    }

    try {
      const response = await fetch(`/api/py/meteodaten/standort/${location}`);
      if (!response.ok) {
        throw new Error("API-Aufruf fehlgeschlagen");
      }

      const allData = await response.json();

      const start = new Date(startDate);
      const end = new Date(endDate);

      const filteredData = allData.filter((entry) => {
        const entryDate = new Date(entry.Datum);
        const isIn2023 = entryDate.getFullYear() === 2023;
        const isInDateRange = entryDate >= start && entryDate <= end;
        return isIn2023 && isInDateRange && entry.Standort === location;
      });

      setData(filteredData);
      renderTable(filteredData);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
      alert("Daten konnten nicht geladen werden.");
    }
  };

  const selectedLocation = weatherStations[location];
  const mapCenter = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lng]
    : [47.3769, 8.5417];

  return (
    <CssBaseline>
      <Container maxWidth="lg" className="app-container">
        <Typography variant="h4" gutterBottom className="app-title">
          Wetterdaten Zürich 2023
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          className="filter-container"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              select
              fullWidth
              label="Standort auswählen"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="Zch_Schimmelstrasse">
                Zürich Schimmelstrasse
              </MenuItem>
              <MenuItem value="Zch_Rosengartenstrasse">
                Zürich Rosengartenstrasse
              </MenuItem>
              <MenuItem value="Zch_Stampfenbachstrasse">
                Zürich Stampfenbachstrasse
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Startdatum"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              inputProps={{
                min: "2023-01-01",
                max: "2023-12-31",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Enddatum"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              inputProps={{
                min: "2023-01-01",
                max: "2023-12-31",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              fullWidth
              className="filter-button"
            >
              Filter anwenden
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom className="section-title">
          Gefilterte Wetterdaten
        </Typography>
        <div id="table-container"></div>

        <Typography variant="h5" gutterBottom className="section-title">
          Karte
        </Typography>
        <Map data={data} location={mapCenter} center={mapCenter} />

        <Typography variant="h5" gutterBottom className="section-title">
          Diagramm
        </Typography>
        <Diagram data={data} />

        <Typography variant="h5" gutterBottom className="section-title">
          Statistiken
        </Typography>
        <DataTable data={data} />
      </Container>
    </CssBaseline>
  );
}
