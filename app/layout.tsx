import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Rajdhani({subsets: ["latin"], weight: ["400"]});
// const inter = Inter({ subsets: ["latin"] });

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
      <body
        className={
          inter.className
        }
      >
        <div className="w-full h-screen flex flex-col justify-between">{children}</div>
      </body>
    </html>
  );
}
