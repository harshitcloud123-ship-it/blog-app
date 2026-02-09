"use client";
import { useFormStatus } from "react-dom";
import { ComponentProps } from "react";
import { Button } from "./ui/button";

type ButtonProps = ComponentProps<typeof Button>;

const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button variant="default" type="submit" aria-disabled={pending} {...props}>
      {pending ? <span className="animate-pulse">Submitting</span> : children}
    </Button>
  );
};

export default SubmitButton;
