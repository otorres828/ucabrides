import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ConfigurarUbicacion() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:  process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [selected, setSelected] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };
  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ucab}
        zoom={15}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {selected && <Marker position={selected} />}
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
    <>
   <Autocomplete
        freeSolo
        disableClearable
        options={data.map((option) => option.description)}
        renderInput={(params) => (
          <TextField className="z-30"
            onChange={(e) => setValue(e.target.value)}
            {...params}
            label="Buscar Zona"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />

    </>
      
  );
};