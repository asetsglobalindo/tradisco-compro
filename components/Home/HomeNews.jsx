import React from "react";
import { Button } from "@headlessui/react";
import { ArrowRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const HomeNews = ({ content }) => {
  return (
    <div>
      {/* News */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mt-8">
        {content?.section5.content?.map((data, index) => (
          <section
            key={index}
            className="relative rounded-2xl news-card overflow-hidden group flex items-end justify-end"
          >
            <img
              className="blur-[2px] w-full object-cover h-[400px] md:h-[500px]"
              src={data?.thumbnail_images[0]?.images[0]?.url}
              alt={data?.title}
            />

            {/* content */}
            <section className="absolute z-20  text-white px-8 py-16">
              {/* category */}
              <span className="text-green-light group-hover:text-white">
                {data.category_id.name}
              </span>

              {/* title */}
              <h1 className="title-4 mt-4 line-clamp-3">{data.title}</h1>
              <p className="mt-4 line-clamp-3">{data.small_text}</p>
              <span className="text-xs mt-8 inline-block">
                {moment(data.created_at).format("DD/MMMM/YYYY")}
              </span>

              <div className="mt-8">
                <Link href={"/news/" + data.slug}>
                  <Button
                    variant="outline"
                    className="group-hover:border-white hover:border-white"
                    rounded
                    size={"lg"}
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </section>

            {/* background shade */}
            <div className="absolute top-0 left-0 w-full h-full news-card group-hover:bg-green-light/[.65] transition-all duration-500"></div>
          </section>
        ))}
      </section>
    </div>
  );
};

export default HomeNews;
