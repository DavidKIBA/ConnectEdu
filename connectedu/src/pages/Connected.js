// Home.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // pour rediriger les bouttons sur d'autres pages
import ConnectedMenu from "../components/ConnectedMenu";
import Footer from "../components/Footer";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Mentions,
  Select,
  TreeSelect,
  Flex,
  Image,
  Checkbox,
  Typography,
  Row,
  Col,
} from "antd";
import {
  ProjectOutlined,
  SecurityScanOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

import { Card, Layout } from "antd";
import Item from "antd/es/list/Item";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const { Meta } = Card;
const { Title } = Typography;
const { Header, Sider, Content } = Layout;

const cardStyle: React.CSSProperties = {
  width: 620,
};

const imgStyle: React.CSSProperties = {
  display: "block",
  width: 273,
};

const Home = () => {
  const [infosEcole, setInfosEcole] = useState({});

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

  // formulaire de contact

  const layoutStyle = {
    width: "80vw", // Ajustez la largeur selon vos besoins
    minWidth: "300px", // Assurez-vous qu'il ne devienne pas trop étroit
    background: "#fff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    textAlign: "center",
    padding: "16px 0",
    fontSize: "24px",
    fontWeight: "bold",
    background: "#001529",
    color: "#fff",
    borderRadius: "8px 8px 0 0",
  };

  const contentStyle = {
    padding: "24px",
    fontSize: "16px",
    textAlign: "center",
  };

  const { RangePicker } = DatePicker;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  // fonction de redirection du boutton vers la page about
  const voirplus = useHistory();
  const Voirplus = () => {
    voirplus.push("/about");
  };

  // fonction envoyant le mail de l'utilisateur.

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajout de la logique pour gérer l'envoi du formulaire
  };

  return (
    <div className="">
      <div className="photo">
        <img
          className="background-image"
          src={process.env.PUBLIC_URL + "/images/homeimage.jpg"}
          alt="Accueil"
        />
      </div>
      <ConnectedMenu />

      <div className="entete">
        <div
          className="titre1"
          style={{
            display: "block",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Title
            className="titre1_1"
            style={{ color: "white", fontSize: "70px" }}
          >
            ConnectEdu
          </Title>

          <Title
            className="titre1_2"
            level={2}
            style={{ color: "white", fontSize: "40px" }}
          >
            L'école à portée des mains
          </Title>
          <Title
            level={2}
            className="titre1_3"
            style={{ color: "#2ecc71", fontSize: "20px" }}
          >
            Votre partenaire de confiance!
          </Title>
        </div>

        <Flex gap="10%" className="flex" style={{ padding: "80px" }}>
          <Flex>
            <div className="form">
              <Form
                name="basic"
                labelCol={{
                  span: 15,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 800,
                }}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  name="nom"
                  label="nom"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le nom complet",
                    },
                  ]}
                >
                  <Input
                    placeholder="Entrer votre nom complet"
                    style={{ width: "150px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="email"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer l'adresse mail",
                    },
                  ]}
                >
                  <Input
                    placeholder="Entrer votre adresse mail"
                    style={{ width: "150px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="subject"
                  label="subject"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer l'objet du message",
                    },
                  ]}
                >
                  <Input
                    placeholder="Entrer l'objet"
                    style={{ width: "150px" }}
                  />
                </Form.Item>
                <Form.Item
                  name="message"
                  label="message"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer l'objet du message",
                    },
                  ]}
                >
                  <textarea />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Flex>
          <Flex>
            <div className="liste1">
              <Title
                level={2}
                className="titre1_3"
                style={{ color: "#2ecc71", fontSize: "20px" }}
              >
                Découvrez ce que ConnectEdu peut faire pour vous
              </Title>
              <ul>
                <li className="ligne">
                  Gérez facilement vos étudiants, des admissions à la
                  progression académique.
                </li>{" "}
                <br />
                <li className="ligne">
                  Facilitez la communication avec les parents grâce à notre
                  système de ...
                </li>
              </ul>
            </div>
            {/* <button className="voirplus" onClick={Voirplus}>
            Voir plus
          </button>{" "} */}
          </Flex>
        </Flex>
      </div>
      <div className="presence">Présent dans plus de 20 pays d’Afrique</div>
      <div className="pays">Congo, RDC, Guinée Bissau, Tchad, ...</div>
      <br></br>
      {/* footer*/}
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
};
export default Home;
