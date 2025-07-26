import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import connectToDatabase from "./lib/db/mongodb";
import User, { IUser } from "./lib/models/user";
import { ConflictError } from "./lib/utils/http-errors";
import { accountProviderSchema } from "./lib/validation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "johndoe1234",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Authorize user with credentials
        try {
          await connectToDatabase();

          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          // Find user by username or email
          const user = (await User.findOne({
            $or: [
              { username: credentials.username },
              { email: credentials.username },
            ],
          })) as (IUser & { _id: Types.ObjectId }) | null;

          if (!user) {
            return null;
          }

          // Check password
          if (
            user.password &&
            typeof user.password === "string" &&
            typeof credentials.password === "string"
          ) {
            const isValid = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (!isValid) {
              return null;
            }
          } else {
            // For users without password (OAuth users), deny credentials login
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.avatar,
          } as any;
        } catch (error) {
          console.error("Credentials auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase();

        if (!account || !user.email) return false;

        const validatedData = accountProviderSchema.safeParse({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          email: user.email,
          image: user.image,
          name: user.name,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          token_type: account.token_type,
        });

        if (!validatedData.success) {
          console.error("Validation Error:", validatedData.error);
          return false;
        }

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // Check if this provider is already linked
          const hasProvider = existingUser.providers.some(
            (p) =>
              p.provider === account.provider &&
              p.providerAccountId === account.providerAccountId
          );

          if (!hasProvider) {
            // Add new provider to existing user
            await User.findByIdAndUpdate(existingUser._id, {
              $push: {
                providers: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
              // Update other fields if needed
              $set: {
                name: user.name || existingUser.name,
                avatar: user.image || existingUser.avatar,
              },
            });
          }
        } else {
          // Create new user with provider
          await User.create({
            email: user.email,
            name: user.name || "",
            username: user.email.split("@")[0], // temporary username
            avatar: user.image,
            providers: [
              {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            ],
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    },
    async session({ session, user, token }) {
      try {
        // Add user data from database to session
        const dbUser = (await User.findOne({
          email: session.user.email,
        })) as IUser & { _id: Types.ObjectId };

        if (dbUser) {
          console.log("DB User:", {
            avatar: dbUser.avatar,
            sessionImage: session.user.image,
          });

          session.user.id = dbUser._id.toString();
          session.user.providers = dbUser.providers;
          session.user.image = dbUser.avatar || session.user.image;

          console.log("Updated Session:", {
            image: session.user.image,
            name: session.user.name,
          });
        }

        return session;
      } catch (error) {
        console.error("Session Error:", error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Add user data to token on first sign in
        token.id = user.id;
        token.provider = account?.provider;
      }

      // Handle token rotation if needed
      if (account && account.expires_at) {
        token.accessToken = account.access_token;
        token.expiresAt = account.expires_at;
      }

      return token;
    },
  },
});
