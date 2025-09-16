# Portfolio Agents

Transform your static resume into an interactive, AI-powered portfolio that tells your career story.

## 🎯 Overview

Portfolio Agents is a platform that converts traditional resumes into dynamic, personalized landing pages powered by AI agents. Job seekers, freelancers, and professionals can upload their resume and instantly generate a professional portfolio with an embedded AI agent that can answer questions about their experience, skills, and career journey.

### Core Value Proposition

- **Resume to Portfolio**: Instantly transform your static resume into a modern, interactive landing page
- **AI Agent Representative**: An intelligent agent that represents you, answers questions, and tells your career story
- **Shareable & Professional**: Generate a unique link to share with employers, clients, and your network

## 🚀 Key Features

### MVP Features
- **Resume Upload & Parsing**: Upload PDF/DOC resumes with automatic data extraction
- **AI Agent Creation**: Customize tone, highlight key stories, and add personal context
- **Interactive Portfolio**: Auto-generated landing page with embedded AI chat
- **VAPI Onboarding**: Conversational Q&A to add narrative depth to your AI agent
- **Shareable Links**: Unique URLs for easy sharing with potential employers/clients

### Future Features
- **Custom Templates**: Multiple themes and color schemes
- **Analytics Dashboard**: Track visits and AI agent interactions
- **Multi-language Support**: Reach global audiences
- **Custom Domains**: Professional branding options
- **AI Video Avatars**: Next-level personal representation

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework**: Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui + Radix primitives
- **Package Manager**: pnpm
- **AI Frameworks**: 
  - [Strands Agents SDK](https://strandsagents.com/latest/documentation/docs/) - Production-ready AI agent framework
  - [VAPI](https://docs.vapi.ai/quickstart/introduction) - Voice AI platform for phone and web calls
- **AI Integration**: Multi-modal agents with voice and text capabilities
- **Streaming**: Server-Sent Events (SSE) for real-time interactions

### Project Structure
```
portfolio-agents/
├── ai/                     # AI agent implementations and environments
│   └── venv/              # Python virtual environment for AI agents
├── app/                    # Next.js App Router pages
│   ├── jerel/             # Example portfolio page
│   └── page.tsx           # Landing page
├── components/            # React components (Atomic Design)
│   ├── atoms/             # Basic UI elements (Badge, etc.)
│   ├── molecules/         # Composed components (Cards, etc.)
│   └── organisms/         # Complex sections (Hero, Contact, etc.)
├── lib/                   # Utilities and configurations
├── jerel-agent.py         # AI agent implementation
├── jerel-resume-json.md   # Structured resume data
└── agent-instruction.md   # AI agent behavior guidelines
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Python 3.8+ (for AI agents)
- pnpm package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-agents
   ```

2. **Install dependencies**
   ```bash
   cd portfolio-agents
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure required variables:
   - `NEXT_PUBLIC_APP_ENV`
   - `NEXT_PUBLIC_API_BASE_URL`

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### AI Agent Setup

1. **Set up Python environment**
   ```bash
   cd ai
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install AI frameworks**
   ```bash
   # Install Strands Agents SDK
   pip install strands-agents
   
   # Install VAPI SDK (when available)
   pip install vapi-python
   ```

3. **Configure AI credentials**
   Set up environment variables for your chosen AI providers:
   ```bash
   # For Amazon Bedrock (Strands default)
   export AWS_ACCESS_KEY_ID=your_access_key
   export AWS_SECRET_ACCESS_KEY=your_secret_key
   export AWS_DEFAULT_REGION=us-west-2
   
   # For OpenAI (VAPI)
   export OPENAI_API_KEY=your_openai_key
   
   # For VAPI
   export VAPI_API_KEY=your_vapi_key
   ```

4. **Test AI agent**
   ```bash
   python jerel-agent.py
   ```

### Development Commands
```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 🎨 Design System

The project follows **Atomic Design** principles:

- **Atoms**: Basic UI components (buttons, badges, inputs)
- **Molecules**: Composed components (cards, forms)
- **Organisms**: Complex sections (hero sections, contact forms)

### Styling Guidelines
- Tailwind CSS with semantic tokens
- shadcn/ui for consistent component library
- Radix primitives for accessibility
- Responsive design with mobile-first approach

## 🤖 AI Agent System

### Agent Architecture
- **Context-Aware**: Agents understand user's career narrative and can answer specific questions
- **Customizable Tone**: Professional, casual, technical, or custom personality
- **Story-Driven**: Highlights key achievements and projects
- **Real-time Interaction**: Streaming responses for natural conversation flow

### Example Agent Implementation
The project includes a sample AI agent (`jerel-agent.py`) that demonstrates:
- First-person interview responses
- Metrics-backed answers
- Professional tone and brevity
- Context-aware career storytelling

## 🎙️ Voice AI Integration with VAPI

Portfolio Agents leverages [VAPI](https://docs.vapi.ai/quickstart/introduction) for building voice AI agents that can make and receive phone calls, enabling natural voice conversations about career experiences.

### VAPI Features Used

- **Real-time Voice Conversations**: Sub-600ms response times with natural turn-taking
- **Phone Integration**: Make and receive calls on any phone number for phone interviews
- **Web Integration**: Embed voice calls directly in portfolio applications
- **Multi-modal Interaction**: Combine text and voice for comprehensive user experiences

### VAPI Implementation Examples

#### Voice-Enabled Portfolio Interviews
```javascript
// Example VAPI assistant configuration for portfolio interviews
const portfolioAssistant = {
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an AI representative for [User Name]. Answer questions about their career, experience, and skills based on their resume data. Keep responses conversational and under 60 seconds."
      }
    ]
  },
  voice: {
    provider: "elevenlabs",
    voiceId: "professional-voice"
  },
  firstMessage: "Hello! I'm the AI representative for [User Name]. I'd be happy to tell you about their experience and qualifications. What would you like to know?"
};
```

#### Phone Interview Scheduling
```javascript
// VAPI integration for scheduling follow-up interviews
const scheduleCall = async (candidateData) => {
  const assistant = await vapi.assistants.create({
    name: `${candidateData.name} Interview Scheduler`,
    model: {
      provider: "openai", 
      model: "gpt-4",
      tools: [
        {
          type: "function",
          function: {
            name: "schedule_interview",
            description: "Schedule a follow-up interview",
            parameters: {
              type: "object",
              properties: {
                datetime: { type: "string" },
                duration: { type: "number" },
                type: { type: "string", enum: ["phone", "video", "in-person"] }
              }
            }
          }
        }
      ]
    },
    voice: { provider: "elevenlabs" },
    firstMessage: "I can help schedule a follow-up interview. What time works best for you?"
  });
  
  return assistant;
};
```

### VAPI Use Cases in Portfolio Agents

1. **Voice-First Portfolio Experience**: Users can call a number to learn about a candidate
2. **Interview Pre-screening**: Automated initial screening calls with voice AI
3. **Interactive Career Stories**: Voice narration of key projects and achievements
4. **Accessibility**: Voice interface for users who prefer audio over text

## 🔗 Agent Framework with Strands Agents

Portfolio Agents utilizes [Strands Agents SDK](https://strandsagents.com/latest/documentation/docs/) for building sophisticated, production-ready AI agents with advanced capabilities.

### Strands Agents Features

- **Lightweight & Production-Ready**: Full observability, tracing, and deployment options
- **Model Agnostic**: Support for multiple providers (Amazon Bedrock, OpenAI, Anthropic, etc.)
- **Multi-Agent Systems**: Advanced techniques like agent teams and autonomous improvement
- **Community Tools**: Powerful set of community-contributed tools
- **Safety & Security**: Built-in guardrails and responsible AI practices

### Strands Implementation Examples

#### Basic Portfolio Agent
```python
from strands import Agent

