import React, { FC, useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import CircularProgressBar from "../components/CircularProgressBar";
import Map from "../components/Map";
import ReportsTable from "../components/ReportsTable";  // Import ReportsTable component

const { Title } = Typography;

const Home: FC = () => {
  // State variables for flood data
  const [waterLevel, setWaterLevel] = useState<number>(80); // Default water level for Mumbai or other region
  const [streamFlow, setStreamFlow] = useState<number>(0.255); // Default stream flow
  const [floodStatus, setFloodStatus] = useState<string>("Flood"); // Default flood status
  const [reportData, setReportData] = useState<any[]>([]); // State to hold report data for the table

  // Flood data for regions (Mumbai, Pune, Tamil Nadu, Gujarat)
  const states = [
    { id: 1, name: "Mumbai", lat: 19.0760, lng: 72.8777, waterLevel: 80, streamFlow: 0.5, floodStatus: "No Flood", datetime: new Date().toLocaleString(), atharagalla: 80, galgamuwa: 75, mediyawa: 72, mahagalkadawala: 74, streamflow: 0.45 },
    { id: 2, name: "Pune", lat: 18.5204, lng: 73.8567, waterLevel: 20, streamFlow: 0.1, floodStatus: "No Flood", datetime: new Date().toLocaleString(), atharagalla: 20, galgamuwa: 18, mediyawa: 16, mahagalkadawala: 18, streamflow: 0.2 },
    { id: 3, name: "Tamil Nadu", lat: 11.1276, lng: 78.6569, waterLevel: 90, streamFlow: 0.8, floodStatus: "Flood", datetime: new Date().toLocaleString(), atharagalla: 90, galgamuwa: 85, mediyawa: 82, mahagalkadawala: 84, streamflow: 0.9 },
    { id: 4, name: "Gujarat", lat: 22.2587, lng: 71.1924, waterLevel: 70, streamFlow: 0.6, floodStatus: "Flood", datetime: new Date().toLocaleString(), atharagalla: 70, galgamuwa: 68, mediyawa: 65, mahagalkadawala: 67, streamflow: 0.75 },
    // Add more states with their respective lat/lng
  ];

  // Function to update the flood data for the selected region
  const updateFloodData = (regionId: number) => {
    const selectedRegion = states.find(state => state.id === regionId);

    if (selectedRegion) {
      setWaterLevel(selectedRegion.waterLevel); // Update water level
      setStreamFlow(selectedRegion.streamFlow); // Update stream flow
      setFloodStatus(selectedRegion.floodStatus); // Update flood status

      // Update the report data for the selected region
      const updatedReportData = [
        {
          key: selectedRegion.id.toString(),  // Use region id as the unique key
          datetime: selectedRegion.datetime,
          atharagalla: selectedRegion.atharagalla,
          galgamuwa: selectedRegion.galgamuwa,
          mediyawa: selectedRegion.mediyawa,
          mahagalkadawala: selectedRegion.mahagalkadawala,
          streamflow: selectedRegion.streamflow,
        }
      ];
      setReportData(updatedReportData); // Set updated report data
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
        </Col>

        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Real-Time Map" bordered={false}>
                {/* Map component, passing the updateFloodData function */}
                <Map updateFloodData={updateFloodData} states={states} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Reports Table */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Flood Data Reports" bordered={false}>
            <ReportsTable reportData={reportData} /> {/* Pass updated reportData */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
