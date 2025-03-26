"use client";
import { useEffect, useCallback } from "react";

export const useSmootScroll = () => {
  // Function to handle smooth scrolling that accounts for header height changes
  const scrollToElement = useCallback((elementId) => {
    const id = elementId.startsWith("#") ? elementId.substring(1) : elementId;
    const element = document.getElementById(id);

    if (!element) return;

    // Calculate the actual header height after any transitions
    const getHeaderHeight = () => {
      const header = document.querySelector("header");
      return header ? header.getBoundingClientRect().height : 0;
    };

    // Ensure we use the "scrolled" header height
    // by waiting for any transitions to complete
    const headerTransitionDuration = 300; // Match this to your CSS transition duration

    // Set a small timeout to account for any header transitions
    setTimeout(() => {
      const headerHeight = getHeaderHeight();
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without triggering a new scroll
      window.history.pushState(null, null, `#${id}`);
    }, headerTransitionDuration);
  }, []);

  // Set up global anchor click handler
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      scrollToElement(href);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [scrollToElement]);

  return { scrollToElement };
};
