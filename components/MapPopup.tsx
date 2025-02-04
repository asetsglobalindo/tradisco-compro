import React from "react";
import {LocationType} from "@/types/indes";

const MapPopup: React.FC<{item: LocationType}> = ({item}) => {
  return (
    <section className="flex space-x-4 p-4">
      <div className="flex flex-col">
        <h1 className="font-semibold">{item.name}</h1>
        <span className="inline-block mt-2">{item.address}</span>
      </div>
    </section>
  );
};

export default MapPopup;

