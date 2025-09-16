"""
Strands Agent System
A generalized framework for creating AI agents from resume JSON data.
"""

import json
from typing import Dict, List, Optional, Any
from datetime import datetime
from enum import Enum


class AgentPersonality(Enum):
    """Different agent personality types based on use case."""
    PROFESSIONAL = "professional"
    CREATIVE = "creative"
    EXECUTIVE = "executive"
    TECHNICAL = "technical"
    CASUAL = "casual"


class ResumeProcessor:
    """Processes resume JSON data and extracts key information."""
    
    def __init__(self, resume_json: Dict[str, Any]):
        self.data = resume_json
        self.profile = self.data.get('profile', {})
        self.experience = self.data.get('experience', [])
        self.projects = self.data.get('projects', [])
        self.skills = self.data.get('skills', [])
        self.education = self.data.get('education', [])
        self.awards = self.data.get('awards', [])
        
    def get_name(self) -> str:
        """Extract the person's name."""
        return self.profile.get('name', 'Professional')
    
    def get_headline(self) -> str:
        """Extract the professional headline."""
        return self.profile.get('headline', 'Professional')
    
    def get_summary(self) -> str:
        """Extract the professional summary."""
        return self.profile.get('summary', '')
    
    def get_total_experience_years(self) -> int:
        """Calculate total years of experience."""
        if not self.experience:
            return 0
        
        years = 0
        for exp in self.experience:
            start = exp.get('start_date', '')
            end = exp.get('end_date', 'Present')
            
            # Simple year extraction (can be enhanced)
            if start and '-' in start:
                start_year = int(start.split('-')[0])
                if end == 'Present':
                    end_year = datetime.now().year
                elif '-' in end:
                    end_year = int(end.split('-')[0])
                else:
                    end_year = start_year
                
                years += (end_year - start_year)
        
        return years
    
    def get_key_metrics(self) -> List[Dict[str, Any]]:
        """Extract key quantifiable achievements."""
        metrics = []
        
        for exp in self.experience:
            for highlight in exp.get('highlights', []):
                # Look for numbers and metrics in highlights
                if any(char.isdigit() for char in highlight):
                    metrics.append({
                        'company': exp.get('company'),
                        'metric': highlight,
                        'role': exp.get('title')
                    })
        
        for project in self.projects:
            if project.get('impact'):
                metrics.append({
                    'project': project.get('name'),
                    'metric': project.get('impact'),
                    'role': project.get('role')
                })
        
        return metrics
    
    def get_recent_roles(self, count: int = 2) -> List[Dict[str, Any]]:
        """Get the most recent roles."""
        sorted_exp = sorted(
            self.experience, 
            key=lambda x: (x.get('end_date') == 'Present', x.get('start_date', '')), 
            reverse=True
        )
        return sorted_exp[:count]
    
    def get_skills_by_category(self) -> Dict[str, List[str]]:
        """Categorize skills into groups."""
        categories = {
            'technical': [],
            'leadership': [],
            'strategic': [],
            'tools': [],
            'other': []
        }
        
        technical_keywords = ['AI', 'ML', 'Engineering', 'Development', 'Architecture', 'Programming', 'API', 'Cloud', 'Data']
        leadership_keywords = ['Leadership', 'Management', 'Team', 'Cross-functional', 'Stakeholder']
        strategic_keywords = ['Strategy', 'Planning', 'Roadmap', 'OKR', 'GTM', 'PLG', 'Vision']
        tool_keywords = ['Agile', 'Scrum', 'JIRA', 'Analytics']
        
        for skill in self.skills:
            categorized = False
            
            if any(keyword in skill for keyword in technical_keywords):
                categories['technical'].append(skill)
                categorized = True
            elif any(keyword in skill for keyword in leadership_keywords):
                categories['leadership'].append(skill)
                categorized = True
            elif any(keyword in skill for keyword in strategic_keywords):
                categories['strategic'].append(skill)
                categorized = True
            elif any(keyword in skill for keyword in tool_keywords):
                categories['tools'].append(skill)
                categorized = True
            
            if not categorized:
                categories['other'].append(skill)
        
        return categories


