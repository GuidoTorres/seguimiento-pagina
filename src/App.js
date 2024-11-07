import { Flex, Table, Tabs, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FilePdfOutlined, FileWordOutlined,FileExcelOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import autodema from "./assets/autodema.png"
import dayjs from "dayjs";

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
      title: "NOMBRE",
      render: (_, record) => (
        <p>
          COTIZACIÓN N° {record.correlativo} - {dayjs().format("YYYY")}
        </p>
      ), align: "center",
    },
    {
      title: "DESCRIPCIÓN",
      dataIndex: "glosa",
      align: "center",
    },
    {
      title: "OFICINA",
      dataIndex: "nombreDependencia",
      align: "center",
    },
    {
      title: "FECHA",
      dataIndex: "fecha",
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
        <>
          <Flex gap={"20px"} justify="center" align="center">
            <p>ANEXOS: </p>

            <Tooltip title="CARTA CCI">
              <FilePdfOutlined
                style={{ color: "red" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/CARTA%20CCI.pdf", "_blank");

                }}
              />
            </Tooltip>

            <Tooltip title="FORMATO 07 DECLARACION JURADA">
              <FilePdfOutlined
                style={{ color: "red" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO%2007.pdf", "_blank");

                }}
              />  </Tooltip>

            <Tooltip title="FORMATO 05">
              <FilePdfOutlined
                style={{ color: "red" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO%2005.pdf", "_blank");

                }}
              />  </Tooltip>


            <Tooltip title="FORMATO N° 06 PROPUESTA ECONOMICA">
              <FileWordOutlined style={{ color: "blue" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO%20N%C2%B0%2006%20PROPUESTA%20ECONOMICA.docx", "_blank");

                }} />

            </Tooltip>

          </Flex>
          <Table
            columns={columns}
            dataSource={bienes?.map((item, index) => ({
              ...item,
              key: item.id || index,
            }))}
          />
        </>
      </div>,
    },
    {
      key: '2',
      label: 'Servicios',
      children: <div style={{ marginTop: "20px", padding: "35px" }}>
        <>
          <Flex gap={"20px"} justify="center" align="center">
            <p>ANEXOS: </p>

            <Tooltip title="CARTA CCI">
              <FilePdfOutlined
                style={{ color: "red" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/CARTA%20CCI.pdf", "_blank");

                }}
              />
            </Tooltip>

            <Tooltip title="DECLARACION JURADA - FORMATOS PARA PROVEEDORES">
              <FilePdfOutlined
                style={{ color: "red" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/DECLACION%20JURADA%20-%20FORMATOS%20PARA%20PROVEEDORES.pdf.pdf", "_blank");

                }}
              />  </Tooltip>

            <Tooltip title="DECLARACIÓN JURADA PARENTESCO NEPOTISMO">
              <FilePdfOutlined
                style={{ color: "red" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/DECLARACION%20JURADA%20PARENTESCO%20NEPOTISMO.pdf", "_blank");

                }}
              />  </Tooltip>


            <Tooltip title="FORMATO DE COTIZACIÓN DE SERVICIOS">
              <FileExcelOutlined style={{ color: "green" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO%20DE%20COTIZACION%20DE%20SERVICIOS.xlsx", "_blank");

                }} />

            </Tooltip>
            <Tooltip title="FORMATO DE DECLARACION JURADA INCOMPATIBILIDADES">
              <FilePdfOutlined style={{ color: "red" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO-DE-DECLARACI%C3%93N-JURADA-INCOMPATIBILIDADES.pdf", "_blank");

                }} />

            </Tooltip>
          </Flex>
          <Table
            columns={columns}
            dataSource={servicios?.map((item, index) => ({
              ...item,
              key: item.id || index,
            }))}
          />
        </>
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
        <section><img src={autodema} style={{ width: "200px", height: "40px", marginTop: "10px" }} /></section>
        <section style={{ fontWeight: "bold" }}>COTIZACIÓN DE BIENES Y SERVICIOS</section>
        <section></section>

      </Header>
      <div style={{ padding: "35px" }}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  );
}

export default App;
