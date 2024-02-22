import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../../components/Dashboardmenu';
import Dashboardsider from '../../components/Dashboardsider';
import Uploadfiles from '../../components/Uploadfiles';
import { Layout, Breadcrumb, Table, Row, Col, Typography } from 'antd';
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

const Cp1 = () => {

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
            <Table
              columns={columns}
              dataSource={data}
              onRow={(record, rowIndex) => ({
                onClick: () => {
                  handleRowClick(record);
                },
              })}
              rowSelection={rowSelection}
            />
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
              <Uploadfiles />
            </Content>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Cp1;
