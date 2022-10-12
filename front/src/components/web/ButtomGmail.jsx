import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "../../api/axios";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from 'react-router-dom';

const clientId = '566475494260-fmfmpam1426a3r1f1bh02ap6u657hp83.apps.googleusercontent.com';

function ButtomGmail() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const responseGoogleSuccess =  (response) => {
    document.getElementById('email').innerText="";
    // console.log(response?.profileObj);
    const email = response?.profileObj.email;
    const external_id = response?.profileObj.googleId;
    const name = response?.profileObj.name;
    try {
      axios
        .post(
          "register/gmail",
          { email: email, name: name, external_id: external_id },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res?.data?.error)
            enqueueSnackbar("Correo no autorizado", { variant: "error" });
          else {
            enqueueSnackbar("Gracias por volver :D ", { variant: "success" });
            sessionStorage.setItem(
              "access_token",
              JSON.stringify(res?.data?.access_token)
            );
            sessionStorage.setItem("user", JSON.stringify(res?.data?.user));
            navigate('/panel')
          }
          // console.log(res?.data);
        });
    } catch (error) {}
  };

  const responseGoogleFailed = (response) => {
    console.log("error de conexion");
  };

  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   };
  //   gapi.load("client:auth2", initClient);
  // });
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <button
            className="btn px-0 text-white bg-red-400 hover:bg-red-500 w-full relative flex items-center"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Continuar con Correo Ucab
          </button>
        )}
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailed}
      />
    </>
  );
}

export default ButtomGmail;
