# Strands Agent System

A generalized framework for creating AI agents from resume JSON data. This system processes professional information and generates specialized AI agents with different personalities and use cases.

## Overview

The Strands Agent System transforms structured resume data (JSON) into intelligent AI agents that can:
- Conduct first-person interviews
- Showcase portfolios
- Network professionally
- Adapt to different personality types

## System Architecture

```
PDF Resume → Text Extraction → JSON Structure → Agent Generation → Specialized Prompts
```

### Core Components

1. **ResumeProcessor**: Extracts and analyzes resume data
2. **PromptBuilder**: Creates customized prompts based on personality types
3. **StrandsAgent**: Main agent class with multiple prompt generation methods
4. **AgentFactory**: Factory pattern for creating agents
5. **ResumeProcessingPipeline**: End-to-end processing (PDF → Agent)

## Installation

```bash
# Clone the repository
cd /ai/strands

# Install dependencies (if needed)
pip install -r requirements.txt  # Create this based on your needs
```

## Usage

### Basic Usage

```python
from strands_agent import AgentFactory, AgentPersonality

# Create agent from JSON file
agent = AgentFactory.create_from_json_file('resume.json')

# Generate interview prompt
interview_prompt = agent.get_interview_prompt()

# Generate portfolio prompt
portfolio_prompt = agent.get_portfolio_prompt()

# Generate networking prompt  
networking_prompt = agent.get_networking_prompt()
```

### Command Line Interface

```bash
# Generate interview agent with professional personality
python generate_agent.py -i resume.json -p professional -t interview -o agent_prompt.md

# Generate all personalities and prompt types
python generate_agent.py -i resume.json --all-personalities -o outputs/

# Validate JSON schema
python generate_agent.py -i resume.json --validate-only

# Generate example prompts for Jerel (no arguments)
python generate_agent.py
```

### Different Personality Types

The system supports five personality types:
- **Professional**: Clear, confident, metrics-focused
- **Creative**: Engaging, innovative, expressive
- **Executive**: Strategic, authoritative, visionary
- **Technical**: Precise, analytical, detail-oriented
- **Casual**: Friendly, approachable, conversational

```python
# Create agent with specific personality
from strands_agent import AgentPersonality

agent = AgentFactory.create_from_json_file(
    'resume.json', 
    AgentPersonality.CREATIVE
)
```

## JSON Schema

The system expects resume data in the following JSON structure:

```json
{
  "schema_version": "1.0",
  "generated_at": "2025-09-16",
  "profile": {
    "name": "Full Name",
    "headline": "Professional Title",
    "location": "City, Country",
    "email": "email@example.com",
    "summary": "Professional summary...",
    "keywords": ["skill1", "skill2"]
  },
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "start_date": "2024-01",
      "end_date": "Present",
      "summary": "Role description",
      "highlights": [
        "Achievement with metrics",
        "Another quantifiable result"
      ]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "role": "Your Role",
      "summary": "Description",
      "impact": "Measurable impact"
    }
  ],
  "skills": ["Skill 1", "Skill 2"],
  "education": [
    {
      "institution": "University",
      "program": "Degree/Certification"
    }
  ],
  "awards": ["Award 1", "Award 2"]
}
```

## Processing Pipeline

### PDF to JSON to Agent

The complete pipeline processes resumes through three stages:

1. **PDF Extraction** (Conceptual - requires implementation)
   ```python
   text = ResumeProcessingPipeline.pdf_to_text('resume.pdf')
   ```

2. **JSON Structuring** (Conceptual - requires LLM/NLP)
   ```python
   resume_json = ResumeProcessingPipeline.text_to_json(text, use_llm=True)
   ```

3. **Agent Creation**
   ```python
   agent = StrandsAgent(resume_json, AgentPersonality.PROFESSIONAL)
   ```

### Full Implementation Example

```python
# Process resume from PDF to Agent
agent = ResumeProcessingPipeline.process_resume(
    'resume.pdf',
    AgentPersonality.PROFESSIONAL
)

# Export prompts
agent.export_prompt('interview', 'interview_agent.md')
agent.export_prompt('portfolio', 'portfolio_agent.md')
agent.export_prompt('networking', 'networking_agent.md')
```

## Prompt Types

### Interview Agent
- First-person responses
- Metrics-backed answers
- Professional tone
- 30-60 second responses

### Portfolio Agent
- Showcase achievements
- Guide visitors
- Highlight impact
- Engagement focused

### Networking Agent
- Build connections
- Share expertise
- Explore collaborations
- Value-first approach

## Advanced Features

### Custom Templates

```python
# Create custom prompt with placeholders
template = """
You are {name}, a {headline} with {years} years of experience.
Your recent role: {recent_role} at {recent_company}
Key skills: {skills}
"""

custom_prompt = agent.get_custom_prompt(template)
```

### Multiple Personalities

```python
# Generate agents for all personalities
agents = AgentFactory.create_multiple_personalities(resume_json)

for personality, agent in agents.items():
    print(f"{personality}: {agent.get_interview_prompt()[:100]}")
```

### Schema Validation

```python
# Validate resume JSON structure
is_valid = ResumeProcessingPipeline.validate_json_schema(resume_json)
if not is_valid:
    print("Schema validation failed")
```

## Extending the System

### Adding New Personality Types

1. Add to the `AgentPersonality` enum
2. Update tone mappings in `PromptBuilder`
3. Define personality-specific behaviors

### Adding New Prompt Types

1. Create new method in `PromptBuilder`
2. Add to `StrandsAgent` class
3. Update export methods

### Implementing PDF Processing

The system includes placeholders for PDF processing. To implement:

1. Install PDF libraries: `pip install pdfplumber PyPDF2`
2. Implement `pdf_to_text` method
3. Use LLM or NLP for `text_to_json`
4. Map to schema structure

## Example Output

### Professional Interview Agent
```
# John Doe AI Agent

## Role
You are **John Doe AI**, a first-person interview agent...

## Instructions & Guidelines
* Speak in first person as John Doe
* Maintain a confident, clear, and professional tone
* Keep answers concise (30-60 seconds)
...
```

## Best Practices

1. **Data Quality**: Ensure resume JSON includes quantifiable metrics
2. **Personality Selection**: Choose personality based on use case
3. **Prompt Length**: Keep generated prompts focused and concise
4. **Validation**: Always validate JSON schema before processing
5. **Privacy**: Handle personal information securely

## Troubleshooting

### Common Issues

1. **JSON Parse Error**: Check for valid JSON syntax
2. **Missing Fields**: Ensure required fields (name, headline) exist
3. **Empty Prompts**: Verify data contains experience/skills
4. **File Not Found**: Use absolute paths when needed

### Debug Mode

```python
import logging
logging.basicConfig(level=logging.DEBUG)

# This will show detailed processing information
agent = AgentFactory.create_from_json_file('resume.json')
```

## Future Enhancements

- [ ] Implement actual PDF parsing
- [ ] Add LLM-based text extraction
- [ ] Support multiple languages
- [ ] Add conversation memory
- [ ] Implement RAG for dynamic responses
- [ ] Create web API interface
- [ ] Add batch processing
- [ ] Support different resume formats

## Contributing

To extend or improve the system:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

## License

[Your License Here]

## Support

For questions or issues, please contact [your contact info]
