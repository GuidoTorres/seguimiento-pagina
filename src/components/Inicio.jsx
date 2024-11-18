import { Alert } from 'antd'
import React, { useEffect } from 'react'
import "./styles/inicio.css"
const Inicio = ({ setTitle }) => {
  useEffect(() => {
    setTitle("Inicio")
  }, [])
  return (
    <div className='inicio'>

      <Alert
      className='inicio-alert'
      message=
        {
          <strong>
            NOTA
          </strong>
        }
        description="Las cotizaciones deben provenir de proveedores cuya actividad principal y/o estan directamente relacionadas con el objeto de contratación." type="info" showIcon style={{ marginTop: "10px" }} />
      <Alert
            className='inicio-alert'

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
            2. La entrega de los bienes se realizará después de confirmada la Orden de Compra adjuntando los siguientes documentos en almacén:
            <br />
            -	Guía de Remisión (3 copias).
            <br />
            -	Copia de la orden de compra (3 copias).
            <br />
            -	Comprobante de Pago (2 copias), indicando al crédito.
            <br />
            La conformidad de los servicios se presentará al día siguiente hábil después de culminado la orden de servicio, adjuntando los siguientes documentos por Tramite Documentario:
            <br />
            -	Informe de actividades realizadas según términos de referencia.
            <br />
            -	Comprobante de Pago.
            <br />
            -	Copia de la Orden de Servicio.
            <br />
            -	Suspensión de 4ta Categoría según corresponda.
            <br />
            3. El plazo de entrega sera computado desde el día siguientede confirmada la Orden de Compra/Servicio, para efectos de cobro de penalidad.
            <br />
            4. La penalidad se aplicara de acuerdo a lo establecido en la Directiva N° 002-2023-GRA/OPDI (hasta el 10% del monto total de la Orden de Compra/Servicio)
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
            1. Por correo electrónico: <strong>servicios@pems.pe / compras@pems.pe o Tramite Documentario.</strong>
            <br />
            2. En el asunto del correo se deberá colocar el numero de solicitud, la fecha limite de presentación de procesos via correo electrónico es de 2 diás hábiles.
            <br />
            3. Para las Cotizaciones no se aceptara el pegado de la imagen de una firma o visto.
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