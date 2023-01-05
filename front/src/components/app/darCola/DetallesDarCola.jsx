import React, { useEffect } from "react";

function DetallesDarCola({ detalles }) {
  useEffect(() => {
    console.log(detalles);
  }, []);
  return (
    <>
      <div className="w-full">

        <div className="mt-5 px-6 w-full flex flex-col items-center overflow-hidden">
            <div className="text-left vh-100 w-full pb-5">
              <h1 className=" font-medium text-gray-900 text-left">
                Informacion del Vehiculo
              </h1>
              <p>
                <small className="font-bold">Marca:</small>{" "}
                {detalles.vehiculo.marca}
              </p>
              <p>
                <small className="font-bold">Color:</small>{" "}
                {detalles.vehiculo.color}
              </p>
              <p>
                <small className="font-bold">Placa:</small>{" "}
                {!detalles.vehiculo.placa
                  ? "El conductor prefiere mantenerlo en privado"
                  : detalles.vehiculo.placa}
              </p>

              <h1 className="pt-3 font-medium text-gray-900 text-left">
                Informacion de la Cola
              </h1>

              <p>
                <small className="font-bold">hora de salida:</small>{" "}
                {detalles.hora === null ? detalles.hora : "Sin hora programada"}
              </p>
            
            </div>
        </div>
      </div>
    </>
  );
}

export default DetallesDarCola;
