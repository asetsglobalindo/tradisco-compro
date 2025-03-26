"use client";
import React, { useEffect, useState } from "react";
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
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Hardcoded navigation data with section IDs
const hardcodedNavItems = [
  {
    _id: "nav1",
    name: "Home",
    route: "#banner",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav2",
    name: "About Us",
    route: "#about-us",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav3",
    name: "Global Presence",
    route: "#global-presence",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav4",
    name: "Partners",
    route: "#our-partners",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav5",
    name: "News",
    route: "#news",
    isScroll: true,
    childs: [],
  },
  {
    _id: "nav6",
    name: "Contact",
    route: "/contact",
    isScroll: false,
    childs: [],
  },
];

// Helper function for smooth scrolling with a more reliable approach
// Replace the scrollToSection function in your Header.jsx file
const scrollToSection = (e: any, sectionId: any) => {
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
  // This doesn't affect the scroll behavior
  window.history.pushState(null, null, `#${id}`);
};

interface NavItemProps {
  data: {
    name: string;
    route: string;
    isScroll?: boolean;
    childs: any[];
  };
  side?: "left" | "right" | "bottom" | "top";
  color?: string;
}

// This replaces the NavItem component in your Header.jsx
const NavItem = ({ data, side = "bottom", color }: any) => {
  const ui = uiStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  // For scroll navigation
  if (data.isScroll) {
    return (
      <a
        href={data.route}
        onClick={(e) => {
          e.preventDefault();

          // Remove the # symbol if it exists
          const id = data.route.startsWith("#")
            ? data.route.substring(1)
            : data.route;
          const element = document.getElementById(id);

          if (!element) return;

          // Get header
          const headerElement = document.querySelector("header");
          const headerHeight = headerElement
            ? headerElement.getBoundingClientRect().height
            : 80;

          // Calculate position with fixed offset
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
        }}
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
            xmlns="https://www.w3.org/2000/svg"
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
          xmlns="https://www.w3.org/2000/svg"
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
          {data.childs.map((route: any) => (
            <div key={route.name}>
              {route?.childs?.length ? (
                <React.Fragment>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem className="border-none" value="item-1">
                      <AccordionTrigger className="w-full no-underline hover:no-underline leading-none font-normal text-sm rounded-md hover:bg-green-light/40 px-2 py-1">
                        {route.name}
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 ml-4 mt-1">
                        {route.childs.map((item: any, index: number) => (
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
                </React.Fragment>
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
};
interface NavItemMobileProps {
  data: {
    name: string;
    route: string;
    isScroll?: boolean;
    childs: any[];
  };
  index: number;
}

const NavItemMobile: React.FC<NavItemMobileProps> = ({ data, index }) => {
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
            href={data.route}
            onClick={(e) => {
              scrollToSection(e, data.route);
              // Close drawer if needed - you might need to pass the drawer state setter here
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
            className={"w-4 transition-all absolute -right-5"}
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
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
          {data.childs?.map((route: any) => (
            <section
              key={route.name}
              className="flex flex-col space-y-4 text-center"
            >
              {route.childs.length ? (
                route.childs.map((child: any) => (
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
};

// Top Info Bar component
const TopInfoBar: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full bg-black/50 text-white overflow-hidden relative z-20"
        >
          <div className="container py-2">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-6">
                <a
                  href="https://maps.app.goo.gl/your-location"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
                >
                  <MapPin size={14} />
                  <span className="hidden sm:inline">
                    Jl. M.T. Haryono, Jakarta 12950
                  </span>
                </a>

                <a
                  href="mailto:contact@tradisco.com"
                  className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
                >
                  <Mail size={14} />
                  <span className="hidden sm:inline">contact@tradisco.com</span>
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="tel:+6221123456"
                  className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
                >
                  <Phone size={14} />
                  <span className="hidden sm:inline">+62 21 1234 567</span>
                </a>

                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs hover:text-opacity-80 transition-colors"
                >
                  <MessageCircle size={14} />
                  <span className="hidden sm:inline">+62 812 3456 7890</span>
                </a>

                <div className="flex items-center space-x-3">
                  <a
                    href="https://instagram.com/tradisco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-opacity-80 transition-colors"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href="https://youtube.com/tradisco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-opacity-80 transition-colors"
                  >
                    <Youtube size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header: React.FC = () => {
  const ui = uiStore((state) => state);
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Use hardcoded header data
  const header = hardcodedNavItems;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      updateActiveSection();
    };

    // Check which section is currently in view
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Find all section elements and determine which one is in view
      const sections = [
        document.getElementById("home"),
        document.getElementById("about-us"),
        document.getElementById("global-presence"),
        document.getElementById("our-partners"),
        document.getElementById("news"),
      ];

      // Filter out null sections (in case some aren't on the page)
      const validSections = sections.filter((section) => section !== null);

      if (validSections.length > 0) {
        for (let i = validSections.length - 1; i >= 0; i--) {
          const section = validSections[i];
          if (!section) continue;

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
    };

    // Listen for the custom event from HomeBanner
    const handleSetHeaderColor = (event: CustomEvent) => {
      const { color } = event.detail;
      // Only update if needed based on scroll position
      if (!isScrolled && color === "white") {
        ui.setHeaderColor("white");
      } else if (isScrolled || color === "black") {
        ui.setHeaderColor("black");
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener(
      "set-header-color",
      handleSetHeaderColor as EventListener
    );

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener(
        "set-header-color",
        handleSetHeaderColor as EventListener
      );
    };
  }, [isScrolled, ui]);

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
    <motion.header
      layout
      className={cn("fixed top-0 w-full z-50", {
        "text-white": isTransparent,
        "text-black bg-white shadow-sm": !isTransparent,
      })}
    >
      {/* Top Info Bar - only visible when header is transparent */}
      <TopInfoBar isVisible={isTransparent} />

      {/* Main Header */}
      <motion.div
        layout
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
          <motion.div
            layout
            className="flex justify-between items-center"
            style={{ height: isTransparent ? 80 : 64 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Home icon and Navigation */}
            <div className="flex items-center space-x-6">
              <Link href="#home" className="text-current">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7281 0.953614C11.377 0.680505 10.9449 0.532227 10.5001 0.532227C10.0553 0.532227 9.62319 0.680505 9.2721 0.953614L0.888104 7.47361C0.136104 8.06061 0.550104 9.26561 1.5031 9.26561H2.5001V17.2656C2.5001 17.796 2.71082 18.3048 3.08589 18.6798C3.46096 19.0549 3.96967 19.2656 4.5001 19.2656H8.5001V13.2656C8.5001 12.7352 8.71082 12.2265 9.08589 11.8514C9.46096 11.4763 9.96967 11.2656 10.5001 11.2656C11.0305 11.2656 11.5392 11.4763 11.9143 11.8514C12.2894 12.2265 12.5001 12.7352 12.5001 13.2656V19.2656H16.5001C17.0305 19.2656 17.5392 19.0549 17.9143 18.6798C18.2894 18.3048 18.5001 17.796 18.5001 17.2656V9.26561H19.4971C20.4491 9.26561 20.8651 8.06061 20.1121 7.47461L11.7281 0.953614Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>

              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  {header.slice(1).map((route) => (
                    <li
                      key={route.name}
                      className={cn("relative", {
                        "font-semibold":
                          route.isScroll &&
                          activeSection === route.route.substring(1),
                      })}
                    >
                      <NavItem data={route} color="currentColor" />
                      {route.isScroll &&
                        activeSection === route.route.substring(1) && (
                          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-current"></div>
                        )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Logo on right side */}
            <Link href="/">
              <motion.img
                className={cn("h-6 w-auto transition-all duration-300", {
                  "brightness-0 invert": isTransparent, // This makes the logo white when header is transparent
                })}
                src="/logo/logo.png" // Only need one logo file now
                alt="tradisco-logo"
                style={{ scale: isTransparent ? 1.55 : 1.2 }}
                whileHover={{ scale: 1.55 }}
                transition={{ duration: 0.2 }}
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
                  xmlns="https://www.w3.org/2000/svg"
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
                  <img className="w-40" src={"/logo/logo.png"} alt="close" />
                  <DrawerClose>
                    <X />
                  </DrawerClose>
                </section>

                <Accordion className="mt-16" type="single" collapsible>
                  {header?.map((route, index) => (
                    <NavItemMobile key={route._id} index={index} data={route} />
                  ))}
                </Accordion>
              </DrawerContent>
            </Drawer>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
