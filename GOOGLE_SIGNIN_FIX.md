# 🔧 Google Sign-in Fix Guide

## Current Issues:
1. **Local**: Backend cannot connect to database (Docker not running)
2. **Production**: Frontend on Vercel pointing to localhost instead of deployed backend

## Step 1: Fix Local Development

### 1.1 Start Docker Desktop
- Open Docker Desktop application on your Mac
- Wait for it to fully start (green icon)

### 1.2 Start Database Containers
```bash
# In project root directory
docker-compose up -d postgres redis
```

### 1.3 Verify Containers Running
```bash
docker ps
# Should show postgres and redis containers
```

### 1.4 Run Database Migrations
```bash
cd apps/backend
pnpm db:migrate
```

### 1.5 Start Backend
```bash
pnpm dev
# Backend should start on http://localhost:4000
```

## Step 2: Deploy Backend to Render

Since your backend needs a proper Node.js environment (not serverless), deploy to Render:

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Connect your `solarops` repository

### 2.2 Create New Web Service
1. Click "New +" → "Web Service"
2. Select your `solarops` repository
3. Configure:
   - **Name**: `solarops-backend`
   - **Root Directory**: `apps/backend`
   - **Build Command**: 
     ```
     cd ../.. && pnpm install --no-frozen-lockfile && cd apps/backend && pnpm db:generate && pnpm build
     ```
   - **Start Command**: `pnpm start`

### 2.3 Add Environment Variables
Click "Advanced" and add:

```bash
# Database (use Neon or Render's PostgreSQL)
DATABASE_URL=postgresql://[your-neon-connection-string]

# Google OAuth
GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
GOOGLE_CALLBACK_URL=https://[your-app-name].onrender.com/auth/google/callback
FRONTEND_URL=https://solar-ops.vercel.app

# Security
JWT_SECRET=[generate-secure-random-string]

# Node
NODE_ENV=production
PORT=4000

# Optional APIs (if you have them)
OPENAI_API_KEY=[your-key]
NREL_API_KEY=[your-key]
```

### 2.4 Deploy
Click "Create Web Service" and wait for deployment

## Step 3: Update Frontend on Vercel

### 3.1 Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your `solar-ops` project
3. Go to Settings → Environment Variables

### 3.2 Add/Update Variables
```bash
NEXT_PUBLIC_API_URL=https://[your-backend].onrender.com/graphql
NEXT_PUBLIC_WS_URL=wss://[your-backend].onrender.com/graphql
NEXT_PUBLIC_APP_URL=https://solar-ops.vercel.app
```

### 3.3 Redeploy
1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment

## Step 4: Update Google Cloud Console

### 4.1 Add Production Redirect URI
1. Go to https://console.cloud.google.com
2. Navigate to your OAuth 2.0 Client ID
3. Add Authorized redirect URI:
   ```
   https://[your-backend].onrender.com/auth/google/callback
   ```
4. Keep localhost URI for development
5. Save changes

## Step 5: Verify Everything Works

### 5.1 Test Production
1. Visit https://solar-ops.vercel.app
2. Click "Sign in with Google"
3. Should redirect to Google, then back to your app

### 5.2 Monitor Backend
- Check Render logs: https://dashboard.render.com
- Backend health: https://[your-backend].onrender.com/health

## Quick Checklist
- [ ] Docker running locally
- [ ] Local backend connects to database
- [ ] Backend deployed on Render
- [ ] Frontend env vars updated on Vercel
- [ ] Google Console has production redirect URI
- [ ] Both services redeployed
- [ ] Google OAuth working

## Need Database?
If you don't have a Neon database yet:
1. Go to https://neon.tech
2. Create free account
3. Create new database
4. Copy connection string
5. Use in Render's DATABASE_URL

## Troubleshooting
- **"Cannot connect to database"**: Ensure Docker is running or use cloud database
- **"Redirect URI mismatch"**: Check exact URL in Google Console (no trailing slash)
- **CORS errors**: Verify FRONTEND_URL matches exactly in backend env vars