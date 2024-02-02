import React from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';
import Dashboardsider from '../components/Dashboardsider';
import Niveauxprescolaire from '../components/Niveauxprescolaire';
import Niveauxprimaire from '../components/Niveauxprimaire';
import Niveauxcollege from '../components/Niveauxcollege';
import Niveauxlycee from '../components/Niveauxlycee';
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



const Espaceeleves = () => {
      
   
      
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
 
  const handleBreadcrumbClick = (route) => {
    history.push(route);
  };

    return (
        <Layout style={{ background: '#001E32' }}>

          <Dashboardmenu/>
         
        <Layout style={{ background: '#001E32' }}>
          <Dashboardsider/>
  
          {/* Corps de la page 1 */}
          
          <Layout style={{ padding: '0 24px 24px', backgroundColor:'#001E32' }}>
            <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer', color:'#2ECC71' }}>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/connected')}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Thalès de Millet</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')} ><font color='#3498DB'>Elèves</font></Breadcrumb.Item>
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
                      title="Elèves"
                      description="2857 Comptes inscrits"
                    />
                  </Card>

                  {/* Fin Eleves */}
           
            </Col>

            <Col>
                
                {/* Membres */}

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
                      title="Parents"
                      description="857 Comptes inscrits"
                    />
                  </Card>

                  {/* Fin Membres*/}
           
            </Col>
  
              </Row>
              </Card>
              
               {/* Fin Statistique eleves */}
               
  
            </Content>
            <br></br>
           {/* fin Corps de la page 1 */}
           <Title level={3} style={{ color: '#3197d7' }}>
              Enregistrez les différentes classes du prescolaire et du primaire
            </Title>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Niveauxprescolaire />
              {/* Ajoutez de l'espace horizontal ici */}
              <div style={{ width: '16px' }}></div>
              <Niveauxprimaire />
            </div>
            <br></br>
            
           {/* Corps de la page 2 */}

           <Title level={3} style={{ color: '#3197d7' }}>
              Enregistrez les différentes classes du Collège et du Lycée
            </Title>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Niveauxcollege />
              {/* Ajoutez de l'espace horizontal ici */}
              <div style={{ width: '16px' }}></div>
              <Niveauxlycee />
            </div>
            <br></br>
           
  
          
  
          </Layout>
          
          
        </Layout>
      </Layout>
    );
};

export default Espaceeleves;