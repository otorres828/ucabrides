import React from "react";
import { Marker, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import house from "../../images/house_icon.png";
import marcador from "../../images/marcador_icon.png";

function MapaCola({detalles,localizacion_usuario}) {
    const containerStyle = {
      width: "100%",
      height: "50vh",
    };
  const ubicacion = {
    lat: detalles.puntomascerca[1],
    lng: detalles.puntomascerca[2],
  };
  const localizacion = {
    lat: parseFloat(localizacion_usuario.lat),
    lng: parseFloat(localizacion_usuario.lng),
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBTL6mwVxZgbLAokpY6eIfqD35FKfRQhpo",
  });
  return (
    isLoaded && (
      <div>
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
          <Marker position={ubicacion} icon={marcador} />
          <Marker position={localizacion} icon={house} />
        </GoogleMap>
      </div>
    )
  );
}

export default MapaCola;
