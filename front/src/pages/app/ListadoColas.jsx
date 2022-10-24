import React from "react";
import { NavLink } from "react-router-dom";
import Rsidebar from "../../components/app/Rsidebar";
import Table from "../../components/app/Table";

function ListadoColas() {
  return (
    <>
      <div className=" md:my-12 bg-gray-200 md:bg-white vh-100">
        <div className="bg-gray-200  shadow rounded-lg  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="text-center">
          <NavLink to="/conductor/origen-o-destino">
            <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Crear Ruta
            </button>
          </NavLink>
            <h1 className="border-blue-800 border-b-2 block pt-5 pb-2 font-bold text-center text-3xl text-gray-900">
              Listado de Rutas
            </h1>
            <div className="p-3 container mx-auto">
            <Table/>
            </div>
          </div>
        </div>
      </div>
      <Rsidebar />
    </>
  );
}

export default ListadoColas;
