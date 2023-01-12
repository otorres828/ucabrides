import React from "react";
import Header from "../../components/web/Header";
import Footer from "../../components/web/Footer";

function Terminos() {
  return (
    <>
      <Header />
      <div class=" py-20 bg-gray-100">
        <div class="container grid grid-cols-12 py-22 px-6 sm:px-6 lg:px-28 mx-auto   ">
          <div class=" text-justify col-span-12 lg:col-span-7 mt-6 p-10 shadow-md  sm:rounded-lg bg-white prose">
            <h1 class="text-2xl  font-semibold">TERMINOS Y CONDICIONES</h1>
            <h1 class="text-xl pt-4">1. LOS SERVICIOS</h1>
            Ucab Rides opera como un intermediario que solo conecta a los
            Pasajeros con los Conductores disponibles.
            <h1 class="text-xl pt-3">2. AVISO PARA LOS USUARIOS CLIENTES</h1>
            <p>
              El Usuario Cliente acepta todos los términos establecidos en el
              presente documento antes de utilizar la aplicación Ucab Rides. De
              igual modo el Usuario/Cliente acepta las políticas complementarias
              y/o específicas vigentes que pudieren existir para servicios
              específicos, así como las actualizaciones de estas, en el momento
              que ello ocurra. En caso el Usuario Cliente no esté de acuerdo con
              los términos y condiciones siguientes, deberá abstenerse de
              utilizar esta aplicación y sus actualizaciones, toda vez que la
              utilización de la Aplicación implica manifestación de conformidad
              del Usuario con todos los Términos y Condiciones.
            </p>
            <p>
              Los responsables del desarrollo de la aplicación, tanto del equipo
              de desarrollo como profesores de la UCAB no se hacen responsables
              del mal uso de la aplicación dentro o fuera de la institución, el
              mal uso incluye comportamientos que afecten a la confiablilidad
              del sistema y a las personas que buscan ayudar a otras a conseguir
              una manera cómoda de regresar a su hogar desde la universidad.
            </p>
            <p className="font-bold">
              Al descargar y/o usar la aplicación Ucab Rides usted manifiesta y
              garantiza lo siguiente:
            </p>
            <ul>
              <li>
                i. Que tiene capacidad para cumplir con todos los Términos y
                Condiciones
              </li>
              <li>
                iii. Que la utilización de la aplicación es a título personal,
                no siendo posible que sea utilizado por un tercero, diferente a
                usted.
              </li>
              <li>
                ii. Que la información que proporcione a Ucab Rides será
                verdadera y precisa
              </li>
            </ul>
            <h1 class="text-xl pt-3">3. CANCELACIONES Y NO-APARICIONES</h1>
            <ul>
              <h1 className="text-xl">1. Por parte del conductor</h1>
              <li>
                i. Un Conductor puede cancelar una “cola” en cualquier momento
                antes de recogerlo.
              </li>
              <li>
                ii. Recibirá una notificación en la aplicación de que el
                conductor ha cancelado la cola.
              </li>
              <li>
                iii. No asumimos ninguna responsabilidad en caso de que un
                Conductor cancele la “cola” después de aceptarla y Usted no
                tiene derecho a reclamos.
              </li>
              <h1 className="text-xl">2. Por parte del pasajero</h1>
              <li>
                i. Si el pasajero no aparece en el sitio acordado por el
                conductor en un tiempo determinado se le sancionará al pasajero
                exluyendolo de la aplicación por un tiempo determinado.
              </li>
              <h1 className="text-xl">3. No-aparición</h1>
              <li>
                i. Si un Conductor llega a un Punto de reunión y no puede
                encontrarlo, intentará comunicarse con Usted mediante mensajes
                de la aplicación asociado con Su Cuenta.
              </li>
              <li>
                ii. Si un conductor no puede comunicarse con usted, solo
                permanecerá en las inmediaciones del punto de encuentro durante
                al menos 2 minutos y luego podrá cancelar la cola y buscar otra.
              </li>
            </ul>
            <h1 class="text-xl pt-3">4. CONDUCTORES</h1>
            <ul>
              <li>
                El conductor no puede lucrarse de ninguna manera al usar esta
                aplicación, no nos hacemos responsables si el conductor exige
                alguna forma de pago, se recomienda hacer reporte y buscar a
                otro conductor en caso de que se presente el problema.
              </li>
            </ul>
            <h1 class="text-xl pt-3">5. CONSENTIMIENTO</h1>
            <p>Al registrarse para usar la aplicación, usted acepta:</p>
            <ul>
              <li>
                i. Permitirnos usar sus datos de ubicación de acuerdo con sus
                preferencias de configuración en la aplicación.
              </li>
              <li>
                ii. Permitirnos compartir sus datos personales con los
                Conductores según sea necesario para que podamos brindarle los
                servicios a usted y a ellos.
              </li>
            </ul>
            <h1 class="text-xl pt-3">6. USUARIOS</h1>
            <p>Como usuario, usted acepta:</p>
            <ul>
              <li>
                i. No intimidar, acosar, suplantar, acechar, amenazar,
                intimidar, poner en peligro o discriminar a ningún otro usuario
                (conductor/pasajero).{" "}
              </li>
              <li>
                ii. No compartir su Cuenta con ninguna otra persona y que
                cualquier uso de su Cuenta por parte de cualquier otra persona
                no está recomendado.{" "}
              </li>
              <li>
                iii. No debe hacer ningún uso automatizado de la Plataforma Ucab
                Rides y no debe copiar, reproducir, traducir, adaptar, variar o
                modificar la Aplicación sin nuestro consentimiento expreso por
                escrito.
              </li>
              <li>
                iv. No debe usar la aplicación en relación con ningún esfuerzo
                comercial o lucrativo excepto aquellos que están respaldados en
                este documento, o aprobados por escrito por la Universidad
                Católica Andrés Bello.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-full col-span-5 relative hidden sm:block">
        <div class="fixed">
          <img
            src="../../../images/fondo_logo.png"
            alt="Ucab Rides"
            class="h-96"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terminos;
