# Resume Profile Processing Guide

## 📋 Overview

This guide instructs AI agents on how to process different resume profiles and generate structured JSON output for creating personalized landing pages and voice agents. The system supports multiple profile types, each with distinct characteristics, styling, and voice agent personalities.

**Goal**: Transform resume data → Generate profile-specific JSON → Create landing page + voice agent

---

## 🎯 Profile Types & Characteristics

### 1. Professional Profile
**Target Audience**: Corporate professionals, consultants, managers
**Visual Style**: Clean, minimal, business-focused
**Voice Personality**: Clear, confident, metrics-focused
**Key Elements**:
- Emphasis on quantifiable achievements
- Corporate language and terminology
- Structured, hierarchical information presentation
- Professional color palette (blues, grays)

### 2. Creative Profile  
**Target Audience**: Designers, artists, content creators, marketers
**Visual Style**: Bold, vibrant, dynamic layouts
**Voice Personality**: Engaging, innovative, storytelling-focused
**Key Elements**:
- Visual impact and creative presentation
- Project portfolios and creative work
- Expressive language and dynamic descriptions
- Vibrant color schemes (purples, pinks, gradients)

### 3. Executive Profile
**Target Audience**: C-level executives, senior leaders, board members
**Visual Style**: Sophisticated, authoritative, classic
**Voice Personality**: Strategic, authoritative, visionary
**Key Elements**:
- Strategic achievements and leadership impact
- High-level business metrics and outcomes
- Formal, executive-level language
- Conservative, elegant design (navy, gray, white)

### 4. Technical Profile
**Target Audience**: Engineers, developers, data scientists, researchers
**Visual Style**: Clean, data-focused, systematic
**Voice Personality**: Precise, analytical, detail-oriented
**Key Elements**:
- Technical skills and certifications
- Project specifications and technical details
- Code repositories and technical achievements
- Monospace fonts, technical color schemes

### 5. Casual Profile
**Target Audience**: Freelancers, consultants, personal brands
**Visual Style**: Friendly, approachable, conversational
**Voice Personality**: Friendly, relatable, accessible
**Key Elements**:
- Personal story and journey
- Conversational tone and language
- Approachable design elements
- Warm, inviting color palette

---

## 📊 Complete JSON Schema Structure

### Core Schema (All Profiles)

