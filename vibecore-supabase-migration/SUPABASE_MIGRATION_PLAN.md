# Supabase Migration Plan
## Portfolio Agents - Database Architecture & Implementation

**Created:** October 4, 2025  
**Branch:** add-supabase  
**Status:** Planning Phase

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Database Schema Design](#database-schema-design)
4. [Migration Strategy](#migration-strategy)
5. [Implementation Phases](#implementation-phases)
6. [Epic-Specific Requirements](#epic-specific-requirements)
7. [Security & Performance](#security--performance)
8. [Testing Strategy](#testing-strategy)

---

## Executive Summary

This plan outlines the migration from hardcoded mock data to a production-ready Supabase database architecture that supports current functionality (Epic 1) and future features (Epics 2-5).

### Key Objectives
- ✅ Migrate hardcoded data from `/app/jerel/page.tsx` to Supabase
- ✅ Support resume PDF → JSON → Portfolio workflow (Epic 1)
- 🔄 Enable LinkedIn PDF → JSON workflow (Epic 2)
- 🔄 Store interview transcripts and content ideas (Epic 3)
- 🔄 Support resume customization for job applications (Epic 4)
- 🔄 Store and manage cover letters (Epic 5)

---

## Current State Analysis

### Hardcoded Data Locations
1. **`portfolio-agents-ui/app/jerel/page.tsx`** (Lines 87-233)
   - Experience data (9 companies)
   - Projects (3 items)
   - Skills (10+ items)
   - Awards (5+ items)

2. **`ai/ai-engineering/jerel-resume-json.md`**
   - Complete resume JSON schema example
   - 245 lines of structured data

3. **Voice Agent Configuration**
   - VAPI assistant IDs hardcoded in page components
   - Voice preferences stored in component state only

### Current Data Flow
```
1. User uploads PDF → ResumeDropZone (no actual processing yet)
2. Navigate to /voice-agent → Collect personality preferences (not saved)
3. Navigate to /template-selection → Choose template (not implemented)
4. Display static portfolio → Hardcoded data from /jerel/page.tsx
```

### Pain Points
- No data persistence between sessions
- Each user would need a new page component
- No way to update portfolios after creation
- Voice agent configurations lost on page refresh
- No analytics or usage tracking

---

## Database Schema Design

### Core Tables

#### 1. `users` (Authentication)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  subscription_tier TEXT DEFAULT 'free', -- free, pro, enterprise
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription ON users(subscription_tier);
```

#### 2. `portfolios` (Main Portfolio Data)
```sql
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  
  -- Core Profile Data
  resume_json JSONB NOT NULL,
  
  -- Metadata
  source_type TEXT NOT NULL, -- 'pdf_resume', 'linkedin_pdf', 'manual'
  source_file_url TEXT, -- S3/Supabase Storage URL
  
  -- Voice Agent
  vapi_assistant_id TEXT,
  vapi_phone_number TEXT,
  voice_config JSONB, -- Personality settings from voice-agent page
  
  -- Customization
  theme JSONB DEFAULT '{"palette":"light","accent":"blue","layout":"clean"}'::jsonb,
  template_type TEXT DEFAULT 'professional', -- professional, creative, executive
  
  -- Status
  status TEXT DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived')),
  CONSTRAINT valid_source CHECK (source_type IN ('pdf_resume', 'linkedin_pdf', 'manual'))
);

-- Indexes
CREATE INDEX idx_portfolios_user ON portfolios(user_id);
CREATE INDEX idx_portfolios_slug ON portfolios(slug);
CREATE INDEX idx_portfolios_status ON portfolios(status);
CREATE INDEX idx_portfolios_source ON portfolios(source_type);

-- Full-text search on resume_json
CREATE INDEX idx_portfolios_resume_search ON portfolios 
  USING GIN ((resume_json->'profile'->'name'), (resume_json->'profile'->'headline'));
```

#### 3. `experience` (Normalized Experience Data)
```sql
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  
  -- Core Data
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL means current
  summary TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_experience_portfolio ON experience(portfolio_id);
CREATE INDEX idx_experience_dates ON experience(start_date DESC, end_date DESC);
```

#### 4. `projects` (Portfolio Projects)
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  
  -- Core Data
  name TEXT NOT NULL,
  role TEXT,
  summary TEXT NOT NULL,
  impact TEXT,
  links JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  
  -- Media
  thumbnail_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_portfolio ON projects(portfolio_id);
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
```

#### 5. `voice_agent_conversations` (Epic 3: Story Interviewer)
```sql
CREATE TABLE voice_agent_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
  
  -- Conversation Data
  vapi_call_id TEXT UNIQUE,
  conversation_type TEXT NOT NULL, -- 'interview', 'screening', 'custom'
  transcript JSONB, -- Full transcript with timestamps
  summary TEXT,
  
  -- AI-Generated Content (Epic 3)
  content_ideas JSONB DEFAULT '[]'::jsonb,
  extracted_stories JSONB DEFAULT '[]'::jsonb,
  key_themes JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  duration_seconds INTEGER,
  call_status TEXT, -- 'completed', 'in_progress', 'failed'
  recording_url TEXT,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_conversation_type CHECK (conversation_type IN ('interview', 'screening', 'custom')),
  CONSTRAINT valid_call_status CHECK (call_status IN ('completed', 'in_progress', 'failed'))
);

-- Indexes
CREATE INDEX idx_conversations_user ON voice_agent_conversations(user_id);
CREATE INDEX idx_conversations_portfolio ON voice_agent_conversations(portfolio_id);
CREATE INDEX idx_conversations_vapi ON voice_agent_conversations(vapi_call_id);
CREATE INDEX idx_conversations_type ON voice_agent_conversations(conversation_type);
```

#### 6. `job_applications` (Epic 4: Customize Resume)
```sql
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  
  -- Job Details
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_description TEXT,
  job_url TEXT,
  
  -- Customized Resume
  customized_resume_json JSONB NOT NULL,
  customization_notes TEXT,
  ai_suggestions JSONB DEFAULT '[]'::jsonb,
  
  -- Tailoring Strategy
  keywords_matched JSONB DEFAULT '[]'::jsonb,
  skills_highlighted JSONB DEFAULT '[]'::jsonb,
  experience_emphasized JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  application_status TEXT DEFAULT 'draft', -- draft, applied, interview, offer, rejected
  applied_date DATE,
  
  -- Files
  resume_file_url TEXT,
  cover_letter_id UUID REFERENCES cover_letters(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_application_status CHECK (
    application_status IN ('draft', 'applied', 'interview', 'offer', 'rejected')
  )
);

-- Indexes
CREATE INDEX idx_job_applications_user ON job_applications(user_id);
CREATE INDEX idx_job_applications_portfolio ON job_applications(portfolio_id);
CREATE INDEX idx_job_applications_status ON job_applications(application_status);
CREATE INDEX idx_job_applications_applied ON job_applications(applied_date DESC);
```

#### 7. `cover_letters` (Epic 5: Write Cover Letters)
```sql
CREATE TABLE cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
  
  -- Content
  content TEXT NOT NULL,
  tone TEXT DEFAULT 'professional', -- professional, casual, enthusiastic, formal
  
  -- Generation Details
  generated_by TEXT DEFAULT 'ai', -- ai, user, hybrid
  ai_model TEXT, -- gpt-4, claude-3, etc.
  prompt_used TEXT,
  
  -- Versions
  version INTEGER DEFAULT 1,
  is_final BOOLEAN DEFAULT false,
  
  -- Files
  pdf_url TEXT,
  docx_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_tone CHECK (tone IN ('professional', 'casual', 'enthusiastic', 'formal')),
  CONSTRAINT valid_generated_by CHECK (generated_by IN ('ai', 'user', 'hybrid'))
);

-- Indexes
CREATE INDEX idx_cover_letters_user ON cover_letters(user_id);
CREATE INDEX idx_cover_letters_job ON cover_letters(job_application_id);
CREATE INDEX idx_cover_letters_final ON cover_letters(is_final) WHERE is_final = true;
```

#### 8. `linkedin_imports` (Epic 2: LinkedIn PDF to JSON)
```sql
CREATE TABLE linkedin_imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
  
  -- Import Details
  source_file_url TEXT,
  apify_run_id TEXT,
  
  -- LinkedIn Data
  linkedin_profile_json JSONB NOT NULL,
  profile_url TEXT,
  
  -- Processing Status
  import_status TEXT DEFAULT 'processing', -- processing, completed, failed
  error_message TEXT,
  
  -- Mapping Results
  mapped_to_resume_json JSONB,
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00
  unmapped_fields JSONB DEFAULT '[]'::jsonb,
  
  -- Timestamps
  imported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT valid_import_status CHECK (import_status IN ('processing', 'completed', 'failed')),
  CONSTRAINT valid_confidence CHECK (confidence_score >= 0 AND confidence_score <= 1)
);

-- Indexes
CREATE INDEX idx_linkedin_imports_user ON linkedin_imports(user_id);
CREATE INDEX idx_linkedin_imports_status ON linkedin_imports(import_status);
CREATE INDEX idx_linkedin_imports_portfolio ON linkedin_imports(portfolio_id);
```

#### 9. `analytics_events` (Usage Tracking)
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Entity References
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE SET NULL,
  
  -- Event Data
  event_type TEXT NOT NULL, -- 'page_view', 'portfolio_created', 'voice_call', etc.
  event_data JSONB DEFAULT '{}'::jsonb,
  
  -- Session Info
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_event_type CHECK (
    event_type IN (
      'page_view', 'portfolio_created', 'portfolio_viewed', 
      'voice_call_started', 'voice_call_ended', 'resume_uploaded',
      'linkedin_imported', 'job_application_created', 'cover_letter_generated'
    )
  )
);

-- Indexes
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_portfolio ON analytics_events(portfolio_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- Partitioning (for performance)
-- Consider partitioning by month after 1M+ events
```

#### 10. `storage_files` (File Management)
```sql
CREATE TABLE storage_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- File Details
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'resume_pdf', 'linkedin_pdf', 'profile_image', etc.
  mime_type TEXT NOT NULL,
  file_size_bytes INTEGER NOT NULL,
  
  -- Storage
  storage_path TEXT NOT NULL, -- Path in Supabase Storage
  public_url TEXT,
  
  -- Processing Status
  processing_status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  processed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_processing_status CHECK (
    processing_status IN ('pending', 'processing', 'completed', 'failed')
  )
);

-- Indexes
CREATE INDEX idx_storage_files_user ON storage_files(user_id);
CREATE INDEX idx_storage_files_type ON storage_files(file_type);
CREATE INDEX idx_storage_files_status ON storage_files(processing_status);
```

---

## Migration Strategy

### Phase 1: Foundation Setup (Week 1)

#### Step 1.1: Supabase Project Setup
```bash
# Install dependencies
cd portfolio-agents-ui
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Environment variables
# Add to .env.local:
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Step 1.2: Create Supabase Client
```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export const createClient = () => createClientComponentClient<Database>()

// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export const createServerClient = () => 
  createServerComponentClient<Database>({ cookies })
```

#### Step 1.3: Generate TypeScript Types
```bash
# Install Supabase CLI
npm install -g supabase

# Generate types from schema
npx supabase gen types typescript --project-id your-project-ref > types/supabase.ts
```

#### Step 1.4: Run Initial Migration
```sql
-- Run all CREATE TABLE statements from schema design above
-- Execute in Supabase SQL Editor or via migration files
```

### Phase 2: Migrate Existing Data (Week 1)

#### Step 2.1: Create Migration Script
```typescript
// scripts/migrate-mock-data.ts
import { createClient } from '@supabase/supabase-js'
import jerelData from '../ai/ai-engineering/jerel-resume-json.md'

async function migrateJerelPortfolio() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // 1. Create or get user
  const { data: user, error: userError } = await supabase
    .from('users')
    .upsert({
      email: 'jereljohnvelarde@gmail.com',
      full_name: 'Jerel Velarde',
      subscription_tier: 'pro'
    })
    .select()
    .single()

  if (userError) throw userError

  // 2. Create portfolio
  const { data: portfolio, error: portfolioError } = await supabase
    .from('portfolios')
    .insert({
      user_id: user.id,
      slug: 'jerel',
      resume_json: jerelData,
      source_type: 'pdf_resume',
      vapi_assistant_id: 'ccc490af-8b1d-4eab-b7f0-5a316daf2fec',
      theme: { palette: 'light', accent: 'blue', layout: 'clean' },
      template_type: 'professional',
      status: 'published',
      published_at: new Date().toISOString()
    })
    .select()
    .single()

  if (portfolioError) throw portfolioError

  // 3. Migrate experience data
  for (const [index, exp] of jerelData.experience.entries()) {
    await supabase.from('experience').insert({
      portfolio_id: portfolio.id,
      company: exp.company,
      title: exp.title,
      location: exp.location,
      start_date: exp.start_date,
      end_date: exp.end_date === 'Present' ? null : exp.end_date,
      summary: exp.summary,
      highlights: exp.highlights,
      display_order: index,
      is_visible: true
    })
  }

  // 4. Migrate projects
  for (const [index, project] of jerelData.projects.entries()) {
    await supabase.from('projects').insert({
      portfolio_id: portfolio.id,
      name: project.name,
      role: project.role,
      summary: project.summary,
      impact: project.impact,
      links: project.links,
      display_order: index,
      is_featured: index < 3,
      is_visible: true
    })
  }

  console.log('✅ Migration complete!')
}

migrateJerelPortfolio().catch(console.error)
```

#### Step 2.2: Update Jerel's Portfolio Page
```typescript
// app/jerel/page.tsx (refactored)
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function JerelPage() {
  const supabase = createServerClient()
  
  // Fetch portfolio data from Supabase
  const { data: portfolio, error } = await supabase
    .from('portfolios')
    .select(`
      *,
      experience (*),
      projects (*)
    `)
    .eq('slug', 'jerel')
    .eq('status', 'published')
    .single()
  
  if (error || !portfolio) {
    return notFound()
  }

  const { resume_json, experience, projects, vapi_assistant_id } = portfolio

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              {resume_json.profile.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold mb-8">
              {resume_json.profile.headline}
            </h2>
            {/* ... rest of hero content from resume_json */}
          </div>
        </div>
      </section>

      {/* Experience Section - using normalized data */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {experience
              .filter(exp => exp.is_visible)
              .sort((a, b) => a.display_order - b.display_order)
              .map((exp) => (
                <ExperienceCard key={exp.id} {...exp} />
              ))}
          </div>
        </div>
      </section>

      {/* Projects Section - using normalized data */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(project => project.is_visible)
              .sort((a, b) => a.display_order - b.display_order)
              .map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
          </div>
        </div>
      </section>

      {/* VAPI Widget with dynamic assistant ID */}
      <VapiWidget assistantId={vapi_assistant_id} />
    </div>
  )
}
```

### Phase 3: API Routes (Week 2)

#### Step 3.1: Resume Upload API
```typescript
// app/api/resume/upload/route.ts
import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const formData = await request.formData()
  const file = formData.get('resume') as File
  
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Upload to Supabase Storage
  const fileName = `${user.id}/${nanoid()}-${file.name}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(fileName, file)

  if (uploadError) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName)

  // Create storage_files record
  const { data: storageFile, error: storageError } = await supabase
    .from('storage_files')
    .insert({
      user_id: user.id,
      file_name: file.name,
      file_type: 'resume_pdf',
      mime_type: file.type,
      file_size_bytes: file.size,
      storage_path: fileName,
      public_url: publicUrl,
      processing_status: 'pending'
    })
    .select()
    .single()

  if (storageError) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  // Trigger background processing (Edge Function or Queue)
  await supabase.functions.invoke('process-resume', {
    body: { fileId: storageFile.id, publicUrl }
  })

  return NextResponse.json({ 
    fileId: storageFile.id,
    status: 'processing'
  })
}
```

#### Step 3.2: Resume Processing Edge Function
```typescript
// supabase/functions/process-resume/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { OpenAI } from 'https://esm.sh/openai@4'

serve(async (req) => {
  const { fileId, publicUrl } = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    // Update status to processing
    await supabase
      .from('storage_files')
      .update({ processing_status: 'processing' })
      .eq('id', fileId)

    // Download PDF
    const response = await fetch(publicUrl)
    const pdfBuffer = await response.arrayBuffer()

    // Parse with OpenAI (or other service)
    const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })
    // ... parsing logic ...

    const resumeJson = {
      // Parsed resume data
    }

    // Create portfolio
    const { data: portfolio } = await supabase
      .from('portfolios')
      .insert({
        user_id: fileId.split('/')[0], // Extract from path
        slug: `user-${Date.now()}`, // Generate unique slug
        resume_json: resumeJson,
        source_type: 'pdf_resume',
        source_file_url: publicUrl,
        status: 'draft'
      })
      .select()
      .single()

    // Normalize data into experience and projects tables
    // ... insert into experience and projects tables ...

    // Update storage file status
    await supabase
      .from('storage_files')
      .update({ 
        processing_status: 'completed',
        processed_at: new Date().toISOString()
      })
      .eq('id', fileId)

    return new Response(
      JSON.stringify({ success: true, portfolioId: portfolio.id }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    // Update status to failed
    await supabase
      .from('storage_files')
      .update({ processing_status: 'failed' })
      .eq('id', fileId)

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

#### Step 3.3: Voice Agent Creation API
```typescript
// app/api/voice-agent/create/route.ts
import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const { portfolioId, voiceConfig } = await request.json()

  // Get portfolio data
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('resume_json')
    .eq('id', portfolioId)
    .single()

  // Create VAPI agent
  const vapiResponse = await fetch('https://api.vapi.ai/assistant', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${portfolio.resume_json.profile.name} AI`,
      model: { provider: 'openai', model: 'gpt-4' },
      voice: { provider: 'eleven-labs', voiceId: 'jennifer' },
      firstMessage: `Hi! I'm ${portfolio.resume_json.profile.name}...`,
      systemPrompt: buildAgentPrompt(portfolio.resume_json, voiceConfig)
    })
  })

  const vapiAgent = await vapiResponse.json()

  // Update portfolio with agent ID
  await supabase
    .from('portfolios')
    .update({ 
      vapi_assistant_id: vapiAgent.id,
      voice_config: voiceConfig
    })
    .eq('id', portfolioId)

  return NextResponse.json({ assistantId: vapiAgent.id })
}
```

### Phase 4: Dynamic Portfolio Routes (Week 2)

#### Step 4.1: Create Dynamic Route
```typescript
// app/[slug]/page.tsx
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerClient()
  
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('resume_json')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (!portfolio) {
    return { title: 'Portfolio Not Found' }
  }

  return {
    title: portfolio.resume_json.page.title,
    description: portfolio.resume_json.page.seo_description,
  }
}

