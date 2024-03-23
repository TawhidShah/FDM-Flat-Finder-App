"use client";
import axios from "axios"
import React, { useState } from 'react'
const Listings = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const changeLocationState = (e) => {
    setSearchLocation(e.target.value);
  }
  const handleButtonClick = (event) => {
    event.preventDefault();
    const locationToSearch = searchLocation;
    if (locationToSearch == '') {
      //display mesage- invalid input
    }
    else {
      fetchLocation(locationToSearch);
    }
  }
  const fetchLocation = async (inputLocation) => {
    const headers =
    {
      'X-RapidAPI-Key': 'd3e773cfbbmsh969fb38e5d05e4cp1eb2e9jsnbf64876767cd',
      'X-RapidAPI-Host': 'zoopla4.p.rapidapi.com'
    }
    const params =
    {
      location: `${inputLocation}`
    }
    try {
      const response = await axios.get('https://zoopla4.p.rapidapi.com/locations', { headers, params });
      console.log(response);
      //here, check if the response contains any data. If it doesn't display a message indicating what the issue may be.
      fetchPropertyData(inputLocation)
    }
    catch
    {
      console.log("");
    }
  }
  const fetchPropertyData = (location) => {
    const headers =
    {
      'X-RapidAPI-Key': 'd3e773cfbbmsh969fb38e5d05e4cp1eb2e9jsnbf64876767cd',
      'X-RapidAPI-Host': 'zoopla4.p.rapidapi.com'
    }
    const parameters =
    {
      //parameters for the search go here 
    }
  }
  return (
    <div id="mainContainer">
      <p>Search for your dream property</p>
      <form>
        <input id="inputSearchLocation" type="text" placeholder="Enter a city/place name" value={searchLocation} onChange={changeLocationState}></input>
        <button id="submitButton" onClick={handleButtonClick}>Search</button>
      </form>
    </div>
  )
}
export default Listings