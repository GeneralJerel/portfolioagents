import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-24 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900"
          style={{
            fontSize: '4rem', // robust fallback
            lineHeight: 1.1,
            fontWeight: 900,
            letterSpacing: '-0.02em'
          }}
        >
          Transform Your Resume Into an
          <span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2"
            style={{
              backgroundImage: 'linear-gradient(to right, #2563eb, #9333ea)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none'
            }}
          >
            AI-Powered Portfolio
          </span>
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          style={{ fontSize: '1.25rem' }}
        >
          Create a personalized landing page with an AI agent that answers questions, 
          tells your career story, and helps you stand out.
        </p>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Create a personalized landing page with an AI agent that answers questions, 
          tells your career story, and helps you stand out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <a
            href="#upload"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </a>
          <a
            href="/jerel"
            className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 inline-block"
          >
            See Example
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
