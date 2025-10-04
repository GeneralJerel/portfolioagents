# Mock Data

This folder contains all mock/sample data used throughout the portfolio application.

## Files

### `voiceAgent.ts`
Contains data for the voice agent feature:
- `conversationStarters`: Array of conversation starter categories with questions

### `templates.ts`
Contains template configuration data:
- `templates`: Array of portfolio template options (Modern Minimal, Creative Bold, Executive Classic)

### `jerel.ts`
Contains all portfolio data for Jerel's profile:
- `experiences`: Standard experience data
- `creativeExperiences`: Experience data formatted for the creative template
- `executiveExperiences`: Experience data formatted for the executive template
- `projects`: Standard project data
- `creativeProjects`: Project data with icons and gradients for the creative template
- `skills`: Array of skill names
- `creativeSkills`: Skills with levels and colors for visual representation
- `awards`: Awards and recognition list
- `achievements`: Extended achievements list (executive version)
- `education`: Educational background
- `coreCompetencies`: Categorized competencies for the executive template

### `index.ts`
Central export file for easy imports from other parts of the application.

## Usage

Import data from the mockdata folder:

```typescript
// Import from specific files
import { conversationStarters } from "@/mockdata/voiceAgent";
import { templates } from "@/mockdata/templates";
import { experiences, projects, skills } from "@/mockdata/jerel";

// Or import from the index file
import { conversationStarters, templates, experiences } from "@/mockdata";
```

## Organization

All mock data has been centralized here to:
- Improve maintainability
- Avoid data duplication
- Make it easier to update content
- Provide clear separation between data and presentation components
