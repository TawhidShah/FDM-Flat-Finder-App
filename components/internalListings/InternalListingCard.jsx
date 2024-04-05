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
      className="flex flex-col justify-between gap-3 overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="self-center">
          {listing.images.map((picture) => (
            <CarouselItem>
              <img
                className="h-56 w-full rounded-lg object-cover object-center"
                src={picture}
                alt="Property Image"
              ></img>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-transparent hover:bg-gray-300" />
        <CarouselNext className="right-0 bg-transparent hover:bg-gray-300" />
      </Carousel>

      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">{listing.description}</p>
      <div className="mt-3 flex justify-between p-1">
        <span className="text-sm text-gray-600">{listing.city}</span>
        <span className="text-md text-gray-600">£{listing.price}</span>
      </div>
    </div>
  );
};

export default InternalListingCard;
