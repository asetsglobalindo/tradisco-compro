import OutletLocatorMap from "@/components/OutletLocator/OutletLocatorMap";
import React from "react";

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

