"use client";
import uiStore from "@/app/store/uiStore";
import React, { useEffect, useState } from "react";
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

const HomeBanner: React.FC<{ data: HomeType }> = ({ data }) => {
  const lang = JSCookie.get("lang") || "id";
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ui = uiStore((state) => state);
  const [isVisible, setIsVisible] = useState(true); // Initially true

  useEffect(() => {
    // When the page loads, header should be white
    ui.setHeaderColor("white");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Updates header color based on visibility
    ui.setHeaderColor(isVisible ? "white" : "black");
  }, [isVisible]);

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
                className="w-full h-screen brightness-[70%] object-cover object-top"
                src={banner?.images_mobile[0]?.url}
                alt={banner?.images[0]?.url}
              />
            </picture>
            <section className="absolute top-0 h-full w-full">
              <section className="flex items-center h-full z-20">
                <div className="container text-white">
                  {banner.title.length > 1 ? (
                    <h1 className="title-2 leading-tight max-w-[600px] uppercase">
                      {banner.title}
                    </h1>
                  ) : null}

                  {banner.description.length > 1 ? (
                    <p className="text-lg font-normal mt-4 max-w-[600px]">
                      {banner.description}
                    </p>
                  ) : null}
                  {banner.button_route.length > 1 ? (
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
        <p className="uppercase">{data.banner[activeIndex].button_name}</p>
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
