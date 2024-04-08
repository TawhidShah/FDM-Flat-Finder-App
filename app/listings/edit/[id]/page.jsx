"use client"

import { useState, useEffect } from "react";
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

import styles from "./EditListings.module.css";

const locationInputFields = [
  { label: "Country", type: "text", name: "country" },
  { label: "City", type: "text", name: "city" },
  { label: "Address Line 1", type: "text", name: "addressLine1" }, // Changed from "addressLine1" to "address"
  {
    label: "Address Line 2",
    type: "text",
    name: "addressLine2",
    optional: true,
  },
  { label: "Postcode", type: "text", name: "postcode" },
];

const EditListing = ({ params }) => {
  const id = params.id; // Use params.id to get the listing's id

  const [nearbyStationsInputValue, setNearbyStationsInputValue] = useState("");

  const [formData, setFormData] = useState({
    // Initialize form data with empty values
    title: "",
    description: "",
    price: "",
    propertyType: "",
    availability: "",
    periodAvailable: "",
    country: "",
    city: "",
    address: "",
    nearbyStations: [],
    bedrooms: "",
    bedroomsAvailable: "",
    bathrooms: "",
    area: "",
    tenants: "",
  });

  useEffect(() => {
    // Fetch listing data when component mounts
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        const listingData = response.data;
        console.log("Fetched listing data:", listingData);

        const imageFiles = listingData.images.map(imageUrl => {
          return new File([], imageUrl.split('/').pop());
        });

        // extract the nearby stations to initialise the form data
        const nearbyStationsOptions = listingData.nearbyStations.map(station => {
            return { value: station, label: station };
        });
        const addressComponents = listingData.address.split("|");
        setFormData({
          ...listingData,
          images: imageFiles,
          
          // put the corresponding address components into the forms address fields
          addressLine1: addressComponents[0] || "",
          addressLine2: addressComponents[1] || "",
          postcode: addressComponents[2] || "",

          // nearby stations set as options
          nearbyStations: nearbyStationsOptions
        });
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update listing data
      await axios.put(`/api/listings/${id}`, formData);
      toast.success("Listing updated successfully!");
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Error updating listing. Please try again later.");
    }
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
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Listing</h1>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <label>
          Title:
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
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
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
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
            }
            isClearable={true}
            isSearchable={true}
            name="propertyType"
            options={propertyTypes}
            value={propertyTypes.find(
              (option) => option.value === formData.propertyType
            )}
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
            value={availabilityOptions.find(
              (option) => option.value === formData.availability
            )}
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
            value={availabilityPeriods.find(
              (option) => option.value === formData.periodAvailable
            )}
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
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </label>
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

export default EditListing;
