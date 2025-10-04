// Types
export interface Experience {
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  color?: string;
}

export interface Project {
  name: string;
  role: string;
  summary: string;
  impact: string;
  links?: Array<{ label: string; url: string }>;
}

export interface CreativeProject {
  name: string;
  impact: string;
  description: string;
  iconName: "Users" | "Brain" | "Globe";
  gradient: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface CoreCompetency {
  category: string;
  skills: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
}

// Experiences data
export const experiences: Experience[] = [
  {
    company: "FrontierAI",
    location: "Global (Remote)",
    title: "Founder — Product Engineer",
    startDate: "2024-10",
    endDate: "Present",
    highlights: [
      "Shipped AI-native products from zero to traction: Nona (2,000 users in 72h, Real-Estate AI Agent) and SenatorMatch (2,000 users in 48h, civic-tech value matching).",
      "Generative development case study: Built RecurringHQ in ~3 hours with Lovable; ~90% faster than typical 2–4 week builds; enabled rapid iteration without a dev team.",
      "Content creation at scale: 1.35M Facebook views in 90 days (+1,213% QoQ); many posts at 10–30k views; minutes-per-post workflow using ChatGPT + custom GPT agents."
    ]
  },
  {
    company: "Full Scale Ventures",
    location: "Kansas, US (Remote)",
    title: "Director of Product Management, Startup Portfolio",
    startDate: "2024-11",
    endDate: "Present",
    highlights: [
      "Led AI & prompt engineering strategy across multiple AI product ventures.",
      "Launched 100+ prompt prototypes using v0/Lovable, cutting idea validation from ~2 weeks to 1 day.",
      "Aligned product roadmaps across engineering, design, and business; fostered rapid experimentation."
    ]
  },
  {
    company: "GoTeam",
    location: "Cebu City, PH",
    title: "Director of Product Management, Enterprise AI & Process Automation",
    startDate: "2024-04",
    endDate: "2024-09",
    highlights: [
      "Built AI hiring platform reducing average hiring turnaround from 45 days to 18 days.",
      "Processed 61,151 applicants and conducted 15,332 interviews; saved ~428,000 minutes via automation.",
      "Delivered automated billing solution reducing a 40-hour manual report to instantaneous.",
      "Shipped automation tool saving ~72,000 hours annually."
    ]
  },
  {
    company: "MultiplAI",
    location: "Cebu City, PH",
    title: "Director of Product Management, AI SaaS Startup Portfolio",
    startDate: "2024-04",
    endDate: "2024-09",
    highlights: [
      "Launched 3 GTM products; grew from 0 to 1,292 users; generated $7,788 revenue in first 30 days.",
      "Instituted prioritization using qual/quant insights; raised a key product's monthly utilization by 38%.",
      "Implemented PLG MOAT framework (positioning, ocean conditions, audience, TTV) to inform strategy."
    ]
  },
  {
    company: "TripGuru",
    location: "Hong Kong, HK",
    title: "Lead Product Manager, Platform",
    startDate: "2023-08",
    endDate: "2024-04",
    highlights: [
      "Led product strategy for a $30M startup operating in 10 countries.",
      "Implemented gen-AI support system cutting response time from ~2 minutes to ~10 seconds.",
      "Shipped internal product to remove unprofitable tours; contributed to 19.06% YoY profit increase."
    ]
  },
  {
    company: "bneXt",
    location: "Makati, PH",
    title: "Product Manager, Enterprise",
    startDate: "2023-01",
    endDate: "2023-08",
    highlights: [
      "Owned flagship product logging 200,000+ work hours annually; enabled near real-time decentralized reporting.",
      "Winner: SAP Hack2Build (Process Automation with LCNC).",
      "Aligned product vision with business goals in a project-based org; improved outcomes and satisfaction."
    ]
  },
  {
    company: "bneXt",
    location: "Makati, PH",
    title: "Business Intelligence Solution Architect, Enterprise",
    startDate: "2022-06",
    endDate: "2022-12",
    highlights: [
      "Led BI team spanning SAP BW, SAC, ABAP, and Web; delivered pipelines for multinational brands.",
      "Drove strategy and execution for BI projects and BD to align with client goals and timelines."
    ]
  },
  {
    company: "Datos Pilipinas",
    location: "Cebu, PH",
    title: "Lead Product Manager (Non-Profit)",
    startDate: "2022-03",
    endDate: "2024-03",
    highlights: [
      "Launched 'VeriPol' to empower voter decision-making with accessible, reliable information.",
      "Led a cross-disciplinary team (design, dev, data science, policy, marketing) to ship civic-tech products."
    ]
  },
  {
    company: "EVConstruction",
    location: "Cebu, PH",
    title: "Product Manager, Digital Transformation",
    startDate: "2016-01",
    endDate: "2021-12",
    highlights: [
      "Built digital system and mobile app to digitize records and documentation workflows.",
      "Managed project portfolio and key partnerships; negotiated bank funding for critical projects."
    ]
  }
];

// Creative experiences (with colors and gradients)
export const creativeExperiences: Experience[] = [
  {
    company: "FrontierAI",
    location: "Global (Remote)",
    title: "Founder — Product Engineer",
    startDate: "2024-10",
    endDate: "Present",
    color: "from-purple-500 to-pink-500",
    highlights: [
      "Shipped AI-native products from zero to traction: Nona (2,000 users in 72h)",
      "Built RecurringHQ in ~3 hours with Lovable; ~90% faster than typical builds",
      "1.35M Facebook views in 90 days (+1,213% QoQ)"
    ]
  },
  {
    company: "Full Scale Ventures",
    location: "Kansas, US (Remote)",
    title: "Director of Product Management",
    startDate: "2024-11",
    endDate: "Present",
    color: "from-blue-500 to-cyan-500",
    highlights: [
      "Led AI & prompt engineering strategy across multiple ventures",
      "Launched 100+ prompt prototypes, cutting validation from ~2 weeks to 1 day",
      "Aligned product roadmaps across engineering, design, and business"
    ]
  },
  {
    company: "GoTeam",
    location: "Cebu City, PH",
    title: "Director of Product Management",
    startDate: "2024-04",
    endDate: "2024-09",
    color: "from-green-500 to-teal-500",
    highlights: [
      "Reduced hiring turnaround from 45 days to 18 days",
      "Processed 61,151 applicants; saved ~428,000 minutes via automation",
      "Shipped automation tool saving ~72,000 hours annually"
    ]
  }
];

// Executive experiences (more formal formatting)
export const executiveExperiences: Experience[] = [
  {
    company: "FrontierAI",
    location: "Global (Remote)",
    title: "Founder — Product Engineer",
    startDate: "October 2024",
    endDate: "Present",
    highlights: [
      "Established product & AI engineering consultancy focused on LLM and Agentic Engineering",
      "Delivered AI-native products achieving 2,000+ users within 72 hours of launch",
      "Achieved 90% reduction in development time through generative development methodologies",
      "Generated 1.35M content views in 90 days, representing 1,213% quarter-over-quarter growth"
    ]
  },
  {
    company: "Full Scale Ventures",
    location: "Kansas, United States (Remote)",
    title: "Director of Product Management, Startup Portfolio",
    startDate: "November 2024",
    endDate: "Present",
    highlights: [
      "Direct AI and prompt engineering strategy across multiple venture portfolio companies",
      "Launched 100+ prompt prototypes, reducing idea validation timeline from 2 weeks to 1 day",
      "Align cross-functional teams across engineering, design, and business operations"
    ]
  },
  {
    company: "GoTeam",
    location: "Cebu City, Philippines",
    title: "Director of Product Management, Enterprise AI & Process Automation",
    startDate: "April 2024",
    endDate: "September 2024",
    highlights: [
      "Developed AI hiring platform reducing average turnaround from 45 to 18 days",
      "Processed 61,151 applicants and conducted 15,332 interviews through automated systems",
      "Delivered billing automation solution eliminating 40 hours of manual reporting",
      "Implemented automation tools generating 72,000 hours in annual time savings"
    ]
  },
  {
    company: "MultiplAI",
    location: "Cebu City, Philippines",
    title: "Director of Product Management, AI SaaS Startup Portfolio",
    startDate: "April 2024",
    endDate: "September 2024",
    highlights: [
      "Launched 3 go-to-market products achieving 1,292 users and $7,788 revenue in 30 days",
      "Increased monthly product utilization by 38% through data-driven prioritization",
      "Implemented PLG MOAT framework for strategic product positioning"
    ]
  },
  {
    company: "TripGuru",
    location: "Hong Kong",
    title: "Lead Product Manager, Platform",
    startDate: "August 2023",
    endDate: "April 2024",
    highlights: [
      "Led product strategy for $30M startup operating across 10 countries",
      "Implemented generative AI support system reducing response time from 2 minutes to 10 seconds",
      "Contributed to 19.06% year-over-year profit increase through strategic product initiatives"
    ]
  }
];

// Projects data
export const projects: Project[] = [
  {
    name: "SenatorMatch",
    role: "Founder / Product Lead",
    summary: "AI agents helping voters find candidates aligned with their values.",
    impact: "2,000 users in 48 hours",
    links: []
  },
  {
    name: "InterviewRoom.ai",
    role: "Product Lead",
    summary: "AI agent for hiring teams.",
    impact: "$7,788 revenue in first 30 days",
    links: [{ label: "Site", url: "http://interviewroom.ai" }]
  },
  {
    name: "DatosPilipinas.com",
    role: "Founder / Lead PM",
    summary: "Initiatives using data and AI to solve Filipino problems.",
    impact: "",
    links: []
  }
];

// Creative projects (with icons and gradients)
export const creativeProjects: CreativeProject[] = [
  {
    name: "SenatorMatch",
    impact: "2,000 users in 48 hours",
    description: "AI agents helping voters find candidates aligned with their values",
    iconName: "Users",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    name: "InterviewRoom.ai",
    impact: "$7,788 revenue in first 30 days",
    description: "AI agent for hiring teams",
    iconName: "Brain",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    name: "DatosPilipinas.com",
    impact: "Civic Tech Innovation",
    description: "Data and AI solving Filipino problems",
    iconName: "Globe",
    gradient: "from-blue-500 to-indigo-500"
  }
];

// Skills data
export const skills: string[] = [
  "AI Engineering", "LLM Engineering", "AI Architecture", "Prompt Engineering",
  "Agentic Systems", "Product Strategy & Roadmaps", "Cross-Functional Leadership",
  "Innovation Management", "SaaS & PLG Strategy", "GTM & Customer Journey Mapping"
];

// Creative skills (with levels and colors)
export const creativeSkills: Skill[] = [
  { name: "AI Engineering", level: 95, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Product Strategy", level: 90, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { name: "Prompt Engineering", level: 95, color: "bg-gradient-to-r from-green-500 to-teal-500" },
  { name: "Agentic Systems", level: 85, color: "bg-gradient-to-r from-orange-500 to-red-500" },
  { name: "PLG Strategy", level: 88, color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
  { name: "Cross-Functional Leadership", level: 92, color: "bg-gradient-to-r from-pink-500 to-rose-500" }
];

// Awards data
export const awards: string[] = [
  "Top 100 Brightest Minds Under 30 — Stellar PH",
  "LinkedIn Top Voice — Product Management (2023)",
  "7× Google Developer Groups Speaker",
  "3× Hackathon Winner (SAP, Google, NES)",
  "AI Community Lead — AI Pilipinas Cebu Chapter"
];

// Achievements (executive version)
export const achievements: string[] = [
  "Top 100 Brightest Minds Under 30 — Stellar Philippines",
  "LinkedIn Top Voice — Product Management (2023)",
  "7× Google Developer Groups Speaker",
  "ADPList Mentor — Product Management",
  "3× Hackathon Winner (SAP, Google, NES)",
  "AI Community Lead — AI Pilipinas Cebu Chapter"
];

// Education data
export const education: Education[] = [
  {
    institution: "Asian Institute of Management",
    degree: "Post Graduate Diploma",
    field: "Artificial Intelligence and Machine Learning"
  },
  {
    institution: "The Wharton School, University of Pennsylvania",
    degree: "Specialization Certificate",
    field: "Entrepreneurship"
  }
];

// Core competencies (executive version)
export const coreCompetencies: CoreCompetency[] = [
  { category: "Technical Leadership", skills: ["AI Engineering", "LLM Engineering", "AI Architecture", "Prompt Engineering", "Agentic Systems"] },
  { category: "Product Management", skills: ["Product Strategy", "Roadmapping", "GTM Strategy", "PLG Implementation", "OKRs"] },
  { category: "Business Impact", skills: ["Revenue Growth", "Cost Optimization", "Digital Transformation", "Market Analysis", "Stakeholder Management"] },
  { category: "Team Leadership", skills: ["Cross-Functional Leadership", "Agile/Scrum", "Innovation Management", "Public Speaking", "Community Building"] }
];
