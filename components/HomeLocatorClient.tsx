"use client";
import React from "react";
import dynamic from "next/dynamic";
import {HomeType} from "@/types/indes";
const HomeLocator = dynamic(() => import("@/components/HomeLocator"), {ssr: false});

const HomeLocatorClient: React.FC<{data: HomeType}> = ({data}) => {
  return <HomeLocator data={data} />;
};

export default HomeLocatorClient;
