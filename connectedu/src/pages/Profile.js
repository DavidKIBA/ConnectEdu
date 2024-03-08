import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Button, Modal, Upload, message, Form, Input, Select } from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined, 
  LogoutOutlined,
  MessageOutlined,
  BellOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  LockOutlined,
  FormOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const Profile = () => {
  // États pour gérer l'affichage des différentes sections et le formulaire d'ajout de compte invité
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [showDiscussionsInfo, setShowDiscussionsInfo] = useState(false);
  const [showNotificationInfo, setShowNotificationInfo] = useState(false);
  const [showStorageInfo, setShowStorageInfo] = useState(false);
  const [showInviteInfo, setShowInviteInfo] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false); // État pour afficher/masquer le modal d'ajout de compte invité

  // Logique pour afficher/masquer le modal d'ajout de compte invité
  const toggleAddGuestModal = () => {
    setShowAddGuestModal(!showAddGuestModal);
  };

  // Logique pour gérer l'ajout de comptes invités
  const handleAddGuest = (values) => {
    // Effectuez ici la logique pour ajouter un compte invité
    console.log('Nouveau compte invité : ', values);
    message.success('Compte invité ajouté avec succès !');
    toggleAddGuestModal(); // Fermez le modal après l'ajout
  };

  // Gestion des clics sur les différents boutons du menu
  const handleAccountClick = () => {
    setShowAccountInfo(!showAccountInfo);
    hideOtherSections('account');
  };

  const handlePrivacyClick = () => {
    setShowPrivacyInfo(!showPrivacyInfo);
    hideOtherSections('privacy');
  };

  const handleAvatarClick = () => {
    setShowAvatarOptions(true);
    hideOtherSections('avatar');
  };

  const handleDiscussionsClick = () => {
    setShowDiscussionsInfo(!showDiscussionsInfo);
    hideOtherSections('discussions');
  };

  const handleNotificationClick = () => {
    setShowNotificationInfo(!showNotificationInfo);
    hideOtherSections('notification');
  };

  const handleStorageClick = () => {
    setShowStorageInfo(!showStorageInfo);
    hideOtherSections('storage');
  };

  const handleInviteClick = () => {
    setShowInviteInfo(!showInviteInfo);
    hideOtherSections('invite');
  };

  const uploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const { Option } = Select;

  // Logique pour masquer les autres sections lorsqu'une section est ouverte
  const hideOtherSections = (currentSection) => {
    const sections = [
      'account',
      'privacy',
      'avatar',
      'discussions',
      'notification',
      'storage',
      'invite'
    ];

    sections.forEach((section) => {
      if (section !== currentSection) {
        setShowState(section, false);
      }
    });
  };

  // Fonction utilitaire pour modifier l'état en fonction de la section
  const setShowState = (section, value) => {
    switch (section) {
      case 'account':
        setShowAccountInfo(value);
        break;
      case 'privacy':
        setShowPrivacyInfo(value);
        break;
      case 'avatar':
        setShowAvatarOptions(value);
        break;
      case 'discussions':
        setShowDiscussionsInfo(value);
        break;
      case 'notification':
        setShowNotificationInfo(value);
        break;
      case 'storage':
        setShowStorageInfo(value);
        break;
      case 'invite':
        setShowInviteInfo(value);
        break;
      default:
        break;
    }
  };

  // Logique pour se déconnecter
  const handleLogout = () => {
    // Gérer la déconnexion ici
    window.location.href = 'http://localhost:3000/';
  };

  // Logique pour annuler l'ajout de compte invité
  const handleAddGuestCancel = () => {
    setShowAddGuestModal(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />} onClick={handleAccountClick}>
            Compte
          </Menu.Item>
          <Menu.Item key="4" icon={<LockOutlined />} onClick={handlePrivacyClick}>
            Confidentialité
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />} onClick={handleAvatarClick}>
            Avatar
          </Menu.Item>
          <Menu.Item key="6" icon={<MessageOutlined />} onClick={handleDiscussionsClick}>
            Discussions
          </Menu.Item>
          <Menu.Item key="7" icon={<BellOutlined />} onClick={handleNotificationClick}>
            Notification
          </Menu.Item>
          <Menu.Item key="8" icon={<DatabaseOutlined />} onClick={handleStorageClick}>
            Stockage et Données
          </Menu.Item>
          <Menu.Item key="9" icon={<GlobalOutlined />} onClick={handleInviteClick}>
            Invité
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Menu mode="horizontal" theme="dark" style={{ float: 'right' }}>
            <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: '#87CEEB' }}>
              Déconnexion
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '16px', textAlign: 'center' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {showAccountInfo && (
              <div>
                <Avatar size={190} icon={<UserOutlined />} />
                <Title level={16}>John Doe</Title>
                <Paragraph>Email: john.doe@example.com</Paragraph>
                <Paragraph>Téléphone: +1 123 456 7890</Paragraph>
                <Paragraph>Ville de Résidence: Paris</Paragraph>
                <Paragraph>Adresse: 123 Rue de la République</Paragraph>
                <Paragraph>Pièce d'Identité: Carte d'identité</Paragraph>
                <Paragraph>Mot de Passe: *********</Paragraph>
              </div>
            )}

            {showPrivacyInfo && (
              <div>
                <LockOutlined size={190} icon={<LockOutlined />} />
                <Title level={16}>Paramètres de Confidentialité</Title>
                <Paragraph>Confidentialité</Paragraph>
                <Paragraph>Paramètres de Confidentialité</Paragraph>
                <Paragraph>Confidentialité</Paragraph>
              </div>
            )}

            {showAvatarOptions && (
              <div>
                <Title level={4}>Options de Photo de Profil</Title>
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Importer une image</Button>
                </Upload>
                <Button style={{ marginTop: '10px' }} icon={<UserOutlined />}>
                  Créer un avatar
                </Button>
              </div>
            )}

            {showDiscussionsInfo && (
              <div>
                <MessageOutlined size={190} icon={<MessageOutlined />} />
                <Title level={16}>Discussions</Title>
                <Paragraph>Discussions en ligne</Paragraph>
                <Paragraph>Boîte de réception</Paragraph>
                <Paragraph>Historique des conversations</Paragraph>
              </div>
            )}

            {showNotificationInfo && (
              <div>
                <BellOutlined size={190} icon={<BellOutlined />} />
                <Title level={16}>Notifications</Title>
                <Paragraph>Notifications récentes</Paragraph>
                <Paragraph>Préférences de notification</Paragraph>
                <Paragraph>Notification Push</Paragraph>
              </div>
            )}


            {showStorageInfo && (
              <div>
                <DatabaseOutlined size={190} icon={<DatabaseOutlined />} />
                <Title level={16}>Stockage et Données</Title>
                <Paragraph>Espace de stockage disponible</Paragraph>
                <Paragraph>Gestion des fichiers</Paragraph>
                <Paragraph>Données sauvegardées</Paragraph>
              </div>
            )}

            {/* Autres sections similaires pour la Confidentialité, Avatar, Discussions, Notification, Langue, Stockage et Données */}

            {showInviteInfo && (
              <div>
                <UsergroupAddOutlined size={190} icon={<UsergroupAddOutlined />} />
                <Title level={16}>Invité</Title>
                <Paragraph>Gérer les utilisateurs invités</Paragraph>
                <Paragraph>Droits d'accès des invités</Paragraph>
                <Paragraph>Historique des invitations</Paragraph>
                <Button type="primary" onClick={toggleAddGuestModal}>Ajouter un compte invité</Button>
              </div>
            )}
          </div>
        </Content>
      </Layout>
      {/* Modal pour ajouter un compte invité */}
      <Modal
        title="Ajouter un compte invité"
        visible={showAddGuestModal}
        onCancel={handleAddGuestCancel}
        footer={null}
      >
        <Form
          name="addGuestForm"
          onFinish={handleAddGuest}
        >
          <Form.Item
            name="guestName"
            label="Nom du compte invité"
            rules={[{ required: true, message: 'Veuillez entrer le nom du compte invité' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="guestEmail"
            label="Email du compte invité"
            rules={[{ required: true, type: 'email', message: 'Veuillez entrer une adresse email valide' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Ajouter</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Profile;