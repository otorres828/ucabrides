import React, { Component } from "react";
import { Marker, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import house from "../../images/house_icon.png";
import marcador from "../../images/marcador_icon.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import imagen1 from "../../images/hero-image.png";
import imagen2 from "../../images/features-element.png";
const containerStyle = {
  width: "100%",
  height: "50vh",
};

function MapaReferencia({ detalles, localizacion_usuario }) {
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
      <Carousel showArrows={true} emulateTouch={false} showThumbs={false} swipeable={false}>
        <div className="bg-slate-100 p-3 rounded-lg shadow">
          <div className="text-left vh-100 w-full">
            <h1 className=" text-ellipsis font-serif font-semibold">
              Informacion del Conductor
            </h1>
            <p>
              <small className="font-bold">Nombre:</small> Oliver Torres
            </p>
            <p>
              <small className="font-bold">Correo:</small> oatorres.19@est.ucab.edu.ve
            </p>
            <h1 className="pt-3 text-ellipsis font-serif font-semibold">
              Informacion del Vehiculo
            </h1>
            <p>
              <small className="font-bold">Modelo:</small> Centauro
            </p>
            <p>
              <small className="font-bold">Color:</small> Blanco
            </p>
            <p>
              <small className="font-bold">Placa:</small> "El conductor prefiere mantenerlo en privado"
            </p>

            <h1 className="pt-3 text-ellipsis font-serif font-semibold">
              Informacion de la Cola
            </h1>
            <p>
              <small className="font-bold">Asientos:</small> 2
            </p>
            <p>
              <small className="font-bold">hora de salida:</small> Sin hora programada
            </p>
            <p className="text-center font-bold text-green-700">
             "Puedes continuar la pagina ver el lugar donde te dejara el conductor"
            </p>
          </div>
        </div>
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
      </Carousel>
    )
  );
}

export default MapaReferencia;
