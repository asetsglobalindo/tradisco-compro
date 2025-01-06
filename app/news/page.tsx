import NewsList from "@/components/News/NewsList";
import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import {notFound} from "next/navigation";
import React from "react";

const getData = async () => {
  try {
    const params = {
      limit: 1,
      page: 1,
      active_status: true,
      type: "news_page",
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

const page = async () => {
  const data: ContentType = await getData();

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

        <section className="mt-16">
          <NewsList />
        </section>
      </section>
    </section>
  );
};

export default page;

