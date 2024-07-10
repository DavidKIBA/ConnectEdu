import React, { useState, useEffect } from "react";
import { message } from "antd"; // Importation de la fonction message d'Ant Design pour afficher les notifications
import { InboxOutlined } from "@ant-design/icons"; // Importation de l'icône Inbox d'Ant Design
import axios from "axios"; // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP
import { jwtDecode } from "jwt-decode"; // Importation de la fonction jwtDecode pour décoder les tokens JWT
import { Upload } from "antd"; // Importation du composant Upload d'Ant Design
const { Dragger } = Upload; // Destructuration du composant Dragger de Upload

const Uploadfiles = () => {
  // Déclaration des états pour gérer les données de la classe sélectionnée et l'état de chargement
  const [classeData, setClasseData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Effet pour charger les données de la classe sélectionnée depuis le stockage local lors du chargement initial
  useEffect(() => {
    const selectedClasseKey = localStorage.getItem("selectedClasseKey");
    if (selectedClasseKey) {
      const storedClasseData = localStorage.getItem(
        `classe_${selectedClasseKey}`
      );
      if (storedClasseData) {
        const parsedClasseData = JSON.parse(storedClasseData);
        setClasseData(parsedClasseData);
      }
    }
  }, []);

  // Fonction pour gérer le téléversement du fichier
  const handleUpload = async (file) => {
    try {
      // Récupération du token d'authentification depuis le stockage local
      const token = localStorage.getItem("access");

      // Décodage du token JWT pour obtenir des informations supplémentaires
      const decodedToken = jwtDecode(token);
      const schema_name = decodedToken.schema_name;

      // Vérification si le nom du schéma est défini et non vide dans le token
      if (!schema_name) {
        throw new Error("Schema name is missing in the token.");
      }

      // Remplacement des underscores par des tirets pour le nom du schéma
      const schema = schema_name.replace("_", "-");

      // Construction de l'URL pour envoyer les données
      const url = `http://${schema}.localhost:8000/ecole/create-eleve-excel/`;

      // Activation de l'état de chargement
      setLoading(true);

      // Création d'un objet FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append("file", file);

      // Récupération du nom de la classe pour l'ajouter dans les en-têtes de la requête
      const className = classeData.libelle;
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        niveau: className, // Le nom du champ correspondant à la classe dans la base de données
      };

      // Envoi des données au backend via une requête POST
      const response = await axios.post(url, formData, { headers });

      // Affichage d'un message de succès
      message.success(`${file.name} uploaded successfully.`);
      // Affichage de la réponse du serveur dans la console
      console.log("Upload response:", response.data);
    } catch (error) {
      // Affichage de l'erreur dans la console
      console.error("Upload failed:", error);
      // Affichage d'un message d'erreur
      message.error(`${file.name} upload failed.`);
    } finally {
      // Désactivation de l'état de chargement
      setLoading(false);
    }
  };

  // Propriétés pour la composante Dragger d'Ant Design
  const props = {
    name: "file", // Nom du champ de fichier
    multiple: false, // Désactivation de l'upload multiple
    accept:
      ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Types de fichiers acceptés
    customRequest: ({ file }) => handleUpload(file), // Utilisation de la fonction handleUpload pour gérer l'upload
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files); // Affichage des fichiers déposés dans la console
    },
  };

  // Rendu de la composante Dragger avec les propriétés spécifiées
  return (
    <Dragger {...props} disabled={loading}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text" style={{ color: "#3498DB" }}>
        Cliquez ou faites glisser le fichier vers cette zone pour le télécharger
      </p>
      <p className="ant-upload-hint" style={{ color: "white" }}>
        Prise en charge d'un téléchargement unique de fichier{" "}
        <span style={{ color: "#2ECC71" }}>Excel (xlsx)</span>. Il est
        strictement interdit de télécharger des données d'entreprise ou autres
        fichiers interdits.
      </p>
    </Dragger>
  );
};

export default Uploadfiles;
