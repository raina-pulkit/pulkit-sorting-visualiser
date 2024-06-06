import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./utils/globalProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Rajdhani({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Sorting Visualiser",
  description: "Pulkiii",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className={inter.className}>
          <div className="layout min-w-80 w-full min-h-screen flex flex-col justify-between">
            {children}
            <Toaster />
          </div>
        </body>
      </ContextProvider>
    </html>
  );
}
