# @kalimny/web

The Next.js application for **Kalimny** — the AI voice language-learning platform.

See the [root README](../../README.md) for the full project documentation, architecture, and setup instructions.

## Quick start

```bash
# from the repo root
npm install
npm run dev        # http://localhost:3000

# scripts (from the repo root)
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Environment

Create `apps/web/.env.local` (see `.env.example`):

```
GEMINI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## What's in here

- `src/app` — App Router routes (auth, onboarding, session, review, voice APIs)
- `src/components/session/avatar` — the fully procedural 3D tutor character
- `src/lib/voice` — audio pipeline + the Gemini Live provider
- `src/lib/lessons` — lesson quota and summary logic
