"use client";
import React, { useState } from 'react'
import './listingPage.css'
const Listings = () => 
{
  const [searchLocation,setSearchLocation]=useState("");
  const changeLocationState=(e)=>
  {
    setSearchLocation(e.target.value);
  }
  const checkForEmptyInput=(searchLocation)=>
  {
    if(searchLocation=="")
    {
      console.log("Please enter a location in which to search for properties.");
    }
    else
    {
      fetchLocation({searchLocation});
    }
    
  }
  const fetchLocation=async(inputLocation)=>
  {
    const headers=
    {
      'X-RapidAPI-Key': process.e.RAPID_API_KEY,
      'X-RapidAPI-Host': 'zoopla.p.rapidapi.com'
    }
    const parameters=
    {
      locationPrefix:`${inputLocation}`
    }
    const response=await axios.get('https://zoopla.p.rapidapi.com/v2/auto-complete',{headers,parameters});
    //here, check if the response contains any data. If it doesn't display a message indicating what the issue may be.
    fetchPropertyData(inputLocation)
  }
  const fetchPropertyData=(location)=>
  {
    const headers=
    {
      'X-RapidAPI-Key': process.e.RAPID_API_KEY,
      'X-RapidAPI-Host': 'zoopla.p.rapidapi.com'
    }
    const parameters=
    {
      
    }
  }
  const submitButton=document.getElementById("submitButton");
  return (
    <div id="mainContainer">
      <p>Search for your dream property</p>
      <form>
          <input id="inputSearchLocation" type="text" placeholder="Enter a city/place name" value={searchLocation} onChange={changeLocationState} required></input>
          <button id="submitButton" onClick={checkForEmptyInput(location)}>Search</button>
      </form>
    </div>
  )
}

export default Listings