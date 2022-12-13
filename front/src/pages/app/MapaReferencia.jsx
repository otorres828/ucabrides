import React from "react";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import house from "../../images/house_icon.png"
import marcador from "../../images/marcador_icon.png"

const containerStyle = {
  width: "100%",
  height: "67vh",
};


function MapaReferencia({detalles,localizacion_usuario}) {
  
  const ubicacion = {
    lat:detalles.puntomascerca[1],
    lng:detalles.puntomascerca[2],
  };
  const localizacion={
      lat: parseFloat(localizacion_usuario.lat),
      lng: parseFloat(localizacion_usuario.lng),
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return (isLoaded &&
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ubicacion}
        zoom={15}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      
      >
        <Marker  position={localizacion} icon={marcador}/>
        <Marker  position={ubicacion} icon={house}  />
     
      </GoogleMap>
  );
}

export default MapaReferencia;
