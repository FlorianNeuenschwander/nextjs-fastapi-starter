import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);

function SetMapCenter({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);

  return null;
}

const Map = ({ data, location }) => {
  const defaultPosition = [47.3769, 8.5417];
  const mapCenter = location || defaultPosition;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <SetMapCenter center={mapCenter} />

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

        <CircleMarker
          center={mapCenter}
          radius={10}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 1 }}
        >
          <Popup>Wetterstation</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default Map;
