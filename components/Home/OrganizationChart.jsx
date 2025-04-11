import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Animation variants
const animations = {
  fadeIn: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  fadeUp: (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  }),
  hover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
};

// Company data
const companyData = {
  parent: {
    name: "Tradisco Holding",
    logo: "/logo/logo.png",
    description:
      "Parent company focusing on trading, digital services, and construction",
  },
  subsidiaries: [
    {
      name: "Asets",
      logo: "/images/asets.png",
      description:
        "Indonesia's first AI-powered e-commerce platform connecting MSMEs to strategic assets and financial institutions, providing essential tools for business growth.",
      website: "https://asets.co.id",
      imageSize: { width: 150, height: 120 },
    },
    {
      name: "Green Energy Pratama",
      logo: "/images/green-energy.jpg",
      description:
        "Leading comprehensive engineering solutions, shaping Indonesia's infrastructure with collaboratibe expertise and precision in every project we undertake.",
      website: "https://green-energy-pratama.vercel.app",
      imageSize: { width: 140, height: 40 },
    },
    {
      name: "ChatBox",
      logo: "/images/chatbox.png",
      description:
        "The ultimate all-in-one consultation platform for secure chat management, AI-powered customer engagement, and expert consultation across various sectors.",
      website: "https://chatbox.tradisco.id",
      imageSize: { width: 100, height: 130 },
    },
    {
      name: "Tech Lads",
      logo: "/images/tech-lads.png",
      description:
        "Platform empowering women in technology since 2014, providing digital literacy tools and partnering with world-class organizations to help women succeed in tech, expanded in 2022 to drive impactful tech solutions across Indonesia.",
      website: "https://tech-lads.png",
      imageSize: { width: 100, height: 50 },
    },
  ],
};

// Component for section header
const SectionHeader = () => (
  <motion.div {...animations.fadeIn} className="text-center mb-16">
    <h2 className="text-lg sm:text-5xl font-bold text-gray-900 mb-4">
      Our Group
    </h2>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
      Group structure with subsidiaries focusing on diverse industry sectors
    </p>
  </motion.div>
);

// Component for parent company card
const ParentCompanyCard = ({ company }) => (
  <motion.div
    {...animations.fadeIn}
    className="max-w-md mx-auto relative mb-24"
  >
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-b-4 border-blue-500">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-6 px-8 flex justify-center">
        <img
          src={company.logo}
          alt={company.name}
          className="h-10 object-contain"
        />
      </div>
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {company.name}
        </h3>
        <p className="text-gray-600">{company.description}</p>
      </div>
    </div>

    {/* Vertical connector line from parent company */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-1 h-16 bg-gradient-to-b from-blue-400 to-blue-200"></div>
  </motion.div>
);

// Component for horizontal connector
const HorizontalConnector = ({ subsidiariesCount }) => {
  const getWidthPercentage = (count) => {
    if (count === 1) return "2%";
    if (count === 2) return "75%";
    if (count === 3) return "85%";
    if (count >= 4) return "90%";
    return "95%";
  };

  return (
    <div
      className="relative h-1 mx-auto mb-16 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"
      style={{ width: getWidthPercentage(subsidiariesCount) }}
    ></div>
  );
};

// Component for subsidiary card
const SubsidiaryCard = ({ company, index }) => {
  const handleCardClick = () => {
    if (company.website) {
      window.open(company.website, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Vertical line to subsidiary */}
      <div className="w-1 h-16 bg-gradient-to-b from-blue-400 to-blue-200 mb-4"></div>

      {/* Subsidiary card with hover effects */}
      <motion.div
        {...animations.fadeUp(index * 0.1 + 0.3)}
        whileHover={animations.hover}
        className="w-full h-80 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border-b-4 border-blue-400 group"
        onClick={handleCardClick}
      >
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-6 flex justify-center items-center h-28 border-b border-gray-100 transition-all duration-300 group-hover:from-blue-200 group-hover:to-blue-100">
          <div className="flex items-center justify-center">
            <img
              src={company.logo}
              alt={company.name}
              style={{
                width: `${company.imageSize?.width || 120}px`,
                height: `${company.imageSize?.height || 60}px`,
                objectFit: "contain",
              }}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        <div className="p-6 flex flex-col h-52">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center transition-colors group-hover:text-blue-600 leading-tight">
              {company.name}
            </h3>
            <p className="text-gray-600 text-center line-clamp-3 transition-colors group-hover:text-gray-700">
              {company.description}
            </p>
          </div>
          <div className="mt-auto flex items-center justify-center text-blue-500 transition-all duration-300 group-hover:text-blue-600">
            <ExternalLink
              size={16}
              className="mr-2 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="text-sm font-medium transition-all duration-300 group-hover:underline">
              Visit Website
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Component for subsidiaries grid
const SubsidiariesGrid = ({ subsidiaries }) => {
  // Determine grid columns based on number of subsidiaries
  const getGridColumns = () => {
    const count = subsidiaries.length;
    const mobileClass = "grid-cols-1";

    let desktopClass;
    if (count === 1) desktopClass = "md:grid-cols-1";
    else if (count === 2) desktopClass = "md:grid-cols-2";
    else if (count === 3) desktopClass = "md:grid-cols-3";
    else if (count === 4) desktopClass = "md:grid-cols-4";
    else desktopClass = "md:grid-cols-4 lg:grid-cols-5";

    return `${mobileClass} ${desktopClass}`;
  };

  return (
    <div
      className={`grid ${getGridColumns()} gap-x-6 gap-y-10 mx-auto px-6 sm:px-0`}
      style={{
        width: subsidiaries.length === 1 ? "90%" : "95%",
        maxWidth: "1400px",
      }}
    >
      {subsidiaries.map((company, index) => (
        <SubsidiaryCard key={index} company={company} index={index} />
      ))}
    </div>
  );
};

// Main Organization Chart component
const OrganizationChart = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="relative">
          <ParentCompanyCard company={companyData.parent} />
          <HorizontalConnector
            subsidiariesCount={companyData.subsidiaries.length}
          />
          <SubsidiariesGrid subsidiaries={companyData.subsidiaries} />
        </div>
      </div>
    </section>
  );
};

export default OrganizationChart;
