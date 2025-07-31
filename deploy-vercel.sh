#!/bin/bash

echo "🚀 Vercel Deployment Script"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "apps/frontend" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Vercel CLI is installed
if ! command_exists vercel; then
    echo -e "${YELLOW}📦 Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo -e "${BLUE}🔐 Checking Vercel authentication...${NC}"
if ! vercel whoami > /dev/null 2>&1; then
    echo -e "${YELLOW}Please log in to Vercel:${NC}"
    vercel login
fi

# Deploy options
echo ""
echo -e "${BLUE}Select deployment option:${NC}"
echo "1) Deploy frontend only (recommended)"
echo "2) Deploy with GitHub Actions setup"
echo "3) Create deploy hook only"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo -e "${GREEN}🚀 Deploying frontend to Vercel...${NC}"
        cd apps/frontend
        
        # Check if already linked
        if [ ! -f ".vercel/project.json" ]; then
            echo -e "${YELLOW}Linking to Vercel project...${NC}"
            vercel link
        fi
        
        # Deploy to production
        echo -e "${GREEN}📦 Building and deploying...${NC}"
        vercel --prod
        
        echo -e "${GREEN}✅ Deployment complete!${NC}"
        ;;
        
    2)
        echo -e "${BLUE}📋 Setting up GitHub Actions deployment${NC}"
        echo ""
        echo "You need to add these secrets to your GitHub repository:"
        echo "1. Go to: https://github.com/mrmoe28/solarops/settings/secrets/actions"
        echo "2. Add these secrets:"
        echo ""
        
        # Get Vercel token
        echo -e "${YELLOW}Getting Vercel token...${NC}"
        echo "Run this command to get your token:"
        echo -e "${BLUE}vercel tokens create${NC}"
        echo ""
        read -p "Enter your Vercel token: " VERCEL_TOKEN
        
        # Get project and org IDs
        cd apps/frontend
        vercel link
        
        echo ""
        echo "Add these secrets to GitHub:"
        echo "- VERCEL_TOKEN: $VERCEL_TOKEN"
        echo "- VERCEL_ORG_ID: (check .vercel/project.json)"
        echo "- VERCEL_PROJECT_ID: (check .vercel/project.json)"
        echo ""
        echo -e "${GREEN}✅ GitHub Actions workflow created at .github/workflows/deploy-vercel.yml${NC}"
        ;;
        
    3)
        echo -e "${BLUE}🔗 Creating deploy hook...${NC}"
        echo ""
        echo "1. Go to: https://vercel.com/dashboard"
        echo "2. Select your project"
        echo "3. Go to Settings → Git → Deploy Hooks"
        echo "4. Create a new hook with name 'Manual Deploy'"
        echo "5. Copy the URL"
        echo ""
        read -p "Paste your deploy hook URL: " DEPLOY_HOOK
        
        # Save deploy hook
        echo "VERCEL_DEPLOY_HOOK=$DEPLOY_HOOK" > .env.deploy
        echo -e "${GREEN}✅ Deploy hook saved to .env.deploy${NC}"
        echo ""
        echo "To trigger deployment, run:"
        echo -e "${BLUE}curl -X POST $DEPLOY_HOOK${NC}"
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Done! Your app should be deploying to Vercel.${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Check deployment status at: https://vercel.com/dashboard"
echo "2. Once deployed, test Google OAuth at: https://solar-ops.vercel.app"
echo "3. Make sure backend is running at: https://solarops-backend.onrender.com"