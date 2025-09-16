# Engineering Plan: Portfolio Agents

## 🚀 1-Day Prototype Architecture

### Core Stack
- **Framework**: Next.js 15 (already in place)
- **AI**: OpenAI GPT-4o-mini (resume parsing) + GPT-4o (agent creation)
- **Voice**: VAPI (voice agent platform)
- **Agent Framework**: Strands (AI orchestration)
- **Storage**: Local JSON files → Supabase (MVP)
- **Deployment**: Vercel

### Day 1 Prototype Flow
```
PDF Upload → Parse Resume → Generate JSON → Create Agent → Publish Link
```

---

## 📁 Project Structure

```
portfolio-agents/
├── ai/
│   ├── strands/
│   │   ├── agents/
│   │   │   ├── resume-parser.ts    # Multimodal resume parsing
│   │   │   ├── agent-builder.ts    # Voice agent prompt creation
│   │   │   └── portfolio-server.ts # Serve resume data
│   │   └── index.ts                # Strands orchestrator
│   └── vapi/
│       ├── client.ts                # VAPI SDK wrapper
│       └── templates.ts             # Voice agent templates
├── app/
│   ├── api/
│   │   ├── resume/
│   │   │   └── parse/route.ts      # POST: Parse PDF resume
│   │   ├── agent/
│   │   │   ├── create/route.ts     # POST: Create voice agent
│   │   │   └── [id]/route.ts       # GET: Fetch agent data
│   │   └── portfolio/
│   │       └── [slug]/route.ts     # GET: Public portfolio data
│   ├── create/
│   │   └── page.tsx                # Resume upload + preferences
│   └── [slug]/
│       └── page.tsx                # Public portfolio page
├── lib/
│   ├── openai.ts                   # OpenAI client setup
│   ├── supabase.ts                 # Database client (MVP)
│   └── utils.ts                    # Shared utilities
└── types/
    └── portfolio.ts                 # TypeScript interfaces
```

---

## 🛠️ Implementation Plan

### Phase 1: Core Backend (Hours 1-4)

#### 1. Resume Parser (`ai/strands/agents/resume-parser.ts`)
```typescript
// Simplest approach: Use GPT-4V to parse PDF as image
import OpenAI from 'openai';

export async function parseResume(pdfBuffer: Buffer): Promise<ResumeJSON> {
  const openai = new OpenAI();
  
  // Convert PDF to base64 image (use pdf2pic or similar)
  const base64Image = await convertPdfToImage(pdfBuffer);
  
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: [
        { type: "text", text: PARSE_PROMPT },
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` }}
      ]
    }],
    response_format: { type: "json_object" }
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

#### 2. Voice Agent Builder (`ai/strands/agents/agent-builder.ts`)
```typescript
export async function createVoiceAgent(
  resumeJson: ResumeJSON,
  preferences: UserPreferences
): Promise<VAPIAgentConfig> {
  // Generate voice card based on preferences
  const voiceCard = generateVoiceCard(preferences);
  
  // Create VAPI-compatible prompt
  const prompt = buildAgentPrompt(resumeJson, voiceCard);
  
  // Create VAPI assistant
  const vapiClient = new VAPI(process.env.VAPI_API_KEY);
  const assistant = await vapiClient.assistants.create({
    name: `${resumeJson.profile.name} AI`,
    model: "gpt-4",
    voice: preferences.voice || "jennifer",
    firstMessage: `Hi! I'm ${resumeJson.profile.name}'s AI assistant...`,
    systemPrompt: prompt
  });
  
  return assistant;
}
```

#### 3. API Routes (`app/api/`)
```typescript
// app/api/resume/parse/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('resume') as File;
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const resumeJson = await parseResume(buffer);
  
  // For prototype: save to local JSON file
  const id = generateUniqueId();
  await saveToFile(`/tmp/${id}.json`, resumeJson);
  
  return NextResponse.json({ id, data: resumeJson });
}
```

### Phase 2: Frontend Integration (Hours 5-6)

#### 4. Upload & Preferences Page (`app/create/page.tsx`)
```typescript
export default function CreatePage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Step 1: Upload Resume */}
      <ResumeDropZone onUpload={handleResumeUpload} />
      
      {/* Step 2: Voice Preferences */}
      <VoicePreferences 
        onComplete={handlePreferencesComplete}
        tones={['Professional', 'Casual', 'Technical']}
      />
      
      {/* Step 3: Preview & Publish */}
      <PublishButton onClick={handlePublish} />
    </div>
  );
}
```

### Phase 3: Public Portfolio (Hours 7-8)

#### 5. Dynamic Portfolio Page (`app/[slug]/page.tsx`)
```typescript
export default async function PortfolioPage({ params }: { params: { slug: string } }) {
  const portfolio = await fetchPortfolioData(params.slug);
  
  return (
    <>
      <JerelHero data={portfolio.hero} />
      <ExperienceSection experiences={portfolio.experience} />
      <ProjectsSection projects={portfolio.projects} />
      <SkillsSection skills={portfolio.skills} />
      
      {/* VAPI Voice Agent Widget */}
      <VAPIWidget assistantId={portfolio.vapiAssistantId} />
    </>
  );
}
```

