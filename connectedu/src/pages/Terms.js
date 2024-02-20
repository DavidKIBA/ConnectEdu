import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';
import Dashboardsider from '../components/Dashboardsider';


import {
    UserOutlined,
    MessageOutlined,
    SettingOutlined,
    CalendarOutlined,
    FileTextOutlined,
    ReloadOutlined,
    TeamOutlined,
    SearchOutlined,
    ArrowDownOutlined, 
    ArrowUpOutlined,
    EditOutlined, EllipsisOutlined,
  } from '@ant-design/icons';

import {
   Breadcrumb, 
   Layout, 
   Menu, 
   theme, 
   Input, 
   Badge, 
   Dropdown, 
   Avatar,
   Card, 
   Col, 
   Row, 
   Statistic,
   Progress,
   Carousel,
   Table,
  } from 'antd';

  import { Typography } from 'antd';




const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const { TextArea } = Input;

const { Title, Paragraph } = Typography;




const Terms = () => {
  

{/* Debut mini lien des pages */}

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  
  const history = useHistory();

  const handleBreadcrumbClick = (route) => {
    history.push(route);
  };

{/* Fin mini lien des pages */}

  return (
         
    <Layout style={{ background: '#001E32' }}>

    <Dashboardmenu/>

       <Layout style={{ background: '#001E32' }}>

          <Dashboardsider/>
         
         {/* Corps de la page 1 */}
          
         <Layout style={{ padding: '0 24px 24px', backgroundColor:'#001E32' }}>
            
            <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer', color:'#2ECC71' }}>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/connected')}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Thalès de Millet</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')} ><font color='#3498DB'>Elèves</font></Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >

             <Title level={2} style={{color: '#3498DB'}}>Conditions d'utilisation</Title>
                  
             <Paragraph>
             En accédant à la plateforme ConnectEdu, vous acceptez les conditions d'utilisation
             suivantes. Veuillez les lire attentivement avant de procéder à l'utilisation de la plateforme.
            </Paragraph>

                <Title level={4} style={{ color: '#2ECC71' }}>1. Accès à la Plateforme</Title>
            
                <Paragraph>
                1.1 Vous êtes autorisé à accéder à la plateforme ConnectEdu en utilisant les identifiants
                fournis par l'administrateur de l'école ou par les moyens d'accès spécifiés par ElemboTech.
                </Paragraph>

                <Paragraph>
                1.2 Vous êtes responsable de la confidentialité de vos identifiants de connexion et devez
                informer immédiatement ElemboTech en cas d'utilisation non autorisée de votre compte.

                </Paragraph>
                        
                
                <Title level={4} style={{ color: '#2ECC71' }}>2. Utilisation de la Plateforme</Title>
            
                <Paragraph>
                2.1 Vous vous engagez à utiliser la plateforme ConnectEdu conformément aux lois et
                réglementations en vigueur
                </Paragraph>

                <Paragraph>
                2.2 Vous acceptez de ne pas utiliser la plateforme à des fins illégales, abusives ou
                frauduleuses.
                </Paragraph>

                <Paragraph>
                2.3 Vous ne devez pas tenter d'accéder à des parties non autorisées de la plateforme ni de
                contourner les mesures de sécurité mises en place.
                </Paragraph>
            
                <Title level={4} style={{ color: '#2ECC71' }}>3. Contenu de la Plateforme</Title>
            
                <Paragraph>
                3.1 Vous comprenez et acceptez que tout le contenu disponible sur la plateforme, y compris
                les textes, images, vidéos, et autres matériels, est la propriété intellectuelle d'ElemboTech
                ou de ses partenaires.
                </Paragraph>

                <Paragraph>
                3.2 Vous ne pouvez pas reproduire, distribuer, ou créer des œuvres dérivées du contenu de
                la plateforme sans autorisation expresse.

                </Paragraph>
           
                <Title level={4} style={{ color: '#2ECC71' }}>4. Support Technique</Title>
            
                <Paragraph>
                4.1 ElemboTech fournira un support technique pour résoudre les problèmes liés à l'utilisation
                de la plateforme.
                </Paragraph>

                <Paragraph>
                4.2 Les demandes de support technique doivent être soumises conformément aux
                procédures spécifiées par ElemboTech.
                </Paragraph>

                <Title level={4} style={{ color: '#2ECC71' }}>5. Confidentialité</Title>
            
                <Paragraph>
                5.1 Vous acceptez de traiter toute information confidentielle obtenue lors de l'utilisation de la
                plateforme avec le même degré de confidentialité que vous accordez à vos propres
                informations confidentielles.
                </Paragraph>

                <Title level={4} style={{ color: '#2ECC71' }}>6. Responsabilités</Title>
            
                <Paragraph>
                6.1 Vous êtes responsable de toutes les activités effectuées via votre compte sur la
                plateforme.
                </Paragraph>

                <Paragraph>
                6.2 ElemboTech ne peut être tenu responsable des pertes ou dommages résultant de votre
                utilisation de la plateforme.
                </Paragraph>

                <Title level={4} style={{ color: '#2ECC71' }}>7. Modifications des Conditions d'Utilisation</Title>
            
                <Paragraph>
                7.1 ElemboTech se réserve le droit de modifier ces conditions d'utilisation à tout moment.
                Les modifications prendront effet dès leur publication sur la plateforme.
                </Paragraph>

                <Paragraph>
                7.2 Il est de votre responsabilité de consulter régulièrement les conditions d'utilisation pour
                prendre connaissance des éventuelles modifications.
                </Paragraph>
                
                <Paragraph>
                En utilisant la plateforme ConnectEdu, vous acceptez ces conditions d'utilisation. Si vous
                n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.
                Dernière mise à jour : [Date de la Dernière Mise à Jour]
                </Paragraph>



            <br></br>
            <br></br>
            
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
             
               

            </Content>
                

            </Content>

          </Layout>

          {/* Fin Corps de la page 1 */}

       </Layout>
    </Layout>
  );
};
export default Terms;
