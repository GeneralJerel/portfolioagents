# Supabase Setup Guide

This guide will walk you through setting up Supabase for the Portfolio Agents project, replacing JSON file storage with a production-ready PostgreSQL database.

---

## 🎯 Why Supabase?

- **Production-ready**: PostgreSQL database with automatic backups
- **Scalable**: Handle thousands of portfolios without file system limitations
- **Real-time**: Built-in real-time subscriptions (for future features)
- **Security**: Row Level Security (RLS) policies
- **Free tier**: Generous free tier for development and MVP

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" (sign up if needed)
3. Create a new project:
   - **Name**: `portfolio-agents` (or your choice)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (or Pro for production)

4. Wait 2-3 minutes for project to provision

### Step 2: Run Database Migration

1. In your Supabase project, go to **SQL Editor**
2. Click **"New query"**
3. Copy and paste the contents of `supabase/migrations/001_create_portfolios_table.sql`
4. Click **"Run"** or press `Cmd/Ctrl + Enter`
5. Verify success message: "Success. No rows returned"

### Step 3: Get API Keys

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGc...
   service_role key: eyJhbGc... (click "Reveal" to see it)
   ```

### Step 4: Update Environment Variables

Edit `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...
```

⚠️ **Important**: 
- The `anon` key is safe to expose in frontend code
- The `service_role` key should **NEVER** be exposed to the frontend
- Keep `service_role` key secret and only use it in API routes

### Step 5: Test the Connection

```bash
npm run dev
```

Upload a PDF resume and verify it saves to Supabase:
1. Go to Supabase dashboard
2. Click **Table Editor**
3. Select **portfolios** table
4. You should see your uploaded portfolio data

---

## 📊 Database Schema

### `portfolios` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PK) | Unique identifier (nanoid) |
| `slug` | TEXT (UNIQUE) | URL-safe slug from person name |
| `resume_data` | JSONB | Complete structured resume data |
| `user_preferences` | JSONB | Voice agent personality settings |
| `voice_agent_id` | TEXT | VAPI assistant ID reference |
| `created_at` | TIMESTAMPTZ | Auto-set on creation |
| `updated_at` | TIMESTAMPTZ | Auto-updated on changes |

### Indexes

- `idx_portfolios_slug` - Fast lookups by slug
- `idx_portfolios_created_at` - Sorting by creation date
- `idx_portfolios_voice_agent` - Lookups by voice agent ID

### Security (Row Level Security)

The table has RLS enabled with these policies:
- **Public Read**: Anyone can read portfolios
- **Public Insert**: Anyone can create portfolios
- **Public Update**: Anyone can update portfolios

> **Note**: For production, you should add authentication and restrict these policies to authenticated users only.

---

## 🗂️ File Structure

```
portfolio-agents-ui/
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Supabase client instances
│   │   └── types.ts               # TypeScript types for database
│   └── storage/
│       ├── json-storage.ts        # Old: JSON file storage (deprecated)
│       └── supabase-storage.ts    # New: Supabase storage utilities
├── supabase/
│   └── migrations/
│       └── 001_create_portfolios_table.sql  # Database schema
└── app/
    └── api/
        └── portfolio/
            ├── [id]/
            │   ├── route.ts       # GET portfolio by ID
            │   └── update/
            │       └── route.ts   # PATCH update portfolio
            └── slug/
                └── [slug]/
                    └── route.ts   # GET portfolio by slug
```

---

## 🔧 API Usage

### Storage Functions

All storage functions are in `lib/storage/supabase-storage.ts`:

#### Save Portfolio

```typescript
import { savePortfolio } from '@/lib/storage/supabase-storage';

await savePortfolio(portfolioId, resumeData, voiceAgentId);
```

#### Get Portfolio by ID

```typescript
import { getPortfolio } from '@/lib/storage/supabase-storage';

const portfolio = await getPortfolio('abc123xyz');
if (portfolio) {
  console.log(portfolio.profile.name);
}
```

#### Get Portfolio by Slug

```typescript
import { getPortfolioBySlug } from '@/lib/storage/supabase-storage';

const portfolio = await getPortfolioBySlug('john-doe');
```

#### Update Portfolio

```typescript
import { updatePortfolio } from '@/lib/storage/supabase-storage';

await updatePortfolio('abc123xyz', {
  voice_agent_id: 'vapi_123',
  user_preferences: { warmth: 'friendly', energy: 'energetic' }
});
```

#### Get All Portfolios

```typescript
import { getAllPortfolios } from '@/lib/storage/supabase-storage';

const portfolios = await getAllPortfolios();
// Returns array of resume data, sorted by newest first
```

#### Delete Portfolio

```typescript
import { deletePortfolio } from '@/lib/storage/supabase-storage';

await deletePortfolio('abc123xyz');
```

#### Check if Slug Exists

```typescript
import { portfolioExists } from '@/lib/storage/supabase-storage';

const exists = await portfolioExists('john-doe');
if (exists) {
  console.log('Slug already taken');
}
```

---

## 🌐 API Endpoints

### GET `/api/portfolio/:id`
Get portfolio by ID.

**Response:**
```json
{
  "schema_version": "1.0",
  "profile": { "name": "John Doe", ... },
  "experience": [...],
  ...
}
```

### GET `/api/portfolio/slug/:slug`
Get portfolio by slug.

**Response:** Same as above

### PATCH `/api/portfolio/:id/update`
Update portfolio data.

**Request Body:**
```json
{
  "resume_data": { /* Updated resume data */ },
  "user_preferences": { /* Voice preferences */ },
  "voice_agent_id": "vapi_123"
}
```

**Response:**
```json
{
  "success": true
}
```

---

## 🔐 Security Best Practices

### For Development (Current Setup)

The current setup allows public read/write access, which is fine for MVP/development.

### For Production

You should:

1. **Add Authentication** (Clerk, NextAuth, or Supabase Auth)

2. **Update RLS Policies** to require authentication:

```sql
-- Replace existing policies with:

