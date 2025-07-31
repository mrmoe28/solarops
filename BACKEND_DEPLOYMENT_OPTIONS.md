# Backend Deployment Options for SolarOps

Your frontend is deployed at `https://solar-ops.vercel.app/`, but your backend (NestJS) needs to be deployed separately for Google OAuth to work.

## Option 1: Deploy Backend on Vercel (Recommended)

### Create a new Vercel project for the backend:

1. **In Vercel Dashboard:**
   - Click "Add New" → "Project"
   - Import your same GitHub repository
   - In "Configure Project":
     - Set **Root Directory** to `apps/backend`
     - Set **Framework Preset** to "Other"
     - Override **Build Command**: `cd ../.. && pnpm build:backend`
     - Override **Output Directory**: `apps/backend/dist`
     - Override **Install Command**: `cd ../.. && pnpm install`

2. **Add these Environment Variables:**
```env
NODE_ENV=production
PORT=4000

# Your existing Google OAuth credentials
GOOGLE_CLIENT_ID=[YOUR-GOOGLE-CLIENT-ID]
GOOGLE_CLIENT_SECRET=[YOUR-GOOGLE-CLIENT-SECRET]
GOOGLE_CALLBACK_URL=https://solar-ops-backend.vercel.app/auth/google/callback
FRONTEND_URL=https://solar-ops.vercel.app

# Generate a secure JWT secret
JWT_SECRET=[GENERATE-A-SECURE-SECRET]

# You'll need production database/Redis
DATABASE_URL=[YOUR-PRODUCTION-POSTGRES-URL]
REDIS_URL=[YOUR-PRODUCTION-REDIS-URL]

# Your API keys
OPENAI_API_KEY=[YOUR-OPENAI-KEY]
NREL_API_KEY=[YOUR-NREL-KEY]
```

3. **Create vercel.json for backend:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/main.js"
    }
  ]
}
```

## Option 2: Use a Different Platform for Backend

### Alternative platforms for NestJS:
- **Railway** - Easy PostgreSQL + Redis included
- **Render** - Good for full-stack apps
- **Fly.io** - Great for WebSocket support
- **Heroku** - Classic option

## Option 3: Serverless Functions (Limited)

Convert critical auth endpoints to Vercel Functions in your frontend project.
**Note**: This won't support WebSockets or the full agent system.

## Next Steps

1. **Choose your deployment option**
2. **Set up production database** (if using Vercel):
   - Supabase (free tier available)
   - Neon (free tier available)
   - Vercel Postgres (paid)

3. **Set up production Redis** (if using Vercel):
   - Upstash (free tier available)
   - Redis Cloud (free tier available)

## Quick Production Database Setup

### Supabase (Recommended for free tier):
1. Go to https://supabase.com
2. Create a new project
3. Copy the connection string from Settings → Database

### Upstash Redis (Recommended for free tier):
1. Go to https://upstash.com
2. Create a Redis database
3. Copy the Redis URL

Let me know which option you'd like to proceed with!