```json
{
  "schema_version": "1.0",
  "generated_at": "YYYY-MM-DD",
  "source_citation": "User-supplied resume PDF",
  "profile_type": "professional|creative|executive|technical|casual",
  
  "page": {
    "slug": "firstname-lastname",
    "title": "Full Name — Professional Title",
    "seo_description": "SEO-optimized description (150-160 chars)",
    "theme": {
      "palette": "light|dark",
      "accent": "blue|purple|gray|green|orange",
      "layout": "clean|bold|classic|minimal|friendly",
      "typography": "sans|serif|mono"
    },
    "sections_order": ["hero", "about", "experience", "projects", "skills", "education", "awards", "contact"]
  },
  
  "profile": {
    "name": "Full Name",
    "headline": "Professional Title/Role",
    "location": "City, Country/State",
    "email": "email@domain.com",
    "phone": "+1234567890",
    "badges": ["Achievement 1", "Achievement 2"],
    "summary": "2-3 sentence professional summary",
    "keywords": ["Skill1", "Skill2", "Skill3"],
    "years_experience": 5
  },
  
  "hero": {
    "tagline": "Compelling one-liner about value proposition",
    "cta_primary": { 
      "label": "Primary Action", 
      "url": "mailto:email@domain.com" 
    },
    "cta_secondary": { 
      "label": "Secondary Action", 
      "url": "https://portfolio-link.com" 
    },
    "stats": [
      { "value": "5+", "label": "Years Experience" },
      { "value": "50+", "label": "Projects Completed" }
    ]
  },
  
  "experience": [
    {
      "company": "Company Name",
      "location": "City, Country",
      "title": "Job Title",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM|Present",
      "duration": "X years Y months",
      "summary": "Brief role description",
      "highlights": [
        "Achievement with metrics",
        "Impact statement with numbers",
        "Key responsibility or outcome"
      ],
      "skills_used": ["Skill1", "Skill2"],
      "industry": "Industry Name"
    }
  ],
  
  "projects": [
    {
      "name": "Project Name",
      "role": "Your Role",
      "summary": "Project description",
      "impact": "Quantifiable impact or outcome",
      "technologies": ["Tech1", "Tech2"],
      "links": [
        { "label": "Live Site", "url": "https://project.com" },
        { "label": "GitHub", "url": "https://github.com/user/repo" }
      ],
      "featured": true,
      "image_url": "https://image-url.com/project.jpg"
    }
  ],
  
  "skills": {
    "technical": ["Programming Language", "Framework", "Tool"],
    "soft": ["Leadership", "Communication", "Problem Solving"],
    "certifications": [
      {
        "name": "Certification Name",
        "issuer": "Issuing Organization",
        "date": "YYYY-MM",
        "credential_url": "https://credential-url.com"
      }
    ]
  },
  
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "graduation_date": "YYYY-MM",
      "gpa": "3.8/4.0",
      "honors": "Magna Cum Laude",
      "relevant_coursework": ["Course1", "Course2"]
    }
  ],
  
  "awards": [
    {
      "title": "Award Name",
      "issuer": "Issuing Organization",
      "date": "YYYY-MM",
      "description": "Award description"
    }
  ],
  
  "links": [
    { "label": "LinkedIn", "url": "https://linkedin.com/in/username" },
    { "label": "GitHub", "url": "https://github.com/username" },
    { "label": "Portfolio", "url": "https://portfolio.com" },
    { "label": "Blog", "url": "https://blog.com" }
  ],
  
  "contact": {
    "email": "email@domain.com",
    "phone": "+1234567890",
    "preferred_method": "email",
    "availability": "Available for new opportunities",
    "timezone": "GMT-5",
    "preferred_action": "Email to discuss opportunities"
  },
  
  "voice_agent": {
    "personality": "professional|creative|executive|technical|casual",
    "tone": "formal|friendly|authoritative|technical|conversational",
    "key_talking_points": [
      "Primary expertise area",
      "Major achievement",
      "Current focus/goals"
    ],
    "conversation_starters": [
      "Tell me about your experience with...",
      "What's your approach to...",
      "Can you walk me through..."
    ]
  }
}
```

---

## 🔄 Profile-Specific Processing Instructions

### Processing Workflow

1. **Resume Analysis** → Identify profile type based on content
2. **Content Extraction** → Extract and structure information
3. **Profile Adaptation** → Apply profile-specific formatting
4. **Voice Agent Setup** → Generate personality and prompts
5. **Validation** → Ensure completeness and accuracy

### Profile Type Detection Rules

```
IF (executive titles + strategic language + high-level metrics) → Executive
ELSE IF (creative roles + portfolio mentions + design skills) → Creative  
ELSE IF (technical roles + programming languages + certifications) → Technical
ELSE IF (freelance + personal brand + casual language) → Casual
ELSE → Professional (default)
```

---

## 📝 Profile-Specific Instructions

### 1. Professional Profile Processing

**Content Focus**:
- Quantifiable business achievements
- Corporate experience and progression
- Professional certifications and training
- Industry-standard terminology

**Language Style**:
- Clear, concise, business-appropriate
- Metrics-driven descriptions
- Action verbs (managed, led, implemented)
- Professional terminology

**Theme Configuration**:
```json
{
  "palette": "light",
  "accent": "blue",
  "layout": "clean",
  "typography": "sans"
}
```

**Voice Agent Personality**:
- **Tone**: Professional, confident, results-oriented
- **Communication Style**: Direct, metrics-focused, structured
- **Key Phrases**: "achieved", "delivered", "managed", "implemented"
- **Response Pattern**: Problem → Solution → Result

**Example Tagline Generation**:
- "Delivers [X] results through [expertise area]"
- "Proven track record of [achievement] in [industry]"
- "[X] years of driving [outcome] for [target market]"

### 2. Creative Profile Processing

**Content Focus**:
- Creative projects and portfolios
- Visual and design achievements
- Brand building and content creation
- Artistic and innovative solutions

**Language Style**:
- Engaging, dynamic, expressive
- Storytelling approach
- Creative terminology
- Emphasis on innovation and impact

