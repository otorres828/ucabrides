import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DistanciaMasCorta } from "../../hooks/RutaMasCorta";


function BasicTable({rutas,localizacion_usuario,distancia}) {
  const [puntomascerca, setPuntomascerca] = useState();
  const [rutas_disponibles, setRutas_disponibles] = useState([]);
  const google = window.google;
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const verificar_distancia= async (destino) =>{
    const ruta = {
      id:destino.id,
      lat: parseFloat(destino.lat),
      lng: parseFloat(destino.lng),
      
    };
    var directionsService =  new google.maps.DirectionsService();
    
    const results = await directionsService.route({
      origin: ucab,
      destination: ruta,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    const direccion = results.routes[0].overview_path;
    var punto = DistanciaMasCorta(direccion, localizacion_usuario);

    setPuntomascerca({
      lat: punto[1],
      lng: punto[2],
    });
    if (distancia >= punto[0]){
      const obj = {
        id:ruta.id,
        lat:ruta.lat,
        lng:ruta.lng,
        distancia:punto[0],
        puntomascerca:puntomascerca,
      };
      console.log(puntomascerca)
      setRutas_disponibles([...rutas_disponibles, obj]);
    }
  }

  useEffect(()=>{
    function calcularRutas(){
      rutas.forEach((ruta) =>{
        verificar_distancia({lat:ruta.lat,lng:ruta.lng,id:ruta._id});
      });
    }
    calcularRutas();
  },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>id</TableCell>
          <TableCell>latitud</TableCell>
            <TableCell align="left">altitud</TableCell>
            <TableCell align="left">distancia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rutas_disponibles.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell component="th" scope="row">{row.lat}</TableCell>
              <TableCell align="left">{row.lng}</TableCell>
              <TableCell align="left">{row.distancia}m</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  
}

export default BasicTable;
