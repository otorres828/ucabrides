import React from "react";
import Header from "../../components/web/Header";
import Footer from "../../components/web/Footer";
function Politicas() {
  return (
    <>
      <Header />
      <div class=" py-20 bg-gray-100">
        <div class="container grid grid-cols-12 py-22 px-6 sm:px-6 lg:px-28 mx-auto   ">
          <div class=" text-justify col-span-12 lg:col-span-7 mt-6 p-10 shadow-md  sm:rounded-lg bg-white prose">
            <h1 class="text-2xl  font-semibold">POLITICAS DE PRIVACIDAD</h1>
            <h1 class="text-xl pt-4">
              1. ¿Por qué y para qué se recogen datos personales de los
              usuarios?
            </h1>
            Ucab Rides recoge datos personales de los Usuarios de la Aplicación
            a través de varios medios, uno de ellos es a través del Registro del
            Usuario dentro de la Aplicación. La falta de suministro de dichos
            Datos Personales podrá afectar a la calidad de los servicios
            proporcionados por Ucab Rides. Los Datos Personales veraces de los
            Usuarios ayudan a facilitar el acceso al servicio prestado por Ucab
            Rides: Prestar, gestionar, administrar, ampliar y mejorar los
            servicios y/o contenidos ofrecidos en la Aplicación; así como para
            atender adecuadamente cualquier consulta o solicitud de información
            planteada por los Usuarios. En todo caso en el momento de la
            recogida de datos, se solicitará a los Usuarios su consentimiento
            expreso para que Ucab Rides pueda hacer uso de sus datos a fin de
            remitirle información y publicidad por medio de correo electrónico o
            medios equivalentes, como SMS en teléfonos móviles. Si
            posteriormente, el Usuario desea revocar su consentimiento otorgado
            para recibir información comercial vía correo electrónico o por
            cualquier otro medio similar o equivalente, podrá hacerlo a través
            de la aplicación.
            <h1 class="text-xl pt-3">2. SEGURIDAD</h1>
            <p>
              Ucab Rides garantiza que realizará en todo momento sus mejores
              esfuerzos para mantener la seguridad y confidencialidad de los
              Datos Personales y que continuará mejorando las medidas de
              seguridad, sin embargo, como nuestra aplicación se basa y utiliza
              herramientas y software de terceros, puede haber vulnerabilidades
              que aún no conocemos. Por lo tanto, no podemos ofrecer ninguna
              garantía en cuanto a la seguridad de su información personal.
            </p>
            <h1 class="text-xl pt-3">3. DERECHOS DE LOS USUARIOS </h1>
            <p>
              El Usuario podrá ejercitar en cualquier momento sus derechos de
              acceso, rectificación, cancelación y oposición al tratamiento de
              sus Datos Personales a través de la aplicación.
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

export default Politicas;
