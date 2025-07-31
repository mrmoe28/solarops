# Vercel OAuth Configuration for SolarOps

## Your Deployment URLs
- **Frontend**: https://solar-ops.vercel.app
- **Backend**: [TO BE CONFIRMED]

## Backend Environment Variables (Add these to your backend Vercel project)

```env
# Google OAuth (using your existing credentials)
GOOGLE_CLIENT_ID=[YOUR-GOOGLE-CLIENT-ID]
GOOGLE_CLIENT_SECRET=[YOUR-GOOGLE-CLIENT-SECRET]
GOOGLE_CALLBACK_URL=https://[YOUR-BACKEND-URL]/auth/google/callback
FRONTEND_URL=https://solar-ops.vercel.app

# JWT Secret (generate a secure one)
JWT_SECRET=your-secure-jwt-secret-for-production

# Database (you'll need a production database)
DATABASE_URL=your-production-postgres-url

# Redis (optional, but recommended for production)
REDIS_URL=your-production-redis-url

# Other APIs
OPENAI_API_KEY=your-openai-api-key
NREL_API_KEY=your-nrel-api-key
```

## Frontend Environment Variables (Add these to solar-ops.vercel.app)

```env
# Backend API URLs
NEXT_PUBLIC_API_URL=https://[YOUR-BACKEND-URL]/graphql
NEXT_PUBLIC_WS_URL=wss://[YOUR-BACKEND-URL]/graphql

# App URL
NEXT_PUBLIC_APP_URL=https://solar-ops.vercel.app

# Optional
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[YOUR-GOOGLE-CLIENT-ID]
```

## Steps to Configure

### 1. In Vercel Dashboard:

#### For Frontend (solar-ops.vercel.app):
1. Go to your project settings
2. Click on "Environment Variables"
3. Add each variable above
4. Redeploy the project

#### For Backend:
1. Deploy your backend if not already done
2. Add the environment variables
3. Make sure to replace [YOUR-BACKEND-URL] with actual URL

### 2. Update Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Find your OAuth 2.0 Client ID
3. Add this Authorized redirect URI:
   - `https://[YOUR-BACKEND-URL]/auth/google/callback`
4. Keep your localhost URL for development:
   - `http://localhost:4000/auth/google/callback`

### 3. Production Database & Redis:

You'll need:
- A production PostgreSQL database (e.g., Supabase, Neon, Railway)
- A production Redis instance (e.g., Upstash, Railway)

## Testing

After configuration:
1. Visit https://solar-ops.vercel.app
2. Click "Sign in with Google"
3. You should see Google's consent screen
4. After authorization, you should be logged in

## Important Notes

- Replace [YOUR-BACKEND-URL] with your actual backend Vercel URL
- Generate a secure JWT_SECRET for production
- Set up production database and Redis instances
- The Google credentials shown are from your local .env file