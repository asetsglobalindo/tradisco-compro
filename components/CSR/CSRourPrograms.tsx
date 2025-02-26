"use client";
import { cn } from "@/lib/utils";
import { ContentType } from "@/types/indes";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icon

const CSRourPrograms: React.FC<{ data: ContentType }> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  // Tab List: Mengganti tab ke-2 dengan "Sosial"
  const tabList = data.body.map((d, i) =>
    i === 1 ? { label: "Sosial", value: "sosial" } : { label: d.title, value: d._id }
  );

  // Pilihan gambar random untuk tab "Sosial"
  const imagePaths = ["/temp/kegiatan1", "/temp/kegiatan2", "/temp/kegiatan3"];
  const descriptionText = [
    "Donasi Kegiatan Management Walkthrough Direksi kepada Panti Asuhan Rumah Bahagia Pelita Kasih Pekanbaru Riau",
    "Donasi Bantuan Pekerja Terdampak Banjir Sumatera Utara",
    "Donasi Pembuatan Jembatan Penghubung antar Kampung Kel. Kuningan Timur Jakarta Selatan"
  ]
  // Data hardcoded untuk tab "Sosial"
  const socialData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Program Sosial ${i + 1}`,
    description: descriptionText[i % descriptionText.length],
    image: `${imagePaths[i % imagePaths.length]}.png`, // Acak path gambar
  }));

  // Hitung indeks untuk pagination
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const paginatedCards = socialData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(socialData.length / cardsPerPage);

  return (
    <section>
      {/* Tabs */}
      <section className="max-w-[800px] mx-auto overflow-x-scroll lg:overflow-hidden hide-default-scrollbar">
        <ul className="flex text-center mx-auto text-base relative border-b-4 pb-4 lg:pb-6 border-[#EAEAEA]">
          {tabList.map((tab, index) => (
            <li
              key={tab.label}
              className={cn(
                { "font-medium": activeIndex === index },
                "cursor-pointer transition-all flex-1"
              )}
              onClick={() => {
                setActiveIndex(index);
                setCurrentPage(1);
              }}
            >
              {tab.label}
            </li>
          ))}

          <div
            style={{
              left: `${(activeIndex * 100) / tabList?.length}%`,
              width: `${100 / tabList?.length}%`,
              backgroundColor: "#63AE1D",
            }}
            className="h-1 absolute -bottom-1 transition-all duration-500"
          ></div>
        </ul>
      </section>

      <section className="mx-auto mt-8">
        {/* Jika tab aktif adalah "Sosial", tampilkan data hardcoded */}
        {activeIndex === 1 ? (
          <>
            {/* Grid Card (Skala 1:1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedCards.map((card) => (
                <div key={card.id} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
                  {/* Background Image with Overlay */}
                  <div className="relative w-full aspect-square">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all"></div>
                  </div>

                  {/* Title & Description */}
                  <div className="absolute bottom-0 p-4 text-white z-10">
                    {/* <h3 className="text-lg font-bold">{card.title}</h3> */}
                    <p className="text-sm mt-1">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2 items-center">
              {/* Prev Button */}
              <button
                className="p-2 rounded disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft size={24} className="text-green-light"/>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={cn(
                    "px-3 py-1 rounded text-sm",
                    currentPage === i + 1 ? "font-bold text-green-600" : "text-gray-500"
                  )}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                className="p-2 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ChevronRight size={24} className="text-green-light" />
              </button>
            </div>
          </>
        ) : (
          // Jika bukan tab "Sosial", tampilkan content default dari API
          <>
            {data.body[activeIndex]?.text?.length ? (
              <div className="mt-8 dont-reset" dangerouslySetInnerHTML={{ __html: data.body[activeIndex].text }}></div>
            ) : null}

            {data.body[activeIndex]?.images?.length ? (
              <img
                className="mx-auto mt-8"
                src={data?.body[activeIndex]?.images[0]?.images[0]?.url}
                alt={data?.body[activeIndex]?.images[0]?.title}
              />
            ) : null}
          </>
        )}
      </section>
    </section>
  );
};

export default CSRourPrograms;