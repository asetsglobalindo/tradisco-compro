"use client";
import React from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel";
import {cn} from "@/lib/utils";
import {HomeType} from "@/types/indes";
import {Button} from "./ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import JSCookie from "js-cookie";

const HomeBussiness: React.FC<{data: HomeType}> = ({data}) => {
  const [selectedTabID, setSelectedTabID] = React.useState(data.section2.tab[0]._id);
  const lang = JSCookie.get("lang") || "en";

  return (
    <section className="relative mt-16 lg:mt-32">
      {/* heading */}
      <section className="container">
        <h1 className="title-3 text-center">{data.section2.title}</h1>
      </section>

      {/* main bussiness */}
      <section className="overflow-x-auto md:overflow-x-visible md:overflow-y-visible hide-default-scrollbar container mt-8">
        <section className="grid grid-cols-2 gap-4 lg:gap-8 w-[600px] md:w-full">
          {data.section2.tab.map((d, index) => (
            <section
              onClick={() => setSelectedTabID(d._id)}
              key={index}
              className="relative h-full max-h-[200px] group cursor-pointer"
            >
              <div className="overflow-hidden w-full h-full relative rounded-2xl">
                <img className="blur-[2px] object-cover w-full" src={d.image.images[0].url} alt="" />
                <span className="absolute z-10 top-1/2 left-10 title-4 text-white">{d.title}</span>
                <div
                  className={cn(
                    {
                      "bussiness-card-active": d.title === selectedTabID,
                      "bussiness-card": d.title !== selectedTabID,
                    },
                    "absolute top-0 left-0 w-full h-full rounded-2xl"
                  )}
                ></div>
              </div>

              <img
                className={cn(
                  {
                    block: d.title === selectedTabID,
                    hidden: d.title !== selectedTabID,
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
            {data.section2.tab
              .find((d) => d._id === selectedTabID)
              ?.content.map((d, index) => (
                <CarouselItem key={index} className="w-full md:basis-1/3">
                  <section className="relative group rounded-2xl news-card group  overflow-hidden group flex items-end justify-end transition-all">
                    <img
                      className="blur-[2px] aspect-square object-cover"
                      src={d.thumbnail_images[0].images[0].url}
                      alt=""
                    />

                    <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-all left-0 w-full h-full bg-green-light"></div>
                    {/* content */}
                    <section className="absolute z-20 text-white px-8 py-8 transition-all flex flex-col">
                      {/* category */}
                      <span className="text-green-light group-hover:text-white">{d.small_text}</span>
                      {/* title */}
                      <h1 className="mt-2 text-lg font-semibold lg:max-w-[70%] ">{d.title}</h1>

                      <Link href={"/bussines/" + d.category_id.slug}>
                        <Button
                          rounded
                          size="lg"
                          className="w-fit mt-4 shadow-sm group-hover:border-white group-hover:border box-border"
                        >
                          <span>{lang === "en" ? "Learn More" : "Selengkapnya"} </span>
                          <ArrowRight color="white" />
                        </Button>
                      </Link>
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

