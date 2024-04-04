// components/Listing.js

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const InternalListing = ({ listing }) => {
  return (
    <div className="m-8 flex flex-col items-center justify-center rounded-lg border border-gray-900 bg-white p-8 shadow-lg">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {listing.images.map((image) => (
            <CarouselItem key={image}>
              <Image src={image} alt={listing.title} width={300} height={200} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="carousel-control" />
        <CarouselNext className="carousel-control" />
      </Carousel>
      <h2 className="mt-4 text-2xl font-bold">{listing.title}</h2>
      <p className="mt-2 text-lg">{listing.description}</p>
      <p className="mt-2 text-lg font-bold">${listing.price}</p>
    </div>
  );
};

export default InternalListing;
