import * as React from "react";
import FormDialog from "../../../components/app/darCola/dialog.js";
import DetalleOrdenDialog from "../../../components/app/darCola/detallesOrden.js";
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

function ListadoRutas({ access_token }) {
  const [rutas, setRutas] = React.useState(null);
  const [checkedState, setCheckedState] = React.useState([]);
  const [modalHandler, setmodalHandler] = React.useState(false);
  const [detalleOrden, setDetalleOrden] = React.useState(false);
  const [dataVehiculo, setdataVehiculo] = React.useState({});
  const [dataRuta, setDataRuta] = React.useState({});
  const [ordenes, setOrdenes] = React.useState([]);
  //new Array(rutas.length).fill(false)

  React.useEffect(() => {
    obtenerRutas();
    obtenerOrdenes();
  }, []);

  const obtenerRutas = () => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    axios
      .get("rutas",{
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setRutas(response.data);
      });
  };
  const obtenerOrdenes = () => {
    axios
      .get("https://rest-api-mongo-v2-production.up.railway.app/orden/")
      .then((response) => {
        setOrdenes(response.data);
      });
    //setCheckedState(new Array(rutas.length).fill(false));
  };

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
  };
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
    const response = await axios.put(
      "https://rest-api-mongo-v2-production.up.railway.app/rutas/" + id,
      { estatus: false }
    );
    console.log(response);

    for (let i = 0; i < ordenes.length; i++) {
      if (ordenes[i].estatus === "activo" && ordenes[i].ruta_id === id) {
        let iddeorden = ordenes[i]._id;
        const r = await axios.put(
          "https://rest-api-mongo-v2-production.up.railway.app/orden/" +
            iddeorden,
          { estatus: "CANCELADO" }
        );
      }
    }

    refresh();
  };

  const sethandleFalse = () => {
    const buscando = checkedState.map((item, index) => {
      return false;
    });
    setCheckedState(buscando);
  };
  return modalHandler === false && detalleOrden === false ? (
    <>
      <div className="mx-auto my-12 pb-12 vh-100">
        <div className="bg-gray-100 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-between border-blue-800 border-b-2  mx-4">
            <h1 className="text-left block pt-5 pb-2 font-bold  text-xl sm:text-3xl text-gray-900">
              Listado de Rutas
            </h1>
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
                  {rutas.map((ruta, index) => (
                    <TableRow
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            )}
            </div>
        </div>
      </div>
      <Rsidebar />
    </>
  ) : detalleOrden === false ? (
    <FormDialog
      cambiarModal={() => setmodalHandler(false)}
      setFalse={() => sethandleFalse()}
      setDetalle={() => setDetalleOrden(true)}
      setVehiculo={setdataVehiculo}
    />
  ) : (
    <DetalleOrdenDialog
      dataVehiculoSelected={dataVehiculo}
      dataRutaSelected={dataRuta}
      setDetalle={() => setDetalleOrden(false)}
      setModal={() => setmodalHandler(false)}
      cargar={() => refresh()}
    />
  );
}

export default ListadoRutas;
