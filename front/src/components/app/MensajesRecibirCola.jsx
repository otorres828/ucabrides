import React from "react";

import { Link } from "react-router-dom";

function MensajesDarCola({ user }) {
  return (
    <>
      <div className="w-full">
        <h3 className="font-medium text-gray-900 text-left px-6">
          Actividades Recientes
        </h3>
        <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
          <Link className=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
            <img
              src="https://avatars0.githubusercontent.com/u/35900628?v=4"
              alt=""
              className="rounded-full h-6 shadow-md inline-block mr-2"
            />
            Voy Saliendo.....
            <span className="font-medium text-gray-900">oatorres.19</span>
          </Link>
          <Link className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150">
            <img
              src="https://avatars0.githubusercontent.com/u/35900628?v=4"
              alt=""
              className="rounded-full h-6 shadow-md inline-block mr-2"
            />
           Gracias por la cola...
            <span className="font-medium text-gray-900">Rafael M</span>
          </Link>

          <Link className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150">
            <img
              src="https://avatars0.githubusercontent.com/u/35900628?v=4"
              alt=""
              className="rounded-full h-6 shadow-md inline-block mr-2"
            />
            Ya estoy aqui...
            <span className="font-medium text-gray-900">oatorres.19</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MensajesDarCola;
