import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import logo from "../../../images/fondo_logos.png";
import Rsidebar from "../../../components/app/Rsidebar";
import {  Flex } from "@chakra-ui/react";
import Button from "@mui/material/Button";
import axios from "../../../api/axios";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import PlacesAutocomplete from "../../../utils/PlacesAutocomplete";

const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;
export default function ConfigurarUbicacion() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return isLoaded ? (
    <Map  />
  ) : (
    <div className="flex h-screen justify-center items-center  rounded-lg">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

function Map() {
  const [selected, setSelected] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [map, setMap] = useState(null);
  const [direccion_usuario, setDireccion_usuario] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const google = window.google;

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const handlecambiar = async () => {
    try {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      const res = await axios.post(`cambiar_ubicacion`, {
        LatLng:  ubicacion ? ubicacion : selected,
      });

      if (res.data.error) enqueueSnackbar(res.data.error, { variant: "error" });
      else {
        enqueueSnackbar("Ubicacion cambiada exitosamente :D ", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error de conexion", { variant: "error" });
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

  useEffect(() => {
    function panto() {
      if (selected !== null)
        map.panTo(new google.maps.LatLng(selected.lat, selected.lng));
    }
    panto();
  }, [selected]);

  useEffect(() => {
    axios
      .get("perfil_direccion")
      .then((response) => {
        //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
        setDireccion_usuario(response.data);
      });
  }, []);

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
        {direccion_usuario && (
          <GoogleMap
            onLoad={(map) => setMap(map)}
            mapContainerStyle={containerStyle}
            center={direccion_usuario ? direccion_usuario : ucab}
            zoom={17}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
          {!selected &&
            <Marker position={direccion_usuario ? direccion_usuario :ucab} 
              draggable={true}
                onDragEnd={(e) => setUbicacion(e.latLng)}
            />
          }
            {selected && (
              <Marker
                position={selected}
                draggable={true}
                onDragEnd={(e) => setUbicacion(e.latLng)}
              />
            )}
            <div className="pt-5 flex absolute inset-x-0 shadow-xl w-3/4 md:w-2/5 mx-auto -mt-1 rounded-lg rounded-t-none">
              <PlacesAutocomplete setSelected={setSelected} />
              {(ubicacion  || selected) &&
              <Button
                onClick={() => {
                  handlecambiar()
                }}
                className=""
                variant="contained"
              >
                Guardar
              </Button>
              }
            </div>
          </GoogleMap>
        )}
    
      </Flex>

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
      <Rsidebar />
    </>
  );
}
