"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpForm = ({ setVerifying, isLoaded, signUp }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
  });

  const router = useRouter();

  // Form Validation
  const validateForm = () => {
    setErrors({
      firstName: "",
      lastName: "",
      userName: "",
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

    if (!userName.trim()) {
      setErrors((prev) => ({ ...prev, userName: "Username is required" }));
      return false;
    }
    if (userName.length < 4 || userName.length > 64) {
      setErrors((prev) => ({
        ...prev,
        userName: "Username must be at least 4 characters",
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
        username: userName,
        emailAddress,
        password,
      });

      // send verification code to user's email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // update state to show verification code input
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
                userName: error.message,
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
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-gray-900 sm:text-sm "
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="user_name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            name="user_name"
            onChange={(e) => setUserName(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
          {errors.userName && (
            <p className="text-xs text-red-500">{errors.userName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmailAddress(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
            placeholder="name@example.com"
          />
          {errors.emailAddress && (
            <p className="text-xs text-red-500">{errors.emailAddress}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          Create an account
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? &nbsp;
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUpForm;
