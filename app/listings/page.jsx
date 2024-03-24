"use client";
import axios from "axios";
import React, { useState } from 'react';
import "./listings.css";
import propertyListing from "./propertyListing";
const Listings = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [displayEmptyInputWarning, setDisplayEmptyInputWarning] = useState(false);
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
      'X-RapidAPI-Key': 'd3e773cfbbmsh969fb38e5d05e4cp1eb2e9jsnbf64876767cd',
      'X-RapidAPI-Host': 'rightmove4.p.rapidapi.com'
    }
    const params =
    {
      location: `${inputLocation}`
    }
    try {
      const response = await axios.get('https://rightmove4.p.rapidapi.com/locations', { headers, params });
      console.log(`We are now fetching data with the location ${response.data.data[0].key}`);
      fetchPropertyData(response.data.data[0].key); //will be changed to provide a dropdown enabling the user to select a more specific location
    }
    catch
    {
      console.log("An error has occured while fetching the location that you input.");
    }
  }

  const fetchPropertyData = async (location) => {
    const headers =
    {
      'X-RapidAPI-Key': 'd3e773cfbbmsh969fb38e5d05e4cp1eb2e9jsnbf64876767cd',
      'X-RapidAPI-Host': 'rightmove4.p.rapidapi.com'
    }
    const params =
    {
      locationKey: `${location}`
    }
    try {
      const response = await axios.get('https://rightmove4.p.rapidapi.com/properties/rent', { headers, params });
      console.log(response.data);
    }
    catch
    {
      console.log("An error has occured while fetching property results. Please try again.");
    }
  }
  return (
    <div id="mainContainer">
      <h1 id="infoText">Search for your dream property</h1>
      <form>
        <input className="inputSearchLocation" type="text" placeholder="Enter a city/place name" value={searchLocation} onChange={changeLocationState}></input>
        <button id="submitButton" onClick={handleButtonClick}>Search</button>
        {displayEmptyInputWarning == true ? <div id="emptyInputWarning"><p>Please ensure that you fill in the box above.</p> </div> : <p></p>}
      </form>
    </div>
  )
}
export default Listings