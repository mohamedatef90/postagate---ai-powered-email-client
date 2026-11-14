# PostaGate - AI-Powered Email Client

A front-end prototype of an AI-assisted email client for desktop and mobile browsers. It runs on sample data (`constants.ts`) with multiple demo accounts; there is no email backend.

It was created in Google AI Studio and can be viewed there: https://ai.studio/apps/drive/1Kbd7zpx_QSfmWrhKxqIKPw8QUmXkffFZ

## Features

- **Email:** inbox, to-dos, starred, snoozed, and sent views; email list and detail panes; a composer with reply, reply-all, and forward; context menus; snooze; advanced search filters; attach-email and insert-meeting dialogs; multiple demo accounts.
- **Modules** (switched in `App.tsx`): email, copilot, chat, drive, settings, and a design-system view.
- **AI features (Gemini `gemini-2.5-flash`, called from the browser):**
  - Thread summarization: a bulleted summary with action items (`App.tsx`)
  - Copilot view: a streaming Gemini chat (`components/CopilotView.tsx`)
  - An AI assistant panel (`components/AIAssistant.tsx`)
- **Light, dark, and system themes**, and a responsive layout with a mobile-friendly sidebar.

## Tech stack

- React 19 and TypeScript
- Vite 6
- Tailwind CSS and Font Awesome (both loaded from CDNs in `index.html`)
- Google Gemini through `@google/genai`

## Getting started

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev       # http://localhost:3000 (host 0.0.0.0)
npm run build     # production build
npm run preview   # preview the production build
```

### Environment variable

`GEMINI_API_KEY`, read from `.env.local` by `vite.config.ts` (create the file in the project root). It is inlined into the client bundle at build time, so use it only for local demos. Without a key the AI features are not available.

## Project structure

```
App.tsx, index.tsx   App state, modules, and Gemini calls
components/          Email, composer, copilot, chat, drive, settings, and design-system views
components/ui/       Shared UI primitives (button, card, input, select, and others)
constants.ts, types.ts   Sample data and types
CLAUDE.md, .kiro/steering/   Notes for AI coding assistants
```
