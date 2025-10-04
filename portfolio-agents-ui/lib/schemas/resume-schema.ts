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
