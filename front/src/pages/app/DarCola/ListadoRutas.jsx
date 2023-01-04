import * as React from "react";
import ActivarRuta from "../../../components/app/darCola/ActivarRuta";
import axios from "../../../api/axios.js";
/*************************************/
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
/*************************************/
import Rsidebar from "../../../components/app/Rsidebar";
import { useSnackbar } from "notistack";

function ListadoRutas({ access_token }) {
  const [rutas, setRutas] = React.useState(null);
  const [checkedState, setCheckedState] = React.useState([]);
  const [modalHandler, setmodalHandler] = React.useState(false);
  const [detalleOrden, setDetalleOrden] = React.useState(false);
  const [dataRuta, setDataRuta] = React.useState({});
  const [ordenes, setOrdenes] = React.useState([]);
  const [rutaseleccionada, setRutaseleccionada] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const [vehiculos, setVehiculos] = React.useState(null);
  const refresh = () => window.location.reload(true);

  const obtenerRutas =() => {
    axios
      .get("rutas",{
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }).then((res)=>{
        setRutas(res.data);
      }) 
  };

  const obtenerOrdenes = () => {
    axios
      .get("ordenes_rutas",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        }
      })
      .then((response) => {
        setOrdenes(response.data);
      });
  };

  const obtenerVehiculos = async () => {
    const { data } = await axios.get("vehiculos", {headers: {Authorization: `Bearer ${access_token}`, Accept: "application/json", }, });
    setVehiculos(data);
  };

  const handleOnChange = (position) => { 
    if (rutas!==null){
      var ban = false;
      rutas.map(function (ruta) {
          if(ruta.estatus===true)
             ban=true
      })
     
      if(!ban){
        setRutaseleccionada(rutas[position]);
        setDataRuta(rutaseleccionada);
        //Aqui abrimos el modal para seleccionar los vehiculos
        setmodalHandler(true);
      }else{
        enqueueSnackbar('Ya tiene una ruta activa',{ variant: "error" })
      }
    }
  };
  
  const desactivarRuta = async (id) => {
    var iddeorden;
    if(ordenes.usuarios.lenght>0){
      enqueueSnackbar('Esta ruta tiene usuarios asignados, debes de cancelarla o completarla',{ variant: "error" })
    }else{
      //DESACTIVAR ORDEN Y RUTA
      enqueueSnackbar('Ruta desactivada con exito',{ variant: "success" })
      iddeorden = ordenes._id;
      const r = await axios.post(
        `desactivar`,
        { orden_ruta_id:iddeorden,ruta_id:id},
        {
          headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
              },
            }
            );
        }
        refresh();
      };
      
  const sethandleFalse = () => {
    const buscando = checkedState.map((item, index) => {
      return false;
    });
    setCheckedState(buscando);
  };

  React.useEffect(() => {
    obtenerRutas();
    obtenerOrdenes();
    obtenerVehiculos()
  }, [rutas]);

  return  detalleOrden === false ? (
    <>
      <div className="mx-auto my-12 pb-12 vh-100">
        <div className="bg-gray-100 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-between border-blue-800 border-b-2  mx-4">
            <h1 className="text-left block pt-5 pb-2 font-bold  text-xl sm:text-3xl text-gray-900">
              Listado de Rutas
            </h1>
            <div
        className="bg-blue-600 m-2.5 p-2 rounded-lg circle cursor-pointer"
      >
        ➕
      </div>
            </div>
            <div className="flex justify-between items-center my-5 px-6">
            {rutas === null ? (
              "Cargando..."
            ) : (
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Estatus</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rutas.map((ruta, index) => 
                   
                   ( <TableRow
                      key={ruta._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >  
                      <TableCell>{ruta.nombre}</TableCell>
                      <TableCell align="right">
                        <input
                          type="checkbox"
                          id={ruta._id}
                          name={ruta.nombre}
                          value={ruta._id}
                          checked={ruta.estatus}
                          onChange={
                            ruta.estatus === false
                              ? () => handleOnChange(index)
                              : () => {
                                  desactivarRuta(ruta._id);
                                }
                          }
                        />
                      </TableCell>
                    </TableRow>)
                    
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            )}
            </div>
          
          {modalHandler && vehiculos &&
            <ActivarRuta
              cambiarModal={() => setmodalHandler(false)}
              setFalse={() => sethandleFalse()}
              setDetalle={() => setDetalleOrden(true)}
              ruta_id={rutaseleccionada._id}
              access_token={access_token}
              vehiculos={vehiculos}
            />
          }

        </div>
      </div>
      <Rsidebar />
    </>
  ) : detalleOrden === false ? (
   <div></div>
  ) : (
   <></>
  );
}

export default ListadoRutas;
