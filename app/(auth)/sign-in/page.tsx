"use client";

import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/lib/validation";

const SignIn = () => {
  return (
    <div>
      <AuthForm
        defaultValues={{ email: "", password: "" }}
        schema={SignInSchema}
        formType={"SIGN_IN"}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />
    </div>
  );
};

export default SignIn;
