"use client";
import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import uiStore from "@/app/store/uiStore";
import {Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger} from "./ui/drawer";
import {X} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./ui/accordion";

const routes = [
  {
    name: "Home",
    href: "/",
    sub_routes: [],
  },
  {
    name: "Bussines",
    href: "/bussines",
    sub_routes: [
      {
        name: "Fuel",
        href: "/bussines/fuel",
      },
      {
        name: "Nonfiel",
        href: "/bussines/nonfuel",
      },
    ],
  },
  {
    name: "Outlet Locator",
    href: "/outlet-locator",
    sub_routes: [],
  },
  {
    name: "Investor Relations",
    href: "/bussines",
    sub_routes: [
      {
        name: "Annual Report",
        href: "/bussines/fuel",
      },
      {
        name: "Sustainability Report",
        href: "/bussines/nonfuel",
      },
      {
        name: "Procurement Report",
        href: "/bussines/nonfuel",
      },
    ],
  },
  {
    name: "News",
    href: "/news",
    sub_routes: [],
  },
  {
    name: "Career",
    href: "/news",
    sub_routes: [],
  },
  {
    name: "About Us",
    href: "/news",
    sub_routes: [],
  },
];

type Route = {
  name: string;
  href: string;
  sub_routes: Omit<Route, "sub_routes">[]; // Recursive type to allow nested sub-routes
};

const NavItem: React.FC<{data: Route}> = ({data}) => {
  const ui = uiStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);

  // for non sub routes
  if (!data.sub_routes.length) {
    return <a href={data.href}>{data.name}</a>;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex items-center space-x-1">
        <span className="inline-block">{data.name}</span>
        <svg
          className={cn({"rotate-180": isOpen}, "w-4 transition-all")}
          width="9"
          height="5"
          viewBox="0 0 9 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.70665 0.430832H4.33207H1.29332C0.773319 0.430832 0.513319 1.05917 0.881653 1.4275L3.68749 4.23333C4.13707 4.68291 4.86832 4.68291 5.3179 4.23333L6.38499 3.16625L8.12374 1.4275C8.48665 1.05917 8.22665 0.430832 7.70665 0.430832Z"
            fill={ui.headerColor}
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-28 relative flex justify-center z-[99999]" sideOffset={20}>
        <div className="absolute -top-6">
          <div className="rotate-180">
            <svg width="40" height="40" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.4332 4.43083H7.05863H4.01988C3.49988 4.43083 3.23988 5.05917 3.60822 5.4275L6.41405 8.23333C6.86363 8.68291 7.59488 8.68291 8.04447 8.23333L9.11155 7.16625L10.8503 5.4275C11.2132 5.05917 10.9532 4.43083 10.4332 4.43083Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <section className="flex flex-col w-fit space-y-2">
          {data.sub_routes.map((route) => (
            <a key={route.name} href={route.href} className="hover:text-green-light hover:underline">
              {route.name}
            </a>
          ))}
        </section>
      </PopoverContent>
    </Popover>
  );
};

const NavItemMobile: React.FC<{data: Route; index: number}> = ({data, index}) => {
  return (
    <AccordionItem value={`route-${index}`} key={`${data.name}-${index}`} className="nav-mobile-accordion-item">
      <AccordionTrigger className="text-center flex justify-center flex-none mx-auto relative">
        {data.sub_routes.length ? (
          <div className="w-fit flex justify-center items-center relative">
            <span className="text-center ">{data.name}</span>
          </div>
        ) : (
          <a href={data.href} className="w-full">
            {data.name}
          </a>
        )}

        {data.sub_routes.length ? (
          <svg
            className={"w-4 transition-all absolute  -right-5"}
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
          {data.sub_routes.map((route) => (
            <a key={route.name} href={route.href} className="hover:text-green-light hover:underline">
              {route.name}
            </a>
          ))}
        </section>
      </AccordionContent>
    </AccordionItem>
  );
};

const Header = () => {
  const ui = uiStore((state) => state);

  return (
    <header
      className={cn(
        {
          "text-white border-white/40": ui.headerColor === "white",
          "text-black border-black/40 bg-white": ui.headerColor === "black",
        },
        "h-20 fixed top-0 w-full pt-4 z-50  border-b pb-4"
      )}
    >
      <section className="container ">
        <section className={cn({}, "items-center flex justify-between relative w-full ")}>
          <nav className="w-full hidden lg:block">
            <ul className="flex w-full space-x-8">
              {routes.map((route) => (
                <li key={route.name} className="flex">
                  <NavItem data={route} />
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/">
            <img className="w-40" src={ui.headerColor === "white" ? "/logo/logo-white.png" : "/logo/logo.png"} alt="" />
          </Link>

          <Drawer direction="right" handleOnly>
            <DrawerTrigger className="lg:hidden">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.41602 12.4166H16.5827M1.41602 6.99992H16.5827M1.41602 1.58325H16.5827"
                  stroke={ui.headerColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DrawerTrigger>
            <DrawerContent className="h-full rounded-none p-6">
              {/* required by compoenent */}
              <DrawerTitle className="hidden">Nav Mobile</DrawerTitle>

              {/* close */}
              <section className="flex justify-between items-center">
                <img className="w-40" src={"/logo/logo.png"} alt="" />
                <DrawerClose>
                  <X />
                </DrawerClose>
              </section>

              {/* actual navigation */}
              <Accordion className="mt-16" type="single" collapsible>
                {routes.map((route, index) => (
                  <NavItemMobile data={route} index={index} key={route.name} />
                ))}
              </Accordion>
            </DrawerContent>
          </Drawer>
        </section>
      </section>
    </header>
  );
};

export default Header;

