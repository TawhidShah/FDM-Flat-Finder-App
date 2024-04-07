"use client";
import { useEffect, useState } from "react";

import axios from "axios";

import ImagesGallery from "@/components/internalListings/ImagesGallery";

import "./page.css";
import Link from "next/link";

const Listing = ({ params }) => {
  const { id } = params;
  const [listing, setListing] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const openPopup = (url) => {
    const width = 700; 
    const height = 500; 
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(url, 'Popup', `width=${width},height=${height},left=${left},top=${top}`);
  };

  useEffect(() => {
    axios.get(`/api/listings/${id}`).then((response) => {
      setListing(response.data);
    });
  }, [id]);

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <>
      {!isModalOpen ? (
        <div className="mx-auto w-[60%] px-12 pt-6">
          <h1 className="text-2xl font-semibold  text-primary">{listing.title}</h1>
          <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-4">
            <img
              src={listing.images[0]}
              alt={`${listing.title} - image 1`}
              className="col-span-2 row-span-2 h-full w-full rounded-bl-lg rounded-tl-lg object-cover"
              onClick={handleImageClick}
            />
            {listing.images.slice(1, 5).map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`${listing.title} - image ${index + 2}`}
                className={`h-full w-full object-cover ${
                  index === 1
                    ? "rounded-tr-lg"
                    : index === 3
                      ? "rounded-br-lg"
                      : ""
                }`}
                onClick={handleImageClick}
              />
            ))}
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Description:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.description}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Price:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.price}$</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Property Type:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.propertyType}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Availability:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.availability}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Country:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.country}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">City:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.city}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Address:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.address}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Nearby Stations:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.nearbyStations.join(", ")}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Bedrooms:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.bedrooms}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Bathrooms:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.bathrooms}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className="text-white font-bold">Area:</span>
            <span style={{ color: 'rgb(197, 225, 0)' }}>  {listing.area}</span>
          </div>
          <div style={{ marginTop: '10px', marginBottom: '20px' }}>
            <span className="text-white font-bold">Poseted by:</span>
            <span style={{ color: 'rgb(197, 225, 0)', marginRight: '10px' }}> {listing.owner.username}</span>
            <button className="hover:bg-primary hover:text-black text-white font-bold py-2 px-4 rounded" onClick={() => openPopup(`/user/${listing.owner.username}`)}>
              View Profile
            </button>
          </div>
        </div>
      ) : (
        <ImagesGallery
          title={listing.title}
          images={listing.images}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Listing;

