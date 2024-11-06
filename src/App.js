import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { FilePdfOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import autodema from "./assets/autodema.png"
function App() {
  const [bienes, setBienes] = useState([])
  const [servicios, setServicios] = useState([])

  useEffect(() => {

    getBienes();
    getServicios()
  }, []);
  const getBienes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/cotizaciones/completada?tipo=B`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const info = await response.json();

    if (info) {
      setBienes(info);
    }
  };
  const getServicios = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/cotizaciones/completada?tipo=S`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const info = await response.json();

    if (info) {
      setServicios(info);
    }
  };

  const columns = [
    {
      title: "COD",
      dataIndex: "secSolMod",
      align: "center",
    },
    {
      title: "SBN",
      dataIndex: "sbn",
      align: "center",
    },
    {
      title: "GLOSA",
      dataIndex: "glosa",
      align: "center",
    },
    {
      title: "SERVICIO",
      dataIndex: "nombreItem",
      align: "center",
    },
    {
      title: "DEPENDENCIA",
      dataIndex: "nombreDependencia",
      align: "center",
    },
    {
      title: "PDF",
      render: (_, record) => (
        <div>
          <FilePdfOutlined
            style={{ color: record.pdf ? "red" : "grey", cursor: "pointer" }}
            onClick={() => {
              if (record.pdf) {
                window.open(record.pdf, "_blank");
              } else {
                alert("No hay PDF disponible para este registro.");
              }
            }}
          />
        </div>
      ),
      key: "action",
      align: "center",
    },

  ];

  const items = [
    {
      key: '1',
      label: 'Bienes',
      children: <div style={{ marginTop: "20px", padding: "35px" }}>
        <Table
          columns={columns}
          dataSource={bienes?.map((item, index) => ({
            ...item,
            key: item.id || index,
          }))}
        />
      </div>,
    },
    {
      key: '2',
      label: 'Servicios',
      children: <div style={{ marginTop: "20px", padding: "35px" }}>
        <Table
          columns={columns}
          dataSource={servicios?.map((item, index) => ({
            ...item,
            key: item.id || index,
          }))}
        />
      </div>,
    },

  ];
  // const onChange = (key) => {
  //   if (key === 1) {
  //     getBienes()
  //   } else {
  //     getServicios()
  //   }
  // };

  return (
    <>
      <Header style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between", color: "black" }}>
        <section><img src={autodema} style={{ width: "200px", height: "40px", marginTop:"10px" }} /></section>
        <section style={{fontWeight:"bold"}}>COTIZACIÓN DE BIENES Y SERVICIOS</section>
        <section></section>

      </Header>
      <div style={{ padding: "35px" }}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  );
}

export default App;
