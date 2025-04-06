import { auth } from "@/auth";

const FolderGrid = async () => {
  const session = await auth();

  console.log("User ID:", session?.user?.id); // NextAuth uses 'id' not '_id'

  const userInfo = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.user?.id}`
  );

  if (!userInfo.ok) {
    const errorText = await userInfo.text();
    console.error("Error fetching user info:", errorText);
    throw new Error("Failed to fetch user info");
  }

  const userInfoData = await userInfo.json();

  console.log(userInfoData);

  const folders = userInfoData.data.folders;

  console.log("Number of folders:", folders?.length);

  return <div>{folders?.length}</div>;
};

export default FolderGrid;
