
const gradosARadianes = (grados) => {
  return grados * Math.PI / 180;
};

const distancia = (lat1, lon1, lat2, lon2) => {

  lat1 = gradosARadianes(lat1);
  lon1 = gradosARadianes(lon1);
  lat2 = gradosARadianes(lat2);
  lon2 = gradosARadianes(lon2);
  // Aplicar fórmula
  const RADIO_TIERRA_EN_KILOMETROS = 6371;
  let diferenciaEntreLongitudes = (lon2 - lon1);
  let diferenciaEntreLatitudes = (lat2 - lat1);
  let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIO_TIERRA_EN_KILOMETROS * c *1000;
};

export const DistanciaMasCorta = (direccion)=>{
  const mi_localizacion= {
    "lat": 8.347494,
    "lng": -62.6736222
  }
  var latitud=0;
  var longitud=0;
  var minimo =distancia(direccion[0].lat(),direccion[0].lng(),mi_localizacion.lat,mi_localizacion.lng)
  var menor=0;
  
  direccion.forEach(function(direccion){
      menor=distancia(direccion.lat(),direccion.lng(),mi_localizacion.lat,mi_localizacion.lng)
      if(menor<=minimo){
        minimo=menor;
        latitud=direccion.lat();
        longitud=direccion.lng();
      }
  })
  return [minimo,latitud,longitud];
}
