import React, { useEffect } from "react";
import { Table } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

function DetallesDarCola({ detalles, usuarios }) {
  return (
    <>
      <div className="w-full">
        <div className="mt-5 px-6 w-full flex flex-col items-center overflow-hidden">
          <div className="text-left vh-100 w-full pb-5">
            <h1 className=" font-medium text-gray-900 text-left">
              Informacion del Vehiculo
            </h1>
            <p>
              <small className="font-bold">Marca:</small>{" "}
              {detalles.vehiculo.marca}
            </p>
            <p>
              <small className="font-bold">Color:</small>{" "}
              {detalles.vehiculo.color}
            </p>
            <p>
              <small className="font-bold">Placa:</small>{" "}
              {!detalles.vehiculo.placa
                ? "El conductor prefiere mantenerlo en privado"
                : detalles.vehiculo.placa}
            </p>
            <p>
              <small className="font-bold">Asientos:</small> {detalles.asientos}
            </p>
            <h1 className="pt-3 font-medium text-gray-900 text-left">
              Informacion de la Cola
            </h1>

            <p>
              <small className="font-bold">hora de salida:</small>{" "}
              {detalles.hora === null ? detalles.hora : "Sin hora programada"}
            </p>
            <div className="flex">
              <h1 className="pt-3 font-medium text-gray-900 text-left">
                Usuarios para dar cola:
              </h1>
              <p className="pt-3 ml-2 text-green-500 font-bold">
                {detalles.usuarios.length}
              </p>
            </div>
            <div className="shadow rounded-lg mt-3 ">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className="font-semibold">
                    <TableCell align="left">Nombre</TableCell>
                    <TableCell align="left">correo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuarios.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetallesDarCola;
