import React from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";

const HomeNews = ({ content }) => {
  // Format date function to replace moment dependency
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-center mb-16">News</h1>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4">
        {content?.section5?.content?.map((data, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden group h-[400px] md:h-[450px] flex items-end justify-end shadow-md"
          >
            {/* Background Image */}
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 blur-[2px]"
              src={data?.thumbnail_images?.[0]?.images?.[0]?.url}
              alt={data?.title || "News image"}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:bg-blue-600/60 transition-all duration-500"></div>

            {/* Content */}
            <div className="relative z-10 text-white p-6 md:p-8">
              {/* Category */}
              <span className="text-sm font-medium text-blue-400 group-hover:text-white transition-colors duration-300">
                {data?.category_id?.name || "News"}
              </span>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold mt-3 line-clamp-3">
                {data?.title || "News title"}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm md:text-base text-gray-200 line-clamp-3">
                {data?.small_text || "News description"}
              </p>

              {/* Date */}
              <span className="text-xs text-gray-300 mt-4 block">
                {data?.created_at ? formatDate(data.created_at) : ""}
              </span>

              {/* Read More Link */}
              <div className="mt-6">
                <Link href={`/news/${data?.slug || ""}`}>
                  <button className="px-4 py-2 border border-white/50 rounded text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 text-sm">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All News Button */}
      <div className="mt-16 flex justify-center">
        <Link href="/news">
          <button className="group flex items-center gap-3 px-6 py-3 bg-blue-500/80 hover:bg-blue-600/90 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Newspaper size={20} className="group-hover:animate-pulse" />
            <span>View All News</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNews;
