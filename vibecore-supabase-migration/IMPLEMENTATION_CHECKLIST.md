# Supabase Migration Implementation Checklist

**Project:** Portfolio Agents  
**Branch:** add-supabase  
**Started:** October 4, 2025

---

## Phase 1: Foundation Setup ⏳

### Week 1: Database & Infrastructure

#### Day 1-2: Supabase Project Setup
- [ ] Create Supabase project at [supabase.com](https://supabase.com)
- [ ] Copy project URL and keys
- [ ] Create `.env.local` file with credentials
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  ```
- [ ] Install dependencies
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
  ```
- [ ] Create Supabase client utilities
  - [ ] `/lib/supabase/client.ts` (client-side)
  - [ ] `/lib/supabase/server.ts` (server-side)

#### Day 2-3: Database Schema Creation
- [ ] Open Supabase SQL Editor
- [ ] Create core tables:
  - [ ] `users`
  - [ ] `portfolios`
  - [ ] `experience`
  - [ ] `projects`
  - [ ] `voice_agent_conversations` (Epic 3)
  - [ ] `job_applications` (Epic 4)
  - [ ] `cover_letters` (Epic 5)
  - [ ] `linkedin_imports` (Epic 2)
  - [ ] `storage_files`
  - [ ] `analytics_events`
- [ ] Create indexes on all tables
- [ ] Enable Row Level Security (RLS) on all tables
- [ ] Create RLS policies:
  - [ ] Users can view/update own data
  - [ ] Public can view published portfolios
  - [ ] Experience/Projects inherit portfolio permissions
  - [ ] Private data (conversations, applications) restricted to owner

#### Day 3-4: Storage Setup
- [ ] Create storage buckets:
  - [ ] `resumes` (private)
  - [ ] `profile-images` (public)
  - [ ] `documents` (private)
- [ ] Set up storage policies
- [ ] Test file upload/download

#### Day 4-5: Data Migration
- [ ] Generate TypeScript types from schema
  ```bash
  npx supabase gen types typescript --project-id xxx > types/supabase.ts
  ```
- [ ] Create migration script `/scripts/migrate-jerel.ts`
- [ ] Migrate Jerel's data:
  - [ ] Create user record
  - [ ] Create portfolio record
  - [ ] Migrate experience entries (9 companies)
  - [ ] Migrate projects (3 projects)
  - [ ] Migrate skills, awards, education
- [ ] Run migration script
- [ ] Verify data in Supabase dashboard

---

## Phase 2: Epic 1 - Resume PDF to Portfolio ✅

### Week 2: Core Features

#### Day 1-2: Resume Upload
- [ ] Create API route `/api/resume/upload/route.ts`
- [ ] Implement file validation (PDF, DOCX, DOC)
- [ ] Upload to Supabase Storage
- [ ] Create `storage_files` record
- [ ] Return upload confirmation to client

#### Day 2-3: Resume Processing
- [ ] Create Edge Function `process-resume`
- [ ] Integrate OpenAI API for PDF parsing
- [ ] Map parsed data to resume JSON schema
- [ ] Create `portfolios` record
- [ ] Normalize data into `experience` and `projects` tables
- [ ] Update `storage_files` status (processing → completed)

#### Day 3-4: Voice Agent Creation
- [ ] Create API route `/api/voice-agent/create/route.ts`
- [ ] Build voice agent prompt from resume JSON
- [ ] Integrate VAPI API
- [ ] Create VAPI assistant
- [ ] Store `vapi_assistant_id` in portfolio
- [ ] Store `voice_config` preferences

#### Day 4-5: Dynamic Portfolio Routes
- [ ] Create `/app/[slug]/page.tsx`
- [ ] Fetch portfolio by slug from Supabase
- [ ] Implement generateMetadata for SEO
- [ ] Create template components:
  - [ ] `ProfessionalTemplate`
  - [ ] `CreativeTemplate`
  - [ ] `ExecutiveTemplate`
- [ ] Render based on `template_type`
- [ ] Add VAPI widget with dynamic `assistant_id`
- [ ] Track page views in `analytics_events`

#### Day 5: Refactor Existing Pages
- [ ] Update `/app/jerel/page.tsx` to use Supabase
- [ ] Replace hardcoded data with database queries
- [ ] Test all sections (Hero, Experience, Projects, Skills, Contact)
- [ ] Verify VAPI widget still works

---

## Phase 3: Epic 2 - LinkedIn Import 🔄

### Week 3: LinkedIn Integration

#### Day 1-2: LinkedIn Import API
- [ ] Sign up for Apify account
- [ ] Get Apify API token
- [ ] Add to `.env.local`: `APIFY_API_TOKEN=`
- [ ] Install Apify client: `npm install apify-client`
- [ ] Create API route `/api/linkedin/import/route.ts`
- [ ] Implement Apify LinkedIn scraper call
- [ ] Store result in `linkedin_imports` table
- [ ] Return import ID to client

#### Day 2-3: LinkedIn Mapper Edge Function
- [ ] Create Edge Function `map-linkedin-to-resume`
- [ ] Map LinkedIn profile fields to resume JSON:
  - [ ] Profile (name, headline, location, summary)
  - [ ] Experience (positions → experience entries)
  - [ ] Education
  - [ ] Skills
  - [ ] Projects/Publications
- [ ] Calculate confidence score
- [ ] Create portfolio from mapped data
- [ ] Link import to portfolio

#### Day 3-4: LinkedIn Import UI
- [ ] Create `/app/import/linkedin/page.tsx`
- [ ] LinkedIn URL input form
- [ ] Progress indicator
- [ ] Review mapped data step
- [ ] Edit/correct fields
- [ ] Approve and create portfolio button

#### Day 4-5: Testing & Polish
- [ ] Test with 5+ different LinkedIn profiles
- [ ] Handle edge cases (incomplete profiles, private data)
- [ ] Add error handling
- [ ] Create feedback mechanism for mapping accuracy

---

## Phase 4: Epic 3 - Story Interviewer 🔄

### Week 4: Interview Feature

#### Day 1-2: Interview API
- [ ] Create interview assistant in VAPI
- [ ] Design interview questions (podcast-style)
- [ ] Create API route `/api/interview/start/route.ts`
- [ ] Create `voice_agent_conversations` record
- [ ] Initiate VAPI phone call
- [ ] Create webhook route `/api/interview/webhook/route.ts`
- [ ] Handle call-ended event
- [ ] Store transcript

#### Day 2-3: Content Idea Generator
- [ ] Create Edge Function `generate-content-ideas`
- [ ] Use OpenAI to analyze transcript
- [ ] Extract compelling stories (setup, conflict, resolution)
- [ ] Generate content ideas:
  - [ ] Blog post topics
  - [ ] LinkedIn post ideas
  - [ ] Video script concepts
- [ ] Identify key themes and messaging angles
- [ ] Generate summary
- [ ] Store in `voice_agent_conversations` table

#### Day 3-4: Interview UI
- [ ] Create `/app/interview/page.tsx`
- [ ] Phone number input
- [ ] Start interview button
- [ ] In-progress indicator
- [ ] Transcript viewer (after completion)
- [ ] Content ideas dashboard:
  - [ ] Stories list
  - [ ] Content ideas cards
  - [ ] Theme tags
  - [ ] Export to portfolio button

#### Day 4-5: Content Integration
- [ ] Add "Import from Interview" button to portfolio editor
- [ ] Select stories to add to experience highlights
- [ ] One-click add story to projects
- [ ] Generate project descriptions from interview content

---

## Phase 5: Epic 4 - Resume Customization 🔄

### Week 5: Job Application Customization

#### Day 1-2: Job Application API
- [ ] Create API route `/api/job-application/create/route.ts`
- [ ] Job details form (company, title, description, URL)
- [ ] Create `job_applications` record
- [ ] Copy base resume as starting point
- [ ] Create Edge Function `customize-resume-for-job`
- [ ] Use OpenAI to customize resume:
  - [ ] Extract keywords from job description
  - [ ] Reorder experience by relevance
  - [ ] Enhance matching bullet points
  - [ ] Add/emphasize relevant skills
  - [ ] Generate tailored summary
- [ ] Store customization in `job_applications`

#### Day 2-3: Customization UI
- [ ] Create `/app/job-application/new/page.tsx`
- [ ] Job details form
- [ ] Portfolio selector (if user has multiple)
- [ ] Submit and process indicator
- [ ] Redirect to comparison view

#### Day 3-4: Comparison View
- [ ] Create `/app/job-application/[id]/page.tsx`
- [ ] Side-by-side comparison:
  - [ ] Original resume (left)
  - [ ] Customized resume (right)
  - [ ] Highlighted changes
- [ ] Keyword match indicator
- [ ] Relevance score
- [ ] Accept changes / Revert options
- [ ] Manual edit mode

#### Day 4-5: Application Tracker
- [ ] Create `/app/applications/page.tsx`
- [ ] List all job applications
- [ ] Status badges (draft, applied, interview, offer, rejected)
- [ ] Filter by status
- [ ] Quick actions (view, edit, delete)
- [ ] Export customized resume PDF

---

## Phase 6: Epic 5 - Cover Letters 🔄

### Week 6: Cover Letter Generation

#### Day 1-2: Cover Letter API
- [ ] Create API route `/api/cover-letter/generate/route.ts`
- [ ] Tone selector (professional, casual, enthusiastic, formal)
- [ ] Use OpenAI to generate cover letter:
  - [ ] 300-400 words
  - [ ] Compelling opening
  - [ ] 2-3 relevant achievements
  - [ ] Show cultural fit
  - [ ] Strong closing with CTA
- [ ] Store in `cover_letters` table
- [ ] Link to `job_applications`

#### Day 2-3: Cover Letter Editor
- [ ] Create `/app/cover-letter/[id]/page.tsx`
- [ ] Rich text editor (Tiptap or similar)
- [ ] Real-time word count
- [ ] Tone adjuster
- [ ] Save versions
- [ ] Mark as final button

#### Day 3-4: Export Functionality
- [ ] Install: `npm install puppeteer docx`
- [ ] Create API route `/api/cover-letter/export/route.ts`
- [ ] PDF export (using Puppeteer)
- [ ] DOCX export (using docx library)
- [ ] Upload to Supabase Storage
- [ ] Return download URL
- [ ] Add to job application record

#### Day 4-5: Templates & Presets
- [ ] Create 3-5 cover letter templates
- [ ] Industry-specific presets (tech, finance, creative, etc.)
- [ ] Template selector in generation flow
- [ ] Preview before applying

---

## Phase 7: Polish & Launch 🚀

### Week 7: Production Readiness

#### Day 1-2: Security Audit
- [ ] Review all RLS policies
- [ ] Test with multiple users
- [ ] Verify file upload restrictions
- [ ] Check API rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Audit environment variables

#### Day 2-3: Performance Optimization
- [ ] Enable Next.js caching for portfolios
- [ ] Add database indexes where missing
- [ ] Optimize JSONB queries
- [ ] Implement connection pooling
- [ ] Add CDN for static assets
- [ ] Lazy load images
- [ ] Code split large components

#### Day 3-4: Testing
- [ ] Write unit tests for API routes
- [ ] Integration tests for database operations
- [ ] E2E tests with Playwright:
  - [ ] Full portfolio creation flow
  - [ ] LinkedIn import flow
  - [ ] Interview flow
  - [ ] Job application flow
  - [ ] Cover letter generation flow
- [ ] Load testing (simulate 100+ concurrent users)
- [ ] Test on mobile devices

#### Day 4-5: Monitoring & Analytics
- [ ] Set up Supabase logging
- [ ] Create analytics dashboard queries
- [ ] Set up error tracking (Sentry or similar)
- [ ] Create health check endpoint
- [ ] Set up uptime monitoring
- [ ] Configure alerts (Slack/email)
- [ ] Document runbooks for common issues

#### Day 5: Deploy
- [ ] Review environment variables on Vercel
- [ ] Set up production Supabase project (if separate)
- [ ] Run database migrations on production
- [ ] Deploy to Vercel
- [ ] Test production deployment
- [ ] Monitor error logs
- [ ] Announce launch 🎉

---

## Ongoing Maintenance

### Daily
- [ ] Check error logs
- [ ] Monitor API usage
- [ ] Review failed processing jobs

### Weekly
- [ ] Review analytics metrics
- [ ] Check database performance
- [ ] Backup database
- [ ] Update dependencies

### Monthly
- [ ] Security audit
- [ ] Performance optimization
- [ ] User feedback review
- [ ] Feature prioritization

---

## Success Metrics

### Technical
- [ ] 99.9% uptime
- [ ] < 2s page load time
- [ ] < 5s resume processing time
- [ ] 0 critical security issues

### Business
- [ ] 1,000 portfolios created
- [ ] 500 LinkedIn imports
- [ ] 200 interviews conducted
- [ ] 100 job applications tracked
- [ ] 50 cover letters generated

### User Satisfaction
- [ ] 4.5+ star rating
- [ ] < 5% bounce rate on portfolios
- [ ] 80%+ completion rate (upload → publish)
- [ ] 50%+ return user rate

---

## Notes & Decisions

### Architecture Decisions
- **Why Supabase?** 
  - Managed PostgreSQL with auth and storage
  - Edge functions for serverless processing
  - Built-in RLS for security
  - Cost-effective for MVP

- **Why Edge Functions over API Routes?**
  - Long-running tasks (PDF processing, AI calls)
  - Avoid serverless timeout issues
  - Better separation of concerns

- **Why normalize experience/projects?**
  - Better querying and filtering
  - Easier to build dashboards
  - Can add features like "most common skills" or "average tenure"

### Known Limitations
- PDF parsing accuracy depends on format
- LinkedIn scraping requires Apify credit
- VAPI costs $0.06/minute (can add up)
- OpenAI API costs vary by model

### Future Enhancements
- Multi-language support
- Custom domains per portfolio
- Portfolio templates marketplace
- AI-powered job matching
- Chrome extension for quick application
- Mobile app

---

**Last Updated:** October 4, 2025  
**Progress:** 0% (Planning Complete)
