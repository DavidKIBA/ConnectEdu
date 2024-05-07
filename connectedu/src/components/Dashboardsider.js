import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Badge, Button, Drawer } from "antd";
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
import { useEffect } from "react";
import axios from "axios";

const { Sider } = Layout;

const Dashboardsider = () => {
  const [infosEcole, setInfosEcole] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer le token JWT du local storage
        const token = localStorage.getItem("access");

        // Décoder le JWT pour obtenir les informations sur l'utilisateur
        const decodedToken = jwtDecode(token);

        // Extraire le schéma_name de la charge utile du JWT
        const schema_name = decodedToken.schema_name;
        const schema = schema_name.replace("_", "-");
        console.log("Schema Name:", schema);

        // Envoyer une requête HTTP pour obtenir les informations de l'utilisateur après l'authentification
        const response = await axios.get(
          "http://thales.192.168.1.3:8000/ecole/",
          console.log("reussi"),
          {
            // Inclure le token JWT dans l'en-tête Authorization de la requête
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Extraire le nom de l'utilisateur à partir des données reçues
        const adresse = response.data;

        // Mettre à jour l'état avec le nom de l'utilisateur
        setInfosEcole({ adresse });

        console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      }
    };

    // Appeler la fonction fetchUserData lors du chargement de la page du tableau de bord
    fetchUserData();
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // State pour contrôler la visibilité du Drawer
  const history = useHistory();

  const terms = useHistory();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
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
    terms.push("/terms");
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

  const verticalMenuItems = [
    {
      key: "sub1",
      icon: <UserOutlined />,
      label: infosEcole?.adresse || "Chargement...",
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
