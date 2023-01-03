import * as React from 'react';
import FormDialog from '../../../components/app/darCola/dialog.js'
import DetalleOrdenDialog from '../../../components/app/darCola/detallesOrden.js';
import axios from 'axios';
/*************************************/
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
/*************************************/
import Rsidebar from '../../../components/app/Rsidebar';
function ListadoRutas({ access_token }) {
  const [rutas, setRutas] = React.useState([]);
  const [checkedState, setCheckedState] = React.useState([]);
  const [modalHandler, setmodalHandler] = React.useState(false);
  const [detalleOrden, setDetalleOrden] = React.useState(false);   
  const [dataVehiculo, setdataVehiculo] = React.useState({});
  const [dataRuta, setDataRuta] = React.useState({});
  const [ordenes, setOrdenes] = React.useState([]);
   //new Array(rutas.length).fill(false)

  React.useEffect( ()=>{
    obtenerRutas();
    obtenerOrdenes();
  },[]);

  const obtenerRutas = () => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    axios.get("https://rest-api-mongo-v2-production.up.railway.app/rutas/user/"+usuario._id)
    .then((response) => {
      setRutas(response.data);
    });
  }
  const obtenerOrdenes = () => {
    axios.get("https://rest-api-mongo-v2-production.up.railway.app/orden/")
    .then((response) => {
      setOrdenes(response.data);
    });
    //setCheckedState(new Array(rutas.length).fill(false));
  }

  const handleOnChange = (position) => {
    /*
    console.log(position);
    const revisado = checkedState.map((item,index) => {
      return index === position ? !item : item;
    });
    */
    const rutaSelected = rutas[position];
    console.log("rutaSelected");
    console.log(rutaSelected);
    setDataRuta(rutaSelected);

    //Aqui abrimos el modal para seleccionar los vehiculos
    setmodalHandler(true);
  }
/*
  const validarStatusRuta = async () => {
    console.log("Iniciando status de ruta");
    //Lo primero que tenemos que validar es, si ya hay una orden de ruta con estatus activo
    //Si hay una orden de ruta con el estatus activo, marcalos la ruta con ese estado
    const { data } = await Axios.get('https://rest-api-mongo-v2-production.up.railway.app/orden');
    console.log(rutas);
    const arrayRutasActivas = rutas.map( (item) => {
      console.log(item);
      return (item.estatus === true) ? item : null;
    });
    console.log("data");
    console.log(data);
    console.log("arrayRutasActivas");
    console.log(arrayRutasActivas);
  }
*/
  const refresh = () => window.location.reload(true);
  const desactivarRuta = async (id) => {
    const response = await axios.put("https://rest-api-mongo-v2-production.up.railway.app/rutas/"+id,{estatus: false})
    console.log(response);
    
    for( let i = 0; i < ordenes.length ; i++){
      if(ordenes[i].estatus === "ACTIVADO" && ordenes[i].ruta_id === id){
        let iddeorden = ordenes[i]._id;
        const r = await axios.put("https://rest-api-mongo-v2-production.up.railway.app/orden/"+iddeorden,{estatus: "CANCELADO"});
      }
    }
    
    refresh();
  
  }

  const sethandleFalse = () => {
    const buscando = checkedState.map((item,index) => {
      return false;
    });
    setCheckedState(buscando);
  }
        return modalHandler === false && detalleOrden === false ? (
          <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID-Ruta</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Estatus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rutas.map((ruta,index) => (
                  <TableRow
                    key={ruta._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {ruta._id}
                    </TableCell>
                    <TableCell >{ruta.nombre}</TableCell>
                    <TableCell ><input 
                            type="checkbox" 
                            id={ruta._id}
                            name={ruta.nombre}
                            value={ruta._id}
                            checked={ruta.estatus}
                            onChange = {(ruta.estatus === false ) ? () => handleOnChange(index) : () => {  desactivarRuta(ruta._id) }}
                          /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Rsidebar />
          </>
         )
        :
        (detalleOrden === false)
        ?
        <FormDialog cambiarModal={() => setmodalHandler(false)} setFalse = {() => sethandleFalse()} setDetalle = {() => setDetalleOrden(true)} setVehiculo = {setdataVehiculo}/>
        :
        <DetalleOrdenDialog dataVehiculoSelected = {dataVehiculo} dataRutaSelected = {dataRuta} setDetalle = {() => setDetalleOrden(false)} setModal = {() => setmodalHandler(false)} cargar = { () =>refresh()}/>
}

export default ListadoRutas;
