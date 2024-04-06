"use client";
import { use, useEffect, useState } from "react";

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

import Link from "next/link";

import "./profile.css";
import InternalListingCard from "@/components/internalListings/InternalListingCard";

const User = ({ params }) => {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const [currUser, setCurrUser] = useState(null);
  const [age, setAge] = useState(18);
  const [languages, setLanguages] = useState(["English"]);
  const [hobbies, setHobbies] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [period, setPeriod] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [editAccount, setEditAccount] = useState(false);
  const [editExtra, setEditExtra] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = "/api/users/" + params.username;
        const response = await axios.get(path);
        setCurrUser(response.data);
        setAge(response.data.age);
        setCountry(response.data.country);
        setHobbies(response.data.hobbies);
        setLanguages(response.data.languages);
        setPreferences(response.data.preferences);
        setType(response.data.employmentType);
        setPeriod(response.data.periodType);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.log("Couldn't fetch user", error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSaveAccount = async (e) => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("Please fill in all fields");
      e.preventDefault();
      return;
    }
    try {
      const response = await axios.put(`/api/users/${params.username}`, {
        firstName: firstName,
        lastName: lastName,
      });
      user.update({ firstName: firstName, lastName: lastName });
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
      hobbies.length < 1 ||
      preferences.length < 1 ||
      !type.trim() ||
      !period.trim() ||
      !country.trim()
    ) {
      alert("Please fill in all fields");
      e.preventDefault();
      return;
    }
    try {
      const response = await axios.put(`/api/users/${params.username}`, {
        age: age,
        hobbies: hobbies,
        languages: languages,
        preferences: preferences,
        country: country,
        employmentType: type,
        periodType: period,
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

  const handleChangeHobbies = (e) => {
    const updatedHobbies = e.map((hobby) => hobby.value);
    setHobbies(updatedHobbies);
  };

  const handleChangePreferences = (e) => {
    const updatedPreferences = e.map((preference) => preference.value);
    setPreferences(updatedPreferences);
  };

  const handleChangeLanguages = (e) => {
    const updatedLanguages = e.map((language) => language.value);
    setLanguages(updatedLanguages);
  };

  function makeSelect(input) {
    if (typeof input === "string") {
      return { value: input, label: input };
    } else if (Array.isArray(input)) {
      return input.map((str) => ({ value: str, label: str }));
    } else {
      throw new Error("Input must be a string or an array of strings.");
    }
  }

  if (!currUser || !user) {
    return <></>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      {editAccount ? (
        <>
          <p>Edit ACCOUTN!!!!!</p>
          <label>
            <span>First name</span>
            <input
              type="text"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={currUser?.firstName}
            />
          </label>
          <label>
            <span>Last name</span>
            <input
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={currUser?.lastName}
            />
          </label>
          <button onClick={() => setEditAccount(!editAccount)}>Cancel</button>
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
          {(params.username == currUser?.username) == user.username ? (
            <button onClick={() => setEditAccount(!editAccount)}>
              Edit account information
            </button>
          ) : null}
        </>
      )}

      {editExtra ? (
        <div className="edit">
          <p>edit mode!!!</p>
          <label>
            <span>How old are you?</span>
            <input
              required
              type="number"
              min="18"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
          <label>
            <span>Where are you from?</span>
            <Select
              onChange={(e) => setCountry(countries[e.value])}
              options={countryList}
              defaultValue={makeSelect(country)}
            >
              {" "}
            </Select>
          </label>
          <label>
            <span>What type of employee are you?</span>
            <Select
              onChange={(e) => setType(e.value)}
              options={types}
              defaultValue={makeSelect(type)}
            ></Select>
          </label>
          <label>
            <span>What is you contract period?</span>
            <Select
              onChange={(e) => setPeriod(e.value)}
              options={periods}
              defaultValue={makeSelect(period)}
            ></Select>
          </label>
          <label>
            <span>What languages do you speak?</span>
            <Select
              isMulti
              onChange={handleChangeLanguages}
              options={languagesList}
              defaultValue={makeSelect(languages)}
            />
          </label>
          <label>
            <span>What are your hobbies?</span>
            <CreatableSelect
              placeholder="Select or type to create..."
              isMulti
              onChange={handleChangeHobbies}
              options={hobbiesList}
              defaultValue={makeSelect(hobbies)}
            />
          </label>
          <label>
            <span>What prefrences do you have?</span>
            <CreatableSelect
              placeholder="Select or type to create..."
              isMulti
              onChange={handleChangePreferences}
              options={preferencesList}
              defaultValue={makeSelect(preferences)}
            />
          </label>
          <button onClick={() => setEditExtra(!editExtra)}>Cancel</button>
          <button onClick={handleSaveExtra}>Save</button>
        </div>
      ) : (
        <div className="personal">
          <h2>Languages</h2>
          <div className="list">
            {currUser?.languages.map((item) => (
              <li className="tag" key={item}>
                {item}
              </li>
            ))}
          </div>
          <p></p>
          <h2>Hobbies</h2>
          <div className="list">
            {currUser?.hobbies.map((item) => (
              <li className="tag" key={item}>
                {item}
              </li>
            ))}
          </div>
          <h2>Prefences</h2>
          <div className="list">
            {currUser?.preferences.map((item) => (
              <li className="tag" key={item}>
                {item}
              </li>
            ))}
          </div>
          <h2>Listings</h2>
          <div className="listings">
            {currUser?.listings?.map((item) => (
              <InternalListingCard key={item._id} listing={item} />
            ))}
          </div>
          {(params.username == currUser?.username) == user.username ? (
            <button onClick={() => setEditExtra(!editExtra)}>
              Edit additional information
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default User;
