import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import axios from "../../../api/axios";
import icono from "../../../images/icono_perfil.png";

function Clave() {
  const [open, setOpen] = useState(false);
  const [clave, setClave] = useState("");
  const [repetirclave, setRepetirclave] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handlecambiar = async () => {
    if (clave !== "" && clave === repetirclave) {
      try {
        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${access_token}`;
        const res = await axios.post(`cambiarclave`, {
          clave: clave,
        });

        if (res.data.error)
          enqueueSnackbar(res.data.error, { variant: "error" });
        else {
          setOpen(false)
          enqueueSnackbar("Clave cambiada exitosamente :D ", {
            variant: "success",
          });
        }
      } catch (error) {
        enqueueSnackbar("Error de conexion", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Las claves no coinciden", { variant: "error" });
    }
  };
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
          src={icono}
          alt=""
          className="rounded-full h-6 shadow-md inline-block mr-2"
        />
        Configuracion de clave
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
              Cambiar Clave
            </div>
          </DialogTitle>
          <DialogContent>
            <input
              onChange={(e) => {
                setClave(e.target.value);
              }}
              required
              className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Ingresar Nueva Clave"
            />
            <input
              onChange={(e) => setRepetirclave(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Repetir Clave"
            />
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

export default Clave;
