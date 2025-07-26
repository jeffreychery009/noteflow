"use client";

import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { handleError } from "@/lib/utils/error-handler";
import { SignUpSchema } from "@/lib/validation";

const SignUp = () => {
  const handleSignUp = async (data: any) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw handleError(result.error);
      }

      return { success: true, data: result.user };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : "Signup failed",
      };
    }
  };

  return (
    <div>
      <AuthForm
        defaultValues={{ email: "", name: "", username: "", password: "" }}
        schema={SignUpSchema}
        formType={"SIGN_UP"}
        onSubmit={handleSignUp}
      />
    </div>
  );
};

export default SignUp;
