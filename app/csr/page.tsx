import BannerSingle from "@/components/BannerSingle";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import {ContentType} from "@/types/indes";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const result: ContentType = await getData();

  return {
    title: result.meta_title,
    description: result.meta_description,
    openGraph: {
      title: result.meta_title,
      description: result.meta_description,
    },
  };
}

const getData = async () => {
  try {
    const params = {
      limit: 1,
      page: 1,
      active_status: true,
      type: CONTENT_TYPE.CSR,
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
      </section>

      {/* top */}

      <section className="container mt-16">
        <section className="max-w-[900px] mx-auto">
          <section
            className="text-white  py-16 px-4 lg:px-14 bg-cover bg-no-repeat rounded-3xl overflow-hidden"
            style={{backgroundImage: `url(${data?.thumbnail_images[0]?.images[0]?.url})`}}
          >
            <h1 className="title-3 text-center">{data.sub_title1}</h1>
            <div className="mt-4" dangerouslySetInnerHTML={{__html: data.bottom_button_name}}></div>
          </section>
        </section>
      </section>

      <section className="container lg:mt-16 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.body
          .filter((d) => d.type === 3)
          .map((d) => (
            <div className="relative rounded-2xl overflow-hidden" key={d._id}>
              <img className="w-full h-full object-cover" src={d.images[0].images[0].url} alt={d?.title} />
              <section className="absolute bottom-0 z-20 left-0 p-4 xl:p-8 transition-all flex flex-col">
                <h1 className="mt-2 text-lg text-green-light font-semibold lg:max-w-[70%] ">{d.title}</h1>
                <div className="text-white" dangerouslySetInnerHTML={{__html: d.text}}></div>
              </section>
            </div>
          ))}
      </section>

      <section className="container lg:mt-16 mt-8">
        <section className="dont-reset border-b pb-16" dangerouslySetInnerHTML={{__html: data.sub_title2}}></section>
      </section>
      <section className="container lg:mt-16 mt-8">
        <section className="  border-b pb-16" dangerouslySetInnerHTML={{__html: data.sub_title3}}></section>
      </section>
      <section className="container lg:mt-16 mt-8">
        <section className="" dangerouslySetInnerHTML={{__html: data.small_text}}></section>
      </section>

      <section className="container mt-8">
        <section className="max-w-[900px] mx-auto">
          <section
            className="text-white  py-8 px-8 lg:px-14 bg-cover bg-no-repeat rounded-3xl overflow-hidden"
            style={{backgroundImage: `url(${data?.thumbnail_images2[0]?.images[0]?.url})`}}
          >
            <h1 className="title-3 text-center">{data.sub_title1}</h1>

            <section className="grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-8 mt-4">
              {data.body
                .filter((d) => d.type === 2)
                .map((d, index) => (
                  <div key={d._id} className="relative flex items-center">
                    <div className="absolute -left-5 bg-green-light rounded-lg flex items-center justify-center h-10 w-10">
                      {index + 1}
                    </div>
                    <div className="bg-white text-black pl-8 py-4 pr-4 h-full rounded-2xl flex items-center">
                      <div dangerouslySetInnerHTML={{__html: d.text}}></div>
                    </div>
                  </div>
                ))}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default page;

