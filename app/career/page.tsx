import BannerSingle from "@/components/BannerSingle";
import CareerList from "@/components/Career/CareerList";
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
      type: "career_page",
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
        <BannerSingle data={data.banner} />

        <section className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[800px] text-white text-center">
          <h1 className="title-2">{data.title}</h1>
          <div className="mt-4 text-base" dangerouslySetInnerHTML={{__html: data.description}}></div>
        </section>
      </section>

      <section className="container">
        <section className="mt-16">
          <CareerList />
        </section>
      </section>
    </section>
  );
};

export default page;

