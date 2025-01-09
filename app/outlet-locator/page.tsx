import OutletLocatorMap from "@/components/OutletLocator/OutletLocatorMap";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pertamina Retail - Outlet Locator",
};

const page = () => {
  return (
    <React.Fragment>
      <section className="container mt-16">
        <h1 className="title-2 text-center max-w-[80%] lg:w-full mx-auto">Find Your Nearest Pertamina Store</h1>
        <section className="mt-16">
          <OutletLocatorMap />
        </section>
      </section>
    </React.Fragment>
  );
};

export default page;

