# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Postagate**, an AI-powered email client built with React, TypeScript, and Vite. The application is a demo/prototype showcasing a modern email interface with multiple accounts, AI assistant capabilities powered by Google's Gemini API, and a comprehensive UI component system. The app uses mock data themed around Harry Potter (Hogwarts) and Liverpool FC to demonstrate multi-account functionality.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

The app requires a Gemini API key to enable AI features:
- Set `GEMINI_API_KEY` in `.env.local`
- The Vite config exposes this as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` (vite.config.ts:14-15)
- AI features (thread summarization, assistant) will only work if the API key is properly configured

## Architecture

### Core Application Structure

**App.tsx** is the main orchestrator containing all application state and logic:
- Manages threads, selected thread(s), and email actions (archive, delete, star, mark read, snooze, etc.)
- Controls module navigation (email, copilot, chat, drive, settings, design-system)
- Handles multi-account state (Hogwarts vs Liverpool domains)
- Manages composer state (open/closed, minimized, maximized)
- Integrates Google GenAI client for AI features
- Implements search/filtering logic with advanced filters
- Controls all UI state (modals, popovers, context menus, sidebars)

### Module System

The app has a modular view system controlled by `activeModule` state:
- **email**: Full email client with inbox, sent, drafts, archive, categories
- **copilot**: AI copilot view
- **chat**: Messaging interface
- **drive**: File management view
- **settings**: App settings and theme controls
- **design-system**: Component showcase/documentation

### Multi-Account Architecture

Two separate email accounts are demonstrated:
- **Hogwarts** (`hogwarts.uk.edu`): Uses Harry Potter themed users
- **Liverpool** (`liverpool.uk.fc`): Uses Liverpool FC themed users

Threads have an `account` field that determines which inbox they appear in. The `activeDomain` state controls which account is currently active.

### State Management

All state is managed in App.tsx using React hooks. Key state categories:

1. **Thread State**: threads array, selectedThreadId, selectedThreadIds (for bulk actions)
2. **Navigation State**: activeModule, activeEmailView, activeDomain
3. **UI State**: sidebar visibility, composer state, modal/popover states
4. **AI State**: Google GenAI client instance, thread summary state
5. **Search State**: searchFilters object with query, sender, dateRange, status
6. **Theme State**: theme (light/dark/system) persisted to localStorage

### Email Threading & Categories

Threads are categorized for automatic organization:
- **Primary categories**: `primary`, `promotions`, `social`, `updates`, `forums`
- **Special categories**: `todos`, `finance`, `feedback`, `travel`

Threads can be:
- Starred, read/unread, pinned, archived
- Snoozed with a `snoozedUntil` ISO timestamp
- Filtered by view (inbox, starred, snoozed, sent, drafts, archive, category bundles)

### Component Architecture

**UI Components** (`components/ui/`):
- Reusable, composable components with consistent styling
- Use Tailwind-style class composition via a local `cn()` utility
- Support dark mode via CSS classes

**Feature Components** (`components/`):
- **Sidebar**: Left navigation for email folders and accounts
- **PrimarySidebar**: Global module navigation
- **EmailView**: Container for email list + detail view with responsive layout
- **EmailList**: Thread list with bulk selection
- **EmailDetail**: Message thread display with actions
- **Composer**: Email composition with drag-drop attachments, autocomplete
- **AIAssistant**: Contextual AI suggestions panel
- **Various Modals/Popovers**: Snooze, search filters, context menus

### Mock Data System

All mock data is centralized in `constants.ts`:
- **Users**: Defined with name, email, avatarUrl, department, phone
- **Threads**: Generated with realistic message threading
- **Chat Conversations**: Demo chat data
- **Drive Files**: Demo file/folder structure

Helper function `getDate()` creates relative timestamps for realistic sorting.

### AI Integration

The app integrates Google's Gemini API:
- Client initialized in App.tsx when `GEMINI_API_KEY` is available
- **Thread Summarization**: Extracts key points and action items from email threads (App.tsx:428-463)
- **AI Assistant**: Provides contextual suggestions based on selected thread
- Uses `gemini-2.5-flash` model for fast responses

### Search & Filtering

Comprehensive search system with:
- **Basic search**: Query matches subject, participants, message bodies
- **Advanced filters**: Sender, date range (any/7d/30d), status (any/read/unread)
- **Unread-only toggle**: Quick filter for unread messages
- Search logic is centralized in `useMemo` hook in App.tsx:483-591

### Responsive Design

- Desktop: Full three-column layout (primary sidebar, email sidebar, content + detail)
- Mobile: Stacked views with back navigation
- Sidebar resizing: Draggable resizer between sidebar and content (App.tsx:79-116)

## Type System

**types.ts** defines core data structures:
- `User`: Person or organization entity
- `Message`: Individual email message
- `Thread`: Email conversation with participants, messages, metadata
- `ChatMessage` & `ChatConversation`: For chat module
- `DriveFile`: For drive module

## Styling Approach

- Uses CSS modules/vanilla CSS with Tailwind-inspired utility patterns
- Dark mode via `.dark` class on root element
- Responsive design with mobile-first breakpoints
- Consistent color palette with theme-aware variables

## Common Patterns

### Adding a new action to a thread:
1. Add handler function in App.tsx (follow `handleArchiveThread` pattern)
2. Thread the handler down through EmailView → EmailDetail/EmailList
3. Wire up UI trigger (button, context menu item, etc.)

### Adding a new email category:
1. Update `Thread['category']` type in types.ts
2. Add filtering logic in `filteredThreads` useMemo (App.tsx:483-591)
3. Add navigation item in Sidebar.tsx

### Adding AI functionality:
1. Ensure `ai` state is available (GoogleGenAI instance)
2. Call `ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt })`
3. Handle loading/error states appropriately
4. Display results in UI

### Adding a new module:
1. Create view component (e.g., `NewModuleView.tsx`)
2. Add to `Module` type in App.tsx
3. Add case in `renderActiveView()` switch
4. Add navigation item in PrimarySidebar.tsx

## Known Patterns & Conventions

- **Event handlers**: Prefixed with `handle` (e.g., `handleArchiveThread`)
- **State toggles**: Prefixed with `toggle` or use `set` + state name
- **UI component props**: Props interface named `{ComponentName}Props`
- **Conditional rendering**: Use `&&` for simple conditions, ternaries for if/else
- **Array filtering**: Prefer `.filter()` + `.map()` chains over imperative loops

## Notes

- This is a prototype/demo app with mock data - no real email backend
- The app was exported from Google AI Studio (see README.md:9)
- Git repository is not initialized (git commands will fail)
- No testing framework is configured
- The design includes a "design-system" module for component documentation
