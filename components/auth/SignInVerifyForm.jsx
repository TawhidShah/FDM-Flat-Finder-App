"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useStore } from "@/store/store";

const SignInVerifyForm = ({ isLoaded, setActive, signIn }) => {
  const [code, setCode] = useState("");
  const username = useStore((state) => state.username);
  const router = useRouter();

  // Verify User Email Code
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.attemptEmailAddressVerification({
        code,
      });
      if (completeSignIn.status !== "complete") {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        router.push(`/user/${username}/dashboard`); // Adjust the redirection URL as per your application flow
      }
    } catch (err) {
      console.error(err);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <form className="space-y-4 md:space-y-6">
      <input
        value={code}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
        placeholder="Enter Verification Code..."
        onChange={(e) => setCode(e.target.value)}
      />
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

export default SignInVerifyForm;