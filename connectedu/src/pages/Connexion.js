import React from 'react';
import Menu from '../components/Menu';
import { useHistory } from 'react-router-dom';

const Connexion = () => {

     // fonction retour vers la page inscription
     const inscription = useHistory();
     const RetourSignin = () => {
        inscription.push("/inscription")
     };
     
     // fonction logique de connexion ici
    const connexion = useHistory();
    const handleLogin = (e) => {
        e.preventDefault();
        // Ajoutez votre logique de connexion ici
        connexion.push("/connected");
      };

    return (
        <div>
            <img
        className="background-image"
        src={process.env.PUBLIC_URL + '/images/connexionimage.jpg'}
        alt="Accueil"
      />
      <div className="overlay"></div>

      <h1 className='titreconn'>
        Connexion
      </h1>

      <div>
        
          <Menu />
        
      </div>

      {/* formulaire */}

   

    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <label htmlFor="matricule">Numéro Matricule:</label>
        <input type="text" id="matricule" name="matricule" required />

        <label htmlFor="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Se connecter</button>
        <div className="form-links">
          <a href="#">Mot de passe oublié?</a>
          <span>Vous n'avez pas de compte? <a href="#" onClick={RetourSignin}>S'inscrire</a></span>
        </div>
      </form>
    </div>

    </div>

    );
};

export default Connexion;