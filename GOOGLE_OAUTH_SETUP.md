# 🔧 Google OAuth Setup Guide

## 🚨 Current Issue
You're seeing a "Error 401: invalid_client" error because Google OAuth is not properly configured.

## ✅ Quick Fix Options

### Option 1: Automated Setup (Recommended)
Run the automated setup script:
```bash
./scripts/setup-google-oauth.sh
```

### Option 2: Manual Setup
Follow these steps to configure Google OAuth:

## 📋 Step-by-Step Manual Setup

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing (required for OAuth)

### 2. Enable Google+ API
1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" 
3. Click "Enable"

### 3. Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: `SolarOps`
   - User support email: Your email
   - Developer contact information: Your email
4. Add your email as a test user

### 4. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set authorized redirect URIs:
   - `http://localhost:4000/auth/google/callback`
   - `http://localhost:3000/auth/callback`
5. Copy the Client ID and Client Secret

### 5. Update Environment Variables
Edit `apps/backend/.env`:
```env
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

### 6. Restart the Application
```bash
# Stop current servers (Ctrl+C)
# Then restart
pnpm dev
```

## 🔍 Troubleshooting

### Common Issues:
1. **"OAuth client was not found"**
   - Check that Client ID and Secret are correct
   - Ensure redirect URIs match exactly

2. **"Redirect URI mismatch"**
   - Verify redirect URIs in Google Console match your app URLs
   - Check for trailing slashes or protocol mismatches

3. **"Access blocked"**
   - Add your email as a test user in OAuth consent screen
   - Ensure the app is not in production mode

### Testing:
1. Visit http://localhost:3000
2. Click "Sign in with Google"
3. You should be redirected to Google's consent screen
4. After authorization, you'll be redirected back to the app

## 🛠️ Alternative: Disable Google OAuth Temporarily

If you want to use the app without Google OAuth while setting it up:

1. The app now handles missing OAuth gracefully
2. You'll see a warning message instead of a crash
3. You can still use email/password authentication

## 📞 Support

If you continue having issues:
1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure the Google Cloud project has billing enabled 