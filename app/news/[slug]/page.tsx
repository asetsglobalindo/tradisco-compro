import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import moment from "moment";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
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

    // make sure its type only for news (2)
    if (response.data.data.type !== 2) {
      throw new Error("Data not found");
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const page = async (params: any) => {
  const {slug} = params.params;
  const data: ContentType = await getData(slug);

  return (
    <section className="mt-16 container">
      <h1 className="title-2 max-w-[800px] mx-auto text-center">{data.title}</h1>
      <p className="text-center font-medium mt-8">
        <span className="text-green-light">{data.category_id.name}</span> /{" "}
        {moment(data.created_at).format("YYYY-MM-DD")}
      </p>
      <section className="relative mt-8">
        {data.images.slice(0, 1).map((img) => (
          <picture key={img._id}>
            <source media="(min-width:650px)" srcSet={img.images[0].url} />
            <img className="w-full" src={img.images[0].url} alt="Flowers" />
          </picture>
        ))}
      </section>

      <section className="max-w-[800px] mx-auto mt-8">
        <div className="" dangerouslySetInnerHTML={{__html: data.description}}></div>
      </section>
    </section>
  );
};

export default page;

