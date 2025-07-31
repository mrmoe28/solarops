
# 🧠 CLAUDE.md — Claude Code Agent Instructions for SolarOps

This file contains structured guidance for Claude Code when developing or maintaining the SolarOps project. Claude agents should follow these standards to ensure code consistency, reliability, and smooth development.

---

## 🚀 Project Summary

**SolarOps** is an AI-powered full-stack platform that automates solar project management. Users input property info, and the system uses autonomous agents to:

- Scrape permit requirements
- Collect parcel and structural data
- Auto-generate solar designs
- Create downloadable PDF proposals

---

## 🛠 Setup Commands

```bash
# Install all dependencies
pnpm install

# Set environment variables
cp .env.example .env.local                  # Frontend
cp apps/backend/.env.example apps/backend/.env  # Backend

# Start essential services
docker-compose up -d

# Run database setup
pnpm db:migrate
pnpm db:seed
```

---

## 👨‍💻 Development

```bash
# Start all services
pnpm dev

# Start individual services
pnpm dev:frontend  # http://localhost:3000
pnpm dev:backend   # http://localhost:4000

# Run local desktop automation tasks
pnpm desktop:start
```

---

## ✅ Testing

```bash
pnpm test               # All tests
pnpm test:unit
pnpm test:integration
pnpm test:e2e
pnpm test:watch         # Live watch mode
pnpm test path/to/test  # Run specific test file
```

---

## 🔍 Code Quality

```bash
pnpm lint
pnpm lint:fix
pnpm typecheck
pnpm format
pnpm check:all          # Run pre-commit quality checks
```

---

## 📦 Build & Deploy

```bash
pnpm build              # Build all packages
pnpm build:frontend
pnpm build:backend

pnpm start              # Start production server
```

### Production Start (with logs)
```bash
# Start production with logging support
pm2 start pnpm --name solarops -- start
pm2 logs solarops
```

---

## ⚡️ Speed Boost (Turbo Caching)

Use Turborepo for efficient caching and rebuilds:

```bash
pnpm turbo run build --cache
pnpm turbo run lint test --cache
```

---

## 🧱 Architecture Overview

### Monorepo Layout

- `apps/frontend`: Next.js 14 with App Router
- `apps/backend`: NestJS + GraphQL API
- `packages/shared`: Shared types and logic
- `packages/agents`: Modular AI agents
- `packages/ui`: Centralized UI components

---

### 🧠 Agent System Design

**Master-Agent Pattern**
- `MasterAgent`: Central coordinator
- `PermitOfficeAgent`: Scrapes jurisdiction permit data
- `ParcelAgent`: Gathers structural/property data
- `OpenSolarAgent`: Generates system designs + BOM
- `ProposalAgent`: Builds client-facing PDF proposals

**Tech Stack**
- Redis queue (BullMQ) for scalable, async workflows
- Each agent is fault-tolerant and modular

### Agent Retry Strategy

| Agent             | Max Retries | Backoff (ms) | Notes                      |
|------------------|-------------|--------------|----------------------------|
| PermitOfficeAgent| 3           | 2000         | Critical; must not fail    |
| ParcelAgent      | 2           | 1000         | Fails fast                 |
| ProposalAgent    | 5           | 3000         | Retry until PDF generated  |

---

## 📚 Tech Stack

| Layer       | Tech                                           |
|-------------|------------------------------------------------|
| Frontend    | Next.js, React, TypeScript, Tailwind, Shadcn   |
| Backend     | NestJS, GraphQL, Prisma, PostgreSQL            |
| Agents      | LangChain, OpenAI API, Redis (BullMQ)          |
| Scraping    | Playwright                                     |
| PDF Gen     | React-PDF                                      |
| Automation  | Desktop Commander (macOS task automation)      |

---

## 🗄 Database Models

- `Project`: Central entry (user info, location)
- `PermitData`: Scraped permitting rules
- `ParcelData`: Structural metadata
- `SolarDesign`: Solar design + BOM
- `Proposal`: Final PDF output + status

### Optimization
- Index frequently queried fields (`Project.status`, `PermitData.city`)
- Use connection pooling
- Normalize relationships for GraphQL

---

## 📡 API (GraphQL)

| Operation          | Description                        |
|--------------------|------------------------------------|
| `createProject`    | Start a new solar job              |
| `getProjectStatus` | Track agent progress in real-time |
| `getProjectData`   | Retrieve full project dataset     |
| `generateProposal` | Build PDF and mark complete       |

---

## ⚙️ Development Guidelines

### Error Handling
- Retry with exponential backoff
- Dead-letter queue for failed jobs
- Clean, actionable error messages for users

