"use client";
import {cn} from "@/lib/utils";
import {ContentType} from "@/types/indes";
import React from "react";

const AnnualReportTab: React.FC<{data: ContentType[] | []}> = ({data}) => {
  const [selectedTab, setSelectedTab] = React.useState(data[0]._id);
  return (
    <section className="mt-16">
      <section className="flex gap-8 relative">
        {data.map((item) => (
          <div key={item._id} className="relative">
            <button
              className={cn({"font-semibold": item._id === selectedTab})}
              onClick={() => setSelectedTab(item._id)}
            >
              {item.title}
            </button>

            <div
              className={cn({"bg-green-light": item._id === selectedTab}, "h-[2px] w-full z-10 absolute -bottom-4 ")}
            ></div>
          </div>
        ))}

        {/* track */}
        <div className="h-[2px] w-full absolute -bottom-4 bg-[#EAEAEA]"></div>
      </section>

      <section className="mt-10">
        <div dangerouslySetInnerHTML={{__html: data.find((item) => item._id === selectedTab)?.description || ""}}></div>
        <search className="grid grid-cols-4 gap-4 mt-8">
          {data
            .find((item) => item._id === selectedTab)
            ?.body.map((item) => (
              <section key={item._id} className="shadow-md hover:shadow-xl p-4">
                <img src={item?.images[0]?.images[0]?.url} alt={item.title} />
                <h1 className="text-base font-medium text-center mt-4">{item.title}</h1>
                <div className="h-[2px] w-full bg-[#EAEAEA] my-5"></div>
                <button className="flex mx-auto space-x-1 text-white  border-green-light bg-green-light w-fit border px-6 py-3 rounded-full items-center ">
                  <span>{item.button_name}</span>
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="https://www.w3.org/2000/svg">
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
            ))}
        </search>
      </section>
    </section>
  );
};

export default AnnualReportTab;

