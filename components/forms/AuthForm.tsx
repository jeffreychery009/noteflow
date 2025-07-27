"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/routes";

interface AuthFormProps<T extends FieldValues> {
  defaultValues: T;
  schema: z.ZodSchema<T>;
  formType: "SIGN_IN" | "SIGN_UP";
  onSubmit?: (
    data: T
  ) => Promise<{ success: boolean; data: T; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  defaultValues,
  schema,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      if (formType === "SIGN_IN") {
        // Handle sign in with credentials
        const result = await signIn("credentials", {
          username: data.email || data.username, // Support both email and username
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid credentials");
          return;
        }

        if (result?.ok) {
          router.push("/notes");
        }
      } else {
        // Handle sign up
        if (onSubmit) {
          const response = await onSubmit(data);
          if (response.success) {
            // After successful signup, sign in the user
            const signInResult = await signIn("credentials", {
              username: data.email || data.username,
              password: data.password,
              redirect: false,
            });

            if (signInResult?.ok) {
              router.push("/notes");
            } else {
              setError(
                "Signup successful but sign-in failed. Please try signing in manually."
              );
            }
          } else {
            // Handle signup error
            setError(response.error || "Signup failed. Please try again.");
          }
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="w-full rounded-lg bg-gray-50 dark:bg-gray-800"
                    placeholder={
                      field.name === "email"
                        ? "name@example.com"
                        : field.name === "password"
                          ? "********"
                          : field.name === "name"
                            ? "John Doe"
                            : field.name === "username"
                              ? "john_doe"
                              : ""
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          className="w-full rounded-lg bg-gradient-to-r from-[#b667f1] to-[#6d28d9] text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.SIGN_UP}>
              <span className="font-medium text-purple-600 hover:text-purple-900">
                Sign Up
              </span>
            </Link>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href={ROUTES.SIGN_IN}>
              <span className="font-medium text-purple-600 hover:text-purple-900">
                Sign In
              </span>
            </Link>
          </p>
        )}
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>
    </Form>
  );
};

export default AuthForm;
