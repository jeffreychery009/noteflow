import { z } from "zod";

// Sign Up Schema

export const SignUpSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be less than 50 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*]/, {
      message: "Password must contain at least one special character",
    }),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username cannot exceed 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
});

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
});

export const userSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username cannot exceed 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  name: z.string().min(1, { message: "Name is required" }),
  avatar: z
    .string()
    .url({ message: "Please provide a valid avatar URL" })
    .optional(),
  preferences: z
    .object({
      theme: z.enum(["light", "dark"]).default("light"),
      syncMode: z.enum(["online", "offline", "hybrid"]).default("online"),
    })
    .default({
      theme: "light",
      syncMode: "online",
    }),
});

export const accountProviderSchema = z.object({
  provider: z.enum(["google", "github", "credentials"]),
  providerAccountId: z.string(),
  image: z.string().url().optional(),
  name: z.string().optional(),
  email: z.string().email(),
  access_token: z.string().optional(),
  expires_at: z.number().optional(),
  refresh_token: z.string().optional(),
  token_type: z.string().optional(),
});

export const folderSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  sharedWith: z.array(z.string()).optional(),
});