class PromptBuilder:
    """Builds customized prompts based on resume data and personality type."""
    
    def __init__(self, processor: ResumeProcessor, personality: AgentPersonality = AgentPersonality.PROFESSIONAL):
        self.processor = processor
        self.personality = personality
        self.name = processor.get_name()
        
    def build_interview_agent_prompt(self) -> str:
        """Build a prompt for an interview agent."""
        metrics = self.processor.get_key_metrics()
        recent_roles = self.processor.get_recent_roles()
        skills = self.processor.get_skills_by_category()
        
        prompt = f"""# {self.name} AI Agent

## Role
You are **{self.name} AI**, a first-person interview agent that answers questions **as {self.name}**. 
Your job is to provide clear, metrics-backed answers that accurately represent {self.name}'s experience and capabilities.

## Instructions & Guidelines

### Voice & POV
* Speak in **first person** as {self.name}
* Maintain a {self._get_tone()} tone
* Be authentic and genuine in responses

### Response Format
* Keep answers **concise** (30-60 seconds spoken, ~80-150 words)
* Lead with the **main point**, then provide supporting details
* Use **specific metrics and outcomes** when available
* Structure complex answers with 3-5 bullet points

### Boundaries & Accuracy
* Only use information from the provided context
* Never invent details about employment, education, or achievements
* If information isn't available, say: "I don't have that specific detail on hand"
* For confidential information, share approach and impact without sensitive details

## Context Data

### Professional Summary
{self.processor.get_summary()}

### Experience Overview
* Total Years: ~{self.processor.get_total_experience_years()} years
* Current Role: {recent_roles[0]['title'] if recent_roles else 'Not specified'} at {recent_roles[0]['company'] if recent_roles else 'Not specified'}
* Headline: {self.processor.get_headline()}

### Key Achievements & Metrics
{self._format_metrics(metrics[:5])}

### Recent Experience
{self._format_recent_roles(recent_roles)}

### Core Skills
{self._format_skills(skills)}

### Education & Certifications
{self._format_education()}

### Key Projects
{self._format_projects()}

## Response Examples

### 30-Second Introduction
"I'm {self.name}, {self.processor.get_headline()} with {self.processor.get_total_experience_years()} years of experience. {self._generate_intro_highlights()}"

### Impact Example
{self._generate_impact_example()}

### Working Style
{self._generate_working_style()}

---
Remember: Be authentic, specific, and professional. Let the achievements speak for themselves."""
        
        return prompt
    
    def build_portfolio_agent_prompt(self) -> str:
        """Build a prompt for a portfolio/showcase agent."""
        return f"""# Portfolio Agent for {self.name}

## Role
You are a portfolio showcase agent representing {self.name}'s professional work and achievements.
Your purpose is to guide visitors through {self.name}'s career highlights and help them understand
the value and impact of their work.

## Personality
* {self._get_portfolio_tone()}
* Enthusiastic about showcasing achievements
* Helpful in connecting visitors with relevant information
* Professional yet approachable

## Key Information to Highlight

### Professional Identity
* Name: {self.name}
* Title: {self.processor.get_headline()}
* Experience: {self.processor.get_total_experience_years()} years

### Signature Achievements
{self._format_metrics(self.processor.get_key_metrics()[:3])}

### Featured Projects
{self._format_projects()}

### Areas of Expertise
{self._format_expertise_areas()}

## Interaction Guidelines
1. Welcome visitors warmly
2. Understand their interests (hiring, collaboration, learning)
3. Guide them to relevant sections
4. Share specific examples when asked
5. Provide contact information when appropriate

## Response Framework
* Start with acknowledgment
* Provide relevant information
* Suggest next steps or additional areas to explore
* Maintain engagement"""
    
    def build_networking_agent_prompt(self) -> str:
        """Build a prompt for a networking/social agent."""
        return f"""# Networking Agent for {self.name}

## Role
You represent {self.name} in professional networking contexts, helping to build meaningful
connections and explore collaboration opportunities.

## Core Message
{self.processor.get_summary()}

## Networking Objectives
1. Build authentic professional relationships
2. Share knowledge and expertise
3. Explore collaboration opportunities
4. Contribute to professional communities

## Key Talking Points
* Current Focus: {self._get_current_focus()}
* Areas of Expertise: {', '.join(self.processor.get_skills_by_category()['technical'][:5])}
* Recent Achievements: {self._get_recent_achievement()}
* Collaboration Interests: Open to {self._get_collaboration_interests()}

## Conversation Approach
* Start with genuine interest in the other person
* Share relevant experiences when appropriate
* Look for mutual interests and synergies
* Offer value before asking for anything
* Follow up on promising connections"""
    
    def _get_tone(self) -> str:
        """Get the appropriate tone based on personality."""
        tones = {
            AgentPersonality.PROFESSIONAL: "confident, clear, and professional",
            AgentPersonality.CREATIVE: "engaging, innovative, and expressive",
            AgentPersonality.EXECUTIVE: "strategic, authoritative, and visionary",
            AgentPersonality.TECHNICAL: "precise, analytical, and detail-oriented",
            AgentPersonality.CASUAL: "friendly, approachable, and conversational"
        }
        return tones.get(self.personality, "professional")
    
    def _get_portfolio_tone(self) -> str:
        """Get portfolio-specific tone."""
        tones = {
            AgentPersonality.PROFESSIONAL: "Professional and informative",
            AgentPersonality.CREATIVE: "Dynamic and engaging",
            AgentPersonality.EXECUTIVE: "Sophisticated and strategic",
            AgentPersonality.TECHNICAL: "Detailed and comprehensive",
            AgentPersonality.CASUAL: "Friendly and accessible"
        }
        return tones.get(self.personality, "Professional")
    
    def _format_metrics(self, metrics: List[Dict]) -> str:
        """Format metrics for prompt."""
        if not metrics:
            return "* No specific metrics available"
        
        formatted = []
        for m in metrics:
            if m.get('company'):
                formatted.append(f"* **{m['company']}**: {m['metric']}")
            elif m.get('project'):
                formatted.append(f"* **{m['project']}**: {m['metric']}")
        
        return '\n'.join(formatted)
    
    def _format_recent_roles(self, roles: List[Dict]) -> str:
        """Format recent roles for prompt."""
        if not roles:
            return "* No recent roles specified"
        
        formatted = []
        for role in roles[:3]:
            formatted.append(f"* **{role.get('title')}** at {role.get('company')} ({role.get('start_date', '')} - {role.get('end_date', '')})")
            if role.get('summary'):
                formatted.append(f"  - {role['summary']}")
        
        return '\n'.join(formatted)
    
    def _format_skills(self, skills: Dict[str, List]) -> str:
        """Format categorized skills."""
        formatted = []
        
        if skills['technical']:
            formatted.append(f"* **Technical**: {', '.join(skills['technical'][:5])}")
        if skills['leadership']:
            formatted.append(f"* **Leadership**: {', '.join(skills['leadership'][:3])}")
        if skills['strategic']:
            formatted.append(f"* **Strategic**: {', '.join(skills['strategic'][:3])}")
        
        return '\n'.join(formatted) if formatted else "* Skills not categorized"
    
    def _format_education(self) -> str:
        """Format education information."""
        if not self.processor.education:
            return "* Education details not specified"
        
        formatted = []
        for edu in self.processor.education[:2]:
            formatted.append(f"* **{edu.get('institution', 'Unknown')}**: {edu.get('program', 'Program not specified')}")
        
        return '\n'.join(formatted)
    
    def _format_projects(self) -> str:
        """Format project information."""
        if not self.processor.projects:
            return "* No projects specified"
        
        formatted = []
        for proj in self.processor.projects[:3]:
            formatted.append(f"* **{proj.get('name')}**: {proj.get('summary', 'No description')}")
            if proj.get('impact'):
                formatted.append(f"  - Impact: {proj['impact']}")
        
        return '\n'.join(formatted)
    
    def _format_expertise_areas(self) -> str:
        """Format areas of expertise."""
        skills = self.processor.get_skills_by_category()
        areas = []
        
        for category, skill_list in skills.items():
            if skill_list and category != 'other':
                areas.append(f"* **{category.title()}**: {len(skill_list)} competencies")
        
        return '\n'.join(areas) if areas else "* Expertise areas not specified"
    
    def _generate_intro_highlights(self) -> str:
        """Generate introduction highlights."""
        metrics = self.processor.get_key_metrics()
        if metrics and len(metrics) > 0:
            highlight = metrics[0]['metric']
            # Truncate if too long
            if len(highlight) > 150:
                highlight = highlight[:147] + "..."
            return f"Most recently, {highlight}"
        return f"I bring expertise in {', '.join(self.processor.skills[:3])}" if self.processor.skills else ""
    
    def _generate_impact_example(self) -> str:
        """Generate an impact example."""
        metrics = self.processor.get_key_metrics()
        if metrics:
            m = metrics[0]
            return f"When asked about impact: At {m.get('company', m.get('project', 'a recent role'))}, {m['metric']}"
        return "When asked about impact: I focus on delivering measurable results and continuous improvement."
    
    def _generate_working_style(self) -> str:
        """Generate working style description."""
        skills = self.processor.get_skills_by_category()
        
        if skills['leadership']:
            return f"I lead with a focus on {skills['leadership'][0].lower()} and collaborative problem-solving."
        return "I believe in data-driven decisions and iterative improvement."
    
    def _get_current_focus(self) -> str:
        """Get current professional focus."""
        recent = self.processor.get_recent_roles(1)
        if recent:
            return f"{recent[0].get('title')} at {recent[0].get('company')}"
        return "Professional development and new opportunities"
    
    def _get_recent_achievement(self) -> str:
        """Get a recent achievement."""
        metrics = self.processor.get_key_metrics()
        if metrics:
            return metrics[0]['metric'][:100] + "..." if len(metrics[0]['metric']) > 100 else metrics[0]['metric']
        return "Continuous professional growth"
    
    def _get_collaboration_interests(self) -> str:
        """Get collaboration interests based on skills."""
        skills = self.processor.get_skills_by_category()
        if skills['technical']:
            return f"projects involving {skills['technical'][0]}"
        return "innovative projects and strategic initiatives"


