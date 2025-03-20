import HomeBanner from "@/components/HomeBanner";
import GlobalPresenceSection from "@/components/GlobalPresenceSection";
import ScrollSection from "@/components/ScrollSection";
import ApiService from "@/lib/ApiService";
import { HomeType } from "@/types/indes";
import { Metadata } from "next";

// In your page.js files
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Import Swiper styles
import "swiper/css";
import OurPartner from "../components/OurPartner";
import HomeAbout from "@/components/Home/HomeAbout";
import HomeNews from "@/components/Home/HomeNews";

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

  return (
    <>
      <HomeBanner data={content} />
      <ScrollSection
        id="about-us"
        className="container lg:mt-16 mt-8 border-b pb-16"
      >
        <HomeAbout />
      </ScrollSection>
      <ScrollSection
        id="global-presence"
        className="container lg:mt-16 mt-8 border-b pb-16"
      >
        {/* Konten about us */}
        <GlobalPresenceSection data={content} />
      </ScrollSection>
      <ScrollSection
        id="our-partners"
        className="container lg:mt-16 mt-8 border-b pb-16"
      >
        {/* Our Partners - New Section */}
        <OurPartner data={content} />
      </ScrollSection>
      <ScrollSection
        id="news"
        className="container lg:mt-16 mt-8 border-b pb-16"
      >
        <HomeNews content={content} />
      </ScrollSection>
    </>
  );
}
