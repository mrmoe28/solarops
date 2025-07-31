# Vercel Deployment Guide

This guide will help you deploy the SolarOps frontend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your GitHub repository connected to Vercel
3. Backend API deployed and accessible

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `mrmoe28/solarops`
4. Select the repository and click "Deploy"

### 2. Configure Project Settings

In the Vercel project settings:

#### Build Configuration
- **Framework Preset**: Next.js
- **Root Directory**: `apps/frontend`
- **Build Command**: `pnpm build:frontend`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

#### Environment Variables
Add the following environment variables in Vercel:

```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/graphql
NEXT_PUBLIC_WS_URL=wss://your-backend-domain.com/graphql
BACKEND_URL=https://your-backend-domain.com
NODE_ENV=production
```

### 3. Domain Configuration

1. Go to your project's "Domains" tab
2. Add your custom domain (optional)
3. Configure DNS settings if using a custom domain

### 4. Deploy

1. Click "Deploy" in Vercel
2. Monitor the build process
3. Check for any build errors in the logs

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are properly installed
   - Verify the build script has execute permissions
   - Ensure environment variables are set correctly

2. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` points to your deployed backend
   - Check CORS settings on your backend
   - Ensure WebSocket URL is correct for real-time features

3. **Package Dependencies**
   - The build script handles workspace dependencies automatically
   - If issues persist, check package.json files in shared packages

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | GraphQL API endpoint | Yes |
| `NEXT_PUBLIC_WS_URL` | WebSocket endpoint | Yes |
| `BACKEND_URL` | Backend base URL for API routes | Yes |
| `NODE_ENV` | Environment (production/development) | Yes |

## Post-Deployment

1. **Test the Application**
   - Verify all pages load correctly
   - Test authentication flow
   - Check API integrations

2. **Performance Monitoring**
   - Use Vercel Analytics to monitor performance
   - Set up error tracking
   - Monitor API response times

3. **Continuous Deployment**
   - Push to main branch to trigger automatic deployments
   - Set up preview deployments for pull requests

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review environment variable configuration
3. Verify backend API is accessible
4. Contact the development team 