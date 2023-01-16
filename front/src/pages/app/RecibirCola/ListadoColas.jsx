import React, { useEffect, useState } from "react";
import Rsidebar from "../../../components/app/Rsidebar";
import logo from "../../../images/fondo_logo432x460.png";
import axios from "../../../api/axios";
import ListaRecibirCola from "../../../components/app/RecibirCola/ListaRecibirCola";
import RedirigirPerfilUbicacion from "../../../components/app/RecibirCola/RedirigirPerfilUbicacion";
import AlertaSinColas from "../../../components/app/RecibirCola/AlertaSinColas";
// import { Navigate } from "react-router-dom";
import {
  listado_rutas_disponibles,
} from "../../../hooks/RutaMasCorta";

function ListadoColas({user}) {
  const [rutas, setRutas] = useState(null);
  const [distancia, setDistancia] = useState(null);
  const [direccion_usuario, setDireccion_usuario] = useState(null);
  const [telefono, setTelefono] = useState(null);
  // const [estatus, setEstatus] = useState(null);

  useEffect(() => {
    
    function inicializar() {
      listado_rutas_disponibles().then((result) => {
        //LISTADO DE RUTAS DISPONIBLES
        setRutas(result);
      });
      axios
        .get("distancia_dispuesto_caminar")
        .then((response) => {
          setDistancia(response.data);
        });

      axios
        .get("perfil_direccion")
        .then((response) => {
          //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
          setDireccion_usuario(response.data);
        });

      axios
        .get("telefono")
        .then((response) => {
          //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
          setTelefono(response.data);
        });
    }
    inicializar();
  }, []);

  return telefono!=null && direccion_usuario !== null && distancia !== null && rutas!==null ? (   //ESPERA A QUE SE HAGAN LAS PETICIONES A LA API
    (JSON.stringify(direccion_usuario)==='{}' || distancia===0  || JSON.stringify(direccion_usuario)==='{}') ?               //EN CASO DE QUE LAS PETICIONES TENGAN VALORES VACIOS  
    <RedirigirPerfilUbicacion />
    :
    rutas.length > 0 ? ( 
      <>
        <div className=" w-5/5 md:w-5/6  lg:w-4/6 mx-auto">
          <div className="p-5 pt-12 mb-10">
            <ListaRecibirCola
              rutas={rutas}
              localizacion_usuario={direccion_usuario}
              distancia={distancia}
              user={user}
            />
          </div>
        </div>
        <Rsidebar />
      </>
    ) : (
      <>
      <AlertaSinColas user={user}/>
      <Rsidebar />
      </>
    )
  ) : (
    <>
      {/* {estatus && <Navigate to='../../cola/curso' />} */}
      <div className="flex h-screen justify-center items-center  rounded-lg">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <Rsidebar />  
    </>
  );
}

export default ListadoColas;
