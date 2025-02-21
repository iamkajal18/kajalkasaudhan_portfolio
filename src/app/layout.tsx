import Navbar from "../components/Navbar";
import "flowbite";
import "./globals.css";
import Footer from "../components/Footer";
import React from "react";
import { SessionProvider } from "next-auth/react"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <Navbar />
        <div className="min-h-screen">{children}</div>

        <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