**Theme Configuration**:
```json
{
  "palette": "dark",
  "accent": "purple",
  "layout": "bold",
  "typography": "sans"
}
```

**Voice Agent Personality**:
- **Tone**: Enthusiastic, innovative, inspiring
- **Communication Style**: Storytelling, visual, engaging
- **Key Phrases**: "created", "designed", "innovated", "transformed"
- **Response Pattern**: Vision → Process → Impact

**Example Tagline Generation**:
- "Creates [type] experiences that [impact]"
- "Transforms [input] into [compelling output]"
- "Brings [vision] to life through [creative medium]"

### 3. Executive Profile Processing

**Content Focus**:
- Strategic leadership and vision
- High-level business impact
- Board experience and governance
- Industry thought leadership

**Language Style**:
- Authoritative, strategic, visionary
- High-level business language
- Focus on organizational impact
- Leadership and transformation emphasis

**Theme Configuration**:
```json
{
  "palette": "light",
  "accent": "gray",
  "layout": "classic",
  "typography": "serif"
}
```

**Voice Agent Personality**:
- **Tone**: Authoritative, strategic, visionary
- **Communication Style**: High-level, strategic, forward-thinking
- **Key Phrases**: "strategically", "transformed", "led", "vision"
- **Response Pattern**: Challenge → Strategy → Transformation

**Example Tagline Generation**:
- "Transforms organizations through [strategic approach]"
- "Drives [business outcome] via strategic [expertise]"
- "[X] years of executive leadership in [industry]"

### 4. Technical Profile Processing

**Content Focus**:
- Technical skills and certifications
- Programming languages and frameworks
- System architecture and design
- Technical project outcomes

**Language Style**:
- Precise, detailed, technical
- Specific technologies and methodologies
- Performance metrics and benchmarks
- Technical accuracy and depth

**Theme Configuration**:
```json
{
  "palette": "dark",
  "accent": "green",
  "layout": "minimal",
  "typography": "mono"
}
```

**Voice Agent Personality**:
- **Tone**: Precise, analytical, knowledgeable
- **Communication Style**: Technical, detailed, systematic
- **Key Phrases**: "developed", "optimized", "architected", "implemented"
- **Response Pattern**: Problem → Technical Solution → Performance

**Example Tagline Generation**:
- "Builds [technical solutions] that [performance outcome]"
- "Specializes in [technology stack] for [use case]"
- "[X] years of [technical expertise] delivering [results]"

### 5. Casual Profile Processing

**Content Focus**:
- Personal journey and story
- Diverse experience and adaptability
- Client relationships and testimonials
- Lifestyle and values alignment

**Language Style**:
- Conversational, approachable, personal
- Story-driven descriptions
- Relatable language and examples
- Emphasis on relationships and values

**Theme Configuration**:
```json
{
  "palette": "light",
  "accent": "orange",
  "layout": "friendly",
  "typography": "sans"
}
```

**Voice Agent Personality**:
- **Tone**: Friendly, approachable, authentic
- **Communication Style**: Conversational, story-driven, relatable
- **Key Phrases**: "helped", "collaborated", "partnered", "supported"
- **Response Pattern**: Story → Connection → Value

**Example Tagline Generation**:
- "Helps [target audience] achieve [outcome] through [approach]"
- "Your partner in [area of expertise]"
- "Making [complex thing] simple for [audience]"

---

## 🤖 Voice Agent Integration

### Personality Mapping

Each profile type generates a specific voice agent personality:

