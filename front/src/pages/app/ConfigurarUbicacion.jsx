import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import logo from "../../images/fondo_logos.png";


export default function ConfigurarUbicacion() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBTL6mwVxZgbLAokpY6eIfqD35FKfRQhpo",
    libraries: ["places"],
  });

  if (!isLoaded) return;
  <div className="flex h-screen justify-center items-center  rounded-lg">
    <img src={logo} className="App-logo" alt="logo" />
  </div>;
  return <Map />;
}

function Map() {
  const [selected, setSelected] = useState(null);
  const [map, setMap] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };

  useEffect(() => {
    function panto() {
      const google = window.google;
      navigator.geolocation.getCurrentPosition(function (position) {
        map.panTo(new google.maps.LatLng(selected.lat, selected.lng));
      });
    }
    panto();
  }, [selected]);

  return (
    <>
      <GoogleMap
        onLoad={(map) => setMap(map)}
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
        {selected && <Marker position={selected} draggable={true} />}

        <PlacesAutocomplete setSelected={setSelected} />
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect} className="relative z-auto">
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Escriba su direccion"
        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {status === "OK" &&
        data.map(({ place_id, description }) => (
          <div className="bg-slate-50">
            <ComboboxList>
              <ComboboxOption key={place_id} value={description} />
            </ComboboxList>
          </div>
        ))}
    </Combobox>
  );
};
