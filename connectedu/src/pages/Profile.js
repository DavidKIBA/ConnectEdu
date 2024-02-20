import React from 'react';
import { Layout, Avatar, Typography, Divider, Space, Row, Col, Input, Button, Modal } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  LockOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
  const handleChangePassword = () => {
    // Logique pour changer le mot de passe
    // Afficher une modal ou un formulaire pour changer le mot de passe
    Modal.info({
      title: 'Changer le mot de passe',
      content: (
        <div>
          <Input.Password prefix={<LockOutlined />} placeholder="Nouveau mot de passe" />
          <Input.Password prefix={<LockOutlined />} placeholder="Confirmer le mot de passe" />
        </div>
      ),
      onOk() {},
    });
  };

  const handleViewIDDocument = () => {
    // Logique pour afficher le fichier de pièce d'identité
    // Afficher le fichier dans un modal ou une autre fenêtre
    Modal.info({
      title: 'Fichier de pièce d\'identité',
      content: (
        <div>
          {/* Afficher le fichier de pièce d'identité ici */}
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <Layout>
      <Content style={{ padding: '24px', minHeight: '100vh' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Avatar size={128} icon={<UserOutlined />} />
            <Title level={2} style={{ marginTop: '16px' }}>
              John Doe
            </Title>
            <Text type="secondary">Responsable</Text>
          </div>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Space direction="vertical">
                <Space align="baseline">
                  <MailOutlined />
                  <Text>Email:</Text>
                  <Text strong>john.doe@example.com</Text>
                </Space>
                <Space align="baseline">
                  <PhoneOutlined />
                  <Text>Téléphone:</Text>
                  <Text strong>(123) 456-7890</Text>
                </Space>
                <Space align="baseline">
                  <EnvironmentOutlined />
                  <Text>Adresse:</Text>
                  <Text strong>123 Street, City, Country</Text>
                </Space>
                <Space align="baseline">
                  <CalendarOutlined />
                  <Text>Date de naissance:</Text>
                  <Text strong>01 Janvier, 1990</Text>
                </Space>
                <Button type="primary" onClick={handleChangePassword}>Changer le mot de passe</Button>
                <Button type="link" onClick={handleViewIDDocument}><FileOutlined /> Voir le fichier de pièce d'identité</Button>
              </Space>
            </Col>
            <Col span={12}>
              {/* Informations de l'école */}
              <Space direction="vertical">
                <Space align="baseline">
                  <Text strong>Nom de l'école:</Text>
                  <Text>Exemple School</Text>
                </Space>
                <Space align="baseline">
                  <EnvironmentOutlined />
                  <Text>Adresse de l'école:</Text>
                  <Text strong>123 School Street, City, Country</Text>
                </Space>
                <Space align="baseline">
                  <PhoneOutlined />
                  <Text>Téléphone de l'école:</Text>
                  <Text strong>(123) 456-7890</Text>
                </Space>
                <Space align="baseline">
                  <MailOutlined />
                  <Text>Email de l'école:</Text>
                  <Text strong>contact@exemple.com</Text>
                </Space>
                {/* Bouton pour changer les informations de l'école */}
                <Button type="primary">Modifier les informations de l'école</Button>
              </Space>
            </Col>
          </Row>
          {/* Logo de l'école */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            {/* Insérer le logo de l'école ici */}
            <img src="/path/to/school-logo.png" alt="Logo de l'école" style={{ maxWidth: '200px' }} />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Profile;