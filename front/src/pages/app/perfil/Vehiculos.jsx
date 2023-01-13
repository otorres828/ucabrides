import React, { useEffect, useState } from "react";
import { Table } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import axios from "../../../api/axios";
import Dsidebar from "../../../components/app/Dsidebar";
import DropdownVehiculo from "../../../utils/DropdownVehiculo";

import AgregarVehiculo from "../../../utils/AgregarVehiculo";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState(null);
  
  useEffect(() => {
    function obtener_vehiculos() {
      axios
        .get("vehiculos")
        .then((response) => {
          setVehiculos(response.data);
        });
    }
    obtener_vehiculos();
  }, [vehiculos]);

  return (
    <>
      <div className="mx-auto my-12 pb-12 vh-100">
        <div className="bg-gray-100 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-between border-blue-800 border-b-2  mx-4">
            <h1 className="text-left block pt-5 pb-2 font-bold  text-xl sm:text-3xl text-gray-900">
              Listado de Vehiculos
            </h1>
            <AgregarVehiculo />
          </div>
          <div className="flex justify-between items-center my-5 px-6">
            {vehiculos === null ? (
              "Cargando..."
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="font-semibold">
                      <TableCell align="left">Marca</TableCell>
                      <TableCell align="left">Color</TableCell>
                      <TableCell align="right">Placa</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehiculos.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.marca}
                        </TableCell>
                        <TableCell align="left">{row.color}</TableCell>
                        <TableCell align="right">
                          {row.placa ? (
                            row.placa
                          ) : (
                            <p className="text-red-600">SIN PLACA</p>
                          )}
                        </TableCell>
                        <TableCell align="right"><DropdownVehiculo vehiculo={row} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
      <Dsidebar />
    </>
  );
}

export default Vehiculos;
