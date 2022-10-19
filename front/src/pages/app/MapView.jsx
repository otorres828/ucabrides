import React, { useState } from "react";
import Sidebar from "../../components/app/Sidebar";
import logo from "../../logo.svg";
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

const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;
const clear = <FontAwesomeIcon icon={faTrash} />;

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 8.297220178301329,
  lng: -62.71150054759027,
};

const destino = {
  lat: 8.332488759816176,
  lng: -62.64138237986472,
};

function MapView() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState("");
  const [my_location, setMy_location] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  function obtener_mi_ubicacion() {
    const google=window.google;
    navigator.geolocation.getCurrentPosition(function (position) {
      setMy_location({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      map.panTo(new google.maps.LatLng( position.coords.latitude,  position.coords.longitude) )
    });
  }

  async function calculateRoute() {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: center,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  function limpiar_ruta() {
    setDirectionsResponse(null);
    setMy_location(null);
    map.panTo(center);
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} onClick={calculateRoute} />

        {my_location && <Marker position={my_location} />}
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
      <Sidebar />
    </>
  ) : (
    <>
      <Sidebar />
      <img src={logo} className="App-logo" alt="logo" />
    </>
  );
}

export default MapView;
