import { Alert, Flex, Table, Tabs, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FilePdfOutlined, FileWordOutlined, FileExcelOutlined } from "@ant-design/icons";
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
                style={{ color: "red", fontSize: "30px" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/CARTA%20CCI.pdf", "_blank");

                }}
              />
            </Tooltip>

            <Tooltip title="FORMATO 07 DECLARACION JURADA">
              <FilePdfOutlined
                style={{ color: "red", fontSize: "30px" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO%2007.pdf", "_blank");

                }}
              />  </Tooltip>

            <Tooltip title="FORMATO 05">
              <FilePdfOutlined
                style={{ color: "red", fontSize: "30px" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO%2005.pdf", "_blank");

                }}
              />  </Tooltip>


            <Tooltip title="FORMATO N° 06 PROPUESTA ECONOMICA">
              <FileWordOutlined style={{ color: "blue", fontSize: "30px" }}
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
                style={{ color: "red", fontSize: "30px" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/CARTA%20CCI.pdf", "_blank");

                }}
              />
            </Tooltip>

            <Tooltip title="DECLARACION JURADA - FORMATOS PARA PROVEEDORES">
              <FilePdfOutlined
                style={{ color: "red", fontSize: "30px" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/DECLACION%20JURADA%20-%20FORMATOS%20PARA%20PROVEEDORES.pdf", "_blank");

                }}
              />  </Tooltip>

            <Tooltip title="DECLARACIÓN JURADA PARENTESCO NEPOTISMO">
              <FilePdfOutlined
                style={{ color: "red", fontSize: "30px" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/DECLARACION%20JURADA%20PARENTESCO%20NEPOTISMO.pdf", "_blank");

                }}
              />  </Tooltip>


            <Tooltip title="FORMATO DE COTIZACIÓN DE SERVICIOS">
              <FileExcelOutlined style={{ color: "green", fontSize: "30px" }}
                onClick={() => {
                  window.open("http://10.30.1.46:8086/uploads/FORMATO%20DE%20COTIZACION%20DE%20SERVICIOS.xlsx", "_blank");

                }} />

            </Tooltip>
            <Tooltip title="FORMATO DE DECLARACION JURADA INCOMPATIBILIDADES">
              <FilePdfOutlined style={{ color: "red", fontSize: "30px" }}
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
      <Header style={{ backgroundColor: "#4DA362", display: "flex", justifyContent: "space-between", color: "white" }}>
        <section></section>
        <section style={{ fontWeight: "bold" }}>COTIZACIÓN DE BIENES Y SERVICIOS</section>
        <section></section>

      </Header>
      <div style={{ padding: "35px" }}>

        <Alert message=
          {
            <strong>
              NOTA
            </strong>
          }
          description="Las cotizaciones deben provenir de proveedores cuya actividad principal y/o estan directamente relacionadas con el objeto de contratación." type="info" showIcon style={{ marginTop: "10px" }} />
        <Alert
          message=
          {
            <strong>
              NOTA: LA OMISIÓN DE PRESENTACIÓN DE DOCUMENTACIÓN OBLIGATORIA SEÑALADA EN LA DIRECTIVA 002-2023-GRA, SERA CAUSAL PARA NO DAR LA ORDEN DE COMPRA/SERVICIO
            </strong>
          }
          description={
            <>
              1. Una vez notificada la Orden de Compra/Servicio debera ser confirmada en forma inmediata para su atención correspondiente y en los plazos establecidos.
              <br />
              2. La entrega de los bienes se realizara después de confirmada la Orden de Compra/Servicio, la Factura y Guía deberán deberan consignar fecha posterior a la confirmación.
              <br />
              3. El plazo de entrega sera computado desde el día siguientede confirmada la Orden de Compra/Servicio, para efectos de cobro de penalidad.
              <br />
              4. La penalidad se aplicara de acuerdo a lo establecido en la Directiva N° 002-2023-GRA/OPDI (10% del monto total de la Orden de Compra/Servicio)
              <br />
              5. Se aplicara penalidad al monto total de la Orden de Compra/Servicio, en caso de la cancelación de esta.
            </>
          }
          type="error"
          showIcon
          style={{ marginTop: "10px" }}
        />      <Alert
          message=
          {
            <strong>
              PRESENTACIÓN DE PROPUESTAS Y PLAZOS
            </strong>
          }


          description={
            <>
              1. Por correo electrónico: <strong>servicios@pems.pe</strong> 
              <br />
              2. En el asunto del correo se deberá colocar el numero de solicitud, la fecha limite de presentación de procesos via correo electrónico es de 2 diás hábiles.
            </>
          }
          type="warning"
          showIcon
          style={{ marginTop: "10px" }}
        />
      </div>
      <div style={{ padding: "35px" }}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  );
}

export default App;
