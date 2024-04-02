"use client";
import mockListings from "@/constants/mockListings";
import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import internalStyles from "./internal.css"; // Import the internal CSS file

export default function Home() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxBedrooms, setMaxBedrooms] = useState(5);
  const [cityFilter, setCityFilter] = useState("");

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleMinBedroomsChange = (e) => {
    setMinBedrooms(Number(e.target.value));
  };

  const handleMaxBedroomsChange = (e) => {
    setMaxBedrooms(Number(e.target.value));
  };

  const handleCityFilterChange = (e) => {
    setCityFilter(e.target.value);
  };

  const filteredListings = mockListings.filter((listing) => {
    return (
      listing.price >= minPrice &&
      listing.price <= maxPrice &&
      listing.bedrooms >= minBedrooms &&
      listing.bedrooms <= maxBedrooms &&
      listing.city.toLowerCase().includes(cityFilter.toLowerCase())
    );
  });

  return (
    <main className="flex flex-1 flex-col mt-4">
      <div className={internalStyles.filterContainer}>
        <label htmlFor="minPrice" className="label">
          Min Price:
        </label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          min={0}
          max={maxPrice}
          step="50"
          onChange={handleMinPriceChange}
          className="input"
        />
        <label htmlFor="maxPrice" className="label">
          Max Price:
        </label>
        <input
          type="number"
          id="maxPrice"
          min={minPrice}
          max={5000}
          step="50"
          onChange={handleMaxPriceChange}
          className="input"
        />
        <label htmlFor="minBedrooms" className="label">
          Min Bedrooms:
        </label>
        <input
          type="number"
          id="minBedrooms"
          value={minBedrooms}
          min={1}
          max={maxBedrooms}
          onChange={handleMinBedroomsChange}
          className="input"
        />
        <label htmlFor="maxBedrooms" className="label">
          Max Bedrooms:
        </label>
        <input
          type="number"
          id="maxBedrooms"
          value={maxBedrooms}
          min={minBedrooms}
          max={5}
          onChange={handleMaxBedroomsChange}
          className="input"
        />
        <label htmlFor="city" className="label">
          City:
        </label>
        <input
          type="text"
          id="city"
          placeholder="City"
          value={cityFilter}
          onChange={handleCityFilterChange}
          className="input"
        />
      </div>
      {filteredListings.map((listing) => (
        <div
          key={listing.id}
          className={`m-8 flex flex-col items-center justify-center rounded-lg border border-gray-900 bg-white p-8 shadow-lg ${internalStyles.listingContainer}`}
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
            <CarouselPrevious className="carousel-control" />
            <CarouselNext className="carousel-control" />
          </Carousel>
          <h2 className="mt-4 text-2xl font-bold">{listing.title}</h2>
          <p className="mt-2 text-lg">{listing.description}</p>
          <p className="mt-2 text-lg font-bold">${listing.price}</p>
        </div>
      ))}
    </main>
  );
}


