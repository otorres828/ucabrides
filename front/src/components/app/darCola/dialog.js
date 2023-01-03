import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Axios from 'axios';
export default function FormDialog({cambiarModal,setFalse,setDetalle,setVehiculo}) {
  const [open, setOpen] = React.useState(true);
  const [vehiculos, setVehiculos] = React.useState([]);
  const [selected, setSelected] = React.useState({});

  const handleClose = () => {
    console.log("Ejecutando HandleClose");
    console.log(cambiarModal);
    console.log(setFalse);
    setSelected({});
    cambiarModal();
    setFalse();
    setOpen(false);
    console.log('Cerrando modal');

  };

  const insertarOrdendeRuta = () => {
    setDetalle();
  };

  const obtenerVehiculos = async () => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const {data}= await Axios.get("https://rest-api-mongo-v2-production.up.railway.app/vehiculos/user/"+usuario._id);
    setVehiculos(data);
  }

  React.useEffect( () => {
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
   
  
    return(<Dialog open={open} onClose={handleClose}>
      <DialogTitle>Seleccione su vehiculo</DialogTitle>
      <List sx={{ pt: 0 }}>
      {vehiculos.map((vehiculo) => (
        <ListItem disableGutters key={vehiculo._id}>
          <ListItemButton onClick={() => handleListItemClick(vehiculo)} key={vehiculo._id} /*href="http://localhost:3000/listado/rutas"*/>
            <ListItemText primary={vehiculo.placa} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
      <DialogActions>
        <Button onClick={(Object.entries(selected).length !== 0) ? (() => insertarOrdendeRuta()) : () => handleClose()}>Cancel</Button>
      </DialogActions>
    </Dialog>);
      
}