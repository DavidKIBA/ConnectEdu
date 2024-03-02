import React, {useState} from 'react';

const Contact = (props) => {

     const [Compteur,  setCompteur] = useState(1);

     const onChange =() => {
        setCompteur(Compteur + 1);
     }
    return (
        <div>
            <form>
               {Compteur} <button type='buton' onClick={onChange}>Augmenter</button>
            </form>
        </div>
    );
};

export default Contact;