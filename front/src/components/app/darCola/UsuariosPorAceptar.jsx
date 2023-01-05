import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Table } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

function UsuariosPorAceptar({ usuarios, orden_ruta_id, access_token }) {
  const check = <FontAwesomeIcon icon={faCheck} />;
  const eliminar = <FontAwesomeIcon icon={faTrash} />;
  const { enqueueSnackbar } = useSnackbar();

  const aceptar = (user) => {
    axios
      .post(
        "agregar_usuario_orden",
        { user: user, orden_ruta_id: orden_ruta_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.error)
          enqueueSnackbar(response.data.error, { variant: "error" });
        else
          enqueueSnackbar("usuario agregado con exito", { variant: "success" });
      });
  };

  const rechazar = (user) => {
    axios
      .post(
        "rechazar_usuario_orden",
        { user: user, orden_ruta_id: orden_ruta_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.error)
          enqueueSnackbar(response.data.error, { variant: "error" });
        else
          enqueueSnackbar("usuario rechazado con exito", { variant: "success" });
      });
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-5 px-6 w-full flex flex-col items-center overflow-hidden">
          <div className="text-left vh-100 w-full pb-5">
            {usuarios && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="font-semibold">
                      <TableCell align="left">Nombre</TableCell>
                      <TableCell align="left">correo</TableCell>
                      <TableCell align="right">Acciones</TableCell>
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
                          {row.user.name}
                        </TableCell>
                        <TableCell align="left">{row.user.email}</TableCell>
                        <TableCell align="right">
                          <div className="flex ">
                            <button
                              onClick={() => {
                                aceptar(row.user);
                              }}
                              className="p-2 bg-green-600 font-bold text-white rounded-lg shadow"
                            >
                              {check}
                            </button>
                            <button
                              onClick={() => {
                                rechazar(row.user);
                              }}
                              className="p-2 ml-1 bg-red-600 font-bold text-white rounded-lg shadow"
                            >
                              {eliminar}
                            </button>
                          </div>
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
    </>
  );
}

export default UsuariosPorAceptar;
