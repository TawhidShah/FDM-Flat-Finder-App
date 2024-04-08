"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  propertyTypes,
  availabilityOptions,
  availabilityPeriods,
} from "@/constants/createListing";

import styles from "./CreateListings.module.css";

const initialFormData = {
  title: "",
  description: "",
  price: "",
  propertyType: "",
  availability: "",
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

const locationInputFields = [
  { label: "Country", type: "text", name: "country" },
  { label: "City", type: "text", name: "city" },
  { label: "Address Line 1", type: "text", name: "addressLine1" },
  {
    label: "Address Line 2",
    type: "text",
    name: "addressLine2",
    optional: true,
  },
  { label: "Postcode", type: "text", name: "postcode" },
];

const CreateListing = () => {
  const { user } = useUser();
  const username = user?.username;

  const [formData, setFormData] = useState(initialFormData);

  const [nearbyStationsInputValue, setNearbyStationsInputValue] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // seperately handle the image upload action
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

    let requiredFields = Object.keys(formData);

    // remove optional fields
    requiredFields = requiredFields.filter(
      (key) =>
        !locationInputFields.find(
          (field) => field.name === key && field.optional,
        ),
    );

    // if the chosen property type is not shared flat or shared house, remove roomsAvailable from required fields
    if (
      formData.propertyType !== "Shared Flat" &&
      formData.propertyType !== "Shared House"
    ) {
      requiredFields = requiredFields.filter(
        (field) => field !== "roomsAvailable",
      );
    }

    // normal case to handle if the form has any empty required fields
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert("Please fill in all required fields");
      return;
    }

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
      nearbyStations: formData.nearbyStations.map((station) => station.value),

      bedrooms: formData.numberOfRooms,
      bedroomsAvailable: formData.roomsAvailable,
      bathrooms: formData.bathrooms,
      area: formData.area,
      amenities: formData.amenities,

      tenants: formData.tenants,
      owner: username,
    };

    try {
      // tried adding submission for images

      const uploadedImageURLs = await uploadImages(formData.images);
      // add uploaded image URLs to submission data
      submissionData.images = uploadedImageURLs;

      axios.post("/api/listings", submissionData);
      setFormData(initialFormData);
      toast.success("Listing created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error creating listing. Please try again later.");
    }
  };

  // for images submission
  const uploadImages = async (images) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
    }
    const res = await axios.post("/api/uploadImages", formData);
    return res.data.links;
  };

  const handleNearbyStationsKeyDown = (e) => {
    if (!nearbyStationsInputValue) return;
    switch (e.key) {
      case "Enter":
      case "Tab":
        setFormData({
          ...formData,
          nearbyStations: [
            ...formData.nearbyStations,
            {
              value: nearbyStationsInputValue,
              label: nearbyStationsInputValue,
            },
          ],
        });
        setNearbyStationsInputValue("");
        e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Listing</h1>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
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
          <Select
            onChange={(selectedOption) =>
              setFormData({
                ...formData,
                propertyType: selectedOption?.value || "",
              })
            } // added onChange function to set the selected value to the form data
            isClearable={true}
            isSearchable={true}
            name="propertyType"
            options={propertyTypes}
          />
        </label>
        <label>
          Availability:
          <Select
            onChange={(selectedOption) =>
              setFormData({
                ...formData,
                availability: selectedOption?.value || "",
              })
            }
            isClearable={true}
            isSearchable={true}
            name="availability"
            options={availabilityOptions}
          />
        </label>
        <label>
          Period Available:
          <Select
            onChange={(selectedOption) =>
              setFormData({
                ...formData,
                periodAvailable: selectedOption?.value || "",
              })
            }
            isClearable={true}
            isSearchable={true}
            name="periodAvailable"
            options={availabilityPeriods}
          />
        </label>

        {locationInputFields.map(({ label, type, name, optional }) => (
          <label key={name}>
            {label}:
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={optional ? "Optional" : ""}
            />
          </label>
        ))}
        <label>
          Nearby Stations:
          <CreatableSelect
            components={{ DropdownIndicator: null }}
            inputValue={nearbyStationsInputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={(newValue) =>
              setFormData({ ...formData, nearbyStations: newValue })
            }
            onInputChange={(inputValue) =>
              setNearbyStationsInputValue(inputValue)
            }
            onKeyDown={handleNearbyStationsKeyDown}
            placeholder="Type and press enter to add"
            value={formData.nearbyStations}
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
          <input name="area" value={formData.area} onChange={handleChange} />
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
