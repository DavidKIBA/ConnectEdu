import { useState, useEffect } from "react";
import { Transfer, Button } from "antd";
import { jwtDecode } from "jwt-decode"; // Assurez-vous d'importer correctement jwtDecode
import axios from "axios";

const Niveauxprimaire = () => {
  // Fonction pour gérer les clics sur les boutons des classes
  const handleClick = (classe) => {
    const newClass = {
      libelle: classe.title,
      numero: 1,
    };

    localStorage.setItem(`classe_${classe.key}`, JSON.stringify(newClass));
    // Stocker la clé de la classe sélectionnée
    localStorage.setItem("selectedClasseKey", classe.key);

    console.log(`Clicked on button with key: ${classe.key}`);
    window.open("http://localhost:3000/classe", "_blank");
  };

  // Mock des classes
  const mockClasses = [
    {
      key: "0",
      title: "CP1",
      description: "Description de CP1",
      disabled: false,
    },
    {
      key: "1",
      title: "CP2",
      description: "Description de CP2",
      disabled: false,
    },
    {
      key: "2",
      title: "CE1",
      description: "Description de CE1",
      disabled: false,
    },
    {
      key: "3",
      title: "CE2",
      description: "Description de CE2",
      disabled: false,
    },
    {
      key: "4",
      title: "CM1",
      description: "Description de CM1",
      disabled: false,
    },
    {
      key: "5",
      title: "CM2",
      description: "Description de CM2",
      disabled: false,
    },
    // ... Ajoutez d'autres classes selon vos besoins
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

    // Récupérer le token JWT du local storage
    const token = localStorage.getItem("access");

    // Décoder le JWT pour obtenir les informations sur l'utilisateur
    const decodedToken = jwtDecode(token);

    // Extraire le schéma_name de la charge utile du JWT
    const schema_name = decodedToken.schema_name;
    const id_ecole = decodedToken.id;
    const schema = schema_name.replace("_", "-");

    if (direction === "left") {
      // Si une classe a été retirée du tableau de droite (direction === "left")
      try {
        // Récupérer les clés des classes retirées du tableau de droite
        const removedKeys = moveKeys.map(
          (key) => mockClasses.find((item) => item.key === key).key
        );

        // Supprimer les classes correspondantes de la base de données
        for (const key of removedKeys) {
          await axios.delete(
            `http://${schema}.localhost:8000/ecole/niveau/${key}`,
            {
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
        // Récupérer les clés des classes ajoutées au tableau de droite
        const addedKeys = moveKeys.map(
          (key) => mockClasses.find((item) => item.key === key).key
        );

        // Ajouter les classes correspondantes à la base de données
        for (const key of addedKeys) {
          const classe = mockClasses.find((item) => item.key === key);
          await axios.post(
            `http://${schema}.localhost:8000/ecole/niveau/`,
            {
              libelle: classe.title,
              numero: 1, // Le numéro sera toujours 1
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                niveau: classe.title,
              },
            }
          );
          // const storeClassInLocalStorage = (classe) => {
          //   const newClass = {
          //     libelle: classe.title,
          //     numero: 1,
          //   };

          //   localStorage.setItem(
          //     `classe_${classe.key}`,
          //     JSON.stringify(newClass)
          //   );
          // };
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
            onClick={() => handleClick(classe)}
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

export default Niveauxprimaire;
