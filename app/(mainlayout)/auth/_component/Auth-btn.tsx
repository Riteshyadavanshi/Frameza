"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const AuthBtn = () => {
  const register = async () => {
    try {
      await signIn("google", {
        redirect: true,
        redirectTo: "/chat",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button className="w-full cursor-pointer" onClick={register}>
      Continue with Google
    </Button>
  );
};
