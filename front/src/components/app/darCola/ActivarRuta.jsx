import React,{useState } from "react";
import axios from "../../../api/axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useSnackbar } from "notistack";

export default function ActivarRuta({
  cambiarModal,
  setFalse,
  setDetalle,
  ruta_id,
  vehiculos
}) {
  const [hora, setHora] = useState(null);
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState({});
  const [asientos, setAsientos] = React.useState(1)
  const { enqueueSnackbar } = useSnackbar();
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(vehiculos[0]._id);
  const refresh = () => window.location.reload(true);

  const handleClose = () => {
    setSelected({});
    cambiarModal();
    setFalse();
    setOpen(false);
  };

  const insertarOrdendeRuta = () => {
    setDetalle();
  };

  const handleActivar = ()=>{
    if(asientos>4){
      enqueueSnackbar("La cantidad de asientos no puede ser mayor que 4", { variant: "error" });
    }else{
      setOpen(false);
      axios.post(
        `crear_orden`,
        { vehiculo_id:vehiculoSeleccionado,ruta_id:ruta_id,asientos:asientos,hora:hora},
      ).then((response)=>{
        if(response.data.error)
        enqueueSnackbar(response.data.error,{ variant: "success" })
        else{
          enqueueSnackbar('Ruta activada con exito',{ variant: "success" })
          refresh();

        }
      });  
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seleccione su vehiculo</DialogTitle>
        <DialogContent>
          <select 
            value={vehiculoSeleccionado._id}
            onChange={(event)=>{ setVehiculoSeleccionado(event.target.value); console.log(vehiculoSeleccionado)}}
            className=" border p-2 mb-3 shadow-lg w-full text-slate-700 font-semibold">
            {vehiculos.map((vehiculo) => (
              <option
                className=" text-slate-700 font-semibold"
                key={vehiculo._id}
                value={vehiculo._id}
              >
                {vehiculo.marca}
              </option>
            ))}
            
          </select>
          <label className="mt-6">Escriba la cantidad de puestos</label>
          <input type="number" value={asientos} 
          onChange={(e)=>{
            setAsientos(e.target.value)
          }} className="mt-3 p-2 w-full shadow py-2"></input>
            <label className="pt-3">Hora de salida (opcional)</label>
            <input
              onChange={(e) => {
                setHora(e.target.value);
              }} 
              className="mt-2 mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="time"
              placeholder="Ingresar nombre de la ruta"
            />
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
