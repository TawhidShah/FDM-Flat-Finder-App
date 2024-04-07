import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {
  return (
    <div className="mt-10 flex justify-center md:mt-40">
      <div className="border- w-[500px] rounded-md border-[#777] p-5 md:border">
        <h1 className="text-2xl text-primary">Sign In</h1>

        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
