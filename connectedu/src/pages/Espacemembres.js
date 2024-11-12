import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboardmenu from "../components/Dashboardmenu";
import Dashboardsider from "../components/Dashboardsider";

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
  Form,
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
  Button,
  Modal,
  Space,
  List,
  Skeleton,
} from "antd";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Typography } from "antd";

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const Espacemembres = () => {
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
          "Erreur lors de la récupération des informations de l'école:",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const history = useHistory();

  const handleBreadcrumbClick = (route) => {
    history.push(route);
  };

  {
    /* Ajout des membres de l'école */
  }
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTodo = () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      email,
      name,
    };
    setTodoList((prev) => [...prev, newTodo]);
    setEmail("");
    setName("");
  };

  // Fonction de suppression
  const deleteTodo = (todoId) => {
    const newTodos = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodos);
  };

  {
    /* Fin Ajout des matières de la classe */
  }

  {
    /* Début modal confirmation de suppression */
  }
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  {
    /* Fin modal confirmation de suppression */
  }

  return (
    <Layout style={{ background: "#001E32" }}>
      <Dashboardmenu />

      <Layout style={{ background: "#001E32" }}>
        <Dashboardsider />

        {/* Corps de la page 1 */}

        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#001E32" }}>
          <Breadcrumb
            style={{ margin: "16px 0", cursor: "pointer", color: "#2ECC71" }}
          >
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick("/")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick("/list")}>
              {infosEcole.nom}
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick("/app")}>
              <font color="#3498DB">Membres</font>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* Liste membres */}
            {/* Ajout des matières de la classe */}
            <Title level={3} style={{ color: "#3498DB" }}>
              Membres de l'école
            </Title>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={addTodo}
            >
              <Form.Item
                name="libelle"
                label="Adresse mail"
                rules={[
                  { required: true, message: "Veuillez entrer l'adresse mail" },
                ]}
              >
                <Input
                  placeholder="Ajouter un membre"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="libelle1"
                label="Nom du membre"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le nom du membre",
                  },
                ]}
              >
                <Input
                  placeholder="Ajouter un membre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Ajouter
                </Button>
              </Form.Item>
            </Form>

            {/* debut confirmation modal */}

            <>
              <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                )}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </>
            {/* fin confirmation modal */}

            {/* Liste des membres ajoutés */}
            <Title level={4} style={{ color: "#3498DB" }}>
              Liste des membres ajoutés
            </Title>
            <ol>
              {todoList.length ? (
                todoList.map((todo) => (
                  <div key={todo.id}>
                    <li style={{ display: "inline" }}>
                      {todo.name} - {todo.email}
                    </li>
                    <button
                      style={{ marginLeft: "250px" }}
                      onClick={() => {
                        Modal.confirm({
                          title: "Confirmation",
                          content: "Êtes-vous sûr de supprimer ce membre ?",
                          onOk: () => deleteTodo(todo.id),
                          onCancel: () => console.log("Action annulée"),
                        });
                      }}
                    >
                      Supprimer
                    </button>
                    <button onClick={showModal} style={{ marginLeft: "20px" }}>
                      Modifier
                    </button>
                  </div>
                ))
              ) : (
                <span>Liste vide</span>
              )}
            </ol>

            {/* fin Liste des membres ajoutés */}
            {/* Fin Ajout des membres de l'école' */}
            {/* fin Liste membres */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Espacemembres;
