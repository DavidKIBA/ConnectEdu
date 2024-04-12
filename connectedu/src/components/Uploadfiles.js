import React, { Dragger} from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Uploadfiles = () => {
  // Récupérer le token JWT du localStorage
  const token = localStorage.getItem('access');
  
  // Décoder le token JWT pour obtenir les informations de l'utilisateur
  const decodedToken = jwtDecode(token);
  const schema_name = decodedToken.schema_name
  
  const props = {
    name: 'file', // nom du fichier à envoyer au serveur
    multiple: false,
    accept: '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // n'accepte que des fichiers Excel
    action: `http://${schema_name}.192.168.1.3:8000/ecole/v1/eleve-create/ `, // l'URL du backend où le fichier sera stocké
    headers: {
      Authorization: `Bearer ${token}` // Ajouter le token JWT dans l'en-tête Authorization
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }  
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) { 
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text" style={{color:"#3498DB"}}>Cliquez ou faites glisser le fichier vers cette zone pour le télécharger</p>
      <p className="ant-upload-hint" style={{color:"white"}}>
        Prise en charge d'un téléchargement unique de fichier <span style={{color:"#2ECC71"}}>Excel (xlsx) </span>. Il est strictement interdit de télécharger des données d'entreprise ou autres fichiers interdits.
      </p>
    </Dragger>
  );
};

export default Uploadfiles;
