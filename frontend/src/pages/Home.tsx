import React, { FC, useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import CircularProgressBar from "../components/CircularProgressBar";
import Map from "../components/Map";

const { Title } = Typography;

const Home: FC = () => {
  const [waterLevel, setWaterLevel] = useState(80); // Default water level for Mumbai or other city
  const [streamFlow, setStreamFlow] = useState(0.255); // Default stream flow
  const [floodStatus, setFloodStatus] = useState("Flood"); // Default flood status

  // Function to update the water level based on selected city
  const updateFloodData = (cityId: number) => {
    const floodData = JSON.parse(localStorage.getItem(`city_${cityId}_reports`) || "[]");

    if (floodData.length > 0) {
      setWaterLevel(floodData[0].atharagalla); // Update the water level dynamically
      setStreamFlow(floodData[0].streamflow); // Update stream flow dynamically
      setFloodStatus(floodData[0].atharagalla > 80 ? "Flood" : "No Flood"); // Update flood status dynamically
    }
  };

  return (
    <div>
      <Title level={2}>Real Time Flood Forecast</Title>

      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16} style={{ marginBottom: "3rem" }}>
            <Col span={12}>
              <Card title="Stream Flow" bordered={false}>
                <Title level={4}>{streamFlow} m³/s</Title>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Flood status" bordered={false}>
                <Title level={4} style={{ color: floodStatus === "Flood" ? "red" : "green" }}>
                  {floodStatus}
                </Title>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: "3rem" }}>
            <Col span={24}>
              <Card title="Real Time Water Level" bordered={false}>
                <CircularProgressBar waterLevel={waterLevel} />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Real Time Map" bordered={false}>
                {/* Pass the updateFloodData function to Map component */}
                <Map updateFloodData={updateFloodData} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
