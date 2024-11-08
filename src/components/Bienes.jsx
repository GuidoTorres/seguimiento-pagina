import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
    FilePdfOutlined, FileWordOutlined
} from "@ant-design/icons";
import { Alert, Flex, Tooltip, Table } from 'antd';
const Bienes = ({ setTitle }) => {
    const [bienes, setBienes] = useState([])

    useEffect(() => {
        setTitle("Bienes")
        getBienes();
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
                                1. Por correo electrónico: <strong>compras@pems.pe</strong>
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
                    dataSource={bienes?.map((item, index) => ({
                        ...item,
                        key: item.id || index,
                    }))}
                    style={{ marginTop: "20px" }}

                />
            </>
        </div>
    )
}

export default Bienes