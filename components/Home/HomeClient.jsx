"use client";
import React, { useEffect } from "react";
import HomeBanner from "@/components/HomeBanner";
import GlobalPresenceSection from "@/components/Home/GlobalPresenceSection";
import ScrollSection from "@/components/ScrollSection";
import OrganizationChart from "@/components/Home/OrganizationChart";
import OurPartner from "@/components/Home/OurPartner";
import HomeTimeline from "@/components/Home/HomeTimeline";
import HomeProject from "@/components/Home/HomeProject";
import HomeNews from "@/components/Home/HomeNews";
import ModernBusinessCarousel from "./HomeBusiness";
import dynamic from "next/dynamic";
// Dynamically import the team section component to avoid server-side rendering issues with Framer Motion
const ModernTeamSection = dynamic(
  () => import("@/components/Home/ModernTeamSection"),
  { ssr: false }
);

const HomeClient = ({ content }) => {
  // Implement the smooth scroll functionality directly in this component
  useEffect(() => {
    // Function to handle smooth scrolling that accounts for header height changes
    const scrollToElement = (elementId) => {
      const id = elementId.startsWith("#") ? elementId.substring(1) : elementId;
      const element = document.getElementById(id);

      if (!element) return;

      // Calculate the actual header height after any transitions
      const getHeaderHeight = () => {
        const header = document.querySelector("header");
        return header ? header.getBoundingClientRect().height : 0;
      };

      // Ensure we use the "scrolled" header height
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
    };

    // Set up global anchor click handler
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
  }, []);

  return (
    <>
      <ScrollSection id="banner" className="mb-16">
        <HomeBanner data={content || []} />
      </ScrollSection>

      <ScrollSection id="about-us" className="my-16">
        <HomeTimeline />
      </ScrollSection>

      <ScrollSection id="our-business" className="my-16">
        <OrganizationChart data={content || []} />
      </ScrollSection>

      <ScrollSection id="our-business" className="my-16">
        <ModernBusinessCarousel data={content || []} />
      </ScrollSection>

      {/* <ScrollSection id="team" className="my-16">
        <ModernTeamSection />
      </ScrollSection> */}

      <ScrollSection id="global-presence" className="my-16">
        <GlobalPresenceSection data={content?.global_presence || {}} />
      </ScrollSection>

      <ScrollSection id="our-partners" className="my-16">
        <OurPartner data={content?.partners || []} />
      </ScrollSection>

      <ScrollSection id="project-reference" className="my-16">
        <HomeProject />
      </ScrollSection>

      <ScrollSection id="news" className="mt-16">
        <HomeNews content={content || []} />
      </ScrollSection>
    </>
  );
};

export default HomeClient;
