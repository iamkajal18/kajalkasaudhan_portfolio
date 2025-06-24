import { motion } from 'framer-motion';
import Image from 'next/image';
import { TechSkill } from '@/types';

interface SkillCardProps {
    skill: TechSkill;
    index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
    return (
        <motion.div
            variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border-2 border-gradient-to-r from-pink-400 to-purple-500 dark:from-pink-600/50 dark:to-purple-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 1 }}
        >
            <div className="flex items-center mb-5">
                <div className="relative w-12 h-12">
                    <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className="object-contain"
                    />
                </div>
                <h3 className="text-xl font-bold text-pink-800 dark:text-purple-200 ml-4">{skill.name}</h3>
            </div>
            <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="8"
                        className="dark:stroke-gray-600"
                    />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 251.2" }}
                        whileInView={{ strokeDasharray: `${(skill.level / 100) * 251.2} 251.2` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                        viewport={{ once: true }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#1F6E8C" }} />
                            <stop offset="100%" style={{ stopColor: "#9b5fe0" }} />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-pink-900 dark:text-purple-100">
                    {skill.level}%
                </div>
            </div>
        </motion.div>
    );
};

export default SkillCard;