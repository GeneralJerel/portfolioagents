/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  ExternalLink, 
  Calendar, 
  TrendingUp, 
  Linkedin, 
  ChevronDown, 
  ChevronUp,
  Award,
  Users,
  GraduationCap,
  Code,
  Smartphone,
  Cpu,
  Zap,
  Globe,
  Github,
  BookOpen,
  Rocket,
  Terminal,
  Database,
  Cloud,
  Phone
} from "lucide-react";

// Simple inline components for better reproducibility
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "outline" | "success" | "tech" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
    variant === "default" ? "bg-emerald-100 text-emerald-800" :
    variant === "secondary" ? "bg-gray-100 text-gray-800" :
    variant === "success" ? "bg-green-100 text-green-800" :
    variant === "tech" ? "bg-blue-100 text-blue-800" :
    "border border-gray-300 text-gray-700"
  }`}>
    {children}
  </span>
);

const ExperienceCard = ({ title, company, industry, duration, responsibilities, technologies }: {
  title: string; company: string; industry: string; duration: string; responsibilities: string[]; technologies: string[];
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{company}</h3>
        <p className="text-emerald-600 font-medium">{title}</p>
        <p className="text-gray-500 text-sm">{industry}</p>
      </div>
      <div className="text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {duration}
        </div>
      </div>
    </div>
    <ul className="space-y-2 mb-4">
      {responsibilities.map((responsibility, index) => (
        <li key={index} className="text-gray-700 text-sm leading-relaxed">
          • {responsibility}
        </li>
      ))}
    </ul>
    <div className="pt-4 border-t border-gray-200">
      <p className="text-xs font-semibold text-gray-500 mb-2">TECHNOLOGIES</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <Badge key={index} variant="tech">{tech}</Badge>
        ))}
      </div>
    </div>
  </div>
);

const SkillCategory = ({ title, icon: Icon, skills, proficiency }: {
  title: string; icon: React.ElementType; skills: string[]; proficiency?: string;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-center mb-4">
      <Icon className="w-5 h-5 text-emerald-600 mr-2" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {proficiency && <p className="text-xs text-emerald-600 font-medium">{proficiency}</p>}
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge key={index} variant="outline">{skill}</Badge>
      ))}
    </div>
  </div>
);

export default function DavidPanoncePage() {
  const [showAllExperience, setShowAllExperience] = useState(false);

  useEffect(() => {
    document.title = "David Brent C. Panonce — Full Stack AI Engineer & Technical Leader";
  }, []);

  const experiences = [
    {
      title: "Co-founder & CTO",
      company: "Datos Pilipinas",
      industry: "Civic Tech",
      duration: "March 2022 - Present",
      responsibilities: [
        "Co-founded a civic-tech organization leveraging data and technology for voter empowerment.",
        "Built VeriPol, a national election voter education app using Flutter, Firebase, and optimized JSON storage serving thousands of voters.",
        "Created a custom hierarchical location filter improving offline performance.",
        "Pioneered SenatorMatch, a RAG-powered senatorial candidate matcher using MongoDB embeddings and AWS Lambda.",
        "Led technical architecture decisions for civic engagement platforms."
      ],
      technologies: ["Flutter", "Firebase", "Next.js", "MongoDB", "FastAPI", "LangChain", "OpenAI", "AWS Lambda"]
    },
    {
      title: "Co-founder & CTO",
      company: "Dexcribe",
      industry: "AI Legal Tech",
      duration: "May 2025 - Present (Paused)",
      responsibilities: [
        "Built AI-powered legal assistant for contract analysis and Philippine jurisprudence using RAG pipelines.",
        "Scraped and chunked Supreme Court rulings (2021–2025) for vector search and clause-level retrieval.",
        "Integrated Uvicorn web adapter on AWS Lambda for real-time streaming.",
        "Developed full-stack using Next.js, FastAPI, MongoDB vector store, and OpenAI APIs.",
        "Submitted to Y Combinator Summer 2025 batch."
      ],
      technologies: ["Next.js", "FastAPI", "MongoDB", "LangChain", "OpenAI", "AWS Lambda", "Vector Search"]
    },
    {
      title: "Co-founder & CTO",
      company: "GetYourCoachAI",
      industry: "AI Voice Coaching",
      duration: "March 2025 - Present (Paused)",
      responsibilities: [
        "Developed voice-based career mentoring AI app using Flutter, NestJS, and VAPI.",
        "Forked and customized VAPI Flutter library for internal requirements.",
        "Designed user flows for goal setting, alignment, and agent-guided mentorship.",
        "Submitted MVP to Y Combinator Spring Batch."
      ],
      technologies: ["Flutter", "NestJS", "VAPI", "OpenAI", "NeonDB", "DrizzleORM"]
    },
    {
      title: "Web Developer",
      company: "Simply Source",
      industry: "Software Agency",
      duration: "June 2024 - March 2025",
      responsibilities: [
        "Refactored monolithic React+Ruby SSR app into decoupled Next.js frontend.",
        "Led UI revamps and new business feature delivery for clinic management dashboard.",
        "Improved cross-team collaboration and modularized data flow components.",
        "Contributed to mobile app architecture and feature planning."
      ],
      technologies: ["Flutter", "React.js", "TypeScript", "TailwindCSS", "Ruby on Rails"]
    },
    {
      title: "Software Flutter Engineer",
      company: "NXTBK, INC.",
      industry: "FinTech",
      duration: "October 2023 - March 2025",
      responsibilities: [
        "Developed secure, high-performance mobile banking apps for RCBC Boz, Vigan Bank, and OnePuhunan.",
        "Led R&D sessions on Flutter DevTools, Flutter Hooks, and test automation via Maestro.dev.",
        "Championed TDD and implemented CI/CD pipelines for consistent deployment quality."
      ],
      technologies: ["Flutter", "Dart", "Firebase", "Maestro.dev", "CI/CD Pipelines"]
    },
    {
      title: "Flutter Application Developer",
      company: "Håndværker.dk PH",
      industry: "Danish Production Apps",
      duration: "January 2023 - October 2023",
      responsibilities: [
        "Maintained and improved production apps serving homeowners and craftsmen in Denmark.",
        "Migrated legacy iOS app to Flutter enabling cross-platform functionality.",
        "Managed app releases via TestFlight and Play Store with smooth rollout strategies."
      ],
      technologies: ["Flutter", "Dart", "Firebase"]
    },
    {
      title: "FullStack Developer Intern",
      company: "Sun* Philippines",
      industry: "Software Development",
      duration: "July 2022 - August 2022",
      responsibilities: [
        "Applied React and Django for full-stack web development.",
        "Led a team of interns building an HRIS from the ground up.",
        "Presented completed system to company stakeholders."
      ],
      technologies: ["React.js", "Python", "Django", "JavaScript", "HTML/CSS"]
    },
    {
      title: "Co-founder & Lead Frontend Engineer",
      company: "Arde Tech",
      industry: "Tech Startup",
      duration: "May 2021 - June 2022",
      responsibilities: [
        "Launched civic and enterprise startup tools using Flutter.",
        "Built TheoLearn (driving prep app) and Purchaseer (digital procurement system).",
        "Led frontend for Tracy, an offline QR contact tracing tool used at CTU-Argao.",
        "Mentored junior developers and influenced design and tech decisions."
      ],
      technologies: ["Flutter", "Dart", "Firebase"]
    }
  ];

  const displayedExperiences = showAllExperience ? experiences : experiences.slice(0, 4);

  const skillCategories = [
    {
      title: "Mobile Development",
      icon: Smartphone,
      proficiency: "95% Proficiency",
      skills: ["Flutter", "Dart", "Cross-platform iOS/Android", "Riverpod", "BLOC", "Flutter Hooks", "Provider"]
    },
    {
      title: "Frontend Development",
      icon: Code,
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5/CSS3", "Redux Toolkit"]
    },
    {
      title: "AI & Machine Learning",
      icon: Cpu,
      skills: ["OpenAI APIs", "LangChain", "RAG Systems", "Vector Databases", "Voice AI (VAPI)", "Google ADK", "Agent Development"]
    },
    {
      title: "Backend & Database",
      icon: Database,
      skills: ["FastAPI", "Python", "NestJS", "Firebase", "MongoDB", "NeonDB", "DrizzleORM"]
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      skills: ["Git & GitHub", "GitHub Actions", "CI/CD Pipelines", "AWS Lambda", "Vercel", "Docker", "Maestro.dev"]
    },
    {
      title: "Architecture & Design",
      icon: Terminal,
      skills: ["Clean Architecture", "Offline-first Architecture", "Real-time Systems", "Microservices", "TDD"]
    }
  ];

  const certifications = [
    {
      provider: "Meta",
      title: "Front-End Developer Professional Certificate",
      modules: ["React Basics", "JavaScript", "HTML/CSS", "Version Control"]
    },
    { title: "Google IT Automation - Crash Course Python" },
    { title: "Full Stack Developer Training - React.js and Python Django" },
    { title: "DeepLearning.AI - LangChain for LLM Application Development" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/examples"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="font-bold text-xl">
                <span className="text-gray-900">David Brent</span>
                <span className="text-emerald-600"> Panonce</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              style={{ fontSize: '4rem', lineHeight: 1.1, fontWeight: 800 }}
            >
              David Brent C. Panonce
            </h1>
            <h2
              className="text-2xl md:text-3xl text-emerald-600 font-semibold mb-8"
              style={{ fontSize: '1.5rem', fontWeight: 600 }}
            >
              Full Stack AI Engineer & Technical Leader
            </h2>
            
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Lapu-Lapu City, Cebu, Philippines (UTC+8)</span>
            </div>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Building cross-platform applications and AI-powered systems that scale from concept to production.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="success">5+ Years Experience</Badge>
              <Badge variant="tech">3x Startup Co-founder</Badge>
              <Badge variant="default">Magna Cum Laude</Badge>
            </div>

            <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Passionate Software Engineer with expertise in Flutter development, full-stack engineering, and emerging AI technologies 
              including RAG systems, voice agents, and agentic AI. Co-founder of multiple startups specializing in civic tech, 
              legal tech, and AI solutions. Proven track record scaling teams and products in fintech, civic technology, and AI-powered applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:devidpanonce@gmail.com"
                className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </a>
              <a
                href="https://davidpanonce.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <Globe className="w-5 h-5 mr-2" />
                View Website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leading technical innovation across civic tech, AI, fintech, and enterprise solutions
            </p>
          </div>

          <div className="space-y-6">
            {displayedExperiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>

          {experiences.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllExperience(!showAllExperience)}
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                {showAllExperience ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Show Less Experience
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5 mr-2" />
                    Show All Experience
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Full-stack capabilities spanning mobile, web, AI/ML, and cloud infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategory key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Leadership */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Leadership
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 p-8">
              <div className="flex items-start mb-4">
                <Users className="w-8 h-8 text-emerald-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Co-lead, AI Pilipinas Cebu</h3>
                  <p className="text-emerald-600 font-medium mb-4">Present</p>
                  <ul className="space-y-2">
                    <li className="text-gray-700 text-sm leading-relaxed">
                      • Leading local AI ecosystem growth through community building, mentorship, and education.
                    </li>
                    <li className="text-gray-700 text-sm leading-relaxed">
                      • Delivered talk on multi-agent systems using Google ADK (May 2025).
                    </li>
                    <li className="text-gray-700 text-sm leading-relaxed">
                      • Mentors developers in AI technologies and agentic applications.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Education & Certifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Education</h3>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Cebu Institute of Technology University</h4>
                <p className="text-gray-700">Bachelor of Science in Computer Engineering</p>
                <div className="mt-3">
                  <Badge variant="success">Magna Cum Laude</Badge>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-emerald-50 rounded-lg p-3">
                    <p className="text-emerald-800 text-sm font-medium">
                      {cert.provider ? `${cert.provider}: ${cert.title}` : cert.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking & Writing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Speaking & Writing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sharing knowledge through talks and technical writing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
              <Rocket className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Conference Talk</h3>
              <p className="text-gray-700 text-sm">Multi-agent Systems with Google ADK - AI Pilipinas Cebu (May 2025)</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
              <BookOpen className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Technical Writing</h3>
              <p className="text-gray-700 text-sm">Articles on agentic AI development using Google ADK on Medium</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
              <Users className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Mentorship</h3>
              <p className="text-gray-700 text-sm">Community leadership and mentorship for developers in AI and mobile development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Build Something Innovative
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Looking for a technical leader who can architect and build AI-powered solutions? Let's connect.
          </p>

          <div className="mb-12">
            <a
              href="mailto:devidpanonce@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              <Mail className="w-6 h-6 mr-3" />
              devidpanonce@gmail.com
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://www.linkedin.com/in/david-brent-panonce/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Linkedin className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm">Connect professionally</p>
            </a>

            <a
              href="https://github.com/breadoncee"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Github className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">GitHub</h3>
              <p className="text-gray-400 text-sm">View my code</p>
            </a>

            <a
              href="https://medium.com/@devidpanonce"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <BookOpen className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Medium</h3>
              <p className="text-gray-400 text-sm">Read my articles</p>
            </a>

            <a
              href="https://davidpanonce.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Website</h3>
              <p className="text-gray-400 text-sm">Visit my portfolio</p>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 David Brent C. Panonce. Full Stack AI Engineer & Technical Leader.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
