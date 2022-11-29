import React from "react";
import { NavLink } from "react-router-dom";

function Rol() {
  return (
    <>
      <div className=" mx-auto my-12 py-12 vh-100">
        <div className="relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div>
            <div className="justify-center pt-5 w-full mx-auto ">
              <NavLink to="/conductor/listado-de-colas">
                <div className="content-center items-center bg-sky-500 hover:bg-sky-600 border-collapse border-gray-400   lg:border-gray-400 rounded-lg  p-4 leading-normal">
                  <div className="mb-8 ">
                    <div className="text-white font-bold  text-3xl mb-2 text-center ">
                      DAR COLA
                    </div>
                  </div>
                </div>
              </NavLink>
              <NavLink to="/listado/colas">
                <div className="content-center mt-4 bg-red-500 border-collapse hover:bg-red-600 border-gray-400   lg:border-gray-400 rounded-lg  p-4 leading-normal">
                  <div className="mb-8">
                    <div className="text-white font-bold  text-3xl mb-2 text-center ">
                      RECIBIR COLA
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}

export default Rol;
