import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
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

const companyData = {
  parent: {
    name: "TRADISCO",
    logo: "/logo/logo.png",
    description:
      "Parent company focusing on trading, digital services, and construction",
  },

  subsidiaries: [
    // 🟦 INVESTMENT ARM (kiri)
    {
      name: "TRADISCO INVESTAMA",
      imageSize: { width: 180, height: 90 },

      // Anak-anak sesuai diagram
      children: [
        {
          name: "STORI",
          logo: "/images/Stori-removebg-preview-removebg-preview.png",
          description:
            "AI-powered, 5G-enabled smart maintenance platform that transforms traditional maintenance into an intelligent connected ecosystem.",
          website: "#",
          imageSize: { width: 90, height: 60 },
        },
        {
          name: "ChatBox",
          logo: "/images/chatbox.png",
          description:
            "All-in-one consultation platform designed to streamline interactions, protect conversations, and maximize business growth.",
          website: "https://chatbox.tradisco.id",
          imageSize: { width: 90, height: 90 },
        },
        {
          name: "Virtual Intelligence",
          logo: "/images/virtualinteligence.png",
          description:
            "AI products leveraging automation for business processes, real-time analytics, and customer experience.",
          website: "#",
          imageSize: { width: 80, height: 60 },
        },
        {
          name: "Tech Lads",
          logo: "/images/tech-lads.png",
          description:
            "Empowering women in technology since 2014; expanded in 2022 delivering impactful tech solutions.",
          website: "https://tech-lads.com",
          imageSize: { width: 90, height: 50 },
        },
        {
          name: "SocialBox",
          logo: "/images/socialbox.png",
          description:
            "ESG development leveraging augmented reality (AR) technology to promote sustainability.",
          website: "#",
          imageSize: { width: 80, height: 50 },
        },
      ],
    },

    // 🟩 Asets (subsidiaries operational arm)
    {
      name: "Asets",
      logo: "/images/asets.png",
      description:
        "Indonesia's first AI-powered e-commerce platform to support businesses at every level.",
      website: "https://asets.co.id",
      imageSize: { width: 100, height: 70 },
    },

    // 🟩 Green Energy (subsidiaries operational arm)
    {
      name: "Green Energy Pratama",
      logo: "/images/green-energy.jpg",
      description:
        "Comprehensive engineering solutions shaping Indonesia’s infrastructure with precision.",
      website: "https://green-energy-pratama.vercel.app",
      imageSize: { width: 140, height: 40 },
    },

    // 🟩 RP Creators (subsidiaries operational arm)
    {
      name: "RP Creators",
      logo: "/images/RPC-removebg-preview.png",
      description:
        "Revenue-first creative ecosystem transforming creativity into products and services.",
      website: "#",
      imageSize: { width: 130, height: 50 },

      // Anak-anak sesuai diagram
      children: [
        {
          name: "Warehaus Indonesia",
          logo: "/images/warehaus.png",
          description:
            "Commercial design & fabrication using high-quality material with optimal functionality.",
          website: "#",
          imageSize: { width: 120, height: 60 },
        },
        {
          name: "Kleemann Indonesia",
          logo: "/images/kleemann.png",
          description:
            "Provider of elevators & escalators offering design, safety, and comfort for modern buildings.",
          website: "#",
          imageSize: { width: 120, height: 60 },
        },
      ],
    },
  ],
};

// Component for section header
const SectionHeader = () => (
  <motion.div {...animations.fadeIn} className="text-center mb-6 sm:mb-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
      Our Group
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
      Group structure with subsidiaries focusing on diverse industry sectors
    </p>
  </motion.div>
);