class StrandsAgent:
    """Main Strands Agent that can act with different personalities and contexts."""
    
    def __init__(self, resume_json: Dict[str, Any], personality: AgentPersonality = AgentPersonality.PROFESSIONAL):
        self.processor = ResumeProcessor(resume_json)
        self.prompt_builder = PromptBuilder(self.processor, personality)
        self.personality = personality
        self.context = resume_json
        
    def get_interview_prompt(self) -> str:
        """Get the interview agent prompt."""
        return self.prompt_builder.build_interview_agent_prompt()
    
    def get_portfolio_prompt(self) -> str:
        """Get the portfolio agent prompt."""
        return self.prompt_builder.build_portfolio_agent_prompt()
    
    def get_networking_prompt(self) -> str:
        """Get the networking agent prompt."""
        return self.prompt_builder.build_networking_agent_prompt()
    
    def get_custom_prompt(self, template: str) -> str:
        """Generate a custom prompt using a template."""
        # Replace placeholders in the template with actual data
        replacements = {
            '{name}': self.processor.get_name(),
            '{headline}': self.processor.get_headline(),
            '{summary}': self.processor.get_summary(),
            '{years}': str(self.processor.get_total_experience_years()),
            '{recent_role}': self.processor.get_recent_roles(1)[0]['title'] if self.processor.get_recent_roles(1) else 'Professional',
            '{recent_company}': self.processor.get_recent_roles(1)[0]['company'] if self.processor.get_recent_roles(1) else 'Company',
            '{skills}': ', '.join(self.processor.skills[:5]) if self.processor.skills else 'various skills'
        }
        
        for key, value in replacements.items():
            template = template.replace(key, value)
        
        return template
    
    def export_prompt(self, prompt_type: str, output_file: Optional[str] = None) -> str:
        """Export a prompt to file or return as string."""
        prompts = {
            'interview': self.get_interview_prompt(),
            'portfolio': self.get_portfolio_prompt(),
            'networking': self.get_networking_prompt()
        }
        
        prompt = prompts.get(prompt_type, self.get_interview_prompt())
        
        if output_file:
            with open(output_file, 'w') as f:
                f.write(prompt)
            return f"Prompt exported to {output_file}"
        
        return prompt


