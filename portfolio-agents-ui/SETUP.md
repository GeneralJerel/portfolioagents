# Portfolio Agents - PDF Resume Parser Setup

## ✅ Implementation Complete

The PDF resume parser has been successfully implemented! Here's what was added:

### 📦 Installed Dependencies
- `openai` - AI-powered resume parsing
- `pdf2pic` - PDF to image conversion
- `sharp` - Image optimization
- `zod` - Schema validation
- `nanoid` - Unique ID generation
- `@supabase/supabase-js` - Optional database storage

### 📁 New Files Created

```
portfolio-agents-ui/
├── lib/
│   ├── schemas/
│   │   └── resume-schema.ts          ✅ Zod schema for resume validation
│   ├── pdf/
│   │   └── converter.ts               ✅ PDF to image converter
│   ├── ai/
│   │   └── resume-parser.ts           ✅ OpenAI resume parser with GPT-4o-mini
│   └── storage/
│       └── json-storage.ts            ✅ JSON file storage utilities
├── app/
│   └── api/
│       ├── resume/
│       │   └── parse/
│       │       └── route.ts           ✅ POST /api/resume/parse endpoint
│       └── portfolio/
│           └── [id]/
│               └── route.ts           ✅ GET /api/portfolio/:id endpoint
├── components/
│   └── organisms/
│       └── ResumeDropZone.tsx         ✅ Updated with full parsing UI
├── data/
│   └── portfolios/                    📁 Auto-created for storing parsed resumes
├── env.example                        ✅ Environment variable template
└── .gitignore                         ✅ Updated to exclude /data/
```

---

## 🚀 Quick Start

### 1. Set Up Supabase Database

**Required for storing portfolios**

Follow the 5-minute quick start: [`SUPABASE_QUICKSTART.md`](./SUPABASE_QUICKSTART.md)

