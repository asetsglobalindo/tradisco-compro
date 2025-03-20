"use client";
import uiStore from "@/app/store/uiStore";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { HomeType } from "@/types/indes";
import JSCookie from "js-cookie";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const HomeBanner: React.FC<{ data: HomeType | undefined }> = ({ data }) => {
  const lang = JSCookie.get("lang") || "id";
  const [activeIndex, setActiveIndex] = useState(0);
  const ui = uiStore((state) => state);
  const headerColorSet = useRef(false);

  // Set header color only once when component mounts
  useEffect(() => {
    if (!headerColorSet.current) {
      ui.setHeaderColor("white");
      headerColorSet.current = true;
    }

    // Cleanup function
    return () => {
      headerColorSet.current = false;
    };
  }, []); // Empty dependency array to run only on mount

  // Check if data exists and has banner property
  if (
    !data ||
    !data.banner ||
    !Array.isArray(data.banner) ||
    data.banner.length === 0
  ) {
    return (
      <section className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="container text-white text-center">
          <h1 className="text-xl">Loading banner content...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect="fade"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".banner-pagination",
          type: "bullets",
          renderBullet: function (_, className) {
            return (
              '<span class="' +
              className +
              '">' +
              "<em>" +
              "</em>" +
              "<i></i>" +
              "<b></b>" +
              "</span>"
            );
          },
        }}
        slidesPerView={1}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
      >
        {data.banner.map((banner) => (
          <SwiperSlide
            className="w-full flex items-center relative"
            key={banner._id}
          >
            <picture key={banner?._id}>
              <source
                media="(min-width:768px)"
                srcSet={banner?.images[0]?.url}
              />
              <img
                className="w-full h-screen object-cover border image-cover"
                style={{ filter: "brightness(60%)" }} // Consistent darkening for better text visibility
                src={banner?.images_mobile[0]?.url}
                alt={banner?.images[0]?.url}
              />
            </picture>
            <section className="absolute top-0 h-full w-full">
              <section className="flex items-center h-full z-20">
                <div className="container text-white">
                  {banner.title && banner.title.length > 1 ? (
                    <h1 className="title-2 leading-tight max-w-[600px] uppercase font-bold text-shadow-lg">
                      {banner.title}
                    </h1>
                  ) : null}

                  {banner.description && banner.description.length > 1 ? (
                    <p className="text-lg font-normal mt-4 max-w-[600px] text-shadow-md">
                      {banner.description}
                    </p>
                  ) : null}
                  {banner.button_route && banner.button_route.length > 1 ? (
                    <a href={banner.button_route}>
                      <Button className="mt-8" size={"lg"} rounded>
                        <span className="tracking-wider">
                          {lang === "en" ? "Learn More" : "Selengkapnya"}
                        </span>
                        <ArrowRight />
                      </Button>
                    </a>
                  ) : null}
                </div>
              </section>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="absolute bottom-10 z-40 container left-1/2 -translate-x-1/2 text-white">
        <p className="uppercase">
          {data.banner[activeIndex]?.button_name || ""}
        </p>
        <div className="banner-pagination flex gap-2 mt-4"></div>
        <p className="mt-4">
          {Number(activeIndex + 1)
            .toString()
            .padStart(2, "0")}{" "}
          /{" "}
          {Number(data.banner.length || 0)
            .toString()
            .padStart(2, "0")}
        </p>
      </section>
    </section>
  );
};

export default HomeBanner;
