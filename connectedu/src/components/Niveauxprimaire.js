import React, { useState } from 'react';
import { Switch, Transfer, Button, Typography } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

const mockClasses = [
  { key: '0', title: 'CP1', description: 'Description de CP1', disabled: false },
  { key: '1', title: 'CP2', description: 'Description de CP2', disabled: false },
  { key: '2', title: 'CE1', description: 'Description de CE1', disabled: false },
  { key: '3', title: 'CE2', description: 'Description de CE2', disabled: false },
  { key: '4', title: 'CM1', description: 'Description de CM1', disabled: false },
  { key: '5', title: 'CM2', description: 'Description de CM2', disabled: false },
  // ... Ajoutez d'autres classes selon vos besoin
];

const oriTargetKeys = mockClasses.filter((classe) => !classe.disabled).map((classe) => classe.key);

const Niveauxprimaire = () => {
  const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  const handleClick = (classe) => {
    console.log(`Clicked on button with key: ${classe.key}`);
    // Créer une variable de type tableau avec un nom dynamique
    const dynamicArrayName = `array_${classe.key}`;
    const dynamicArray = [/* Mettez vos données ici si nécessaire */];
    // Stocker ou traiter la variable de tableau comme nécessaire
    console.log(`${dynamicArrayName}: `, dynamicArray);
    history.push(`./autre-page/${classe.key}`);
  };

  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    console.log('targetKeys: ', newTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  const handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  const handleDisable = (checked) => {
    setDisabled(checked);
  };

  return (
    <>
      
      <br></br>
      <Transfer
        dataSource={mockClasses}
        titles={['Primaire', 'Classes sélectionnées']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onScroll={handleScroll}
        render={(classe) => (
          <Button type="primary" onClick={() => handleClick(classe)}>
            {classe.title}
          </Button>
        )}
        disabled={disabled}
        oneWay
        style={{
          marginBottom: 16,
        }}
      />
    </>
  );
};

export default Niveauxprimaire;
