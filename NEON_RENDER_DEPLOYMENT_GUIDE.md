# 🚀 Complete Deployment Guide: Neon + Render + Vercel

This guide will get your Google OAuth working with your deployed app.

## 📋 Prerequisites Checklist
- ✅ Frontend deployed on Vercel: `https://solar-ops.vercel.app`
- ✅ Neon database created
- ✅ GitHub repository: `solarops`
- ✅ Google OAuth credentials from local setup

## 🗄️ Step 1: Prepare Your Database URL

Your Neon connection string (modified for Node.js compatibility):
```
DATABASE_URL=postgresql://neondb_owner:npg_8imgOY3wJsQN@ep-long-hill-aej2d4h6-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Note**: Removed `channel_binding=require` for compatibility.

## 🚀 Step 2: Deploy Backend on Render

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login** (use GitHub for easy integration)
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub account** and select `solarops` repository
5. **Configure your service:**
   - **Name**: `solarops-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `apps/backend`
   - **Build Command**: 
     ```bash
     cd ../.. && pnpm install --no-frozen-lockfile && cd apps/backend && pnpm db:generate && pnpm build
     ```
   - **Start Command**: `pnpm start`

## 🔐 Step 3: Add Environment Variables on Render

Click "Advanced" and add these environment variables:

```bash
# Database (your Neon connection)
DATABASE_URL=postgresql://neondb_owner:npg_8imgOY3wJsQN@ep-long-hill-aej2d4h6-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require

# Google OAuth (from your VERCEL_ENV_VALUES.txt)
GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID_FROM_ENV_FILE]
GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET_FROM_ENV_FILE]
GOOGLE_CALLBACK_URL=https://solarops-backend.onrender.com/auth/google/callback
FRONTEND_URL=https://solar-ops.vercel.app

# Security
JWT_SECRET=your-super-secure-jwt-secret-change-this-to-random-string

# Node Environment
NODE_ENV=production
PORT=4000

# Optional APIs (add if you have them)
OPENAI_API_KEY=your-openai-key
NREL_API_KEY=your-nrel-key
```

**IMPORTANT**: Generate a secure JWT_SECRET (use a password generator)

## 📝 Step 4: Deploy on Render

1. Click **"Create Web Service"**
2. Wait for deployment (first deploy takes ~10-15 minutes)
3. Your backend will be live at: `https://solarops-backend.onrender.com`

## 🌐 Step 5: Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client ID
3. Add this Authorized redirect URI:
   ```
   https://solarops-backend.onrender.com/auth/google/callback
   ```
4. Keep your existing localhost URI for development
5. Save changes

## 🎨 Step 6: Update Frontend on Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `solar-ops` project
3. Go to **Settings → Environment Variables**
4. Add/Update these variables:

```bash
NEXT_PUBLIC_API_URL=https://solarops-backend.onrender.com/graphql
NEXT_PUBLIC_WS_URL=wss://solarops-backend.onrender.com/graphql
NEXT_PUBLIC_APP_URL=https://solar-ops.vercel.app
```

5. Click **"Save"**
6. Go to **Deployments** tab
7. Click **"Redeploy"** → **"Redeploy"**

## 🧪 Step 7: Test Your Setup

1. Wait for both deployments to complete
2. Visit https://solar-ops.vercel.app
3. Click **"Sign in with Google"**
4. You should see Google's consent screen
5. After authorization, you'll be redirected back and logged in!

## 🐛 Troubleshooting

### "Failed to fetch" error
- Check Render logs for backend errors
- Ensure all environment variables are set correctly
- Wait 5 minutes for Render to fully deploy

### "Redirect URI mismatch"
- Double-check the exact URL in Google Console
- Ensure it's `https://` not `http://`
- No trailing slashes

### Database connection errors
- Check Render logs
- Verify DATABASE_URL is correctly formatted
- Neon database should be in active state

### CORS errors
- Frontend URL must match exactly in backend env vars
- Check for typos in FRONTEND_URL

## 📊 Monitoring

- **Render Dashboard**: https://dashboard.render.com
- **Backend Health Check**: https://solarops-backend.onrender.com/health
- **GraphQL Playground**: https://solarops-backend.onrender.com/graphql

## 🎉 Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend environment variables updated on Vercel
- [ ] Google Console redirect URI added
- [ ] Both services redeployed
- [ ] Google OAuth login working

## 💡 Next Steps

1. Set up monitoring (Render provides basic metrics)
2. Configure custom domain (optional)
3. Set up Redis for better performance (optional)
4. Enable Render auto-deploy from GitHub

---

**Note**: Render free tier spins down after 15 minutes of inactivity. First request after idle will take ~30 seconds to respond.