export type EducationItem = {
  school: string;
  degree?: string;
  graduation?: string;
  location?: string;
};

export type ExperienceItem = {
  company: string;
  role?: string;
  duration?: string;
  location?: string;
};

export type ProjectItem = {
  title: string;
  stack?: string[];
  description?: string;
  links?: { github?: string; demo?: string };
};

export type ResumeStructuredData = {
  name: string;
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string[];
  certifications: string[];
};

export const resumeData: ResumeStructuredData = {
  name: "Rishi Ahuja",
  contact: {
    email: "rishiahuja.1404@gmail.com",
    phone: "+1 (226) 751-5815",
    location: "Waterloo, ON",
    github: "https://github.com/rishiahuja",
    linkedin: "https://linkedin.com/in/rishiahuja",
    portfolio: "",
  },
  education: [
    {
      school: "University of Waterloo",
      degree: "Bachelor of Computer Science",
      graduation: "Dec 2029",
      location: "Waterloo, ON",
    },
  ],
  experience: [
    { company: "Vedantu", role: "Software Engineering Intern", location: "New Delhi", duration: "May 2023 – Jul 2023" },
    { company: "Tinker Zoo", role: "Founder & CEO", location: "New Delhi", duration: "Jan 2021 – Mar 2024" },
    { company: "Wadhwa", role: "Tech Operations Intern", location: "Remote", duration: "May 2022 – Jul 2022" },
  ],
  projects: [
    {
      title: "Magnificent Seven Sentiment",
      description:
        "Financial news sentiment system combining FinBERT with a custom hierarchical model (HSAM) and time-decay/PCA/volatility adjustments.",
      stack: ["Python", "Transformers", "FinBERT", "Scikit-learn", "Matplotlib"],
    },
    {
      title: "MarmoUI 2.0",
      description:
        "Browser extension for UWaterloo Marmoset adding themes, submission tracking, and score visualizations.",
      stack: ["JavaScript", "HTML", "CSS", "Browser APIs"],
    },
    {
      title: "ManuQuill",
      description:
        "NLP tool that transforms raw text into styled documents like resumes and reports.",
      stack: ["React", "OpenAI", "Tailwind", "API"],
    },
    {
      title: "Teacher Buddy",
      description:
        "Tkinter app to evaluate assignments using NLP, storing student records in SQL/CSV.",
      stack: ["Python", "NLTK", "MySQL", "CSV"],
    },
  ],
  skills: [
    "Python",
    "C",
    "C++",
    "Java",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "Flask",
    "Django",
    "AWS",
    "Linux",
    "Bash",
    "Deep Learning",
    "Software Development",
  ],
  certifications: [
    "Python (Advanced)",
    "Arduino (Advanced)",
    "App Development (Advanced)",
    "National Ideathon 1st place [500 CAD]",
    "LOR (Vedantu)",
  ],
};


