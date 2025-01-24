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
      type: CONTENT_TYPE.MITRA_PAGE,
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
const getDataRelated = async () => {
  try {
    const params = {
      limit: 99,
      page: 1,
      active_status: true,
      type: CONTENT_TYPE.MITRA,
      show_single_language: "yes",
    };

    const response = await ApiService.get("/content", params);

    if (response.data.status !== 200) {
      throw new Error(response.data.message || response.data.err);
    }

    if (!response.data.data.length) {
      throw new Error("Data not found");
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const page = async () => {
  const data: ContentType = await getData();
  const related: ContentType[] | [] = await getDataRelated();

  return (
    <section>
      <section className="relative">
        <BannerSingle data={data.banner} />
      </section>

      {/* top */}
      <section className="container lg:mt-16 mt-8">
        <section className=" max-w-[900px] mx-auto">
          <h1 className="title-3 text-center text-green-light">{data.title}</h1>
          <div className="mt-8" dangerouslySetInnerHTML={{__html: data.description}}></div>
        </section>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 container mt-8 gap-4">
        {related.map((c) => (
          <div className="rounded-2xl relative overflow-hidden" key={c._id}>
            <img src={c?.thumbnail_images[0]?.images[0]?.url} alt="" />
            <section className="absolute bottom-0 w-full z-20 left-0  px-8 py-8 transition-all flex flex-col">
              <h1 className="mt-2 text-lg text-green-light font-semibold lg:max-w-[70%] ">{c.title}</h1>
              <div className="text-white" dangerouslySetInnerHTML={{__html: c.description}}></div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <a className="w-full" target="_blank" href={c.bottom_button_route}>
                  <Button className="w-full">{c.bottom_button_name}</Button>
                </a>

                <Drawer>
                  <DrawerTrigger asChild className="cursor-pointer group overflow-hidden">
                    <Button variant={"outline"} className="w-full text-white border-white">
                      {c.sub_title1}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="border-none rounded-t-3xl px-0 container overflow-hidden">
                    <div className="mx-auto w-full ">
                      <DrawerHeader className="bg-[#171717] flex items-center py-8 text-white">
                        <section className="container flex justify-between items-center">
                          <section>
                            <DrawerTitle className="mt-4">
                              <h1>{c.title}</h1>
                            </DrawerTitle>
                          </section>
                          <DrawerClose>
                            <Button
                              variant="outline"
                              rounded
                              className="w-fit px-3 bg-green-light/50 border-transparent"
                            >
                              <X color="#63AE1D" />
                            </Button>
                          </DrawerClose>
                        </section>
                      </DrawerHeader>
                      <section className="flex flex-col-reverse lg:flex-row container items-center gap-8 lg:gap-16 mt-8 lg:mt-16 lg:mb-48">
                        <div className="mx-6 dont-reset" dangerouslySetInnerHTML={{__html: c.sub_title2}}></div>
                      </section>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </section>
          </div>
        ))}
      </section>
    </section>
  );
};

export default page;

