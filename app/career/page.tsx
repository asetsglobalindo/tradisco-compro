import BannerSingle from "@/components/BannerSingle";
import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import {ArrowRight} from "lucide-react";
import {Metadata} from "next";
import Link from "next/link";
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
      type: "career_page",
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

      <section className="container">
        <h1 className="title-3 text-green-light my-16">{data.title}</h1>
      </section>
      <section className="bg-[#F2F2F2]">
        <section className="container py-16 flex flex-col gap-16">
          {data.body
            .filter((d) => d.type === 1)
            .map((d) => (
              <section key={d._id}>
                <h2 className="title-4 font-bold text-[#005CAB]">{d.title}</h2>
                <div className="mt-4" dangerouslySetInnerHTML={{__html: d.text}}></div>

                <Carousel className="mt-8">
                  <CarouselContent>
                    {d.images?.map((img, index) => (
                      <CarouselItem key={index} className="w-full md:basis-1/3">
                        <section className="relative group rounded-2xl news-card group  overflow-hidden group  transition-all">
                          <img className="blur-[2px] aspect-square object-cover" src={img.images[0].url} alt="" />

                          <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-all left-0 w-full h-full bg-green-light"></div>
                          {/* content */}
                          <section className="absolute z-20 text-white px-8 py-8 transition-all flex left-0 bottom-0 flex-col">
                            <h1 className="mt-2 text-lg font-semibold text-green-light group-hover:text-white">
                              {img.title}
                            </h1>
                            <a target="_blank" href={img.button_route}>
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
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </section>
            ))}
        </section>
      </section>

      <section className="mt-16 container">
        <h1 className="title-3 text-green-light text-center">{data.small_text}</h1>
        <section className="container py-16 flex flex-col gap-16">
          <Carousel className="w-full">
            <CarouselContent className="w-full">
              {data.body
                .filter((d) => d.type === 2)
                .map((d) => (
                  <CarouselItem key={d._id}>
                    <section key={d._id} className="flex relative items-center w-full">
                      <img className="absolute w-[300px]" src={d?.images[0]?.images[0]?.url} alt="" />
                      <div className="bg-[#005CAB] text-white max-w-[85%] ml-auto h-[500px] flex flex-col justify-center pl-[15%] pr-16 rounded-3xl">
                        <div className="text-2xl" dangerouslySetInnerHTML={{__html: d.text}}></div>
                        <h1 className="title-4 mt-8">{d.title}</h1>
                        <p>{d.button_name}</p>
                      </div>
                    </section>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </section>

      <section className="mt-16 container">
        <h1 className="text-center title-3 text-green-light">{data.small_text2}</h1>
        <section className="flex mt-16 items-center gap-16">
          <div className="w-1/2">
            <div className="text-xl" dangerouslySetInnerHTML={{__html: data.description}}></div>
            <Link href={data.bottom_button_route}>
              <Button
                rounded
                size="lg"
                className="w-fit mt-8 shadow-sm group-hover:border-white group-hover:border box-border"
              >
                <span>{data.bottom_button_name}</span>
                <ArrowRight color="white" />
              </Button>
            </Link>
          </div>
          <img className="w-1/2" src={data.images[0].images[0].url} alt="" />
        </section>
      </section>
    </section>
  );
};

export default page;

