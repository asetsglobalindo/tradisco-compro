"use client";
import React from "react";
import {useQuery} from "react-query";
import JSCookie from "js-cookie";
import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import moment from "moment";
import Link from "next/link";
import {Loader2} from "lucide-react";

const NewsList = () => {
  const limit = 12;
  const lang = JSCookie.get("lang") || "id";
  const [isNoData, setIsNoData] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalData, setTotalData] = React.useState(0);
  const [results, setResults] = React.useState<ContentType[]>([]);

  const {isLoading} = useQuery({
    queryKey: ["news", lang, page],
    queryFn: async () => await getContent(),
    enabled: !!lang,
  });

  const getContent = async () => {
    try {
      const params = {
        limit: limit,
        page: page,
        active_status: true,
        type: "news",
        show_single_language: "yes",
      };

      const response = await ApiService.get("/content", params);

      if (!response.data.data.length) {
        setIsNoData(true);
      } else {
        setIsNoData(false);
      }

      setTotalData(response.data.pages.total_data);
      setResults([...results, ...response.data.data]);
      return (response.data.data || []) as ContentType[] | [];
    } catch (error) {
      console.log(error);
      setIsNoData(true);
      return [];
    }
  };

  if (isNoData) {
    return <h1 className="text-center">Sorry, no news found</h1>;
  }

  return (
    <React.Fragment>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {results?.map((data) => (
          <div key={data._id} className="border">
            <div className="aspect-video">
              <img
                className="aspect-video object-cover w-full h-full"
                src={data.thumbnail_images[0].images[0].url}
                alt={data.title}
              />
            </div>

            <section className="px-4 pb-4">
              <div className="flex justify-between items-center mt-2 border-b pb-2">
                <div className="font-medium leading-none">{moment(data.created_at).format("DD MMMM YYYY")}</div>
              </div>

              <h1 className="mt-4 font-semibold title-5">{data.title}</h1>
              <p className="mt-2 line-clamp-2 text-xs">{data.small_text}</p>

              <Link className="inline-block underline font-semibold uppercase mt-4" href={`/news/${data.slug}`}>
                {lang === "en" ? "Read More" : "Baca Selengkapnya"}
              </Link>
            </section>
          </div>
        ))}
      </section>
      <section className="mt-24 flex justify-center">
        {results.length < totalData ? (
          <button
            disabled={isLoading}
            onClick={() => setPage(page + 1)}
            className="bg-green-light flex items-center gap-1 text-white px-6 disabled:bg-green-light/80 py-2 rounded-full"
          >
            <span>{lang === "en" ? "Load More" : "Muat Lagi"}</span>{" "}
            {isLoading ? <Loader2 className="animate-spin" size={16} color="white" /> : null}
          </button>
        ) : null}
      </section>
    </React.Fragment>
  );
};

export default NewsList;

