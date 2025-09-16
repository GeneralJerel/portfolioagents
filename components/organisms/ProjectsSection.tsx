import React from "react";
import ProjectCard from "@/components/molecules/ProjectCard";

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

const ProjectsSection: React.FC = () => {
  return (
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
            <ProjectCard
              key={index}
              name={project.name}
              role={project.role}
              summary={project.summary}
              impact={project.impact}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
