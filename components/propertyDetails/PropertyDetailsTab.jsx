import { useState } from "react";

import ImagesGallery from "@/components/Listings/internalListings/ImagesGallery";

const PropertyDetailsTab = ({ listing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  listing.address =
    typeof listing.address === "string"
      ? listing.address.split("|").filter((a) => a !== "")
      : listing.address;

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
          <div className="mt-4 flex">
            <span className="font-bold text-white">Address:</span>
            <div className="ml-2 text-primary">
              {listing.address.map((address, index) => (
                <p key={index}>{address}</p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span className="font-bold text-white">Nearby Stations:</span>
            <span className="text-primary">
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

export default PropertyDetailsTab;
