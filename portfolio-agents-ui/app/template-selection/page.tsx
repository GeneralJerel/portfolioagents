"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Layout, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import TemplateCard from "@/components/atoms/TemplateCard";
import TemplatePreview from "@/components/atoms/TemplatePreview";

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  color: "blue" | "purple" | "gray";
}

const templates: Template[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean, professional design focused on content and readability",
    features: ["Clean typography", "Minimal layout", "Professional appearance", "Mobile-first design"],
    color: "blue"
  },
  {
    id: "creative-bold",
    name: "Creative Bold",
    description: "Eye-catching design with vibrant colors and dynamic layouts",
    features: ["Bold visuals", "Creative layouts", "Interactive elements", "Engaging animations"],
    color: "purple"
  },
  {
    id: "executive-classic",
    name: "Executive Classic",
    description: "Traditional, sophisticated design perfect for senior professionals",
    features: ["Classic elegance", "Professional tone", "Structured layout", "Executive appeal"],
    color: "gray"
  }
];

const TemplateSelectionPage: React.FC = () => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      console.log("Selected template:", selectedTemplate);
      // Navigate to the appropriate template
      switch(selectedTemplate) {
        case "modern-minimal":
          router.push('/u/jerel');
          break;
        case "creative-bold":
          router.push('/u/jerel/creative');
          break;
        case "executive-classic":
          router.push('/u/jerel/executive');
          break;
        default:
          router.push('/u/jerel');
      }
    }
  };


  return (
    <div className="min-h-screen bg-white">
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
              <div className="font-bold text-xl">
                <span className="text-gray-900">portfolio</span>
                <span className="text-blue-600">agent</span>
                <span className="text-gray-500">.io</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Step 3 of 3
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Layout className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Select Landing Page Template
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a design template that best represents your professional style and personality.
            </p>
          </div>

          {/* Template Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                features={template.features}
                color={template.color}
                selected={selectedTemplate === template.id}
                onSelect={handleTemplateSelect}
                previewContent={
                  <TemplatePreview templateId={template.id} color={template.color} />
                }
              />
            ))}
          </div>

          {/* Build Your Own Section */}
          <div className="text-center mb-12">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Build your own (coming soon)
                </h3>
                <p className="text-gray-600 mb-6">
                  Want complete control over your design? Our custom builder will let you create a unique portfolio from scratch.
                </p>
                <Button variant="secondary" disabled>
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedTemplate}
              size="lg"
              variant="primary"
            >
              Generate My Portfolio
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateSelectionPage;
