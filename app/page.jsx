"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();

  const [listings, setListings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const exampleListing = {
    title: "3 Bedroom House in London",
    description: "A beautiful 3 bedroom house in central London",
    price: 2000,
    propertyType: "House",
    availability: "Available",
    country: "UK",
    city: "London",
    address: "123 Fake Street",
    bedrooms: 3,
    bathrooms: 2,
    owner: user?.username,
  };

  useEffect(() => {
    const fetchListings = async () => {
      const response = await axios.get("/api/listings");
      setListings(response.data);
    };
    fetchListings();
    setRefresh(false);
  }, [refresh]);

  const createUser = async () => {
    const response = await axios.post("/api/users", {
      username: user?.username,
      country: "UK",
      clerkId: user?.id,
    });
    console.log("create user response", response);
  };

  const createListing = async () => {
    const response = await axios.post("/api/listings", exampleListing);
    setRefresh(true);
    console.log("create listing response", response);
  };

  const deleteListing = async (id) => {
    const response = await axios.delete(`/api/listings/${id}`);
    console.log("delete listing response", response);
    setRefresh(true);
  };

  return (
    <main className="flex flex-1 flex-col">
      <button className="bg-blue-500 p-2 text-white" onClick={createUser}>
        CREATE THIS USER
      </button>
      <br />
      <button className="bg-blue-500 p-2 text-white" onClick={createListing}>
        CREATE A LISTING
      </button>
      <br />
      <button className="bg-blue-500 p-2 text-white" onClick={deleteListing}>
        DELETE ALL LISTINGS
      </button>

      <div>
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="my-2 border border border-black p-2 flex justify-around items-center"
          >
            <div>
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <p>Price: {listing.price}</p>
              <p>Property Type: {listing.propertyType}</p>
              <p>Availability: {listing.availability}</p>
              <p>
                Location: {listing.city}, {listing.country}
              </p>
              <p>Address: {listing.address}</p>
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>Bathrooms: {listing.bathrooms}</p>
              <p>Owner: {listing.owner.username}</p>
            </div>

            <button
              className="bg-red-500 text-white w-32 h-32 hover:bg-red-700 rounded-full flex justify-center items-center text-2xl font-bold"
              onClick={() => deleteListing(listing._id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
