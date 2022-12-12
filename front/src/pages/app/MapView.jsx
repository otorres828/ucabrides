import React, {useState } from "react";
import Rsidebar from "../../components/app/Rsidebar";
import logo from "../../logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  faLocationCrosshairs,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { DistanciaMasCorta, distancia_a_caminar, listado_rutas_disponibles, obtener_localizacion_direccion_usuario } from "../../hooks/RutaMasCorta";

const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;
const clear = <FontAwesomeIcon icon={faTrash} />;
const containerStyle = {
  width: "100%",
  height: "100vh",
};

const ucab = {
  lat: 8.297321035371798,
  lng: -62.71149786538124,
};

function MapView() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState("");
  const [rutas, setRutas] = useState([]);
  const [distancia, setDistancia] = useState();
  const [localizacion_usuario, setLocalizacion_usuario] = useState({});
  const [my_location, setMy_location] = useState({});
  const [puntomascerca, setPuntomascerca] = useState();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  function obtener_mi_ubicacion() {
    const google = window.google;
    navigator.geolocation.getCurrentPosition(function (position) {
      setMy_location({
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

  function calculateRoute() {
    listado_rutas_disponibles().then(result => { //LISTADO DE RUTAS DISPONIBLES
      setRutas(result)
    }) 
    distancia_a_caminar().then(result => { // CANTIDAD EN MT QUE EL USUARIO ESTA DISPUESTO A CAMINAR
      setDistancia(result)
    }) 
    obtener_localizacion_direccion_usuario().then(result => { //OBTENER LOCALIZACION DE LA ZONA DEL USUARIO
      setLocalizacion_usuario(result)
    })     
    console.log('ejecutando');
    rutas.map((ruta) => {
     return (verificar_distancia({lat:ruta.lat,lng:ruta.lng}));
    })
  }

  async function verificar_distancia(destino) {
    const ruta ={
      lat: parseFloat(destino.lat),
      lng: parseFloat(destino.lng),
    }
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: ucab,
      destination: ruta,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    // setDirectionsResponse(results);
    const direccion = results.routes[0].overview_path;
    var punto=(DistanciaMasCorta(direccion,localizacion_usuario));
  
    setPuntomascerca({
      lat: punto[1],
      lng: punto[2],
    });
    if(distancia>=punto[0]){
     console.log([ruta,punto]) //COLOCAR ALGO PARA GUARDAR LA RUTA, EL PUNGO OPTIMO
    }
  }



  function limpiar_ruta() {
    setDirectionsResponse(null);
    setMy_location(null);
    map.panTo(ucab);
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ucab}
        zoom={18}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {/* <Marker position={center} onClick={calculateRoute} /> */}
        <Marker draggable={true} onClick={calculateRoute}  onDragEnd={(e)=>{console.log(e.latLng.lat());console.log(e.latLng.lng())}} position={ucab}/>
        {my_location &&   <Marker draggable={true} onClick={calculateRoute}  onDragEnd={(e)=>{console.log(e.latLng.lat());console.log(e.latLng.lng())}} position={ucab}/>}
        {puntomascerca && <Marker  position={puntomascerca} /> }
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
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

      {(directionsResponse || my_location) && (
        <div
          onClick={limpiar_ruta}
          className="z-20  xl:w-96 mx-auto absolute left-2 bottom-20 mr-9  sm:justify-center flex"
          style={{ transform: "traslateX(-50%)", margin: "auto" }}
        >
          <div className="justify-center text-center mt-20">
            <div
              style={{ cursor: "pointer" }}
              className="  bg-red-300 rounded-lg p-2"
            >
              {clear}
            </div>
          </div>
        </div>
      )}
      <Rsidebar />
    </>
  ) : (
    <>
      <Rsidebar />
      <img src={logo} className="App-logo" alt="logo" />
    </>
  );
}

export default MapView;
