/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { Mail, MapPin, ExternalLink, Calendar, TrendingUp, Linkedin, ChevronDown, ChevronUp } from "lucide-react";

// Simple inline components for better reproducibility
const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "outline" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
    variant === "default" ? "bg-blue-100 text-blue-800" :
    variant === "secondary" ? "bg-gray-100 text-gray-800" :
    "border border-gray-300 text-gray-700"
  }`}>
    {children}
  </span>
);

const ExperienceCard = ({ company, title, location, startDate, endDate, highlights }: {
  company: string; title: string; location: string; startDate: string; endDate: string; highlights: string[];
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{company}</h3>
        <p className="text-blue-600 font-medium">{title}</p>
      </div>
      <div className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {startDate} - {endDate}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
      </div>
    </div>
    <ul className="space-y-2">
      {highlights.map((highlight, index) => (
        <li key={index} className="text-gray-700 text-sm leading-relaxed">
          • {highlight}
        </li>
      ))}
    </ul>
  </div>
);

const ProjectCard = ({ name, role, summary, impact, links = [] }: {
  name: string; role: string; summary: string; impact: string; links?: Array<{ label: string; url: string }>;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-blue-600 font-medium text-sm mb-2">{role}</p>
      <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
    </div>
    
    {impact && (
      <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
        <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
        <span className="text-green-800 text-sm font-medium">{impact}</span>
      </div>
    )}

    {links.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            {link.label}
          </a>
        ))}
      </div>
    )}
  </div>
);

// Note: metadata moved to layout.tsx or will be handled differently for client components

const experiences = [
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

const projects = [
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

const skills = [
  "AI Engineering", "LLM Engineering", "AI Architecture", "Prompt Engineering",
  "Agentic Systems", "Product Strategy & Roadmaps", "Cross-Functional Leadership",
  "Innovation Management", "SaaS & PLG Strategy", "GTM & Customer Journey Mapping"
];

const awards = [
  "Top 100 Brightest Minds Under 30 — Stellar PH",
  "LinkedIn Top Voice — Product Management (2023)",
  "7× Google Developer Groups Speaker",
  "3× Hackathon Winner (SAP, Google, NES)",
  "AI Community Lead — AI Pilipinas Cebu Chapter"
];

export default function JerelPage() {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const displayedExperiences = showAllExperience ? experiences : experiences.slice(0, 3);

  useEffect(() => {
    document.title = "Jerel Velarde — AI Product Leader & Prompt Engineer";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              style={{ fontSize: '4rem', lineHeight: 1.1, fontWeight: 800 }}
            >
              Jerel Velarde
            </h1>
            <h2
              className="text-2xl md:text-3xl text-blue-600 font-semibold mb-8"
              style={{ fontSize: '1.5rem', fontWeight: 600 }}
            >
              AI Product Leader & Prompt Engineer
            </h2>
            
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Remote (GMT+8)</span>
            </div>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Builds AI-native products that ship fast and scale.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="default">LinkedIn Top Voice — Product Management (2023)</Badge>
              <Badge variant="secondary">Top 100 Brightest Minds Under 30 — Philippines</Badge>
            </div>

            <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Product leader with 9 years of experience in AI product strategy, agentic workflows, and PLG. 
              Aligns product, design, and engineering to ship meaningful, revenue-driving products. 
              Founder of AI Pilipinas Cebu Chapter; community builder and public advocate for AI and startups.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:jereljohnvelarde@gmail.com"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Hire Jerel
              </a>
              <a
                href="https://bit.ly/Jerelvelarde"
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
              Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              9 years of experience building AI-powered products and leading cross-functional teams
            </p>
          </div>

          <div className="space-y-6">
            {displayedExperiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>

          {experiences.length > 3 && (
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

      {/* Projects Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AI-powered solutions that create real impact and drive user growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Awards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Recognition
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Awards & Recognition</h3>
              <div className="space-y-3">
                {awards.map((award, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3">
                    <p className="text-blue-800 font-medium text-sm">{award}</p>
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
            Let's Build Something Amazing
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Email to discuss product leadership or AI consulting engagements.
          </p>

          <div className="mb-12">
            <a
              href="mailto:jereljohnvelarde@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              <Mail className="w-6 h-6 mr-3" />
              jereljohnvelarde@gmail.com
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://www.linkedin.com/in/jereljohnvelarde/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <Linkedin className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400 text-sm">Connect with me professionally</p>
            </a>

            <a
              href="https://bit.ly/Jerelvelarde"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <ExternalLink className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Portfolio</h3>
              <p className="text-gray-400 text-sm">View my complete portfolio</p>
            </a>

            <a
              href="http://interviewroom.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-center mb-3">
                <ExternalLink className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">InterviewRoom.ai</h3>
              <p className="text-gray-400 text-sm">AI agent for hiring teams</p>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 Jerel Velarde. AI Product Leader & Prompt Engineer.
            </p>
          </div>
        </div>
      </section>

      {/* Vapi Widget */}
      {React.createElement('vapi-widget', {
        'public-key': "501a5fd6-9aee-456d-b490-a4a138632425",
        'assistant-id': "ccc490af-8b1d-4eab-b7f0-5a316daf2fec",
        mode: "voice",
        theme: "dark",
        'base-bg-color': "#000000",
        'accent-color': "#14B8A6",
        'cta-button-color': "#000000",
        'cta-button-text-color': "#ffffff",
        'border-radius': "large",
        size: "full",
        position: "bottom-right",
        title: "TALK WITH AI",
        'start-button-text': "Start",
        'end-button-text': "End Call",
        'chat-first-message': "Hey, How can I help you today?",
        'chat-placeholder': "Type your message...",
        'voice-show-transcript': "true",
        'consent-required': "true",
        'consent-title': "Terms and conditions",
        'consent-content': "By clicking 'Agree,' and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service.",
        'consent-storage-key': "vapi_widget_consent"
      })}

      {/* Load Vapi Widget Script */}
      <Script 
        src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" 
        strategy="lazyOnload"
      />
    </div>
  );
}