import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Rsidebar from "../../../components/app/Rsidebar";
import { Table } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AgregarContactoSos from "../../../utils/AgregarContactoSos";
import { useSnackbar } from "notistack";

function ContactosSos({ access_token }) {
  const [contactos, setContactos] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEliminar = async (id) => {
    setAnchorEl(null);
    axios.delete(
      `contactosos/` + id,
      
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    ).then(()=>{
      enqueueSnackbar('Contacto eliminado con exito',{ variant: "warning" })
    });
  }

  useEffect(() => {
    function obtener_contactos() {  
      axios
        .get("contactosos", {headers :{
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        }})
        .then((response) => {
          setContactos(response.data);
        });
    }

    obtener_contactos();
  }, [contactos,access_token]);

  return (
    <>
      <div className="mx-auto my-12 pb-12 vh-100">
        <div className="bg-gray-100 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-between border-blue-800 border-b-2  mx-4">
            <h1 className="text-left block pt-5 pb-2 font-bold  text-xl sm:text-3xl text-gray-900">
              Contactos de emergencia
            </h1>
            <AgregarContactoSos access_token={access_token} />
          </div>
          <div className="flex justify-between items-center my-5 px-6">
            {contactos === null ? (
              "Cargando..."
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="font-semibold">
                      <TableCell align="left">Nombre</TableCell>
                      <TableCell align="left">Numero Telefono</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contactos.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.nombre}
                        </TableCell>
                        <TableCell align="left">
                        {row.telefono}
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex justify-end">
                            <div className="bg-blue-600 text-center rounded-lg p-2 w-16 cursor-pointer font-bold text-white"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              ⚙️
                            </div>
                            <Menu
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem onClick={handleClose}>Editar</MenuItem>
                              <MenuItem onClick={ ()=>handleEliminar(row._id) }>
                                Eliminar
                              </MenuItem>
                            </Menu>
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
      <Rsidebar />
    </>
  );
}

export default ContactosSos;
