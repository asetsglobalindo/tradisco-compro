"use client";
import React, { useEffect } from "react";

const ScrollSection = ({ id, className = "", children }) => {
  useEffect(() => {
    const sectionElement = document.getElementById(id);
    if (!sectionElement) return;

    const updateScrollMargin = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        const headerHeight = headerElement.getBoundingClientRect().height;
        sectionElement.style.scrollMarginTop = `${headerHeight + 20}px`;
      }
    };

    // Update immediately on mount
    updateScrollMargin();

    // Use ResizeObserver to detect header size changes
    const headerElement = document.querySelector("header");
    if (headerElement && typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        updateScrollMargin();
      });

      resizeObserver.observe(headerElement);

      // Clean up observer on unmount
      return () => {
        resizeObserver.disconnect();
      };
    }

    // Fallback for browsers without ResizeObserver
    window.addEventListener("resize", updateScrollMargin);
    return () => {
      window.removeEventListener("resize", updateScrollMargin);
    };
  }, [id]);

  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};

export default ScrollSection;