-- Only allow users to read their own portfolios
CREATE POLICY "Users can read own portfolios" ON portfolios
  FOR SELECT USING (auth.uid()::text = user_id);

-- Only allow authenticated users to insert
CREATE POLICY "Authenticated users can insert" ON portfolios
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only allow users to update their own portfolios
CREATE POLICY "Users can update own portfolios" ON portfolios
  FOR UPDATE USING (auth.uid()::text = user_id);
```

3. **Add `user_id` column**:

```sql
ALTER TABLE portfolios ADD COLUMN user_id TEXT;
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
```

4. **Rate Limiting**: Add rate limiting to prevent abuse

5. **Input Validation**: Always validate data before saving

---

## 🧪 Testing

### Test Database Connection

```typescript
// In any API route or component
import { createServerClient } from '@/lib/supabase/client';

const supabase = createServerClient();
const { data, error } = await supabase.from('portfolios').select('count');
console.log('Total portfolios:', data);
```

### View Data in Supabase Dashboard

1. Go to Supabase dashboard
2. Click **Table Editor**
3. Select **portfolios**
4. View, edit, or delete rows directly

### Query Portfolio Data

```sql
-- Get all portfolios
SELECT * FROM portfolios ORDER BY created_at DESC;

-- Get portfolios from last 7 days
SELECT * FROM portfolios 
WHERE created_at > NOW() - INTERVAL '7 days';

-- Search by name in JSON
SELECT * FROM portfolios 
WHERE resume_data->>'profile'->>'name' ILIKE '%john%';

-- Count portfolios
SELECT COUNT(*) FROM portfolios;
```

---

## 📈 Monitoring & Analytics

### Enable Supabase Analytics

1. Go to **Reports** in Supabase dashboard
2. View:
   - API requests per day
   - Database size
   - Active connections
   - Slow queries

### Add Custom Logging

```typescript
// In your API routes
console.log('Portfolio created:', {
  id: portfolioId,
  slug: data.page.slug,
  timestamp: new Date().toISOString()
});
```

---

## 🚨 Troubleshooting

### Error: "Missing Supabase environment variables"

**Solution**: Check that all three environment variables are set in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Error: "Failed to save portfolio: permission denied"

**Solution**: Check that RLS policies are correctly set. Run the migration SQL again.

### Error: "relation 'portfolios' does not exist"

**Solution**: The table wasn't created. Go to SQL Editor and run the migration SQL.

### Slow Queries

**Solution**: Check indexes are created. Run:
```sql
SELECT * FROM pg_indexes WHERE tablename = 'portfolios';
```

### Connection Issues

**Solution**: 
1. Verify Supabase project is running (not paused)
2. Check the project URL is correct
3. Ensure your IP isn't blocked (Supabase allows all IPs by default)

---

## 🔄 Migration from JSON Files

If you have existing JSON files in `/data/portfolios/`, you can migrate them:

### Option 1: Manual Migration (Recommended for few files)

1. Upload each resume again through the UI
2. Verify in Supabase dashboard
3. Delete old JSON files

### Option 2: Automated Migration Script

Create `scripts/migrate-to-supabase.ts`:

```typescript
import fs from 'fs/promises';
import path from 'path';
import { savePortfolio } from '@/lib/storage/supabase-storage';

async function migrate() {
  const dataDir = path.join(process.cwd(), 'data', 'portfolios');
  const files = await fs.readdir(dataDir);
  
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    
    const content = await fs.readFile(path.join(dataDir, file), 'utf-8');
    const data = JSON.parse(content);
    const id = file.replace('.json', '');
    
    await savePortfolio(id, data);
    console.log(`Migrated: ${id}`);
  }
  
  console.log('Migration complete!');
}

migrate();
```

Run: `npx tsx scripts/migrate-to-supabase.ts`

---

## 💰 Pricing

### Free Tier Limits
- **Database**: 500 MB storage
- **API Requests**: 50,000 per month
- **Bandwidth**: 2 GB
- **Projects**: 2 active projects

This is more than enough for MVP and early stage.

### When to Upgrade to Pro ($25/month)
- **Database**: 8 GB storage
- **API Requests**: 5 million per month
- **Bandwidth**: 50 GB
- **Daily backups**
- **7-day log retention**

---

## 🔗 Useful Links

- [Supabase Dashboard](https://app.supabase.com)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client Docs](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL JSON Functions](https://www.postgresql.org/docs/current/functions-json.html)

---

## 📝 Next Steps

After Supabase is set up, you can:

1. **Add Authentication**
   - Implement user accounts
   - Restrict portfolio access
   - Add portfolio management dashboard

2. **Add Real-time Features**
   - Live preview of resume parsing
   - Real-time collaboration
   - Live portfolio editing

3. **Add Analytics**
   - Track portfolio views
   - Monitor voice agent usage
   - User engagement metrics

4. **Optimize Performance**
   - Add caching layer (Redis)
   - Implement pagination
   - Add search functionality

---

**Status**: ✅ Ready to use  
**Last Updated**: October 4, 2025  
**Version**: 1.0
