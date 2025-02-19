import BannerSingle from "@/components/BannerSingle";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import {cn} from "@/lib/utils";
import {ContentType} from "@/types/indes";
import {CircleArrowDown} from "lucide-react";
import {Metadata} from "next";
// import {cookies} from "next/headers";
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
      type: CONTENT_TYPE.ABOUT_PROFILE,
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
  // const lang = (await cookies()).get("lang")?.value || "id";

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

      {/* vision */}
      <section className="container lg:mt-16 mt-8">
        <section className="">
          <section className="flex flex-col md:flex-row items-center bg-[#005CAB] text-white rounded-2xl overflow-hidden">
            <div className="md:w-1/2 py-8 md:py-0 max-w-[900px] mx-auto">
              <h3 className="title-3 text-center">{data.small_text2}</h3>
              <p className="text-center mt-4 px-8">{data.bottom_button_name}</p>
            </div>
            <div className="md:w-1/2">
              {data?.images?.length && (
                <img className="w-full" src={data?.images[0]?.images[0]?.url} alt={data?.small_text2} />
              )}
            </div>
          </section>
        </section>
      </section>

      <section className="container lg:mt-16 mt-8">
        <section className="mx-auto">
          <section
            className="text-white  py-8 px-8 lg:px-14 bg-cover bg-no-repeat rounded-3xl overflow-hidden"
            style={{backgroundImage: `url(${data?.images2[0]?.images[0]?.url})`}}
          >
            <h1 className="title-3 text-center">{data.sub_title1}</h1>

            <section className="grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-8 mt-4">
              {data.body2.map((d, index) => (
                <div key={d._id} className="relative flex items-center">
                  <div className="absolute -left-5 bg-green-light rounded-lg flex items-center justify-center h-10 w-10">
                    {index + 1}
                  </div>
                  <div className="bg-white text-black pl-8 py-4 pr-4 h-full rounded-2xl flex items-center">
                    <div dangerouslySetInnerHTML={{__html: d.text}}></div>
                  </div>
                </div>
              ))}
            </section>
          </section>
        </section>
      </section>

      {/* motto */}
      <section className="container lg:mt-16 mt-8 border-b pb-16">
        <p className="text-lg text-[#005CAB] font-bold text-center">{data.sub_title2}</p>
        <h1 className="text-3xl text-center font-bold font-Kalam mt-4">{data.sub_title3}</h1>
      </section>
      {/* timeline */}
      <section className="container lg:mt-16 mt-8">
        <h1 className="title-3">{data.bottom_text}</h1>

        <section className="lg:mt-16 mt-8 flex flex-col gap-8 max-w-[900px] mx-auto">
          {data.body
            .filter((d) => d.type === 1)
            .map((d, index) => (
              <section key={d._id} className="flex">
                <section className="lg:grid w-fit grid-cols-2 lg:min-w-40">
                  <div className="hidden lg:block">
                    <p className="title-3 text-[#005CAB]">{d.button_name}</p>
                  </div>
                  <div className="lg:mx-8 h-full flex justify-center flex-col items-center">
                    <div className="bg-green-light p-1 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>

                    <div
                      className={cn(
                        {
                          "opacity-0": index === data.body.filter((d) => d.type === 1).length - 1,
                        },
                        "h-full w-[2px] mx-auto bg-[#D9D9D9]"
                      )}
                    ></div>
                  </div>
                </section>
                <div className="ml-4 lg:ml-0">
                  <p className="title-3 lg:hidden text-[#005CAB]">{d.button_name}</p>
                  <h1 className="title-4 text-[#005CAB] font-bold ">{d.title}</h1>
                  <div className="mt-4 flex-col md:flex-row flex gap-8">
                    <div className="" dangerouslySetInnerHTML={{__html: d.text}}></div>
                    <img className="max-w-[250px] object-contain" src={d?.images[0]?.images[0]?.url} alt={d?.title} />
                  </div>
                </div>
              </section>
            ))}
        </section>
      </section>

      <section className="container lg:mt-16 mt-8">
        <h1 className="title-3">{data.bottom_text2}</h1>
        <img className=" mt-4" src={data.thumbnail_images2[0]?.images[0]?.url} alt={data.bottom_text2} />
      </section>
      <section className="bg-[#F2F2F2] lg:mt-16 mt-8">
        <section className="container py-16">
          <div dangerouslySetInnerHTML={{__html: data.bottom_description2}}></div>
          <Carousel className="mt-8">
            <CarouselContent>
              {data.body
                .filter((d) => d.type === 4)
                .map((d) => (
                  <CarouselItem key={d._id} className="md:basis-1/3">
                    <section key={d._id}>
                      <section className="relative group rounded-2xl news-card group  overflow-hidden group  transition-all">
                        <img
                          className="brightness-[40%] aspect-square object-cover"
                          src={d.images?.[0]?.images?.[0]?.url}
                          alt={d.images?.[0]?.title}
                        />

                        <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-all left-0 w-full h-full bg-green-light"></div>
                        <section className="absolute z-20 text-white px-8 py-8 transition-all flex left-0 bottom-0 flex-col">
                          <h2 className="mt-2 text-lg font-semibold text-green-light group-hover:text-white">
                            {d.title}
                          </h2>
                          <a target="_blank" href={d.button_route}>
                            <Button
                              size="default"
                              variant="outline"
                              className="w-fit mt-2 rounded-none text-xs shadow-sm border-white group-hover:border-white group-hover:border box-border"
                            >
                              <span>{d.button_name} </span>
                            </Button>
                          </a>
                        </section>
                      </section>
                    </section>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </section>

      <section className="container lg:mt-16 mt-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="lg:w-[480px]">
          <h1 className="title-3">{data.small_text}</h1>
        </div>
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {data.body
              .filter((d) => d.type === 2)
              .map((d, index) => (
                <AccordionItem key={d._id} value={"item-" + index}>
                  <AccordionTrigger className="text-green-light text-left hover:no-underline">
                    <div className="flex items-center  leading-none">
                      {d.title} <span className="px-1">|</span>{" "}
                      <a
                        className="flex items-center leading-none hover:underline"
                        href={d.button_route}
                        target="_blank"
                      >
                        <CircleArrowDown className="mr-1" size={18} /> {d.button_name}
                      </a>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="" dangerouslySetInnerHTML={{__html: d.text}}></div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </section>
    </section>
  );
};

export default page;

