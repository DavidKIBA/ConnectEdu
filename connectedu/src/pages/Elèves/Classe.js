import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Table,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Popconfirm,
  message,
  Modal,
  Card,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Dashboardmenu from "../../components/Dashboardmenu";
import Dashboardsider from "../../components/Dashboardsider";
import Uploadfiles from "../../components/Uploadfiles";

const { Header, Content } = Layout;
const { Title } = Typography;

const generateData = () => {
  const data = [];
  return data;
};

const Classe = ({ classKey }) => {
  const [classeData, setClasseData] = useState(null);

  useEffect(() => {
    const selectedClasseKey = localStorage.getItem("selectedClasseKey");
    if (selectedClasseKey) {
      const storedClasseData = localStorage.getItem(
        `classe_${selectedClasseKey}`
      );
      if (storedClasseData) {
        const parsedClasseData = JSON.parse(storedClasseData);
        setClasseData(parsedClasseData);
      }
    }
  }, []);

  const [infosEcole, setInfosEcole] = useState({});
  const history = useHistory();
  const [data, setData] = useState(generateData());
  const [modalVisible, setModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [classe, setClasse] = useState(null);

  useEffect(() => {
    const storedClass = localStorage.getItem(`classe_${classKey}`);

    if (storedClass) {
      setClasse(JSON.parse(storedClass));
    }
  }, [classKey]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedClass = localStorage.getItem(`classe_${classKey}`);
        const token = localStorage.getItem("access");
        const decodedToken = jwtDecode(token);
        const schemaname = decodedToken.schema_name;
        const schema = schemaname.replace("_", "-");

        const response = await axios.get(
          `http://${schema}.localhost:8000/ecole/eleve`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              niveau: classeData.libelle,
            },
          }
        );

        setInfosEcole(response.data);
        console.log("API response:", response.data);
        console.log("classe:", classeData.libelle);

        // Transforme les données pour les adapter au tableau
        const formattedData = response.data.map((item, index) => ({
          key: item.id,
          id: item.id,
          matricule: item.matricule,
          nom: item.nom,
          prenom: item.prenom,
          telephone: item.telephone,
          adresse: item.adresse,
        }));
        setData(formattedData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de la classe:",
          error
        );
      }
    };

    if (classeData) {
      fetchUserData();
    }
  }, [classKey, classeData]);

  const handleDelete = async (key) => {
    const token = localStorage.getItem("access");
    const decodedToken = jwtDecode(token);
    const schemaname = decodedToken.schema_name;
    const schema = schemaname.replace("_", "-");

    try {
      await axios.delete(
        `http://${schema}.localhost:8000/ecole/eleve/${key}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) => prevData.filter((item) => item.key !== key));
      setSelectedRowKeys([]);
      message.success("Enregistrement(s) supprimé(s) avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      message.error("Erreur lors de la suppression");
    }
  };

  const handleEdit = (record) => {
    setEditingKey(record.key);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleAdd = () => {
    setEditingKey("");
    setModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setEditingKey("");
    setModalVisible(false);
  };

  const handleSave = async (values) => {
    const token = localStorage.getItem("access");
    const decodedToken = jwtDecode(token);
    const schemaname = decodedToken.schema_name;
    const schema = schemaname.replace("_", "-");

    const data = {
      matricule: values.Matricule,
      nom: values.Nom,
      prenom: values.Prenom,
      adresse: values.Adresse,
      telephone: values.Telephone,
    };

    if (editingKey) {
      // Mise à jour de l'élève existant
      try {
        const response = await axios.patch(
          `http://${schema}.localhost:8000/ecole/eleve/${editingKey}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const newData = [...data];
        const index = newData.findIndex((item) => item.key === editingKey);
        if (index > -1) {
          newData[index] = { ...newData[index], ...response.data };
          setData(newData);
          setEditingKey("");
          message.success("Enregistrement modifié avec succès");
        }
        setModalVisible(false);
      } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        message.error("Erreur lors de la mise à jour");
      }
    } else {
      // Insertion d'un nouvel élève
      try {
        const response = await axios.post(
          `http://${schema}.localhost:8000/ecole/eleve/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData([...data, { ...response.data, key: response.data.id }]);
        message.success("Enregistrement ajouté avec succès");
        setModalVisible(false);
      } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
        message.error("Erreur lors de l'ajout");
      }
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Matricule",
      dataIndex: "matricule",
      key: "matricule",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Numéro de téléphone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      key: "adresse",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            Modifier
          </Button>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet enregistrement ?"
            onConfirm={() => handleDelete(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger>
              Supprimer
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleRowClick = (record, event) => {
    if (!event.target.closest("button")) {
      localStorage.setItem("selectedEleveId", record.id);
      window.open(`/eleve/${record.id}`, "_blank");
    }
  };

  const handleBreadcrumbClick = (path) => {
    history.push(path);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  {
    /* Ajout des matières de la classe */
  }
  const [todo, setTodo] = useState(" ");
  const [todoList, setTodoList] = useState([]);
  const addTodo = (e) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      value: todo,
    };
    setTodoList((prev) => [...prev, newTodo]);
    setTodo("");
  };

  {
    /* Fin Ajout des matières de la classe */
  }

  {
    /* Suppression des matières de la classe */
  }
  const deleteTodo = (todoId) => {
    const newTodos = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodos);
  };

  {
    /* Fin Suppression des matières de la classe */
  }

  return (
    <Layout style={{ background: "#001E32" }}>
      <Dashboardmenu />
      <Layout style={{ background: "#001E32" }}>
        <Dashboardsider />
        <Layout
          style={{
            padding: "0 24px 24px",
            backgroundColor: "#001E32",
            theme: "dark",
          }}
        >
          <Breadcrumb
            style={{ margin: "16px 0", cursor: "pointer", color: "#2ECC71" }}
          >
            <Breadcrumb.Item
              onClick={() => handleBreadcrumbClick("/connected")}
            >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick("/list")}>
              {infosEcole.nom}
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick("/app")}>
              <span style={{ color: "#3498DB" }}>
                {classeData ? classeData.libelle : "Classe non trouvée"}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
              borderRadius: "16px",
            }}
          >
            {classeData ? (
              <Title level={3} style={{ color: "#3498DB" }}>
                {classeData.libelle} {classeData.numero}
              </Title>
            ) : (
              <Row>
                <Col span={24}>Classe non trouvée</Col>
              </Row>
            )}

            <Button
              type="primary"
              onClick={handleAdd}
              style={{ marginBottom: "16px" }}
            >
              Ajouter un élève
            </Button>
            <Button
              type="primary"
              onClick={handleDelete}
              danger
              style={{ marginBottom: "16px" }}
            >
              Supprimer les éléments sélectionnés
            </Button>
            <div style={{ overflowX: "auto" }}>
              <Table
                columns={columns}
                dataSource={data}
                onRow={(record, rowIndex) => ({
                  onClick: (event) => {
                    handleRowClick(record, event);
                  },
                })}
                rowKey={(record) => record.key}
                rowSelection={{ ...rowSelection, checkStrictly: true }}
                scroll={{ x: true }}
              />
            </div>

            {/* Ajout des matières de la classe */}
            <Title level={3} style={{ color: "#3498DB" }}>
              Matières de la classe
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
                label="Matière"
                rules={[
                  { required: true, message: "Veuillez entrer une matière" },
                ]}
              >
                <Input
                  placeholder="Ajouter une matière"
                  value={todo}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setTodo(e.target.value);
                  }}
                />
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

            {/* Liste des matières ajoutées */}
            <Title level={4} style={{ color: "#3498DB" }}>
              Liste des matières ajoutées
            </Title>
            <ol>
              {todoList.length ? (
                todoList.map((todo) => {
                  return (
                    <div>
                      <li key={todo.id} style={{ display: "inline" }}>
                        {todo.value}
                      </li>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        style={{ marginLeft: "200px" }}
                      >
                        Suprimer
                      </button>
                    </div>
                  );
                })
              ) : (
                <span>liste vide</span>
              )}
            </ol>
            {/* fin Liste des matières ajoutées */}
            {/* Fin Ajout des matières de la classe */}

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "#001E32",
                borderRadius: "16px",
              }}
            >
              <div style={{ padding: "20px" }}>
                <Card
                  cover={
                    <video
                      width="100%"
                      height="auto"
                      controls
                      style={{ color: "white" }}
                    >
                      <source
                        src={`${process.env.PUBLIC_URL}/images/tuto.mp4`}
                        type="video/mp4"
                      />
                      Votre navigateur ne prend pas en charge la lecture de la
                      vidéo.
                    </video>
                  }
                >
                  <h1>Tutoriel de prise en main</h1>
                  <p>
                    Ce tutoriel est un guide vous donnant les indications sur
                    l'importation des listes d'élèves de chaque classe.
                  </p>
                </Card>
              </div>
            </Content>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "#001E32",
                borderRadius: "16px",
              }}
            >
              <Uploadfiles />
              <br />
            </Content>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "#001E32",
                borderRadius: "16px",
              }}
            >
              <Title level={4} style={{ color: "white", textAlign: "center" }}>
                Envoyer un message groupé à tous les parents d'élèves.
              </Title>
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                  maxWidth: 600,
                }}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["user", "objet"]}
                  label="Objet"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "email"]}
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={["user", "message"]}
                  label="Message"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer votre message !",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Envoyer
                  </Button>
                </Form.Item>
              </Form>
            </Content>

            <Modal
              title={editingKey ? "Modifier un élève" : "Ajouter un élève"}
              visible={modalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                form={form}
                name="addEditForm"
                onFinish={handleSave}
                initialValues={{
                  Matricule: "",
                  Nom: "",
                  Prenom: "",
                  Telephone: "",
                  Adresse: "",
                }}
              >
                <Form.Item
                  name="Matricule"
                  label="Matricule"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir le numéro matricule",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="Nom"
                  label="Nom"
                  rules={[
                    { required: true, message: "Veuillez saisir le nom!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="Prenom"
                  label="Prenom"
                  rules={[
                    { required: true, message: "Veuillez saisir le Prenom!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="Adresse"
                  label="Adresse"
                  rules={[
                    { required: true, message: "Veuillez saisir l'adresse!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="Telephone"
                  label="Numéro de téléphone"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir le numéro de téléphone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {editingKey ? "Modifier" : "Ajouter"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Classe;
