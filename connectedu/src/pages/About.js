import React from "react";
import { useState } from "react";

const About = () => {
  const liste = {
    Id: 2,
    nom: "KIBA",
    prenom: "David",
  };
  const [tab, setTab] = useState([1, 2, 3, 4]);

  const ajout = (setTab) => {
    setTab(tab.map((tab) => tab + 2));
  };

  return (
    <div>
      A propos de nous
      <div>
        <Deuxieme info={liste.nom} />
        {setTab}
      </div>
      <button onClick={ajout}>Ajouter</button>
    </div>
  );
};
// deuxieme composant
const Deuxieme = ({ info }) => {
  return (
    <div>
      <h2>Voici vos infos:</h2>
      {info}
    </div>
  );
};

export default About;
