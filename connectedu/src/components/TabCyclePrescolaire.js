import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dashboardmenu from "./Dashboardmenu";
import Dashboardsider from "./Dashboardsider";
import {
  Layout,
  Card,
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
  Checkbox,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const { Content } = Layout;
const { Title } = Typography;

const generateData = () => {
  const data = [];
  return data;
};
const TabCyclePrescolaire = ({ classKey }) => {
  // Récupérer le token JWT du localStorage
  const [infosEcole, setInfosEcole] = useState({});
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

  const [data, setData] = useState(generateData());
  const [classe, setClasse] = useState(null);

  useEffect(() => {
    const storedClass = localStorage.getItem(`classe_${classKey}`);

    if (storedClass) {
      setClasse(JSON.parse(storedClass));
    }
  }, [classKey]);

  // récupération de la liste des parents
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        const decodedToken = jwtDecode(token);
        const schemaname = decodedToken.schema_name;
        const schema = schemaname.replace("_", "-");

        const response = await axios.get(
          `http://${schema}.localhost:8000/ecole/parent/`,
          //`http://${schema}.localhost:8000/ecole/eleve/`,
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
          libelle: item.libelle,
          nom: item.nom,
          email: item.email,
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

  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleBreadcrumbClick = () => {
    // Logique de redirection
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
    message.success("Enregistrement supprimé avec succès");
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

  const handleSave = (values) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === editingKey);
    if (index > -1) {
      newData[index] = { ...newData[index], ...values };
      setData(newData);
      setEditingKey("");
      message.success("Enregistrement modifié avec succès");
    } else {
      setData([...data, { ...values, key: data.length }]);
      message.success("Enregistrement ajouté avec succès");
    }
    setModalVisible(false);
  };

  const handleCheckboxChange = (key) => {
    const newSelectedRowKeys = [...selectedRowKeys];
    if (newSelectedRowKeys.includes(key)) {
      setSelectedRowKeys(newSelectedRowKeys.filter((k) => k !== key));
    } else {
      setSelectedRowKeys([...newSelectedRowKeys, key]);
    }
  };

  const handleDeleteSelected = () => {
    setData((prevData) =>
      prevData.filter((item) => !selectedRowKeys.includes(item.key))
    );
    setSelectedRowKeys([]);
    message.success("Enregistrements supprimés avec succès");
  };

  const columns = [
    { title: "Nom", dataIndex: "nom" },
    { title: "Prenom", dataIndex: "prenom" },
    { title: "Elève", dataIndex: "adresse" },
    { title: "Téléphone", dataIndex: "telephone" },
    { title: "Adresse e-mail", dataIndex: "email" },
    {
      title: "Actions",
      dataIndex: "action",
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
      window.open("http://localhost:3000/parents", "_blank"); // Redirige vers la page '/eleve' lors du clic sur une ligne
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <Layout>
      <Layout>
        <Layout>
          <Content>
            <Title level={3}>Liste des parents d'élèves</Title>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <Button
              type="primary"
              onClick={handleAdd}
              style={{ marginBottom: "16px" }}
            >
              Ajouter un élève
            </Button>
            <Button
              type="danger"
              onClick={handleDeleteSelected}
              disabled={selectedRowKeys.length === 0}
              style={{ marginBottom: "16px", marginLeft: "8px" }}
            >
              Supprimer les sélectionnés
            </Button>
            <div style={{ overflowX: "auto" }}>
              <Table
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
                onRow={(record, rowIndex) => ({
                  onClick: (event) => handleRowClick(record, event),
                })}
                scroll={{ x: true }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
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
            nom: "",
            Prenom: "",
            eleve: "",
            adresse: "",
            telephone: "",
            email: "",
          }}
        >
          <Form.Item
            name="classe"
            label="Classe"
            rules={[{ required: true, message: "Veuillez saisir la classe!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="effectif"
            label="Effectif"
            rules={[{ required: true, message: "Veuillez saisir l'effectif!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="enseignant"
            label="Enseignant"
            rules={[
              { required: true, message: "Veuillez saisir l'enseignant!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
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
          <Form.Item
            name="email"
            label="Adresse e-mail"
            rules={[
              { required: true, message: "Veuillez saisir l'adresse e-mail!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingKey ? "Modifier" : "Ajouter"}
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default TabCyclePrescolaire;
