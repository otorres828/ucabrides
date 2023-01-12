import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import axios from "../../../api/axios";
import icono from "../../../images/icono_perfil.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Telefono() {
  const [open, setOpen] = useState(false);
  const [numero, setNumero] = useState();
  const [telefono, setTelefono] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const modificar_telefono = (e) => {
    e.preventDefault();
    if (!telefono)
      enqueueSnackbar("No puede dejar el campo vacio", { variant: "error" });
    else {
      setOpen(false);
      setTelefono(telefono.trim());
      setTelefono(telefono.replace("+", ""));
      try {
        axios.post(`telefono`, { telefono: telefono });
        enqueueSnackbar("Telefono modificado con exito", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Error de conexion", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    axios.get("telefono").then((response) => {
      setNumero(response.data);
    });
  }, [telefono]);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="cursor-pointer w-full border-t border-gray-100  text-gray-50 hover:text-gray-600 py-4 pl-6 pr-3  block hover:bg-gray-100 transition duration-150"
      >
        <img
          src={icono}
          alt=""
          className="rounded-full h-6 shadow-md inline-block mr-2"
        />
        Mi telefono
      </div>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-2xl text-teal-900 font-bold text-center">
              Su numero actual es: {numero ? numero : "SIN NUMERO"}
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={modificar_telefono}>
              <label>Escriba tu numero telefono *</label>
              {numero &&
              <PhoneInput
                placeholder="INGRESA EL NUMERO DE TELEFONO"
                onChange={setTelefono}
                value={numero.toString()}
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              }

              <div className="flex justify-center mt-4">
                <button
                  className="mx-2 bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  type="submit"
                >
                  Agregar
                </button>
                <div
                  className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={handleClose}
                >
                  Cerrar
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Telefono;