export default async function DynamicPortfolioPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()
  
  const { data: portfolio, error } = await supabase
    .from('portfolios')
    .select(`
      *,
      experience (*),
      projects (*)
    `)
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (error || !portfolio) {
    return notFound()
  }

  // Track page view
  await supabase.from('analytics_events').insert({
    portfolio_id: portfolio.id,
    event_type: 'portfolio_viewed',
    event_data: { slug: params.slug }
  })

  // Render based on template_type
  switch (portfolio.template_type) {
    case 'professional':
      return <ProfessionalTemplate portfolio={portfolio} />
    case 'creative':
      return <CreativeTemplate portfolio={portfolio} />
    case 'executive':
      return <ExecutiveTemplate portfolio={portfolio} />
    default:
      return <ProfessionalTemplate portfolio={portfolio} />
  }
}
```

---

## Epic-Specific Requirements

### Epic 1: Resume PDF to Voice Agent ✅ (Already Implemented Above)
**Tables Used:** `users`, `portfolios`, `experience`, `projects`, `storage_files`, `analytics_events`

**Workflow:**
1. User uploads PDF → `storage_files` table
2. Edge function processes → Creates `portfolios` entry
3. Normalize data → `experience` and `projects` tables
4. User customizes voice agent → Update `voice_config` in `portfolios`
5. Publish portfolio → Set `status = 'published'`

---

### Epic 2: LinkedIn PDF to JSON

#### Additional API Routes
```typescript
// app/api/linkedin/import/route.ts
import { createServerClient } from '@/lib/supabase/server'
import { ApifyClient } from 'apify-client'

