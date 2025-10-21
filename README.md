# School Newspaper Website

A simple, free, and maintainable website builder for school newspapers. Write articles in Google Docs, add metadata to Google Sheets, and the website automatically displays them—**no coding required**.

---

## 📰 Features

✅ **No-Code Editing** - Editors write in Google Docs, manage metadata in Google Sheets
✅ **Automatic Publishing** - Articles appear on the website within 1 hour
✅ **Completely Free** - Uses free Google APIs and free hosting (Vercel/Netlify)
✅ **Sustainable** - Works indefinitely without ongoing costs or technical maintenance
✅ **Professional Design** - Beautiful, responsive newspaper layout
✅ **Easy Handoff** - Complete documentation for next year's staff

---

## 🚀 Quick Start

### For Developers

1. **Set up Google APIs** (one-time setup):
   ```bash
   # Follow the guide
   cat docs/GOOGLE_API_SETUP.md
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Google API key, Sheet ID, etc.
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

### For Newspaper Advisors/Admins

Start here: **[Admin Setup Guide](docs/ADMIN_SETUP.md)**

This covers:
- Creating the master Google Sheet
- Setting up Google Drive folders
- Managing editor access
- Website deployment

### For Editors/Journalists

Start here: **[Editor Guide](docs/EDITOR_GUIDE.md)**

This covers:
- Writing articles in Google Docs
- Adding metadata to the spreadsheet
- Publishing and managing articles
- Troubleshooting common issues

---

## 📋 System Architecture

```
Google Docs (Article Content)
         ↓
    Google Drive
         ↓
Google Sheets (Master Metadata)
         ↓
Google Sheets API (Read)
         ↓
React Website ← Caching Layer
         ↓
Published Website
```

**How it works:**

1. Writers create articles in Google Docs
2. Metadata is added to a Google Sheet (title, author, date, category, featured status, etc.)
3. The website reads from Google Sheets API
4. Articles are cached for performance
5. Website automatically displays new articles within 1 hour

---

## 📚 Documentation

| Guide | For | Description |
|-------|-----|-------------|
| [Google API Setup](docs/GOOGLE_API_SETUP.md) | Developers | Setting up Google Cloud APIs (one-time) |
| [Admin Setup](docs/ADMIN_SETUP.md) | Advisors/Admins | Creating sheets, managing access, deployment |
| [Editor Guide](docs/EDITOR_GUIDE.md) | Journalists/Editors | Writing and publishing articles |
| [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) | Developers | Deploying to Vercel/Netlify |

---

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Pure CSS + CSS Variables (easy to customize)
- **API**: Google Sheets + Google Drive APIs
- **Hosting**: Vercel, Netlify, or GitHub Pages (all free)
- **Database**: Google Drive + Google Sheets (free, no setup)

---

## 📝 Master Spreadsheet Schema

The master "School Newspaper Articles" spreadsheet contains:

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| A: Title | Text | Yes | Article headline |
| B: Author | Text | Yes | Writer's name |
| C: Category | Text | Yes | Must match valid categories |
| D: Date | Date | Yes | Format: YYYY-MM-DD |
| E: Google Doc ID | Text | Yes | From the Google Doc URL |
| F: Featured | Boolean | Yes | TRUE for main story, FALSE for others |
| G: Excerpt | Text | Yes | 1-2 sentence summary |
| H: Image URL | URL | Yes | Public image link |

**Valid Categories:**
- Campus News
- Sports & Activities
- Arts & Culture
- Opinion
- Student Life
- Student Profiles

(Customizable - edit in spreadsheet and update documentation)

---

## 🎨 Customization

### Change Colors/Theme

Edit `src/index.css`:

```css
:root {
  --primary-color: #1a1a1a;        /* Dark background */
  --accent-color: #c41e3a;          /* Red highlights */
  --text-color: #333;
  --light-bg: #f5f5f5;
}
```

### Change Website Title

Edit `src/components/Header.jsx`:

```jsx
<h1 className="site-title">Your Newspaper Name</h1>
```

### Add/Remove Sections

Update `ADMIN_SETUP.md` and `EDITOR_GUIDE.md` with new categories, then editors can use them in the spreadsheet.

### Add More Features

See the todo list below for planned enhancements.

---

## 🔄 Current Status & Roadmap

### ✅ Completed
- [x] Google Sheets/Drive integration
- [x] Article display system
- [x] Caching layer
- [x] Responsive design
- [x] Setup documentation

### 🚧 In Progress / Planned
- [ ] Article detail pages (individual article view)
- [ ] Search functionality
- [ ] Category browsing
- [ ] Article scheduling/drafts
- [ ] User roles/permissions
- [ ] Analytics dashboard
- [ ] Comment system
- [ ] Social sharing

---

## 🐛 Troubleshooting

### Articles not appearing?

1. Check browser console (F12) for errors
2. Verify Google Sheet is shared publicly
3. Confirm Google Doc ID is correct
4. Wait 1 hour for cache to refresh (or clear cache)

See [Editor Guide - FAQ](docs/EDITOR_GUIDE.md#frequently-asked-questions) for more help.

### Images not showing?

1. Verify image URL is public
2. Make sure URL starts with `https://`
3. Test URL in new browser tab to confirm it works
4. Use image from Google Drive or public stock site

