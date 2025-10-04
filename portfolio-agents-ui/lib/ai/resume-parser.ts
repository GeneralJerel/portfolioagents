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
    seo_description: "Software Engineer with 5 years of experience in full-stack development, specializing in React and Node.js",
    theme: { palette: "light", accent: "blue", layout: "clean" },
    sections_order: ["hero", "about", "experience", "education", "skills", "projects", "contact"]
  },
  profile: { 
    name: "John Doe", 
    headline: "Software Engineer", 
    location: "San Francisco, CA", 
    email: "john@example.com",
    badges: ["AWS Certified"],
    summary: "Experienced software engineer with a passion for building scalable web applications",
    keywords: ["Python", "React", "Node.js", "AWS"] 
  },
  hero: {
    tagline: "Building scalable web applications that users love",
    cta_primary: { label: "Contact Me", url: "mailto:john@example.com" },
    cta_secondary: { label: "View Resume", url: "#experience" }
  },
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
    { label: "GitHub", url: "https://github.com/johndoe" }
  ],
  experience: [{
    company: "Tech Company",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    start_date: "2020-01",
    end_date: "Present",
    summary: "Led development of customer-facing applications",
    highlights: [
      "Built scalable microservices handling 1M+ requests/day",
      "Reduced page load time by 40% through optimization",
      "Mentored team of 5 junior developers"
    ]
  }],
  education: [{
    institution: "University of California",
    program: "Bachelor of Science in Computer Science",
    graduation_date: "2019-05"
  }],
  skills: ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker"],
  contact: {
    email: "john@example.com",
    phone: "+1-555-0123",
    preferred_action: "Email to discuss opportunities"
  }
}, null, 2)}

IMPORTANT: Ensure the JSON is complete and valid. All experience items must have highlights array, all required fields must be present.`;

export async function parseResumeWithAI(
  images: string[]
): Promise<ResumeJSON> {
  const content: Array<any> = [
    {
      type: "text",
      text: "Parse this resume and extract all information into the structured JSON format. Be thorough and extract all details including metrics, dates, and achievements.",
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
    data.page = data.page || {} as any;
    data.page.slug = data.profile.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  // Ensure hero section exists
  if (!data.hero?.tagline) {
    const topSkills = data.skills?.slice(0, 3).join(', ') || 'various technologies';
    data.hero = {
      tagline: `${data.profile.headline} with expertise in ${topSkills}`,
      cta_primary: { label: "Contact Me", url: `mailto:${data.profile.email}` },
      cta_secondary: { label: "View Resume", url: "#experience" },
    };
  }

  // Ensure theme exists
  if (!data.page?.theme) {
    data.page.theme = {
      palette: "light",
      accent: "blue",
      layout: "clean",
    };
  }

  // Ensure sections_order exists
  if (!data.page?.sections_order || data.page.sections_order.length === 0) {
    data.page.sections_order = [
      "hero",
      "about",
      "experience",
      "education",
      "skills",
      "projects",
      "contact"
    ];
  }

  // Ensure schema version
  if (!data.schema_version) {
    data.schema_version = "1.0";
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    data,
  };
}
