import React from "react";
import Oliver from "../../images/team/oliver.jpg";
import Luis from "../../images/team/luis.jpeg";
import Wladimir from "../../images/team/wladimir.jpg";
import Fady from "../../images/team/fady.jpg";
import Lorenzo from "../../images/team/lorenzo.jpg";
import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
function Team() {
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
        <SwiperSlide>
          <div className="relative flex flex-col items-center p-6 bg-slate-50 rounded">
            <img
              src={Luis}
              width="96"
              height="96"
              className="rounded-full mx-auto shadow-md border-2 border-white transition duration-200 transform hover:scale-110"
            />
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Luis C. Somoza
            </h4>
            <p className="text-gray-600 text-center">Coach - Tracker </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" relative flex flex-col items-center p-6 bg-slate-50 rounded shadow-xl">
            <img
              className="rounded-full"
              src={Oliver}
              width="96"
              height="96"
              alt="Testimonial 01"
            />

            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Oliver Torres
            </h4>
            <p className="text-gray-600 text-center">Developer</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" relative flex flex-col items-center p-6 bg-slate-50 rounded shadow-xl">
            <svg
              className="w-16 h-16 p-1 -mt-1 mb-2"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <rect
                  className="fill-current text-blue-600"
                  width="64"
                  height="64"
                  rx="32"
                />
                <g strokeWidth="2" transform="translate(19.429 20.571)">
                  <circle
                    className="stroke-current text-white"
                    strokeLinecap="square"
                    cx="12.571"
                    cy="12.571"
                    r="1.143"
                  />
                  <path
                    className="stroke-current text-white"
                    d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                  />
                  <path
                    className="stroke-current text-blue-300"
                    d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                  />
                </g>
              </g>
            </svg>
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Cesar Sotillo
            </h4>
            <p className="text-gray-600 text-center">Database</p>
          </div>
        </SwiperSlide>
    
        <SwiperSlide>
          <div className=" relative flex flex-col items-center p-6 bg-slate-50 rounded shadow-xl">
            <svg
              className="w-16 h-16 p-1 -mt-1 mb-2"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <rect
                  className="fill-current text-blue-600"
                  width="64"
                  height="64"
                  rx="32"
                />
                <g transform="translate(22.857 19.429)" strokeWidth="2">
                  <path
                    className="stroke-current text-white"
                    strokeLinecap="square"
                    d="M12.571 4.571V0H0v25.143h12.571V20.57"
                  />
                  <path
                    className="stroke-current text-white"
                    d="M16 12.571h8"
                  />
                  <path
                    className="stroke-current text-white"
                    strokeLinecap="square"
                    d="M19.429 8L24 12.571l-4.571 4.572"
                  />
                  <circle
                    className="stroke-current text-blue-300"
                    strokeLinecap="square"
                    cx="12.571"
                    cy="12.571"
                    r="3.429"
                  />
                </g>
              </g>
            </svg>
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Rafael Muñoz
            </h4>
            <p className="text-gray-600 text-center">Developer chat</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" relative flex flex-col items-center p-6 bg-slate-50 rounded shadow-xl">
            <img
              className="rounded-full"
              src={Lorenzo}
              width="96"
              height="96"
              alt="Testimonial 01"
            />
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Cesar Lorenzo
            </h4>
            <p className="text-gray-600 text-center">Developer chat</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" relative flex flex-col items-center p-6 bg-slate-50 rounded shadow-xl">
            <img
              className="rounded-full"
              src={Wladimir}
              width="96"
              height="96"
              alt="Testimonial 01"
            />

            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Wladimir SanVicente
            </h4>
            <p className="text-gray-600 text-center">UI</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" relative flex flex-col items-center p-6 bg-slate-50 rounded shadow-xl">
            <img
              className="rounded-full"
              src={Fady}
              width="96"
              height="96"
              alt="Testimonial 01"
            />
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Fady George
            </h4>
            <p className="text-gray-600 text-center">Tester</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex flex-col items-center p-6 bg-slate-50 rounded shadow-xl">
            <svg
              className="w-16 h-16 p-1 -mt-1 mb-2"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <rect
                  className="fill-current text-blue-600"
                  width="64"
                  height="64"
                  rx="32"
                />
                <g strokeWidth="2">
                  <path
                    className="stroke-current text-white"
                    d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
                  />
                  <path
                    className="stroke-current text-white"
                    d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"
                  />
                  <path
                    className="stroke-current text-white"
                    d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"
                  />
                  <path
                    className="stroke-current text-blue-300"
                    d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                    strokeLinecap="square"
                  />
                </g>
              </g>
            </svg>
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
              Angel Guevara
            </h4>
            <p className="text-gray-600 text-center">Tester</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default Team;
