# School Newspaper Admin Setup Guide

This guide is for the **newspaper advisor/administrator** who will set up and maintain the system.

---

## Overview

As the newspaper admin, your responsibilities are:

1. **Initial Setup** - Google APIs, spreadsheet creation, sharing
2. **Managing Editors** - Adding/removing user access
3. **Maintenance** - Checking the website, clearing cache if needed
4. **Support** - Helping editors troubleshoot
5. **Documentation** - Ensuring continuity when you step down

---

## Prerequisite: Technical Requirements

You (or a developer helping you) should:
- Have a Google account
- Have basic comfort with Google Drive and Sheets
- Know how to share files/folders with others
- Have someone to handle the website deployment (or follow the deployment guide)

---

## Step 1: Set Up Google APIs (One-time)

**If a developer hasn't already done this**, follow the guide in `docs/GOOGLE_API_SETUP.md`.

This involves:
- Creating a Google Cloud Project
- Enabling Sheets, Drive, and Docs APIs
- Creating an API key
- Storing the API key in `.env.local`

**Your developer should handle this.** You just need to know it was done.

---

## Step 2: Create the Master Google Sheet

1. **Go to Google Sheets** (https://sheets.google.com)

2. **Create a new spreadsheet** named "School Newspaper Articles"

3. **Set up the header row** with these exact column names:
   ```
   A: Title
   B: Author
   C: Category
   D: Date
   E: Google Doc ID
   F: Featured
   G: Excerpt
   H: Image URL
   ```

4. **Set categories** that editors will use. Add some sample rows with these categories:
   - Campus News
   - Sports & Activities
   - Arts & Culture
   - Opinion
   - Student Life
   - Student Profiles

5. **Share the spreadsheet**:
   - Click "Share"
   - Choose "Editor" access for staff
   - Choose "Viewer" access for parents/community (optional)
   - Copy sharing links to give to editors

**Example initial row:**
```
Title: Welcome to Our New Website
Author: [Your Name]
Category: Campus News
Date: 2024-10-21
Google Doc ID: [ID from a sample doc]
Featured: TRUE
Excerpt: Welcome to the online home of our school newspaper
Image URL: https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800
```

---

## Step 3: Organize Google Drive Folders (Optional)

Creating folders makes it easier for editors to find their work.

1. **Create a main folder** named "School Newspaper Articles"

2. **Create subfolders** for each section:
   - Campus News
   - Sports & Activities
   - Arts & Culture
   - Opinion
   - Student Life
   - Student Profiles

3. **Share with editors**:
   - Right-click folder → "Share"
   - Give "Editor" access to staff
   - Provide folder link to editors

**Benefits:**
- Editors can save Google Docs to organized folders
- Easy to browse all articles by category
- Backup/archive structure is clear

---

## Step 4: Manage Editor Access

### Adding an Editor

1. **Share the Google Sheet** (if not already shared):
   - Open "School Newspaper Articles" sheet
   - Click "Share"
   - Enter their Gmail address
   - Give them **"Editor"** access
   - Click "Share"

2. **Share Google Drive folders** (optional):
   - Go to the "School Newspaper Articles" folder
   - Click "Share"
   - Enter their Gmail address
   - Give them **"Editor"** access

3. **Send them this guide**:
   - Link to `docs/EDITOR_GUIDE.md`
   - Explain the workflow
   - Answer initial questions

### Removing an Editor

1. **Open the Google Sheet** → "Share"
2. Find their name
3. Click the trash icon to remove
4. (Optional) Do the same for the Google Drive folder

---

## Step 5: Set Up Categories

Categories organize articles on the website. You can customize these.

**To change categories:**

1. **Edit the master sheet** - Add examples with new categories
2. **Tell editors** the valid category names
3. **Document them** in the EDITOR_GUIDE.md

**Current categories:**
- Campus News
- Sports & Activities
- Arts & Culture
- Opinion
- Student Life
- Student Profiles

**To add a category** (e.g., "Technology"):
- Create a sample row in the sheet with `Category: Technology`
- Share with editors that this is now valid
- Update documentation

---

## Step 6: Website Deployment

The website needs to be deployed somewhere people can access it. You have options:

### Option A: Vercel (Recommended - Free, Simple)

1. Push code to GitHub
2. Connect GitHub to Vercel
3. Vercel automatically deploys when you push
4. Website is live at vercel.com/your-project

**Guide:** See `docs/DEPLOYMENT_GUIDE.md` (coming soon)

### Option B: Netlify (Also Free, Similar to Vercel)

1. Connect GitHub repo to Netlify
2. Netlify auto-deploys on push
3. Website is live at netlify.com/your-site

### Option C: Manual Deployment

Deploy yourself to your school's web server if available.

**Contact your developer for specific deployment instructions.**

---

## Step 7: Create a Category Page (Optional Enhancement)

Right now, the website only shows the featured article + latest 6 articles.

**To add category pages** where readers can browse all articles in a section:
- This requires developer work
- Contact your developer to implement

---

## Ongoing Maintenance

### Daily Tasks
- Check the website for new articles
- Fix broken links or typos in the master sheet
- Answer editor questions

### Weekly Tasks
- Review published articles
- Check that images are showing correctly
- Verify no spam or inappropriate content

### Monthly Tasks
- Archive old articles (optional)
- Review analytics (if implemented)
- Check for any issues in console logs

### Semester Tasks
- Update website theme if needed
- Backup Google Drive and Sheets
- Plan for next editor-in-chief transition

---

## Troubleshooting

### Articles aren't appearing

1. **Check the master sheet**:
   - Is every column (A-H) filled in?
   - Is the Google Doc ID correct?
   - Is the category valid?

2. **Check the Google Doc**:
   - Is it shared? (at least "Viewer" access)
   - Is it a real Google Doc? (not a link/image)

3. **Check the website**:
   - Open browser console (F12)
   - Look for error messages
   - Wait 1 hour (cache duration)

### Images not showing

1. **Check the URL**:
   - Does it start with `https://`?
   - Try opening the URL in a new tab - does it work?
   - Is it a public/shareable link?

2. **Check Google Drive images**:
   - Right-click image → Get link
   - Make sure "Anyone with the link" can view
   - The URL should be like: `https://drive.google.com/uc?export=view&id=...`

### Website is slow

- **Clear the cache**: Ask a developer to run `clearCache()` in browser console
- **Check API quota**: Google Sheets API has free quotas. If exceeded, wait until tomorrow.
- **Optimize images**: Use smaller image files (<500KB)

### Can't share sheet with an editor

- **Check their Gmail**: Make sure you have the right email address
- **Check permissions**: You need "Editor" access to share
- **Try public link**: Share → "Anyone with the link" → "Editor"

---

## Documentation for Next Year

When you graduate/step down, document everything for the next admin:

Create a file called `HANDOFF_NOTES.md` that includes:

```markdown
# Handoff Notes for [Year]

## How the system works
[Brief explanation]

## Key people
- Google API Key holder: [Name/Contact]
- Website host: [Vercel/Netlify/Other]
- Main GitHub repo: [Link]

## Important links
- Master Sheet: [Link]
- Drive folder: [Link]
- Website: [URL]

## How to deploy changes
[Steps]

## Common issues
[List common problems and fixes]

## Emergency contacts
[Developer phone/email]

## Tips for success
[What worked well this year]

## Things to improve
[What could be better]
```

---

## Your Checklist

- [ ] Google APIs configured (done by developer)
- [ ] Master Google Sheet created and shared
- [ ] Google Drive folders created and shared
- [ ] Initial articles added (with sample content)
- [ ] Website deployed and accessible
- [ ] Editors given access to Sheet and Folders
- [ ] Editors given the `EDITOR_GUIDE.md` link
- [ ] Website tested with sample articles
- [ ] Cache clearing process documented
- [ ] Handoff plan in place

---

## Getting Help

- **Google/Drive/Sheets help**: Google Support (support.google.com)
- **Website issues**: Contact the developer
- **API issues**: Check `GOOGLE_API_SETUP.md`
- **Editorial questions**: Refer editors to `EDITOR_GUIDE.md`

---

## Next Steps

1. ✅ Complete this setup
2. ✅ Test with sample articles
3. ✅ Give editors access
4. ✅ Have editors write first articles
5. ✅ Monitor for issues
6. ✅ Adjust categories/workflow as needed
7. ✅ Plan for next year's admin

**Congratulations! Your school newspaper is live!** 📰

