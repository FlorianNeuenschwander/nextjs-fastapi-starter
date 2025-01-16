import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function calculateStats(data) {
  if (data.length === 0) {
    return {
      maxTemp: null,
      minTemp: null,
      avgTemp: null,
      maxRain: null,
      minRain: null,
      avgRain: null,
    };
  }

  const temperatures = data.map((entry) => entry.T);
  const rainDurations = data.map((entry) => entry.RainDur);

  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);
  const avgTemp = (
    temperatures.reduce((sum, value) => sum + value, 0) / temperatures.length
  ).toFixed(2);

  const maxRain = Math.max(...rainDurations);
  const minRain = Math.min(...rainDurations);
  const avgRain = (
    rainDurations.reduce((sum, value) => sum + value, 0) / rainDurations.length
  ).toFixed(2);

  return { maxTemp, minTemp, avgTemp, maxRain, minRain, avgRain };
}

export default function DataTable({ data }) {
  const stats = calculateStats(data);

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom style={{ padding: "10px" }}>
        Statistiken für Temperatur und Niederschlag
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Kategorie</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Maximal</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Minimal</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Mittelwert</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Temperatur (°C)</TableCell>
            <TableCell align="center">
              {stats.maxTemp ?? "Keine Daten"}
            </TableCell>
            <TableCell align="center">
              {stats.minTemp ?? "Keine Daten"}
            </TableCell>
            <TableCell align="center">
              {stats.avgTemp ?? "Keine Daten"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Niederschlag (min)</TableCell>
            <TableCell align="center">
              {stats.maxRain ?? "Keine Daten"}
            </TableCell>
            <TableCell align="center">
              {stats.minRain ?? "Keine Daten"}
            </TableCell>
            <TableCell align="center">
              {stats.avgRain ?? "Keine Daten"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
