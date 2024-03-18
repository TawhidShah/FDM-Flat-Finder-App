"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpVerifyForm = ({ isLoaded, setActive, signUp }) => {
  const [code, setCode] = useState("");
  const router = useRouter();

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
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/user");
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
        className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
      >
        Verify Email
      </button>
    </form>
  );
};

export default SignUpVerifyForm;
