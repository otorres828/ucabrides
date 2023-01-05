import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import DetallesDarCola from "../../../components/app/darCola/DetallesDarCola";
import Dsidebar from "../../../components/app/Dsidebar";

function ColaAbierta({access_token}) {
  const [isMensaje, setIsMensaje] = useState(true);
  const [detalles, setDetalles] = useState(null);

  useEffect(()=>{
    axios.get('detalles_orden_activa',
    {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    }}
    ).then((response)=>{
      setDetalles(response.data)
      
    })
  },[])

  return (
    <>
     {detalles &&
       <div className="mx-auto my-12 vh-100">
        <div className="bg-gray-50 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div>
            <h1 className="border-blue-800 border-b-2 block pt-5 pb-2 font-bold text-center text-3xl text-gray-900">
              Cola En Curso
            </h1>
            <div className="flex justify-between items-center my-5 px-6">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setIsMensaje(true)}
                className={` border-b-2 text-gray-500  hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                  isMensaje ? "border-blue-800 border-b-2" : ""
                }`}
              >
                Detalles de Cola
              </div>
              <div
                onClick={() => setIsMensaje(false)}
                style={{ cursor: "pointer" }}
                className={`flex border-b-2 justify-center text-gray-500  hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 ${
                  !isMensaje ? "border-blue-800 border-b-2" : ""
                }`}
              >
                Usuarios por aceptar {detalles.usuarios.length>0 && <div className="text-lg -mt-2 ml-3 font-bold text-red-600"> {detalles.usuarios.length}</div>}
              </div>
            </div>
            {isMensaje ? <DetallesDarCola detalles={detalles}/> : ""}
          </div>
        </div>
      </div>}
      <Dsidebar />
    </>
  );
}

export default ColaAbierta;
