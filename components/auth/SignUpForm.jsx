"use client";

import { useState } from "react";

import Link from "next/link";

import { useStore } from "@/store/store";

const SignUpForm = ({ setVerifying, isLoaded, signUp }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const username = useStore((state) => state.username);
  const setUsername = useStore((state) => state.setUsername);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailAddress: "",
    password: "",
  });

  // Form Validation
  const validateForm = () => {
    setErrors({
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      password: "",
    });

    if (!firstName.trim()) {
      setErrors((prev) => ({ ...prev, firstName: "First Name is required" }));
      return false;
    }

    if (!lastName.trim()) {
      setErrors((prev) => ({ ...prev, lastName: "Last Name is required" }));
      return false;
    }

    if (!username.trim()) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      return false;
    }
    if (username.length < 4 || username.length > 64) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be at least 4 characters",
      }));
      return false;
    }

    if (!emailAddress.trim()) {
      setErrors((prev) => ({ ...prev, emailAddress: "Email is required" }));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setErrors((prev) => ({ ...prev, emailAddress: "Email is invalid" }));
      return false;
    }

    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }
    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
      return false;
    }
    return true;
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        username: username,
        emailAddress,
        password,
      });

      // send verification code to user's email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // update state to show verification code input
      setUsername(username);
      setVerifying(true);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));

      err.errors.forEach((error) => {
        if (error.code === "form_password_pwned") {
          setErrors((prev) => ({
            ...prev,
            password: error.message,
          }));
        }

        if (error.code === "form_identifier_taken") {
          switch (error.meta.paramName) {
            case "username":
              setErrors((prev) => ({
                ...prev,
                username: error.message,
              }));
              break;
            case "emailAddress":
              setErrors((prev) => ({
                ...prev,
                email: error.message,
              }));
              break;
          }
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="flex gap-6">
          <div>
            <label
              htmlFor="first_name"
              className="mb-2 block text-sm font-medium text-primary"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-secondary sm:text-sm "
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="mb-2 block text-sm font-medium text-primary"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-secondary sm:text-sm"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="user_name"
            className="mb-2 block text-sm font-medium text-primary"
          >
            Username
          </label>
          <input
            type="text"
            name="user_name"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-secondary sm:text-sm"
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-primary"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmailAddress(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-secondary sm:text-sm"
            placeholder="name@example.com"
          />
          {errors.emailAddress && (
            <p className="text-xs text-red-500">{errors.emailAddress}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-primary"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-secondary sm:text-sm"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium hover:bg-white"
        >
          Create an account
        </button>
      </form>
      <p className="mt-4 text-center text-primary">
        Already have an account? &nbsp;
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUpForm;
