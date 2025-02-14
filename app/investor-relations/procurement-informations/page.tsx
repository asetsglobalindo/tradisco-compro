import BannerSingle from "@/components/BannerSingle";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import {ContentType} from "@/types/indes";
import {X} from "lucide-react";
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
      type: CONTENT_TYPE.PROCUREMENT_INFORMATION,
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

      <section className="container mt-16">
        <h1 className="title-3 text-green-light ">{data.title}</h1>
      </section>
      <div className="container mt-8" dangerouslySetInnerHTML={{__html: data.description}}></div>

      <section className="grid-cols-1 md:grid-cols-3 gap-8 grid  mx-auto mt-8 lg:mt-16  container">
        {data.body.map((d) => (
          <Drawer key={d._id}>
            <DrawerTrigger asChild className="cursor-pointer group rounded-2xl group overflow-hidden">
              <div className="">
                <img
                  src={d.images[0].images[0].url}
                  className="max-w-44 mx-auto group-hover:scale-95 transition-all"
                  alt={d.button_route}
                />
                <DrawerTitle className="mt-4 text-center">{d.title}</DrawerTitle>
              </div>
            </DrawerTrigger>
            <DrawerContent className="border-none rounded-t-3xl px-0 container overflow-hidden">
              <div className="mx-auto w-full ">
                <DrawerHeader className="bg-[#171717] flex items-center py-8 text-white">
                  <section className="container flex justify-between items-center">
                    <section>
                      <h1 className="title-4">{d.button_route}</h1>
                      <p className="mt-2">{d.title}</p>
                    </section>
                    <DrawerClose>
                      <Button variant="outline" rounded className="w-fit px-3 bg-green-light/50 border-transparent">
                        <X color="#63AE1D" />
                      </Button>
                    </DrawerClose>
                  </section>
                </DrawerHeader>
                <section className="flex flex-col-reverse lg:flex-row container items-center gap-8 lg:gap-16 mt-8 xl:mt-16 xl:mb-16">
                  <div
                    className="dont-reset h-full max-h-[50vh] lg:max-h-[40vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{__html: d.text}}
                  ></div>
                </section>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </section>

      <div className="container mt-16" dangerouslySetInnerHTML={{__html: data.small_text}}></div>
    </section>
  );
};

export default page;

