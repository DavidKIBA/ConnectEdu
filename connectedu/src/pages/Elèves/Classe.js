import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../../components/Dashboardmenu';
import Dashboardsider from '../../components/Dashboardsider';
import Uploadfiles from '../../components/Uploadfiles';
import { 
  Layout, 
  Breadcrumb, 
  Table,
  Button,
  Row, 
  Card,
  Col, 
  Typography, 
  CardForm, 
  Input, 
  InputNumber,
  Form
 } from 'antd';

import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const columns = [
  {
    title: 'Nom et prénom',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'date',
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
];

const generateData = () => {
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Dani Juldas ${i}`,
      age: 32,
      address: `Lycée Thomas Sankara. ${i}`,
      phoneNumber: `123456789${i}`, // Exemple de numéro de téléphone généré
      email: `user${i}@example.com`, // Exemple d'adresse e-mail générée
    });
  }
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





const Classe = () => {

  const  handleBreadcrumbClick = () =>{

  }
  const history = useHistory();

  const handleRowClick = (record) => {
    window.open("http://localhost:3000/eleve", "_blank") // Rediriger vers une URL spécifique pour chaque enregistrement
  };

  const rowSelection = {
    // Votre logique de sélection de ligne
  };

  const data = generateData();

  return (
    <Layout style={{ background: '#001E32' }}>
      <Dashboardmenu />
      <Layout style={{ background: '#001E32' }}>
        <Dashboardsider />
        <Layout style={{ padding: '0 24px 24px', backgroundColor: '#001E32', theme: 'dark' }}>
          <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer', color: '#2ECC71' }}>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/connected')}>Home</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Thalès de Millet</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')}><font color='#3498DB'>Elèves</font></Breadcrumb.Item>
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
            <Title level={3} style={{ color: '#3498DB' }}>Classes</Title>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <div style={{ overflowX: 'auto' }}>
              <Table
                columns={columns}
                dataSource={data}
                onRow={(record, rowIndex) => ({
                  onClick: () => {
                    handleRowClick(record);
                  },
                })}
                rowSelection={rowSelection}
                scroll={{ x: true }}
              />
            </div>
            <br />
            <br />
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
                    <video width="100%" height="auto" controls style={{color:"white"}}>
                      <source src={`${process.env.PUBLIC_URL}/images/tuto.mp4`} type="video/mp4"/>
                      Votre navigateur ne prend pas en charge la lecture de la vidéo.
                    </video>
                  }
                >
                  {/* Contenu de votre page */}
                  <h1>Tutoriel de prise en main</h1>
                  <p>Ce tutoriel est un guide vous donnant les indications 
                    sur l'importation des listes d'élèves de chaque classe.</p>
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

   {/* fin message */}


            </Content>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Classe;
