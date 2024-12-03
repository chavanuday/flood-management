import React, { FC, useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import CircularProgressBar from "../components/CircularProgressBar";
import Map from "../components/Map";

const { Title } = Typography;

const Home: FC = () => {
  // State variables for flood data
  const [waterLevel, setWaterLevel] = useState<number>(80); // Default water level for Mumbai or other city
  const [streamFlow, setStreamFlow] = useState<number>(0.255); // Default stream flow
  const [floodStatus, setFloodStatus] = useState<string>("Flood"); // Default flood status
  const [cityReport, setCityReport] = useState<string>(""); // Report text

  // Hardcoded flood data for cities in Maharashtra with lat/lng
  const cities = [
    { id: 1, name: "Mumbai", lat: 19.0760, lng: 72.8777, waterLevel: 80, streamFlow: 0.5, floodStatus: "Flood" },
    { id: 2, name: "Pune", lat: 18.5204, lng: 73.8567, waterLevel: 20, streamFlow: 0.1, floodStatus: "No Flood" },
    { id: 3, name: "Nagpur", lat: 21.1466, lng: 79.0882, waterLevel: 55, streamFlow: 0.3, floodStatus: "Flood" },
    // Add more cities with their respective lat/lng
  ];

  // Function to update the water level, stream flow, flood status, and generate the report
  const updateFloodData = (cityId: number) => {
    const selectedCity = cities.find(city => city.id === cityId);

    if (selectedCity) {
      setWaterLevel(selectedCity.waterLevel);
      setStreamFlow(selectedCity.streamFlow);
      setFloodStatus(selectedCity.floodStatus);

      // Generate the report text dynamically
      const report = `
        City: ${selectedCity.name}
        Water Level: ${selectedCity.waterLevel}%
        Stream Flow: ${selectedCity.streamFlow} m³/s
        Flood Status: ${selectedCity.floodStatus}
      `;
      setCityReport(report); // Update the report
    }
  };

  return (
    <div>
      <Title level={2}>Real-Time Flood Forecast</Title>

      <Row gutter={16}>
        <Col span={12}>
          {/* Cards displaying flood data */}
          <Row gutter={16} style={{ marginBottom: "3rem" }}>
            <Col span={12}>
              <Card title="Stream Flow" bordered={false}>
                <Title level={4}>{streamFlow} m³/s</Title>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Flood Status" bordered={false}>
                <Title level={4} style={{ color: floodStatus === "Flood" ? "red" : "green" }}>
                  {floodStatus}
                </Title>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: "3rem" }}>
            <Col span={24}>
              <Card title="Real-Time Water Level" bordered={false}>
                <CircularProgressBar waterLevel={waterLevel} />
              </Card>
            </Col>
          </Row>

          {/* Display the flood report */}
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Flood Report" bordered={false}>
                <pre>{cityReport}</pre> {/* Display the generated report */}
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Real-Time Map" bordered={false}>
                {/* Map component, passing the updateFloodData function */}
                <Map updateFloodData={updateFloodData} cities={cities} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
