# PDF Resume Parser Implementation Guide

## 📋 Overview

This guide provides step-by-step instructions for implementing a PDF resume parser that extracts data from resumes with varying formats and uses AI to structure it into a standardized JSON format for the Portfolio Agents application.

**Goal**: Enable users to drop a PDF resume → Extract data → Structure with AI → Generate portfolio + voice agent

---

## 🎯 Requirements

### Functional Requirements
1. Accept PDF files via drag-and-drop or file upload
2. Extract text and visual data from PDFs (multi-page support)
3. Use OpenAI GPT-4o-mini to parse and structure resume data
4. Output data in standardized JSON format (see schema below)
5. Handle varying resume formats (traditional, modern, creative layouts)
6. Validate extracted data for completeness
7. Store parsed data for portfolio generation

### Non-Functional Requirements
- Processing time: < 30 seconds per resume
- Support PDFs up to 5MB
- Handle 1-5 page resumes
- 95%+ parsing accuracy for standard fields
- Graceful error handling for malformed PDFs

---

## 🏗️ Architecture

```
┌─────────────────┐
│  User Uploads   │
│   PDF Resume    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Next.js API Route              │
│  /api/resume/parse              │
│  - Validate file                │
│  - Convert PDF to images        │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  OpenAI GPT-4o-mini             │
│  (Multimodal Vision API)        │
│  - Analyze PDF images           │
│  - Extract structured data      │
│  - Use JSON Schema validation   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Data Validation Layer          │
│  - Verify required fields       │
│  - Quality scoring              │
│  - Enrich missing data          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Storage (Supabase/JSON)        │
│  - Save structured JSON         │
│  - Generate unique portfolio ID │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Portfolio Generation           │
│  - Create voice agent           │
│  - Generate portfolio page      │
└─────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Dependencies to Install

```json
{
  "dependencies": {
    "openai": "^4.73.0",
    "pdf-parse": "^1.1.1",
    "pdf2pic": "^3.1.3",
    "sharp": "^0.33.5",
    "zod": "^3.24.1",
    "nanoid": "^5.0.8",
    "@supabase/supabase-js": "^2.48.1"
  }
}
```

### Installation Commands

```bash
cd portfolio-agents-ui
npm install openai pdf-parse pdf2pic sharp zod nanoid @supabase/supabase-js
```

### Environment Variables

Add to `.env.local`:

```bash
# OpenAI
OPENAI_API_KEY=sk-proj-...

# Supabase (optional for MVP - can use JSON files)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAX_FILE_SIZE_MB=5
```

---

## 📊 Structured JSON Output Schema

### Complete Resume JSON Structure

Based on `jerel-resume-json.md`, this is the standardized output format:

```typescript
interface ResumeJSON {
  schema_version: string;
  generated_at: string;
  source_citation: string;
  
