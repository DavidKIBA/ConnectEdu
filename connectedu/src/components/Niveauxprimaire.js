import { useState } from "react";
import { Transfer, Button } from "antd";

const mockClasses = [
  {
    key: "1",
    title: "CP1",
    description: "Description de CP1",
    disabled: false,
  },
  {
    key: "2",
    title: "CP2",
    description: "Description de CP2",
    disabled: false,
  },
  {
    key: "3",
    title: "CE1",
    description: "Description de CE1",
    disabled: false,
  },
  {
    key: "4",
    title: "CE2",
    description: "Description de CE2",
    disabled: false,
  },
  {
    key: "5",
    title: "CM1",
    description: "Description de CM1",
    disabled: false,
  },
  {
    key: "6",
    title: "CM2",
    description: "Description de CM2",
    disabled: false,
  },
  // ... Ajoutez d'autres classes selon vos besoin
];

const Niveauxprimaire = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    console.log("targetKeys: ", newTargetKeys);
    console.log("direction: ", direction);
    console.log("moveKeys: ", moveKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    console.log("sourceSelectedKeys: ", sourceSelectedKeys);
    console.log("targetSelectedKeys: ", targetSelectedKeys);
  };

  const handleScroll = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  const handleClick = (classe) => {
    console.log(`Clicked on button with key: ${classe.key}`);
    window.open("http://localhost:3000/classe", "_blank");
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
          <Button type="primary" onClick={() => handleClick(classe)}>
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
