"use client";
import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import {useQuery} from "react-query";
import ApiService from "@/lib/ApiService";
import {LocationType} from "@/types/indes";
import {Loader2} from "lucide-react";
import MapPopup from "../MapPopup";
import LefleatMapIcon from "@/lib/LefleatIcon";
import {ScrollArea} from "../ui/scroll-area";

const OutletLocatorMap = () => {
  const suggestionLimit = 20;
  const [map, setMap] = useState<L.Map | null>(null);
  const [value, setValue] = useState<string>("");
  const [userLocation, setUserLocation] = useState<number[]>();
  const [suggestion, setSuggestion] = useState<LocationType[]>([]);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState<boolean>(false);
  const [showEmptySuggestion, setShowEmptySuggestion] = useState<boolean>(false);

  const {data: locationData} = useQuery({
    queryKey: ["outlet-locator"],
    queryFn: async () => await getLocation({limit: 99999999, setInitial: true}),
  });

  const getLocation = async ({limit, search, setInitial}: {limit: number; search?: string; setInitial?: boolean}) => {
    try {
      const query: {page: number; limit: number; query?: string; lat: number | null; long: number | null} = {
        page: 1,
        limit: limit,
        lat: null,
        long: null,
      };

      if (search) {
        query.query = search;
      }

      const res = await ApiService.get("/location", query);

      if (res.data.status !== 200) {
        throw new Error(res.data.message || res.data.err);
      }

      if (setInitial && res.data.data.length) {
        setSuggestion(res.data.data.slice(0, suggestionLimit) as LocationType[]);
      }

      // empty suggestion
      if (!res.data.data.length) {
        setShowEmptySuggestion(true);
      } else {
        setShowEmptySuggestion(false);
      }

      return res.data.data as LocationType[] | [];
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (location) {
        map?.flyTo([location.coords.latitude, location.coords.longitude], 15);
        setTimeout(() => {
          setUserLocation([location.coords.latitude, location.coords.longitude]);
        }, 4000);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const getSuggestion = async () => {
    setIsLoadingSuggestion(true);
    const suggestionData = await getLocation({limit: suggestionLimit, search: value});
    setSuggestion(suggestionData || []);
    setIsLoadingSuggestion(false);
  };

  return (
    <section>
      <section className="  flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <section className="lg:w-5/12 ">
          {/* searchbar */}
          <section className="flex space-x-2 bg-[#FAFAFA] p-4">
            <div className="border w-full border-black/20 h-12 flex px-2 py-2 space-x-2">
              <button onClick={getUserLocation}>
                <img className="w-[18px]" src="/icons/location-me.svg" alt="location" />
              </button>
              <input
                type="text"
                className="h-full w-full outline-none bg-transparent"
                placeholder="Search your location"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button disabled={isLoadingSuggestion} onClick={getSuggestion} className="bg-[#737373] px-4">
              {isLoadingSuggestion ? (
                <Loader2 className="w-5 animate-spin" color="white" />
              ) : (
                <img className="w-6" src="/icons/search-white-header.svg" alt="" />
              )}
            </button>
          </section>

          {/* suggestion */}
          {suggestion?.length > 0 && !isLoadingSuggestion ? (
            <ScrollArea className="h-[520px]">
              {suggestion?.map((item) => (
                <section key={item._id} className="flex space-x-2 items-start py-4 px-4 border-b border-black/20">
                  <img className="w-[18px]" src="/icons/green-pinpoint.svg" alt="pinpoint" />
                  <div>
                    <button
                      onClick={() => {
                        map?.flyTo([+item.lat, +item.long], 15);
                        setValue(item.name);
                      }}
                    >
                      <h1 className="font-semibold hover:underline text-left">{item.name}</h1>
                    </button>
                    <span className="inline-block mt-2">{item.address}</span>
                    {item.vr_url ? (
                      <a href={item.vr_url} target="_blank" rel="noreferrer">
                        <button className="mt-4 bg-green-light h-10 text-white px-4 rounded-sm">Direction</button>
                      </a>
                    ) : null}
                  </div>
                </section>
              ))}
            </ScrollArea>
          ) : null}

          {/* suggestion nofound */}
          <section>
            {showEmptySuggestion && !isLoadingSuggestion ? (
              <section className="flex space-x-2 items-start py-4 px-4">
                <img className="w-[18px]" src="/icons/green-pinpoint.svg" alt="pinpoint" />
                <div>
                  <h1 className="font-semibold">No Result Found.</h1>
                </div>
              </section>
            ) : null}
          </section>
        </section>
        <section className="lg:w-7/12">
          <MapContainer
            ref={(map) => {
              if (map) {
                setMap(map);
              }
            }}
            center={[-4.775231, 109.042028]}
            className="max-h-[500px] lg:max-h-[600px] h-full rounded-[10px]"
            zoom={6}
          >
            <TileLayer url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=c56d26e0f3eb454f8dff29acecde52d6" />
            {userLocation ? <Marker position={userLocation as any} icon={LefleatMapIcon.myLocation}></Marker> : null}

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

export default OutletLocatorMap;

