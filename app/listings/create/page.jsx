"use client";

import React from "react";
import { useState } from "react";
import styles from "./CreateListings.module.css";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Select from "react-select";

const initialFormData = {
  title: "",
  description: "",
  price: "",
  propertyType: "",
  availability: "Available",
  periodAvailable: "",

  country: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
  postcode: "",
  nearbyStations: [],

  numberOfRooms: "",
  roomsAvailable: "",
  bathrooms: "",
  area: "",
  amenities: [],

  tenants: [],

  images: [], // added images field to store uploaded images of properties
};

const CreateListing = () => {

  const { user } = useUser();
  const username = user?.username;

  // owner is set to the username of the logged in user, which is a unique identifier
  const [formData, setFormData] = useState( { ...initialFormData, owner: username } );
  console.log(formData);

  // added an if else statement to the handle change that adds the images to the form submission data
  const handleChange = (e) => {
    if (e.target.name === "image") { // seperately handle the image upload action
      const files = e.target.files;
      setFormData({
        ...formData,
        images: files,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combining addressLine1, addressLine2, and postcode into one string
    const combinedAddress = [
      formData.addressLine1,
      formData.addressLine2,
      formData.postcode,
    ].join("|");

    const submissionData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      propertyType: formData.propertyType,
      availability: formData.availability,
      periodAvailable: formData.periodAvailable,

      country: formData.country,
      city: formData.city,
      address: combinedAddress,
      nearbyStations: formData.nearbyStations,

      bedrooms: formData.numberOfRooms,
      bedroomsAvailable: formData.roomsAvailable,
      bathrooms: formData.bathrooms,
      area: formData.area,
      amenities: formData.amenities,

      tenants: formData.tenants,
      owner: formData.owner,

      images: [],
    };

    try {
      // tried adding submission for images

      // const uploadedImageURLs = await uploadImages(formData.images);
      // // add uploaded image URLs to submission data
      // submissionData.images = uploadedImageURLs;

      axios.post("/api/listings", submissionData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // for images submission
  const uploadImages = async (images) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    const res = await axios.post("/api/images/uploadImages", formData);
    return res.data.links;
  };

  return (
    <div className={styles.container}>
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit} action="">
        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        {/* NEED IMAGES CHECK OUT REACT DROPZONE AND REACT SORTABLE */}
        <label>
          Images:
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            multiple
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Property Type:
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
          >
            <option value="">Select Property Type</option>
            <option value="Flat">Flat</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
            <option value="Shared Flat">Shared Flat</option>
            <option value="Shared House">Shared House</option>
          </select>
        </label>
        <label>
          Availability:
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value="">Select Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </label>
        <label>
          Period Available:
          <select
            name="periodAvailable"
            value={formData.periodAvailable}
            onChange={handleChange}
          >
            <option value="">Select Availability</option>
            <option value="Short">Short term(0-3 months)</option>
            <option value="Medium">Medium (3-12 months)</option>
            <option value="Long">Short term(12+)</option>
          </select>
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Address Line 1:
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </label>
        <label>
          Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </label>
        <label>
          Postcode:
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
          />
        </label>
        {/* NEED TO ADD NEARBY STATIONS USE REACT-SELECT WITH MULTISELECT */}
        <label>
          Nearby Stations:
          <Select
            name="nearbyStations"
            isMulti
            options={formData.nearbyStations}
            onChange={(selectedOptions) => setFormData({ ...formData, nearbyStations: selectedOptions })}
            onInputChange={(inputValue) => {
              if (inputValue) {
                // create a new ooption object
                const newOption = { value: inputValue, label: inputValue };
                // previous form data is there to ensure that we are updating the latest state of the form data - essentially adding a new option to the list
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  nearbyStations: [...prevFormData.nearbyStations, newOption],
                }));
              }
            }}
            isClearable
            isCreatable
          />
        </label>
        <label>
          Number of Rooms:
          <input
            type="number"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleChange}
          />
        </label>
        {formData.propertyType === "Shared Flat" ||
        formData.propertyType === "Shared House" ? (
          <label>
            Rooms Available:
            <input
              type="number"
              name="roomsAvailable"
              value={formData.roomsAvailable}
              onChange={handleChange}
            />
          </label>
        ) : null}
        <label>
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Area:
          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </label>
        <label>
          Tenants:
          <input
            type="text"
            name="tenants"
            value={formData.tenants}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateListing;
