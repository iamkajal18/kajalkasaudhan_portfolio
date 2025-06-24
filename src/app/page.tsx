"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import JourneySection from '@/components/sections/JourneySection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';
import { personalInfo } from '@/data/personalInfo';
import Footer from '@/components/layout/Footer';
import { useTheme } from '@/providers/ThemeProvider';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    setIsLoaded(true);

    // Intersection Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} activeSection={activeSection} />

        <main className="container mx-auto px-4 py-8">
          <HeroSection isLoaded={isLoaded} personalInfo={personalInfo} />
          <SkillsSection />
          <ProjectsSection />
          <JourneySection />
          <AchievementsSection />
          <ContactSection personalInfo={personalInfo} />
        </main>

        <Footer />
      </div>
    </div>
  );
}