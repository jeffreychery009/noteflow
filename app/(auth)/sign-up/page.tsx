"use client";

import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validation";

const SignUp = () => {
  return (
    <div>
      <AuthForm
        defaultValues={{ email: "", name: "", username: "", password: "" }}
        schema={SignUpSchema}
        formType={"SIGN_UP"}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />
    </div>
  );
};

export default SignUp;
