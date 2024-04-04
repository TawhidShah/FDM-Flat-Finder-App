"use client";
import { useState } from "react";
import axios from "axios";
import { GridLoader } from "react-spinners";

import { numInRange } from "@/lib/utils";

import Property from "@/components/Property";

import "@/styles/ExternalListings.css";

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
  const [letType, setLetType] = useState("Don't Mind");

  const handleButtonClick = (event) => {
    event.preventDefault();
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
      fetchLocation(
        searchLocation,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
        ...(letType !== "Don't mind" ? [letType] : []),
      );
    }
  };

  const fetchLocation = async () => {
    const headers = {
      "X-RapidAPI-Key": "d3e773cfbbmsh969fb38e5d05e4cp1eb2e9jsnbf64876767cd",
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
      "X-RapidAPI-Key": "06515c88e2msh6735121f8b1acddp18fac6jsne0d6824106ef",
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
      setProperties(response.data.data);
    } catch {
      setLoading(false);
      window.alert(
        "An error has occured while fetching property results. Please try again",
      );
    }
  };
  return (
    <div id="mainContainer">
      <>
        <h1 id="infoText">Search for your dream property to rent</h1>
        <form>
          <div id="location">
            <input
              className="inputSearchLocation"
              type="text"
              placeholder="Enter a city/place name"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            ></input>
            <button id="submitButton" onClick={handleButtonClick}>
              Search
            </button>
          </div>
          <div id="propertyPreferences">
            <label htmlFor="minPrice">Min Price(PCM): </label>
            <input
              type="number"
              step="50"
              id="minPrice"
              value={minPrice}
              min="0"
              max="5000"
              onChange={(e) => setMinPrice(e.target.value)}
            ></input>
            <label htmlFor="maxPrice">Max Price(PCM): </label>
            <input
              type="number"
              step="50"
              id="maxPrice"
              value={maxPrice}
              min="0"
              max="1500"
              onChange={(e) => setMaxPrice(e.target.value)}
            ></input>
            <label htmlFor="minBeds">Min Bedrooms: </label>
            <input
              type="number"
              id="minBeds"
              value={minBedrooms}
              min="1"
              max="5"
              onChange={(e) => setMinBedrooms(e.target.value)}
            ></input>
            <label htmlFor="maxBeds">Max Bedrooms: </label>
            <input
              type="number"
              id="maxBeds"
              value={maxBedrooms}
              min="1"
              max="5"
              onChange={(e) => setMaxBedrooms(e.target.value)}
            ></input>
            <label htmlFor="longTermShortTerm">Long-Term/Short-Term?</label>
            <select
              name="letTypeDropdown"
              id="longTermShortTerm"
              value={letType}
              onChange={(e) => setLetType(e.target.value)}
            >
              <option>Don't Mind</option>
              <option>ShortTerm</option>
              <option>LongTerm</option>
            </select>
          </div>
        </form>
      </>

      {!loading && invalidInputWarning && (
        <div id="invalidInputWarning">
          <ul>
            <li id="firstLineOfList">Invalid input. Please ensure that:</li>
            <li>All fields are filled in.</li>
            <li>Number of bedrooms is between 1 and 5</li>
            <li>Prices are between 0 and 1500(PCM)</li>
          </ul>
        </div>
      )}

      {loading && <GridLoader className="mt-48" />}

      <div id="properties">
        {properties.map((property) => (
          <Property
            key={property.id}
            numBath={property.bathrooms}
            numBed={property.bedrooms}
            estateAgent={property.customer.branchDisplayName}
            address={property.displayAddress}
            price={property.price.displayPrices[0].displayPrice}
            images={property.propertyImages.images}
            description={property.propertyTypeFullDescription}
            summary={property.summary}
            link={property.propertyUrl}
          ></Property>
        ))}
        {properties.length == 0 &&
          propertyRequestSubmitted == true &&
          loading == false && (
            <div id="noPropertiesFound">
              <h1>No results found</h1>
              <p>Try widening your search. </p>
              <img
                src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg"
                alt="No
                properties found."
              ></img>
            </div>
          )}
      </div>
    </div>
  );
};
export default ExternalListings;
