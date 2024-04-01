"use client";
import React, { useState } from "react";
import mockListings from "@/constants/mockListings";
import "./page.css";
import { CircleChevronLeft } from "lucide-react";
import { CircleChevronRight } from "lucide-react";
import "./page.css";

const Listing = ({ params }) => {
  const { id } = params;
  const listing = mockListings.find((listing) => listing.id.toString() === id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % listing.images.length,
    );
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1,
    );
  };

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="container">
      <div className="images">
        <img src={listing.images[currentImageIndex]} alt="Listing" />
        <div className="arrows">
          <div className="arrow_left" onClick={prevImage}>
            <CircleChevronLeft size="32" />
          </div>
          <div className="arrow_right" onClick={nextImage}>
            <CircleChevronRight size="32" />
          </div>
        </div>

        <img src={listing.images[0]} alt="First Image" />
      </div>

      <form className="booking_form" method="GET" action="">
        <fieldset>
          <legend id="formtitle">BOOKING FORM</legend>
          <p id="formInfo">
            <label for="name">Name:</label>
            <br />

            <input type="text" id="name" name="name" required />
            <br />
            <label for="email">Email:</label>
            <br />
            <input type="email" id="email" name="email" required />
            <br />

            <input type="text" id="name" name="name" required />
            <br />
            <label for="email">Email:</label>
            <br />
            <input type="email" id="email" name="email" required />
            <br />
          </p>
          <button id="formButton" type="submit">
            Submit
          </button>
        </fieldset>
      </form>

      <div className="owner">
        <a href={listing.IMAGES_FROM} target="_blank" rel="noopener noreferrer">
          Owner
        </a>
      </div>

      <div className="chatButton">
        <button>Chat with agent</button>
      </div>

      <div className="details">
        <h2>{listing.title}</h2>
        <ul>
          <li>Description: {listing.description}</li>
          <li>Price: ${listing.price}</li>
          <li>Property Type: {listing.propertyType}</li>
          <li>Number of Bedrooms: {listing.bedrooms}</li>
          <li>Number of Bathrooms: {listing.bathrooms}</li>
          <li>Area: {listing.area}</li>
          <li>City: {listing.city}</li>
          <li>Address: {listing.address}</li>
          <li>Nearby Stations: {listing.nearbyStations.join(", ")}</li>
        </ul>
      </div>
    </div>
  );
};

export default Listing;
