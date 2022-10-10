import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../partials/web/Header";
import axios from "../../api/axios";
import { useSnackbar } from "notistack";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';
const clientId = '566475494260-fmfmpam1426a3r1f1bh02ap6u657hp83.apps.googleusercontent.com';

function Login() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const enviarFormularioLogin = async (e) => {
    e.preventDefault();
    try {
       axios.post('login',
       {email:email,password:password},
        {
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
         },
        }
      )
      .then((res)=>{
        if(res?.data?.error)
          enqueueSnackbar(res?.data?.error, { variant: "error" });
        else{
          enqueueSnackbar("Gracias por volver :D ", { variant: "success" });
          sessionStorage.setItem('access_token',JSON.stringify(res?.data?.access_token));
          sessionStorage.setItem('user',JSON.stringify(res?.data?.user));
        }
          // console.log(res?.data);
      })

    } catch (error) {
      enqueueSnackbar("Error de conexion al servidor", { variant: "error" });
    }
  };
  
  const responseGoogleSuccess = async (response) => {
    // console.log(response?.profileObj);
    const email =response?.profileObj.email;
    const external_id =response?.profileObj.googleId;
    const name =response?.profileObj.name;
    try {
      axios.post('register/gmail',
      {email:email,name:name,external_id:external_id},
       {
         headers: { 
           "Content-Type": "application/json",
           "Accept": "application/json",
        },
       }
     )
     .then((res)=>{
       if(res?.data?.error)
         enqueueSnackbar('Correo no autorizado', { variant: "error" });
       else{
         enqueueSnackbar("Gracias por volver :D ", { variant: "success" });
         sessionStorage.setItem('access_token',JSON.stringify(res?.data?.access_token));
         sessionStorage.setItem('user',JSON.stringify(res?.data?.user));
       }
         // console.log(res?.data);
     })
    } catch (error) {
      
    }
  };

  const responseGoogleFailed = (response) => {
    console.log('error de conexion');
  };


  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
      };
      gapi.load('client:auth2', initClient);
  },[]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Bienvenido a</h1>

                <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  UCAB RIDES
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={enviarFormularioLogin}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Correo Ucab
                      </label>
                      <input
                        id="email"
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        autoComplete="off"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="usuario@est.ucab.edu.ve"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Clave
                        </label>
                        <Link
                          to="/reset-password"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Olvidaste tu clave?
                        </Link>
                      </div>
                      <input
                        type="password"
                        className="form-input w-full text-gray-800"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="off"
                        placeholder="*******"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">
                            Mantener la sesion iniciada
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Iniciar Sesion
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-2"></div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <GoogleLogin
                      clientId={clientId}
                      render={(renderProps) => (
                        <button
                          className="btn px-0 text-white bg-red-500 hover:bg-red-700 w-full relative flex items-center"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          Continuar con Correo Ucab
                        </button>
                      )}
                      isSignedIn={true}
                      onSuccess={responseGoogleSuccess}
                      onFailure={responseGoogleFailed}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
