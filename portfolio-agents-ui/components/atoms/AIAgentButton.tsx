import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAgentButtonProps {
  agentName?: string;
  className?: string;
}

const AIAgentButton: React.FC<AIAgentButtonProps> = ({ 
  agentName = "Portfolio Agent",
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "bg-gradient-to-r from-blue-600 to-indigo-600",
          "text-white rounded-full p-4",
          "shadow-lg hover:shadow-xl",
          "transition-all duration-300 hover:scale-105",
          "flex items-center space-x-2",
          isOpen && "hidden",
          className
        )}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden md:inline font-medium">
          Talk to {agentName}
        </span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Jerel's AI Assistant</h3>
              <p className="text-sm text-blue-100">Ask me anything about Jerel's experience</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
              <p className="text-sm text-gray-700">
                👋 Hi! I'm Jerel's AI assistant. I can help you learn about:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• His experience in AI and product management</li>
                <li>• Projects he's worked on</li>
                <li>• Skills and expertise</li>
                <li>• How to work with him</li>
              </ul>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask about Jerel's experience..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAgentButton;
