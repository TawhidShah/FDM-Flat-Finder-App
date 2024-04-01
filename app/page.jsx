"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

import WelcomeMessage from "../components/WelcomeMessage";
import Link from "next/link";

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
    try {
      const response = await axios.post("/api/users", {
        username: user?.username,
        country: "UK",
        clerkId: user?.id,
      });
      if (response.status === 201) {
        console.log("User created successfully");
      }
      else {
        console.log("User creation failed");
      }
    }
    catch (error) {
      console.log("Error creating user", error);
    }
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
    <main className="flex flex-1 flex-col items-center">
      <section className="mt-10 w-full">
        <div className="flex flex-col">
          <button className="bg-blue-500 p-2 text-white" onClick={createUser}>
            CREATE THIS USER
          </button>
          <br />
          <button
            className="bg-blue-500 p-2 text-white"
            onClick={createListing}
          >
            CREATE A LISTING
          </button>
        </div>
        <div>
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="my-2 flex items-center justify-around border border border-black p-2"
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
                className="flex h-32 w-32 items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white hover:bg-red-700"
                onClick={() => deleteListing(listing._id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </section>
      <WelcomeMessage />
      <div className="mt-10">
        <Link
          href="/listings/external"
          className="hover:bg-primary-dark inline-block rounded-lg bg-primary p-3 px-6 text-2xl text-primary-foreground transition-colors"
        >
          Start Your Search
        </Link>
      </div>
    </main>
  );
}
