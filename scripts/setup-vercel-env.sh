#!/bin/bash

# Setup Vercel Environment Variables Script
# This script helps you configure environment variables for your Vercel deployment

echo "🚀 Vercel Environment Setup Script"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found. Please install it first:${NC}"
    echo "npm install -g vercel"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "apps/frontend" ]; then
    echo -e "${RED}❌ Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Setting up production environment variables...${NC}"
echo ""

# Backend URL configuration
BACKEND_URL="https://solarops-backend.onrender.com"

# Set environment variables
echo -e "${YELLOW}Setting NEXT_PUBLIC_API_URL...${NC}"
vercel env add NEXT_PUBLIC_API_URL production <<< "${BACKEND_URL}/graphql"

echo -e "${YELLOW}Setting NEXT_PUBLIC_WS_URL...${NC}"
vercel env add NEXT_PUBLIC_WS_URL production <<< "wss://solarops-backend.onrender.com/graphql"

echo -e "${YELLOW}Setting NEXT_PUBLIC_APP_URL...${NC}"
vercel env add NEXT_PUBLIC_APP_URL production <<< "https://solarops-28.vercel.app"

echo ""
echo -e "${GREEN}✅ Environment variables configured!${NC}"
echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Redeploy your Vercel app to use new environment variables:"
echo "   ${BLUE}vercel --prod${NC}"
echo ""
echo "2. Make sure your backend is deployed on Render at:"
echo "   ${BLUE}${BACKEND_URL}${NC}"
echo ""
echo "3. Test your signup flow at:"
echo "   ${BLUE}https://solarops-28.vercel.app/auth/signup${NC}"
echo ""

# Optional: Pull current env vars to verify
echo -e "${YELLOW}Current production environment variables:${NC}"
vercel env pull .env.production.local --environment=production

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"