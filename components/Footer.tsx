"use client";
import {cn} from "@/lib/utils";
// import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

const Footer = () => {
  const path = usePathname();
  const noMarginPath = ["/about/our-workers"];

  return (
    <footer
      className={cn(
        {
          "mt-48": !noMarginPath.includes(path),
        },
        "bg-[#171717] text-white "
      )}
    >
      <section className="container pt-16">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row md:gap-16">
            <div className="mb-6 md:mb-0 max-w-[400px]">
              <a href="#" className="flex items-center mb-6 ">
                <img src="/logo/logo-white-footer.png" className="max-w-[200px]" alt="FlowBite Logo" />
              </a>
              <p>
                PT Pertamina Retail is a subsidiary of PT Pertamina (Persero) that operates in the retail sector,
                particularly in the distribution of fuel at gas stations and the management, development, and marketing
                of both fuel and non-fuel products in line with its related business activities.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-8">
              {/* <div className="min-w-fit max-w-[300px] lg:mt-8">
                <h2 className="mb-4 lg:mb-6 font-semibold text-base tracking-wide">Career</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/career" className="hover:underline">
                      Career
                    </Link>
                  </li>

                  <li>
                    <Link href="/about/hsse" className="hover:underline">
                      HSSE
                    </Link>
                  </li>
                  <li>
                    <Link href="/investor-relations/laporan-tahunan" className="hover:underline">
                      Annual Report
                    </Link>
                  </li>
                  <li>
                    <Link href="/partnership" className="hover:underline">
                      Partnership
                    </Link>
                  </li>
                </ul>
              </div> */}
              <div className="w-full lg:mt-8">
                <h2 className="mb-4 lg:mb-6 font-semibold">Contact Us</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline flex items-start space-x-1">
                      <img src="/icons/location.svg" alt="" />
                      <span>
                        {" "}
                        Gedung Grha Pertamina Lantai 10-11 Jalan Medan Merdeka Timur No.11-13, Jakarta Pusat - Indonesia
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href="#" className="hover:underline flex items-start space-x-1">
                      <img src="/icons/call.svg" alt="" />
                      <span>+62-21-3926772 - 3926775</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="max-w-[300px] flex flex-col items-center justify-center space-y-8 lg:mt-8">
                <img className="max-w-[77px]" src="/icons/call-center.png" alt="" />
                <img className="max-w-[230px]" src="/icons/pertamina-clean.png" alt="" />
                <img className="max-w-[230px]" src="/logo/bazma.png" alt="" />
              </div>
            </div>
          </div>
          <div className="min-w-fit max-w-[300px] mt-8">
            <h2 className="mb-4 lg:mb-6 font-semibold text-base tracking-wide">Follow Us :</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:underline">
                  <img className="w-10" src="/icons/youtube.png" alt="" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <img className="w-10" src="/icons/instagram.png" alt="" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <img className="w-10" src="/icons/tiktok.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="sm:flex sm:items-center sm:justify-between mt-24 font-light text-xs text-[#BFBFBF]">
            <span className="">© 2024 Pertamina Retail. All rights reserved.</span>
            <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
              <a href="#">Privacy Policy</a>
              <a href="#">Term Of Use</a>
              <a href="#">Sitemap</a>
            </div>
          </div> */}
        </div>
      </section>
    </footer>
  );
};

export default Footer;

