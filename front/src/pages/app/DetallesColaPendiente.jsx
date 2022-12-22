import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import InformacionColaPendiente from "./InformacionColaPendiente";
import MapaCola from "./MapaCola";


function DetallesColaPendiente({ detalles, localizacion_usuario }) {
  return (
      <Carousel showArrows={true} emulateTouch={false} showThumbs={false} swipeable={false}>
        <InformacionColaPendiente />
        <MapaCola detalles={detalles} localizacion_usuario={localizacion_usuario} />
      </Carousel>
  );
}

export default DetallesColaPendiente;