---

## 🚢 MVP Roadmap (Days 2-5)

### Day 2: Data Persistence
```typescript
// Setup Supabase
-- portfolios table
CREATE TABLE portfolios (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  resume_json JSONB NOT NULL,
  vapi_assistant_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- user_preferences table  
CREATE TABLE preferences (
  portfolio_id UUID REFERENCES portfolios(id),
  tone TEXT,
  voice_config JSONB,
  additional_context TEXT
);
```

### Day 3: Enhanced Parsing
- Add support for DOCX files
- Implement validation and error handling
- Add resume quality scoring
- Support multiple pages in PDF

### Day 4: Voice Agent Polish
- Custom voice personalities
- Dynamic conversation flows
- Context-aware responses
- Analytics tracking

### Day 5: Production Ready
- Authentication (Clerk or NextAuth)
- Custom domains support
- SEO optimization
- Rate limiting & security

---

## 🔧 Required Dependencies

```json
{
  "dependencies": {
    "openai": "^4.x",
    "@vapi-ai/sdk": "latest",
    "pdf2pic": "^3.x",
    "@supabase/supabase-js": "^2.x",
    "nanoid": "^5.x",
    "zod": "^3.x"
  }
}
```

---

## 🌟 Quick Start Commands

```bash
# Install core dependencies
npm install openai @vapi-ai/sdk pdf2pic nanoid zod

# Environment variables (.env.local)
OPENAI_API_KEY=sk-...
VAPI_API_KEY=vapi_...
NEXT_PUBLIC_VAPI_PUBLIC_KEY=...
SUPABASE_URL=... # For MVP
SUPABASE_ANON_KEY=... # For MVP

# Run prototype
npm run dev
```

---

## 📋 1-Day Prototype Checklist

