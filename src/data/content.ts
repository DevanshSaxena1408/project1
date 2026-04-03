export const siteConfig = {
  name: "Devansh",
  title: "AI Engineer, Builder, Founder",
  tagline: "Crafting intelligent systems that shape the future",
  email: "devansh@example.com",
  linkedin: "https://linkedin.com/in/devansh",
  github: "https://github.com/devansh",
};

export interface Planet {
  id: string;
  name: string;
  label: string;
  color: string;
  emissive: string;
  position: [number, number, number];
  size: number;
  ringColor?: string;
  hasRing?: boolean;
  description: string;
}

export const planets: Planet[] = [
  {
    id: "about",
    name: "Earth",
    label: "About Me",
    color: "#4fc3f7",
    emissive: "#1565c0",
    position: [0, 0, 0],
    size: 1.8,
    description: "Learn about who I am",
  },
  {
    id: "experience",
    name: "Mars",
    label: "Experience",
    color: "#ff7043",
    emissive: "#bf360c",
    position: [6, 1, -3],
    size: 1.4,
    description: "My professional journey",
  },
  {
    id: "projects",
    name: "Saturn",
    label: "Projects",
    color: "#ffab40",
    emissive: "#e65100",
    position: [-7, -1, -2],
    size: 2.0,
    hasRing: true,
    ringColor: "#ffcc80",
    description: "Things I've built",
  },
  {
    id: "skills",
    name: "Neptune",
    label: "Skills",
    color: "#b388ff",
    emissive: "#4a148c",
    position: [5, -2, -5],
    size: 1.6,
    description: "My technical arsenal",
  },
  {
    id: "contact",
    name: "Moon",
    label: "Contact",
    color: "#e0e0e0",
    emissive: "#616161",
    position: [-4, 2, -4],
    size: 1.0,
    description: "Get in touch",
  },
];

export const aboutData = {
  intro:
    "I'm Devansh — an AI Engineer, Full Stack Developer, and Founder with a passion for building products that merge intelligence with experience. I thrive at the intersection of AI research and real-world engineering.",
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "University",
      year: "2021 - 2025",
    },
  ],
  founderStory:
    "Founded Pixadora — a creative tech studio focused on building AI-powered solutions for businesses. From concept to deployment, I lead teams to ship products that matter.",
};

