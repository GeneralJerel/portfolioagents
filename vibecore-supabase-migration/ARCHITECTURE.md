# Portfolio Agents - System Architecture

**Last Updated:** October 4, 2025  
**Status:** Planning Phase

---

## System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         Portfolio Agents Platform                     │
│                                                                       │
│  Epic 1: Resume → Portfolio                                          │
│  Epic 2: LinkedIn → Portfolio                                        │
│  Epic 3: Story Interviewer                                           │
│  Epic 4: Resume Customizer                                           │
│  Epic 5: Cover Letter Generator                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## High-Level Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │────────▶│   Next.js    │────────▶│  Supabase   │
│             │         │   Frontend   │         │  Database   │
│   Client    │         │  + API Routes│         │  + Storage  │
└─────────────┘         └──────────────┘         └─────────────┘
                               │                        │
                               │                        │
                               ▼                        ▼
                        ┌─────────────┐         ┌─────────────┐
                        │   OpenAI    │         │ Edge Funcs  │
                        │     API     │         │  (Deno)     │
                        └─────────────┘         └─────────────┘
                               │                        │
                               │                        │
                               ▼                        ▼
                        ┌─────────────┐         ┌─────────────┐
                        │    VAPI     │         │   Apify     │
                        │ Voice Agent │         │  LinkedIn   │
                        └─────────────┘         └─────────────┘
```

---

## Data Flow - Epic 1: Resume PDF to Portfolio

```
┌─────────────────────────────────────────────────────────────────────┐
│ Step 1: Upload Resume PDF                                           │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ User drops PDF
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ ResumeDropZone Component                                            │
│ - Validates file (PDF, DOCX, DOC)                                  │
│ - Uploads to Supabase Storage                                       │
│ - Creates storage_files record                                      │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ POST /api/resume/upload
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Supabase Storage: resumes bucket                                    │
│ - File stored at: user_id/nanoid-filename.pdf                      │
│ - Returns public URL                                                 │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Triggers Edge Function
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Edge Function: process-resume                                       │
│ 1. Download PDF from storage                                        │
│ 2. Convert PDF to base64 image                                      │
│ 3. Call OpenAI Vision API                                           │
│ 4. Parse structured JSON                                            │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Parsed Resume JSON
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Database Operations                                                  │
│ 1. INSERT INTO portfolios (resume_json, status='draft')            │
│ 2. INSERT INTO experience (for each job)                            │
│ 3. INSERT INTO projects (for each project)                          │
│ 4. UPDATE storage_files (status='completed')                        │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Portfolio created
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Step 2: Configure Voice Agent                                       │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Navigate to /voice-agent
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ VoiceAgentPage Component                                            │
│ - Collect personality preferences:                                  │
│   • Act as (me/assistant)                                           │
│   • Warmth (friendly/balanced/reserved)                             │
│   • Energy (calm/neutral/energetic)                                 │
│   • Confidence (humble/balanced/assertive)                          │
│   • Clarity (conversational/clear/polished)                         │
│   • Empathy (high/balanced/low)                                     │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ POST /api/voice-agent/create
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Voice Agent Creation                                                 │
│ 1. Build RICE prompt from resume + preferences                      │
│ 2. Call VAPI API to create assistant                                │
│ 3. Store vapi_assistant_id in portfolio                             │
│ 4. Store voice_config in portfolio                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Agent created
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Step 3: Publish Portfolio                                           │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Select template
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ UPDATE portfolios                                                    │
│ - status = 'published'                                               │
│ - template_type = 'professional'                                     │
│ - published_at = NOW()                                               │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Portfolio live!
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Public Portfolio Page: /[slug]                                      │
│ - Fetches portfolio + experience + projects from Supabase           │
│ - Renders based on template_type                                    │
│ - Embeds VAPI widget with assistant_id                              │
│ - Tracks view in analytics_events                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Epic 2: LinkedIn Import