class AgentFactory:
    """Factory for creating different types of agents from resume data."""
    
    @staticmethod
    def create_from_json_file(json_file: str, personality: AgentPersonality = AgentPersonality.PROFESSIONAL) -> StrandsAgent:
        """Create an agent from a JSON file."""
        with open(json_file, 'r') as f:
            # Handle both .json and .md files containing JSON
            content = f.read()
            
            # If it's a markdown file with JSON, extract the JSON
            if json_file.endswith('.md'):
                # Look for JSON content between code blocks or just parse directly
                import re
                json_match = re.search(r'```json\s*([\s\S]*?)\s*```', content)
                if json_match:
                    content = json_match.group(1)
                else:
                    # Try to find JSON starting with {
                    json_start = content.find('{')
                    if json_start != -1:
                        content = content[json_start:]
            
            # Clean up escaped characters if present (common in markdown)
            # Replace all common escape sequences
            escape_pairs = [
                (r'\_', '_'),
                (r'\[', '['),
                (r'\]', ']'),
                (r'\~', '~'),
                (r'\:', ':'),
                (r'\@', '@'),
                (r'\&', '&'),
                (r'\#', '#'),
                (r'\$', '$'),
                (r'\%', '%'),
                (r'\^', '^'),
                (r'\*', '*'),
                (r'\(', '('),
                (r'\)', ')'),
                (r'\{', '{'),
                (r'\}', '}'),
                (r'\|', '|'),
                (r'\<', '<'),
                (r'\>', '>'),
                (r'\'', "'"),
                (r'\"', '"'),
                (r'\`', '`'),
                (r'\\', '\\')
            ]
            
            for old, new in escape_pairs:
                content = content.replace(old, new)
            
            # Parse the JSON
            resume_data = json.loads(content)
            
        return StrandsAgent(resume_data, personality)
    
    @staticmethod
    def create_from_dict(resume_dict: Dict[str, Any], personality: AgentPersonality = AgentPersonality.PROFESSIONAL) -> StrandsAgent:
        """Create an agent from a dictionary."""
        return StrandsAgent(resume_dict, personality)
    
    @staticmethod
    def create_multiple_personalities(resume_json: Dict[str, Any]) -> Dict[str, StrandsAgent]:
        """Create agents with all personality types."""
        agents = {}
        for personality in AgentPersonality:
            agents[personality.value] = StrandsAgent(resume_json, personality)
        return agents


