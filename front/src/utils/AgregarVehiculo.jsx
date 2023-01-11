import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import axios from "../api/axios";

function AgregarVehiculo() {
  const [open, setOpen] = useState(false);
  const [marca, setMarca] = useState(null);
  const [color, setColor] = useState(null);
  const [placa, setPlaca] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const agregar_vehiculo = (e) => {
    setOpen(false);
    e.preventDefault();
    axios.post(
      `vehiculos`,
      { marca: marca, color: color, placa: placa }
    ).then(()=>{
      enqueueSnackbar('Vehiculo agregado con exito',{ variant: "success" })
    });  
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
            <div className="text-2xl text-teal-900 font-bold text-center">
              Agregar Vehiculo
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={agregar_vehiculo}>
              <label>Escriba la marca del vehiculo *</label>
              <input
                onChange={(e) => {
                  setMarca(e.target.value);
                }}
                required
                className="uppercase mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Ingresar Marca del Vehiculo"
              />
              <label>Escriba el color del vehiculo *</label>
              <input
                onChange={(e) => setColor(e.target.value)}
                required
                type="text"
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingrese Color"
              />
              <label>Escriba la placa del vehiculo (opcional)</label>
              <input
                onChange={(e) => setPlaca(e.target.value)}
                className="uppercase shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Ingrese Placa"
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

export default AgregarVehiculo;
