import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function Detalles_ruta({ row }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="text-2xl text-teal-900 font-bold text-center">
          Detalles de la Cola
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="container mx-auto">
              <div className="flex justify-center">
                <div>
                  <a href="https://wa.me/584148848537">
                    
                  </a>
                </div>
                <div>
                  <a href="https://github.com/otorres828">
                    <img className="opacity-80" src="./github.png" />
                  </a>
                </div>
                <div>
                  <a href="mailto:olivertorres1997@gmail.com">
                    <img src="./gmail_144.svg" />
                  </a>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
            onClick={handleClose}
          >
            Cerrar
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Detalles_ruta;
