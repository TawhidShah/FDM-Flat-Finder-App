import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";

import Filter from "./InternalFilter";
import InternalListingsGrid from "./InternalListingsGrid";

const InternalListings = () => {
  const { user } = useUser();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxBedrooms, setMaxBedrooms] = useState(5);
  const [cityFilter, setCityFilter] = useState("");
  const [periodAvailableFilter, setPeriodAvailableFilter] = useState("");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("/api/listings").then((response) => {
      setListings(response.data);
    });
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`/api/users/${user?.username}/bookmarks`);
        localStorage.setItem("bookmarks", JSON.stringify(res.data.bookmarks));
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchBookmarks();
    }
  }, []);

  const filteredListings = listings.filter((listing) => {
    return (
      listing.price >= minPrice &&
      listing.price <= maxPrice &&
      listing.bedrooms >= minBedrooms &&
      listing.bedrooms <= maxBedrooms &&
      (listing.city.toLowerCase().includes(cityFilter.toLowerCase()) ||
        listing.description.toLowerCase().includes(cityFilter.toLowerCase()) ||
        listing.title.toLowerCase().includes(cityFilter.toLowerCase())) &&
      (periodAvailableFilter === "" ||
        listing.periodAvailable === periodAvailableFilter)
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
        periodAvailableFilter={periodAvailableFilter}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onMinBedroomsChange={setMinBedrooms}
        onMaxBedroomsChange={setMaxBedrooms}
        onCityFilterChange={setCityFilter}
        onPeriodAvailableChange={setPeriodAvailableFilter}
      />

      <InternalListingsGrid listings={filteredListings} />
    </main>
  );
};

export default InternalListings;
