import { Types } from "mongoose";
import NextAuth from "next-auth";
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
          session.user.id = dbUser._id.toString();
          session.user.providers = dbUser.providers;
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
