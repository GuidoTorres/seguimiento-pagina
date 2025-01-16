import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FilePdfOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Alert, Flex, Tooltip, Table, Input } from "antd";
import "./styles/bienes.css";
const Servicios = ({ setTitle }) => {
  const [servicios, setServicios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [filteredData, setFilteredData] = useState(servicios);

  useEffect(() => {
    setTitle("Servicios");
    getServicios();
  }, []);

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
      setFilteredData(info);
    }
  };

  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>REQUERIMIENTO</div>,
      render: (_, record) => {
        const correlativoStr = String(record.correlativo); // Convertir a string
        const correlativoConCeros = correlativoStr.padStart(4, "0"); // Rellenar con ceros hasta 4 dígitos

        return (
          <p style={{ textAlign: "center" }}>
            {" "}
            {/* Centrar el texto */}
            N° {correlativoConCeros} - {dayjs().format("YYYY")}
          </p>
        );
      },
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>PEDIDO</div>,
      dataIndex: "secSolMod",
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>DESCRIPCIÓN</div>,
      dataIndex: "glosa",
      align: "left",
    },
    {
      title: <div style={{ textAlign: "center" }}>OFICINA</div>,
      dataIndex: "nombreDependencia",
      align: "left",
    },
    {
      title: <div style={{ textAlign: "center" }}>PUBLICACIÓN</div>,
      dataIndex: "fecha",
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>VENCIMIENTO</div>,
      dataIndex: "fecha_vencimiento",
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>TÉRMINOS DE REFERENCIA</div>,
      render: (_, record) =>
        record?.terminado ? (
          <p style={{ color: "red" }}>FINALIZADO</p>
        ) : (
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filterData = servicios.filter(
      (item) =>
        item?.glosa?.toLowerCase()?.includes(value.toLowerCase()) ||
        (item?.secSolMod && item.secSolMod === parseInt(value))
    );

    setFilteredData(filterData);
  };

  return (
    <div className="bienes">
      <>
        <div className="bienes-alert">
          <Alert
            message={<strong >ANEXOS:</strong>}
            description={
              <Flex gap={"20px"} justify="center" align="center" style={{marginTop:"20px"}}>
                <Tooltip title="FORMATO Y ANEXOS DE COTIZACIÓN SERVICIOS">
                  <FilePdfOutlined
                    style={{ color: "red", fontSize: "50px" }}
                    onClick={() => {
                      window.open(
                        "https://requerimientos.pems.pe/uploads/FORMATO-Y-ANEXOS-DE-COTIZACION-SERVICIOS.pdf",
                        "_blank"
                      );
                    }}
                  />
                </Tooltip>
              </Flex>
            }
            type="info"
            showIcon
          />
          <Alert
            message={<strong>PRESENTACIÓN DE PROPUESTAS Y PLAZOS</strong>}
            description={
              <>
                1. Por correo electrónico:{" "}
                <strong>
                  servicios@pems.pe o Trámite Documentario de la entidad.
                </strong>
                  Horario de recepción desde 8:00 A.M. Hasta 16:00 P.M.
                <br />
                2. En el asunto del correo se deberá colocar el número de
                solicitud (ejemplo: REMITO COTIZACION DEL PEDIDO NRO 0001-2025)
                <br />
                3.{" "}
                <strong>
                  Las propuestas deberán presentarse en formato PDF (único
                  archivo)
                </strong>
                , adjuntando la siguiente información: Ficha Ruc, constancia de
                RNP, suspensión de 4ta categoría (en caso corresponda), demás
                documentación que cumpla los Términos de Referencia, caso
                contrario su propuesta será no admitida.
              </>
            }
            type="warning"
            showIcon
          />
        </div>

        <Input
          onChange={(e) => handleSearch(e)}
          placeholder="Buscar por descripción o solicitud"
          className="bienes-input"
        />
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={filteredData?.map((item, index) => ({
            ...item,
            key: item.id || index,
          }))}
          style={{ marginTop: "20px" }}
        />
      </>
    </div>
  );
};

export default Servicios;
