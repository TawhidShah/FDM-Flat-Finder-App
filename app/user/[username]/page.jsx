"use client";
import { countries } from "@/constants/countries";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import './profile.css';

const User = ({ params }) => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(path);
        console.log(response.data)
        setUser(response.data);
      } catch (error) {
        console.log("Couldn't fetch user", error)
      }
    }
    fetchData();
  }, [])

  const path = "/api/users/" + params.username;
  const { user } = useUser();
  const [auser, setUser] = useState(null);
  const hobbies = auser?.hobbies.map((hobby, index) => <div className="tag" key={index}>{hobby}</div>)
  const langages = auser?.languages.map((language, index) => <div className="tag" key={index}>{language}</div>)
  const prefrences = auser?.preferences.map((preference, index) => <div className="tag" key={index}>{preference}</div>)
  //a const listings = auser.listings.map((hobby, index) => <div className="tag" key={index}>{hobby}</div>)

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="main">
        <div className="info">
          <h2>{user?.fullName}</h2>
          <p>Age: 18</p>
          <p>Country: Test</p>
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
        <p></p>
        <h2>Hobbies</h2>
        <p>{hobbies}</p>
        <h2>Prefences</h2>
        <p></p>
        <h2>Listings</h2>
        <p></p>
        
      </div>
    </div>
  );
};

export default User;
