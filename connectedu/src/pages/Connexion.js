import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import {useState} from "react";
import Menu from '../components/Menu';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Modal, Input, Button, Image, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Connexion = () => {
       // declaration du modal
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
          setIsModalOpen(true);
        };

        const [adressmail, seTadressemail] = useState({
          email : ""
        })
        
        const handChange = (e) => {
          const {name, value} = e.target;
          seTadressemail(preventState => ({
            ...preventState, 
            [name]: value
          }));

         
       
        };

        const handleOk = async (e) =>{
           try {
            const response = await axios.post("http://192.168.1.3:8000/utilisateur/reset-password/", 
            JSON.stringify(adressmail), // Convertir formData en JSON
            {
             headers: {
               'Content-Type': 'application/json' // Spécifiez le type de contenu ici
             }
          }
          );
          console.log(adressmail);
          if (response.status === 200) {
            // L'élément est déjà inscrit
            message.success("verifier votre boite gmail");
            setIsModalOpen(false);
           
            } else {
                // Autre cas de figure, gestion des erreurs, etc.
                setIsModalOpen(false);
            }
           }  catch (error) {
            // Gérer l'erreur
            message.error('Erreur', error);
         
           }
          
        };

          
          
        

        const handleCancel = () => {
          setIsModalOpen(false);
        };
     
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
          const token = response.data; // recuperer le token
           localStorage.setItem("access", token.access);  // stocker le token dans le local storage
           localStorage.setItem("refresh", token.refresh);  // stocker le token dans le local storage
        
          console.log(response)
          console.log(token);
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

               <Button className="login-form-forgot" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={showModal}>
                 Mot de passe oublié?
               </Button>
               <Modal title="Entrer votre adresse mail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <Form className='reset-password'>
                    <Form.Item > 
                       <input type='email' name="email" value={adressmail.email} onChange={handChange} placeholder="adresse mail"/>
                    </Form.Item>
                  </Form>
                </Modal>
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