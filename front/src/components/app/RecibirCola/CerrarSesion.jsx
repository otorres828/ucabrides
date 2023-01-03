import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function CerrarSesion() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function cerrar_sesion() {
    sessionStorage.clear();
    localStorage.clear();
    enqueueSnackbar("Ha cerrado sesion con exito", { variant: "success" });

    navigate("/login");
  }
  return (
    <>
      <div
        className="z-20 relative"
        style={{ transform: "traslateX(-50%)", margin: "auto" }}
      >
        {/* <h1 className="h1 text-center">Bienvenido a</h1>
        <h1 className="text-center pb-5 h1 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          UCAB RIDES
        </h1> */}
        <div className="justify-center text-center mt-20">
          <div
            onClick={cerrar_sesion}
            style={{ cursor: "pointer" }}
            className=" btn text-white  bg-gradient-to-l from-blue-400 via-blue-500 to-blue-500 "
          >
            Cerrar Sesion
          </div>
        </div>
      </div>
    </>
  );
}

export default CerrarSesion;
