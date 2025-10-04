# Supabase Quick Start (5 Minutes)

## 1. Create Project

Visit: https://supabase.com
- Click "Start your project"
- Create new project: `portfolio-agents`
- Choose region & generate password
- Wait 2-3 minutes ⏱️

## 2. Run Migration

In Supabase dashboard:
1. Go to **SQL Editor**
2. Click "New query"
3. Copy/paste: `supabase/migrations/001_create_portfolios_table.sql`
4. Click "Run" ✅

## 3. Get API Keys

In Supabase dashboard:
1. **Settings** → **API**
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (click Reveal)

## 4. Update .env.local

```bash
cp env.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
OPENAI_API_KEY=sk-proj-...
```

## 5. Test

```bash
npm run dev
```

Upload a resume → Check Supabase **Table Editor** → See data in `portfolios` table ✨

---

**Need help?** See full guide: `SUPABASE_SETUP.md`
