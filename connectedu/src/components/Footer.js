import React from 'react';


const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique d'inscription à la newsletter
        console.log('Inscription à la newsletter');
      };
    
      return (
        <div className='main'>
        <footer className='footer'>
          <div className="newsletter">
            <h3>Inscrivez-vous à notre newsletter</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Adresse e-mail :</label>
              <input type="email" id="email" name="email" required />
              <div className="terms">
              <input type="checkbox" id="terms" name="terms" />
               <label htmlFor="terms">J'accepte les termes et conditions</label>
          </div>
    
              <button type="submit">S'inscrire</button>
            </form>
          </div>
    
          
          <div className="info">
            <p>Adresse : 123 Rue de l'Exemple, Ville</p>
            <p>Téléphone : (123) 456-7890</p>
            <p>Email : info@connectedu.com</p>
          </div>
           
          <div className="links">
            <p><a href="/">Accueil</a></p>
            <p> <a href="/services">A propos</a></p>
            <p><a href="/contact">Inscription</a></p>
            <p><a href="/contact">Connexion</a></p>
            <p><a href="/contact">Dashboard</a></p>
          </div>
          
          
          
        </footer>

        <div className="copyright">
            <p>&copy; 2024 Dave Procode. Tous droits réservés.</p>
          </div>
          
        </div>
  );
};

export default Footer;
