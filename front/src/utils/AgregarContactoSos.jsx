import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import axios from "../api/axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function AgregarContactoSos() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(null);
  const [numero, setNumero] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const agregar_contacto = (e) => {
    setOpen(false);
    e.preventDefault();
    axios
      .post(
        `contactosos`,
        { nombre: nombre, telefono: numero }
      )
      .then((response) => {
        if(response.data.error)
          enqueueSnackbar(response.data.error, { variant: "info" });
        else
        enqueueSnackbar("Contacto agregado con exito", { variant: "success" });
      });
      setNombre(null);
      setNumero(null);
  };

  return (
    <>
      <div
        className="bg-blue-600 m-2.5 p-2 rounded-lg circle cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        ➕
      </div>

      {open && (
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-xl text-teal-900 font-bold text-center">
              Agregar hasta tres (3) contactos de emergencia
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={agregar_contacto}>
              <label>Escriba el nombre del contacto *</label>
              <input
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                required
                className=" mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Ingresar el nombre del contacto"
              />
              <label>Escriba el numero del contacto *</label>
              <PhoneInput
                placeholder="INGRESA EL NUMERO DE TELEFONO"
                value={numero}
                onChange={setNumero}
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

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

export default AgregarContactoSos;
