import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const result: ContentType = await getData(slug);

  return {
    title: result.meta_title,
    description: result.meta_description,
    openGraph: {
      title: result.meta_title,
      description: result.meta_description,
    },
  };
}

const getData = async (slug: string) => {
  try {
    const response = await ApiService.get("/content/body/" + slug);

    if (response.data.status !== 200) {
      throw new Error(response.data.message || response.data.err);
    }

    // make sure its type only for partnership (17)
    if (response.data.data.type !== 17) {
      throw new Error("Data not found");
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const page = async ({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = await params;
  const data: ContentType = await getData(slug);

  return (
    <section className="mt-16 container">
      <h1 className="title-3 max-w-[800px] mx-auto text-center">{data.sub_title3}</h1>

      <section className="max-w-[800px] mx-auto mt-8">
        <div className="" dangerouslySetInnerHTML={{__html: data.sub_title2}}></div>
      </section>
    </section>
  );
};

export default page;

