import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-6">
        <Image
          src="/logo.png"
          alt="NoteFlow.io"
          width={100}
          height={100}
          className="rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        />
        <h1 className="text-center text-4xl font-bold text-white">
          Welcome to Noteflow
        </h1>
      </div>
    </div>
  );
};

export default page;
