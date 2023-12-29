import React from 'react';
import '../css/Connected.css';
import Menu from '../components/Menu';

const Connected = () => {

 

    return (
        <div className="home-container">
            <img
              className="background-image"
              src={process.env.PUBLIC_URL + '/images/connexionimage.jpg'}
              alt="Accueil"
            />
            <div className="overlay"></div>

            <div>  
                <Menu />
            </div>
          

  
    </div>
    );
};

export default Connected;