"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label
          defaultValue={state?.data.email}
          htmlFor="email"
          className="py-2"
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          type="email"
        />
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <div>
        <Label htmlFor="password" className="py-2">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data.password}
        />
      </div>
      {!!state?.errors?.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}

      <SubmitButton className="mt-2">Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
