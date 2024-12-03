// src/components/ReportsTable.tsx
import React, { FC } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

// Define the structure of the data
interface DataType {
  key: string;
  datetime: string;
  atharagalla: number;
  galgamuwa: number;
  mediyawa: number;
  mahagalkadawala: number;
  streamflow: number;
}

// Define the prop types for the component
interface ReportsTableProps {
  reportData: DataType[];  // reportData must be passed to this component
}

const columns: ColumnsType<DataType> = [
  { title: "Time", dataIndex: "datetime", key: "datetime" },
  { title: "Atharagalla Water Level", dataIndex: "atharagalla", key: "atharagalla" },
  { title: "Galgamuwa Water Level", dataIndex: "galgamuwa", key: "galgamuwa" },
  { title: "Mediyawa Water Level", dataIndex: "mediyawa", key: "mediyawa" },
  { title: "Mahagalkadawala Water Level", dataIndex: "mahagalkadawala", key: "mahagalkadawala" },
  { title: "Stream Flow Rate", dataIndex: "streamflow", key: "streamflow" },
];

// The ReportsTable component should accept reportData as a prop
const ReportsTable: FC<ReportsTableProps> = ({ reportData }) => {
  return <Table columns={columns} dataSource={reportData} />;
};

export default ReportsTable;
