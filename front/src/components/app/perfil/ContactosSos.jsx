import React from "react";
import icono from "../../../images/icono_perfil.png"
import Rsidebar from "../../app/Rsidebar";
import { Link } from "react-router-dom";

function ContactosSos() {
  return (
    <>
      <Link to="/contactos"
      className="cursor-pointer w-full border-t border-gray-100  text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150">
        
        <img
          src={icono}
          alt=""
          className="rounded-full h-6 shadow-md inline-block mr-2"
        />
        Contactos de emergencia
      </Link>
      <Rsidebar />
    </>
  );
}

export default ContactosSos;
