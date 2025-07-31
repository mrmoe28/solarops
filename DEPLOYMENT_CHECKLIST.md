# 🚀 SolarOps Deployment Checklist

This checklist will help you deploy your SolarOps application successfully with frontend on Vercel and backend on Render.

## ✅ Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code pushed to GitHub: `git push origin main`
- [ ] All environment files created (`.env.example` files)
- [ ] No sensitive data in repository

### 2. Database Setup (Neon)
- [ ] Neon account created at https://neon.tech
- [ ] Database created
- [ ] Connection string obtained (remove `?channel_binding=require` for Node.js compatibility)
- [ ] Example: `postgresql://user:pass@host/db?sslmode=require`

### 3. API Keys
- [ ] Google OAuth credentials ready (from GOOGLE_OAUTH_SETUP.md)
- [ ] NREL API key obtained from https://developer.nrel.gov
- [ ] JWT secret generated (use: `openssl rand -base64 32`)

## 🔧 Backend Deployment (Render)

### Step 1: Deploy to Render
1. [ ] Go to https://render.com and sign in
2. [ ] Click "New +" → "Web Service"
3. [ ] Connect GitHub and select `mrmoe28/solarops` repository
4. [ ] Configure service:
   - **Name**: `solarops-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `apps/backend`
   - **Runtime**: Node
   - **Build Command**: Already set in render.yaml
   - **Start Command**: Already set in render.yaml

### Step 2: Add Environment Variables on Render
Click "Advanced" and add these variables:

```bash
# Required - Must be set
DATABASE_URL=<your-neon-connection-string>
JWT_SECRET=<generate-with-openssl-rand-base64-32>
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>
GOOGLE_CALLBACK_URL=https://solarops-backend.onrender.com/auth/google/callback
NREL_API_KEY=<from-nrel-developer>

# Optional
REDIS_URL=<if-using-external-redis>
OPENAI_API_KEY=<if-using-ai-features>
```

### Step 3: Deploy Backend
1. [ ] Click "Create Web Service"
2. [ ] Wait for initial deployment (5-10 minutes)
3. [ ] Check logs for any errors
4. [ ] Test GraphQL endpoint: `https://solarops-backend.onrender.com/graphql`

## 🌐 Frontend Deployment (Vercel)

### Step 1: Set Environment Variables
Run the setup script:
```bash
cd /Users/ekodevapps/Desktop/Solar\ Ops
./scripts/setup-vercel-env.sh
```

Or manually in Vercel Dashboard:
1. [ ] Go to https://vercel.com/dashboard
2. [ ] Select your project
3. [ ] Go to Settings → Environment Variables
4. [ ] Add these production variables:
   ```
   NEXT_PUBLIC_API_URL=https://solarops-backend.onrender.com/graphql
   NEXT_PUBLIC_WS_URL=wss://solarops-backend.onrender.com/graphql
   NEXT_PUBLIC_APP_URL=https://solarops-28.vercel.app
   ```

### Step 2: Configure Project Settings
1. [ ] In Vercel Dashboard → Settings → General
2. [ ] Set **Root Directory**: `apps/frontend`
3. [ ] Framework Preset: Next.js (auto-detected)
4. [ ] Node.js Version: 20.x

### Step 3: Deploy Frontend
```bash
cd /Users/ekodevapps/Desktop/Solar\ Ops
vercel --prod
```

## 🔍 Post-Deployment Verification

### Backend Health Checks
1. [ ] GraphQL Playground loads: `https://solarops-backend.onrender.com/graphql`
2. [ ] No CORS errors in browser console
3. [ ] Database migrations completed successfully

### Frontend Health Checks
1. [ ] Homepage loads: `https://solarops-28.vercel.app`
2. [ ] Signup page loads without errors
3. [ ] API connection working (check browser Network tab)

### Test User Flow
1. [ ] Create new account via signup
2. [ ] Login with created account
3. [ ] Google OAuth login works
4. [ ] Create a test project

## 🐛 Troubleshooting

### "Failed to fetch" on Signup
- Check backend is running
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check browser console for CORS errors
- Ensure backend logs show incoming requests

### CORS Errors
- Backend should include your Vercel URL in allowed origins
- Check `apps/backend/src/main.ts` CORS configuration
- Redeploy backend after CORS changes

### Database Connection Issues
- Verify DATABASE_URL format
- Ensure SSL mode is set correctly
- Check Render logs for connection errors

### Google OAuth Not Working
- Verify redirect URIs in Google Console match exactly
- Check GOOGLE_CALLBACK_URL includes `/auth/google/callback`
- Ensure frontend and backend URLs are correct

## 📱 Mobile Testing
- [ ] Test on mobile browser
- [ ] Check responsive design
- [ ] Verify touch interactions work

## 🎉 Launch Checklist
- [ ] All tests passing
- [ ] Error monitoring set up (optional)
- [ ] DNS configured (if using custom domain)
- [ ] SSL certificates active
- [ ] Share with team for testing

## 🔄 Continuous Deployment
Both Vercel and Render support automatic deployments:
- Push to `main` branch triggers both deployments
- Monitor deployment status in respective dashboards
- Set up deployment notifications (optional)

---

**Need Help?** Check the detailed guides:
- Backend issues: See `NEON_RENDER_DEPLOYMENT_GUIDE.md`
- OAuth setup: See `GOOGLE_OAUTH_SETUP.md`
- Vercel config: See `VERCEL_ENV_SETUP.md`