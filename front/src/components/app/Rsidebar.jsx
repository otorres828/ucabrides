import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faUser,
  faCheck,
  faCarRear,
} from "@fortawesome/free-solid-svg-icons";

const profle = <FontAwesomeIcon icon={faUser} />;
const carro = <FontAwesomeIcon icon={faCarRear} />;
const notificacion = <FontAwesomeIcon icon={faCheck} />;
const mensajes = <FontAwesomeIcon icon={faMessage} />;

function Rsidebar() {
  return (
    <>
      <div className="bg-gray-700 vh-100  position  fixed bottom-0 mt-12 w-full  z-10 ">
        <div className="md:mt-12 md:w-80 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul className="flex-1 list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
            <li className="bg-gray-700 w-full  mr-0 sm:mr-3 flex-1 md:w-28">
              <NavLink
                to="/rol"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-red-600 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : "hover:border-b-4 hover:border-blue-500 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white "
                }
              >
                {carro}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Panel
                </span>
              </NavLink>
            </li>
            <li className="bg-gray-700 w-full  mr-0 sm:mr-3 flex-1 md:w-28">
              <NavLink
                to="/mensajes"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-red-600 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : "hover:border-b-4 hover:border-blue-500 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white "
                }
              >
                {mensajes}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Mensajes
                </span>
              </NavLink>
            </li>
        
            <li className="bg-gray-700 w-full  mr-0 sm:mr-3 flex-1  md:w-28">
              <NavLink
                to="/tipo-de-cola"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-red-600 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : "hover:border-b-4 hover:border-blue-500 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white "
                }
              >
                {carro}
                <span className=" pb-1 md:pb-0 text-xs md:text-base text-white md:text-gray-200 block md:inline-block">
                  Amigos
                </span>
              </NavLink>
            </li>
            <li className="bg-gray-700  w-full  mr-0 sm:mr-3 flex-1 md:w-28">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : "hover:border-b-4 hover:border-blue-500 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white "
                }
              >
                {notificacion}
                <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-gray-200 block md:inline-block">
                  Avisos
                </span>
              </NavLink>
            </li>
            <li className="bg-gray-700  w-full mr-0 sm:mr-3 flex-1 md:w-28">
              <NavLink
                to="/perfil"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-red-600 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : "hover:border-b-4 hover:border-blue-500 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white "
                }
              >
                {profle}
                <span className="pb-1 font-bold md:pb-0 text-xs md:text-base text-white md:text-gray-200 block md:inline-block">
                  Perfil
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Rsidebar;
