import React from 'react';
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
     const connexion = useHistory();
      const homeconnected = (e) => {
         e.preventDefault();
         // Ajoutez votre logique de connexion ici
         connexion.push("/connected");
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
               name="matricule"
               rules={[{ required: true, message: 'Veuillez entrer votre numéro matricule!' }]}
             >
               <Input prefix={<UserOutlined />} placeholder="Numéro Matricule" />
             </Form.Item>
             <Form.Item
               name="password"
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