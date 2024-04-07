"use client";
import { useState } from "react";

import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import Link from "next/link";

import Loading from "@/components/Loading";

import countries from "@/constants/countries";
import languagesList from "@/constants/languagesList";
import countryList from "@/constants/countryList";
import {
  types,
  periods,
  hobbiesList,
  preferencesList,
} from "@/constants/employee";

import "./create.css";

const CreateProfile = ({ params }) => {
  const [age, setAge] = useState(18);
  const [languages, setLanguages] = useState(["English"]);
  const [hobbies, setHobbies] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [period, setPeriod] = useState("");

  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    //Input validation
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
    e.preventDefault();
    console.log(hobbies, languages, preferences, country, type, period);
    //Post to database
    try {
      const response = await axios.post("/api/users", {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        clerkId: user.id,
        profilePicture: user.imageUrl,
        age: age,
        hobbies: hobbies,
        languages: languages,
        preferences: preferences,
        country: country,
        employmentType: type,
        periodType: period,
      });
      if (response.status === 201) {
        console.log("User profile created successfully");
      } else {
        console.log("User profile creation failed");
      }
      setTimeout(() => {
        router.push("/listings");
      }, 1500);
    } catch (error) {
      console.error("Error creating user profile", error);
      return;
    }
  };

  //Handling changing array values
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

  if (!user) {
    return <Loading />;
  }

  if (user?.publicMetadata?.profileCreated === true) {
    return (
      <div className="mt-[15vh] flex w-full flex-1 flex-col items-center">
        <h1 className="text-4xl font-semibold text-primary">
          Profile already created
        </h1>

        <Link
          href={`/user/${user.username}`}
          className="mt-4 rounded bg-primary p-3 font-semibold hover:bg-white"
        >
          Go to profile
        </Link>
      </div>
    );
  }

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
          <Select
            onChange={(e) => setCountry(countries[e.value])}
            options={countryList}
          ></Select>
        </label>
        <label>
          <span>What type of employee are you?</span>
          <Select onChange={(e) => setType(e.value)} options={types}></Select>
        </label>
        <label>
          <span>What is you contract period?</span>
          <Select
            onChange={(e) => setPeriod(e.value)}
            options={periods}
          ></Select>
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
          <CreatableSelect
            placeholder="Select or type to create..."
            isMulti
            onChange={handleChangeHobbies}
            options={hobbiesList}
          />
        </label>
        <label>
          <span>What prefrences do you have?</span>
          <CreatableSelect
            placeholder="Select or type to create..."
            isMulti
            onChange={handleChangePreferences}
            options={preferencesList}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};
export default CreateProfile;
