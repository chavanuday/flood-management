import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  updateFloodData: (cityId: number) => void;
  cities: { id: number; name: string; lat: number; lng: number }[]; // List of cities with lat/lng
}

const Map: React.FC<MapProps> = ({ updateFloodData, cities }) => {
  // Set the center of the map (Maharashtra coordinates as an example)
  const center = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates, adjust if needed

  return (
    <MapContainer center={center} zoom={10} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Loop through cities and add markers */}
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          icon={new L.Icon({
            iconUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Red_dot.svg", // Marker icon
            iconSize: [25, 25],
          })}
        >
          <Popup>
            <span>{city.name}</span>
            <br />
            <button onClick={() => updateFloodData(city.id)}>View Report</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
