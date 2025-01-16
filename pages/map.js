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
import L from "leaflet";

// Custom-Komponente zum Setzen des Kartenmittelpunkts
function SetMapCenter({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
}

// Hauptkomponente Map
export default function Map({ data, location }) {
  const customIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={location || [47.3769, 8.5417]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <SetMapCenter center={location} />

      {data?.map((entry, index) => {
        const { WGS84_lat: lat, WGS84_lng: lng, Standortname } = entry;

        if (!lat || !lng) {
          console.error(`Ungültige Koordinaten für Eintrag ${index}:`, entry);
          return null;
        }

        return (
          <Marker key={index} position={[lat, lng]} icon={customIcon}>
            <Popup>{Standortname || "Keine Informationen verfügbar"}</Popup>
          </Marker>
        );
      })}

      <CircleMarker
        center={location || [47.3769, 8.5417]}
        radius={10}
        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 1 }}
      >
        <Popup>Wetterstation</Popup>
      </CircleMarker>
    </MapContainer>
  );
}
