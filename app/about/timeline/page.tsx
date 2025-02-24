"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const timelineData = [
  {
    year: "1997",
    image: "https://pertaminapatraniaga.com/file/files/2024/06/timeline-1.webp",
    description:
      "Didirikan dan terdaftar sebagai PT. Elnusa Harapan pada 27 Februari 1997, dengan pemegang saham Pertamina dan Yayasan Kesejahteraan Pegawai Pertamina (YKPP).",
  },
  {
    year: "2004",
    image: "https://pertaminapatraniaga.com/file/files/2024/08/pertamina-patra-niaga-office.webp",
    description:
      "4 Mei 2004 mengubah nama perusahaan menjadi: PT Patra Niaga dan melakukan upaya pertumbuhan setelah Peraturan Migas No. 22...",
  },
  {
    year: "2012",
    image: "https://pertaminapatraniaga.com/file/files/2024/08/timeline-2012.webp",
    description:
      "Melakukan Transformasi Bisnis menjadi PT Pertamina Patra Niaga dengan fokus bisnis dalam Manajemen Terminal Minyak...",
  },
];

const Timeline = () => {
  return (
    <section className="timeline-container">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        {timelineData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              <img
                src={item.image}
                alt={item.year}
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
              <div className="relative flex flex-col items-start h-full container mx-auto text-white p-8">
                <h2 className="text-6xl font-bold">{item.year}</h2>
                <p className="text-lg">{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Timeline;