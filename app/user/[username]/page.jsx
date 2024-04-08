"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { useRouter } from "next/navigation";
import Link from "next/link";

import InternalListingCard from "@/components/Listings/internalListings/InternalListingCard";
import ConfirmActionModal from "@/components/ConfirmActionModal";

import countries from "@/constants/countries";
import languagesList from "@/constants/languagesList";
import countryList from "@/constants/countryList";
import {
  types,
  periods,
  hobbiesList,
  preferencesList,
} from "@/constants/employee";

import "./profile.css";
import "react-toastify/dist/ReactToastify.css";

const User = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();

  const [currUser, setCurrUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});

  const [editAccount, setEditAccount] = useState(false);
  const [editExtra, setEditExtra] = useState(false);

  const [showListingDeleteModal, setShowListingDeleteModal] = useState(false);
  const [deleteListingId, setDeleteListingId] = useState(null);

  const [pfp, setPfp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${params.username}`);
        setCurrUser(response.data);
        setUpdateUser(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          toast.error("User not found");
          router.push("/");
        } else {
          console.error("Error fetching user data", error);
          toast.error("Error fetching user data");
        }
      }
    };
    fetchData();
  }, []);

  const updateProfilePicture = async () => {
    let newProfilePicture;

    if (pfp) {
      const res = await user.setProfileImage({ file: pfp });
      newProfilePicture = res.publicUrl;
    }

    return newProfilePicture;
  };

  const handleSaveAccount = async (e) => {
    if (!updateUser.firstName.trim() || !updateUser.lastName.trim()) {
      alert("Please fill in all fields");
      e.preventDefault();
      return;
    }

    try {
      const newProfilePicture = await updateProfilePicture();

      const response = await axios.put(`/api/users/${params.username}`, {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        profilePicture: newProfilePicture,
      });

      user.update({
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
      });

      setEditAccount(!editAccount);
      toast.success("Account updated successfully");
      router.push(`/user`);
    } catch (error) {
      console.error("Error updating account", error);
      toast.error("Error updating account");
    }
  };

  const handleSaveExtra = async (e) => {
    if (
      updateUser.hobbies.length < 1 ||
      updateUser.preferences.length < 1 ||
      !updateUser.employmentType ||
      !updateUser.periodType ||
      !updateUser.age
    ) {
      alert("Please fill in all fields");
      e.preventDefault();
      return;
    }
    try {
      const response = await axios.put(`/api/users/${params.username}`, {
        age: updateUser.age,
        hobbies: updateUser.hobbies,
        languages: updateUser.languages,
        preferences: updateUser.preferences,
        country: updateUser.country,
        employmentType: updateUser.employmentType,
        periodType: updateUser.periodType,
      });
      setEditExtra(!editExtra);
      toast.success("Profile updated successfully");
      router.push(`/user`);
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
      return;
    }
  };

  const handleChange = (field) => (value) => {
    if (
      field === "languages" ||
      field === "hobbies" ||
      field === "preferences"
    ) {
      value = value.map((v) => v.value);
    }

    setUpdateUser((prev) => ({ ...prev, [field]: value }));
  };

  const makeSelect = (input) => {
    if (typeof input === "string") {
      return { value: input, label: input };
    } else if (Array.isArray(input)) {
      return input.map((str) => ({ value: str, label: str }));
    } else {
      throw new Error("Input must be a string or an array of strings.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/listings/${deleteListingId}`);
      toast.success("Listing deleted successfully");
    } catch (error) {
      console.error("Error deleting listing", error);
      toast.error("Error deleting listing");
    }
  };

  if (!currUser || !user) {
    return <></>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      {editAccount ? (
        <>
          <p>Edit Mode</p>
          <label>
            <span>First name</span>
            <input
              type="text"
              placeholder="Enter your first name"
              onChange={(e) => handleChange("firstName")(e.target.value)}
              defaultValue={updateUser.firstName}
            />
          </label>
          <label>
            <span>Last name</span>
            <input
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => handleChange("lastName")(e.target.value)}
              defaultValue={currUser?.lastName}
            />
          </label>
          <div className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-sm bg-gray-200">
            <img
              src={pfp ? URL.createObjectURL(pfp) : currUser?.profilePicture}
              className="h-full w-full object-cover"
            />
            <CiEdit className="absolute bottom-0 right-0 h-6 w-6 cursor-pointer rounded-bl-sm bg-black bg-opacity-50 text-white" />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPfp(e.target.files[0] || null)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>

          <button
            onClick={() => {
              setEditAccount(!editAccount);
              setUpdateUser(currUser);
            }}
          >
            Cancel
          </button>
          <button onClick={handleSaveAccount}>Save</button>
        </>
      ) : (
        <>
          <div className="main">
            <div className="info">
              <h2>
                {currUser?.firstName} {currUser?.lastName}
              </h2>
              <p>{currUser?.age}</p>
              <p>{currUser?.employmentType}</p>
              <p>Contract Type: {currUser?.periodType}</p>
              <p>Country: {currUser?.country}</p>
              <p></p>
            </div>
            <img
              src={currUser?.profilePicture}
              className="h-[150px] w-[150px]"
              alt="profile picture"
            />
          </div>
          <div className="extra">
            <h2>Username</h2>
            <p>{currUser?.username}</p>
            <h2>Email Address</h2>
            <p>{currUser?.email}</p>
          </div>
          {params.username == user.username && (
            <button onClick={() => setEditAccount(!editAccount)}>
              Edit account information
            </button>
          )}
        </>
      )}

      {editExtra ? (
        <div className="edit">
          <p>Edit Mode</p>
          <label>
            <span>How old are you?</span>
            <input
              required
              type="number"
              min="18"
              onChange={(e) => handleChange("age")(e.target.value)}
              value={updateUser.age}
            />
          </label>
          <label>
            <span>Where are you from?</span>
            <Select
              onChange={(e) => handleChange("country")(countries[e.value])}
              options={countryList}
              defaultValue={makeSelect(updateUser.country)}
            ></Select>
          </label>
          <label>
            <span>What type of employee are you?</span>
            <Select
              onChange={(e) => handleChange("employmentType")(e.value)}
              options={types}
              defaultValue={makeSelect(updateUser.employmentType)}
            ></Select>
          </label>
          <label>
            <span>What is you contract period?</span>
            <Select
              onChange={(e) => handleChange("periodType")(e.value)}
              options={periods}
              defaultValue={makeSelect(updateUser.periodType)}
            ></Select>
          </label>
          <label>
            <span>What languages do you speak?</span>
            <Select
              isMulti
              onChange={(selected) => handleChange("languages")(selected)}
              options={languagesList}
              defaultValue={makeSelect(updateUser.languages)}
            />
          </label>
          <label>
            <span>What are your hobbies?</span>
            <CreatableSelect
              placeholder="Select or type to create..."
              isMulti
              onChange={(selected) => handleChange("hobbies")(selected)}
              options={hobbiesList}
              defaultValue={makeSelect(updateUser.hobbies)}
            />
          </label>
          <label>
            <span>What prefrences do you have?</span>
            <CreatableSelect
              placeholder="Select or type to create..."
              isMulti
              onChange={(selected) => handleChange("preferences")(selected)}
              options={preferencesList}
              defaultValue={makeSelect(updateUser.preferences)}
            />
          </label>
          <button onClick={() => setEditExtra(!editExtra)}>Cancel</button>
          <button onClick={handleSaveExtra}>Save</button>
        </div>
      ) : (
        <div className="personal">
          {[
            { title: "Languages", data: currUser?.languages },
            { title: "Hobbies", data: currUser?.hobbies },
            { title: "Preferences", data: currUser?.preferences },
          ].map(({ title, data }) => (
            <div key={title}>
              <h2>{title}</h2>
              <div className="list">
                {data?.map((item) => (
                  <li className="tag" key={item}>
                    {item}
                  </li>
                ))}
              </div>
            </div>
          ))}

          {params.username == user.username && (
            <button onClick={() => setEditExtra(!editExtra)}>
              Edit additional information
            </button>
          )}

          <h2>Listings</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 text-black md:grid-cols-2 xl:grid-cols-3">
            {currUser?.listings?.map((item) => (
              <div className="relative" key={item._id}>
                <InternalListingCard
                  listing={item}
                  className="border border-secondary"
                />
                <div className="absolute bottom-4 right-[calc(50%-20px)] flex gap-2">
                  <Link href={`/listings/edit/${item._id}`} target="_blank">
                    <FiEdit className="h-5 w-5 text-black" />
                  </Link>

                  <button
                    className="text-red-700"
                    onClick={() => {
                      setShowListingDeleteModal(true);
                      setDeleteListingId(item._id);
                    }}
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmActionModal
        showModal={showListingDeleteModal}
        onClose={() => setShowListingDeleteModal(false)}
        title="Confirm"
        message={`Are you sure you want to delete this listing?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={() => {
          handleDelete();
        }}
        onCancel={() => setShowListingDeleteModal(false)}
      />
    </div>
  );
};

export default User;
