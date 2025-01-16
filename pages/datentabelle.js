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
  const temperatures = data.map((entry) => entry.T);
  const rainDurations = data.map((entry) => entry.RainDur);

  return {
    maxTemp: Math.max(...temperatures).toFixed(2),
    minTemp: Math.min(...temperatures).toFixed(2),
    avgTemp: (
      temperatures.reduce((sum, value) => sum + value, 0) / temperatures.length
    ).toFixed(2),
    maxRain: Math.max(...rainDurations).toFixed(2),
    minRain: Math.min(...rainDurations).toFixed(2),
    avgRain: (
      rainDurations.reduce((sum, value) => sum + value, 0) /
      rainDurations.length
    ).toFixed(2),
  };
}

export default function DataTable({ data }) {
  if (data.length === 0) return null;

  const stats = calculateStats(data);

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Typography variant="h6" style={{ padding: "10px" }}>
        Statistiken
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Kategorie</TableCell>
            <TableCell align="center">Maximal</TableCell>
            <TableCell align="center">Minimal</TableCell>
            <TableCell align="center">Mittelwert</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Temperatur (°C)</TableCell>
            <TableCell align="center">{stats.maxTemp}</TableCell>
            <TableCell align="center">{stats.minTemp}</TableCell>
            <TableCell align="center">{stats.avgTemp}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Niederschlag (min)</TableCell>
            <TableCell align="center">{stats.maxRain}</TableCell>
            <TableCell align="center">{stats.minRain}</TableCell>
            <TableCell align="center">{stats.avgRain}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
