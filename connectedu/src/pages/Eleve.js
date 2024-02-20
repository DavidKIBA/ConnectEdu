// DetailsPage.js

import React from 'react';
import { Layout, Table, Breadcrumb } from 'antd';

const { Content } = Layout;

const columns = [
  {
    title: 'Matière',
    dataIndex: 'subject',
  },
  {
    title: 'Note 1',
    dataIndex: 'note1',
  },
  {
    title: 'Note 2',
    dataIndex: 'note2',
  },
  {
    title: 'Moyenne de classe',
    dataIndex: 'classAverage',
  },
  {
    title: 'Coefficient',
    dataIndex: 'coefficient',
  },
  {
    title: 'Moyenne générale',
    dataIndex: 'overallAverage',
  },
];

const generateData = () => {
  const subjects = ['Anglais', 'Maths', 'Philo', 'Chimie', 'Sport'];
  const data = subjects.map((subject, index) => ({
    key: index,
    subject,
    note1: Math.floor(Math.random() * 20) + 1,
    note2: Math.floor(Math.random() * 20) + 1,
    classAverage: Math.floor(Math.random() * 20) + 1,
    coefficient: Math.floor(Math.random() * 5) + 1,
  }));
  return data;
};

const Eleve = () => {
  const data = generateData();

  return (
    <Layout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <h1>Détails de l'élève</h1>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </Content>
    </Layout>
  );
};

export default Eleve;
