import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  updateFloodData: (regionId: number) => void;
  states: { id: number; name: string; lat: number; lng: number }[]; // List of states with lat/lng
}

const Map: React.FC<MapProps> = ({ updateFloodData, states }) => {
  const center = { lat: 19.0760, lng: 72.8777 }; // Center on Mumbai

  return (
    <MapContainer center={center} zoom={10} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {states.map((state) => (
        <Marker
          key={state.id}
          position={[state.lat, state.lng]}
          icon={new L.Icon({
            iconUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Red_dot.svg",
            iconSize: [25, 25],
          })}
        >
          <Popup>
            <span>{state.name}</span>
            <br />
            <button onClick={() => updateFloodData(state.id)}>View Report</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
