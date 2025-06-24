export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl: string;
    liveUrl?: string;
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
    description: string;
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
}

export interface TechSkill {
    name: string;
    level: number;
    icon: string;
}

export interface PersonalInfo {
    name: string;
    role: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
    bio: string;
}