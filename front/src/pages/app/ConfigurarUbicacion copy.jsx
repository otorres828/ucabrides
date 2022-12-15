import React from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "67vh",
};

function ConfigurarUbicacion() {
  const [query, setQuery] = React.useState();
  const [locations, setLocations] = React.useState([]);

  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  const onLoad = (ref) => setQuery(ref);

  const onPlacesChanged = () => {
    let places = query.getPlaces();
    let color;

    for (let i = 0; i < places.length; i++) {
      let lat = places[i].geometry.location.lat;
      let lng = places[i].geometry.location.lng;
      let type = places[i].types[0];
      if (type === "gas_station") {
        color = "red";
      } else if (type === "lodging") {
        color = "blue";
      } else if (
        type === "restaurant" ||
        type === "bar" ||
        type === "cafe" ||
        type === "meal_delivery"
      ) {
        color = "green";
      } else {
        color = "yellow";
      }

      let position = {
        lat: lat(),
        lng: lng(),
        color: color,
        name: places[i].name,
        address: places[i].formatted_address,
      };
      setLocations((locations) => [...locations, position]);
      console.log(locations)
    }
  };
  const libraries = ["drawing", "places"];

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
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
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input
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
        
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  );
}

export default ConfigurarUbicacion;
