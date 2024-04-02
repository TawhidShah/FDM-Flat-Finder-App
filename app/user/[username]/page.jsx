"use client";
import { countries } from "@/constants/countries";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Select from "react-select";
import ListingSmall from "@/components/ListingSmall";
import './profile.css';

const User = ({ params }) => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = "/api/users/" + params.username;
        const response = await axios.get(path);
        console.log(response.data);
        setMainUser(response.data);
        setLanguages(response.data.languages);
        setHobbies(response.data.hobbies);
        setPreferences(response.data.preferences)
        setListings(response.data.listings)
      } catch (error) {
        console.log("Couldn't fetch user", error)
      }
    }
    fetchData();
  }, [])

  const makeSelect = (arr) => {
    return arr?.map(item => ({value:item,label:item }))
  } 

  const { user } = useUser();
  const [mainUser, setMainUser] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [listings, setListings] = useState(null);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="main">
        <div className="info">
          <h2>{user?.fullName}</h2>
          <p>Age: 18</p>
          <p>Country: {mainUser?.country}</p>
        </div>
        <img src={user?.imageUrl} alt="" />
      </div>
      <div className="extra">
        <h2>Username</h2>
        <p>{user?.username}</p>
        <h2>Email Address</h2>
        <p>{user?.emailAddresses[0].emailAddress}</p>
      </div>
      <div className="personal">
        <h2>Languages</h2>
        <div className="list">
          {languages?.map((item) => <li>{item}</li>)}
        </div>
        <p></p>
        <h2>Hobbies</h2>
        <div className="list">
          {hobbies?.map((item) => <li>{item}</li>)}
        </div>
        <h2>Prefences</h2>
        <div className="list">
          {preferences?.map((item) => <li>{item}</li>)}
        </div>
        <h2>Listings</h2>
        <div className="listings">
          {listings?.map((item) => <ListingSmall key={item._id} listing={item} /> )}
        </div>
      </div>
    </div>
  );
};

export default User;
