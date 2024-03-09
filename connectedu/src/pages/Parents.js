import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';
import Dashboardsider from '../components/Dashboardsider';
import Uploadfiles from '../components/Uploadfiles';
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
  Checkbox
} from 'antd';

import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const generateData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i,
      nom: `Dani Juldas`,
      address: ` Thomas Sankara`,
      phoneNumber: `123456789${i}`, // Exemple de numéro de téléphone généré
      email: `user${i}@example.com`, // Exemple d'adresse e-mail générée
    });
  }
  return data;
};

const Parents = () => {
  const history = useHistory();
  const [data, setData] = useState(generateData());
  const [modalVisible, setModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const handleBreadcrumbClick = () => {
    // Logique de redirection
  };

  const handleDelete = key => {
    setData(prevData => prevData.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    message.success('Enregistrement(s) supprimé(s) avec succès');
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

  const onSelectChange = selectedKeys => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Nom et prénom',
      dataIndex: 'name',
    },
   
    {
      title: 'Adresse',
      dataIndex: 'address',
    },
    {
      title: 'Numéro de téléphone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Adresse e-mail',
      dataIndex: 'email',
    },
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
      window.open('http://localhost:3000/parent', '_blank'); // Redirige vers la page '/eleve' lors du clic sur une ligne
    }
  };


  {/* message  */}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-désactiver aucun modèle-curly-in-string*/
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-désactiver aucun modèle-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

{/* fin message */}


  return (
    <Layout style={{ background: '#001E32' }}>
      <Dashboardmenu />
      <Layout style={{ background: '#001E32' }}>
        <Dashboardsider />
        <Layout style={{ padding: '0 24px 24px', backgroundColor: '#001E32', theme: 'dark' }}>
          <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer', color: '#2ECC71' }}>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/connected')}>Home</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Thalès de Millet</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')}><span style={{ color: '#3498DB' }}>Elèves</span></Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '16px',
            }}
          >
            <Title level={3} style={{ color: '#3498DB' }}>Parents d'élèves</Title>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: '16px' }}>Ajouter un élève</Button>
            <Button type="primary" onClick={handleDelete} danger style={{ marginBottom: '16px' }}>Supprimer les éléments sélectionnés</Button>
            <div style={{ overflowX: 'auto' }}>
              <Table
                columns={columns}
                dataSource={data}
                onRow={(record, rowIndex) => ({
                  onClick: event => {
                    handleRowClick(record, event);
                  },
                })}
                rowSelection={{ ...rowSelection, checkStrictly: true }}
                scroll={{ x: true }}
              />
            </div>


            <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#001E32',
                  borderRadius: '16px',
                }}
              >
                {/* Tutoriel */}
                <div style={{ padding: '20px' }}>
                  <Card
                    cover={
                      <video width="100%" height="auto" controls style={{ color: 'white' }}>
                        <source src={`${process.env.PUBLIC_URL}/images/tuto.mp4`} type="video/mp4" />
                        Votre navigateur ne prend pas en charge la lecture de la vidéo.
                      </video>
                    }
                  >
                    {/* Contenu de votre page */}
                    <h1>Tutoriel de prise en main</h1>
                    <p>Ce tutoriel est un guide vous donnant les indications sur l'importation des listes d'élèves de chaque classe.</p>
                  </Card>
                </div>
                {/* Tutoriel */}
              </Content>
              <br></br>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#001E32',
                  borderRadius: '16px',
                }}
              >
                <Uploadfiles />

              <br></br>
            </Content>

            <br></br>
                  {/* fin message */}

              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#001E32',
                  borderRadius: '16px',
                }}
              >

            <Title level={4} style={{color:"white", textAlign:"center"}}>
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
                      name={['user', 'objet']}
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
                      name={['user', 'email']}
                      label="Email"
                      rules={[
                        {
                          type: 'email',
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  
                    <Form.Item 
                      name={['user', 'message']} 
                      label="Message"
                      rules={[
                        {
                          required: true,
                          message: 'Veuillez entrer votre message !', // Ajoutez un message d'erreur
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
                    {/* fin message */}

            


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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingKey ? "Modifier" : "Ajouter"}
              </Button>
            </Form.Item>
            </Form>
            </Modal>


            
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
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {editingKey ? "Modifier" : "Ajouter"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer les enregistrements sélectionnés ?"
              onConfirm={handleDelete}
              okText="Oui"
              cancelText="Non"
            >
              
            </Popconfirm>
            
          </Layout>
        </Layout>
      </Layout>
    );
  };
  
  export default Parents;
  


  
  