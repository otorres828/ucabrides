import React, { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "../api/axios";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 5px 10px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "1px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 5,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function DropdownContactoSos({ contacto, access_token }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const [open_modal, setOpen_modal] = useState(false);
  const [nombre, setNombre] = useState(contacto.nombre);
  const [telefono, setTelefono] = useState(contacto.telefono);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cerrar_modal = () => {
    setNombre(null);
    setTelefono(null);
    setOpen_modal(false);
  };

  const modificar_vehiculo =  (e) => {
    setOpen_modal(false);
    e.preventDefault();
    axios.put(
      `contactosos/` + contacto._id,
      { nombre: nombre, telefono: telefono },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    ).then(()=>{
      enqueueSnackbar('Contacto Modificado con exito',{ variant: "success" })
    });
  };

  const eliminar_vehiculo =  () => {
    setOpen_modal(false);
    axios.delete(
      `contactosos/` + contacto._id,
      
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    ).then(()=>{
      enqueueSnackbar('Contacto eliminado con exito',{ variant: "warning" })
    });
  };

  return (
    <div>
      <Button
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        ⚙️
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setOpen_modal(true);
          }}
          disableRipple
        >
          Editar
        </MenuItem>
        <MenuItem 
            onClick={() => {
            handleClose();
            eliminar_vehiculo();
          }}
         disableRipple>
          Eliminar
        </MenuItem>
      </StyledMenu>

      {open_modal && (
        <Dialog
          fullWidth={true}
          open={open_modal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            <div className="text-xl text-teal-900 font-bold text-center">
              Editar Contacto de Emergencia
            </div>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={modificar_vehiculo}>
            <label>Escriba el nombre del contacto *</label>
              <input
               value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                required
                className=" mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Ingresar el nombre del contacto"
              />
              <label>Escriba el numero del contacto *</label>
              <PhoneInput
                placeholder="INGRESA EL NUMERO DE TELEFONO"
                value={telefono}
                onChange={setTelefono}
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="flex justify-center mt-4">
                <button
                  className="mx-2 bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  type="submit"
                >
                  Cambiar
                </button>
                <div
                  className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                  onClick={cerrar_modal}
                >
                  Cerrar
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default DropdownContactoSos;
