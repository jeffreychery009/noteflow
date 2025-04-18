"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
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
  onSubmit: (data: T) => Promise<{ success: boolean; data: T }>;
}

const AuthForm = <T extends FieldValues>({
  defaultValues,
  schema,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {};

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          className="w-full rounded-full bg-gradient-to-r from-[#12A7FB] to-[#7DC5ED] text-white"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-500">
            Already have an account? <Link href={ROUTES.SIGN_IN}>Sign In</Link>
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
