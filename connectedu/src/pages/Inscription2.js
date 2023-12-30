import React from 'react';
import Menu from '../components/Menu';
import { useHistory } from 'react-router-dom';

const Inscription2 = () => {
    
      // aller a la pge suivante
    const continuer = useHistory();
 
    // traitement du formulaire
    const handleContinue = (e) => {
    e.preventDefault();
    continuer.push('/inscription3')
    }

    // retour a la page inscription
    const precedent = useHistory();
    const Precedent = () => {
        precedent.push('/inscription')
         }
          
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
            <h2>Entrer les informations du responsable de de  l’école</h2>
    
            <div className="form-line">
              <div className="form-group">
                <label htmlFor="schoolName">Nom du responsable:</label>
                <input type="text" id="respName" name="respName" required />
              </div>
    
              <div className="form-group">
                <label htmlFor="localAddress">Adresse:</label>
                <input type="text" id="respAddress" name="respAddress" required />
              </div>
    
              <div className="form-group">
                <label htmlFor="residenceCity">Ville de résidence:</label>
                <input type="text" id="residenceCity" name="residenceCity" required />
              </div>
            </div>
    
            <div className="form-line">
    
              <div className="form-group">
                <label htmlFor="phoneNumber">Numéro de téléphone:</label>
                <input type="number" id="respPhone" name="respPhone" required />
              </div>
    
              <div className="form-group">
                <label htmlFor="email">Adresse mail:</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe:</label>
                <input type="password" id="respPassword" name="respPassword" required />
              </div>
            </div>
    
            <div className="form-line">
               <div className="form-group">
                <label htmlFor="password">Confirmation de mot de passe:</label>
                <input type="password" id="respConfPassword" name="respConfPassword" required />
              </div>
    
              <div className="form-group">
                <label htmlFor="schoolLogo">Pièce d'identité:</label>
                <input type="file" id="schoolLogo" name="schoolLogo" accept="image/*,application/pdf" />
              </div>
            </div>
        
        {/* boutons continuer et precedent */}

            <div className="button-container">
                <button type="submit" onClick={Precedent}>Précédent</button>
                <button type="submit" >Continuer</button>    
            </div>
    
          </form>
           
        {/* barres de progression */}
          <div className="progress-bar">
              <div className="progress-step"></div>
              <div className="progress-step completed"></div>
              <div className="progress-step"></div>     
            </div>
        </div>
    
    
        </div>
    );
};

export default Inscription2;