import React from "react";

import { auth } from "@/auth";
import Sidebar from "@/components/sidebar/Sidebar";
const Folders = async () => {
  const session = await auth();
  console.log(session);

  return <div>Folders</div>;
};

export default Folders;
