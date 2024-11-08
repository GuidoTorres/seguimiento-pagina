import React, { useEffect, useState } from "react";
import { Flex, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import "./styles/sidebar.css";
import imagen from "../assets/autodema.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState("/"); // Inicializa la clave seleccionada
  const [menuItems, setMenuItems] = useState([]);

  // Recuperar la información del localStorage
  useEffect(() => {
    const items = [];
    items.push({
      key: "/inicio",
      icon: <FileTextOutlined />,
      label: "Inicio",
    });
    items.push({
      key: "/bienes",
      icon: <UserOutlined />,
      label: "Bienes",
    });

    items.push({
      key: "/servicios",
      icon: <LaptopOutlined />,
      label: "Servicios",
    });

    setMenuItems(items);
  }, []);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Cambia la clave seleccionada
    navigate(e.key)
  };

  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <img src={imagen} alt="autodema" width={"80%"} height={"90%"} style={{ color: "white" }} />
        </div>
      </Flex>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        className="menu-bar"
        items={menuItems} // Renderiza solo los ítems permitidos
        onClick={handleMenuClick}
        style={{ backgroundColor: "#4f6f52", color: "white", marginTop:"50px" }}
      />


    </>
  );
};

export default Sidebar;
