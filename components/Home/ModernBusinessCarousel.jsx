import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, ArrowRight, Info } from "lucide-react";

// Simplified data structure
const data = {
  title: "Our Business",
  tab: [
    {
      title: "Trading",
      content: [
        {
          title: "Natural Resources and Sustainable Trading",
          description: "",
          slug: "natural-resources-and-sustainable-trading",
          thumbnail: "/images/trading1.webp",
        },
        {
          title:
            "Integrated Manufacturing: From Raw Materials to Premium Products",
          description: "",
          slug: "Integrated-Manufacturing",
          thumbnail: "/images/trading2.jpeg",
        },
        {
          title: "Global Commodities and Industrial Chemicals",
          description: "",
          slug: "Global-Commodities",
          thumbnail: "/images/trading3.webp",
        },
      ],
      image: "/images/trade.png",
    },
    {
      title: "Digital",
      content: [
        {
          title: "Virtual Intelligence",
          description:
            "Virtual Intelligence products leverage AI to automate business processes, analyze data in real-time, enhance customer experiences, and",
          slug: "virtual-intelligence",
          thumbnail: "/images/digital1.png",
        },
        {
          title: "ChatBox",
          description: "",
          slug: "chatbox",
          thumbnail: "/images/chatbox.png",
        },
        {
          title: "Asets",
          description:
            "Asets delivers property and infrastructure solutions using advanced analytics to provide data-driven insights and tailored recommendations, empowering",
          slug: "asets",
          thumbnail: "/images/asets.png",
        },
        {
          title: "SocialBox",
          description:
            "SocialBox focuses on ESG development by leveraging creative technologies like augmented reality (AR) to promote sustainability. It",
          slug: "socialbox",
          thumbnail: "/images/socialbox.png",
        },
        {
          title: "Stori System Monitoring",
          description: "",
          slug: "stori-system-monitoring",
          thumbnail: "/images/digital5.jpg",
        },
        {
          title: "IBMS",
          description: "",
          slug: "ibms",
          thumbnail: "/images/digital6.png",
        },
      ],
      image: "/images/digital.png",
    },
    {
      title: "Construction",
      content: [
        {
          title: "Residential & Commercial Development",
          description: "",
          slug: "residential-commercial-development",
          thumbnail: "/images/construction1.jpeg",
        },
        {
          title: "Industrial & Infrastructure Projects",
          description: "",
          slug: "program-konservasi-air",
          thumbnail: "/images/construction2.jpeg",
        },
        {
          title: "Project Management & Engineering",
          description: "",
          slug: "project-management-engineering",
          thumbnail: "/images/construction1.jpeg",
        },
        {
          title: "Green & Sustainable Construction",
          description: "",
          slug: "green-sustainable-construction",
          thumbnail: "/images/construction2.jpeg",
        },
      ],
      image: "/images/construction.png",
    },
  ],
};

const ModernBusinessCarousel = () => {
  const [activeTabTitle, setActiveTabTitle] = useState(data.tab[0].title);
  const [activeModal, setActiveModal] = useState(null);
  const [lang, setLang] = useState("id");
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // Get active tab
  const activeTab = data.tab.find((tab) => tab.title === activeTabTitle);
  const itemsPerPage = isMobile ? 1 : 4;
  const totalItems = activeTab?.content?.length || 0;

  // Handle resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination functions
  const nextPage = () => {
    if (startIndex + itemsPerPage < totalItems) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - itemsPerPage));
    }
  };

  // Get visible items
  const visibleItems =
    activeTab?.content?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          {data.title}
        </motion.h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {data.tab.map((tab, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveTabTitle(tab.title);
                setStartIndex(0);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative overflow-hidden rounded-xl shadow-md
                group transition-all duration-300 h-20 sm:h-28 px-6
                flex items-center justify-center min-w-[150px] sm:min-w-[180px]
                ${
                  activeTabTitle === tab.title ? "ring-4 ring-green-500/50" : ""
                }
              `}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={tab.image}
                  alt={tab.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r 
                  ${
                    activeTabTitle === tab.title
                      ? "from-green-600/90 to-teal-800/90"
                      : "from-gray-900/80 to-gray-800/80 group-hover:from-green-700/75 group-hover:to-teal-900/75"
                  } 
                  transition-all duration-300`}
                />
              </div>

              <span className="relative z-10 font-semibold text-white text-lg sm:text-xl">
                {tab.title}
              </span>

              {activeTabTitle === tab.title && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-green-600 border-l-transparent border-r-transparent" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Content Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabTitle}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="relative">
                {/* Carousel Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                  {visibleItems.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -8 }}
                      className="rounded-xl overflow-hidden shadow-lg h-[350px] sm:h-[380px] lg:h-[400px] relative group"
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p
                          className="text-sm text-gray-300 mb-4 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: item.description
                              ? item.description
                                  .replace(/<[^>]*>/g, " ")
                                  .substring(0, 100) + "..."
                              : "",
                          }}
                        />

                        <motion.button
                          onClick={() => setActiveModal(item.slug)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full text-sm font-medium transition-all"
                        >
                          <span>
                            {lang === "en" ? "Learn More" : "Selengkapnya"}
                          </span>
                          <ArrowRight size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                {totalItems > itemsPerPage && (
                  <div className="flex justify-center py-2 mt-8 gap-4">
                    <motion.button
                      onClick={prevPage}
                      disabled={startIndex === 0}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full ${
                        startIndex === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>

                    <motion.button
                      onClick={nextPage}
                      disabled={startIndex + itemsPerPage >= totalItems}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-full ${
                        startIndex + itemsPerPage >= totalItems
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {activeTab?.content?.find(
                (item) => item.slug === activeModal
              ) && (
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-5 border-b">
                    <h3 className="text-xl font-bold text-green-700">
                      {
                        activeTab.content.find(
                          (item) => item.slug === activeModal
                        ).title
                      }
                    </h3>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 overflow-auto">
                    <div className="order-2 md:order-1 overflow-auto max-h-[50vh]">
                      <div
                        className="prose prose-green prose-img:rounded-lg prose-headings:text-green-700"
                        dangerouslySetInnerHTML={{
                          __html:
                            activeTab.content.find(
                              (item) => item.slug === activeModal
                            ).description || "No description available",
                        }}
                      />
                    </div>

                    <div className="order-1 md:order-2">
                      <img
                        src={
                          activeTab.content.find(
                            (item) => item.slug === activeModal
                          ).thumbnail
                        }
                        alt={
                          activeTab.content.find(
                            (item) => item.slug === activeModal
                          ).title
                        }
                        className="w-full h-[200px] sm:h-[300px] object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ModernBusinessCarousel;