export async function POST(request: Request) {
  const supabase = createServerClient()
  const { linkedinUrl } = await request.json()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Call Apify LinkedIn scraper
  const apify = new ApifyClient({ token: process.env.APIFY_API_TOKEN })
  const run = await apify.actor('apify/linkedin-profile-scraper').call({
    linkedinUrl
  })

  const linkedinData = await apify.dataset(run.defaultDatasetId).listItems()

  // Store import record
  const { data: importRecord } = await supabase
    .from('linkedin_imports')
    .insert({
      user_id: user.id,
      apify_run_id: run.id,
      linkedin_profile_json: linkedinData.items[0],
      profile_url: linkedinUrl,
      import_status: 'processing'
    })
    .select()
    .single()

  // Trigger mapping to resume JSON format
  await supabase.functions.invoke('map-linkedin-to-resume', {
    body: { importId: importRecord.id }
  })

  return NextResponse.json({ importId: importRecord.id })
}
```

#### Edge Function: LinkedIn to Resume Mapper
```typescript
// supabase/functions/map-linkedin-to-resume/index.ts
serve(async (req) => {
  const { importId } = await req.json()
  const supabase = createClient(/* ... */)

  const { data: linkedinImport } = await supabase
    .from('linkedin_imports')
    .select('*')
    .eq('id', importId)
    .single()

  const linkedinData = linkedinImport.linkedin_profile_json

  // Map LinkedIn data to resume JSON format
  const resumeJson = {
    profile: {
      name: linkedinData.fullName,
      headline: linkedinData.headline,
      location: linkedinData.location,
      email: linkedinData.email || '',
      summary: linkedinData.summary || '',
      keywords: linkedinData.skills?.map(s => s.name) || []
    },
    experience: linkedinData.positions?.map(pos => ({
      company: pos.companyName,
      title: pos.title,
      location: pos.location,
      start_date: pos.startDate,
      end_date: pos.endDate || 'Present',
      highlights: pos.description ? [pos.description] : []
    })) || [],
    // ... map other fields
  }

  // Calculate confidence score
  const confidenceScore = calculateMappingConfidence(linkedinData, resumeJson)

  // Update import record
  await supabase
    .from('linkedin_imports')
    .update({
      mapped_to_resume_json: resumeJson,
      confidence_score: confidenceScore,
      import_status: 'completed',
      processed_at: new Date().toISOString()
    })
    .eq('id', importId)

  // Create portfolio from mapped data
  const { data: portfolio } = await supabase
    .from('portfolios')
    .insert({
      user_id: linkedinImport.user_id,
      slug: generateSlug(resumeJson.profile.name),
      resume_json: resumeJson,
      source_type: 'linkedin_pdf',
      status: 'draft'
    })
    .select()
    .single()

  // Link import to portfolio
  await supabase
    .from('linkedin_imports')
    .update({ portfolio_id: portfolio.id })
    .eq('id', importId)

  return new Response(JSON.stringify({ portfolioId: portfolio.id }))
})
```

---

### Epic 3: Your Story Interviewer

#### API Routes
```typescript
// app/api/interview/start/route.ts
export async function POST(request: Request) {
  const supabase = createServerClient()
  const { userId, portfolioId } = await request.json()

  // Create interview call record
  const { data: conversation } = await supabase
    .from('voice_agent_conversations')
    .insert({
      user_id: userId,
      portfolio_id: portfolioId,
      conversation_type: 'interview',
      call_status: 'in_progress',
      started_at: new Date().toISOString()
    })
    .select()
    .single()

  // Create VAPI phone call with interview prompt
  const vapiResponse = await fetch('https://api.vapi.ai/call/phone', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      assistantId: process.env.VAPI_INTERVIEWER_ASSISTANT_ID,
      phoneNumber: '+1234567890', // User's phone
      metadata: { conversationId: conversation.id }
    })
  })

  const vapiCall = await vapiResponse.json()

  // Update with VAPI call ID
  await supabase
    .from('voice_agent_conversations')
    .update({ vapi_call_id: vapiCall.id })
    .eq('id', conversation.id)

  return NextResponse.json({ conversationId: conversation.id })
}

