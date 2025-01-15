import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
    FilePdfOutlined, FileWordOutlined
} from "@ant-design/icons";
import { Alert, Flex, Tooltip, Table, Input } from 'antd';
import "./styles/bienes.css"
const Bienes = ({ setTitle }) => {
    const [bienes, setBienes] = useState([])
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
    const [filteredData, setFilteredData] = useState(bienes);
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
            setFilteredData(info)
        }
    };

    const columns = [
        {
            title: <div style={{ textAlign: "center" }}>REQUERIMIENTO</div>,
            render: (_, record) => (
                <p>
                    N° {record.correlativo} - {dayjs().format("YYYY")}
                </p>
            ),
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
            align: "center",
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
            title: <div style={{ textAlign: "center" }}>ESPECIFICACIONES TÉCNICAS</div>,
            render: (_, record) => (
                record?.terminado ?

                    <p style={{ color: "red" }}> FINALIZADO</p> :
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

        const filterData = bienes.filter(item =>
            item?.glosa?.toLowerCase()?.includes(value.toLowerCase()) ||
            (item?.secSolMod && item.secSolMod === parseInt(value))
        );
        setFilteredData(filterData);
    };
    return (
        <div className='bienes'>
            <>
                <div className='bienes-alert'>
                    <Alert

                        message=
                        {
                            <strong>
                                ANEXOS:
                            </strong>
                        }


                        description={
                            <Flex gap={"20px"} justify="center" align="center">
                                <Tooltip title="ORDEN DE PRESENTACIÓN DE DOCUMENTOS">
                                    <FilePdfOutlined
                                        style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/orden-presentacion-compras.pdf", "_blank");

                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="CARTA CCI">
                                    <FilePdfOutlined
                                        style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/CARTA%20CCI.pdf", "_blank");

                                        }}
                                    />
                                </Tooltip>

                                <Tooltip title="FORMATO 07 DECLARACION JURADA">
                                    <FilePdfOutlined
                                        style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/FORMATO%2007.pdf", "_blank");

                                        }}
                                    />  </Tooltip>

                                <Tooltip title="FORMATO 05">
                                    <FilePdfOutlined
                                        style={{ color: "red", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/FORMATO%2005.pdf", "_blank");

                                        }}
                                    />  </Tooltip>


                                <Tooltip title="FORMATO N° 06 PROPUESTA ECONOMICA">
                                    <FileWordOutlined style={{ color: "blue", fontSize: "30px" }}
                                        onClick={() => {
                                            window.open("https://requerimientos.pems.pe/uploads/FORMATO%20N%C2%B0%2006%20PROPUESTA%20ECONOMICA.docx", "_blank");

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
                                1. Por correo electrónico: <strong>compras@pems.pe o Trámite Documentario de la entidad. Con copia al correo logistica_control@pems.pe .</strong>
                                <br />
                                2. En el asunto del correo se deberá colocar el número de pedido.
                                <br />
                                3. En caso de bienes específicos adjuntar la <strong>Ficha Técnica</strong> del producto ofertado.
                            </>
                        }
                        type="warning"
                        showIcon
                    />
                </div>

                <Input onChange={e => handleSearch(e)} placeholder='Buscar por descripción o solicitud' className='bienes-input' />
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
    )
}

export default Bienes