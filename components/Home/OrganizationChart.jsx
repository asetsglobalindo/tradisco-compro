import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

/**
 * OrganizationChartD3.jsx
 * React component: horizontal tree with cards using D3
 *
 * Features:
 * - Horizontal tree layout (parent on left, children to the right)
 * - Zoom & pan (mouse wheel + drag)
 * - Collapse / expand nodes on click
 * - Nodes rendered with foreignObject so HTML/Tailwind styling can be used
 * - Responsive to container width/height
 *
 * Usage: <OrganizationChartD3 />
 */

// ---------------------------
// Data (use your original companyData — trimmed here for clarity)
const companyData = {
  name: "TRADISCO",
  logo: "/logo/logo.png",
  description:
    "Parent company focusing on trading, digital services, and construction",
  children: [
    {
      name: "TRADISCO INVESTAMA",
      description: "Investment arm",
      children: [
        {
          name: "STORI",
          logo: "/images/Stori-removebg-preview-removebg-preview.png",
          url: "https://stori.id",
          description:
            "AI-powered, 5G-enabled smart maintenance platform that transforms traditional maintenance into an intelligent connected ecosystem.",
        },
        {
          name: "ChatBox",
          logo: "/images/chatbox.png",
          url: "https://chatbox.id",
          description:
            "All-in-one consultation platform designed to streamline interactions, protect conversations, and maximize business growth.",
        },
        {
          name: "Virtual Intelligence",
          logo: "/images/virtualinteligence.png",
          url: "https://virtualintelligence.id",
          description:
            "AI products leveraging automation for business processes, real-time analytics, and customer experience.",
        },
        {
          name: "Tech Lads",
          logo: "/images/tech-lads.png",
          url: "https://techlads.com",
          description:
            "Empowering women in technology since 2014; expanded in 2022 delivering impactful tech solutions.",
        },
        {
          name: "SocialBox",
          logo: "/images/socialbox.png",
          url: "https://socialbox.id",
          description:
            "ESG development leveraging augmented reality (AR) technology to promote sustainability.",
        },
      ],
    },
    {
      name: "Asets",
      logo: "/images/asets.png",
      url: "https://asets.id",
      description:
        "Indonesia's first AI-powered e-commerce platform to support businesses at every level.",
    },
    {
      name: "Green Energy Pratama",
      logo: "/images/green-energy.jpg",
      url: "https://greenenergypratama.com",
      description:
        "Comprehensive engineering solutions shaping Indonesia's infrastructure with precision.",
    },
    {
      name: "RP Creators",
      logo: "/images/RPC-removebg-preview.png",
      description:
        "Revenue-first creative ecosystem transforming creativity into products and services.",
      children: [
        {
          name: "Warehaus Indonesia",
          logo: "/images/warehaus.png",
          url: "https://warehaus.id",
          description:
            "Commercial design & fabrication using high-quality material with optimal functionality.",
        },
        {
          name: "Kleemann Indonesia",
          logo: "/images/kleemann.png",
          url: "https://kleemann-indonesia.com",
          description:
            "Provider of elevators & escalators offering design, safety, and comfort for modern buildings.",
        },
      ],
    },
  ],
};

// ---------------------------
// Helper to create HTML for node (used inside foreignObject).
// Keep markup simple and Tailwind-friendly.
function nodeHTML(d) {
  // sanitize or escape if data is user supplied (omitted here for brevity)
  const logo = d.data.logo ? `<img src="${d.data.logo}" alt="${d.data.name}" class="mx-auto mb-1 object-contain" style="max-height:40px; max-width:120px;" />` : "";
  const name = `<div class="text-sm font-semibold text-gray-900 text-center leading-tight">${d.data.name}</div>`;
  const desc = d.data.description
    ? `<div class="text-[11px] text-gray-600 text-center mt-1 ${d.data.url ? 'line-clamp-2' : 'line-clamp-3'} px-1">${d.data.description}</div>`
    : "";
  const visitWebsite = d.data.url
    ? `<div class="text-[10px] text-blue-600 font-medium text-center mt-1.5 pt-1.5 border-t border-gray-200 w-full">Visit Website</div>`
    : "";
  return `
    <div class="node-card w-full h-full p-2 rounded-lg bg-white border shadow-sm flex flex-col" style="box-shadow:0 6px 18px rgba(15,23,42,0.06);">
      <div class="flex flex-col items-center flex-1">
        ${logo}
        ${name}
        ${desc}
      </div>
      ${visitWebsite}
    </div>
  `;
}

