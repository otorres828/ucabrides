import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

function AlertaSinColas({user}) {
  user = JSON.parse(user);
  return (
    <>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="text-sm text-teal-900 font-bold text-justify">
            hola, <small className="text-red-400">{user.name}</small> lamentamos informarte que actualmente no hay colas disponibles :c te sugerimos intentar mas tarde. Igual puedes visitar tu perfil.
          </div>
        </DialogTitle>

        <DialogActions>
          <Link to="../perfil">
            <div className="flex text-center justify-items-center">
              <div className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer">
                Ir al Perfil
              </div>
            </div>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertaSinColas;
