import React  from 'react';
import Menu from '../components/Menu';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const { Title } = Typography;

const Inscription = () => {
  
   const continuer = useHistory();
  // État local pour stocker les données du formulaire

    const [formData ,setFormData]= useState ({
    schoolName : "",
    localAddress : "",
    residenceCity : "",
    creationDate : "",
    phoneNumber1 : "",
    phoneNumber2 : "",
    email : "",
    confirmEmail : "",
    schoolLogo : ""

   });

  // Fonction de gestion des changements dans les champs du formulaire

  const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData(prevState => ({
        ...prevState, 
      [name]: value}));
      
  };


  // Fonction pour soumettre le formulaire d'inscription

  const handleSubmit = async (e) => {
      e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
      try {
        // Envoie une requête POST à l'API d'inscription avec les données du formulaire
        const response = await axios.post('http://votre-url-backend/inscription/', formData);
        if (response.status === 201){
          // Gérer l'inscription réussie
          alert('Inscription réussie:', response.data);
          continuer.push('/inscription2');
        } else {
          // Gérer l'échec de l'inscription
          alert("Echec de l'inscription:", response.data);
        }
       } catch (error) {
          // Gérer l'erreur
          alert('Erreur', error);

        }
      
    };


  return (
    <div className="inscription-container">
      <img
        className="background-image"
        src={process.env.PUBLIC_URL + '/images/connexionimage.jpg'}
        alt="Accueil"
      />
      <div className="overlay"></div>

      <Menu />
      <Title level={2} style={{ color: '#ffffff', textAlign: 'center' }}>Inscription ConnectEdu</Title>
      <div className="form-container">
        
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Entrez les informations de l'école</h2>

          <div className="form-group">
            <label htmlFor="schoolName">Nom de l'école:</label>
            <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="localAddress">Adresse local:</label>
            <input type="text" id="localAddress" name="localAddress" value={formData.localAddress} onChange={handleChange} required />
          </div>
     
          <div className="form-group">
            <label htmlFor="residenceCity">Ville de résidence:</label>
            <input type="text" id="residenceCity" name="residenceCity" value={formData.residenceCity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="creationDate">Date de création:</label>
            <input type="date" id="creationDate" name="creationDate" value={formData.creationDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone 1:</label>
            <input type="tel" id="phoneNumber1" name="phoneNumber1" value={formData.phoneNumber1} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone 2:</label>
            <input type="tel" id="phoneNumber2" name="phoneNumber2" value={formData.phoneNumber2} onChange={handleChange} required />
          </div>


          <div className="form-group">
            <label htmlFor="email">Adresse mail:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="confirmEmail">Confirmation d'adresse mail:</label>
            <input type="email" id="confirmEmail" name="confirmEmail"  required />
          </div>

          <div className="form-group">
            <label htmlFor="schoolLogo">Logo de l'école:</label>
            <input type="file" id="schoolLogo" name="schoolLogo" value={formData.schoolLogo} onChange={handleChange} accept="image/*" />
          </div>

          <button type="submit">Continuer</button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