### Website not building?

```bash
npm install           # Reinstall dependencies
npm run build         # Try building again
```

If still broken, check error messages in console.

---

## 👥 Roles

| Role | Responsibilities | Tools Used |
|------|------------------|-----------|
| **Editor-in-Chief** | Overall publication | Google Sheets (metadata) |
| **Section Editors** | Category management | Google Drive (folders) |
| **Staff Writers** | Article writing | Google Docs |
| **Advisor** | System admin, access | All of above |
| **Developer** | Setup, deployment | GitHub, Google APIs, Vercel |

---

## 📦 Project Structure

```
school-newspaper/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── FeaturedArticle.jsx
│   │   ├── ArticleCard.jsx
│   │   └── ArticleGrid.jsx
│   ├── services/
│   │   └── googleService.js # Google APIs integration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── docs/
│   ├── GOOGLE_API_SETUP.md   # Developer setup
│   ├── ADMIN_SETUP.md        # Advisor setup
│   ├── EDITOR_GUIDE.md       # Editor instructions
│   └── DEPLOYMENT_GUIDE.md   # Deployment steps
├── public/
├── .env.example              # Environment variables template
├── .env.local               # (Local, not committed) Actual values
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Deployment

### Vercel (Easiest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site will be live in minutes.

### Netlify

Connect your GitHub repo at netlify.com → automatic deployments

### Manual

```bash
npm run build
# Deploy the 'dist' folder to your web server
```

See [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) for detailed steps.

---

## 💰 Cost

**Completely Free!**

- ✅ Google APIs - Free tier (high quotas)
- ✅ Vercel/Netlify hosting - Free tier
- ✅ Google Drive/Sheets storage - Free
- ✅ No databases to pay for
- ✅ No backend servers
- ✅ Sustainable for years

---

## 🔒 Security & Privacy

- Article content stored in Google Drive (under school control)
- No external database or backend server
- API key protected in `.env.local` (not committed to Git)
- Website is read-only for public viewers
- Only editors can modify content (via Google Sheets access)

---

## 📄 License

[Add your license here - MIT, GPL, etc.]

---

## 🙏 Credits & Acknowledgments

Built as a sustainable solution for school newspapers. Inspired by the need for zero-cost, zero-maintenance publishing for student journalists.

---

## ❓ FAQ

**Q: Can editors see a live preview before publishing?**
A: Not yet. They can preview in Google Docs before adding to the sheet.

**Q: Can I add comments/reader engagement?**
A: Not currently, but it can be added. Contact developer.

**Q: What if Google Docs changes their API?**
A: Unlikely, but we have fallback documentation to adapt.

**Q: Can I export articles somewhere else?**
A: Yes - they're in Google Drive. Easy to migrate.

**Q: What happens to the site after graduation?**
A: Everything is preserved in Google. Next year's staff takes over.

---

## 🎯 Long-Term Vision

This newspaper website is designed to:

1. **Require zero technical knowledge** from editors
2. **Have zero ongoing costs** forever
3. **Survive staff transitions** with built-in handoff documentation
4. **Be completely customizable** without coding
5. **Scale to any size** publication

**Success looks like:** Next year's newspaper staff can take over and run everything independently, without needing a developer.

---

**Ready to publish? Start with the [Admin Setup Guide](docs/ADMIN_SETUP.md)!** 📰
