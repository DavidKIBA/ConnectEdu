import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ReloadOutlined,
  TeamOutlined,
  SearchOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Badge,
  Dropdown,
  Avatar,
  Card,
  Col,
  Row,
  Statistic,
  Progress,
  Carousel,
  Affix,
} from "antd";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { Typography } from "antd";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const profil = () => {
  window.open("http://localhost:3000/profile", "_blank");
};

const Dashboardmenu = () => {
  const [infosEcole, setInfosEcole] = useState({});
  const page = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        const decodedToken = jwtDecode(token);
        const ecole_id = decodedToken.id_ecole;
        const schemaname = decodedToken.schema_name;
        const schema = schemaname.replace("_", "-");

        const response = await axios.get(
          `http://${schema}.localhost:8000/info-ecole/${ecole_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInfosEcole(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du logo de l'école:",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const dashboard = () => {
    page.push("/dashboard");
  };

  const messageicone = () => {
    page.push("/MessagePage");
  };

  // Noms pour le menu horizontal
  const horizontalMenuItems = [
    {
      key: "1",
      label: (
        <span
          style={{ color: "#2ECC71", fontWeight: "bold" }}
          onClick={dashboard}
        >
          Dashboard
        </span>
      ),
    },
    { key: "3", icon: <ReloadOutlined /> },
    { key: "3", icon: <SettingOutlined />, label: "Paramètres" },
    {
      key: "4",
      icon: (
        <Badge count={3} onClick={messageicone} overflowCount={99}>
          <MessageOutlined />
        </Badge>
      ),
      label: "Messages",
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={profil}>
        Mon Profil
      </Menu.Item>
      <Menu.Item key="2">Paramètres</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => handleMenuClick1(3)}>
        Déconnexion
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick1 = (value) => {
    // Mettez en œuvre la logique de recherche ici
    console.log("Recherche:", value);
  };

  const handleSearch = (value) => {
    // Mettez en œuvre la logique de recherche ici
    console.log("Recherche:", value);
  };

  return (
    <Affix offsetTop={0}>
      <div>
        {/* Début du menu horizontal */}

        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={horizontalMenuItems}
            style={{ flex: 1, minWidth: 0 }}
            onClick={({ key }) => handleMenuClick1(key)}
          />

          <Search
            placeholder="Rechercher"
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer", marginLeft: "20px" }}
            />
          </Dropdown>
        </Header>

        {/* Fin du menu horizontal */}
      </div>
    </Affix>
  );
};

export default Dashboardmenu;
