"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiReact, SiNodedotjs, SiTypescript, SiNextdotjs } from "react-icons/si";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Branding Section */}
          <div className="space-y-5">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <img
                    src="/logo.png"
                    className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
                    alt="Kajal Kasaudhan"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <Link href="/" className="text-2xl font-bold text-black dark:text-[#DFF5C8]">
                    Kajal <span className="text-[#2C5D5B] dark:text-white">Kasaudhan</span>
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Full-Stack Developer</p>
                </div>
              </Link>
            </motion.div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Crafting digital experiences with clean code and creative solutions.
            </p>
            
            <div className="flex space-x-4">
              {[
                { icon: <SiReact className="h-5 w-5 text-blue-500" />, label: "React" },
                { icon: <SiNodedotjs className="h-5 w-5 text-green-500" />, label: "Node.js" },
                { icon: <SiTypescript className="h-5 w-5 text-blue-600" />, label: "TypeScript" },
                { icon: <SiNextdotjs className="h-5 w-5 text-black dark:text-white" />, label: "Next.js" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm flex items-center"
                  title={tech.label}
                >
                  {tech.icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "#projects", label: "Projects" },
                { href: "#about", label: "About" },
                { href: "#blog", label: "Blog" },
                { href: "#contact", label: "Contact" },
              ].map((link, i) => (
                <motion.li 
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <svg className="w-3 h-3 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <HiMail className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                <Link href="mailto:kasaudhankajal51@gmail.com" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  kasaudhankajal51@gmail.com
                </Link>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <Link href="tel:+916387486751" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  +91 6387486751
                </Link>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lucknow, India</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-900 dark:text-white flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Connect With Me
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { href: "https://x.com/KajalKasau51", icon: <FaTwitter className="h-5 w-5" />, color: "bg-blue-400", label: "Twitter" },
                { href: "https://www.linkedin.com/in/iamkajalkasaudhan/", icon: <FaLinkedin className="h-5 w-5" />, color: "bg-blue-600", label: "LinkedIn" },
                { href: "https://github.com/iamkajal18", icon: <FaGithub className="h-5 w-5" />, color: "bg-gray-800 dark:bg-gray-700", label: "GitHub" },
                { href: "mailto:kasaudhankajal51@gmail.com", icon: <HiMail className="h-5 w-5" />, color: "bg-red-500", label: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${social.color} text-white p-2 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all`}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            © {currentYear} Kajal Kasaudhan. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms" },
              { href: "/sitemap", label: "Sitemap" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;