import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "../../api/axios";
import { gapi } from "gapi-script";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { useNavigate } from "react-router-dom";

const clientId ="566475494260-fmfmpam1426a3r1f1bh02ap6u657hp83.apps.googleusercontent.com";

function ButtomGmail() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const responseGoogleSuccess = async (response) => {
    document.getElementById("email").innerText = "";
    const email = response?.profileObj.email;
    const external_id = response?.profileObj.googleId;
    const name = response?.profileObj.name;
    const avatar = response?.profileObj.imageUrl;
    try {
      const res = await axios.post(
        "register/gmail",
        { email: email, name: name, external_id: external_id, avatar: avatar },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (res.data.error)
        enqueueSnackbar("El correo seleccionado no es de la ucab", {
          variant: "error",
        });
      else {
        enqueueSnackbar("Gracias por volver :D ", { variant: "success" });
        localStorage.setItem(
          "access_token",res.data.access_token
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/rol");
      }
    } catch (error) {
      enqueueSnackbar("Error de conexion", { variant: "error" });
    }
  };

  const responseGoogleFailed = (response) => {
    console.log("error de conexion "+ response);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <>
      <GoogleLogin className="w-full justify-center text-white bg-red-400 hover:bg-red-500"
        clientId={clientId}
        buttonText="Continuar con Correo Ucab"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailed}
      />
    </>
  );
}

export default ButtomGmail;
