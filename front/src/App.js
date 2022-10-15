import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import Home from "./pages/web/Home";
import Login from "./pages/web/Login";
import SignUp from "./pages/web/SignUp";
import ResetPassword from "./pages/web/ResetPassword";
import AOS from "aos";
import { useSnackbar } from "notistack";
import useNetwork from "./hooks/useNetwork";
import { RedirectLogin, RedirectPanel } from "./components/ProtectedRoute";
import Perfi from "./components/app/Perfil";
import MapView from "./components/app/MapView";

function App() {
  const access_token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");

  const { enqueueSnackbar } = useSnackbar();
  const status = useNetwork();
  if (!status) {
    console.log("ejecutando");
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        {/* PARA ACCEDER DEBE DE EXISTIR UN UNSUARIO LOGUEADO */}
        <Route element={<RedirectLogin user={user} access_token={access_token}/>}>
          <Route path="/mapa" element={<MapView />} />
          <Route path="/perfil"  element={<Perfi user={user} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
