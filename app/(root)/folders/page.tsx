import React from "react";

import { auth } from "@/auth";

const Folders = async () => {
  const session = await auth();
  console.log(session);

  return <div>Folders</div>;
};

export default Folders;
