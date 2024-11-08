import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
    FilePdfOutlined, FileExcelOutlined
} from "@ant-design/icons";
import { Alert, Flex, Tooltip, Table } from 'antd';
const Servicios = ({ setTitle }) => {
    const [servicios, setServicios] = useState([])

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
                        }
                        type="warning"
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


                <Table
                    columns={columns}
                    dataSource={servicios?.map((item, index) => ({
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