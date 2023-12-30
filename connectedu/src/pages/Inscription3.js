import React from 'react';
import Menu from '../components/Menu';
import { useHistory } from 'react-router-dom';

const Inscription3 = () => {
    
     // aller a la pge suivante
     const continuer = useHistory();
  
     // traitement du formulaire
     const handleContinue = (e) => {
     e.preventDefault();
     continuer.push('/inscription4')
     }
 
     // retour a la page inscription2
     const precedent = useHistory();
     const Precedent = () => {
         precedent.push('/inscription2')
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
            <h2>Entrer les informations pédagogiques de l’école</h2>
    
            <div className="form-line">
                <div className="form-group1">
                    <label htmlFor="schoolLogo">Pièce d'identité:</label>
                    <select id="schoolLogo" name="schoolLogo" required>
                    <option value="carte_identite">Carte d'identité</option>
                    <option value="passeport">Passeport</option>
                    <option value="autre">Autre</option>
                    </select>
                </div>
    
                <div className="form-group1">
                    <label htmlFor="schoolLogo">Pièce d'identité:</label>
                    <select id="schoolLogo" name="schoolLogo" required>
                    <option value="carte_identite">Carte d'identité</option>
                    <option value="passeport">Passeport</option>
                    <option value="autre">Autre</option>
                    </select>
                </div>
    
                <div className="form-group1">
                    <label htmlFor="schoolLogo">Pièce d'identité:</label>
                    <select id="schoolLogo" name="schoolLogo" required>
                    <option value="carte_identite">Carte d'identité</option>
                    <option value="passeport">Passeport</option>
                    <option value="autre">Autre</option>
                    </select>
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
              <div className="progress-step"></div> 
              <div className="progress-step completed"></div>    
            </div>
        </div>
    
    
        </div>
    );
};

export default Inscription3;


