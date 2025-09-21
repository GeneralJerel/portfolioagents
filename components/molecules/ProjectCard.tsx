import React from "react";
import { ExternalLink, TrendingUp } from "lucide-react";

interface ProjectCardProps {
  name: string;
  role: string;
  summary: string;
  impact: string;
  links?: Array<{ label: string; url: string }>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  role,
  summary,
  impact,
  links = [],
}) => {
  return (
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
};

export default ProjectCard;



