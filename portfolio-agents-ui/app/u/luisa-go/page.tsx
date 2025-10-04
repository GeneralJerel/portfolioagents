"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Construction } from "lucide-react";

export default function LuisaGoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/examples"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="font-bold text-xl">
                <span className="text-gray-900">Luisa</span>
                <span className="text-purple-600"> Go</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Placeholder Content */}
      <section className="relative bg-gradient-to-br from-purple-50 to-pink-100 py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-8">
            <Construction className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Luisa Go
          </h1>
          <h2 className="text-2xl md:text-3xl text-purple-600 font-semibold mb-8">
            Product Designer
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Portfolio coming soon...
          </p>
          <Link
            href="/examples"
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Examples
          </Link>
        </div>
      </section>
    </div>
  );
}