Or see the full guide: [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

### 2. Set Up Environment Variables

Copy the example environment file:
```bash
cp env.example .env.local
```

Edit `.env.local` and add your API keys:
```bash
# OpenAI (Required)
OPENAI_API_KEY=sk-proj-your-key-here

# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

> **Get your keys**:
> - OpenAI: https://platform.openai.com/api-keys
> - Supabase: https://app.supabase.com (Project Settings → API)

### 3. Install Dependencies (Already Done ✓)

Dependencies have been installed. If you need to reinstall:
```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Navigate to: http://localhost:3000

---

## 🎯 How It Works

### User Flow

1. **Upload PDF Resume**
   - User drags & drops PDF or clicks to browse
   - File validated (PDF only, max 5MB)

2. **Parse with AI**
   - PDF converted to high-quality images
   - OpenAI GPT-4o-mini extracts structured data
   - Data validated against Zod schema

3. **Store Data**
   - Unique portfolio ID generated
   - Resume JSON saved to `/data/portfolios/`
   - User redirected to voice agent setup

4. **Voice Agent Setup**
   - Portfolio data passed via URL parameter
   - User configures voice agent personality
   - Agent created with parsed resume data

### API Endpoints

#### POST `/api/resume/parse`
Parses a PDF resume and returns structured JSON.

**Request:**
```typescript
FormData {
  file: File (PDF, max 5MB)
}
```

**Response:**
```json
{
  "success": true,
  "portfolioId": "abc123xyz",
  "slug": "john-doe",
  "data": { /* Full resume JSON */ },
  "stats": {
    "pages": 2,
    "experience_count": 4,
    "skills_count": 15,
    "education_count": 2,
    "projects_count": 3
  }
}
```

#### GET `/api/portfolio/:id`
Retrieves a stored portfolio by ID.

**Response:**
```json
{
  "schema_version": "1.0",
  "profile": { /* Profile data */ },
  "experience": [ /* Experience array */ ],
  "skills": [ /* Skills array */ ],
  /* ... more fields */
}
```

---

## 🏗️ Architecture

```
┌──────────────┐
│ User uploads │
│  PDF resume  │
└──────┬───────┘
       │
       ▼
┌─────────────────────────┐
│ convertPdfToImages()    │
│ - High quality (300dpi) │
│ - Optimized with Sharp  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ parseResumeWithAI()     │
│ - GPT-4o-mini Vision    │
│ - Structured output     │
│ - JSON format           │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ validateAndEnrichResume()│
│ - Zod schema validation │
│ - Auto-generate missing │
│ - Quality checks        │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ savePortfolio()         │
│ - Generate unique ID    │
│ - Store as JSON         │
│ - Return to frontend    │
└─────────────────────────┘
```

---

## 📊 Resume JSON Schema

The parser extracts and structures resume data into this format:

```typescript
interface ResumeJSON {
  schema_version: string;
  generated_at: string;
  source_citation: string;
  
  page: {
    slug: string;                    // URL-safe identifier
    title: string;                   // SEO title
    seo_description: string;         // Meta description
    theme: {
      palette: "light" | "dark";
      accent: string;                // Color theme
      layout: string;                // Layout style
    };
    sections_order: string[];        // Order of sections
  };
  
  profile: {
    name: string;
    headline: string;                // Professional title
    location: string;
    email: string;
    badges?: string[];               // Achievements/certifications
    summary: string;                 // Professional summary
    keywords: string[];              // Skills & expertise
  };
  
  hero: {
    tagline: string;
    cta_primary: { label: string; url: string };
    cta_secondary: { label: string; url: string };
  };
  
  links: Array<{
    label: string;
    url: string;                     // LinkedIn, GitHub, Portfolio, etc.
  }>;
  
  experience: Array<{
    company: string;
    location: string;
    title: string;
    start_date: string;              // Format: "YYYY-MM"
    end_date: string;                // "Present" or "YYYY-MM"
    summary?: string;
    highlights: string[];            // Key achievements
  }>;
  
  projects?: Array<{
    name: string;
    role: string;
    summary: string;
    impact?: string;                 // Measurable outcomes
    links: Array<{ label: string; url: string }>;
  }>;
  
  awards?: string[];
  
  education: Array<{
    institution: string;
    program: string;
    graduation_date?: string;
    gpa?: string;
    honors?: string;
  }>;
  
  skills: string[];
  
  community?: string[];
  
  contact: {
    email: string;
    phone?: string;
    preferred_action?: string;
  };
  
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    credential_url?: string;
  }>;
}
```

---

## 🧪 Testing

### Manual Testing Checklist

1. **File Upload**
   - [ ] Drag & drop PDF
   - [ ] Click to browse and select PDF
   - [ ] Try uploading non-PDF file (should reject)
   - [ ] Try uploading >5MB file (should reject)

2. **Parsing**
   - [ ] Upload 1-page resume
   - [ ] Upload multi-page resume (2-3 pages)
   - [ ] Verify parsing accuracy for:
     - [ ] Name
     - [ ] Email
     - [ ] Work experience
     - [ ] Education
     - [ ] Skills
   - [ ] Check console for errors

3. **UI States**
   - [ ] Loading state shows spinner
   - [ ] Success state shows stats
   - [ ] Error state shows message
   - [ ] "Try Again" button resets form
   - [ ] Auto-redirect after success

4. **Data Storage**
   - [ ] Check `/data/portfolios/` for JSON files
   - [ ] Verify JSON structure matches schema
   - [ ] Test GET `/api/portfolio/:id` endpoint

### Test with Sample Resume

Use the sample resume from `/jerel-resume-json.md` to test parsing accuracy.

---

## 🔧 Configuration

### OpenAI Settings

Current configuration in `lib/ai/resume-parser.ts`:
```typescript
model: "gpt-4o-mini"           // Fast & cost-effective
temperature: 0.1                // Low randomness for consistency
max_tokens: 4000                // Sufficient for detailed resumes
response_format: json_object    // Structured output
detail: "high"                  // High-resolution image analysis
```

### PDF Conversion Settings

Current configuration in `lib/pdf/converter.ts`:
```typescript
density: 300                    // High quality DPI
width: 2000                     // Max width before optimization
height: 2600                    // Max height (letter size ratio)
format: "png"                   // Best quality
resize: 1600                    // Optimized width
quality: 90                     // Balance size/quality
```

---

## 🚨 Troubleshooting

### Issue: "No content received from OpenAI"
- **Cause**: API key invalid or rate limit exceeded
- **Solution**: Check your API key and OpenAI account credits

### Issue: "Failed to extract images from PDF"
- **Cause**: Corrupted PDF or unsupported format
- **Solution**: Try re-exporting the PDF or use a different PDF viewer to save it

### Issue: "Parsing validation failed"
- **Cause**: Resume missing critical fields (name, email, experience)
- **Solution**: Check the `partialData` in error response, may need manual input

### Issue: PDF parsing is slow (>30 seconds)
- **Cause**: Large file size or many pages
- **Solution**: Ask user to compress PDF or reduce to essential pages only

---

## 📝 Next Steps

Now that the PDF parser is implemented, you can:

1. **Test with Real Resumes**
   - Upload various resume formats
   - Verify parsing accuracy
   - Collect feedback

2. **Integrate with Voice Agent**
   - Pass parsed data to VAPI
   - Generate voice agent prompts
   - Test end-to-end flow

3. **Add Resume Editor**
   - Allow users to review/edit parsed data
   - Add missing fields
   - Correct any parsing errors

4. **Production Enhancements**
   - Switch to Supabase for storage
   - Add user authentication
   - Implement rate limiting
   - Add analytics tracking

---

## 📚 Documentation

- **Full Implementation Guide**: `/PDF_RESUME_PARSER_GUIDE.md`
- **Engineering Plan**: `/engineering.md`
- **Sample Resume JSON**: `/jerel-resume-json.md`

---

## 💡 Tips

- **Cost Optimization**: GPT-4o-mini is ~15x cheaper than GPT-4 Vision
- **Quality**: 300 DPI provides excellent OCR accuracy
- **Storage**: JSON files are fine for MVP, migrate to Supabase for scale
- **Error Handling**: Always show user-friendly messages, log details to console

---

**Status**: ✅ Ready to use  
**Last Updated**: October 4, 2025  
**Version**: 1.0
