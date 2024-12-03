// src/pages/Reports.tsx
import { Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { FC } from "react";
import ReportsTable from "../components/ReportsTable";

// Define the Reports component to accept reportData as a prop
interface ReportsProps {
  reportData: any[];  // reportData is an array of report items (could be dynamically passed)
}

const Reports: FC<ReportsProps> = ({ reportData }) => {
  return (
    <div>
      <Title>Reports</Title>
      <Row gutter={16}>
        <Col span={24}>
          <Card bordered={false}>
            {/* Pass the reportData to ReportsTable */}
            <ReportsTable reportData={reportData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
