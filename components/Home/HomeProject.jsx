import React, { useState, memo, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ProjectCard Component - Extracted for better code organization
const ProjectCard = memo(({ project }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
      {/* Background Image with Overlay */}
      <div className="relative w-full aspect-square">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy" // Lazy loading for better performance
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all"></div>
      </div>

      {/* Title & Description - Improved readability on mobile */}
      <div className="absolute bottom-0 p-3 sm:p-4 text-white z-10 w-full bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-sm md:text-base font-medium mb-1 line-clamp-2">{project.title}</h3>
        <p className="text-xs md:text-sm line-clamp-2">{project.description}</p>
      </div>
    </div>
  );
});

// Add display name to fix ESLint react/display-name warning
ProjectCard.displayName = "ProjectCard";

// Sample project data structure
const PROJECTS_DATA = {
  trading: [
    {
      id: 1,
      title: "Kleemann Vertical System Distribution",
      description:
        "Supplying advanced elevator systems from Greece to Indonesia",
      image: "/images/project-reference/trading1.jpg",
    },
    {
      id: 2,
      title: "Pan-Asia Material Trading Network",
      description:
        "Delivering raw materials through cross-border industrial pipelines",
      image: "/images/project-reference/trading2.jpg",
    },
    {
      id: 3,
      title: "ASEAN Logistics Integration Gateway",
      description:
        "Enabling seamless trade across Singapore and Indonesian ports",
      image: "/images/project-reference/trading3.jpg",
    },
    {
      id: 4,
      title: "European Industrial Equipment Import",
      description:
        "Sourcing heavy machinery for infrastructure and manufacturing growth",
      image: "/images/project-reference/trading4.jpg",
    },
    {
      id: 5,
      title: "Automated Global Trading Platform",
      description:
        "Streamlining procurement with AI-driven international compliance tools",
      image: "/images/project-reference/trading5.jpg",
    },
    {
      id: 6,
      title: "Power Star Energy Distribution",
      description:
        "Expanding European energy tech across Southeast Asian markets",
      image: "/images/project-reference/trading6.jpg",
    },
  ],
  digital: [
    {
      id: 1,
      title: "AVIS Infrastructure Intelligence Platform",
      description:
        "Digitizing asset management through predictive AI-based systems",
      image: "/images/project-reference/digital1.jpg",
    },
    {
      id: 2,
      title: "ChatBox BrandMonitor AI Studio",
      description:
        "Premier studio solution for refined data-driven brand strategies",
      image: "/images/project-reference/digital2.jpg",
    },
    {
      id: 3,
      title: "Tradisco Multinational Cloud Connect",
      description:
        "Secure digital workspace for cross-border project collaboration",
      image: "/images/project-reference/digital3.jpg",
    },
    {
      id: 4,
      title: "Digital Twin for Energy Efficiency",
      description:
        "Virtual energy optimization system for smart building operations",
      image: "/images/project-reference/digital4.jpg",
    },
    {
      id: 5,
      title: "ESG Performance Dashboard System",
      description:
        "Monitoring carbon data for sustainable compliance and reporting",
      image: "/images/project-reference/digital5.jpg",
    },
    {
      id: 6,
      title: "AI Document Verification Engine",
      description:
        "Automating legal and technical validation for global contracts",
      image: "/images/project-reference/digital6.jpg",
    },
  ],
  construction: [
    {
      id: 1,
      title: "Green Modular Tower Project",
      description:
        "Building low-carbon skyscrapers using prefabricated technologies",
      image: "/images/project-reference/construction1.jpg",
    },
    {
      id: 2,
      title: "Smart Building Automation Initiative",
      description:
        "Deploying IBMS for commercial properties across Southeast Asia",
      image: "/images/project-reference/construction2.jpg",
    },
    {
      id: 3,
      title: "Transit-Oriented Urban Redevelopment",
      description:
        "Revitalizing districts through walkability and digital infrastructure",
      image: "/images/project-reference/construction3.jpg",
    },
    {
      id: 4,
      title: "EU Industrial Site Partnership",
      description:
        "Advising on engineering excellence in European construction zones",
      image: "/images/project-reference/construction4.jpg",
    },
    {
      id: 5,
      title: "Seismic-Resilient Development Program",
      description:
        "Creating quake-safe infrastructure with global safety standards",
      image: "/images/project-reference/construction5.jpg",
    },
    {
      id: 6,
      title: "Cross-Border Talent Upskilling Initiative",
      description:
        "Advancing workforce skills via international construction exchange",
      image: "/images/project-reference/construction6.jpg",
    },
  ],
  construction: [
    {
      id: 1,
      title: "Green Modular Tower Project",
      description:
        "Building low-carbon skyscrapers using prefabricated technologies",
      image: "/images/project-reference/construction1.jpg",
    },
    {
      id: 2,
      title: "Smart Building Automation Initiative",
      description:
        "Deploying IBMS for commercial properties across Southeast Asia",
      image: "/images/project-reference/construction2.jpg",
    },
    {
      id: 3,
      title: "Transit-Oriented Urban Redevelopment",
      description:
        "Revitalizing districts through walkability and digital infrastructure",
      image: "/images/project-reference/construction3.jpg",
    },
    {
      id: 4,
      title: "EU Industrial Site Partnership",
      description:
        "Advising on engineering excellence in European construction zones",
      image: "/images/project-reference/construction4.jpg",
    },
    {
      id: 5,
      title: "Seismic-Resilient Development Program",
      description:
        "Creating quake-safe infrastructure with global safety standards",
      image: "/images/project-reference/construction5.jpg",
    },
    {
      id: 6,
      title: "Cross-Border Talent Upskilling Initiative",
      description:
        "Advancing workforce skills via international construction exchange",
      image: "/images/project-reference/construction6.jpg",
    },
  ],
  construction: [
    {
      id: 1,
      title: "Green Modular Tower Project",
      description:
        "Building low-carbon skyscrapers using prefabricated technologies",
      image: "/images/project-reference/construction1.jpg",
    },
    {
      id: 2,
      title: "Smart Building Automation Initiative",
      description:
        "Deploying IBMS for commercial properties across Southeast Asia",
      image: "/images/project-reference/construction2.jpg",
    },
    {
      id: 3,
      title: "Transit-Oriented Urban Redevelopment",
      description:
        "Revitalizing districts through walkability and digital infrastructure",
      image: "/images/project-reference/construction3.jpg",
    },
    {
      id: 4,
      title: "EU Industrial Site Partnership",
      description:
        "Advising on engineering excellence in European construction zones",
      image: "/images/project-reference/construction4.jpg",
    },
    {
      id: 5,
      title: "Seismic-Resilient Development Program",
      description:
        "Creating quake-safe infrastructure with global safety standards",
      image: "/images/project-reference/construction5.jpg",
    },
    {
      id: 6,
      title: "Cross-Border Talent Upskilling Initiative",
      description:
        "Advancing workforce skills via international construction exchange",
      image: "/images/project-reference/construction6.jpg",
    },
  ],
};

