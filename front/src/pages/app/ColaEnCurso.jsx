import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rsidebar from "../../components/app/Rsidebar";

function ColaEnCurso() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
        <div className="container mx-auto">
          <div className="p-5 pt-12 mb-10 sm:px-20">
          <div>
          <h1 className="font-bold text-slate-600 text-xl">
            Hola, tienes una orden abierta
          </h1>
          <ul className="mb-6">
              <li
                className="rounded-lg bg-slate-200 p-3 font-semibold my-3 cursor-pointer"
                onClick={() => {
                  
                  setOpen(true);
                }}
              >
                te dejaran a  metros - 2 asientos disponibles

              </li>
                <div className="-mt-5 mx-3 rounded-lg flex-1 bg-red-500 text-white font-semibold text-center">Pendiente</div>
          
            <Dialog
              fullWidth={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <div className="text-2xl text-teal-900 font-bold text-center">
                  Detalles de la Cola
                </div>
              </DialogTitle>
              <DialogContent>
                {/* LLAMAMOS AL MODAL CON EL MAPA */}
               
              </DialogContent>
              <DialogActions>
                <div
                  className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={handleClose}
                >
                  Continuar
                </div>
                <div
                  className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={handleClose}
                >
                  Cerrar
                </div>
              </DialogActions>
            </Dialog>
          </ul>
        </div>
          </div>
        </div>
      <Rsidebar/>
    </>
  );
}

export default ColaEnCurso;