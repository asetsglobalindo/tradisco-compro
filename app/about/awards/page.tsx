import BannerSingle from "@/components/BannerSingle";
import RelatedPage from "@/components/RelatedPage";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import {ContentType} from "@/types/indes";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";
import {cn} from "@/lib/utils";

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
      type: CONTENT_TYPE.ABOUT_REWARD,
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
  const linksData = [
    {
      href: "/about",
      image: data?.banner[0]?.images[0]?.url,
      alt: "Profile",
      title: "Profil",
    },
    {
      href: "/about/our-values",
      image: "https://pertamina.sgp1.digitaloceanspaces.com/pertamina/6351115a3ae70d03975326d7/images/c1053f3c-3af5-455b-a756-a5294e7f4c31.jpeg",
      alt: "Tata Nilai",
      title: "Tata Nilai",
    },
    {
      href: "/about/managements",
      image: data?.banner[0]?.images[0]?.url,
      alt: "Managements",
      title: "Managements",
    },
  ];
  const columns = 4
  const totalRows = Math.ceil(data?.images?.length / columns);

  return (
    <section>
      <section className="relative">
        <BannerSingle data={data.banner} />
      </section>

      <section className="container mt-16 max-w-[900px]">
        <h1 className="title-3 text-green-light text-center">{data.title}</h1>
        <div className="mt-8" dangerouslySetInnerHTML={{__html: data.description}}></div>

        <section className="grid grid-cols-2 mt-8 lg:mt-16 md:grid-cols-4">
          {data?.images?.map((d, index) => {
              const isLastRow = Math.floor(index / columns) === totalRows - 1;
              return(
                <div key={d._id} 
                className={cn("flex justify-center border-r-2 last:border-r-0 border-[#005CAB]", 
                {
                  "border-b-2": !isLastRow
                })}>
                  <img className="w-full h-full object-contain p-2" src={d?.images[0]?.url} alt={d?.title} />
              </div>
              )
            }
          )}
        </section>
      </section>
      {/* Related Page */}
      <RelatedPage links={linksData} />
    </section>
  );
};

export default page;

