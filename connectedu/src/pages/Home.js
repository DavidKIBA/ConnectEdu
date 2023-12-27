// Home.js

import React from 'react';
import '../css/Home.css';
import Menu from '../components/Menu';

const Home = () => {
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
      <h1 className='titre1'>
        ConnectEdu 
      </h1>
      <h1 className='titre2'>
        <span></span>
        <span>L'école à porté de main</span> 
        <span></span>
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

      <span className='voirplus'> Voir plus</span>
    </div>
  );
};

export default Home;
