import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Sidebar from "../../components/app/Sidebar";
import logo from "../../logo.svg";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 8.297220178301329,
  lng: -62.71150054759027,
};

function MapView() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBTL6mwVxZgbLAokpY6eIfqD35FKfRQhpo",
  });

  // const [map, setMap] = React.useState(null)

  return isLoaded ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        {/* Child components, such as markers, info windows, etc. */}
        <>
          <Marker position={center} animation={Animation} />
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
