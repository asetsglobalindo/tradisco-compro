import React from "react";

const HomeAbout = () => {
  return (
    <section className="container lg:mt-16 mt-8 border-b pb-16">
      <p className="title-3 text-[#005CAB] font-bold text-center font-Kalam">
        Company History Timeline
      </p>
      <h1 className="text-base text-center mt-4 mb-10">
        Tradisco&apos;s journey from its origins to becoming a powerhouse in
        tech and investment infrastructure highlights a steadfast commitment to
        innovation and growth. Guided by a vision of &quot;Strengthening
        Asia&apos;s Economy through Global Expertise,&quot; Tradisco has
        continually adapted to meet evolving market demands with cutting-edge
        solutions.
      </h1>

      <div className="border-l-4 border-gray-300">
        {[
          {
            title: "Early Beginnings (Energy & Natural Resources)",
            description:
              "Tradisco's foundation was built on delivering consulting and mechanical solutions in the energy and natural resources sectors, where it quickly established a reputation for reliability and expertise.",
          },
          {
            title: "Expansion into Tech & Digitalization",
            description:
              "Responding to industry needs, Tradisco transitioned into the tech space, launching system monitoring solutions like Stori and expanding its role as a tech consultant, helping clients digitize operations.",
          },
          {
            title: "Becoming a Holding Company",
            description:
              "Tradisco evolved into a private investment and tech holding company, consolidating its expertise to deliver comprehensive market solutions and fostering innovations across multiple industries.",
          },
          {
            title: "Global Reach",
            description:
              "Today, Tradisco collaborates with partners worldwide, leveraging global insights to deliver impactful results, particularly aimed at bolstering Asia's economic landscape.",
          },
        ].map((item, index) => (
          <div key={index} className="mb-10 ml-6 flex items-start">
            <div className="relative w-4 h-4 flex items-center justify-center">
              <div className="w-4 h-4 bg-green rounded-full absolute"></div>
              <div className="w-2 h-2 bg-white rounded-full z-10"></div>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-blue-600">{item.title}</h3>
              <p className="ps-5 text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeAbout;
