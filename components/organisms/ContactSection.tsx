import React from "react";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

const links = [
  { 
    label: "LinkedIn", 
    url: "https://www.linkedin.com/in/jereljohnvelarde/",
    icon: Linkedin,
    description: "Connect with me professionally"
  },
  { 
    label: "Portfolio", 
    url: "https://bit.ly/Jerelvelarde",
    icon: ExternalLink,
    description: "View my complete portfolio"
  },
  { 
    label: "InterviewRoom.ai", 
    url: "http://interviewroom.ai",
    icon: ExternalLink,
    description: "AI agent for hiring teams"
  }
];

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Let's Build Something Amazing
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Email to discuss product leadership or AI consulting engagements.
        </p>

        {/* Primary CTA */}
        <div className="mb-12">
          <a
            href="mailto:jereljohnvelarde@gmail.com"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            <Mail className="w-6 h-6 mr-3" />
            jereljohnvelarde@gmail.com
          </a>
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-3 gap-6">
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-center mb-3">
                  <IconComponent className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="text-white font-semibold mb-2">{link.label}</h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            © 2025 Jerel Velarde. AI Product Leader & Prompt Engineer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
