"use client";
import { useState } from "react";
import axios from "axios";

import { numInRange } from "@/lib/utils";

import Filter from "../Filter";
import ExternalListingsGrid from "./ExternalListingsGrid";
import Loading from "@/components/Loading";

const ExternalListings = () => {
  const [invalidInputWarning, setInvalidInputWarning] = useState(false);
  const [propertyRequestSubmitted, setPropertyRequestSubmitted] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [properties, setProperties] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxBedrooms, setMaxBedrooms] = useState(5);
  const [letType, setLetType] = useState("");

  const handleButtonClick = (event) => {
    event.preventDefault();
    setPropertyRequestSubmitted(false);
    setLoading(false);
    setInvalidInputWarning(false);
    setProperties([]);
    if (
      searchLocation.trim() === "" ||
      !numInRange(minPrice, 0, 1500) ||
      !numInRange(maxPrice, 0, 1500) ||
      !numInRange(minBedrooms, 1, 5) ||
      !numInRange(maxBedrooms, 1, 5) ||
      minPrice > maxPrice ||
      minBedrooms > maxBedrooms
    ) {
      setInvalidInputWarning(true);
    } else {
      setInvalidInputWarning(false);
      fetchLocation();
    }
  };

  const fetchLocation = async () => {
    const headers = {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "rightmove4.p.rapidapi.com",
    };
    const params = {
      location: `${searchLocation}`,
    };
    try {
      setLoading(true);
      const response = await axios.get(
        "https://rightmove4.p.rapidapi.com/locations",
        { headers, params },
      );
      if (response.data.data.length == 0) {
        window.alert(
          "No location with that name was found. Please refine your search.",
        );
      } else {
        setPropertyRequestSubmitted(true);
        fetchProperties(response.data.data[0].key);
      }
    } catch {
      setLoading(false);
      window.alert(
        "An error has occured while fetching the location that you input.",
      );
    }
  };

  const fetchProperties = async (locationIdentifier) => {
    const headers = {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "uk-real-estate-rightmove.p.rapidapi.com",
    };
    const params = {
      identifier: `${locationIdentifier}`,
      property_type: "Flat",
      do_not_show_retirement_home: "true",
      min_price: `${minPrice}`,
      max_price: `${maxPrice}`,
      min_bedroom: `${minBedrooms}`,
      max_bedroom: `${maxBedrooms}`,
      type_of_let: `${letType}`,
    };
    try {
      setProperties([]);
      const response = await axios.get(
        "https://uk-real-estate-rightmove.p.rapidapi.com/rent/property-to-rent",
        { headers, params },
      );
      setLoading(false);
      setProperties(response.data.data || []);
    } catch {
      setLoading(false);
      window.alert(
        "An error has occured while fetching property results. Please try again",
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <>
        <Filter
          minPrice={minPrice}
          maxPrice={maxPrice}
          minBedrooms={minBedrooms}
          maxBedrooms={maxBedrooms}
          searchQuery={searchLocation}
          periodAvailableFilter={letType}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onMinBedroomsChange={setMinBedrooms}
          onMaxBedroomsChange={setMaxBedrooms}
          onSearchQueryChange={setSearchLocation}
          onPeriodAvailableChange={setLetType}
          showSearchButton={true}
          onSearchButtonClick={handleButtonClick}
        />
      </>

      {!loading && invalidInputWarning && (
        <div className="mt-4 text-xl text-destructive">
          <p>Invalid input. Please ensure that:</p>
          <ul className="list-inside list-disc">
            <li>All fields are filled in.</li>
            <li>Number of bedrooms is between 1 and 5</li>
            <li>Prices are between 0 and 1500(PCM)</li>
          </ul>
        </div>
      )}

      {loading && <Loading />}

      {propertyRequestSubmitted &&
        properties.length == 0 &&
        !loading &&
        !invalidInputWarning && (
          <div className="mt-4 text-xl text-destructive">
            <p>No properties found with the given criteria.</p>
          </div>
        )}

      {properties.length > 0 && <ExternalListingsGrid listings={properties} />}
    </div>
  );
};
export default ExternalListings;
