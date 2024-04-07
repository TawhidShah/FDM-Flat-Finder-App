"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

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
import InternalListingCard from "@/components/internalListings/InternalListingCard";

const User = ({ params }) => {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const [currUser, setCurrUser] = useState(null);
  const [updateUser, setUpdateUser] = useState({});

  const [editAccount, setEditAccount] = useState(false);
  const [editExtra, setEditExtra] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${params.username}`);
        setCurrUser(response.data);
        setUpdateUser(response.data);
      } catch (error) {
        console.log("Couldn't fetch user", error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSave = async (e) => {};

  const handleSaveAccount = async (e) => {
    if (!updateUser.firstName.trim() || !updateUser.lastName.trim()) {
      alert("Please fill in all fields");
      e.preventDefault();
      return;
    }
    try {
      const response = await axios.put(`/api/users/${params.username}`, {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
      });
      user.update({
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
      });
      console.log("Updated Account", response.data, user);

      setTimeout(() => {
        setEditAccount(!editAccount);
      }, 500);
      router.push("/user");
    } catch (error) {
      console.log("Error updating account", error);
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
      console.log("Profile updated", response.data);
      setTimeout(() => {
        setEditExtra(!editExtra);
        setRefresh(!refresh);
      }, 500);
    } catch (error) {
      console.error("Error updating user profile", error);
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
              <h2>{currUser?.firstName + " " + currUser?.lastName}</h2>
              <p>{currUser?.age}</p>
              <p>{currUser?.employmentType}</p>
              <p>Contract Type: {currUser?.periodType}</p>
              <p>Country: {currUser?.country}</p>
              <p></p>
            </div>
            <img src={currUser?.profilePicture} alt="" />
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

          <h2>Listings</h2>
          <div className=" grid-cols1 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {currUser?.listings?.map((item) => (
              <InternalListingCard
                key={item._id}
                listing={item}
                className="border border-secondary"
              />
            ))}
          </div>
          {params.username == user.username && (
            <button onClick={() => setEditExtra(!editExtra)}>
              Edit additional information
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
