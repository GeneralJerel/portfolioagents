"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import ActAsSection from "@/components/molecules/ActAsSection";
import PersonalitySection from "@/components/molecules/PersonalitySection";

interface PersonalizationAnswers {
  actAs: "me" | "assistant" | "";
  warmth: "friendly" | "balanced" | "reserved" | "";
  energy: "calm" | "neutral" | "energetic" | "";
  confidence: "humble" | "balanced" | "assertive" | "";
  clarity: "conversational" | "clear" | "polished" | "";
  empathy: "high" | "balanced" | "low" | "";
}

const VoiceAgentPage: React.FC = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<PersonalizationAnswers>({
    actAs: "",
    warmth: "",
    energy: "",
    confidence: "",
    clarity: "",
    empathy: "",
  });

  const handleAnswerChange = (category: keyof PersonalizationAnswers, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const isComplete = Object.values(answers).every(answer => answer !== "");

  const handleContinue = () => {
    if (isComplete) {
      console.log("Voice agent configuration:", answers);
      // Navigate to template selection page
      router.push('/template-selection');
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
              Step 2 of 3
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Volume2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Build Your Voice Agent
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Personalize how your AI agent communicates. These settings will shape your agent's personality and speaking style.
            </p>
          </div>

          {/* Configuration Form */}
          <div className="space-y-12">
            {/* Act As */}
            <ActAsSection
              selectedValue={answers.actAs}
              onSelect={(value) => handleAnswerChange("actAs", value)}
            />

            {/* Personalization Questions */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">
                Personalization Questions
              </h2>

              {/* Warmth */}
              <PersonalitySection
                title="Warmth"
                options={[
                  { value: "friendly", label: "Friendly & approachable", description: "Warm, welcoming tone" },
                  { value: "balanced", label: "Balanced / professional", description: "Professional yet personable" },
                  { value: "reserved", label: "Reserved & formal", description: "Formal, business-like tone" },
                ]}
                selectedValue={answers.warmth}
                onSelect={(value) => handleAnswerChange("warmth", value)}
                columns={3}
              />

              {/* Energy */}
              <PersonalitySection
                title="Energy"
                options={[
                  { value: "calm", label: "Calm & steady", description: "Measured, thoughtful responses" },
                  { value: "neutral", label: "Neutral & balanced", description: "Steady, consistent energy" },
                  { value: "energetic", label: "Energetic & upbeat", description: "Enthusiastic, dynamic tone" },
                ]}
                selectedValue={answers.energy}
                onSelect={(value) => handleAnswerChange("energy", value)}
                columns={3}
              />

              {/* Confidence */}
              <PersonalitySection
                title="Confidence"
                options={[
                  { value: "humble", label: "Humble & collaborative", description: "Modest, team-oriented approach" },
                  { value: "balanced", label: "Balanced confidence", description: "Confident but not boastful" },
                  { value: "assertive", label: "Strong & assertive", description: "Direct, confident communication" },
                ]}
                selectedValue={answers.confidence}
                onSelect={(value) => handleAnswerChange("confidence", value)}
                columns={3}
              />

              {/* Clarity */}
              <PersonalitySection
                title="Clarity"
                options={[
                  { value: "conversational", label: "Conversational & natural", description: "Casual, easy-going style" },
                  { value: "clear", label: "Clear & concise", description: "Straightforward, to the point" },
                  { value: "polished", label: "Polished & structured", description: "Well-organized, articulate" },
                ]}
                selectedValue={answers.clarity}
                onSelect={(value) => handleAnswerChange("clarity", value)}
                columns={3}
              />

              {/* Empathy */}
              <PersonalitySection
                title="Empathy"
                options={[
                  { value: "high", label: "High empathy", description: "Nurturing, people-focused approach" },
                  { value: "balanced", label: "Balanced empathy", description: "Professional but personable" },
                  { value: "low", label: "Low empathy", description: "Direct, no-nonsense style" },
                ]}
                selectedValue={answers.empathy}
                onSelect={(value) => handleAnswerChange("empathy", value)}
                columns={3}
              />
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleContinue}
                disabled={!isComplete}
                size="lg"
                variant="primary"
              >
                Continue to Templates
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VoiceAgentPage;
