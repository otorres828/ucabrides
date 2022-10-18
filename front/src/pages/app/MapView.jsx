
import React, { useState } from "react";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Sidebar from "../../components/app/Sidebar";
import logo from "../../logo.svg";
// import BotonMiUbicacion from "../../components/app/BotonMiUbicacion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";


const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;

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
  const [directionsResponse, setDirectionsResponse] = useState(null)

  async function calculateRoute() {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: center,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)

  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

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
       
      >
        
        <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        
      </GoogleMap>
      <div onClick={calculateRoute}
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
