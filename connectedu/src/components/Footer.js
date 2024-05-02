import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const Footer = () => {
  // inscription a la news letter
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.1.3:8000/contact/news-letters/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );
      if (response.ok) {
        message.success("Inscription à la newsletter réussie !");
      } else {
        const data = await response.json();
        message.error(
          data.message || "Erreur lors de l'inscription à la newsletter"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête API:", error);
      message.error("Une erreur s'est produite, veuillez réessayer.");
    }
    setLoading(false);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Inscription à la newsletter");
  // };

  return (
    <div className="main">
      <footer className="footer">
        <div className="newsletter">
          <h3 style={{ color: "white" }}>Inscrivez-vous à notre newsletter</h3>
          <form onFinish={onFinish}>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre adresse e-mail !",
                },
                {
                  type: "email",
                  message: "Veuillez saisir une adresse e-mail valide !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <div className="terms">
              <input type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms">J'accepte les termes et conditions</label>
            </div>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                S'inscrire
              </Button>
            </Form.Item>
          </form>
        </div>

        <div className="info" style={{ color: "white" }}>
          <p>Adresse : 123 Rue de l'Exemple, Ville</p>
          <p>Téléphone : (123) 456-7890</p>
          <p>Email : info@connectedu.com</p>
        </div>

        <div className="links">
          <p>
            <a href="/">Accueil</a>
          </p>
          <p>
            <a href="/services">A propos</a>
          </p>
          <p>
            <a href="/contact">Inscription</a>
          </p>
          <p>
            <a href="/contact">Connexion</a>
          </p>
          <p>
            <a href="/contact">Dashboard</a>
          </p>
        </div>
      </footer>

      <div className="copyright">
        <p>&copy; 2024 ConnectEdu. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default Footer;