// ---------------------------
// Main component
const OrganizationChartD3 = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // CLEANUP any previous svg content
    d3.select(svgRef.current).selectAll("*").remove();

    // container dims
    const container = containerRef.current;
    let width = container.clientWidth || 1200;
    let height = Math.max(container.clientHeight, 600);

    // SVG setup
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto")
      .style("overflow", "visible");

    // Group for pan/zoom
    const g = svg.append("g").attr("class", "layer-root");

    // Zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 2.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // HIDE OVERLAY ON FIRST INTERACTION
    svg.on("mousedown touchstart wheel", () => {
      setShowHint(false);
    });

    // Convert data to hierarchy
    const root = d3.hierarchy(companyData);

    // Initialize children collapsed state: collapse all except root and 1st-level by default
    root.descendants().forEach((d) => {
      if (d.depth === 0) return;
      if (d.depth > 1) {
        d._children = d.children;
        d.children = null;
      }
    });

    // Create tree layout; nodeSize controls vertical (x) and horizontal (y) spacing
    const nodeWidth = 240; // width of card
    const nodeHeight = 150; // height of card (increased to fit "Visit Website")
    const horizontalSpacing = 160; // space between levels
    const verticalSpacing = 340; // space between nodes vertically

    const tree = d3.tree().nodeSize([verticalSpacing, horizontalSpacing]);



    tree(root);

    // Function to update layout whenever toggling
    function update(source) {
      // recompute layout
      tree(root);

      // links (all visible links)
      const links = root.links();

      // Draw links with data join
      const linkSel = g.selectAll("path.link").data(links, (d) => d.target.data.name + "_" + d.target.depth);

      // exit
      linkSel.exit().transition().duration(350).style("opacity", 0).remove();

      // enter
      const linkEnter = linkSel
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#C7D2FE")
        .attr("stroke-width", 2)
        .attr("opacity", 0);

      // merge + update path
      linkEnter
        .merge(linkSel)
        .attr("opacity", 1)
        .transition()
        .duration(400)
        .attr("d", (d) => {
          const start = { x: d.source.x, y: d.source.y };
          const end = { x: d.target.x, y: d.target.y };
        
          const midY = (start.y + end.y) / 2;
        
          return `
            M${start.x},${start.y}
            C ${start.x},${midY}
              ${end.x},${midY}
              ${end.x},${end.y}
          `;
        });
        
        

      // NODES
      const nodes = root.descendants();

      // DATA JOIN for node group (for easier event handling)
      const nodeSel = g.selectAll("g.node").data(nodes, (d) => d.data.name + "_" + d.depth);

      // EXIT
      nodeSel.exit().transition().duration(300).style("opacity", 0).remove();

      // ENTER
      const nodeEnter = nodeSel
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
        .style("opacity", 0);

      // Attach a rect placeholder for hit area (optional)
      nodeEnter
        .append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("x", -nodeWidth / 2)
        .attr("y", -nodeHeight / 2)
        .attr("fill", "transparent")
        .style("pointer-events", "all");

      // Add foreignObject to place HTML card
      nodeEnter
        .append("foreignObject")
        .attr("class", "fo")
        .attr("x", -nodeWidth / 2)
        .attr("y", -nodeHeight / 2)
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .html((d) => nodeHTML(d))
        .style("cursor", (d) => (d.data.url ? "pointer" : "default"))
        .on("click", (event, d) => {
          if (d.data.url) {
            window.open(d.data.url, "_blank");
          }
          event.stopPropagation();
        });

      // Add collapse/expand indicator (simple circle)
      nodeEnter
        .append("circle")
        .attr("class", "toggle-circle")
        .attr("r", 6)
        .attr("cx", nodeWidth / 2 - 12)
        .attr("cy", -nodeHeight / 2 + 12)
        .attr("fill", (d) => (d._children ? "#2563eb" : d.children ? "#10b981" : "#e5e7eb"))
        .style("cursor", (d) => (d.children || d._children ? "pointer" : "default"))
        .on("click", (_, d) => {
          // toggle children
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else if (d._children) {
            d.children = d._children;
            d._children = null;
          }
          update(d);
          // Auto center after expand/collapse
          requestAnimationFrame(() => {
            setTimeout(() => center(), 100);
          });
          // stop propagation so parent click not triggered
          d3.event && d3.event.stopPropagation && d3.event.stopPropagation();
        });

      // MERGE & TRANSITION to new positions
      const nodeMerge = nodeEnter.merge(nodeSel);

      nodeMerge
        .transition()
        .duration(400)
        .style("opacity", 1)
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`)

      // Update foreignObject content to reflect any changed data
      nodeMerge.select("foreignObject.fo")
        .html((d) => nodeHTML(d))
        .style("cursor", (d) => (d.data.url ? "pointer" : "default"))
        .on("click", (event, d) => {
          if (d.data.url) {
            window.open(d.data.url, "_blank");
          }
          event.stopPropagation();
        });

      // Update toggle circle fill based on current state
      nodeMerge.select("circle.toggle-circle").attr("fill", (d) => (d._children ? "#2563eb" : d.children ? "#10b981" : "#e5e7eb"));
    }

    // --- AUTO CENTER FUNCTION ---
    function center() {
      try {
        // Pastikan semua node sudah di-render
        const nodes = g.selectAll("g.node");
        if (nodes.empty()) {
          setTimeout(() => center(), 50);
          return;
        }

        const bbox = g.node().getBBox(); // ukuran real dari tree
        
        // Jika bbox masih kosong, retry
        if (bbox.width === 0 || bbox.height === 0) {
          setTimeout(() => center(), 50);
          return;
        }
        
        const chartWidth = bbox.width;
        const chartHeight = bbox.height;
        
        // Perhitungan yang lebih akurat untuk centering
        // Center root node (Tradisco) di tengah container, sedikit ke atas
        const rootNode = root;
        const rootX = rootNode.x; // posisi X root node
        const rootY = rootNode.y; // posisi Y root node
        
        // Hitung offset agar root node di tengah, dengan adjustment ke atas
        const offsetX = width / 2 - rootY; // rootY adalah posisi horizontal (karena tree horizontal)
        const offsetY = height / 2 - rootX - 200; // rootX adalah posisi vertikal, dikurangi 60px untuk naik sedikit
        
        svg.transition()
          .duration(400)
          .call(
            zoom.transform,
            d3.zoomIdentity.translate(offsetX, offsetY).scale(0.9)
          );
      } catch (e) {
        console.warn("Centering skipped:", e);
        // Retry jika gagal
        setTimeout(() => center(), 100);
      }
    }

    // Initial render
    update(root);
    // Gunakan requestAnimationFrame untuk memastikan DOM selesai render
    requestAnimationFrame(() => {
      setTimeout(() => center(), 100);
    });


    // Resize observer — re-render on container resize
    const ro = new ResizeObserver(() => {
      // recompute viewBox to new width/height
      const newWidth = container.clientWidth || 1200;
      const newHeight = Math.max(container.clientHeight, 600);
      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
      width = newWidth;
      height = newHeight;
      // recompute layout
      update(root);
      requestAnimationFrame(() => {
        setTimeout(() => center(), 100);
      });
    });
    ro.observe(container);

    // Cleanup on unmount
    return () => {
      ro.disconnect();
      svg.on("mousedown touchstart wheel", null); // cleanup event listener
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Our Group</h2>
          <p className="text-sm text-gray-600">Group structure with subsidiaries focusing on diverse industry sectors</p>
        </div>

        <div ref={containerRef} className="relative w-full h-[520px] border rounded-lg bg-gray-50 overflow-hidden">
          {showHint && (
            <div 
              className="absolute inset-0 z-20 bg-gray-800/40 flex items-center justify-center text-white text-sm font-medium px-4 cursor-pointer transition-opacity duration-300"
              onClick={() => setShowHint(false)}
            >
              <div className="text-center">
                <p>You can drag, swipe, and zoom this section</p>
                <p className="text-xs opacity-80 mt-1">(try pinch or mouse wheel + drag)</p>
              </div>
            </div>
          )}
          <svg ref={svgRef} />
        </div>
      </div>
    </section>
  );
};

export default OrganizationChartD3;
