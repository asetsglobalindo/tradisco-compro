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
    if (response.data.status !== 200) {
      throw new Error(response.data.message || response.data.err);
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function Home() {
  const content = await getHomeContent();

  return <HomeClient content={content} />;
}
