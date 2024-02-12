
import React, { useState } from 'react';
import { Layout, Menu, Tabs, Calendar, Badge } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import '../css/Calendrier.css';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

const Calendrier = () => {
  const [showImage, setShowImage] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCalendars, setShowCalendars] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTab, setSelectedTab] = useState('devoirs');

  const handleMenuClick = (key, section) => {
    console.log('Selected Menu:', key);

    if (key === '1' || key === '2' || key === '3') {
      setShowImage(true);
      setShowCalendars(false);
      setSelectedSection(section);
    } else {
      setShowImage(false);
      setShowCalendars(true);
      setSelectedClass(key);
    }
  };

  const handleTabChange = (key) => {
    console.log('Selected Tab:', key);
    setSelectedTab(key);
  };

  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'Événement d\'avertissement.' },
          { type: 'success', content: 'Événement habituel.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'Événement d\'avertissement.' },
          { type: 'success', content: 'Événement habituel.' },
          { type: 'error', content: 'Événement d\'erreur.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'Événement d\'avertissement' },
          { type: 'success', content: 'Événement habituel très long......' },
          { type: 'error', content: 'Événement d\'erreur 1.' },
          { type: 'error', content: 'Événement d\'erreur 2.' },
          { type: 'error', content: 'Événement d\'erreur 3.' },
          { type: 'error', content: 'Événement d\'erreur 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={135} theme="light">
      <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} onClick={(e) => handleMenuClick(e.key, e.item.props.section)}>
          <Menu.Item key="1" icon={<CalendarOutlined />} section="Primaire">
            Primaire
          </Menu.Item>
          <SubMenu key="sub1" title="Classes">
            <Menu.Item key="cp1" section="Primaire">CP1</Menu.Item>
            <Menu.Item key="cp2" section="Primaire">CP2</Menu.Item>
            <Menu.Item key="ce1" section="Primaire">CE1</Menu.Item>
            <Menu.Item key="ce2" section="Primaire">CE2</Menu.Item>
            <Menu.Item key="cm1" section="Primaire">CM1</Menu.Item>
            <Menu.Item key="cm2" section="Primaire">CM2</Menu.Item>
          </SubMenu>

          <Menu.Item key="2" icon={<CalendarOutlined />} section="Collège">
            Collège
          </Menu.Item>
          <SubMenu key="sub2" title="Classes">
            <Menu.Item key="6eme" section="Collège">6ème</Menu.Item>
            <Menu.Item key="5eme" section="Collège">5ème</Menu.Item>
            <Menu.Item key="4eme" section="Collège">4ème</Menu.Item>
            <Menu.Item key="3eme" section="Collège">3ème</Menu.Item>
          </SubMenu>

          <Menu.Item key="3" icon={<CalendarOutlined />} section="Lycée">
            Lycée
          </Menu.Item>
          <SubMenu key="sub3" title="Classes">
            <Menu.Item key="second" section="Lycée">Second</Menu.Item>
            <Menu.Item key="premiere" section="Lycée">Première</Menu.Item>
            <Menu.Item key="terminale" section="Lycée">Terminale</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
      <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Calendrier</div>
        </Header>
        <Content style={{ margin: '16px' }}>
          {showImage && selectedSection && (
            <img
              src={process.env.PUBLIC_URL + `/images/${selectedSection.toLowerCase()}.jpg`}
              alt={`Image for ${selectedSection}`}
              style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
            />
          )}
        {showCalendars && (
          <Tabs onChange={handleTabChange} activeKey={selectedTab}>
            <TabPane tab={`Calendrier des devoirs (${selectedClass})`} key="devoirs">
              <Calendar dateCellRender={dateCellRender} />
              <div>Contenu du calendrier des devoirs pour {selectedClass}</div>
            </TabPane>
            <TabPane tab={`Calendrier des examens (${selectedClass})`} key="examens">
              <Calendar dateCellRender={dateCellRender} />
              <div>Contenu du calendrier des examens pour {selectedClass}</div>
            </TabPane>
          </Tabs>
        )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Calendrier;