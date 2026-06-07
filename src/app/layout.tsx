import type { Metadata } from "next";
import { Oswald, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "../components/navbar";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anzii D.L.",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${oswald.className}
          ${oswald.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}