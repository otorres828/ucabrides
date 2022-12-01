import React, { useEffect, useState } from "react";
import Rsidebar from "../../components/app/Rsidebar";
import logo from "../../logo.svg";

import {
  distancia_a_caminar,
  listado_rutas_disponibles,
  obtener_localizacion_direccion_usuario,
} from "../../hooks/RutaMasCorta";
import BasicTable from "../../components/app/Table";

function ListadoColas() {
  const [rutas, setRutas] = useState([]);
  const [distancia, setDistancia] = useState();
  const [localizacion_usuario, setLocalizacion_usuario] = useState({});

  useEffect(() => {
    function inicializar() {
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
      <Rsidebar />
      <img src={logo} className="App-logo" alt="logo" />
    </>
  );
}

export default ListadoColas;
