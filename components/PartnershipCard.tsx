"use client";
import {ContentType} from "@/types/indes";
import React, { useState } from "react";
import {Button} from "./ui/button";
import Modal from "./ui/modal";
import { X } from 'lucide-react';
import JSCookie from "js-cookie";

const PartnershipCard: React.FC<{data: ContentType}> = ({data}) => {
  const c = data;
  const hasLink:boolean = c.bottom_button_route !== '#';
  const [isOpen, setIsOpen] = useState(false);
  const lang = JSCookie.get("lang") || "id";

  const handleButtonClick = (url: string): void => {

    if(hasLink) {
      window.open(url, '_blank');
    }
  }

  const handleOpenModal = () => {
    setIsOpen(true)
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
          {hasLink ? c.bottom_button_name : lang === 'id' ?  "Segera Hadir" : "Coming Soon"}
        </Button>

        <Button variant={"outline"} className="w-full text-white border-white rounded-none" onClick={handleOpenModal}>
          {c.sub_title1}
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen?.(false)}
        >
          <header className="flex items-center justify-between mt-2 mb-3">
            <h2 className="text-lg text-green-light font-semibold lg:max-w-[70%]">{c.title}</h2>
            <div className="w-6 h-6 text-center hover:text-red-800 hover:cursor-pointer">
              <X className="w-5" onClick={() => setIsOpen?.(false)}/>
            </div>
           </header>
          <div
            className="dont-reset h-full max-h-[50vh] lg:max-h-[40vh]  overflow-y-auto
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-[#005CAB]
              dark:[&::-webkit-scrollbar-track]:bg-neutral-700
              dark:[&::-webkit-scrollbar-thumb]:bg-[#005CAB]"
            dangerouslySetInnerHTML={{__html: c.sub_title2}}
          ></div>
        </Modal>
        </div>
      </section>
    </div>
  );
};

export default PartnershipCard;

