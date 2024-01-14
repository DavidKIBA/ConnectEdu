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
   Carousel,
  } from 'antd';

  import { Typography } from 'antd';


// Noms pour le menu horizontal
// const horizontalMenuItems = ['DASHBOARD', "search" , 'À propos'].map((label, index) => ({
//   key: String(index + 1),
//   label: `${label}`,
// }));

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const { TextArea } = Input;

const { Title, Paragraph } = Typography;

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
{ key: 'sub1', icon: React.createElement(UserOutlined), label: 'Thalès de Millet', options: ['Espaces eleves','Espaces parents', 'Espaces membres'] },
{ key: 'sub2', icon: React.createElement(MessageOutlined), label: 'Messages', options: [5, 6, 7, 8] },
{ key: 'sub3', icon: React.createElement(SettingOutlined), label: 'Parametres', options: [9, 10, 11, 12] },
{ key: 'sub4', icon: React.createElement(CalendarOutlined), label: 'Calendrier', options: [13, 14, 15, 16] },
{ key: 'sub5', icon: React.createElement(FileTextOutlined), label: 'Termes et conditions' }, // Sans sous-menu
];


const Espaceeleves = () => {
      
    const menu = (
        <Menu>
          <Menu.Item key="1">Mon Profil</Menu.Item>
          <Menu.Item key="2">Paramètres</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => handleMenuClick(3)}>Déconnexion</Menu.Item>
        </Menu>
      );
      
      {/* Début images defilantes */}

      const contentStyle = {
        height: '160px',
        position: 'relative',
      };
    
      const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 128, 0.5)', // Couleur bleu foncé avec opacité
      };
    

      {/* Fin images defilantes */}
                                                  

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const history = useHistory();

  
  const handleMenuClick = (key) => {
    // Ajoutez la logique de redirection ici en fonction de la clé
    switch (key) {
      case 'Espaces eleves':
        history.push('/espaceeleves');
        break;
      case 'Espaces parents':
        history.push('/espaceparents');
        break;
      case 'Espaces membres':
        history.push('/espacemembres');
        break;
      default:
        break;
    }
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
            background: '#001E32',
            
            }}
          >
  
            {/* Menu vertical */}
  
            <Menu
              theme="dark"
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
          
          <Layout style={{ padding: '0 24px 24px', backgroundColor:'#001E32' }}>
            <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer', color:'#2ECC71' }}>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/')}>Home</Breadcrumb.Item>
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
                      <TextArea
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        value="Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam.
                        
                        Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam.
                        
                        Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam."
                      />
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
              <div>
                  <Title level={3}>Activités récentes</Title>
                          {/* Votre contenu ici */}
                          <div style={{ display: 'flex' }}>
                              <div style={{ flex: 1, marginRight: 16 }}>
                                <Card>
                                  <Title level={3}>Div 1</Title>
                                  <Paragraph>
                                    Contenu de la première div avec du code Ant Design.
                                  </Paragraph>
                                </Card>
                              </div>
                              <div style={{ flex: 1, marginRight: 16 }}>
                                <Card>
                                  <Title level={3}>Div 2</Title>
                                  <Paragraph>
                                    Contenu de la deuxième div avec du code Ant Design.
                                  </Paragraph>
                                </Card>
                              </div>
                              <div style={{ flex: 1 }}>
                                <Card>
                                  {/* <Title level={3}>Div 3</Title> */}
                                  <Carousel autoplay>
                                    <div style={{ ...contentStyle, backgroundImage: 'url("/images/fondconnexion.png")' }}>
                                      <div style={overlayStyle}></div>
                                      <h3 style={{ ...overlayStyle, color: '#fff', textAlign: 'center', zIndex: 1 }}>1</h3>
                                    </div>
                                   
                                    {/* Ajoutez des éléments similaires pour les autres slides */}
                                  </Carousel>
                                </Card>
                              </div>
                            </div>
              </div>
            </Content>
  
            {/* Fin du corps de la page 3*/}
  
          </Layout>
          
          
        </Layout>
      </Layout>
    );
};

export default Espaceeleves;