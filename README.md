# SolarOps - AI-Powered Solar Project Management

SolarOps is a full-stack web application that automates solar project management through AI agents. The system allows users to input property information and automatically gathers permit requirements, parcel data, creates solar designs, and generates proposals.

## Features

- 🤖 **AI Agents** - Automated data collection and analysis
- 📋 **Permit Research** - Automatic permit office discovery and requirement extraction
- 🏠 **Property Analysis** - Parcel data and structural information gathering
- ☀️ **Solar Design** - Integration with OpenSolar for system design and BOM
- 📄 **Proposal Generation** - Professional PDF proposals with ROI calculations
- 🔄 **Real-time Updates** - Live progress tracking via GraphQL subscriptions

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: NestJS, GraphQL, Prisma, PostgreSQL
- **Queue System**: Bull/Redis for reliable agent orchestration
- **AI/Agents**: Custom agents with Playwright for web scraping
- **Monorepo**: pnpm workspaces for package management

## Prerequisites

- Node.js 18+
- pnpm 8+
- Docker Desktop
- OpenAI API key (for agent intelligence)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Solar Ops"
   ```

2. **Install Docker Desktop**
   - Download from [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Start Docker Desktop

3. **Set up environment variables**
   ```bash
   # Backend environment
   cd apps/backend
   cp ../../.env.backend.example .env
   # Edit .env and add your API keys
   
   # Frontend environment (optional - defaults work for local dev)
   cd ../frontend
   cp ../../.env.frontend.example .env.local
   ```
   
   See [ENV_SETUP.md](./ENV_SETUP.md) for detailed API key setup instructions.

4. **Run the setup script**
   ```bash
   ./scripts/setup.sh
   ```

5. **Start development servers**
   ```bash
   pnpm dev
   ```

## Development

### Available Commands

```bash
# Install dependencies
pnpm install

# Start all services
pnpm dev

# Start specific services
pnpm dev:frontend  # Frontend on http://localhost:3000
pnpm dev:backend   # Backend on http://localhost:4000

# Database commands
pnpm db:migrate    # Run migrations
pnpm db:seed       # Seed database

# Code quality
pnpm lint          # Run linting
pnpm typecheck     # Run type checking
pnpm test          # Run tests
pnpm check:all     # Run all checks

# Build for production
pnpm build
```

### Project Structure

```
solarops/
├── apps/
│   ├── frontend/      # Next.js frontend application
│   └── backend/       # NestJS backend API
├── packages/
│   ├── shared/        # Shared types and utilities
│   ├── agents/        # AI agent implementations
│   └── ui/            # Shared UI components
├── docker-compose.yml # Docker services configuration
└── pnpm-workspace.yaml # Monorepo configuration
```

## Architecture

### Agent System

The application uses a master-agent pattern:

1. **MasterAgent** - Orchestrates workflow and coordinates sub-agents
2. **PermitOfficeAgent** - Scrapes permit requirements and fees
3. **ParcelAgent** - Retrieves property information
4. **OpenSolarAgent** - Creates solar system designs
5. **ProposalAgent** - Generates comprehensive proposals

### Data Flow

1. User inputs property address
2. Master agent initiates workflow
3. Sub-agents gather data in parallel/sequence
4. Results are stored in PostgreSQL
5. Real-time updates sent via GraphQL subscriptions
6. Final proposal generated as PDF

## API Documentation

GraphQL playground available at http://localhost:4000/graphql when running in development mode.

### Key Operations

- `signUp` / `signIn` - Authentication
- `createProject` - Start new solar project
- `projects` - List user's projects
- `startProjectAnalysis` - Trigger agent workflow
- `agentTaskUpdated` - Subscribe to real-time updates

## Troubleshooting

### Docker Issues
- Ensure Docker Desktop is running
- Check port availability (5432 for PostgreSQL, 6379 for Redis)

### Database Issues
- Run `pnpm db:migrate` to ensure schema is up to date
- Check DATABASE_URL in .env file

### Agent Issues
- Verify OpenAI API key is set
- Check Redis connection for queue processing

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm check:all` before committing
4. Submit a pull request

## License

Private - All rights reserved