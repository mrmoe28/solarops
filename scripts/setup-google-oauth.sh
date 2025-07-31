#!/bin/bash

echo "🔧 SolarOps Google OAuth Setup"
echo "=============================="
echo ""

# Check if .env file exists
if [ ! -f "apps/backend/.env" ]; then
    echo "❌ Backend .env file not found!"
    echo "Please run: cp .env.backend.example apps/backend/.env"
    exit 1
fi

echo "📋 Google OAuth Setup Instructions:"
echo ""
echo "1. Go to Google Cloud Console: https://console.cloud.google.com/"
echo "2. Create a new project or select existing one"
echo "3. Enable Google+ API:"
echo "   - Go to 'APIs & Services' > 'Library'"
echo "   - Search for 'Google+ API' and enable it"
echo "4. Create OAuth 2.0 credentials:"
echo "   - Go to 'APIs & Services' > 'Credentials'"
echo "   - Click 'Create Credentials' > 'OAuth 2.0 Client IDs'"
echo "   - Choose 'Web application'"
echo "5. Configure OAuth consent screen:"
echo "   - Add your email as test user"
echo "   - Set application name: 'SolarOps'"
echo "6. Set authorized redirect URIs:"
echo "   - http://localhost:4000/auth/google/callback"
echo "   - http://localhost:3000/auth/callback"
echo ""
echo "7. Copy your Client ID and Client Secret"
echo ""

# Prompt for credentials
read -p "Enter your Google Client ID: " GOOGLE_CLIENT_ID
read -p "Enter your Google Client Secret: " GOOGLE_CLIENT_SECRET

if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
    echo "❌ Client ID and Secret are required!"
    exit 1
fi

# Update .env file
echo "📝 Updating backend .env file..."

# Create backup
cp apps/backend/.env apps/backend/.env.backup

# Update Google OAuth credentials
sed -i '' "s/GOOGLE_CLIENT_ID=.*/GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID/" apps/backend/.env
sed -i '' "s/GOOGLE_CLIENT_SECRET=.*/GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET/" apps/backend/.env

echo "✅ Google OAuth credentials updated!"
echo ""
echo "🔄 Restarting backend server..."
echo ""

# Restart the development server
cd apps/backend
npm run dev &
cd ../..

echo "🎉 Setup complete! Your Google OAuth should now work."
echo "📱 Try signing in with Google at: http://localhost:3000" 