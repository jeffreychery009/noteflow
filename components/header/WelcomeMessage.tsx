import { auth } from "@/auth";

import ClientWelcomeWrapper from "./ClientWelcomeWrapper";

export default async function WelcomeMessage() {
  // This is a server component that can use server-only functions
  const session = await auth();
  const user = session?.user;
  const userName = user?.name?.split(" ")[0];

  // Pass the user data to the client component
  return <ClientWelcomeWrapper userName={userName || "Guest"} />;
}
