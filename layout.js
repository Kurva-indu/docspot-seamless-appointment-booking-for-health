import React from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

function AppLayout({ children, userType = "user" }) {
  const navigate = useNavigate();

  const menuItems = {
    user: [
      { key: "1", label: <Link to="/">Home</Link> },
      { key: "2", label: <Link to="/appointments">My Appointments</Link> },
    ],
    doctor: [
      { key: "1", label: <Link to="/">Home</Link> },
      { key: "2", label: <Link to="/doctor-appointments">Appointments</Link> },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline" items={menuItems[userType]} />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <div style={{ float: "right", marginRight: 20 }}>
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </span>
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
