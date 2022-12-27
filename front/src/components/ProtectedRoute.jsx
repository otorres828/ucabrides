import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../api/axios";

export const RedirectPanel = ({ user, access_token, children,redirectTo = "/rol",}) => {
  if (user && access_token) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

export const RedirectLogin = ({ user, access_token,children, redirectTo = "/login",}) => {
  if (!user || !access_token) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};

export const EstaEnCola = ({access_token,children,redirectTo = "/cola/curso"}) => {
    const [estatus,setEstatus]= useState(null);
    useEffect(()=>{
      axios.get("me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }).then((response) => {
        setEstatus(response.data);
      });
    },[])

    if(estatus!==null){
      if(estatus.cola==='true' || estatus.cola==='aprobado'){
        localStorage.setItem(
          "ucabrides_orden_ruta_id",estatus.orden_ruta_id
        );
        console.log('hay una orden en curso')
        return <Navigate to={redirectTo} />
      }else if(estatus.cola==='aprobado' ){
        console.log('hay una orden en curso')
        return <Navigate to="/cola/aprobada" />
      }else{
        localStorage.removeItem('ucabrides_orden_ruta_id');
      }
    }

  return children ? children : <Outlet />;
};

export const SalioDeCola = ({access_token,children,redirectTo = "/listado/colas"}) => {
  const orde_ruta_id = localStorage.getItem('ucabrides_orden_ruta_id');
  if(orde_ruta_id===null){
      console.log('NO hay colas en curso')
      return <Navigate to={redirectTo} />

  }

return children ? children : <Outlet />;
};
