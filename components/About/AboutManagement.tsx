"use client";
import {cn} from "@/lib/utils";
import {ContentType} from "@/types/indes";
import React, {useState} from "react";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger} from "../ui/drawer";
import {Button} from "../ui/button";
import {X} from "lucide-react";
import JSCookie from "js-cookie";

const AboutManagement: React.FC<{data: ContentType}> = ({data}) => {
  const langValue = JSCookie.get("lang") || "id";
  const lang = langValue === "en" ? "en" : "id";
  const [activeIndex, setActiveIndex] = useState(1);
  const tabList = [
    {
      value: 1,
      label: {
        en: "Board of Directors",
        id: "Direksi",
      },
    },
    {
      value: 2,
      label: {
        en: "Board of Commissioners",
        id: "Dewan Komisaris",
      },
    },
  ];

  return (
    <section>
      <section className="max-w-full overflow-x-scroll lg:overflow-hidden hide-default-scrollbar">
        <ul className="flex text-center  mx-auto text-base relative border-b-4 pb-4 lg:pb-6 border-[#EAEAEA]">
          {tabList.map((tab, index) => (
            <li
              key={tab.label[lang]}
              className={cn(
                {
                  "font-medium": activeIndex === index,
                },
                "cursor-pointer transition-all flex-1"
              )}
              onClick={() => setActiveIndex(index + 1)}
            >
              {String(tab.label[lang])}
            </li>
          ))}

          <div
            style={{
              left: `${((activeIndex - 1) * 100) / tabList?.length}%`,
              backgroundColor: "#63AE1D",
            }}
            className="h-1 w-1/2 absolute -bottom-1 transition-all duration-500"
          ></div>
        </ul>
      </section>

      <section className="grid-cols-1 md:grid-cols-3 gap-8 grid  mx-auto mt-8 lg:mt-16">
        {data.body
          .filter((d) => d.type === activeIndex)
          .map((d) => (
            <Drawer key={d._id}>
              <DrawerTrigger asChild className="cursor-pointer rounded-2xl group overflow-hidden">
                <div className="border">
                  <div className=" m-4">
                    <DrawerTitle className="mt-4">
                      <span className="title-5font-bold group-hover:underline">{d.button_route}</span>
                    </DrawerTitle>
                    <p className="text-xs mt-2">{d.title}</p>
                  </div>
                  <img src={d.images[0].images[0].url} className="w-full transition-all" alt={d.button_route} />
                </div>
              </DrawerTrigger>
              <DrawerContent className="border-none rounded-t-3xl px-0 container overflow-hidden">
                <div className="mx-auto w-full ">
                  <DrawerHeader className="bg-[#171717] flex items-center py-8 text-white">
                    <section className="container flex justify-between items-center">
                      <section>
                        <h1 className="title-4">{d.button_route}</h1>
                        <p className="mt-2">{d.title}</p>
                      </section>
                      <DrawerClose>
                        <Button variant="outline" rounded className="w-fit px-3 bg-green-light/50 border-transparent">
                          <X color="#63AE1D" />
                        </Button>
                      </DrawerClose>
                    </section>
                  </DrawerHeader>
                  <section className="flex pb-10 lg:pb-0 flex-col-reverse lg:flex-row container items-center gap-8 lg:gap-16 mt-8 lg:mt-16 lg:mb-20">
                    <div
                      className="lg:w-[60%] h-full max-h-[300px] lg:max-h-[300px] xl:max-h-[500px] overflow-y-auto"
                      dangerouslySetInnerHTML={{__html: d.text}}
                    ></div>
                    <img className="lg:w-[40%] rounded-2xl" src={d.images[0].images[0].url} alt="" />
                  </section>
                </div>
              </DrawerContent>
            </Drawer>
          ))}
      </section>
    </section>
  );
};

export default AboutManagement;

