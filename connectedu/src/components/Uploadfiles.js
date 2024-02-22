import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
  name: 'file', // nom du fichier a envoyer au server
  multiple: true,
  accept: '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // n'accepte que des fichiers excel
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', // l'endroit ou sera stoquer le fichier
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
const Uploadfiles = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text" style={{color:"#3498DB"}}>Cliquez ou faites glisser le fichier vers cette zone pour le télécharger</p>
    <p className="ant-upload-hint" style={{color:"white"}}>
    Prise en charge d'un téléchargement unique de fichier <span style={{color:"#2ECC71"}}>Excel (xlsx) </span>. Il est strictement interdit de télécharger des données d'entreprise ou autres
       fichiers interdits.
    </p>
  </Dragger>
);
export default Uploadfiles;