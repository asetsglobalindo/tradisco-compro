"use client";
import {ContentType} from "@/types/indes";
import React from "react";
import {Button} from "./ui/button";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {X} from "lucide-react";

const PartnershipCard: React.FC<{data: ContentType}> = ({data}) => {
  const c = data;
  const hasLink:boolean = c.bottom_button_route !== '#';

  const handleButtonClick = (url: string): void => {

    if(hasLink) {
      window.open(url, '_blank');
    }
  }

  return (
    <div className="rounded-2xl relative overflow-hidden" key={c._id}>
      <img
        className="w-full brightness-[40%] aspect-square object-cover"
        src={c?.thumbnail_images[0]?.images[0]?.url}
        alt={c?.thumbnail_images[0]?.title}
      />
      <section className="absolute bottom-0 w-full z-20 left-0 p-4 xl:p-8 transition-all flex flex-col">
        <h2 className="mt-2 text-lg text-green-light font-semibold lg:max-w-[70%] ">{c.title}</h2>
        <div className="text-white" dangerouslySetInnerHTML={{__html: c.description}}></div>

        <div className="grid grid-cols-2 gap-4 mt-4">
        <Button 
          className={`w-full ${hasLink ? '' : 'bg-[#A6B0A7] text-neutral-900 font-bold pointer-events-none'} rounded-none`} 
          onClick={() => {handleButtonClick(c.bottom_button_route)}}
        >
          {c.bottom_button_name}
        </Button>

          <Drawer>
            <DrawerTrigger asChild className="cursor-pointer group overflow-hidden">
              <Button variant={"outline"} className="w-full text-white border-white rounded-none">
                {c.sub_title1}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="border-none rounded-t-3xl px-0 container overflow-hidden">
              <div className="mx-auto w-full ">
                <DrawerHeader className="bg-[#171717] flex items-center py-8 text-white">
                  <section className="container flex justify-between items-center">
                    <section>
                      <DrawerTitle className="mt-4">
                        <h1>{c.title}</h1>
                      </DrawerTitle>
                    </section>
                    <DrawerClose>
                      <Button variant="outline" rounded className="w-fit px-3 bg-green-light/50 border-transparent">
                        <X color="#63AE1D" />
                      </Button>
                    </DrawerClose>
                  </section>
                </DrawerHeader>
                <section className="flex flex-col-reverse lg:flex-row container items-center gap-8 lg:gap-16 mt-8 xl:mt-16 xl:mb-16">
                  <div
                    className="dont-reset h-full max-h-[50vh] lg:max-h-[40vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{__html: c.sub_title2}}
                  ></div>
                </section>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </section>
    </div>
  );
};

export default PartnershipCard;

