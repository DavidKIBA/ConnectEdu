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
   Affix,
  } from 'antd';

  import { Typography } from 'antd';



const { Header, Content, Sider } = Layout;
const { Search } = Input;


    // Noms pour le menu horizontal
const horizontalMenuItems = [
  { key: '1', label: <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>Dashboard</span> },
  { key: '3', icon: <ReloadOutlined /> },
  { key: '3', icon: <SettingOutlined />, label: 'Paramètres' },
  { key: '4', icon: <Badge count={3} overflowCount={99}><MessageOutlined /></Badge>, label: 'Messages' },
  { key: '5', icon: <TeamOutlined />, label: 'Rejoindre la communauté' },
];


const Dashboardmenu = () => {

    const menu = (
        <Menu>
          <Menu.Item key="1">Mon Profil</Menu.Item>
          <Menu.Item key="2">Paramètres</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => handleMenuClick1(3)}>Déconnexion</Menu.Item>
        </Menu>
      );

    const handleMenuClick1 = (value) => {
        // Mettez en œuvre la logique de recherche ici
        console.log('Recherche:', value);
      };
    
    
  const handleSearch = (value) => {
    // Mettez en œuvre la logique de recherche ici
    console.log('Recherche:', value);
  };

    return (
        <Affix offsetTop={0}>
        <div>
         {/* Début du menu horizontal */}
  
         <Header style={{ display: 'flex', alignItems: 'center' }}>
         <div className="demo-logo" />
         <Menu
           theme="dark"
           mode="horizontal"
           defaultSelectedKeys={['2']}
           items={horizontalMenuItems}
           style={{ flex: 1, minWidth: 0 }}
           onClick={({ key }) => handleMenuClick1(key)}
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
       </div>
       </Affix>
    );
};

export default Dashboardmenu;