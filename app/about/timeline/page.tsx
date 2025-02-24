"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

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
    {
      year: "2017 - 2019",
      image: "https://pertaminapatraniaga.com/file/files/2024/08/timeline-2017.webp",
      description: "Periode ekspansi besar-besaran dengan berbagai proyek...",
    },
    {
      year: "2020",
      image: "https://pertaminapatraniaga.com/file/files/2024/08/timeline-2020.webp",
      description: "Tantangan dan transformasi digital dimulai...",
    },
    {
      year: "2021",
      image: "https://pertaminapatraniaga.com/file/files/2024/08/timeline-2021.webp",
      description: "Melebarkan bisnis ke sektor energi terbarukan...",
    },
];
const SLIDE_DURATION = 5000;

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    if (progressRef.current) {
      const totalYears = timelineData.length;
      const activeWidth = ((activeIndex + 1) / totalYears) * 100;
      progressRef.current.style.width = `${activeWidth}%`;
    }
  }, [activeIndex]);

  return (
    <section className="timeline-container relative">
        <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            autoplay={{ delay: SLIDE_DURATION, disableOnInteraction: false }}
            onSlideChange={handleSlideChange}
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

        {/* Timeline Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 z-[99] w-3/4">
            <div className="relative w-full h-1 bg-gray-700">
                <div
                    ref={progressRef}
                    className="absolute top-0 left-0 h-full bg-green-light transition-all duration-300 ease-linear"
                    style={{ width: "0%", transition: `width ${SLIDE_DURATION}ms linear` }}
                ></div>
                {/* Timeline Years */}
                <div className="flex justify-between mt-2 text-gray-300 text-sm">
                    {timelineData.map((item, index) => (
                        <span key={index} className={`${index === activeIndex ? "text-white font-bold" : ""}`}>{item.year}</span>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default Timeline;
