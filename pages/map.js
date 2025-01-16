import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

let L;
if (typeof window !== "undefined") {
  L = require("leaflet");
}

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

const Map = ({ data, selectedStation }) => {
  const [isClient, setIsClient] = useState(false);
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && L) {
      setCustomIcon(
        L.icon({
          iconUrl: "/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      );
    }
    setIsClient(true);
  }, []);

  const stationCoordinates = {
    Zch_Schimmelstrasse: [47.3769, 8.5417],
    Zch_Rosengartenstrasse: [47.3856, 8.5337],
    Zch_Stampfenbachstrasse: [47.3793, 8.548],
  };

  const defaultPosition = [47.3769, 8.5417];
  const centerPosition =
    selectedStation && stationCoordinates[selectedStation]
      ? stationCoordinates[selectedStation]
      : defaultPosition;

  return (
    <div className="map-container" style={{ width: "50%", height: "400px" }}>
      {isClient && (
        <MapContainer
          center={centerPosition}
          zoom={12}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {data?.map((row, index) => {
            const {
              WGS84_lat: lat,
              WGS84_lng: lng,
              Standortname,
              T,
              Datum,
            } = row;
            if (!lat || !lng) {
              console.error(`Ungültige Koordinaten für Eintrag ${index}:`, row);
              return null;
            }

            return (
              <Marker
                key={`${lat}-${lng}-${index}`}
                position={[lat, lng]}
                icon={customIcon}
              >
                <Popup>
                  <b>Standort:</b>{" "}
                  {Standortname || "Keine Informationen verfügbar"}
                  <br />
                  <b>Temperatur:</b> {T} °C
                  <br />
                  <b>Datum:</b> {new Date(Datum).toLocaleDateString()}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
