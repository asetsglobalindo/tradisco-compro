import HomeBanner from "@/components/HomeBanner";
import HomeBussiness from "@/components/HomeBussiness";
import HomeGrowth from "@/components/HomeGrowth";
import ApiService from "@/lib/ApiService";
import { HomeType } from "@/types/indes";
import { Metadata } from "next";
import moment from "moment";

// In your page.js files
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Import Swiper styles
import "swiper/css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import HomeLocatorClient from "@/components/HomeLocatorClient";
import PartnershipCard from "@/components/PartnershipCard";

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

      {/* About Us */}
      <section className="container lg:mt-16 mt-8 border-b pb-16">
        <p className="title-3 text-[#005CAB] font-bold text-center font-Kalam">
          Company History Timeline
        </p>
        <h1 className="text-base text-center mt-4 mb-10">
          Tradisco's journey from its origins to becoming a powerhouse in tech
          and investment infrastructure highlights a steadfast commitment to
          innovation and growth. Guided by a vision of "Strengthening Asia’s
          Economy through Global Expertise," Tradisco has continually adapted to
          meet evolving market demands with cutting-edge solutions.
        </h1>

        <div className="border-l-4 border-gray-300">
          {[
            {
              title: "Early Beginnings (Energy & Natural Resources)",
              description:
                "Tradisco's foundation was built on delivering consulting and mechanical solutions in the energy and natural resources sectors, where it quickly established a reputation for reliability and expertise.",
            },
            {
              title: "Expansion into Tech & Digitalization",
              description:
                "Responding to industry needs, Tradisco transitioned into the tech space, launching system monitoring solutions like Stori and expanding its role as a tech consultant, helping clients digitize operations.",
            },
            {
              title: "Becoming a Holding Company",
              description:
                "Tradisco evolved into a private investment and tech holding company, consolidating its expertise to deliver comprehensive market solutions and fostering innovations across multiple industries.",
            },
            {
              title: "Global Reach",
              description:
                "Today, Tradisco collaborates with partners worldwide, leveraging global insights to deliver impactful results, particularly aimed at bolstering Asia's economic landscape.",
            },
          ].map((item, index) => (
            <div key={index} className="mb-10 ml-6 flex items-start">
              <div className="relative w-4 h-4 flex items-center justify-center">
                <div className="w-4 h-4 bg-green rounded-full absolute"></div>
                <div className="w-2 h-2 bg-white rounded-full z-10"></div>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-blue-600">
                  {item.title}
                </h3>
                <p className="ps-5 text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* our bussiness */}
      <HomeBussiness data={content} />

      {/* home locator */}
      <HomeLocatorClient data={content} />

      {/* growth revenue */}
      <HomeGrowth data={content} />

      <section className="relative mt-8 lg:mt-16 container">
        <h1 className="title-3 text-center">{content?.section4a.title}</h1>
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: content?.section4a.description }}
        ></div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
          {content?.section4a.content?.map((c) => (
            <PartnershipCard data={c} key={c._id} />
          ))}
        </section>
      </section>

      {/* News */}
      <section className="relative mt-8 lg:mt-16">
        {/* heading */}
        <section className="container flex justify-between items-center">
          <h1 className="title-3">{content?.section5.title}</h1>

          <Link href={content?.section5.button_route}>
            <Button variant={"outline"} rounded size={"lg"}>
              <span>{content?.section5.button_name}</span>
              <ArrowRight />
            </Button>
          </Link>
        </section>

        {/* news */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mt-8">
          {content?.section5.content?.map((data, index) => (
            <section
              key={index}
              className="relative rounded-2xl news-card overflow-hidden group flex items-end justify-end"
            >
              <img
                className="blur-[2px] w-full object-cover h-[400px] md:h-[500px]"
                src={data?.thumbnail_images[0]?.images[0]?.url}
                alt={data?.title}
              />

              {/* content */}
              <section className="absolute z-20  text-white px-8 py-16">
                {/* category */}
                <span className="text-green-light group-hover:text-white">
                  {data.category_id.name}
                </span>

                {/* title */}
                <h1 className="title-4 mt-4 line-clamp-3">{data.title}</h1>
                <p className="mt-4 line-clamp-3">{data.small_text}</p>
                <span className="text-xs mt-8 inline-block">
                  {moment(data.created_at).format("DD/MMMM/YYYY")}
                </span>

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
              <div className="absolute top-0 left-0 w-full h-full news-card group-hover:bg-green-light/[.65] transition-all duration-500"></div>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}
