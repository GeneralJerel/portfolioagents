import React from "react";
import { MapPin, Calendar } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  title,
  location,
  startDate,
  endDate,
  highlights,
}) => {
  return (
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
};

export default ExperienceCard;



