import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Table } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import Rsidebar from "../../../components/app/Rsidebar";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };

function ListadoRutas({ access_token }) {
  const [rutas, setRutas] = useState(null);

  useEffect(() => {
    function obtener_rutas() {
      axios
        .get("rutas", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          setRutas(response.data);
        });
    }
    obtener_rutas();
  }, [rutas]);

  return (
    <>
      <div className="mx-auto my-12 pb-12 vh-100">
        <div className="bg-gray-100 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-between border-blue-800 border-b-2  mx-4">
            <h1 className="text-left block pt-5 pb-2 font-bold  text-xl sm:text-3xl text-gray-900">
              Listado de Rutas
            </h1>
            {/* <AgregarVehiculo access_token={access_token} /> */}
          </div>
          <div className="flex justify-between items-center my-5 px-6">
            {rutas === null ? (
              "Cargando..."
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="font-semibold">
                      <TableCell align="left">Nombre Direccion</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rutas.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.nombre}{" "}
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          <Switch {...label}  />
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
  );
}

export default ListadoRutas;