// Component for parent company card
const ParentCompanyCard = ({ company }) => (
  <motion.div
    {...animations.fadeIn}
    className="max-w-[160px] sm:max-w-[180px] md:max-w-[200px] mx-auto relative mb-6 sm:mb-8 md:mb-10"
  >
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-b-2 border-blue-500">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-1.5 sm:py-2 px-2 sm:px-3 flex justify-center">
        <img
          src={company.logo}
          alt={company.name}
          className="h-5 sm:h-6 object-contain"
        />
      </div>
      <div className="p-2 sm:p-2.5 text-center">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
          {company.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 px-1">{company.description}</p>
      </div>
    </div>

    {/* Vertical connector line from parent company */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0.5 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-blue-200"></div>
  </motion.div>
);

// Component for horizontal connector
const HorizontalConnector = ({ subsidiariesCount }) => {
  const getWidthPercentage = (count, isMobile) => {
    if (isMobile) {
      // On mobile, make it narrower
      if (count === 1) return "10%";
      if (count === 2) return "60%";
      if (count === 3) return "70%";
      return "80%";
    }
    // Desktop widths
    if (count === 1) return "2%";
    if (count === 2) return "75%";
    if (count === 3) return "85%";
    if (count >= 4) return "90%";
    return "95%";
  };

  return (
    <>
      {/* Mobile connector */}
      <div
        className="relative h-0.5 mx-auto mb-6 sm:hidden bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"
        style={{ width: getWidthPercentage(subsidiariesCount, true) }}
      ></div>
      {/* Desktop connector */}
      <div
        className="relative h-0.5 mx-auto mb-8 hidden sm:block bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"
        style={{ width: getWidthPercentage(subsidiariesCount, false) }}
      ></div>
    </>
  );
};

// Component for subsidiary card
const SubsidiaryCard = ({ company, index, isChild = false }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  // Calculate responsive image size
  const getImageSize = () => {
    if (!company.imageSize) return { height: "20px" };
    
    return {
      width: `${company.imageSize.width}px`,
      height: `${company.imageSize.height}px`,
      maxWidth: "100%",
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ delay: index * 0.2 }}
      className="relative flex flex-col items-center w-full"
    >
      {!isChild && (
        <div className="absolute top-0 h-4 sm:h-6 w-0.5 bg-gradient-to-b from-teal-300 to-blue-300"></div>
      )}

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`w-full ${isChild ? 'max-w-[140px] sm:max-w-[160px] md:max-w-[180px]' : 'max-w-[160px] sm:max-w-[180px]'} rounded-lg bg-white bg-opacity-80 p-2 sm:p-2.5 shadow-md backdrop-blur-lg flex flex-col`}
      >
        {company.logo && (
          <motion.img
            src={company.logo}
            alt={`${company.name} logo`}
            className={`mx-auto mb-1 sm:mb-1.5 object-contain w-auto ${isChild ? 'max-h-[40px] sm:max-h-[50px]' : 'max-h-[50px] sm:max-h-[60px]'}`}
            style={getImageSize()}
            whileHover={{ rotate: 5 }}
          />
        )}

        <h4 className={`mb-1 text-center ${isChild ? 'text-xs sm:text-sm' : 'text-xs sm:text-sm'} font-semibold text-gray-800 line-clamp-2 ${isChild ? 'min-h-[2rem] sm:min-h-[2.5rem]' : 'min-h-[2.5rem]'}`}>
          {company.name}
        </h4>

        <p className="mb-1 sm:mb-1.5 text-center text-[10px] sm:text-xs text-gray-600 line-clamp-2 leading-relaxed px-1">
          {company.description}
        </p>

        {company.website && (
          <div className="flex justify-center mt-auto pt-1">
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] sm:text-xs text-teal-600 hover:text-teal-800"
            >
              <ExternalLink className="w-3 h-3" /> <span className="hidden sm:inline">Visit Website</span><span className="sm:hidden">Visit</span>
            </a>
          </div>
        )}
      </motion.div>

      {/* -------------- PATCH DITAMBAHKAN DI SINI -------------- */}
      {company.children && company.children.length > 0 && (
        <div className="mt-2 sm:mt-3 w-full">
          <div className="w-0.5 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-blue-300 to-blue-200 mx-auto mb-2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 justify-center">
            {company.children.map((child, idx) => (
              <SubsidiaryCard key={idx} company={child} index={idx} isChild={true} />
            ))}
          </div>
        </div>
      )}
      {/* -------------- PATCH SELESAI -------------- */}
    </motion.div>
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
      className={`grid ${getGridColumns()} gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-6 mx-auto px-4 sm:px-6 md:px-0`}
      style={{
        width: subsidiaries.length === 1 ? "90%" : "100%",
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
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-gray-50 to-white">
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
