import Link from "next/link";
import SignInForm from "./_components/signInForm";

const SignInPage = () => {
  return (
    <div className=" bg-white p-8 border rounded-md gap-3 shadow-md w-96 flex flex-col justify-center mx-4">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>
      <SignInForm />
      <div className="flex justify-center items-center gap-2 mt-2">
        <p>Don't have an account?</p>
        <Link
          href={"/auth/signup"}
          className="text-blue-500 font-semibold underline hover:text-blue-700 transition-colors duration-200"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
