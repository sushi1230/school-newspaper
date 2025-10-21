# Deployment Checklist - School Newspaper

Use this checklist to deploy your website to Vercel.

---

## Pre-Deployment Setup (1-2 hours)

### Google Sheets API Setup
- [ ] Follow: `docs/GOOGLE_API_SETUP.md` (Steps 1-7)
- [ ] Have: Google API Key
- [ ] Have: Google Sheets ID
- [ ] Have: Master "Articles" sheet created and shared
- [ ] Have: Sample articles in the sheet

### Google OAuth 2.0 Setup
- [ ] Follow: `docs/GOOGLE_OAUTH_SETUP.md` (Steps 1-2)
- [ ] Have: Google OAuth Client ID
- [ ] Create "Users" sheet in master spreadsheet
- [ ] Add your email (hkaplanminer@pps.net) as Admin
- [ ] Share both sheets publicly

### Code Preparation
- [ ] All changes committed to GitHub
- [ ] Push to main branch: `git push origin main`
- [ ] `.env.local` is in `.gitignore` (secrets protected)
- [ ] Run locally and test: `npm run dev`
- [ ] Verify login page works locally

---

## Deployment to Vercel (15-30 minutes)

### Step 1: Create Vercel Account
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Authorize Vercel

### Step 2: Import Project
- [ ] Click "New Project"
- [ ] Select "Import Git Repository"
- [ ] Paste: `https://github.com/YOUR-USERNAME/school-newspaper`
- [ ] Click "Import"

### Step 3: Configure Environment Variables
- [ ] Add VITE_GOOGLE_API_KEY (from Google API setup)
- [ ] Add VITE_GOOGLE_SHEETS_ID
- [ ] Add VITE_GOOGLE_DRIVE_FOLDER_ID (can be empty)
- [ ] Add VITE_GOOGLE_OAUTH_CLIENT_ID (from Google OAuth setup)
- [ ] Add VITE_ALLOWED_EMAIL_DOMAIN = `pps.net`
- [ ] Add VITE_ADMIN_EMAIL = `hkaplanminer@pps.net`
- [ ] Add VITE_CACHE_ENABLED = `true`
- [ ] Add VITE_CACHE_DURATION_MS = `3600000`

### Step 4: Deploy
- [ ] Click "Deploy" button
- [ ] Wait for deployment to complete (3-5 minutes)
- [ ] Copy your Vercel URL (e.g., `https://school-newspaper-xyz.vercel.app`)

### Step 5: Update OAuth Redirect URIs
- [ ] Go to Google Cloud Console
- [ ] Select your "School Newspaper" project
- [ ] Go to APIs & Services → Credentials
- [ ] Edit your OAuth 2.0 Client ID
- [ ] Add Authorized redirect URIs:
  - [ ] `https://YOUR-VERCEL-DOMAIN.vercel.app`
  - [ ] `https://YOUR-VERCEL-DOMAIN.vercel.app/login`
- [ ] Click Save

---

## Post-Deployment Testing (10 minutes)

### Functionality Tests
- [ ] Visit your Vercel URL - website loads
- [ ] Click "Sign in with Google" button
- [ ] Redirected to Google sign-in
- [ ] Sign in with your @pps.net email
- [ ] Accepted and logged in
- [ ] Redirected to Admin dashboard (/admin)
- [ ] Admin dashboard displays correctly
- [ ] Can view Users list
- [ ] Can view Site Settings
- [ ] Home page loads (click logo or go to /)
- [ ] Staff page loads (/staff)
- [ ] Logout button works (if implemented)

### Check For Errors
- [ ] No errors in browser console (F12)
- [ ] No errors in Vercel dashboard logs
- [ ] Images loading correctly
- [ ] Navigation between pages works
- [ ] Responsive design (test on mobile)

---

## Troubleshooting

### Login Doesn't Work
**Error: "Unexpected parameter: nonce" or redirect issues**
- [ ] Check OAuth Client ID is in Vercel env vars (not empty)
- [ ] Verify Vercel domain is in OAuth redirect URIs
- [ ] Wait 5-10 minutes (Google takes time to sync)
- [ ] Clear browser cache and try again
- [ ] Check Google Cloud Console for any errors

### Articles Not Loading
**Issue: "No articles found" message**
- [ ] Verify Google API Key is correct in env vars
- [ ] Verify Google Sheets ID is correct
- [ ] Check that master sheet is shared publicly
- [ ] Verify "Articles" sheet name is exactly correct (case-sensitive)
- [ ] Add test article to verify it works

### Website Doesn't Load
**Error: 404 or blank page**
- [ ] Check Vercel dashboard for deploy errors
- [ ] Verify all environment variables are set
- [ ] Re-deploy: Go to Vercel → Deployments → Redeploy
- [ ] Check GitHub - make sure code was pushed

---

## What's Next?

After successful deployment:

1. **Share the URL** with your editing team
2. **They sign up** with their @pps.net emails (will be blocked initially)
3. **You approve them** in Admin panel (Users tab)
4. **They can start** writing articles and using their dashboards
5. **Create documentation** for writers and editors (see GETTING_STARTED.md)

---

## Useful Commands

```bash
# Check what's committed
git status

# View environment variables (local only)
cat .env.local

# Push latest changes to GitHub (triggers auto-deploy)
git push origin main

# View Vercel logs (if you install Vercel CLI)
vercel logs
```

---

## Support

- **Setup issues**: Check the individual setup guides (GOOGLE_API_SETUP.md, GOOGLE_OAUTH_SETUP.md)
- **Deployment issues**: See DEPLOYMENT_GUIDE.md troubleshooting section
- **Code issues**: Check browser console for error messages
- **Authentication issues**: Check Google Cloud Console OAuth settings

**You got this! Your school newspaper is about to go live!** 🚀
