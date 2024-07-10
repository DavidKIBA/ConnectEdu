import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom"; // pour rediriger les bouttons sur d'autres pages
import { FaUser } from "react-icons/fa"; // importer l'icone utilisateur
import { FaBars, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ConnectedMenu = () => {
  const [infosEcole, setInfosEcole] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        const decodedToken = jwtDecode(token);
        const ecole_id = decodedToken.id_ecole;
        const schemaname = decodedToken.schema_name;
        const schema = schemaname.replace("_", "-");

        const response = await axios.get(
          `http://${schema}.localhost:8000/ecole/info/${ecole_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInfosEcole(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'école:",
          error
        );
      }
    };

    fetchUserData();
  }, []);
  // gerer l'etat d'ouverture et fermeture du menu du profil

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // fonction de redirection du boutton vers la page inscription

  const signout = useHistory();
  const Signout = () => {
    signout.push("/");
  };

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div className="menu">
      <div className="Logo">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/images/Logo.png"}
          alt="logo"
        />
      </div>

      <div className="liens">
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
            <NavLink to="/dashboard" className="dashboard">
              Dashboard
            </NavLink>
          </li>
          <li>
            <button className="signout-button" onClick={Signout}>
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
                  <img
                    src={infosEcole.logo}
                    alt="Profile"
                    className="profile-image"
                  />
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
