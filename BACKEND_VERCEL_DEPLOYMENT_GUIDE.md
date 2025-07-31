# Backend Deployment Guide for Vercel

Follow these steps to deploy your SolarOps backend on Vercel:

## Step 1: Create New Vercel Project for Backend

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose your `solarops` repository

## Step 2: Configure the Backend Project

In the "Configure Project" screen:

1. **Project Name**: `solar-ops-backend` (or similar)
2. **Framework Preset**: Select **"Other"**
3. **Root Directory**: Click "Edit" and set to `apps/backend`
4. **Build and Output Settings**:
   - Build Command: (leave default, it will use vercel.json)
   - Output Directory: (leave default)
   - Install Command: (leave default)

## Step 3: Add Environment Variables

Click on **"Environment Variables"** and add ALL of these:

```bash
# Node Environment
NODE_ENV=production

# Google OAuth (your existing credentials)
GOOGLE_CLIENT_ID=[YOUR-GOOGLE-CLIENT-ID-FROM-LOCAL-ENV]
GOOGLE_CLIENT_SECRET=[YOUR-GOOGLE-CLIENT-SECRET-FROM-LOCAL-ENV]
GOOGLE_CALLBACK_URL=https://solar-ops-backend.vercel.app/auth/google/callback
FRONTEND_URL=https://solar-ops.vercel.app

# JWT Secret (IMPORTANT: Generate a secure one!)
JWT_SECRET=your-super-secure-jwt-secret-here-change-this

# Database (Required - see options below)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Redis (Optional for initial testing)
REDIS_HOST=
REDIS_PORT=

# API Keys
OPENAI_API_KEY=your-openai-api-key
NREL_API_KEY=your-nrel-api-key
```

### Quick Database Options:

#### Option A: Supabase (Free Tier)
1. Go to https://supabase.com
2. Sign up and create a new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI)
5. Use this as your DATABASE_URL

#### Option B: Neon (Free Tier)
1. Go to https://neon.tech
2. Sign up and create a database
3. Copy the connection string
4. Use this as your DATABASE_URL

## Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

## Step 5: Get Your Backend URL

Once deployed, your backend URL will be:
- `https://solar-ops-backend.vercel.app` (or similar based on your project name)

## Step 6: Update Frontend Environment Variables

Go to your frontend project on Vercel (`solar-ops`) and update these environment variables:

```bash
NEXT_PUBLIC_API_URL=https://solar-ops-backend.vercel.app/graphql
NEXT_PUBLIC_WS_URL=wss://solar-ops-backend.vercel.app/graphql
NEXT_PUBLIC_APP_URL=https://solar-ops.vercel.app
```

Then redeploy your frontend.

## Step 7: Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client ID settings
3. Add this Authorized redirect URI:
   - `https://solar-ops-backend.vercel.app/auth/google/callback`
4. Save the changes

## Step 8: Test Your Deployment

1. Visit https://solar-ops.vercel.app
2. Click "Sign in with Google"
3. You should be redirected to Google's OAuth consent screen
4. After authorization, you should be logged back to your app

## Troubleshooting

### If deployment fails:
- Check the build logs in Vercel
- Ensure all environment variables are set
- Make sure DATABASE_URL is valid

### If OAuth fails:
- Verify the GOOGLE_CALLBACK_URL matches exactly in both Vercel and Google Console
- Check that FRONTEND_URL is set correctly
- Wait 5-10 minutes for Google Console changes to propagate

### Common Issues:
- **"Cannot find module"**: Make sure the build command includes `pnpm db:generate`
- **"Database connection failed"**: Verify your DATABASE_URL is correct
- **"Redirect URI mismatch"**: Double-check the callback URL in Google Console

## Notes
- The backend is configured to run as a Vercel Function with 30-second timeout
- WebSocket support might be limited on Vercel
- For production, consider adding Redis for better performance