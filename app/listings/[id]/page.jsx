"use client";
import { useEffect, useState } from "react";

import axios from "axios";

import ImagesGallery from "@/components/internalListings/ImagesGallery";

import "./page.css";

const Listing = ({ params }) => {
  const { id } = params;
  const [listing, setListing] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
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
    <div className="mx-auto w-[60%] px-12 pt-6">
      <h1 className="text-2xl font-semibold">{listing.title}</h1>
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
              index === 1 ? "rounded-tr-lg" : index === 3 ? "rounded-br-lg" : ""
            }`}
            onClick={handleImageClick}
          />
        ))}
        {isModalOpen && (
          <ImagesGallery
            title={listing.title}
            images={listing.images}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Listing;
