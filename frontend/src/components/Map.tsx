import React, { FC, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button, Typography } from "antd";
import "leaflet/dist/leaflet.css";

// Define the prop type
interface MapProps {
  updateFloodData: (cityId: number) => void; // Add this prop
}

const { Title } = Typography;

const Map: FC<MapProps> = ({ updateFloodData }) => {
  const cities = [
    { id: 1, name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    { id: 2, name: "Pune", lat: 18.5204, lng: 73.8567 },
    { id: 3, name: "Nagpur", lat: 21.1458, lng: 79.0882 },
    { id: 4, name: "Nashik", lat: 19.9975, lng: 73.7898 },
    { id: 5, name: "Aurangabad", lat: 19.8762, lng: 75.3433 },
  ];

  // Handle city click and update flood data
  const handleCityClick = (cityId: number) => {
    updateFloodData(cityId); // Update flood data on city click
  };

  return (
    <div style={{ padding: "20px" }}>
      <MapContainer center={[19.0760, 72.8777]} zoom={6} style={{ height: "60vh" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map(({ id, name, lat, lng }) => (
          <Marker key={id} position={[lat, lng]} icon={new L.Icon({ iconUrl: "/path/to/icon.png", iconSize: [25, 41] })}>
            <Popup>
              <Title level={4}>{name}</Title>
              <Button onClick={() => handleCityClick(id)}>Get Flood Data</Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
