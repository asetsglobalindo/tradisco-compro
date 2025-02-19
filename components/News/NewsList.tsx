"use client";
import React from "react";
import {useInfiniteQuery} from "react-query";
import JSCookie from "js-cookie";
import ApiService from "@/lib/ApiService";
import {ContentType} from "@/types/indes";
import moment from "moment";
import Link from "next/link";
import {Loader2} from "lucide-react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useDebounce} from "use-debounce";

const NewsList = () => {
  const limit = 12;
  const lang = JSCookie.get("lang") || "id";
  const [queryValue, setQueryValue] = React.useState("");
  const [queryValueDebounce] = useDebounce(queryValue, 500);

  const {
    data: contentResults,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["news", lang],
    queryFn: async ({pageParam = 1}) => await getContent({page: pageParam || 1}),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.length === limit ? allPages.length + 1 : undefined;
      return nextPage;
    },
    enabled: !!lang,
  });

  const getContent = async ({page}: {page: number}) => {
    try {
      const params = {
        limit: limit,
        page: page,
        active_status: true,
        type: "news",
        show_single_language: "yes",
        query: queryValueDebounce,
      };

      const response = await ApiService.get("/content", params);

      return (response.data.data as ContentType[]) || [];
    } catch (error: any) {
      console.log(error);
      return [];
    }
  };

  return (
    <React.Fragment>
      <section>
        <div className="flex gap-4 ">
          <Input
            value={queryValue}
            className="lg:max-w-[300px]"
            placeholder={lang === "en" ? "Search..." : "Cari..."}
            onChange={(e) => setQueryValue(e.target.value)}
          />
          <Button onClick={() => refetch()}>Submit</Button>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {contentResults?.pages?.map((d) =>
          d.map((data) => (
            <div key={data._id} className="border">
              <div className="aspect-video">
                <img
                  className="aspect-video object-cover w-full h-full"
                  src={data?.thumbnail_images[0]?.images[0]?.url}
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
          ))
        )}
      </section>
      <section className="mt-24 flex justify-center">
        {hasNextPage ? (
          <button
            disabled={isLoading}
            onClick={() => fetchNextPage()}
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

