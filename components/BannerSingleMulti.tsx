import { cookies } from "next/headers";
import BannerSingleClient from "./BannerSingle";
import { ImageType } from "@/types/indes";

const BannerSingleMulti: React.FC<{ data: ImageType[] }> = async ({ data }) => {
  const cookieStore = cookies();
  const lang = (await cookieStore).get("lang")?.value || "id"; 

  return <BannerSingleClient data={data} lang={lang} />;
};

export default BannerSingleMulti;