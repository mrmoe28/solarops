# Vercel Deployment Configuration for SolarOps

This document outlines the configuration for deploying the SolarOps monorepo to Vercel.

## Configuration Overview

The project is configured as a pnpm monorepo with the following structure:
- `apps/frontend/` - Next.js frontend application
- `packages/shared/` - Shared types and utilities
- `packages/ui/` - Shared UI components
- `packages/agents/` - AI agent system

## Vercel Project Settings

When setting up the project in Vercel, configure the following:

### Root Directory
Set the root directory to: `apps/frontend`

### Framework Preset
Select: `Next.js`

### Build Settings
The `vercel.json` file in the root directory contains the necessary build configuration:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd ../.. && pnpm build:frontend",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet ./apps/frontend ./packages"
}
```

## Key Configuration Details

### Install Command
- Navigates to monorepo root (`cd ../..`)
- Uses pnpm with frozen lockfile for consistent installs
- Installs all workspace dependencies

### Build Command
- Runs the custom `build:frontend` script
- Builds packages first, then the frontend application
- Ensures workspace dependencies are available

### Ignore Command
- Only triggers builds when frontend or packages change
- Prevents unnecessary rebuilds for backend/agent changes

### Next.js Configuration
The frontend's `next.config.js` includes:
- `transpilePackages` for workspace dependencies
- `outputFileTracingRoot` for proper monorepo tracing
- Standalone output for optimal deployment

## Environment Variables

Make sure to set these in Vercel's dashboard:
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXTAUTH_URL` - Your deployed URL
- `GRAPHQL_API_URL` - Backend API URL
- Any other environment variables from `.env.example`

## Deployment Process

1. Connect your GitHub repository to Vercel
2. Set the root directory to `apps/frontend`
3. Vercel will automatically detect the `vercel.json` configuration
4. Environment variables should be configured in Vercel dashboard
5. Deploy!

## Troubleshooting

### Build Failures
- Ensure all workspace dependencies are properly referenced
- Check that the build command runs successfully locally
- Verify environment variables are set correctly

### Module Resolution Issues
- Confirm `transpilePackages` includes all workspace packages
- Ensure `outputFileTracingRoot` points to monorepo root

### Performance Optimization
- The ignore command prevents unnecessary builds
- Standalone output reduces deployment size
- Frozen lockfile ensures consistent dependencies