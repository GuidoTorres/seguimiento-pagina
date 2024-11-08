import { Alert } from 'antd'
import React, { useEffect } from 'react'

const Inicio = ({setTitle}) => {
  useEffect(()=>{
    setTitle("Inicio")
  },[])
  return (
    <div style={{ paddingLeft: "45px", paddingRight: "45px", display:"flex", justifyContent:"center",  flexDirection:"column" }}>

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
        type="info"
        showIcon
        style={{ marginTop: "20px" }}
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
            1. Por correo electrónico: <strong>servicios@pems.pe / compras@pems.pe</strong>
            <br />
            2. En el asunto del correo se deberá colocar el numero de solicitud, la fecha limite de presentación de procesos via correo electrónico es de 2 diás hábiles.
          </>
        }
        type="warning"
        showIcon
        style={{ marginTop: "20px" }}
      />

    </div>
  )
}

export default Inicio