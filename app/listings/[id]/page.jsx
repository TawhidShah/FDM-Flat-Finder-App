import React from 'react';
import mockListings from './mockListings';
import './page.css';

const Listing = ({ params }) => {
  const { id } = params;
  const listing = mockListings.find(listing => listing.id.toString() === id);

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className='container'>
      <div className="images">
        <img src={listing.images[0]} alt="First Image" />
      </div>

      <form className="booking_form" method="GET" action="">
        <fieldset>
          <legend id="formtitle">BOOKING FORM</legend>
          <p id="formInfo">
            <label for="name">Name:</label><br />
            <input type="text" id="name" name="name" required /><br />
            <label for="email">Email:</label><br />
            <input type="email" id="email" name="email" required /><br />
          </p>
        <button id="formButton" type="submit">Submit</button>
        </fieldset>
  
      </form>

      <div className="owner">
        <a href={listing.IMAGES_FROM} target="_blank" rel="noopener noreferrer">Owner</a>
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
          <li>Nearby Stations: {listing.nearbyStations.join(', ')}</li>
        </ul>
      </div>
        
    </div>
  );
}

export default Listing;