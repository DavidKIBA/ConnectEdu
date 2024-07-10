import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Dashboardmenu from "../components/Dashboardmenu";
import Dashboardsider from "../components/Dashboardsider";
import {
  Breadcrumb,
  Layout,
  Card,
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
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const Eleve = () => {
  const { id } = useParams(); // Obtenir l'id depuis URL
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [subjectsData, setSubjectsData] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [editingKey, setEditingKey] = useState("");

  const token = localStorage.getItem("access");
  const decodedToken = jwtDecode(token);
  const schemaname = decodedToken.schema_name;
  const schema = schemaname.replace("_", "-");

  const api = axios.create({
    baseURL: `http://${schema}.localhost:8000/ecole`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const [subjectsResponse, studentResponse] = await Promise.all([
        api.get(`/note/?eleve=${id}`),
        api.get(`/eleve/${id}`), // recuperer les information perso de l'eleve
      ]);

      setSubjectsData(subjectsResponse.data);
      setStudentInfo(studentResponse.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des matières ou des informations de l'élève :",
        error
      );
    }
  };

  const handleAddSubject = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newData = [...subjectsData];
      if (editingKey) {
        const index = newData.findIndex((item) => item.key === editingKey);
        newData[index] = { ...newData[index], ...values };
        await api.put(`/note/${editingKey}`, values);
        setEditingKey("");
      } else {
        const response = await api.post(`/note/`, { ...values, eleve: id });
        newData.push({ key: response.data.id, ...values });
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

  const handleCancel = () => {
    setEditingKey("");
    setIsModalVisible(false);
  };

  const handleDelete = async (key) => {
    try {
      await api.delete(`/note/${key}`);
      setSubjectsData(subjectsData.filter((item) => item.key !== key));
      message.success("Matière supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de la matière :", error);
      message.error("Échec de la suppression de la matière");
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  const isEditing = (record) => record.key === editingKey;

  const columns = [
    {
      title: "Matière",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Note 1",
      dataIndex: "note1",
      key: "note1",
    },
    {
      title: "Note 2",
      dataIndex: "note2",
      key: "note2",
    },

    {
      title: "Moyenne de classe",
      dataIndex: "moyenne_classe",
      key: "moyenne_classe",
    },
    {
      title: "Examen",
      dataIndex: "examen",
      key: "examen",
    },
    {
      title: "Coefficient",
      dataIndex: "coefficient",
      key: "coefficient",
    },
    {
      title: "Moyenne générale",
      dataIndex: "moyenne_generale",
      key: "moyenne_generale",
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

  // Définitions pour layout, onFinish, validateMessages
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} est requis!",
    types: {
      email: "${label} n'est pas un email valide!",
    },
  };

  const onFinish = (values) => {
    console.log(values);
    message.success("Message envoyé avec succès");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Dashboardmenu />
      <Layout className="site-layout">
        <Sider className="site-layout-background" width={200}>
          <Dashboardsider />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item onClick={() => history.push("/connected")}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => history.push("/list")}>
              Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Title
              level={3}
              style={{
                background: "#001E32",
                textAlign: "center",
                color: "white",
              }}
            >
              {studentInfo.prenom} {studentInfo.nom} -
              {studentInfo.niveau.libelle}
            </Title>

            <Button
              type="primary"
              style={{ marginBottom: 12, width: 100 }}
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
              {studentInfo.nom} {studentInfo.url} -{studentInfo.telephone}
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
            name="subject"
            label="Matière"
            rules={[{ required: true, message: "Veuillez saisir la matière" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="note1" label="Note 1">
            <InputNumber min={0} max={20} />
          </Form.Item>
          <Form.Item name="note2" label="Note 2">
            <InputNumber min={0} max={20} />
          </Form.Item>
          <Form.Item name="moyenne_classe" label="Moyenne de classe">
            <InputNumber min={0} max={20} />
          </Form.Item>
          <Form.Item name="examen" label="Examen">
            <InputNumber min={0} max={20} />
          </Form.Item>
          <Form.Item name="coefficient" label="Coefficient">
            <InputNumber min={1} max={5} />
          </Form.Item>
          <Form.Item name="moyenne_generale" label="Moyenne générale">
            <InputNumber min={0} max={20} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Eleve;