```
┌─────────────────────────────────────────────────────────────────────┐
│ User enters LinkedIn URL                                            │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ POST /api/linkedin/import                                           │
│ - Call Apify LinkedIn scraper                                       │
│ - Store raw data in linkedin_imports                                │
│ - Status: 'processing'                                               │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Triggers Edge Function
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Edge Function: map-linkedin-to-resume                               │
│                                                                      │
│ LinkedIn JSON                Resume JSON                            │
│ ─────────────────────────────────────────                           │
│ fullName              →      profile.name                           │
│ headline              →      profile.headline                       │
│ location              →      profile.location                       │
│ summary               →      profile.summary                        │
│ skills[]              →      skills[]                               │
│ positions[]           →      experience[]                           │
│ education[]           →      education[]                            │
│ projects[]            →      projects[]                             │
│                                                                      │
│ Calculate confidence_score (0.00 - 1.00)                            │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Mapped resume JSON
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Create Portfolio from LinkedIn Data                                 │
│ - Same structure as Epic 1                                          │
│ - source_type = 'linkedin_pdf'                                      │
│ - Link import record to portfolio                                   │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ User reviews and edits
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Continue to voice agent configuration                               │
│ (Same as Epic 1, Step 2)                                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Epic 3: Story Interviewer

```
┌─────────────────────────────────────────────────────────────────────┐
│ User starts interview                                               │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ POST /api/interview/start
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Create voice_agent_conversations record                             │
│ - conversation_type = 'interview'                                   │
│ - call_status = 'in_progress'                                       │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Call VAPI API
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ VAPI Phone Call                                                     │
│ - AI asks podcast-style questions:                                  │
│   • "Tell me about your proudest achievement"                       │
│   • "What's a challenge you overcame?"                              │
│   • "How do you approach problem-solving?"                          │
│   • "What drives you professionally?"                               │
│ - Records full conversation                                         │
│ - Generates transcript                                              │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Call ends
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ VAPI Webhook: POST /api/interview/webhook                          │
│ - Receives call metadata                                            │
│ - Receives full transcript                                          │
│ - Updates conversation record                                       │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Triggers Edge Function
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Edge Function: generate-content-ideas                               │
│                                                                      │
│ Analyzes transcript and extracts:                                   │
│                                                                      │
│ 1. STORIES (Setup → Conflict → Resolution)                          │
│    Example: "At GoTeam, when applicant volume                       │
│    tripled, I built an AI screening tool that                       │
│    processed 15k interviews and saved 428k minutes"                 │
│                                                                      │
│ 2. CONTENT IDEAS                                                     │
│    - Blog: "How I Reduced Hiring Time by 60%"                       │
│    - LinkedIn: "3 lessons from processing 61k applicants"           │
│    - Video: "Building an AI hiring platform in 90 days"             │
│                                                                      │
│ 3. KEY THEMES                                                        │
│    - Data-driven decision making                                    │
│    - Rapid prototyping                                              │
│    - Cross-functional leadership                                    │
│                                                                      │
│ 4. SUMMARY                                                           │
│    One-paragraph overview of interview highlights                   │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Analysis complete
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Content Ideas Dashboard                                             │
│ - Display extracted stories                                         │
│ - Show content ideas by format                                      │
│ - Tag themes                                                         │
│ - One-click "Add to Portfolio" buttons                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Epic 4: Resume Customization

