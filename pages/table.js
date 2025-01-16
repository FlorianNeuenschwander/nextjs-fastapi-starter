import React from "react";
import { createRoot } from "react-dom/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function renderTable(data) {
  const root = createRoot(document.getElementById("table-container"));

  root.render(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <strong>Datum</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Temperatur (°C)</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Niederschlag (min)</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {new Date(entry.Datum).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
                {entry.T ? entry.T.toFixed(2) : "-"}
              </TableCell>
              <TableCell align="center">
                {entry.RainDur ? entry.RainDur.toFixed(2) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
