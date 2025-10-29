# Project Structure

## Root Level Files

- `App.tsx` - Main application component with routing and state management
- `index.tsx` - React app entry point and root rendering
- `types.ts` - TypeScript interfaces for User, Thread, Message, and other data models
- `constants.ts` - Mock data, user definitions, and application constants
- `package.json` - Dependencies and npm scripts
- `vite.config.ts` - Vite build configuration with environment variable setup
- `tsconfig.json` - TypeScript compiler configuration

## Component Organization

### Main Components (`/components`)
- Feature-specific components (EmailView, ChatView, CopilotView, etc.)
- Layout components (Sidebar, Header, PrimarySidebar)
- Modal components (DiscoverModal, AttachEmailModal, etc.)
- Specialized components (AIAssistant, Composer, EmailList, etc.)

### UI Components (`/components/ui`)
- Reusable UI primitives (Button, Card, Input, Select, etc.)
- Layout utilities (Resizer, Section)
- Form components (Label, ToggleSwitch)
- Interaction components (ContextMenu)

## Naming Conventions

- **PascalCase** for component files and names
- **camelCase** for variables, functions, and props
- **kebab-case** for CSS classes and IDs
- **UPPER_SNAKE_CASE** for constants and environment variables

## State Management Patterns

- **Local state** using React hooks (useState, useEffect, useMemo)
- **Props drilling** for component communication
- **Custom hooks** for complex state logic and side effects
- **Context-free architecture** - state managed at App level and passed down

## File Conventions

- Components export as default with named interface exports
- Types defined in dedicated `types.ts` file
- Mock data and constants in `constants.ts`
- UI components use forwardRef pattern for ref passing
- Consistent import ordering: React, external libraries, internal components