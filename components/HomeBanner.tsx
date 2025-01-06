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
                <button className="flex space-x-1  border-green-light bg-green-light w-fit border px-6 py-3 rounded-full items-center mt-8">
                  <span className="tracking-wider">Learn More</span>
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.21216 8.63376H12.721M12.721 8.63376L9.1552 4.51709M12.721 8.63376L9.1552 12.7504"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
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

  return (
    <section ref={ref}>
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-full bg-center flex items-center"
        style={{
          background: "url(/temp/banner-home.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="container text-white">
          <h1 className="title-1 leading-tight">
            Bisnis Retail <br /> Bahan Bakar oleh <br /> <span className="text-green-light">PT PERTAMINA RETAIL</span>
          </h1>

          <p className="text-lg font-normal mt-4">Explore our various quality energy services</p>
          <ul className="text-lg mt-4 font-normal list-disc pl-4 space-y-2">
            <li>COCO, CODO, and KSO gas stations</li>
            <li>SPBG (Gas Fuel Filling Station)</li>
            <li>Pertashop for rural communities</li>
          </ul>

          <button className="flex space-x-1  border-green-light bg-green-light w-fit border px-6 py-3 rounded-full items-center mt-8">
            <span>Explore Our Services</span>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.21216 8.63376H12.721M12.721 8.63376L9.1552 4.51709M12.721 8.63376L9.1552 12.7504"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;

