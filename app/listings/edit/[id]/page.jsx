"use client";

import { useState, useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

import { useRouter } from "next/navigation";

import {
  propertyTypes,
  availabilityOptions,
  availabilityPeriods,
} from "@/constants/createListing";

import styles from "./EditListings.module.css";
import Loading from "@/components/Loading";

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

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    margin: "10px 0",
    padding: "10px",
    width: "calc(100% - 20px)",
    border: "1px solid #232323",
    borderRadius: "5px",
    backgroundColor: "#202020",
    boxShadow: state.isFocused ? "0 0 0 2px #c5ff00" : "none",
    "&:hover": {
      borderColor: "#c5ff00",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#c5ff00"
      : state.isFocused
        ? "#A2D004"
        : "#202020",
    color: state.isSelected
      ? "#000000"
      : state.isFocused
        ? "#000000"
        : "#ffffff",
    "&:hover": {
      backgroundColor: "#A2D004",
      color: "#000000",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
  input: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
};

const EditListing = ({ params }) => {
  const id = params.id; // Use params.id to get the listing's id

  const router = useRouter();
  const { user } = useUser();

  const [nearbyStationsInputValue, setNearbyStationsInputValue] = useState("");

  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch listing data when component mounts
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        const listingData = response.data;

        // extract the nearby stations to initialise the form data
        const nearbyStationsOptions = listingData.nearbyStations.map(
          (station) => {
            return { value: station, label: station };
          },
        );
        const addressComponents = listingData.address.split("|");
        setFormData({
          ...listingData,

          // put the corresponding address components into the forms address fields
          addressLine1: addressComponents[0] || "",
          addressLine2: addressComponents[1] || "",
          postcode: addressComponents[2] || "",

          // nearby stations set as options
          nearbyStations: nearbyStationsOptions,
        });
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching listing data. Please try again later.");
        router.push(`/user`);
        console.error("Error fetching listing data:", error);
      }
    };

    if (user) {
      fetchListing();
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // seperately handle the image upload action
      const files = Array.from([...e.target.files, ...formData.images]);
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

    const newImages = formData.images.filter((image) => image instanceof File);
    const existingImages = formData.images.filter(
      (image) => typeof image === "string",
    );

    const newImageLinks = await uploadImages(newImages);

    const nearbyStations = formData.nearbyStations.map(
      (station) => station.value,
    );

    formData.images = [...existingImages, ...newImageLinks];
    formData.nearbyStations = nearbyStations;

    try {
      // Update listing data
      await axios.patch(`/api/listings/${id}`, formData);
      toast.success("Listing updated successfully!");
      router.push(`/listings/${id}`);
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Error updating listing. Please try again later.");
    }
  };

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
        break;
      default:
        break;
    }
  };

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Listing</h1>
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
        <label>Images:</label>
        <div className="relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-[#4a4a4a]">
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer opacity-0"
            multiple
          />
          <MdOutlineFileUpload className="text-4xl text-white" />
        </div>

        <div className="my-2 flex w-full flex-wrap items-center gap-4">
          {formData.images?.map((image, index) => (
            <div className="relative" key={index}>
              <div
                onClick={() =>
                  setFormData({
                    ...formData,
                    images: formData.images.filter((_, i) => i !== index),
                  })
                }
                className="absolute right-1 top-1 cursor-pointer rounded-full bg-red-500 p-1"
              >
                <FiTrash2 />
              </div>

              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt={`Image ${index + 1}`}
                className="h-32 w-32 object-cover"
              />
            </div>
          ))}
        </div>
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
            styles={selectStyles}
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
              (option) => option.value === formData.propertyType,
            )}
          />
        </label>
        <label>
          Availability:
          <Select
            styles={selectStyles}
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
              (option) => option.value === formData.availability,
            )}
          />
        </label>
        <label>
          Period Available:
          <Select
            styles={selectStyles}
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
              (option) => option.value === formData.periodAvailable,
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
            styles={selectStyles}
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
        <button
          type="submit"
          className="w-full rounded-md bg-primary py-2.5 hover:bg-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditListing;
