import React, { useState } from "react";
import { message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Upload } from "antd";
const { Dragger } = Upload;

const Uploadfiles = () => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    try {
      const token = localStorage.getItem("access");
      const decodedToken = jwtDecode(token);
      const schema_name = decodedToken.schema_name;

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `http://${schema_name}.192.168.1.3:8000/ecole/v1/eleve-create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success(`${file.name} uploaded successfully.`);
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      message.error(`${file.name} upload failed.`);
    } finally {
      setLoading(false);
    }
  };

  const props = {
    name: "file",
    multiple: false,
    accept:
      ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    customRequest: ({ file }) => handleUpload(file),
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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
