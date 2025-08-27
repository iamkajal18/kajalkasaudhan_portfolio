"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PersonalInfo } from '@/types';
import { Briefcase, FileText } from 'lucide-react';

interface HeroSectionProps {
    isLoaded: boolean;
    personalInfo: PersonalInfo;
}

const HeroSection = ({ isLoaded, personalInfo }: HeroSectionProps) => {
    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    return (
        <section id="hero" className="py-20 md:py-32 min-h-[85vh] flex items-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
            <motion.div
                initial="initial"
                animate={isLoaded ? "animate" : "initial"}
                variants={staggerContainer}
                className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 max-w-7xl"
            >
                {/* Left Content */}
                <motion.div
                    variants={fadeInUp}
                    className="md:w-3/5 text-gray-900 dark:text-gray-100"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                    >
                        Hello, I'm <span className="text-[#2C5D5B] dark:text-blue-400">{personalInfo.name}</span>
                    </motion.h1>
                    <motion.h2
                        variants={fadeInUp}
                        className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
                    >
                        {personalInfo.role}
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl"
                    >
                        {personalInfo.bio}
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            href="#projects"
                            className="flex items-center px-6 py-3 bg-[#2C5D5B] text-white rounded-lg hover:bg-transparent hover:text-[#2C5D5B] border-2 border-transparent hover:border-[#2C5D5B] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Briefcase className="w-5 h-5 mr-2" />
                            View Projects
                        </Link>

                        <Link
                            href="#contact"
                            className="flex items-center px-6 py-3 bg-[#2C5D5B] text-white rounded-lg hover:bg-transparent hover:text-[#2C5D5B] border-2 border-transparent hover:border-[#2C5D5B] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Briefcase className="w-5 h-5 mr-2" />
                            Contact Me
                        </Link>

                        <a
                            href={personalInfo.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FileText className="w-5 h-5 mr-2" />
                            Download Resume
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Image - Enhanced without border */}
                <motion.div
                    variants={{
                        initial: { scale: 0.9, opacity: 0 },
                        animate: { scale: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                    className="md:w-2/5 flex justify-center"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                        {/* Subtle background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2C5D5B]/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 transform group-hover:scale-110"></div>
                        
                        {/* Main image container */}
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                            <Image
                                src="/profiles.png"
                                alt={personalInfo.name}
                                width={384}
                                height={384}
                                style={{ objectFit: 'cover' }}
                                priority
                                className="rounded-3xl transition-all duration-700 hover:scale-110 hover:brightness-110"
                            />
                            
                            {/* Subtle overlay gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl"></div>
                        </div>
                        
                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#2C5D5B] rounded-full opacity-80 animate-bounce"></div>
                        <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-400 rounded-full opacity-70 animate-pulse"></div>
                        <div className="absolute top-1/2 -right-8 w-4 h-4 bg-teal-400 rounded-full opacity-60 animate-ping"></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;