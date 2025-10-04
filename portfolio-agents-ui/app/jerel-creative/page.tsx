/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Script from "next/script";
import { 
  Sparkles, Zap, Rocket, 
  Brain, Users, TrendingUp, Mail, MapPin, ExternalLink,
  Calendar, ChevronRight, Star, Globe
} from "lucide-react";
import { creativeExperiences, creativeProjects, creativeSkills } from "@/mockdata/jerel";

const CreativeBoldPage: React.FC = () => {
  const experiences = creativeExperiences;
  const skills = creativeSkills;
  
  // Map icon names to actual components
  const iconMap = { Users, Brain, Globe };
  const projects = creativeProjects.map(project => ({
    ...project,
    icon: React.createElement(iconMap[project.iconName], { className: "w-8 h-8" })
  }));

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-40 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-2xl">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Jerel
              </span>
              <span className="text-white ml-2">
                Velarde
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#experience" className="text-gray-300 hover:text-white transition-all hover:scale-105">Experience</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-all hover:scale-105">Projects</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-all hover:scale-105">Skills</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-all hover:scale-105">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm text-purple-300">LinkedIn Top Voice 2023</span>
            </div>

            {/* Name with Gradient */}
            <h1
              className="text-6xl md:text-8xl font-black mb-6"
              style={{ fontSize: '5rem', lineHeight: 1.05, fontWeight: 900 }}
            >
              <span
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #a78bfa, #f472b6, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Jerel Velarde
              </span>
            </h1>

            {/* Title */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-200"
                style={{ fontSize: '1.75rem', fontWeight: 700 }}
              >
                AI Product Leader & Prompt Engineer
              </h2>
              <Rocket className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>

            {/* Location */}
            <div className="flex items-center justify-center text-gray-400 mb-8">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Remote (GMT+8)</span>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Builds <span className="text-purple-400 font-bold">AI-native products</span> that 
              <span className="text-pink-400 font-bold"> ship fast</span> and 
              <span className="text-blue-400 font-bold"> scale</span>.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
                <div className="text-4xl font-bold text-purple-400 mb-2">9+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
                <div className="text-4xl font-bold text-blue-400 mb-2">1.35M</div>
                <div className="text-gray-400">Content Views</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-400 mb-2">Top 100</div>
                <div className="text-gray-400">Brightest Minds</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:jereljohnvelarde@gmail.com"
                className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-2xl transition-all hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                Say Hi
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://bit.ly/Jerelvelarde"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 rounded-full border-2 border-gray-600 text-gray-300 font-bold hover:border-white hover:text-white transition-all hover:scale-105"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Portfolio
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-24 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Building the future with AI</p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                      <p className={`text-lg font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                        {exp.title}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 text-gray-400 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.startDate} - {exp.endDate}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <Star className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Shipping products that matter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:scale-105 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 p-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.gradient} mb-6`}>
                    {project.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-green-400 font-semibold">{project.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-24 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Expertise that delivers results</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-white">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${skill.color} rounded-full transition-all duration-1000 group-hover:scale-x-105 origin-left`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Machine Learning", "Data Analysis", "Agile/Scrum", "Public Speaking",
              "GTM Strategy", "User Research", "Automation", "Team Leadership"
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-center text-gray-300 hover:border-purple-500/50 transition-all"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Let's Build Together
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            Ready to create AI-powered products that make a difference?
          </p>

          <a
            href="mailto:jereljohnvelarde@gmail.com"
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-6 h-6 mr-3" />
            Get In Touch
          </a>

          <div className="mt-12 flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/jereljohnvelarde/" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://bit.ly/Jerelvelarde" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="http://interviewroom.ai" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              InterviewRoom.ai
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

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default CreativeBoldPage;
