# OllamaChat

React 19 + TypeScript + Vite 8 chat UI for local Ollama LLM. Retro CRT/punk terminal aesthetic. All UI text in Spanish.

## Commands

- `npm run dev` — Vite dev server (port 5173, host: true)
- `npm run build` — `tsc -b && vite build` (typecheck + bundle)
- `npm run lint` — oxlint (NOT ESLint)
- `npm run preview` — production preview

No test framework is configured. `npm run doctor` runs react-doctor for diagnostics.

## Toolchain

- **Linter:** oxlint with plugins: react, typescript, oxc. Config: `.oxlintrc.json`
- **CSS:** Tailwind CSS v4 via `@tailwindcss/vite` plugin. No `tailwind.config.*` — all config is in `src/index.css` as CSS custom properties.
- **TypeScript:** `tsconfig.app.json` targets es2023, uses `verbatimModuleSyntax`, `erasableSyntaxOnly`, strict unused checks. Project references in `tsconfig.json`.
- **Env:** `.env` required with `VITE_OLLAMA_API_URL` (default: `http://localhost:11434/api/chat`). See `.env.example`.

## Architecture

```
src/
├── main.tsx          # React root mount
├── App.tsx           # Top-level: ThemeProvider > ChatProvider > ChatContent
├── index.css         # All CSS vars, animations, Tailwind import
├── types/chat.ts     # TypeScript interfaces (Message, OllamaResponse, etc.)
├── hooks/
│   ├── useChat.tsx       # ChatProvider: state, API call, abort, reset
│   ├── useChatContext.ts # ChatContext definition + useChat() hook
│   ├── useTheme.tsx      # ThemeProvider: dark/light toggle, localStorage
│   └── useThemeContext.ts # ThemeContext definition
└── components/       # UI components (MessageBubble, ChatInput, etc.)
```

State management: React Context + useState. No Redux/Zustand.

## Key Patterns

- **Markdown rendering:** `react-markdown` + `remark-gfm`. Code blocks use a custom `CodeBlock` component via `components={{ pre: ... }}` on ReactMarkdown.
- **Icons:** `@iconify/react` with `lineicons` icon set.
- **Theming:** Dark/light via CSS custom properties toggled by `.light` class on `<html>`. Persisted to localStorage.
- **No streaming:** Ollama API call uses `stream: false`. Entire response arrives at once.
- **Fonts:** Press Start 2P (pixel headings), VT323 (terminal body), JetBrains Mono (code). Loaded from Google Fonts in `index.html`.
