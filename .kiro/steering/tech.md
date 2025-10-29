# Technology Stack

## Core Technologies

- **React 19.2.0** - Frontend framework with latest features
- **TypeScript 5.8.2** - Type safety and developer experience
- **Vite 6.2.0** - Build tool and development server
- **Google Gemini AI** - AI capabilities via `@google/genai` package

## Build System

- **Vite** for fast development and optimized production builds
- **ESM modules** (type: "module" in package.json)
- **TypeScript compilation** with strict type checking
- **Hot module replacement** for development

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

- Requires `GEMINI_API_KEY` in `.env.local` for AI functionality
- Vite config exposes API key as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`
- Development server configured for host `0.0.0.0` on port 3000

## Architecture Patterns

- **Component-based architecture** with clear separation of concerns
- **Custom hooks** for state management and side effects
- **TypeScript interfaces** for type safety across data models
- **CSS-in-JS** approach using Tailwind-style classes
- **Modular UI components** in dedicated `components/ui/` directory