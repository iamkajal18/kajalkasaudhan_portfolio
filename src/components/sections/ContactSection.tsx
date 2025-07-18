"use client";

import { PersonalInfo } from '@/types';
import SectionHeading from './SectionHeading';
import ContactForm from './ContactForm';

interface ContactSectionProps {
    personalInfo: PersonalInfo;
}

const ContactSection = ({ personalInfo }: ContactSectionProps) => {
    return (
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 -mx-4 px-4 rounded-t-3xl">
            <div className="max-w-4xl mx-auto">
                <div className="text-center py-8">
  <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
    <span className="absolute inset-x-0 -bottom-1 h-3 bg-[#2C5D5B]/30 dark:bg-[#7ABAB5]/40 rounded-full -z-10"></span>
    <span className="relative z-10">
      Get <span className="text-[#2C5D5B] dark:text-[#7ABAB5]">In Touch</span>
    </span>
  </h2>
  <p>Have a project in mind or want to collaborate? Feel free to reach out and I'll get back to you as soon as possible.</p>
</div>


                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <a href={`mailto:${personalInfo.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {personalInfo.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                    <a href={`tel:${personalInfo.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {personalInfo.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                       https://github.com/iamkajal18
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                       https://www.linkedin.com/in/iamkajalkasaudhan/
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Follow Me</h3>
                            <div className="flex space-x-4">
                                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>
                                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            
                            </div>
                        </div>
                    </div>

                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;