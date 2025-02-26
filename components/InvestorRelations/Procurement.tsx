"use client";

import { useState } from "react";
import Modal from "../ui/modal";
import { ContentType } from "@/types/indes";
import {X} from "lucide-react";

const Procurement:React.FC<{data: ContentType}> = ({data}) => {
    const [isOpen, setIsOpen] = useState<string | null>(null);
    
    return (
        <section className="grid-cols-1 md:grid-cols-3 gap-8 grid  mx-auto mt-8 lg:mt-16  container">
        {data.body.map((d) => (
          <section id="procurement" key={d._id}>
            <div className="cursor-pointer group rounded-2xl group overflow-hidden" onClick={() =>  setIsOpen(d._id)}>
             <div className="">
               <img
                  src={d?.images[0]?.images[0]?.url}
                  className="max-w-44 mx-auto group-hover:scale-95 transition-all"
                  alt={d.button_route}
                />
                <div className="mt-4 text-center">{d.title}</div>
              </div>
            </div>
             <Modal
              isOpen={isOpen === d._id}
              onClose={() => setIsOpen?.(null)}
            >
              <header className="flex items-center justify-between mt-2 mb-3">
                <section id="title">
                  <p className="text-lg text-green-light font-semibold">{d.title}</p>
                </section>
                <div className="w-6 h-6 text-center hover:text-red-800 hover:cursor-pointer">
                  <X className="w-5" onClick={() => setIsOpen?.(null)}/>
                </div>
              </header>
                <div
                  className="dont-reset pr-4 basis-1 h-full max-h-[60vh] lg:max-h-[50vh]  overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-[#005CAB]
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-[#005CAB]"
                  dangerouslySetInnerHTML={{__html: d.text}}
                ></div>
            </Modal>
          </section>
        ))}
      </section>
    );
  };
  
  export default Procurement;
  