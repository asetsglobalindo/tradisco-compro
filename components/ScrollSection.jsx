"use client";

import React, { useEffect, useRef } from "react";

const ScrollSection = ({ id, className = "", children }) => {
  // Gunakan pendekatan alternatif tanpa ref
  useEffect(() => {
    // Fungsi untuk mengatur scroll margin
    const setScrollMargin = () => {
      const sectionElement = document.getElementById(id);
      if (!sectionElement) return;

      const headerElement = document.querySelector("header");
      if (headerElement) {
        const headerHeight = headerElement.getBoundingClientRect().height;
        sectionElement.style.scrollMarginTop = `${headerHeight + 20}px`;
      }
    };

    // Atur scroll margin saat komponen dimount
    setScrollMargin();

    // Lakukan pembaruan saat scroll
    const handleScroll = () => {
      setScrollMargin();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setScrollMargin);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setScrollMargin);
    };
  }, [id]);

  return (
    <div id={id} className={`scroll-mt-28 ${className}`}>
      {children}
    </div>
  );
};

export default ScrollSection;
