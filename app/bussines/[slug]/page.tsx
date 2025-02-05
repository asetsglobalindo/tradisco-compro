import BannerSingle from "@/components/BannerSingle";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import {ContentType} from "@/types/indes";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const result: ContentType = await getData(slug, CONTENT_TYPE.BUSINESS_PAGE, 1);

  return {
    title: result.meta_title,
    description: result.meta_description,
    openGraph: {
      title: result.meta_title,
      description: result.meta_description,
    },
  };
}

const getData = async (slug: string, type: string, limit = 9999) => {
  try {
    const params = {
      category_slug: slug,
      active_status: true,
      sort_at: "order",
      sort_by: -1,
      type: type,
      limit: limit,
      show_single_language: "yes",
    };

    const response = await ApiService.get("/content", params);

    if (response.data.status !== 200) {
      throw new Error(response.data.message || response.data.err);
    }

    if (limit === 1) {
      return response.data.data[0];
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const page = async ({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = await params;
  const data: ContentType = await getData(slug, CONTENT_TYPE.BUSINESS_PAGE, 1);
  const bussinessList: ContentType[] | [] = await getData(slug, CONTENT_TYPE.BUSINESS);

  return (
    <section>
      <section className="relative">
        <BannerSingle data={data?.banner} />
      </section>

      <section className="container">
        <section className="mt-16">
          <h1 className="title-3">{data?.title}</h1>
          <div className="mt-8" dangerouslySetInnerHTML={{__html: data?.small_text}}></div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 lg:mt-16">
          {bussinessList.map((d) => (
            <div key={d._id} className="relative rounded-2xl overflow-hidden aspect-square">
              <img className="w-full h-full object-cover" src={d?.thumbnail_images[0]?.images[0]?.url} alt="" />
              <div className="absolute px-4 bottom-4 text-white z-10">
                <h1 className="font-bold text-green-light">{d.title}</h1>
                <div className="mt-2" dangerouslySetInnerHTML={{__html: d.description}}></div>
              </div>

              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-60"></div>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

export default page;

