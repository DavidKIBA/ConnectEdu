import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';
import Dashboardsider from '../components/Dashboardsider';
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
    Typography
} from 'antd';

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const generateData = () => {
    const subjects = ['Anglais', 'Maths', 'Philo', 'Chimie', 'Sport'];
    const data = subjects.map((subject, index) => ({
        key: index + 1,
        subject,
        note1: Math.floor(Math.random() * 20) + 1,
        note2: Math.floor(Math.random() * 20) + 1,
        classAverage: Math.floor(Math.random() * 20) + 1,
        coefficient: Math.floor(Math.random() * 5) + 1,
        overallAverage: (Math.floor(Math.random() * 20) + 1 + Math.floor(Math.random() * 20) + 1) / 2 // Moyenne générale
    }));
    return data;
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

const Eleve = () => {
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [subjectsData, setSubjectsData] = useState(generateData());
    const [editingKey, setEditingKey] = useState('');

    const handleBreadcrumbClick = (route) => {
        history.push(route);
    }

    const handleAddSubject = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            const newData = [...subjectsData];
            if (editingKey) {
                const index = newData.findIndex(item => item.key === editingKey);
                newData[index] = { ...newData[index], ...values };
                setEditingKey('');
            } else {
                newData.push({
                    key: newData.length + 1,
                    ...values
                });
            }
            setSubjectsData(newData);
            setIsModalVisible(false);
            message.success('Matière ajoutée/modifiée avec succès');
        });
    };

    const handleCancel = () => {
        setEditingKey('');
        setIsModalVisible(false);
    };

    const handleDelete = (key) => {
        setSubjectsData(subjectsData.filter(item => item.key !== key));
        message.success('Matière supprimée avec succès');
    }

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingKey(record.key);
        setIsModalVisible(true);
    };

    const isEditing = (record) => record.key === editingKey;

    const columns = [
        {
            title: 'Matière',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Note 1',
            dataIndex: 'note1',
            key: 'note1',
        },
        {
            title: 'Note 2',
            dataIndex: 'note2',
            key: 'note2',
        },
        {
            title: 'Moyenne de classe',
            dataIndex: 'classAverage',
            key: 'classAverage',
        },
        {
            title: 'Coefficient',
            dataIndex: 'coefficient',
            key: 'coefficient',
        },
        {
            title: 'Moyenne générale',
            dataIndex: 'overallAverage',
            key: 'overallAverage',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle">
                        <Button type="primary" onClick={handleOk}>Sauvegarder</Button>
                        <Button type="link" onClick={handleCancel}>Annuler</Button>
                    </Space>
                ) : (
                    <Space size="middle">
                        <Button type="link" onClick={() => handleEdit(record)}>Modifier</Button>
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
        <Layout style={{ minHeight: '100vh' }}>
            <Dashboardmenu />
            <Layout className="site-layout">
                <Sider className="site-layout-background" width={200}>
                    <Dashboardsider />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/connected')}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content style={{ padding: '0 24px', minHeight: 280 }}>

                    <Title level={3} style={{ background: '#001E32', textAlign:"center", color:"white"}}>Minaje OKO</Title>

                        <Button type="primary" style={{ marginBottom: 12, whidth:100 }} onClick={handleAddSubject}>
                            Ajouter une matière
                        </Button>
                        <Table
                            columns={columns}
                            dataSource={subjectsData}
                            bordered
                            scroll={{ x: true }}
                            rowClassName="editable-row"
                        />
                    </Content>


                     {/* Tutoriel */}

                     <Content
               style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: '#001E32',
                borderRadius: '16px',
              }}
            >
              <div style={{ padding: '20px' }}>
                <Card
                  cover={
                    <video width="100%" height="auto" controls style={{color:"white"}}>
                      <source src={`${process.env.PUBLIC_URL}/images/tuto.mp4`} type="video/mp4"/>
                      Votre navigateur ne prend pas en charge la lecture de la vidéo.
                    </video>
                  }
                >
                  {/* Contenu de votre page */}
                  <h1>Tutoriel de prise en main</h1>
                  <p>Ce tutoriel est un guide vous donnant les indications 
                    sur le renseignement des champs du bulletun de l'élève. </p>
                </Card>
              </div>
              {/* Tutoriel */}
              </Content>
              
              <br></br><br></br>

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
            Envoyer un message au parent de l'élève.
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

              {/* fin message */}


            </Content>
                </Layout>
                 

                
            </Layout>
            <Modal title="Ajouter/Modifier une matière" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="subject" label="Matière" rules={[{ required: true, message: 'Veuillez saisir la matière' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="note1" label="Note 1">
                        <InputNumber min={0} max={20} />
                    </Form.Item>
                    <Form.Item name="note2" label="Note 2">
                        <InputNumber min={0} max={20} />
                    </Form.Item>
                    <Form.Item name="classAverage" label="Moyenne de classe">
                        <InputNumber min={0} max={20} />
                    </Form.Item>
                    <Form.Item name="coefficient" label="Coefficient">
                        <InputNumber min={1} max={5} />
                    </Form.Item>
                    <Form.Item name="overallAverage" label="Moyenne générale">
                        <InputNumber min={0} max={20} />
                    </Form.Item>
                </Form>
            </Modal>

            
              
            


        </Layout>
    );
};

export default Eleve;
