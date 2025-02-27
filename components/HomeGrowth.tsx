"use client";
import {cn, getLanguage} from "@/lib/utils";
import {HomeType} from "@/types/indes";
import React from "react";
import Chart from "./ui/chart";
import { en_businessChartData, en_financeChartData, id_businessChartData, id_financeChartData } from "./constant";

const HomeGrowth: React.FC<{data: HomeType}> = ({data}) => {
  const baseColor = ["#80DC2B", "#e1222b", "#025cab"];
  const colorOption = [...baseColor, ...baseColor, ...baseColor];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const getLang:string = getLanguage()

  return (
    <section className="mt-8 lg:mt-16 bg-cover bg-no-repeat">
      <section className="container">
        <section className="max-w-full overflow-x-scroll lg:overflow-hidden hide-default-scrollbar">
          <ul className="flex text-center w-[640px]  lg:w-[800px]  mx-auto text-base relative border-b-4 pb-4 lg:pb-6 border-[#EAEAEA]">
            {data.section4.map((tab, index) => (
              <li
                key={tab.title}
                className={cn(
                  {
                    "font-medium": activeIndex === index,
                  },
                  "cursor-pointer transition-all flex-1"
                )}
                onClick={() => setActiveIndex(index)}
              >
                {tab.title}
              </li>
            ))}

            <div
              style={{
                left: `${(activeIndex * 100) / data.section4?.length}%`,
                backgroundColor: colorOption[activeIndex],
              }}
              className="h-1 w-1/3 absolute -bottom-1 transition-all duration-500"
            ></div>
          </ul>
        </section>
      </section>

      <section
        className={cn(
          {
            "lg:flex-row-reverse": activeIndex % 2 !== 0,
            "lg:flex-row": activeIndex % 2 === 0,
          },
          "container flex gap-8 mt-8 flex-col "
        )}
      >
        <div className="lg:w-1/2">
          <Chart
            data={
              getLang === 'en' ? 
                activeIndex === 0 ? en_financeChartData : en_businessChartData
              :  activeIndex === 0 ? id_financeChartData : id_businessChartData
            }
          />
        </div>
        {/* <img
          className="lg:w-1/2 rounded-2xl"
          src={data?.section4[activeIndex]?.image?.images[0]?.url}
          alt={data?.section4[activeIndex]?.image?.title}
        /> */}
        <div className="lg:w-1/2">
          <h1 className="title-3">{data?.section4[activeIndex]?.title}</h1>
          <p
            className="mt-8 text-justify"
            dangerouslySetInnerHTML={{__html: data?.section4[activeIndex]?.description}}
          ></p>
        </div>
      </section>
    </section>
  );
};

export default HomeGrowth;

