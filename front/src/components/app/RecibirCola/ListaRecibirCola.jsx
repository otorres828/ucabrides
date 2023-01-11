import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DistanciaMasCorta } from "../../../hooks/RutaMasCorta";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DetallesCola from "./DetallesCola";
import AlertaSinColas from "./AlertaSinColas";

function ListaRecibirCola({ rutas, localizacion_usuario, distancia,user}) {
  const usuario=(JSON.parse(user))
  const [rutas_disponibles, setRutas_disponibles] = useState([]);
  const [detalles_orden, setDetalles_orden] = useState({});
  const [bandera, setBandera] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [piloto, setPiloto] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinuar = () => {
    const enviar = { 
      "messaging_product": "whatsapp",
       "recipient_type": "individual",
       "to": piloto.telefono,
       "type": "template",
       "template": {
         "name": "alerta_conductor",
         "language": {
           "code": "es"
         },
         "components": [
             {
               "type": "body",
               "parameters": [
                 {
                   "type": "text",
                   "text": piloto.name
                 },
                 {
                   "type": "text",
                   "text": usuario.name
                 },
               ]
             },
           ]
       }
    }
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
    
    axios
      .get(`cambiar_estatus_usuario_activo/` + true + `/` + detalles_orden.id, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("ucabrides_orden_ruta_id", detalles_orden.id);
        var puntocercano = {
          distancia: detalles_orden.puntomascerca[0],
          lat: detalles_orden.puntomascerca[1],
          lng: detalles_orden.puntomascerca[2],
        };
        axios.post("puntomascerca", {
          puntocercano: puntocercano,
          user_id: user._id,
        });

        localStorage.setItem(
          "ucabrides_puntomascerca",
          JSON.stringify(puntocercano)
        );


        setOpen(false);
        setBandera(true);
        enqueueSnackbar("Peticion de cola enviada al conductor", {
          variant: "success",
        });
      });

  };

  const verificar_distancia = async (destino) => {
    const ruta = {
      id: destino.id,
      lat: parseFloat(destino.lat),
      lng: parseFloat(destino.lng),
    };

    const google = window.google;

    var directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: ucab,
      destination: ruta,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const direccion = results.routes[0].overview_path;

    var punto = DistanciaMasCorta(direccion, localizacion_usuario);

    if (distancia >= punto[0]) {
      const obj = {
        id: ruta.id,
        lat: ruta.lat,
        lng: ruta.lng,
        distancia: punto[0],
        puntomascerca: punto,
        asientos: destino.asientos,
        usuarios: destino.usuarios,
        vehiculo: destino.vehiculo,
      };
      setRutas_disponibles((rutas_disponibles) => {
        return [...rutas_disponibles, obj];
      }); //SE AÑADE EL OBJETO FILTRADO A UN NUEVO ARRAY
    }
  };

  useEffect(() => {
    function calcularRutas() {
      rutas.map((ruta) => {
        return verificar_distancia({
          lat: ruta.rutas.lat, //LONGITUD DE LA RUTA
          lng: ruta.rutas.lng, //LATITUD DE LA RUTA
          id: ruta._id, //ID DE LA ORDEN DE RUTA
          asientos: ruta.asientos, //ASIENTOS DISPONIBLES - ORDEN DE RUTA
          usuarios: ruta.usuarios, //USUARIOS QUE PERTENECEN A LA ORDEN DE RUTA
          vehiculo: ruta.vehiculo,
        });
      });
    }
    calcularRutas();
  }, [rutas]);

  return (
    <>
      {bandera && <Navigate to="/cola/curso" />}
      {rutas_disponibles !== [] && 
      <>
      {rutas_disponibles.length > 0 ?
        <div>
          <h1 className="font-bold text-slate-600 text-xl">
            Bienvenido al listado de Colas Disponibles
          </h1>
          <ul className="mb-6">
            {rutas_disponibles.map((row) => (
              <li
                key={row.id}
                className="rounded-lg bg-slate-200 p-3 font-semibold my-3 cursor-pointer"
                onClick={() => {
                  setDetalles_orden(row);
                  setOpen(true);
                }}
              >
                te dejaran a {row.distancia} metros -{" "}
                {row.asientos} asientos disponibles
              </li>
            ))}

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
                <DetallesCola
                  detalles_orden={detalles_orden}
                  localizacion_usuario={localizacion_usuario}
                  setPiloto={setPiloto}
                />
              </DialogContent>
              <DialogActions>
                <div disabled={true}
                  className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={handleContinuar}
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
       : <AlertaSinColas user={user} />
      }
      </>
      }
    </>
  );
}

export default ListaRecibirCola;
