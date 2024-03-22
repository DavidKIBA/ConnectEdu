import React, { useState } from 'react';
import { Layout, Menu, Tabs, Calendar, Badge, Button, Modal, Form, Input, DatePicker } from 'antd';
import { CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { EXAMENS, DEVOIRS } from './Anonces';

import '../css/Calendrier.css';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Définition des types d'événements
const EVENT_TYPES = {
  DEVOIR: 'devoir',
  EXAMEN: 'examen'
};

const Calendrier = () => {
  const [showImage, setShowImage] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCalendars, setShowCalendars] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTab, setSelectedTab] = useState('devoirs');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null); // Ajout de l'état pour stocker la date sélectionnée

  const history = useHistory();

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

  const handleDateSelect = (value) => {
    console.log('Selected Date:', value);
    setSelectedDate(value); // Mettre à jour la date sélectionnée
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      // Ajouter la logique pour sauvegarder les devoirs/examens dans la base de données
      setModalVisible(false);
    });
  };

  const contentStyle = {
    padding: 24,
    margin: 0,
    minHeight: 280,
    background: "#001E32",
    borderRadius: 8,
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div>
        {listData.map((item) => (
          <div key={item.content} style={{ marginBottom: 5 }}>
            <Badge status={item.type} text={item.content} />
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <Button type="primary" size="small" onClick={() => handleDateSelect(value)}>Planifier</Button>
        </div>
      </div>
    );
  };

  // Fonction pour obtenir les données de la liste pour une date donnée
  const getListData = (value) => {
    // Logique pour obtenir les devoirs/examens à partir des variables fixes
    const currentDate = value.date();
    const examensOnDate = EXAMENS.filter(examen => examen.date === currentDate);
    const devoirsOnDate = DEVOIRS.filter(devoir => devoir.date === currentDate);
    
    return [...examensOnDate, ...devoirsOnDate];
  };

  // Logique pour se déconnecter
  const handleLogout = () => {
    // Gérer la déconnexion ici
    window.location.href = 'http://localhost:3000/';
  };

  const handleReturnToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={135} theme="dark" style={{ position: 'fixed', height: '100vh' }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          onClick={(e) => handleMenuClick(e.key, e.item.props.section)}
          style={{
            borderRight: 0,
          }}
        >
          <Menu.Item key="dashboard" icon={<ArrowLeftOutlined />} onClick={handleReturnToDashboard}>
            <span style={{ color: '#FFFFFF' }}>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="1" icon={<CalendarOutlined />} section="Primaire">
            <span style={{ color: '#FFFFFF' }}>Primaire</span>
          </Menu.Item>
          <SubMenu key="sub1" title="Classes" icon={<CalendarOutlined />}>
            <Menu.Item key="cp1" section="Primaire">
              <span style={{ color: '#FFFFFF' }}>CP1</span>
            </Menu.Item>
            <Menu.Item key="cp2" section="Primaire">
              <span style={{ color: '#FFFFFF' }}>CP2</span>
            </Menu.Item>
            <Menu.Item key="ce1" section="Primaire">
              <span style={{ color: '#FFFFFF' }}>CE1</span>
            </Menu.Item>
            <Menu.Item key="ce2" section="Primaire">
              <span style={{ color: '#FFFFFF' }}>CE2</span>
            </Menu.Item>
            <Menu.Item key="cm1" section="Primaire">
              <span style={{ color: '#FFFFFF' }}>CM1</span>
            </Menu.Item>
            <Menu.Item key="cm2" section="Primaire">
              <span style={{ color: '#FFFFFF' }}>CM2</span>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="2" icon={<CalendarOutlined />} section="Collège">
            <span style={{ color: '#FFFFFF' }}>Collège</span>
          </Menu.Item>
          <SubMenu key="sub2" title="Classes" icon={<CalendarOutlined />}>
            <Menu.Item key="6eme" section="Collège">
              <span style={{ color: '#FFFFFF' }}>6ème</span>
            </Menu.Item>
            <Menu.Item key="5eme" section="Collège">
              <span style={{ color: '#FFFFFF' }}>5ème</span>
            </Menu.Item>
            <Menu.Item key="4eme" section="Collège">
            <span style={{ color: '#FFFFFF' }}>4ème</span>
            </Menu.Item>
            <Menu.Item key="3eme" section="Collège">
            <span style={{ color: '#FFFFFF' }}>3ème</span>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="3" icon={<CalendarOutlined />} section="Lycée">
          <span style={{ color: '#FFFFFF' }}>Lycée</span>
          </Menu.Item>
          <SubMenu key="sub3" title="Classes" icon={<CalendarOutlined />}>
            <Menu.Item key="second" section="Lycée">
              <span style={{ color: '#FFFFFF' }}>Second</span>
            </Menu.Item>
            <Menu.Item key="premiere" section="Lycée">
              <span style={{ color: '#FFFFFF' }}>Première</span>
            </Menu.Item>
            <Menu.Item key="terminale" section="Lycée">
              <span style={{ color: '#FFFFFF' }}>Terminale</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 135 }}>
        <Header style={{ background: '#001F3F', textAlign: 'center', padding: 0 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFFFFF' }}>Calendrier</div>
        </Header>
        <Content style={contentStyle}>
          {showImage && selectedSection && (
            <img
              src={process.env.PUBLIC_URL + `/images/${selectedSection.toLowerCase()}.jpg`}
              alt={`Image for ${selectedSection}`}
              style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
            />
          )}
          {showCalendars && (
            <Tabs onChange={handleTabChange} activeKey={selectedTab}>
              <TabPane tab={<span style={{ color: '#FFFFFF' }}>Calendrier ({selectedClass})</span>} key="devoirs">
                <Calendar dateCellRender={dateCellRender} />
                <div>Contenu du calendrier des devoirs pour {selectedClass}</div>
                <Modal
                  title="Planifier un événement"
                  visible={modalVisible}
                  onCancel={handleModalCancel}
                  onOk={handleModalSubmit}
                  destroyOnClose={true}
                >
                  <Form
                    form={form}
                    layout="vertical"
                    name="planification-evenement"
                  >
                    <Form.Item
                      name="date"
                      label="Date"
                      rules={[{ required: true, message: 'Veuillez sélectionner une date!' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      name="evenement"
                      label="Événement"
                      rules={[{ required: true, message: 'Veuillez saisir un événement!' }]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                  </Form>
                </Modal>
              </TabPane>
            </Tabs>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Calendrier;

