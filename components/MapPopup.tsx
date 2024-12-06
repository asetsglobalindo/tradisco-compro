import React from "react";
import {LocationType} from "@/types/indes";

const MapPopup: React.FC<{item: LocationType}> = ({item}) => {
  return (
    <section className="flex space-x-4 p-2">
      <div className="flex flex-col">
        <h1 className="font-semibold">{item.name}</h1>
        <span className="inline-block mt-2">{item.address}</span>
        {item.vr_url ? (
          <a
            className=" border-t border-black/20 pt-2 mt-2"
            href={item.vr_url}
            target="_blank"
            rel={"noopener noreferrer"}
          >
            <button className="flex space-x-1 text-white   border-green-light bg-green-light w-fit border px-2 py-1 rounded-full items-center mt-auto">
              <span className="text-xs">Get Direction</span>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.21216 8.63376H12.721M12.721 8.63376L9.1552 4.51709M12.721 8.63376L9.1552 12.7504"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </a>
        ) : null}
      </div>
    </section>
  );
};

export default MapPopup;
