"use client";
import {cn} from "@/lib/utils";
import React from "react";

const business_data = [
  {
    title: "Growth Revenue",
    body: "A positive revenue growth trend in Pertamina Retail over five years often indicates increased production, rising oil and gas prices, efficient operations, or strategic investments. However, the industry is facing increasing pressure to address environmental and social concerns. By integrating ESG factors into their operations, companies can not only meet regulatory requirements and satisfy investor expectations but also enhance their reputation, attract responsible investors, and mitigate risks associated with climate change and social challenges.",
    img: "/temp/growth-revenue-1.png",
    color: "#80DC2B",
  },
  {
    title: "Outlet Growth",
    body: "A positive revenue growth trend in Pertamina Retail over five years often indicates increased production, rising oil and gas prices, efficient operations, or strategic investments. However, the industry is facing increasing pressure to address environmental and social concerns. By integrating ESG factors into their operations, companies can not only meet regulatory requirements and satisfy investor expectations but also enhance their reputation, attract responsible investors, and mitigate risks associated with climate change and social challenges.",
    img: "/temp/growth-revenue-2.png",
    color: "#e1222b",
  },
  {
    title: "Decarbonization Activities",
    body: "A positive revenue growth trend in Pertamina Retail over five years often indicates increased production, rising oil and gas prices, efficient operations, or strategic investments. However, the industry is facing increasing pressure to address environmental and social concerns. By integrating ESG factors into their operations, companies can not only meet regulatory requirements and satisfy investor expectations but also enhance their reputation, attract responsible investors, and mitigate risks associated with climate change and social challenges.",
    img: "/temp/growth-revenue-1.png",
    color: "#025cab",
  },
];

const HomeGrowth = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section className="mt-16 lg:mt-32 bg-cover bg-no-repeat">
      <section className="container">
        <section className="max-w-full overflow-x-scroll lg:overflow-hidden hide-default-scrollbar">
          <ul className="flex text-center w-[640px]  lg:w-[800px]  mx-auto text-base relative border-b-4 pb-4 lg:pb-6 border-[#EAEAEA]">
            {business_data.map((tab, index) => (
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
                left: `${(activeIndex * 100) / business_data.length}%`,
                backgroundColor: business_data[activeIndex].color,
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
          "container flex gap-8 mt-8 lg:mt-16 flex-col "
        )}
      >
        <img className="lg:w-1/2" src={business_data[activeIndex].img} alt="" />
        <div className="lg:w-1/2">
          <h1 className="title-3">
            {business_data[activeIndex].title.split(" ")[0]}{" "}
            <span className="text-green-light">{business_data[activeIndex].title.split(" ")[1]}</span>
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

