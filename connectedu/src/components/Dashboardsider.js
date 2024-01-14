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



// Noms pour le menu horizontal
// const horizontalMenuItems = ['DASHBOARD', "search" , 'À propos'].map((label, index) => ({
//   key: String(index + 1),
//   label: `${label}`,
// }));

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const { TextArea } = Input;

  

// Noms pour le menu vertical
const verticalMenuItems = [
    { key: 'sub1', icon: React.createElement(UserOutlined), label: 'Thalès de Millet', options: ['Espaces eleves','Espaces parents', 'Espaces membres'] },
    { key: 'sub2', icon: React.createElement(MessageOutlined), label: 'Messages', options: [5, 6, 7, 8] },
    { key: 'sub3', icon: React.createElement(SettingOutlined), label: 'Parametres', options: [9, 10, 11, 12] },
    { key: 'sub4', icon: React.createElement(CalendarOutlined), label: 'Calendrier', options: [13, 14, 15, 16] },
    { key: 'sub5', icon: React.createElement(FileTextOutlined), label: 'Termes et conditions' }, // Sans sous-menu
    ];


const Dashboardsider = () => {

    
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
  };


    return (
        
        <Affix offsetLeft={0}>
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
        </Affix>
    );
};

export default Dashboardsider;