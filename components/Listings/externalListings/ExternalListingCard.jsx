import Link from "next/link";

import { LuBed, LuBath } from "react-icons/lu";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const rightmoveUrl = "https://www.rightmove.co.uk";

const ExternalListingCard = ({ listing }) => {
  const title =
    listing.displayAddress.length > 25
      ? listing.displayAddress.substring(0, 25) + "..."
      : listing.displayAddress;

  return (
    <div
      key={listing.id}
      className="flex h-[500px] min-h-[500px] flex-col gap-3 overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <Carousel
        className="h-[250px] w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {listing.propertyImages.images.map((picture) => (
            <CarouselItem>
              <img
                className="h-[250px] w-full object-cover object-center"
                src={picture.srcUrl}
                alt="Property Image"
              ></img>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 border-none bg-transparent hover:bg-white" />
        <CarouselNext className="right-0 border-none bg-transparent hover:bg-white" />
      </Carousel>
      <Link
        className="flex h-[250px] flex-1 flex-col justify-between"
        href={rightmoveUrl + listing.propertyUrl}
        target="_blank"
      >
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <div className="mx-auto flex items-center gap-3">
          <span className="text-sm text-gray-600">{listing.propertyType}</span>
          {listing.bedrooms && (
            <>
              <LuBed />
              <span className="text-sm text-gray-600">{listing.bedrooms}</span>
            </>
          )}
          {listing.bathrooms && (
            <>
              <LuBath />
              <span className="text-sm text-gray-600">{listing.bathrooms}</span>
            </>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">{listing.summary}</p>
        <div className="mt-3 flex justify-between p-1">
          <span className="text-sm text-gray-600">{listing.countryCode}</span>
          <span className="text-md text-gray-600">
            {listing.price.displayPrices[0].displayPrice}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ExternalListingCard;