  page: {
    slug: string;
    title: string;
    seo_description: string;
    theme: {
      palette: "light" | "dark";
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
    badges?: string[];
    summary: string;
    keywords: string[];
  };
  
  hero: {
    tagline: string;
    cta_primary: { label: string; url: string };
    cta_secondary: { label: string; url: string };
  };
  
  links: Array<{
    label: string;
    url: string;
  }>;
  
  experience: Array<{
    company: string;
    location: string;
    title: string;
    start_date: string; // Format: "YYYY-MM"
    end_date: string;   // "Present" or "YYYY-MM"
    summary?: string;
    highlights: string[];
  }>;
  
  projects?: Array<{
    name: string;
    role: string;
    summary: string;
    impact?: string;
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

### Validation Schema (Zod)

Create `lib/schemas/resume-schema.ts`:

```typescript
import { z } from 'zod';

export const resumeSchema = z.object({
  schema_version: z.string().default("1.0"),
  generated_at: z.string(),
  source_citation: z.string(),
  
  page: z.object({
    slug: z.string(),
    title: z.string(),
    seo_description: z.string(),
    theme: z.object({
      palette: z.enum(["light", "dark"]),
      accent: z.string(),
      layout: z.string(),
    }),
    sections_order: z.array(z.string()),
  }),
  
  profile: z.object({
    name: z.string(),
    headline: z.string(),
    location: z.string(),
    email: z.string().email(),
    badges: z.array(z.string()).optional(),
    summary: z.string(),
    keywords: z.array(z.string()),
  }),
  
  hero: z.object({
    tagline: z.string(),
    cta_primary: z.object({
      label: z.string(),
      url: z.string(),
    }),
    cta_secondary: z.object({
      label: z.string(),
      url: z.string(),
    }),
  }),
  
  links: z.array(z.object({
    label: z.string(),
    url: z.string().url(),
  })),
  
  experience: z.array(z.object({
    company: z.string(),
    location: z.string(),
    title: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    summary: z.string().optional(),
    highlights: z.array(z.string()),
  })),
  
  projects: z.array(z.object({
    name: z.string(),
    role: z.string(),
    summary: z.string(),
    impact: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })),
  })).optional(),
  
  awards: z.array(z.string()).optional(),
  
  education: z.array(z.object({
    institution: z.string(),
    program: z.string(),
    graduation_date: z.string().optional(),
    gpa: z.string().optional(),
    honors: z.string().optional(),
  })),
  
  skills: z.array(z.string()),
  
  community: z.array(z.string()).optional(),
  
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    preferred_action: z.string().optional(),
  }),
  
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    credential_url: z.string().optional(),
  })).optional(),
});

export type ResumeJSON = z.infer<typeof resumeSchema>;
```

---

## 🔧 Implementation Plan

### Phase 1: Core PDF Processing (Days 1-2)

#### Step 1.1: Create PDF to Image Converter

Create `lib/pdf/converter.ts`:

```typescript
import { fromBuffer } from 'pdf2pic';
import sharp from 'sharp';

export async function convertPdfToImages(
  pdfBuffer: Buffer
): Promise<string[]> {
  const options = {
    density: 300,           // High quality
    saveFilename: "page",
    savePath: "/tmp",
    format: "png",
    width: 2000,
    height: 2600,
  };

  const convert = fromBuffer(pdfBuffer, options);
  
  const images: string[] = [];
  let pageNum = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const result = await convert(pageNum, { responseType: "base64" });
      
      if (result.base64) {
        // Optimize image with sharp
        const optimized = await sharp(Buffer.from(result.base64, 'base64'))
          .resize(1600, null, { withoutEnlargement: true })
          .png({ quality: 90 })
          .toBuffer();
        
        images.push(optimized.toString('base64'));
        pageNum++;
      }
    } catch (error) {
      hasMore = false;
    }
  }

  return images;
}
```

#### Step 1.2: Create OpenAI Parser Service

Create `lib/ai/resume-parser.ts`:

```typescript
import OpenAI from 'openai';
import { ResumeJSON } from '@/lib/schemas/resume-schema';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PARSING_SYSTEM_PROMPT = `You are an expert resume parser. Extract all information from the provided resume image(s) and structure it into the specified JSON format.

INSTRUCTIONS:
1. Extract ALL text content accurately
2. Identify sections: experience, education, skills, projects, awards, certifications
3. Parse dates in YYYY-MM format (use "Present" for current roles)
4. Extract metrics and quantifiable achievements
5. Identify contact information (email, phone, location, LinkedIn, etc.)
6. Generate a professional headline and summary if not explicitly stated
7. Create SEO-friendly description
8. Extract or infer relevant keywords
9. For highlights, extract bullet points that show impact/results
10. If multiple pages, combine all information

OUTPUT REQUIREMENTS:
- Return ONLY valid JSON
- Follow the exact schema structure provided
- Use null for truly missing optional fields
- Generate reasonable defaults for theme/layout
- Create a URL-safe slug from the person's name
- Ensure all required fields are populated

SCHEMA EXAMPLE:
${JSON.stringify({
  schema_version: "1.0",
  generated_at: "2025-10-04",
  source_citation: "User-supplied resume PDF",
  page: {
    slug: "john-doe",
    title: "John Doe — Software Engineer",
    seo_description: "Software Engineer with 5 years of experience...",
    theme: { palette: "light", accent: "blue", layout: "clean" },
    sections_order: ["hero", "about", "experience", "education", "skills", "projects", "contact"]
  },
  profile: { name: "John Doe", headline: "Software Engineer", location: "San Francisco, CA", email: "john@example.com", summary: "...", keywords: ["Python", "React"] },
  // ... rest of schema
}, null, 2)}`;

export async function parseResumeWithAI(
  images: string[]
): Promise<ResumeJSON> {
  const content: Array<any> = [
    {
      type: "text",
      text: "Parse this resume and extract all information into the structured JSON format.",
    },
  ];

  // Add all page images
  for (const image of images) {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:image/png;base64,${image}`,
        detail: "high",
      },
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: PARSING_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.1,
    max_tokens: 4000,
  });

  const jsonText = response.choices[0].message.content;
  if (!jsonText) {
    throw new Error("No content received from OpenAI");
  }

  const parsed = JSON.parse(jsonText);
  
  // Add generated timestamp
  parsed.generated_at = new Date().toISOString().split('T')[0];
  parsed.source_citation = "User-supplied resume PDF";
  
  return parsed as ResumeJSON;
}

