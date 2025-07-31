# ✅ Google OAuth Vercel Deployment Checklist

Use this checklist to ensure Google OAuth works correctly on your Vercel deployment.

## 🔐 Google Cloud Console Setup

- [ ] **OAuth 2.0 Client Created**
  - [ ] Client ID obtained
  - [ ] Client Secret obtained

- [ ] **Authorized Redirect URIs Added**
  - [ ] `https://your-backend-domain.vercel.app/auth/google/callback`
  - [ ] `http://localhost:4000/auth/google/callback` (for local dev)

- [ ] **Authorized JavaScript Origins Added** (if applicable)
  - [ ] `https://your-frontend-domain.vercel.app`
  - [ ] `https://your-backend-domain.vercel.app`

## 🔧 Vercel Backend Configuration

- [ ] **Environment Variables Set**
  - [ ] `GOOGLE_CLIENT_ID` = `your-actual-client-id`
  - [ ] `GOOGLE_CLIENT_SECRET` = `your-actual-client-secret`
  - [ ] `GOOGLE_CALLBACK_URL` = `https://your-backend-domain.vercel.app/auth/google/callback`
  - [ ] `FRONTEND_URL` = `https://your-frontend-domain.vercel.app`
  - [ ] `DATABASE_URL` = `your-postgres-connection-string`
  - [ ] `REDIS_URL` = `your-redis-connection-string`
  - [ ] `JWT_SECRET` = `your-secure-jwt-secret`

- [ ] **Backend Deployed Successfully**
  - [ ] No build errors
  - [ ] GraphQL endpoint accessible at `/graphql`

## 🎨 Vercel Frontend Configuration

- [ ] **Environment Variables Set**
  - [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend-domain.vercel.app/graphql`
  - [ ] `NEXT_PUBLIC_WS_URL` = `wss://your-backend-domain.vercel.app/graphql`
  - [ ] `NEXT_PUBLIC_APP_URL` = `https://your-frontend-domain.vercel.app`

- [ ] **Frontend Deployed Successfully**
  - [ ] No build errors
  - [ ] Sign-in page accessible

## 🧪 Testing Steps

### 1. Initial Page Load
- [ ] Visit `https://your-frontend-domain.vercel.app`
- [ ] No console errors
- [ ] Page loads correctly

### 2. OAuth Flow Test
- [ ] Click "Sign in with Google"
- [ ] Redirected to Google consent screen
- [ ] Google consent screen shows correct app name
- [ ] After authorization, redirected back to app
- [ ] User is logged in successfully
- [ ] JWT token stored in localStorage

### 3. Error Handling Test
- [ ] Test with incorrect credentials
- [ ] Proper error messages displayed
- [ ] No app crashes

## 🐛 Common Issues & Solutions

### Issue: "Error 400: redirect_uri_mismatch"
**Solution:**
- Verify exact match of redirect URI in Google Console
- Check for trailing slashes
- Ensure HTTPS protocol
- Wait 5-10 minutes for changes to propagate

### Issue: "Error 401: invalid_client"
**Solution:**
- Double-check GOOGLE_CLIENT_ID in Vercel
- Double-check GOOGLE_CLIENT_SECRET in Vercel
- Redeploy after adding env variables
- Ensure no spaces or quotes in env values

### Issue: "Network Error" or CORS Issues
**Solution:**
- Verify FRONTEND_URL is set in backend
- Check backend CORS configuration
- Ensure backend is running and accessible

### Issue: "Cannot read properties of undefined"
**Solution:**
- Check NEXT_PUBLIC_API_URL format
- Ensure it includes `/graphql` at the end
- Verify backend is deployed

## 📊 Monitoring

- [ ] **Check Vercel Function Logs**
  - Backend auth endpoints working
  - No 500 errors

- [ ] **Check Browser Console**
  - No JavaScript errors
  - Network requests succeeding

- [ ] **Verify Database Connection**
  - Users being created/updated
  - Sessions being stored

## 🚀 Post-Deployment

- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Share test link with team
- [ ] Monitor error logs for 24 hours

## 📝 Notes

**Backend URL:** `___________________________`

**Frontend URL:** `___________________________`

**Google Client ID:** `___________________________`

**Deployment Date:** `___________________________`

**Tested By:** `___________________________`

---

✨ Once all items are checked, your Google OAuth should be working perfectly on Vercel!