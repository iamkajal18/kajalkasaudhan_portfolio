"use client";

import SectionHeading from '@/components/ui/SectionHeading';
import AchievementCard from '@/components/ui/AchievementCard';
import { achievements } from '@/data/personalInfo';

const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-yellow-50/30 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 -mx-4 px-4 rounded-3xl overflow-hidden relative"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/constellation.svg')] opacity-10 dark:opacity-20 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Achievements"
          subtitle="Key milestones and recognitions throughout my academic and professional journey."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;