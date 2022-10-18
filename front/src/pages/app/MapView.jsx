import React, {  useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Sidebar from "../../components/app/Sidebar";
import logo from "../../logo.svg";
import BotonMiUbicacion from "../../components/app/BotonMiUbicacion";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 8.297220178301329,
  lng: -62.71150054759027,
};

const miibucacion = {
  lat: 8.351952125568946,
  lng: -62.663044001632784,
};
const origen = {
  lat: 8.297220178301329,
  lng: -62.71150054759027,
};

const destino = {
  lat: 8.332488759816176,
  lng: -62.64138237986472,
};

function MapView() {

  const [response, setResponse] = useState(null);

  const regresaDireccion = (response) => {
    console.log(response);
    if (response !== null) {
      if (response.status) {
        setResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const DirectionsServiceRuta = {
    origin: origen,
    destination: destino,
    travelMode: "DRIVING",
  };

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
        <>
          <Marker position={miibucacion} draggable={true} />
          <BotonMiUbicacion /> 
          <DirectionsService
            callback={regresaDireccion}
            options={DirectionsServiceRuta}
          />
          {response && <DirectionsRenderer directions={response} />}
        </>
      </GoogleMap>
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
