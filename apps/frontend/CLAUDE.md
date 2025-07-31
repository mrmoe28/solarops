# Frontend CLAUDE.md

## Overview
Next.js 14 frontend for SolarOps using App Router, TypeScript, and Tailwind CSS with Shadcn/ui components.

## Directory Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Shadcn/ui components
│   └── features/    # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and configurations
├── services/        # API services (GraphQL)
└── store/           # Zustand state management
```

## Key Features
- Real-time agent status updates via GraphQL subscriptions
- Form validation with Zod and React Hook Form
- PDF generation for proposals
- Responsive design with Tailwind CSS
- Modern UI with Shadcn/ui components

## Development Commands
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run type checking
pnpm typecheck
```

## Component Patterns
- Use function components with TypeScript
- Implement proper loading and error states
- Use Shadcn/ui components for consistency
- Follow compound component pattern for complex UI