```json
{
  "professional": {
    "system_prompt": "You are a professional portfolio agent representing [Name]. You communicate clearly and confidently, focusing on business results and professional achievements. Use metrics and concrete examples when discussing experience.",
    "greeting": "Hello! I'm here to tell you about [Name]'s professional experience and achievements. What would you like to know?",
    "conversation_style": "structured, results-focused, professional"
  },
  
  "creative": {
    "system_prompt": "You are a creative portfolio agent representing [Name]. You're enthusiastic and engaging, telling stories about creative projects and innovative solutions. Use vivid language and focus on the creative process and impact.",
    "greeting": "Hey there! I'm excited to share [Name]'s creative journey and amazing projects. What sparks your curiosity?",
    "conversation_style": "storytelling, visual, inspiring"
  },
  
  "executive": {
    "system_prompt": "You are an executive portfolio agent representing [Name]. You communicate with authority and strategic vision, focusing on high-level business transformation and leadership impact. Speak about organizational change and strategic initiatives.",
    "greeting": "Good day. I represent [Name]'s executive experience and strategic leadership. How may I assist you in understanding their qualifications?",
    "conversation_style": "authoritative, strategic, visionary"
  },
  
  "technical": {
    "system_prompt": "You are a technical portfolio agent representing [Name]. You provide precise, detailed information about technical skills, projects, and achievements. Use specific technical terminology and focus on implementation details and performance metrics.",
    "greeting": "Hi! I can provide detailed information about [Name]'s technical expertise and projects. What technical area interests you?",
    "conversation_style": "precise, detailed, technical"
  },
  
  "casual": {
    "system_prompt": "You are a friendly portfolio agent representing [Name]. You're approachable and conversational, sharing personal stories and connecting on a human level. Focus on relationships, values, and the personal journey.",
    "greeting": "Hi there! I'd love to tell you about [Name]'s journey and how they might be able to help you. What brings you here today?",
    "conversation_style": "conversational, personal, relatable"
  }
}
```

### Voice Agent Context Generation

For each profile, generate specific context for the voice agent:

```json
{
  "key_achievements": ["Top 3 most impressive achievements"],
  "expertise_areas": ["Primary areas of expertise"],
  "current_focus": "What they're working on now",
  "availability": "Current availability status",
  "preferred_projects": ["Types of projects they prefer"],
  "conversation_topics": [
    "Experience with [specific skill/industry]",
    "Approach to [relevant challenge]",
    "Thoughts on [industry trend]"
  ]
}
```

---

## ✅ Processing Checklist

### Pre-Processing
- [ ] Identify resume format and structure
- [ ] Extract all text content accurately
- [ ] Determine profile type based on content analysis
- [ ] Validate completeness of extracted information

### Content Processing
- [ ] Apply profile-specific language and tone
- [ ] Generate appropriate taglines and descriptions
- [ ] Structure information according to profile hierarchy
- [ ] Ensure all required fields are populated

### Theme Application
- [ ] Set appropriate color palette and accent
- [ ] Choose suitable layout and typography
- [ ] Configure visual elements for profile type
- [ ] Ensure accessibility and readability

### Voice Agent Setup
- [ ] Generate personality-appropriate system prompt
- [ ] Create relevant conversation starters
- [ ] Define key talking points and expertise areas
- [ ] Set appropriate tone and communication style

### Validation
- [ ] Verify JSON schema compliance
- [ ] Check for missing required fields
- [ ] Validate URLs and contact information
- [ ] Ensure consistency across all sections

---

## 🎨 Visual Style Guidelines

