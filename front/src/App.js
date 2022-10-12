import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import Home from "./pages/web/Home";
import Login from "./pages/web/Login";
import SignUp from "./pages/web/SignUp";
import ResetPassword from "./pages/web/ResetPassword";
import Panel from "./pages/app/Panel";
import AOS from "aos";
import { useSnackbar } from "notistack";
import useNetwork from "./hooks/useNetwork";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const status=useNetwork();
  if(!status){
    console.log('ejecutando')
      enqueueSnackbar("Se ha perdido la conexion a internet!", {variant: "error",})
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/panel" element={<Panel />} />
      </Routes>
    </>
  );
}

export default App;
