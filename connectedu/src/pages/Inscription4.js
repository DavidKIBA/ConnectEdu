import React from 'react';
import Menu from '../components/Menu';

const Inscription4 = () => {
    return (

       <div className="home-container">
          <img
            className="background-image"
            src={process.env.PUBLIC_URL + '/images/connexionimage.jpg'}
            alt="Accueil"
          />
          <div className="overlay1"></div>
    
          <div>
            
              <Menu />
            
          </div> 
          <h1 className='titreconn4'>
          Votre candidature est en cours de traitement
          </h1>
          
          <img
            className="inscription4img"
            src={process.env.PUBLIC_URL + '/images/Checkmark.png'}
            alt="Accueil"
          />

          <h1 className='titreconn5'>
          Vous recevrez un mail de confirmation après validation de votre dossier
          </h1>

        </div>
    );
};

export default Inscription4;

