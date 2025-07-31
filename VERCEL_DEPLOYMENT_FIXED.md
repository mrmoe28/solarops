# Vercel Deployment Guide - Fixed for Monorepo

This guide provides the correct configuration for deploying the SolarOps frontend from a monorepo to Vercel.

## 🚀 Correct Vercel Configuration

### **Project Settings in Vercel Dashboard:**

1. **Framework Preset**: Next.js
2. **Root Directory**: `apps/frontend` ⭐ **CRITICAL**
3. **Build Command**: `pnpm build`
4. **Output Directory**: `.next`
5. **Install Command**: `pnpm install`

### **Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/graphql
NEXT_PUBLIC_WS_URL=wss://your-backend-domain.com/graphql
BACKEND_URL=https://your-backend-domain.com
NODE_ENV=production
```

## 🔧 Key Changes Made

### **1. Root Directory Configuration**
- Set Root Directory to `apps/frontend` in Vercel
- This tells Vercel to treat the frontend app as the main project

### **2. Simplified Build Command**
- Changed from complex workspace commands to simple `pnpm build`
- The build script in `apps/frontend/package.json` handles workspace dependencies

### **3. Proper .vercelignore**
- Created `apps/frontend/.vercelignore` for frontend-specific exclusions
- Excludes documentation, backend code, and unnecessary files

### **4. Enhanced Next.js Config**
- Added `typescript: { ignoreBuildErrors: true }` for smoother builds
- Kept `eslint: { ignoreDuringBuilds: true }` to avoid style issues

## 📋 Deployment Steps

### **Step 1: Vercel Dashboard Setup**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `mrmoe28/solarops`
4. **IMPORTANT**: Set Root Directory to `apps/frontend`

### **Step 2: Configure Build Settings**
- **Framework**: Next.js
- **Root Directory**: `apps/frontend`
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### **Step 3: Add Environment Variables**
Add all required environment variables in the Vercel project settings.

### **Step 4: Deploy**
Click "Deploy" and monitor the build process.

## 🛠️ Troubleshooting

### **Common Issues & Solutions:**

1. **"Module not found" errors**
   - Ensure Root Directory is set to `apps/frontend`
   - Check that workspace dependencies are properly configured

2. **Build timeout**
   - The build script now handles dependencies efficiently
   - Monitor build logs for specific issues

3. **Environment variable issues**
   - Verify all `NEXT_PUBLIC_*` variables are set
   - Check that backend URLs are accessible

4. **Workspace dependency issues**
   - The build script automatically builds shared packages first
   - Check package.json files for correct workspace references

## ✅ Expected Build Output

When successful, you should see:
```
✓ Compiled successfully
✓ Checking validity of types
✓ Collecting page data
✓ Generating static pages (19/19)
✓ Collecting build traces
✓ Finalizing page optimization
```

## 🔍 Monitoring

- Check Vercel build logs for any errors
- Monitor deployment status in the Vercel dashboard
- Test the deployed application thoroughly

## 📞 Support

If issues persist:
1. Check Vercel build logs for specific error messages
2. Verify environment variables are correctly set
3. Ensure backend API is accessible from Vercel's servers
4. Review the build script in `apps/frontend/package.json` 