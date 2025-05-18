"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaUserCircle, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "./ThemeContext";
import { Moon, Sun } from "lucide-react";
const Navbar = () => { // ✅ Props receive kiya
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = false; // Replace with actual authentication logic
  const { theme, toggleTheme } = useTheme(); 
  const handleSearch = (e:any) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${search}`);
    }
  };
  

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
        <img src="logo.png" className="h-8 rounded-md" alt="Logo" />
      </Link>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 dark:text-white text-2xl">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray-700 dark:text-white hover:text-blue-500">Home</Link>
        <Link href="/tendingblog" className="text-gray-700 dark:text-white hover:text-blue-500">Trending Blog</Link>
        <Link href="/about" className="text-gray-700 dark:text-white hover:text-blue-500">About</Link>
        <Link href="/contact" className="text-gray-700 dark:text-white hover:text-blue-500">Contact</Link>
      </div>

      {/* Search Bar (Desktop) */}
      <form onSubmit={handleSearch} className="relative hidden md:block">
        <input
          type="text"
          className="border rounded-full px-4 py-2 w-48 dark:bg-gray-800 dark:text-white"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="absolute right-3 top-2 text-gray-500">
          <FaSearch />
        </button>
      </form>

      {/* Right Section: Dark Mode, Auth, Profile */}
      <div className="flex items-center space-x-4">
      <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}
          >
            {theme === "light" ? <Moon size={20} className="text-black" /> : <Sun size={20} className="text-white" />}
        </button>

        {isLoggedIn ? (
          <>
            <Link href="/write" className="text-green-500 font-semibold hover:underline">Write a Blog</Link>
            <button className="text-blue-500 font-semibold hover:underline">Logout</button>
          </>
        ) : (
          <Link href="/signin" className="text-blue-500 font-semibold hover:underline">Login</Link>
        )}

        <FaUserCircle className="text-2xl text-gray-700 dark:text-white cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
