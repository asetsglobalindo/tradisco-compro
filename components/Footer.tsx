"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import JSCookie from "js-cookie";
import { useQuery } from "react-query";
import ApiService from "@/lib/ApiService";
import { FooterType } from "@/types/indes";
import { motion } from "framer-motion";
import uiStore from "../app/store/uiStore";

const Footer = () => {
  const path = usePathname();
  const noMarginPath = ["/about/our-workers"];
  const lang = JSCookie.get("lang") || "id";
  const ui = uiStore((state) => state);

  const { data: footer } = useQuery({
    queryKey: ["header", "footer", lang],
    queryFn: async () => await getHeader(),
  });

  const getHeader = async () => {
    try {
      const response = await ApiService.get("/header/header-footer");

      if (response.data.status !== 200) {
        throw new Error(response.data.message || response.data.err);
      }

      return response.data.data?.footer as FooterType;
    } catch (error) {
      console.log(error);
    }
  };

  const isTransparent = ui.headerColor === "white";

  return (
    <footer
      className={cn(
        {
          "mt-48": !noMarginPath.includes(path),
        },
        "bg-white text-black border-t border-gray-200 relative"
      )}
    >
      <section className="container py-16">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-start gap-8">
            {/* Column 1 - Logo and Description */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <img className="h-6" src="/logo/logo.png" alt="Tradisco Logo" />
              </Link>
              <p className="text-gray-600 mb-8">
                Tradisco is a prominent holding company, tech provider, and
                consulting firm with a rich legacy rooted in latest development
                from energy and natural resources. Over three decades, Tradisco
                has evolved to become a leader in tech and investment
                infrastructure, driving innovation across diverse industries.
              </p>
              <div>
                <div className="flex items-center mb-4">
                  <h3 className="font-medium">Follow Us :</h3>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/tradisco.id"
                    target="_blank"
                    className="hover:opacity-80"
                  >
                    <img
                      className="w-4 h-4"
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/instagram.svg"
                      alt="Instagram"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/trading-digital-and-construction"
                    target="_blank"
                    className="hover:opacity-80"
                  >
                    <img
                      className="w-4 h-4"
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg"
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 - Tautan */}
            <div className="flex flex-col">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold">Tautan</h2>
              </div>
              <div className="flex flex-col space-y-4 pl-0">
                <Link
                  href="/karir"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Karir
                </Link>
                <Link
                  href="/hsse"
                  className="text-gray-600 hover:text-blue-600"
                >
                  HSSE
                </Link>
                <Link
                  href="/company-profile"
                  className="text-gray-600 hover:text-blue-600 flex items-center"
                >
                  Company Profile
                  <img
                    src="/icons/download.png"
                    alt="Download"
                    className="w-4 h-4 ml-2"
                  />
                </Link>
              </div>
            </div>

            {/* Column 3 - Contact Us */}
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold">Contact Us</h2>
              </div>
              <div className="flex flex-col space-y-6">
                <div className="flex items-start group">
                  <div className="w-8 h-8 flex items-center justify-center mr-4">
                    <img
                      src="/icons/location2.png"
                      alt="Location"
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="text-gray-600 mt-1">
                    Menara Palma Jl. H. R. Rasuna Said, DKI Jakarta 12950
                  </span>
                </div>
                <div className="flex items-center group">
                  <div className="w-8 h-8 flex items-center justify-center mr-4">
                    <img
                      src="/icons/call2.png"
                      alt="Phone"
                      className="w-4 h-4"
                    />
                  </div>
                  <a
                    href="tel:0895-4046-02222"
                    className="text-gray-600 group-hover:text-blue-600 transition-colors"
                  >
                    0895-4046-02222
                  </a>
                </div>
                <div className="flex items-center group">
                  <div className="w-8 h-8 flex items-center justify-center mr-4 transition-colors">
                    <img
                      src="/icons/mail2.png"
                      alt="Email"
                      className="w-4 h-4"
                    />
                  </div>
                  <a
                    href="mailto:team@tradisco.co.id"
                    className="text-gray-600 group-hover:text-blue-600 transition-colors"
                  >
                    team@tradisco.co.id
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom / Copyright */}
          <div className="pt-12 mt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © 2024 Tradisco Global Inovasi. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="text-gray-500 hover:text-blue-600"
              >
                Term Of Use
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-500 hover:text-blue-600"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Colored line at the bottom of the footer */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-teal-400 to-orange-400"></div>
    </footer>
  );
};

export default Footer;
