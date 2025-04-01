import { Types } from "mongoose";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      providers: Array<{
        provider: string;
        providerAccountId: string;
      }>;
      avatar?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id: Types.ObjectId;
    providers: Array<{
      provider: string;
      providerAccountId: string;
    }>;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: string;
    accessToken?: string;
    expiresAt?: number;
  }
}
