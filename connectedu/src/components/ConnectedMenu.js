import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom'; // pour rediriger les bouttons sur d'autres pages
import { FaUser } from 'react-icons/fa'; // importer l'icone utilisateur 

const ConnectedMenu = () => {

    
    // gerer l'etat d'ouverture et fermeture du menu du profil

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };


    // fonction de redirection du boutton vers la page inscription

    const signout = useHistory();
    const Signout = () => {
      signout.push("/")
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
          <NavLink to="/dashboard" className="dashboard">
            Tableau de bord
          </NavLink>
        </li>
        <li>
        <button className='signout-button' onClick={Signout}>
          <FaUser />
          <span>Log out</span>
        </button>
      
        </li>
        {/* <li>
        <div className="profile-picture">
              <img src={process.env.PUBLIC_URL + '/images/eunice.jpg'} alt="Profile" className="profile-image" />
        </div>
        </li> */}


        {/* profil et menu du profil*/}

        <li>
             <div className="profile-menu">
                <button className="profile-button" onClick={toggleMenu}>
                    <div className="profile-picture">
                    <img src={process.env.PUBLIC_URL + '/images/eunice.jpg'} alt="Profile" className="profile-image" />
                    </div>
                </button>
                {isMenuOpen && (
                    <div className="dropdown-menu">
                    {/* Contenu du menu déroulant ici */}
                    <p>Compte</p>
                    <p>Profil</p>
                    <p>Paramètre</p>
                    </div>
                )}
            </div>
        </li>
      </ul>  
      </div>
        

    </div>
    );
};

export default ConnectedMenu;