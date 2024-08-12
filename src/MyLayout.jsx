import React, { useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  BellOutlined,
  CalculatorTwoTone,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Typography, theme } from "antd";
const { Header, Sider, Content } = Layout;
const MyLayout = () => {
  const navigate = useNavigate();
  const [header, setHeader] = useState("Chia hóa đơn");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // const handleMenuClick = (e) => {
  //   if (e.key === "1") {
  //     localStorage.removeItem("access_token");
  //     localStorage.removeItem("role");
  //     dispatch(updateAuthenticate({ accessToken: undefined, role: undefined }));
  //     navigate("/auth/login");
  //   }
  // };
  // const menuProps = {
  //   items: [{ key: "1", label: "Logout" }],
  //   onClick: handleMenuClick,
  // };
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
      >
        {/* <div className="demo-logo-vertical">
          <img src="/ttlab-logo-white.svg" alt="logo" />
        </div> */}
        <Menu
          style={{ borderRadius: "8px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key={1}
            icon={<CalculatorTwoTone />}
            onClick={() => {
              navigate("/");
              setHeader("Chia hóa đơn");
            }}
          >
            Chia hóa đơn
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography.Title
              level={3}
              style={{ margin: "0px 0px 0px 16px", alignContent: "center" }}
            >
              {header}
            </Typography.Title>
            <div>
              <Button
                type="text"
                icon={<BellOutlined />}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              {/* <Dropdown menu={menuProps} trigger={["click"]}> */}
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              {/* </Dropdown> */}
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;
