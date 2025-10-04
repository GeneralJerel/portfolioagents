"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, User, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ExampleProfile {
  name: string;
  role: string;
  slug: string;
  color: string;
  gradient: string;
}

const profiles: ExampleProfile[] = [
  {
    name: "Jerel Velarde",
    role: "AI Product Leader & Prompt Engineer",
    slug: "jerel",
    color: "blue",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    name: "Luisa Go",
    role: "Product Designer",
    slug: "luisa-go",
    color: "purple",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    name: "David Panonce",
    role: "Developer",
    slug: "david-panonce",
    color: "green",
    gradient: "from-green-500 to-teal-600"
  },
  {
    name: "Soham Chakraborty",
    role: "Professional",
    slug: "soham-chakraborty",
    color: "orange",
    gradient: "from-orange-500 to-red-600"
  }
];

export default function ExamplesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <Link href="/" className="font-bold text-xl">
                <span className="text-gray-900">portfolio</span>
                <span className="text-blue-600">agent</span>
                <span className="text-gray-500">.io</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                How It Works
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Example Portfolios
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Explore AI-powered portfolios created with PortfolioAgent. Each one tells a unique professional story.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {profiles.map((profile, index) => (
              <Link
                key={profile.slug}
                href={`/u/${profile.slug}`}
                className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Avatar Placeholder */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${profile.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <User className="w-10 h-10 text-white" />
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {profile.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {profile.role}
                  </p>

                  {/* View Portfolio Link */}
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>View Portfolio</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${profile.gradient} opacity-5 rounded-bl-full`}></div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to create your own?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform your resume into an AI-powered portfolio in minutes
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
