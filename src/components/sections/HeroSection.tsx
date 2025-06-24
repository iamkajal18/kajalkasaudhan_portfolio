"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PersonalInfo } from '@/types';
import { Briefcase, Mail, FileText } from 'lucide-react';

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
  className="flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
>
  <Briefcase className="w-5 h-5 mr-2" />
  View Portfolio
</Link>

<Link
  href="#contact"
   className="flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
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
                <motion.div
                    variants={{
                        initial: { scale: 0.9, opacity: 0 },
                        animate: { scale: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                    className="md:w-2/5 flex justify-center"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <Image
                            src={'/profile.png'}
                            alt={personalInfo.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                            className="rounded-2xl transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 dark:from-blue-500/30 to-transparent"></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;