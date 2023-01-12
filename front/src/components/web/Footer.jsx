import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="flex  sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              {/* Logo */}
              <Link to="/" className="inline-block" aria-label="Cruip">
                <div
                  class="hidden sm:block  items-right text-blue-300 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                  href="/"
                >
                  UCAB
                  <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300">
                    RIDES
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="md:col-span-3 lg:col-span-2">
            <div className="text-sm text-gray-600">
              <Link
                to="/terminos"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Terminos y Condiciones
              </Link>{" "}
              ·{" "}
            </div>
          </div>
          <div className=" md:col-span-3 lg:col-span-2">
            <div className="text-sm text-gray-600">
              <Link
                to="/politicas"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Politicas de Privacidad
              </Link>{" "}
              ·{" "}
            </div>
          </div>
          <div className=" md:col-span-3 lg:col-span-2">
          <Link to="/preguntas">
            <h6 className="text-gray-800 font-medium mb-2">
              Preguntas Frecuentes
            </h6>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