// app/api/interview/webhook/route.ts (VAPI callback)
export async function POST(request: Request) {
  const supabase = createServerClient()
  const webhook = await request.json()

  if (webhook.event === 'call-ended') {
    const { data: conversation } = await supabase
      .from('voice_agent_conversations')
      .select('*')
      .eq('vapi_call_id', webhook.call.id)
      .single()

    // Update conversation with transcript
    await supabase
      .from('voice_agent_conversations')
      .update({
        transcript: webhook.call.transcript,
        duration_seconds: webhook.call.durationSeconds,
        recording_url: webhook.call.recordingUrl,
        call_status: 'completed',
        ended_at: new Date().toISOString()
      })
      .eq('id', conversation.id)

    // Trigger content idea generation
    await supabase.functions.invoke('generate-content-ideas', {
      body: { conversationId: conversation.id }
    })
  }

  return NextResponse.json({ success: true })
}
```

#### Edge Function: Content Idea Generator
```typescript
// supabase/functions/generate-content-ideas/index.ts
serve(async (req) => {
  const { conversationId } = await req.json()
  const supabase = createClient(/* ... */)

  const { data: conversation } = await supabase
    .from('voice_agent_conversations')
    .select('*')
    .eq('id', conversationId)
    .single()

  // Use OpenAI to extract content ideas
  const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `You are a content strategist. Analyze this podcast interview transcript 
                and extract:
                1. Compelling stories (with structure: setup, conflict, resolution)
                2. Content ideas for blog posts, LinkedIn posts, videos
                3. Key themes and messaging angles`
    }, {
      role: 'user',
      content: JSON.stringify(conversation.transcript)
    }],
    response_format: { type: 'json_object' }
  })

  const analysis = JSON.parse(response.choices[0].message.content)

  // Update conversation with generated content
  await supabase
    .from('voice_agent_conversations')
    .update({
      content_ideas: analysis.content_ideas,
      extracted_stories: analysis.stories,
      key_themes: analysis.themes,
      summary: analysis.summary
    })
    .eq('id', conversationId)

  return new Response(JSON.stringify({ success: true }))
})
```

---

### Epic 4: Customize Resume to Job Application

#### API Routes
```typescript
// app/api/job-application/customize/route.ts
export async function POST(request: Request) {
  const supabase = createServerClient()
  const { portfolioId, jobTitle, jobDescription, companyName, jobUrl } = await request.json()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get base portfolio
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('resume_json, experience(*), projects(*)')
    .eq('id', portfolioId)
    .single()

  // Create job application record
  const { data: jobApp } = await supabase
    .from('job_applications')
    .insert({
      user_id: user.id,
      portfolio_id: portfolioId,
      company_name: companyName,
      job_title: jobTitle,
      job_description: jobDescription,
      job_url: jobUrl,
      application_status: 'draft',
      customized_resume_json: portfolio.resume_json // Start with base resume
    })
    .select()
    .single()

  // Trigger AI customization
  await supabase.functions.invoke('customize-resume-for-job', {
    body: { jobApplicationId: jobApp.id }
  })

  return NextResponse.json({ jobApplicationId: jobApp.id })
}
```

#### Edge Function: Resume Customizer
```typescript
// supabase/functions/customize-resume-for-job/index.ts
serve(async (req) => {
  const { jobApplicationId } = await req.json()
  const supabase = createClient(/* ... */)

  const { data: jobApp } = await supabase
    .from('job_applications')
    .select('*, portfolios(*)')
    .eq('id', jobApplicationId)
    .single()

  const baseResume = jobApp.portfolios.resume_json
  const jobDescription = jobApp.job_description

  // Use OpenAI to customize resume
  const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') })
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `You are a professional resume writer. Customize the given resume 
                for the specific job description by:
                1. Identifying and highlighting relevant keywords
                2. Reordering experience to emphasize relevant roles
                3. Enhancing bullet points that match job requirements
                4. Suggesting new skills or achievements to highlight
                
                Return the customized resume in the same JSON format, plus an 
                'ai_suggestions' array with your recommendations.`
    }, {
      role: 'user',
      content: JSON.stringify({
        resume: baseResume,
        job_description: jobDescription,
        job_title: jobApp.job_title
      })
    }],
    response_format: { type: 'json_object' }
  })

  const customization = JSON.parse(response.choices[0].message.content)

  // Update job application
  await supabase
    .from('job_applications')
    .update({
      customized_resume_json: customization.resume,
      ai_suggestions: customization.suggestions,
      keywords_matched: customization.keywords,
      skills_highlighted: customization.skills,
      experience_emphasized: customization.emphasized_roles
    })
    .eq('id', jobApplicationId)

  return new Response(JSON.stringify({ success: true }))
})
```

---

### Epic 5: Write Cover Letters

#### API Routes
```typescript
// app/api/cover-letter/generate/route.ts
export async function POST(request: Request) {
  const supabase = createServerClient()
  const { jobApplicationId, tone } = await request.json()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get job application with customized resume
  const { data: jobApp } = await supabase
    .from('job_applications')
    .select('*')
    .eq('id', jobApplicationId)
    .single()

  // Generate cover letter with OpenAI
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `You are an expert cover letter writer. Write a compelling cover letter 
                with a ${tone} tone that:
                1. Shows genuine interest in the role and company
                2. Highlights 2-3 most relevant achievements from resume
                3. Demonstrates cultural fit
                4. Is concise (300-400 words)
                5. Has a strong opening and clear call-to-action`
    }, {
      role: 'user',
      content: JSON.stringify({
        resume: jobApp.customized_resume_json,
        job_title: jobApp.job_title,
        company_name: jobApp.company_name,
        job_description: jobApp.job_description
      })
    }]
  })

  const coverLetterContent = response.choices[0].message.content

  // Save cover letter
  const { data: coverLetter } = await supabase
    .from('cover_letters')
    .insert({
      user_id: user.id,
      job_application_id: jobApplicationId,
      content: coverLetterContent,
      tone: tone,
      generated_by: 'ai',
      ai_model: 'gpt-4',
      version: 1
    })
    .select()
    .single()

  // Link to job application
  await supabase
    .from('job_applications')
    .update({ cover_letter_id: coverLetter.id })
    .eq('id', jobApplicationId)

  return NextResponse.json({ coverLetterId: coverLetter.id, content: coverLetterContent })
}

