import React from 'react';


const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique d'inscription à la newsletter
        console.log('Inscription à la newsletter');
      };
    
      return (
        <footer>
          <div className="newsletter">
            <h3>Inscrivez-vous à notre newsletter</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Adresse e-mail :</label>
              <input type="email" id="email" name="email" required />
              <button type="submit">S'inscrire</button>
            </form>
          </div>
    
          <div className="terms">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">J'accepte les termes et conditions</label>
          </div>
    
          <div className="info">
            <p>Adresse : 123 Rue de l'Exemple, Ville</p>
            <p>Téléphone : (123) 456-7890</p>
            <p>Email : info@example.com</p>
          </div>
    
          <div className="links">
            <a href="/">Accueil</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
          </div>
    
          <div className="copyright">
            <p>&copy; 2023 Nom de l'entreprise. Tous droits réservés.</p>
          </div>
        </footer>
  );
};

export default Footer;
