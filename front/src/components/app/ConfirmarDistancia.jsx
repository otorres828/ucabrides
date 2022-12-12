import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import axios from "../../api/axios";
import { distancia_a_caminar } from "../../hooks/RutaMasCorta";

function ConfirmarDistancia() {
  const [open, setOpen] = useState(true);
  const [distancia, setDistancia] = useState("");
  const [actual, setActual] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handlecambiar = async () => {
    const access_token = localStorage.getItem("access_token");
    if (distancia>0) {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        const res = await axios.post(`cambiar_distancia_caminar`, {
          distancia: distancia,
        });

        if (res.data.error)
          enqueueSnackbar(res.data.error, { variant: "error" });
        else {
          setOpen(false)
          obtener_distancia()
          enqueueSnackbar("Distancia cambiada exitosamente :D ", {
            variant: "success",
          });
          delete axios.defaults.headers.common["Authorization"];
        }
      } catch (error) {
        enqueueSnackbar("Error de conexion", { variant: "error" });
      }
      setOpen(false);

    } else {
      enqueueSnackbar("La distancia a caminar debe de ser mayor a cero", { variant: "error" });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function obtener_distancia() {
    distancia_a_caminar().then((result) => {
      // CANTIDAD EN MT QUE EL USUARIO ESTA DISPUESTO A CAMINAR
      setActual(result);
    });
  }

  useEffect(()=>{
    obtener_distancia();
  },[])

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-2xl text-teal-900 font-bold text-center">
           Antes de continuar, agregue una distancia dispuesto/a a caminar
            </div>
          </DialogTitle>
          <DialogContent>
          <label className="font-semibold">Ingrese la cantidad de metros que esta dispuesto a caminar</label>
            <input
              onChange={(e) => {
                setDistancia(e.target.value);
              }}
              required
              className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Ingresar la distancia en metros"
            />
      
          </DialogContent>
          <DialogActions>
          <div className="flex text-center justify-items-center">
            <div
              className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
              onClick={handlecambiar}
            >
              Cambiar
            </div>
         

          </div>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ConfirmarDistancia;
