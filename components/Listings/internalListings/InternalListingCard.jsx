import Link from "next/link";

import { useState } from "react";

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { LuBed, LuBath } from "react-icons/lu";
import { toast } from "react-toastify";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

const InternalListingCard = ({ listing, className }) => {
  const { user } = useUser();

  const [bookmarked, setBookmarked] = useState(
    localStorage.getItem("bookmarks")?.includes(listing._id),
  );

  const title =
    listing && listing.title && listing.title.length > 28
      ? `${listing.title.substring(0, 28)}...`
      : listing && listing.title;

  const description =
    listing.description && listing.description.length > 150
      ? `${listing.description.substring(0, 160)}...`
      : listing.description;

  const handleBookmarked = async () => {
    try {
      const res = await axios.post(`/api/users/${user.username}/bookmarks`, {
        listingId: listing._id,
        action: bookmarked ? "remove" : "add",
      });
      setBookmarked(!bookmarked);
      localStorage.setItem("bookmarks", JSON.stringify(res.data.bookmarks));

      if (!bookmarked) {
        toast.success("Listing added to favourites");
      } else {
        toast.success("Listing removed from favourites");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "ERROR! There was an issue adding this listing to favourites",
      );
    }
  };

  return (
    <div
      key={listing.id}
      className={cn(
        "shadow-custom relative flex h-[500px] max-h-[500px] flex-col gap-3 overflow-hidden rounded-lg",
        className,
      )}
    >
      <svg
        onClick={handleBookmarked}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="absolute right-2 top-2 z-[10000] h-8 w-8 outline-none hover:cursor-pointer"
        stroke="#fff"
        fill={bookmarked ? "rgba(255,0,0,0.7)" : "rgba(0,0,0,0.5)"}
      >
        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
      </svg>

      <Carousel
        className="h-[250px] max-h-[250px]"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {listing.images.map((picture) => (
            <CarouselItem key={picture}>
              <img
                className="h-[250px] w-full rounded-lg object-cover object-center"
                src={picture}
                alt={`Image ${picture}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 border-none bg-transparent hover:bg-white focus:outline-none" />
        <CarouselNext className="right-1 border-none bg-transparent hover:bg-white focus:outline-none" />
      </Carousel>
      <Link
        className="flex h-[250px] max-h-[250px] flex-1 flex-col justify-between gap-2 p-2 text-white"
        href={`/listings/${listing._id}`}
        target="_blank"
      >
        <h1 className="text-center text-2xl font-bold">{title}</h1>
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
          <span className="text-sm">{listing.city}</span>
          <span className="text-md">£{listing.price}</span>
        </div>
      </Link>
    </div>
  );
};

export default InternalListingCard;
