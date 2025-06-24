// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaPhoneAlt, FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const TopBar = () => (
  <div className="bg-[#4C8784] text-white text-md px-4 py-2 flex justify-between items-center dark:bg-[#2C5D5B]">
    <div className="flex items-center gap-6">
      <span className="flex items-center gap-2"><FaPhoneAlt /> +91 6387486751</span>
      <span className="flex items-center gap-2"><MdEmail /> kasaudhankajal51@gmail.com</span>
    </div>
    <div className="flex items-center gap-4">
     
      <a href="https://www.linkedin.com/in/iamkajalkasaudhan/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="hover:text-[#A7C1A8]" /></a>
      <a href="https://x.com/KajalKasau51" target="_blank" rel="noopener noreferrer"><FaTwitter className="hover:text-[#A7C1A8]" /></a>
      <a href="https://github.com/iamkajal18" target="_blank" rel="noopener noreferrer"><FaGithub className="hover:text-[#A7C1A8]" /></a>
    </div>
  </div>
);

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navLinks = [
    { name: 'About Me', href: '#' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-[#A7C1A8] dark:bg-[#21403f] shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black dark:text-[#DFF5C8]">
          Kajal <span className="text-[#2C5D5B] dark:text-white">Kasaudhan</span>
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#2C5D5B] dark:text-[#cadfb4] font-medium hover:text-[#4C8784] dark:hover:text-white transition"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#4C8784] to-[#2C5D5B] text-white font-semibold shadow hover:from-[#3a6f6d] hover:to-[#21403f] transition"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#2C5D5B] dark:text-[#DFF5C8] focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-[#A7C1A8] dark:bg-[#21403f] shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-[#2C5D5B] dark:text-[#DFF5C8] font-medium hover:text-[#4C8784] dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="block w-full text-center px-4 py-2 rounded-full bg-gradient-to-r from-[#4C8784] to-[#2C5D5B] text-white font-semibold hover:from-[#3a6f6d] hover:to-[#21403f] transition"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

const Navbar = () => (
  <header className="fixed top-0 left-0 w-full z-50">
    <TopBar />
    <MainNavbar />
  </header>
);

export default Navbar;