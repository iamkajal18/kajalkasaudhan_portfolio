import { PersonalInfo, TechSkill, Project, Education, Experience } from "@/types";

export const personalInfo: PersonalInfo = {
    name: "Kajal Kasaudhan",
    role: "Full Stack Developer",
    email: "kasaudhankajal51@gmail.com",
    phone: "6387486751",
    github: "https://github.com/iamkajal18",
    linkedin: "https://www.linkedin.com/in/iamkajalkasaudhan/",
    resumeUrl: "https://drive.google.com/file/d/1pA27MZO0Yp36TKNFejy7azwasSOx1Bgh/view?usp=drive_link",
    bio: "I'm a 4th-year Computer Science student at Goel Institute of Technology and Management, passionate about building modern web applications with Next.js and React. I focus on creating scalable, performant, and user-friendly web experiences.",
};



export const skills: TechSkill[] = [
    { name: "Next.js", level: 50, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "JavaScript", level: 50, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML/CSS", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "Tailwind CSS", level: 60, icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg" }, // Updated Tailwind CSS icon
    { name: "Git", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Java", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "PostgreSQL", level: 55, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Node.js", level: 50, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "React", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", level: 45, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Bootstrap", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
   { name: "Shadcn", level: 50, icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/radixui.svg" },
  { name: "Vercel", level: 70, icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vercel.svg" },
  { name: "GitHub", level: 80, icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" }, // Placeholder icon (Radix UI, related to Shadcn ecosystem)
];
export const projects: Project[] = [
    {
        id: 1,
        title: "LearnZone - LearnZoon Platform Guidance and Success",
        description: "LearnZone is a full-stack blogging platform featuring secure authentication, role-based access, and a powerful rich-text editor. It supports AI-powered SEO, custom URLs, and MongoDB for efficient data handling. Designed to boost engagement by up to 70%, LearnLive offers a seamless content creation and sharing experience.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
        imageUrl: "/LearnZone.png",
        githubUrl: "https://github.com/iamkajal18/learnzone",
        liveUrl: "https://learningzone.vercel.app/",
    },
     {
        id: 2,
        title: "JobedIn",
        description: "JobedIn is a modern job portal that bridges the gap between candidates and recruiters. It offers features like job listings with filters, resume uploads, admin panels, and secure logins. Built with the MERN stack and styled using Tailwind CSS, JobedIn ensures a professional and user-friendly hiring experience.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
        imageUrl: "/JobedIn.png",
        githubUrl: "https://github.com/iamkajal18/Jobed",
        liveUrl: "https://jobed-theta.vercel.app/",
    },
    {
        id: 3,
        title: "Personal PortFolio",
        description: "My personal portfolio is a dynamic and responsive website built with Next.js, MongoDB, Tailwind CSS, and deployed on Vercel. It highlights my technical skills, featured projects, resume, and contact details in a clean and user-friendly design. The site serves as a central hub for showcasing my frontend development work and continuous learning journey.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
        imageUrl: "/Portfolio.png",
        githubUrl: "https://github.com/iamkajal18/kajalkasaudhan_portfolio",
        liveUrl: "https://kajalkasaudhan.vercel.app/",
    },
];

export const education: Education[] = [
    {
        degree: "Bachelor of Technology in Computer Science & Engineering",
        institution: "Goel Institute of Technology and Management, Lucknow",
        period: "2022 - 2026 (Expected)",
        description: "Focusing on Data Structures and Algorithms (C), Python, Java, Computer Organization & Architecture, and Operating Systems. Currently building scalable web applications.",
        gpa:"8.2"
    },
    {
        degree: "Intermediate in Science",
        institution: "Blooming Bud's School",
        period: "2020 - 2022",
        description: "Studied Physics, Chemistry, and Mathematics with a focus on analytical skills and problem-solving.",
        gpa:"A"
    },
    {
        degree: "High School",
        institution: "Blooming Bud's School",
        period: "2018 - 2020",
        description: "Completed with a focus on Science and Mathematics.",
        gpa:"A"
    },
];

// export const experience: Experience[] = [
//     {
//         role: "Founder & Community Manager",
//         company: "Resources and Updates",
//         period: "2023 - Present",
//         description: "Managing a growing community of 8,000+ members on WhatsApp and 2,500+ LinkedIn followers, providing job and internship updates. Scaled technical resources community and boosted student mentorship requests by 30%.",
//         technologies: ["Community Management", "Content Curation", "Networking"],
//     },
//     {
//         role: "Web Developer Intern",
//         company: "Let's Code",
//         period: "Sep 2024 - Mar 2025",
//         description: "Worked on various web development projects, focusing on Next.js and React. Gained experience in building responsive and user-friendly applications.",
//         technologies: ["Next.js", "React", "Tailwind CSS", "Node.js"],
//     },
//     {
//         role: "Campus Ambassador",
//         company: "Unstop",
//         period: "Jan 2024 - Present",
//         description: "Engaging 5,000+ students by promoting tech events and opportunities. Organized coding competitions and mentored fellow students.",
//         technologies: ["Event Management", "Leadership", "Marketing"],
//     },
// ];

export const achievements = [
  "1st Prize : Turbo AI Challenge GITM 2024 for building a working ML model ",
  "1st Prize : Rhythm Divine Quiz Competition GITM 2024",
  "2nd Prize : C Programming Quiz by Computrendz Club GITM 2023",
  "Semi Finalist : Make4Lucknow Hackathon AKTU 2025",
  "Participant : Bhartiya Antariksh Hackathon 2024 powered by ISRO",
  "Solved 150+ DSA problems on LeetCode and GeeksforGeeks",
  "Certified in Java Basic by HackerRank May 2025",
  
]; 