"use client";
import {cn} from "@/lib/utils";
import Link from "next/link";
// import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import JSCookie from "js-cookie";

const Footer = () => {
  const path = usePathname();
  const noMarginPath = ["/about/our-workers"];
  const lang = JSCookie.get("lang") || "id";

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
          <div className="flex flex-col lg:flex-row md:gap-8">
            <div className="mb-6 md:mb-0 max-w-[400px]">
              <a href="#" className="flex items-center mb-6 ">
                <img src="/logo/logo-white.png" className="max-w-[200px]" alt="FlowBite Logo" />
              </a>
              <p>
                PT Pertamina Retail is a subsidiary of PT Pertamina (Persero) that operates in the retail sector,
                particularly in the distribution of fuel at gas stations and the management, development, and marketing
                of both fuel and non-fuel products in line with its related business activities.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-8">
              <div className="min-w-fit max-w-[300px] lg:mt-8">
                <h2 className="mb-4 lg:mb-6 font-semibold text-base tracking-wide">
                  {lang === "en" ? "Link" : "Tautan"}
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/career" className="hover:underline">
                      {lang === "en" ? "Career" : "Karir"}
                    </Link>
                  </li>

                  <li>
                    <Link href="/about/hsse" className="hover:underline">
                      HSSE
                    </Link>
                  </li>
                  <li>
                    <Link href="/investor-relations/company-report" className="hover:underline">
                      {lang === "en" ? "Company Report" : "Laporan Perusahaan"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/partnership" className="hover:underline">
                      {lang === "en" ? "Partnership" : "Kemitraan"}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:mt-8">
                <h2 className="mb-4 lg:mb-6 font-semibold">Contact Us</h2>
                <ul className="space-y-2">
                  <li>
                    <p className="flex items-start space-x-1">
                      <img src="/icons/location.svg" alt="location" />
                      <span>
                        {" "}
                        Gedung Grha Pertamina Lantai 10-11 Jalan Medan Merdeka Timur No.11-13, Jakarta Pusat - Indonesia
                      </span>
                    </p>
                  </li>

                  <li>
                    <a
                      href="https://api.whatsapp.com/send/?phone=6281312600600&text=saya+tertarik+untuk+informasi+lebih+lanjut+dari+PT+Pertamina+Retail&type=phone_number&app_absent=0"
                      className="hover:underline flex items-start space-x-1"
                    >
                      <img src="/icons/call.svg" alt="call" />
                      <span>+62 813-1260-0600</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div
                suppressHydrationWarning
                className="max-w-[300px] min-w-fit flex flex-col items-center justify-center space-y-8 lg:mt-8"
              >
                <img className="max-w-[77px]" src="/icons/call-center.png" alt="call-center" />
                <a
                  target="_blank"
                  className="rounded-full border-2 border-white/40 py-2 min-w-fit pl-2 pr-3 flex transition-all items-center gap-[6px] hover:border-white"
                  href="https://pertaminaclean.tipoffs.info/"
                >
                  <img src="/icons/pertamina-clean.svg" alt="pertamina-celan" />
                  <div>
                    <p className="text-white font-bold text-xs">Whistle Blowing System</p>
                    <div className="text-white font-normal text-[8px]">https://pertaminaclean.tipoffs.info/</div>
                  </div>
                </a>
                <Link suppressHydrationWarning href="/bazma">
                  <img className="max-w-[230px]" src="/logo/bazma.png" alt="bazma" />
                </Link>
              </div>
            </div>
          </div>
          <div className="min-w-fit max-w-[300px] mt-8">
            <h2 className="mb-4 lg:mb-6 font-semibold text-base tracking-wide">Follow Us :</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.youtube.com/@PertaminaRetailOfficial" target="_blank" className="hover:underline">
                  <img className="w-10" src="/icons/youtube.png" alt="youtube" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/pertamina_retail" target="_blank" className="hover:underline">
                  <img className="w-10" src="/icons/instagram.png" alt="instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@pertaminaretailofficial" target="_blank" className="hover:underline">
                  <img className="w-10" src="/icons/tiktok.png" alt="tiktok" />
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

