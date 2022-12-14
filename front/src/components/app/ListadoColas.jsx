import React, { useEffect, useState } from "react";
import Rsidebar from "./Rsidebar";
import logo from "../../images/fondo_logo.png";
import ConfirmarDistancia from "./ConfirmarDistancia";
import axios from "../../api/axios";

import {
  listado_rutas_disponibles,
  obtener_localizacion_direccion_usuario,
} from "../../hooks/RutaMasCorta";
import BasicTable from "./Table";

function ListadoColas() {
  const [rutas, setRutas] = useState([]);
  const [distancia, setDistancia] = useState();
  const [localizacion_usuario, setLocalizacion_usuario] = useState({});

  useEffect(() => {
    function inicializar() {
      const access_token = localStorage.getItem("access_token");

      listado_rutas_disponibles().then((result) => {
        //LISTADO DE RUTAS DISPONIBLES
        setRutas(result);
      });
      axios.get("distancia_dispuesto_caminar",{
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }).then((response) => {
        setDistancia(response.data);
      });
     
      obtener_localizacion_direccion_usuario().then((result) => {
        //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
        setLocalizacion_usuario(result);
      });
    }
    inicializar();

  }, []);

  return rutas.length > 0 && distancia > 0 && JSON.stringify(localizacion_usuario)!=='{}' ? (
    <>
      <div className="container mx-auto">
        <div className="p-5 pt-12 mb-10 sm:px-20">
          <h1 className="font-bold text-slate-600 text-xl">Bienvenido al listado de Colas Disponibles</h1>
          <BasicTable rutas={rutas} localizacion_usuario={localizacion_usuario} distancia={distancia} />
        </div>
      </div>
      <Rsidebar />
    </>
  ) : (
    <>
        {distancia===0 && <ConfirmarDistancia/>}

      <Rsidebar />
      <div className="flex h-screen justify-center items-center  rounded-lg">
          <img src={logo} className="App-logo" alt="logo" />
      </div>    
    </>
  );
}

export default ListadoColas;
