"use client"; 

import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContentType } from "@/types/indes";

const BusinessCarousel = ({ bussinessList }: { bussinessList: ContentType[] }) => {
  const [selectedItem, setSelectedItem] = useState<ContentType | null>(null);

  return (
    <>
      {/* Carousel */}
      <Carousel>
        <CarouselContent>
          {bussinessList.map((d, index) => (
            <CarouselItem key={index} className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div
                key={d._id}
                className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
                onClick={() => setSelectedItem(d)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={d?.thumbnail_images[0]?.images[0]?.url}
                  alt={d?.title}
                />
                <div className="absolute px-4 bottom-4 text-white z-10">
                  <h2 className="font-bold text-green-light">{d.title}</h2>
                  <div
                    className="mt-2 line-clamp-3 overflow-hidden text-ellipsis"
                    dangerouslySetInnerHTML={{ __html: d.description }}
                  ></div>
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-60"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl">
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 flex flex-col justify-center">
                <DialogHeader>
                  <DialogTitle className="text-green-light">{selectedItem.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: selectedItem.description }}></div>
              </div>
              <div className="relative">
                <img className="w-full h-full object-cover rounded-xl" src={selectedItem?.thumbnail_images[0]?.images[0]?.url} alt={selectedItem.title} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusinessCarousel;