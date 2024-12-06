"use client";
import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import uiStore from "@/app/store/uiStore";

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

const Header = () => {
  const ui = uiStore((state) => state);

  return (
    <header
      className={cn(
        {
          "text-white": ui.headerColor === "white",
          "text-black": ui.headerColor === "black",
        },
        "h-20 fixed top-0 w-full pt-4 z-[999]"
      )}
    >
      <section className="container ">
        <section
          className={cn(
            {
              "border-white/40": ui.headerColor === "white",
              "border-black/40": ui.headerColor === "black",
            },
            "flex items-center relative w-full border-b pb-4"
          )}
        >
          <nav className="w-full">
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
        </section>
      </section>
    </header>
  );
};

export default Header;

