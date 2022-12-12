import React from "react";
import Rsidebar from "../../components/app/Rsidebar";
import CerrarSesion from "../../components/app/CerrarSesion";
import Clave from "../../components/app/Clave";
import DistanciaCaminar from "../../components/app/DistanciaCaminar";

function Perfi({ user }) {
  user = JSON.parse(user);

  return (
    <>
      <div className="mx-auto my-28 vh-100">
        <div className=" bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-center">
            <img
            
              src={user.avatar}
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>

          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-slate-50">
              {user.name}
            </h1>
            <p className="text-center text-sm text-white font-medium pt-3">
              {user.email}
            </p>

            <div className="my-3 px-6 border-b pb-3">
              <div className="flex justify-between items-center px-6 ">
                <div
                  href="/"
                  className="text-gray-50 font-bold text-md md:text-2xl hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in text-center w-full py-3"
                >
                  Puntos
                </div>
              </div>
              <ul className="flex justify-center">
                <li>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="star"
                    className="w-4 text-yellow-500 mr-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                    ></path>
                  </svg>
                </li>
              </ul>
            </div>

            {/* <div className="flex justify-between items-center my-5 px-6">
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Facebook
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Twitter
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Instagram
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Email
              </a>
            </div> */}

            <div className="w-full">
              <h3 className="font-medium text-gray-50 text-center px-6">
                CONFIGURACIONES
              </h3>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
              <Clave />
              <DistanciaCaminar />

                <a
                  href="/"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Vehiculos frecuentes
                </a>
                <a
                  href="/"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Listado de Amigos
                </a>
                <a
                  href="/"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Preguntas Frecuentes
                </a>
                <a
                  href="/"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Terminos y Conficiones
                </a>
                <a
                  href="/"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Politicas de Privacidad
                </a>
                <a
                  href="/"
                  className="w-full border-t border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Rutas Activas
                </a>
              </div>
            </div>
          </div>
        </div>
        <CerrarSesion />
      </div>

      <Rsidebar />
    </>
  );
}

export default Perfi;
