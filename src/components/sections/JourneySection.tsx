"use client";

import { motion } from 'framer-motion';
import { education } from '@/data/personalInfo';

const JourneySection = () => {
    return (
        <section id="background" className="py-20 md:py-24 bg-gradient-to-b from-gray-50/80 to-gray-100/50 dark:from-gray-900/80 dark:to-gray-800/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-20 text-center"
                >
                    <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        <span className="absolute inset-x-0 -bottom-1 h-3 bg-gradient-to-r from-[#2C5D5B]/40 to-[#3A7D78]/50 dark:from-[#7ABAB5]/40 dark:to-[#3A7D78]/60 rounded-full -z-10 transform scale-x-110"></span>
                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#2C5D5B] to-[#3A7D78] dark:from-[#7ABAB5] dark:to-[#3A7D78]">
                            My Academic Journey
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        The milestones that forged my intellectual prowess
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Glowing vertical timeline line */}
                    <div className="absolute left-4 md:left-1/2 h-full w-1 bg-gradient-to-b from-[#2C5D5B]/10 via-[#2C5D5B] to-[#3A7D78] dark:from-[#2C5D5B]/20 dark:via-[#7ABAB5] dark:to-[#3A7D78] transform -translate-x-1/2 shadow-lg shadow-[#2C5D5B]/20 dark:shadow-[#7ABAB5]/20"></div>
                    
                    {/* Education section - premium header */}
                    <div className="space-y-2">
                        <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold mb-12 flex items-center justify-center text-white bg-gradient-to-r from-[#2C5D5B] via-[#3A7D78] to-[#2C5D5B] p-4 rounded-xl shadow-xl w-max mx-auto border border-[#7ABAB5]/30 hover:shadow-[0_0_20px_-5px_rgba(42,157,143,0.4)] transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                           Education
                        </motion.h3>
                        
                        <div className="space-y-16">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                                >
                                    {/* Glowing timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-[#2C5D5B] dark:bg-[#7ABAB5] ring-4 ring-[#2C5D5B]/30 dark:ring-[#7ABAB5]/40 transform -translate-x-1/2 z-10 shadow-lg shadow-[#2C5D5B]/30 dark:shadow-[#7ABAB5]/30 animate-pulse-slow"></div>
                                    
                                    {/* Premium content card */}
                                    <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-[#2C5D5B]/20 dark:border-[#2C5D5B]/30 hover:border-[#2C5D5B]/40 dark:hover:border-[#7ABAB5]/50 transition-all duration-300 group hover:shadow-[0_10px_30px_-15px_rgba(42,157,143,0.3)]">
                                            {/* Degree header with gradient accent */}
                                            <div className="bg-gradient-to-r from-[#2C5D5B]/5 via-[#3A7D78]/5 to-[#2C5D5B]/5 dark:from-[#2C5D5B]/10 dark:via-[#3A7D78]/10 dark:to-[#2C5D5B]/10 p-6 border-b border-[#2C5D5B]/10 dark:border-[#7ABAB5]/10">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-[#2C5D5B] dark:group-hover:text-[#7ABAB5] transition-colors">
                                                            {edu.degree}
                                                        </h4>
                                                        <p className="text-[#2C5D5B] dark:text-[#7ABAB5] font-medium mt-1 flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            {edu.institution}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs font-semibold bg-gradient-to-r from-[#2C5D5B] to-[#3A7D78] dark:from-[#7ABAB5] dark:to-[#3A7D78] text-white px-3 py-1 rounded-full shadow">
                                                        {edu.period}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Card body with sleek design */}
                                            <div className="p-6">
                                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{edu.description}</p>
                                                
                                                {/* Enhanced GPA display - 10 point scale */}
                                                {edu.gpa && (
                                                    <div className="bg-gradient-to-br from-[#2C5D5B]/5 to-[#3A7D78]/5 dark:from-[#2C5D5B]/10 dark:to-[#3A7D78]/10 p-5 rounded-xl border border-[#2C5D5B]/15 dark:border-[#7ABAB5]/20 group-hover:border-[#2C5D5B]/30 dark:group-hover:border-[#7ABAB5]/40 transition-all duration-300">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="text-sm font-medium text-[#2C5D5B] dark:text-[#7ABAB5] flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Academic Distinction
                                                            </span>
                                                            <span className="text-sm font-bold bg-gradient-to-r from-[#2C5D5B] to-[#3A7D78] bg-clip-text text-transparent">
                                                                {edu.gpa}/10 CGPA
                                                            </span>
                                                        </div>
                                                        <div className="relative pt-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium text-[#2C5D5B] dark:text-[#7ABAB5]">
                                                                    0.0
                                                                </span>
                                                                <span className="text-xs font-medium text-[#2C5D5B] dark:text-[#7ABAB5]">
                                                                    10.0
                                                                </span>
                                                            </div>
                                                            <div className="overflow-hidden h-2.5 mt-1 rounded-full bg-gray-200 dark:bg-gray-700 shadow-inner">
                                                                <div 
                                                                    className="h-2.5 rounded-full bg-gradient-to-r from-[#2C5D5B] via-[#3A7D78] to-[#7ABAB5] shadow-md" 
                                                                    style={{ width: `${(parseFloat(edu.gpa) / 10) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default JourneySection;