# Create a portfolio agent with resume context
portfolio_agent = Agent(
    model_provider="anthropic",
    model="claude-3-sonnet",
    system_prompt="""
    You are an AI representative for a job candidate. Use the provided resume data 
    to answer questions about their experience, skills, and career journey. 
    Be professional, concise, and highlight key achievements with metrics.
    """,
    tools=["web_search", "calendar_integration"]
)

# Example usage
response = portfolio_agent("Tell me about this candidate's AI experience")
print(response)
```

#### Multi-Agent Portfolio System
```python
from strands import Agent
from strands.multiagent import Swarm

# Create specialized agents for different aspects
experience_agent = Agent(
    name="experience_specialist",
    system_prompt="Focus on work experience and career progression",
    model="claude-3-sonnet"
)

skills_agent = Agent(
    name="skills_specialist", 
    system_prompt="Highlight technical skills and certifications",
    model="gpt-4"
)

projects_agent = Agent(
    name="projects_specialist",
    system_prompt="Discuss key projects and achievements with metrics",
    model="claude-3-sonnet"
)

# Create a swarm for comprehensive portfolio representation
portfolio_swarm = Swarm([experience_agent, skills_agent, projects_agent])

# Route questions to appropriate specialist
result = portfolio_swarm.run("What are the candidate's key technical achievements?")
```

#### Advanced Agent with Tools
```python
from strands import Agent
from strands.tools import Tool

