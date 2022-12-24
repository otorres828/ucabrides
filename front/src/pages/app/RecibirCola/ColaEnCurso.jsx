import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../../../api/axios";
import { useSnackbar } from "notistack";
import DetallesCola from "../../../components/app/RecibirCola/DetallesCola";
import Rsidebar from "../../../components/app/Rsidebar";

function ColaEnCurso({ access_token }) {
  const [open, setOpen] = React.useState(false);
  const [bandera, setBandera] = useState(false);
  const orden_ruta_id = localStorage.getItem("ucabrides_orden_ruta_id");
  const [detalles_orden, setDetalles_orden] = useState(null);
  const [direccion_usuario, setDireccion_usuario] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelar = async () => {
    const response = await axios.get("cambiar_estatus_usuario_cancelar", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    });
    localStorage.removeItem("ucabrides_orden_ruta_id");
    localStorage.removeItem("ucabrides_puntomascerca");
    setOpen(false);
    setBandera(true);
    enqueueSnackbar("Cola cancelada correctamente", { variant: "warning" });
  };

  useEffect(() => {
    function obtener_detalles() {
      axios
        .get(`obtener_detalles_orden_abierta/` + orden_ruta_id, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          var puntomascerca = JSON.parse(
            localStorage.getItem("ucabrides_puntomascerca")
          );
          setDetalles_orden({
            id: response.data.detalles_orden._id,
            asientos: response.data.detalles_orden.asientos,
            lat: response.data.detalles_orden.rutas.lat,
            lng: response.data.detalles_orden.rutas.lng,
            usuarios: response.data.detalles_orden.usuarios,
            vehiculo: response.data.detalles_orden.vehiculo,
            distancia:puntomascerca.distancia,
            puntomascerca: [
              puntomascerca.distancia,
              puntomascerca.lat,
              puntomascerca.lng,
            ],
          });
        });

      axios
        .get("perfil_direccion", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
          setDireccion_usuario(response.data);
        });
    }
    obtener_detalles();
  }, []);

  return (
    <>
      {bandera && <Navigate to="/listado/colas" />}
      <div className="container mx-auto">
        <div className="p-5 pt-12 mb-10 sm:px-20">
          <div>
            <h1 className="font-bold text-slate-600 text-xl">
              Hola, tienes una orden abierta
            </h1>
            <ul className="mb-6">
              <li
                className="rounded-lg bg-slate-200 p-5 sm:p-4 font-semibold my-3 cursor-pointer"
                onClick={() => {
                  setOpen(true);
                }}
              >
                te dejaran a metros - 2 asientos disponibles
              </li>
              <div className="-mt-5 mx-3 rounded-lg flex-1 bg-red-500 text-white font-semibold text-center">
                Pendiente
              </div>

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
                  {detalles_orden && direccion_usuario &&
                    <DetallesCola
                      detalles_orden={detalles_orden}
                      localizacion_usuario={direccion_usuario}
                    />
                  }
                </DialogContent>
                <DialogActions>
                  <div
                    className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                    onClick={handleCancelar}
                  >
                    Cancelar Cola
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
      <Rsidebar />
    </>
  );
}

export default ColaEnCurso;
