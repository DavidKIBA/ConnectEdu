import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, List, Avatar, Badge, Button, Space, Input, Modal, Form, Tabs } from 'antd';
import {
  MailOutlined,
  InboxOutlined,
  ScheduleOutlined,
  SendOutlined,
  FileTextOutlined,
  PlusOutlined,
  BellOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SearchOutlined, // Importez l'icône de recherche
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;

const MessagePage = () => {
  const [selectedMenu, setSelectedMenu] = useState('inbox');
  const [showComposeModal, setShowComposeModal] = useState(false);

  const handleMenuClick = (menuKey) => {
    setSelectedMenu(menuKey);
  };

  const showComposeForm = () => {
    setShowComposeModal(true);
  };

  const handleComposeSubmit = (values) => {
    console.log('Form values:', values);
    setShowComposeModal(false);
  };

  const handleSearch = (value) => {
    // Ajoutez ici la logique de recherche avec la valeur `value`
    console.log('Recherche:', value);
    // Par exemple, vous pouvez filtrer les messages ici
  };

  const messageData = {
    inbox: [
      { id: 1, sender: 'John Doe', subject: 'Meeting Tomorrow', content: 'Lorem ipsum...' },
      { id: 2, sender: 'Alice Smith', subject: 'Project Update', content: 'Lorem ipsum...' },
    ],
    drafts: [],
    followed: [
      { id: 3, sender: 'Bob Johnson', subject: 'Follow-up Meeting', content: 'Lorem ipsum...' },
      { id: 4, sender: 'Eva Brown', subject: 'Action Items', content: 'Lorem ipsum...' },
    ],
  };

  const renderMessageContent = () => {
    switch (selectedMenu) {
      case 'inbox':
      case 'drafts':
      case 'followed':
        return (
          <List
            itemLayout="horizontal"
            dataSource={messageData[selectedMenu]}
            renderItem={(message) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<MailOutlined />} />}
                  title={<a href="#">{message.sender}</a>}
                  description={message.subject}
                />
                <div>{message.content}</div>
                <Badge status="success" />
              </List.Item>
            )}
          />
        );
      default:
        return <div>Contenu de la section {selectedMenu}</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <Menu mode="vertical" theme="light" selectedKeys={[selectedMenu]} onClick={({ key }) => handleMenuClick(key)}>
          <Menu.Item key="compose" icon={<PlusOutlined />} onClick={showComposeForm}>
            Nouveau Message
          </Menu.Item>
          <Menu.Item key="inbox" icon={<InboxOutlined />}>
            Boîte de Réception
          </Menu.Item>
          <Menu.Item key="followed" icon={<ScheduleOutlined />}>
            Messages Suivis
          </Menu.Item>
          <Menu.Item key="pending" icon={<MailOutlined />}>
            En Attente
          </Menu.Item>
          <Menu.Item key="sent" icon={<SendOutlined />}>
            Messages Envoyés
          </Menu.Item>
          <Menu.Item key="drafts" icon={<FileTextOutlined />}>
            Brouillons
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
          <Space size="large" style={{ float: 'right' }}>
            <Input
              placeholder="Recherche"
              onPressEnter={(e) => handleSearch(e.target.value)}
            />
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => handleSearch()} />
            <Button icon={<QuestionCircleOutlined />} />
            <Button icon={<BellOutlined />} />
            <Button icon={<SettingOutlined />} />
            <Button icon={<UserOutlined />} />
          </Space>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Boîte de Messagerie</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenu}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {renderMessageContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Votre Footer ici</Footer>
      </Layout>
      <Modal
        title="Nouveau Message"
        visible={showComposeModal}
        onCancel={() => setShowComposeModal(false)}
        footer={null}
      >
        <Form onFinish={handleComposeSubmit}>
          <Form.Item
            label="Destinataire"
            name="recipient"
            rules={[{ required: true, message: "Veuillez entrer l'adresse e-mail du destinataire" }]}
          >
            <Input placeholder="Entrez l'adresse e-mail du destinataire" />
          </Form.Item>
          <Form.Item
            label="Objet"
            name="subject"
            rules={[{ required: true, message: "Veuillez entrer l'objet du message" }]}
          >
            <Input placeholder="Entrez l'objet du message" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Veuillez entrer le message' }]}
          >
            <TextArea rows={4} placeholder="Entrez le message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Envoyer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MessagePage;