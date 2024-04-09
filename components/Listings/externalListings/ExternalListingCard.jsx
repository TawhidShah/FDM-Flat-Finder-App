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

  const description =
    listing.summary && listing.summary.length > 150
      ? `${listing.summary.substring(0, 160)}...`
      : listing.summary;

  return (
    <div
      key={listing.id}
      className="shadow-custom relative flex h-[500px] max-h-[500px] flex-col gap-3 overflow-hidden rounded-lg"
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
                className="h-[250px] w-full rounded-lg object-cover object-center"
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
        className="flex h-[250px] max-h-[250px] flex-1 flex-col justify-between gap-2 p-2 text-white"
        href={rightmoveUrl + listing.propertyUrl}
        target="_blank"
      >
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="mx-auto flex items-center gap-3">
          <span className="text-sm">{listing.propertyType}</span>
          {listing.bedrooms && (
            <>
              <LuBed />
              <span className="text-sm">{listing.bedrooms}</span>
            </>
          )}
          {listing.bathrooms && (
            <>
              <LuBath />
              <span className="text-sm">{listing.bathrooms}</span>
            </>
          )}
        </div>
        <p className="min-h[80px] h-[80px] text-sm">{description}</p>
        <div className="flex justify-between p-1">
          <span className="text-sm">{listing.countryCode}</span>
          <span className="text-md">
            {listing.price.displayPrices[0].displayPrice}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ExternalListingCard;
