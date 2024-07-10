import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Badge, Button, Drawer, Avatar } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  CalendarOutlined,
  FileTextOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Affix } from "antd";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const { Sider } = Layout;

const Dashboardsider = () => {
  const [infosEcole, setInfosEcole] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        const decodedToken = jwtDecode(token);
        const ecole_id = decodedToken.id_ecole;
        const schemaname = decodedToken.schema_name;
        const schema = schemaname.replace("_", "-");

        const response = await axios.get(
          `http://${schema}.localhost:8000/ecole/info/${ecole_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInfosEcole(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'école:",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleMenuClick = (label) => {
    switch (label) {
      case "Espaces eleves":
        history.push("/espaceeleves");
        break;
      case "Espaces parents":
        history.push("/espaceparents");
        break;
      case "Espaces membres":
        history.push("/espacemembres");
        break;
      default:
        break;
    }
  };

  const calendarIcone = () => {
    window.open("http://localhost:3000/calendrier", "_blank");
  };

  const messageIcone = () => {
    window.open("http://localhost:3000/MessagePage", "_blank");
  };

  const settingsIcone = () => {
    window.open("http://localhost:3000/Parametres", "_blank");
  };

  const termsIcone = () => {
    history.push("/terms");
  };

  const verticalMenuItems = [
    {
      key: "sub1",
      icon: <Avatar src={infosEcole.logo} />,
      label: infosEcole.nom,
      options: ["Espaces eleves", "Espaces parents", "Espaces membres"],
    },
    {
      key: "2",
      icon: (
        <Badge>
          <MessageOutlined />
        </Badge>
      ),
      label: "Messages",
      onClick: messageIcone,
    },
    {
      key: "3",
      icon: <CalendarOutlined />,
      label: "Calendrier",
      onClick: calendarIcone,
    },
    {
      key: "4",
      icon: <FileTextOutlined />,
      label: "Termes et conditions",
      onClick: termsIcone,
    },
    {
      key: "5",
      icon: <SettingOutlined />,
      label: "Paramètres",
      onClick: settingsIcone,
    },
  ];

  return (
    <Affix offsetLeft={0}>
      <Sider
        theme="dark"
        width={collapsed ? 80 : 200}
        collapsed={collapsed}
        style={{
          background: "#001E32",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            borderRight: 0,
          }}
        >
          {verticalMenuItems.map((item) => (
            <React.Fragment key={item.key}>
              {item.options ? (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.options.map((option) => (
                    <Menu.Item
                      key={option}
                      onClick={() => handleMenuClick(option)}
                    >
                      {`${option}`}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      handleMenuClick(item.label);
                    }
                  }}
                >
                  {item.label}
                </Menu.Item>
              )}
            </React.Fragment>
          ))}
        </Menu>
        <div style={{ alignSelf: "flex-end" }}>
          <Button
            type="text"
            onClick={toggleCollapsed}
            style={{ color: "white", fontSize: "24px" }}
          >
            <MenuOutlined />
          </Button>
        </div>
      </Sider>
      <Drawer
        title="Menu"
        placement="top"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisible}
        key="top"
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            borderRight: 0,
          }}
        >
          {verticalMenuItems.map((item) => (
            <React.Fragment key={item.key}>
              {item.options ? (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.options.map((option) => (
                    <Menu.Item
                      key={option}
                      onClick={() => handleMenuClick(option)}
                    >
                      {`${option}`}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      handleMenuClick(item.label);
                    }
                  }}
                >
                  {item.label}
                </Menu.Item>
              )}
            </React.Fragment>
          ))}
        </Menu>
      </Drawer>
    </Affix>
  );
};

export default Dashboardsider;
