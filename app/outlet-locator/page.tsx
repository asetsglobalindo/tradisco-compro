import OutletLocatorMapClient from "@/components/OutletLocator/OutletLocatorMapClient";
import {Metadata} from "next";
import {cookies} from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Pertamina Retail - Outlet Locator",
};

const page = async () => {
  const lang = (await cookies()).get("lang")?.value || "id";

  return (
    <React.Fragment>
      <section className="container mt-16">
        <h1 className="title-3 text-center max-w-[80%] lg:w-full mx-auto">
          {lang === "en" ? "Find Your Nearest Pertamina Store" : "Temukan Pertamina Store Terdekat Anda"}
        </h1>
        <section className="mt-16">
          <OutletLocatorMapClient />
        </section>
      </section>
    </React.Fragment>
  );
};

export default page;

