import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "67vh",
};

function ConfigurarUbicacion() {
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
    getLugares();
    console.log(lugar2);
  }, [lugar]);

  const getLugares = () => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${lugar}&key=AIzaSyBTL6mwVxZgbLAokpY6eIfqD35FKfRQhpo`; // site that doesn’t send Access-Control-*
    fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((contents) =>  setLugar2(contents.data))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
   
  };

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
