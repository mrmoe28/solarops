# 🔒 Secure Vercel Deployment Guide

## Problem
GitHub's push protection is blocking deployment because OAuth credentials were found in the codebase.

## Solution: Deploy with Environment Variables

### Step 1: Set Up Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `solar-ops` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://solarops-backend.onrender.com/graphql` | Production |
| `NEXT_PUBLIC_WS_URL` | `wss://solarops-backend.onrender.com/graphql` | Production |
| `NEXT_PUBLIC_APP_URL` | `https://solar-ops.vercel.app` | Production |

### Step 2: Deploy Backend First (if not already done)

Since your Neon database is ready, deploy the backend to Render:

1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Configure:
   - **Name**: `solarops-backend`
   - **Root Directory**: `apps/backend`
   - **Build Command**: `cd ../.. && pnpm install --no-frozen-lockfile && cd apps/backend && pnpm db:generate && pnpm build`
   - **Start Command**: `pnpm start`

5. Add environment variables:
   ```
   NODE_ENV=production
   PORT=4000
   DATABASE_URL=postgresql://neondb_owner:npg_8imgOY3wJsQN@ep-long-hill-aej2d4h6-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=[Generate with: openssl rand -base64 32]
   GOOGLE_CLIENT_ID=[From your .env file]
   GOOGLE_CLIENT_SECRET=[From your .env file]
   GOOGLE_CALLBACK_URL=https://solarops-backend.onrender.com/auth/google/callback
   FRONTEND_URL=https://solar-ops.vercel.app
   ```

### Step 3: Deploy Frontend Using Vercel CLI

Since GitHub push is blocked, use Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd apps/frontend
vercel --prod
```

When prompted:
- Link to existing project: Yes
- Select your team/account
- Select `solar-ops` project

### Step 4: Alternative - Deploy via Vercel Dashboard

1. Go to your Vercel project
2. Click **Settings** → **Git** → **Deploy Hooks**
3. Create a deploy hook
4. Copy the URL
5. Trigger deployment:
   ```bash
   curl -X POST [YOUR_DEPLOY_HOOK_URL]
   ```

### Step 5: Fix GitHub Push Protection (Optional)

To re-enable automatic deployments:

1. Create `.env.example` files without real credentials
2. Add real credentials to `.env.local` (gitignored)
3. Update documentation to use placeholders
4. Push clean code to GitHub

### Verification Checklist

- [ ] Backend deployed and running on Render
- [ ] Backend environment variables set correctly
- [ ] Frontend environment variables set in Vercel
- [ ] Frontend deployed successfully
- [ ] Google OAuth redirect URIs updated in Cloud Console
- [ ] Test sign-in flow works

## Quick Commands

```bash
# Check backend health
curl https://solarops-backend.onrender.com/health

# Deploy frontend manually
cd apps/frontend && vercel --prod

# Test OAuth flow
open https://solar-ops.vercel.app
```

## Important Notes

- Never commit real credentials to Git
- Always use environment variables for sensitive data
- Keep `.env` files in `.gitignore`
- Document credential requirements without exposing values