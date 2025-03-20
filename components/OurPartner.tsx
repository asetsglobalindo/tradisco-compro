"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const OurPartner = ({ data }) => {
  // Dummy partner data with images from a CDN
  const partners = [
    {
      id: 1,
      name: "Partner 1",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      url: "https://partner1.com",
    },
    {
      id: 2,
      name: "Partner 2",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
      url: "https://partner2.com",
    },
    {
      id: 3,
      name: "Partner 3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazon/amazon-original.svg",
      url: "https://partner3.com",
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
      url: "https://partner4.com",
    },
    {
      id: 5,
      name: "Partner 5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
      url: "https://partner5.com",
    },
    {
      id: 6,
      name: "Partner 6",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
      url: "https://partner6.com",
    },
  ];

  return (
    <section className="relative mt-8 lg:mt-16 bg-gray-50 py-12">
      <div className="container">
        <h1 className="title-3 text-center mb-8">Our Partners</h1>

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
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurPartner;
