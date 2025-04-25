import React, { useState, memo, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  Play,
  Pause,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ProjectCard Component - Extracted for better code organization
const ProjectCard = memo(({ project, onClick }) => {
  return (
    <motion.div
      className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
    >
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
        <h3 className="text-sm md:text-base font-medium mb-1 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm line-clamp-2">{project.description}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 mt-2 rounded-full text-xs font-medium transition-all"
        >
          <span>Selengkapnya</span>
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
});

// Add display name to fix ESLint react/display-name warning
ProjectCard.displayName = "ProjectCard";

// Multimedia Gallery Component for Video Engineered Intelligence Service
const MultimediaGallery = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const gallery = project.gallery || [];
  const currentItem = gallery[currentIndex];

  const goToNext = () => {
    if (currentIndex < gallery.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(false);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Add event listeners to video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(false);
        // Auto advance to next slide after video ends
        if (currentIndex < gallery.length - 1) {
          setTimeout(() => setCurrentIndex(currentIndex + 1), 1500);
        }
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentIndex, gallery.length, videoRef]);

  return (
    <div className="flex flex-col p-5">
      {/* Description */}
      <div className="prose prose-green mb-6">
        <p>{project.fullDescription || project.description}</p>
      </div>

      {/* Multimedia Viewer */}
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {currentItem?.type === "video" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={currentItem.url}
                  poster={currentItem.thumbnail}
                  className="w-full h-full object-contain"
                  onClick={togglePlayPause}
                />
                {!isPlaying && (
                  <button
                    onClick={togglePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play
                        size={36}
                        fill="white"
                        className="text-white ml-1"
                      />
                    </div>
                  </button>
                )}
              </div>
            ) : (
              <img
                src={currentItem?.url}
                alt={currentItem?.caption}
                className="w-full h-full object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`rounded-full p-2 ${
              currentIndex === 0
                ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                : "bg-green-600/80 text-white hover:bg-green-700/80"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          {currentItem?.type === "video" && (
            <button
              onClick={togglePlayPause}
              className="rounded-full p-2 bg-green-600/80 text-white hover:bg-green-700/80"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          )}

          <button
            onClick={goToNext}
            disabled={currentIndex === gallery.length - 1}
            className={`rounded-full p-2 ${
              currentIndex === gallery.length - 1
                ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                : "bg-green-600/80 text-white hover:bg-green-700/80"
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 text-center">
        <p className="text-gray-700">{currentItem?.caption || ""}</p>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 hide-default-scrollbar">
        {gallery.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPlaying(false);
            }}
            className={`shrink-0 rounded-md overflow-hidden w-16 h-16 ${
              currentIndex === index ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={item.type === "video" ? item.thumbnail : item.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play size={12} fill="white" className="text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Sample project data structure
const PROJECTS_DATA = {
  trading: [
    {
      id: 1,
      title: "Kleemann Vertical System Distribution",
      description:
        "Supplying advanced elevator systems from Greece to Indonesia",
      image: "/images/project-reference/trading1.jpg",
      fullDescription:
        "Kleemann Vertical System Distribution established a robust supply chain connecting European engineering excellence with Indonesian construction demands. This partnership facilitated the import of cutting-edge elevator technologies designed for high-rise developments across Jakarta and Surabaya. The project included comprehensive technical training for local installation teams and ongoing maintenance support systems.",
    },
    {
      id: 2,
      title: "Pan-Asia Material Trading Network",
      description:
        "Delivering raw materials through cross-border industrial pipelines",
      image: "/images/project-reference/trading2.jpg",
      fullDescription:
        "The Pan-Asia Material Trading Network created an innovative logistics solution for industrial raw materials across the ASEAN region. By establishing dedicated cross-border pipelines and specialized transport systems, we reduced transit times by 43% while maintaining strict quality controls. This project overcame complex regulatory challenges across multiple jurisdictions to establish a seamless supply chain ecosystem.",
    },
    {
      id: 3,
      title: "ASEAN Logistics Integration Gateway",
      description:
        "Enabling seamless trade across Singapore and Indonesian ports",
      image: "/images/project-reference/trading3.jpg",
      fullDescription:
        "The ASEAN Logistics Integration Gateway streamlined maritime commerce between Singapore and key Indonesian ports through advanced digital infrastructure and regulatory harmonization. This initiative reduced customs processing times by 67% and established real-time tracking systems across the entire shipping journey. The project created a model for regional integration that balances efficiency with robust security protocols.",
    },
    {
      id: 4,
      title: "European Industrial Equipment Import",
      description:
        "Sourcing heavy machinery for infrastructure and manufacturing growth",
      image: "/images/project-reference/trading4.jpg",
      fullDescription:
        "Our European Industrial Equipment Import program connects Indonesian manufacturing and infrastructure sectors with specialized German and Italian heavy machinery. The initiative includes comprehensive technical assessment, sourcing optimization, and end-to-end logistics management. We've established local training programs to ensure operational excellence and maintenance capabilities for all imported equipment.",
    },
    {
      id: 5,
      title: "Automated Global Trading Platform",
      description:
        "Streamlining procurement with AI-driven international compliance tools",
      image: "/images/project-reference/trading5.jpg",
      fullDescription:
        "The Automated Global Trading Platform revolutionizes international procurement through AI-powered compliance verification and documentation management. This digital solution automatically navigates the complex regulatory requirements across 27 countries, reducing administrative overhead by 78%. The system includes real-time exchange rate optimization and automated customs classification to minimize delays and costs.",
    },
    {
      id: 6,
      title: "Power Star Energy Distribution",
      description:
        "Expanding European energy tech across Southeast Asian markets",
      image: "/images/project-reference/trading6.jpg",
      fullDescription:
        "Power Star Energy Distribution facilitates the strategic deployment of European renewable energy technologies throughout Southeast Asia. This comprehensive program includes regulatory navigation, supply chain optimization, and localized implementation strategies. We've successfully introduced advanced wind turbine components and solar energy systems to emerging markets while ensuring full compliance with local energy policies.",
    },
  ],
  digital: [
    {
      id: 1,
      title: "AVIS Infrastructure Intelligence Platform",
      description:
        "Digitizing asset management through predictive AI-based systems",
      image: "/images/project-reference/digital1.jpg",
      fullDescription:
        "The AVIS Infrastructure Intelligence Platform transforms physical asset management through advanced IoT sensors and predictive maintenance algorithms. This system continuously monitors critical infrastructure components and forecasts maintenance needs with 94% accuracy. Implementation across major transportation networks has reduced unplanned downtime by 78% and extended asset lifecycle by an average of 7 years.",
    },
    {
      id: 2,
      title: "ChatBox BrandMonitor AI Studio",
      description:
        "Premier studio solution for refined data-driven brand strategies",
      image: "/images/project-reference/digital2.jpg",
      fullDescription:
        "ChatBox BrandMonitor AI Studio delivers comprehensive brand sentiment analysis across 17 digital platforms in real-time. The system processes over 5 million consumer interactions daily, identifying emerging trends and potential reputation issues before they escalate. This solution has provided Fortune 500 clients with actionable insights that have measurably improved brand perception metrics by an average of 23%.",
    },
    {
      id: 3,
      title: "Tradisco Multinational Cloud Connect",
      description:
        "Secure digital workspace for cross-border project collaboration",
      image: "/images/project-reference/digital3.jpg",
      fullDescription:
        "Tradisco Multinational Cloud Connect provides a secure, enterprise-grade collaboration environment specifically designed for international trading operations. The platform includes robust document control, multi-language support, and compliance tracking across diverse regulatory environments. This solution has shortened contract negotiation cycles by 56% while strengthening security protocols for sensitive commercial information.",
    },
    {
      id: 4,
      title: "Video Engineered Intelligence Service",
      description:
        "Orchestrating brand growth with intelligent, predictive technology for high-end corporate communication strategy.",
      image: "/images/video-engineered.jpg",
      fullDescription:
        "Video Engineered Intelligence Service leverages advanced machine learning algorithms to analyze and optimize corporate video communications. The system automatically identifies audience engagement patterns and recommends content optimization strategies based on performance metrics. Our enterprise clients have seen a 67% increase in message retention and a 43% improvement in call-to-action conversion rates.",
      isMultimedia: true,
      gallery: [
        {
          type: "image",
          url: "/images/project-reference/malioboro1.jpg",
          caption: "Audience engagement heat mapping",
        },
        {
          type: "video",
          url: "/videos/video-engineered.mp4",
          thumbnail: "/images/video-engineered-1.png",
          caption: "Video patra malioboro",
        },
        {
          type: "video",
          url: "/videos/video-engineered-2.mp4",
          thumbnail: "/images/video-engineered-2.png",
          caption: "Behind the scene- Vision Lab Branding Studio",
        },
        {
          type: "video",
          url: "/videos/video-engineered-3.mp4",
          thumbnail: "/images/video-engineered-3.png",
          caption: "Promotional Product Warehaus Workhshop",
        },
        {
          type: "video",
          url: "/videos/video-engineered-4.mp4",
          thumbnail: "/images/video-engineered-4.png",
          caption: "Customer shoot - Industrial Client Kleemann",
        },
        {
          type: "video",
          url: "/videos/chatbox-jumper.mp4",
          thumbnail: "/images/chatbox-jumper.png",
          caption: "Chatbox Jumper Broadcast Campaign Teaser",
        },
        {
          type: "video",
          url: "/videos/ramadhan.mp4",
          thumbnail: "/images/ramadhan.png",
          caption: "Ramadhan Reflection : The Spirit of Giving for Vidya Citra",
        },
      ],
    },
    {
      id: 5,
      title: "ESG Performance Dashboard System",
      description:
        "Monitoring carbon data for sustainable compliance and reporting",
      image: "/images/project-reference/digital5.jpg",
      fullDescription:
        "The ESG Performance Dashboard System provides comprehensive environmental impact tracking and reporting tools designed for global regulatory compliance. The solution automates data collection from disparate sources, calculates carbon footprint metrics, and generates both technical and executive-level reports. Organizations using this system have streamlined their sustainability reporting processes while identifying opportunities for meaningful emissions reductions.",
    },
    {
      id: 6,
      title: "AI Document Verification Engine",
      description:
        "Automating legal and technical validation for global contracts",
      image: "/images/project-reference/digital6.jpg",
      fullDescription:
        "Our AI Document Verification Engine automates the inspection and validation of complex legal and technical documents used in international business operations. The system can process documents in 14 languages, identifying inconsistencies, compliance issues, and potential legal vulnerabilities with 97% accuracy. This solution has reduced document review cycles by 82% while significantly improving risk management outcomes.",
    },
  ],
  construction: [
    {
      id: 1,
      title: "Green Modular Tower Project",
      description:
        "Building low-carbon skyscrapers using prefabricated technologies",
      image: "/images/project-reference/construction1.jpg",
      fullDescription:
        "The Green Modular Tower Project pioneers sustainable high-rise construction through advanced prefabrication methodologies and low-carbon materials. This innovative approach reduces construction waste by 76% and overall carbon footprint by 43% compared to traditional building methods. The modular design incorporates passive cooling systems and integrated renewable energy generation to minimize operational environmental impact throughout the building lifecycle.",
    },
    {
      id: 2,
      title: "Smart Building Automation Initiative",
      description:
        "Deploying IBMS for commercial properties across Southeast Asia",
      image: "/images/project-reference/construction2.jpg",
      fullDescription:
        "Our Smart Building Automation Initiative implements comprehensive Intelligent Building Management Systems (IBMS) across commercial real estate portfolios in major Southeast Asian urban centers. These systems integrate HVAC, lighting, security, and access control through a unified digital platform, resulting in energy consumption reductions of 31% and operational cost savings of 27%. The solution includes predictive maintenance capabilities and occupancy optimization algorithms.",
    },
    {
      id: 3,
      title: "Transit-Oriented Urban Redevelopment",
      description:
        "Revitalizing districts through walkability and digital infrastructure",
      image: "/images/project-reference/construction3.jpg",
      fullDescription:
        "The Transit-Oriented Urban Redevelopment project transforms deteriorating urban areas into vibrant, connected communities centered around public transportation hubs. This holistic approach integrates residential, commercial, and recreational spaces with smart city technologies including public WiFi, environmental monitoring, and interactive information systems. The initiative has successfully increased property values, reduced carbon emissions, and created new economic opportunities in previously underutilized districts.",
    },
    {
      id: 4,
      title: "EU Industrial Site Partnership",
      description:
        "Advising on engineering excellence in European construction zones",
      image: "/images/project-reference/construction4.jpg",
      fullDescription:
        "Our EU Industrial Site Partnership provides comprehensive advisory services for the development of advanced manufacturing facilities that meet European environmental and safety standards. The program includes specialized engineering consultation, regulatory navigation, and construction quality assurance. We've successfully guided the development of over 15 major industrial sites across 5 European countries, ensuring full compliance with both current regulations and emerging sustainability requirements.",
    },
    {
      id: 5,
      title: "Digital Twin for Energy Efficiency",
      description:
        "Virtual energy optimization system for smart building operations",
      image: "/images/project-reference/digital4.jpg",
      fullDescription:
        "The Digital Twin for Energy Efficiency creates sophisticated virtual models of physical buildings to optimize energy consumption and operational efficiency. These digital replicas simulate various environmental conditions and usage scenarios to identify optimization opportunities before implementation. The system continues to collect real-time data throughout the building lifecycle, enabling continuous improvement and adaptation to changing requirements or conditions.",
    },
    {
      id: 6,
      title: "Cross-Border Talent Upskilling Initiative",
      description:
        "Advancing workforce skills via international construction exchange",
      image: "/images/project-reference/construction6.jpg",
      fullDescription:
        "Our Cross-Border Talent Upskilling Initiative facilitates knowledge transfer and professional development through strategic exchange programs between European and Southeast Asian construction teams. This program combines practical hands-on experience with formal technical training in advanced construction methodologies. Participants gain valuable international experience while organizations benefit from enhanced technical capabilities and cross-cultural collaboration skills.",
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
  const [activeTab, setActiveTab] = useState("digital");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [activeModal, setActiveModal] = useState(null);

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

  // Handle project click to show modal
  const handleProjectClick = (project) => {
    setActiveModal(project);
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
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-20">
        Project Reference
      </h1>

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
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
            />
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

      {/* Detail Modal - Similar to ModernBusinessCarousel */}
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
              <div className="flex flex-col h-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b">
                  <h3 className="text-xl font-bold text-green-700">
                    {activeModal.title}
                  </h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto">
                  {activeModal.isMultimedia ? (
                    <MultimediaGallery project={activeModal} />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
                      <div className="order-2 md:order-1">
                        <div className="prose prose-green prose-img:rounded-lg prose-headings:text-green-700">
                          <p>
                            {activeModal.fullDescription ||
                              activeModal.description}
                          </p>
                        </div>
                      </div>

                      <div className="order-1 md:order-2">
                        <img
                          src={activeModal.image}
                          alt={activeModal.title}
                          className="w-full h-[200px] sm:h-[300px] object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeProject;