### Desktop Automation (via Desktop Commander)
- Confirm app/window visibility
- Use explicit wait-for-page-loads
- Capture screenshots on failure
- Clean up browser sessions

### Web Scraping
- Respect `robots.txt`, throttle requests
- Prefer Playwright for dynamic content
- Cache responses where possible
- Store raw HTML for fallback processing

### State Management
- Zustand for shared frontend state
- GraphQL Subscriptions for real-time sync
- Optimistic updates for smooth UX
- Clear loading/error patterns

---

## 🔐 Environment Management

Install `.env` loader:
```bash
pnpm add -D dotenv-cli
```
Update scripts:
```json
"dev": "dotenv -e .env.local -- next dev"
```

---

## 🔒 Commit Hooks (Code Hygiene)

```bash
pnpm add -D husky lint-staged
npx husky-init && pnpm prepare
```

Update scripts:
```json
"prepare": "husky install"
```

Pre-commit checks:
```json
"lint-staged": {
  "**/*.{ts,tsx,js,jsx}": ["pnpm lint", "pnpm format"]
}
```

---

## 🧠 Claude Code Defaults

- Assume all missing folders should be created
- Always prefer TypeScript
- Include placeholder data if seed file is missing
- Auto-fix lint/type errors unless told otherwise

---

## 🐛 Common Errors & Solutions

### Error Patterns Found in Codebase

#### 1. **Agent Error Handling Pattern**
**Location**: `apps/backend/src/agents/agent.processors.ts`

**Pattern**:
```typescript
try {
  // Agent processing logic
  await this.agentsService.updateTaskStatus(taskId, TaskStatus.COMPLETED, result);
} catch (error) {
  await this.agentsService.updateTaskStatus(
    taskId,
    TaskStatus.FAILED,
    null,
    error instanceof Error ? error.message : 'Unknown error'
  );
  throw error;
}
```

**Best Practice**: Always update task status before re-throwing errors to ensure proper state tracking in the queue system.

#### 2. **Authentication Error Handling**
**Location**: `apps/backend/src/auth/auth.service.ts`

**Pattern**:
```typescript
if (!user) {
  throw new UnauthorizedException('Invalid credentials');
}
```

**Best Practice**: Use consistent error messages for security (avoid revealing whether email exists).

#### 3. **Missing Environment Variables**
**Issue**: Backend expects `.env` file but may not exist on fresh clone
**Solution**: Always check for `.env` file existence and create from example:
```bash
cp apps/backend/.env.example apps/backend/.env
```

#### 4. **GraphQL Subscription Error Handling**
**Location**: `apps/frontend/src/app/projects/[id]/page.tsx`

**Pattern**:
```typescript
const { data: subscriptionData } = useSubscription(AGENT_TASK_UPDATED, {
  variables: { projectId },
});

useEffect(() => {
  if (subscriptionData) {
    refetch();
  }
}, [subscriptionData, refetch]);
```

**Best Practice**: Always handle subscription errors and connection issues gracefully.

### Common Development Issues & Fixes

#### 1. **Database Connection Errors**
**Error**: `Can't reach database server at localhost:5432`
**Fix**: Ensure Docker is running and PostgreSQL container is up:
```bash
docker-compose up -d postgres
```

#### 2. **Redis Connection Errors**
**Error**: `Error: connect ECONNREFUSED 127.0.0.1:6379`
**Fix**: Start Redis container:
```bash
docker-compose up -d redis
```

#### 3. **TypeScript Build Errors**
**Error**: Type errors in shared package
**Fix**: Rebuild shared package first:
```bash
pnpm --filter @solarops/shared build
```

#### 4. **Missing NREL API Key**
**Error**: `NREL_API_KEY is not defined`
**Fix**: Add to `apps/backend/.env`:
```
NREL_API_KEY=your_actual_api_key_here
```

### Error Handling Best Practices

1. **Always Type Guard Errors**
   ```typescript
   error instanceof Error ? error.message : 'Unknown error'
   ```

2. **Implement Retry Logic for External APIs**
   - Use exponential backoff
   - Set maximum retry attempts
   - Log each retry attempt

3. **Queue Error Management**
   - Update task status before throwing
   - Store error details for debugging
   - Implement dead letter queues for persistent failures

4. **Frontend Error Boundaries**
   - Wrap components in error boundaries
   - Show user-friendly error messages
   - Provide recovery actions

5. **Logging Strategy**
   - Use structured logging (JSON format)
   - Include correlation IDs for tracing
   - Log at appropriate levels (error, warn, info, debug)

6. **Environment Variable Validation**
   - Validate all required env vars on startup
   - Provide helpful error messages for missing vars
   - Use type-safe config schemas
