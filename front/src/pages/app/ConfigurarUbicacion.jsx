import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "../../api/axios";

const containerStyle = {
  width: "100%",
  height: "67vh",
};

function ConfigurarUbicacion() {
  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  headers.append("Access-Control-Allow-Credentials", "true");
  const claveapi = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: claveapi,
  });

  const [lugar, setLugar] = useState();
  const [lugar2, setLugar2] = useState({});

  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${lugar}&key=${claveapi}`
    )
      .then((dog) => console.log(dog));
  }, [lugar]);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ucab}
        zoom={15}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <input
          onChange={(e) => {
            setLugar(e.target.value);
          }}
          type="text"
          className="shadow mt-3 mx-3"
          placeholder="ingresa el lugar"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
          }}
        />
      </GoogleMap>
    )
  );
}
export default ConfigurarUbicacion;
