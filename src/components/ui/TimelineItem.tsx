import { motion } from 'framer-motion';

interface TimelineItemProps {
    title: string;
    subtitle: string;
    period: string;
    description: string;
    tags?: string[];
    index: number;
    isReversed?: boolean;
}

const TimelineItem = ({
    title,
    subtitle,
    period,
    description,
    tags = [],
    index,
    isReversed = false
}: TimelineItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600 dark:border-blue-500"
        >
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h4>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{subtitle}</p>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm my-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {period}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default TimelineItem;