"use client";
import { useState } from "react";

import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import countries from "@/constants/countries";
import languagesList from "@/constants/languagesList";
import countryList from "@/constants/countryList";

const Edit = () => {
  const [age, setAge] = useState(18);
  const [languages, setLanguages] = useState(["English"]);
  const [hobbies, setHobbies] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [country, setCountry] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/users/" + user.username, {
        age: age,
        hobbies: hobbies,
        languages: languages,
        preferences: preferences,
        country: country,
      });
      setTimeout(() => {
        router.push(`/user/${user.username}`);
      }, 1500);
    } catch (error) {
      console.error("Error creating user profile", error);
      return;
    }
  };

  const handleCountryChange = (e) => {
    setCountry(countries[e.value]);
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

  return (
    <div className="createProfile">
      <h1>Edit your profile {user?.fullName}!</h1>
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
          <Select onChange={handleCountryChange} options={countryList}></Select>
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
export default Edit;
