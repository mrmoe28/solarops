# Backend CLAUDE.md

## Overview
This is the NestJS backend for SolarOps, providing GraphQL API, agent orchestration, and data management.

## Key Components

### GraphQL Schema
- Projects: Main entity for solar projects
- Agents: Status and results from AI agents
- Users: Authentication and authorization

### Modules
- AuthModule: JWT-based authentication
- ProjectsModule: Project management
- AgentsModule: Agent orchestration with Bull queues
- DatabaseModule: Prisma ORM integration

### Agent System
- Uses Bull for queue management
- Each agent extends BaseAgent class
- Implements retry logic and error handling
- Communicates via Redis pub/sub

## Development Commands
```bash
# Start development server
pnpm dev

# Run migrations
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio

# Run tests
pnpm test
```

## Architecture Patterns
- Repository pattern for data access
- Service layer for business logic
- GraphQL resolvers for API endpoints
- Queue processors for async tasks