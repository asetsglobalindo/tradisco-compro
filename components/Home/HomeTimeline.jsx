"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const SLIDE_DURATION = 5000;

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef(null);
  const swiperRef = useRef(null);
  const [hoveredYear, setHoveredYear] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  useEffect(() => {
    if (progressRef.current) {
      const totalYears = data.length;

      if (activeIndex === 0) {
        // Reset progress non animated
        progressRef.current.style.transition = "none";
        progressRef.current.style.width = "0%";

        // After reset, back to normal
        setTimeout(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = `width ${SLIDE_DURATION}ms linear`;
            progressRef.current.style.width = `${(1 / totalYears) * 100}%`;
          }
        }, 50); // Delay to prevent flickering
      } else {
        // Normal progress update
        progressRef.current.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressRef.current.style.width = `${
          ((activeIndex + 1) / totalYears) * 100
        }%`;
      }
    }
  }, [activeIndex]);

  const data = [
    {
      year: "1990",
      title: "Formation and Early Years",
      subtitle: "The Beginning",
      image: "/images/timeline-1996.jpg",
      description:
        "Thirty years ago, Tradisco began as a pioneering company rooted in Indonesia'  s rich natural resources. Established to harness the potential of the nation's abundant energy and mining sectors, Tradisco initially focused on engineering, mechanical solutions and consulting services, providing essential support to the booming industrial landscape.",
    },
    {
      year: "2010",
      title: "Early Beginnings",
      subtitle: "Energy & Natural Resources",
      image: "/images/timeline-2010.png", // Updated image path with specific year
      description:
        "Tradisco's foundation was built on delivering consulting and mechanical solutions in the energy and natural resources sectors, where it quickly established a reputation for reliability and expertise.",
    },
    {
      year: "2015",
      title: "Expansion into Tech",
      subtitle: "Digitalization",
      image: "/images/timeline-2015.png", // Updated image path with specific year
      description:
        "Responding to industry needs, Tradisco transitioned into the tech space, launching system monitoring solutions like Stori and expanding its role as a tech consultant, helping clients digitize operations.",
    },
    {
      year: "2018",
      title: "Becoming a Holding Company",
      subtitle: "",
      image: "/images/timeline-2018.png", // Updated image path with specific year
      description:
        "Tradisco evolved into a private investment and tech holding company, consolidating its expertise to deliver comprehensive market solutions and fostering innovations across multiple industries.",
    },
    {
      year: "2023",
      title: "Global Reach",
      subtitle: "",
      image: "/images/timeline-2023.png", // Updated image path with specific year
      description:
        "Today, Tradisco collaborates with partners worldwide, leveraging global insights to deliver impactful results, particularly aimed at bolstering Asia's economic landscape.",
    },
  ];

  return (
    <section className="timeline-container relative bg-gray-900">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#FF5733] font-medium text-lg uppercase tracking-wider">
              COMPANY PORTFOLIO
            </h2>
            <h3 className="text-4xl font-bold text-[#0B2D5C] mt-2 mb-6">
              Company History Timeline
            </h3>
            <div className="max-w-3xl mx-auto text-gray-600 text-center">
              <p>
                Tradisco&apos;s journey from its origins to becoming a
                powerhouse in tech and investment infrastructure highlights a
                steadfast commitment to innovation and growth. Guided by a
                vision of{" "}
                <span className="italic">
                  &quot;Strengthening Asia&apos;s Economy through Global
                  Expertise,&quot;
                </span>{" "}
                Tradisco has continually adapted to meet evolving market demands
                with cutting-edge solutions.
              </p>
            </div>

            {/* Decorative line */}
            <div className="flex justify-center mt-8">
              <div className="h-1 w-20 bg-[#8BC34A]"></div>
              <div className="h-1 w-20 bg-[#4CAF50] ml-1"></div>
            </div>
          </div>
        </div>
      </section>
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        autoplay={{ delay: SLIDE_DURATION, disableOnInteraction: false }}
        loop={true}
        onSlideChange={handleSlideChange}
        className="swiper-container"
        ref={swiperRef}
        fadeEffect={{ crossFade: true }}
      >
        {data.length > 0 ? (
          data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-screen overflow-hidden">
                <div className="absolute inset-0 z-10">
                  <img
                    key={`img-${item.year}`}
                    src={item.image}
                    alt={item.year}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/70 z-20"></div>
                <div className="relative flex flex-col items-start justify-center h-full container mx-auto text-white px-8 md:px-16 z-30">
                  <div className="max-w-2xl">
                    <h2 className="text-7xl font-bold mb-6 text-blue-400 transition-all duration-700 opacity-100 translate-y-0">
                      {item.year}
                    </h2>
                    <h3 className="text-3xl font-bold mb-2 text-white">
                      {item.title}
                      {item.subtitle && (
                        <span className="block text-xl font-medium text-gray-300 mt-1">
                          {item.subtitle}
                        </span>
                      )}
                    </h3>
                    <p className="text-xl leading-relaxed text-gray-100 font-light mt-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )) || []
        ) : (
          <div className="text-white text-center">No data available</div>
        )}
      </Swiper>

      {/* Timeline Navigation */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-4 z-40 w-4/5">
        <div className="relative w-full h-[3px] bg-gray-700">
          {/* Timeline Years */}
          <div
            className="flex justify-stretch mt-2 text-gray-300 text-sm relative"
            style={{ top: "-30px" }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer flex-1 text-center"
                onMouseEnter={() => setHoveredYear(index)}
                onMouseLeave={() => setHoveredYear(null)}
                onClick={() => swiperRef.current?.swiper.slideToLoop(index)}
              >
                <div className="flex flex-col items-center transition-all duration-300">
                  <span
                    className={`transition-all duration-300 text-lg ${
                      hoveredYear === index ? "translate-y-[-8px]" : ""
                    } ${
                      index === activeIndex
                        ? "text-blue-400 font-bold text-xl"
                        : "text-gray-400"
                    }`}
                  >
                    {item.year}
                  </span>
                  <div
                    className={`absolute bottom-[-120px] left-1/2 transform -translate-x-1/2 rounded-lg shadow-lg w-32 h-20 transition-all duration-300 ${
                      hoveredYear === index
                        ? "opacity-100 visible translate-y-[-20px]"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={item.image}
                        alt="Preview"
                        loading="lazy"
                        className="w-full h-full object-cover rounded cursor-pointer"
                        onClick={() =>
                          swiperRef.current?.swiper.slideToLoop(index)
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded"></div>
                      <div className="absolute bottom-1 w-full text-center text-white font-bold text-sm">
                        {item.year}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Circle markers */}
                <div
                  className={`w-2 h-2 rounded-full absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-blue-400 scale-125"
                      : "bg-gray-600 scale-100"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-blue-400 transition-all duration-300 ease-linear"
            style={{
              width: "0%",
              transition: `width ${SLIDE_DURATION}ms linear`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