// app/api/cover-letter/export/route.ts
export async function POST(request: Request) {
  const { coverLetterId, format } = await request.json() // format: 'pdf' or 'docx'
  
  const supabase = createServerClient()
  
  const { data: coverLetter } = await supabase
    .from('cover_letters')
    .select('*')
    .eq('id', coverLetterId)
    .single()

  // Generate PDF/DOCX (use library like puppeteer or docx)
  const fileBuffer = await generateDocument(coverLetter.content, format)
  
  // Upload to storage
  const fileName = `cover-letters/${coverLetterId}.${format}`
  await supabase.storage
    .from('documents')
    .upload(fileName, fileBuffer)

  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName)

  // Update cover letter record
  await supabase
    .from('cover_letters')
    .update({ [`${format}_url`]: publicUrl })
    .eq('id', coverLetterId)

  return NextResponse.json({ downloadUrl: publicUrl })
}
```

---

## Security & Performance

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_agent_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_files ENABLE ROW LEVEL SECURITY;

-- Users: Can only access their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Portfolios: Users can manage their own, public can view published
CREATE POLICY "Users can manage own portfolios" ON portfolios
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view published portfolios" ON portfolios
  FOR SELECT USING (status = 'published');

-- Experience: Inherits portfolio permissions
CREATE POLICY "Experience follows portfolio permissions" ON experience
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = experience.portfolio_id
      AND (portfolios.status = 'published' OR portfolios.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage own experience" ON experience
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = experience.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

-- Projects: Same as experience
CREATE POLICY "Projects follow portfolio permissions" ON projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = projects.portfolio_id
      AND (portfolios.status = 'published' OR portfolios.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage own projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = projects.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

-- Voice Agent Conversations: Private to user
CREATE POLICY "Users can manage own conversations" ON voice_agent_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Job Applications: Private to user
CREATE POLICY "Users can manage own job applications" ON job_applications
  FOR ALL USING (auth.uid() = user_id);

-- Cover Letters: Private to user
CREATE POLICY "Users can manage own cover letters" ON cover_letters
  FOR ALL USING (auth.uid() = user_id);

-- LinkedIn Imports: Private to user
CREATE POLICY "Users can manage own linkedin imports" ON linkedin_imports
  FOR ALL USING (auth.uid() = user_id);

-- Storage Files: Private to user
CREATE POLICY "Users can manage own files" ON storage_files
  FOR ALL USING (auth.uid() = user_id);

-- Analytics: Allow inserts, restrict reads
CREATE POLICY "Allow analytics inserts" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own analytics" ON analytics_events
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM portfolios 
      WHERE portfolios.id = analytics_events.portfolio_id 
      AND portfolios.user_id = auth.uid()
    )
  );
```

