"use client";

import { signIn } from "next-auth/react";
import React from "react";

import { ROUTES } from "@/routes";

import { Button } from "../ui/button";

const SocialAuthForm = () => {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirect: false,
        callbackUrl: ROUTES.FOLDERS,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      <Button onClick={() => handleSignIn("github")}>
        <span>Log in with Github</span>
      </Button>
      <Button onClick={() => handleSignIn("google")}>
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
