export interface ConversationStarter {
  category: string;
  emoji: string;
  questions: string[];
}

export const conversationStarters: ConversationStarter[] = [
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
