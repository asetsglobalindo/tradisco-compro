"use client";
import {cn} from "@/lib/utils";
import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import {useQuery} from "react-query";
import ApiService from "@/lib/ApiService";
import {LocationType} from "@/types/indes";
import {useDebounce} from "use-debounce";
import {Loader2Icon} from "lucide-react";
import LefleatMapIcon from "@/lib/LefleatIcon";
import MapPopup from "./MapPopup";

const HomeLocator = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [value, setValue] = useState<string>("");
  const [locationQuery] = useDebounce(value, 1000);

  const {data: locationData} = useQuery({
    queryKey: ["outlet-locator"],
    queryFn: async () => await getLocation(99999999),
  });

  const {data: locationSuggestion, isLoading: isLoadingSuggestion} = useQuery({
    queryKey: ["outlet-locator-suggestion", locationQuery],
    queryFn: async () => await getLocation(5, locationQuery),
    enabled: !!locationQuery.length,
  });

  const getLocation = async (limit: number = 5, search?: string) => {
    try {
      const query: {page: number; limit: number; query?: string} = {
        page: 1,
        limit: limit,
      };

      if (search) {
        query.query = search;
      }

      const res = await ApiService.get("/location", query);

      if (res.data.status !== 200) {
        throw new Error(res.data.message || res.data.err);
      }

      return res.data.data as LocationType[] | [];
    } catch (error) {
      console.log(error);
    }
  };

  if (typeof window === "undefined") {
    return null;
  }
  return (
    <section
      className="mt-32"
      style={{background: "url(/texture/grid.png)", backgroundRepeat: "no-repeat", backgroundSize: "100% 550px"}}
    >
      <section className="container pt-24 flex space-x-8">
        <section className="w-5/12 mt-16">
          <div className="">
            <span className="title-4 font-normal text-green">Outlet Locator</span>
            <h1 className="text-white title-2 leading-snug mt-4">
              Find Your <br /> Nearest Outlet
            </h1>
          </div>
          <section>
            <div
              className={cn(
                {
                  "overflow-hidden": !locationSuggestion?.length,
                },
                "flex bg-white items-center justify-center  w-full px-4 z-[9999] rounded-[20px] mt-8 relative"
              )}
            >
              <img className="w-6 h-6 mr-4" src="/icons/search-locator.png" alt="" />
              <div className="w-full">
                <input
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  className="text-lg h-[70px] outline-none bg-transparent w-full  max-w-[95%] "
                  type="text"
                  placeholder="Enter Location"
                />
              </div>
              {isLoadingSuggestion ? (
                <div className="w-[52px] h-[52px] flex justify-center items-center">
                  <Loader2Icon className="animate-spin " />
                </div>
              ) : (
                <img src="/icons/search-btn.png" alt="" />
              )}
            </div>
            <div
              className={cn(
                {
                  "h-0 -mt-11": !locationSuggestion?.length,
                  "bg-white scale-y-0 shadow-md": locationSuggestion?.length,
                },
                "w-full transition-all px-8 pb-4 pt-8 scale-y-100 -mt-7 rounded-b-[20px] duration-500 overflow-hidden "
              )}
            >
              <ul className={cn({"border-t border-black/20": locationSuggestion?.length})}>
                {locationSuggestion?.map((d, index) => (
                  <li
                    onClick={() => {
                      map?.flyTo([+d.lat, +d.long], 15);
                      setValue(d.name + " " + d.address);
                    }}
                    key={index}
                    className="text-base text-black/50 pt-4 line-clamp-1 cursor-pointer hover:text-black hover:underline"
                  >
                    {d.name} {d.address}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
        <section className="w-7/12">
          <MapContainer
            ref={(map) => {
              if (map) {
                setMap(map);
              }
            }}
            center={[0.7893, 113.9213]}
            className="max-h-[650px] rounded-[20px]"
            zoom={6}
          >
            <TileLayer url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=c56d26e0f3eb454f8dff29acecde52d6" />
            {locationData?.map((item) => (
              <Marker key={item._id} position={[+item.lat || 0, +item.long || 0]} icon={LefleatMapIcon.SPBU}>
                <Popup className="m-0">
                  <MapPopup item={item} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>
      </section>
    </section>
  );
};

export default HomeLocator;