```
┌─────────────────────────────────────────────────────────────────────┐
│ User creates job application                                        │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Paste job description
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ POST /api/job-application/create                                   │
│ - company_name: "Acme Corp"                                         │
│ - job_title: "Senior Product Manager"                              │
│ - job_description: "Looking for PM with AI experience..."          │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Create job_applications record
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Edge Function: customize-resume-for-job                             │
│                                                                      │
│ OpenAI Prompt:                                                      │
│ "Given this resume and job description, customize the resume by:   │
│  1. Identifying matching keywords                                   │
│  2. Reordering experience to emphasize relevant roles              │
│  3. Enhancing bullet points that align with requirements           │
│  4. Highlighting applicable skills                                  │
│  5. Tailoring summary statement"                                    │
│                                                                      │
│ Input:                                                               │
│ - Base resume JSON                                                   │
│ - Job description                                                    │
│ - Job title                                                          │
│                                                                      │
│ Output:                                                              │
│ - Customized resume JSON                                             │
│ - AI suggestions array                                               │
│ - Keywords matched                                                   │
│ - Skills to highlight                                                │
│ - Experience roles emphasized                                        │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Customization complete
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Comparison View                                                      │
│                                                                      │
│  Original Resume          │          Customized Resume              │
│  ─────────────────────────┼─────────────────────────────           │
│  Generic summary          │  Tailored to AI Product role           │
│  All 9 experiences        │  Top 5 relevant roles first            │
│  Standard bullets         │  Enhanced with keywords                 │
│  50 skills listed         │  20 most relevant highlighted           │
│                                                                      │
│  ✨ Keyword Matches: 18/25                                          │
│  📊 Relevance Score: 87%                                            │
│                                                                      │
│  [ Accept Changes ]  [ Revert ]  [ Edit Manually ]                 │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ User accepts
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Save customized resume to job_applications.customized_resume_json  │
│ Generate PDF export                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Epic 5: Cover Letter Generation

```
┌─────────────────────────────────────────────────────────────────────┐
│ From job application page                                           │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Click "Generate Cover Letter"
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Select tone: Professional / Casual / Enthusiastic / Formal         │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ POST /api/cover-letter/generate
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ OpenAI GPT-4 Generation                                             │
│                                                                      │
│ System Prompt:                                                       │
│ "You are an expert cover letter writer. Write a compelling cover   │
│  letter with a [TONE] tone that:                                    │
│  1. Shows genuine interest in the role                              │
│  2. Highlights 2-3 most relevant achievements                       │
│  3. Demonstrates cultural fit                                        │
│  4. Is concise (300-400 words)                                      │
│  5. Has strong opening and clear CTA"                               │
│                                                                      │
│ User Context:                                                        │
│ - Customized resume for this job                                    │
│ - Job title & company                                               │
│ - Job description                                                    │
│                                                                      │
│ Output:                                                              │
│ "Dear Hiring Manager,                                               │
│                                                                      │
│  I'm excited to apply for the Senior Product Manager role at       │
│  Acme Corp. With 9 years building AI-native products...            │
│                                                                      │
│  At GoTeam, I built an AI hiring platform that reduced hiring      │
│  turnaround from 45 to 18 days while processing 61k applicants.    │
│                                                                      │
│  I'm particularly drawn to Acme's mission to democratize AI         │
│  tools for small businesses...                                      │
│                                                                      │
│  I'd love to discuss how my experience in AI product strategy       │
│  and rapid prototyping can contribute to Acme's growth.             │
│                                                                      │
│  Best regards,                                                       │
│  [Name]"                                                             │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Generated content
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Cover Letter Editor                                                  │
│ - Rich text editor                                                   │
│ - Real-time word count                                               │
│ - Regenerate button                                                  │
│ - Tone adjuster                                                      │
│ - Save as draft / Mark as final                                     │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ User marks as final
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Export Cover Letter                                                  │
│ - POST /api/cover-letter/export                                     │
│ - Generate PDF (Puppeteer)                                          │
│ - Generate DOCX (docx library)                                      │
│ - Upload to Supabase Storage                                        │
│ - Link files to cover_letters record                                │
└─────────────────────────────────────────────────────────────────────┘
    │
    │ Files ready
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ [ Download PDF ]  [ Download DOCX ]  [ Copy Text ]                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema Diagram

