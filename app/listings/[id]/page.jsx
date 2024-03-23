import React from 'react';
import mockListings from '.mockListings';

const Listing = ({ params }) => {
  const listingId = parseInt(params.id); // Assuming params.id is a string, convert it to an integer

  // Find the listing with the matching ID
  const listing = mockListings.find(listing => listing.id === listingId);

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div>
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <p>Price: {listing.price}</p>
      <p>Property Type: {listing.propertyType}</p>
      <p>Owner Type: {listing.ownerType}</p>
      <p>Address: {listing.address}</p>
      <p>Nearby Stations: {listing.nearbyStations.join(', ')}</p>
      <p>Bedrooms: {listing.bedrooms}</p>
      <p>Bathrooms: {listing.bathrooms}</p>
      <p>Area: {listing.area}</p>
      <div>
        {listing.images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>
      <a href={listing.IMAGES_FROM} target="_blank" rel="noopener noreferrer">View More Details</a>
    </div>
  );
}

export default Listing;