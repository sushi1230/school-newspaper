# Getting Started with School Newspaper Website

Welcome! This guide helps you figure out where to start based on your role.

---

## Who Are You?

### 👨‍💼 I'm the Newspaper Advisor/Administrator

**Start here:** [Admin Setup Guide](ADMIN_SETUP.md)

You'll need to:
1. Set up Google APIs
2. Create the master Google Sheet
3. Set up Google Drive folders
4. Share with editors
5. Deploy the website

**Time: 1-2 hours** (includes waiting for DNS if using custom domain)

**Technical difficulty: Easy** (mostly clicking buttons)

---

### 📝 I'm a Staff Writer/Editor

**Start here:** [Editor Guide](EDITOR_GUIDE.md)

You'll learn how to:
1. Write articles in Google Docs
2. Add articles to the master spreadsheet
3. Manage and edit published articles
4. Upload images

**Time: 15 minutes** to learn, then you're publishing

**Technical difficulty: Very Easy** (no technical knowledge required)

---

### 👨‍💻 I'm a Developer/Technical Person

**Start here:** [Google API Setup](GOOGLE_API_SETUP.md), then [Deployment Guide](DEPLOYMENT_GUIDE.md)

You'll need to:
1. Set up Google Cloud Project and APIs
2. Configure environment variables
3. Test locally (`npm run dev`)
4. Deploy to Vercel/Netlify
5. Help the advisor manage the system

**Time: 2-3 hours** (most for learning, setup is quick)

**Technical difficulty: Intermediate** (requires API configuration, command line)

---

### 👥 I'm Taking Over From Previous Staff

**Start here:** This document, then the appropriate guide above

The system is designed to be handed off. Everything you need is documented here.

**Time: 30 minutes** to understand, then follow role-specific guide

**What to know:**
- All articles are in Google Drive/Sheets (preserved for you)
- Website code is on GitHub (version controlled)
- Deployment is automated (push to GitHub, live in minutes)
- Contact info for technical help should be documented

---

## Quick System Overview

```
You Write in Google Docs
    ↓
Add Metadata to Google Sheet
    ↓
Website Reads from Google Sheet (every hour)
    ↓
Articles Appear on Website
    ↓
Readers See Your Work!
```

**Zero coding required for editors. Developers only set up once.**

---

## Documentation By Topic

| Need | Go To |
|------|-------|
| Instructions for publishing articles | [Editor Guide](EDITOR_GUIDE.md) |
| Setting up the system | [Admin Setup](ADMIN_SETUP.md) |
| Google APIs configuration | [Google API Setup](GOOGLE_API_SETUP.md) |
| Deploying to the web | [Deployment Guide](DEPLOYMENT_GUIDE.md) |
| Technical reference | [README](../README.md) |

---

## Common Questions

**Q: How much does this cost?**
A: Completely free. Google APIs, Vercel/Netlify hosting, Google Drive - all free.

**Q: Can I customize the design?**
A: Yes! The colors, fonts, and layout can be changed without coding.

**Q: What if something breaks?**
A: All documentation includes troubleshooting. Contact your developer if stuck.

**Q: Can I move to a different system later?**
A: Yes! Your articles are always in Google Drive and can be exported.

**Q: What happens when I graduate?**
A: Everything is documented and preserved. Next year's staff takes over.

---

## Getting Help

1. **Read the relevant guide** - Most answers are there
2. **Check the FAQ sections** in each guide
3. **Ask your editor-in-chief or advisor**
4. **Contact the technical person** who set it up

---

## Success Checklist

### ✅ Admin/Advisor
- [ ] Google APIs configured
- [ ] Master Google Sheet created and shared
- [ ] Google Drive folders created
- [ ] Editors given access
- [ ] Website deployed and live
- [ ] Test with sample article
- [ ] Editors given links to documentation

### ✅ Editors
- [ ] Received Google Sheets and Docs access
- [ ] Created first Google Doc
- [ ] Added metadata to master sheet
- [ ] Saw article appear on website
- [ ] Shared article on social media?

### ✅ Developer
- [ ] Local environment working
- [ ] Google APIs tested
- [ ] Deployed to Vercel/Netlify
- [ ] Environment variables set
- [ ] Custom domain configured (if desired)
- [ ] Documented for next year

---

## Next Steps

1. **Find your role** in the "Who Are You?" section above
2. **Click the recommended link** for your role
3. **Follow the step-by-step instructions**
4. **Reach out if you have questions**

---

## The Big Picture

This system was designed with one goal: **make it easy for non-technical people to run a school newspaper indefinitely.**

- ✅ No coding knowledge required
- ✅ No monthly fees
- ✅ No dependency on one person
- ✅ Sustainable for years
- ✅ Easy to hand off to next year's staff

**You're part of making that work. Thank you!** 📰

---

## Document Map

```
GETTING_STARTED.md (you are here)
├── ADMIN_SETUP.md (for advisors)
├── EDITOR_GUIDE.md (for writers)
├── GOOGLE_API_SETUP.md (for developers)
├── DEPLOYMENT_GUIDE.md (for developers)
└── README.md (technical overview)
```

Pick your guide and get started!
