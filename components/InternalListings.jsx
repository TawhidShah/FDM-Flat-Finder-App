// components/Home.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./InternalFilter";
import Listing from "./InternalListing";

const InternalListings = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxBedrooms, setMaxBedrooms] = useState(5);
  const [cityFilter, setCityFilter] = useState("");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("/api/listings").then((response) => {
      setListings(response.data);
    });
  }, []);

  const filteredListings = listings.filter((listing) => {
    return (
      listing.price >= minPrice &&
      listing.price <= maxPrice &&
      listing.bedrooms >= minBedrooms &&
      listing.bedrooms <= maxBedrooms &&
      listing.city.toLowerCase().includes(cityFilter.toLowerCase())
    );
  });

  return (
    <main className="mt-4 flex flex-1 flex-col">
      <Filter
        minPrice={minPrice}
        maxPrice={maxPrice}
        minBedrooms={minBedrooms}
        maxBedrooms={maxBedrooms}
        cityFilter={cityFilter}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onMinBedroomsChange={setMinBedrooms}
        onMaxBedroomsChange={setMaxBedrooms}
        onCityFilterChange={setCityFilter}
      />

      {filteredListings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
      ))}
    </main>
  );
};

export default InternalListings;
