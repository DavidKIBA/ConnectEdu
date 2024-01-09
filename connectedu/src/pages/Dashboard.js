import React from 'react';
import { Layout, Row, Col, Card, Menu, Button, Input, Badge, Tooltip, Avatar } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  BookOutlined,
  CalendarOutlined,
  ReloadOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Partie gauche */}
      <Sider
        width={329}
        
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
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()} />
            </Col>
            <Col flex="auto">
              <Input placeholder="Rechercher..." prefix={<SearchOutlined />} />
            </Col>
            <Col>
              <Button icon={<PlusCircleOutlined />} type="primary">
                Inviter
              </Button>
            </Col>
            <Col>
              <Button icon={<TeamOutlined />} />
            </Col>
            <Col>
              <Badge dot>
                <MessageOutlined />
              </Badge>
            </Col>
            <Col>
              <SettingOutlined />
            </Col>
            <Col>
              <Tooltip title="Notifications">
                <Badge count={5} overflowCount={10} offset={[-10, 10]}>
                  <MessageOutlined />
                </Badge>
              </Tooltip>
            </Col>
            <Col>
              <QuestionCircleOutlined />
            </Col>
            <Col>
              <Avatar icon={<EllipsisOutlined />} />
            </Col>
          </Row>
        </Header>

        <div style={{ marginBottom: '30px' }} />
        {/* Contenu du tableau de bord */}
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Chrono" bordered={false}>
            <p>Contenu de la section 1</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Section 2" bordered={false}>
            <p>Contenu de la section 2</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Section 3" bordered={false}>
            <p>Contenu de la section 3</p>
            </Card>
          </Col>
        </Row>

        <div style={{ marginBottom: '30px' }} />

        <Row gutter={16}>
          <Col span={16}>
            <Card title="Section 4" bordered={false}>
            <p>Contenu de la section 4</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Section 5" bordered={false}>
            <p>Contenu de la section 5</p>
            </Card>
          </Col>
        </Row>

        <div style={{ marginBottom: '30px' }} />

        <Row gutter={16}>
          <Col span={8}>
            <Card title="Section 6" bordered={false}>
            <p>Contenu de la section 6</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Section 7" bordered={false}>
            <p>Contenu de la section 7</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Section 8" bordered={false}>
              <p>Contenu de la section 8</p>
            </Card>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

