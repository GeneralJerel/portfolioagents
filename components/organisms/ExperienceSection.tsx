import React from "react";
import ExperienceCard from "@/components/molecules/ExperienceCard";

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
  }
];

const ExperienceSection: React.FC = () => {
  return (
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
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              company={exp.company}
              title={exp.title}
              location={exp.location}
              startDate={exp.startDate}
              endDate={exp.endDate}
              highlights={exp.highlights}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;



