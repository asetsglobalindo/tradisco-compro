"use client";
import { cn } from "@/lib/utils";
import { ContentType } from "@/types/indes";
import React, { useState } from "react";
import { X } from "lucide-react";
import JSCookie from "js-cookie";
import Modal from "../ui/modal";

const AboutManagement: React.FC<{ data: ContentType }> = ({ data }) => {
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
  const [isOpen, setIsOpen] = useState<string | null>(null);

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
          .map((d) => {
            return (
              <section id="management" key={d._id}>
                <section
                  className="overflow-hidden cursor-pointer rounded-2xl"
                  onClick={() => setIsOpen(d._id)}
                >
                  <div className="m-4">
                    <span className="md:text-lg font-bold hover:underline">
                      {d.button_route}
                    </span>
                    <p className="text-xs mt-2">{d.title}</p>
                  </div>
                  <img
                    src={d?.images[0]?.images[0]?.url}
                    className="w-full transition-all"
                    alt={d.button_route}
                  />
                </section>

                <Modal
                  isOpen={isOpen === d._id}
                  onClose={() => setIsOpen?.(null)}
                >
                  <header className="flex items-center justify-between mt-2 mb-3">
                    <section id="title">
                      <h2 className="text-lg text-green-light font-semibold">
                        {d.button_route}
                      </h2>
                      <p className="text-xs mt-2">{d.title}</p>
                    </section>
                    <div className="w-6 h-6 text-center hover:text-red-800 hover:cursor-pointer">
                      <X className="w-5" onClick={() => setIsOpen?.(null)} />
                    </div>
                  </header>
                  <div className="md:grid md:grid-cols-2">
                    <div className="mb-4 w-full flex justify-center md:hidden block">
                      <img
                        src={d?.images[0]?.images[0]?.url}
                        className="w-[85%] transition-all rounded-md"
                        alt={d.button_route}
                      />
                    </div>
                    <div
                      className="pr-4 basis-1 h-full max-h-[60vh] lg:max-h-[50vh]  overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-[#005CAB]
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-[#005CAB]"
                      dangerouslySetInnerHTML={{ __html: d.text }}
                    ></div>
                    <div className="ml-4 w-full basis-1 md:block hidden">
                      <img
                        src={d?.images[0]?.images[0]?.url}
                        className="w-full transition-all rounded-md aspect-square object-cover object-top"
                        alt={d.button_route}
                      />
                    </div>
                  </div>
                </Modal>
              </section>
            );
          })}
      </section>
    </section>
  );
};

export default AboutManagement;