### Morning (Hours 1-4)
- [ ] Setup OpenAI client and test resume parsing
- [ ] Create basic Strands agent for resume processing
- [ ] Implement `/api/resume/parse` endpoint
- [ ] Test with sample PDF (jerel's resume)

### Afternoon (Hours 5-8) 
- [ ] Create VAPI account and get API keys
- [ ] Build voice agent prompt generator
- [ ] Create upload UI with existing components
- [ ] Implement public portfolio page with dynamic routing

### End of Day
- [ ] Deploy to Vercel
- [ ] Test full flow: Upload → Parse → Create Agent → View Portfolio
- [ ] Document any blockers for MVP phase

---

## 🎯 Success Metrics

### Prototype (Day 1)
- ✅ Can upload PDF and extract JSON
- ✅ Can create VAPI voice agent
- ✅ Can view portfolio on public link
- ✅ Voice agent answers basic questions

### MVP (Week 1)
- ✅ 10+ successful portfolio creations
- ✅ <30s end-to-end creation time
- ✅ 95%+ resume parsing accuracy
- ✅ Voice agent handles 20+ question types

---

## 🚨 Critical Path & Risk Mitigation

### Highest Risk Items
1. **PDF Parsing Accuracy** → Fallback: Manual JSON editor
2. **VAPI Integration** → Fallback: Embed chatbot instead
3. **Deployment Issues** → Fallback: Railway or Render

### Time Savers
- Use GPT-4V for PDF parsing (no OCR library needed)
- Use VAPI's hosted solution (no voice infra needed)
- Store JSON in filesystem for prototype (no DB setup)
- Use existing UI components from portfolio-agents/

---

## 📝 Notes

- **Strands**: Use for orchestrating multi-step AI workflows
- **VAPI**: Handles all voice synthesis and conversation management
- **Vercel**: Automatic deployments on push to main
- **Unique URLs**: Use nanoid for generating portfolio slugs (e.g., `/jerel-x7k2m`)

This plan prioritizes shipping a working prototype in 1 day, then iteratively improving to MVP quality over the following days.

---

## 📦 TypeScript Interfaces

### Core Types (`types/portfolio.ts`)

```typescript
// Core data structure matching jerel-resume-json.md
export interface ResumeJSON {
  schema_version: string;
  generated_at: string;
  source_citation: string;
  page: {
    slug: string;
    title: string;
    seo_description: string;
    theme: {
      palette: string;
      accent: string;
      layout: string;
    };
    sections_order: string[];
  };
  profile: {
    name: string;
    headline: string;
    location: string;
    email: string;
    badges: string[];
    summary: string;
    keywords: string[];
  };
  hero: {
    tagline: string;
    cta_primary: { label: string; url: string };
    cta_secondary: { label: string; url: string };
  };
  links: Array<{ label: string; url: string }>;
  experience: Array<{
    company: string;
    location: string;
    title: string;
    start_date: string;
    end_date: string;
    summary?: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    role: string;
    summary: string;
    impact?: string;
    links: Array<{ label: string; url: string }>;
  }>;
  awards: string[];
  education: Array<{
    institution: string;
    program: string;
  }>;
  skills: string[];
  community: string[];
  contact: {
    email: string;
    preferred_action: string;
  };
}

// User preferences for voice agent
export interface UserPreferences {
  tone: 'professional' | 'casual' | 'technical' | 'friendly';
  voice?: string; // VAPI voice ID
  coreStories?: string[]; // Key achievements to highlight
  additionalContext?: string; // Extra info for the agent
}

// VAPI Assistant Configuration
export interface VAPIAgentConfig {
  id: string;
  name: string;
  model: string;
  voice: string;
  firstMessage: string;
  systemPrompt: string;
}

// Portfolio data structure
export interface Portfolio {
  id: string;
  slug: string;
  resumeJson: ResumeJSON;
  vapiAssistantId?: string;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🚀 Starter Implementation

### Resume Parser Implementation (`ai/strands/agents/resume-parser.ts`)

```typescript
import OpenAI from 'openai';
import { ResumeJSON } from '@/types/portfolio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PARSE_PROMPT = `
You are a resume parser. Extract the information from this resume image and return it in the exact JSON structure provided.
Follow the schema exactly as shown in the example. Extract all relevant information including:
- Personal profile (name, headline, location, email)
- Experience with companies, titles, dates, and highlights
- Projects with impacts and metrics
- Education, skills, awards
- Any links or portfolio URLs

Return ONLY valid JSON matching this structure:
{
  "schema_version": "1.0",
  "generated_at": "[current date]",
  "profile": { ... },
  "experience": [ ... ],
  // ... etc following the exact schema
}
`;

export async function parseResume(pdfBuffer: Buffer): Promise<ResumeJSON> {
  try {
    // For prototype: Convert PDF first page to base64
    // You'll need to install: npm install pdf-to-base64
    const base64Image = await convertPdfToBase64(pdfBuffer);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PARSE_PROMPT },
            { 
              type: "image_url", 
              image_url: { 
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1, // Low temperature for consistent parsing
    });

    const parsedData = JSON.parse(response.choices[0].message.content || '{}');
    
    // Add generated metadata
    parsedData.schema_version = "1.0";
    parsedData.generated_at = new Date().toISOString().split('T')[0];
    parsedData.source_citation = "AI-parsed from uploaded PDF";
    
    return parsedData as ResumeJSON;
  } catch (error) {
    console.error('Resume parsing error:', error);
    throw new Error('Failed to parse resume');
  }
}

// Helper function (implement with pdf2pic or similar)
async function convertPdfToBase64(pdfBuffer: Buffer): Promise<string> {
  // Implementation with pdf2pic or pdf-to-base64
  // This is a placeholder
  return "";
}
```

### Agent Builder Implementation (`ai/strands/agents/agent-builder.ts`)

```typescript
import { ResumeJSON, UserPreferences, VAPIAgentConfig } from '@/types/portfolio';

function generateVoiceCard(preferences: UserPreferences): string {
  const toneMap = {
    professional: "You speak in a professional, polished manner.",
    casual: "You're friendly and conversational, like talking to a colleague.",
    technical: "You focus on technical details and precise terminology.",
    friendly: "You're warm and approachable, making complex topics accessible."
  };
  
  return toneMap[preferences.tone] || toneMap.professional;
}

function buildAgentPrompt(resumeJson: ResumeJSON, voiceCard: string): string {
  // Based on jerel-agent.py structure
  return `
# ${resumeJson.profile.name} AI

## Role
You are **${resumeJson.profile.name} AI**, a first-person interview agent that answers questions **as ${resumeJson.profile.name}**. 
${voiceCard}

## Instructions
- Speak in first person as ${resumeJson.profile.name}
- Be concise: 30-60 seconds per answer
- Focus on specific metrics and outcomes
- Use data from the provided context only

## Context
${JSON.stringify(resumeJson, null, 2)}

## Key Highlights
- Current role: ${resumeJson.experience[0]?.title} at ${resumeJson.experience[0]?.company}
- Expertise: ${resumeJson.profile.keywords.slice(0, 3).join(', ')}
- Notable achievement: ${resumeJson.experience[0]?.highlights[0]}
`;
}

export async function createVoiceAgent(
  resumeJson: ResumeJSON,
  preferences: UserPreferences
): Promise<VAPIAgentConfig> {
  const voiceCard = generateVoiceCard(preferences);
  const prompt = buildAgentPrompt(resumeJson, voiceCard);
  
  // Mock VAPI config for prototype
  // Replace with actual VAPI SDK call
  return {
    id: `assistant_${Date.now()}`,
    name: `${resumeJson.profile.name} AI`,
    model: "gpt-4",
    voice: preferences.voice || "jennifer",
    firstMessage: `Hi! I'm ${resumeJson.profile.name}. ${resumeJson.profile.summary}`,
    systemPrompt: prompt
  };
}
```
