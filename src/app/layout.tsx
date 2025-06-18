"use client"
import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react" 
import toast, { Toaster } from 'react-hot-toast';
import './globals.css';
import { useEffect, useState } from "react";
// import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from '../components/ThemeContext';
// import { SpeedInsights } from "@vercel/speed-insights/next"
// import { metadata } from "./metadata";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      toast.success("🎉 Welcome to LearnLive!");
      localStorage.setItem("hasVisited", "true");
      setIsFirstVisit(true);
    }
  }, []);
  return (
    <html lang="en">
      
      <body>
      
        <SessionProvider>
        
        <ThemeProvider>
        
       

        <Navbar />
      <Toaster/>
          <div className="min-h-screen">{children}</div>
        
        
        
        <Footer />
        </ThemeProvider>
        </SessionProvider>
       
        
      </body>
    </html>
  );
}
