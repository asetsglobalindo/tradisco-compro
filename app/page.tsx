import HomeBanner from "@/components/HomeBanner";
import HomeBussiness from "@/components/HomeBussiness";
import HomeGrowth from "@/components/HomeGrowth";
import HomeLocator from "@/components/HomeLocator";
import ApiService from "@/lib/ApiService";
import {HomeType} from "@/types/indes";
import {Metadata} from "next";
import moment from "moment";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {cookies} from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const result: HomeType = await getHomeContent();

  return {
    title: result.meta_title,
    description: result.meta_description,
    openGraph: {
      title: result.meta_title,
      description: result.meta_description,
    },
  };
}

const getHomeContent = async () => {
  try {
    const response = await ApiService.get("/home/content");
    if (response.data.status !== 200) {
      throw new Error(response.data.message || response.data.err);
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const content: HomeType = await getHomeContent();
  const lang = (await cookies()).get("lang")?.value || "id";

  return (
    <section>
      <HomeBanner data={content} />
      {/* our bussiness */}
      <HomeBussiness data={content} />

      <HomeLocator data={content} />

      {/* growth revenue */}
      <HomeGrowth data={content} />

      <section className="relative mt-16 lg:mt-32 container">
        <h1 className="title-3 text-center">{content.section4a.title}</h1>
        <div className="mt-8" dangerouslySetInnerHTML={{__html: content.section4a.description}}></div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
          {content.section4a.content.map((c) => (
            <div className="rounded-2xl relative overflow-hidden" key={c._id}>
              <img className="w-full" src={c?.thumbnail_images[0]?.images[0]?.url} alt="" />
              <section className="absolute bottom-0 z-20 left-0 p-4 xl:p-8 transition-all flex flex-col">
                <h1 className="mt-2 text-lg text-green-light font-semibold lg:max-w-[70%] ">{c.title}</h1>
                <div className="text-white" dangerouslySetInnerHTML={{__html: c.description}}></div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <a className="w-full" target="_blank" href={c.bottom_button_route}>
                    <Button className="w-full">{c.bottom_button_name}</Button>
                  </a>
                  <a className="w-full" target="_blank" href={c.sub_title2}>
                    <Button variant={"outline"} className="w-full text-white border-white">
                      {c.sub_title1}
                    </Button>
                  </a>
                </div>
              </section>
            </div>
          ))}
        </section>
      </section>

      {/* News */}
      <section className="relative mt-16 lg:mt-32">
        {/* heading */}
        <section className="container flex justify-between items-center">
          <h1 className="title-3">{content.section5.title}</h1>

          <Link href={content.section5.button_route}>
            <Button variant={"outline"} rounded size={"lg"}>
              <span>{content.section5.button_name}</span>
              <ArrowRight />
            </Button>
          </Link>
        </section>

        {/* news */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mt-8">
          {content.section5.content.map((data, index) => (
            <section
              key={index}
              className="relative rounded-2xl news-card overflow-hidden group flex items-end justify-end"
            >
              <img className="blur-[2px]" src="/temp/img-gasoline.png" alt="" />

              {/* content */}
              <section className="absolute z-20  text-white px-8 py-16">
                {/* category */}
                <span className="text-green-lighter">{data.category_id.name}</span>

                {/* title */}
                <h1 className="title-4 mt-4">{data.title}</h1>
                <p className="mt-4 line-clamp-3">{data.small_text}</p>
                <span className="text-xs mt-8 inline-block">{moment(data.created_at).format("DD/MMMM/YYYY")}</span>

                <div className="mt-8">
                  <Link href={"/news/" + data.slug}>
                    <Button
                      variant="outline"
                      className="group-hover:border-white hover:border-white"
                      rounded
                      size={"lg"}
                    >
                      {lang === "en" ? "Read More" : "Selengkapnya"}
                    </Button>
                  </Link>
                </div>
              </section>

              {/* background shade */}
              <div className="absolute top-0 left-0 w-full h-full news-card group-hover:bg-none  group-hover:bg-green-light transition-all duration-500"></div>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}

