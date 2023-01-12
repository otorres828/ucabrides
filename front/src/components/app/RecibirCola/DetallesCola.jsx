import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import InformacionCola from "./InformacionCola";
import MapaCola from "../../../pages/app/RecibirCola/MapaCola";

function DetallesCola({ detalles_orden, localizacion_usuario,setPiloto }) {
  
  return (
    <>
      <Carousel
        showArrows={true}
        emulateTouch={false}
        showThumbs={false}
        swipeable={false}
      > 
        <InformacionCola detalles_orden={detalles_orden} setPiloto={setPiloto} />
        <MapaCola
          detalles_orden={detalles_orden}
          localizacion_usuario={localizacion_usuario}
        />
      </Carousel>
    </>
  );
}

export default DetallesCola;