export async function validateAndEnrichResume(
  data: ResumeJSON
): Promise<{ valid: boolean; errors?: string[]; data: ResumeJSON }> {
  const errors: string[] = [];

  // Basic validation
  if (!data.profile?.name) errors.push("Missing name");
  if (!data.profile?.email) errors.push("Missing email");
  if (!data.experience || data.experience.length === 0) {
    errors.push("No experience found");
  }

  // Enrich data
  if (!data.page?.slug) {
    data.page.slug = data.profile.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  if (!data.hero?.tagline) {
    data.hero = {
      tagline: `${data.profile.headline} with expertise in ${data.skills?.slice(0, 3).join(', ')}`,
      cta_primary: { label: "Contact Me", url: `mailto:${data.profile.email}` },
      cta_secondary: { label: "View Resume", url: "#experience" },
    };
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    data,
  };
}
```

#### Step 1.3: Create API Route

Create `app/api/resume/parse/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { convertPdfToImages } from '@/lib/pdf/converter';
import { parseResumeWithAI, validateAndEnrichResume } from '@/lib/ai/resume-parser';
import { resumeSchema } from '@/lib/schemas/resume-schema';
import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Step 1: Convert PDF to images
    console.log('Converting PDF to images...');
    const images = await convertPdfToImages(buffer);

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'Failed to extract images from PDF' },
        { status: 500 }
      );
    }

    // Step 2: Parse with OpenAI
    console.log(`Parsing ${images.length} page(s) with AI...`);
    const parsedData = await parseResumeWithAI(images);

    // Step 3: Validate and enrich
    const validation = await validateAndEnrichResume(parsedData);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Resume parsing validation failed',
          details: validation.errors,
          partialData: validation.data,
        },
        { status: 422 }
      );
    }

    // Step 4: Validate against Zod schema
    const validatedData = resumeSchema.parse(validation.data);

    // Step 5: Generate unique portfolio ID
    const portfolioId = nanoid(10);

    // Step 6: Store in Supabase (or JSON file for MVP)
    // Option A: Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { error: dbError } = await supabase
        .from('portfolios')
        .insert({
          id: portfolioId,
          slug: validatedData.page.slug,
          resume_data: validatedData,
          created_at: new Date().toISOString(),
        });

      if (dbError) throw dbError;
    }
    // Option B: JSON file (development only)
    else {
      const fs = require('fs').promises;
      const path = require('path');
      const dataDir = path.join(process.cwd(), 'data', 'portfolios');
      
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(
        path.join(dataDir, `${portfolioId}.json`),
        JSON.stringify(validatedData, null, 2)
      );
    }

    return NextResponse.json({
      success: true,
      portfolioId,
      slug: validatedData.page.slug,
      data: validatedData,
      stats: {
        pages: images.length,
        experience_count: validatedData.experience.length,
        skills_count: validatedData.skills.length,
      },
    });

  } catch (error: any) {
    console.error('Resume parsing error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to parse resume',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

---

### Phase 2: Frontend Integration (Days 2-3)

#### Step 2.1: Update ResumeDropZone Component

Update `components/organisms/ResumeDropZone.tsx`:

```typescript
"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParseResult {
  success: boolean;
  portfolioId?: string;
  slug?: string;
  stats?: {
    pages: number;
    experience_count: number;
    skills_count: number;
  };
  error?: string;
}

const ResumeDropZone: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<ParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse resume');
      }

      setResult(data);
      
      // Wait 2 seconds to show success, then navigate
      setTimeout(() => {
        router.push(`/voice-agent?portfolioId=${data.portfolioId}`);
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="upload" className="w-full px-4 py-16 md:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Resume
          </h2>
          <p className="text-gray-600">
            Drop your resume here to get started. We accept PDF files up to 5MB.
          </p>
        </div>

        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 md:p-16 transition-all duration-200 cursor-pointer",
            "hover:border-blue-400 hover:bg-blue-50/50",
            isDragActive && "border-blue-500 bg-blue-50",
            file && !result && "border-green-500 bg-green-50/50",
            result?.success && "border-green-500 bg-green-50",
            error && "border-red-500 bg-red-50/50",
            !isDragActive && !file && !result && "border-gray-300 bg-white"
          )}
        >
          <input {...getInputProps()} />
          
          {!file && !result ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className={cn(
                "p-4 rounded-full transition-colors",
                isDragActive ? "bg-blue-100" : "bg-gray-100"
              )}>
                <Upload className={cn(
                  "w-12 h-12",
                  isDragActive ? "text-blue-600" : "text-gray-600"
                )} />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span className="px-2 py-1 bg-gray-100 rounded">PDF only</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Max 5MB</span>
              </div>
            </div>
          ) : result?.success ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  Resume Parsed Successfully!
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Found {result.stats?.experience_count} experiences, {result.stats?.skills_count} skills
                </p>
                <p className="text-xs text-gray-500">
                  Redirecting to voice agent setup...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-red-100 rounded-full">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  Parsing Failed
                </p>
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FileText className="w-12 h-12 text-green-600" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              {!uploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          )}
        </div>

        {file && !result && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={cn(
                "px-8 py-3 font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2",
                "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                uploading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{uploading ? "Parsing Resume..." : "Parse Resume"}</span>
            </button>
          </div>
        )}

        {uploading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>This may take 15-30 seconds...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeDropZone;
```

---

### Phase 3: Data Storage (Day 3)

#### Option A: Supabase (Recommended for Production)

Create Supabase table:

```sql
-- Create portfolios table
CREATE TABLE portfolios (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  resume_data JSONB NOT NULL,
  user_preferences JSONB,
  voice_agent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX idx_portfolios_slug ON portfolios(slug);

-- Create index on created_at for sorting
CREATE INDEX idx_portfolios_created_at ON portfolios(created_at DESC);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON portfolios
  FOR SELECT USING (true);

-- Create policy to allow inserts
CREATE POLICY "Allow insert access" ON portfolios
  FOR INSERT WITH CHECK (true);
```

#### Option B: JSON Files (Development Only)

Create `lib/storage/json-storage.ts`:

```typescript
import fs from 'fs/promises';
import path from 'path';
import { ResumeJSON } from '@/lib/schemas/resume-schema';

const DATA_DIR = path.join(process.cwd(), 'data', 'portfolios');

export async function savePortfolio(
  id: string,
  data: ResumeJSON
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, `${id}.json`),
    JSON.stringify(data, null, 2)
  );
}

export async function getPortfolio(id: string): Promise<ResumeJSON | null> {
  try {
    const content = await fs.readFile(
      path.join(DATA_DIR, `${id}.json`),
      'utf-8'
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function getPortfolioBySlug(slug: string): Promise<ResumeJSON | null> {
  const files = await fs.readdir(DATA_DIR);
  
  for (const file of files) {
    const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
    const data = JSON.parse(content);
    
    if (data.page?.slug === slug) {
      return data;
    }
  }
  
  return null;
}
```

---

### Phase 4: Voice Agent Integration (Day 4)

#### Update Voice Agent Page to Use Parsed Data

Update `app/voice-agent/page.tsx` to accept `portfolioId`:

```typescript
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResumeJSON } from "@/lib/schemas/resume-schema";
// ... rest of imports

const VoiceAgentPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolioId');
  
  const [resumeData, setResumeData] = useState<ResumeJSON | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (portfolioId) {
      fetch(`/api/portfolio/${portfolioId}`)
        .then(res => res.json())
        .then(data => {
          setResumeData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load portfolio:', err);
          setLoading(false);
        });
    }
  }, [portfolioId]);

  // ... rest of component
};
```

Create API route `app/api/portfolio/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getPortfolio } from '@/lib/storage/json-storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const portfolio = await getPortfolio(params.id);
  
  if (!portfolio) {
    return NextResponse.json(
      { error: 'Portfolio not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(portfolio);
}
```

---

## 🧪 Testing Strategy

### Test Cases

1. **PDF Parsing Tests**
   - Traditional chronological resume
   - Modern/creative layouts
   - Multi-column resumes
   - Multi-page resumes (1-5 pages)
   - Resumes with images/logos
   - Different fonts and formatting

2. **Data Validation Tests**
   - Complete resume (all fields present)
   - Minimal resume (only required fields)
   - Resume with special characters
   - Resume with non-English characters
   - Resume with unusual date formats

3. **Error Handling Tests**
   - Invalid PDF file
   - Corrupted PDF
   - Oversized file (>5MB)
   - Non-PDF file uploaded
   - Network timeout
   - OpenAI API failure

### Manual Testing Checklist

```markdown
## Resume Parser Testing

- [ ] Upload valid PDF resume
- [ ] Verify file size validation (try >5MB file)
- [ ] Verify file type validation (try .docx, .txt)
- [ ] Check parsing accuracy for:
  - [ ] Name extraction
  - [ ] Email extraction
  - [ ] Phone number (if present)
  - [ ] Work experience (all jobs)
  - [ ] Education (all degrees)
  - [ ] Skills list
  - [ ] Projects (if present)
  - [ ] Certifications (if present)
- [ ] Verify date formatting (YYYY-MM)
- [ ] Check slug generation (URL-safe)
- [ ] Verify JSON structure matches schema
- [ ] Test multi-page PDF (2-3 pages)
- [ ] Test creative/non-standard resume layout
- [ ] Verify error messages are user-friendly
- [ ] Check loading states and transitions
- [ ] Test navigation to voice agent page
- [ ] Verify data persists in storage
```

---

## 🚨 Error Handling

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Failed to extract images from PDF" | Corrupted PDF or unsupported format | Show user-friendly error, suggest re-uploading |
| "No content received from OpenAI" | API timeout or rate limit | Retry with exponential backoff |
| "Parsing validation failed" | Incomplete resume data | Show partial data, allow manual editing |
| "File size exceeds 5MB" | Large PDF file | Ask user to compress PDF or split pages |
| "Only PDF files supported" | Wrong file type | Clear message, highlight PDF requirement |

### Error Response Format

```typescript
interface ErrorResponse {
  error: string;
  message?: string;
  details?: string[];
  partialData?: any;
  suggestion?: string;
}
```

---

## 📈 Quality Metrics

### Parsing Accuracy Targets

- **Name**: 99% accuracy
- **Email**: 98% accuracy
- **Experience**: 95% accuracy
- **Education**: 95% accuracy
- **Skills**: 90% accuracy
- **Overall Structure**: 95% valid JSON

### Performance Targets

- **Processing Time**: < 30 seconds (95th percentile)
- **Success Rate**: > 95%
- **API Uptime**: 99.9%

---

## 🎯 Next Steps After Implementation

1. **Add Resume Editor** - Allow users to review/edit parsed data
2. **Support More Formats** - Add DOCX, TXT support
3. **Improve Parsing** - Fine-tune prompts based on real-world data
4. **Add Analytics** - Track parsing success rates
5. **Implement Caching** - Cache parsed results
6. **Add OCR Fallback** - For image-based PDFs
7. **Multi-language Support** - Parse resumes in different languages

---

## 📚 Resources

### Documentation
- [OpenAI Vision API](https://platform.openai.com/docs/guides/vision)
- [pdf2pic Documentation](https://www.npmjs.com/package/pdf2pic)
- [Zod Schema Validation](https://zod.dev/)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)

### Example Resume JSON
See `/jerel-resume-json.md` for complete example

### System Prompts
See `/ai/strands-experiment/vibecoded/jerel-agent.py` for voice agent prompt structure

---

## 🤝 Support

If you encounter issues:
1. Check environment variables are set correctly
2. Verify OpenAI API key has sufficient credits
3. Check PDF file is not corrupted
4. Review server logs for detailed error messages
5. Test with the sample resume (jerel-resume-json.md)

---

**Last Updated**: October 4, 2025  
**Version**: 1.0  
**Status**: Ready for Implementation
