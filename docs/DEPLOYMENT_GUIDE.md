# Deployment Guide - School Newspaper Website

Deploy your authentication-enabled School Newspaper website to the internet so it's live and accessible to everyone.

---

## Prerequisites Before Deploying

Before you deploy, you must complete these setup steps:

### 1. ✅ Google APIs Configured
- [x] Google Sheets API setup (from GOOGLE_API_SETUP.md)
- [x] Google OAuth 2.0 setup (from GOOGLE_OAUTH_SETUP.md)
- [x] You have: Google API Key, Google OAuth Client ID, Google Sheets ID

### 2. ✅ Code Ready
- [x] Push all code to GitHub
- [x] `.env.local` is in `.gitignore` (secrets won't be exposed)
- [x] All environment variables configured locally

### 3. ✅ Users Sheet Created
- [x] Master Google Sheet with "Articles" tab
- [x] "Users" sheet with your admin email added
- [x] Both sheets shared publicly (view access)

---

## Deployment Options

You have 3 main options:

1. **Vercel** (Recommended) - Easiest, most beginner-friendly ⭐
2. **Netlify** - Also easy, similar to Vercel
3. **GitHub Pages** - Free, but requires more setup

All three options are **completely free**.

---

## Option 1: Vercel (Recommended)

Vercel is the easiest and most reliable option.

### Step 1: Create a Vercel Account

1. Go to [Vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (or another option)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. After signing in, click "New Project"
2. Select "Import Git Repository"
3. Paste your GitHub repository URL: `https://github.com/your-username/school-newspaper`
4. Click "Import"

### Step 3: Configure Environment Variables

1. In the "Configure Project" section, look for "Environment Variables"
2. Add **all required** variables (copy from your `.env.local`):

   **Google Sheets API (Article Reading):**
   ```
   VITE_GOOGLE_API_KEY = [your API key from GOOGLE_API_SETUP.md]
   VITE_GOOGLE_SHEETS_ID = [your master sheet ID]
   VITE_GOOGLE_DRIVE_FOLDER_ID = [your drive folder ID, or leave empty]
   ```

   **Google OAuth 2.0 (Authentication):**
   ```
   VITE_GOOGLE_OAUTH_CLIENT_ID = [your OAuth Client ID from GOOGLE_OAUTH_SETUP.md]
   VITE_ALLOWED_EMAIL_DOMAIN = pps.net
   VITE_ADMIN_EMAIL = hkaplanminer@pps.net
   ```

   **Optional Settings:**
   ```
   VITE_CACHE_ENABLED = true
   VITE_CACHE_DURATION_MS = 3600000
   ```

   ⚠️ **Important:** Make sure you add the OAuth Client ID **or authentication won't work!**

### Step 4: Update OAuth Redirect URIs

**CRITICAL STEP - Do this before clicking Deploy!**

Your Google OAuth app needs to know about your Vercel domain. After Vercel creates your URL, you must add it to Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your "School Newspaper" project
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Click to edit it
6. Under "Authorized redirect URIs", add:
   - `https://your-vercel-domain.vercel.app`
   - `https://your-vercel-domain.vercel.app/login`
7. Click **Save**

⚠️ You'll need to do this **after** Vercel gives you your domain (in Step 5 below)

### Step 5: Deploy!

1. Click "Deploy"
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://school-newspaper-xyz.vercel.app`
4. **Copy this URL and update your OAuth redirect URIs** (see Step 4 above)
5. Your website is now live!

### Step 6: Custom Domain (Optional)

To use a custom domain instead of `vercel.app`:

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow instructions to update DNS (varies by domain provider)

### Step 7: Automatic Updates

From now on, whenever you push to GitHub:
```bash
git add .
git commit -m "Update article styling"
git push origin main
```

Vercel automatically rebuilds and deploys your website. **No manual steps needed!**

---

## Post-Deployment Checklist

After deployment, verify everything works:

- [ ] Website loads at your Vercel URL
- [ ] Click "Sign in with Google" button
- [ ] Login redirects to Google sign-in page
- [ ] You can sign in with your @pps.net email
- [ ] After login, you're redirected to your dashboard (Admin → /admin)
- [ ] Home page displays (with or without articles)
- [ ] Staff page loads
- [ ] All buttons and navigation work

**If login doesn't work:**
1. Check OAuth Client ID is in Vercel environment variables
2. Check your Vercel domain is added to OAuth redirect URIs
3. Check browser console (F12) for error messages
4. Try clearing browser cache and signing in again

---

## Option 2: Netlify

Similar to Vercel, slightly different UI.

### Step 1: Create Account

1. Go to [Netlify.com](https://netlify.com)
2. Click "Sign up"
3. Choose "GitHub"

### Step 2: Connect Repository

1. Click "New site from Git"
2. Choose "GitHub"
3. Select your `school-newspaper` repository

### Step 3: Build Settings

Netlify auto-detects your settings, but verify:

```
Build command: npm run build
Publish directory: dist
```

### Step 4: Environment Variables

1. Go to "Site settings" → "Build & deploy" → "Environment"
2. Add your environment variables:
   ```
   VITE_GOOGLE_API_KEY = [your API key]
   VITE_GOOGLE_SHEETS_ID = [your sheet ID]
   VITE_GOOGLE_DRIVE_FOLDER_ID = [your folder ID]
   ```

### Step 5: Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Your site is live at: `https://your-site-name.netlify.app`

### Automatic Deployments

Same as Vercel - push to GitHub and Netlify auto-deploys.

---

## Option 3: GitHub Pages

Free and built into GitHub, but requires more configuration.

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Under "Build and deployment", select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. Click "Save"

### Step 2: Configure Vite for GitHub Pages

Edit your `vite.config.js`:

```javascript
export default {
  base: '/school-newspaper/', // Change to your repo name
  plugins: [react()],
  // ... rest of config
}
```

### Step 3: Add Deploy Script

Edit `package.json`, add this script:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "deploy": "npm run build && git add dist && git commit -m 'Deploy to GitHub Pages' && git push"
}
```

### Step 4: Deploy

```bash
npm run deploy
```

Your site will be live at: `https://your-username.github.io/school-newspaper`

### Limitations of GitHub Pages

- Slower builds
- Less control over server settings
- Can take longer to deploy
- **Recommended to use Vercel or Netlify instead**

---

## Troubleshooting Deployments

### Build fails with "environment variables not found"

Make sure all environment variables start with `VITE_` in your `.env.local` and in your hosting dashboard.

### Website shows but articles don't load

1. Check that environment variables are set in hosting dashboard
2. Verify API key hasn't expired
3. Check that Google Sheet is shared publicly
4. Look at browser console (F12) for error messages

### Website takes too long to load

1. Images might be too large - optimize them
2. Check API quota usage - Google Sheets API has free limits
3. Enable caching (set `VITE_CACHE_ENABLED=true`)

### Custom domain not working

1. Give DNS changes 24-48 hours to propagate
2. Verify DNS records are correct in your domain registrar
3. Check hosting provider's domain documentation

### "CORS errors" or "blocked requests"

1. Make sure Google APIs are properly configured
2. Verify API key restrictions in Google Cloud Console
3. Your hosting domain might need to be added to API key settings

---

## Keeping Your Site Updated

### After Initial Deployment

You're done! The website is live.

### When You Make Changes

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update colors and styling"
   git push origin main
   ```
3. Your hosting provider (Vercel/Netlify) automatically rebuilds
4. Changes live in 2-5 minutes

### When Editors Add Articles

1. Editors add to Google Sheet
2. Website picks up changes within 1 hour (or immediately if cache is cleared)
3. No redeploy needed!

---

## Monitoring Your Site

### Check Deployment Status

**Vercel:**
- Go to vercel.com/dashboard
- Click your project
- See all deployments and build logs

**Netlify:**
- Go to netlify.com
- Select your site
- See all deployments in "Deploys" tab

### Check for Errors

**Browser console (F12):**
- Press F12
- Go to "Console" tab
- Look for red error messages

**Check your API quota:**
- Go to [Google Cloud Console](https://console.cloud.google.com)
- APIs & Services → Library
- Check quota for Sheets API

---

## Reverting a Bad Deployment

If something breaks after a deployment:

### Option 1: Quick Fix

1. Fix the bug locally
2. Push to GitHub
3. Hosting provider redeploys automatically in 2-5 minutes

### Option 2: Revert to Previous Version

**In Vercel:**
1. Go to Deployments
2. Click on a previous working deployment
3. Click "Promote to Production"

**In Netlify:**
1. Go to "Deploys"
2. Click on a previous working deployment
3. Click "Publish deploy"

---

## Scaling Up

### If Traffic Increases

- Vercel and Netlify auto-scale
- No action needed on your part
- They handle unlimited traffic on free tier

### If You Run Into API Limits

Google Sheets API free tier is very generous:
- Up to 300 requests/minute for free tier
- With caching (1 hour), you could serve ~5000 page views/day

If you exceed:
1. Wait until next day (quota resets)
2. Optimize caching
3. Upgrade to paid Google API tier (if needed)

---

## Domain Names (Optional)

### Getting a Domain

You can get a free domain:
- **.tk domains** from FreeDom.tk or Dot.tk
- **.ml domains** from freenom.com
- Or buy one from GoDaddy ($1-2/year during promotion)

### Pointing Domain to Your Site

**For Vercel/Netlify:**
1. Buy/get domain
2. In your hosting dashboard, add domain
3. Get nameserver information
4. Update your domain registrar to point to hosting provider's nameservers
5. Wait 24-48 hours for DNS to update

---

## Security Checklist

Before going live, verify:

- [ ] `.env.local` file is in `.gitignore` (never commit API keys!)
- [ ] Environment variables are set in hosting dashboard
- [ ] Google Sheet is shared (at least "Viewer" for public)
- [ ] API key restrictions are set to your domain only
- [ ] Website loads and shows articles correctly
- [ ] Images display properly
- [ ] No errors in browser console

---

## Maintenance

### Regular Tasks

- **Weekly**: Check that articles are displaying
- **Monthly**: Check API quota usage
- **Quarterly**: Update dependencies (`npm update`)
- **Yearly**: Test backup/recovery plan

### Monitoring

Set up basic monitoring to catch issues:
- **Vercel/Netlify**: Built-in email alerts for failed deployments
- **Google Sheets**: Back up spreadsheet monthly
- **GitHub**: Your code is automatically backed up

---

## Emergency Recovery

If something goes completely wrong:

1. **Website down?**
   - Check Vercel/Netlify dashboard for deployment status
   - Revert to previous deployment if needed
   - Check API key in environment variables

2. **Articles disappeared?**
   - Google Drive/Sheets files are still in your Google account
   - Check if Google Sheet is still shared
   - Verify API key is still valid

3. **Lost code?**
   - Your code is on GitHub - always backed up
   - Clone repository to restore: `git clone https://github.com/your-username/school-newspaper`

---

## Next Steps

1. ✅ Choose Vercel or Netlify
2. ✅ Follow deployment steps above
3. ✅ Test your live website
4. ✅ Share the URL with staff and students
5. ✅ Monitor for the first week

**Congratulations! Your school newspaper is on the internet!** 📰

---

## Support

- **Vercel issues?** Check their docs at vercel.com/docs
- **Netlify issues?** Check their docs at netlify.com/blog
- **Google API issues?** See GOOGLE_API_SETUP.md
- **Build errors?** Check your terminal output for clues

