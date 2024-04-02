// Home.js
import React from 'react';
import { useHistory } from 'react-router-dom'; // pour rediriger les bouttons sur d'autres pages
import Menu from "../components/Menu";
import Footer from '../components/Footer';
import  { useState } from 'react';
import { 
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Flex, 
  Image, 
  Checkbox, 
  Typography, 
  Row, 
  Col 
} from 'antd';
import { ProjectOutlined, SecurityScanOutlined, IdcardOutlined } from '@ant-design/icons';

import { Card } from 'antd';

const { Meta } = Card;

const cardStyle: React.CSSProperties = {
  width: 620,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};

const Home = () => {
     
  // formulaire de contact

  const { RangePicker } = DatePicker;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  
    // fonction de redirection du boutton vers la page about
    const voirplus = useHistory();
    const Voirplus = () => {
       voirplus.push("/about");
    };

    // fonction envoyant le mail de l'utilisateur.

    const handleSubmit = (e) => {
      e.preventDefault();
      // Ajout de la logique pour gérer l'envoi du formulaire
    };

    return (
    <div className="home-container">
      <img
             className="background-image"
             src={process.env.PUBLIC_URL + '/images/homeimage.jpg'}
             alt="Accueil"
             
             
          />
     
      {/* <div className="overlay"></div>   */}
      <div>
        
          <Menu/>
        
      </div>   
      
      <h1 className='titre1'>
        ConnectEdu 
      </h1>
      <h1 >
        <div className='tiret'></div>
        <span className='titre2'> Découvrez ce que ConnectEdu peut faire
        <br/>
          pour vous :
          </span> 
       

      </h1>

      <h1 className='titre3'>
         L'école à portée des mains
        
      </h1>
      
      <div className='liste'>
        <ul>
            <li className='ligne'>Gérez facilement vos étudiants, des admissions <br/> 
            à la progression académique.
            </li> <br/>
            <li className='ligne'>Facilitez la communication avec les parents <br/>
            grâce à notre système de ....</li>
        </ul>
      </div>
      
      <button className='voirplus' onClick={Voirplus}>Voir plus</button>
 
       {/* devises de ConnectEdu */}
       
      

      <div className='devises'>
        <div className='devise3'>
            <Card
              hoverable
              style={{ width: 300, height:240}}
              // {<img alt="example" src="/images/Project Setup.png" width={10} />}
            >
              
              <h3>Efficacité Simplifiée</h3> 
              <p>Gérez tous les aspects de votre école en un seul endroit.</p>

            </Card>
        </div>
        <div className='devise2'>
            <Card
              hoverable
              style={{ width: 300, height:240}}
              // {<img alt="example" src="/images/Security Shield.png" width={50} />}
              src={process.env.PUBLIC_URL + '/images/Security Shield.png'}
              
             >
            <h3>Sécurité Prioritaire</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>

            </Card>
        </div>
        <div className='devise3'>
            <Card
              hoverable
              style={{ width: 300, height:240, backgroundColor:'#3498DB'}}
              // {<img alt="example" src="images/Registration.png" width={50} />}
            >
              <h3>Personnalisé pour Vous</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>

            </Card>
        </div>
        
      </div>
         <br></br>

         {/* formulaire de contact */}

         <Card
  hoverable
  style={{ ...cardStyle, width: '100%' }} // Définissez la largeur sur 100%
  styles={{ body: { padding: 0, overflow: 'hidden' } }}
>
  <Flex justify="space-between">
    <img
      alt="avatar"
      src="images/lycée.jpg"
      style={{ ...imgStyle, width: '50%' }} // Ajustez la largeur de l'image à 50% de la carte
    />
    <Flex vertical align="flex-start" justify="space-between" style={{ padding: 32, width: '50%' }}>
      <Typography.Title level={3} style={{ textAlign: "left", marginBottom: 16 }}>
        Contact
      </Typography.Title>

      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
        <Form.Item label="E-mail" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Telephone"
          name="InputNumber"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Objet"
          name="Mentions"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Mentions style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Message"
          name="TextArea"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input.TextArea style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  </Flex>
</Card>






    <br></br>
    <div className='presence'>
          Présent dans plus de 20 pays d’Afrique
      </div>
      <div className='pays'>
          Congo, RDC, Guinée Bissau, Tchad, ...
      </div>
    <br></br>
     {/* footer*/}

     <Footer/>
  
   </div>
      
  );
};

export default Home;



