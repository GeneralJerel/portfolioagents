import React, { useState, useEffect } from "react";
import { Mic, Volume2, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationStarter {
  category: string;
  emoji: string;
  questions: string[];
}

interface VoiceAgentProps {
  theme?: "minimal" | "creative" | "executive";
  isOpen: boolean;
  onClose: () => void;
}

const conversationStarters: ConversationStarter[] = [
  {
    category: "Recent Projects",
    emoji: "🚀",
    questions: [
      "How did you build SenatorMatch?",
      "Tell me about the Nona real estate AI agent",
      "Walk me through InterviewRoom.ai's development"
    ]
  },
  {
    category: "Product Leadership",
    emoji: "💼",
    questions: [
      "Tell me about your experience as a product engineer",
      "How do you approach product-led growth?",
      "What's your framework for 0-to-1 products?"
    ]
  },
  {
    category: "AI & Automation",
    emoji: "🤖",
    questions: [
      "How did you reduce hiring time from 45 to 18 days?",
      "What's your approach to prompt engineering?",
      "Tell me about your agentic workflow experience"
    ]
  },
  {
    category: "Impact & Metrics",
    emoji: "📈",
    questions: [
      "How did you save 72,000 hours annually?",
      "Tell me about generating $7,788 in 30 days",
      "What drove 1.35M Facebook views in 90 days?"
    ]
  },
  {
    category: "Leadership Style",
    emoji: "🎯",
    questions: [
      "How do you align cross-functional teams?",
      "What's your approach to rapid experimentation?",
      "How do you balance innovation with execution?"
    ]
  }
];

const VoiceAgent: React.FC<VoiceAgentProps> = ({ theme = "minimal", isOpen, onClose }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const getThemeStyles = () => {
    switch (theme) {
      case "creative":
        return {
          background: "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900",
          card: "bg-gray-800/50 border-purple-500/30",
          accent: "from-purple-500 to-pink-500",
          text: "text-white",
          subtext: "text-gray-300",
          button: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        };
      case "executive":
        return {
          background: "bg-gray-900",
          card: "bg-gray-800 border-gray-600",
          accent: "from-gray-600 to-gray-700",
          text: "text-white",
          subtext: "text-gray-300",
          button: "bg-gray-700 hover:bg-gray-600"
        };
      default: // minimal
        return {
          background: "bg-gradient-to-br from-blue-50 to-indigo-100",
          card: "bg-white border-gray-200",
          accent: "from-blue-500 to-indigo-600",
          text: "text-gray-900",
          subtext: "text-gray-600",
          button: "bg-blue-600 hover:bg-blue-700"
        };
    }
  };

  const styles = getThemeStyles();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Voice Agent Call Interface */}
      <div className={cn("flex-1 flex items-center justify-center", styles.background)}>
        <div className="text-center">
          {/* Avatar */}
          <div className={cn("w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white bg-gradient-to-br", styles.accent)}>
            JA
          </div>

          {/* Name and Title */}
          <h2 className={cn("text-3xl font-bold mb-2", styles.text)}>Jerel AI</h2>
          <p className={cn("text-lg mb-8", styles.subtext)}>AI Product Leader</p>

          {/* Call Status */}
          <div className="mb-8">
            {isCallActive ? (
              <div className={styles.text}>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-500 font-semibold">Call Active</span>
                </div>
                <div className="text-4xl font-mono mb-4">{formatTime(callDuration)}</div>
                <p className={cn("italic", styles.subtext)}>
                  "Hi! I'm ready to discuss my AI product experience..."
                </p>
              </div>
            ) : (
              <div className={styles.text}>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className={cn("font-semibold", styles.subtext)}>Ready to Connect</span>
                </div>
                <p className={cn("italic", styles.subtext)}>
                  "Click to start our conversation about AI and product leadership"
                </p>
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button className={cn("p-4 rounded-full", styles.card, "hover:scale-105 transition-all")}>
              <Mic className={cn("w-6 h-6", styles.text)} />
            </button>
            <button className={cn("p-4 rounded-full", styles.card, "hover:scale-105 transition-all")}>
              <Volume2 className={cn("w-6 h-6", styles.text)} />
            </button>
            {isCallActive ? (
              <button 
                onClick={handleEndCall}
                className="p-4 bg-red-500 hover:bg-red-600 rounded-full hover:scale-105 transition-all"
              >
                <Phone className="w-6 h-6 text-white" />
              </button>
            ) : (
              <button 
                onClick={handleStartCall}
                className="p-4 bg-green-500 hover:bg-green-600 rounded-full hover:scale-105 transition-all"
              >
                <Phone className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

          {/* Branding */}
          <div className="flex items-center justify-between">
            <div className={cn("text-sm", styles.subtext)}>
              🚀 Powered by portfolioagent.io
            </div>
            <div className={cn("text-sm", styles.subtext)}>
              Voice AI Demo
            </div>
          </div>
        </div>
      </div>

      {/* Ask Jerel About Panel */}
      <div className="w-96 bg-white shadow-2xl overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              💡 Ask Jerel About
            </h3>
            <p className="text-sm text-gray-600">Try these conversation starters during your call</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {conversationStarters.map((category, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">{category.emoji}</span>
                {category.category}
              </h4>
              <div className="space-y-2">
                {category.questions.map((question, qIndex) => (
                  <button
                    key={qIndex}
                    onClick={() => setSelectedQuestion(question)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all hover:shadow-sm",
                      selectedQuestion === question
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <span className="text-sm text-gray-700">"{question}"</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;
