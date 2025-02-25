import BannerSingle from "@/components/BannerSingle";
import ApiService from "@/lib/ApiService";
import CONTENT_TYPE from "@/lib/content-type";
import {ContentType} from "@/types/indes";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";
import Link from "next/link";
import RelatedPage from "@/components/RelatedPage";

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
      type: CONTENT_TYPE.CSR,
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
      href: "/csr/our-programs",
      image: data?.banner[0]?.images[0]?.url,
      alt: "Program Kami",
      title: "Program Kami",
    },
    {
      href: "/csr/collaboration-partnership",
      image: data?.body[6]?.images[0]?.images[0]?.url,
      alt: "Kolaborasi & Kemitraan",
      title: "Kolaborasi & Kemitraan",
    },
  ];
  return (
    <section>
      <section className="relative">
        <BannerSingle data={data.banner} />
      </section>

      {/* Section Direksi  */}
      <section className="container mt-16 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
          <img
            src="/temp/zibali.jpg" 
            alt="Zibali Hisbul Masih"
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="text-xl font-semibold mt-4">Zibali Hisbul Masih</h2>
          <p className="text-gray-600">Direktur Utama PT Pertamina Retail</p>
        </div>

        <div className="w-full md:w-2/3 relative">
          <div
            className="relative w-full h-60 md:h-80 bg-cover bg-center rounded-2xl shadow-lg bg-blue-500 verflow-hidden"
          >
            <div className="absolute rounded-2xl inset-0 bg-black bg-opacity-50 flex items-center p-6">
              <p className="text-white text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                gravida lorem id metus malesuada, at tincidunt justo vehicula.
                Phasellus ultricies est id velit feugiat, at hendrerit magna
                elementum. Integer tincidunt, erat vel malesuada dictum, erat
                turpis pretium tortor, id pharetra enim felis in odio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* top */}
      <section className="container mt-16">
        <section className=" mx-auto">
          <section
            className="text-white  py-16 px-4 lg:px-14 bg-cover bg-center bg-[length:200%] bg-no-repeat rounded-2xl overflow-hidden flex flex-col items-center"
            style={{backgroundImage: `url(${data?.thumbnail_images[0]?.images[0]?.url})`}}
          >
            <h1 className="title-3 text-center relative inline-block pb-2 border-b-4 border-green-light">
              <span className="text-green-light">{data.sub_title1.split(" ")[0]}</span>{" "}
              <span className="text-white">{data.sub_title1.split(" ").slice(1).join(" ")}</span>
            </h1>
            <div className="mt-4" dangerouslySetInnerHTML={{__html: data.bottom_button_name}}></div>
          </section>
        </section>
      </section>

      <section className="container lg:mt-16 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.body
          .filter((d) => d.type === 3)
          .map((d) => (
            <div className="relative rounded-2xl overflow-hidden group" key={d._id}>
              <img
                className="w-full h-full object-cover aspect-square transition-transform duration-500 ease-in-out group-hover:scale-110"
                src={d?.images[0]?.images[0]?.url}
                alt={d?.title}
              />
              <div className="absolute inset-0 transition-opacity duration-500"></div>

              <section className="absolute bg-black bg-opacity-50  bottom-0 z-20 left-0 p-4 transition-all flex flex-col items-center w-full justify-center gap-2">
                <h2 className="mt-2 text-xl text-green-light font-semibold lg:max-w-[70%] ">{d.title}</h2>
                <div className="text-white" dangerouslySetInnerHTML={{__html: d.text}}></div>
              </section>
            </div>
          ))}
      </section>

      <section className="container lg:mt-16 mt-8">
        <section className="dont-reset" dangerouslySetInnerHTML={{__html: data.sub_title2}}></section>
        <img className="w-full lg:mt-16 mt-8" src={data?.images[0]?.images[0]?.url} alt="" />
      </section>
      <section className="container">
        <section className=" px-0 rounded-2xl flex-col md:flex-row overflow-hidden md:mt-16 mt-8 bg-[#005CAB] flex items-center">
          <section className="md:w-5/12 overflow-hidden">
            <img
              className="h-full md:min-h-[300px] lg:min-h-[400px]  object-cover scale-105"
              src={data?.images2[0]?.images[0]?.url}
              alt=""
            />
          </section>
          <section
            className="px-4 lg:px-12 py-6 md:w-7/12"
            dangerouslySetInnerHTML={{__html: data.sub_title3}}
          ></section>
        </section>
      </section>
      <section className="container lg:mt-16 mt-8">
        <section className="" dangerouslySetInnerHTML={{__html: data.small_text}}></section>
      </section>

      <section className="container mt-8">
        <section className="mx-auto">
          <section
            className="text-white min-h-[400px] flex items-center py-8 px-8 lg:px-14 bg-cover bg-no-repeat rounded-3xl overflow-hidden"
            style={{backgroundImage: `url(${data?.thumbnail_images2[0]?.images[0]?.url})`}}
          >
            {/* <h1 className="title-3 text-center">{data.sub_title1}</h1> */}

            <section className="grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-8">
              {data.body
                .filter((d) => d.type === 2)
                .map((d, index) => (
                  <div key={d._id} className="relative flex items-center xl:aspect-[4/1]">
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

      {/* Related Page */}
      <RelatedPage links={linksData} />
      
    </section>
  );
};

export default page;

