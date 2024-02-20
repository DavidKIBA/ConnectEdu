import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';
import Dashboardsider from '../components/Dashboardsider';
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

   


const Dashboard = () => {

      
      {/* Début images defilantes */}

      const contentStyle = {
        width: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#001E32',
  
      }
    

      {/* Fin images defilantes */}
                                                  

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const history = useHistory();

 
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
          <Dashboardsider/>
         
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
              background: "#001E32",
              borderRadius: borderRadiusLG,
            }}
          >

             {/* Statistique eleves */}
            
             <Card bordered={false}  style={{  backgroundColor:'#001E32' }}>
                    
              <Row gutter={16}  style={{  backgroundColor:'#001E32' }}>
              <Col span={4} style={{  backgroundColor:'#001E32' }}>
                
                  <Statistic
                    title={<span style={{ color: '#3498DB' }}>Primaire</span>}
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
                    format={(percent) => <span style={{ color: '#3498DB' }}>{percent}%</span>}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                
              </Col>

              <Col span={4}>
               
                  <Statistic
                    title={<span style={{ color: '#3498DB' }}>Collège</span>}
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
                    format={(percent) => <span style={{ color: '#3498DB' }}>{percent}%</span>}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                
              </Col>

              <Col span={4}>
                
                <Statistic
                  title={<span style={{ color: '#3498DB' }}>Lycée</span>}
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
                  format={(percent) => <span style={{ color: '#3498DB' }}>{percent}%</span>}
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
                    background:'#001E32',  
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
              background: '#001E32',
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