### Database Indexes (Already included in schema above)

### Caching Strategy

```typescript
// lib/cache/portfolio.ts
import { unstable_cache } from 'next/cache'

export const getCachedPortfolio = unstable_cache(
  async (slug: string) => {
    const supabase = createServerClient()
    return await supabase
      .from('portfolios')
      .select('*, experience(*), projects(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
  },
  ['portfolio-by-slug'],
  {
    revalidate: 300, // 5 minutes
    tags: ['portfolios']
  }
)

// Revalidate on update
// In API routes after updating portfolio:
import { revalidateTag } from 'next/cache'
revalidateTag('portfolios')
```

### Storage Buckets

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('resumes', 'resumes', false),
  ('profile-images', 'profile-images', true),
  ('documents', 'documents', false);

-- Storage policies
CREATE POLICY "Users can upload own resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resumes' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can read own resumes"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resumes' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Anyone can view profile images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-images');
```

---

## Testing Strategy

### Unit Tests
```typescript
// __tests__/lib/supabase/portfolio.test.ts
import { createPortfolio, getPortfolioBySlug } from '@/lib/supabase/portfolio'

describe('Portfolio Database Operations', () => {
  it('should create a portfolio', async () => {
    const portfolio = await createPortfolio({
      userId: 'test-user-id',
      slug: 'test-slug',
      resumeJson: mockResumeData
    })
    
    expect(portfolio).toBeDefined()
    expect(portfolio.slug).toBe('test-slug')
  })

  it('should retrieve portfolio by slug', async () => {
    const portfolio = await getPortfolioBySlug('jerel')
    
    expect(portfolio).toBeDefined()
    expect(portfolio.status).toBe('published')
  })
})
```

### Integration Tests
```typescript
// __tests__/api/resume/upload.test.ts
import { POST } from '@/app/api/resume/upload/route'

