import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

function InformacionCola({ detalles_orden,setPiloto }) {
  const [conductor, setConductor] = useState(null);

  useEffect(() => {
    function obtener_conductor() {
      axios
        .get(`obtener_conductor/` + detalles_orden.id, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((response) => {
          setConductor(response.data);
          setPiloto(response.data)
        });
    }
    obtener_conductor();
  }, []);
  return (
    <div className="bg-slate-100 p-3 rounded-lg shadow">
      <div className="text-left vh-100 w-full">
        <h1 className=" text-ellipsis font-serif font-semibold">
          Informacion del Conductor
        </h1>
        <p>
          <small className="font-bold">Nombre:</small>{" "}
          {conductor === null ? "Cargando..." : conductor.name}
        </p>
        <p>
          <small className="font-bold">Correo:</small>{" "}
          {conductor === null ? "Cargando..." : conductor.email}
        </p>
        <h1 className="pt-3 text-ellipsis font-serif font-semibold">
          Informacion del Vehiculo
        </h1>
        <p>
          <small className="font-bold">Marca:</small>{" "}
          {detalles_orden.vehiculo === null
            ? "cargando"
            : detalles_orden.vehiculo.marca}
        </p>
        <p>
          <small className="font-bold">Color:</small>{" "}
          {detalles_orden.vehiculo === null ||
          detalles_orden.vehiculo.color === null
            ? "cargando"
            : detalles_orden.vehiculo.color}
        </p>
        <p>
          <small className="font-bold">Placa:</small>{" "}
          {!detalles_orden.vehiculo.placa
            ? "El conductor prefiere mantenerlo en privado"
            : detalles_orden.vehiculo.placa}
        </p>

        <h1 className="pt-3 text-ellipsis font-serif font-semibold">
          Informacion de la Cola
        </h1>
        <p>
          <small className="font-bold">Me dejaran a: </small>{" "}
          {detalles_orden.distancia} metros
        </p>
        <p>
          <small className="font-bold">hora de salida:</small>{" "}
          {detalles_orden.hora === null
            ? detalles_orden.hora
            : "Sin hora programada"}
        </p>
        <p className="text-center font-bold text-green-700">
          Puedes continuar la pagina para ver el lugar donde te dejara el
          conductor
        </p>
      </div>
    </div>
  );
}

export default InformacionCola;
