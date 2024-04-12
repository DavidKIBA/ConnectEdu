import React  from 'react';
import Menu from '../components/Menu';
import { useHistory } from 'react-router-dom';
import { Typography,  message } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const { Title } = Typography;

const Inscription = () => {
  
   const continuer = useHistory();
  // État local pour stocker les données du formulaire

    const [formData ,setFormData]= useState ({
    nom : "",
    adresse: "",
    ville_residence : "",
    date_creation : new Date(),
    telephone_1 : "",
    telephone_2 : "",
    email_ecole: "",
    logo : null,
    nom_responsable : "",
    prenom_responsable : "",
    email_responsable: ""

   });

  // Fonction de gestion des changements dans les champs du formulaire

  const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData(prevState => ({
        ...prevState, 
      [name]: value}));
      
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState, 
      logo: file
    }));
  };

  // Fonction pour soumettre le formulaire d'inscription

  const handleSubmit = async (e) => {
      e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
      try {
         const formDataToSend = new FormData();
          for (const key in formData) {
            formDataToSend.append(key, formData[key]);
      }
        // Envoie une requête POST à l'API d'inscription avec les données du formulaire
        const response = await axios.post('http://192.168.1.3:8000/inscription/ecole/'
        ,
        formDataToSend, 
         {
          headers: {
            'Content-Type': 'multipart/form-data' // Spécifiez le type de contenu ici
          }
        
        }
        );
        console.log(formData);
        if (response.status === 201){
          // Gérer l'inscription réussie
          message.access('Inscription réussie:', response.data);
          continuer.push('/inscription2');
        } else {
          // Gérer l'échec de l'inscription
          message.error("Echec de l'inscription:", response.data);
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
            <label htmlFor="nom">Nom de l'école:</label>
            <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="nom_responsable ">Nom du responsable:</label>
            <input type="text" id="nom_responsable" name="nom_responsable" value={formData.nom_responsable} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="prenom_responsable ">Prenom du responsable:</label>
            <input type="text" id="prenom_responsable" name="prenom_responsable" value={formData.prenom_responsable} onChange={handleChange} required />
          </div>
        
          
          <div className="form-group">
            <label htmlFor="email_responsable">Adresse mail du responsable:</label>
            <input type="email" id="email_responsable" name="email_responsable" value={formData.email_responsable} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="adresse_ecole">Adresse local:</label>
            <input type="text" id="adresse_ecole" name="adresse" value={formData.adresse} onChange={handleChange} required />
          </div>
     
          <div className="form-group">
            <label htmlFor="ville_residence">Ville de résidence:</label>
            <input type="text" id="ville_residence" name="ville_residence" value={formData.ville_residence} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="date_creation">Date de création :</label>
            <input 
              type="date" 
              id="date_creation" 
              name="date_creation" 
              value={formData.date_creation} 
              onChange={handleChange} 
              required 
              aria-label="Date de création"
              aria-required="true"
            />
            
          </div>

          <div className="form-group">
            <label htmlFor="telephone_1">Numéro de téléphone 1:</label>
            <input type="text" id="telephone_1" name="telephone_1" value={formData.telephone_1} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="telephone_2">Numéro de téléphone 2:</label>
            <input type="text" id="telephone_2" name="telephone_2" value={formData.telephone_2} onChange={handleChange}/>
          </div>


          <div className="form-group">
            <label htmlFor="email_ecole">Adresse mail:</label>
            <input type="email" id="email_ecole" name="email_ecole" value={formData.email_ecole} onChange={handleChange} required />
          </div>
 
        <div className="form-group">
            <label htmlFor="logo_ecole">Logo de l'école:</label>
            <input type="file" id="logo_ecole" name="logo" value={formData.logo} onChange={handleFileChange} accept="image/*" />
          </div> 

          <button type="submit">Continuer</button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
