import BannerSingleMulti from "@/components/BannerSingleMulti";
import BusinessCarousel from "./BusinessCarousel"; // Import komponen Client
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import { ContentType } from "@/types/indes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const result: ContentType = await getData(
    slug,
    CONTENT_TYPE.BUSINESS_PAGE,
    1
  );

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

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data: ContentType = await getData(slug, CONTENT_TYPE.BUSINESS_PAGE, 1);
  const bussinessList: ContentType[] | [] = await getData(
    slug,
    CONTENT_TYPE.BUSINESS
  );

  return (
    <section>
      <section className="relative">
        <BannerSingleMulti data={data?.banner} />
      </section>

      <section className="container">
        <section className="mt-16">
          <h1 className="title-3 text-center text-green-light">
            {data?.title}
          </h1>
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: data?.small_text }}
          ></div>
        </section>

        <section className="mt-8 flex flex-col">
          <BusinessCarousel bussinessList={bussinessList} />
        </section>
      </section>
    </section>
  );
};

export default Page;
