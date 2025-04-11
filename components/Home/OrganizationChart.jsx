import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';

const OrganizationChart = () => {
  // Company structure data with added website URLs
  const companyData = {
    parent: {
      name: "Tradisco Holding",
      logo: "/logo/logo.png",
      description: "Parent company focusing on trading, digital services, and construction"
    },
    subsidiaries: [
      {
        name: "ChatBox",
        logo: "/images/chatbox.png",
        description: "AI-powered conversation solutions for business automation and customer engagement",
        website: "https://chatbox.tradisco.id/"
      },
      {
        name: "Asets",
        logo: "/images/asets.png",
        description: "Digital payment platform and merchant service solutions",
        website: "https://asets.co.id"
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Handle card click to open website in new tab
  const handleCardClick = (website) => {
    if (website) {
      window.open(website, "_blank", "noopener,noreferrer");
    }
  };

  // Dynamically determine grid columns based on number of subsidiaries
  const getGridColumns = () => {
    const count = companyData.subsidiaries.length;

    // For mobile - always single column
    let mobileClass = "grid-cols-1";

    // For medium screens and larger
    let desktopClass;
    if (count === 1) desktopClass = "md:grid-cols-1";
    else if (count === 2) desktopClass = "md:grid-cols-2";
    else if (count === 3) desktopClass = "md:grid-cols-3";
    else if (count === 4) desktopClass = "md:grid-cols-4";
    else if (count > 4) desktopClass = "md:grid-cols-4 lg:grid-cols-5";

    return `${mobileClass} ${desktopClass}`;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Group
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Group structure with subsidiaries focusing on diverse industry sectors
          </p>
        </motion.div>

        {/* Modern Organizational chart */}
        <div className="relative">
          {/* Parent company box - no click event */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto relative mb-24"
          >
            <div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-b-4 border-blue-500"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-6 px-8 flex justify-center">
                <img
                  src={companyData.parent.logo}
                  alt={companyData.parent.name}
                  className="h-10 object-contain"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {companyData.parent.name}
                </h3>
                <p className="text-gray-600">
                  {companyData.parent.description}
                </p>
              </div>
            </div>

            {/* Vertical connector line from parent company */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-1 h-16 bg-gradient-to-b from-blue-400 to-blue-200"></div>
          </motion.div>

          {/* Horizontal connector line */}
          <div
            className="relative h-1 mx-auto mb-16 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"
            style={{
              width:
                companyData.subsidiaries.length === 1
                  ? "2%"
                  : companyData.subsidiaries.length === 2
                  ? "60%"
                  : companyData.subsidiaries.length === 3
                  ? "80%"
                  : companyData.subsidiaries.length === 4
                  ? "90%"
                  : "95%",
            }}
          ></div>

          {/* Subsidiary cards with centered vertical lines */}
          <div
            className={`grid ${getGridColumns()} gap-8 mx-auto`}
            style={{
              width:
                companyData.subsidiaries.length === 1
                  ? "25%"
                  : companyData.subsidiaries.length === 2
                  ? "65%"
                  : companyData.subsidiaries.length === 3
                  ? "85%"
                  : companyData.subsidiaries.length === 4
                  ? "90%"
                  : "95%",
              maxWidth: "1400px",
            }}
          >
            {companyData.subsidiaries.map((company, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Vertical line to subsidiary */}
                <div className="w-1 h-16 bg-gradient-to-b from-blue-400 to-blue-200 mb-4"></div>

                {/* Subsidiary card - with enhanced hover effects */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 }
                  }}
                  className="w-full h-80 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border-b-4 border-blue-400 group"
                  onClick={() => handleCardClick(company.website)}
                >
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 py-6 flex justify-center items-center h-28 border-b border-gray-100 transition-all duration-300 group-hover:from-blue-200 group-hover:to-blue-100">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-44 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between h-52">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center transition-colors group-hover:text-blue-600">
                        {company.name}
                      </h3>
                      <p className="text-gray-600 mb-4 text-center line-clamp-3 transition-colors group-hover:text-gray-700">
                        {company.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center text-blue-500 mt-4 transition-all duration-300 group-hover:text-blue-600">
                      <ExternalLink size={16} className="mr-2 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      <span className="text-sm font-medium transition-all duration-300 group-hover:underline">Visit Website</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationChart;