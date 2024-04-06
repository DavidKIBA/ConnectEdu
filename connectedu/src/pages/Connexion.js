import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import {useState} from "react";
import Menu from '../components/Menu';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Input, Button, Image, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Connexion = () => {

     // fonction retour vers la page inscription
     const inscription = useHistory();
      const RetourSignin = () => {
         inscription.push("/inscription")
      };
     
     // fonction logique de connexion ici

     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("")
     
     const connexion = useHistory();
      const homeconnected = async (e) => {
         e.preventDefault();
         // Ajoutez votre logique de connexion ici
         try{
            const response = await axios.post("http://192.168.1.3:8000/api/token/", {
                username : username,
                password : password
         });
          const token = response.data.success; // recuperer le token
          localStorage.setItem("token", token) // stocker le token dans le local storage
          connexion.push("/connected");
         } catch (error) {
          alert('Erreur lors de la connexion :', error);
        }
         
         
       };

     return (
       <div>
         <Image
             width='100%'
            src={process.env.PUBLIC_URL + '/images/connexionimage.jpg'}
          />
         <Layout>
           <div className="overlay">
             <h1 className="titreconn">
               <UserOutlined /> Connexion
             </h1>
             {/* ... autres éléments de contenu ... */}
           </div>
         </Layout>

         <div>
           <Menu />
         </div>

         {/* formulaire */}
         <div className="login-container">
           <Form name="login-form" className="login-form">
             <h2>Connexion</h2>
             <Form.Item
               name="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)} 
               rules={[{ required: true, message: 'Veuillez entrer votre numéro matricule!' }]}
             >
               <Input prefix={<UserOutlined />} placeholder="User name" />
             </Form.Item>
             <Form.Item
               name="password"
               value={password} 
               onChange={(e) => setPassword(e.target.value)} 
               rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
             >
               <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" />
             </Form.Item>
             <Form.Item>
               <Form.Item name="remember" valuePropName="checked" noStyle>
                 <Checkbox>Se souvenir de moi</Checkbox>
               </Form.Item>

               <a className="login-form-forgot" href="#">
                 Mot de passe oublié?
               </a>
             </Form.Item>

             <Form.Item>
               <Button type="primary" htmlType="submit" onClick={homeconnected} className="login-form-button">
                 Se connecter
               </Button>
               <div className="form-links">
                 Vous n'avez pas de compte? <a href="#" onClick={RetourSignin}>S'inscrire</a>
               </div>
             </Form.Item>
           </Form>
         </div>
       </div>
     );
};

export default Connexion;



// <div>
//           <Image
//             width='100%'
//             src={process.env.PUBLIC_URL + '/images/connexionimage.jpg'}
//           />
//         <div className=''>
//           <Form className='loginForm'>
//             <Form.Item label='Email' name={'myEmail'}>
//               <Input placeholder='Enter your email'/>
//             </Form.Item>
//             <Form.Item label='Password' name={'myPassword'}>
//               <Input placeholder='Enter your password'/>
//             </Form.Item>
//           </Form>

//         </div>
//       </div>