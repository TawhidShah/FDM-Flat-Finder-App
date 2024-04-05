"use client";
import { useState } from "react";

import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

<<<<<<< HEAD
import countries  from "@/constants/countries";
import languagesList from "@/constants/languagesList";
import countryList from "@/constants/countryList";
import {types, periods} from "@/constants/employee"
=======
import { countries } from "@/constants/countries";
import languagesList from "@/constants/languagesList";
import countryList from "@/constants/countryList";
>>>>>>> main

import "./create.css";

const CreateProfile = ({ params }) => {
  const [age, setAge] = useState(18);
  const [languages, setLanguages] = useState(["English"]);
  const [hobbies, setHobbies] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [period, setPeriod] = useState("")
  
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
<<<<<<< HEAD
    //Input validation
    if (hobbies.length < 1 || preferences.length < 1 ||  !type.trim() ||  !period.trim() ||  !country.trim()) {
=======
    if (hobbies.length < 1 || preferences.length < 1 || !country.trim()) {
>>>>>>> main
      alert("Please fill in all fields");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    //Post to database
    try {
      const response = await axios.post("/api/users", {
        username: user.username,
        clerkId: user.id,
        age: age,
        hobbies: hobbies,
        languages: languages,
        preferences: preferences,
        country: country,
<<<<<<< HEAD
        type: type,
        period: period
=======
>>>>>>> main
      });
      if (response.status === 201) {
        // TOAST
        console.log("User profile created successfully");
      } else {
        // TOAST
        console.log("User profile creation failed");
      }
      setTimeout(() => {
        router.push("/user/" + user.username);
      }, 1500);
    } catch (error) {
      console.error("Error creating user profile", error);
      return;
    }
  };

<<<<<<< HEAD
  //Handling changing array values
=======
  const handleCountryChange = (e) => {
    setCountry(countries[e.value]);
  };

>>>>>>> main
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

  return (
    <div className="createProfile">
      <h1>Create a profile {user?.fullName}!</h1>
      <form>
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
<<<<<<< HEAD
          <Select onChange={(e) => setCountry(countries[e.value])} options={countryList}></Select>
        </label>
        <label>
          <span>What type of employee are you?</span>
          <Select onChange={(e) => setType(e.value)} options={types}></Select>
        </label>
        <label>
          <span>What is you contract period?</span>
          <Select onChange={(e) => setPeriod(e.value)} options={periods}></Select>
=======
          <Select onChange={handleCountryChange} options={countryList}></Select>
>>>>>>> main
        </label>
        <label>
          <span>What languages do you speak?</span>
          <Select
            isMulti
            onChange={handleChangeLanguages}
            options={languagesList}
            defaultValue={{ value: "English", label: "English" }}
          />
        </label>
        <label>
          <span>What are your hobbies?</span>
          <CreatableSelect isMulti onChange={handleChangeHobbies} />
        </label>
        <label>
          <span>What prefrences do you have?</span>
          <CreatableSelect isMulti onChange={handleChangePreferences} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};
export default CreateProfile;
