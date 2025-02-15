import Navbar from "../components/Navbar";
import "flowbite";
import "./globals.css";
import Footer from "../components/Footer";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className=" min-h-screen">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
