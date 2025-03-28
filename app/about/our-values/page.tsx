import BannerSingleMulti from "@/components/BannerSingleMulti";
import RelatedPage from "@/components/RelatedPage";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import { ContentType } from "@/types/indes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
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

const getDataBanner = async (type: string) => {
  const params = {
    limit: 1,
    page: 1,
    active_status: true,
    type,
    show_single_language: "yes",
  };

  const response = await ApiService.get("/content/banner", params);
  return response.data;
};

const page = async () => {
  const data: ContentType = await getData();
  const types = [
    {
      key: "about",
      type: CONTENT_TYPE.ABOUT_PROFILE,
      href: "/about",
      alt: "Profile",
    },
    {
      key: "management",
      type: CONTENT_TYPE.ABOUT_MANAGEMENT,
      href: "/about/managements",
      alt: "Management",
    },
    {
      key: "award",
      type: CONTENT_TYPE.ABOUT_REWARD,
      href: "/about/awards",
      alt: "Penghargaan",
    },
  ];

  const bannerData = await Promise.all(
    types.map(({ type }) => getDataBanner(type))
  );

  const linksData = types.map((item, index) => ({
    href: item.href,
    image: bannerData[index].data.id.banner[0].id.images[0].url,
    alt: item.alt,
    title: bannerData[index].data.id.page_title,
  }));

  return (
    <section>
      <section className="relative">
        <BannerSingleMulti data={data.banner} />
      </section>

      <section className="container mt-16 max-w-[1200px]">
        <section className="grid grid-cols-1 gap-8 md:gap-16">
          {data?.images?.map((d) => (
            <div key={d._id} className="flex justify-center">
              <img
                className="w-full object-contain"
                src={d?.images[0]?.url}
                alt={d.title}
              />
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
