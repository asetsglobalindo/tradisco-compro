"use client";
import {cn} from "@/lib/utils";
import {ContentType} from "@/types/indes";
import React, {useState} from "react";

const CSRourPrograms: React.FC<{data: ContentType}> = ({data}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const tabList = data.body.map((d) => ({label: d.title, value: d._id}));

  return (
    <section>
      <section className="max-w-full overflow-x-scroll lg:overflow-hidden hide-default-scrollbar">
        <ul className="flex text-center  mx-auto text-base relative border-b-4 pb-4 lg:pb-6 border-[#EAEAEA]">
          {tabList.map((tab, index) => (
            <li
              key={tab.label}
              className={cn(
                {
                  "font-medium": activeIndex === index,
                },
                "cursor-pointer transition-all flex-1"
              )}
              onClick={() => setActiveIndex(index + 1)}
            >
              {tab.label}
            </li>
          ))}

          <div
            style={{
              left: `${((activeIndex - 1) * 100) / tabList?.length}%`,
              width: `${100 / tabList?.length}%`,
              backgroundColor: "#63AE1D",
            }}
            className="h-1  absolute -bottom-1 transition-all duration-500"
          ></div>
        </ul>
      </section>

      <section className="mx-auto mt-8">
        {data.body[activeIndex - 1]?.text?.length ? (
          <div className="mt-8 dont-reset" dangerouslySetInnerHTML={{__html: data.body[activeIndex - 1].text}}></div>
        ) : null}

        {data.body[activeIndex - 1]?.images?.length ? (
          <img
            className="mx-auto mt-8"
            src={data.body[activeIndex - 1].images[0].images[0].url}
            alt={data?.body[activeIndex - 1].images[0]?.title}
          />
        ) : null}
      </section>
    </section>
  );
};

export default CSRourPrograms;

