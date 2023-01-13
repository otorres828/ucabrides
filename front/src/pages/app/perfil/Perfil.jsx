import React, { useEffect, useState } from "react";
import Rsidebar from "../../../components/app/Rsidebar";
import CerrarSesion from "../../../components/app/perfil/CerrarSesion";
import Clave from "../../../components/app/perfil/Clave";
import DistanciaCaminar from "../../../components/app/RecibirCola/DistanciaCaminar";
import MiUbicacion from "../../../components/app/perfil/MiUbicacion";
import icono from "../../../images/icono_perfil.png";
import ContactosSos from "../../../components/app/perfil/ContactosSos";
import Telefono from "../../../components/app/perfil/Telefono";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";

function Perfil({ user ,access_token}) {
  user = JSON.parse(user);
  const [mis_puntos,setMis_puntos]=useState();

  useEffect(()=>{
    axios.get('mis_puntos').then((response)=>{
      setMis_puntos(response.data)
    })
  },[])

  return (
    <>
      <div className="mx-auto my-28 vh-100">
        <div className=" bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-center">
            <img
              src={user.avatar}
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>

          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-slate-50">
              {user.name}
            </h1>
            <p className="text-center text-sm text-white font-medium pt-3">
              {user.email}
            </p>

            <div className="my-3 px-6 border-b pb-3">
              <div className="flex justify-between items-center px-6 ">
                <div
                 
                  className="text-gray-50 font-bold text-md md:text-2xl hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in text-center w-full py-3"
                >
                  Ucabista
                </div>
              </div>
              <ul className="flex justify-center">
                <li className="text-white font-bold text-xl">
                puntos: {mis_puntos ? mis_puntos : 'cargando...'}
                </li>
              </ul>
            </div>

            {/* <div className="flex justify-between items-center my-5 px-6">
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Facebook
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Twitter
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Instagram
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Email
              </a>
            </div> */}

            <div className="w-full">
              <h3 className="font-medium text-gray-50 text-center px-6">
                CONFIGURACIONES
              </h3>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
              <Clave />
              <MiUbicacion />
              <DistanciaCaminar  />
              <ContactosSos  />
              <Telefono  />

              <Link
                  to="/preguntas"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src={icono}
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Preguntas Frecuentes
                </Link>
                <Link to="/terminos"
                  href="/"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src={icono}
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Terminos y Conficiones
                </Link>
                <Link
                  to="/politicas"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src={icono}
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Politicas de Privacidad
                </Link>
              </div>
            </div>
          </div>
        </div>
        <CerrarSesion />
      </div>

      <Rsidebar />
    </>
  );
}

export default Perfil;
