import React, { useEffect, useState } from "react";
import { DistanciaMasCorta } from "../../hooks/RutaMasCorta";
import Detalles_ruta from "./Detalles_ruta";

function BasicTable({ rutas, localizacion_usuario, distancia }) {
  const [rutas_disponibles, setRutas_disponibles] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [obj, setObj] = useState(false);
  const google = window.google;
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const verificar_distancia = async (destino) => {
    const ruta = {
      id: destino.id,
      lat: parseFloat(destino.lat),
      lng: parseFloat(destino.lng),
    };
    var directionsService = new google.maps.DirectionsService();
   
    const results=await directionsService.route({
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
  }, []);

  return (
    <>
      {rutas_disponibles.length > 0 ? (
        <ul>
          {rutas_disponibles.map((row) => (
            <li
              key={row.id}
              className="rounded-lg bg-slate-200 p-3 font-semibold my-3 cursor-pointer"
              onClick={(()=>{
                setDetalles(row)
                console.log(detalles)
                setObj(true)
              })}
              
              
            >
              te dejaran a {row.distancia}metros - 2 hacientos disponibles
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
      {obj ?
      <Detalles_ruta ruta={detalles} />
    : 
    ""
      }
    </>
  );
}

export default BasicTable;
