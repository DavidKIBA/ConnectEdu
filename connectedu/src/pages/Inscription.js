import React from 'react';
import Menu from '../components/Menu';

const Inscription = () => {
    return (
      <div className="home-container">
      <img
        className="background-image"
        src={process.env.PUBLIC_URL + '/images/acceuil.png'}
        alt="Accueil"
      />
      <div className="overlay"></div>

      <div>
        
          <Menu />
        
      </div>

    </div>
    );
};

export default Inscription;