"use client";
import React from "react";
import {AppProgressBar as ProgressBarApp} from "next-nprogress-bar";

const ProgressBar = () => {
  return <ProgressBarApp height="2px" color="#63AE1D" options={{showSpinner: false}} shallowRouting />;
};

export default ProgressBar;

