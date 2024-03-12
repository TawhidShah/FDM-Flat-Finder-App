"use client";
import mockListings from "@/constants/mockListings";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* EXAMPLE HEADER EXTRACT TO COMPONENT */}
      <div className="flex justify-between items-center w-full bg-gray-500 h-16">
        <h1 className="font-bold text-2xl">Flat Finder App</h1>
        <h1 className="font-bold text-2xl">Sign-in</h1>
      </div>
      {mockListings.map((listing) => (
        <div
          key={listing.id}
          className="flex flex-col items-center justify-center p-8 m-8 bg-white rounded-lg shadow-lg border border-gray-900"
        >
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {listing.images.map((image) => (
                <CarouselItem key={image}>
                  <Image
                    src={image}
                    alt={listing.title}
                    width={300}
                    height={200}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <h2 className="mt-4 text-2xl font-bold">{listing.title}</h2>
          <p className="mt-2 text-lg">{listing.description}</p>
          <p className="mt-2 text-lg font-bold">${listing.price}</p>
        </div>
      ))}
    </main>
  );
}
