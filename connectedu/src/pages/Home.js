// Home.js
import React from 'react';
import { useHistory } from 'react-router-dom'; // pour rediriger les bouttons sur d'autres pages
import Menu from "../components/Menu";
import Footer from '../components/Footer';
import  { useState } from 'react';
import { Button, Form, Image, Input, Checkbox, Typography, Row, Col } from 'antd';
import { ProjectOutlined, SecurityScanOutlined, IdcardOutlined } from '@ant-design/icons';


const Home = () => {

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
      <Image
             className="background-image"
             src={process.env.PUBLIC_URL + '/images/homeimage.jpg'}
             alt="Accueil"
          />
     
      <div className="overlay"></div>
 
      <div>
        
          <Menu/>
        
      </div>   
      <h1 className='titre1'>
        ConnectEdu 
      </h1>
      <h1 className='titre2'>
        <div className='tiret'></div>
        <span>L'école à porté de main</span> 
        <div className='tiret'></div>
      </h1>

      <h1 className='titre3'>
         Découvrez ce que ConnectEdu peut faire <br/>
          pour vous :
        
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
        <div className='devise1'>
              <img
              className="iconedevise"
              src={process.env.PUBLIC_URL + '/images/Project Setup.png'}
              alt="Accueil"
              />
            <h3>Efficacité Simplifiée</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>
        </div>
        <div className='devise2'>
              <img
              className="iconedevise"
              src={process.env.PUBLIC_URL + '/images/Security Shield.png'}
              alt="Accueil"
              />
            <h3>Sécurité Prioritaire</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>
        </div>
        <div className='devise3'>
             <img
              className="iconedevise"
              src={process.env.PUBLIC_URL + '/images/Registration.png'}
              alt="Accueil"
              />
            <h3>Personnalisé pour Vous</h3>
            <p>Gérez tous les aspects de votre école en un seul endroit.</p>
        </div>
      </div>
         <br></br>
   {/* formulaire de contact */}
        
   <div className="contact-container">
      <div className="description">
        <h2>Description</h2>
        <p>Une description quelconque de Notre choix.</p>
      </div>
      <div className="form-container">
        <h2 className='contact'>Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Adresse e-mail :</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="phone">Téléphone :</label>
          <input type="tel" id="phone" name="phone" required />

          <label htmlFor="message">Message :</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <div className="terms">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms">J'accepte les termes et conditions</label>
          </div>

          <button type="submit">Envoyer</button>
        </form>
      </div>

    
    </div>
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