// Define tab constants
const TABS = [
  { label: "Trading", value: "trading" },
  { label: "Digital", value: "digital" },
  { label: "Construction", value: "construction" },
];

// Number of projects to show per page - Adjust based on screen size
const getItemsPerPage = (width) => {
  if (width < 640) return 3; // mobile
  if (width < 768) return 4; // tablet
  return 6; // desktop
};

const HomeProject = () => {
  const [activeTab, setActiveTab] = useState("trading");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    };

    // Initialize on mount
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset page when changing items per page
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Get current projects based on active tab
  const currentProjects = PROJECTS_DATA[activeTab] || [];

  // Handle tab change
  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setCurrentPage(1); // Reset to page 1 when changing tabs
  };

  // Pagination logic
  const totalPages = Math.ceil(currentProjects.length / itemsPerPage);
  const showPagination = currentProjects.length > itemsPerPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProjects = currentProjects.slice(startIndex, endIndex);

  // Render pagination buttons - Improved for mobile
  const renderPaginationButtons = () => {
    // On mobile, show fewer pagination buttons
    const maxButtons = windowWidth < 640 ? 3 : 5;
    
    return Array.from({ length: Math.min(totalPages, maxButtons) }, (_, i) => {
      let pageNum;

      if (totalPages <= maxButtons) {
        pageNum = i + 1;
      } else if (currentPage <= Math.ceil(maxButtons / 2)) {
        pageNum = i + 1;
      } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
        pageNum = totalPages - maxButtons + 1 + i;
      } else {
        pageNum = currentPage - Math.floor(maxButtons / 2) + i;
      }

      return (
        <button
          key={i}
          className={cn(
            "px-2 sm:px-3 py-1 rounded text-xs sm:text-sm",
            currentPage === pageNum
              ? "font-bold text-green-600 bg-green-50"
              : "text-gray-500"
          )}
          onClick={() => setCurrentPage(pageNum)}
          aria-label={`Go to page ${pageNum}`}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-20">Project Reference</h1>
      
      {/* Tabs - Improved for mobile */}
      <section className="max-w-full md:max-w-[800px] mx-auto px-4 overflow-x-auto hide-default-scrollbar">
        <ul
          className="flex text-center mx-auto text-sm md:text-base relative border-b-4 pb-4 lg:pb-6 border-[#EAEAEA] min-w-[300px]"
          role="tablist"
        >
          {TABS.map((tab) => (
            <li
              key={tab.value}
              className={cn(
                "cursor-pointer transition-all flex-1 whitespace-nowrap px-2",
                activeTab === tab.value 
                  ? "font-medium text-green-600" 
                  : "text-gray-700"
              )}
              onClick={() => handleTabChange(tab.value)}
              aria-selected={activeTab === tab.value}
              role="tab"
            >
              {tab.label}
            </li>
          ))}

          <div
            style={{
              left: `${
                (TABS.findIndex((tab) => tab.value === activeTab) * 100) /
                TABS.length
              }%`,
              width: `${100 / TABS.length}%`,
              backgroundColor: "#63AE1D",
            }}
            className="h-1 absolute -bottom-1 transition-all duration-500"
          ></div>
        </ul>
      </section>

      <section className="mx-auto mt-8 px-4">
        {/* Grid Card - Improved responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-[800px] mx-auto">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* No results message */}
        {displayedProjects.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No projects found in this category
          </div>
        )}

        {/* Pagination Controls - Improved for mobile */}
        {showPagination && (
          <div className="flex justify-center mt-6 items-center">
            {/* Prev Button */}
            <button
              className="p-1 sm:p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} className="text-green-600" />
            </button>

            {/* Mobile view - simplified pagination */}
            {windowWidth < 480 ? (
              <div className="mx-2 text-sm">
                <span className="font-medium">{currentPage}</span>
                <span className="mx-1">/</span>
                <span>{totalPages}</span>
              </div>
            ) : (
              /* Page Numbers - Desktop view */
              <div className="flex space-x-1 sm:space-x-2">
                {renderPaginationButtons()}
              </div>
            )}

            {/* Next Button */}
            <button
              className="p-1 sm:p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={20} className="text-green-600" />
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default HomeProject;