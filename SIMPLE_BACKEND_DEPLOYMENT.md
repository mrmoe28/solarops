# Simple Backend Deployment Solution

Since Vercel's serverless functions have limitations with NestJS, here's the simplest solution:

## Option 1: Deploy Backend on Render.com (FREE)

1. **Go to https://render.com**
2. **Sign up/Login with GitHub**
3. **New → Web Service**
4. **Connect your `solarops` repository**
5. **Configure:**
   - Name: `solarops-backend`
   - Root Directory: `apps/backend`
   - Build Command: `pnpm install && pnpm db:generate && pnpm build`
   - Start Command: `pnpm start`

6. **Add Environment Variables:**
   ```
   GOOGLE_CLIENT_ID=[from VERCEL_ENV_VALUES.txt]
   GOOGLE_CLIENT_SECRET=[from VERCEL_ENV_VALUES.txt]
   GOOGLE_CALLBACK_URL=https://solarops-backend.onrender.com/auth/google/callback
   FRONTEND_URL=https://solar-ops.vercel.app
   JWT_SECRET=[generate a secure one]
   DATABASE_URL=[use Render's PostgreSQL or external]
   ```

7. **After deployment, your backend will be at:**
   - `https://solarops-backend.onrender.com`

## Option 2: Use Railway.app (FREE with $5 credit)

1. **Go to https://railway.app**
2. **Deploy from GitHub repo**
3. **Similar configuration as above**
4. **Includes PostgreSQL and Redis**

## Update Your Frontend on Vercel

Add these environment variables to your Vercel project:
```
NEXT_PUBLIC_API_URL=https://solarops-backend.onrender.com/graphql
NEXT_PUBLIC_WS_URL=wss://solarops-backend.onrender.com/graphql
```

## Update Google Cloud Console

Add this redirect URI:
```
https://solarops-backend.onrender.com/auth/google/callback
```

## Why This Approach?

- Vercel is optimized for Next.js, not NestJS
- Free tier backend hosting with proper Node.js support
- Simpler than trying to convert NestJS to serverless functions
- Your frontend stays on Vercel as-is

This is the fastest way to get Google OAuth working with your current setup!