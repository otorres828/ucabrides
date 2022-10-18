import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";


const location = <FontAwesomeIcon icon={faLocationCrosshairs} />;

function BotonMiUbicacion() {
  return (
    <>
      <div
        className="z-20  xl:w-96 mx-auto absolute right-2 bottom-20 mr-9  sm:justify-center flex"
        style={{ transform: "traslateX(-50%)", margin: "auto" }}
      >
        <div className="justify-center text-center mt-20">
          <div
            style={{ cursor: "pointer" }}
            className="  bg-white rounded-lg p-2"
          >
            {location}
          </div>
        </div>
      </div>
    </>
  );
}

export default BotonMiUbicacion;
