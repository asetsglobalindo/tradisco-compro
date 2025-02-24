"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const counters = [
  { number: 530, text: "Jumlah titik BBM Satu Harga di seluruh wilayah Indonesia" },
  { number: 70448, text: "Jumlah Desa/Kelurahan yang memiliki Pangkalan LPG Program OVOO (One Village One Outlet)" },
  { number: 65661, text: "Jumlah UMKM binaan Pertamina Patra Niaga melalui Program Kemitraan" },
];

const CounterData = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="mt-16 relative w-full bg-grey-900 overflow-hidden">
        <img className="absolute w-full h-full object-cover object-center grayscale mix-blend-luminosity z-0" src="https://pertaminapatraniaga.com/file/files/2024/08/at-a-glance.webp" alt="achievement" title="achievement" draggable="false" decoding="async" loading="lazy"></img>
        <div className="absolute w-full h-full bg-[#040A28D1] z-[1]"></div>
        <div className="relative container py-16 xl:py-24 mx-auto flex flex-col gap-16 z-[3]">
            <div ref={ref} className="w-full grid grid-cols-1 md:grid-cols-3 gap-9 xl:gap-16">
            {counters.map((counter, index) => (
                <div key={index} className="border-b-2 border-green-light flex flex-col gap-2 py-3">
                    <div className="">
                        <span className="font-normal text-4xl md:text-5xl text-white">{inView ? <CountUp start={0} end={counter.number} duration={2.5} /> : counter.number}</span>
                    </div>
                    <section className="container flex flex-col gap-4 xl:gap-9 rounded-2xl xl:rounded-2xl px-0 sm:px-0 lg:px-0 pb-4 bg-transparent">
                        <div className="w-full flex gap-6 items-start text-left mx-0">
                            <div className="paragraph-base-color basis-full xl:basis-1/1 xl:w-1/1 xl:mx-0 2xl:text-base text-sm xl:text-base text-white font-normal">
                            {counter.text}
                            </div>
                        </div>
                    </section>
                </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default CounterData;