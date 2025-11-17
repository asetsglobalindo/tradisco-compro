"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const OurPartner = ({ data }) => {
  // Partner data with local images from public/partner directory
  const partners = [
    {
      id: 1,
      name: "Partner 1",
      logo: "/partner/1.png",
      url: "https://partner1.com",
    },
    {
      id: 2,
      name: "Partner 2",
      logo: "/partner/2.png",
      url: "https://partner2.com",
    },
    {
      id: 3,
      name: "Partner 3",
      logo: "/partner/3.png",
      url: "https://partner3.com",
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "/partner/4.png",
      url: "https://partner4.com",
    },
    {
      id: 5,
      name: "Partner 5",
      logo: "/partner/5.png",
      url: "https://partner5.com",
    },
    {
      id: 6,
      name: "Partner 6",
      logo: "/partner/6.svg",
      url: "https://partner6.com",
    },
    {
      id: 7,
      name: "Partner 7",
      logo: "/partner/7.png",
      url: "https://partner7.com",
    },
    {
      id: 8,
      name: "Partner 8",
      logo: "/partner/8.png",
      url: "https://partner8.com",
    },
    {
      id: 9,
      name: "Partner 9",
      logo: "/partner/9.png",
      url: "https://partner9.com",
    },
    {
      id: 10,
      name: "Partner 10",
      logo: "/partner/10.png",
      url: "https://partner10.com",
    },
    {
      id: 11,
      name: "Partner 11",
      logo: "/partner/11.png",
      url: "https://partner11.com",
    },
    {
      id: 12,
      name: "Partner 12",
      logo: "/partner/12.png",
      url: "https://partner12.com",
    },
    {
      id: 13,
      name: "Partner 12",
      logo: "/partner/bumn.png",
      url: "https://partner12.com",
    },
    {
      id: 14,
      name: "Partner 12",
      logo: "/partner/bumnui.jpg",
      url: "https://partner12.com",
    },
    {
      id: 15,
      name: "Partner 12",
      logo: "/partner/ppi.png",
      url: "https://partner12.com",
    },
  ];

  return (
    <section className="relative mt-8 lg:mt-16 py-12">
      <div className="container">
        <h1 className="title-3 text-center mb-20">Our Partners</h1>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="partner-slider"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-24 transition-transform hover:scale-110"
              >
                <div className="w-full h-16 flex items-center justify-center overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="object-contain w-auto h-auto max-h-16 max-w-full grayscale hover:grayscale-0 transition-all duration-300"
                    style={{
                      aspectRatio: "auto",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurPartner;