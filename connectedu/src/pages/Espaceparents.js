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



const Espaceparents = () => {
      
      const handleActivityClick = () => {

      }
      
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
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/')}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Thalès de Millet</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')} ><font color='#3498DB'>Parents</font></Breadcrumb.Item>
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
             <Title level={3} style={{ color: "white" }}>Statistiques des examens</Title>

      <Card bordered={false} style={{ backgroundColor: '#001E32' }}>

        <Row gutter={[16, 16]} style={{ backgroundColor: '#001E32' }}>
          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>

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

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>

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

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>

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

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card
              style={{ width: '100%', height: 210, backgroundColor: '#2ECC71' }}
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
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card
              style={{ width: '100%', height: 210, backgroundColor: '#3197d7' }}
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
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <Card
              style={{ width: '100%', height: 210, backgroundColor: 'white' }}
              cover={
                <div style={{ position: 'relative' }}>
                  <img
                    alt="example"
                    src={process.env.PUBLIC_URL + '/images/lycée.jpg'}
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
                title={<span style={{ color: 'black' }}>Membres</span>}
                description={<span style={{ color: 'black' }}>7 Comptes inscrits</span>}
              />
            </Card>
          </Col>
        </Row>

      </Card>
              
             

          </Content>

         {/* fin Corps de la page 1 */}
   

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




            </Content>
  
            {/* Fin du corps de la page 3*/}
  
          </Layout>
          
          
        </Layout>
      </Layout>
    );
};

export default Espaceparents;