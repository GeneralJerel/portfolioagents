"use client";

import React, { useState } from "react";
import Script from "next/script";
import { 
  Briefcase, Award, GraduationCap, Mail, MapPin, 
  Calendar, ChevronRight, Building, Target, Globe,
  Users, BarChart3, ExternalLink
} from "lucide-react";
import { executiveExperiences, achievements, education, coreCompetencies } from "@/mockdata/jerel";

const ExecutiveClassicPage: React.FC = () => {
  const experiences = executiveExperiences;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex justify-between items-center">
            <div>
              <h1
                className="text-4xl md:text-5xl font-serif text-gray-900"
                style={{ fontSize: '3rem', lineHeight: 1.1, fontWeight: 700 }}
              >
                Jerel Velarde
              </h1>
              <p className="text-base md:text-lg text-gray-600 mt-2">AI Product Leader & Strategic Consultant</p>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#experience" className="text-gray-700 hover:text-gray-900 font-medium">Experience</a>
              <a href="#achievements" className="text-gray-700 hover:text-gray-900 font-medium">Achievements</a>
              <a href="#education" className="text-gray-700 hover:text-gray-900 font-medium">Education</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="bg-navy-900 text-white py-24 md:py-32" style={{ backgroundColor: '#1a365d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2
              className="text-5xl md:text-6xl font-serif mb-8"
              style={{ fontSize: '3rem', lineHeight: 1.1, fontWeight: 700 }}
            >
              Executive Summary
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-100">
              Seasoned product leader with 9 years of experience driving AI innovation and digital transformation 
              across enterprise and startup environments. Proven track record of building AI-native products that 
              achieve rapid market traction and deliver measurable business impact. Expert in aligning cross-functional 
              teams to ship revenue-driving solutions while maintaining operational excellence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">9+</div>
                <div className="text-sm uppercase tracking-wider text-gray-300">Years of Leadership</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">$30M+</div>
                <div className="text-sm uppercase tracking-wider text-gray-300">Portfolio Managed</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">428K+</div>
                <div className="text-sm uppercase tracking-wider text-gray-300">Minutes Saved via AI</div>
              </div>
            </div>

            <div className="flex items-center mt-8 space-x-4 mb-8">
              <MapPin className="w-5 h-5 text-gray-300" />
              <span className="text-gray-300">Remote (GMT+8)</span>
              <span className="text-gray-400">|</span>
              <Mail className="w-5 h-5 text-gray-300" />
              <a href="mailto:jereljohnvelarde@gmail.com" className="text-gray-300 hover:text-white">
                jereljohnvelarde@gmail.com
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <a
                href="mailto:jereljohnvelarde@gmail.com"
                className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send a Message
              </a>
              <a
                href="https://bit.ly/Jerelvelarde"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-gray-900 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 flex items-center">
            <Briefcase className="w-8 h-8 mr-3 text-gray-700" />
            Professional Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-800 pl-8 pb-8">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                  <div className="text-lg text-gray-700 font-medium">{exp.company}</div>
                  <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.startDate} – {exp.endDate}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-gray-400 mr-3">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 flex items-center">
            <Target className="w-8 h-8 mr-3 text-gray-700" />
            Core Competencies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreCompetencies.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">{category.category}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-center">
                      <ChevronRight className="w-3 h-3 mr-2 text-gray-400" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-gray-700" />
            Key Projects & Initiatives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-gray-700 mr-3" />
                <h3 className="font-bold text-gray-900">SenatorMatch</h3>
              </div>
              <p className="text-gray-700 mb-3">AI-powered civic engagement platform matching voters with aligned candidates</p>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Impact:</span> 2,000 users within 48 hours of launch
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Building className="w-6 h-6 text-gray-700 mr-3" />
                <h3 className="font-bold text-gray-900">InterviewRoom.ai</h3>
              </div>
              <p className="text-gray-700 mb-3">Enterprise AI solution for streamlining hiring processes</p>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Impact:</span> $7,788 revenue in first 30 days
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-gray-700 mr-3" />
                <h3 className="font-bold text-gray-900">DatosPilipinas.com</h3>
              </div>
              <p className="text-gray-700 mb-3">Data-driven platform addressing Filipino societal challenges</p>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Role:</span> Founder & Lead Product Manager
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Recognition */}
      <section id="achievements" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-gray-700" />
            Achievements & Recognition
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center bg-white rounded-lg p-4 border border-gray-200">
                <div className="w-2 h-2 bg-gray-700 rounded-full mr-4"></div>
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 flex items-center">
            <GraduationCap className="w-8 h-8 mr-3 text-gray-700" />
            Education
          </h2>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="flex items-start">
                <div className="w-4 h-4 bg-gray-700 rounded-full mt-1.5 mr-6"></div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree}</p>
                  <p className="text-gray-600">{edu.field}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif mb-8">Connect with Jerel Velarde</h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Available for executive consulting, AI product strategy, and leadership opportunities
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="mailto:jereljohnvelarde@gmail.com"
              className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Jerel
            </a>
            <a
              href="https://www.linkedin.com/in/jereljohnvelarde/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-gray-900 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              LinkedIn Profile
            </a>
          </div>

          <div className="flex justify-center space-x-8 text-sm">
            <a href="https://bit.ly/Jerelvelarde" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="http://interviewroom.ai" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              InterviewRoom.ai
            </a>
            <a href="https://jerelvelarde.notion.site" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              Notion Profile
            </a>
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
};

export default ExecutiveClassicPage;
