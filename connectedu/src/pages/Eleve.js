import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Dashboardmenu from "../components/Dashboardmenu";
import Dashboardsider from "../components/Dashboardsider";
import {
  Breadcrumb,
  Layout,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Table,
  Space,
  Popconfirm,
  message,
  Typography,
  Select,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Header } from "antd/es/layout/layout";

const { Title } = Typography;
const { Content, Sider } = Layout;
const { Option } = Select;

const Eleve = () => {
  const { id } = useParams(); // Récupère l'ID de l'élève depuis les paramètres de l'URL
  const history = useHistory(); // Permet de naviguer entre les routes
  const [isModalVisible, setIsModalVisible] = useState(false); // Gère la visibilité du modal
  const [form] = Form.useForm(); // Formulaire pour ajouter/modifier une matière
  const [subjectsData, setSubjectsData] = useState([]); // Stocke les données des matières
  const [studentInfo, setStudentInfo] = useState({}); // Stocke les informations de l'élève
  const [editingKey, setEditingKey] = useState(""); // Clé de l'élément en cours d'édition
  const [newMatiere, setNewMatiere] = useState({ libelle: "", coeficient: 0 }); // Stocke les nouvelles données de matière

  const token = localStorage.getItem("access"); // Récupère le token JWT stocké dans le localStorage
  const decodedToken = jwtDecode(token); // Décode le token JWT pour obtenir les informations
  const schemaname = decodedToken.schema_name; // Nom du schéma pour l'URL de l'API
  const schema = schemaname.replace("_", "-"); // Remplace "_" par "-" dans le nom du schéma

  const api = axios.create({
    baseURL: `http://${schema}.localhost:8000/ecole/`, // URL de base pour les appels API
    headers: {
      Authorization: `Bearer ${token}`, // Ajoute le token d'authentification dans les headers
    },
  });

  // Effectue les appels API lorsque le composant est monté
  useEffect(() => {
    fetchSubjects(); // Récupère les matières de l'élève
    fetchStudentInfo(); // Récupère les informations de l'élève
  }, []);

  // Fonction pour récupérer les matières de l'élève et ses informations
  const fetchSubjects = async () => {
    try {
      const response = await api.get(`/note/?eleve=${id}`); // Récupère les matières pour cet élève
      setSubjectsData(response.data); // Met à jour les données des matières
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des matières de l'élève :",
        error
      );
    }
  };

  // Fonction pour récupérer les informations de l'élève
  const fetchStudentInfo = async () => {
    try {
      const response = await api.get(`/eleve/${id}`); // Récupère les informations de l'élève
      setStudentInfo(response.data); // Met à jour les informations de l'élève
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'élève :",
        error
      );
    }
  };

  // Fonction pour afficher le modal d'ajout ou de modification
  const handleAddSubject = () => {
    form.resetFields(); // Réinitialise les champs du formulaire
    setIsModalVisible(true); // Affiche le modal
  };

  // Fonction pour gérer la soumission du formulaire
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);

      // Créer la matière si elle n'existe pas déjà
      const matiereResponse = await api.post(`/matiere/`, {
        libelle: values.matieres,
        coeficient: values.coeficient,
        niveau: studentInfo.niveaux.id, // Ajoutez le niveau de l'élève
      });

      const newMatiereId = matiereResponse.data.id;

      const newData = [...subjectsData];

      const dataToSend = {
        matieres: newMatiereId, // Utilisez l'ID de la nouvelle matière
        type_note: values.type_note,
        note: values.note,
        eleve: id, // Ajoutez ici l'ID de l'élève
      };

      if (editingKey) {
        const index = newData.findIndex((item) => item.key === editingKey);
        newData[index] = { ...newData[index], ...dataToSend };
        const response = await api.put(`/note/${editingKey}/`, dataToSend);
        console.log("Update response:", response);
        setEditingKey("");
      } else {
        const response = await api.post(`/note/`, dataToSend);
        console.log("Create response:", response);
        newData.push({ key: response.data.id, ...response.data });
      }

      setSubjectsData(newData);
      setIsModalVisible(false);
      message.success("Matière ajoutée/modifiée avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout/modification de la matière :",
        error
      );
      message.error("Échec de l'ajout/modification de la matière");
    }
  };

  // Fonction pour annuler l'édition ou la création d'une matière
  const handleCancel = () => {
    setEditingKey(""); // Réinitialise la clé d'édition
    setIsModalVisible(false); // Masque le modal
  };

  // Fonction pour supprimer une matière
  const handleDelete = async (key) => {
    try {
      await api.delete(`/note/${key}`); // Effectue la requête DELETE pour supprimer la matière
      setSubjectsData(subjectsData.filter((item) => item.key !== key)); // Met à jour les données des matières
      message.success("Matière supprimée avec succès"); // Affiche un message de succès
    } catch (error) {
      console.error("Erreur lors de la suppression de la matière :", error);
      message.error("Échec de la suppression de la matière"); // Affiche un message d'erreur
    }
  };

  // Fonction pour préparer l'édition d'une matière
  const handleEdit = (record) => {
    form.setFieldsValue(record); // Pré-remplit les champs du formulaire avec les données de l'élément
    setEditingKey(record.key); // Définit la clé d'édition
    setIsModalVisible(true); // Affiche le modal
  };

  // Vérifie si un élément est en cours d'édition
  const isEditing = (record) => record.key === editingKey;

  // Définition des colonnes du tableau
  const columns = [
    {
      title: "Matière",
      dataIndex: "matieres",
      key: "matieres",
      render: (text) =>
        subjectsData.find((subject) => subject.matieres.id === text)?.matieres
          .libelle || "N/A",
    },
    {
      title: "Type de Note",
      dataIndex: "type_note",
      key: "type_note",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button type="primary" onClick={handleOk}>
              Sauvegarder
            </Button>
            <Button type="link" onClick={handleCancel}>
              Annuler
            </Button>
          </Space>
        ) : (
          <Space size="middle">
            <Button type="link" onClick={() => handleEdit(record)}>
              Modifier
            </Button>
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer cette matière ?"
              onConfirm={() => handleDelete(record.key)}
              okText="Oui"
              cancelText="Non"
            >
              <Button type="link">Supprimer</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Dashboardmenu /> {/* Menu de navigation */}
      <Layout className="site-layout">
        <Sider className="site-layout-background" width={200}>
          <Dashboardsider /> {/* Barre latérale */}
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Accueil</Breadcrumb.Item>
            <Breadcrumb.Item>Élève</Breadcrumb.Item>
            <Breadcrumb.Item>Détails</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <Title level={2} style={{ textAlign: "center" }}>
              Infos de l'élève: {studentInfo.prenom} {studentInfo.nom} -{" "}
              {studentInfo.niveaux?.libelle}
            </Title>
            <Button
              type="primary"
              style={{ marginBottom: 12, width: 200 }}
              onClick={handleAddSubject}
            >
              Ajouter une matière
            </Button>
            <Table
              columns={columns}
              dataSource={subjectsData}
              bordered
              scroll={{ x: true }}
              rowClassName="editable-row"
            />
            <Title
              level={3}
              style={{
                background: "#001E32",
                textAlign: "center",
                color: "white",
              }}
            >
              Infos du parent: {studentInfo.parent?.nom}{" "}
              {studentInfo.parent?.prenom} - {studentInfo.parent?.telephone}
            </Title>
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Ajouter/Modifier une matière"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="libelle"
            label="Matière"
            rules={[{ required: true, message: "Veuillez entrer une matière" }]}
          >
            <Input
              placeholder="Entrez la matière ou créez-en une nouvelle"
              onChange={(e) =>
                setNewMatiere((prev) => ({ ...prev, libelle: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item
            name="coeficient"
            label="Coefficient"
            rules={[
              { required: true, message: "Veuillez entrer un coefficient" },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              onChange={(value) =>
                setNewMatiere((prev) => ({ ...prev, coeficient: value }))
              }
            />
          </Form.Item>
          <Form.Item
            name="type_note"
            label="Type de Note"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner le type de note",
              },
            ]}
          >
            <Select>
              <Option value="Devoir_1">Devoir 1</Option>
              <Option value="Devoir_2">Devoir 2</Option>
              <Option value="Examen">Examen</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
            rules={[{ required: true, message: "Veuillez entrer la note" }]}
          >
            <InputNumber min={0} max={20} step={0.1} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Eleve;
