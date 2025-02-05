"use client";
import uiStore from "@/app/store/uiStore";
import {ImageType} from "@/types/indes";
import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";

const BannerSingle: React.FC<{data: ImageType[]}> = ({data}) => {
  const ui = uiStore((state) => state);
  const {ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    ui.setHeaderColor(inView ? "white" : "black");
  }, [inView]); // eslint-disable-line

  if (!data?.length) {
    return null;
  }

  return (
    <div ref={ref}>
      {data.slice(0, 1).map((img) => (
        <picture key={img._id}>
          <source media="(min-width:650px)" srcSet={img?.images[0]?.url} />
          <img className="w-full brightness-[70%]" src={img?.images_mobile[0]?.url} alt={img?.images[0]?.url} />
        </picture>
      ))}
    </div>
  );
};

export default BannerSingle;

