"use client";
import { use, useState } from "react";

import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

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

const CreateProfile = () => {
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
        toast.success("Profile created successfully!");
      } else {
        toast.error("Error creating profile.");
      }
      router.push("/listings");
    } catch (error) {
      toast.error("Error creating profile.");
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
            styles={selectStyles}
            onChange={(e) => setCountry(countries[e.value])}
            options={countryList}
          ></Select>
        </label>
        <label>
          <span>What type of employee are you?</span>
          <Select
            styles={selectStyles}
            onChange={(e) => setType(e.value)}
            options={types}
          ></Select>
        </label>
        <label>
          <span>What is you contract period?</span>
          <Select
            styles={selectStyles}
            onChange={(e) => setPeriod(e.value)}
            options={periods}
          ></Select>
        </label>
        <label>
          <span>What languages do you speak?</span>
          <Select
            styles={selectStyles}
            isMulti
            onChange={handleChangeLanguages}
            options={languagesList}
            defaultValue={{ value: "English", label: "English" }}
          />
        </label>
        <label>
          <span>What are your hobbies?</span>
          <CreatableSelect
            styles={selectStyles}
            placeholder="Select or type to create..."
            isMulti
            onChange={handleChangeHobbies}
            options={hobbiesList}
          />
        </label>
        <label>
          <span>What prefrences do you have?</span>
          <CreatableSelect
            styles={selectStyles}
            placeholder="Select or type to create..."
            isMulti
            onChange={handleChangePreferences}
            options={preferencesList}
          />
        </label>
        <div className="button">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default CreateProfile;
