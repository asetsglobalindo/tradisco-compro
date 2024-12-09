import OutletLocatorMap from "@/components/OutletLocator/OutletLocatorMap";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pertamina Retail - Outlet Locator",
};

const page = () => {
  return (
    <React.Fragment>
      <div className="w-full h-20"></div>
      <section className="container mt-8">
        <h1 className="title-2 text-center">Find Your Nearest Pertamina Store</h1>
        <section className="mt-8">
          <OutletLocatorMap />
        </section>
      </section>
    </React.Fragment>
  );
};

export default page;

