import {Table } from "antd";
import React, { useEffect, useState } from "react";
import { FilePdfOutlined } from "@ant-design/icons";

function App() {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {

    getCotizaciones();
  }, []);
  const getCotizaciones = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/cotizaciones/completada?tipo=S`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const info = await response.json();

    if (info) {
      setCotizaciones(info);
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
  return (
    <div style={{ marginTop: "20px", padding:"35px" }}>
      <Table
        columns={columns}
        dataSource={cotizaciones?.map((item, index) => ({
          ...item,
          key: item.id || index,
        }))}
      />
    </div>
  );
}

export default App;
