import BannerSingle from "@/components/BannerSingle";
import CSRourPrograms from "@/components/CSR/CSRourPrograms";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import {cn} from "@/lib/utils";
import {ContentType} from "@/types/indes";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const result: ContentType = await getData(CONTENT_TYPE.CSR_LIST);

  return {
    title: result.meta_title,
    description: result.meta_description,
    openGraph: {
      title: result.meta_title,
      description: result.meta_description,
    },
  };
}

const getData = async (type: string) => {
  try {
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

const page = async () => {
  const data: ContentType = await getData(CONTENT_TYPE.CSR_LIST);
  console.log("isis data: ", data)
  const dataTab: ContentType = await getData(CONTENT_TYPE.CSR_CONTENT);
  let count = 0;
  let currentLayout = "right";

  return (
    <section>
      <section className="relative">
        <BannerSingle data={data.banner} />
      </section>

      <section className="mt-16">
        <h1 className="title-3 text-center text-green-light">{data.title}</h1>
      </section>

      <section className="container max-w-[800px] lg:mt-16 mt-8">
        <CSRourPrograms data={dataTab} />
      </section>

      <section className="container mt-8">
        <section className="border-t pt-8 flex flex-col gap-8">
          {data.body.map((d, i) => {
            if (count == 2) {
              count = 1;
              if (currentLayout == "right") {
                currentLayout = "left";
              } else {
                currentLayout = "right";
              }
            } else {
              count = count + 1;
            }

            return (
              <section
                className={cn(
                  {
                    "flex-row-reverse": currentLayout == "left",
                  },
                  "lg:flex gap-8"
                )}
                key={d._id + i}
              >
                <div className="lg:w-1/2">
                  <img src={d?.images[0]?.images[0]?.url} alt={d?.title} />
                </div>
                <div className="lg:w-1/2 mt-4 lg:mt-0">
                  <h3 className="title-4">{d.title}</h3>
                  <div className="mt-4" dangerouslySetInnerHTML={{__html: d.text}}></div>
                </div>
              </section>
            );
          })}
        </section>
      </section>
      <section className="mt-16">
        <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 h-[240px] mb-[-192px]">
          <Link href="/csr" className="relative group cursor-pointer overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125" 
              src={data?.banner[0]?.images[0]?.url} 
              alt="Lingkungan" 
            />
            <div className="absolute bottom-0 left-0 p-8 w-full text-white h-full flex flex-col justify-center">
              <h2 className="text-xl font-semibold">Tanggung Jawab Sosial</h2>
              <p className="hidden group-hover:block text-sm mt-2">Selengkapnya →</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 group-hover:bg-green-light transition-all duration-300"></div>
          </Link>
          <Link href="/csr/collaboration-partnership" className="relative group cursor-pointer overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125" 
              src={data?.body[0]?.images[0]?.images[0].url} 
              alt="Sosial" 
            />
            <div className="absolute bottom-0 left-0 p-8 w-full text-white h-full flex flex-col justify-center">
              <h2 className="text-xl font-semibold">Kolaborasi & Kemitraan</h2>
              <p className="hidden group-hover:block text-sm mt-2">Selengkapnya →</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 group-hover:bg-green-light transition-all duration-300"></div>
          </Link>
        </section>
      </section>
    </section>
  );
};

export default page;

