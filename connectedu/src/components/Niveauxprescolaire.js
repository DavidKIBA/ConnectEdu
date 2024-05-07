import { useState, useEffect } from "react";
import { Transfer, Button } from "antd";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Niveauxprescolaire = () => {
  // Mock des classes
  const mockClasses = [
    {
      key: "0",
      title: "garderie",
      description: "Description de garderie",
      disabled: false,
    },
    {
      key: "1",
      title: "P1",
      description: "Description de P1",
      disabled: false,
    },
    {
      key: "2",
      title: "P2",
      description: "Description de P2",
      disabled: false,
    },
    {
      key: "3",
      title: "P3",
      description: "Description de P3",
      disabled: false,
    },
    // ... Ajoutez d'autres classes selon vos besoin
  ];

  // État pour les clés cibles, les clés sélectionnées et l'état de désactivation
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // Gestionnaire de changement pour les transferts
  const handleChange = async (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    console.log("targetKeys: ", newTargetKeys);
    console.log("direction: ", direction);
    console.log("moveKeys: ", moveKeys);

    // Si une classe a été retirée du tableau de droite (direction === "left")
    if (direction === "left") {
      try {
        // Récupérer le token JWT du local storage
        const token = localStorage.getItem("access");

        // Décoder le JWT pour obtenir les informations sur l'utilisateur
        const decodedToken = jwtDecode(token);

        // Extraire le schéma_name de la charge utile du JWT
        const schema_name = decodedToken.schema_name;
        console.log("Schema Name:", schema_name);

        // Récupérer les clés des classes retirées du tableau de droite
        const removedKeys = moveKeys.map(
          (key) => mockClasses.find((item) => item.key === key).key
        );

        // Supprimer les classes correspondantes de la base de données
        for (const key of removedKeys) {
          await axios.delete(
            `http://${schema_name}.192.168.1.3:8000/ecole/niveau/${key}`,
            {
              // Inclure le token JWT dans l'en-tête Authorization de la requête
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // Afficher un message pour confirmer la suppression
        console.log("Classes supprimées:", removedKeys);
      } catch (error) {
        // En cas d'erreur, afficher le message d'erreur
        console.error("Erreur lors de la suppression des classes:", error);
      }
    } else if (direction === "right") {
      // Si une classe a été ajoutée au tableau de droite (direction === "right")
      try {
        // Récupérer le token JWT du local storage
        const token = localStorage.getItem("access");

        // Décoder le JWT pour obtenir les informations sur l'utilisateur
        const decodedToken = jwtDecode(token);

        // Extraire le schéma_name de la charge utile du JWT
        const schema_name = decodedToken.schema_name;
        console.log("Schema Name:", schema_name);

        // Récupérer les clés des classes ajoutées au tableau de droite
        const addedKeys = moveKeys.map(
          (key) => mockClasses.find((item) => item.key === key).key
        );

        // Ajouter les classes correspondantes à la base de données
        for (const key of addedKeys) {
          const classe = mockClasses.find((item) => item.key === key);
          await axios.post(
            `http://${schema_name}.192.168.1.3:8000/ecole/niveau/`,
            {
              libelle: classe.title,
              numero: classe.key,
            },
            {
              // Inclure le token JWT dans l'en-tête Authorization de la requête
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // Afficher un message pour confirmer l'ajout
        console.log("Classes ajoutées:", addedKeys);
      } catch (error) {
        // En cas d'erreur, afficher le message d'erreur
        console.error("Erreur lors de l'ajout des classes:", error);
      }
    }
  };

  // Gestionnaire de changement pour la sélection
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    console.log("sourceSelectedKeys: ", sourceSelectedKeys);
    console.log("targetSelectedKeys: ", targetSelectedKeys);
  };

  // Gestionnaire de scroll
  const handleScroll = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  return (
    <>
      <br />
      <Transfer
        dataSource={mockClasses}
        titles={["Prescolaires", "Classes sélectionnées"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onScroll={handleScroll}
        render={(classe) => (
          <Button
            type={targetKeys.includes(classe.key) ? "primary" : "default"}
            style={{ marginBottom: 8 }}
          >
            {classe.title}
          </Button>
        )}
        disabled={disabled}
        oneWay
        style={{ marginBottom: 16 }}
      />
    </>
  );
};

export default Niveauxprescolaire;
