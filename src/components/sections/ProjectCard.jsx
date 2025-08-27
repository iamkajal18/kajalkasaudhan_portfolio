"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[#2C5D5B]/20 dark:border-[#2C5D5B]/30 h-full flex flex-col relative hover:border-[#2C5D5B]/50 dark:hover:border-[#2C5D5B]/60"
        >
            {/* Ribbon for featured projects - updated style */}
            {project.isFeatured && (
                <div className="absolute -right-8 -top-4 w-32 bg-gradient-to-r from-[#2C5D5B] to-[#3A7D78] text-white text-xs font-bold py-1 px-2 text-center rotate-45 shadow-lg z-10">
                    Featured
                </div>
            )}

            {/* Image container with overlay - enhanced effect */}
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110"
                    priority={index < 5}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div className="w-full">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span 
                                    key={tech} 
                                    className="px-2 py-1 bg-[#2C5D5B] text-white text-xs rounded-full border border-white/10"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card content - updated color scheme */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Category badge - updated */}
                <span className="inline-block mb-2 px-3 py-1 bg-[#2C5D5B]/10 text-[#2C5D5B] dark:text-[#7ABAB5] text-xs font-medium rounded-full border border-[#2C5D5B]/20 dark:border-[#2C5D5B]/30">
                    {project.category}
                </span>

                {/* Title and description - enhanced hover */}
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-[#2C5D5B] dark:group-hover:text-[#7ABAB5] transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {project.description}
                </p>

                {/* Tech stack pills - updated colors */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                            key={tech} 
                            className="px-3 py-1 bg-[#2C5D5B]/10 hover:bg-[#2C5D5B]/20 dark:bg-[#2C5D5B]/20 dark:hover:bg-[#2C5D5B]/30 text-[#2C5D5B] dark:text-[#7ABAB5] text-xs font-medium rounded-full border border-[#2C5D5B]/20 dark:border-[#2C5D5B]/30 transition-all duration-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                {/* Action buttons - updated with teal color scheme */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#2C5D5B] dark:hover:text-[#7ABAB5] transition-colors duration-300 text-sm font-medium group/github"
                    >
                        <svg className="w-4 h-4 mr-2 group-hover/github:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        Source Code
                    </a>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#2C5D5B] to-[#3A7D78] hover:from-[#3A7D78] hover:to-[#2C5D5B] text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;