import React from "react";
import { NavLink } from "react-router-dom";
import Psidebar from "../../components/app/Psidebar";

function Rol() {
  return (
    <>
      <div className="flex h-screen justify-center items-center  rounded-lg">
        <div className="w-96 px-3">
          <NavLink to="/listado/rutas">
            <div className="content-center items-center bg-sky-500 hover:bg-sky-600 border-collapse border-gray-400   lg:border-gray-400 rounded-lg  p-4 leading-normal">
              <div className="">
                <div className="text-white font-bold  text-3xl mb-2 text-center ">
                  DAR COLA
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/listado/colas">
            <div className="content-center mt-4 bg-slate-500 border-collapse hover:bg-slate-600 border-gray-400   lg:border-gray-400 rounded-lg  p-4 leading-normal">
              <div className="justify-center">
                <div className="text-white font-bold  text-3xl mb-2 text-center ">
                  RECIBIR COLA
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <Psidebar/>
    </>
  );
}

export default Rol;
