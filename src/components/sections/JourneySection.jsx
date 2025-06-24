"use client";

import { motion } from 'framer-motion';
import { education } from '@/data/personalInfo';

const JourneySection = () => {
    return (
        <section id="education" className="education py-16 md:py-8">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-3xl md:text-4xl font-bold mb-16 text-center"
                >
                     <h2 className="relative inline-block text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mx-auto">
  <span className="absolute inset-x-0 bottom-1 h-2 bg-blue-300 dark:bg-blue-600 opacity-50 -z-10 rounded-md"></span>
  <span className="relative z-10">My Academic Journey</span>
</h2>
                </motion.h2>
{/*  */}what is the issue ? sayad abhi ko kar rhe tha toh bs name 
                <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 transform -translate-x-1/2"></div>
                    
                    {/* Education */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold mb-8 flex items-center justify-center text-gray-800 dark:text-white bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg w-max mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            Education
                        </h3>
                        
                        <div className="space-y-12">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 transform -translate-x-1/2 z-10"></div>
                                    
                                    {/* Content card */}
                                    <div className={`ml-10 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">{edu.degree}</h4>
                                                    <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full">
                                                        {edu.period}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">{edu.institution}</p>
                                                <p className="text-gray-500 dark:text-gray-400 mb-4">{edu.description}</p>
                                                
                                                {/* Precision metrics (inspired by the math example) */}
                                                {edu.gpa && (
                                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Academic Performance</span>
                                                            <span className="text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                                                GPA: {edu.gpa}/4.0
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                                            <div 
                                                                className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" 
                                                                style={{ width: `${(parseFloat(edu.gpa) / 4.0) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            <span>0.0</span>
                                                            <span>2.0</span>
                                                            <span>4.0</span>
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