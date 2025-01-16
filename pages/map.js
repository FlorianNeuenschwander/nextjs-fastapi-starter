import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

if (typeof window === "undefined") {
  console.error("Leaflet kann im SSR nicht geladen werden.");
}

function SetMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function Map({ data, selectedStation }) {
  if (typeof window === "undefined") {
    return null;
  }

  const stationCoordinates = {
    Zch_Schimmelstrasse: [47.3769, 8.5417],
    Zch_Rosengartenstrasse: [47.3856, 8.5337],
    Zch_Stampfenbachstrasse: [47.3793, 8.548],
  };

  const center = stationCoordinates[selectedStation] || [47.3769, 8.5417];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <SetMapCenter center={center} />

      {data?.map((entry, index) => {
        const { WGS84_lat: lat, WGS84_lng: lng, Standortname } = entry;
        if (!lat || !lng) {
          console.error(`Ungültige Koordinaten für Eintrag ${index}:`, entry);
          return null;
        }

        return (
          <Marker key={index} position={[lat, lng]}>
            <Popup>{Standortname || "Keine Informationen verfügbar"}</Popup>
          </Marker>
        );
      })}

      {selectedStation && (
        <CircleMarker
          center={center}
          radius={10}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 1 }}
        >
          <Popup>{selectedStation}</Popup>
        </CircleMarker>
      )}
    </MapContainer>
  );
}
