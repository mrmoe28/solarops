# Environment Variables Setup Guide

This guide explains how to set up environment variables for the SolarOps project.

## Quick Start

1. **Backend Setup** (apps/backend/)
   ```bash
   cd apps/backend
   cp ../../.env.backend.example .env
   # Edit .env and add your actual API keys
   ```

2. **Frontend Setup** (apps/frontend/)
   ```bash
   cd apps/frontend
   cp ../../.env.frontend.example .env.local
   # Frontend env vars are already configured for local development
   ```

## Required API Keys

### Backend (.env)

1. **OpenAI API Key** (Required)
   - Sign up at: https://platform.openai.com/
   - Generate API key from your account dashboard
   - Replace `your-openai-api-key-here` with your actual key

2. **NREL PVWatts API Key** (Required)
   - Sign up at: https://developer.nrel.gov/
   - Get free API key (1,000 requests/day)
   - Replace `your-nrel-api-key-here` with your actual key

3. **Google OAuth** (Optional - for social login)
   - Create project at: https://console.cloud.google.com/
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:4000/auth/google/callback`
   - Replace `your-google-client-id-here` and `your-google-client-secret-here`

4. **JWT Secret** (Required)
   - Generate a secure random string (at least 32 characters)
   - Example: `openssl rand -base64 32`
   - Replace `your-super-secret-jwt-key-change-this-in-production`

## Security Best Practices

1. **NEVER commit .env files** - They are already in .gitignore
2. **Use different keys for different environments** (dev, staging, prod)
3. **Rotate API keys regularly**
4. **Store production secrets in a secure vault** (AWS Secrets Manager, etc.)
5. **Use environment-specific .env files**:
   - `.env` for local development
   - `.env.production` for production (managed separately)

## Troubleshooting

### Port Already in Use
If you see "EADDRINUSE: address already in use :::4000":
```bash
# Find and kill the process using port 4000
lsof -ti:4000 | xargs kill -9
```

### Redis Connection Failed
Make sure Redis is running:
```bash
docker-compose up -d redis
```

### Database Connection Failed
Make sure PostgreSQL is running:
```bash
docker-compose up -d postgres
```

## Environment Variable Reference

### Backend Variables
- `NODE_ENV`: Application environment (development/production)
- `PORT`: Server port (default: 4000)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST/REDIS_PORT`: Redis connection details
- `OPENAI_API_KEY`: OpenAI API key for AI agents
- `NREL_API_KEY`: NREL PVWatts API key for solar calculations
- `JWT_SECRET`: Secret for JWT token signing
- `GOOGLE_CLIENT_ID/SECRET`: Google OAuth credentials
- `SMTP_*`: Email configuration (optional)

### Frontend Variables
- `NEXT_PUBLIC_API_URL`: GraphQL API endpoint
- `NEXT_PUBLIC_WS_URL`: WebSocket endpoint for subscriptions
- `NEXT_PUBLIC_APP_URL`: Frontend application URL