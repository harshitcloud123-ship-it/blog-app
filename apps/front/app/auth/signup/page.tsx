import Link from "next/link";
import SignUpForm from "./_components/signUpForm";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-between">
      <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
      <SignUpForm />
      <div className="flex justify-center items-center gap-2 mt-4">
        <p>Already have an account?</p>
        <Link
          className="text-blue-500 font-semibold underline hover:text-blue-700 transition-colors duration-200"
          href={"/auth/signin"}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
