import React from "react";
import Header from "../../components/web/Header";
import Footer from "../../components/web/Footer";
function Preguntas() {
  return (
    <>
      <Header />
      <div class=" py-20 bg-gray-100">
        <div class="container grid grid-cols-12 py-22 px-6 sm:px-6 lg:px-28 mx-auto   ">
          <div class=" text-justify col-span-12 lg:col-span-7 mt-6 p-10 shadow-md  sm:rounded-lg bg-white prose">
            <h1 class="text-2xl  font-semibold">PREGUNTAS FRECUENTES</h1>
            <h1 class="text-xl pt-4">1. ¿Es Ucab Rides seguro?</h1>
            Si. Recuerde que la aplicación Ucab Rides es exclusivamente de
            ucabistas para ucabistas, quiere decir que solo los estudiantes,
            profesores, trabajadores de la ucab pueden hacer uso de la
            aplicación haciendo la validación con el correo de la institución
            tanto conductores como pasajeros.
            <h1 class="text-xl pt-3">
              2. ¿Cuánto debo pagar por el viaje? ¿Cuáles son las tarifas?
            </h1>
            <p>
              Ucab Rides es una aplicación sin fines de lucro tanto como para la
              universidad como para los conductores, es decir, ningún conductor
              debería solicitarle al pasajero nada a cambio por dar “la cola” ya
              que el espiritu de la misma es ofrecer ayuda a las personas que lo
              necesitan.
            </p>
            <h1 class="text-xl pt-3">
              3. ¿El conductor podria dejarme mas allá del punto acordado?
            </h1>
            <p>
              Lo que suceda una vez acordado y abordado el vehiculo no es
              responsabilidad de la aplicación, es decir, se podría negocear con
              el conductor para probar si podría dejarlo más allá del punto
              establecido siempre y cuando llegue o sobrepase ese punto para
              tomar el viaje como completado.
            </p>
            <h1 class="text-xl pt-3">
              4. ¿Solamente estudiantes pueden dar/recibir la cola?
            </h1>
            <p>
              No. También podrían hacerlo profesores y trabajadores de la UCAB.
            </p>
            <h1 class="text-xl pt-3">
              5. ¿Necesito mostrar algún documento legal como mi carné de
              conducir para dar la cola?
            </h1>
            <p>
              No. El único requisito que necesitas para dar/recibir la cola es
              ser UCABISTA.
            </p>
            <h1 class="text-xl pt-3">
              6. ¿Tengo libertad de elegir quién me da la cola?
            </h1>
            <p>
              Si. La aplicación te provee un listado para escoger el que más te
              convenga o interese, los conductores anonimos no son permitidos en
              la aplicación.
            </p>
            <h1 class="text-xl pt-3">
              7. ¿Tengo libertad de elegir a quién dar la cola?
            </h1>
            <p>
              Si. La aplicación te provee un listado de personas la cual puedes
              dar la cola, con su nombre y demás datos que te servirán para
              tomar una decisión, los pasajeros anonimos no existen en esta
              aplicación.
            </p>
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

export default Preguntas;
