import BannerSingle from "@/components/BannerSingle";
import RelatedPage from "@/components/RelatedPage";
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
      type: CONTENT_TYPE.ABOUT_VALUE,
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
      href: "/about/awards",
      image: data?.banner[0]?.images[0]?.url,
      alt: "Penghargaan",
      title: "Penghargaan",
    },
  ];

  return (
    <section>
      <section className="relative">
        <BannerSingle data={data.banner} />
      </section>

      <section className="container mt-16 max-w-[900px]">
        <section className="grid grid-cols-1 gap-8 md:gap-16">
          {data?.images?.map((d) => (
            <div key={d._id} className="flex justify-center">
              <img className="w-full object-contain" src={d?.images[0]?.url} alt={d.title} />
            </div>
          ))}
        </section>
      </section>
      {/* Related Page */}
      <RelatedPage links={linksData} />
    </section>
  );
};

export default page;

