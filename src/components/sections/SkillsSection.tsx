"use client";

import { motion } from 'framer-motion';
import SkillCard from './SkillCard';
import SectionHeading from './SectionHeading';
import { skills } from '@/data/personalInfo';

const SkillsSection = () => {
    return (
        <section
            id="skills"
            className="py-16 md:py-24 bg-[#e6e1e4] dark:bg-gray-900/95 transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
  <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
    <span className="absolute inset-x-0 -bottom-1 h-3 bg-[#2C5D5B]/30 dark:bg-[#7ABAB5]/40 rounded-full -z-10"></span>
    <span className="relative z-10">
      My <span className="text-[#2C5D5B] dark:text-[#7ABAB5]">Skill</span>
    </span>
  </h2>
</div>


                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        animate: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            variants={{
                                initial: { opacity: 0, y: 30 },
                                animate: { 
                                    opacity: 1, 
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }
                                }
                            }}
                        >
                            <SkillCard skill={skill} index={index} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            </div>
        </section>
    );
};

export default SkillsSection;