"use client";
import "./createProfile.css";
import { React, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import ReactFlagsSelect from "react-flags-select";

const createProfile = ({ params }) => {
  const [age, setAge] = useState(18);
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [prefrences, setPrefrences] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(country);
  };
  const handleChangeHobbies = (e) => {
    console.log(e);
    setHobbies(e);
    console.log(hobbies);
  };
  const handleChangePrefrences = (e) => {
    console.log(e);
    setPrefrences(e);
    console.log(prefrences);
  };

  return (
    <div className="createProfile">
      <h1>Create a profile! {params.id}</h1>
      <form onSubmit={handleSubmit}>
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
          <ReactFlagsSelect
            selected={country}
            onSelect={(code) => setCountry(code)}
            searchable={true}
            searchPlaceholder="Select a country"
          />
        </label>
        <label>
          <span>What language do you speak?</span>
          <input
            required
            type="text"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            placeholder="Enter a language"
          />
        </label>
        <label>
          <span>What are your hobbies?</span>
          <CreatableSelect isMulti onChange={handleChangeHobbies} />
        </label>
        <label>
          <span>What prefrences do you have?</span>
          <CreatableSelect isMulti onChange={handleChangePrefrences} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default createProfile;
