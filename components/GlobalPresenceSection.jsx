"use client";

import React from "react";
import dynamic from "next/dynamic";

// Import the map component with dynamic loading and disabled SSR
const GlobalPresenceMap = dynamic(() => import("./GlobalPresenceMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div>Loading Map...</div>
    </div>
  ),
});

const GlobalPresenceSection = ({ data }) => {
  return (
    <div className="container-fluid py-5" id="global">
      <div className="container py-5">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h5 className="fw-bold text-primary text-uppercase">
            Global Presence
          </h5>
          <h1 className="mb-2">Explore Tradisco&apos;s Global Presence</h1>
          <p>(Indonesia, Netherlands, Greece, Australia, Singapore)</p>
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <i className="fa fa-globe text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Interactive World Map</h4>
              <p className="text-gray-700">
                With over 30 years of expertise, Tradisco has evolved into a
                global leader in private investment, technology, and consulting.
                Our footprint spans continents, as we collaborate with
                world-class partners and deliver innovative solutions to
                enterprises worldwide.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <i className="fa fa-lightbulb text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">
                National Talent, Global Vision
              </h4>
              <p className="text-gray-700">
                Share stories and profiles of key project experts within the
                Tradisco group who have made a global impact.
              </p>
            </div>
          </div>

          {/* Middle Column - Map */}
          <div className="h-full min-h-[400px]">
            <GlobalPresenceMap />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <i className="fa fa-users text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Global Expertise</h4>
              <p className="text-gray-700">
                Tradisco&apos;s influence is powered by a team of top experts in
                engineering, finance, consulting, and creative innovation. Our
                specialists bring a wealth of knowledge and experience,
                particularly from Asia and beyond, ensuring that Tradisco
                delivers groundbreaking solutions tailored to the needs of
                diverse markets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <i className="fa fa-lightbulb text-white text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Commitment to Growth</h4>
              <p className="text-gray-700">
                Each partnership and service reflects our commitment to
                fostering global economic growth through technological
                excellence and strategic insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPresenceSection;
