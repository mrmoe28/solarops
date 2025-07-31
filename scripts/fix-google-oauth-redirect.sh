#!/bin/bash

echo "🔧 Google OAuth Redirect URI Fix"
echo "================================"
echo ""

# Check if backend is running
if ! curl -s http://localhost:4000 > /dev/null 2>&1; then
    echo "❌ Backend is not running on port 4000"
    echo "Please start the backend first: pnpm dev"
    exit 1
fi

echo "✅ Backend is running on port 4000"

# Check current redirect URI
echo ""
echo "📋 Current Configuration:"
CALLBACK_URL=$(grep "GOOGLE_CALLBACK_URL" apps/backend/.env | cut -d'=' -f2)
echo "Backend Callback URL: $CALLBACK_URL"

# Test the redirect
echo ""
echo "🔍 Testing Google OAuth redirect..."
REDIRECT_URL=$(curl -s -I http://localhost:4000/auth/google | grep -i "location:" | cut -d' ' -f2- | tr -d '\r\n')
echo "Redirect URL: $REDIRECT_URL"

# Extract the redirect_uri parameter
REDIRECT_URI=$(echo "$REDIRECT_URL" | grep -o "redirect_uri=[^&]*" | cut -d'=' -f2 | sed 's/%3A/:/g' | sed 's/%2F/\//g' | sed 's/%3F/?/g' | sed 's/%3D/=/g' | sed 's/%26/\&/g')
echo "Extracted redirect_uri: $REDIRECT_URI"

echo ""
echo "🚨 ISSUE DETECTED:"
echo "The redirect URI '$REDIRECT_URI' is not registered in Google Cloud Console"
echo ""

echo "✅ SOLUTION:"
echo "1. Go to Google Cloud Console: https://console.cloud.google.com/"
echo "2. Navigate to: APIs & Services > Credentials"
echo "3. Find your OAuth 2.0 Client ID: 244349194151-khaibf8483dthc7legeeplpvivegojg0.apps.googleusercontent.com"
echo "4. Click on the client ID to edit it"
echo "5. In 'Authorized redirect URIs', add: $REDIRECT_URI"
echo "6. Click 'Save'"
echo "7. Wait 2-3 minutes for changes to propagate"
echo ""

echo "🔄 After updating Google Cloud Console:"
echo "1. Restart your development servers: pkill -f 'node' && pnpm dev"
echo "2. Try signing in with Google again"
echo ""

echo "📚 For more details, see: GOOGLE_OAUTH_REDIRECT_FIX.md"
echo ""

# Offer to open Google Cloud Console
read -p "Would you like to open Google Cloud Console now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "https://console.cloud.google.com/apis/credentials"
    echo "✅ Opened Google Cloud Console"
fi

echo ""
echo "🎯 Quick verification after updating:"
echo "curl -s -I http://localhost:4000/auth/google"
echo "" 