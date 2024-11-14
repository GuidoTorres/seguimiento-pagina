import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
    FilePdfOutlined, FileExcelOutlined
} from "@ant-design/icons";
import { Alert, Flex, Tooltip, Table, Input } from 'antd';
const Servicios = ({ setTitle }) => {
    const [servicios, setServicios] = useState([])
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
    const [filteredData, setFilteredData] = useState(servicios);

    useEffect(() => {
        setTitle("Servicios")
        getServicios()
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
            setFilteredData(info)
        }
    };

    const columns = [
        {
            title: <div style={{ textAlign: "center" }}>NOMBRE</div>,
            render: (_, record) => (
                <p>
                    COTIZACIÓN N° {record.correlativo} - {dayjs().format("YYYY")}
                </p>
            ),
            align: "center",
        },
        {
            title: <div style={{ textAlign: "center" }}>SOLICITUD</div>,
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
            title: <div style={{ textAlign: "center" }}>FECHA DE PUBLICACIÓN</div>,
            dataIndex: "fecha",
            align: "center",
        },
        {
            title: <div style={{ textAlign: "center" }}>FECHA DE VENCIMIENTO</div>,
            dataIndex: "fecha_vencimiento",
            align: "center",
        },
        {
            title: <div style={{ textAlign: "center" }}>PDF</div>,
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
            align: "left",
        },
    ];


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filterData = servicios.filter(item =>
            item.glosa.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filterData);
    };

    return (
        <div style={{ marginTop: "-20px", paddingLeft: "35px", paddingRight: "35px" }}>
            <>
                <Flex gap={"10px"}>
                    <Alert
                        message=
                        {
                            <strong>
                                ANEXOS:
                            </strong>
                        }


                        description={
                            <Flex gap={"20px"} justify="center" align="center">


                                <Tooltip title="CARTA CCI">
                                    <FilePdfOutlined
                                        style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/CARTA%20CCI.pdf", "_blank");

                                        }}
                                    />
                                </Tooltip>

                                <Tooltip title="DECLARACION JURADA - FORMATOS PARA PROVEEDORES">
                                    <FilePdfOutlined
                                        style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/DECLACION%20JURADA%20-%20FORMATOS%20PARA%20PROVEEDORES.pdf", "_blank");

                                        }}
                                    />  </Tooltip>

                                <Tooltip title="DECLARACIÓN JURADA PARENTESCO NEPOTISMO">
                                    <FilePdfOutlined
                                        style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/DECLARACION%20JURADA%20PARENTESCO%20NEPOTISMO.pdf", "_blank");

                                        }}
                                    />  </Tooltip>


                                <Tooltip title="FORMATO DE COTIZACIÓN DE SERVICIOS">
                                    <FileExcelOutlined style={{ color: "green", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/FORMATO%20DE%20COTIZACION%20DE%20SERVICIOS.xlsx", "_blank");

                                        }} />

                                </Tooltip>
                                <Tooltip title="FORMATO DE DECLARACION JURADA INCOMPATIBILIDADES">
                                    <FilePdfOutlined style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/FORMATO-DE-DECLARACI%C3%93N-JURADA-INCOMPATIBILIDADES.pdf", "_blank");

                                        }} />

                                </Tooltip>
                            </Flex>
                        }
                        type="info"
                        showIcon
                    />
                    <Alert
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
                    />

                </Flex>

                <Input onChange={e => handleSearch(e)} placeholder='Buscar por descripción' style={{ marginTop: "10px", width: "300px", }} />
                <Table
                    columns={columns}
                    dataSource={filteredData?.map((item, index) => ({
                        ...item,
                        key: item.id || index,
                    }))}
                    style={{ marginTop: "20px" }}
                />
            </>
        </div>
    )
}

export default Servicios