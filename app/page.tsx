// This file remains a server component
import HomeClient from "@/components/Home/HomeClient";
import ApiService from "@/lib/ApiService";
import { HomeType } from "@/types/indes";
import { Metadata } from "next";

// In your page.js files
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Import Swiper styles
import "swiper/css";

export async function generateMetadata() {
  const result = await getHomeContent();

  return {
    title: result?.meta_title || "Tradisco",
    description: result?.meta_description || "",
    openGraph: {
      title: result?.meta_title || "Tradisco",
      description: result?.meta_description || "",
    },
  };
}

const getHomeContent = async () => {
  try {
    const response = await ApiService.get("/home/content");
    
    // Check if response is successful
    if (response.data.status !== 200 && response.data.success !== true) {
      throw new Error(response.data.message || response.data.err || "Failed to fetch home content");
    }

    // Get data from response
    const homeData = response.data.data || response.data;
    
    // Ensure banner is always an array
    if (homeData && !Array.isArray(homeData.banner)) {
      homeData.banner = homeData.banner ? [homeData.banner] : [];
    }

    return homeData;
  } catch (error: any) {
    // Handle specific error types
    if (error.response?.status === 503) {
      console.warn(
        "Home content API is temporarily unavailable (503). " +
        "Using default content. The page will still load normally."
      );
    } else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      console.warn(
        "Home content API request timed out. " +
        "Using default content. The page will still load normally."
      );
    } else {
      console.error("Error fetching home content:", error.message || error);
    }
    
    // Return default structure instead of null to prevent loading state
    // This ensures the page still renders even if API fails
    return {
      meta_title: "Tradisco",
      meta_description: "",
      banner: [],
      section2: { title: "", tab: [] },
      section3: { small_text: "", title: "" },
      section4a: { description: "", title: "", content: [] },
      section4: [],
      section5: { title: "", button_name: "", button_route: "", content: [] },
    } as HomeType;
  }
};

export default async function Home() {
  const content = await getHomeContent();

  return <HomeClient content={content} />;
}
