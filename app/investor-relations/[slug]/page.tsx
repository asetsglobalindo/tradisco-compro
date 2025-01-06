import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import {notFound} from "next/navigation";
import React from "react";

const getData = async (type: string) => {
  try {
    const enum_type = ["sustainability_report", "annual_report"];
    type = type.toLocaleLowerCase().replace("-", "_");
    if (!enum_type.includes(type)) {
      throw new Error("Data not found");
    }

    const params = {
      limit: 1,
      page: 1,
      active_status: true,
      type: type,
      show_single_language: "yes",
    };

    const response = await ApiService.get("/content", params);

    if (response.data.status !== 200) {
      throw new Error(response.data.message || response.data.err);
    }

    if (!response.data.data.length) {
      throw new Error("Data not found");
    }

    return response.data.data[0];
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const page = async (params: any) => {
  const {slug} = params.params;
  const data: ContentType = await getData(slug);

  return (
    <section>
      <section className="relative">
        {data.banner.slice(0, 1).map((img) => (
          <picture key={img._id}>
            <source media="(min-width:650px)" srcSet={img.images[0].url} />
            <img className="w-full" src={img.images_mobile[0].url} alt="Flowers" />
          </picture>
        ))}

        <h1 className="title-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">{data.title}</h1>
      </section>

      <section className="container">
        <div className="mt-16" dangerouslySetInnerHTML={{__html: data.description}}></div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.body.map((d) => (
            <div key={d._id} className="mt-16 shadow-xl overflow-hidden rounded-md">
              <img className="aspect-[5/7] object-cover" src={d.images[0].images[0].url} alt="" />
              <div className="p-4">
                <h1 className="title-5 font-semibold text-center">{d.title}</h1>
                <a href={d.button_route} target="_blank">
                  <button className="flex space-x-1 mt-4 text-white mx-auto border-green-light bg-green-light w-fit border px-6 py-2 rounded-full items-center">
                    <span className="tracking-wider">{d.button_name}</span>
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
                </a>
              </div>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

export default page;

