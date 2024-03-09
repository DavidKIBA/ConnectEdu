import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';
import Dashboardsider from '../components/Dashboardsider';
import { Layout, Card, Breadcrumb, Table, Button, Row, Col, Typography, Form, Input, Popconfirm, message, Modal, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const generateData = () => {
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `CP ${i}`,
      age: 32,
      address: `Lycée Thomas Sankara. ${i}`,
      phoneNumber: `123456789${i}`,
      email: `user${i}@example.com`,
    });
  }
  return data;
};

const TabCycleCollege = () => {
  const history = useHistory();
  const [data, setData] = useState(generateData());
  const [modalVisible, setModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleBreadcrumbClick = () => {
    // Logique de redirection
  };

  const handleDelete = key => {
    setData(prevData => prevData.filter(item => item.key !== key));
    message.success('Enregistrement supprimé avec succès');
  };

  const handleEdit = record => {
    setEditingKey(record.key);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleAdd = () => {
    setEditingKey('');
    setModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setEditingKey('');
    setModalVisible(false);
  };

  const handleSave = values => {
    const newData = [...data];
    const index = newData.findIndex(item => item.key === editingKey);
    if (index > -1) {
      newData[index] = { ...newData[index], ...values };
      setData(newData);
      setEditingKey('');
      message.success('Enregistrement modifié avec succès');
    } else {
      setData([...data, { ...values, key: data.length }]);
      message.success('Enregistrement ajouté avec succès');
    }
    setModalVisible(false);
  };

  const handleCheckboxChange = key => {
    const newSelectedRowKeys = [...selectedRowKeys];
    if (newSelectedRowKeys.includes(key)) {
      setSelectedRowKeys(newSelectedRowKeys.filter(k => k !== key));
    } else {
      setSelectedRowKeys([...newSelectedRowKeys, key]);
    }
  };

  const handleDeleteSelected = () => {
    setData(prevData => prevData.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    message.success('Enregistrements supprimés avec succès');
  };

  const columns = [
   
    { title: 'Classe', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Adresse', dataIndex: 'address' },
    { title: 'Numéro de téléphone', dataIndex: 'phoneNumber' },
    { title: 'Adresse e-mail', dataIndex: 'email' },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>Modifier</Button>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet enregistrement ?"
            onConfirm={() => handleDelete(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger>Supprimer</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleRowClick = (record, event) => {
    if (!event.target.closest('button')) {
      history.push('/eleve'); // Redirige vers la page '/eleve' lors du clic sur une ligne
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
            <Title level={3}>Classes du primaire</Title>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: '16px' }}>Ajouter un élève</Button>
            <Button type="danger" onClick={handleDeleteSelected} disabled={selectedRowKeys.length === 0} style={{ marginBottom: '16px', marginLeft: '8px' }}>Supprimer les sélectionnés</Button>
            <div style={{ overflowX: 'auto' }}>
              <Table
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
                onRow={(record, rowIndex) => ({
                  onClick: event => handleRowClick(record, event),
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
            name: '',
            age: '',
            address: '',
            phoneNumber: '',
            email: ''
          }}
        >
          <Form.Item
            name="name"
            label="Nom et prénom"
            rules={[{ required: true, message: 'Veuillez saisir le nom et prénom!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Veuillez saisir l\'âge!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Adresse"
            rules={[{ required: true, message: 'Veuillez saisir l\'adresse!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Numéro de téléphone"
            rules={[{ required: true, message: 'Veuillez saisir le numéro de téléphone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Adresse e-mail"
            rules={[{ required: true, message: 'Veuillez saisir l\'adresse e-mail!' }]}
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

export default TabCycleCollege;

