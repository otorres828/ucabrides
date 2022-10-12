import React from "react";
import Header from "../../components/web/Header";
import { useNavigate } from 'react-router-dom';

function Panel() {
  const navigate = useNavigate();

  function cerrar_sesion(){
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Bienvenido a</h1>

                <h1 className="pb-5 h1 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  UCAB RIDES
                </h1>
              <div className="container mx-auto">
                <div>
                  <a onClick={cerrar_sesion}
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                    href="#"
                  >
                    Cerrar Sesion
                  </a>
                </div>
              </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Panel;
