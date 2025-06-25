"use client";

import { motion } from 'framer-motion';

interface AchievementCardProps {
  achievement: string;
  index: number;
}

const AchievementCard = ({ achievement, index }: AchievementCardProps) => {
  // Categorize achievements based on keywords
  const getAchievementType = (text: string) => {
    if (text.includes('Prize') || text.includes('Semi Finalist')) return 'award';
    if (text.includes('Certified')) return 'certification';
    if (text.includes('Participant') || text.includes('DSA')) return 'technical';
    return 'general';
  };

  const type = getAchievementType(achievement);

  // Define styles based on achievement type
  const typeStyles = {
    award: {
      border: 'border-yellow-400/30',
      bg: 'bg-yellow-100/10 dark:bg-yellow-900/10',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    certification: {
      border: 'border-emerald-400/30',
      bg: 'bg-emerald-100/10 dark:bg-emerald-900/10',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    technical: {
      border: 'border-blue-400/30',
      bg: 'bg-blue-100/10 dark:bg-blue-900/10',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4m-12 0l4-4-4-4m4 12V4" />
        </svg>
      ),
    },
    general: {
      border: 'border-gray-400/30',
      bg: 'bg-gray-100/10 dark:bg-gray-700/10',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  };

  const { border, bg, icon } = typeStyles[type];

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, delay: index * 0.1 } },
    hover: { scale: 1.05, rotateX: 3, rotateY: 3, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={`relative p-6 rounded-xl backdrop-blur-md bg-white/20 dark:bg-gray-800/20 ${border} ${bg} shadow-lg hover:shadow-xl transition-shadow duration-300`}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Icon */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
        {icon}
      </div>

      {/* Content */}
      <p className="mt-6 text-gray-700 dark:text-gray-300 text-sm md:text-base text-center">
        {achievement}
      </p>

      {/* Hover Spark Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent to-white/20 dark:to-gray-600/20" />
      </div>
    </motion.div>
  );
};

export default AchievementCard;