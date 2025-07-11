"use client";
import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import uiStore from "@/app/store/uiStore";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Youtube,
  MessageCircle,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Hardcoded navigation data with section IDs
const NAV_ITEMS = [
  {
    _id: "nav1",
    name: "Home",
    route: "/",
    homeScrollId: "#banner",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav2",
    name: "About Us",
    route: "/",
    homeScrollId: "#about-us",
    isScroll: true,
    childs: [],
  },
  {
    _id: "our-business",
    name: "Our Business",
    route: "/",
    homeScrollId: "#our-business",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav3",
    name: "Global Presence",
    route: "/",
    homeScrollId: "#global-presence",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav4",
    name: "Partners",
    route: "/",
    homeScrollId: "#our-partners",
    isScroll: true,
    childs: [],
  },
  {
    _id: "project-reference",
    name: "Project Reference",
    route: "/",
    homeScrollId: "#project-reference",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav5",
    name: "News",
    route: "/",
    homeScrollId: "#news",
    isScroll: true,
    childs: [],
  },
  {
    _id: "order",
    name: "Order",
    route: "/order",
    // homeScrollId: "",
    isScroll: false,
    childs: [],
  },
];

// Contact information constants
const CONTACT_INFO = {
  email: "team@tradisco.co.id",
  phone: "+62 895-4046-02222",
  whatsapp: "+62 895-4046-02222",
  address: "Jl. M.T. Haryono, Jakarta 12950",
};

// Helper function for smooth scrolling with a more reliable approach
const scrollToSection = (e, sectionId) => {
  e.preventDefault();

  // Remove the # symbol if it exists
  const id = sectionId.startsWith("#") ? sectionId.substring(1) : sectionId;
  const element = document.getElementById(id);

  if (!element) return;

  // Get current header height
  const headerElement = document.querySelector("header");
  const headerHeight = headerElement
    ? headerElement.getBoundingClientRect().height
    : 80;

  // Calculate position with offset
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition =
    elementPosition + window.pageYOffset - headerHeight - 20;

  // Perform the scroll
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });

  // Update URL hash for bookmarking (optional)
  window.history.pushState(null, null, `#${id}`);
};

// Function to handle navigation from non-home pages to home page sections
const handleNavigation = (e, path, data, router) => {
  e.preventDefault();

  // If we're already on the homepage, just scroll
  if (path === "/") {
    scrollToSection(e, data.homeScrollId);
    return;
  }

  // Save state before navigation
  // Store exact target scroll position for more reliable scrolling
  const targetId = data.homeScrollId.startsWith("#")
    ? data.homeScrollId.substring(1)
    : data.homeScrollId;

  localStorage.setItem("scrollToSection", targetId);

  // Navigate directly to the home page with specific URL hash
  router.push(`/${data.homeScrollId}`);
};

