# 🚨 IMMEDIATE ACTIONS TO FIX GOOGLE SIGN-IN

## The Problem:
Your frontend (solar-ops.vercel.app) is trying to connect to localhost:4000, which doesn't exist in production. You need a deployed backend.

## ACTION 1: Start Docker Locally (For Local Testing)
```bash
# 1. Open Docker Desktop app on your Mac
# 2. Wait for Docker to start completely
# 3. Run these commands:
docker-compose up -d
cd apps/backend
pnpm dev
```

## ACTION 2: Deploy Backend to Render (10 minutes)

### Option A: Quick Deploy with Render Blueprint
1. Click this link: https://render.com/deploy
2. Connect your GitHub account
3. Select your `solarops` repository
4. Use the `render.yaml` file I created
5. Add these sensitive environment variables:
   - `DATABASE_URL`: Get from Neon.tech (see below)
   - `GOOGLE_CLIENT_SECRET`: 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
   - `GOOGLE_CALLBACK_URL`: https://[your-app].onrender.com/auth/google/callback

### Option B: Manual Setup
1. Go to https://render.com
2. Sign up/login with GitHub
3. New → Web Service
4. Connect your repository
5. Use these settings:
   ```
   Name: solarops-backend
   Root Directory: apps/backend
   Build Command: cd ../.. && pnpm install --no-frozen-lockfile && cd apps/backend && pnpm db:generate && pnpm build
   Start Command: pnpm start
   ```

## ACTION 3: Get a Database (5 minutes)

### Neon Database (Recommended - Free)
1. Go to https://neon.tech
2. Sign up (use GitHub)
3. Create new database
4. Copy the connection string
5. It looks like: `postgresql://username:password@host/database?sslmode=require`

## ACTION 4: Update Vercel Frontend (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Click on your `solar-ops` project
3. Go to Settings → Environment Variables
4. Add these:
   ```
   NEXT_PUBLIC_API_URL = https://solarops-backend.onrender.com/graphql
   NEXT_PUBLIC_WS_URL = wss://solarops-backend.onrender.com/graphql
   NEXT_PUBLIC_APP_URL = https://solar-ops.vercel.app
   ```
5. Click Save
6. Go to Deployments → Redeploy

## ACTION 5: Update Google Console (2 minutes)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID
3. Add this redirect URI:
   ```
   https://solarops-backend.onrender.com/auth/google/callback
   ```
4. Save

## 🎯 VERIFICATION CHECKLIST

After 15 minutes, check:

- [ ] Backend live at: https://solarops-backend.onrender.com/health
- [ ] GraphQL playground: https://solarops-backend.onrender.com/graphql
- [ ] Frontend redeployed on Vercel
- [ ] Google Sign-in button works!

## 🆘 QUICK FIXES

### "Database connection failed"
- Make sure you copied the ENTIRE Neon connection string
- Remove any spaces or line breaks

### "Redirect URI mismatch"
- The URL must be EXACTLY: `https://solarops-backend.onrender.com/auth/google/callback`
- No trailing slash!

### Backend not starting on Render
- Check logs in Render dashboard
- Make sure all environment variables are set
- DATABASE_URL is the most common issue

## 📱 WHAT TO DO RIGHT NOW:

1. **First**: Get your Neon database URL (5 min)
2. **Second**: Deploy to Render with environment variables (10 min)
3. **Third**: Update Vercel environment (2 min)
4. **Fourth**: Add Google redirect URI (2 min)
5. **Fifth**: Test it! (1 min)

Total time: ~20 minutes to fix everything!