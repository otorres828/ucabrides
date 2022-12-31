import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import Home from "./pages/web/Home";
import Login from "./pages/web/Login";

import 'aos/dist/aos.css';
import AOS from 'aos';

import { useSnackbar } from "notistack";
import useNetwork from "./hooks/useNetwork";
import { RedirectLogin, RedirectPanel,EstaEnCola, SalioDeCola, VerificarCola } from "./components/ProtectedRoute";
import Perfil from "./pages/app/perfil/Perfil";
import MapView from "./pages/app/RecibirCola/MapView";
import Rol from "./pages/app/Rol";
import ListadoColas from "./pages/app/RecibirCola/ListadoColas";
import Mensajes from "./pages/app/RecibirCola/Mensajes";
import ConfigurarUbicacion from "./pages/app/perfil/ConfigurarUbicacion";
import ColaEnCurso from "./pages/app/RecibirCola/ColaEnCurso";
import Vehiculos from "./pages/app/perfil/Vehiculos";
import ListadoRutas from "./pages/app/DarCola/ListadoRutas";

function App() {
  const access_token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");

  const { enqueueSnackbar } = useSnackbar();
  const status = useNetwork();
  if (!status) {
    enqueueSnackbar("Se ha perdido la conexion a internet!", {
      variant: "error",
    });
  }
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* REDIRIGE AL PANEL DE CONTROL SI HAY UN USUARIO LOGUEADO */}
        <Route element={<RedirectPanel user={user} access_token={access_token}/>}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* PARA ACCEDER DEBE DE EXISTIR UN UNSUARIO LOGUEADO */}
        <Route element={<RedirectLogin user={user} access_token={access_token}/>}>
          <Route path="/mapa" element={<MapView />} />
          <Route path="/perfil"  element={<Perfil user={user} access_token={access_token}/>} />
          <Route path="/rol"  element={<Rol user={user} />} />
          <Route path="/mensajes"  element={<Mensajes user={user} />} />
          <Route path="/configurar/ubicacion"  element={<ConfigurarUbicacion user={user} access_token={access_token}/>} />

          <Route element={<EstaEnCola access_token={access_token}/>}>
            <Route path="/listado/colas"  element={<ListadoColas user={user} />} />
          </Route>

          <Route element={<SalioDeCola access_token={access_token}/>}>
            <Route path="/cola/curso"  element={<ColaEnCurso user={user} access_token={access_token} />} />
          </Route>

          <Route path="/vehiculos"  element={<Vehiculos access_token={access_token} />} />
          
          {/* DAR COLA */}
          <Route element={<VerificarCola access_token={access_token}/>}>
            <Route path="/listado/rutas"  element={<ListadoRutas access_token={access_token} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
