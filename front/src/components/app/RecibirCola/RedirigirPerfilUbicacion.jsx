import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

function RedirigirPerfilUbicacion() {
  return (
    <>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="text-sm text-teal-900 font-bold text-justify">
            Antes de continuar, asegurese de tener una direccion y distancia
            guardada, vaya a su perfil haciendo click en el boton azul "Ir a
            Perfil", luego presione la opcion "Configurar Direccion" o
            "Distancia dispuesto/a a caminar"
          </div>
        </DialogTitle>

        <DialogActions>
          <Link to="../perfil">
            <div className="flex text-center justify-items-center">
              <div className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer">
                Ir a Perfil
              </div>
            </div>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RedirigirPerfilUbicacion;
