# Portfolio Agents

Transform your resume into an interactive, AI-powered portfolio that tells your career story.

## What it does

Portfolio Agents is a platform that converts traditional 
resumes into dynamic, personalized landing pages powered 
by AI agents. Job seekers, freelancers, and 
professionals can upload their resume and instantly 
generate a professional portfolio with an embedded AI 
agent that can answer questions about their experience, 
skills, and career journey.

Upload your resume → Get an AI agent that represents you → Share a professional portfolio link

- **AI Agent Representative**: An intelligent agent that answers questions about your experience and skills
- **Interactive Portfolio**: Auto-generated landing page with embedded AI chat
- **Voice Conversations**: Call and talk to your AI agent using voice
- **Shareable Links**: Unique URLs for employers and clients

## Quick Start

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd portfolio-agents/portfolio-agents-ui
   npm install
   ```

2. **Start the app**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:3000`

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **AI Agents**: [Strands Agents SDK](https://strandsagents.com) + [VAPI](https://docs.vapi.ai) for voice
- **Design**: Atomic Design pattern with shadcn/ui components

## Project Structure

```
portfolio-agents/
├── portfolio-agents-ui/     # Next.js app
│   ├── app/                 # Pages
│   ├── components/          # React components
│   └── lib/                 # Utilities
└── ai/                      # AI agent implementations
```

## Features

- Resume upload and parsing
- AI agent creation with custom personality
- Voice conversations via phone or web
- Professional portfolio generation
- Real-time chat interactions

## Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Set root directory to `portfolio-agents-ui`
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
