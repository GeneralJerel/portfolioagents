# Agent Build Instructions

This guide standardizes how to scaffold and implement new projects.  
It has two layers:

1. **Quick-Start Summary** – strict rules for coding agents.  
2. **Detailed Conventions** – human-friendly explanations, patterns, and pitfalls.

These MVPs prioritize **speed** while reducing bugs and drift.

---

## 1. Quick-Start Summary (For Agents)

Follow these rules **exactly** when creating a new project.

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript (strict).  
- **Styling**: Tailwind + tokens + shadcn/ui + Radix primitives.  
- **Pkg Manager**: `pnpm` only.  
- **Do not** hardcode API base URLs or keys; always use `lib/config.ts → getApiEndpoint()`.  
- **Folder structure**:  
  - `app/`, `components/{atoms,molecules,organisms,ui}`, `hooks/`, `lib/`, `mockdata/`, `styles/`, `docs/`.  
- **Streaming**: SSE only via `lib/api.streamChatResponse`.  
- **State**: typed hooks; no global stores unless needed.  
- **Naming**: hooks start with `use`, DTOs end with `Dto`, descriptive names only.  
- **UI**: Render skeletons first, hydrate progressively.  
- **Accessibility**: Always use Radix primitives for overlays, focus rings, keyboard support.  
- **Env vars**: Define `.env.local` and `.env.example`. Required:  
  - `NEXT_PUBLIC_APP_ENV`  
  - `NEXT_PUBLIC_API_BASE_URL`  
- **Quality**: strict TS, early returns, no `any`.  
- **Dev commands**:  
  - `pnpm dev` – start  
  - `pnpm lint` – lint  
  - `pnpm build` – build  

---

## 2. Detailed Conventions (For Humans)

### Tech stack
- **Framework**: Next.js 15 (App Router)  
- **Runtime**: React 19 + TypeScript strict  
- **Styling**: Tailwind with tokens, shadcn/ui, Radix UI, Lucide/Phosphor icons  
- **HTTP**: `fetch` + `axios`  
- **Streaming**: SSE only  
- **Validation/Utils**: `zod`, `date-fns`, `tailwind-merge`, `clsx`  

### Project layout
```

app/                      # Routes, layouts, loading states
(admin)/                # Optional admin groups
chat/                   # Streaming UI
page.tsx                # Landing page
components/
atoms/                  # Badges, loaders, skeletons
molecules/              # Cards, inputs, messages
organisms/              # Sections (hero, properties, results)
ui/                     # shadcn/ui primitives
hooks/                    # Feature hooks
lib/                      # API, config, types, utils
mockdata/                 # Stubs for dev
public/                   # Assets
styles/                   # Global styles
docs/                     # Architecture/decisions

```

### Routing & layouts
- App Router + `app/layout.tsx` global shell.  
- Use `"use client"` only where interactive.  
- Co-locate `loading.tsx` for async routes.  

### Styling
- Tailwind tokens → semantic classes.  
- Inline custom styles only if unavoidable.  
- `utils.cn()` (`clsx` + `tailwind-merge`) for conditional classes.  

### State management
- Prefer local hooks.  
- Examples:  
  - `messages: ChatMessage[]`  
  - `currentStreamingMessage: ChatMessage | null`  
  - Skeleton flags: `showSkeletonProperties`, `showSkeletonWebResults`  

### Environment & endpoints
- API base via `lib/config.ts`.  
- Detect hostname (`local|staging|prod`).  
- Env vars:  
  - `NEXT_PUBLIC_APP_ENV=development|staging|production`  
  - `NEXT_PUBLIC_API_BASE_URL=https://api.example.com`  

### Streaming blueprint
1. **UI composition** – container orchestrates header, panels, lists, input.  
2. **Send message** – append, set skeletons, reset queues.  
3. **Streaming** – POST to `/api/v1/chat`, parse SSE with `parseSSEEvent`.  
4. **Tool data** – normalize via `convertToPropertyListing`, `parseWebResults`.  
5. **Message separation** – finalize text blocks before tool sections.  
6. **Queueing** – hold user messages until stream completes.  
7. **Errors** – surface via `ErrorMessage`, clear flags, close EventSource.  

### API conventions
- Non-streaming → `axios` with `validateStatus < 500`.  
- DTOs in `lib/types.ts`.  
- Normalize before rendering.  

### Observability (post-MVP)
- Hooks for telemetry but no analytics scripts on Day 1.  
- Add Sentry/PostHog once KPIs are defined.  

### UI composition
- Follow atoms → molecules → organisms.  
- Sidepanels for detail/favorites.  
- Maintain 60fps; prefer CSS animations.  

### Accessibility
- Radix primitives for overlays.  
- Keyboard affordances.  
- Respect reduced-motion.  

### Admin/middleware
- `(admin)/ops` route group.  
- Avoid assuming `localStorage`.  

### Common pitfalls
- SSE parsing → handle keep-alives.  
- Message duplication → guard on `lastStreamedChunk`.  
- Env drift → only via `getApiEndpoint()`.  
- Images → configure remote patterns if optimizing.  

### Scaffold checklist
1. `create-next-app` with TS + pnpm.  
2. Copy configs (`tailwind.config.ts`, `globals.css`, shadcn setup).  
3. Port `lib/`.  
4. Recreate `components/`.  
5. Implement `app/layout.tsx`.  
6. Build `app/page.tsx` + streaming page.  
7. Add mock data.  
8. Define env vars.  
9. Add telemetry post-MVP.  

### Code quality
- ESLint + Prettier enforced.  
- No `any`.  
- Clear naming.  
- Early returns.  
- Hooks for complex logic.  

### Build & deploy
- Dev: `pnpm dev`.  
- Lint: `pnpm lint`.  
- Build: `pnpm build`.  
- Deploy: Vercel.  
