"use client";
import React from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel";
import {cn} from "@/lib/utils";

const data = [
  {
    title: "FUEL",
    img: "/temp/fuel.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    images: ["/temp/fuel-1.png", "/temp/fuel-2.png", "/temp/our-bussines.png"],
  },
  {
    title: "NONFUEL",
    img: "/temp/our-bussines.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    images: ["/temp/fuel-1.png", "/temp/fuel-2.png", "/temp/our-bussines.png"],
  },
];

const HomeBussiness = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(data[0].title);

  return (
    <section className="relative mt-16 lg:mt-32">
      {/* heading */}
      <section className="container">
        <h1 className="title-3 text-center">
          Our <span className="text-green-light">Bussines</span>
        </h1>
      </section>

      {/* main bussiness */}
      <section className="overflow-x-auto md:overflow-x-visible md:overflow-y-visible hide-default-scrollbar container mt-8">
        <section className="grid grid-cols-2 gap-4 lg:gap-8 w-[600px] md:w-full">
          {data.map((d, index) => (
            <section
              onClick={() => setSelectedCategory(d.title)}
              key={index}
              className="relative h-full max-h-[200px] group cursor-pointer"
            >
              <div className="overflow-hidden w-full h-full relative rounded-2xl">
                <img className="blur-[2px] object-cover w-full" src={d.img} alt="" />
                <span className="absolute z-10 top-1/2 left-10 title-4 text-white">{d.title}</span>
                <div
                  className={cn(
                    {
                      "bussiness-card-active": d.title === selectedCategory,
                      "bussiness-card": d.title !== selectedCategory,
                    },
                    "absolute top-0 left-0 w-full h-full rounded-2xl"
                  )}
                ></div>
              </div>

              <img
                className={cn(
                  {
                    block: d.title === selectedCategory,
                    hidden: d.title !== selectedCategory,
                  },
                  "absolute -bottom-7 left-1/2 -translate-x-1/2"
                )}
                src="/icons/arrow-down.png"
                alt=""
              />
            </section>
          ))}
        </section>
      </section>

      <section className="container mt-8 md:mt-16">
        <Carousel>
          <CarouselContent>
            {data
              .find((d) => d.title === selectedCategory)
              ?.images.map((d, index) => (
                <CarouselItem key={index} className="w-full md:basis-1/3">
                  <section className="relative rounded-2xl news-card overflow-hidden group flex items-end justify-end transition-all">
                    <img className="blur-[2px] aspect-square object-cover" src={d} alt="" />

                    {/* content */}
                    <section className="absolute z-20 group-hover:hidden text-white px-8 py-8 transition-all flex flex-col">
                      {/* category */}
                      <span className="text-green-light">Bright Wash</span>
                      {/* title */}
                      <h1 className="mt-2 text-lg font-semibold lg:max-w-[70%] ">
                        Revitalize Your Vehicle with Bright Wash
                      </h1>
                      <button className="flex space-x-1  border-green-light bg-green-light w-fit border px-6 py-3 rounded-full items-center mt-4">
                        <span>Learn More</span>
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
                    </section>

                    {/* background shade */}
                    <div className="absolute top-0  left-0 w-full h-full news-card bg-red-50"></div>

                    {/* hover effect */}
                    <section className="hidden group-hover:flex absolute z-30 bg-green/50 h-full justify-center text-white px-8 py-8 transition-all  flex-col">
                      {/* category */}
                      <span className="text-white text-center">Bright Wash</span>
                      {/* title */}
                      <h1 className="mt-2 text-lg font-semibold text-center mx-auto lg:max-w-[70%] ">
                        Revitalize Your Vehicle with Bright Wash
                      </h1>
                    </section>
                  </section>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </section>
  );
};

export default HomeBussiness;

