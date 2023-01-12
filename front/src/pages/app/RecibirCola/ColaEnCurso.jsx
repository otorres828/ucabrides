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
import { useNavigate } from "react-router-dom";

function ColaEnCurso({ user }) {
  user = JSON.parse(user);
  const [open, setOpen] = React.useState(false);
  const [bandera, setBandera] = useState(false);
  const [aprobacion, setAprobacion] = useState("");
  const [piloto, setPiloto] = useState(null);
  const orden_ruta_id = localStorage.getItem("ucabrides_orden_ruta_id");
  const [detalles_orden, setDetalles_orden] = useState(null);
  const [direccion_usuario, setDireccion_usuario] = useState(null);
  const [estatus, setEstatus] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelar = async () => {
    if (estatus.cola === "true") setAprobacion("sinaprobar");
    else setAprobacion("aprobado");

    if (estatus === "aprobado") {
      axios
        .post("cancelar_cola_usuario", {
          orden_ruta_id: detalles_orden.id,
          user_id: user._id,
          bandera: "aprobado",
        })
        .then((response) => {
          console.log(response.data);
        });

      const enviar = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: piloto.telefono,
        type: "template",
        template: {
          name: "cancelar_cola",
          language: {
            code: "es",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: piloto.name,
                },
                {
                  type: "text",
                  text: user.name,
                },
              ],
            },
          ],
        },
      };
      // axios.post(
      //   "https://graph.facebook.com/v15.0/113153664990755/messages",enviar,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.REACT_APP_WHATSAPP_CLOUD}`,
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   },
      // );
      localStorage.removeItem("ucabrides_orden_ruta_id");
      localStorage.removeItem("ucabrides_puntomascerca");
    } else {
      await axios.post("cambiar_estatus_usuario_cancelar", {
        orden_ruta_id: detalles_orden.id,
        user_id: user._id,
        bandera: aprobacion,
      });
    }
    setOpen(false);
    setBandera(true);
    navigate("/listado/colas");
    enqueueSnackbar("Cola cancelada correctamente", { variant: "success" });
  };

  useEffect(() => {
    function obtener_detalles() {
      axios
        .get(`obtener_detalles_orden_abierta/` + orden_ruta_id)
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
            distancia: puntomascerca.distancia,
            puntomascerca: [
              puntomascerca.distancia,
              puntomascerca.lat,
              puntomascerca.lng,
            ],
          });
        });

      axios.get("perfil_direccion").then((response) => {
        //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
        setDireccion_usuario(response.data);
      });

      axios.get("me").then((response) => {
        setEstatus(response.data);
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
                te dejaran a metros - asientos disponibles
              </li>
              <div
                className={`-mt-5 mx-3 rounded-lg flex-1 ${
                  estatus
                    ? estatus.cola === "true"
                      ? "bg-red-500"
                      : "bg-green-500"
                    : "bg-slate-500"
                } text-white font-semibold text-center`}
              >
                {estatus
                  ? estatus.cola === "true"
                    ? "Pendiente"
                    : "Aprobado"
                  : "Cargando"}
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
                  {detalles_orden && direccion_usuario && (
                    <DetallesCola
                      detalles_orden={detalles_orden}
                      localizacion_usuario={direccion_usuario}
                      setPiloto={setPiloto}
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  <div
                    className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                    onClick={() => {
                      handleCancelar();
                    }}
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
