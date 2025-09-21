import React from "react";
import Badge from "@/components/atoms/Badge";

const skillCategories = [
  {
    title: "AI & Technology",
    skills: [
      "AI Engineering",
      "LLM Engineering", 
      "AI Architecture",
      "Prompt Engineering",
      "Agentic Systems",
      "Generative AI & Machine Learning"
    ]
  },
  {
    title: "Product Management",
    skills: [
      "Product Strategy & Roadmaps",
      "Cross-Functional Leadership",
      "Innovation Management",
      "Market Research & Competitive Analysis",
      "User-Centric Design & UX",
      "SaaS & PLG Strategy"
    ]
  },
  {
    title: "Business & Strategy",
    skills: [
      "GTM & Customer Journey Mapping",
      "OKRs",
      "Agile & Scrum",
      "Automation & Digital Transformation",
      "Data-Driven Decision Making",
      "Stakeholder Management"
    ]
  }
];

const awards = [
  "Top 100 Brightest Minds Under 30 — Stellar PH",
  "LinkedIn Top Voice — Product Management (2023)",
  "7× Google Developer Groups Speaker",
  "ADPList Mentor — Product Management",
  "3× Hackathon Winner (SAP, Google, NES)",
  "AI Community Lead — AI Pilipinas Cebu Chapter"
];

const SkillsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Technical and strategic capabilities across AI, product management, and business leadership
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="mr-2 mb-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-medium text-sm">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;



