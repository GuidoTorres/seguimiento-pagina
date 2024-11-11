import React, { useEffect, useState } from "react";
import { Flex, Menu } from "antd";
import {
  ShoppingOutlined,
  ContactsOutlined,
  HomeOutlined
} from "@ant-design/icons";
import "./styles/sidebar.css";
import imagen from "../assets/autodema.png";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const items = [
      {
        key: "/pagina/inicio",
        icon: <HomeOutlined />,
        label: "Inicio",
      },
      {
        key: "/pagina/bienes",
        icon: <ShoppingOutlined />,
        label: "Bienes",
      },
      {
        key: "/pagina/servicios",
        icon: <ContactsOutlined />,
        label: "Servicios",
      }
    ];
    setMenuItems(items);
  }, []);

  const handleMenuClick = (e) => {
    console.log(e.key);
    
    navigate(e.key);
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
        selectedKeys={[location.pathname]}
        className="menu-bar"
        items={menuItems}
        onClick={handleMenuClick}
        style={{ backgroundColor: "#4f6f52", color: "white", marginTop: "50px" }}
      />
    </>
  );
};

export default Sidebar;
