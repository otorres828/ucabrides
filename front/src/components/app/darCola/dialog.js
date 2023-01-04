import React,{useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useSnackbar } from "notistack";

import Axios from "axios";
export default function FormDialog({
  cambiarModal,
  setFalse,
  setDetalle,
  setVehiculo,
}) {
  const [open, setOpen] = React.useState(true);
  const [vehiculos, setVehiculos] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  const [asientos, setAsientos] = React.useState(1)
  const { enqueueSnackbar } = useSnackbar();
  const select = useRef();

  const handleClose = () => {
    console.log("Ejecutando HandleClose");
    console.log(cambiarModal);
    console.log(setFalse);
    setSelected({});
    cambiarModal();
    setFalse();
    setOpen(false);
    console.log("Cerrando modal");
  };

  const insertarOrdendeRuta = () => {
    setDetalle();
  };

  const obtenerVehiculos = async () => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    const { data } = await Axios.get(
      "https://rest-api-mongo-v2-production.up.railway.app/vehiculos/user/" +
        usuario._id
    );
    setVehiculos(data);
  };

  React.useEffect(() => {
    obtenerVehiculos();
  }, []);

  const handleListItemClick = (value: string) => {
    console.log("USted a seleccionado");
    console.log(value);
    setSelected(value);
    setVehiculo(value);
    //Insertamos la orden de la ruta aqui
    cambiarModal();
    setOpen(false);
    insertarOrdendeRuta();
  };

  const handleActivar = ()=>{
    if(asientos>4){
      enqueueSnackbar("La cantidad de asientos no puede ser mayor que 4", { variant: "error" });
    }else{
      setOpen(false);
      console.log(select.current)
      //CREAR REGISTRO DE ORDE DE RUTA
      enqueueSnackbar("La ruta se ha activado", { variant: "success" });

    }
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seleccione su vehiculo</DialogTitle>
        <DialogContent>
          <select 
            ref={select}
            className=" border p-2 mb-3 shadow-lg w-full text-slate-700 font-semibold">
            {vehiculos.map((vehiculo) => (
              <option
                className=" text-slate-700 font-semibold"
                key={vehiculo._id}
                value={vehiculo}
              >
                {vehiculo.marca}
              </option>
            ))}
            p
          </select>
          <label className="mt-6">Escriba la cantidad de puestos</label>
          <input type="number" value={asientos} 
          onChange={(e)=>{
            setAsientos(e.target.value)
          }} className="mt-2 p-2 w-full shadow py-2"></input>
        </DialogContent>
        <DialogActions>
          <div
            className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
            onClick={handleActivar}
          >
            Activar
          </div>
          <Button
            onClick={
              Object.entries(selected).length !== 0
                ? () => insertarOrdendeRuta()
                : () => handleClose()
            }
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