export const skillsData = {
  categories: [
    {
      name: "AI / ML",
      icon: "brain",
      color: "#b388ff",
      skills: [
        { name: "LLM / GPT", level: 95 },
        { name: "RAG Pipelines", level: 90 },
        { name: "LangChain", level: 88 },
        { name: "Computer Vision", level: 82 },
        { name: "NLP", level: 87 },
        { name: "TensorFlow", level: 80 },
      ],
    },
    {
      name: "Web Development",
      icon: "code",
      color: "#4fc3f7",
      skills: [
        { name: "React / Next.js", level: 92 },
        { name: "Node.js", level: 88 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Three.js", level: 78 },
        { name: "REST / GraphQL", level: 85 },
      ],
    },
    {
      name: "Android",
      icon: "smartphone",
      color: "#66bb6a",
      skills: [
        { name: "Kotlin", level: 85 },
        { name: "Jetpack Compose", level: 80 },
        { name: "Firebase", level: 88 },
        { name: "Room DB", level: 78 },
      ],
    },
    {
      name: "Cloud / DevOps",
      icon: "cloud",
      color: "#ffab40",
      skills: [
        { name: "AWS", level: 82 },
        { name: "Docker", level: 80 },
        { name: "GCP", level: 78 },
        { name: "CI/CD", level: 75 },
        { name: "Vercel", level: 90 },
      ],
    },
  ],
};

export const experienceData = [
  {
    id: "nokia",
    company: "Nokia",
    role: "AI Developer",
    period: "2024 - Present",
    description:
      "Building AI-powered network automation tools using LLMs and RAG pipelines. Developing intelligent systems for telecom infrastructure optimization.",
    tech: ["Python", "LangChain", "RAG", "LLM", "Azure"],
    color: "#4fc3f7",
  },
  {
    id: "intel",
    company: "Intel Unnati",
    role: "Industrial Trainee",
    period: "2023 - 2024",
    description:
      "Worked on AI/ML projects focused on industrial applications. Developed computer vision solutions for quality control systems.",
    tech: ["Python", "TensorFlow", "OpenCV", "ML"],
    color: "#ffab40",
  },
  {
    id: "pixadora",
    company: "Pixadora",
    role: "Founder",
    period: "2023 - Present",
    description:
      "Founded a creative tech studio building AI-powered solutions for businesses. Leading product development from concept to deployment.",
    tech: ["Next.js", "AI", "Product", "Leadership"],
    color: "#b388ff",
  },
  {
    id: "nayepankh",
    company: "NayePankh Foundation",
    role: "Tech Volunteer",
    period: "2022 - 2023",
    description:
      "Built web platforms for the NGO to streamline donation and volunteer management systems.",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#f48fb1",
  },
];

export const projectsData = [
  {
    id: "medicare",
    name: "Medicare",
    tagline: "AI-Powered Healthcare Platform",
    description:
      "Full-stack healthcare platform with LLM chatbot for symptom analysis, real-time doctor consultations, and AI-powered health recommendations.",
    tech: ["Next.js", "LangChain", "GPT-4", "WebRTC", "MongoDB"],
    color: "#4fc3f7",
    icon: "heart",
    features: [
      "AI Symptom Analyzer",
      "Real-time Consultation",
      "Health Dashboard",
    ],
  },
  {
    id: "devmatch",
    name: "DevMatch",
    tagline: "AI Developer Matching Platform",
    description:
      "Platform that uses AI to match developers with projects based on skills, experience, and preferences. Smart algorithm for optimal team composition.",
    tech: ["React", "Python", "ML", "PostgreSQL", "Redis"],
    color: "#b388ff",
    icon: "users",
    features: ["Smart Matching", "Skill Analysis", "Team Builder"],
  },
  {
    id: "rideease",
    name: "RideEase",
    tagline: "Smart Transportation Solution",
    description:
      "Android application for optimized ride-sharing with real-time tracking, fare prediction, and route optimization using ML algorithms.",
    tech: ["Kotlin", "Firebase", "Maps API", "ML Kit"],
    color: "#66bb6a",
    icon: "car",
    features: ["Real-time Tracking", "Fare Prediction", "Route Optimization"],
  },
  {
    id: "mindfulvista",
    name: "MindfulVista",
    tagline: "Mental Wellness Companion",
    description:
      "AI-driven mental health application providing personalized meditation, mood tracking, and AI therapy conversations using advanced NLP.",
    tech: ["React Native", "GPT-4", "Node.js", "MongoDB"],
    color: "#f48fb1",
    icon: "sparkle",
    features: ["AI Therapy Chat", "Mood Tracking", "Guided Meditation"],
  },
];

export const astronautMessages: Record<string, string[]> = {
  welcome: [
    "Welcome aboard, Explorer! I'm your guide through Devansh's universe.",
    "Click on any planet to discover something amazing!",
    "Try 'Start Mission' for the full experience, or 'Quick View' to jump in fast.",
  ],
  about: [
    "You've landed on Earth — Devansh's home base!",
    "Devansh is an AI Engineer and Founder who loves building intelligent systems.",
    "From Nokia to founding Pixadora, he's always pushing boundaries.",
  ],
  experience: [
    "Welcome to Mars — the planet of experience!",
    "Devansh has worked with industry giants like Nokia and Intel.",
    "Each role has shaped him into a versatile engineer.",
  ],
  projects: [
    "Saturn is spinning with amazing projects!",
    "From healthcare AI to developer matching — Devansh builds impactful products.",
    "Check out each project ring for details!",
  ],
  skills: [
    "Neptune holds a galaxy of skills!",
    "AI, Web, Android, Cloud — Devansh is a true full-stack builder.",
    "Hover over each constellation to see skill levels.",
  ],
  contact: [
    "You've reached the Moon — the closest point of contact!",
    "Ready to start a conversation? Devansh would love to hear from you!",
    "Send a message and it'll rocket straight to his inbox!",
  ],
  idle: [
    "Hey there! Need help navigating? Click a planet!",
    "Psst... try hovering over the planets for a preview!",
    "I wonder what's behind Saturn's rings... 🪐",
  ],
};
