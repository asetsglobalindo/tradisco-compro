import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import moment from "moment";
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

    // make sure its type only for career (3)
    if (response.data.data.type !== 3) {
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
      <h1 className="title-2 max-w-[800px] mx-auto text-center">{data.title}</h1>
      <section className="max-w-[800px] mx-auto mt-16">
        <p className=" font-medium mt-4">Date : {moment(data.created_at).format("YYYY-MM-DD")}</p>
        <div className="mt-8" dangerouslySetInnerHTML={{__html: data.description}}></div>
      </section>
    </section>
  );
};

export default page;

