import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Badge } from 'antd';
import { UserOutlined, MessageOutlined, SettingOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { Affix } from 'antd';

const { Sider } = Layout;

const calendarIcone = () => {
  window.open("http://localhost:3000/calendrier", "_blank");
};

const messageIcone = () => {

  window.open("http://localhost:3000/MessagePage", "_blank");
};


const settingsIcone = () => {
  // Ajoutez votre logique pour le clic sur le bouton "Paramètres"
};


const Dashboardsider = () => {
 
  const terms = useHistory();

  const termsIcone = () =>{
    terms.push("/terms")
  };

  const history = useHistory();

  const handleMenuClick = (label) => {
    switch (label) {
      case 'Espaces eleves':
        history.push('/espaceeleves');
        break;
      case 'Espaces parents':
        history.push('/espaceparents');
        break;
      case 'Espaces membres':
        history.push('/espacemembres');
        break;
      // Gérez les autres cas si nécessaire
      default:
        break;
    }
  };

  const verticalMenuItems = [
    { key: 'sub1', icon: React.createElement(UserOutlined), label: 'Thalès de Millet', options: ['Espaces eleves', 'Espaces parents', 'Espaces membres'] },
    { key: '2', icon: <Badge><MessageOutlined /></Badge>, label: 'Messages', onClick: messageIcone },
    { key: '3', icon: React.createElement(CalendarOutlined), label: 'Calendrier', onClick: calendarIcone },
    { key: '4', icon: React.createElement(FileTextOutlined), label: 'Termes et conditions', onClick: termsIcone },
    { key: '5', icon: React.createElement(SettingOutlined), label: 'Paramètres', onClick: settingsIcone },
  ];
  

  return (
    <Affix offsetLeft={0}>
      <Sider
        theme='dark'
        width={200}
        style={{
          background: '#001E32',
        }}
      >
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
            <React.Fragment key={item.key}>
              {item.options ? (
                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.options.map((option) => (
                    <Menu.Item key={option} onClick={() => handleMenuClick(option)}>
                      {`${option}`}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={item.key} icon={item.icon} onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    handleMenuClick(item.label);
                  }
                }}>
                  {item.label}
                </Menu.Item>
              )}
            </React.Fragment>
          ))}
        </Menu>
      </Sider>
    </Affix>
  );
};

export default Dashboardsider;
