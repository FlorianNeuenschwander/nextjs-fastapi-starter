import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Diagram({ data }) {
  if (!data || data.length === 0) {
    return <p>Keine Daten für das Diagramm verfügbar.</p>;
  }

  const labels = data.map((entry) =>
    new Date(entry.Datum).toLocaleDateString("de-DE")
  );

  const temperatureData = data.map((entry) => entry.T);
  const precipitationData = data.map((entry) => entry.RainDur);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperatur (°C)",
        data: temperatureData,
        borderColor: "red",
        backgroundColor: "red",
        yAxisID: "y2",
      },
      {
        label: "Niederschlagsdauer (min)",
        data: precipitationData,
        borderColor: "blue",
        backgroundColor: "blue",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperatur und Niederschlag",
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Niederschlagsdauer (min)",
        },
        ticks: {
          color: "blue",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Temperatur (°C)",
        },
        ticks: {
          color: "red",
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
}