### Professional
- **Colors**: Blues (#2563eb), grays (#6b7280), whites
- **Typography**: Clean sans-serif (Inter, Helvetica)
- **Layout**: Grid-based, structured, hierarchical
- **Elements**: Minimal icons, clean lines, professional imagery

### Creative
- **Colors**: Purples (#8b5cf6), pinks (#ec4899), gradients
- **Typography**: Modern sans-serif with personality
- **Layout**: Dynamic, asymmetrical, visual hierarchy
- **Elements**: Bold graphics, animations, creative imagery

### Executive
- **Colors**: Navy (#1e3a8a), grays (#374151), whites
- **Typography**: Classic serif (Georgia, Times)
- **Layout**: Traditional, formal, structured
- **Elements**: Minimal decoration, professional photography

### Technical
- **Colors**: Greens (#10b981), blues (#3b82f6), dark themes
- **Typography**: Monospace accents (Fira Code, Monaco)
- **Layout**: Clean, systematic, data-focused
- **Elements**: Code snippets, technical diagrams, metrics

### Casual
- **Colors**: Warm oranges (#f97316), friendly blues (#06b6d4)
- **Typography**: Friendly sans-serif (Poppins, Open Sans)
- **Layout**: Relaxed, conversational, approachable
- **Elements**: Personal photos, casual imagery, warm tones

---

## 🚀 Implementation Examples

### Professional Profile Example
```json
{
  "profile_type": "professional",
  "hero": {
    "tagline": "Delivers measurable business results through strategic product management",
    "stats": [
      { "value": "8+", "label": "Years Experience" },
      { "value": "$2M+", "label": "Revenue Generated" },
      { "value": "15+", "label": "Products Launched" }
    ]
  },
  "voice_agent": {
    "personality": "professional",
    "key_talking_points": [
      "Product strategy and roadmapping",
      "Cross-functional team leadership",
      "Data-driven decision making"
    ]
  }
}
```

### Creative Profile Example
```json
{
  "profile_type": "creative",
  "hero": {
    "tagline": "Creates compelling visual experiences that drive engagement and conversion",
    "stats": [
      { "value": "100+", "label": "Designs Created" },
      { "value": "50%", "label": "Avg. Engagement Increase" },
      { "value": "25+", "label": "Happy Clients" }
    ]
  },
  "voice_agent": {
    "personality": "creative",
    "key_talking_points": [
      "Design thinking and user experience",
      "Brand identity and visual storytelling",
      "Creative problem-solving approach"
    ]
  }
}
```

---

## 📋 Quality Assurance

### Content Quality Checks
- **Accuracy**: All information matches source resume
- **Completeness**: Required fields populated for profile type
- **Consistency**: Tone and style match profile type
- **Relevance**: Content appropriate for target audience

### Technical Quality Checks
- **Schema Validation**: JSON structure matches specification
- **URL Validation**: All links are properly formatted and accessible
- **Data Types**: All fields contain correct data types
- **Required Fields**: No missing required information

### Voice Agent Quality Checks
- **Personality Consistency**: Agent behavior matches profile type
- **Knowledge Accuracy**: Agent has correct information about person
- **Conversation Flow**: Natural and engaging interaction patterns
- **Response Quality**: Helpful and relevant responses

---

## 🔧 Troubleshooting

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Profile type misidentification | Ambiguous resume content | Use keyword scoring system with thresholds |
| Missing contact information | Resume format variations | Implement multiple extraction patterns |
| Inconsistent tone | Mixed profile characteristics | Apply dominant profile type rules |
| Voice agent personality mismatch | Incorrect profile classification | Re-evaluate profile type determination |
| Incomplete project information | Limited resume details | Generate reasonable defaults, mark as incomplete |

### Validation Rules

```javascript
// Profile Type Validation
function validateProfileType(resumeData) {
  const scores = {
    professional: calculateProfessionalScore(resumeData),
    creative: calculateCreativeScore(resumeData),
    executive: calculateExecutiveScore(resumeData),
    technical: calculateTechnicalScore(resumeData),
    casual: calculateCasualScore(resumeData)
  };
  
  return Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
}

// Required Fields Check
function validateRequiredFields(profileData, profileType) {
  const requiredFields = getRequiredFieldsForProfile(profileType);
  return requiredFields.every(field => 
    profileData[field] && profileData[field] !== ""
  );
}
```

---

## 📈 Success Metrics

### Processing Accuracy
- **Profile Type Detection**: >95% accuracy
- **Information Extraction**: >98% accuracy for standard fields
- **Theme Application**: 100% consistency with profile type
- **Voice Agent Setup**: Personality alignment score >90%

### User Experience
- **Processing Time**: <30 seconds per resume
- **Generated Page Quality**: User satisfaction >4.5/5
- **Voice Agent Engagement**: Average conversation length >2 minutes
- **Conversion Rate**: Contact form completion >15%

---

## 🔄 Continuous Improvement

### Feedback Loop
1. **User Feedback**: Collect ratings on generated profiles
2. **A/B Testing**: Test different taglines and descriptions
3. **Performance Monitoring**: Track voice agent conversation quality
4. **Content Analysis**: Analyze successful vs. unsuccessful profiles

### Model Updates
- **Profile Type Refinement**: Improve classification accuracy
- **Language Enhancement**: Update tone and style guidelines
- **Voice Agent Training**: Enhance personality consistency
- **Schema Evolution**: Add new fields based on user needs

---

**Last Updated**: October 4, 2025  
**Version**: 1.0  
**Status**: Ready for Implementation
