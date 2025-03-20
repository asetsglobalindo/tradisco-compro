"use client";

import React, { useEffect } from "react";

const ScrollSection = ({ id, className = "", children }) => {
  useEffect(() => {
    const setScrollMargin = () => {
      const sectionElement = document.getElementById(id);
      if (!sectionElement) return;

      const headerElement = document.querySelector("header");
      if (headerElement) {
        const headerHeight = headerElement.getBoundingClientRect().height;
        sectionElement.style.scrollMarginTop = `${headerHeight + 20}px`;
      }
    };

    // Set scroll margin when component mounts
    setScrollMargin();

    // Create a debounced version of setScrollMargin for better performance
    let debounceTimer;
    const debouncedSetScrollMargin = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(setScrollMargin, 100);
    };

    // Add event listeners with debounced function
    window.addEventListener("scroll", debouncedSetScrollMargin);
    window.addEventListener("resize", debouncedSetScrollMargin);

    return () => {
      window.removeEventListener("scroll", debouncedSetScrollMargin);
      window.removeEventListener("resize", debouncedSetScrollMargin);
      clearTimeout(debounceTimer);
    };
  }, [id]);

  return (
    <div id={id} className={`scroll-section ${className}`}>
      {children}
    </div>
  );
};

export default ScrollSection;