# PDF to JSON Processing Pipeline (Conceptual)
class ResumeProcessingPipeline:
    """
    Conceptual pipeline for processing resumes from PDF to JSON to Agents.
    
    The full implementation would require:
    1. PDF parsing library (PyPDF2, pdfplumber, etc.)
    2. NLP for entity extraction (spaCy, NLTK, or LLM)
    3. Structure mapping to our JSON schema
    """
    
    @staticmethod
    def pdf_to_text(pdf_path: str) -> str:
        """
        Extract text from PDF.
        This is a placeholder - actual implementation would use PDF libraries.
        """
        # Placeholder for PDF extraction
        # In production, use: pdfplumber, PyPDF2, or cloud services
        return "Extracted PDF text would go here"
    
    @staticmethod
    def text_to_json(text: str, use_llm: bool = True) -> Dict[str, Any]:
        """
        Convert resume text to structured JSON.
        
        This could use:
        1. LLM with structured output (OpenAI, Claude, etc.)
        2. NLP libraries for entity extraction
        3. Rule-based parsing for common formats
        """
        # Basic structure template
        template = {
            "schema_version": "1.0",
            "generated_at": datetime.now().strftime("%Y-%m-%d"),
            "source_citation": "Processed from PDF",
            "page": {
                "slug": "",
                "title": "",
                "seo_description": "",
                "theme": {"palette": "light", "accent": "blue", "layout": "clean"},
                "sections_order": ["hero", "about", "experience", "projects", "skills", "education", "contact"]
            },
            "profile": {
                "name": "",
                "headline": "",
                "location": "",
                "email": "",
                "summary": "",
                "keywords": []
            },
            "experience": [],
            "projects": [],
            "skills": [],
            "education": [],
            "awards": [],
            "links": [],
            "contact": {}
        }
        
        if use_llm:
            # Placeholder for LLM-based extraction
            # prompt = f"Extract resume information from: {text}"
            # response = llm.extract_structured(prompt, schema=template)
            pass
        else:
            # Placeholder for rule-based extraction
            # Use regex, NLP libraries, etc.
            pass
        
        return template
    
    @staticmethod
    def process_resume(pdf_path: str, personality: AgentPersonality = AgentPersonality.PROFESSIONAL) -> StrandsAgent:
        """
        Complete pipeline: PDF -> Text -> JSON -> Agent
        """
        # Step 1: Extract text from PDF
        text = ResumeProcessingPipeline.pdf_to_text(pdf_path)
        
        # Step 2: Convert to structured JSON
        resume_json = ResumeProcessingPipeline.text_to_json(text)
        
        # Step 3: Create agent
        agent = StrandsAgent(resume_json, personality)
        
        return agent
    
    @staticmethod
    def validate_json_schema(resume_json: Dict[str, Any]) -> bool:
        """
        Validate that the JSON follows our expected schema.
        """
        required_fields = ['profile', 'experience', 'skills']
        profile_fields = ['name', 'headline']
        
        # Check top-level fields
        for field in required_fields:
            if field not in resume_json:
                return False
        
        # Check profile fields
        profile = resume_json.get('profile', {})
        for field in profile_fields:
            if field not in profile:
                return False
        
        return True
