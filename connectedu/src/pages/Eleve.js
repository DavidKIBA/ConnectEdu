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
   Table,
 
  } from 'antd';

  import { Typography } from 'antd';;

  const { Header, Content, Sider } = Layout;
  const { Search } = Input;
  const { Meta } = Card;
  const { TextArea } = Input;
  
  const { Title, Paragraph } = Typography;
  
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

    
        const {
            token: { colorBgContainer, borderRadiusLG },
        } = theme.useToken();

        const history = useHistory();

        
        const handleBreadcrumbClick = (route) => {
            history.push(route);

        }
        const data = generateData();
    
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
         <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <h1>Détails de l'élève</h1>
                <Table columns={columns} dataSource={data} pagination={false} />
                </div>
        </Content>


        </Layout>
        
        </Layout>
     
    </Layout>
  );
};

export default Eleve;