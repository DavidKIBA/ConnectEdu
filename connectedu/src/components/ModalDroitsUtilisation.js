import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalDroitsUtilisation = ({ visible, onClose }) => {
    // Votre contenu du modal ici
  
    return (
      <Modal
        title="Droits d'Utilisation"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="fermer" onClick={onClose}>
            Fermer
          </Button>,
        ]}
      >
        {/* Votre contenu du modal ici */}
      </Modal>
    );
  };
  
  export default ModalDroitsUtilisation;
  