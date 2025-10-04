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
  Microscope,
  Users,
  GraduationCap,
  Phone,
  Globe,
  Star,
  Trophy,
  Lightbulb,
  Brain
} from "lucide-react";

// Simple inline components for better reproducibility
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "outline" | "success" | "warning" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
    variant === "default" ? "bg-orange-100 text-orange-800" :
    variant === "secondary" ? "bg-gray-100 text-gray-800" :
    variant === "success" ? "bg-green-100 text-green-800" :
    variant === "warning" ? "bg-yellow-100 text-yellow-800" :
    "border border-gray-300 text-gray-700"
  }`}>
    {children}
  </span>
);

const ResearchCard = ({ organization, location, role, duration, responsibilities }: {
  organization: string; location: string; role: string; duration: string; responsibilities: string[];
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{organization}</h3>
        <p className="text-orange-600 font-medium">{role}</p>
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
      {responsibilities.map((responsibility, index) => (
        <li key={index} className="text-gray-700 text-sm leading-relaxed">
          • {responsibility}
        </li>
      ))}
    </ul>
  </div>
);

const LeadershipCard = ({ organization, location, role, duration, responsibilities, achievements }: {
  organization: string; location?: string; role: string; duration: string; responsibilities?: string[]; achievements?: string[];
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{organization}</h3>
        <p className="text-orange-600 font-medium">{role}</p>
      </div>
      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {duration}
        </div>
        {location && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        )}
      </div>
    </div>
    {responsibilities && (
      <ul className="space-y-2 mb-4">
        {responsibilities.map((responsibility, index) => (
          <li key={index} className="text-gray-700 text-sm leading-relaxed">
            • {responsibility}
          </li>
        ))}
      </ul>
    )}
    {achievements && (
      <div className="space-y-2">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
            <Trophy className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-800 text-sm font-medium">{achievement}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AwardCard = ({ title, details, year }: {
  title: string; details: string; year?: number;
}) => (
  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
    <div className="flex items-start">
      <Award className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
        <p className="text-gray-700 text-sm mb-2">{details}</p>
        {year && (
          <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
            {year}
          </span>
        )}
      </div>
    </div>
  </div>
);

const EducationCard = ({ institution, program, degrees, duration, gpa, courses, average, SAT, leadership_roles, location }: {
  institution: string; program?: string; degrees?: string[]; duration: string; gpa?: string; courses?: string[]; 
  average?: string; SAT?: { total: number; math: number; reading_writing: number }; leadership_roles?: string[]; location?: string;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{institution}</h3>
        {program && <p className="text-orange-600 font-medium text-sm">{program}</p>}
        {degrees && (
          <div className="mt-2 space-y-1">
            {degrees.map((degree, index) => (
              <p key={index} className="text-gray-700 text-sm">{degree}</p>
            ))}
          </div>
        )}
      </div>
      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {duration}
        </div>
        {location && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        )}
      </div>
    </div>
    
    {(average || SAT || gpa) && (
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        {average && <p className="text-sm text-gray-700"><strong>Average:</strong> {average}</p>}
        {gpa && <p className="text-sm text-gray-700"><strong>GPA:</strong> {gpa}</p>}
        {SAT && (
          <p className="text-sm text-gray-700">
            <strong>SAT:</strong> {SAT.total} (Math: {SAT.math}, Reading/Writing: {SAT.reading_writing})
          </p>
        )}
      </div>
    )}

    {courses && (
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Relevant Courses</h4>
        <div className="flex flex-wrap gap-2">
          {courses.map((course, index) => (
            <Badge key={index} variant="outline">{course}</Badge>
          ))}
        </div>
      </div>
    )}

    {leadership_roles && (
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Leadership Roles</h4>
        <ul className="space-y-1">
          {leadership_roles.map((role, index) => (
            <li key={index} className="text-gray-700 text-sm">• {role}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default function SohamChakrabortyPage() {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllLeadership, setShowAllLeadership] = useState(false);

  useEffect(() => {
    document.title = "Soham Chakraborty — Bioengineering & AI Researcher";
  }, []);

  const researchExperience = [
    {
      organization: "Mayo Clinic",
      location: "Rochester, Minnesota",
      role: "Official Researcher at Neurology AI Lab",
      duration: "August 2023 – Present",
      responsibilities: [
        "Engineered neural & linguistic networks to diagnose neurodegeneration from voice & linguistic biomarkers.",
        "Fully-funded researcher; led on-site during Summer 2024, collecting medical speech data from 1500 patients.",
        "Authored paper in review on speech disorder prognosis with 88% accuracy."
      ]
    },
    {
      organization: "University of Pennsylvania",
      location: "Pennsylvania, USA",
      role: "Biotechnology Summer Researcher at Abramson Cancer Center (Received College Credits)",
      duration: "July 2023 – August 2023",
      responsibilities: [
        "Engineered drug-loaded polymeric nanoparticles for controlled delivery of proteins and antimicrobial agents to treat bacteria in upper airway biofilms.",
        "Conducted on-campus research for three weeks and presented findings to UPenn's bioengineering faculty."
      ]
    },
    {
      organization: "TinEye",
      location: "Toronto, Canada",
      role: "Machine Learning Engineer at Series A Haptics Device Startup",
      duration: "September 2022 – October 2023",
      responsibilities: [
        "Built & deployed computer vision navigation software for the blind, integrated with in-house engineered haptics vests."
      ]
    }
  ];

  const businessExperience = [
    {
      organization: "Sun Life Financial",
      location: "Toronto, Canada",
      role: "Cybersecurity Business Analyst at Fortune 500 Insurance & Investments Firm",
      duration: "June 2023 – July 2023",
      responsibilities: [
        "Scoped IT security tools for optimizing proxy servers' remote browser isolation (RBI) tools at global offices.",
        "Scaled pilot tests for migrating proxy infrastructure to Netskope; presented implementation strategy to CISO & CIO."
      ]
    }
  ];

  const allExperience = [...researchExperience, ...businessExperience];
  const displayedExperience = showAllExperience ? allExperience : allExperience.slice(0, 2);

  const leadershipExperience = [
    {
      organization: "GlaucoGlasses",
      location: "Toronto, Canada",
      role: "Startup Founder: Ultrasound-Infused Eyeglasses for Low-Cost Glaucoma Management",
      duration: "June 2022 – Present",
      responsibilities: [
        "Built novel wearable eye pressure sensors and eyeglasses for continuous glaucoma monitoring at 80% lower cost.",
        "Raised $6K in seed funding and received VC support for initiating preclinical testing on porcine eyes."
      ]
    },
    {
      organization: "Team Canada",
      role: "International Debater & Public Speaker",
      duration: "February 2024 – May 2024",
      achievements: [
        "Placed 6th/400 in the National Debating & Public Speaking Championships to qualify for Team Canada.",
        "Represented Canada at the World Individual Debating & Public Speaking Championships in Australia (2024).",
        "Chosen as the sole national delegate to the International Public Speaking Competition in London, UK (2024)."
      ]
    },
    {
      organization: "MindSight",
      location: "Toronto, Canada",
      role: "Not-for-Profit Founder, Volunteer Coordinator, & Technical Head",
      duration: "October 2022 – Present",
      responsibilities: [
        "Founded a non-profit to alleviate psychosocial burdens of dementia on patients and caregivers.",
        "Provided 20+ non-pharmacological interventions; helped 70+ patients across 5 care homes.",
        "Recruited, managed, and coordinated 50+ volunteers to develop and deliver interventions at scale."
      ]
    }
  ];

  const displayedLeadership = showAllLeadership ? leadershipExperience : leadershipExperience.slice(0, 2);

  const awards = [
    {
      title: "5th Place International Medallist",
      details: "International Career Development Conference, DECA (out of 41,375)",
      year: 2023
    },
    {
      title: "3rd Place National",
      details: "NASA & CSA Space Apps Challenge (out of 1,300)",
      year: 2023
    },
    {
      title: "Top 15 (Bronze Medal) National",
      details: "Canadian Astronomy and Astrophysics Olympiad (2022–2023)"
    },
    {
      title: "8th Place International",
      details: "Conrad Innovation Challenge (out of 84 teams)",
      year: 2024
    },
    {
      title: "5th Place National",
      details: "Toshiba ExploraVision STEM Fair (out of 3,000 teams)",
      year: 2024
    },
    {
      title: "Finalist International",
      details: "World Individual Debating & Public Speaking Competition, Australia (out of 120)",
      year: 2024
    }
  ];

  const skills = [
    "Python", "JAVA", "C++", "JavaScript", "HTML", "MATLAB",
    "Multimodal AI", "Generative AI", "Computer Vision", "Neural Networks",
    "Bioengineering", "Biotechnology", "Medical Device Development",
    "Public Speaking", "Debate", "Leadership", "Entrepreneurship"
  ];

  const languages = ["English", "French", "Bengali", "Hindi"];
  const hobbies = ["Cricket", "Theatre", "Astronomy"];

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
                <span className="text-gray-900">Soham</span>
                <span className="text-orange-600"> Chakraborty</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-red-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              style={{ fontSize: '4rem', lineHeight: 1.1, fontWeight: 800 }}
            >
              Soham Chakraborty
            </h1>
            <h2
              className="text-2xl md:text-3xl text-orange-600 font-semibold mb-8"
              style={{ fontSize: '1.5rem', fontWeight: 600 }}
            >
              Bioengineering & AI Researcher
            </h2>
            
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <GraduationCap className="w-5 h-5 mr-2" />
              <span>UC Berkeley • Management, Entrepreneurship, & Technology</span>
            </div>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Pioneering AI-driven healthcare solutions and medical device innovation at the intersection of bioengineering and technology.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="success">Mayo Clinic Researcher</Badge>
              <Badge variant="warning">Team Canada Representative</Badge>
              <Badge variant="default">Startup Founder</Badge>
            </div>

            <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Dual-degree student combining bioengineering expertise with business acumen. 
              Currently researching neurodegeneration diagnostics at Mayo Clinic while founding 
              innovative healthcare startups and representing Canada in international competitions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:soham.chakraborty@berkeley.edu"
                className="inline-flex items-center px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Connect with Soham
              </a>
              <a
                href="https://www.linkedin.com/in/soham-ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Education
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pursuing dual degrees in bioengineering and business at UC Berkeley
            </p>
          </div>

          <div className="space-y-6">
            <EducationCard
              institution="UC Berkeley"
              program="Management, Entrepreneurship, & Technology Program"
              degrees={["B.S. Bioengineering", "B.S. Business"]}
              duration="August 2025 – Expected June 2029"
              courses={[
                "Intro to Bioengineering", "Biomedicine", "MW Calculus", "Physics",
                "Business Foundations", "Business Special Topics", "PCB Design"
              ]}
            />
            <EducationCard
              institution="University of Toronto Schools"
              location="Toronto, Canada"
              duration="September 2021 – June 2025"
              average="97%"
              SAT={{ total: 1550, math: 790, reading_writing: 760 }}
              leadership_roles={[
                "Founder of the Astronomy Society",
                "Executive of the Speech & Debate Team",
                "Healthcare Volunteer Coordinator"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Research Experience Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Research & Professional Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leading research in AI-driven healthcare and medical device development
            </p>
          </div>

          <div className="space-y-6">
            {displayedExperience.map((exp, index) => (
              <ResearchCard key={index} {...exp} />
            ))}
          </div>

          {allExperience.length > 2 && (
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

      {/* Leadership & Entrepreneurship Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership & Entrepreneurship
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Founding innovative healthcare solutions and leading community impact initiatives
            </p>
          </div>

          <div className="space-y-6">
            {displayedLeadership.map((exp, index) => (
              <LeadershipCard key={index} {...exp} />
            ))}
          </div>

          {leadershipExperience.length > 2 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllLeadership(!showAllLeadership)}
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                {showAllLeadership ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Show Less Leadership
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5 mr-2" />
                    Show All Leadership
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Awards & Achievements Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Awards & Achievements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognition for excellence in research, innovation, and international competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <AwardCard key={index} {...award} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Interests */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Interests
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Technical Skills */}
            <div>
              <div className="flex items-center mb-6">
                <Brain className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Technical Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center mb-6">
                <Globe className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Languages</h3>
              </div>
              <div className="space-y-3">
                {languages.map((language, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-3">
                    <p className="text-orange-800 font-medium text-sm">{language}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Interests</h3>
              </div>
              <div className="space-y-3">
                {hobbies.map((hobby, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-3">
                    <p className="text-orange-800 font-medium text-sm">{hobby}</p>
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
            Let's Collaborate on Innovation
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Interested in bioengineering research, AI healthcare applications, or entrepreneurship opportunities? Let's connect.
          </p>

          <div className="mb-12">
            <a
              href="mailto:soham.chakraborty@berkeley.edu"
              className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              <Mail className="w-6 h-6 mr-3" />
              soham.chakraborty@berkeley.edu
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.linkedin.com/in/soham-ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Linkedin className="w-8 h-8 text-orange-400 group-hover:text-orange-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm">Connect professionally</p>
            </a>

            <a
              href="tel:(510) 320-6984"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Phone className="w-8 h-8 text-orange-400 group-hover:text-orange-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Phone</h3>
              <p className="text-gray-400 text-sm">(510) 320-6984</p>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 Soham Chakraborty. Bioengineering & AI Researcher.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
