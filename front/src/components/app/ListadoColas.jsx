import React, { useEffect, useState } from "react";
import Rsidebar from "./Rsidebar";
import logo from "../../images/fondo_logos.png";
import axios from "../../api/axios";

import {
  listado_rutas_disponibles,
  obtener_direccion_usuario,
} from "../../hooks/RutaMasCorta";
import BasicTable from "./Table";
import RedirigirPerfilUbicacion from "./RedirigirPerfilUbicacion";

function ListadoColas() {
  const [rutas, setRutas] = useState([]);
  const [distancia, setDistancia] = useState();
  const [direccion_usuario, setDireccion_usuario] = useState({});

  useEffect(() => {
    function inicializar() {
      const access_token = localStorage.getItem("access_token");

      listado_rutas_disponibles().then((result) => {
        //LISTADO DE RUTAS DISPONIBLES
        setRutas(result);
      });
      axios
        .get("distancia_dispuesto_caminar", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setDistancia(response.data);
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
          console.log(direccion_usuario);
        });
    }
    inicializar();
  }, []);

  return rutas.length > 0 &&
    distancia > 0 &&
    JSON.stringify(direccion_usuario) !== "{}" ? (
    <>
      <div className="container mx-auto">
        <div className="p-5 pt-12 mb-10 sm:px-20">
          <BasicTable
            rutas={rutas}
            localizacion_usuario={direccion_usuario}
            distancia={distancia}
          />
        </div>
      </div>
      <Rsidebar />
    </>
  ) : (
    <>
      {(JSON.stringify(direccion_usuario) === "{}" || distancia === 0) && (
        <RedirigirPerfilUbicacion />
      )}
      <div className="flex h-screen justify-center items-center  rounded-lg">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <Rsidebar />
    </>
  );
}

export default ListadoColas;
