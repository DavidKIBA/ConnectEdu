import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { Button, Drawer, Menu as AntMenu, Col, Image } from 'antd';
import { MenuOutlined} from '@ant-design/icons';

const { SubMenu } = AntMenu;

const Menu = () => {
  const [visible, setVisible] = useState(false);
  const signin = useHistory();

  const Signin = () => {
    signin.push("/connexion");
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="menu">
      <div className='logo1'>
      <Image
          className="logo"
          width={100}
          src={process.env.PUBLIC_URL + '/images/Logo.png'}
          alt="logo"
        />
      </div>

      <div className='liens'>
        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
          {/* Menu complet pour les écrans de bureau */}
          <AntMenu mode="horizontal" theme="dark" className="desktop-menu" style={{ backgroundColor: 'transparent' }}>
            <AntMenu.Item key="home">
              <NavLink to="/" activeClassName="isActiveLink">
                Accueil
              </NavLink>
            </AntMenu.Item>
            <AntMenu.Item key="about">
              <NavLink to="/about" activeClassName="isActiveLink">
                À propos
              </NavLink>
            </AntMenu.Item>
            <AntMenu.Item key="contact">
              <NavLink to="/contact" activeClassName="isActiveLink">
                Contact
              </NavLink>
            </AntMenu.Item>
            <AntMenu.Item key="inscription" className="inscription">
              <NavLink to="/inscription">
                Inscription
              </NavLink>
            </AntMenu.Item>
            <AntMenu.Item key="signin">
              <button className='signin-button' onClick={Signin}>
                <FaUser />
                <span>Connexion</span>
              </button>
            </AntMenu.Item>
          </AntMenu>
        </Col>

        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
          {/* Bouton de menu pour les écrans mobiles */}
          <Button className="menu-button" type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            {/* Menu dans un tiroir pour les écrans mobiles */}
            <AntMenu mode="vertical" theme="dark">
              <AntMenu.Item key="home">
                <NavLink to="/" activeClassName="isActiveLink">
                  Accueil
                </NavLink>
              </AntMenu.Item>
              <AntMenu.Item key="about">
                <NavLink to="/about" activeClassName="isActiveLink">
                  À propos
                </NavLink>
              </AntMenu.Item>
              <AntMenu.Item key="contact">
                <NavLink to="/contact" activeClassName="isActiveLink">
                  Contact
                </NavLink>
              </AntMenu.Item>
              <AntMenu.Item key="inscription" className="inscription">
                <NavLink to="/inscription">
                  Inscription
                </NavLink>
              </AntMenu.Item>
              <AntMenu.Item key="signin">
                <button className='signin-button' onClick={Signin}>
                  <FaUser />
                  <span>Connexion</span>
                </button>
              </AntMenu.Item>
            </AntMenu>
          </Drawer>
        </Col>
      </div>
    </div>
  );
};

export default Menu;