```
┌──────────────┐
│    users     │
│──────────────│
│ id (PK)      │───┐
│ email        │   │
│ full_name    │   │
│ created_at   │   │
└──────────────┘   │
                   │
                   │ user_id
                   │
    ┌──────────────▼──────────────────────────┐
    │          portfolios                      │
    │──────────────────────────────────────────│
    │ id (PK)                                  │──┐
    │ user_id (FK)                             │  │
    │ slug (UNIQUE)                            │  │
    │ resume_json (JSONB) ◄── Main data        │  │
    │ source_type                              │  │
    │ vapi_assistant_id                        │  │
    │ voice_config (JSONB)                     │  │
    │ template_type                            │  │
    │ status                                   │  │
    └──────────────────────────────────────────┘  │
                   │                               │
                   │ portfolio_id                  │
                   │                               │
         ┌─────────┴─────────┐                    │
         │                   │                     │
         ▼                   ▼                     │
┌─────────────────┐  ┌──────────────┐             │
│   experience    │  │   projects   │             │
│─────────────────│  │──────────────│             │
│ id (PK)         │  │ id (PK)      │             │
│ portfolio_id(FK)│  │ portfolio_id │             │
│ company         │  │ name         │             │
│ title           │  │ role         │             │
│ location        │  │ summary      │             │
│ start_date      │  │ impact       │             │
│ end_date        │  │ links (JSONB)│             │
│ highlights(JSON)│  │ tags (JSONB) │             │
└─────────────────┘  └──────────────┘             │
                                                   │
                                                   │ portfolio_id
                                                   │
    ┌──────────────────────────────────────────────┤
    │                                              │
    ▼                                              │
┌───────────────────────────┐                     │
│ voice_agent_conversations │ (Epic 3)            │
│───────────────────────────│                     │
│ id (PK)                   │                     │
│ user_id (FK)              │                     │
│ portfolio_id (FK)         │                     │
│ vapi_call_id              │                     │
│ transcript (JSONB)        │                     │
│ content_ideas (JSONB)     │                     │
│ extracted_stories (JSONB) │                     │
└───────────────────────────┘                     │
                                                   │
    ┌──────────────────────────────────────────────┤
    │                                              │
    ▼                                              │
┌───────────────────────┐                         │
│  job_applications     │ (Epic 4)                │
│───────────────────────│                         │
│ id (PK)               │──┐                      │
│ user_id (FK)          │  │                      │
│ portfolio_id (FK)     │  │                      │
│ company_name          │  │                      │
│ job_title             │  │                      │
│ job_description       │  │                      │
│ customized_resume_json│  │                      │
│ ai_suggestions (JSONB)│  │                      │
│ keywords_matched(JSON)│  │                      │
│ application_status    │  │                      │
└───────────────────────┘  │                      │
                           │ job_application_id   │
                           │                      │
                           ▼                      │
                  ┌─────────────────┐             │
                  │ cover_letters   │ (Epic 5)    │
                  │─────────────────│             │
                  │ id (PK)         │             │
                  │ user_id (FK)    │             │
                  │ job_app_id (FK) │             │
                  │ content (TEXT)  │             │
                  │ tone            │             │
                  │ pdf_url         │             │
                  │ docx_url        │             │
                  └─────────────────┘             │
                                                   │
    ┌──────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────┐
│ linkedin_imports    │ (Epic 2)
│─────────────────────│
│ id (PK)             │
│ user_id (FK)        │
│ portfolio_id (FK)   │
│ apify_run_id        │
│ linkedin_profile(JS)│
│ mapped_to_resume(JS)│
│ confidence_score    │
└─────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui (Radix UI primitives)
- **State:** React hooks + Server Components
- **Forms:** React Hook Form + Zod validation

### Backend
- **Database:** Supabase (PostgreSQL 15)
- **Storage:** Supabase Storage (S3-compatible)
- **Auth:** Supabase Auth (JWT-based)
- **API:** Next.js API Routes + Edge Functions
- **Edge Runtime:** Supabase Edge Functions (Deno)

### AI Services
- **LLM:** OpenAI GPT-4 / GPT-4 Vision
- **Voice:** VAPI.ai (real-time voice agents)
- **Scraping:** Apify (LinkedIn data extraction)

### DevOps
- **Hosting:** Vercel (Frontend + API)
- **Database:** Supabase Cloud
- **Monitoring:** Supabase Analytics + Vercel Analytics
- **Errors:** Sentry (optional)
- **CI/CD:** GitHub Actions → Vercel

---

## Security Architecture

### Authentication Flow
```
1. User signs up/logs in → Supabase Auth
2. JWT token stored in httpOnly cookie
3. Next.js middleware validates token
4. RLS policies enforce data access
```

### Row Level Security (RLS)
```sql
-- Users can only see their own data
CREATE POLICY "Own data only" ON portfolios
  FOR ALL USING (auth.uid() = user_id);

