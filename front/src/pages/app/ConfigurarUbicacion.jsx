import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import Rsidebar from "../../components/app/Rsidebar";
import { Box, Flex } from "@chakra-ui/react";
import axios from "../../api/axios";
import { useSnackbar } from "notistack";
export default function ConfigurarUbicacion() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBTL6mwVxZgbLAokpY6eIfqD35FKfRQhpo",
    libraries: ["places"],
  });

  if (!isLoaded) return;
  return <Map />;
}

function Map() {
  const [selected, setSelected] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [map, setMap] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };
  const ucab = {
    lat: 8.297321035371798,
    lng: -62.71149786538124,
  };
  const google = window.google;

  
  const handlecambiar = async () => {
    const access_token = localStorage.getItem("access_token");
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        const res = await axios.post(`cambiar_ubicacion`, {
          LatLng: ubicacion,
        });

        if (res.data.error)
          enqueueSnackbar(res.data.error, { variant: "error" });
        else {
          console.log(res.data)
          enqueueSnackbar("Ubicacion cambiada exitosamente :D ", {
            variant: "success",
          });
          delete axios.defaults.headers.common["Authorization"];
        }
      } catch (error) {
        enqueueSnackbar("Error de conexion", { variant: "error" });
      }

  };


  function panto() {
    if (selected !== null)
      map.panTo(new google.maps.LatLng(selected.lat, selected.lng));
  }
  useEffect(() => {
    panto();
    setUbicacion(selected);
  }, [selected, ubicacion]);

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
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
          {selected && <Marker position={selected} draggable={true}  onDragEnd={(e) => setUbicacion(e.latLng)}

          />}
        </GoogleMap>
        <Box
          p={4}
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          zIndex="1"
          className="w-96 mt-10 absolute z-30 "
        >
          <PlacesAutocomplete setSelected={setSelected} />
        </Box>
      </Flex>
      {ubicacion && 
      <div className="fixed bottom-20 z-30 rounded-lg mx-auto">
        <div className="content-center   justify-between">
          <div className="m-3 rounded-lg bg-gradient-to-l  vh-100 flex flex-row md:flex-col pt-3 md:py-3  px-2 text-center ">
            <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded " onClick={handlecambiar}>
              Guardar
            </button>
          </div>
        </div>
      </div>
      
      }
      <Rsidebar />
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

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="bg-slate-50 cursor-pointer p-1 border"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Ingrese su Zona"
        className="p-2 border bg-slate-50  w-full"
        color="blue"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
