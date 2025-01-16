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

function SetMapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function Map({ data, location }) {
  const center = location || [47.3769, 8.5417];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {}
      <SetMapCenter center={center} />

      {}
      <CircleMarker
        center={center}
        radius={10}
        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 1 }}
      >
        <Popup>Wetterstation</Popup>
      </CircleMarker>

      {}
      {data?.map((entry, index) => {
        const lat = entry.WGS84_lat;
        const lng = entry.WGS84_lng;

        if (!lat || !lng) {
          console.error(`Ungültige Koordinaten für Eintrag ${index}:`, entry);
          return null;
        }

        return (
          <Marker key={index} position={[lat, lng]}>
            <Popup>
              {entry.Standortname || "Keine Informationen verfügbar"}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
