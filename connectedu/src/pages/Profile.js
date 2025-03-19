import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Button,
  Modal,
  message,
  Form,
  Input,
  Select,
} from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct named import

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const Profile = () => {
  const [infosEcole, setInfosEcole] = useState({});
  const [invites, setInvites] = useState([]);
  const [showAccountInfo, setShowAccountInfo] = useState(true); // Par défaut, affichage des informations du compte
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [showInviteInfo, setShowInviteInfo] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        const decodedToken = jwtDecode(token); // Correct usage
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

        // Fetch existing invites if available
        const invitesResponse = await axios.get(
          `http://${schema}.localhost:8000/ecole/info/${ecole_id}/invites/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInvites(invitesResponse.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'école:",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const profileStyle = {
    background: darkMode ? "#1f1f1f" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
  };

  const toggleAddGuestModal = () => {
    setShowAddGuestModal(!showAddGuestModal);
  };

  const handleAddGuest = async (values) => {
    try {
      const token = localStorage.getItem("access");
      const decodedToken = jwtDecode(token); // Correct usage
      const ecole_id = decodedToken.id_ecole;
      const schemaname = decodedToken.schema_name;
      const schema = schemaname.replace("_", "-");

      await axios.post(
        `http://${schema}.localhost:8000/ecole/info/${ecole_id}/invites/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Ajouter le nouvel invité à l'état
      setInvites([...invites, values]);
      message.success("Compte invité ajouté avec succès !");
      toggleAddGuestModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout du compte invité:", error);
      message.error("Échec de l'ajout du compte invité.");
    }
  };

  const handleAccountClick = () => {
    setShowAccountInfo(true);
    hideOtherSections("account");
  };

  const handlePrivacyClick = () => {
    setShowPrivacyInfo(true);
    hideOtherSections("privacy");
  };

  const handleInviteClick = () => {
    setShowInviteInfo(true);
    hideOtherSections("invite");
  };

  const hideOtherSections = (currentSection) => {
    const sections = ["account", "privacy", "invite"];

    sections.forEach((section) => {
      if (section !== currentSection) {
        setShowState(section, false);
      }
    });
  };

  const setShowState = (section, value) => {
    switch (section) {
      case "account":
        setShowAccountInfo(value);
        break;
      case "privacy":
        setShowPrivacyInfo(value);
        break;
      case "invite":
        setShowInviteInfo(value);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:3000/";
  };

  const handleAddGuestCancel = () => {
    setShowAddGuestModal(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={profileStyle}>
        <div className="logo" />
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            onClick={handleAccountClick}
          >
            Compte
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={<GlobalOutlined />}
            onClick={handleInviteClick}
          >
            Invité
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Menu mode="horizontal" theme="dark" style={{ float: "right" }}>
            <Menu.Item
              key="1"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ color: "#87CEEB" }}
            >
              Déconnexion
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: "16px", textAlign: "center" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {showAccountInfo && (
              <div>
                <Avatar size={100} src={infosEcole.logo} />
                <Title level={16}>{infosEcole.nom}</Title>
                <Paragraph>{infosEcole.email_ecole}</Paragraph>
                <Paragraph>Tel: {infosEcole.telephone_1}</Paragraph>
                <Paragraph>{infosEcole.telephone_2}</Paragraph>
                <Paragraph>
                  Ville de Résidence: {infosEcole.ville_residence}
                </Paragraph>
                <Paragraph>Adresse: {infosEcole.adresse}</Paragraph>
                <Paragraph>Pièce d'Identité: Carte d'identité</Paragraph>

                <div key={infosEcole.id}>
                  <h3>Responsables:</h3>
                  <ul>
                    {infosEcole.utilisateur_set &&
                    infosEcole.utilisateur_set.length > 0 ? (
                      infosEcole.utilisateur_set.map((utilisateur) => (
                        <li key={utilisateur.id}>
                          {utilisateur.nom} - {utilisateur.email}
                        </li>
                      ))
                    ) : (
                      <li>Aucun responsable trouvé.</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {showInviteInfo && (
              <div>
                <UsergroupAddOutlined size={190} />
                <Title level={16}>Invité</Title>
                <Button type="primary" onClick={toggleAddGuestModal}>
                  Ajouter un compte invité
                </Button>
                <div style={{ marginTop: "20px" }}>
                  <h3>Liste des invités:</h3>
                  <ul>
                    {invites.length > 0 ? (
                      invites.map((invite, index) => (
                        <li key={index}>
                          {invite.guestName} - {invite.guestEmail}
                        </li>
                      ))
                    ) : (
                      <li>Aucun invité trouvé.</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Content>
      </Layout>
      <Modal
        title="Ajouter un compte invité"
        visible={showAddGuestModal}
        onCancel={handleAddGuestCancel}
        footer={null}
      >
        <Form name="addGuestForm" onFinish={handleAddGuest}>
          <Form.Item
            name="guestName"
            label="Nom du compte invité"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le nom du compte invité",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="guestEmail"
            label="Email du compte invité"
            rules={[
              {
                required: true,
                type: "email",
                message: "Veuillez entrer une adresse email valide",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Profile;
