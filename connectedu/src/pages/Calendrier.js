import React, { useState, useEffect } from 'react';
import { Layout, Menu, Tabs, Calendar, Badge, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/Calendrier.css';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { TextArea } = Input;

const Calendrier = () => {
  const [showImage, setShowImage] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCalendars, setShowCalendars] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTab, setSelectedTab] = useState('devoirs');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null); 
  const [classEvents, setClassEvents] = useState({}); // Stocker les événements pour chaque classe
  const [userToken, setUserToken] = useState('');

  const history = useHistory();

  useEffect(() => {
    // Récupérer le JWT depuis le stockage local ou tout autre source
    const token = localStorage.getItem('userToken');
    setUserToken(token);
  }, []);

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleDateSelect = (value) => {
    setSelectedDate(value);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const [selectedType, setSelectedType] = useState('paiement');

  const handleModalSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      setModalVisible(false);
      // Mettre à jour les événements pour la classe sélectionnée
      const events = classEvents[selectedClass] || [];
      const newEvent = {
        date: selectedDate.format('YYYY-MM-DD'),
        event: values.evenement,
        type: selectedType
      };
      setClassEvents({
        ...classEvents,
        [selectedClass]: [...events, newEvent]
      });
    });
  };
  
  // Fonction pour envoyer une requête au serveur avec le JWT dans l'en-tête Authorization
  const fetchData = async () => {
    try {
      const response = await axios.get('https://192.168.1.3:8000/calendrier', {
        headers: {
          Authorization: `Bearer ${userToken}` // Inclure le JWT dans l'en-tête
        }
      });
      setClassEvents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du calendrier :', error);
    }
  };


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

  const getListData = (value) => {
    const classEventData = classEvents[selectedClass] || []; // Récupérer les événements de la classe sélectionnée
    const listData = classEventData.filter(event => event.date === value.format('YYYY-MM-DD'));
    return listData.map(item => ({ type: 'success', content: item.event }));
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
        {listData.map((item, index) => (
          <div key={index} style={{ marginBottom: 5 }}>
            <Badge status={item.type} text={item.content} />
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <Button type="primary" size="small" onClick={() => handleDateSelect(value)}>Planifier</Button>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    window.location.href = 'http://localhost:3000/';
  };

  const handleReturnToDashboard = () => {
    history.push('/dashboard');
  };

  // Appeler fetchData lorsque le composant est monté ou que le token utilisateur change
  useEffect(() => {
    if (userToken) {
      fetchData();
    }
  }, [userToken]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={135} theme="dark" style={{ position: 'fixed', height: '100vh' }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          onClick={(e) => handleMenuClick(e.key, e.item.props.section)}
          style={{ borderRight: 0 }}
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
                 <Form.Item name="type" label="Type d'annonce" initialValue="paiement">
                     <Select onChange={value => setSelectedType(value)} defaultValue="paiement">
                     <Select.Option value="paiement">Paiement</Select.Option>
                     <Select.Option value="examen">Examen</Select.Option>
                     <Select.Option value="examen">Devoir</Select.Option>
                     <Select.Option value="autre">Autre</Select.Option>
                     </Select>
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