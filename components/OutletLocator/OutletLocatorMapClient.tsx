"use client";
import React from "react";
import dynamic from "next/dynamic";
const OutletLocatorMap = dynamic(() => import("./OutletLocatorMap"), {ssr: false});

const OutletLocatorMapClient = () => {
  return <OutletLocatorMap />;
};

export default OutletLocatorMapClient;

