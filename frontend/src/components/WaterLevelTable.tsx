import React, { FC, useState, useEffect } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  datetime: string;
  atharagalla: number;
  galgamuwa: number;
  mediyawa: number;
  mahagalkadawala: number;
  streamflow: number;
}

const columns: ColumnsType<DataType> = [
  { title: "Time", dataIndex: "datetime", key: "datetime" },
  { title: "Atharagalla Water Level", dataIndex: "atharagalla", key: "atharagalla" },
  { title: "Galgamuwa Water Level", dataIndex: "galgamuwa", key: "galgamuwa" },
  { title: "Mediyawa Water Level", dataIndex: "mediyawa", key: "mediyawa" },
  { title: "Mahagalkadawala Water Level", dataIndex: "mahagalkadawala", key: "mahagalkadawala" },
  { title: "Stream Flow Rate", dataIndex: "streamflow", key: "streamflow" },
];

const ReportsTable: FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const cityId = 1; // For demonstration, replace this with dynamic cityId
    const storedReports = localStorage.getItem(`city_${cityId}_reports`);
    if (storedReports) {
      setData(JSON.parse(storedReports));
    }
  }, []);

  return <Table columns={columns} dataSource={data} />;
};

export default ReportsTable;
