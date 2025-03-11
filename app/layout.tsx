import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noteflow",
  description:
    "Noteflow is a modern web application designed to transform the way you capture and organize your ideas. It leverages advanced metadata features—such as tagging, linking, and categorization—to turn scattered notes into a structured, interconnected knowledge base. Whether you’re a solo user or part of a collaborative team, Noteflow streamlines your workflow by making it easy to search, retrieve, and share information, ultimately boosting productivity and creativity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
