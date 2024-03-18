"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";

import SignUpForm from "@/components/SignUpForm";
import SignUpVerifyForm from "@/components/SignUpVerifyForm";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);

  return (
    <div className="mt-10 flex justify-center md:mt-40">
      <div className="border- w-[500px] rounded-md border-[#777] p-5 md:border">
        <h1 className="mb-4 text-2xl">Register</h1>
        {!verifying ? (
          <SignUpForm
            setVerifying={setVerifying}
            isLoaded={isLoaded}
            signUp={signUp}
          />
        ) : (
          <SignUpVerifyForm
            isLoaded={isLoaded}
            setActive={setActive}
            signUp={signUp}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
