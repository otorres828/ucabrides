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
        setEstatus(response.data)
      });
    },[])

    if(estatus!==null){
      if(estatus.cola===true){
        console.log('hay una orden en curso')
        return <Navigate to={redirectTo} />
        }
    }

  return children ? children : <Outlet />;
};
