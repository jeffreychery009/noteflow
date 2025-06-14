import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers/Providers";
import { Toaster } from "@/components/ui/toaster";
import { PresenceProvider } from "@/context/PresenceProvider";
import { SWRProvider } from "@/context/swrProvider";
import { ThemeProvider } from "@/context/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noteflow",
  description: "Take Notes in Real Time with AI Assistance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PresenceProvider>
            <Providers>
              <SWRProvider>{children}</SWRProvider>
            </Providers>
            <Toaster />
          </PresenceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
