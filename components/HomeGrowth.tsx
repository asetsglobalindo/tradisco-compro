"use client";
import {cn} from "@/lib/utils";
import React from "react";

const HomeGrowth = () => {
  const tabs = [
    {
      name: "Growth Revenue",
      color: "#80DC2B",
    },
    {
      name: "Outlet Growth",
      color: "#e1222b",
    },
    {
      name: "Decarbonization Activities",
      color: "#025cab",
    },
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section className="mt-32">
      <section className="container">
        <ul className="flex text-center max-w-[800px]  mx-auto text-base relative border-b-4 pb-6 border-[#EAEAEA]">
          {tabs.map((tab, index) => (
            <li
              key={tab.name}
              className={cn(
                {
                  "font-medium": activeIndex === index,
                },
                "cursor-pointer transition-all flex-1"
              )}
              onClick={() => setActiveIndex(index)}
            >
              {tab.name}
            </li>
          ))}

          <div
            style={{left: `${(activeIndex * 100) / tabs.length}%`, backgroundColor: tabs[activeIndex].color}}
            className="h-1 w-1/3 absolute -bottom-1 transition-all duration-500"
          ></div>
        </ul>
      </section>
      <section className="container grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <img src="/temp/growth-revenue.png" alt="" />
        <div className="">
          <h1 className="title-3">
            Growth <span className="text-green-light">Revenue</span>
          </h1>
          <p className="mt-4">
            A positive revenue growth trend in Pertamina Retail over five years often indicates increased production,
            rising oil and gas prices, efficient operations, or strategic investments. However, the industry is facing
            increasing pressure to address environmental and social concerns. By integrating ESG factors into their
            operations, companies can not only meet regulatory requirements and satisfy investor expectations but also
            enhance their reputation, attract responsible investors, and mitigate risks associated with climate change
            and social challenges.
          </p>
        </div>
      </section>
    </section>
  );
};

export default HomeGrowth;

