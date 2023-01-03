import React from "react";
import { Link } from "react-router-dom";
import icono from "../../../images/icono_perfil.png";

function MiUbicacion() {

  return (
    <>
      <Link 
      to="../configurar/ubicacion"
      className="cursor-pointer w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150">
        <div >
          <img
            src={icono}
            alt=""
            className="rounded-full h-6 shadow-md inline-block mr-2"
          />
          Configuracion de Ubicacion
        </div>
      </Link>
    </>
  );
}

export default MiUbicacion;
