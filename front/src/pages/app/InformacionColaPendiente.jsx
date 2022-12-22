import React from 'react'

function InformacionColaPendiente() {
  return (
    <div className="bg-slate-100 p-3 rounded-lg shadow">
          <div className="text-left vh-100 w-full">
            <h1 className=" text-ellipsis font-serif font-semibold">
              Informacion del Conductor
            </h1>
            <p>
              <small className="font-bold">Nombre:</small> Oliver Torres
            </p>
            <p>
              <small className="font-bold">Correo:</small> oatorres.19@est.ucab.edu.ve
            </p>
            <h1 className="pt-3 text-ellipsis font-serif font-semibold">
              Informacion del Vehiculo
            </h1>
            <p>
              <small className="font-bold">Modelo:</small> Centauro
            </p>
            <p>
              <small className="font-bold">Color:</small> Blanco
            </p>
            <p>
              <small className="font-bold">Placa:</small> "El conductor prefiere mantenerlo en privado"
            </p>

            <h1 className="pt-3 text-ellipsis font-serif font-semibold">
              Informacion de la Cola
            </h1>
            <p>
              <small className="font-bold">Asientos:</small> 2
            </p>
            <p>
              <small className="font-bold">hora de salida:</small> Sin hora programada
            </p>
            <p className="text-center font-bold text-green-700">
             "Puedes continuar la pagina ver el lugar donde te dejara el conductor"
            </p>
          </div>
        </div>
  )
}

export default InformacionColaPendiente