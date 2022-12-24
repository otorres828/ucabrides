import React, { useState } from "react";
import Rsidebar from "../../../components/app/Rsidebar";
import MensajesDarCola from "../../../components/app/RecibirCola/MensajesDarCola";
import MensajesRecibirCola from "../../../components/app/RecibirCola/MensajesRecibirCola";

function Mensajes({user}) {
  user=(JSON.parse(user));
  const [isMensaje,setIsMensaje]=useState(true);

  return (
    <>
      <div className="mx-auto my-12 vh-100">
        <div className="bg-gray-50 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div >
            <h1 className="border-blue-800 border-b-2 block pt-5 pb-2 font-bold text-center text-3xl text-gray-900">
            Listado de Mensajes
            </h1>
            <div className="flex justify-between items-center my-5 px-6">
              <div
                style={{ cursor: 'pointer' }}
                onClick={() =>  setIsMensaje(true)}
                className={` text-gray-500  hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${isMensaje ? "border-blue-800 border-b-2" : ""}`}
              >
                Dar cola
              </div>
              <div
                onClick={() => setIsMensaje(false)}
                style={{ cursor: 'pointer' }}
                className={` text-gray-500  hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${!isMensaje ? "border-blue-800 border-b-2" : ""}`}
              >
                Recibir Cola
              </div>
            </div>
            {isMensaje ? <MensajesDarCola/> : <MensajesRecibirCola/>}

          </div>
        </div>
      </div>
      <Rsidebar />
    </>
  );
}

export default Mensajes;
