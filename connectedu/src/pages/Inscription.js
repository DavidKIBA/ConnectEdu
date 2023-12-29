import React from 'react';
import Menu from '../components/Menu';

const Inscription = () =>{
     
  const handleContinue = (e) => {
    e.preventDefault();
    // Ajoutez votre logique de continuation ici
    console.log('Continuer!');
      };
      
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
       
      <h1 className='titreinscription'>
        Inscription ConnectEdu
      </h1>

       {/* formulaire */}

       <div className="registration-container">
      <form className="registration-form" onSubmit={handleContinue}>
        <h2>Entrez les informations de l'école</h2>

        <div className="form-line">
          <div className="form-group">
            <label htmlFor="schoolName">Nom de l'école:</label>
            <input type="text" id="schoolName" name="schoolName" required />
          </div>

          <div className="form-group">
            <label htmlFor="localAddress">Adresse local:</label>
            <input type="text" id="localAddress" name="localAddress" required />
          </div>

          <div className="form-group">
            <label htmlFor="residenceCity">Ville de résidence:</label>
            <input type="text" id="residenceCity" name="residenceCity" required />
          </div>
        </div>

        <div className="form-line">
            <div className="form-group">
              <label htmlFor="creationDate">Date de création:</label>
              <input type="date" id="creationDate" name="creationDate" required />
            </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse mail:</label>
            <input type="email" id="email" name="email" required />
          </div>
        </div>

        <div className="form-line">
          <div className="form-group">
            <label htmlFor="confirmEmail">Confirmation d'adresse mail:</label>
            <input type="email" id="confirmEmail" name="confirmEmail" required />
          </div>

          <div className="form-group">
            <label htmlFor="schoolLogo">Logo de l'école:</label>
            <input type="file" id="schoolLogo" name="schoolLogo" accept="image/*" />
          </div>
        </div>

        <button type="submit">Continuer</button>

      </form>
       
      <div className="progress-bar">
          <div className="progress-step completed"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
        </div>
    </div>


    </div>
    );
};

export default Inscription;

