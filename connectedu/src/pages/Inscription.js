import React from "react";
import Menu from "../components/Menu1";
import { useHistory } from "react-router-dom";
import { Typography, message } from "antd";
import axios from "axios";
import { useState } from "react";

const { Title } = Typography;

const Inscription = () => {
  const continuer = useHistory();

  const [formData, setFormData] = useState({
    nom: "",
    adresse: "",
    ville_residence: "",
    date_creation: "",
    telephone_1: "",
    telephone_2: "",
    email_ecole: "",
    logo: null,
    nom_responsable: "",
    prenom_responsable: "",
    email_responsable: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      logo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "http://localhost:8000/ecole/inscription/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        message.success("Inscription réussie:", response.data);
        continuer.push("/connexion");
      } else {
        message.error("Echec de l'inscription:", response.data);
      }
    } catch (error) {
      alert("Erreur", error);
    }
  };

  return (
    <div className="inscription-container">
      <img
        className="background-image"
        src={process.env.PUBLIC_URL + "/images/connexionimage.jpg"}
        alt="Accueil"
      />

      <Menu />
      <Title
        level={2}
        style={{
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        Inscription ConnectEdu
      </Title>

      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>
          Entrez les informations de l'école
        </h2>
        <div className="col">
          {/* colonne 1 */}
          <div className="col1">
            <div className="form-group">
              <label htmlFor="nom" className="label">
                Nom de l'école:
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nom_responsable" className="label">
                Nom du responsable:
              </label>
              <input
                type="text"
                id="nom_responsable"
                name="nom_responsable"
                value={formData.nom_responsable}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom_responsable" className="label">
                Prenom du responsable:
              </label>
              <input
                type="text"
                id="prenom_responsable"
                name="prenom_responsable"
                value={formData.prenom_responsable}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_responsable" className="label">
                Adresse mail du responsable:
              </label>
              <input
                type="email"
                id="email_responsable"
                name="email_responsable"
                value={formData.email_responsable}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* fin colonne 1 */}

          {/* collonne 2 */}
          <div className="col1">
            <div className="form-group">
              <label htmlFor="adresse_ecole" className="label">
                Adresse locale:
              </label>
              <input
                type="text"
                id="adresse_ecole"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ville_residence" className="label">
                Ville de résidence:
              </label>
              <input
                type="text"
                id="ville_residence"
                name="ville_residence"
                value={formData.ville_residence}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date_creation" className="label">
                Date de création :
              </label>
              <input
                type="date"
                id="date_creation"
                name="date_creation"
                value={formData.date_creation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone_1" className="label">
                Numéro de téléphone 1:
              </label>
              <input
                type="text"
                id="telephone_1"
                name="telephone_1"
                value={formData.telephone_1}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* fin collonne 2 */}

          {/* colonne 3 */}
          <div className="col1">
            <div className="form-group">
              <label htmlFor="telephone_2" className="label">
                Numéro de téléphone 2:
              </label>
              <input
                type="text"
                id="telephone_2"
                name="telephone_2"
                value={formData.telephone_2}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_ecole" className="label">
                Adresse mail:
              </label>
              <input
                type="email"
                id="email_ecole"
                name="email_ecole"
                value={formData.email_ecole}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo_ecole" className="label">
                Logo de l'école:
              </label>
              <input
                type="file"
                id="logo_ecole"
                name="logo"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button type="submit">Continuer</button>
          </div>
        </div>
        {/* fin collonne 3 */}
      </form>
    </div>
  );
};

export default Inscription;
