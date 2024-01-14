import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    UserOutlined,
    MessageOutlined,
    SettingOutlined,
    CalendarOutlined,
    FileTextOutlined,
    ReloadOutlined,
    TeamOutlined,
    SearchOutlined,
    ArrowDownOutlined, 
    ArrowUpOutlined,
    EditOutlined, EllipsisOutlined,
  } from '@ant-design/icons';

import {
   Breadcrumb, 
   Layout, 
   Menu, 
   theme, 
   Input, 
   Badge, 
   Dropdown, 
   Avatar,
   Card, 
   Col, 
   Row, 
   Statistic,
   Progress,
  } from 'antd';

  import { Typography } from 'antd';

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;

const { Title, Paragraph } = Typography;

// Noms pour le menu horizontal
// const horizontalMenuItems = ['DASHBOARD', "search" , 'À propos'].map((label, index) => ({
//   key: String(index + 1),
//   label: `${label}`,
// }));

// Noms pour le menu horizontal
const horizontalMenuItems = [
    { key: '1', label: <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>Dashboard</span> },
    { key: '3', icon: <ReloadOutlined /> },
    { key: '3', icon: <SettingOutlined />, label: 'Paramètres' },
    { key: '4', icon: <Badge count={3} overflowCount={99}><MessageOutlined /></Badge>, label: 'Messages' },
    { key: '5', icon: <TeamOutlined />, label: 'Rejoindre la communauté' },
  ];

// Noms pour le menu vertical
const verticalMenuItems = [
  { key: 'sub1', icon: React.createElement(UserOutlined), label: 'Thalès de Millet', options: ['Espaces éleves','Espaces parents', 'Espaces membres'] },
  { key: 'sub2', icon: React.createElement(MessageOutlined), label: 'Messages', options: [5, 6, 7, 8] },
  { key: 'sub3', icon: React.createElement(SettingOutlined), label: 'Parametres', options: [9, 10, 11, 12] },
  { key: 'sub4', icon: React.createElement(CalendarOutlined), label: 'Calendrier', options: [13, 14, 15, 16] },
  { key: 'sub5', icon: React.createElement(FileTextOutlined), label: 'Termes et conditions' }, // Sans sous-menu
];


  

const Dashboard = () => {

   
    const menu = (
        <Menu>
          <Menu.Item key="1">Mon Profil</Menu.Item>
          <Menu.Item key="2">Paramètres</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => handleMenuClick(3)}>Déconnexion</Menu.Item>
        </Menu>
      );
      
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const history = useHistory();

  const handleMenuClick = (key) => {
    history.push(`/page${key}`); // Rediriger vers le composant correspondant en fonction de la clé
  };
  const handleSearch = (value) => {
    // Mettez en œuvre la logique de recherche ici
    console.log('Recherche:', value);
  };

  const handleBreadcrumbClick = (route) => {
    history.push(route);
  };




  return (
    <Layout style={{ background: '#001E32' }}>

      {/* Début du menu horizontal */}

      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={horizontalMenuItems}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => handleMenuClick(key)}
        />

         <Search
          placeholder="Rechercher"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer', marginLeft: '20px' }} />
        </Dropdown>

      </Header>

      {/* Fin du menu horizontal */}

      <Layout >
        <Sider
          theme='dark'
          width={200}
          style={{
          background: '001E32',
          
          }}
        >

          {/* Menu vertical */}

          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
          >
            {verticalMenuItems.map((item) => (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.options &&
                  item.options.map((option) => (
                    <Menu.Item key={option} onClick={() => handleMenuClick(option)}>
                      {`${option}`}
                    </Menu.Item>
                  ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </Sider>

        {/* Corps de la page 1 */}
        
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer' }}>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/home')}>Home</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>List</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')}>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >

             {/* Statistique eleves */}
            
             <Card bordered={false}>
                    <div>
                        <Title level={3}>Statistiques des résultats des élèves</Title>
                        {/* Votre contenu ici */}
                    </div>
              <Row gutter={16}>
              <Col span={4}>
                
                  <Statistic
                    title="Primaire"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                      color: '#3f8600',
                    
                    }}
                    suffix="%"
                  />
                  <Progress
                    type="dashboard"
                    percent={11.28}
                    width={80}
                    format={(percent) => `${percent}%`}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                
              </Col>

              <Col span={4}>
               
                  <Statistic
                    title="Collège"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                      color: '#cf1322',
                    }}
                    suffix="%"
                  />
                  <Progress
                    type="dashboard"
                    percent={9.3}
                    width={80}
                    format={(percent) => `${percent}%`}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                
              </Col>

              <Col span={4}>
                
                <Statistic
                  title="Lycée"
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    color: '#3f8600',
                  }}
                  suffix="%"
                />
                <Progress
                  type="dashboard"
                  percent={11.28}
                  width={80}
                  format={(percent) => `${percent}%`}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              
            </Col>


            <Col>

           
               </Col>

            </Row>
            </Card>
            
             {/* Fin Statistique eleves */}
             

             

          </Content>

         {/* fin Corps de la page 1 */}
   

          <br></br>

         {/* Corps de la page 2 */}

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div>
                <Title level={3}>Actualités de ConnectEdu</Title>
                <Paragraph>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                   Sed do eiusmod tempor incididunt ut labore et dolore magna 
                   aliqua. Ut enim ad minim veniam.
                </Paragraph>
            </div>

          </Content>
       
          {/* Fin du corps de la page 2*/}

           <br></br>

          {/*corps de la page 3*/}
          
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content 3
          </Content>

          {/* Fin du corps de la page 3*/}

        </Layout>
        
        
      </Layout>
    </Layout>
  );
};

export default Dashboard;
