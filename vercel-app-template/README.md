# Vercel App Template

A production-ready monorepo template optimized for Vercel deployments with Next.js, TypeScript, and Turborepo.

## Features

- **Monorepo Structure**: Organized with pnpm workspaces
- **Turborepo**: Fast, incremental builds with caching
- **Next.js 14**: App Router with server components
- **TypeScript**: Full type safety across packages
- **Vercel Optimized**: Pre-configured for optimal deployments
- **Shared Packages**: Reusable code across applications

## Quick Start

1. Clone this template:
```bash
git clone <your-repo-url>
cd vercel-app-template
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start development:
```bash
pnpm dev
```

## Project Structure

```
.
├── apps/
│   ├── frontend/         # Next.js application
│   └── backend/          # API server (optional)
├── packages/
│   ├── shared/          # Shared utilities and types
│   ├── ui/              # Shared UI components
│   └── config/          # Shared configurations
├── vercel.json          # Vercel deployment config
├── turbo.json           # Turborepo config
└── pnpm-workspace.yaml  # pnpm workspace config
```

## Deployment

### Automatic Deployment

1. Push to GitHub
2. Import project in Vercel Dashboard
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
vercel --prod
```

## Configuration

### vercel.json
- Pre-configured for monorepo deployments
- Optimized build commands
- Proper output directory settings

### next.config.js
- Standalone output for optimized deployments
- Transpile packages for monorepo support
- Image optimization settings

### turbo.json
- Build pipeline optimization
- Caching configuration
- Environment variable handling

## Scripts

- `pnpm dev` - Start all apps in development
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm typecheck` - Type check all packages
- `pnpm test` - Run tests

## Environment Variables

See `.env.example` for required environment variables.

### Frontend Variables
- `NEXT_PUBLIC_API_URL` - API endpoint

### Backend Variables (if applicable)
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT signing secret

## Best Practices

1. **Keep packages small and focused**
2. **Use TypeScript strict mode**
3. **Leverage Turborepo caching**
4. **Configure proper environment variables**
5. **Use shared components for consistency**

## Troubleshooting

### Build Failures
- Ensure all dependencies are installed
- Check environment variables
- Clear Turborepo cache: `pnpm turbo clean`

### Deployment Issues
- Verify vercel.json configuration
- Check build logs in Vercel Dashboard
- Ensure correct Node.js version

## License

MIT