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
   Button,
   Progress,
   Carousel,
 
  } from 'antd';

  import { Typography, Divider} from 'antd';



const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const { TextArea } = Input;

const { Title, Paragraph } = Typography;

{/* carrousel */}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};  

{/* carrousel */}

const Dashboard = () => {

      
                                                  

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const history = useHistory();

 
  const handleBreadcrumbClick = (route) => {
    history.push(route);
  }



    {/* activités récentes */}

    const handleActivityClick = () =>{

    }

    {/* activités récentes */}

  {/* carrousel */}

    const onChange = (currentSlide: number) => {
      console.log(currentSlide);
    };

    {/* fin carrousel */}

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
            

              {/* presentation */}


         <Row gutter={20}>
                    <Col flex="1">
                      
                         
             <div>
            <div style={{ position: 'relative', height: '160px', borderRadius: '5px 5px 5px 5px'}}>
              <img
                alt="presentation"
                src={process.env.PUBLIC_URL + '/images/dashboard.png'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px 5px 5px 5px' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 30, 50, 0.7)', // Couleur de l'overlay
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <h1 style={{ color: '#fff', margin: 0 }}>
                  L'école à portée des mains
                          
                </h1>
              </div>
            </div>
          </div>

          </Col>
          </Row>
           
           <br></br>
             {/* fin presentation */}



             {/* Statistique eleves */}
             <Title level={3} style={{color:"white"}}>Statistiques des examens</Title>

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
                            backgroundColor: 'rgba(0, 30, 50, 0.7)', // Couleur avec opacité
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
                            backgroundColor: 'rgba(0, 30, 50, 0.7)', // Couleur avec opacité
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
   

    

         {/* Corps de la page 2 */}


         {/* Membres */}
         {/* <Content
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
                                backgroundColor: 'rgba(0, 30, 50, 0.7)', // Couleur avec opacité
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
                     
                    </Col>
                  </Row>
                </Content>; */}

              {/* Fin Membres */}

          {/* Fin du corps de la page 2*/}


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





   {/* Activites recentes */}
            

   <div>
      <style>
        {`
          .activity-card .ant-card-cover > img {
            height: 90px; /* Hauteur fixe de l'image */
            object-fit: cover; /* Remplir l'espace de manière proportionnelle */
            margin-bottom: 8px; /* Marge interne en bas */
          }
        `}
      </style>
      <Title level={3} style={{color:"white"}}>Activités récentes</Title>
      <Divider />
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            className="activity-card"
            cover={<img alt="Activité 1" src={process.env.PUBLIC_URL + '/images/primaire.jpg'} />}
            actions={[
              <Button type="primary" onClick={() => handleActivityClick(1)}>Voir l'activité</Button>
            ]}
          >
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            className="activity-card"
            cover={<img alt="Activité 2" src={process.env.PUBLIC_URL + '/images/collège.jpg'} />}
            actions={[
              <Button type="primary" onClick={() => handleActivityClick(2)}>Voir l'activité</Button>
            ]}
          >
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            className="activity-card"
            cover={<img alt="Activité 3" src={process.env.PUBLIC_URL + '/images/lycée.jpg'} />}
            actions={[
              <Button type="primary" onClick={() => handleActivityClick(3)}>Voir l'activité</Button>
            ]}
          >
          </Card>
        </Col>
      </Row>
    </div>

   {/* fin Activites recentes */}
      <br></br>

      <Title level={3} style={{color:"white"}}>Actualités</Title>

      <Carousel afterChange={onChange} autoplay autoplaySpeed={5000}>

          <div>
            <div style={{ position: 'relative', height: '160px', borderRadius: "5px 5px 5px 5px"  }}>
              <img
                alt="carousel 1"
                src={process.env.PUBLIC_URL + '/images/élève.jpg'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "5px 5px 5px 5px"  }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de l'overlay
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: "5px 5px 5px 5px" 
                }}
              >
                <h3 style={{ color: '#fff', margin: 0 }}>
                  Lorem ipsum dolor sit amet, consectetur 
                          adipiscing elit. Sed do eiusmod tempor incididunt 
                          ut labore et dolore magna aliqua. Ut enim ad minim 
                          veniam.
                          
                </h3>
              </div>
            </div>
          </div>
          <div>
            <div style={{ position: 'relative', height: '160px', borderRadius: "5px 5px 5px 5px"  }}>
              <img
                alt="carousel 2"
                src={process.env.PUBLIC_URL + '/images/parent.jpg'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "5px 5px 5px 5px"  }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de l'overlay
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: "5px 5px 5px 5px" 
                }}
              >
                <h3 style={{ color: '#fff', margin: 0 }}>
                  Lorem ipsum dolor sit amet, consectetur 
                          adipiscing elit. Sed do eiusmod tempor incididunt 
                          ut labore et dolore magna aliqua. Ut enim ad minim 
                          veniam.
                          
                </h3>
              </div>
            </div>
          </div>
          <div>
            <div style={{ position: 'relative', height: '160px', borderRadius: "5px 5px 5px 5px"  }}>
              <img
                alt="carousel 3"
                src={process.env.PUBLIC_URL + '/images/lycée.jpg'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "5px 5px 5px 5px"  }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de l'overlay
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: "5px 5px 5px 5px" 
                }}
              >
                <h3 style={{ color: '#fff', margin: 0 }}>
                  Lorem ipsum dolor sit amet, consectetur 
                          adipiscing elit. Sed do eiusmod tempor incididunt 
                          ut labore et dolore magna aliqua. Ut enim ad minim 
                          veniam.
                          
                </h3>
              </div>
            </div>
          </div>
          <div>
          <div style={{ position: 'relative', height: '160px', borderRadius: "5px 5px 5px 5px" }}>
            <img
              alt="carousel 4"
              src={process.env.PUBLIC_URL + '/images/collège.jpg'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "5px 5px 5px 5px" }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de l'overlay
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderRadius: "5px 5px 5px 5px",
              }}
            >
              <h3 style={{ color: '#fff', margin: 0 }}>
                Lorem ipsum dolor sit amet, consectetur 
                          adipiscing elit. Sed do eiusmod tempor incididunt 
                          ut labore et dolore magna aliqua. Ut enim ad minim 
                          veniam.
                          
              </h3>
            </div>
          </div>
        </div>

   </Carousel>

                         </Content>
                             
          {/* Fin du corps de la page 3*/}

 


        </Layout>
        
        </Layout>
     
    </Layout>
  );
};

export default Dashboard;
 