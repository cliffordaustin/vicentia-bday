import type { Metadata } from "next";
import { Fraunces, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import AmbientSparkles from "./_components/AmbientSparkles";
import MusicToggle from "./_components/MusicToggle";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Vicentia",
  description: "From strangers to sisters - this is our story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
    >
      <body className="bg-cream text-plum relative overflow-x-hidden">
        <AmbientSparkles />
        <MusicToggle />
        <main className="relative z-10 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
