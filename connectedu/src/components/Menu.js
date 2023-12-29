// Menu.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom'; // pour rediriger les bouttons sur d'autres pages
import { FaUser } from 'react-icons/fa'; // importer l'icone utilisateur 

const Menu = () => {
      
      // fonction de redirection du boutton vers la page inscription

      const signin = useHistory();
      const Signin = () => {
        signin.push("/connexion")
      };
  
  return (
    <div className="menu">
       <div className='Logo1'>
        
       <img
            className="logo"
            src={process.env.PUBLIC_URL + '/images/Logo.png'}
            alt="logo"
      />
       
       </div>
      
      <div className='liens'>
       <ul>
       
        <li>
          <NavLink to="/" activeClassName="isActiveLink">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="isActiveLink">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="isActiveLink">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/inscription" className="inscription">
            Inscription
          </NavLink>
        </li>
        <li>
        <button className='signin-button' onClick={Signin}>
          <FaUser />
          <span>Sign in</span>
        </button>
      
        </li>
      </ul>  
      </div>

    </div>
  );
};

export default Menu;