describe('Resume Upload API', () => {
  it('should upload and process resume', async () => {
    const formData = new FormData()
    formData.append('resume', mockPdfFile)

    const request = new Request('http://localhost:3000/api/resume/upload', {
      method: 'POST',
      body: formData
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.fileId).toBeDefined()
  })
})
```

### E2E Tests (Playwright)
```typescript
// e2e/portfolio-creation.spec.ts
import { test, expect } from '@playwright/test'

test('complete portfolio creation flow', async ({ page }) => {
  // 1. Upload resume
  await page.goto('/')
  await page.setInputFiles('input[type="file"]', 'tests/fixtures/sample-resume.pdf')
  await page.click('button:has-text("Create My Portfolio")')

  // 2. Configure voice agent
  await expect(page).toHaveURL(/\/voice-agent/)
  await page.click('button:has-text("Friendly & approachable")')
  // ... select all personality options
  await page.click('button:has-text("Continue to Templates")')

  // 3. Select template
  await expect(page).toHaveURL(/\/template-selection/)
  await page.click('[data-template="professional"]')

  // 4. View portfolio
  await expect(page).toHaveURL(/\/[a-z0-9-]+/)
  await expect(page.locator('h1')).toContainText('John Doe')
})
```

---

## Implementation Timeline

### Week 1: Foundation
- [ ] Day 1-2: Supabase setup, schema creation, RLS policies
- [ ] Day 3-4: Migrate Jerel's portfolio data, update `/jerel` page
- [ ] Day 5: Create Supabase client utilities and TypeScript types

### Week 2: Core APIs
- [ ] Day 1-2: Resume upload API and processing edge function
- [ ] Day 3-4: Voice agent creation API
- [ ] Day 5: Dynamic portfolio routes (`/[slug]`)

### Week 3: Epic 2 (LinkedIn)
- [ ] Day 1-2: LinkedIn import API and Apify integration
- [ ] Day 3-4: LinkedIn-to-resume mapping edge function
- [ ] Day 5: Testing and refinement

### Week 4: Epic 3 (Interviewer)
- [ ] Day 1-2: Interview conversation API and VAPI integration
- [ ] Day 3-4: Content idea generation edge function
- [ ] Day 5: Interview UI components

### Week 5: Epic 4 (Resume Customization)
- [ ] Day 1-2: Job application creation API
- [ ] Day 3-4: Resume customization edge function
- [ ] Day 5: Comparison UI (original vs customized)

### Week 6: Epic 5 (Cover Letters)
- [ ] Day 1-2: Cover letter generation API
- [ ] Day 3-4: PDF/DOCX export functionality
- [ ] Day 5: Cover letter editor UI

### Week 7: Polish & Launch
- [ ] Day 1-2: Security audit, performance optimization
- [ ] Day 3-4: E2E testing, bug fixes
- [ ] Day 5: Deploy to production

---

## Monitoring & Analytics

### Key Metrics to Track
```sql
-- Dashboard queries

-- User growth
SELECT DATE(created_at) as date, COUNT(*) as new_users
FROM users
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Portfolio creation rate
SELECT 
  source_type,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'published') as published