-- Anyone can view published portfolios
CREATE POLICY "Public portfolios" ON portfolios
  FOR SELECT USING (status = 'published');

-- Cascading permissions
CREATE POLICY "Experience visibility" ON experience
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = experience.portfolio_id
      AND (portfolios.status = 'published' OR portfolios.user_id = auth.uid())
    )
  );
```

### API Security
- Rate limiting on all endpoints
- CSRF protection
- Input validation (Zod schemas)
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized inputs)

---

## Performance Strategy

### Caching
- **Static:** Portfolio pages cached for 5 minutes
- **Dynamic:** User dashboards always fresh
- **Images:** CDN-cached profile images
- **API:** Redis cache for frequently accessed data

### Database Optimization
- Indexes on all foreign keys
- JSONB indexes for resume search
- Connection pooling for serverless
- Query optimization (EXPLAIN ANALYZE)

### Code Splitting
- Route-based splitting (automatic in Next.js)
- Component lazy loading
- Image optimization (Next.js Image)

---

## Monitoring & Observability

### Metrics to Track
```
┌────────────────────────────────────────────────┐
│ BUSINESS METRICS                               │
├────────────────────────────────────────────────┤
│ • Total users                                  │
│ • Portfolios created (by source type)         │
│ • Published portfolios                         │
│ • Voice agent calls (count, duration)         │
│ • Job applications tracked                     │
│ • Cover letters generated                      │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ TECHNICAL METRICS                              │
├────────────────────────────────────────────────┤
│ • API response times (p50, p95, p99)          │
│ • Database query times                         │
│ • Resume processing success rate               │
│ • Error rates by endpoint                      │
│ • Uptime percentage                            │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ USER EXPERIENCE                                │
├────────────────────────────────────────────────┤
│ • Page load times                              │
│ • Time to first portfolio                      │
│ • Completion rate (upload → publish)          │
│ • Bounce rate on portfolios                    │
│ • Return user rate                             │
└────────────────────────────────────────────────┘
```

---

## Cost Breakdown

### Fixed Costs (Monthly)
- Supabase Pro: $25
- Vercel Pro: $20 (optional)
- Domain: $12/year (~$1/month)
**Total: ~$46/month**

### Variable Costs (Per User)
- OpenAI API: $0.05-0.10
- VAPI calls: $0.60 per 10-min interview
- Apify LinkedIn: $0.10 per profile
**Per User: $0.05 - $0.80**

### Break-even Analysis
```
1,000 users/month
- Fixed: $46
- Variable: $50-800 (depends on feature usage)
Total: $96-846/month

Pricing Strategy:
- Free: Resume → Portfolio only
- Pro ($9.99/mo): + LinkedIn import + 2 interviews
- Premium ($24.99/mo): + Unlimited interviews + Job tracker

Break-even: ~10 Pro users or 2 Premium users
```

---

## Disaster Recovery

### Backup Strategy
- **Database:** Daily automated backups (Supabase)
- **Point-in-time recovery:** 7 days (Supabase Pro)
- **Storage:** Versioned files in S3
- **Code:** Git repository

### Recovery Procedures
1. Database corruption → Restore from backup (< 1 hour)
2. Supabase outage → Wait (99.9% SLA) or migrate to self-hosted
3. Vercel outage → Deploy to alternative platform (Netlify, AWS)
4. Data loss → Point-in-time recovery

---

**Next:** See [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) for step-by-step tasks.
