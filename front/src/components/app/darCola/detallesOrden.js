import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Axios from 'axios';
export default function DetalleOrdenDialog({setDetalle,dataVehiculoSelected,dataRutaSelected,setModal,cargar}) {
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState({});
  const [openOrden, setOpenOrden] = React.useState(false);
  const [openResumen, setOpenResumen] = React.useState(false);
  const [asientos, setAsientos] = React.useState(1)
  const [ordenData, setOrdenData] = React.useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseOrden = () => {
    setOpenOrden(false);
  };

  const extraerDatos = async () => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    console.log("Detalles de ruta");
    console.log("**************************");
    console.log(dataVehiculoSelected);
    console.log(dataRutaSelected);
    setUser(usuario);
    console.log(usuario);
    console.log("**************************");
  }
  const insertarOrdendeRuta = async () => {
    console.log("Insertando orden de ruta")
    const resultado = await Axios.post('https://rest-api-mongo-v2-production.up.railway.app/orden',
    {
      estatus: 'ACTIVADO',
      ruta_id: dataRutaSelected._id,
      asientos: asientos,
      vehiculo_id: dataVehiculoSelected._id,
      usuarios: []
    });
    console.log(resultado);
    const actualizar = await Axios.put("https://rest-api-mongo-v2-production.up.railway.app/rutas/"+dataRutaSelected._id,{estatus: true});
    //Creamos una nueva orden de ruta
    console.log(actualizar);
    setDetalle();
    setModal();
    handleCloseOrden();
    cargar();

  };

  React.useEffect( () => {
    extraerDatos();
  },[]);

  const handleAsiento = (e) => {
    if(e.target.value <= 0){
      console.log("ERROR");
    }else{
      console.log(e.target.value);
      setAsientos(e.target.value);
    }
  };

  const resumirDetalle = () => {
    handleClose();
    setOpenOrden(true);
    setOpenResumen(true);

  }

    return (openResumen === false )
    ? (
        <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cantidad de asientos</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Inserte la cantidad de asientos disponibles para la cola
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="asientos"
            label="Number"
            type="number"
            fullWidth
            variant="standard"
            value={asientos}
            onChange={handleAsiento}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => resumirDetalle() }>Ver Resumen</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
    :
    <div>
      <Dialog open={openOrden} onClose={handleCloseOrden}>
        <DialogTitle>Resumen de Orden</DialogTitle>
        <List>
          <ListItem disablePadding>
              <ListItemText primary={"Conductor " + user.name} />
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary={"Ruta " + dataRutaSelected.nombre} />
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary={"Cantidad de asientos " + asientos} />
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary={"Vehiculo " + dataVehiculoSelected.placa} />
          </ListItem>
        </List>
        <DialogActions>
          <Button onClick={() => handleCloseOrden()}>Cancel</Button>
          <Button onClick={() => insertarOrdendeRuta() }>Activar ordena</Button>
        </DialogActions>
      </Dialog>
    </div>
}