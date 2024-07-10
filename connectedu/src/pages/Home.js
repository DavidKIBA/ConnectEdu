// Home.js
import React from "react";
import { useHistory } from "react-router-dom"; // pour rediriger les bouttons sur d'autres pages
import Menu from "../components/Menu1";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
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
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/contact/send-single-email/",
        values
      );
      if (response.status === 200) {
        message.success("Email envoyé avec succès!");
      }
    } catch (error) {
      message.error("Erreur lors de l'envoi de l'email.");
      console.error("Error sending email:", error);
    }
  };
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
    <div className="home-container">
      <div className="photo">
        <img
          className="background-image"
          src={process.env.PUBLIC_URL + "/images/homeimage.jpg"}
          alt="Accueil"
        />
      </div>
      <Menu />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <Title className="titre1">ConnectEdu</Title>
        <br></br>
        <Title level={2} className="titre2">
          Découvrez ce que ConnectEdu peut faire pour vous :
        </Title>
        <br></br>
        <Title level={2} className="titre2">
          L'école à portée des mains
        </Title>
        <div className="liste">
          <ul>
            <li className="ligne">
              Gérez facilement vos étudiants, des admissions <br />à la
              progression académique.
            </li>{" "}
            <br />
            <li className="ligne">
              Facilitez la communication avec les parents <br />
              grâce à notre système de ....
            </li>
          </ul>
        </div>
        <button className="voirplus" onClick={Voirplus}>
          Voir plus
        </button>{" "}
      </div>
      {/* fin description */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}>Laissez-nous un message</Header>
            <Content style={contentStyle}>
              <Form
                {...formItemLayout}
                variant="filled"
                style={{ maxWidth: 1000 }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="E-mail"
                  name="Input"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Tel"
                  name="InputNumber"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="Objet"
                  name="Mentions"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Mentions style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="TextArea"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <Input.TextArea style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </Layout>
        </Flex>
      </div>
      {/* devises de ConnectEdu */}
      {/* <div className="devises">
        <div className="devise3">
          <Card
            hoverable
            style={{ width: 300, height: 240 }}
            // {<img alt="example" src="/images/Project Setup.png" width={10} />}
          >
            <h3>Efficacité Simplifiée</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>
          </Card>
        </div>
        <div className="devise2">
          <Card
            hoverable
            style={{ width: 300, height: 240 }}
            // {<img alt="example" src="/images/Security Shield.png" width={50} />}
            src={process.env.PUBLIC_URL + "/images/Security Shield.png"}
          >
            <h3>Sécurité Prioritaire</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>
          </Card>
        </div>
        <div className="devise3">
          <Card
            hoverable
            style={{ width: 300, height: 240, backgroundColor: "#3498DB" }}
            // {<img alt="example" src="images/Registration.png" width={50} />}
          >
            <h3>Personnalisé pour Vous</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>
          </Card>
        </div>
      </div>
      <br></br> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="presence">Présent dans plus de 20 pays d’Afrique</div>
      <div className="pays">Congo, RDC, Guinée Bissau, Tchad, ...</div>
      <br></br>
      {/* footer*/}
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Footer />
    </div>
  );
};

export default Home;
