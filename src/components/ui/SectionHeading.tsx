import { motion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                <span className="relative inline-block">
                    <span className="absolute inset-x-0 bottom-2 h-3 bg-blue-200 dark:bg-blue-900/50 transform -skew-x-6"></span>
                    <span className="relative">{title}</span>
                </span>
            </h2>
            {subtitle && (
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeading;