# Supabase Migration - Quick Start Guide

> **Full Plan:** See [SUPABASE_MIGRATION_PLAN.md](./SUPABASE_MIGRATION_PLAN.md) for complete details.

## Overview

Migrating from hardcoded mock data to Supabase database for:
- ✅ **Epic 1:** Resume PDF → JSON → Portfolio (Current)
- 🔄 **Epic 2:** LinkedIn PDF → JSON
- 🔄 **Epic 3:** Story Interviewer (voice transcripts)
- 🔄 **Epic 4:** Customize Resume to Job
- 🔄 **Epic 5:** Generate Cover Letters

---

## Current State → Target State

### Before (Hardcoded)
```typescript
// app/jerel/page.tsx
const experiences = [
  { company: "FrontierAI", title: "Founder", ... },
  // 9 more companies hardcoded...
]
```

### After (Database-Driven)
```typescript
// app/[slug]/page.tsx
const { data: portfolio } = await supabase
  .from('portfolios')
  .select('*, experience(*), projects(*)')
  .eq('slug', params.slug)
  .single()
```

---

## Quick Setup (1 Hour)

### Step 1: Install Dependencies (5 min)
```bash
cd portfolio-agents-ui
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Step 2: Create Supabase Project (10 min)
1. Go to [supabase.com](https://supabase.com)
2. Create new project: `portfolio-agents`
3. Copy credentials to `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### Step 3: Create Database Schema (15 min)
1. Open Supabase SQL Editor
2. Copy/paste schema from [SUPABASE_MIGRATION_PLAN.md](./SUPABASE_MIGRATION_PLAN.md) (Section: "Database Schema Design")
3. Execute all `CREATE TABLE` statements
4. Execute all RLS policy statements

**Core Tables:**
- `users` - User accounts
- `portfolios` - Main portfolio data (resume_json)
- `experience` - Normalized experience entries
- `projects` - Normalized projects
- `voice_agent_conversations` - Epic 3
- `job_applications` - Epic 4
- `cover_letters` - Epic 5
- `linkedin_imports` - Epic 2

### Step 4: Create Supabase Clients (10 min)
```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export const supabase = createClientComponentClient()

// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
export const createClient = () => createServerComponentClient({ cookies })
```

### Step 5: Migrate Jerel's Data (20 min)
Run the migration script:
```bash
# Create script
touch scripts/migrate-jerel.ts

# Add code from SUPABASE_MIGRATION_PLAN.md (Section: "Step 2.1")

# Run it
npx tsx scripts/migrate-jerel.ts
```

---

## Core Migrations by Epic

### Epic 1: Resume PDF → Portfolio ✅
**Tables:** `portfolios`, `experience`, `projects`, `storage_files`

**Flow:**
1. User uploads PDF → Store in `storage_files`
2. Process with OpenAI → Create `portfolios` entry
3. Normalize data → Insert into `experience` and `projects`
4. Configure voice → Update `voice_config` in portfolio
5. Publish → Set `status = 'published'`

**API Routes to Create:**
- `POST /api/resume/upload` - File upload
- `POST /api/voice-agent/create` - VAPI integration
- `GET /api/portfolio/[slug]` - Fetch portfolio

---

### Epic 2: LinkedIn → Portfolio 🔄
**Tables:** `linkedin_imports`, `portfolios`

**Flow:**
1. User provides LinkedIn URL
2. Call Apify scraper → Store in `linkedin_imports`
3. Map LinkedIn JSON → Resume JSON format
4. Create portfolio from mapped data

**API Routes to Create:**
- `POST /api/linkedin/import` - Start import
- `GET /api/linkedin/status/[id]` - Check progress

---

### Epic 3: Story Interviewer 🔄
**Tables:** `voice_agent_conversations`

**Flow:**
1. Start interview call → Create conversation record
2. VAPI webhook on end → Store transcript
3. AI analyzes transcript → Extract stories and content ideas
4. Display to user → Content creation dashboard

**API Routes to Create:**
- `POST /api/interview/start` - Begin interview
- `POST /api/interview/webhook` - VAPI callback
- `GET /api/interview/[id]/ideas` - Get content ideas

---

### Epic 4: Customize Resume 🔄
**Tables:** `job_applications`

**Flow:**
1. User inputs job details → Create application record
2. AI customizes resume → Tailored to job description
3. Highlight keywords → Track matches
4. Generate comparison → Show before/after

**API Routes to Create:**
- `POST /api/job-application/create` - New application
- `POST /api/job-application/[id]/customize` - AI customization
- `GET /api/job-application/[id]` - Fetch customized resume

---

### Epic 5: Cover Letters 🔄
**Tables:** `cover_letters`

**Flow:**
1. Select tone/style → User preference
2. AI generates letter → Using job + resume data
3. User edits → Save versions
4. Export PDF/DOCX → Generate file

**API Routes to Create:**
- `POST /api/cover-letter/generate` - Generate letter
- `PUT /api/cover-letter/[id]` - Save edits
- `POST /api/cover-letter/[id]/export` - Download file

---

## File Structure After Migration

```
portfolio-agents-ui/
├── app/
│   ├── [slug]/                    # Dynamic portfolio pages
│   │   └── page.tsx              # Loads from Supabase
│   ├── api/
│   │   ├── resume/
│   │   │   ├── upload/route.ts   # Epic 1
│   │   │   └── parse/route.ts
│   │   ├── linkedin/
│   │   │   └── import/route.ts   # Epic 2
│   │   ├── interview/
│   │   │   ├── start/route.ts    # Epic 3
│   │   │   └── webhook/route.ts
│   │   ├── job-application/
│   │   │   └── create/route.ts   # Epic 4
│   │   └── cover-letter/
│   │       └── generate/route.ts # Epic 5
│   └── jerel/
│       └── page.tsx              # Refactored to use Supabase
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Client-side
│   │   └── server.ts             # Server-side
│   └── services/
│       ├── portfolio.ts          # Portfolio CRUD
│       ├── interview.ts          # Interview logic
│       └── job-application.ts    # Job app logic
├── scripts/
│   └── migrate-jerel.ts          # One-time migration
└── types/
    └── supabase.ts               # Generated types
```

---

## Testing Checklist

### Epic 1: Basic Flow
- [ ] Upload PDF resume
- [ ] View parsed JSON
- [ ] Configure voice agent
- [ ] Select template
- [ ] View published portfolio at `/[slug]`
- [ ] Test VAPI widget

### Epic 2: LinkedIn
- [ ] Import LinkedIn profile
- [ ] Review mapped data
- [ ] Edit/correct mapping
- [ ] Generate portfolio

### Epic 3: Interview
- [ ] Start voice interview
- [ ] Complete 5-minute call
- [ ] View transcript
- [ ] See generated content ideas

### Epic 4: Job Customization
- [ ] Paste job description
- [ ] View AI customizations
- [ ] Compare original vs customized
- [ ] Download tailored resume

### Epic 5: Cover Letter
- [ ] Generate cover letter
- [ ] Edit content
- [ ] Change tone
- [ ] Export PDF

---

## Common Issues & Solutions

### Issue: "relation 'portfolios' does not exist"
**Solution:** Run schema migration in Supabase SQL Editor

### Issue: "JWT expired" or auth errors
**Solution:** Check `.env.local` has correct anon key, restart dev server

### Issue: RLS blocking queries
**Solution:** 
```sql
-- Temporarily disable for testing
ALTER TABLE portfolios DISABLE ROW LEVEL SECURITY;
-- Re-enable after fixing policies
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
```

### Issue: Slow queries
**Solution:** Add indexes:
```sql
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_experience_portfolio ON experience(portfolio_id);
```

---

## Performance Optimization

### 1. Enable Caching
```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache'

export const getCachedPortfolio = unstable_cache(
  async (slug: string) => fetchPortfolio(slug),
  ['portfolio'],
  { revalidate: 300 } // 5 minutes
)
```

### 2. Use Connection Pooling
```typescript
// For serverless environments
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key, {
  db: { schema: 'public' },
  auth: { persistSession: false },
  global: { headers: { 'x-connection-pool': 'true' } }
})
```

### 3. Optimize JSONB Queries
```sql
-- Create GIN index on resume_json for fast searches
CREATE INDEX idx_portfolios_resume_gin ON portfolios USING GIN (resume_json);

-- Query efficiently
SELECT * FROM portfolios 
WHERE resume_json @> '{"profile": {"name": "Jerel"}}';
```

---

## Monitoring

### Key Metrics Dashboard

```sql
-- Total users
SELECT COUNT(*) FROM users;

-- Published portfolios
SELECT COUNT(*) FROM portfolios WHERE status = 'published';

-- This week's uploads
SELECT COUNT(*) FROM storage_files 
WHERE uploaded_at > NOW() - INTERVAL '7 days';

-- Average interview duration
SELECT AVG(duration_seconds) / 60 as avg_minutes 
FROM voice_agent_conversations 
WHERE call_status = 'completed';
```

### Setup Alerts (Optional)
```typescript
// lib/monitoring/alerts.ts
export async function dailyHealthCheck() {
  const { count: failedJobs } = await supabase
    .from('storage_files')
    .select('*', { count: 'exact' })
    .eq('processing_status', 'failed')
  
  if (failedJobs > 10) {
    await sendSlackAlert(`⚠️ ${failedJobs} failed processing jobs`)
  }
}
```

---

## Cost Tracking

| Service | Free Tier | Pro Plan | Estimated Cost/1K Users |
|---------|-----------|----------|-------------------------|
| Supabase | 500MB DB | $25/mo (8GB) | $25 |
| OpenAI API | - | Pay per use | $50-100 |
| VAPI | - | $0.06/min | $600 (100 interviews) |
| Apify | 5 free runs | Pay per use | $100 (LinkedIn scraping) |
| **Total** | - | - | **~$775-825/mo** |

---

## Next Steps

### Week 1: Foundation
1. ✅ Setup Supabase project
2. ✅ Create schema
3. ✅ Migrate Jerel's data
4. Refactor `/jerel` page
5. Create Supabase client utilities

### Week 2: Core Features
1. Resume upload API
2. Processing edge functions
3. Dynamic portfolio routes
4. Voice agent API

### Week 3+: Epic Implementation
1. Epic 2: LinkedIn integration
2. Epic 3: Interview feature
3. Epic 4: Job customization
4. Epic 5: Cover letters

---

## Resources

- **Full Migration Plan:** [SUPABASE_MIGRATION_PLAN.md](./SUPABASE_MIGRATION_PLAN.md)
- **Supabase Docs:** https://supabase.com/docs
- **Next.js + Supabase:** https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **VAPI Docs:** https://docs.vapi.ai
- **Apify LinkedIn Scraper:** https://apify.com/apify/linkedin-profile-scraper

---

## Support

**Questions?** Check the [full migration plan](./SUPABASE_MIGRATION_PLAN.md) or open an issue.

**Last Updated:** October 4, 2025
