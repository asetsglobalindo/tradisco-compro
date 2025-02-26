"use client";
import uiStore from "@/app/store/uiStore";
import { ImageType } from "@/types/indes";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import { cn } from "@/lib/utils";

const BannerSingle: React.FC<{ data: ImageType[], isStatic?: boolean }> = ({ data, isStatic = false }) => {
  const ui = uiStore((state) => state);
  const { ref, inView } = useInView({ threshold: 0 });
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    ui.setHeaderColor(inView ? "white" : "black");
  }, [inView]);

  if (!data?.length) {
    return null;
  }
  const titleMapping: Record<string, string> = {
    about: "Profile",
    csr: "Tanggung Jawab Sosial",
    "our-values": "Tata Nilai",
    awards: "Penghargaan",
    managements: "Tata Kelola",
    'our-programs': 'Program Kami'
  };

  const rawTitle = pathname?.split("/").filter(Boolean).pop() || "Home";
  const normalizedTitle = rawTitle.toLowerCase();

  const mappedTitle = titleMapping[normalizedTitle] || rawTitle;

  const translatedTitle = t(mappedTitle.replace(/-/g, " "));

  return (
    <div ref={ref} className="relative w-full">
      {data.slice(0, 1).map((img) => (
        <picture key={img._id} className="relative w-full">
          <source media="(min-width:768px)" srcSet={img?.images[0]?.url} />
          <img
            className="w-full brightness-[70%] object-cover max-h-[537px]"
            src={img?.images_mobile[0]?.url}
            alt={translatedTitle}
          />
          <div className={cn("absolute inset-0 bg-gradient-to-r", {
            "from-[#32599C] to-transparent": !isStatic,
            "from-[#000]/[.3] to-transparent": isStatic
          })} />
          {!isStatic && 
            <h1
              className="
                absolute left-[10px] bottom-[10px] 
                sm:left-[20px] sm:bottom-[10px] 
                md:left-[50px] md:bottom-[50px] 
                lg:left-[100px] lg:bottom-[120px] 
                text-white 
                text-[30px]      
                sm:text-[30px]   
                md:text-[42px]   
                lg:text-[42px]  
                font-bold capitalize"
            >
              {translatedTitle}
            </h1>
          }
        </picture>
      ))}
    </div>
  );
};

export default BannerSingle;