// Memoized NavItem component for better performance
const NavItem = memo(({ data, side = "bottom", color }) => {
  const ui = uiStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  // For scroll navigation
  if (data.isScroll) {
    return (
      <a
        href={path === "/" ? data.homeScrollId : data.route}
        onClick={(e) => handleNavigation(e, path, data, router)}
        className="cursor-pointer"
      >
        {data.name}
      </a>
    );
  }

  // For non-scroll routes without children
  if (!data.childs.length) {
    return (
      <Link href={data.route}>
        {data.name.toLowerCase() === "home" ? (
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7281 0.953614C11.377 0.680505 10.9449 0.532227 10.5001 0.532227C10.0553 0.532227 9.62319 0.680505 9.2721 0.953614L0.888104 7.47361C0.136104 8.06061 0.550104 9.26561 1.5031 9.26561H2.5001V17.2656C2.5001 17.796 2.71082 18.3048 3.08589 18.6798C3.46096 19.0549 3.96967 19.2656 4.5001 19.2656H8.5001V13.2656C8.5001 12.7352 8.71082 12.2265 9.08589 11.8514C9.46096 11.4763 9.96967 11.2656 10.5001 11.2656C11.0305 11.2656 11.5392 11.4763 11.9143 11.8514C12.2894 12.2265 12.5001 12.7352 12.5001 13.2656V19.2656H16.5001C17.0305 19.2656 17.5392 19.0549 17.9143 18.6798C18.2894 18.3048 18.5001 17.796 18.5001 17.2656V9.26561H19.4971C20.4491 9.26561 20.8651 8.06061 20.1121 7.47461L11.7281 0.953614Z"
              fill={ui.headerColor}
            />
          </svg>
        ) : (
          data.name
        )}
      </Link>
    );
  }

  // For dropdown menus
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex items-center space-x-1">
        <span className="inline-block leading-none">{data.name}</span>
        <svg
          className={cn(
            {
              "rotate-180": isOpen && side === "bottom",
              "rotate-[-90deg]": side === "right",
            },
            "w-4 transition-all"
          )}
          width="9"
          height="5"
          viewBox="0 0 9 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.70665 0.430832H4.33207H1.29332C0.773319 0.430832 0.513319 1.05917 0.881653 1.4275L3.68749 4.23333C4.13707 4.68291 4.86832 4.68291 5.3179 4.23333L6.38499 3.16625L8.12374 1.4275C8.48665 1.05917 8.22665 0.430832 7.70665 0.430832Z"
            fill={color || ui.headerColor}
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        className="min-w-28 relative flex z-[99999] w-64"
        sideOffset={20}
        align="start"
      >
        <section className="flex flex-col w-full space-y-1">
          {data.childs.map((route) => (
            <div key={route.name}>
              {route?.childs?.length ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem className="border-none" value="item-1">
                    <AccordionTrigger className="w-full no-underline hover:no-underline leading-none font-normal text-sm rounded-md hover:bg-green-light/40 px-2 py-1">
                      {route.name}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 ml-4 mt-1">
                      {route.childs.map((item, index) => (
                        <Link
                          key={item.name + index}
                          className="w-full block hover:bg-green-light/40 px-2 py-1 rounded-md"
                          href={item.route}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  className="w-full block hover:bg-green-light/40 px-2 py-1 rounded-md"
                  href={route.route}
                >
                  {route.name}
                </Link>
              )}
            </div>
          ))}
        </section>
      </PopoverContent>
    </Popover>
  );
});

NavItem.displayName = "NavItem";

// Memoized NavItemMobile component for better performance
const NavItemMobile = memo(({ data, index }) => {
  const path = usePathname();
  const router = useRouter();

  // For scroll navigation in mobile
  if (data.isScroll) {
    return (
      <AccordionItem
        value={`route-${index}`}
        key={`${data.name}-${index}`}
        className="nav-mobile-accordion-item"
      >
        <AccordionTrigger className="text-center flex justify-center flex-none mx-auto relative">
          <a
            href={path === "/" ? data.homeScrollId : data.route}
            onClick={(e) => {
              if (path === "/") {
                scrollToSection(e, data.homeScrollId);
              } else {
                e.preventDefault();
                localStorage.setItem("scrollToSection", data.homeScrollId);
                router.push("/");
              }
            }}
            className="w-full cursor-pointer"
          >
            {data.name}
          </a>
        </AccordionTrigger>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem
      value={`route-${index}`}
      key={`${data.name}-${index}`}
      className="nav-mobile-accordion-item"
    >
      <AccordionTrigger className="text-center flex justify-center flex-none mx-auto relative">
        {data.childs?.length ? (
          <div className="w-fit flex justify-center items-center relative">
            <span className="text-center ">{data.name}</span>
          </div>
        ) : (
          <Link href={data.route} className="w-full">
            {data.name}
          </Link>
        )}

        {data.childs?.length ? (
          <svg
            className="w-4 transition-all absolute -right-5"
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.70665 0.430832H4.33207H1.29332C0.773319 0.430832 0.513319 1.05917 0.881653 1.4275L3.68749 4.23333C4.13707 4.68291 4.86832 4.68291 5.3179 4.23333L6.38499 3.16625L8.12374 1.4275C8.48665 1.05917 8.22665 0.430832 7.70665 0.430832Z"
              fill="black"
            />
          </svg>
        ) : null}
      </AccordionTrigger>
      <AccordionContent>
        <section className="flex flex-col space-y-4 text-center">
          {data.childs?.map((route) => (
            <section
              key={route.name}
              className="flex flex-col space-y-4 text-center"
            >
              {route.childs.length ? (
                route.childs.map((child) => (
                  <Link
                    className="hover:text-green-light hover:underline"
                    key={child.name}
                    href={child.route}
                  >
                    {child.name}
                  </Link>
                ))
              ) : (
                <Link
                  className="hover:text-green-light hover:underline"
                  href={route.route}
                >
                  {route.name}
                </Link>
              )}
            </section>
          ))}
        </section>
      </AccordionContent>
    </AccordionItem>
  );
});

NavItemMobile.displayName = "NavItemMobile";

// Extract TopInfoBar as a separate memoized component
const TopInfoBar = memo(({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-black/50 text-white overflow-hidden relative z-20">
      <div className="container py-2">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href="https://www.google.co.id/maps/place/Menara+Palma/@-6.2268668,106.8308398,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f3f1da7a4369:0x2421b19a6801489c!8m2!3d-6.2268668!4d106.8334201!16s%2Fg%2F1thvk71t?entry=ttu&g_ep=EgoyMDI1MDQwOC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
            >
              <MapPin size={14} />
              <span className="hidden sm:inline">{CONTACT_INFO.address}</span>
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
            >
              <Mail size={14} />
              <span className="hidden sm:inline">{CONTACT_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
            >
              <Phone size={14} />
              <span className="hidden sm:inline">{CONTACT_INFO.phone}</span>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=62895404602222"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
            >
              <MessageCircle size={14} />
              <span className="hidden sm:inline">{CONTACT_INFO.whatsapp}</span>
            </a>

            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com/tradisco.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-opacity-80 transition-colors"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://www.linkedin.com/company/trading-digital-and-construction"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-opacity-80 transition-colors"
              >
                <LinkedinIcon size={14} />
              </a>
              {/* <a
                href="https://youtube.com/tradisco"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-opacity-80 transition-colors"
              >
                <Youtube size={14} />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TopInfoBar.displayName = "TopInfoBar";

// Main Header Component
const Header = () => {
  const ui = uiStore((state) => state);
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();

  // Memoized function to update active section
  const updateActiveSection = useCallback(() => {
    if (path !== "/") return;

    const scrollPosition = window.scrollY + 150; // Offset for header

    // Find all section elements and determine which one is in view
    const sectionIds = [
      "banner",
      "about-us",
      "our-business",
      "global-presence",
      "our-partners",
      "project-reference",
      "news",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length > 0) {
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;

        if (scrollPosition >= sectionTop) {
          setActiveSection(section.id);
          break;
        }
      }

      // If we're at the top, no section is active
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    }
  }, [path]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only check active section on homepage
      if (path === "/") {
        updateActiveSection();
      }
    };

    // Listen for the custom event from HomeBanner
    const handleSetHeaderColor = (event) => {
      const { color } = event.detail;
      // Only update if needed based on scroll position
      if (!isScrolled && color === "white") {
        ui.setHeaderColor("white");
      } else if (isScrolled || color === "black") {
        ui.setHeaderColor("black");
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("set-header-color", handleSetHeaderColor);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("set-header-color", handleSetHeaderColor);
    };
  }, [isScrolled, ui, path, updateActiveSection]);

  // Handle stored scroll position for navigation between pages
  useEffect(() => {
    // Only run this once when component mounts and we're on homepage
    if (path === "/") {
      const storedSection = localStorage.getItem("scrollToSection");

      if (storedSection) {
        // Clear the storage first to prevent future unintended scrolls
        localStorage.removeItem("scrollToSection");

        // Temporarily disable scroll event listeners to prevent header interference
        const originalScrollHandler = window.onscroll;
        window.onscroll = null;

        // Set a very short timeout to ensure the DOM is ready
        setTimeout(() => {
          const id = storedSection.startsWith("#")
            ? storedSection.substring(1)
            : storedSection;

          const element = document.getElementById(id);

          if (element) {
            // Force UI state to accommodate scroll
            ui.setHeaderColor("black"); // Force header to solid state
            setIsScrolled(true); // Mark as scrolled to keep header solid

            // Get dimensions with fixed header height
            const headerHeight = 64; // Use fixed header height for solid mode

            // Scroll directly to element in one go
            const elementTop =
              element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementTop - headerHeight - 20;

            // Use immediate scroll without animation
            window.scrollTo(0, offsetPosition);

            // Set active section immediately
            setActiveSection(id);

            // Restore scroll handler after a delay
            setTimeout(() => {
              window.onscroll = originalScrollHandler;
            }, 100);
          }
        }, 50); // Very short delay
      }
    }
  }, [path, ui]);

  // Update header color based on page and scroll
  useEffect(() => {
    // Check if the current path is the home page
    const isHomePage = path === "/";

    // Set header color based on scroll position and page
    if (isHomePage) {
      // On homepage, header starts transparent with white text and becomes solid with black text on scroll
      ui.setHeaderColor(isScrolled ? "black" : "white");
    } else {
      // On other pages, header is always solid with black text
      ui.setHeaderColor("black");
    }

    setIsOpen(false);
  }, [path, isScrolled, ui]);

  const isTransparent = ui.headerColor === "white";

  return (
    <header
      className={cn("fixed top-0 w-full z-50", {
        "text-white": isTransparent,
        "text-black bg-white shadow-sm": !isTransparent,
      })}
    >
      {/* Top Info Bar - only visible when header is transparent */}
      <TopInfoBar isVisible={isTransparent} />

      {/* Main Header */}
      <div
        className={cn("transition-colors duration-300", {
          "bg-transparent": isTransparent,
          "bg-white": !isTransparent,
        })}
      >
        {/* Overlay for transparent header */}
        {isTransparent && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-none" />
        )}

        <div className="container relative z-10">
          <div
            className="flex justify-between items-center transition-all duration-300"
            style={{ height: isTransparent ? 80 : 64 }}
          >
            {/* Home icon and Navigation */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-current">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7281 0.953614C11.377 0.680505 10.9449 0.532227 10.5001 0.532227C10.0553 0.532227 9.62319 0.680505 9.2721 0.953614L0.888104 7.47361C0.136104 8.06061 0.550104 9.26561 1.5031 9.26561H2.5001V17.2656C2.5001 17.796 2.71082 18.3048 3.08589 18.6798C3.46096 19.0549 3.96967 19.2656 4.5001 19.2656H8.5001V13.2656C8.5001 12.7352 8.71082 12.2265 9.08589 11.8514C9.46096 11.4763 9.96967 11.2656 10.5001 11.2656C11.0305 11.2656 11.5392 11.4763 11.9143 11.8514C12.2894 12.2265 12.5001 12.7352 12.5001 13.2656V19.2656H16.5001C17.0305 19.2656 17.5392 19.0549 17.9143 18.6798C18.2894 18.3048 18.5001 17.796 18.5001 17.2656V9.26561H19.4971C20.4491 9.26561 20.8651 8.06061 20.1121 7.47461L11.7281 0.953614Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>

              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  {NAV_ITEMS.slice(1).map((route) => (
                    <li
                      key={route._id}
                      className={cn("relative", {
                        "font-semibold":
                          route.isScroll &&
                          path === "/" &&
                          activeSection === route.homeScrollId?.substring(1),
                      })}
                    >
                      <NavItem data={route} color="currentColor" />
                      {route.isScroll &&
                        path === "/" &&
                        activeSection === route.homeScrollId?.substring(1) && (
                          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-current"></div>
                        )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Logo on right side */}
            <Link href="/">
              <img
                className={cn("h-6 w-auto transition-all duration-300", {
                  "brightness-0 invert": isTransparent, // This makes the logo white when header is transparent
                })}
                src="/logo/logo.png" // Only need one logo file now
                alt="tradisco-logo"
                style={{
                  transform: `scale(${isTransparent ? 1.55 : 1.2})`,
                }}
              />
            </Link>

            {/* Mobile menu trigger */}
            <Drawer
              open={isOpen}
              onOpenChange={setIsOpen}
              direction="right"
              handleOnly
              className="md:hidden"
            >
              <DrawerTrigger
                onClick={() => setIsOpen(true)}
                className="md:hidden"
              >
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.41602 12.4166H16.5827M1.41602 6.99992H16.5827M1.41602 1.58325H16.5827"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </DrawerTrigger>
              <DrawerContent className="h-full rounded-none p-6">
                <DrawerTitle className="hidden">Nav Mobile</DrawerTitle>

                <section className="flex justify-between items-center">
                  <img className="w-40" src="/logo/logo.png" alt="logo" />
                  <DrawerClose>
                    <X />
                  </DrawerClose>
                </section>

                <Accordion className="mt-16" type="single" collapsible>
                  {NAV_ITEMS.map((route, index) => (
                    <NavItemMobile key={route._id} index={index} data={route} />
                  ))}
                </Accordion>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
