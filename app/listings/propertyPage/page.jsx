
"use client";
import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";

import Loading from "@/components/Loading";
import ImagesGallery from "@/components/Listings/internalListings/ImagesGallery";

const PropertyListing = ({ params }) => {
  const { id } = params;
  const [listing, setListing] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const openPopup = (url) => {
    const width = 1400;
    const height = 800;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(
      url,
      "Popup",
      `width=${width},height=${height},left=${left},top=${top}`,
    );
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!listing && !loading) {
    return (
      <div className="mt-[15vh] flex w-full flex-1 flex-col items-center">
        <h1 className="text-4xl font-semibold text-primary">
          Listing not found
        </h1>

        <Link
          href="/listings"
          className="mt-4 rounded bg-primary p-3 font-semibold hover:bg-white"
        >
          Back to listings
        </Link>
      </div>
    );
  }

  return (
    <>
      {!isModalOpen ? (
        <div className="mx-auto w-[60%] px-12 pt-6">
          <h1 className="text-2xl font-semibold  text-primary">
            {listing.title}
          </h1>
          <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-4">
            <img
              src={listing.images[0]}
              alt={`${listing?.title} - image 1`}
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
          <div className="mt-4">
            <span className="font-bold text-white">Description:</span>
            <span className="text-primary"> {listing.description}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Price:</span>
            <span className="text-primary"> ${listing.price}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Property Type:</span>
            <span className="text-primary"> {listing.propertyType}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Availability:</span>
            <span className="text-primary"> {listing.availability}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Country:</span>
            <span className="text-primary"> {listing.country}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">City:</span>
            <span className="text-primary"> {listing.city}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Address:</span>
            <span className="text-primary"> {listing.address}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Nearby Stations:</span>
            <span className="text-primary">
              {" "}
              {listing.nearbyStations.join(", ")}
            </span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Bedrooms:</span>
            <span className="text-primary"> {listing.bedrooms}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Bathrooms:</span>
            <span className="text-primary"> {listing.bathrooms}</span>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Area:</span>
            <span className="text-primary"> {listing.area}</span>
          </div>
          <div className="my-4">
            <span className="font-bold text-white">Posted by:&nbsp;&nbsp;</span>
            <span
              onClick={() => openPopup(`/user/${listing.owner.username}`)}
              className="mr-2 cursor-pointer text-primary underline"
            >
              {listing.owner.username}
            </span>
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

export default PropertyListing;
