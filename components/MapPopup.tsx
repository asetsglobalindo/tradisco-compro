import React from "react";
import {LocationType} from "@/types/indes";
import {Button} from "./ui/button";
import {MoveRight} from "lucide-react";

const MapPopup: React.FC<{item: LocationType}> = ({item}) => {
  return (
    <section className="flex space-x-4 p-4">
      <div className="flex flex-col">
        <h1 className="font-semibold">{item.name}</h1>
        <span className="inline-block mt-2">{item.address}</span>
        {item?.lat && item?.long ? (
          <a
            className="mt-4 w-full block"
            target="_blank"
            href={"http://www.google.com/maps/place/" + item.lat + "," + item.long}
          >
            <Button className="w-full flex justify-center items-center">
              Direction <MoveRight />
            </Button>
          </a>
        ) : null}
      </div>
    </section>
  );
};

export default MapPopup;

