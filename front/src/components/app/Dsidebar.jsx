import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheck,
  faCarRear,
  faGauge,
} from "@fortawesome/free-solid-svg-icons";

const profle = <FontAwesomeIcon icon={faUser} />;
const carro = <FontAwesomeIcon icon={faCarRear} />;
const panel = <FontAwesomeIcon icon={faGauge} />;
const notificacion = <FontAwesomeIcon icon={faCheck} />;

function Dsidebar() {
  return (
    <>
      <div className="  fixed bottom-0 mt-12 w-full z-30 rounded-lg">
        <div className="md:mt-12 md:w-flex-1 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul className="m-3 rounded-lg bg-gradient-to-l from-blue-400 via-blue-500 to-blue-500 vh-100 flex flex-row md:flex-col pt-3 md:py-3  md:px-2 text-center md:text-left">
            <li className=" w-full   sm:mr-3 flex-1 md:w-28">
              <NavLink
                to="/rol"
                className={({ isActive }) =>
                  isActive
                    ? " border-blue-600 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : "py-1 md:py-3 block md:flex  text-white no-underline hover:text-white "
                }
              >
                {panel}
                <span className="pb-1 md:ml-2 font-bold md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Panel
                </span>
              </NavLink>
            </li>
            <li className=" w-full   sm:mr-3 flex-1 md:w-28">
              <NavLink
                to="/listado/rutas"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-blue-800  block md:flex  py-1 md:py-3  align-middle text-white no-underline hover:text-white"
                    : "py-1 md:py-3 block md:flex  text-white no-underline hover:text-white "
                }
              >
                {notificacion}
                <span className="pb-1 md:ml-2 font-bold md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                  Rutas
                </span>
              </NavLink>
            </li>


            <li className=" w-full   sm:mr-3 flex-1  md:w-28">
              <NavLink
                to="/conductor/cola/curso"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 border-blue-800 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : " hover:border-blue-500 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white "
                }
              >
                {carro}
                <span className=" pb-1 font-bold md:ml-2 md:pb-0 text-xs md:text-base text-white  block md:inline-block">
                  Colas
                </span>
              </NavLink>
            </li>
           
            <li className="  w-full  sm:mr-3 flex-1 md:w-28">
              <NavLink
                to="/perfil/conductor"
                className={({ isActive }) =>
                isActive
                    ? "border-b-4 border-blue-800 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white"
                    : " hover:border-blue-500 block md:flex  py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white "
                }
              >
                {profle}
                <span className="pb-1 font-bold md:ml-2 md:pb-0 text-xs md:text-base text-white  block md:inline-block">
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

export default Dsidebar;
