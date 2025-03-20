"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { cn } from "@/lib/utils";
import { HomeType } from "@/types/indes";
import { Button } from "./ui/button";
import { ArrowRight, X } from "lucide-react";
import JSCookie from "js-cookie";
import Modal from "./ui/modal";

const HomeBussiness: React.FC<{ data: HomeType }> = ({ data }) => {
  const [selectedTabID, setSelectedTabID] = React.useState(
    data.section2.tab[0]._id
  );
  const [selectedItem, setSelectedItem] = React.useState(null);
  const lang = JSCookie.get("lang") || "id";
  const [isOpen, setIsOpen] = useState<string | null>(null);

  return (
    <section className="relative mt-16">
      {/* heading */}
      <section className="container">
        <h1 className="title-3 text-center">{data.section2.title}</h1>
      </section>

      {/* main business */}
      <section className="overflow-x-auto md:overflow-x-visible md:overflow-y-visible hide-default-scrollbar container mt-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 w-full place-items-center">
          {data.section2.tab.map((d, index) => (
            <section
              onClick={() => setSelectedTabID(d._id)}
              key={d._id || index}
              className="relative h-full max-h-[200px] group cursor-pointer"
            >
              <div className="overflow-hidden w-full h-full relative rounded-2xl">
                <img
                  src={d?.image?.images[0]?.url}
                  alt={d?.title}
                  className="blur-[2px] object-cover w-full transition-transform duration-300 transform group-hover:scale-125"
                />
                <span className="absolute z-10 top-1/2 left-10 title-4 text-white">
                  {d.title}
                </span>
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
                alt="arrow-down"
              />
            </section>
          ))}
        </section>
      </section>

      <section className="container mt-8">
        <Carousel>
          <CarouselContent>
            {data.section2.tab
              .find((d) => d._id === selectedTabID)
              ?.content.map((d, index) => (
                <React.Fragment key={d._id || `content-${index}`}>
                  <CarouselItem className="w-full md:basis-1/3 lg:basis-1/4">
                    <section className="relative group rounded-2xl news-card our-business group overflow-hidden group flex items-end justify-end transition-all">
                      <img
                        className="blur-[1px] aspect-square object-cover"
                        src={d?.thumbnail_images[0]?.images[0]?.url}
                        alt={d?.title}
                      />
                      <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-all left-0 w-full h-full bg-green-light-secondary"></div>

                      {/* Content */}
                      <section className="absolute z-20 left-0 text-white px-6 py-6 md:px-8 md:py-8 transition-all flex flex-col w-full">
                        {/* Title */}
                        <h1 className="mt-2 text-base md:text-lg font-semibold lg:max-w-[70%]">
                          {d.title}
                        </h1>

                        <Button
                          rounded
                          size="sm"
                          className="w-full md:w-fit md:h-12 md:px-8 md:text-base h-9 px-3 text-sm mt-4 shadow-sm box-border"
                          onClick={() => setIsOpen(d._id)}
                        >
                          <span>
                            {lang === "en" ? "Learn More" : "Selengkapnya"}
                          </span>
                          <ArrowRight color="white" />
                        </Button>
                      </section>
                    </section>
                  </CarouselItem>
                  <Modal
                    isOpen={isOpen === d._id}
                    onClose={() => setIsOpen?.(null)}
                  >
                    <header className="flex items-center justify-between mt-2 mb-3">
                      <section id="title">
                        <p className="text-lg text-green-light font-semibold">
                          {d.title}
                        </p>
                      </section>
                      <div className="w-6 h-6 text-center hover:text-red-800 hover:cursor-pointer">
                        <X className="w-5" onClick={() => setIsOpen?.(null)} />
                      </div>
                    </header>
                    <div className="md:grid md:grid-cols-2 ">
                      <div className="mb-4 w-full flex justify-center md:hidden block">
                        <img
                          src={d?.thumbnail_images[0]?.images[0]?.url}
                          className="w-[85%] transition-all rounded-md"
                          alt={d.title}
                        />
                      </div>
                      <div
                        className="pr-4 basis-1 h-full max-h-[60vh] lg:max-h-[50vh] overflow-y-auto scrollbar-custom"
                        dangerouslySetInnerHTML={{
                          __html: d.description,
                        }}
                      ></div>
                      <div className="ml-4 basis-1 md:block hidden">
                        <img
                          src={d?.thumbnail_images[0]?.images[0]?.url}
                          className="aspect-square object-cover transition-all rounded-md"
                          alt={d.title}
                        />
                      </div>
                    </div>
                  </Modal>
                </React.Fragment>
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
