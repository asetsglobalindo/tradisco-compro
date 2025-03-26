"use client";

import React, { useEffect, useRef } from "react";

const GlobalPresenceMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamic import for Leaflet since it requires DOM access
    const loadLeaflet = async () => {
      try {
        // Only import Leaflet on client side
        const L = (await import("leaflet")).default;

        // Make sure we only initialize the map once
        if (mapInstanceRef.current) return;

        // Check if the container exists
        if (!mapRef.current) return;

        // Add Leaflet CSS dynamically
        if (!document.querySelector("[data-leaflet-styles]")) {
          const linkElement = document.createElement("link");
          linkElement.setAttribute("rel", "stylesheet");
          linkElement.setAttribute(
            "href",
            "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          );
          linkElement.setAttribute("data-leaflet-styles", "true");
          document.head.appendChild(linkElement);
        }

        // Initialize the map with a view centered on a position that shows all markers
        const map = L.map(mapRef.current, {
          minZoom: 1.5, // Prevent zooming out too far
          maxBoundsViscosity: 1.0, // Keep the map within bounds
        }).setView([19.2, 76.3], 1.8);

        // Set max bounds to prevent dragging too far
        const southWest = L.latLng(-90, -180);
        const northEast = L.latLng(90, 180);
        map.setMaxBounds(L.latLngBounds(southWest, northEast));

        // Add OpenStreetMap tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          noWrap: true, // Prevent the map from repeating horizontally
        }).addTo(map);

        // Locations data with coordinates and titles
        const locations = [
          {
            lat: -6.2088,
            lng: 106.8456,
            title: "Indonesia",
            icon: "/icon/indonesia.png",
          },
          {
            lat: 52.3676,
            lng: 4.9041,
            title: "Netherlands",
            icon: "/icon/holland.png",
          },
          {
            lat: 37.9838,
            lng: 23.7275,
            title: "Greece",
            icon: "/icon/greece.png",
          },
          {
            lat: -33.8688,
            lng: 151.2093,
            title: "Australia",
            icon: "/icon/australia.png",
          },
          {
            lat: 1.3521,
            lng: 103.8198,
            title: "Singapore",
            icon: "/icon/singapore.png",
          },
        ];

        // Add markers for each location
        locations.forEach((location) => {
          const customIcon = L.icon({
            iconUrl: location.icon,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });

          const marker = L.marker([location.lat, location.lng], {
            icon: customIcon,
          })
            .addTo(map)
            .bindPopup(location.title);

          // Add permanent tooltips
          marker.bindTooltip(location.title, {
            permanent: true,
            direction: "bottom", // Ubah dari "top" ke "bottom"
            className: "leaflet-tooltip-global",
          });
        });

        // Store map instance for cleanup
        mapInstanceRef.current = map;

        // Handle resize events to make sure the map fills the container
        const resizeMap = () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        };

        window.addEventListener("resize", resizeMap);

        // Force a refresh after initial render
        setTimeout(resizeMap, 300);

        // Cleanup function
        return () => {
          window.removeEventListener("resize", resizeMap);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
        };
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    loadLeaflet();
  }, []);

  return (
    <div className="relative w-full h-full" style={{ minHeight: "400px" }}>
      {/* Add a loading indicator that's shown until map loads */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-gray-100"
        id="map-loading"
        style={{ display: mapInstanceRef.current ? "none" : "flex" }}
      >
        <div className="text-primary">Loading map...</div>
      </div>

      {/* The map container */}
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg shadow-lg z-10"
        style={{ minHeight: "400px" }}
      />

      {/* Custom styles for the map */}
      <style jsx>{`
        :global(.leaflet-tooltip-global) {
          background: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 3px;
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
          font-weight: bold;
          padding: 4px 8px;
        }
      `}</style>
    </div>
  );
};

export default GlobalPresenceMap;
