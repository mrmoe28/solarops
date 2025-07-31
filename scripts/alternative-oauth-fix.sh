#!/bin/bash

echo "🔧 Alternative Google OAuth Fix - Change Backend Port"
echo "====================================================="
echo ""

echo "This script will change the backend port to 4001 to avoid redirect URI conflicts."
echo ""

read -p "Do you want to proceed? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 0
fi

# Stop current servers
echo "🛑 Stopping current servers..."
pkill -f "node" 2>/dev/null || true
sleep 2

# Update backend environment
echo "📝 Updating backend configuration..."
sed -i '' 's/PORT=4000/PORT=4001/' apps/backend/.env
sed -i '' 's|GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback|GOOGLE_CALLBACK_URL=http://localhost:4001/auth/google/callback|' apps/backend/.env

echo "✅ Updated backend configuration:"
echo "   PORT=4001"
echo "   GOOGLE_CALLBACK_URL=http://localhost:4001/auth/google/callback"

echo ""
echo "🔄 Starting servers with new configuration..."
pnpm dev &
sleep 15

echo ""
echo "🎯 Next Steps:"
echo "1. Go to Google Cloud Console: https://console.cloud.google.com/"
echo "2. Navigate to: APIs & Services > Credentials"
echo "3. Find your OAuth 2.0 Client ID"
echo "4. Add this redirect URI: http://localhost:4001/auth/google/callback"
echo "5. Save and wait 2-3 minutes"
echo "6. Test Google OAuth at: http://localhost:3000"
echo ""

echo "📊 Server Status:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:4001"
echo "   GraphQL: http://localhost:4001/graphql"
echo ""

# Test the new configuration
if curl -s http://localhost:4001 > /dev/null 2>&1; then
    echo "✅ Backend is running on port 4001"
    echo "🔍 Testing new OAuth redirect..."
    NEW_REDIRECT=$(curl -s -I http://localhost:4001/auth/google | grep -i "location:" | cut -d' ' -f2- | tr -d '\r\n')
    echo "New redirect URL: $NEW_REDIRECT"
else
    echo "❌ Backend failed to start on port 4001"
fi

echo ""
echo "📚 For manual configuration, see: GOOGLE_OAUTH_REDIRECT_FIX.md" 