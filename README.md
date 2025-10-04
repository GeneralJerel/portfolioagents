# Portfolio Agents

Transform your resume into an interactive, AI-powered portfolio that tells your career story.

## [🎥 Watch the Video](https://www.loom.com/share/59e7b54ebd0b4c1f8410d487d92110ee?sid=5fadffd8-f4f9-4f0a-8324-ce35def746f8)
<img width="1445" height="866" alt="image" src="https://github.com/user-attachments/assets/d359e2a2-2644-468a-bafc-51fb5acbe914" />




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
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **AI Agents**: [VAPI](https://docs.vapi.ai) for voice
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

## Database Migration

🚀 **Currently migrating to Supabase!**

### Quick Links
- 📋 [**Migration Summary**](./MIGRATION_SUMMARY.md) - Start here! Executive overview
- 🚀 [**Quick Start Guide**](./MIGRATION_QUICK_START.md) - Get up and running in 1 hour
- 📘 [**Full Migration Plan**](./SUPABASE_MIGRATION_PLAN.md) - Complete technical specification
- ✅ [**Implementation Checklist**](./IMPLEMENTATION_CHECKLIST.md) - 7-week task tracker
- 🏗️ [**Architecture Diagram**](./ARCHITECTURE.md) - System design & data flows

### Roadmap
- ✅ **Epic 1:** Resume PDF → Voice Agent (Current)
- 🔄 **Epic 2:** LinkedIn Profile Import
- 🔄 **Epic 3:** Story Interviewer (AI-powered)
- 🔄 **Epic 4:** Customize Resume for Jobs
- 🔄 **Epic 5:** Generate Cover Letters

### Implementation Status
- ✅ Planning complete (4 comprehensive documents)
- ⏳ Database schema designed (10 tables)
- ⏳ API routes specified (15+ endpoints)
- ⏳ Ready to start implementation

**Next Step:** Follow [MIGRATION_QUICK_START.md](./MIGRATION_QUICK_START.md) to set up Supabase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
