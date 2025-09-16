"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Mail, MapPin, ExternalLink, MessageCircle, X } from "lucide-react";
import ExperienceSection from "@/components/organisms/ExperienceSection";
import ProjectsSection from "@/components/organisms/ProjectsSection";
import SkillsSection from "@/components/organisms/SkillsSection";
import ContactSection from "@/components/organisms/ContactSection";
import VoiceAgent from "@/portfolio-agents/components/organisms/VoiceAgent";
import Badge from "@/components/atoms/Badge";

export default function JerelModernMinimal() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">
              <span className="text-gray-900">Jerel</span>
              <span className="text-blue-600">Velarde</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#experience" className="text-gray-600 hover:text-gray-900 transition-colors">Experience</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
              <a href="#skills" className="text-gray-600 hover:text-gray-900 transition-colors">Skills</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
              <button
                onClick={() => setIsVoiceAgentOpen(true)}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to Jerel AI
              </button>
              <a
                href="mailto:jereljohnvelarde@gmail.com"
                className="inline-flex items-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send a Message
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
      <div id="experience">
        <ExperienceSection />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <ProjectsSection />
      </div>

      {/* Skills Section */}
      <div id="skills">
        <SkillsSection />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* Voice Agent */}
      <VoiceAgent 
        theme="minimal"
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
      />

      {/* Vapi Widget */}
      {/* @ts-ignore - Custom element */}
      <vapi-widget
        public-key="501a5fd6-9aee-456d-b490-a4a138632425"
        assistant-id="ccc490af-8b1d-4eab-b7f0-5a316daf2fec"
        mode="voice"
        theme="dark"
        base-bg-color="#000000"
        accent-color="#14B8A6"
        cta-button-color="#000000"
        cta-button-text-color="#ffffff"
        border-radius="large"
        size="full"
        position="bottom-right"
        title="TALK WITH AI"
        start-button-text="Start"
        end-button-text="End Call"
        chat-first-message="Hey, How can I help you today?"
        chat-placeholder="Type your message..."
        voice-show-transcript="true"
        consent-required="true"
        consent-title="Terms and conditions"
        consent-content="By clicking 'Agree,' and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service."
        consent-storage-key="vapi_widget_consent"
      ></vapi-widget>

      {/* Load Vapi Widget Script */}
      <Script 
        src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" 
        strategy="lazyOnload"
      />
    </div>
  );
}