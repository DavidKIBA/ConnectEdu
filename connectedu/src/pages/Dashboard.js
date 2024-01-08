import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout, Row, Col, Card, Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  SettingOutlined,
  BookOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Partie gauche */}
      <Sider
      width={329}
      theme="dark"
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        position: 'fixed',
        left: 0,
        height: '100%',
      }}
    > 
      <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
      
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {/* Partie 1 : Thalès de Milet */}
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Thalès de Milet
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Espace Utilisateurs">
          <Menu.Item key="2">Espace Élèves</Menu.Item>
          <Menu.Item key="3">Espace Parents</Menu.Item>
          <Menu.Item key="4">Espace Membres</Menu.Item>
        </SubMenu>

        {/* Partie 2 : Messages */}
        <Menu.Item key="5" icon={<MessageOutlined />}>
          Messages
        </Menu.Item>

        {/* Partie 3 : Paramètres */}
        <Menu.Item key="6" icon={<SettingOutlined />}>
          Paramètres
        </Menu.Item>

        {/* Partie 4 : Termes et Conditions */}
        <Menu.Item key="7" icon={<BookOutlined />}>
          Termes et Conditions
        </Menu.Item>

        {/* Partie 5 : Calendrier */}
        <Menu.Item key="8" icon={<CalendarOutlined />}>
          Calendrier
        </Menu.Item>
      </Menu>
    </Sider>

      {/* Partie droite */}
      <Layout className="site-layout" style={{ marginLeft: 329 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          {/* Contenu du tableau de bord */}
          <Row gutter={16}>
          <Col span={8}>
          <Card title="Chrono" bordered={false}>
           Contenu de la section 1
  </Card>
  </Col>
  <Col span={8}>
    <Card title="Section 2" bordered={false}>
      Contenu de la section 2
    </Card>
  </Col>
  <Col span={8}>
    <Card title="Section 3" bordered={false}>
      Contenu de la section 3
    </Card>
  </Col>
</Row>

<div style={{ marginBottom: '30px' }} />

<Row gutter={16}>
  <Col span={16}>
    <Card title="Section 4" bordered={false}>
      Contenu de la section 4
    </Card>
  </Col>
  <Col span={8}>
    <Card title="Section 5" bordered={false}>
      Contenu de la section 5
    </Card>
  </Col>
</Row>

<div style={{ marginBottom: '30px' }} />

<Row gutter={16}>
  <Col span={8}>
    <Card title="Section 6" bordered={false}>
      Contenu de la section 6
    </Card>
  </Col>
  <Col span={8}>
    <Card title="Section 7" bordered={false}>
      Contenu de la section 7
    </Card>
  </Col>
  <Col span={8}>
    <Card title="Section 8" bordered={false} style={{ borderRadius: '10px' }}>
      <p>Contenu de la section 8</p>
    </Card>
  </Col>
</Row>
          

        </Content>
        
      </Layout>
    </Layout>
  );
};

export default Dashboard;
