import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import logo from "../../../images/fondo_logos.png";
import Dsidebar from "../../../components/app/Dsidebar";
import { Flex } from "@chakra-ui/react";
import axios from "../../../api/axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete from "../../../utils/PlacesAutocomplete";
import { useNavigate } from "react-router-dom";
const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;

export default function CrearRuta() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return isLoaded ? (
    <Map />
  ) : (
    <div className="flex h-screen justify-center items-center  rounded-lg">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

function Map() {
  const [selected, setSelected] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [map, setMap] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const google = window.google;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlecrear = async () => {
    if(nombre){
      axios.post("crear_ruta", {
        lat: ubicacion.lat(),
        lng: ubicacion.lng(),
        nombre: nombre,
      });
      enqueueSnackbar("Ruta creada exitosamente :D ", {
        variant: "success",
      });
      setOpen(false);
      navigate('../../listado/rutas');
    }else{
      enqueueSnackbar("No puede dejar el campo vacio ", {
        variant: "error",
      });
    }
  };

  function obtener_mi_ubicacion() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setSelected({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      map.panTo(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
      );
    });
  }

  const calcular_ruta = async () => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: ucab,
      destination: ubicacion ? ubicacion : selected,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDireccion(results);
  };

  useEffect(() => {
    function panto() {
      if (selected !== null)
        map.panTo(new google.maps.LatLng(selected.lat, selected.lng));
    }
    panto();
  }, [selected]);

  useEffect(() => {
    function panto() {
      if (ubicacion !== null) {
        map.panTo(new google.maps.LatLng(ubicacion.lat(), ubicacion.lng()));
      }
    }
    panto();
  }, [ubicacion]);

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <GoogleMap
          onLoad={(map) => setMap(map)}
          mapContainerStyle={containerStyle}
          center={ucab}
          zoom={17}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={ucab} />
          {selected && (
            <Marker
              position={selected}
              draggable={true}
              onDragEnd={(e) => setUbicacion(e.latLng)}
            />
          )}
          <div className="pt-5 flex absolute inset-x-0 shadow-xl w-3/4 md:w-2/5 mx-auto -mt-1 rounded-lg rounded-t-none">
            <PlacesAutocomplete setSelected={setSelected} />
            {selected && (
              <Button
                onClick={() => {
                  calcular_ruta();
                }}
                className=""
                variant="contained"
              >
                Calcular
              </Button>
            )}
          </div>

          {direccion && <DirectionsRenderer directions={direccion} />}
        </GoogleMap>
      </Flex>
      {selected && (
        <div className="fixed bottom-20 z-30 rounded-lg mx-auto">
          <div className="content-center   justify-between">
            <div className="m-3 rounded-lg bg-gradient-to-l  vh-100 flex flex-row md:flex-col pt-3 md:py-3  px-2 text-center ">
              <button
                className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
                onClick={() => setOpen(true)}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={obtener_mi_ubicacion}
        className="z-20  xl:w-96 mx-auto absolute right-2 bottom-20 mr-9  sm:justify-center flex"
        style={{ transform: "traslateX(-50%)", margin: "auto" }}
      >
        <div className="justify-center text-center mt-20">
          <div
            style={{ cursor: "pointer" }}
            className="  bg-white rounded-lg p-2"
          >
            {location}
          </div>
        </div>
      </div>
      {open && (
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="text-2xl text-teal-900 font-bold text-center">
              Crear Ruta
            </div>
          </DialogTitle>
          <DialogContent>
            <label>¿Con que nombre quiere guardar la ruta? *</label>
            <input
              onChange={(e) => {
                setNombre(e.target.value);
              }} 
              className="pt-2 mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Ingresar nombre de la ruta"
            />
          
            <div className="flex justify-center">
              <div
                className="mr-2 bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                onClick={handlecrear}
              >
                Crear
              </div>
              <div
                className="bg-green-500 font-semibold rounded-lg p-3 text-white cursor-pointer"
                onClick={handleClose}
              >
                Cerrar
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Dsidebar />
    </>
  );
}
