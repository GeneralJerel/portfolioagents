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
  Palette,
  Sparkles,
  Heart,
  Zap,
  Globe,
  Briefcase,
  Code,
  Layers,
  Target
} from "lucide-react";

// Simple inline components for better reproducibility
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "outline" | "success" | "accent" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
    variant === "default" ? "bg-purple-100 text-purple-800" :
    variant === "secondary" ? "bg-gray-100 text-gray-800" :
    variant === "success" ? "bg-green-100 text-green-800" :
    variant === "accent" ? "bg-pink-100 text-pink-800" :
    "border border-gray-300 text-gray-700"
  }`}>
    {children}
  </span>
);

const ExperienceCard = ({ title, company, location, duration, achievements }: {
  title: string; company: string; location: string; duration: string; achievements: string[];
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{company}</h3>
        <p className="text-purple-600 font-medium">{title}</p>
      </div>
      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {duration}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
      </div>
    </div>
    <ul className="space-y-2">
      {achievements.map((achievement, index) => (
        <li key={index} className="text-gray-700 text-sm leading-relaxed">
          • {achievement}
        </li>
      ))}
    </ul>
  </div>
);

const CommunityCard = ({ role, organization, location, duration, impact }: {
  role: string; organization: string; location: string; duration: string; impact: string[];
}) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{organization}</h3>
        <p className="text-purple-600 font-medium">{role}</p>
      </div>
      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {duration}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
      </div>
    </div>
    <div className="space-y-2">
      {impact.map((item, index) => (
        <div key={index} className="flex items-start">
          <Sparkles className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const SkillCategory = ({ title, icon: Icon, skills }: {
  title: string; icon: React.ElementType; skills: string[];
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-center mb-4">
      <Icon className="w-5 h-5 text-purple-600 mr-2" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge key={index} variant="outline">{skill}</Badge>
      ))}
    </div>
  </div>
);

export default function LuisaGoPage() {
  const [showAllExperience, setShowAllExperience] = useState(false);

  useEffect(() => {
    document.title = "Luisa Abigail Go — Product Designer & Community Builder";
  }, []);

  const experiences = [
    {
      title: "Product Designer",
      company: "Pando Development (ScaleMe AI)",
      location: "Farmington, Utah, USA",
      duration: "April 2025 - Present",
      achievements: [
        "Redesigned a digital study platform for faith-based education, transforming it into a consumer-grade mobile experience for thousands of families worldwide.",
        "Designed a comprehensive content management admin portal enabling non-technical admins to upload and manage educational materials, reducing content deployment time and technical dependencies.",
        "Developed a scalable design system and interactive prototypes for the admin portal and mobile app, prioritizing features based on user research, technical feasibility, and business impact."
      ]
    },
    {
      title: "Product Designer",
      company: "Butterflowy",
      location: "Remote, PH",
      duration: "Feb 2025 - May 2025",
      achievements: [
        "Led design for diverse client projects including an IFS therapy website and real estate landing page.",
        "Developed cohesive visual systems with appropriate color palettes, imagery, and responsive layouts tailored to each industry's needs."
      ]
    },
    {
      title: "Product Design Lead",
      company: "Get Your Coach AI",
      location: "Cebu, PH",
      duration: "Jan 2025 - Mar 2025",
      achievements: [
        "Led end-to-end design for an AI-powered career coaching platform, from research to launch.",
        "Designed comprehensive interview preparation flows for PM candidates with AI feedback.",
        "Developed a cohesive Figma design system for web and mobile experiences.",
        "Created and launched a landing page using Relume and Framer showcasing the platform's focus on PM career development."
      ]
    },
    {
      title: "Product Designer",
      company: "Celerity Studio (ScaleMe AI)",
      location: "Palo Alto, CA, USA",
      duration: "Oct 2024 - Feb 2025",
      achievements: [
        "Designed a zero-to-one social media creation app for Gen Z users to customize and share AI-powered animated content.",
        "Crafted intuitive interfaces for character personalization, AI headshot integration, outfits, and musical vibes.",
        "Produced high-fidelity Figma prototypes featuring AI lip-syncing and content remixing workflows.",
        "Redesigned company website to enhance product understanding and investor communication."
      ]
    },
    {
      title: "Co-founder & Product Design Lead",
      company: "Dexcribe",
      location: "Cebu, PH",
      duration: "Sept 2024 - May 2025",
      achievements: [
        "Led UX/UI design for an AI-powered legal research platform utilizing specialized legal AI agents.",
        "Designed case management and AI assistant interfaces for efficient, credible legal research.",
        "Collaborated cross-functionally to define user requirements and deliver intuitive workflows."
      ]
    },
    {
      title: "UX Consultant",
      company: "Via Appia Philippines Inc.",
      location: "Mandaluyong, PH",
      duration: "Dec 2022 - Jun 2024",
      achievements: [
        "Launched UX Learning Labs to improve team practices—achieved 100% participant satisfaction.",
        "Led UX processes across research, prototyping, and design for client and internal projects.",
        "Built an atomic design system standardizing UI components across the company ecosystem."
      ]
    },
    {
      title: "UX Consultant",
      company: "City Savings Bank (through Via Appia)",
      location: "Pasig, PH",
      duration: "Dec 2022 - Jun 2024",
      achievements: [
        "Redesigned the mobile banking app for 140,000+ users, improving onboarding and transaction flows.",
        "Launched 11 new app features including enhanced splash screens and e-loan services.",
        "Created and standardized a cohesive design system across web and mobile platforms."
      ]
    },
    {
      title: "Product Design Lead",
      company: "Datos Pilipinas",
      location: "Hybrid, PH",
      duration: "Mar 2022 - May 2025",
      achievements: [
        "Designed and launched a voter empowerment app addressing civic education gaps in 2 months.",
        "Created an interactive learning system to teach users about government functions.",
        "Built candidate profiles, ballot tools, and educational modules.",
        "Won 'Grand Champion' at Diliman Solutions Challenge 2022."
      ]
    },
    {
      title: "UI/UX Design Intern",
      company: "Symph",
      location: "Remote, PH",
      duration: "Jan 2022 - Jun 2022",
      achievements: [
        "Created wireframes and prototypes under mentorship, developing core visual and interaction design skills.",
        "Collaborated with PMs and developers to align designs with technical and business needs."
      ]
    }
  ];

  const displayedExperiences = showAllExperience ? experiences : experiences.slice(0, 4);

  const communityLeadership = [
    {
      role: "Co-founder & Product Designer",
      organization: "The Frame",
      location: "Hybrid, PH",
      duration: "Jul 2024 - Present",
      impact: [
        "Founded a design community with 500+ members in 2 months bridging design and development through AI, low-code, and no-code education.",
        "Organized The Frame's first meetup with 80+ attendees and 96% satisfaction.",
        "Delivered talk on 'Breaking into UI/UX Design in 2024.'"
      ]
    },
    {
      role: "Design Lead & Community Manager",
      organization: "AI Pilipinas Cebu",
      location: "Cebu, PH",
      duration: "Jun 2024 - Present",
      impact: [
        "Led design and web initiatives improving event registration by 30% and attendance by 22%.",
        "Built cohesive visual identity, increasing Facebook reach to 28,969 and engagements to 5,493.",
        "Managed 20+ volunteers organizing monthly events for 60+ tech professionals."
      ]
    },
    {
      role: "Co-founder",
      organization: "The Product Practitioners",
      location: "Hybrid, PH",
      duration: "Oct 2024 - Feb 2025",
      impact: [
        "Founded a community for founders, PMs, and product leaders to share frameworks and success stories."
      ]
    }
  ];

  const skillCategories = [
    {
      title: "Design Core",
      icon: Palette,
      skills: ["Wireframing", "Prototyping", "Design Systems", "Responsive Design", "Information Architecture", "User Flow", "Accessibility", "Motion Design"]
    },
    {
      title: "Design Tools",
      icon: Layers,
      skills: ["Figma", "FigJam", "Framer", "Webflow", "Relume", "Lottielab", "LottieFiles"]
    },
    {
      title: "AI & Emerging Tech",
      icon: Sparkles,
      skills: ["Prompt Engineering", "Generative AI", "ChatGPT", "Claude", "v0", "Lovable", "Midjourney", "Kling AI"]
    },
    {
      title: "User-Centered Design",
      icon: Target,
      skills: ["User Research", "Personas", "Usability Testing", "A/B Testing", "Interaction Design", "WCAG Guidelines"]
    },
    {
      title: "Visual Design",
      icon: Zap,
      skills: ["Typography", "Color Theory", "Layout", "Branding", "Iconography", "Illustration", "Visual Hierarchy"]
    },
    {
      title: "Collaboration",
      icon: Users,
      skills: ["Cross-functional Teamwork", "Stakeholder Management", "Presentation Skills", "Agile Methodologies", "Design Sprints"]
    }
  ];

  const certifications = [
    "LottieFiles Figma to Lottie Course (Motion Design) - 2024",
    "6x Interaction Design Foundation Masterclasses (2023–2024)",
    "2x Interaction Design Foundation Courses (2023–2024)",
    "2x Google UX Design Courses (2022)"
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
                <span className="text-gray-900">Luisa Abigail</span>
                <span className="text-purple-600"> Go</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              style={{ fontSize: '4rem', lineHeight: 1.1, fontWeight: 800 }}
            >
              Luisa Abigail Go
            </h1>
            <h2
              className="text-2xl md:text-3xl text-purple-600 font-semibold mb-8"
              style={{ fontSize: '1.5rem', fontWeight: 600 }}
            >
              Product Designer & Community Builder
            </h2>
            
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <Palette className="w-5 h-5 mr-2" />
              <span>Specializing in AI-Powered Experiences</span>
            </div>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Designing innovative digital products that drive impact while building and nurturing thriving tech and design communities.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="success">500+ Community Members</Badge>
              <Badge variant="accent">140K+ App Users</Badge>
              <Badge variant="default">Cum Laude Graduate</Badge>
            </div>

            <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Product Designer with expertise in end-to-end product design, from user research to high-fidelity prototyping. 
              Combines user-centered design principles with emerging technologies like AI to create innovative digital experiences. 
              Co-founder of The Frame design community and Design Lead at AI Pilipinas Cebu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:go.luisaabigail@gmail.com"
                className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </a>
              <a
                href="https://luisaabigail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Portfolio
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
              Designing impactful products across AI, fintech, civic tech, and social media
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

      {/* Community Leadership Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Leadership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Building and nurturing communities that bridge design, development, and AI
            </p>
          </div>

          <div className="space-y-6">
            {communityLeadership.map((community, index) => (
              <CommunityCard key={index} {...community} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive design toolkit spanning traditional and emerging technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategory key={index} {...category} />
            ))}
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
                <GraduationCap className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Education</h3>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">University of Santo Tomas</h4>
                <p className="text-gray-700">BS in Information Technology</p>
                <p className="text-gray-600 text-sm">Web and Mobile App Development</p>
                <div className="mt-3">
                  <Badge variant="success">Cum Laude</Badge>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-3">
                    <p className="text-purple-800 text-sm font-medium">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Looking for a product designer who combines user-centered design with AI expertise? Let's connect.
          </p>

          <div className="mb-12">
            <a
              href="mailto:go.luisaabigail@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              <Mail className="w-6 h-6 mr-3" />
              go.luisaabigail@gmail.com
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://linkedin.com/in/luisaabigailgo/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Linkedin className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm">Connect professionally</p>
            </a>

            <a
              href="https://luisaabigail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Portfolio</h3>
              <p className="text-gray-400 text-sm">View my work</p>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 Luisa Abigail Go. Product Designer & Community Builder.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
