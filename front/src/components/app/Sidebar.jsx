import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faMessage,
  faUser,
  faCheck,
  faCarRear,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faCoffee} />;
const profle = <FontAwesomeIcon icon={faUser} />;
const carro = <FontAwesomeIcon icon={faCarRear} />;
const notificacion = <FontAwesomeIcon icon={faCheck} />;
const mensajes = <FontAwesomeIcon icon={faMessage} />;
const location = <FontAwesomeIcon icon={faLocationDot} />;

function Sidebar() {
  return (
    <>
      <div className="bg-gray-800 vh-100  position  fixed bottom-0 mt-12 w-full  z-10 ">
        <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul className="flex-1 list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
            <li className="bg-gray-800 w-full  mr-0 sm:mr-3 flex-1 md:w-28">
              <Link
                to="/mapa"
                className="block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
              >
              {location}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Mapa
                </span>
              </Link>
            </li>
            <li className="bg-gray-800 w-full  mr-0 sm:mr-3 flex-1 md:w-28">
              <a
                href="/"
                className="block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
              >
                {mensajes}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Mensajes
                </span>
              </a>
            </li>
            <li className="bg-gray-800 w-full  mr-0 sm:mr-3 flex-1 md:w-28">
              <a
                href="/"
                className="block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
              >
                {element}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Ordenes
                </span>
              </a>
            </li>
            <li className="bg-gray-800 w-full  mr-0 sm:mr-3 flex-1  md:w-28">
              <a
                href="/"
                className="block md:flex py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
              >
                {carro}
                <span className=" pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                  Colas
                </span>
              </a>
            </li>
            <li className="bg-gray-800 w-full  mr-0 sm:mr-3 flex-1 md:w-28">
              <a
                href="/"
                className="block md:flex py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
              >
                {notificacion}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                  Avisos
                </span>
              </a>
            </li>
            <li className="bg-gray-800 w-full mr-0 sm:mr-3 flex-1 md:w-28">
              <Link
                to="/perfil"
                className="block md:flex py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
              >
              {profle}
                <span className="pb-1 font-bold md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">
                  Perfil
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
