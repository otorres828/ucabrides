import React from "react";
import Rsidebar from "./Rsidebar";

function MensajeDetalle({ user }) {
  user = JSON.parse(user);
  return (
    <>
      <div className=" md:my-12 bg-gray-200 md:bg-white vh-100">
        <div className="bg-gray-200  shadow rounded-lg  lg:w-3/6 xl:w-2/6 mx-auto">
          <div>
            <h1 className="border-blue-800 border-b-2 block pt-5 pb-2 font-bold text-center text-3xl text-gray-900">
              Listado de Mensajes
            </h1>
          </div>
        </div>
      </div>
      <Rsidebar />
    </>
  );
}

export default MensajeDetalle;
