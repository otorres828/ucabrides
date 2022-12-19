import React, { useEffect, useState } from "react";
import { DistanciaMasCorta } from "../../hooks/RutaMasCorta";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MapaReferencia from "../../pages/app/MapaReferencia";
import logo from "../../images/fondo_logos.png";

function BasicTable({ rutas, localizacion_usuario, distancia }) {
  const [rutas_disponibles, setRutas_disponibles] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [open, setOpen] = React.useState(false);
  const user = localStorage.getItem("user");
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const handleClose = () => {
    setOpen(false);
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
          lat: ruta.lat,
          lng: ruta.lng,
          id: ruta._id,
        });
      });
    }
    calcularRutas();
  }, [rutas]);

  return (
    <>
      {rutas_disponibles.length > 0 ? (
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
                  setDetalles(row);
                  setOpen(true);
                }}
              >
                te dejaran a {row.distancia} metros - 2 asientos disponibles
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
                <MapaReferencia
                  detalles={detalles}
                  localizacion_usuario={localizacion_usuario}
                />
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
      ):
      <div className="flex h-screen justify-center items-center  rounded-lg">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      }
    </>
  );
}

export default BasicTable;
