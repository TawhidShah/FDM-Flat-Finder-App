"use client";
import axios from "axios";
import React, { useState } from 'react';
import './listings.css';
import Property from './Property.jsx';
const Listings = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [displayEmptyInputWarning, setDisplayEmptyInputWarning] = useState(false);
  const [properties, setProperties] = useState([]);

  const changeLocationState = (e) => {
    setSearchLocation(e.target.value);
  }
  const handleButtonClick = (event) => {
    event.preventDefault();
    const locationToSearch = searchLocation;
    if (locationToSearch == '') {
      setDisplayEmptyInputWarning(true);
    }
    else {
      setDisplayEmptyInputWarning(false);
      fetchLocation(locationToSearch);
    }
  }

  const fetchLocation = async (inputLocation) => {
    const headers =
    {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'rightmove4.p.rapidapi.com'
    }
    const params =
    {
      location: `${inputLocation}`
    }
    try {
      const response = await axios.get('https://rightmove4.p.rapidapi.com/locations', { headers, params });
      console.log(`We are now fetching data with the location ${response.data.data[0].key}`);
      fetchProperties(response.data.data[0].key); //could be changed to provide a dropdown enabling the user to select a more specific location
    }
    catch
    {
      console.log("An error has occured while fetching the location that you input.");
    }
  }

  const fetchProperties = async (location) => {
    const headers =
    {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'uk-real-estate-rightmove.p.rapidapi.com'
    }
    const params =
    {
      identifier: `${location}`,
      property_type: 'Flat'
    }
    try {
      const response = await axios.get('https://uk-real-estate-rightmove.p.rapidapi.com/rent/property-to-rent', { headers, params });
      setProperties(response.data.data);
    }
    catch
    {
      console.log("An error has occured while fetching property results. Please try again.");
    }
  }

  return (
    <div id="mainContainer">
      <h1 id="infoText">Search for your dream property to rent</h1>
      <form>
        <input className="inputSearchLocation" type="text" placeholder="Enter a city/place name" value={searchLocation} onChange={changeLocationState}></input>
        <button id="submitButton" onClick={handleButtonClick}>Search</button>
        {displayEmptyInputWarning == true ? <div id="emptyInputWarning"><p>Please ensure that you fill in the box above.</p> </div> : <p></p>}
      </form>
      <div id="properties">
        {properties.map((property) => <Property key={property.id} numBath={property.bathrooms}
          numBed={property.bedrooms} estateAgent={property.customer.branchDisplayName}
          address={property.displayAddress} price={property.price.displayPrices[0].displayPrice}
          image={property.propertyImages.mainImageSrc} propertyType={property.propertySubType}
          description={property.propertyTypeFullDescription} summary={property.summary}></Property>)}
      </div>
    </div>
  )
}
export default Listings