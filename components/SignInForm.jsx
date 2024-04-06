"use client";

import { useState } from "react";

import { useSignIn } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });

  const [clerkError, setClerkError] = useState(null);

  // Form Validation
  const validateForm = () => {
    setErrors({
      emailAddress: "",
      password: "",
    });

    if (!emailAddress.trim()) {
      setErrors((prev) => ({
        ...prev,
        emailAddress: "Email/Username is required",
      }));
      return false;
    }

    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
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
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
      }
    } catch (err) {
      setClerkError(err.errors[0].message.replace("Identifier", "Email/Username"));
    }
  };

  return (
    <div className="mt-4">
      {clerkError && <p className="text-center text-red-500 mb-2 ">{clerkError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-primary"
          >
            Email/Username
          </label>
          <input
            name="email"
            onChange={(e) => setEmailAddress(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
            placeholder="name@example.com"
          />
          {errors.emailAddress && (
            <p className="mt-1 text-xs text-red-500">{errors.emailAddress}</p>
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
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium hover:bg-white"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-primary">
        Don't have an account? &nbsp;
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
