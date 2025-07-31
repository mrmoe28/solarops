# 🔧 Fix Google OAuth Redirect URI Mismatch

## 🚨 Current Error
**Error 400: redirect_uri_mismatch**

This error occurs because the redirect URI in your OAuth request doesn't match what's configured in the Google Cloud Console.

## 📋 Current Configuration
- **Backend Callback URL**: `http://localhost:4000/auth/google/callback`
- **Google Cloud Console**: Missing this redirect URI

## ✅ Step-by-Step Fix

### 1. Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **SolarOps** (or create one if needed)

### 2. Navigate to OAuth Credentials
1. Go to **APIs & Services** > **Credentials**
2. Find your OAuth 2.0 Client ID: `244349194151-khaibf8483dthc7legeeplpvivegojg0.apps.googleusercontent.com`
3. Click on the client ID to edit it

### 3. Add Authorized Redirect URIs
In the **Authorized redirect URIs** section, add:
```
http://localhost:4000/auth/google/callback
```

**Important**: Make sure this URI matches EXACTLY what's in your backend configuration.

### 4. Save Changes
1. Click **Save** at the bottom of the page
2. Wait a few minutes for changes to propagate

### 5. Test the Fix
1. Restart your development servers
2. Try signing in with Google again

## 🔍 Verification Steps

### Check Current Redirect URI
```bash
curl -s -I http://localhost:4000/auth/google
```

You should see a redirect to Google with the correct callback URL.

### Verify Backend Configuration
```bash
grep "GOOGLE_CALLBACK_URL" apps/backend/.env
```

Should show: `GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback`

## 🚀 Alternative: Use Different Port

If you continue having issues, you can change the backend port:

### Option A: Change Backend Port
1. Update `apps/backend/.env`:
   ```
   PORT=4001
   GOOGLE_CALLBACK_URL=http://localhost:4001/auth/google/callback
   ```

2. Update Google Cloud Console redirect URI to:
   ```
   http://localhost:4001/auth/google/callback
   ```

### Option B: Use Frontend Port
1. Update `apps/backend/.env`:
   ```
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/callback
   ```

2. Update Google Cloud Console redirect URI to:
   ```
   http://localhost:3000/auth/callback
   ```

## 📚 Reference
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2/web-server#authorization-errors-redirect-uri-mismatch)
- [Redirect URI Validation Rules](https://developers.google.com/identity/protocols/oauth2/web-server#uri-validation)

## 🎯 Quick Fix Command
Run this script to automatically update the redirect URI:
```bash
./scripts/fix-google-oauth-redirect.sh
``` 