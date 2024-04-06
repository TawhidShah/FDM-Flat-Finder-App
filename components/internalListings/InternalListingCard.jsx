import Link from "next/link";

import { LuBed, LuBath } from "react-icons/lu";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const InternalListingCard = ({ listing }) => {
  const title =
    listing.title.length > 25
      ? listing.title.substring(0, 25) + "..."
      : listing.title;

  return (
    <div
      key={listing.id}
      className="flex min-h-[400px] flex-col justify-between gap-3 overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {listing.images.map((picture) => (
            <CarouselItem>
              <img
                className="h-56 w-full rounded-lg object-cover object-center "
                src={picture}
                alt="Property Image"
              ></img>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 border-none bg-transparent hover:bg-white" />
        <CarouselNext className="right-0 border-none bg-transparent hover:bg-white" />
      </Carousel>
      <Link
        className="flex flex-1 flex-col justify-between gap-2"
        href={`/listings/${listing._id}`}
      >
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <div className="mx-auto flex gap-3">
          <span className="text-sm text-gray-600">{listing.propertyType}</span>
          {listing.bedrooms && (
            <>
              <LuBed color="#475569" />
              <span className="text-sm text-gray-600">{listing.bedrooms}</span>
            </>
          )}
          {listing.bathrooms && (
            <>
              <LuBath color="#475569" />
              <span className="text-sm text-gray-600">{listing.bathrooms}</span>
            </>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">{listing.description}</p>
        <div className="mt-3 flex justify-between p-1">
          <span className="text-sm text-gray-600">{listing.city}</span>
          <span className="text-md text-gray-600">£{listing.price}</span>
        </div>
      </Link>
    </div>
  );
};

export default InternalListingCard;
