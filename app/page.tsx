import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <Image src="/logo.png" alt="NoteFlow.io" width={100} height={100} />
      <h1 className="text-4xl text-white">Welcome to Noteflow</h1>
    </div>
  );
};

export default page;
