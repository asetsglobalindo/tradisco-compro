import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { HomeType } from "@/types/indes";
import JSCookie from "js-cookie";
import { ArrowRight, X } from "lucide-react";
import uiStore from "@/app/store/uiStore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface HomeBannerProps {
  data: HomeType | undefined;
}

const HomeBanner: React.FC<HomeBannerProps> = ({ data }) => {
  const lang = JSCookie.get("lang") || "id";
  const [activeIndex, setActiveIndex] = useState(0);
  const { setHeaderColor } = uiStore();
  const isInitialMount = useRef(true);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Set header color on mount with proper cleanup
  useEffect(() => {
    if (isInitialMount.current) {
      setHeaderColor("white");
      isInitialMount.current = false;
    }

    // Clean up when component unmounts
    return () => {
      isInitialMount.current = true;
    };
  }, [setHeaderColor]);

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Extract firstName from email
  const extractNameFromEmail = (email: string): string => {
    if (!email || !email.includes("@")) return "";

    // Get the part before @ symbol
    const username = email.split("@")[0];

    // Clean up the username
    const cleanedUsername = username
      .replace(/[0-9_.-]/g, " ") // Replace numbers and special chars with space
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim(); // Trim spaces from start and end

    // Capitalize first letter of each word
    if (cleanedUsername) {
      return cleanedUsername
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return username; // If cleaning didn't work, return original username
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Auto-generate firstName from email
    if (newEmail && !firstName) {
      setFirstName(extractNameFromEmail(newEmail));
    }

    // Reset status when user types
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage("");
    }
  };

  // Handle form submission
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setSubmitStatus("error");
      setErrorMessage("Email tidak boleh kosong");
      return;
    }

    if (!isValidEmail(email)) {
      setSubmitStatus("error");
      setErrorMessage("Format email tidak valid");
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    try {
      // Google Sheets Web App URL - deployed as web app from Google Script
      // Make sure this URL is updated to your new script's URL
      const GOOGLE_SHEET_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxncsFHRcmd70hL9nUH4Yk54Rq6jVdGPduKQmVBc3rgqmHhaN58qQJpx_vv6ZULba86/exec";

      // Current date for tracking when user subscribes
      const subscribeDate = new Date().toISOString();

      // Send data to Google Sheets
      await fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires no-cors mode
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName, // Include firstName field
          email: email,
          tanggal: subscribeDate, // Changed from 'date' to 'tanggal'
          source: "Website Tradisco",
        }),
      });

      // Since no-cors mode doesn't provide a readable response,
      // we assume success if no error is thrown

      // Show success message
      setSubmitStatus("success");
      setEmail(""); // Clear the email input
      setFirstName(""); // Clear the firstName input
      setShowSuccessPopup(true); // Show the success popup
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubmitStatus("error");
      setErrorMessage("Gagal mendaftarkan email, silakan coba lagi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  // Early return for loading state
  if (!data?.banner?.length) {
    return (
      <section className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="container text-white text-center">
          <h1 className="text-xl">Loading banner content...</h1>
        </div>
      </section>
    );
  }

  // Helper function for pagination numbering
  const formatPaginationNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  // Handle button click directly without event propagation issues
  const handleContinueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop propagation to prevent event bubbling
    closeSuccessPopup();
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Background overlay with blur effect */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
            onClick={closeSuccessPopup}
          ></div>

          {/* Popup content */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative z-10 overflow-hidden border border-gray-100">
            {/* Close button */}
            <button
              onClick={closeSuccessPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 shadow-md transition-all duration-200 hover:scale-110 z-20"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Top decoration - colorful banner */}
            <div className="h-3 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Content */}
            <div className="pt-14 pb-12 px-10 text-center relative">
              {/* Celebration icon */}
              <div className="mx-auto mb-6 w-28 h-28 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-6xl animate-bounce-subtle">🎉</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
                Congratulations!
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                You&apos;ve successfully subscribed. You will receive emails
                from us soon.
              </p>

              {/* Fixed continue button with better positioning and event handling */}
              <button
                onClick={handleContinueClick}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-full hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex mx-auto items-center justify-center relative z-30"
                style={{ position: "relative", zIndex: 30 }}
              >
                <span>Continue</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Confetti decoration elements with reduced z-index to avoid blocking interactions */}
            <div
              className="absolute -bottom-10 -left-10 w-full h-72"
              style={{ zIndex: 5, pointerEvents: "none" }}
            >
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-sm opacity-70`}
                  style={{
                    backgroundColor: [
                      "#FF5252",
                      "#FFD740",
                      "#64FFDA",
                      "#448AFF",
                      "#E040FB",
                      "#00E676",
                      "#FF6E40",
                    ][i % 7],
                    width: `${8 + Math.random() * 15}px`,
                    height: `${8 + Math.random() * 15}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `float-${i % 3} ${
                      3 + Math.random() * 5
                    }s infinite ease-in-out`,
                    pointerEvents: "none", // Ensure confetti doesn't block clicks
                  }}
                ></div>
              ))}
            </div>

            {/* Add floating animation styles */}
            <style jsx>{`
              @keyframes float-0 {
                0%,
                100% {
                  transform: translateY(0) rotate(0deg);
                }
                50% {
                  transform: translateY(-20px) rotate(10deg);
                }
              }
              @keyframes float-1 {
                0%,
                100% {
                  transform: translateY(0) rotate(0deg);
                }
                50% {
                  transform: translateY(-15px) rotate(-10deg);
                }
              }
              @keyframes float-2 {
                0%,
                100% {
                  transform: translateY(0) rotate(0deg);
                }
                50% {
                  transform: translateY(-25px) rotate(15deg);
                }
              }
              @keyframes bounce-subtle {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
              .animate-bounce-subtle {
                animation: bounce-subtle 3s infinite ease-in-out;
              }
            `}</style>
          </div>
        </div>
      )}

      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".banner-pagination",
          type: "bullets",
          renderBullet: (_, className) =>
            `<span class="${className}"><em></em><i></i><b></b></span>`,
        }}
        slidesPerView={1}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full"
      >
        {data.banner.map((banner) => (
          <SwiperSlide className="w-full h-full relative" key={banner._id}>
            {/* Image container with proper aspect ratio handling */}
            <div className="absolute inset-0 w-full h-full">
              <picture>
                {/* Desktop image */}
                <source
                  media="(min-width:768px)"
                  srcSet={banner?.images[0]?.url}
                />
                {/* Mobile image with proper alt text */}
                <img
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(80%)" }}
                  src={banner?.images_mobile[0]?.url}
                  alt={banner?.title || "Banner image"}
                  loading="eager" // First image loads immediately
                />
              </picture>
              {/* Additional overlay for better text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter"></div>
            </div>
            {/* Content overlay with proper semantic structure */}
            <div className="relative h-full w-full z-10 flex flex-col items-center justify-center">
              <div className="container text-white">
                <p
                  className="uppercase text-white text-center text-2xl font-bold"
                  style={{ color: "#A3BB29" }}
                >
                  Tradisco Global Inovasi
                </p>
                <h1 className="title-2 leading-tight mx-auto uppercase font-bold text-shadow-lg text-center sm:w-1/2">
                  Trading Digital And Construction
                </h1>

                {/* Email subscription form with form handling */}
                <form
                  onSubmit={handleSubscribe}
                  className="mt-6 flex flex-col items-center max-w-md mx-auto"
                >
                  <div className="w-full">
                    <div className="flex w-full">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        className="px-4 py-2 w-full border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                        aria-label="Email address"
                        disabled={isSubmitting}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className={`px-4 py-2 bg-orange-500 text-white font-medium rounded-r hover:bg-orange-600 transition duration-200 ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        aria-label="Subscribe"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Subscribe"}
                      </button>
                    </div>

                    {/* Hidden firstName field - automatically generated from email */}
                    <input type="hidden" value={firstName} aria-hidden="true" />
                  </div>

                  {/* Status messages */}
                  {submitStatus === "error" && (
                    <div className="mt-2 text-red-400 text-sm">
                      {errorMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination section with improved accessibility */}
      <div className="absolute bottom-10 z-40 container left-1/2 -translate-x-1/2 text-white">
        {data.banner[activeIndex]?.button_name && (
          <p className="uppercase">{data.banner[activeIndex].button_name}</p>
        )}
        <div
          className="banner-pagination flex gap-2 mt-4"
          role="navigation"
          aria-label="Banner navigation"
        ></div>
        <p className="mt-4" aria-live="polite">
          {formatPaginationNumber(activeIndex + 1)} /{" "}
          {formatPaginationNumber(data.banner.length)}
        </p>
      </div>
    </section>
  );
};

export default HomeBanner;
