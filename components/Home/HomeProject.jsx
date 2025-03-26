import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

const HomeProject = () => {
  const [activeTab, setActiveTab] = useState("trading");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Define tab structure
  const tabs = [
    { label: "Trading", value: "trading" },
    { label: "Digital", value: "digital" },
    { label: "Construction", value: "construction" },
  ];

  // Image paths for each category
  const imagePaths = {
    trading: ["/images/trading1.webp", "/images/trading2.jpeg", "/images/trading3.webp"],
    digital: ["/images/digital1.png", "/images/digital2.png", "/images/digital3.png"],
    construction: [
      "/images/construction1.jpeg",
      "/images/construction2.jpeg",
      // "/images/construction3",
    ],
  };

  // Description text for each category
  const descriptionText = {
    trading: [
      "Trading program for commodities export market",
      "International trade and export facilitation",
      "Supply chain optimization for global trade",
    ],
    digital: [
      "Digital transformation solutions for enterprise",
      "Custom software development and integration",
      "Cloud-based business applications",
    ],
    construction: [
      "Infrastructure development projects",
      "Commercial building construction",
      // "Sustainable construction initiatives",
    ],
  };

  // Generate data for each tab
  const generateData = (tabValue) => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: `${tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Project ${
        i + 1
      }`,
      description:
        descriptionText[tabValue][i % descriptionText[tabValue].length],
      image: `${imagePaths[tabValue][i % imagePaths[tabValue].length]}`,
    }));
  };

  // Get data for active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "trading":
        return generateData("trading");
      case "digital":
        return generateData("digital");
      case "construction":
        return generateData("construction");
      default:
        return generateData("trading");
    }
  };

  const activeData = getActiveData();

  // Pagination logic
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const paginatedCards = activeData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(activeData.length / cardsPerPage);

  return (
    <>
      {/* Tabs */}
      <section className="max-w-[800px] mx-auto overflow-x-scroll lg:overflow-hidden hide-default-scrollbar">
        <ul className="flex text-center mx-auto text-base relative border-b-4 pb-4 lg:pb-6 border-[#EAEAEA]">
          {tabs.map((tab, index) => (
            <li
              key={tab.value}
              className={cn(
                { "font-medium": activeTab === tab.value },
                "cursor-pointer transition-all flex-1"
              )}
              onClick={() => {
                setActiveTab(tab.value);
                setCurrentPage(1); // Reset to page 1 when changing tabs
              }}
            >
              {tab.label}
            </li>
          ))}

          <div
            style={{
              left: `${
                (tabs.findIndex((tab) => tab.value === activeTab) * 100) /
                tabs.length
              }%`,
              width: `${100 / tabs.length}%`,
              backgroundColor: "#63AE1D",
            }}
            className="h-1 absolute -bottom-1 transition-all duration-500"
          ></div>
        </ul>
      </section>
      <section className="mx-auto mt-8">
        {/* Grid Card (Skala 1:1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-[800px] mx-auto">
          {paginatedCards.map((card) => (
            <div
              key={card.id}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              {/* Background Image with Overlay */}
              <div className="relative w-full aspect-square">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all"></div>
              </div>

              {/* Title & Description */}
              <div className="absolute bottom-0 p-4 text-white z-10">
                <p className="text-xs mt-1">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2 items-center">
          {/* Prev Button */}
          <button
            className="p-2 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft size={24} className="text-green-light" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else {
              if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
            }

            return (
              <button
                key={i}
                className={cn(
                  "px-3 py-1 rounded text-sm",
                  currentPage === pageNum
                    ? "font-bold text-green-600"
                    : "text-gray-500"
                )}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            className="p-2 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight size={24} className="text-green-light" />
          </button>
        </div>
      </section>
    </>
  );
};

export default HomeProject;
