"use client";
import uiStore from "@/app/store/uiStore";
import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation, EffectFade} from "swiper/modules";
import {HomeType} from "@/types/indes";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import {Button} from "./ui/button";
import {ArrowRight} from "lucide-react";

const HomeBanner: React.FC<{data: HomeType}> = ({data}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ui = uiStore((state) => state);
  const {ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    ui.setHeaderColor(inView ? "white" : "black");
  }, [inView]); // eslint-disable-line

  return (
    <section ref={ref} className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect="fade"
        onSlideChange={(swiper) => {
          console.log(swiper);
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
            return '<span class="' + className + '">' + "<em>" + "</em>" + "<i></i>" + "<b></b>" + "</span>";
          },
        }}
        className="h-screen"
        slidesPerView={1}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
      >
        {data.banner.map((banner) => (
          <SwiperSlide
            className="w-full h-full bg-cover bg-no-repeat bg-full bg-center flex items-center"
            style={{
              background: `url(${banner.images[0].url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            key={banner._id}
          >
            <section className="flex items-center h-full">
              <div className="container text-white">
                <h1 className="title-2 leading-tight max-w-[600px] uppercase">{banner.title}</h1>
                <p className="text-lg font-normal mt-4 max-w-[600px]">{banner.description}</p>
                {banner.button_route ? (
                  <a href={banner.button_route} target="_blank">
                    <Button className="mt-8" size={"lg"} rounded>
                      <span className="tracking-wider">Learn More</span>
                      <ArrowRight />
                    </Button>
                  </a>
                ) : null}
              </div>
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

