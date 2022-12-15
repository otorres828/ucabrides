import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import ConfigurarUbicacion from "../../pages/app/ConfigurarUbicacion";

function MiUbicacion() {
  const [open, setOpen] = useState(false);

  const handlecambiar = async () => {};
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="cursor-pointer w-full  border-gray-100 text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
      >
        <img
          src="https://avatars0.githubusercontent.com/u/35900628?v=4"
          alt=""
          className="rounded-full h-6 shadow-md inline-block mr-2"
        />
        Configuracion de Ubicacion
      </div>
      {open && (
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-2xl text-teal-900 font-bold text-center">
              CONFIGURAR UBICACION
            </div>
          </DialogTitle>
          <DialogContent>

            <ConfigurarUbicacion />
            </DialogContent>

          <DialogActions>
            <div
              className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
              onClick={handlecambiar}
            >
              Cambiar
            </div>
            <div
              className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
              onClick={handleClose}
            >
              Cerrar
            </div>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default MiUbicacion;
