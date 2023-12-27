// Menu.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
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
      </ul>  
      </div>

    </div>
  );
};

export default Menu;
