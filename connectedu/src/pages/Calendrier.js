import React, { useState, useEffect } from 'react';
import { Layout, Menu, Tabs, Calendar, Badge, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { CalendarOutlined, ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
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
  const [classEvents, setClassEvents] = useState({});
  const [userToken, setUserToken] = useState('');
  const [schemaName, setSchemaName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const history = useHistory();

  // Récupérer le token et décoder le schema_name
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
      const decodedToken = jwtDecode(token);
      setSchemaName(decodedToken.schema_name);
    }
  }, []);

  // Récupérer les événements depuis la base de données
  useEffect(() => {
    if (userToken && schemaName) {
      fetchData();
    }
  }, [userToken, schemaName]);

  // Fonction pour récupérer les événements
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://192.168.1.3:8000/calendrier?schema_name=${schemaName}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const eventsByClass = response.data.reduce((acc, event) => {
        if (!acc[event.class]) {
          acc[event.class] = [];
        }
        acc[event.class].push(event);
        return acc;
      }, {});
      setClassEvents(eventsByClass);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du calendrier :', error);
    }
  };

  // Gestion des onglets
  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  // Sélection d'une date
  const handleDateSelect = (value) => {
    setSelectedDate(value);
    setModalVisible(true);
    setIsEditing(false);
    form.resetFields();
  };

  // Annuler la modal
  const handleModalCancel = () => {
    setModalVisible(false);
    setIsEditing(false);
    setEditingEvent(null);
    form.resetFields();
  };

  // Soumettre le formulaire (ajout ou modification)
  const handleModalSubmit = () => {
    form.validateFields().then((values) => {
      const eventData = {
        date: selectedDate.format('YYYY-MM-DD'),
        event: values.evenement,
        type: values.type,
        class: selectedClass,
      };

      if (isEditing) {
        // Mettre à jour l'événement existant
        axios.put(`https://192.168.1.3:8000/calendrier/${editingEvent.id}?schema_name=${schemaName}`, eventData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          const updatedEvents = classEvents[selectedClass].map(event =>
            event.id === editingEvent.id ? response.data : event
          );
          setClassEvents({
            ...classEvents,
            [selectedClass]: updatedEvents,
          });
          message.success('Événement mis à jour avec succès');
          setModalVisible(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour de l\'événement :', error);
          message.error('Erreur lors de la mise à jour de l\'événement');
        });
      } else {
        // Ajouter un nouvel événement
        axios.post(`https://192.168.1.3:8000/calendrier?schema_name=${schemaName}`, eventData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          const events = classEvents[selectedClass] || [];
          setClassEvents({
            ...classEvents,
            [selectedClass]: [...events, response.data],
          });
          message.success('Événement ajouté avec succès');
          setModalVisible(false);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de l\'événement :', error);
          message.error('Erreur lors de l\'ajout de l\'événement');
        });
      }
    });
  };

  // Modifier un événement
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setIsEditing(true);
    setModalVisible(true);
    form.setFieldsValue({
      type: event.type,
      evenement: event.event,
    });
  };

  // Supprimer un événement
  const handleDeleteEvent = (eventId) => {
    axios.delete(`https://192.168.1.3:8000/calendrier/${eventId}?schema_name=${schemaName}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(() => {
      const updatedEvents = classEvents[selectedClass].filter(event => event.id !== eventId);
      setClassEvents({
        ...classEvents,
        [selectedClass]: updatedEvents,
      });
      message.success('Événement supprimé avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de l\'événement :', error);
      message.error('Erreur lors de la suppression de l\'événement');
    });
  };

  // Récupérer les événements pour une date donnée
  const getListData = (value) => {
    const classEventData = classEvents[selectedClass] || [];
    const listData = classEventData.filter(event => event.date === value.format('YYYY-MM-DD'));
    return listData;
  };

  // Rendu des cellules du calendrier
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <div>
        {listData.map((item, index) => (
          <div key={index} style={{ marginBottom: 5 }}>
            <Badge status="success" text={item.event} />
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditEvent(item)}
            />
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEvent(item.id)}
            />
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <Button type="primary" size="small" onClick={() => handleDateSelect(value)}>
            Planifier
          </Button>
        </div>
      </div>
    );
  };

  // Retour au tableau de bord
  const handleReturnToDashboard = () => {
    history.push('/dashboard');
  };

  // Gestion du clic sur le menu
  const handleMenuClick = (key, section) => {
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
        <Content style={{ padding: 24, margin: 0, minHeight: 280, background: '#001E32', borderRadius: 8 }}>
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
                <Modal
                  title={isEditing ? 'Modifier un événement' : 'Planifier un événement'}
                  visible={modalVisible}
                  onCancel={handleModalCancel}
                  onOk={handleModalSubmit}
                  destroyOnClose={true}
                >
                  <Form form={form} layout="vertical" name="planification-evenement">
                    <Form.Item name="type" label="Type d'annonce" initialValue="paiement">
                      <Select>
                        <Select.Option value="paiement">Paiement</Select.Option>
                        <Select.Option value="examen">Examen</Select.Option>
                        <Select.Option value="devoir">Devoir</Select.Option>
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
