import { motion } from 'framer-motion';
import Image from 'next/image';
import { TechSkill } from '@/types';

const SkillCard = ({ skill, index }: { skill: TechSkill; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{
        backgroundColor: '#2C5D5B08', // Base hover
        borderColor: '#4C878450', // Stronger border accent
        boxShadow: '0 8px 24px -6px rgba(76, 135, 132, 0.2)'
      }}
      className="relative group bg-white/95 dark:bg-gray-800/95 rounded-xl p-5 border border-gray-200/80 dark:border-gray-700/60 transition-all duration-300 shadow-sm hover:shadow-md"
      style={{
        width: '160px',
        height: '180px'
      }}
    >
      {/* Icon with dual-color hover effect */}
      <motion.div 
        className="relative mx-auto w-12 h-12 rounded-xl bg-white dark:bg-gray-700 p-2.5 mb-4 flex items-center justify-center shadow-xs"
        whileHover={{
          backgroundColor: '#4C878410',
          borderColor: '#4C878440',
          transform: 'translateY(-3px)'
        }}
        style={{
          border: '1px solid rgba(200, 200, 200, 0.2)'
        }}
      >
        <Image
          src={skill.icon}
          alt={skill.name}
          width={28}
          height={28}
          className="object-contain transition-transform group-hover:scale-110"
        />
      </motion.div>

      {/* Skill name with color-shift */}
      <h3 className="text-sm font-medium text-center mb-4 text-gray-800 dark:text-gray-100 group-hover:text-[#4C8784] dark:group-hover:text-[#7AB8B0] transition-colors duration-300 line-clamp-2 leading-tight">
        {skill.name}
      </h3>

      {/* Progress circle with gradient */}
      <div className="relative w-16 h-16 mx-auto">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="#EDF2F7"
            strokeWidth="5"
            className="dark:stroke-gray-700"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 251" }}
            animate={{ strokeDasharray: `${(skill.level / 100) * 251} 251` }}
            transition={{ 
              duration: 1.5, 
              delay: 0.4,
              ease: [0.32, 0, 0.67, 0] 
            }}
          />
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2C5D5B" />
              <stop offset="100%" stopColor="#4C8784" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{
            scale: 1.1,
            color: '#4C8784'
          }}
        >
          <span className="text-sm font-bold text-[#2C5D5B] dark:text-[#7AB8B0] group-hover:text-[#366c69] transition-colors">
            {skill.level}%
          </span>
        </motion.div>
      </div>

      {/* Dual-color hover underline */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        initial={{ 
          scaleX: 0,
          background: 'linear-gradient(90deg, #2C5D5B, #4C8784)'
        }}
        whileHover={{ 
          scaleX: 1,
          opacity: 1,
          boxShadow: '0 2px 12px rgba(76, 135, 132, 0.3)'
        }}
        transition={{ 
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

export default SkillCard;