FROM portfolios
GROUP BY source_type;

-- Voice agent usage
SELECT 
  conversation_type,
  COUNT(*) as total_calls,
  AVG(duration_seconds) as avg_duration,
  COUNT(*) FILTER (WHERE call_status = 'completed') as completed_calls
FROM voice_agent_conversations
GROUP BY conversation_type;

-- Job application pipeline
SELECT 
  application_status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM job_applications
GROUP BY application_status
ORDER BY count DESC;

-- Top portfolios by views
SELECT 
  p.slug,
  p.resume_json->>'profile'->>'name' as name,
  COUNT(ae.id) as total_views
FROM portfolios p
LEFT JOIN analytics_events ae ON ae.portfolio_id = p.id
WHERE ae.event_type = 'portfolio_viewed'
GROUP BY p.id
ORDER BY total_views DESC
LIMIT 10;
```

### Alerting (Supabase + Upstash)
```typescript
// lib/monitoring/alerts.ts
import { Redis } from '@upstash/redis'

export async function checkSystemHealth() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN
  })

  // Check processing queue length
  const queueLength = await redis.llen('resume-processing-queue')
  if (queueLength > 50) {
    await sendSlackAlert(`⚠️ Processing queue backed up: ${queueLength} items`)
  }

  // Check failed jobs
  const supabase = createServerClient()
  const { count } = await supabase
    .from('storage_files')
    .select('*', { count: 'exact', head: true })
    .eq('processing_status', 'failed')

  if (count && count > 10) {
    await sendSlackAlert(`❌ ${count} failed resume processing jobs`)
  }
}
```

---

## Backup & Disaster Recovery

### Daily Backups
```bash
# Setup automated daily backups (via Supabase dashboard or CLI)
supabase db dump --db-url $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Upload to S3
aws s3 cp backup-$(date +%Y%m%d).sql s3://portfolio-agents-backups/
```

### Point-in-Time Recovery
Supabase Pro plan includes automatic point-in-time recovery up to 7 days.

---

## Cost Estimation

### Supabase (Pro Plan - $25/month)
- 8 GB database
- 100 GB bandwidth
- 100 GB file storage
- Sufficient for ~10,000 portfolios

### OpenAI API
- Resume parsing: ~$0.01 per resume (GPT-4V)
- Voice agent creation: ~$0.005 per agent (GPT-4)
- Content ideas: ~$0.02 per interview (GPT-4)
- Cover letters: ~$0.01 per letter (GPT-4)

**Estimated cost per user:** $0.05 - $0.10

### VAPI
- $0.06 per minute for voice calls
- Average 10-minute interview: $0.60

### Apify (LinkedIn scraping)
- ~$0.10 per profile

**Total monthly cost (1,000 active users):**
- Supabase: $25
- OpenAI: ~$50-100
- VAPI: ~$600 (100 interviews)
- Apify: ~$100 (1,000 imports)
**Total: ~$775 - $825/month**

---

## Next Steps

1. **Review & Approval:** Share this plan with stakeholders
2. **Setup Supabase:** Create project, configure environment
3. **Run Migration:** Execute SQL schema and data migration script
4. **Update Code:** Refactor components to use Supabase
5. **Test:** Verify all functionality works with real database
6. **Deploy:** Push to production with monitoring

---

## Appendix

### Useful SQL Queries

#### Find duplicate slugs
```sql
SELECT slug, COUNT(*) 
FROM portfolios 
GROUP BY slug 
HAVING COUNT(*) > 1;
```

#### Cleanup orphaned records
```sql
DELETE FROM experience 
WHERE portfolio_id NOT IN (SELECT id FROM portfolios);
```

#### Bulk update portfolio status
```sql
UPDATE portfolios 
SET status = 'archived' 
WHERE updated_at < NOW() - INTERVAL '6 months';
```

### TypeScript Type Definitions
```typescript
// types/database.ts
export interface Database {
  public: {
    Tables: {
      portfolios: {
        Row: {
          id: string
          user_id: string
          slug: string
          resume_json: ResumeJSON
          source_type: 'pdf_resume' | 'linkedin_pdf' | 'manual'
          vapi_assistant_id: string | null
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Row, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Insert>
      }
      // ... other tables
    }
  }
}
```

---

**Document Version:** 1.0  
**Last Updated:** October 4, 2025  
**Maintained by:** Portfolio Agents Team
