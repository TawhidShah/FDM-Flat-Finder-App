"use client";
import axios from "axios";
import React, { useState } from "react";
import "./listings.css";
import Property from "./Property.jsx";

const Listings = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [displayEmptyInputWarning, setDisplayEmptyInputWarning] =
    useState(false);
  const [displayInvalidInputWarning, setDisplayInvalidInputWarning] =
    useState(false);
  const [propertyRequestSubmitted, setPropertyRequestSubmitted] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxBedrooms, setMaxBedrooms] = useState(5);

  const changeLocationState = (e) => {
    setSearchLocation(e.target.value);
  };
  const changeMinPriceState = (e) => {
    setMinPrice(e.target.value);
  };
  const changeMaxPriceState = (e) => {
    setMaxPrice(e.target.value);
  };
  const changeMinBedState = (e) => {
    setMinBedrooms(e.target.value);
  };
  const changeMaxBedSate = (e) => {
    setMaxBedrooms(e.target.value);
  };
  const handleButtonClick = (event) => {
    event.preventDefault();
    const locationToSearch = searchLocation;
    const minimumPrice = minPrice;
    const maximumPrice = maxPrice;
    const minimumBedrooms = minBedrooms;
    const maximumBedrooms = maxBedrooms;
    if (
      locationToSearch != "" &&
      String(minimumPrice) != "" &&
      String(maximumPrice) != "" &&
      String(minimumBedrooms) != "" &&
      String(maximumBedrooms) != ""
    ) {
      setDisplayEmptyInputWarning(false);
      if (
        Number(minimumPrice) < 0 ||
        Number(minimumPrice) > 5000 ||
        Number(maximumPrice) < 0 ||
        Number(maximumPrice) > 5000 ||
        Number(minimumBedrooms) < 1 ||
        Number(minimumBedrooms) > 5 ||
        Number(maximumBedrooms) < 1 ||
        Number(maximumBedrooms) > 5 ||
        Number(minimumPrice) > Number(maximumPrice) ||
        Number(minimumBedrooms) > Number(maximumBedrooms)
      ) {
        setDisplayInvalidInputWarning(true);
      } else {
        setDisplayInvalidInputWarning(false);
        fetchLocation(
          locationToSearch,
          minimumPrice,
          maximumPrice,
          minimumBedrooms,
          maximumBedrooms,
        );
      }
    } else {
      setDisplayEmptyInputWarning(true);
    }
  };

  const fetchLocation = async (
    inputLocation,
    minPrice,
    maxPrice,
    minBed,
    maxBed,
  ) => {
    const headers = {
      "X-RapidAPI-Key": "d3e773cfbbmsh969fb38e5d05e4cp1eb2e9jsnbf64876767cd",
      "X-RapidAPI-Host": "rightmove4.p.rapidapi.com",
    };
    const params = {
      location: `${inputLocation}`,
    };
    try {
      setLoading(true);
      const response = await axios.get(
        "https://rightmove4.p.rapidapi.com/locations",
        { headers, params },
      );
      setPropertyRequestSubmitted(true);
      fetchProperties(
        response.data.data[0].key,
        minPrice,
        maxPrice,
        minBed,
        maxBed,
      ); //could be changed to provide a dropdown enabling the user to select a more specific location
    } catch {
      setLoading(false);
      window.alert(
        "An error has occured while fetching the location that you input.",
      );
    }
  };

  const fetchProperties = async (
    location,
    minPrice,
    maxPrice,
    minBed,
    maxBed,
  ) => {
    const headers = {
      "X-RapidAPI-Key": "d3e773cfbbmsh969fb38e5d05e4cp1eb2e9jsnbf64876767cd",
      "X-RapidAPI-Host": "uk-real-estate-rightmove.p.rapidapi.com",
    };
    const params = {
      identifier: `${location}`,
      property_type: "Flat",
      do_not_show_retirement_home: "true",
      min_price: `${minPrice}`,
      max_price: `${maxPrice}`,
      min_bedroom: `${minBed}`,
      max_bedroom: `${maxBed}`,
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
      {loading == true ? (
        <p></p>
      ) : (
        <h1 id="infoText">Search for your dream property to rent</h1>
      )}
      {loading == true ? (
        <p></p>
      ) : (
        <form>
          <div id="location">
            <input
              className="inputSearchLocation"
              type="text"
              placeholder="Enter a city/place name"
              value={searchLocation}
              onChange={changeLocationState}
            ></input>
            <button id="submitButton" onClick={handleButtonClick}>
              Search
            </button>
          </div>
          <div id="propertyPreferences">
            <label htmlFor="minPrice">Min Price: </label>
            <input
              type="number"
              step="50"
              id="minPrice"
              value={minPrice}
              min="0"
              max="5000"
              onChange={changeMinPriceState}
            ></input>
            <label htmlFor="maxPrice">Max Price: </label>
            <input
              type="number"
              step="50"
              id="maxPrice"
              value={maxPrice}
              min="0"
              max="5000"
              onChange={changeMaxPriceState}
            ></input>
            <label htmlFor="minBeds">Min Bedrooms: </label>
            <input
              type="number"
              id="minBeds"
              value={minBedrooms}
              min="1"
              max="5"
              onChange={changeMinBedState}
            ></input>
            <label htmlFor="maxBeds">Max Bedrooms: </label>
            <input
              type="number"
              id="maxBeds"
              value={maxBedrooms}
              min="1"
              max="5"
              onChange={changeMaxBedSate}
            ></input>
          </div>
        </form>
      )}
      {loading == true ? (
        <p></p>
      ) : (
        <section>
          {displayEmptyInputWarning == true ? (
            <div id="emptyInputWarning">
              <p>Please ensure that you fill in the boxes above.</p>{" "}
            </div>
          ) : (
            <p></p>
          )}
          {displayInvalidInputWarning == true ? (
            <div id="invalidInputWarning">
              <p>
                Please ensure that all non-text inputs are valid non-negative
                numbers, and that number of bedrooms are between 1 and 5.
              </p>
            </div>
          ) : (
            <p></p>
          )}
        </section>
      )}
      {loading == true ? (
        <p>Loading properties...</p>
      ) : (
        <div id="properties">
          {properties.map((property) => (
            <Property
              key={property.id}
              numBath={property.bathrooms}
              numBed={property.bedrooms}
              estateAgent={property.customer.branchDisplayName}
              address={property.displayAddress}
              price={property.price.displayPrices[0].displayPrice}
              image={property.propertyImages.mainImageSrc}
              propertyType={property.propertySubType}
              description={property.propertyTypeFullDescription}
              summary={property.summary}
            ></Property>
          ))}
          {properties.length == 0 &&
            propertyRequestSubmitted == true &&
            loading == false ? (
            <div id="noPropertiesFound">
              <h1>No results found</h1>
              <p>Try widening your search. </p>
              <img
                src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg"
                alt="No
                properties found."
              ></img>
            </div>
          ) : (
            console.log("Displaying property information...")
          )}
        </div>
      )}
    </div>
  );
};
export default Listings;
