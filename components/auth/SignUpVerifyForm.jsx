"use client";

import { useState } from "react";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

const SignUpVerifyForm = ({ isLoaded, setActive, signUp }) => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");

  // Verify User Email Code
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        toast.error("Sign up failed. Please try again.");
      }
      if (completeSignUp.status === "complete") {
        setError("");
        toast.success("Sign up successful.");
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(`/createProfile`);
      }
    } catch (err) {
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6">
      <input
        value={code}
        className="block w-full rounded-lg bg-gray-50 p-2.5 text-gray-900 focus:outline-none sm:text-sm"
        placeholder="Enter Verification Code..."
        onChange={(e) => setCode(e.target.value)}
      />
      {error && (
        <div className="!mt-2 ml-1 text-sm font-medium text-red-500">
          {error}
        </div>
      )}
      <button
        type="submit"
        onClick={onPressVerify}
        className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium hover:bg-white"
      >
        Verify Email
      </button>
    </form>
  );
};

export default SignUpVerifyForm;
