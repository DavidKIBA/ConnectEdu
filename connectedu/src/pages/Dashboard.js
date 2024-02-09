import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';

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

   

// Noms pour le menu vertical
const verticalMenuItems = [
{ key: 'sub1', icon: React.createElement(UserOutlined), label: 'Thalès de Millet', options: ['Espaces eleves','Espaces parents', 'Espaces membres'] },
{ key: 'sub2', icon: React.createElement(MessageOutlined), label: 'Messages', options: [5, 6, 7, 8] },
{ key: 'sub3', icon: React.createElement(SettingOutlined), label: 'Parametres', options: [9, 10, 11, 12] },
{ key: 'sub4', icon: React.createElement(CalendarOutlined), label: 'Calendrier', options: [13, 14, 15, 16] },
{ key: 'sub5', icon: React.createElement(FileTextOutlined), label: 'Termes et conditions' }, // Sans sous-menu
];


  

const Dashboard = () => {

      
      {/* Début images defilantes */}

      const contentStyle = {
        width: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
  
      }
    

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
 
  const handleBreadcrumbClick = (route) => {
    history.push(route);
  }

  return (
    <Layout style={{ background: '#001E32' }}>

      <Dashboardmenu/>

      <Layout>
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
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/connected')}>Home</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}><font color='#2498DB'>Dashboard</font></Breadcrumb.Item>
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
            
             <Card bordered={false} >
                    
              <Row gutter={16}>
              <Col span={4} style={{  backgroundColor:'white' }}>
                
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
                
                {/* Eleves */}
                    
                <Card
                    style={{ width: 190 , height:210, backgroundColor:'#2ECC71',}}
                    cover={
                      <div style={{ position: 'relative' }}>
                        <img
                          alt="example"
                          src={process.env.PUBLIC_URL + '/images/élève.jpg'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(46, 204, 113, 0.5)', // Couleur avec opacité
                            borderRadius: '5px 5px 0 0',
                          }}
                        />
                      </div>
                    }
                  >
                    <Meta
                      title={<span style={{ color: '#fff' }}>Elèves</span>}
                      description={<span style={{ color: '#fff' }}>2857 Comptes inscrits</span>}
                    />
                  </Card>

                  {/* Fin Eleves */}
           
            </Col>

            <Col>
                
                {/* Parents */}

                <Card
                    style={{ width: 190 , height:210, backgroundColor:'#3197d7',}}
                    cover={
                      <div style={{ position: 'relative' }}>
                        <img
                          alt="example"
                          src={process.env.PUBLIC_URL + '/images/parent.jpg'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(46, 204, 113, 0.5)', // Couleur avec opacité
                            borderRadius: '5px 5px 0 0',
                          }}
                        />
                      </div>
                    }
                  >
                    <Meta
                      title={<span style={{ color: '#fff' }}>Parents</span>}
                      description={<span style={{ color: '#fff' }}>857 Comptes inscrits</span>}
                    />
                  </Card>

                  {/* Fin Parents */}
           
            </Col>
            
                        {/* <Title level={3} style={{ color:'#3197d7'}}>Statistiques des résultats des élèves</Title> */}
        
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
                  <Row gutter={20}>
                    <Col flex="1">
                      <Title level={3}  style={{ color:'#3197d7'}}>Actualités de ConnectEdu</Title>
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
                    </Col>
                    <Col flex="1">
                      {/* Membres */}
                      <Card
                        style={{ width: 190, height: 210,  }}
                        cover={
                          <div style={{ position: 'relative' }}>
                            <img
                              alt="example"
                              src={process.env.PUBLIC_URL + '/images/parent.jpg'}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(46, 204, 113, 0.5)', // Couleur avec opacité
                                borderRadius: '5px 5px 0 0',
                              }}
                            />
                          </div>
                        }
                      >
                        <Meta title="Membres"
                        description="8 Comptes ajoutés" 
                        />
                      </Card>
                      {/* Fin Membres */}
                    </Col>
                  </Row>
                </Content>;

       
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
                                
                              </Card>
                            </div>
                          </div>
            </div>
                         </Content>
                              <Carousel autoplay style={{width:'190'}}>
                                  <div>
                                    <h3 style={contentStyle}>1</h3>
                                  </div>
                                  <div>
                                    <h3 style={contentStyle}>2</h3>
                                  </div>
                                  <div>
                                    <h3 style={contentStyle}>3</h3>
                                  </div>
                                  <div>
                                    <h3 style={contentStyle}>4</h3>
                                  </div>
                                </Carousel>
          {/* Fin du corps de la page 3*/}

        </Layout>
        
        
      </Layout>
    </Layout>
  );
};

export default Dashboard;
