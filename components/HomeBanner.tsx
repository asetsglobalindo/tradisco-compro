"use client";
import uiStore from "@/app/store/uiStore";
import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";

const HomeBanner = () => {
  const ui = uiStore((state) => state);
  const {ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    ui.setHeaderColor(inView ? "white" : "black");
  }, [inView]); // eslint-disable-line

  return (
    <section ref={ref}>
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-full bg-center flex items-center"
        style={{
          background: "url(/temp/banner-home.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="container text-white">
          <h1 className="title-1 leading-tight">
            Bisnis Retail <br /> Bahan Bakar oleh <br /> <span className="text-green-light">PT PERTAMINA RETAIL</span>
          </h1>

          <p className="text-lg font-normal mt-4">Explore our various quality energy services</p>
          <ul className="text-lg mt-4 font-normal list-disc pl-4 space-y-2">
            <li>COCO, CODO, and KSO gas stations</li>
            <li>SPBG (Gas Fuel Filling Station)</li>
            <li>Pertashop for rural communities</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;

