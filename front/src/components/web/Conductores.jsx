import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import axios from "../../api/axios";

function Conductores() {
  const [conductores, setConductores] = useState([]);

  useEffect(() => {
    axios.get("conductores").then((response) => {
      setConductores(response.data);
    });
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation]}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="justify-center flex"
        centeredSlides={false}
        centerInsufficientSlides={true}
        spaceBetween={50}
        breakpoints={{
          // when window width is >= 400px
          400: {
            width: 400,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1024: {
            width: 1024,
            slidesPerView: 3,
          },
        }}
      >
         {conductores.map((row) => (
          <div key={row._id}>
            <SwiperSlide>
              <div className="relative flex flex-col items-center p-6 bg-slate-50 rounded">
              <img
              src={row.avatar}
              width="96"
                  height="96"
              className="rounded-full mx-auto shadow-md border-2 border-white transition duration-200 transform hover:scale-110"
            />
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">
                  {row.name}
                </h4>
                <p className="text-gray-600 text-center">Puntos: {row.puntos!=null ? row.puntos : 0} </p>

              </div>
            </SwiperSlide>
            ;
          </div>
          ))}
      </Swiper>
    </>
  );
}
export default Conductores;
