import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import axios from "../../api/axios";
import { distancia_a_caminar } from "../../hooks/RutaMasCorta";

function DistanciaCaminar() {
  const [open, setOpen] = useState(false);
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
    } else {
      enqueueSnackbar("Error de conexion", { variant: "error" });
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
        Distancia dispuest/a a caminar
      </div>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-2xl text-teal-900 font-bold text-center">
             Su distancia actual es de {actual ? actual : "0 "} metros
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

export default DistanciaCaminar;
