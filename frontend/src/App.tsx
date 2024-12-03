// src/App.tsx
import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import { Link, Route, Routes } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const navMenus = [
  { key: "0", label: "Home", path: "/", element: <Home />, position: "left" },
  {
    key: "1",
    label: "Reports",
    path: "/reports",
    element: <Reports reportData={[]} />,  // Initially empty, will be updated dynamically
    position: "left",
  },
  { key: "2", label: "Log in", path: "/login", element: <Login />, position: "right" },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedNav, setSelectedNav] = useState("0"); // State to track the selected navbar item
  const [reportData, setReportData] = useState<any[]>([]);  // Store report data

  const handleNavClick = (key: string) => {
    setSelectedNav(key); // Update the selected navbar item when clicked
  };

  // Define the type of reports to be more specific
  type ReportDataType = {
    [key: number]: {
      key: string;
      datetime: string;
      atharagalla: number;
      galgamuwa: number;
      mediyawa: number;
      mahagalkadawala: number;
      streamflow: number;
    }[];
  };

  // Function to update report data
  const updateReportData = (cityId: number) => {
    const reports: ReportDataType = {
      1: [
        { key: "1", datetime: "12/3/2024", atharagalla: 80, galgamuwa: 85, mediyawa: 90, mahagalkadawala: 75, streamflow: 10 },
      ], // Mumbai
      2: [
        { key: "2", datetime: "12/3/2024", atharagalla: 85, galgamuwa: 88, mediyawa: 92, mahagalkadawala: 77, streamflow: 12 },
      ], // Pune
      // Add data for other cities...
    };

    setReportData(reports[cityId] || []); // Update report data based on selected city
  };

  const renderMenuItems = () => {
    const leftMenuItems = navMenus
      .filter((menu) => menu.position === "left")
      .map((menu) => (
        <Menu.Item key={menu.key}>
          <Link to={menu.path}>{menu.label}</Link>
        </Menu.Item>
      ));

    const rightMenuItems = navMenus
      .filter((menu) => menu.position === "right")
      .map((menu) => (
        <Menu.Item key={menu.key}>
          <Link to={menu.path}>{menu.label}</Link>
        </Menu.Item>
      ));

    return (
      <>
        {leftMenuItems}
        <Menu.Item style={{ marginLeft: "auto" }}>{rightMenuItems}</Menu.Item>
      </>
    );
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedNav]} // Pass the selected key to highlight the active navbar item
          onClick={({ key }) => handleNavClick(key)} // Handle navbar item click
        >
          {renderMenuItems()}
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Routes>
          {navMenus.map((menu) => (
            <Route path={menu.path} element={React.cloneElement(menu.element, { reportData })} />
          ))}
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>cepdnaclk ©2023</Footer>
    </Layout>
  );
};

export default App;
