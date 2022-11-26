import React, { useEffect, useState } from "react";
import Rsidebar from "../../components/app/Rsidebar";
import logo from "../../logo.svg";
import {
  useJsApiLoader,
} from "@react-google-maps/api";

import {
  DistanciaMasCorta,
  distancia_a_caminar,
  listado_rutas_disponibles,
  obtener_localizacion_direccion_usuario,
} from "../../hooks/RutaMasCorta";
import BasicTable from "../../components/app/Table";

const ucab = {
  lat: 8.297321035371798,
  lng: -62.71149786538124,
};

function ListadoColas() {
  const [rutas, setRutas] = useState([]);
  const [rutas_disponibles, setRutas_disponibles] = useState([]);
  const [distancia, setDistancia] = useState();
  const [localizacion_usuario, setLocalizacion_usuario] = useState({});
  const [puntomascerca, setPuntomascerca] = useState();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  
  useEffect(() => {
    const obtener_rutas_disponibles=()=> {
      listado_rutas_disponibles().then((result) => {
        //LISTADO DE RUTAS DISPONIBLES
        setRutas(result);
      });
      distancia_a_caminar().then((result) => {
        // CANTIDAD EN MT QUE EL USUARIO ESTA DISPUESTO A CAMINAR
        setDistancia(result);
      });
      obtener_localizacion_direccion_usuario().then((result) => {
        //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
        setLocalizacion_usuario(result);
      });
      rutas.map((ruta) => {
        return verificar_distancia({ lat: ruta.lat, lng: ruta.lng });
      });
    }
    obtener_rutas_disponibles();
  }, []);
  async function verificar_distancia(destino) {
    const ruta = {
      lat: parseFloat(destino.lat),
      lng: parseFloat(destino.lng),
    };
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: ucab,
      destination: ruta,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    const direccion = results.routes[0].overview_path;
    var punto = DistanciaMasCorta(direccion, localizacion_usuario);

    setPuntomascerca({
      distancia:punto[0],
      lat: punto[1],
      lng: punto[2],
    });
    if (distancia >= punto[0]) {
      console.log(puntomascerca)
    }
  }

  return isLoaded ? (
    <>
      <BasicTable rutas={rutas_disponibles} />
      <Rsidebar />
    </>
  ) : (
    <>
      <Rsidebar />
      <img src={logo} className="App-logo" alt="logo" />
    </>
  );
}

export default ListadoColas;
