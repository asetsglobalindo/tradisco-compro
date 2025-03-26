"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { HomeType } from "@/types/indes";
import JSCookie from "js-cookie";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import uiStore from "@/app/store/uiStore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface HomeBannerProps {
  data: HomeType | undefined;
}

const HomeBanner: React.FC<HomeBannerProps> = ({ data }) => {
  const lang = JSCookie.get("lang") || "id";
  const [activeIndex, setActiveIndex] = useState(0);
  const { setHeaderColor } = uiStore();
  const isInitialMount = useRef(true);

  // Set header color on mount with proper cleanup
  useEffect(() => {
    if (isInitialMount.current) {
      setHeaderColor("white");
      isInitialMount.current = false;
    }

    // Clean up when component unmounts
    return () => {
      isInitialMount.current = true;
    };
  }, [setHeaderColor]);

  // Early return for loading state
  if (!data?.banner?.length) {
    return (
      <section className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="container text-white text-center">
          <h1 className="text-xl">Loading banner content...</h1>
        </div>
      </section>
    );
  }

  // Helper function for pagination numbering
  const formatPaginationNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".banner-pagination",
          type: "bullets",
          renderBullet: (_, className) =>
            `<span class="${className}"><em></em><i></i><b></b></span>`,
        }}
        slidesPerView={1}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full"
      >
        {data.banner.map((banner) => (
          <SwiperSlide className="w-full h-full relative" key={banner._id}>
            {/* Image container with proper aspect ratio handling */}
            <div className="absolute inset-0 w-full h-full">
              <picture>
                {/* Desktop image */}
                <source
                  media="(min-width:768px)"
                  srcSet={banner?.images[0]?.url}
                />
                {/* Mobile image with proper alt text */}
                <img
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(80%)" }}
                  src={banner?.images_mobile[0]?.url}
                  alt={banner?.title || "Banner image"}
                  loading="eager" // First image loads immediately
                />
              </picture>
              {/* Additional overlay for better text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter"></div>
            </div>
            {/* Content overlay with proper semantic structure */}
            <div className="relative h-full w-full z-10 flex flex-col items-center justify-center">
              <div className="container text-white">
                <p
                  className="uppercase text-white text-center text-2xl font-bold"
                  style={{ color: "#A3BB29" }}
                >
                  Tradisco Global Inovasi
                </p>
                <h1 className="title-2 leading-tight mx-auto uppercase font-bold text-shadow-lg text-center sm:w-1/2">
                  Trading Digital And Construction
                </h1>

                {/* Email subscription form - positioned properly */}
                <div className="mt-6 flex max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 w-full border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    aria-label="Email address"
                  />
                  <button
                    className="px-4 py-2 bg-orange-500 text-white font-medium rounded-r hover:bg-orange-600 transition duration-200"
                    aria-label="Subscribe"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination section with improved accessibility */}
      <div className="absolute bottom-10 z-40 container left-1/2 -translate-x-1/2 text-white">
        {data.banner[activeIndex]?.button_name && (
          <p className="uppercase">{data.banner[activeIndex].button_name}</p>
        )}
        <div
          className="banner-pagination flex gap-2 mt-4"
          role="navigation"
          aria-label="Banner navigation"
        ></div>
        <p className="mt-4" aria-live="polite">
          {formatPaginationNumber(activeIndex + 1)} /{" "}
          {formatPaginationNumber(data.banner.length)}
        </p>
      </div>
    </section>
  );
};

export default HomeBanner;
