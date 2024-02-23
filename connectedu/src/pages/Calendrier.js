import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout, Menu, Tabs, Calendar, Badge, Button } from 'antd';
import { CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import '../css/Calendrier.css';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

// Définition des types d'événements
const EVENT_TYPES = {
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Messages d'événements
const EVENT_MESSAGES = {
  WARNING: 'Salut.',
  SUCCESS: 'Examen.',
  ERROR: 'Error.'
};

const Calendrier = () => {
  const [showImage, setShowImage] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCalendars, setShowCalendars] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTab, setSelectedTab] = useState('devoirs');
  const [calendarData, setCalendarData] = useState({});

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
          { type: EVENT_TYPES.WARNING, content: EVENT_MESSAGES.WARNING },
          { type: EVENT_TYPES.SUCCESS, content: EVENT_MESSAGES.SUCCESS }
        ];
        break;
      case 10:
        listData = [
          { type: EVENT_TYPES.WARNING, content: EVENT_MESSAGES.WARNING },
          { type: EVENT_TYPES.SUCCESS, content: EVENT_MESSAGES.SUCCESS },
          { type: EVENT_TYPES.ERROR, content: EVENT_MESSAGES.ERROR }
        ];
        break;
      case 15:
        listData = [
          { type: EVENT_TYPES.WARNING, content: EVENT_MESSAGES.WARNING },
          { type: EVENT_TYPES.SUCCESS, content: "evenement pour des examens de fin d'année......" },
          { type: EVENT_TYPES.ERROR, content: 'bonjour chers etudiants ' },
          { type: EVENT_TYPES.ERROR, content: 'devoirs' },
          { type: EVENT_TYPES.ERROR, content: 'math' },
        ];
        break;
      default:
        listData = [];
    }
    return listData;
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

  const history = useHistory();

  const handleReturnToMenu = () => {
    // Utilisez l'objet history pour rediriger vers la page du tableau de bord
    history.push('/dashboard');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={135} theme="light" style={{ position: 'fixed', height: '100vh' }}>
        <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} onClick={(e) => handleMenuClick(e.key, e.item.props.section)}>
          <Menu.Item key="1" icon={<CalendarOutlined />} section="Primaire">
            <span style={{ color: '#001F3F' }}>Primaire</span>
          </Menu.Item>
          <SubMenu key="sub1" title="Classes">
            <Menu.Item key="cp1" section="Primaire"><span style={{ color: '#001F3F' }}>CP1</span></Menu.Item>
            <Menu.Item key="cp2" section="Primaire"><span style={{ color: '#001F3F' }}>CP2</span></Menu.Item>
            <Menu.Item key="ce1" section="Primaire"><span style={{ color: '#001F3F' }}>CE1</span></Menu.Item>
            <Menu.Item key="ce2" section="Primaire"><span style={{ color: '#001F3F' }}>CE2</span></Menu.Item>
            <Menu.Item key="cm1" section="Primaire"><span style={{ color: '#001F3F' }}>CM1</span></Menu.Item>
            <Menu.Item key="cm2" section="Primaire"><span style={{ color: '#001F3F' }}>CM2</span></Menu.Item>
          </SubMenu>

          <Menu.Item key="2" icon={<CalendarOutlined />} section="Collège">
            <span style={{ color: '#001F3F' }}>Collège</span>
          </Menu.Item>
          <SubMenu key="sub2" title="Classes">
            <Menu.Item key="6eme" section="Collège"><span style={{ color: '#001F3F' }}>6ème</span></Menu.Item>
            <Menu.Item key="5eme" section="Collège"><span style={{ color: '#001F3F' }}>5ème</span></Menu.Item>
            <Menu.Item key="4eme" section="Collège"><span style={{ color: '#001F3F' }}>4ème</span></Menu.Item>
            <Menu.Item key="3eme" section="Collège"><span style={{ color: '#001F3F' }}>3ème</span></Menu.Item>
          </SubMenu>

          <Menu.Item key="3" icon={<CalendarOutlined />} section="Lycée">
            <span style={{ color: '#001F3F' }}>Lycée</span>
          </Menu.Item>
          <SubMenu key="sub3" title="Classes">
            <Menu.Item key="second" section="Lycée"><span style={{ color: '#001F3F' }}>Second</span></Menu.Item>
            <Menu.Item key="premiere" section="Lycée"><span style={{ color: '#001F3F' }}>Première</span></Menu.Item>
            <Menu.Item key="terminale" section="Lycée"><span style={{ color: '#001F3F' }}>Terminale</span></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 135 }}>
        <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#001F3F' }}>Calendrier</div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Link to="/dashboard">
            <Button 
              type="primary" 
              icon={<ArrowLeftOutlined />} 
              style={{ 
                marginBottom: '16px', 
                backgroundColor: '#001F3F', // Couleur bleu de nuit
                borderColor: '#001F3F', // Couleur de bordure bleu de nuit
                color: '#FFFFFF' // Couleur du texte (blanc)
              }}
            >
              Retour
            </Button>
          </Link>

          {showImage && selectedSection && (
            <img
              src={process.env.PUBLIC_URL + `/images/${selectedSection.toLowerCase()}.jpg`}
              alt={`Image for ${selectedSection}`}
              style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
            />
          )}
          {showCalendars && (
            <Tabs onChange={handleTabChange} activeKey={selectedTab}>
              <TabPane tab={<span style={{ color: '#001F3F' }}>Calendrier des devoirs ({selectedClass})</span>} key="devoirs">
                <Calendar dateCellRender={dateCellRender} />
                <div>Contenu du calendrier des devoirs pour {selectedClass}</div>
              </TabPane>
              <TabPane tab={<span style={{ color: '#001F3F' }}>Calendrier des examens ({selectedClass})</span>} key="examens">
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