# Custom tool for accessing resume database
class ResumeDataTool(Tool):
    def __init__(self, candidate_id):
        self.candidate_id = candidate_id
        
    def execute(self, query):
        # Fetch specific resume data based on query
        return self.get_resume_section(query)
    
    def get_resume_section(self, section):
        # Implementation to retrieve structured resume data
        pass

# Create agent with custom tools
advanced_agent = Agent(
    model="claude-3-sonnet",
    tools=[
        ResumeDataTool(candidate_id="jerel-velarde"),
        "web_search",
        "calendar_integration"
    ],
    system_prompt="""
    You have access to detailed resume data and web search. 
    Provide comprehensive answers about the candidate's background,
    and offer to schedule interviews or provide additional information.
    """
)
```

#### Production Deployment Example
```python
from strands import Agent
from strands.deploy import AWSLambda

# Production-ready agent with observability
production_agent = Agent(
    model="claude-3-sonnet",
    system_prompt="Professional portfolio agent for production use",
    observability=True,  # Enable tracing and metrics
    guardrails=["pii_detection", "content_filter"],
    session_management=True
)

# Deploy to AWS Lambda
deployment = AWSLambda(
    agent=production_agent,
    memory=1024,
    timeout=30,
    environment_variables={
        "CANDIDATE_ID": "jerel-velarde",
        "API_BASE_URL": "https://api.portfolioagents.io"
    }
)

deployment.deploy()
```

### Integration Architecture

The Portfolio Agents platform combines both frameworks:

```python
# Hybrid implementation using both VAPI and Strands
from strands import Agent
import vapi

class PortfolioAgent:
    def __init__(self, candidate_data):
        # Strands agent for complex reasoning
        self.reasoning_agent = Agent(
            model="claude-3-sonnet",
            system_prompt=f"Portfolio agent for {candidate_data['name']}"
        )
        
        # VAPI for voice interactions
        self.voice_assistant = vapi.assistants.create({
            "name": f"{candidate_data['name']} Voice Agent",
            "model": {"provider": "openai", "model": "gpt-4"},
            "voice": {"provider": "elevenlabs"}
        })
    
    async def handle_text_query(self, query):
        return self.reasoning_agent(query)
    
    async def handle_voice_call(self, phone_number):
        return await vapi.calls.create({
            "assistant": self.voice_assistant,
            "phone_number": phone_number
        })
```

### Benefits of This Dual Approach

1. **Text + Voice**: Comprehensive interaction modalities
2. **Scalable Architecture**: Production-ready with observability
3. **Flexible Deployment**: Multiple cloud providers and deployment options
4. **Advanced Capabilities**: Multi-agent systems and specialized tools
5. **Community Ecosystem**: Access to extensive tool libraries

## 📊 User Journey

1. **Upload Resume**: User uploads their resume (PDF/DOC)
2. **Data Extraction**: System parses and structures resume data
3. **Agent Customization**: User selects tone and adds context
4. **VAPI Onboarding**: Conversational Q&A for richer context
5. **Portfolio Generation**: Auto-created landing page with AI agent
6. **Share & Engage**: Unique link for employers/clients to interact

## 🎯 Target Audience

- **Job Seekers**: Stand out with interactive portfolios
- **Freelancers**: Showcase skills to potential clients
- **Professionals**: Modern representation for networking
- **Career Changers**: Tell compelling transition stories

## 🔮 Roadmap

### Phase 1: MVP (Current)
- [x] Basic portfolio generation
- [x] AI agent integration
- [x] Resume parsing
- [ ] VAPI onboarding flow
- [ ] Shareable links

### Phase 2: Enhancement
- [ ] Custom templates and themes
- [ ] Analytics dashboard
- [ ] User account management
- [ ] Premium features

### Phase 3: Scale
- [ ] Multi-language support
- [ ] AI video avatars
- [ ] Custom domain integration
- [ ] Enterprise features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Atomic Design patterns
- Maintain accessibility standards
- Write clear, descriptive commit messages
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For questions, feedback, or support:
- Create an issue in the repository
- Contact the maintainers
- Check the documentation in `/docs`

---

**Built with ❤️ for professionals who want to stand out in the digital age.**
