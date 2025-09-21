import React from "react";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import Badge from "@/components/atoms/Badge";

const JerelHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Name and Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Jerel Velarde
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
            AI Product Leader & Prompt Engineer
          </h2>
          
          {/* Location */}
          <div className="flex items-center justify-center text-gray-600 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Remote (GMT+8)</span>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Builds AI-native products that ship fast and scale.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="default">LinkedIn Top Voice — Product Management (2023)</Badge>
            <Badge variant="secondary">Top 100 Brightest Minds Under 30 — Philippines</Badge>
          </div>

          {/* Summary */}
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Product leader with 9 years of experience in AI product strategy, agentic workflows, and PLG. 
            Aligns product, design, and engineering to ship meaningful, revenue-driving products. 
            Founder of AI Pilipinas Cebu Chapter; community builder and public advocate for AI and startups.
          </p>

          {/* CTAs */}
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
  );
};

export default JerelHero;



